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
    try {
      if (localStoreSupport() && key) {
        let valueInStorage = storageClass.getItem(k(key));
        if (!valueInStorage || valueInStorage === "undefined") {
          return null;
        }
        
        // Try to parse the stored value
        let item;
        try {
          item = JSON.parse(valueInStorage);
        } catch (parseError) {
          console.warn(`Failed to parse cached data for key ${key}, removing corrupted entry:`, parseError);
          storageClass.removeItem(k(key));
          return null;
        }
        
        // Check if the item has the expected structure
        if (!item || typeof item !== 'object' || !item.hasOwnProperty('expiry') || !item.hasOwnProperty('value')) {
          console.warn(`Invalid cache structure for key ${key}, removing corrupted entry`);
          storageClass.removeItem(k(key));
          return null;
        }
        
        if (Date.now() > item.expiry) {
          storageClass.removeItem(k(key));
          return null;
        }
        return item.value;
      } else if (typeof window !== "undefined") {
        const eGovStorage = window?.eGov?.Storage;
        if (eGovStorage && eGovStorage[k(key)]) {
          const item = eGovStorage[k(key)];
          if (Date.now() > item.expiry) {
            delete eGovStorage[k(key)];
            return null;
          }
          return item.value;
        }
        return null;
      } else {
        return null;
      }
    } catch (error) {
      console.warn(`Error retrieving data from storage for key ${key}:`, error);
      // Try to clean up corrupted entry
      try {
        if (localStoreSupport()) {
          storageClass.removeItem(k(key));
        } else if (typeof window !== "undefined" && window?.eGov?.Storage) {
          delete window.eGov.Storage[k(key)];
        }
      } catch (cleanupError) {
        console.warn(`Error cleaning up corrupted storage entry for key ${key}:`, cleanupError);
      }
      return null;
    }
  },
  set: (key, value, ttl = 86400) => {
    try {
      const item = {
        value,
        ttl,
        expiry: Date.now() + ttl * 1000,
      };
      if (localStoreSupport()) {
        storageClass.setItem(k(key), JSON.stringify(item));
      } else if (typeof window !== "undefined") {
        window.eGov = window.eGov || {};
        window.eGov.Storage = window.eGov.Storage || {};
        window.eGov.Storage[k(key)] = item;
      }
    } catch (error) {
      console.warn(`Error setting data in storage for key ${key}:`, error);
    }
  },
  del: (key) => {
    try {
      if (localStoreSupport()) {
        storageClass.removeItem(k(key));
      } else if (typeof window !== "undefined") {
        window.eGov = window.eGov || {};
        window.eGov.Storage = window.eGov.Storage || {};
        delete window.eGov.Storage[k(key)];
      }
    } catch (error) {
      console.warn(`Error deleting data from storage for key ${key}:`, error);
    }
  },
});

export const Storage = getStorage(window.sessionStorage);
export const PersistantStorage = getStorage(window.localStorage);
