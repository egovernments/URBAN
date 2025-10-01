import React, { useEffect, useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";


const setEmployeeDetail = (userObject, token) => {
    let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
    localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
    localStorage.setItem("tenant-id", userObject?.tenantId);
    localStorage.setItem("locale", locale);
    localStorage.setItem("Employee.locale", locale);
    localStorage.setItem("Employee.token", token);
    localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
    
    // Ensure user type is set correctly for employee
    sessionStorage.setItem("userType", "EMPLOYEE");
    window.Digit.SessionStorage.set("userType", "employee");
    window.Digit.SessionStorage.set("user_type", "employee");
  };
  
const AutoLogin = () => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [retryCount, setRetryCount] = useState(0);


  const queryParams = new URLSearchParams(location.search);

  const defaultCredentials = {
    username: queryParams.get("username"),
    password: queryParams.get("password"), 
    city: {
      code: queryParams.get("city"),
    },
    fromSandbox: queryParams.get("fromSandbox") || false
  };
  const redirectUrl = queryParams.get("redirectUrl") || "/digit-ui/employee"; 

  console.log(`*** LOG ***`,redirectUrl);
  useEffect(() => {
    if (!user) {
      return;
    }
    // Digit.SessionStorage.set("citizen.userRequestObject", user);
    const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
    Digit.UserService.setUser(user);
    setEmployeeDetail(user?.info, user?.access_token);
    if(queryParams.get("redirectUrl")) 
      {
        window.location.href = redirectUrl;
      }
    else
    history.replace(redirectUrl);
  }, [user]);

  const handleAutoLogin = async () => {
    try {
      // Check timestamp from REACT_APP_PUBLIC_PATH
      const currentTimestamp = process.env['REACT_APP_PUBLIC_PATH'];
      const storedTimestamp = localStorage.getItem("app_timestamp");
      
      console.log("Current timestamp from REACT_APP_PUBLIC_PATH:", currentTimestamp);
      console.log("Stored timestamp:", storedTimestamp);
      
      // If no stored timestamp or stored timestamp is older, clear only user auth data
      if (!storedTimestamp || (currentTimestamp && parseInt(currentTimestamp) > parseInt(storedTimestamp))) {
        console.log("Clearing user authentication data due to timestamp change");
        
        // Preserve only mandatory keys, clear everything else
        const userDataKeys = [
          "Citizen.token", "Citizen.user-info", "Citizen.tenant-id", "Citizen.locale",
          "Employee.token", "Employee.user-info", "Employee.tenant-id", "Employee.locale",
          "citizen.userRequestObject", "user-info", "token",
          "Digit.initData", "Digit.locale", "Digit.ApiCachingSettings"
        ];
        
        // Preserve essential localStorage items
        const preservedLocalStorage = {};
        userDataKeys.forEach(key => {
          const value = localStorage.getItem(key);
          if (value !== null) {
            preservedLocalStorage[key] = value;
          }
        });
        
        // Preserve essential sessionStorage items
        const preservedSessionStorage = {};
        userDataKeys.forEach(key => {
          const value = sessionStorage.getItem(key);
          if (value !== null) {
            preservedSessionStorage[key] = value;
          }
        });
        
        // Clear all localStorage
        localStorage.clear();
        
        // Clear all sessionStorage
        sessionStorage.clear();
        
        // Restore only the preserved items
        Object.entries(preservedLocalStorage).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        Object.entries(preservedSessionStorage).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
        
        // Store the new timestamp
        if (currentTimestamp) {
          localStorage.setItem("app_timestamp", currentTimestamp);
        }
        
        console.log("Cleared all storage except mandatory keys:", userDataKeys);
      } else if (storedTimestamp === currentTimestamp) {
        console.log("Timestamp matches, proceeding with auto-login without clearing storage");
      }
      
      // Validate required credentials
      if (!defaultCredentials.username || !defaultCredentials.password || !defaultCredentials.city?.code) {
        throw new Error("Missing required credentials for employee auto-login");
      }

      const requestData = {
        ...defaultCredentials,
        userType: "EMPLOYEE",
        tenantId: defaultCredentials.city.code,
      };
      delete requestData.city;

      console.log("Employee auto-login attempt for:", defaultCredentials.username);
      
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      
      // Validate response
      if (!info || !tokens.access_token) {
        throw new Error("Invalid authentication response");
      }

      Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);
      Digit.SessionStorage.set("fromSandbox", defaultCredentials.fromSandbox);
      setUser({ info, ...tokens });

    } catch (err) {
      console.error("Employee auto-login failed:", err);
      console.error("Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message
      });
      
      // Don't set error immediately for network issues - try to retry (max 3 times)
      if ((!err.response || err.response.status === 0 || err.message === 'Network Error') && retryCount < 3) {
        console.log(`Network error detected, retrying auto-login in 2 seconds... (attempt ${retryCount + 1}/3)`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          handleAutoLogin();
        }, 2000);
        return;
      }
      
      const errorMessage = err.response?.data?.error_description || err.message || "Employee auto-login failed";
      setError(errorMessage);
      
      // On error, redirect to employee login page after 3 seconds
      setTimeout(() => {
        history.replace("/digit-ui/employee/user/login", {
          message: "Auto-login failed. Please login manually.",
          from: "auto-login"
        });
      }, 3000);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p style={{ marginTop: "20px" }}>Logging in as Employee...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Employee Auto-Login Failed</h2>
          <p style={{ color: "#d4351c", marginTop: "10px" }}>{error}</p>
          <p style={{ marginTop: "20px" }}>Redirecting to login page...</p>
        </div>
      ) : null}
    </div>
  );
};

export default AutoLogin;
