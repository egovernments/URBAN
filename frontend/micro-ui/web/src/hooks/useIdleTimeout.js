import { useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import sessionConfig, { 
  getTimeoutMs, 
  getWarningTimeMs, 
  formatWarningMessage 
} from '../config/sessionConfig';

const useIdleTimeout = (timeoutMinutes = sessionConfig.IDLE_TIMEOUT_MINUTES) => {
  const history = useHistory();
  const timeoutIdRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const warningTimeoutRef = useRef(null);
  
  const TIMEOUT_MS = timeoutMinutes * 60 * 1000;
  const WARNING_BEFORE_MS = getWarningTimeMs();

  console.log('🔍 useIdleTimeout initialized with:', {
    timeoutMinutes,
    TIMEOUT_MS,
    WARNING_BEFORE_MS,
    sessionConfig
  });

  const clearAllTimeouts = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearAllTimeouts();
    
    // Clear all session storage
    sessionStorage.clear();
    localStorage.removeItem("Employee.token");
    localStorage.removeItem("Employee.user-info");
    localStorage.removeItem("Employee.tenant-id");
    localStorage.removeItem("citizen.token");
    localStorage.removeItem("citizen.user-info");
    localStorage.removeItem("citizen.tenant-id");
    
    // Clear user service data
    if (window.Digit && window.Digit.UserService) {
      window.Digit.UserService.setUser(null);
    }
    
    // Determine redirect path based on user type
    const userInfo = JSON.parse(localStorage.getItem("Employee.user-info") || "{}");
    const isCitizen = window.location.pathname.includes("/citizen");
    const redirectPath = isCitizen ? "/digit-ui/citizen/login" : "/digit-ui/employee/user/login";
    
    // Store reason for logout
    sessionStorage.setItem("session-timeout", "true");
    
    // Redirect to login
    history.push(redirectPath);
  }, [history, clearAllTimeouts]);

  const showWarningModal = useCallback(() => {
    const remainingTime = Math.round((TIMEOUT_MS - WARNING_BEFORE_MS) / 60000);
    const message = formatWarningMessage(remainingTime);
    const userConfirmed = window.confirm(message);
    
    if (userConfirmed) {
      resetTimer();
    }
  }, [TIMEOUT_MS, WARNING_BEFORE_MS]);

  const resetTimer = useCallback(() => {
    clearAllTimeouts();
    lastActivityRef.current = Date.now();
    
    console.log('⏰ Timer reset at:', new Date().toLocaleTimeString(), {
      warningIn: `${(TIMEOUT_MS - WARNING_BEFORE_MS) / 1000} seconds`,
      logoutIn: `${TIMEOUT_MS / 1000} seconds`
    });
    
    // Set warning timeout
    warningTimeoutRef.current = setTimeout(() => {
      console.log('⚠️ Showing warning modal');
      showWarningModal();
    }, TIMEOUT_MS - WARNING_BEFORE_MS);
    
    // Set main timeout
    timeoutIdRef.current = setTimeout(() => {
      console.log('🚪 Logging out due to inactivity');
      handleLogout();
    }, TIMEOUT_MS);
  }, [TIMEOUT_MS, WARNING_BEFORE_MS, handleLogout, showWarningModal, clearAllTimeouts]);

  const handleActivity = useCallback(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;
    
    // Only reset if significant time has passed (debounce)
    if (timeSinceLastActivity > 1000) {
      resetTimer();
    }
  }, [resetTimer]);

  const checkSessionValidity = useCallback(() => {
    const token = localStorage.getItem("Employee.token") || localStorage.getItem("citizen.token");
    const userInfo = localStorage.getItem("Employee.user-info") || localStorage.getItem("citizen.user-info");
    
    if (!token || !userInfo) {
      // No active session
      return false;
    }
    
    try {
      // Check if token is expired (if it's a JWT)
      if (token.split('.').length === 3) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          handleLogout();
          return false;
        }
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
    }
    
    return true;
  }, [handleLogout]);

  useEffect(() => {
    // Only activate if user is logged in
    const isLoggedIn = checkSessionValidity();
    
    console.log('🔐 Session check:', { isLoggedIn, timeoutMinutes });
    
    if (!isLoggedIn || timeoutMinutes === 0) {
      console.log('❌ Session management disabled or user not logged in');
      return;
    }

    console.log('✅ Session management activated');

    // Events to track user activity
    const events = sessionConfig.ACTIVITY_EVENTS;

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Check for visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User returned to tab, check if session is still valid
        const now = Date.now();
        const timeSinceLastActivity = now - lastActivityRef.current;
        
        if (timeSinceLastActivity > TIMEOUT_MS) {
          // Session expired while tab was inactive
          handleLogout();
        } else {
          // Resume normal activity tracking
          resetTimer();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start the timer
    resetTimer();

    // Cleanup
    return () => {
      clearAllTimeouts();
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleActivity, resetTimer, checkSessionValidity, TIMEOUT_MS, handleLogout, clearAllTimeouts]);

  return {
    resetTimer,
    handleLogout,
    checkSessionValidity
  };
};

export default useIdleTimeout;