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
