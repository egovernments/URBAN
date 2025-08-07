/**
 * Cache Management Utility
 * Provides functions to manage and clear cache data to resolve caching issues
 */

export const CacheManager = {
  /**
   * Clear all Digit-related cache from localStorage
   */
  clearAllCache: () => {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('Digit.'));
      keys.forEach(key => {
        localStorage.removeItem(key);
      });
      console.log(`Cleared ${keys.length} cache entries`);
      return { success: true, clearedCount: keys.length };
    } catch (error) {
      console.error('Error clearing all cache:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Clear only localization cache
   */
  clearLocalizationCache: () => {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('Digit.Locale.'));
      keys.forEach(key => {
        localStorage.removeItem(key);
      });
      console.log(`Cleared ${keys.length} localization cache entries`);
      return { success: true, clearedCount: keys.length };
    } catch (error) {
      console.error('Error clearing localization cache:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Clear cache for a specific locale
   */
  clearLocaleCache: (locale) => {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(`Digit.Locale.${locale}`)
      );
      keys.forEach(key => {
        localStorage.removeItem(key);
      });
      console.log(`Cleared ${keys.length} cache entries for locale: ${locale}`);
      return { success: true, clearedCount: keys.length };
    } catch (error) {
      console.error(`Error clearing cache for locale ${locale}:`, error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Clear session storage cache
   */
  clearSessionCache: () => {
    try {
      const keys = Object.keys(sessionStorage).filter(key => key.startsWith('Digit.'));
      keys.forEach(key => {
        sessionStorage.removeItem(key);
      });
      console.log(`Cleared ${keys.length} session cache entries`);
      return { success: true, clearedCount: keys.length };
    } catch (error) {
      console.error('Error clearing session cache:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Validate cache integrity and remove corrupted entries
   */
  validateAndCleanCache: () => {
    try {
      let corruptedCount = 0;
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
              corruptedCount++;
            }
          }
        } catch (error) {
          console.warn(`Removing unparseable cache entry: ${key}`);
          localStorage.removeItem(key);
          corruptedCount++;
        }
      });
      
      console.log(`Cache validation complete. Removed ${corruptedCount} corrupted entries`);
      return { success: true, corruptedCount };
    } catch (error) {
      console.error('Error during cache validation:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get cache statistics
   */
  getCacheStats: () => {
    try {
      const allKeys = Object.keys(localStorage);
      const digitKeys = allKeys.filter(key => key.startsWith('Digit.'));
      const localeKeys = digitKeys.filter(key => key.startsWith('Digit.Locale.'));
      
      const stats = {
        totalEntries: allKeys.length,
        digitEntries: digitKeys.length,
        localeEntries: localeKeys.length,
        cacheSize: 0
      };
      
      // Calculate approximate cache size
      digitKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          stats.cacheSize += value.length;
        }
      });
      
      return stats;
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { error: error.message };
    }
  },

  /**
   * Force refresh the application by clearing cache and reloading
   */
  forceRefresh: () => {
    try {
      CacheManager.clearAllCache();
      CacheManager.clearSessionCache();
      console.log('Cache cleared, reloading application...');
      window.location.reload();
    } catch (error) {
      console.error('Error during force refresh:', error);
    }
  },

  /**
   * Clear cache and redirect to login
   */
  clearCacheAndRedirectToLogin: () => {
    try {
      CacheManager.clearAllCache();
      CacheManager.clearSessionCache();
      console.log('Cache cleared, redirecting to login...');
      window.location.href = '/digit-ui/citizen/login';
    } catch (error) {
      console.error('Error during cache clear and redirect:', error);
    }
  }
};

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  window.DigitCacheManager = CacheManager;
}

export default CacheManager; 