/**
 * IndexedDB Utility for Localization Storage
 *
 * Provides async storage for localization data with automatic fallback to localStorage.
 * Offers significantly larger storage capacity (50MB-2GB) compared to localStorage (5-10MB).
 *
 * Database Schema:
 * - Database Name: eGovLocalization
 * - Store Name: localizationStore
 * - Key Structure: locale_module (e.g., "en_IN_rainmaker-common")
 * - Value Structure: {
 *     locale: string,
 *     module: string,
 *     data: array,
 *     timestamp: number,
 *     version: number
 *   }
 */

const DB_NAME = 'eGovLocalization';
const STORE_NAME = 'localizationStore';
const DB_VERSION = 1;

class IndexedDBManager {
  constructor() {
    this.db = null;
    this.isSupported = this.checkSupport();
    this.initPromise = null;
  }

  /**
   * Check if IndexedDB is supported in the browser
   */
  checkSupport() {
    try {
      return typeof indexedDB !== 'undefined' && indexedDB !== null;
    } catch (e) {
      console.warn('Log => ** [IndexedDB] Not supported in this browser:', e);
      return false;
    }
  }

  /**
   * Initialize IndexedDB connection
   * Returns a promise that resolves when DB is ready
   */
  init() {
    if (!this.isSupported) {
      console.warn('Log => ** [IndexedDB] Not supported, will use localStorage fallback');
      return Promise.resolve(null);
    }

    // Return existing promise if init already in progress
    if (this.initPromise) {
      return this.initPromise;
    }

    // Return immediately if already initialized
    if (this.db) {
      return Promise.resolve(this.db);
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Log => ** [IndexedDB] Failed to open database:', request.error);
        this.isSupported = false;
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('Log => ** [IndexedDB] Database opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });

          // Create indexes for efficient querying
          objectStore.createIndex('locale', 'locale', { unique: false });
          objectStore.createIndex('module', 'module', { unique: false });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });

          console.log('Log => ** [IndexedDB] Object store created with indexes');
        }
      };
    });

    return this.initPromise;
  }

  /**
   * Generate composite key from locale and module
   */
  _generateKey(locale, module) {
    return `${locale}_${module}`;
  }

  /**
   * Store localization data for a specific locale and module
   *
   * @param {string} locale - Language locale (e.g., "en_IN")
   * @param {string} module - Module name (e.g., "rainmaker-common")
   * @param {array} data - Localization messages array
   * @returns {Promise<boolean>} Success status
   */
  async setLocalization(locale, module, data) {
    if (!this.isSupported) {
      return false;
    }

    try {
      await this.init();

      if (!this.db) {
        return false;
      }

      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const record = {
        key: this._generateKey(locale, module),
        locale: locale,
        module: module,
        data: data,
        timestamp: Date.now(),
        version: 1
      };

      const request = store.put(record);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          console.log(`Log => ** [IndexedDB] Saved localization: ${locale}/${module} (${data.length || 0} entries)`);
          resolve(true);
        };

        request.onerror = () => {
          console.error('Log => ** [IndexedDB] Failed to save localization:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error in setLocalization:', error);
      return false;
    }
  }

  /**
   * Retrieve localization data for a specific locale and module
   *
   * @param {string} locale - Language locale
   * @param {string} module - Module name (use 'all' to get all modules for locale)
   * @returns {Promise<array|null>} Localization data or null
   */
  async getLocalization(locale, module) {
    if (!this.isSupported) {
      return null;
    }

    try {
      await this.init();

      if (!this.db) {
        return null;
      }

      // If module is 'all', get all modules for this locale
      if (module === 'all') {
        return await this.getAllLocalizationsForLocale(locale);
      }

      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(this._generateKey(locale, module));

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const result = request.result;
          if (result && result.data) {
            console.log(`Log => ** [IndexedDB] Retrieved localization: ${locale}/${module} (${result.data.length} entries)`);
            resolve(result.data);
          } else {
            console.log(`Log => ** [IndexedDB] No data found for: ${locale}/${module}`);
            resolve(null);
          }
        };

        request.onerror = () => {
          console.error('Log => ** [IndexedDB] Failed to retrieve localization:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error in getLocalization:', error);
      return null;
    }
  }

  /**
   * Get all localization data for a specific locale (all modules combined)
   *
   * @param {string} locale - Language locale
   * @returns {Promise<array|null>} Combined localization data
   */
  async getAllLocalizationsForLocale(locale) {
    if (!this.isSupported) {
      return null;
    }

    try {
      await this.init();

      if (!this.db) {
        return null;
      }

      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('locale');
      const request = index.getAll(locale);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const results = request.result;
          if (results && results.length > 0) {
            // Combine all data arrays from different modules
            const combinedData = results.reduce((acc, record) => {
              if (record.data && Array.isArray(record.data)) {
                return [...acc, ...record.data];
              }
              return acc;
            }, []);

            console.log(`Log => ** [IndexedDB] Retrieved all localizations for ${locale}: ${results.length} modules, ${combinedData.length} total entries`);
            resolve(combinedData);
          } else {
            console.log(`Log => ** [IndexedDB] No localizations found for locale: ${locale}`);
            resolve(null);
          }
        };

        request.onerror = () => {
          console.error('Log => ** [IndexedDB] Failed to retrieve all localizations:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error in getAllLocalizationsForLocale:', error);
      return null;
    }
  }

  /**
   * Delete localization data for a specific locale and module
   *
   * @param {string} locale - Language locale
   * @param {string} module - Module name
   * @returns {Promise<boolean>} Success status
   */
  async deleteLocalization(locale, module) {
    if (!this.isSupported) {
      return false;
    }

    try {
      await this.init();

      if (!this.db) {
        return false;
      }

      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(this._generateKey(locale, module));

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          console.log(`Log => ** [IndexedDB] Deleted localization: ${locale}/${module}`);
          resolve(true);
        };

        request.onerror = () => {
          console.error('Log => ** [IndexedDB] Failed to delete localization:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error in deleteLocalization:', error);
      return false;
    }
  }

  /**
   * Clear all localization data from IndexedDB
   *
   * @returns {Promise<boolean>} Success status
   */
  async clearAllLocalizations() {
    if (!this.isSupported) {
      return false;
    }

    try {
      await this.init();

      if (!this.db) {
        return false;
      }

      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          console.log('Log => ** [IndexedDB] Cleared all localizations');
          resolve(true);
        };

        request.onerror = () => {
          console.error('Log => ** [IndexedDB] Failed to clear localizations:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error in clearAllLocalizations:', error);
      return false;
    }
  }

  /**
   * Clean up old localization data based on age
   *
   * @param {number} maxAge - Maximum age in milliseconds (default: 7 days)
   * @returns {Promise<number>} Number of entries deleted
   */
  async cleanupOldData(maxAge = 7 * 24 * 60 * 60 * 1000) {
    if (!this.isSupported) {
      return 0;
    }

    try {
      await this.init();

      if (!this.db) {
        return 0;
      }

      const cutoffTime = Date.now() - maxAge;
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const request = index.openCursor(IDBKeyRange.upperBound(cutoffTime));

      let deletedCount = 0;

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            cursor.delete();
            deletedCount++;
            cursor.continue();
          } else {
            if (deletedCount > 0) {
              console.log(`Log => ** [IndexedDB] Cleaned up ${deletedCount} old entries`);
            }
            resolve(deletedCount);
          }
        };

        request.onerror = () => {
          console.error('Log => ** [IndexedDB] Failed to cleanup old data:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error in cleanupOldData:', error);
      return 0;
    }
  }

  /**
   * Get storage usage statistics
   *
   * @returns {Promise<object>} Storage statistics
   */
  async getStorageStats() {
    if (!this.isSupported) {
      return { supported: false };
    }

    try {
      await this.init();

      if (!this.db) {
        return { supported: false };
      }

      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const countRequest = store.count();

      return new Promise((resolve, reject) => {
        countRequest.onsuccess = () => {
          const stats = {
            supported: true,
            totalEntries: countRequest.result,
            database: DB_NAME,
            version: DB_VERSION
          };

          // Try to get browser storage estimate if available
          if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
              stats.quota = estimate.quota;
              stats.usage = estimate.usage;
              stats.percentUsed = ((estimate.usage / estimate.quota) * 100).toFixed(2);
              resolve(stats);
            }).catch(() => {
              resolve(stats);
            });
          } else {
            resolve(stats);
          }
        };

        countRequest.onerror = () => {
          reject(countRequest.error);
        };
      });
    } catch (error) {
      console.error('Log => ** [IndexedDB] Error getting storage stats:', error);
      return { supported: false, error: error.message };
    }
  }
}

// Create singleton instance
const indexedDBManager = new IndexedDBManager();

// Export singleton instance and class
export default indexedDBManager;
export { IndexedDBManager };
