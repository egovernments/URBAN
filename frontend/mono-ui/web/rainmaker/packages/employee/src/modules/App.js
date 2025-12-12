import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Toast } from "components";
import { addBodyClass, getModuleName } from "egov-ui-kit/utils/commons";
import { fetchCurrentLocation, fetchLocalizationLabel, toggleSnackbarAndSetText, setRoute } from "egov-ui-kit/redux/app/actions";
import { fetchMDMSData } from "egov-ui-kit/redux/common/actions";
import Router from "./Router";
import commonConfig from "config/common";
// import logoMseva from "egov-ui-kit/assets/images/logo-white.png";
import routes from "./Routes";
import { getLocale, getModule, setModule, getStoredModulesList, getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import isEmpty from "lodash/isEmpty";
import { LoadingIndicator, CommonShareContainer } from "components";

class App extends Component {
  constructor(props) {
    super(props);
    const { pathname: currentPath } = props.location;

    props.history.listen((location, action) => {
      const { pathname: nextPath } = location;
      addBodyClass(nextPath);
      props.toggleSnackbarAndSetText(false, { labelName: "", labelKey: "" }, "success");
    });

    addBodyClass(currentPath);
  }

  componentDidMount() {
    const { fetchLocalizationLabel, fetchCurrentLocation, fetchMDMSData } = this.props;

    // Initialize IndexedDB and preload localizations
    console.log('Log => ** [App] componentDidMount - Starting IndexedDB initialization...');

    // Track if we should fetch localizations from API
    let shouldFetchLocalization = true;

    try {
      // Try to initialize IndexedDB
      if (typeof indexedDB !== 'undefined' && indexedDB !== null) {
        const request = indexedDB.open('eGovLocalization', 1);

        request.onerror = () => {
          console.warn('Log => ** [App] IndexedDB initialization failed:', request.error);
        };

        request.onsuccess = () => {
          console.log('Log => ** [App] IndexedDB initialized successfully');
          const db = request.result;

          // Preload localizations from IndexedDB to localStorage
          this.loadLocalizationsFromIndexedDB(db, (hasData) => {
            // Callback to determine if we should skip API fetch
            if (hasData) {
              console.log('Log => ** [App] ✅ Localization data loaded from IndexedDB - SKIPPING initial API fetch');
              shouldFetchLocalization = false;
            } else {
              console.log('Log => ** [App] No data in IndexedDB - will fetch from API');
              // Fetch localization if no data in IndexedDB
              fetchLocalizationLabel(getLocale() || "en_IN");
            }
          });

          db.close();
        };

        request.onupgradeneeded = (event) => {
          console.log('Log => ** [App] IndexedDB creating database schema...');
          const db = event.target.result;
          if (!db.objectStoreNames.contains('localizationStore')) {
            const store = db.createObjectStore('localizationStore', { keyPath: 'key' });
            store.createIndex('locale', 'locale', { unique: false });
            store.createIndex('module', 'module', { unique: false });
            store.createIndex('timestamp', 'timestamp', { unique: false });
            console.log('Log => ** [App] IndexedDB schema created');
          }
        };
      } else {
        console.warn('Log => ** [App] IndexedDB not supported in this browser');
        // Fallback to API fetch if IndexedDB not supported
        fetchLocalizationLabel(getLocale() || "en_IN");
      }
    } catch (error) {
      console.warn('Log => ** [App] Error initializing IndexedDB:', error);
      // Fallback to API fetch on error
      fetchLocalizationLabel(getLocale() || "en_IN");
    }

    // FIX (Comment #1): Update module on initial load
    this.updateModuleOnRouteChange();

    // FIX (Comment #1): Listen to route changes to update module filter
    this.unlisten = this.props.history.listen((location) => {
      this.updateModuleOnRouteChange();
    });

    let requestBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "StateInfo",
              },
            ],
          },
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants",
              },
              {
                name: "citymodule",
              },
            ],
          },
        ],
      },
    };
    // Note: fetchLocalizationLabel is now called conditionally above based on IndexedDB data

    // current location
    fetchCurrentLocation();
    fetchMDMSData(requestBody);
  }

  componentWillUnmount() {
    // Cleanup: Remove route change listener
    if (this.unlisten) {
      this.unlisten();
    }
  }

  // SMART STORAGE STRATEGY: Load localizations from hybrid storage
  // - rainmaker-common → Check localStorage first (instant access)
  // - Other modules → Load from IndexedDB on demand
  loadLocalizationsFromIndexedDB = (db, callback) => {
    try {
      const locale = getLocale() || 'en_IN';

      // Step 1: Check if rainmaker-common exists in localStorage (priority storage)
      const commonKey = `localization_${locale}_common`;
      const commonData = localStorage.getItem(commonKey);

      if (commonData) {
        const parsedCommon = JSON.parse(commonData);
        console.log(`Log => ** [App] ✅ rainmaker-common found in localStorage: ${parsedCommon.length} entries (instant access)`);

        // rainmaker-common is available, skip API fetch
        if (callback) callback(true);
        return;
      }

      // Step 2: rainmaker-common not in localStorage, check IndexedDB for combined data
      console.log('Log => ** [App] rainmaker-common not in localStorage, checking IndexedDB...');
      const transaction = db.transaction('localizationStore', 'readonly');
      const store = transaction.objectStore('localizationStore');
      const request = store.get(`${locale}_combined`);

      request.onsuccess = () => {
        const result = request.result;

        if (result && result.data && result.data.length > 0) {
          console.log(`Log => ** [App] Loading ${result.data.length} localizations from IndexedDB...`);

          // Separate rainmaker-common for localStorage
          const rainmakerCommon = result.data.filter(item => item.module === 'rainmaker-common');

          if (rainmakerCommon.length > 0) {
            // Save rainmaker-common to localStorage for instant access
            localStorage.setItem(commonKey, JSON.stringify(rainmakerCommon));
            console.log(`Log => ** [App] ✅ Saved rainmaker-common to localStorage: ${rainmakerCommon.length} entries`);
          }

          // Also save combined data for backward compatibility
          const lsKey = `localization_${locale}`;
          localStorage.setItem(lsKey, JSON.stringify(result.data));
          console.log(`Log => ** [App] ✅ Loaded ${result.data.length} total entries from IndexedDB`);

          // Notify caller that we have data
          if (callback) callback(true);
        } else {
          console.log('Log => ** [App] No localizations found in IndexedDB, will fetch from API');
          // Notify caller that we don't have data
          if (callback) callback(false);
        }
      };

      request.onerror = () => {
        console.warn('Log => ** [App] Failed to load from IndexedDB:', request.error);
        // On error, notify caller that we don't have data
        if (callback) callback(false);
      };
    } catch (error) {
      console.warn('Log => ** [App] Error loading from IndexedDB:', error);
      // On error, notify caller that we don't have data
      if (callback) callback(false);
    }
  }

  // FIX (Comment #1): Update module on every route change
  updateModuleOnRouteChange = () => {
    const moduleName = getModuleName();
    const currentModule = getModule();

    if (moduleName !== currentModule) {
      console.log(`Log => ** [Module Update] Route changed. New module: ${moduleName} (was: ${currentModule})`);
      setModule(moduleName);

      // Check if this module's localization is already loaded
      const storedModulesList = getStoredModulesList();
      const storedModules = storedModulesList ? JSON.parse(storedModulesList) : [];

      if (!storedModules.includes(moduleName)) {
        console.log(`Log => ** [Module Update] Fetching localization for new module: ${moduleName}`);
        this.props.fetchLocalizationLabel(getLocale() || "en_IN", null, getTenantId(), true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { route: nextRoute, authenticated, location } = nextProps;
    const { route: currentRoute, history, setRoute } = this.props;

    if (nextRoute && currentRoute !== nextRoute) {
      history.push(nextRoute);
      setRoute("");
    }

    const isPrivacyPolicy = location && location.pathname && location.pathname.includes("privacy-policy");
    if (nextProps.hasLocalisation !== this.props.hasLocalisation && !authenticated && !isPrivacyPolicy) {
      nextProps.hasLocalisation && this.props.history.replace("/language-selection");
    }
  }

  render() {
    const { toast, loading, defaultUrl, hasLocalisation } = this.props;
    return (
      <div>
        <Router routes={routes} hasLocalisation={hasLocalisation} defaultUrl={defaultUrl} />
        {toast && toast.open && !isEmpty(toast.message) && <Toast open={toast.open} message={toast.message} variant={toast.variant} />}
        {loading && <LoadingIndicator />}
        <CommonShareContainer componentId="rainmaker-common-share" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { route, toast } = state.app;
  const { auth } = state;
  const { authenticated } = auth || false;
  const props = {};
  const { spinner } = state.common;
  const { stateInfoById } = state.common || [];
  let hasLocalisation = false;
  let defaultUrl = process.env.REACT_APP_NAME === "Citizen" ? "/user/register" : "/user/login";
  if (stateInfoById && stateInfoById.length > 0) {
    hasLocalisation = stateInfoById[0].hasLocalisation;
    defaultUrl = stateInfoById[0].defaultUrl;
  }
  const loading = ownProps.loading || spinner;
  if (route && route.length) {
    props.route = route;
  }
  if (toast && toast.open && toast.message && !isEmpty(toast.message)) {
    props.toast = toast;
  }
  return {
    ...props,
    loading,
    hasLocalisation,
    defaultUrl,
    authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // FIX: Pass all 4 parameters to fetchLocalizationLabel action
    fetchLocalizationLabel: (locale, module, tenantId, isFromModule) => dispatch(fetchLocalizationLabel(locale, module, tenantId, isFromModule)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
    fetchMDMSData: (criteria) => dispatch(fetchMDMSData(criteria)),
    fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
