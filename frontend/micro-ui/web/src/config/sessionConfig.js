// Session Configuration
// Customize these values based on your requirements

const sessionConfig = {
  // Session timeout in minutes (production: 60 minutes)
  IDLE_TIMEOUT_MINUTES: process.env.REACT_APP_SESSION_TIMEOUT_MINUTES || 60,
  
  // Warning time before session expires in minutes (production: 5 minutes)
  WARNING_BEFORE_TIMEOUT_MINUTES: process.env.REACT_APP_SESSION_WARNING_MINUTES || 5,
  
  // Enable/disable session management (default: true)
  ENABLE_SESSION_MANAGEMENT: process.env.REACT_APP_ENABLE_SESSION_MANAGEMENT !== 'false',
  
  // Enable/disable warning modal (default: true)
  SHOW_WARNING_MODAL: process.env.REACT_APP_SHOW_SESSION_WARNING !== 'false',
  
  // Session check interval in seconds (default: 30 seconds)
  SESSION_CHECK_INTERVAL_SECONDS: process.env.REACT_APP_SESSION_CHECK_INTERVAL || 30,
  
  // Events to track for user activity
  ACTIVITY_EVENTS: [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click'
  ],
  
  // Paths that should not trigger session management
  EXCLUDED_PATHS: [
    '/login',
    '/forgot-password',
    '/reset-password',
    '/language-selection',
    '/select-location',
    '/select-language'
  ],
  
  // Custom messages
  MESSAGES: {
    SESSION_WARNING: 'Your session will expire in {minutes} minutes due to inactivity. Click OK to continue your session.',
    SESSION_EXPIRED: 'Your session has expired due to inactivity. Please login again.',
    SESSION_ERROR: 'Session error occurred. Please login again.',
    NETWORK_ERROR: 'Network error occurred. Please check your connection and try again.'
  }
};

// Helper function to check if current path is excluded
export const isPathExcluded = (pathname) => {
  return sessionConfig.EXCLUDED_PATHS.some(path => pathname.includes(path));
};

// Helper function to get timeout in milliseconds
export const getTimeoutMs = () => {
  return Number(sessionConfig.IDLE_TIMEOUT_MINUTES) * 60 * 1000;
};

// Helper function to get warning time in milliseconds
export const getWarningTimeMs = () => {
  return Number(sessionConfig.WARNING_BEFORE_TIMEOUT_MINUTES) * 60 * 1000;
};

// Helper function to get session check interval in milliseconds
export const getSessionCheckIntervalMs = () => {
  return Number(sessionConfig.SESSION_CHECK_INTERVAL_SECONDS) * 1000;
};

// Helper function to format warning message
export const formatWarningMessage = (minutesRemaining) => {
  return sessionConfig.MESSAGES.SESSION_WARNING.replace('{minutes}', minutesRemaining);
};

export default sessionConfig;