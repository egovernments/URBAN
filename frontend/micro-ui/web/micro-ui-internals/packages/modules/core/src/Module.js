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
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000,
        cacheTime: 50 * 60 * 1000,
        retryDelay: (attemptIndex) => Infinity,
        retry:false
        /*
          enable this to have auto retry incase of failure
          retryDelay: attemptIndex => Math.min(1000 * 3 ** attemptIndex, 60000)
         */
      },
    },
  });

  // Clear cache when new build is deployed - but don't block app initialization
  React.useEffect(() => {
    const currentTimestamp = process.env['REACT_APP_PUBLIC_PATH'];
    const storedTimestamp = localStorage.getItem("app_timestamp");
    
    // Only clear cache if we haven't done it yet for this session
    const sessionClearFlag = sessionStorage.getItem("cache_cleared_for_build");
    
    if ((!storedTimestamp || (currentTimestamp && parseInt(currentTimestamp) > parseInt(storedTimestamp))) && !sessionClearFlag) {
      console.log("New build detected, will clear cache after app loads");
      
      // Mark that we're going to clear cache for this session
      sessionStorage.setItem("cache_cleared_for_build", "true");
      
      // Use setTimeout to clear cache after app initialization completes
      setTimeout(() => {
        console.log("Clearing cache and storage for new build");
        
        // Preserve autologin URL parameters before clearing storage
        const currentUrl = window.location.href;
        const isAutoLogin = currentUrl.includes('/auto-login') && (currentUrl.includes('username=') || currentUrl.includes('mobile='));
        
        // Clear React Query cache first
        queryClient.clear();
        
        // Clear all storage except the new timestamp and session flag
        localStorage.clear();
        sessionStorage.clear();
        
        // Restore session flag to prevent infinite clearing
        sessionStorage.setItem("cache_cleared_for_build", "true");
        
        // Store the new timestamp
        if (currentTimestamp) {
          localStorage.setItem("app_timestamp", currentTimestamp);
        }
        
        console.log("Cache and storage cleared");
        
        // If we're in autologin, just reload to retry with same URL params
        // Otherwise do normal reload
        if (isAutoLogin) {
          console.log("Reloading autologin page with preserved URL parameters");
          window.location.reload();
        } else {
          console.log("Reloading page");
          window.location.reload();
        }
      }, 1000);
    }
  }, [queryClient]);

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
