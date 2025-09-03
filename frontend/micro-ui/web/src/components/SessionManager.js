import React, { useEffect } from 'react';
import useIdleTimeout from '../hooks/useIdleTimeout';
import { useLocation } from 'react-router-dom';
import sessionConfig, { isPathExcluded, getSessionCheckIntervalMs } from '../config/sessionConfig';

const SessionManager = ({ children, timeoutMinutes = sessionConfig.IDLE_TIMEOUT_MINUTES }) => {
  const location = useLocation();
  
  // Don't apply session management on excluded pages
  const isExcludedPage = isPathExcluded(location.pathname);
  
  console.log('📍 SessionManager:', {
    path: location.pathname,
    isExcludedPage,
    timeoutMinutes,
    sessionManagementEnabled: sessionConfig.ENABLE_SESSION_MANAGEMENT
  });
  
  // Use the idle timeout hook only if session management is enabled
  const { checkSessionValidity } = useIdleTimeout(
    !sessionConfig.ENABLE_SESSION_MANAGEMENT || isExcludedPage ? 0 : timeoutMinutes
  );
  
  useEffect(() => {
    // Check if we were redirected due to session timeout
    const wasTimeout = sessionStorage.getItem('session-timeout');
    if (wasTimeout && isExcludedPage) {
      sessionStorage.removeItem('session-timeout');
      
      // Show a toast or message about session timeout
      const message = document.createElement('div');
      message.className = 'session-timeout-message';
      message.textContent = sessionConfig.MESSAGES.SESSION_EXPIRED;
      message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ff6b6b;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      `;
      
      document.body.appendChild(message);
      
      setTimeout(() => {
        if (document.body.contains(message)) {
          document.body.removeChild(message);
        }
      }, 5000);
    }
  }, [isExcludedPage]);
  
  useEffect(() => {
    // Periodically check session validity
    if (!isExcludedPage && sessionConfig.ENABLE_SESSION_MANAGEMENT) {
      const interval = setInterval(() => {
        checkSessionValidity();
      }, getSessionCheckIntervalMs());
      
      return () => clearInterval(interval);
    }
  }, [checkSessionValidity, isExcludedPage]);
  
  return <>{children}</>;
};

export default SessionManager;