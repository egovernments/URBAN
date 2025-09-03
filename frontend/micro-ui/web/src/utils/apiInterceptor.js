// API Interceptor for handling session timeouts and authentication errors

const setupApiInterceptor = () => {
  // Store the original fetch
  const originalFetch = window.fetch;

  // Override fetch
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      
      // Check for authentication errors
      if (response.status === 401 || response.status === 403) {
        handleAuthError(response);
      }
      
      return response;
    } catch (error) {
      // Check if error is due to network issues after long idle
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        // Possibly a session timeout or network issue
        const lastActivity = localStorage.getItem('lastActivity');
        if (lastActivity) {
          const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
          // If more than 1 hour since last activity, assume session timeout
          if (timeSinceLastActivity > 60 * 60 * 1000) {
            handleSessionTimeout();
          }
        }
      }
      throw error;
    }
  };

  // Also intercept XMLHttpRequest if your app uses it
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(...args) {
    this._requestURL = args[1];
    return originalXHROpen.apply(this, args);
  };

  XMLHttpRequest.prototype.send = function(...args) {
    this.addEventListener('load', function() {
      if (this.status === 401 || this.status === 403) {
        handleAuthError({ status: this.status, url: this._requestURL });
      }
    });
    
    this.addEventListener('error', function() {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > 60 * 60 * 1000) {
          handleSessionTimeout();
        }
      }
    });
    
    return originalXHRSend.apply(this, args);
  };
};

const handleAuthError = (response) => {
  console.warn('Authentication error detected:', response.status);
  
  // Don't redirect if already on login page
  if (window.location.pathname.includes('/login')) {
    return;
  }
  
  // Clear session data
  clearSessionData();
  
  // Set session timeout flag
  sessionStorage.setItem('session-timeout', 'true');
  sessionStorage.setItem('auth-error', response.status.toString());
  
  // Redirect to login
  redirectToLogin();
};

const handleSessionTimeout = () => {
  console.warn('Session timeout detected');
  
  // Don't redirect if already on login page
  if (window.location.pathname.includes('/login')) {
    return;
  }
  
  // Clear session data
  clearSessionData();
  
  // Set session timeout flag
  sessionStorage.setItem('session-timeout', 'true');
  
  // Redirect to login
  redirectToLogin();
};

const clearSessionData = () => {
  // Clear all auth related data
  sessionStorage.clear();
  localStorage.removeItem("Employee.token");
  localStorage.removeItem("Employee.user-info");
  localStorage.removeItem("Employee.tenant-id");
  localStorage.removeItem("citizen.token");
  localStorage.removeItem("citizen.user-info");
  localStorage.removeItem("citizen.tenant-id");
  localStorage.removeItem("locale");
  localStorage.removeItem("Employee.locale");
  
  // Clear Digit user service
  if (window.Digit && window.Digit.UserService) {
    window.Digit.UserService.setUser(null);
  }
};

const redirectToLogin = () => {
  const isCitizen = window.location.pathname.includes("/citizen");
  const loginPath = isCitizen ? "/digit-ui/citizen/login" : "/digit-ui/employee/user/login";
  
  // Use replace to prevent back button issues
  window.location.replace(loginPath);
};

// Track user activity
const trackActivity = () => {
  localStorage.setItem('lastActivity', Date.now().toString());
};

// Setup activity tracking
const setupActivityTracking = () => {
  const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, trackActivity, { passive: true });
  });
  
  // Track initial activity
  trackActivity();
};

// Export setup function
export const initializeApiInterceptor = () => {
  setupApiInterceptor();
  setupActivityTracking();
};

export default initializeApiInterceptor;