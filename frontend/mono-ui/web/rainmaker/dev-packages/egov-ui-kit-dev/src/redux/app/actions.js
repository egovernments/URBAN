import * as actionTypes from "./actionTypes";
import { LOCALATION, ACTIONMENU, MDMS, EVENTSCOUNT, NOTIFICATIONS } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getCurrentAddress, getTransformedNotifications } from "egov-ui-kit/utils/commons";
import commonConfig from "config/common";
import { debug } from "util";
import { setLocale, localStorageSet, localStorageGet, getLocale, isValidLocale } from "egov-ui-kit/utils/localStorageUtils";
// import { getModuleName } from "../../utils/commons";
import { getLocalization, getLocalizationLabels, getModule, getStoredModulesList, setStoredModulesList, setLocalizationLabelsAsync } from "../../utils/localStorageUtils";

// Helper function to deduplicate localization messages by 'code' field
const deduplicateLocalizationMessages = (messages) => {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return [];
  }

  // Use Map to keep only the last occurrence of each code (newer data overwrites older)
  const messageMap = new Map();
  messages.forEach(message => {
    if (message && message.code) {
      messageMap.set(message.code, message);
    }
  });

  const deduplicatedArray = Array.from(messageMap.values());
  const duplicatesRemoved = messages.length - deduplicatedArray.length;

  if (duplicatesRemoved > 0) {
    console.log(`[Localization] Deduplication: Removed ${duplicatesRemoved} duplicate entries out of ${messages.length} total messages`);
  }

  return deduplicatedArray;
};

// Request tracking to prevent race conditions
// Track per-module to allow parallel fetches for different modules
let localizationRequestsInProgress = new Set();

export const updateActiveRoute = (routePath, menuName) => {
  localStorageSet("menuPath", routePath);
  localStorageSet("menuName", menuName);
  return { type: actionTypes.UPDATE_ACTIVE_ROUTE_PATH, routePath };
};

export const setRoute = (route) => {
  return { type: actionTypes.SET_ROUTE, route };
};

export const setPreviousRoute = (route) => {
  return { type: actionTypes.SET_PREVIOUS_ROUTE, route };
};

export const setBottomNavigationIndex = (bottomNavigationIndex) => {
  return { type: actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX, bottomNavigationIndex };
};

