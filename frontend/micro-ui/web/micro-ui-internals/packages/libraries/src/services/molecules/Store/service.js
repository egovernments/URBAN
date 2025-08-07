import { MdmsService } from "../../elements/MDMS";
import { LocalizationService } from "../../elements/Localization/service";
import { Storage } from "../../atoms/Utils/Storage";
import { ApiCacheService } from "../../atoms/ApiCacheService";

const getImgUrl = (url, fallbackUrl) => {
  if (!url && fallbackUrl) {
    return fallbackUrl;
  }
  if (url?.includes("s3.ap-south-1.amazonaws.com")) {
    const baseDomain = window?.location?.origin;
    return url.replace("https://s3.ap-south-1.amazonaws.com", baseDomain);
  }
  return url;
};
const addLogo = (id, url, fallbackUrl = "") => {
  const containerDivId = "logo-img-container";
  let containerDiv = document.getElementById(containerDivId);
  if (!containerDiv) {
    containerDiv = document.createElement("div");
    containerDiv.id = containerDivId;
    containerDiv.style = "position: absolute; top: 0; left: -9999px;";
    document.body.appendChild(containerDiv);
  }
  const img = document.createElement("img");
  img.src = getImgUrl(url, fallbackUrl);
  img.id = `logo-${id}`;
  containerDiv.appendChild(img);
};

const renderTenantLogos = (stateInfo, tenants) => {
  addLogo(stateInfo.code, stateInfo.logoUrl);
  tenants.forEach((tenant) => {
    addLogo(tenant.code, tenant.logoId, stateInfo.logoUrl);
  });
};

