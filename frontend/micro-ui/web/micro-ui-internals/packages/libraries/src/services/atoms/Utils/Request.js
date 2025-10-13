import Axios from "axios";

/**
 * Custom Request to make all api calls
 *
 * @author jagankumar-egov
 *
 */

// Helper: Check if auto-login is in progress
const isAutoLoginInProgress = () => {
  return window.location.pathname.includes('/auto-login') || window.Digit?.AutoLoginInProgress;
};

// Helper: Redirect to appropriate page
const redirectTo = (path, queryParams = {}) => {
  const isEmployee = window.location.pathname.split("/").includes("employee");
  const basePath = isEmployee ? `/digit-ui/employee${path}` : `/digit-ui/citizen${path}`;
  const query = new URLSearchParams(queryParams).toString();
  window.location.href = query ? `${basePath}?${query}` : basePath;
};

// Helper: Clear auth data and redirect to login
const handleAuthFailure = (err, reason) => {
  if (isAutoLoginInProgress()) {
    console.warn(`[REQUEST-INTERCEPTOR] ${reason} during auto-login - skipping redirect`);
    throw err;
  }
  localStorage.clear();
  sessionStorage.clear();
  redirectTo('/login', { from: window.location.pathname + window.location.search });
};

// Helper: Redirect to error page
const handleServerError = (err, errorType, reason) => {
  if (isAutoLoginInProgress()) {
    console.warn(`[REQUEST-INTERCEPTOR] ${reason} during auto-login - letting retry handle it`);
    throw err;
  }
  redirectTo('/error', {
    type: errorType,
    from: window.location.pathname + window.location.search
  });
};

Axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const hasResponse = !!err?.response;

    // Network error - let retry logic handle it
    if (!hasResponse) {
      if (isAutoLoginInProgress()) {
        console.warn("[REQUEST-INTERCEPTOR] Network error during auto-login - letting retry handle it");
      } else {
        console.warn("[REQUEST-INTERCEPTOR] Network error - no response received");
      }
      throw err;
    }

    // HTTP Status Code based error handling
    switch (status) {
      case 401:
        handleAuthFailure(err, "401 Unauthorized");
        return;

      case 403:
        handleAuthFailure(err, "403 Forbidden");
        return;

      default:
        if (status >= 500 && status < 600) {
          handleServerError(err, "maintenance", `Server error ${status}`);
          return;
        }
    }

    // Message-based error handling (fallback for non-standard responses)
    if (err?.response?.data?.Errors) {
      for (const error of err.response.data.Errors) {
        const errorMsg = error?.message?.toLowerCase() || "";

        // Auth errors
        if (errorMsg.includes("invalidaccesstokenexception") || errorMsg.includes("invalid access token")) {
          handleAuthFailure(err, "Auth error");
          return;
        }

        // Server errors
        if (errorMsg.includes("internal server error") || errorMsg.includes("some error occured")) {
          handleServerError(err, "maintenance", "Server error");
          return;
        }

        // Gateway errors
        if (errorMsg.includes("zuulruntimeexception") || errorMsg.includes("gateway")) {
          handleServerError(err, "notfound", "Gateway error");
          return;
        }
      }
    }

    throw err;
  }
);

const requestInfo = () => ({
  authToken: Digit.UserService.getUser()?.access_token || null,
});

const authHeaders = () => ({
  "auth-token": Digit.UserService.getUser()?.access_token || null,
});

const userServiceData = () => ({ userInfo: Digit.UserService.getUser()?.info });

window.Digit = window.Digit || {};
window.Digit = { ...window.Digit, RequestCache: window.Digit.RequestCache || {} };

// Simple circuit breaker state per URL
window.Digit.RequestCircuit = window.Digit.RequestCircuit || {
  failures: {}, // url -> count
  openUntil: {}, // url -> timestamp
};