export const setLocalizationLabels = (locale, localizationLabels) => {
  // SMART STORAGE STRATEGY TO PREVENT LOCALSTORAGE OVERFLOW:
  // - rainmaker-common → localStorage ONLY (used everywhere, needs instant sync access)
  // - ALL data → IndexedDB (unlimited storage capacity)
  // - NO combined data in localStorage (this was causing quota exceeded errors)

  // FIX: Validate input - only reject if data is actually invalid (not array, null, undefined)
  // Allow empty array [] - it's valid for tenant modules with no custom translations
  if (!localizationLabels || !Array.isArray(localizationLabels)) {
    console.error('[setLocalizationLabels] ERROR: Received invalid localization data (not an array)! Aborting save.');
    console.error('[setLocalizationLabels] Input:', { type: typeof localizationLabels, isArray: Array.isArray(localizationLabels) });
    return { type: actionTypes.ADD_LOCALIZATION, locale, localizationLabels: [] };
  }

  // Log for debugging
  if (localizationLabels.length === 0) {
    console.warn(`[setLocalizationLabels] WARNING: Received empty array. This might be valid (tenant with no translations) or an error.`);
  }

  // Separate rainmaker-common from other modules
  const rainmakerCommon = localizationLabels.filter(item => item && item.module === 'rainmaker-common');
  const otherModules = localizationLabels.filter(item => item && item.module !== 'rainmaker-common');

  console.log(`Log => ** [Storage Strategy] Total: ${localizationLabels.length}, Common: ${rainmakerCommon.length}, Others: ${otherModules.length}`);

  // CRITICAL FIX: Only update rainmaker-common if we have valid data
  // Never overwrite existing common data with empty array!
  if (rainmakerCommon.length > 0) {
    try {
      window.localStorage.setItem(`localization_${locale}_common`, JSON.stringify(rainmakerCommon));
      console.log(`Log => ** [localStorage] Saved rainmaker-common: ${rainmakerCommon.length} entries (instant access)`);
    } catch (e) {
      console.error(`Log => ** [localStorage] CRITICAL: Failed to save rainmaker-common:`, e);
      // Don't delete existing data on error!
    }
  } else {
    console.warn(`Log => ** [localStorage] WARNING: Skipping rainmaker-common save - no common data in payload (${rainmakerCommon.length} entries). Preserving existing data.`);
  }

  // FIX: REMOVED combined data write to localStorage to prevent quota exceeded
  // Previously: window.localStorage.setItem(`localization_${locale}`, JSON.stringify(localizationLabels));
  // This was causing overflow after 2-3 modules despite IndexedDB implementation

  // Instead, only write to localStorage if data is small (< 3MB) for backward compatibility
  const dataSize = JSON.stringify(localizationLabels).length;
  const sizeLimit = 3 * 1024 * 1024; // 3MB limit

  if (dataSize < sizeLimit) {
    try {
      window.localStorage.setItem(`localization_${locale}`, JSON.stringify(localizationLabels));
      console.log(`Log => ** [localStorage] Saved combined data: ${(dataSize / 1024).toFixed(2)} KB (under limit)`);
    } catch (e) {
      console.warn(`Log => ** [localStorage] Failed to save combined data (quota exceeded), using IndexedDB only`);
      // Clean up old combined data if it exists
      window.localStorage.removeItem(`localization_${locale}`);
    }
  } else {
    console.log(`Log => ** [localStorage] Skipping combined data save: ${(dataSize / 1024).toFixed(2)} KB exceeds ${(sizeLimit / 1024).toFixed(0)} KB limit, using IndexedDB only`);
    // Remove old combined data to free up space
    window.localStorage.removeItem(`localization_${locale}`);
  }

  setLocale(locale);

  // Save other modules to IndexedDB (async, non-blocking)
  if (otherModules.length > 0) {
    console.log(`Log => ** [IndexedDB] Saving ${otherModules.length} other module entries...`);
    setLocalizationLabelsAsync(locale, otherModules, 'other_modules').catch(error => {
      console.warn('Log => ** [IndexedDB] Failed to save other modules (non-critical):', error);
    });
  }

  // CRITICAL: Save complete data to IndexedDB as primary storage
  setLocalizationLabelsAsync(locale, localizationLabels, 'combined').catch(error => {
    console.warn('Log => ** [IndexedDB] Failed to save combined data (CRITICAL - may lose data):', error);
  });

  return { type: actionTypes.ADD_LOCALIZATION, locale, localizationLabels };
};

export const toggleSnackbarAndSetText = (open, message = {}, variant) => {
  return {
    type: actionTypes.SHOW_TOAST,
    open,
    message,
    variant,
  };
};

// export const checkModuleLocalisationPresent=(locale='en_IN')=>{
//   const moduleToLoad=getModuleName();
//   let isPresent=false;
//   let localizationLabels=JSON.parse(getLocalization(`localization_${locale}`))||[];
//   if(localizationLabels.length==0){
//     return true;
//   }else if(!localizationLabels.find(localizationLabel=>localizationLabel.module==moduleToLoad.split(",")[0])){
//     return true;
//   }
//   return isPresent;
// }

