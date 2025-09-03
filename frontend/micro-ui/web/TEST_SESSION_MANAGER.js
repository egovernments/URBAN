// TEST SESSION MANAGER - Copy and paste this in browser console to test

console.log('🧪 Testing Session Manager...');

// Simple session manager for testing
const testSessionManager = {
  timeoutMs: 30000, // 30 seconds for quick testing
  warningMs: 15000, // Warning after 15 seconds
  timeoutId: null,
  warningId: null,
  
  start() {
    console.log('✅ Session manager started!');
    console.log('⏰ You will get a warning in 15 seconds');
    console.log('🚪 You will be logged out in 30 seconds');
    
    // Clear any existing timers
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearTimeout(this.warningId);
    
    // Set warning timer
    this.warningId = setTimeout(() => {
      console.log('⚠️ WARNING: Session will expire in 15 seconds!');
      if (confirm('Your session will expire in 15 seconds. Click OK to stay logged in.')) {
        console.log('✅ Session extended!');
        this.start(); // Restart timer
      }
    }, this.warningMs);
    
    // Set logout timer
    this.timeoutId = setTimeout(() => {
      console.log('🚪 SESSION EXPIRED - Logging out...');
      
      // Clear session data
      sessionStorage.clear();
      localStorage.removeItem('Employee.token');
      localStorage.removeItem('Employee.user-info');
      localStorage.removeItem('citizen.token');
      localStorage.removeItem('citizen.user-info');
      
      // Redirect to login
      const isCitizen = window.location.pathname.includes('/citizen');
      const loginPath = isCitizen ? '/digit-ui/citizen/login' : '/digit-ui/employee/user/login';
      
      alert('Session expired! Redirecting to login...');
      window.location.href = loginPath;
    }, this.timeoutMs);
    
    // Reset timer on any activity
    const resetTimer = () => {
      console.log('🔄 Activity detected, resetting timer...');
      this.start();
    };
    
    // Add activity listeners
    ['click', 'keypress', 'mousemove'].forEach(event => {
      document.removeEventListener(event, resetTimer); // Remove old listener
      document.addEventListener(event, resetTimer, { once: true }); // Add new listener (fires once)
    });
  },
  
  stop() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearTimeout(this.warningId);
    console.log('⛔ Session manager stopped');
  }
};

// Check if user is logged in
const hasSession = localStorage.getItem('Employee.token') || localStorage.getItem('citizen.token');

if (hasSession) {
  console.log('🔒 User is logged in, starting session manager...');
  testSessionManager.start();
  
  // Make it globally available
  window.testSessionManager = testSessionManager;
  
  console.log('💡 TIP: Use window.testSessionManager.stop() to stop the timer');
  console.log('💡 TIP: Use window.testSessionManager.start() to restart the timer');
} else {
  console.log('❌ No user session found. Please login first.');
}