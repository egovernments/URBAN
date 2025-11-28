import Axios from "axios";

/**
 * Custom Request to make all api calls
 *
 * @author jagankumar-egov
 *
 */

Axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const isEmployee = window.location.pathname.split("/").includes("employee");
    if (err?.response?.data?.Errors) {
      for (const error of err.response.data.Errors) {
        if (error.message.includes("InvalidAccessTokenException")) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href =
            (isEmployee ? "/digit-ui/employee/user/login" : "/digit-ui/citizen/login") +
            `?from=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        } else if (
          error?.message?.toLowerCase()?.includes("internal server error") ||
          error?.message?.toLowerCase()?.includes("some error occured")
        ) {
          window.location.href =
            (isEmployee ? "/digit-ui/employee/user/error" : "/digit-ui/citizen/error") +
            `?type=maintenance&from=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        } else if (error.message.includes("ZuulRuntimeException")) {
          window.location.href =
            (isEmployee ? "/digit-ui/employee/user/error" : "/digit-ui/citizen/error") +
            `?type=notfound&from=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        }
      }
    }
    throw err;
  }
);

const requestInfo = () => {
  // Cookie-based authentication via SESSION_ID cookie and auth-token header
  // No need to include authToken in RequestInfo body
  return {};
};

const authHeaders = () => {
  // Additional headers for requests that explicitly need authHeader=true
  return {
    "Access-Control-Allow-Credentials": true
  };
};

const userServiceData = () => ({ userInfo: Digit.UserService.getUser()?.info });

window.Digit = window.Digit || {};
window.Digit = { ...window.Digit, RequestCache: window.Digit.RequestCache || {} };
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
    // Cookie-based auth: Always include RequestInfo for authenticated requests
    // Zuul handles token injection server-side
    if (auth || !!Digit.UserService.getUser()?.info) {
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

  //for the central instance if any api doesnot need tenantId then url can be added in below confirguration
  const urlwithoutTenantId = [
    "/user/oauth/token"
  ];

  const headers1 = {
    "Content-Type": "application/json",

    Accept: window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE") ? "application/pdf,application/json" : "application/pdf",
  };

  // Hybrid authentication: Send both SESSION_ID cookie and auth-token header
  // This supports transition period while backend is being migrated to cookie-only auth
  // SESSION_ID cookie: HttpOnly, Secure (sent automatically by browser)
  // auth-token header: Required by current backend implementation
  const user = Digit.UserService.getUser();
  if (user?.access_token) {
    headers = { ...headers, "auth-token": user.access_token };
  }

  if (authHeader) headers = { ...headers, ...authHeaders() };

  if (userDownload) headers = { ...headers, ...headers1 };

  let key = "";
  if (useCache) {
    key = `${method.toUpperCase()}.${url}.${btoa(escape(JSON.stringify(params, null, 0)))}.${btoa(escape(JSON.stringify(data, null, 0)))}`;
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
      headers: {
        "Content-Type": "multipart/form-data",
        // Hybrid auth: Include auth-token header for authenticated uploads
        ...(user?.access_token && { "auth-token": user.access_token })
      },
      withCredentials: true, // Send SESSION_ID cookie with request
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

  const res = userDownload
    ? await Axios({ method, url: _url, data, params, headers, responseType: "arraybuffer" , withCredentials: true })
    : await Axios({ method, url: _url, data, params, headers, withCredentials: true });

  if (userDownload) return res;

  const returnData = res?.data || res?.response?.data || {};
  if (useCache && res?.data && Object.keys(returnData).length !== 0) {
    window.Digit.RequestCache[key] = returnData;
  }
  return returnData;
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