export const fetchLocalizationLabel = (locale='en_IN', module, tenantId, isFromModule) => {
  return async (dispatch) => {
    // FIX: Validate locale before processing, fallback to en_IN if invalid
    if (!isValidLocale(locale)) {
      console.warn(`[fetchLocalizationLabel] Invalid locale provided: "${locale}", falling back to en_IN`);
      locale = 'en_IN';
    }

    try {
      console.log(`Log => ** [Localization] Fetching for locale=${locale}, module=${module}, isFromModule=${isFromModule}`);

      let storedModuleList=[];
      // const isLocalizationTriggered = localStorageGet("isLocalizationTriggered");
      // if(isLocalizationTriggered === "true") {
      //   return;
      // }
      if(getStoredModulesList()!==null){
          storedModuleList =JSON.parse(getStoredModulesList());
      }
      const moduleName = getModule();
      let localeModule;
      if(moduleName==='rainmaker-common'){
          localeModule='rainmaker-common';
      }
      else if(storedModuleList.includes('rainmaker-common')){
          localeModule=moduleName;
      }
      else{
        localeModule=moduleName?`rainmaker-common,${moduleName}`:`rainmaker-common`;
      }

      let resultArray = [], tenantModule = "", isCommonScreen;
      if(module!=null){
       tenantModule=`rainmaker-${module}`;
      }

      if((window.location.href.includes("/language-selection") || window.location.href.includes("/user/login")|| window.location.href.includes("/withoutAuth"))) {
         if((moduleName && storedModuleList.includes(moduleName) === false) || moduleName == null) isCommonScreen = true;
      }

      if((window.location.href.includes("/inbox"))) {
          if(moduleName && storedModuleList.includes(`rainmaker-common`)) isFromModule = false;
      }


      // FIX: Check if ALL modules in localeModule are already cached
      // localeModule can be "rainmaker-common" or "rainmaker-common,rainmaker-pgr"
      const modulesToFetch = localeModule ? localeModule.split(',').map(m => m.trim()) : [];
      const allModulesCached = modulesToFetch.every(mod => storedModuleList.includes(mod));

      // CRITICAL FIX: Only fetch if modules are NOT cached
      // isCommonScreen should NOT bypass cache check - if data is cached, use it!
      // This prevents redundant API calls when rainmaker-common is already in localStorage
      if(moduleName && !allModulesCached){
        console.log(`Log => ** [Localization] Fetching module data: ${localeModule} (not in cache: [${storedModuleList.join(', ')}])`);
        // localStorageSet("isLocalizationTriggered", "true");
          const payload1 = await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
          { key: "module", value: localeModule },
          { key: "locale", value: locale },
          { key: "tenantId", value: commonConfig.tenantId },
        ]);
        resultArray = [...payload1.messages];
        console.log(`Log => ** [Localization] Received ${payload1.messages?.length || 0} messages for ${localeModule}`);

        // Mark all fetched modules as loaded to prevent re-fetching
        modulesToFetch.forEach(mod => {
          if (!storedModuleList.includes(mod)) {
            storedModuleList.push(mod);
          }
        });
        setStoredModulesList(JSON.stringify(storedModuleList));
      } else {
        console.log(`Log => ** [Localization] ✅ Skipping fetch - all modules already cached: ${localeModule} in [${storedModuleList.join(', ')}]`);
      }

      if((module && storedModuleList.includes(tenantModule)===false)){
        console.log(`Log => ** [Localization] Fetching tenant module: ${tenantModule}`);
        storedModuleList.push(tenantModule);
        var newList =JSON.stringify(storedModuleList);

        const payload2 = module
        ? await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
          { key: "module", value: `rainmaker-${module}` },
          { key: "locale", value: locale },
          { key: "tenantId", value: tenantId ? tenantId : commonConfig.tenantId },
        ])
        : [];

      // FIX: Always save tenant module to cache, even if it returns empty messages
      // This prevents infinite re-fetching of tenant modules with no custom translations
      setStoredModulesList(newList);

      if (payload2 && payload2.messages && payload2.messages.length > 0) {
        console.log(`Log => ** [Localization] Received ${payload2.messages.length} messages for ${tenantModule}`);
        resultArray = [...resultArray, ...payload2.messages];
      } else {
        console.log(`Log => ** [Localization] Tenant module ${tenantModule} has no custom translations (empty response)`);
      }
    } else if (module) {
        console.log(`Log => ** [Localization] Skipping fetch - ${tenantModule} already in cache`);
    }

    // CRITICAL FIX: Always load from storage and dispatch to Redux
    // When modules are cached (no API fetch), we MUST load ALL cached modules from IndexedDB
    // to ensure components have access to ALL localization data (not just rainmaker-common)
    let prevLocalisationLabels = [];

    try {
      // First, try to get from IndexedDB (async) - has complete data
      const { getLocalizationLabelsAsync } = require('../../utils/localStorageUtils');
      const indexedDBData = await getLocalizationLabelsAsync(locale);

      if (indexedDBData) {
        prevLocalisationLabels = JSON.parse(indexedDBData);
        console.log(`Log => ** [Localization] Loaded ${prevLocalisationLabels.length} previous entries from IndexedDB (hybrid storage)`);

        // CRITICAL: Log what modules we have to debug missing module data
        const modulesInData = [...new Set(prevLocalisationLabels.map(item => item.module))];
        console.log(`Log => ** [Localization] Modules in IndexedDB: [${modulesInData.join(', ')}]`);
      } else {
        // Fallback to localStorage if IndexedDB is empty
        if (getLocalizationLabels() != null && !isCommonScreen && storedModuleList.length > 0) {
          prevLocalisationLabels = JSON.parse(getLocalizationLabels());
          console.log(`Log => ** [Localization] Loaded ${prevLocalisationLabels.length} previous entries from localStorage (fallback)`);
        } else {
          console.warn(`Log => ** [Localization] WARNING: No data in IndexedDB or localStorage! This will cause missing labels.`);
        }
      }
    } catch (error) {
      console.warn('Log => ** [Localization] Error loading from IndexedDB, using localStorage fallback:', error);
      // Final fallback to localStorage on error
      if (getLocalizationLabels() != null && !isCommonScreen && storedModuleList.length > 0) {
        prevLocalisationLabels = JSON.parse(getLocalizationLabels());
      }
    }

    // FIX: Combine and deduplicate (even if resultArray is empty from cache hit)
    const combinedArray = [...prevLocalisationLabels, ...resultArray];
    const deduplicatedArray = deduplicateLocalizationMessages(combinedArray);

    console.log(`Log => ** [Localization] Final count: ${deduplicatedArray.length} entries (prev: ${prevLocalisationLabels.length}, new: ${resultArray.length})`);

    // FIX: Always dispatch to Redux to ensure components have access to data
    // Even if resultArray is empty (cache hit), we need to populate Redux from storage
    if (deduplicatedArray.length === 0) {
      console.warn(`[Localization] WARNING: No localization data available (not in storage, not fetched). This may cause display issues.`);
    }

    // REMOVED: localStorage.removeItem() - This was deleting data before save, causing navigation breaks!
    // The setLocalizationLabels function now handles cleanup internally based on size
    dispatch(setLocalizationLabels(locale, deduplicatedArray));
  } catch (error) {
    // FIX: Add proper error handling instead of silent failure
    console.error('[Localization] Failed to fetch localization labels:', error);
    dispatch(toggleSnackbarAndSetText(true, {
      labelName: "Failed to load translations. Please refresh the page.",
      labelKey: "ERR_LOCALIZATION_FETCH_FAILED"
    }, "error"));
  }
};
};

