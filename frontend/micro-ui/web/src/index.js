import React from 'react';
import ReactDOM from 'react-dom';
import { initLibraries } from "@egovernments/digit-ui-libraries";
// import "@egovernments/digit-ui-css/dist/index.css";
import "./index.css";
import App from './App';
import { TLCustomisations } from './Customisations/tl/TLCustomisation';


initLibraries();


window.Digit.Customizations = { PGR: {} ,TL:TLCustomisations};

const user = window.Digit.SessionStorage.get("User");

// Cookie-based authentication: Check for user.info instead of access_token
// Auth tokens are now stored server-side in Redis and managed via SESSION_ID cookie
if (!user || !user.info) {
  const parseValue = (value) => {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  const getFromStorage = (key) => {
    const value = window.localStorage.getItem(key);
    return value && value !== "undefined" ? parseValue(value) : null;
  }

  const citizenInfo = getFromStorage("Citizen.user-info")
  const citizenTenantId = getFromStorage("Citizen.tenant-id")

  const employeeInfo = getFromStorage("Employee.user-info")
  const employeeTenantId = getFromStorage("Employee.tenant-id")

  // Determine user type based on available info
  const userType = employeeInfo ? "employee" : "citizen";
  window.Digit.SessionStorage.set("user_type", userType);
  window.Digit.SessionStorage.set("userType", userType);

  // Restore user info (without tokens) from localStorage on page refresh
  if (userType === "employee" && employeeInfo) {
    window.Digit.SessionStorage.set("User", { info: employeeInfo });
  } else if (citizenInfo) {
    window.Digit.SessionStorage.set("User", { info: citizenInfo });
  }

  window.Digit.SessionStorage.set("Citizen.tenantId", citizenTenantId);
  if (employeeTenantId) {
    window.Digit.SessionStorage.set("Employee.tenantId", employeeTenantId);
  }

  // Clean up legacy token storage from previous implementation
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("Citizen.token");
  window.localStorage.removeItem("Employee.token");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

