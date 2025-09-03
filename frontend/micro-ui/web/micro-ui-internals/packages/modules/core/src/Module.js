import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getI18n } from "react-i18next";
import { Body, Loader } from "@egovernments/digit-ui-react-components";
import { DigitApp } from "./App";

// Session Manager Implementation

class SessionManager {
  constructor() {
    // Check sessionStorage for custom timeout values (for testing in production)
    // Default production values: 60 minutes timeout, 5 minutes warning
    const customTimeout = sessionStorage.getItem('SESSION_TIMEOUT_MINUTES');
    const customWarning = sessionStorage.getItem('SESSION_WARNING_MINUTES');
    
    // Check if logging is enabled via sessionStorage
    this.loggingEnabled = sessionStorage.getItem('SESSION_DEBUG_LOGS') === 'true';
    
    // Use custom values if set, otherwise use production defaults
    this.timeoutMinutes = customTimeout ? parseFloat(customTimeout) : 60; // Default: 60 minutes
    this.warningMinutes = customWarning ? parseFloat(customWarning) : 5;  // Default: 5 minutes
    
    this.timeoutMs = this.timeoutMinutes * 60 * 1000;
    this.warningMs = this.warningMinutes * 60 * 1000;
    this.timeoutId = null;
    this.warningId = null;
    this.finalTimeoutId = null;
    this.isActive = false;
    this.warningShown = false;
    this.sessionLocked = false;
    this.activityListeners = [];
    
    // Initialize configuration
    this.log('🔥 Session Manager Initializing', {
      timeoutMinutes: this.timeoutMinutes,
      warningMinutes: this.warningMinutes,
      source: customTimeout ? 'sessionStorage (custom)' : 'default production values',
      loggingEnabled: this.loggingEnabled
    });
  }

  // Helper method for conditional logging
  log(message, data = null) {
    if (this.loggingEnabled) {
      if (data) {
        console.log(message, data);
      } else {
        console.log(message);
      }
    }
  }

  init() {
    if (this.isActive) return;
    
    const hasToken = localStorage.getItem('Employee.token') || localStorage.getItem('citizen.token');
    if (!hasToken) {
      this.log('❌ No user session, skipping session manager');
      return;
    }

    this.log('✅ Session Manager Started!', {
      timeout: `${this.timeoutMinutes}min`,
      warning: `${this.warningMinutes}min`
    });
    
    this.isActive = true;
    this.sessionLocked = false;
    this.warningShown = false;
    this.setupActivityListeners();
    this.resetTimer();
  }

  setupActivityListeners() {
    const handleActivity = () => {
      // Don't reset timer if session is locked or warning is shown
      if (!this.sessionLocked && !this.warningShown) {
        this.resetTimer();
      }
    };

    const events = ['click', 'keypress', 'mousemove', 'scroll', 'touchstart'];
    events.forEach(event => {
      const listener = handleActivity.bind(this);
      document.addEventListener(event, listener, { passive: true });
      this.activityListeners.push({ event, listener });
    });
  }

  removeActivityListeners() {
    this.activityListeners.forEach(({ event, listener }) => {
      document.removeEventListener(event, listener);
    });
    this.activityListeners = [];
  }

  resetTimer() {
    // Don't reset if session is locked
    if (this.sessionLocked) {
      this.log('🔒 Session is locked, cannot reset timer');
      return;
    }

    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearTimeout(this.warningId);
    if (this.finalTimeoutId) clearTimeout(this.finalTimeoutId);
    
    const warningTime = this.timeoutMs - this.warningMs;
    
    this.log('⏱️ Timer reset', {
      time: new Date().toLocaleTimeString(),
      warningIn: `${warningTime / 1000}s`,
      logoutIn: `${this.timeoutMs / 1000}s`
    });
    
    this.warningId = setTimeout(() => {
      this.showWarning();
    }, warningTime);
    
    this.timeoutId = setTimeout(() => {
      this.handleTimeout();
    }, this.timeoutMs);
  }

  showWarning() {
    this.log('⚠️ Session Warning - showing dialog');
    
    this.warningShown = true;
    this.sessionLocked = true;
    
    // Remove activity listeners to prevent timer reset
    this.removeActivityListeners();
    
    // Set a final timeout for automatic logout after warning
    const remainingTime = this.warningMs;
    
    this.finalTimeoutId = setTimeout(() => {
      this.log('⏰ Warning timeout exceeded - forcing logout');
      this.handleTimeout();
    }, remainingTime);
    
    // Show warning dialog with dynamic timing
    const warningMinutes = Math.ceil(this.warningMs / 60000);
    const userResponse = confirm(
      `Your session will expire in ${warningMinutes} minute${warningMinutes > 1 ? 's' : ''} due to inactivity.\n\n` +
      `Click OK within ${warningMinutes} minute${warningMinutes > 1 ? 's' : ''} to extend your session.\n` +
      'Click Cancel or wait to be logged out.'
    );
    
    if (userResponse && this.finalTimeoutId) {
      // User clicked OK within time limit
      clearTimeout(this.finalTimeoutId);
      
      // Check if we're still within the grace period
      if (!this.sessionLocked || this.warningShown) {
        this.log('✅ Session extended by user');
        this.sessionLocked = false;
        this.warningShown = false;
        this.setupActivityListeners();
        this.resetTimer();
      }
    } else {
      // User clicked Cancel or didn't respond
      this.log('❌ User rejected extension or timeout - logging out');
      this.handleTimeout();
    }
  }

