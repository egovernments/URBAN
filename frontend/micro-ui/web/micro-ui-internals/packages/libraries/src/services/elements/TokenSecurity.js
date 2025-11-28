/**
 * Token Security Service
 * Automatically monitors and removes sensitive tokens from browser storage
 * Prevents accidental storage of refresh_token and other sensitive data
 */

// List of token keys that should NEVER be in localStorage
const FORBIDDEN_LOCALSTORAGE_KEYS = [
  "token",
  "Citizen.token",
  "Employee.token",
  "refresh_token",
  "authToken",
  "auth-token"
];

// List of sensitive fields that should NOT be in sessionStorage Digit.User object
const FORBIDDEN_USER_FIELDS = [
  "refresh_token",
  "token_type",
  "expires_in",
  "scope",
  "ResponseInfo"
];

/**
 * Clean up forbidden keys from localStorage
 */
const cleanLocalStorage = () => {
  let cleaned = false;
  FORBIDDEN_LOCALSTORAGE_KEYS.forEach(key => {
    if (window.localStorage.getItem(key)) {
      console.warn(`[SECURITY] Detected and removing forbidden key from localStorage: "${key}"`);
      window.localStorage.removeItem(key);
      cleaned = true;
    }
  });
  return cleaned;
};

/**
 * Clean up forbidden fields from sessionStorage Digit.User object
 */
const cleanSessionStorageUser = () => {
  try {
    const digitUserRaw = window.sessionStorage.getItem("Digit.User");
    if (!digitUserRaw) return false;

    const digitUser = JSON.parse(digitUserRaw);
    if (!digitUser || !digitUser.value) return false;

    let cleaned = false;
    FORBIDDEN_USER_FIELDS.forEach(field => {
      if (digitUser.value[field] !== undefined) {
        console.warn(`[SECURITY] Detected and removing forbidden field from sessionStorage Digit.User: "${field}"`);
        delete digitUser.value[field];
        cleaned = true;
      }
    });

    if (cleaned) {
      window.sessionStorage.setItem("Digit.User", JSON.stringify(digitUser));
    }
    return cleaned;
  } catch (err) {
    console.error("[SECURITY] Error cleaning sessionStorage:", err);
    return false;
  }
};

/**
 * Run cleanup check
 */
const runCleanup = () => {
  const localCleaned = cleanLocalStorage();
  const sessionCleaned = cleanSessionStorageUser();

  if (localCleaned || sessionCleaned) {
    console.log("[SECURITY] Token cleanup completed");
  }
};

/**
 * Start the token security monitor
 * Runs cleanup immediately and then every 5 seconds
 */
const startMonitor = () => {
  // Run cleanup immediately
  runCleanup();

  // Run cleanup every 5 seconds to catch any runtime violations
  setInterval(runCleanup, 5000);

  console.log("[SECURITY] Token cleanup monitor started - checking every 5 seconds");
};

export const TokenSecurityService = {
  startMonitor,
  runCleanup,
  cleanLocalStorage,
  cleanSessionStorageUser
};
