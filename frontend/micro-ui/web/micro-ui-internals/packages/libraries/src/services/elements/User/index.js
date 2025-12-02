import Urls from "../../atoms/urls";
import { Request, ServiceRequest } from "../../atoms/Utils/Request";
import { Storage } from "../../atoms/Utils/Storage";

export const UserService = {
  authenticate: (details) => {
    console.log('[LOGIN-FLOW] UserService.authenticate: Called with details:', details);

    const data = new URLSearchParams();
    Object.entries(details).forEach(([key, value]) => data.append(key, value));
    data.append("scope", "read");
    data.append("grant_type", "password");

    console.log('[LOGIN-FLOW] UserService.authenticate: Request URL:', Urls.Authenticate);
    console.log('[LOGIN-FLOW] UserService.authenticate: Request params:', data.toString());
    console.log('[LOGIN-FLOW] UserService.authenticate: Making OAuth request...');

    return ServiceRequest({
      serviceName: "authenticate",
      url: Urls.Authenticate,
      data,
      headers: {
        authorization: `Basic ${window?.globalConfigs?.getConfig("JWT_TOKEN")||"ZWdvdi11c2VyLWNsaWVudDo="}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  logoutUser: () => {
    let user = UserService.getUser();
    if (!user || !user.info) return false;
    const { type } = user.info;
    // Logout request uses SESSION_ID cookie for authentication
    return ServiceRequest({
      serviceName: "logoutUser",
      url: Urls.UserLogout,
      data: {},
      auth: true,
      params: { tenantId: type === "CITIZEN" ? Digit.ULBService.getStateId() : Digit.ULBService.getCurrentTenantId() },
    });
  },
  getType: () => {
    return Storage.get("userType") || "citizen";
  },
  setType: (userType) => {
    Storage.set("userType", userType);
    Storage.set("user_type", userType);
  },
  getUser: () => {
    // Returns user data (info only, no tokens)
    // Cookie-only auth: SESSION_ID cookie is used for all authenticated requests
    return Digit.SessionStorage.get("User");
  },
  logout: async () => {
    const userType = UserService.getType();
    try {
      await UserService.logoutUser();
    } catch (e) {
    }
    finally{
      window.localStorage.clear();
      window.sessionStorage.clear();
      if (userType === "citizen") {
        window.location.replace("/digit-ui/citizen");
      } else {
        window.location.replace("/digit-ui/employee/user/language-selection");
      }
    }
  },
  sendOtp: (details, stateCode) =>
    ServiceRequest({
      serviceName: "sendOtp",
      url: Urls.OTP_Send,
      data: details,
      auth: false,
      params: { tenantId: stateCode },
    }),
  setUser: (data) => {
    console.log('[LOGIN-FLOW] UserService.setUser: Called with data:', data);

    // Cookie-only authentication: Remove all tokens from client storage
    // Auth tokens are stored server-side in Redis and managed via SESSION_ID cookie only
    const { access_token, refresh_token, token_type, expires_in, scope, ResponseInfo, ...userDataToStore } = data || {};

    console.log('[LOGIN-FLOW] UserService.setUser: Extracted tokens (will be discarded):', {
      access_token: access_token ? '***EXISTS***' : 'N/A',
      refresh_token: refresh_token ? '***EXISTS***' : 'N/A',
      token_type,
      expires_in,
      scope
    });

    console.log('[LOGIN-FLOW] UserService.setUser: User data to store (without tokens):', userDataToStore);

    // Store only user info, no tokens (SESSION_ID cookie handles authentication)
    console.log('[LOGIN-FLOW] UserService.setUser: Setting User in SessionStorage');
    const result = Digit.SessionStorage.set("User", userDataToStore);
    console.log('[LOGIN-FLOW] UserService.setUser: User stored successfully');

    return result;
  },
  setExtraRoleDetails: (data) => {
    const userDetails = Digit.SessionStorage.get("User");
    return Digit.SessionStorage.set("User", { ...userDetails, extraRoleInfo: data });
  },
  getExtraRoleDetails: () => {
    return Digit.SessionStorage.get("User")?.extraRoleInfo;
  },
  registerUser: (details, stateCode) =>
    ServiceRequest({
      serviceName: "registerUser",
      url: Urls.RegisterUser,
      data: {
        User: details,
      },
      params: { tenantId: stateCode },
    }),
  updateUser: async (details, stateCode) =>
    ServiceRequest({
      serviceName: "updateUser",
      url: Urls.UserProfileUpdate,
      auth: true,
      data: {
        user: details,
      },
      params: { tenantId: stateCode },
    }),
  hasAccess: (accessTo) => {
    const user = Digit.UserService.getUser();
    if (!user || !user.info) return false;
    const { roles } = user.info;
    return roles && Array.isArray(roles) && roles.filter((role) => accessTo.includes(role.code)).length;
  },

  changePassword: (details, stateCode) =>
    ServiceRequest({
      serviceName: "changePassword",
      url: Digit.SessionStorage.get("User")?.info ? Urls.ChangePassword1 : Urls.ChangePassword,
      data: {
        ...details,
      },
      auth: true,
      params: { tenantId: stateCode },
    }),

  employeeSearch: (tenantId, filters) => {
    return Request({
      url: Urls.EmployeeSearch,
      params: { tenantId, ...filters },
      auth: true,
    });
  },
  userSearch: async (tenantId, data, filters) => {
    return Request({
      url: Urls.UserSearch,
      params: { ...filters },
      method: "POST",
      auth: true,
      userService: true,
      data: data?.pageSize ? { tenantId, ...data } : { tenantId, ...data, pageSize: "100" },
    });
  },
};