  handleTimeout() {
    this.log('🚪 Session Expired - Logging out!');
    
    // Clear all timers
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearTimeout(this.warningId);
    if (this.finalTimeoutId) clearTimeout(this.finalTimeoutId);
    
    // Lock session permanently
    this.sessionLocked = true;
    this.isActive = false;
    
    // Remove all listeners
    this.removeActivityListeners();
    
    // Clear session data
    sessionStorage.clear();
    localStorage.removeItem('Employee.token');
    localStorage.removeItem('Employee.user-info');
    localStorage.removeItem('Employee.tenant-id');
    localStorage.removeItem('citizen.token');
    localStorage.removeItem('citizen.user-info');
    localStorage.removeItem('citizen.tenant-id');
    localStorage.removeItem('User');
    
    // Clear Digit service
    if (window.Digit && window.Digit.UserService) {
      window.Digit.UserService.setUser(null);
    }
    
    // Determine redirect path
    const isCitizen = window.location.pathname.includes('/citizen');
    const loginPath = isCitizen ? '/digit-ui/citizen/login' : '/digit-ui/employee/user/login';
    
    // Set timeout flag
    sessionStorage.setItem('session-timeout', 'true');
    
    // Force redirect
    window.location.replace(loginPath);
  }

  // Manual destroy method
  destroy() {
    this.log('💀 Destroying session manager');
    this.sessionLocked = true;
    this.isActive = false;
    
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearTimeout(this.warningId);
    if (this.finalTimeoutId) clearTimeout(this.finalTimeoutId);
    
    this.removeActivityListeners();
  }

  // Update configuration dynamically
  updateConfig(timeoutMinutes, warningMinutes) {
    this.log('🔄 Updating session configuration...', {
      newTimeout: `${timeoutMinutes}min`,
      newWarning: `${warningMinutes}min`
    });
    
    // Store in sessionStorage
    sessionStorage.setItem('SESSION_TIMEOUT_MINUTES', timeoutMinutes.toString());
    sessionStorage.setItem('SESSION_WARNING_MINUTES', warningMinutes.toString());
    
    // Update current instance
    this.timeoutMinutes = timeoutMinutes;
    this.warningMinutes = warningMinutes;
    this.timeoutMs = this.timeoutMinutes * 60 * 1000;
    this.warningMs = this.warningMinutes * 60 * 1000;
    
    this.log('✅ Configuration updated successfully');
    
    // Reset timers with new values if active
    if (this.isActive && !this.sessionLocked) {
      this.resetTimer();
      this.log('⏱️ Timer reset with new configuration');
    }
    
    return true;
  }

  // Get current configuration
  getConfig() {
    return {
      timeoutMinutes: this.timeoutMinutes,
      warningMinutes: this.warningMinutes,
      timeoutMs: this.timeoutMs,
      warningMs: this.warningMs,
      isActive: this.isActive,
      sessionLocked: this.sessionLocked,
      warningShown: this.warningShown
    };
  }
}

const sessionManager = new SessionManager();
setTimeout(() => sessionManager.init(), 3000);
window.digitSessionManager = sessionManager;

// Helper functions for testing and configuration
window.setSessionTimeout = (minutes, warningMinutes) => {
  if (minutes && warningMinutes) {
    sessionStorage.setItem('SESSION_TIMEOUT_MINUTES', minutes.toString());
    sessionStorage.setItem('SESSION_WARNING_MINUTES', warningMinutes.toString());
    console.log(`✅ Session timeout set to ${minutes} minutes with ${warningMinutes} minutes warning`);
    console.log('🔄 Please refresh the page to apply new settings');
    return true;
  } else {
    console.log('❌ Usage: setSessionTimeout(timeoutMinutes, warningMinutes)');
    console.log('📖 Example: setSessionTimeout(2, 0.5) for 2 min timeout with 30 sec warning');
    return false;
  }
};

window.clearSessionTimeout = () => {
  sessionStorage.removeItem('SESSION_TIMEOUT_MINUTES');
  sessionStorage.removeItem('SESSION_WARNING_MINUTES');
  console.log('✅ Custom timeout cleared. Default values will be used on next refresh.');
  console.log('🔄 Please refresh the page to apply default settings');
};

// Enable/Disable Session Logs
window.enableSessionLogs = () => {
  sessionStorage.setItem('SESSION_DEBUG_LOGS', 'true');
  console.log('✅ Session debug logs ENABLED');
  console.log('🔄 Please refresh the page to see debug logs');
};

window.disableSessionLogs = () => {
  sessionStorage.setItem('SESSION_DEBUG_LOGS', 'false');
  console.log('✅ Session debug logs DISABLED');
  console.log('🔄 Please refresh the page to hide debug logs');
};

window.getSessionConfig = () => {
  const timeout = sessionStorage.getItem('SESSION_TIMEOUT_MINUTES');
  const warning = sessionStorage.getItem('SESSION_WARNING_MINUTES');
  const logsEnabled = sessionStorage.getItem('SESSION_DEBUG_LOGS') === 'true';
  
  console.log('📊 Current Session Configuration:');
  console.log('==================================');
  if (timeout && warning) {
    console.log(`⏰ Timeout: ${timeout} minutes (custom)`);
    console.log(`⚠️ Warning: ${warning} minutes before timeout (custom)`);
  } else {
    console.log('⏰ Timeout: 60 minutes (default)');
    console.log('⚠️ Warning: 5 minutes before timeout (default)');
  }
  console.log(`🐛 Debug Logs: ${logsEnabled ? 'ENABLED' : 'DISABLED'}`);
  console.log('==================================');
  
  if (window.digitSessionManager) {
    console.log('Active config:', window.digitSessionManager.getConfig());
    return window.digitSessionManager.getConfig();
  }
};
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