// Add cache validation utility
const validateAndCleanCache = () => {
  try {
    // Check for corrupted localization cache
    const locale = Digit.SessionStorage.get("locale") || "en_IN";
    const cachedList = localStorage.getItem(`Digit.Locale.${locale}.List`);
    
    if (cachedList) {
      try {
        const parsed = JSON.parse(cachedList);
        // If the cached data is corrupted or expired, clear it
        if (!parsed || !parsed.value || !Array.isArray(parsed.value)) {
          console.warn("Detected corrupted localization cache, clearing...");
          LocalizationService.clearAllCache();
        }
      } catch (error) {
        console.warn("Failed to parse cached localization data, clearing cache...");
        LocalizationService.clearAllCache();
      }
    }
    
    // Check for other corrupted cache entries
    const allKeys = Object.keys(localStorage);
    const digitKeys = allKeys.filter(key => key.startsWith('Digit.'));
    
    digitKeys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          const parsed = JSON.parse(value);
          // Check if the structure is valid
          if (!parsed || typeof parsed !== 'object' || !parsed.hasOwnProperty('expiry') || !parsed.hasOwnProperty('value')) {
            console.warn(`Removing corrupted cache entry: ${key}`);
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn(`Removing unparseable cache entry: ${key}`);
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn("Error during cache validation:", error);
  }
};

export const StoreService = {
  getInitData: () => {
    return Storage.get("initData");
  },

  getBoundries: async (tenants) => {
    let allBoundries = [];
    allBoundries = tenants.map((tenant) => {
      return Digit.LocationService.getLocalities(tenant.code);
    });
    return await Promise.all(allBoundries);
  },
  getRevenueBoundries: async (tenants) => {
    let allBoundries = [];
    allBoundries = tenants.map((tenant) => {
      return Digit.LocationService.getRevenueLocalities(tenant.code);
    });
    return await Promise.all(allBoundries);
  },
  digitInitData: async (stateCode, enabledModules) => {
    // Validate and clean cache before initialization
    validateAndCleanCache();
    
    const { MdmsRes } = await MdmsService.init(stateCode);
    const stateInfo = MdmsRes["common-masters"]?.StateInfo?.[0] || {};
    const uiHomePage = MdmsRes["common-masters"]?.uiHomePage?.[0] || {};
    const localities = {};
    const revenue_localities = {};
    const initData = {
      languages: stateInfo.hasLocalisation ? stateInfo.languages : [{ label: "ENGLISH", value: "en_IN" }],
      stateInfo: {
        code: stateInfo.code,
        name: stateInfo.name,
        logoUrl: stateInfo.logoUrl,
        statelogo: stateInfo.statelogo,
        logoUrlWhite: stateInfo.logoUrlWhite,
        bannerUrl: stateInfo.bannerUrl,
      },
      localizationModules: stateInfo.localizationModules,
      modules: MdmsRes?.tenant?.citymodule
        ?.filter((module) => module?.active)
        ?.filter((module) => enabledModules?.includes(module?.code))
        ?.sort((x, y) => x?.order - y?.order),
      uiHomePage: uiHomePage,
    };

    initData.selectedLanguage = Digit.SessionStorage.get("locale") || initData.languages[0].value;

    ApiCacheService.saveSetting(MdmsRes["DIGIT-UI"]?.ApiCachingSettings);

    const moduleTenants = initData.modules
      ?.map((module) => module.tenants)
      .flat()
      .reduce((unique, ele) => (unique.find((item) => item.code === ele.code) ? unique : [...unique, ele]), []);
    initData.tenants = MdmsRes?.tenant?.tenants.map((tenant) => ({
      i18nKey: `TENANT_TENANTS_${tenant.code.replace(".", "_").toUpperCase()}`,
      ...tenant,
    }));
    // .filter((item) => !!moduleTenants.find((mt) => mt.code === item.code))
    // .map((tenant) => ({ i18nKey: `TENANT_TENANTS_${tenant.code.replace(".", "_").toUpperCase()}` }, ...tenant }));
    const modules = [
      'rainmaker-common',
      ...(enabledModules.includes('Birth') || enabledModules.includes('Death') ? ['rainmaker-bnd'] : []),
      `rainmaker-${stateCode.toLowerCase()}`
    ];
    
    try {
      await LocalizationService.getLocale({
        modules: modules,
        locale: initData.selectedLanguage,
        tenantId: stateCode,
      });
    } catch (error) {
      console.error("Error loading localization data:", error);
      // If localization fails, try to clear cache and retry once
      try {
        LocalizationService.clearAllCache();
        await LocalizationService.getLocale({
          modules: modules,
          locale: initData.selectedLanguage,
          tenantId: stateCode,
        });
      } catch (retryError) {
        console.error("Failed to load localization data even after cache clear:", retryError);
      }
    }
    
    Storage.set("initData", initData);
    initData.revenue_localities = revenue_localities;
    initData.localities = localities;
    setTimeout(() => {
      renderTenantLogos(stateInfo, initData.tenants);
    }, 0);
    return initData;
  },
  defaultData: async (stateCode, moduleCode, language) => {
    let moduleCodes = [];
    if (typeof moduleCode !== "string")
      moduleCode?.forEach((code) => {
        moduleCodes.push(`rainmaker-${code.toLowerCase()}`);
      });
    
    try {
      const LocalePromise = LocalizationService.getLocale({
        modules: typeof moduleCode == "string" ? [`rainmaker-${moduleCode.toLowerCase()}`] : moduleCodes,
        locale: language,
        tenantId: stateCode,
      });
      await LocalePromise;
    } catch (error) {
      console.error("Error loading default localization data:", error);
      // Try to clear cache and retry
      try {
        LocalizationService.clearAllCache();
        const LocalePromise = LocalizationService.getLocale({
          modules: typeof moduleCode == "string" ? [`rainmaker-${moduleCode.toLowerCase()}`] : moduleCodes,
          locale: language,
          tenantId: stateCode,
        });
        await LocalePromise;
      } catch (retryError) {
        console.error("Failed to load default localization data even after cache clear:", retryError);
      }
    }
    
    return {};
  },
};
