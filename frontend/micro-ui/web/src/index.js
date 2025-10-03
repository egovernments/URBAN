import React from 'react';
import ReactDOM from 'react-dom';
import { initLibraries } from "@egovernments/digit-ui-libraries";
// import "@egovernments/digit-ui-css/dist/index.css";
import "./index.css";
import App from './App';
import { TLCustomisations } from './Customisations/tl/TLCustomisation';
import { UICustomizations } from './Customisations/UICustomizations';
import VersionConfig from './versionConfig';

// Set static UI version from local config (manually maintained)
window.DIGIT_UI_VERSION = VersionConfig.version;

initLibraries().then(async () => {

  // Skip prefetch for auto-login pages - they handle localization themselves
  const isAutoLogin = window.location.href.includes('/auto-login');
  console.log(`[LOCALIZATION] App initialization - isAutoLogin: ${isAutoLogin}, URL: ${window.location.href}`);
  
  // Prefetch critical localization bundles before first render
  if (!isAutoLogin) {
    try {
    console.log("[LOCALIZATION] Starting initial prefetch for normal app flow");
    
    const getLocalePref = () => {
      const fromSession = window.Digit.SessionStorage.get("locale");
      const emp = window.localStorage.getItem("Employee.locale");
      const cit = window.localStorage.getItem("Citizen.locale");
      const result = fromSession || emp || cit || "en_IN";
      console.log(`[LOCALIZATION] Locale preference - session: ${fromSession}, employee: ${emp}, citizen: ${cit}, final: ${result}`);
      return result;
    };
    
    const getTenantPref = () => {
      const sessionCitizen = window.Digit.SessionStorage.get("Citizen.tenantId");
      const sessionEmployee = window.Digit.SessionStorage.get("Employee.tenantId");
      const localCitizen = window.localStorage.getItem("Citizen.tenant-id");
      const localEmployee = window.localStorage.getItem("Employee.tenant-id");
      const result = sessionCitizen || sessionEmployee || localCitizen || localEmployee || undefined;
      console.log(`[LOCALIZATION] Tenant preference - sessionCit: ${sessionCitizen}, sessionEmp: ${sessionEmployee}, localCit: ${localCitizen}, localEmp: ${localEmployee}, final: ${result}`);
      return result;
    };
    
    const locale = getLocalePref();
    const tenantId = getTenantPref();
    const modules = ["rainmaker-common", tenantId ? `rainmaker-${String(tenantId).toLowerCase()}` : undefined].filter(Boolean);
    
    console.log(`[LOCALIZATION] Initial prefetch params - locale: ${locale}, tenantId: ${tenantId}, modules: [${modules.join(', ')}]`);
    
    const startTime = Date.now();
    await window.Digit.LocalizationService.getLocale({ modules, locale, tenantId });
    console.log(`[LOCALIZATION] Initial prefetch completed in ${Date.now() - startTime}ms`);
    
    // Schedule a verification pass shortly after first render time
    setTimeout(() => {
      console.log(`[LOCALIZATION] Running verification pass with same params`);
      window.Digit.LocalizationService.verifyAndRefetch({ modules, locale, tenantId });
    }, 1500);
    } catch (e) {
      console.error("[LOCALIZATION] Initial prefetch failed:", e);
      // proceed to render even if localization prefetch fails; cached strings may exist
    }
  } else {
    console.log("[LOCALIZATION] Auto-login detected - skipping initial localization prefetch, will be handled by auto-login component");
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

// (Removed focus/visibility localization refresh listeners)