export const fetchLocalizationLabelForOpenScreens= (locale = 'en_IN', module, tenantId, isFromModule) => {
return async (dispatch) => {
  // FIX: Validate locale before processing, fallback to en_IN if invalid
  if (!isValidLocale(locale)) {
    console.warn(`[fetchLocalizationLabelForOpenScreens] Invalid locale provided: "${locale}", falling back to en_IN`);
    locale = 'en_IN';
  }

  try {
    let storedModuleList = [];
    if (getStoredModulesList() !== null) {
      storedModuleList = JSON.parse(getStoredModulesList());
    }
    const moduleName = getModule();
    let localeModule;
    if (moduleName === 'rainmaker-common') {
      localeModule = 'rainmaker-common';
    }
    else if (storedModuleList.includes('rainmaker-common')) {
      localeModule = moduleName;
    }
    else {
      localeModule = moduleName ? `rainmaker-common,${moduleName}` : `rainmaker-common`;
    }

    let resultArray = [], tenantModule = "", isCommonScreen;
    if (module != null) {
      tenantModule = `rainmaker-${module}`;
    }

    if ((module && storedModuleList.includes(tenantModule) === false)) {
      console.log(`Log => ** [Localization:OpenScreens] Fetching tenant module: ${tenantModule}`);
      storedModuleList.push(tenantModule);
      setStoredModulesList(JSON.stringify(storedModuleList));

      const payload2 = module
          ? await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
              { key: "module", value: `rainmaker-${module}` },
              { key: "locale", value: locale },
              { key: "tenantId", value: tenantId ? tenantId : commonConfig.tenantId },
            ])
          : [];

      if (payload2 && payload2.messages && payload2.messages.length > 0) {
        console.log(`Log => ** [Localization:OpenScreens] Received ${payload2.messages.length} messages for ${tenantModule}`);
        resultArray = [...resultArray, ...payload2.messages];
      } else {
        console.log(`Log => ** [Localization:OpenScreens] Tenant module ${tenantModule} has no custom translations (empty response)`);
      }
    }

      // FIX: Load previous localization labels with HYBRID STORAGE support
      // Try IndexedDB first (has all modules), fallback to localStorage
      let prevLocalisationLabels = [];

      try {
        // First, try to get from IndexedDB (async) - has complete data
        const { getLocalizationLabelsAsync } = require('../../utils/localStorageUtils');
        const indexedDBData = await getLocalizationLabelsAsync(locale);

        if (indexedDBData) {
          prevLocalisationLabels = JSON.parse(indexedDBData);
          console.log(`Log => ** [Localization:OpenScreens] Loaded ${prevLocalisationLabels.length} previous entries from IndexedDB`);
        } else if (getLocalizationLabels() != null && !isCommonScreen && storedModuleList.length > 0) {
          prevLocalisationLabels = JSON.parse(getLocalizationLabels());
          console.log(`Log => ** [Localization:OpenScreens] Loaded ${prevLocalisationLabels.length} previous entries from localStorage (fallback)`);
        }
      } catch (error) {
        console.warn('Log => ** [Localization:OpenScreens] Error loading from IndexedDB, using localStorage:', error);
        if (getLocalizationLabels() != null && !isCommonScreen && storedModuleList.length > 0) {
          prevLocalisationLabels = JSON.parse(getLocalizationLabels());
        }
      }

      // FIX: Deduplicate before saving to prevent duplicate entries
      const combinedArray = [...prevLocalisationLabels, ...resultArray];
      const deduplicatedArray = deduplicateLocalizationMessages(combinedArray);

      // REMOVED: localStorage.removeItem() - This was deleting data before save, causing navigation breaks!
      // The setLocalizationLabels function now handles cleanup internally based on size
      // localStorageSet("isLocalizationTriggered", "false");
      dispatch(setLocalizationLabels(locale, deduplicatedArray));
    } catch (error) {
      // FIX: Add proper error handling instead of just logging
      console.error('[Localization] Failed to fetch localization labels for open screens:', error);
      dispatch(toggleSnackbarAndSetText(true, {
        labelName: "Failed to load translations. Please refresh the page.",
        labelKey: "ERR_LOCALIZATION_FETCH_FAILED"
      }, "error"));
    }
  };
};


