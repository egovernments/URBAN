import Urls from "../../atoms/urls";
import { PersistantStorage } from "../../atoms/Utils/Storage";
import i18next from "i18next";
import { Request } from "../../atoms/Utils/Request";
import { ApiCacheService } from "../../atoms/ApiCacheService";

const LOCALE_LIST = (locale) => `Locale.${locale}.List`;
const LOCALE_ALL_LIST = () => `Locale.List`;
const LOCALE_MODULE = (locale, module) => `Locale.${locale}.${module}`;

const FALLBACK_LOCALE = window?.globalConfigs?.getConfig("DEFAULT_LANGUAGE_LOCALE") || "en_IN";

const TransformArrayToObj = (traslationList) => {
  return traslationList.reduce(
    // eslint-disable-next-line
    (obj, item) => ((obj[item.code] = item.message), obj),
    {}
  );
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

    // Only get messages for the requested modules that are cached, not all stored modules
    const requestedCachedModules = modules.filter((module) => storedModules.includes(module));
    requestedCachedModules.forEach((module) => {
      const cachedModuleMessages = LocalizationStore.getCaheData(LOCALE_MODULE(locale, module)) || [];
      messages.push(...cachedModuleMessages);
    });

    return [newModules, messages];
  },

  updateResources: (locale, messages) => {
    const locales = TransformArrayToObj(messages);
    if (i18next && typeof i18next.addResources === "function") {
      i18next.addResources(locale, "translations", locales);
    }
  },

  // Returns true if all requested modules are already cached for FALLBACK_LOCALE in PersistantStorage.
  // Uses storage (not i18next bundle size) so it correctly handles incremental module loads.
  _hasFallbackForModules: (modules) => {
    const storedModules = LocalizationStore.getList(FALLBACK_LOCALE);
    return modules.every((m) => storedModules.includes(m));
  },
};

// Fetches any uncached modules for the given locale, stores them, and returns
// the full message array for all requested modules.
const fetchAndStoreLocale = async (locale, modules, tenantId) => {
  const [newModules, messages] = LocalizationStore.get(locale, modules);

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
      messages.push(...data.messages);
      try {
        LocalizationStore.store(locale, newModules, data.messages);
      } catch (e) {}
    }
  }

  return messages;
};

export const LocalizationService = {
  getLocale: async ({ modules = [], locale = "en_IN", tenantId }) => {
    if (locale.indexOf("_IN") === -1) {
      locale += "_IN";
    }

    const messages = await fetchAndStoreLocale(locale, modules, tenantId);
    LocalizationStore.updateResources(locale, messages);

    // When a non-English locale is requested, also load en_IN resources into
    // i18next so its fallbackLng mechanism can show English text for any key
    // that has no translation in the requested locale (e.g. hi_IN is partially
    // translated). Without this, i18next returns the raw key code.
    if (locale !== FALLBACK_LOCALE && !LocalizationStore._hasFallbackForModules(modules)) {
      try {
        const fallbackMessages = await fetchAndStoreLocale(FALLBACK_LOCALE, modules, tenantId);
        LocalizationStore.updateResources(FALLBACK_LOCALE, fallbackMessages);
      } catch (e) {
        // Non-fatal: if English load fails, keys missing in the target locale
        // will still show raw codes — acceptable degradation.
      }
    }

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
