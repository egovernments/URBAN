// Cache Management Utility for handling stale cache issues
export class CacheManager {
  static APP_VERSION_KEY = 'digit-ui-app-version';
  static LAST_UPDATE_KEY = 'digit-ui-last-update';
  static UPDATE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
  static DEBUG_ENABLED = false; // Can be enabled via console: window.Digit.CacheManager.enableDebug()

  // Debug logging utility
  static log(...args) {
    if (this.DEBUG_ENABLED || window.Digit?.CacheDebug) {
      console.log('[CacheManager]', ...args);
    }
  }

  static warn(...args) {
    if (this.DEBUG_ENABLED || window.Digit?.CacheDebug) {
      console.warn('[CacheManager]', ...args);
    }
  }

  // Enable/disable debug logging
  static enableDebug() {
    this.DEBUG_ENABLED = true;
    window.Digit = window.Digit || {};
    window.Digit.CacheDebug = true;
    this.log('Debug logging enabled. Use CacheManager.disableDebug() to disable.');
  }

  static disableDebug() {
    this.DEBUG_ENABLED = false;
    if (window.Digit) {
      window.Digit.CacheDebug = false;
    }
    console.log('[CacheManager] Debug logging disabled.');
  }

  // Get current app version from build info or fallback
  static getCurrentVersion() {
    // Try to get from build-info.js first
    if (window.DIGIT_UI_BUILD_INFO) {
      const version = window.DIGIT_UI_BUILD_INFO.buildId || window.DIGIT_UI_BUILD_INFO.buildTime;
      this.log('Current version from build-info:', version);
      return version;
    }
    
    // Fallback to environment variables or current time
    const fallbackVersion = process.env.REACT_APP_VERSION || 
           process.env.REACT_APP_BUILD_TIME || 
           new Date().getTime().toString();
    this.log('Current version from fallback:', fallbackVersion);
    return fallbackVersion;
  }

  // Check if app version has changed
  static hasVersionChanged() {
    const currentVersion = this.getCurrentVersion();
    const storedVersion = localStorage.getItem(this.APP_VERSION_KEY);
    
    this.log('Version check - Current:', currentVersion, 'Stored:', storedVersion);
    
    if (!storedVersion) {
      localStorage.setItem(this.APP_VERSION_KEY, currentVersion);
      this.log('No stored version found, storing current version');
      return false;
    }
    
    const changed = storedVersion !== currentVersion;
    this.log('Version changed:', changed);
    return changed;
  }

  // Update stored version
  static updateStoredVersion() {
    const currentVersion = this.getCurrentVersion();
    const timestamp = Date.now().toString();
    localStorage.setItem(this.APP_VERSION_KEY, currentVersion);
    localStorage.setItem(this.LAST_UPDATE_KEY, timestamp);
    this.log('Updated stored version:', currentVersion, 'at', new Date(parseInt(timestamp)));
  }

  // Clear all caches
  static async clearAllCaches() {
    try {
      this.log('Starting cache clearing process...');
      
      // Clear localStorage except essential data
      const preserveKeys = ['token', 'user-info', 'tenantId', 'Employee.tenantId'];
      const toRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!preserveKeys.some(preserve => key.includes(preserve))) {
          toRemove.push(key);
        }
      }
      
      this.log('Clearing localStorage keys:', toRemove.length, 'items');
      toRemove.forEach(key => localStorage.removeItem(key));

      // Clear sessionStorage
      this.log('Clearing sessionStorage');
      sessionStorage.clear();