const setActionItems = (payload) => {
  return {
    type: actionTypes.FETCH_ACTIONMENU,
    payload,
  };
};

const setCurrentLocation = (currentLocation) => {
  return {
    type: actionTypes.SET_USER_CURRENT_LOCATION,
    currentLocation,
  };
};

export const addBreadCrumbs = (url) => {
  return { type: actionTypes.ADD_BREADCRUMB_ITEM, url };
};

export const fetchCurrentLocation = () => {
  return async (dispatch) => {
    const currAddress = await getCurrentAddress();
    dispatch(setCurrentLocation(currAddress));
  };
};
export const fetchActionItems = (role, ts) => {
  return async (dispatch, getState) => {
    try {
      const payload = await httpRequest(ACTIONMENU.GET.URL, ACTIONMENU.GET.ACTION, [], role, [], ts);

      dispatch(setActionItems(payload.actions));
    } catch (error) {
      // dispatch(complaintFetchError(error.message));
    }
  };
};

export const setUiCommonConfig = (payload) => {
  return {
    type: actionTypes.FETCH_UI_COMMON_CONFIG,
    payload,
  };
};

export const setUiCommonConstants = (payload) => {
  return {
    type: actionTypes.FETCH_UI_COMMON_CONSTANTS,
    payload,
  };
};