const isRetryableError = (err) => {
  const status = err?.response?.status;
  if (!status) return true; // network
  return status >= 500 && status < 600;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForAuthReady(timeoutMs = 8000) {
  const isReady = () => !!(window.Digit?.UserService?.getUser()?.access_token) && !window.Digit?.AutoLoginInProgress;
  if (isReady()) return;
  return new Promise((resolve) => {
    const onReady = () => {
      if (isReady()) {
        cleanup();
        resolve();
      }
    };
    const iv = setInterval(onReady, 100);
    const to = setTimeout(() => {
      cleanup();
      resolve();
    }, timeoutMs);
    function cleanup() {
      clearInterval(iv);
      clearTimeout(to);
      window.removeEventListener('digit-auth-ready', onReady);
    }
    window.addEventListener('digit-auth-ready', onReady);
    onReady();
  });
}
export const Request = async ({
  method = "POST",
  url,
  data = {},
  headers = {},
  useCache = false,
  params = {},
  auth,
  urlParams = {},
  userService,
  locale = true,
  authHeader = false,
  setTimeParam = true,
  userDownload = false,
  noRequestInfo = false,
  multipartFormData = false,
  multipartData = {},
  reqTimestamp = false,
  plainAccessRequest = null
}) => {
  if (method.toUpperCase() === "POST") {
    const ts = new Date().getTime();
    data.RequestInfo = {
      apiId: "Rainmaker",
    };
    if (auth || !!Digit.UserService.getUser()?.access_token) {
      data.RequestInfo = { ...data.RequestInfo, ...requestInfo() };
    }
    if (userService) {
      data.RequestInfo = { ...data.RequestInfo, ...userServiceData() };
    }
    if (locale) {
      data.RequestInfo = { ...data.RequestInfo, msgId: `${ts}|${Digit.StoreData.getCurrentLanguage()}` };
    }
    if (noRequestInfo) {
      delete data.RequestInfo;
    }
    if (reqTimestamp) {
      data.RequestInfo = { ...data.RequestInfo, ts: Number(ts) };
    }

    /* 
    Feature :: Privacy
    
    Desc :: To send additional field in HTTP Requests inside RequestInfo Object as plainAccessRequest
    */
    const privacy = Digit.Utils.getPrivacyObject();
    if (privacy && !url.includes("/edcr/rest/dcr/") && !noRequestInfo) {
      data.RequestInfo = { ...data.RequestInfo, plainAccessRequest: { ...privacy } };
    }

    if(plainAccessRequest){
      data.RequestInfo = { ...data.RequestInfo, plainAccessRequest };
    }

  }

  // Gate sensitive boot calls during auto-login until auth is ready
  try {
    const isAutoLogin = isAutoLoginInProgress();
    const sensitiveBootCall = /\/user\/_search|\/access\/v1\/actions\/mdms\/_get/.test(url);
    if (isAutoLogin && sensitiveBootCall) {
      await waitForAuthReady(8000);
    }
  } catch (_) {}

  //for the central instance if any api doesnot need tenantId then url can be added in below confirguration
  const urlwithoutTenantId = [
    "/user/oauth/token"
  ];

  const headers1 = {
    "Content-Type": "application/json",
    Accept: window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE") ? "application/pdf,application/json" : "application/pdf",
  };

  if (authHeader) headers = { ...headers, ...authHeaders() };

  if (userDownload) headers = { ...headers, ...headers1 };

  let key = "";
  if (useCache) {
    key = `${method.toUpperCase()}.${url}.${JSON.stringify(params)}.${JSON.stringify(data)}`;
    const value = window.Digit.RequestCache[key];
    if (value) {
      return value;
    }
  } else if (setTimeParam) {
    params._ = Date.now();
  }

  let _url = url
    .split("/")
    .map((path) => {
      let key = path.split(":")?.[1];
      return urlParams[key] ? urlParams[key] : path;
    })
    .join("/");

  if (multipartFormData) {
    const multipartFormDataRes = await Axios({
      method,
      url: _url,
      data: multipartData.data,
      params,
      headers: { "Content-Type": "multipart/form-data", "auth-token": Digit.UserService.getUser()?.access_token || null },
    });
    return multipartFormDataRes;
  }
  /* 
  Feature :: Single Instance

  Desc :: Fix for central instance to send tenantID in all query params
  */
  const tenantInfo =
    Digit.SessionStorage.get("userType") === "citizen"
      ? Digit.ULBService.getStateId()
      : Digit.ULBService.getCurrentTenantId() || Digit.ULBService.getStateId();
  if (!params["tenantId"] && window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")  && !(urlwithoutTenantId?.filter((ob) => url?.includes(ob))?.length > 0)) {
    params["tenantId"] = tenantInfo;
  }

  // Circuit breaker: short-circuit if open
  const now = Date.now();
  if (window.Digit.RequestCircuit.openUntil[_url] && window.Digit.RequestCircuit.openUntil[_url] > now) {
    const err = new Error('circuit-open');
    err.code = 'CIRCUIT_OPEN';
    throw err;
  }

  // Retry with backoff for retryable failures
  const maxRetries = 2;
  let attempt = 0;
  let lastErr;
  while (attempt <= maxRetries) {
    try {
      const axiosOpts = userDownload
        ? { method, url: _url, data, params, headers, responseType: "arraybuffer", timeout: 15000 }
        : { method, url: _url, data, params, headers, timeout: 15000 };
      const res = await Axios(axiosOpts);
      // Success: reset failures
      window.Digit.RequestCircuit.failures[_url] = 0;
      if (userDownload) return res;
      const returnData = res?.data || res?.response?.data || {};
      if (useCache && res?.data && Object.keys(returnData).length !== 0) {
        window.Digit.RequestCache[key] = returnData;
      }
      return returnData;
    } catch (err) {
      lastErr = err;
      // Increment failures
      window.Digit.RequestCircuit.failures[_url] = (window.Digit.RequestCircuit.failures[_url] || 0) + 1;
      const failCount = window.Digit.RequestCircuit.failures[_url];
      // Open circuit briefly after multiple failures
      if (failCount >= 5) {
        window.Digit.RequestCircuit.openUntil[_url] = Date.now() + 60000; // 60s
      }
      if (attempt < maxRetries && isRetryableError(err)) {
        const backoff = Math.min(2000 * Math.pow(2, attempt), 6000) + Math.floor(Math.random() * 300);
        await sleep(backoff);
        attempt++;
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
};

/**
 *
 * @param {*} serviceName
 *
 * preHook:
 * ({params, data}) => ({params, data})
 *
 * postHook:
 * ({resData}) => ({resData})
 *
 */

export const ServiceRequest = async ({
  serviceName,
  method = "POST",
  url,
  data = {},
  headers = {},
  useCache = false,
  params = {},
  auth,
  userService,
}) => {
  const preHookName = `${serviceName}Pre`;
  const postHookName = `${serviceName}Post`;

  let reqParams = params;
  let reqData = data;
  if (window[preHookName] && typeof window[preHookName] === "function") {
    let preHookRes = await window[preHookName]({ params, data });
    reqParams = preHookRes.params;
    reqData = preHookRes.data;
  }
  const resData = await Request({ method, url, data: reqData, headers, useCache, params: reqParams, auth, userService });

  if (window[postHookName] && typeof window[postHookName] === "function") {
    return await window[postHookName](resData);
  }
  return resData;
};
