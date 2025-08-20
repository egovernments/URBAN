import { BackButton, FormComposer, Loader, Toast } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* set employee details to enable backward compatible */
const setEmployeeDetail = (userObject, token) => {
  let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
  localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
  localStorage.setItem("tenant-id", userObject?.tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Employee.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Employee.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
};

const Login = ({ config: propsConfig, t, isDisabled }) => {
  console.log("Login component rendered with config:", propsConfig);
  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  console.log("Cities data:", cities);
  const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();

  const { stateInfo } = storeData || {};
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [disable, setDisable] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const history = useHistory();
  const isMobile = windowWidth <= 768;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user) return;
    
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
    Digit.UserService.setUser(user);
    setEmployeeDetail(user?.info, user?.access_token);
    
    let redirectPath = "/digit-ui/employee";
    if (window?.location?.href?.includes("from=")) {
      redirectPath = decodeURIComponent(window?.location?.href?.split("from=")?.[1]) || "/digit-ui/employee";
    }
    if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "NATADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/NURT_DASHBOARD";
    }
    if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "STADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/home";
    }
    history.replace(redirectPath);
  }, [user, history]);

  const onLogin = async (data) => {
    setDisable(true);
    const requestData = {
      ...data,
      userType: "EMPLOYEE",
      tenantId: cities[0]?.code 
    };
    delete requestData.city;
    
    try {
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);
      setUser({ info, ...tokens });
    } catch (err) {
      setShowToast(err?.response?.data?.error_description || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }
    setDisable(false);
  };

  const closeToast = () => setShowToast(null);

  const onForgotPassword = () => {
    sessionStorage.getItem("User") && sessionStorage.removeItem("User");
    history.push("/digit-ui/employee/user/forgot-password");
  };

  const [userId, password] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: { name: userId.name },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: { name: password.name },
          isMandatory: true,
        },
      ],
    },
  ];

  if (isLoading || isStoreLoading) return <Loader />;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f0f0",
        overflow: "hidden"
      }}
    >
      {/* Top Navigation Bar */}
      <div
        style={{
          backgroundColor: "#6b133f",
          color: "white",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          flexShrink: 0,
          height: "65px"
        }}
      >
        <img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg"
          alt="MP Logo"
          style={{ height: "40px", width: "auto" }}
        />
        <div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>मध्य प्रदेश सरकार</div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>Government of Madhya Pradesh</div>
        </div>
      </div>

      {/* Main Content with Background */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #4A6FA5 0%, #166088 50%, #4A6FA5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          overflow: "auto"
        }}
      >
        {/* Back Button */}
        <div style={{ position: "absolute", top: "20px", left: "20px" }}>
          <BackButton variant="white" style={{ borderBottom: "none" }} />
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            width: isMobile ? "calc(100% - 20px)" : "100%",
            maxWidth: "900px",
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "1fr 1.2fr",
            overflow: isMobile ? "auto" : "hidden",
            maxHeight: isMobile ? "calc(100vh - 180px)" : "90vh",
            margin: isMobile ? "0 10px" : "0",
            scrollbarWidth: "none",
          }}
        >
          {/* Left Section - Branding */}
          {!isMobile && (
            <div
              style={{
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                borderRight: "1px solid #e0e0e0",
                backgroundColor: "#ffffff"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
                  <img
                    src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%2014.svg"
                    alt="IMC Logo"
                    style={{ height: "70px", width: "auto" }}
                  />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "5px" }}>
                      इंदौर नगर निगम
                    </div>
                    <div style={{ fontSize: "16px", color: "#666" }}>
                      Indore Municipal Corporation
                    </div>
                  </div>
                </div>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201807.svg"
                  alt="Indore Map"
                  style={{ 
                    // width: "180px", 
                    // height: "auto", 
                    opacity: 0.8, 
                    marginTop: "20px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                />
              </div>
              <div style={{ fontSize: "12px", color: "#999" }}>Version v1.1</div>
            </div>
          )}

          {/* Right Section - Login Form */}
          <div
            style={{
              padding: isMobile ? "20px 20px 40px" : "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: isMobile ? "flex-start" : "center",
              backgroundColor: "rgba(94, 142, 217, 0.03)",
              height: isMobile ? "auto" : "100%",
              overflow: "visible",
              minHeight: isMobile ? "auto" : "unset"
            }}
          >
            {/* Mobile Logo */}
            {isMobile && (
              <div style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px", 
                paddingTop: "10px" 
              }}>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%2014.svg"
                  alt="IMC Logo"
                  style={{ height: "50px", width: "auto" }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "2px" }}>
                    इंदौर नगर निगम
                  </div>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    Indore Municipal Corporation
                  </div>
                </div>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201807.svg"
                  alt="Indore Map"
                  style={{ 
                    // width: "100px", 
                    // height: "auto", 
                    opacity: 0.5, 
                    marginTop: "10px"
                  }}
                />
              </div>
            )}

            {/* Welcome Section */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? "20px" : "30px" }}>
              <h3 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "600", color: "#6B133F", margin: "0 0 6px 0" }}>
                Welcome to
              </h3>
              <h2 style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: "700", color: "#6B133F", margin: "0 0 15px 0" }}>
                e-Indore Municipal Corporation (e-IMC)
              </h2>
              <hr style={{
                width: "60px",
                border: "none",
                borderTop: "3px solid #6B133F",
                margin: "0 auto 15px"
              }} />
              <h4 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "600", color: "#6B133F", margin: 0 }}>
                IMC Login
              </h4>
            </div>

            {/* Form Container */}
            <div style={{ 
              width: "100%", 
              maxWidth: "380px", 
              margin: "0 auto",
              paddingBottom: isMobile ? "20px" : "0"
            }}>
              <FormComposer
                onSubmit={onLogin}
                isDisabled={isDisabled || disable}
                noBoxShadow
                inline
                submitInForm
                config={config}
                label={propsConfig.texts.submitButtonLabel}
                secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
                onSecondayActionClick={onForgotPassword}
                cardStyle={{
                  margin: "0",
                  padding: "0",
                  boxShadow: "none",
                  background: "transparent",
                  width: "100%"
                }}
                buttonStyle={{
                  width: "100%",
                  backgroundColor: "#6B133F",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "4px",
                  marginTop: "10px",
                  marginBottom: "15px",
                  minHeight: "44px",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Mobile Version Text */}
            {isMobile && (
              <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#999" }}>
                Version v1.1
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#6b133f",
          color: "white",
          padding: "12px 20px",
          textAlign: "center",
          fontSize: "14px",
          flexShrink: 0,
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        © 2025 Copyright Indore Municipal Corporation
      </div>

      {/* Toast Notification */}
      {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}

      {/* Override FormComposer Styles */}
      <style>{`
        .loginFormStyleEmployee,
        .loginFormStyleEmployee > div {
          box-shadow: none !important;
          background: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .loginFormStyleEmployee input {
          width: 100% !important;
          padding: 12px !important;
          border: 1px solid #ddd !important;
          border-radius: 4px !important;
          font-size: 14px !important;
        }
        
        .loginFormStyleEmployee input:focus {
          outline: none !important;
          border-color: #6B133F !important;
          box-shadow: 0 0 0 2px rgba(107,19,63,0.1) !important;
        }
        
        .loginFormStyleEmployee button[type="submit"] {
          width: 100% !important;
          background-color: #6B133F !important;
          transition: background-color 0.3s !important;
        }
        
        .loginFormStyleEmployee button[type="submit"]:hover {
          background-color: #8B2252 !important;
        }
        
        /* Prevent body scroll */
        body {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
};

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};

export default Login;