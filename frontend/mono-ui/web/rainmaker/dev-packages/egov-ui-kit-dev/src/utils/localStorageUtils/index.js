import { use } from "react";


const appName = process.env.REACT_APP_NAME;
//Fileter User Object
export const removeFields = (user = {}, fields = []) => {
  if (!user || typeof user !== "object") return user; // safety check

  const updatedUser = { ...user };

  fields.forEach((field) => {
    if (field in updatedUser) {
      delete updatedUser[field];
    }
  });

  return updatedUser;
};
//Encryption and decryption 
export const encryptUserDetails = (user={}) =>
{
  user = JSON.parse(user)
  if (!user) return null
  const mobilenumber = btoa(user.mobileNumber);
  const name = btoa(user.name);
  const emailId = btoa(user.emailId);
  const dob= btoa(user.dob);
  user = {...user, mobileNumber : mobilenumber, emailId : emailId, name : name, dob : dob}
  return JSON.stringify(user);
}
export const decryptUserDetails = (user ={})=>{
  user = JSON.parse(user)
  if(!user) return null
  const mobileNumber = atob(user.mobileNumber);
  const name = atob(user.name);
  const emailId = atob(user.emailId);
  const dob= atob(user.dob)
  user = {...user, mobileNumber : mobileNumber, emailId : emailId, name : name, dob : dob}
  return JSON.stringify(user);
}
//GET methods
export const getAccessToken = () => {
  return localStorageGet(`token`);
};
export const getUserInfo = () => {
  return decryptUserDetails(localStorageGet("user-info"));

};
export const getTenantId = () => {
  return localStorageGet("tenant-id");
};
export const getLocalization = (key) => {
  return localStorage.getItem(key);
};
/**
 * Validate if a locale is valid
 * Valid formats: "en_IN", "hi_IN", "pa_IN", etc.
 * @param {string} locale - Locale to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidLocale = (locale) => {
  if (!locale || typeof locale !== 'string') {
    return false;
  }

  // Check if empty string, null, undefined, "null", "undefined"
  if (locale === '' || locale === 'null' || locale === 'undefined') {
    return false;
  }

  // Valid locale format: language_COUNTRY (e.g., en_IN, hi_IN)
  const localePattern = /^[a-z]{2}_[A-Z]{2}$/;
  return localePattern.test(locale);
};

/**
 * Get locale with fallback to en_IN if invalid
 * @returns {string} - Valid locale string (defaults to en_IN)
 */
export const getLocale = () => {
  const locale = localStorage.getItem("locale");

  // If locale is invalid, return default
  if (!isValidLocale(locale)) {
    console.log(`[getLocale] Invalid locale detected: "${locale}", falling back to en_IN`);
    return 'en_IN';
  }

  return locale;
};
export const getModule = () => {
  return localStorage.getItem("module");
};
export const getLocalizationLabels = () =>{
  return localStorage.getItem(`localization_${getLocale()}`);
};
export const getStoredModulesList = () =>{
  return localStorage.getItem("storedModulesList");
};
export const getThirdPartyName =()=>{
  return localStorage.getItem("thirdPartyCode");
}
export const getThirdPartyURL =()=>{
  return localStorage.getItem("thirdPartyReturnUrl");
}
export const getServiceName =()=>{
  return localStorage.getItem("serviceName");
}
export const getAppid =()=>{
  return localStorage.getItem("appid");
}
export const getIPin =()=>{
  return localStorage.getItem("iPin");
}
//SET methods
export const setUserInfo = (userInfo) => {
  userInfo = encryptUserDetails(userInfo)
  localStorageSet("user-info", userInfo, null);
};
export const setAccessToken = (token) => {
  localStorageSet("token", token, null);
};
export const setRefreshToken = (refreshToken) => {
  localStorageSet("refresh-token", refreshToken, null);
};
export const setTenantId = (tenantId) => {
  localStorageSet("tenant-id", tenantId, null);
};
/**
 * Set locale with validation - falls back to en_IN if invalid
 * @param {string} locale - Locale to set
 */
export const setLocale = (locale) => {
  // Validate locale before setting
  if (!isValidLocale(locale)) {
    console.warn(`[setLocale] Invalid locale provided: "${locale}", setting to en_IN instead`);
    localStorageSet("locale", 'en_IN');
    return;
  }

  localStorageSet("locale", locale);
  console.log(`[setLocale] Locale set to: ${locale}`);
};
export const setModule = (moduleName) => {
  localStorageSet("module", moduleName);
};
export const setReturnUrl = (url) => {
  localStorageSet("returnUrl", url);
};
export const setStoredModulesList =(storedModuleList) =>{
  localStorage.setItem("storedModulesList", storedModuleList);
};
//Remove Items (LOGOUT)
export const clearUserDetails = () => {
  Object.keys(localStorage).forEach((key) => {
      window.localStorage.removeItem(key);
  });
};
//Role specific get-set Methods
export const localStorageGet = (key, path) => {
  const appName = process.env.REACT_APP_NAME;
  let value = null;
  if (path) {
    const data = JSON.parse(window.localStorage.getItem(appName + "." + key)) || null;
    value = get(data, path);
  } else {
    value = window.localStorage.getItem(appName + "." + key) || null;
  }
  return value;
};
export const localStorageSet = (key, data, path) => {
  const appName = process.env.REACT_APP_NAME;
  const storedData = window.localStorage.getItem(appName + "." + key);

  if (path) {
    set(storedData, path, data);
    window.localStorage.setItem(appName + "." + key, storedData);
    window.localStorage.setItem(key, storedData);
  } else {
    window.localStorage.setItem(appName + "." + key, data);
    window.localStorage.setItem(key, data);
  }
};
//Remove Item
export const lSRemoveItem = (key) => {
  const appName = process.env.REACT_APP_NAME;
  window.localStorage.removeItem(appName + "." + key);
};


