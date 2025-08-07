import Urls from "../../atoms/urls";
import { PersistantStorage } from "../../atoms/Utils/Storage";
import i18next from "i18next";
import { Request } from "../../atoms/Utils/Request";
import { ApiCacheService } from "../../atoms/ApiCacheService";

const LOCALE_LIST = (locale) => `Locale.${locale}.List`;
const LOCALE_ALL_LIST = () => `Locale.List`;
const LOCALE_MODULE = (locale, module) => `Locale.${locale}.${module}`;

const TransformArrayToObj = (traslationList) => {
  return traslationList.reduce(
    // eslint-disable-next-line
    (obj, item) => ((obj[item.code] = item.message), obj),
    {}
  );
  // return trasformedTraslation;
};

const getUnique = (arr) => {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
};

const LocalizationStore = {
  getCaheData: (key) => {
    try {
      const cachedData = PersistantStorage.get(key);
      // Ensure we return an array if the cached data exists and is valid
      if (cachedData && Array.isArray(cachedData)) {
        return cachedData;
      }
      // If cached data is not an array or is null/undefined, return empty array
      return [];
    } catch (error) {
      console.warn(`Error retrieving cached data for key ${key}:`, error);
      return [];
    }
  },
  setCacheData: (key, value) => {
    try {
      const cacheSetting = ApiCacheService.getSettingByServiceUrl(Urls.localization);
      // Ensure we only cache valid data
      if (value && (Array.isArray(value) || typeof value === 'object')) {
        PersistantStorage.set(key, value, cacheSetting.cacheTimeInSecs);
      }
    } catch (error) {
      console.warn(`Error setting cache data for key ${key}:`, error);
    }
  },
  getList: (locale) => LocalizationStore.getCaheData(LOCALE_LIST(locale)) || [],
  setList: (locale, namespaces) => LocalizationStore.setCacheData(LOCALE_LIST(locale), namespaces),
  getAllList: () => LocalizationStore.getCaheData(LOCALE_ALL_LIST()) || [],
  setAllList: (namespaces) => LocalizationStore.setCacheData(LOCALE_ALL_LIST(), namespaces),
  store: (locale, modules, messages) => {
    try {
      const AllNamespaces = LocalizationStore.getAllList();
      const Namespaces = LocalizationStore.getList(locale);
      modules.forEach((module) => {
        if (!Namespaces.includes(module)) {
          Namespaces.push(module);
          const moduleMessages = messages.filter((message) => message.module === module);
          LocalizationStore.setCacheData(LOCALE_MODULE(locale, module), moduleMessages);
        }
      });
      LocalizationStore.setCacheData(LOCALE_LIST(locale), Namespaces);
      LocalizationStore.setAllList(getUnique([...AllNamespaces, ...Namespaces]));
    } catch (error) {
      console.warn(`Error storing localization data for locale ${locale}:`, error);
    }
  },
  get: (locale, modules) => {
    try {
      const storedModules = LocalizationStore.getList(locale);
      const newModules = modules.filter((module) => !storedModules.includes(module));
      const messages = [];
      storedModules.forEach((module) => {
        const moduleData = LocalizationStore.getCaheData(LOCALE_MODULE(locale, module));
        // Ensure moduleData is an array before spreading
        if (Array.isArray(moduleData)) {
          messages.push(...moduleData);
        }
      });
      return [newModules, messages];
    } catch (error) {
      console.warn(`Error getting localization data for locale ${locale}:`, error);
      return [modules, []];
    }
  },

  updateResources: (locale, messages) => {
    try {
      if (Array.isArray(messages)) {
        let locales = TransformArrayToObj(messages);
        i18next.addResources(locale, "translations", locales);
      }
    } catch (error) {
      console.warn(`Error updating resources for locale ${locale}:`, error);
    }
  },
  
  // Add a method to clear corrupted cache data
  clearCorruptedCache: (locale) => {
    try {
      const keys = [
        LOCALE_LIST(locale),
        LOCALE_ALL_LIST(),
        LOCALE_MODULE(locale, 'rainmaker-common')
      ];
      keys.forEach(key => {
        PersistantStorage.del(key);
      });
      console.log(`Cleared corrupted cache for locale: ${locale}`);
    } catch (error) {
      console.warn(`Error clearing cache for locale ${locale}:`, error);
    }
  }
};

export const LocalizationService = {
  getLocale: async ({ modules = [], locale = "en_IN", tenantId }) => {
    try {
      if (locale.indexOf("_IN") === -1) {
        locale += "_IN";
      }
      
      // Check if we have valid cached data, if not clear corrupted cache
      const cachedList = LocalizationStore.getList(locale);
      if (cachedList.length === 0 && modules.length > 0) {
        // Try to clear any corrupted cache data
        LocalizationStore.clearCorruptedCache(locale);
      }
      
      const [newModules, messages] = LocalizationStore.get(locale, modules);
      if (newModules.length > 0) {
        const data = await Request({ url: Urls.localization, params: { module: newModules.join(","), locale, tenantId }, useCache: false });
        if (data && data.messages && Array.isArray(data.messages)) {
          messages.push(...data.messages);
          setTimeout(() => LocalizationStore.store(locale, newModules, data.messages), 100);
        }
      }
      LocalizationStore.updateResources(locale, messages);
      return messages;
    } catch (error) {
      console.error(`Error in getLocale for locale ${locale}:`, error);
      // Clear corrupted cache and return empty array as fallback
      LocalizationStore.clearCorruptedCache(locale);
      return [];
    }
  },
  changeLanguage: (locale, tenantId) => {
    try {
      const modules = LocalizationStore.getList(locale);
      const allModules = LocalizationStore.getAllList();
      const uniqueModules = allModules.filter((module) => !modules.includes(module));
      LocalizationService.getLocale({ modules: uniqueModules, locale, tenantId });
      localStorage.setItem("Employee.locale", locale);
      localStorage.setItem("Citizen.locale", locale);
      Digit.SessionStorage.set("locale", locale);
      i18next.changeLanguage(locale);
    } catch (error) {
      console.error(`Error changing language to ${locale}:`, error);
    }
  },
  updateResources: (locale = "en_IN", messages) => {
    try {
      if (locale.indexOf("_IN") === -1) {
        locale += "_IN";
      }
      LocalizationStore.updateResources(locale, messages);
    } catch (error) {
      console.error(`Error updating resources for locale ${locale}:`, error);
    }
  },
  
  // Add a method to clear all localization cache
  clearAllCache: () => {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('Digit.Locale.'));
      keys.forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('Cleared all localization cache');
    } catch (error) {
      console.warn('Error clearing all localization cache:', error);
    }
  }
};
