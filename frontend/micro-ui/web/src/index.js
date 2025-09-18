import React from 'react';
import ReactDOM from 'react-dom';
import { initLibraries, CacheManager } from "@egovernments/digit-ui-libraries";
// import "@egovernments/digit-ui-css/dist/index.css";
import "./index.css";
import App from './App';
import { TLCustomisations } from './Customisations/tl/TLCustomisation';
import { UICustomizations } from './Customisations/UICustomizations';
import VersionConfig from './versionConfig';

// Set static UI version from local config (manually maintained)
window.DIGIT_UI_VERSION = VersionConfig.version;

initLibraries().then(async () => {
  CacheManager.init();

  // Prefetch critical localization bundles before first render
  try {
    const getLocalePref = () => {
      const fromSession = window.Digit.SessionStorage.get("locale");
      if (fromSession) return fromSession;
      const emp = window.localStorage.getItem("Employee.locale");
      const cit = window.localStorage.getItem("Citizen.locale");
      return emp || cit || "en_IN";
    };
    const getTenantPref = () => {
      return (
        window.Digit.SessionStorage.get("Citizen.tenantId") ||
        window.Digit.SessionStorage.get("Employee.tenantId") ||
        window.localStorage.getItem("Citizen.tenant-id") ||
        window.localStorage.getItem("Employee.tenant-id") ||
        undefined
      );
    };
    const locale = getLocalePref();
    const tenantId = getTenantPref();
    const modules = ["rainmaker-common", tenantId ? `rainmaker-${String(tenantId).toLowerCase()}` : undefined].filter(Boolean);
    await window.Digit.LocalizationService.getLocale({ modules, locale, tenantId });
    // Schedule a verification pass shortly after first render time
    setTimeout(() => {
      window.Digit.LocalizationService.verifyAndRefetch({ modules, locale, tenantId });
    }, 1500);
  } catch (e) {
    // proceed to render even if localization prefetch fails; cached strings may exist
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});


window.Digit.Customizations = { PGR: {} ,TL:TLCustomisations, commonUiConfig: UICustomizations};

const user = window.Digit.SessionStorage.get("User");

if (!user || !user.access_token || !user.info) {
  // login detection

  const parseValue = (value) => {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  const getFromStorage = (key) => {
    const value = window.localStorage.getItem(key);
    return value && value !== "undefined" ? parseValue(value) : null;
  }

  const token = getFromStorage("token")

  const citizenToken = getFromStorage("Citizen.token")
  const citizenInfo = getFromStorage("Citizen.user-info")
  const citizenTenantId = getFromStorage("Citizen.tenant-id")

  const employeeToken = getFromStorage("Employee.token")
  const employeeInfo = getFromStorage("Employee.user-info")
  const employeeTenantId = getFromStorage("Employee.tenant-id")

  const setAuthedSession = (type, accessToken, info, tenantId) => {
    if (!accessToken || !info) return false;
    window.Digit.SessionStorage.set("user_type", type);
    window.Digit.SessionStorage.set("userType", type);
    const userDetails = { token: accessToken, access_token: accessToken, info };
    window.Digit.SessionStorage.set("User", userDetails);
    if (type === "citizen" && tenantId) window.Digit.SessionStorage.set("Citizen.tenantId", tenantId);
    if (type === "employee" && tenantId) window.Digit.SessionStorage.set("Employee.tenantId", tenantId);
    return true;
  };

  // Prefer citizen when both exist; otherwise select whichever is complete
  const citizenSet = setAuthedSession("citizen", citizenToken, citizenInfo, citizenTenantId);
  const employeeSet = !citizenSet && setAuthedSession("employee", employeeToken, employeeInfo, employeeTenantId);

  // If neither citizen nor employee session is complete, do not set partial session values
  // end
}

// Rehydrate session on tab resume if needed (e.g., after long idle)
const rehydrateIfNeeded = () => {
  const currentUser = window.Digit.SessionStorage.get("User");
  if (currentUser && currentUser.access_token && currentUser.info) return;

  const parseValue = (value) => {
    try { return JSON.parse(value); } catch (e) { return value; }
  };
  const getFromStorage = (key) => {
    const value = window.localStorage.getItem(key);
    return value && value !== "undefined" ? parseValue(value) : null;
  };

  const citizenToken = getFromStorage("Citizen.token");
  const citizenInfo = getFromStorage("Citizen.user-info");
  const citizenTenantId = getFromStorage("Citizen.tenant-id");
  const employeeToken = getFromStorage("Employee.token");
  const employeeInfo = getFromStorage("Employee.user-info");
  const employeeTenantId = getFromStorage("Employee.tenant-id");

  const setAuthedSession = (type, accessToken, info, tenantId) => {
    if (!accessToken || !info) return false;
    window.Digit.SessionStorage.set("user_type", type);
    window.Digit.SessionStorage.set("userType", type);
    const userDetails = { token: accessToken, access_token: accessToken, info };
    window.Digit.SessionStorage.set("User", userDetails);
    if (type === "citizen" && tenantId) window.Digit.SessionStorage.set("Citizen.tenantId", tenantId);
    if (type === "employee" && tenantId) window.Digit.SessionStorage.set("Employee.tenantId", tenantId);
    return true;
  };

  const citizenSet = setAuthedSession("citizen", citizenToken, citizenInfo, citizenTenantId);
  if (!citizenSet) setAuthedSession("employee", employeeToken, employeeInfo, employeeTenantId);
};

window.addEventListener("visibilitychange", () => { if (!document.hidden) rehydrateIfNeeded(); });
window.addEventListener("focus", () => { rehydrateIfNeeded(); });

