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
  getCaheData: (key) => PersistantStorage.get(key) || [],
  setCacheData: (key, value) => {
    const cacheSetting = ApiCacheService.getSettingByServiceUrl(Urls.localization);
    PersistantStorage.set(key, value, cacheSetting.cacheTimeInSecs);
  },
  getList: (locale) => LocalizationStore.getCaheData(LOCALE_LIST(locale)) || [],
  setList: (locale, namespaces) => LocalizationStore.setCacheData(LOCALE_LIST(locale), namespaces),
  getAllList: () => LocalizationStore.getCaheData(LOCALE_ALL_LIST()) || [],
  setAllList: (namespaces) => LocalizationStore.setCacheData(LOCALE_ALL_LIST(), namespaces),
  store: (locale, modules, messages) => {
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
  },
  get: (locale, modules) => {
    const storedModules = LocalizationStore.getList(locale);
    const newModules = modules.filter((module) => !storedModules.includes(module));
    const messages = [];
    storedModules.forEach((module) => {
      const cachedModuleMessages = LocalizationStore.getCaheData(LOCALE_MODULE(locale, module)) || [];
      messages.push(...cachedModuleMessages);
    });
    return [newModules, messages];
  },

  updateResources: (locale, messages) => {
    let locales = TransformArrayToObj(messages);
    console.log(`[LocalizationService] updateResources called - locale: ${locale}, messages count: ${messages.length}, transformed keys: ${Object.keys(locales).length}`);
    
    // Check if i18next is properly initialized before calling addResources
    if (i18next && typeof i18next.addResources === 'function') {
      console.log(`[LocalizationService] Adding ${Object.keys(locales).length} translations to i18next for locale: ${locale}`);
      i18next.addResources(locale, "translations", locales);
      
      // Verify the resources were added
      const currentResources = i18next.getResourceBundle(locale, "translations");
      console.log(`[LocalizationService] i18next now has ${Object.keys(currentResources || {}).length} translations for ${locale}`);
    } else {
      console.warn('[LocalizationService] i18next not ready, skipping resource update. i18next:', !!i18next, 'addResources function:', typeof i18next?.addResources);
    }
  },
};

export const LocalizationService = {
  getLocale: async ({ modules = [], locale = "en_IN", tenantId }) => {
    if (locale.indexOf("_IN") === -1) {
      locale += "_IN";
    }
    
    console.log(`[LocalizationService] getLocale called - modules: [${modules.join(', ')}], locale: ${locale}, tenantId: ${tenantId}`);
    
    const [newModules, messages] = LocalizationStore.get(locale, modules);
    console.log(`[LocalizationService] Cache check - newModules: [${newModules.join(', ')}], cached messages: ${messages.length}`);
    
    if (newModules.length > 0) {
      const fetchOnce = () =>
        Request({ url: Urls.localization, params: { module: newModules.join(","), locale, tenantId }, useCache: false });
      let data = null;
      try {
        data = await fetchOnce();
      } catch (e1) {
        // one retry after short delay
        await new Promise((r) => setTimeout(r, 300));
        try {
          data = await fetchOnce();
        } catch (e2) {
          data = null;
        }
      }
      if (data && Array.isArray(data.messages)) {
        console.log(`[LocalizationService] API returned ${data.messages.length} new messages`);
        messages.push(...data.messages);
        // Store immediately to avoid race conditions across multiple tabs
        try {
          LocalizationStore.store(locale, newModules, data.messages);
          console.log(`[LocalizationService] Stored ${data.messages.length} messages in cache`);
        } catch (e) {
          console.error('[LocalizationService] Failed to store messages in cache:', e);
        }
      } else {
        console.warn('[LocalizationService] API returned invalid data:', data);
      }
    } else {
      console.log(`[LocalizationService] Using ${messages.length} cached messages, no API call needed`);
    }
    
    console.log(`[LocalizationService] Total messages to add to i18next: ${messages.length}`);
    LocalizationStore.updateResources(locale, messages);
    return messages;
  },
  verifyAndRefetch: async ({ modules = [], locale = "en_IN", tenantId }) => {
    if (locale.indexOf("_IN") === -1) {
      locale += "_IN";
    }
    // If any requested module lacks cached messages, re-fetch
    const missing = (modules || []).filter((m) => {
      const cached = PersistantStorage.get(LOCALE_MODULE(locale, m)) || [];
      return !cached || cached.length === 0;
    });
    if (missing.length > 0) {
      try {
        await LocalizationService.getLocale({ modules: missing, locale, tenantId });
      } catch (e) {}
    }
  },
  changeLanguage: (locale, tenantId) => {
    const modules = LocalizationStore.getList(locale);
    const allModules = LocalizationStore.getAllList();
    const uniqueModules = allModules.filter((module) => !modules.includes(module));
    LocalizationService.getLocale({ modules: uniqueModules, locale, tenantId });
    localStorage.setItem("Employee.locale", locale);
    localStorage.setItem("Citizen.locale", locale);
    Digit.SessionStorage.set("locale", locale);
    i18next.changeLanguage(locale);
  },
  updateResources: (locale = "en_IN", messages) => {
    if (locale.indexOf("_IN") === -1) {
      locale += "_IN";
    }
    LocalizationStore.updateResources(locale, messages);
  },
};
