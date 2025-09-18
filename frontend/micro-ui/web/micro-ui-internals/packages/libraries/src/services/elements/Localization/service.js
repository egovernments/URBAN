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
    i18next.addResources(locale, "translations", locales);
  },
};

export const LocalizationService = {
  getLocale: async ({ modules = [], locale = "en_IN", tenantId }) => {
    if (locale.indexOf("_IN") === -1) {
      locale += "_IN";
    }
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
        // Store immediately to avoid race conditions across multiple tabs
        try {
          LocalizationStore.store(locale, newModules, data.messages);
        } catch (e) {}
      }
    }
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