      // Clear browser caches if available
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        this.log('Clearing browser caches:', cacheNames.length, 'caches');
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      console.log('Cache cleared successfully');
      this.log('Cache clearing completed successfully');
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      this.log('Error clearing cache:', error);
      return false;
    }
  }

  // Check for updates from server
  static async checkForUpdates() {
    this.log('Checking for updates from server...');
    try {
      const response = await fetch('/version.json?' + new Date().getTime(), {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const serverVersion = data.version || data.buildTime;
        const localVersion = localStorage.getItem(this.APP_VERSION_KEY);
        
        this.log('Server version:', serverVersion, 'Local version:', localVersion);
        
        if (localVersion && serverVersion && localVersion !== serverVersion) {
          this.log('Update available! Server:', serverVersion, 'Local:', localVersion);
          return { hasUpdate: true, newVersion: serverVersion };
        } else {
          this.log('No updates available');
        }
      } else {
        this.log('Version check response not OK:', response.status);
      }
    } catch (error) {
      console.log('Version check failed, using fallback method');
      this.log('Version check error:', error);
    }
    
    return { hasUpdate: false };
  }

  // Handle chunk load errors
  static setupChunkErrorHandler() {
    this.log('Setting up chunk error handlers');
    window.addEventListener('error', (event) => {
      const { message, filename, lineno, colno } = event;
      
      this.log('Error event detected:', { message, filename, lineno, colno });
      
      // Only handle JavaScript chunk loading errors, not API/network errors
      if (this.isChunkLoadingError(message, filename, event)) {
        console.warn('Chunk loading error detected, clearing cache and reloading');
        this.log('Chunk loading error confirmed, handling...');
        this.handleChunkError();
      }
    });

    // Handle unhandled promise rejections (common with dynamic imports)
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      
      this.log('Unhandled rejection detected:', error);
      
      if (error && this.isChunkPromiseError(error)) {
        console.warn('Chunk loading promise rejection, clearing cache and reloading');
        this.log('Chunk promise error confirmed, handling...');
        this.handleChunkError();
        event.preventDefault();
      }
    });
  }

  // More precise chunk error detection
  static isChunkLoadingError(message, filename, event) {
    // Check for specific chunk loading error patterns
    const chunkErrorPatterns = [
      /Loading chunk \d+ failed/i,
      /ChunkLoadError/i,
      /Loading CSS chunk \d+ failed/i,
      /Failed to import.*chunk/i
    ];
    
    // Check message patterns
    const hasChunkErrorMessage = chunkErrorPatterns.some(pattern => 
      pattern.test(message)
    );
    
    // Check if filename indicates a webpack chunk (not API endpoint)
    const isChunkFile = filename && (
      /\/static\/js\/.*\.chunk\.js$/i.test(filename) ||
      /\/static\/css\/.*\.chunk\.css$/i.test(filename) ||
      /\.chunk\.[a-f0-9]+\.js$/i.test(filename) ||
      /\.chunk\.[a-f0-9]+\.css$/i.test(filename)
    );
    
    // Exclude API endpoints and common non-chunk URLs
    const isNotApiEndpoint = filename && !this.isApiEndpoint(filename);
    
    return hasChunkErrorMessage || (isChunkFile && isNotApiEndpoint);
  }

  // Check if error is from chunk promise rejection
  static isChunkPromiseError(error) {
    if (!error) return false;
    
    const chunkPromisePatterns = [
      /Loading chunk \d+ failed/i,
      /ChunkLoadError/i,
      /Failed to import.*chunk/i,
      /Cannot resolve module.*chunk/i
    ];
    
    return chunkPromisePatterns.some(pattern => 
      pattern.test(error.message || '') || 
      pattern.test(error.toString())
    ) && error.name !== 'TypeError'; // Avoid API fetch errors
  }

  // Check if URL is an API endpoint
  static isApiEndpoint(url) {
    const apiPatterns = [
      /\/api\//i,
      /\/v1\//i,
      /\/v2\//i,
      /\/rest\//i,
      /\/graphql/i,
      /\/egov-/i,           // eGov specific API patterns
      /\/user\//i,
      /\/localization\//i,
      /\/mdms\//i,
      /\/workflow\//i,
      /\/filestore\//i,
      /\/pdf\//i,
      /\/payment\//i,
      /\/collection\//i,
      /\/billing\//i,
      /\/property\//i,
      /\/tl-services\//i,
      /\/ws-services\//i,
      /\/sw-services\//i,
      /\/pt-services\//i,
      /\/rainmaker\//i,
      /\.(json|xml)(\?|$)/i  // API response files
    ];
    
    return apiPatterns.some(pattern => pattern.test(url));
  }

  // Handle chunk loading errors
  static async handleChunkError() {
    try {
      await this.clearAllCaches();
      this.showUpdateNotification('App has been updated. Reloading...', 2000);
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error handling chunk error:', error);
      window.location.reload();
    }
  }

  // Show update notification
  static showUpdateNotification(message, duration = 5000) {
    // Check if notification already exists
    if (document.getElementById('cache-update-notification')) {
      return;
    }

    const notification = document.createElement('div');
    notification.id = 'cache-update-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 16px 24px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add CSS animation
    if (!document.getElementById('cache-notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'cache-notification-styles';
      styles.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
  }

  // Start periodic update checks
  static startUpdateChecker() {
    // Check immediately on app start
    setTimeout(() => this.performUpdateCheck(), 5000);
    
    // Then check periodically
    setInterval(() => this.performUpdateCheck(), this.UPDATE_CHECK_INTERVAL);
    
    // Check when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => this.performUpdateCheck(), 1000);
      }
    });
  }

  // Perform update check
  static async performUpdateCheck() {
    const { hasUpdate, newVersion } = await this.checkForUpdates();
    
    if (hasUpdate) {
      this.showUpdateNotification(
        'A new version is available. Click to refresh.',
        0 // Don't auto-hide
      );
      
      // Make notification clickable
      const notification = document.getElementById('cache-update-notification');
      if (notification) {
        notification.style.cursor = 'pointer';
        notification.onclick = () => {
          this.clearAllCaches().then(() => {
            window.location.reload();
          });
        };
      }
      
      // Auto-refresh after 30 seconds if user doesn't click
      setTimeout(() => {
        this.clearAllCaches().then(() => {
          window.location.reload();
        });
      }, 30000);
    }
  }

  // Initialize cache manager
  static init() {
    console.log('[CacheManager] Initializing cache manager...');
    this.log('Cache manager starting initialization');
    
    // Setup error handlers
    this.setupChunkErrorHandler();
    
    // Check for version changes on app start
    if (this.hasVersionChanged()) {
      console.log('App version changed, clearing cache');
      this.log('Version changed detected, clearing cache...');
      this.clearAllCaches().then(() => {
        this.updateStoredVersion();
      });
    } else {
      this.log('No version change detected');
      this.updateStoredVersion();
    }
    
    // Start update checker
    this.log('Starting periodic update checker');
    this.startUpdateChecker();
    
    // Make debug methods available globally
    if (window.Digit) {
      window.Digit.CacheManager = {
        enableDebug: () => this.enableDebug(),
        disableDebug: () => this.disableDebug(),
        getCurrentVersion: () => this.getCurrentVersion(),
        checkForUpdates: () => this.checkForUpdates(),
        clearCache: () => this.clearAllCaches(),
        getStatus: () => ({
          currentVersion: this.getCurrentVersion(),
          storedVersion: localStorage.getItem(this.APP_VERSION_KEY),
          lastUpdate: localStorage.getItem(this.LAST_UPDATE_KEY),
          debugEnabled: this.DEBUG_ENABLED
        })
      };
    }
    
    console.log('[CacheManager] Cache manager initialized successfully');
  }
}

export default CacheManager;