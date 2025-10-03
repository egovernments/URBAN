import React, { useEffect, useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useHistory, useLocation } from "react-router-dom";

const setCitizenDetail = (userObject, token, tenantId) => {
  // Fix: Use same locale access pattern as employee to prevent breaking
  const digitLocale = sessionStorage.getItem("Digit.locale");
  let locale = "en_IN"; // Default fallback
  
  try {
    if (digitLocale) {
      const parsed = JSON.parse(digitLocale);
      // Handle both citizen (.selectedLanguage) and employee (.value) patterns
      locale = parsed?.value?.selectedLanguage || parsed?.value || parsed?.selectedLanguage || "en_IN";
    }
  } catch (e) {
    console.warn("Failed to parse Digit.locale, using default:", e);
  }
  
  localStorage.setItem("Citizen.tenant-id", tenantId);
  localStorage.setItem("tenant-id", tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Citizen.locale", locale);
  // localStorage.setItem("token", token);
  localStorage.setItem("Citizen.token", token);
  // localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Citizen.user-info", JSON.stringify(userObject));
};

const AutoLogin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const history = useHistory();
  const location = useLocation();

  
  const DEFAULT_REDIRECT_URL = "/digit-ui/citizen";
  
  const queryParams = new URLSearchParams(location.search);
  const fromSandbox= queryParams.get("fromSandbox") || false

  const mobileNumber = queryParams.get("mobile");
  const otp = queryParams.get("otp") || "123456"; 
  const city = queryParams.get("city") || Digit.ULBService.getStateId();
  // Check for locale parameter in URL
  const urlLocale = queryParams.get("locale");
  Digit.SessionStorage.set("CITIZEN.COMMON.HOME.CITY", city);
  const redirectUrl = queryParams.get("redirectUrl") || DEFAULT_REDIRECT_URL;
  

  useEffect(() => {
    if (!user) return;
    
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    Digit.UserService.setUser(user);
    setCitizenDetail(user?.info, user?.access_token, city);
    Digit.SessionStorage.set("fromSandbox", fromSandbox);  

    console.log("[AUTO-LOGIN-CITIZEN] Starting localization setup");
    
    // Ensure locale is properly set for localization loading
    // Priority: URL param > localStorage > default
    const storedLocale = localStorage.getItem("Citizen.locale");
    const locale = urlLocale || storedLocale || "en_IN";
    console.log(`[AUTO-LOGIN-CITIZEN] Locale selection - URL: ${urlLocale}, stored: ${storedLocale}, final: ${locale}`);
    
    // Set locale in both session and local storage to ensure availability
    Digit.SessionStorage.set("locale", locale);
    sessionStorage.setItem("locale", locale);
    localStorage.setItem("locale", locale);
    console.log("[AUTO-LOGIN-CITIZEN] Locale set in all storage locations");
    
    // Load localizations after successful login
    const tenantId = city || user?.info?.tenantId;
    const modules = ["rainmaker-common", tenantId ? `rainmaker-${String(tenantId).toLowerCase()}` : undefined].filter(Boolean);
    
    console.log(`[AUTO-LOGIN-CITIZEN] Localization params - locale: ${locale}, tenantId: ${tenantId}, city: ${city}, modules: [${modules.join(', ')}]`);
    
    // Load localizations before redirecting
    const startTime = Date.now();
    Digit.LocalizationService.getLocale({ modules, locale, tenantId }).then((messages) => {
      console.log(`[AUTO-LOGIN-CITIZEN] Localizations loaded successfully in ${Date.now() - startTime}ms, got ${messages.length} messages`);
      
      // Ensure i18next is using the correct locale
      if (window.i18next && window.i18next.changeLanguage) {
        console.log(`[AUTO-LOGIN-CITIZEN] Setting i18next language to ${locale}`);
        window.i18next.changeLanguage(locale);
      }
      
      if (!Digit.ULBService.getCitizenCurrentTenant(true)) {
        history.replace("/digit-ui/citizen/select-location", {
          redirectBackTo: redirectUrl,
        });
      } else {
        history.replace(redirectUrl);
      }
    }).catch((err) => {
      console.error(`[AUTO-LOGIN-CITIZEN] Failed to load localizations after ${Date.now() - startTime}ms:`, err);
      // Still redirect even if localization fails
      if (!Digit.ULBService.getCitizenCurrentTenant(true)) {
        history.replace("/digit-ui/citizen/select-location", {
          redirectBackTo: redirectUrl,
        });
      } else {
        history.replace(redirectUrl);
      }
    });
  }, [user]);



  const handleAutoLogin = async () => {
    try {
      console.log("[AUTO-LOGIN-CITIZEN] Starting authentication");
      console.log("[AUTO-LOGIN-CITIZEN] URL parameters:", {
        mobile: mobileNumber,
        city: city,
        fromSandbox: fromSandbox,
        otp: otp
      });
      
      const requestData = {
        username: mobileNumber,
        password: otp, 
        tenantId: city,
        userType: "CITIZEN",
      };
      
      console.log("[AUTO-LOGIN-CITIZEN] Authentication request data:", requestData);
      console.log("[AUTO-LOGIN-CITIZEN] Calling Digit.UserService.authenticate...");
      
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      
      console.log("[AUTO-LOGIN-CITIZEN] Authentication successful:", {
        hasInfo: !!info,
        hasTokens: !!tokens,
        tenantId: info?.tenantId
      });
      
      // Handle single instance config if applicable
      if (window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")) {
        info.tenantId = Digit.ULBService.getStateId();
      }
      
      setUser({ info, ...tokens });
    } catch (err) {
      console.error("[AUTO-LOGIN-CITIZEN] Authentication failed:", err);
      console.error("[AUTO-LOGIN-CITIZEN] Full error object:", JSON.stringify(err, null, 2));
      console.error("[AUTO-LOGIN-CITIZEN] Error details:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
        status: err.response?.status,
        statusText: err.response?.statusText,
        responseData: err.response?.data,
        responseHeaders: err.response?.headers,
        requestConfig: err.config,
        isNetworkError: !err.response
      });
      
      // Check if it's a network/connectivity issue
      const isNetworkError = !err.response || err.response.status === 0 || err.message === 'Network Error';
      console.log("[AUTO-LOGIN-CITIZEN] Network error check:", {
        isNetworkError,
        hasResponse: !!err.response,
        status: err.response?.status,
        message: err.message,
        retryCount
      });
      
      // Don't set error immediately for network issues - try to retry (max 3 times)
      if (isNetworkError && retryCount < 3) {
        console.log(`[AUTO-LOGIN-CITIZEN] Network error detected, retrying auto-login in 2 seconds... (attempt ${retryCount + 1}/3)`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          handleAutoLogin();
        }, 2000);
        return;
      }
      
      const errorMessage = err.response?.data?.error_description || err.response?.data?.message || err.message || "Login failed. Please try again.";
      console.error("[AUTO-LOGIN-CITIZEN] Final error message:", errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <h2>Login Failed</h2>
        </div>
      ) : null}
    </div>
  );
};

export default AutoLogin;
