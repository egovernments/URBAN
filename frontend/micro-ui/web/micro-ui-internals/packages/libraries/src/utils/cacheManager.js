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
    
    // Fallback to environment variables or stable version
    const fallbackVersion = process.env.REACT_APP_VERSION || 
           process.env.REACT_APP_BUILD_TIME || 
           'dev-build'; // Stable fallback instead of changing timestamp
    this.log('Current version from fallback:', fallbackVersion);
    return fallbackVersion;
  }

  // Check if app version has changed
  static hasVersionChanged() {
    const currentVersion = this.getCurrentVersion();
    const storedVersion = localStorage.getItem(this.APP_VERSION_KEY);
    
    this.log('Version check - Current:', currentVersion, 'Stored:', storedVersion);
    this.log('Build info available:', !!window.DIGIT_UI_BUILD_INFO);
    
    if (!storedVersion) {
      localStorage.setItem(this.APP_VERSION_KEY, currentVersion);
      this.log('No stored version found, storing current version');
      return false;
    }
    
    const changed = storedVersion !== currentVersion;
    if (changed) {
      console.warn('[CacheManager] Version changed detected!', {
        current: currentVersion,
        stored: storedVersion,
        buildInfoAvailable: !!window.DIGIT_UI_BUILD_INFO
      });
    }
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

  // Get all current storage keys (for debugging)
  static getAllStorageKeys() {
    const allLocalStorage = {};
    const allSessionStorage = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      allLocalStorage[key] = localStorage.getItem(key);
    }
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      allSessionStorage[key] = sessionStorage.getItem(key);
    }
    
    return { localStorage: allLocalStorage, sessionStorage: allSessionStorage };
  }

  // Get what data would be preserved during cache clear (for debugging)
  static getPreservedData() {
    const preserveKeys = [
      // Core authentication & user data
      'token', 'user-info', 'tenantId', 'tenant-id',
      'Citizen.token', 'Citizen.user-info', 'Citizen.tenant-id', 'Citizen.tenantId',
      'Employee.token', 'Employee.user-info', 'Employee.tenant-id', 'Employee.tenantId',
      'user_type', 'userType',
      
      // Localization & UI preferences
      'locale', 'Citizen.locale', 'Employee.locale',
      
      // Cache management keys (preserve our own keys)
      'digit-ui-app-version', 'digit-ui-last-update',
      
      // Security & privacy
      'PRIVACY_OBJECT'
    ];
    const preserveSessionKeys = ['User', 'user_type', 'userType', 'Citizen.tenantId', 'Employee.tenantId'];
    
    const localData = {};
    const sessionData = {};
    
    preserveKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) localData[key] = value;
    });
    
    preserveSessionKeys.forEach(key => {
      const value = sessionStorage.getItem(key);
      if (value) sessionData[key] = value;
    });
    
    return { localStorage: localData, sessionStorage: sessionData };
  }

  // Clear all caches
  static async clearAllCaches() {
    try {
      this.log('Starting cache clearing process...');
      
      // Clear localStorage except essential data
      const preserveKeys = [
        // Core authentication & user data
        'token', 'user-info', 'tenantId', 'tenant-id',
        'Citizen.token', 'Citizen.user-info', 'Citizen.tenant-id', 'Citizen.tenantId',
        'Employee.token', 'Employee.user-info', 'Employee.tenant-id', 'Employee.tenantId',
        'user_type', 'userType',
        
        // Localization & UI preferences
        'locale', 'Citizen.locale', 'Employee.locale',
        
        // Cache management keys (preserve our own keys)
        'digit-ui-app-version', 'digit-ui-last-update',
        
        // Security & privacy
        'PRIVACY_OBJECT'
      ];
      const toRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!preserveKeys.some(preserve => key.includes(preserve))) {
          toRemove.push(key);
        }
      }
      
      this.log('Clearing localStorage keys:', toRemove.length, 'items');
      toRemove.forEach(key => localStorage.removeItem(key));

      // Clear sessionStorage except essential data
      const preserveSessionKeys = ['User', 'user_type', 'userType', 'Citizen.tenantId', 'Employee.tenantId'];
      const sessionKeysToRemove = [];
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (!preserveSessionKeys.some(preserve => key.includes(preserve))) {
          sessionKeysToRemove.push(key);
        }
      }
      
      this.log('Clearing sessionStorage keys:', sessionKeysToRemove.length, 'items');
      sessionKeysToRemove.forEach(key => sessionStorage.removeItem(key));

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
      const base = document.baseURI || window.location.origin + window.location.pathname;
      const basePath = base.endsWith('/') ? base : base.substring(0, base.lastIndexOf('/') + 1);
      const url = new URL('version.json', basePath).toString() + '?' + new Date().getTime();
      const response = await fetch(url, {
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
    
    // Exclude API endpoints, analytics scripts, external assets, and common non-chunk URLs
    const isNotApiEndpoint = filename && !this.isApiEndpoint(filename);
    const isNotAnalytics = filename && !this.isAnalyticsScript(filename);
    const isNotExternalAsset = filename && !this.isExternalAsset(filename);
    
    const shouldHandle = hasChunkErrorMessage || (isChunkFile && isNotApiEndpoint && isNotAnalytics && isNotExternalAsset);
    
    if (filename && !shouldHandle) {
      const reason = this.isApiEndpoint(filename) ? 'API endpoint' :
                    this.isAnalyticsScript(filename) ? 'analytics script' :
                    this.isExternalAsset(filename) ? 'external asset' : 'non-chunk source';
      this.log(`Ignoring error from ${reason}:`, filename);
    }
    
    return shouldHandle;
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

  // Check if URL is an API endpoint or analytics script
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

  // Check if URL is from analytics services (should not trigger cache clear)
  static isAnalyticsScript(url) {
    if (!url) return false;
    
    const analyticsPatterns = [
      // Google Analytics & Tag Manager
      /googletagmanager\.com/i,
      /google-analytics\.com/i,
      /googleanalytics\.com/i,
      /analytics\.google\.com/i,
      /gtag/i,
      /gtm\.js/i,
      
      // Matomo
      /matomo/i,
      /piwik/i,
      
      // Microsoft Clarity
      /clarity\.ms/i,
      /c\.clarity\.ms/i,
      /microsoft\.com.*clarity/i,
      
      // Other common analytics
      /hotjar/i,
      /mixpanel/i,
      /segment\./i,
      /analytics/i
    ];
    
    return analyticsPatterns.some(pattern => pattern.test(url));
  }

  // Check if URL is an external asset (CDN, S3, images, etc.)
  static isExternalAsset(url) {
    if (!url) return false;
    
    const externalAssetPatterns = [
      // AWS S3 and CloudFront
      /s3\.amazonaws\.com/i,
      /s3-.*\.amazonaws\.com/i,
      /.*\.s3\.amazonaws\.com/i,
      /.*\.s3-.*\.amazonaws\.com/i,
      /cloudfront\.net/i,
      /.*\.cloudfront\.net/i,
      
      // Common CDNs
      /cdn\.jsdelivr\.net/i,
      /unpkg\.com/i,
      /cdnjs\.cloudflare\.com/i,
      /maxcdn\.bootstrapcdn\.com/i,
      /fonts\.googleapis\.com/i,
      /fonts\.gstatic\.com/i,
      
      // DIGIT specific asset domains
      /unified-demo\.digit\.org.*asset/i,
      /digit\.org.*asset/i,
      /egov.*asset/i,
      
      // Image and media files (any domain)
      /\.(png|jpg|jpeg|gif|svg|ico|webp|bmp|tiff)(\?|$)/i,
      /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?|$)/i,
      /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)(\?|$)/i,
      /\.(ttf|woff|woff2|eot|otf)(\?|$)/i,
      
      // Common asset paths
      /\/assets\//i,
      /\/static\/media\//i,
      /\/images\//i,
      /\/img\//i,
      /\/logos?\//i,
      /\/icons?\//i,
      /\/fonts?\//i
    ];
    
    return externalAssetPatterns.some(pattern => pattern.test(url));
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
    const currentVersion = this.getCurrentVersion();
    if (currentVersion === 'dev-build') {
      this.log('Skipping update checker in dev-build environment');
      return;
    }

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
        getPreservedData: () => this.getPreservedData(),
        getAllStorageKeys: () => this.getAllStorageKeys(),
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