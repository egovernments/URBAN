// Standalone Session Manager - Works without React Router dependency

console.log('🔥 Session Manager file loaded!');

class SessionManager {
  constructor(config = {}) {
    this.timeoutMinutes = config.timeoutMinutes || 2; // 2 minutes for testing
    this.warningMinutes = config.warningMinutes || 0.5; // 30 seconds warning
    this.timeoutMs = this.timeoutMinutes * 60 * 1000;
    this.warningMs = this.warningMinutes * 60 * 1000;
    this.timeoutId = null;
    this.warningTimeoutId = null;
    this.lastActivity = Date.now();
    this.isActive = false;
    
    console.log('🚀 SessionManager initialized:', {
      timeoutMinutes: this.timeoutMinutes,
      warningMinutes: this.warningMinutes
    });
  }

  init() {
    if (this.isActive) return;
    
    // Check if user is logged in
    if (!this.isUserLoggedIn()) {
      console.log('❌ No user logged in, session manager not started');
      return;
    }

    console.log('✅ Starting session manager');
    this.isActive = true;
    this.setupEventListeners();
    this.resetTimer();
    this.setupPeriodicCheck();
  }

  isUserLoggedIn() {
    const employeeToken = localStorage.getItem('Employee.token');
    const citizenToken = localStorage.getItem('citizen.token');
    return !!(employeeToken || citizenToken);
  }

  setupEventListeners() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, this.handleActivity, { passive: true });
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    console.log('📡 Event listeners attached');
  }

  handleActivity = () => {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivity;
    
    // Debounce - only reset if more than 1 second has passed
    if (timeSinceLastActivity > 1000) {
      this.resetTimer();
    }
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      const now = Date.now();
      const timeSinceLastActivity = now - this.lastActivity;
      
      if (timeSinceLastActivity > this.timeoutMs) {
        console.log('⏰ Session expired while tab was inactive');
        this.handleTimeout();
      } else {
        this.resetTimer();
      }
    }
  }

  resetTimer() {
    // Clear existing timeouts
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }

    this.lastActivity = Date.now();
    
    const warningTime = this.timeoutMs - this.warningMs;
    
    console.log('⏱️ Timer reset at:', new Date().toLocaleTimeString(), {
      warningIn: `${warningTime / 1000} seconds`,
      logoutIn: `${this.timeoutMs / 1000} seconds`
    });

    // Set warning timeout
    this.warningTimeoutId = setTimeout(() => {
      this.showWarning();
    }, warningTime);

    // Set logout timeout
    this.timeoutId = setTimeout(() => {
      this.handleTimeout();
    }, this.timeoutMs);
  }

  showWarning() {
    console.log('⚠️ Showing session warning');
    
    const remainingMinutes = Math.round(this.warningMs / 60000);
    const message = `Your session will expire in ${remainingMinutes} minute(s) due to inactivity. Click OK to continue your session.`;
    
    if (window.confirm(message)) {
      console.log('✅ User extended session');
      this.resetTimer();
    } else {
      console.log('❌ User did not extend session');
    }
  }

  handleTimeout() {
    console.log('🚪 Session timeout - logging out');
    
    // Clear all session data
    this.clearSession();
    
    // Redirect to login
    const currentPath = window.location.pathname;
    const isCitizen = currentPath.includes('/citizen');
    const loginPath = isCitizen 
      ? '/digit-ui/citizen/login' 
      : '/digit-ui/employee/user/login';
    
    // Set session timeout flag
    sessionStorage.setItem('session-timeout', 'true');
    
    // Redirect
    window.location.href = loginPath;
  }

  clearSession() {
    // Clear session storage
    sessionStorage.clear();
    
    // Clear local storage auth data
    const authKeys = [
      'Employee.token',
      'Employee.user-info',
      'Employee.tenant-id',
      'citizen.token',
      'citizen.user-info',
      'citizen.tenant-id',
      'User'
    ];
    
    authKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // Clear Digit user service if available
    if (window.Digit && window.Digit.UserService) {
      window.Digit.UserService.setUser(null);
    }
  }

  setupPeriodicCheck() {
    // Check session validity every 30 seconds
    setInterval(() => {
      if (!this.isUserLoggedIn()) {
        console.log('🔒 User logged out, stopping session manager');
        this.destroy();
      }
    }, 30000);
  }

  destroy() {
    this.isActive = false;
    
    // Clear timeouts
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
    }

    // Remove event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.removeEventListener(event, this.handleActivity);
    });
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
    console.log('💀 Session manager destroyed');
  }
}

// Create and export singleton instance
const sessionManager = new SessionManager({
  timeoutMinutes: 2,  // 2 minutes for testing
  warningMinutes: 0.5 // 30 seconds warning
});

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => sessionManager.init(), 2000); // Wait 2 seconds for app to load
  });
} else {
  setTimeout(() => sessionManager.init(), 2000); // Wait 2 seconds for app to load
}

// Check on route changes
let lastPath = window.location.pathname;
setInterval(() => {
  const currentPath = window.location.pathname;
  if (currentPath !== lastPath) {
    lastPath = currentPath;
    // Reinitialize if navigated to a non-login page
    if (!currentPath.includes('/login') && !currentPath.includes('/language-selection')) {
      sessionManager.init();
    }
  }
}, 1000);

// Export for manual control
window.sessionManager = sessionManager;
export default sessionManager;