import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getI18n } from "react-i18next";
import { Body, Loader } from "@egovernments/digit-ui-react-components";
import { DigitApp } from "./App";
import SelectOtp from "./pages/citizen/Login/SelectOtp";
import AcknowledgementCF from "./components/AcknowledgementCF";
import CitizenFeedback from "./components/CitizenFeedback";

import getStore from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundaries";
import { useState } from "react";

const DigitUIWrapper = ({ stateCode, enabledModules, moduleReducers }) => {
  const { isLoading, data: initData } = Digit.Hooks.useInitStore(stateCode, enabledModules);
  if (isLoading) {
    return <Loader page={true} />;
  }

  const i18n = getI18n();
  return (
    <Provider store={getStore(initData, moduleReducers(initData))}>
      <Router>
        <Body>
          <DigitApp
            initData={initData}
            stateCode={stateCode}
            modules={initData?.modules}
            appTenants={initData.tenants}
            logoUrl={initData?.stateInfo?.logoUrl}
          />
        </Body>
      </Router>
    </Provider>
  );
};

export const DigitUI = ({ stateCode, registry, enabledModules, moduleReducers }) => {
  const [privacy, setPrivacy] = useState(Digit.Utils.getPrivacyObject() || {});
  const userType = Digit.UserService.getType();
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000,
        cacheTime: 50 * 60 * 1000,
        retryDelay: (attemptIndex) => Infinity,
        retry: false,
        // Disable request cancellation on localhost to prevent MDMS API cancellation
        cancelRefetch: isLocalhost ? false : true,
        /*
          enable this to have auto retry incase of failure
          retryDelay: attemptIndex => Math.min(1000 * 3 ** attemptIndex, 60000)
         */
      },
    },
  });

  // Clear localization cache when new build is deployed
  React.useEffect(() => {
   // Skip cache clearing logic entirely on localhost to prevent reload-induced MDMS cancellation
   if (isLocalhost) {
    console.log("Localhost detected - skipping cache clearing logic");
    return;
  }
    
    const currentTimestamp = process.env['REACT_APP_PUBLIC_PATH'] || Date.now().toString();
    const storedTimestamp = localStorage.getItem("app_timestamp");
    
    // Helper function to clear only localization-related cache
    const clearLocalizationCache = () => {
      const keysToRemove = [];
      
      // Find all Digit.Locale.* keys in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("Digit.Locale.") || key === "Digit.cachingService")) {
          keysToRemove.push(key);
        }
      }
      
      // Remove localization keys
      keysToRemove.forEach(key => {
        console.log(`Removing expired/stale localization cache: ${key}`);
        localStorage.removeItem(key);
      });
      
      // Clear React Query cache for localization queries
      queryClient.clear();
      
      return keysToRemove.length;
    };
    
    if (!storedTimestamp) {
      // First-time user - just store timestamp, no reload needed
      console.log("First-time user detected, storing build timestamp");
      localStorage.setItem("app_timestamp", currentTimestamp);
    } else if (currentTimestamp && parseInt(currentTimestamp) > parseInt(storedTimestamp)) {
      // Check if we're on an auto-login page - if so, skip cache clearing to not disrupt the flow
      const currentUrl = window.location.href;
      const isAutoLogin = currentUrl.includes('/auto-login') && (currentUrl.includes('username=') || currentUrl.includes('mobile='));
      
      if (isAutoLogin) {
        console.log("On auto-login page - deferring cache clear until after login");
        // Store flag to clear cache after auto-login completes
        sessionStorage.setItem("pending_cache_clear", "true");
        localStorage.setItem("app_timestamp", currentTimestamp);
        return;
      }
      
      // New build detected - clear only localization cache
      console.log("New build detected, clearing localization cache");
      
      const clearedCount = clearLocalizationCache();
      
      // Update stored timestamp
      localStorage.setItem("app_timestamp", currentTimestamp);
      
      if (clearedCount > 0) {
        console.log(`Cleared ${clearedCount} localization cache entries`);
        console.log("Reloading to fetch fresh translations");
        window.location.reload();
      }
    } else {
      // Check if we have pending cache clear from auto-login
      const pendingClear = sessionStorage.getItem("pending_cache_clear");
      if (pendingClear && !window.location.href.includes('/auto-login')) {
        sessionStorage.removeItem("pending_cache_clear");
        console.log("Executing deferred cache clear after auto-login");
        const clearedCount = clearLocalizationCache();
        if (clearedCount > 0) {
          console.log(`Cleared ${clearedCount} deferred localization cache entries`);
        }
      }
    }
    
    // Additionally, check for expired cache entries on every load
    const cleanupExpiredCache = () => {
      const now = Date.now();
      const keysToCheck = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("Digit.")) {
          keysToCheck.push(key);
        }
      }
      
      keysToCheck.forEach(key => {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (parsed.expiry && now > parsed.expiry) {
              console.log(`Removing expired cache: ${key}`);
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          // Not a JSON item or doesn't have expiry, skip
        }
      });
    };
    
    // Clean up expired cache entries
    cleanupExpiredCache();
  }, [queryClient,isLocalhost]);

  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const PrivacyProvider = Digit.Contexts.PrivacyProvider;

  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);

  return (
    <div>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ComponentProvider.Provider value={registry}>
            <PrivacyProvider.Provider
              value={{
                privacy: privacy?.[window.location.pathname],
                resetPrivacy: (_data) => {
                  Digit.Utils.setPrivacyObject({});
                  setPrivacy({});
                },
                getPrivacy: () => {
                  const privacyObj = Digit.Utils.getPrivacyObject();
                  setPrivacy(privacyObj);
                  return privacyObj;
                },
                /*  Descoped method to update privacy object  */
                updatePrivacyDescoped: (_data) => {
                  const privacyObj = Digit.Utils.getAllPrivacyObject();
                  const newObj = { ...privacyObj, [window.location.pathname]: _data };
                  Digit.Utils.setPrivacyObject({ ...newObj });
                  setPrivacy(privacyObj?.[window.location.pathname] || {});
                },
                /**
                 * Main Method to update the privacy object anywhere in the application
                 *
                 * @author jagankumar-egov
                 *
                 * Feature :: Privacy
                 *
                 * @example
                 *    const { privacy , updatePrivacy } = Digit.Hooks.usePrivacyContext();
                 */
                updatePrivacy: (uuid, fieldName) => {
                  setPrivacy(Digit.Utils.updatePrivacy(uuid, fieldName) || {});
                },
              }}
            >
              <DigitUIWrapper stateCode={stateCode} enabledModules={enabledModules} moduleReducers={moduleReducers} />
            </PrivacyProvider.Provider>
          </ComponentProvider.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
};

const componentsToRegister = {
  SelectOtp,
  AcknowledgementCF,
  CitizenFeedback,
};

export const initCoreComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