export const fetchUiCommonConfig = () => {
  debug;
  return async (dispatch) => {
    const requestBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "uiCommonConfig",
              },
            ],
          },
        ],
      },
    };
    try {
      const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
      const { MdmsRes } = payload;
      const commonMasters = MdmsRes["common-masters"];
      const UiCommonConfig = commonMasters["uiCommonConfig"];
      dispatch(setUiCommonConfig(UiCommonConfig[0]));
    } catch (error) {
      console.log('Log => ** [MDMS:UiCommonConfig]', error);
    }
  };
};

export const fetchUiCommonConstants = () => {
  debug;
  return async (dispatch) => {
    const requestBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "uiCommonConstants",
              },
            ],
          },
        ],
      },
    };
    try {
      const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
      const { MdmsRes } = payload;
      const commonMasters = MdmsRes["common-masters"];
      const UiCommonConstants = commonMasters["uiCommonConstants"];
      dispatch(setUiCommonConstants(UiCommonConstants[0]));
    } catch (error) {
      console.log('Log => ** [MDMS:UiCommonConstants]', error);
    }
  };
};

export const setNotificationCount = (count) => {
  return {
    type: actionTypes.GET_NOTIFICATION_COUNT,
    count,
  };
};

export const getNotificationCount = (queryObject, requestBody) => {
  return async (dispatch, getState) => {
    try {
      const payload = await httpRequest(EVENTSCOUNT.GET.URL, EVENTSCOUNT.GET.ACTION, queryObject, requestBody);
      dispatch(setNotificationCount(payload.unreadCount));
    } catch (error) {
      console.log('Log => ** [Notifications:Count]', error);
    }
  };
};

export const setNotificationsComplete = (payload) => {
  return {
    type: actionTypes.GET_NOTIFICATIONS_COMPLETE,
    payload,
  };
};

const setNotificationsPending = () => {
  return {
    type: actionTypes.GET_NOTIFICATIONS_PENDING,
  };
};

const setNotificationsError = () => {
  return {
    type: actionTypes.GET_NOTIFICATIONS_ERROR,
  };
};

export const getNotifications = (queryObject, requestBody) => {
  return async (dispatch, getState) => {
    dispatch(setNotificationsPending());
    try {
      const payload = await httpRequest(NOTIFICATIONS.GET.URL, NOTIFICATIONS.GET.ACTION, queryObject, requestBody);
      const transformedEvents = await getTransformedNotifications(payload.events);
      dispatch(setNotificationsComplete(transformedEvents));
    } catch (error) {
      dispatch(setNotificationsError(error.message));
    }
  };
};
