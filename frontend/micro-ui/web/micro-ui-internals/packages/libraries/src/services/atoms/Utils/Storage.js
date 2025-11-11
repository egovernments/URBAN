const localStoreSupport = () => {
  try {
    return "sessionStorage" in window && window["sessionStorage"] !== null;
  } catch (e) {
    return false;
  }
};

const k = (key) => `Digit.${key}`;
const getStorage = (storageClass) => ({
  get: (key) => {
    if (localStoreSupport() && key) {
      let valueInStorage = storageClass.getItem(k(key));
      if (!valueInStorage || valueInStorage === "undefined") {
        return null;
      }
      const item = JSON.parse(valueInStorage);
      if (Date.now() > item.expiry) {
        storageClass.removeItem(k(key));
        return null;
      }
      return item.value;
    } else if (typeof window !== "undefined") {
      return window?.eGov?.Storage && window.eGov.Storage[k(key)].value;
    } else {
      return null;
    }
  },
  set: (key, value, ttl = 86400) => {
    const item = {
      value,
      ttl,
      expiry: Date.now() + ttl * 1000,
    };
    if (localStoreSupport()) {
      try {
        storageClass.setItem(k(key), JSON.stringify(item));
      } catch (error) {
        if (error.name === 'QuotaExceededError') {
          console.warn('Storage quota exceeded. Clearing storage and triggering logout...');

          // Show alert to user
          const alertMessage = 'The system has detected an issue and needs to log you out to prevent further problems. Please login again to continue.';
          if (typeof window !== 'undefined' && window.alert) {
            window.alert(alertMessage);
          }

          // Check if user came from sandbox before clearing storage
          const fromSandbox = window.Digit?.SessionStorage?.get?.('fromSandbox') ||
                            window.sessionStorage?.getItem?.('Digit.fromSandbox');

          // Clear storage
          try {
            window.localStorage.clear();
            window.sessionStorage.clear();
          } catch (clearError) {
            console.error('Failed to clear storage:', clearError);
          }

          // Trigger logout with appropriate redirect
          if (fromSandbox === 'true' || fromSandbox === true) {
            // For sandbox/auto-login users: hard reload to sandbox login page
            window.location.href = 'https://sandbox-prod.digit.org/sandbox-ui/user/login';
          } else if (window.Digit && window.Digit.UserService && typeof window.Digit.UserService.logout === 'function') {
            // Normal logout flow
            window.Digit.UserService.logout();
          } else {
            // Fallback: redirect to citizen page
            window.location.replace('/digit-ui/citizen');
          }
        } else {
          console.error('Error setting storage item:', error);
        }
      }
    } else if (typeof window !== "undefined") {
      window.eGov = window.eGov || {};
      window.eGov.Storage = window.eGov.Storage || {};
      window.eGov.Storage[k(key)] = item;
    }
  },
  del: (key) => {
    if (localStoreSupport()) {
      storageClass.removeItem(k(key));
    } else if (typeof window !== "undefined") {
      window.eGov = window.eGov || {};
      window.eGov.Storage = window.eGov.Storage || {};
      delete window.eGov.Storage[k(key)];
    }
  },
});

export const Storage = getStorage(window.sessionStorage);
export const PersistantStorage = getStorage(window.localStorage);