// get tenantId for Employee/Citizen
export const getTenantIdCommon = () => {
    return process.env.REACT_APP_NAME === "Citizen"?JSON.parse(getUserInfo()).permanentCity:getTenantId();
}


// ============================================================================
// IndexedDB Integration - Hybrid Storage Approach
// ============================================================================

import indexedDBManager from '../indexedDBUtils';

// Re-export for other modules
export { indexedDBManager };

/**
 * Get localization labels with hybrid storage (IndexedDB + localStorage fallback)
 *
 * @param {string} locale - Language locale (e.g., "en_IN")
 * @returns {Promise<string|null>} JSON string of localization data or null
 */
export const getLocalizationLabelsAsync = async (locale) => {
  const localeToUse = locale || getLocale() || 'en_IN';

  try {
    // Try IndexedDB first (primary storage)
    const data = await indexedDBManager.getLocalization(localeToUse, 'all');
    if (data && data.length > 0) {
      console.log(`Log => ** [Hybrid Storage] Retrieved ${data.length} localization entries from IndexedDB`);
      return JSON.stringify(data);
    }
  } catch (error) {
    console.warn('Log => ** [Hybrid Storage] IndexedDB retrieval failed, falling back to localStorage:', error);
  }

  // Fallback to localStorage (secondary storage)
  const localStorageData = localStorage.getItem(`localization_${localeToUse}`);
  if (localStorageData) {
    console.log('Log => ** [Hybrid Storage] Retrieved localization from localStorage fallback');
  }
  return localStorageData;
};

/**
 * Set localization labels with smart hybrid storage
 * STRATEGY:
 * - rainmaker-common → localStorage (fast sync access, used everywhere)
 * - Other modules → IndexedDB (large storage, page-specific)
 *
 * @param {string} locale - Language locale
 * @param {array} data - Localization messages array
 * @param {string} moduleKey - Module identifier ('common', 'other_modules', 'combined')
 * @returns {Promise<void>}
 */
export const setLocalizationLabelsAsync = async (locale, data, moduleKey = 'combined') => {
  const localeToUse = locale || getLocale() || 'en_IN';

  // Save to IndexedDB based on module type
  try {
    await indexedDBManager.setLocalization(localeToUse, moduleKey, data);
    console.log(`Log => ** [IndexedDB] Saved ${data && data.length || 0} entries as '${moduleKey}'`);
  } catch (error) {
    console.warn(`Log => ** [IndexedDB] Failed to save '${moduleKey}' (non-critical):`, error);
  }
};

/**
 * Migrate existing localStorage localization data to IndexedDB
 * This should be called once during app initialization
 *
 * @returns {Promise<boolean>} Success status
 */
export const migrateLocalizationToIndexedDB = async () => {
  try {
    const locale = getLocale() || 'en_IN';
    const existingData = localStorage.getItem(`localization_${locale}`);

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      if (parsedData && parsedData.length > 0) {
        await indexedDBManager.setLocalization(locale, 'combined', parsedData);
        console.log(`Log => ** [Migration] Successfully migrated ${parsedData.length} entries to IndexedDB`);
        return true;
      }
    }

    console.log('Log => ** [Migration] No data to migrate');
    return false;
  } catch (error) {
    console.error('Log => ** [Migration] Failed to migrate localization to IndexedDB:', error);
    return false;
  }
};

/**
 * Get IndexedDB storage statistics
 * Useful for debugging and monitoring storage usage
 *
 * @returns {Promise<object>} Storage statistics
 */
export const getLocalizationStorageStats = async () => {
  try {
    const stats = await indexedDBManager.getStorageStats();
    return stats;
  } catch (error) {
    console.error('Log => ** [Storage Stats] Failed to get storage statistics:', error);
    return { supported: false, error: error.message };
  }
};

/**
 * Clean up old localization data from IndexedDB
 *
 * @param {number} maxAgeInDays - Maximum age in days (default: 7)
 * @returns {Promise<number>} Number of entries deleted
 */
export const cleanupOldLocalizations = async (maxAgeInDays = 7) => {
  try {
    const maxAge = maxAgeInDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    const deletedCount = await indexedDBManager.cleanupOldData(maxAge);
    return deletedCount;
  } catch (error) {
    console.error('Log => ** [Cleanup] Failed to cleanup old localizations:', error);
    return 0;
  }
};