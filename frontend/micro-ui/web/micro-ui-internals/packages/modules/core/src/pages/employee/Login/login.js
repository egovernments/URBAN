// import { BackButton, Dropdown, FormComposer, Loader, Toast } from "@egovernments/digit-ui-react-components";
// import PropTypes from "prop-types";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import Background from "../../../components/Background";
// import Header from "../../../components/Header";

// /* set employee details to enable backward compatiable */
// const setEmployeeDetail = (userObject, token) => {
//   let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
//   localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
//   localStorage.setItem("tenant-id", userObject?.tenantId);
//   localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
//   localStorage.setItem("locale", locale);
//   localStorage.setItem("Employee.locale", locale);
//   localStorage.setItem("token", token);
//   localStorage.setItem("Employee.token", token);
//   localStorage.setItem("user-info", JSON.stringify(userObject));
//   localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
// };

// const Login = ({ config: propsConfig, t, isDisabled }) => {
//   const { data: cities, isLoading } = Digit.Hooks.useTenants();
//   const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();
//   const { stateInfo } = storeData || {};
//   const [user, setUser] = useState(null);
//   const [showToast, setShowToast] = useState(null);
//   const [disable, setDisable] = useState(false);

//   const history = useHistory();
//   // const getUserType = () => "EMPLOYEE" || Digit.UserService.getType();

//   useEffect(() => {
//     if (!user) {
//       return;
//     }
//     Digit.SessionStorage.set("citizen.userRequestObject", user);
//     const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
//     if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
//     Digit.UserService.setUser(user);
//     setEmployeeDetail(user?.info, user?.access_token);
//     let redirectPath = "/digit-ui/employee";

//     /* logic to redirect back to same screen where we left off  */
//     if (window?.location?.href?.includes("from=")) {
//       redirectPath = decodeURIComponent(window?.location?.href?.split("from=")?.[1]) || "/digit-ui/employee";
//     }

//     /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
//     if (user?.info?.roles && user?.info?.roles?.length > 0 &&  user?.info?.roles?.every((e) => e.code === "NATADMIN")) {
//       redirectPath = "/digit-ui/employee/dss/landing/NURT_DASHBOARD";
//     }
//     /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
//     if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "STADMIN")) {
//       redirectPath = "/digit-ui/employee/dss/landing/home";
//     }

//     history.replace(redirectPath);
//   }, [user]);

//   const onLogin = async (data) => {
//     if (!data.city) {
//       alert("Please Select City!");
//       return;
//     }
//     setDisable(true);

//     const requestData = {
//       ...data,
//       userType: "EMPLOYEE",
//     };
//     requestData.tenantId = data.city.code;
//     delete requestData.city;
//     try {
//       const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
//       Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);
//       setUser({ info, ...tokens });
//     } catch (err) {
//       setShowToast(err?.response?.data?.error_description || "Invalid login credentials!");
//       setTimeout(closeToast, 5000);
//     }
//     setDisable(false);
//   };

//   const closeToast = () => {
//     setShowToast(null);
//   };

//   const onForgotPassword = () => {
//     sessionStorage.getItem("User") && sessionStorage.removeItem("User")
//     history.push("/digit-ui/employee/user/forgot-password");
//   };

//   const [userId, password, city] = propsConfig.inputs;
//   const config = [
//     {
//       body: [
//         {
//           label: t(userId.label),
//           type: userId.type,
//           populators: {
//             name: userId.name,
//           },
//           isMandatory: true,
//         },
//         {
//           label: t(password.label),
//           type: password.type,
//           populators: {
//             name: password.name,
//           },
//           isMandatory: true,
//         },
//         {
//           label: t(city.label),
//           type: city.type,
//           populators: {
//             name: city.name,
//             customProps: {},
//             component: (props, customProps) => (
//               <Dropdown
//               style={{border:"1px solid"}}
//                 option={cities}
//                 className="login-city-dd"
//                 optionKey="i18nKey"
//                 select={(d) => {
//                   props.onChange(d);
//                 }}
//                 t={t}
//                 {...customProps}
//               />
//             ),
//           },
//           isMandatory: true,
//         },
//       ],
//     },
//   ];

//   return isLoading || isStoreLoading ? (
//     <Loader />
//   ) : (
//     <Background>
//       <div className="employeeBackbuttonAlign">
//         <BackButton variant="white" style={{ borderBottom: "none" }} />
//       </div>

//       <FormComposer
//         onSubmit={onLogin}
//         isDisabled={isDisabled || disable}
//         noBoxShadow
//         inline
//         submitInForm
//         config={config}
//         label={propsConfig.texts.submitButtonLabel}
//         secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
//         onSecondayActionClick={onForgotPassword}
//         heading={propsConfig.texts.header}
//         headingStyle={{ textAlign: "center" }}
//         cardStyle={{ margin: "auto", minWidth: "408px" }}
//         className="loginFormStyleEmployee"
//         buttonStyle={{ maxWidth: "100%", width: "100%" }}
//       >
//         <Header />
//       </FormComposer>
//       {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}
//       <div className="employee-login-home-footer" style={{ backgroundColor: "unset" }}>
//         <img
//           alt="Powered by DIGIT"
//           src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER_BW")}
//           style={{ cursor: "pointer" }}
//           onClick={() => {
//             window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
//           }}
//         />{" "}
//       </div>
//     </Background>
//   );
// };

// Login.propTypes = {
//   loginParams: PropTypes.any,
// };

// Login.defaultProps = {
//   loginParams: null,
// };

// export default Login;



import { BackButton, Dropdown, FormComposer, Loader, Toast } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";
import Header from "../../../components/Header";

/* set employee details to enable backward compatiable */
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
  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [disable, setDisable] = useState(false);

  const history = useHistory();
  // const getUserType = () => "EMPLOYEE" || Digit.UserService.getType();

  useEffect(() => {
    if (!user) {
      return;
    }
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
    Digit.UserService.setUser(user);
    setEmployeeDetail(user?.info, user?.access_token);
    let redirectPath = "/digit-ui/employee";

    /* logic to redirect back to same screen where we left off  */
    if (window?.location?.href?.includes("from=")) {
      redirectPath = decodeURIComponent(window?.location?.href?.split("from=")?.[1]) || "/digit-ui/employee";
    }

    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "NATADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/NURT_DASHBOARD";
    }
    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "STADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/home";
    }

    history.replace(redirectPath);
  }, [user]);

  const onLogin = async (data) => {
    // if (!data.city) {
    //   alert("Please Select City!");
    //   return;
    // }
    setDisable(true);

    const requestData = {
      ...data,
      userType: "EMPLOYEE",
    };
    // requestData.tenantId = data.city.code;
    requestData.tenantId = "pg.citya";
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

  const closeToast = () => {
    setShowToast(null);
  };

  const onForgotPassword = () => {
    sessionStorage.getItem("User") && sessionStorage.removeItem("User")
    history.push("/digit-ui/employee/user/forgot-password");
  };

  const [userId, password, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: userId.name,
          },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: {
            name: password.name,
          },
          isMandatory: true,
        },
        // {
        //   label: t(city.label),
        //   type: city.type,
        //   populators: {
        //     name: city.name,
        //     customProps: {},
        //     component: (props, customProps) => (
        //       <Dropdown
        //         style={{ border: "1px solid" }}
        //         option={cities}
        //         className="login-city-dd"
        //         optionKey="i18nKey"
        //         select={(d) => {
        //           props.onChange(d);
        //         }}
        //         t={t}
        //         {...customProps}
        //       />
        //     ),
        //   },
        //   isMandatory: true,
        // },
      ],
    },
  ];

  return isLoading || isStoreLoading ? (
    <Loader />
  ) : (

    <Background>
 <div style={topBarStyle}>
  <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg" alt="MP Logo" style={mpLogoStyle} />
  
  {/* This new div will act as a container for the two text lines */}
  <div> 
    <div>मध्य प्रदेश सरकार</div>
    <div style={mpGovtTextEnglishStyle}>Government of Madhya Pradesh</div>
  </div>
</div>
      <div className="employeeBackbuttonAlign">
        <BackButton variant="white" style={{ borderBottom: "none" }} />
      </div>
      <div>
        <div style={{ background: "white", height: "100%", display: "flex" }}>
        <div>
        <div style={cardLeftSectionStyle}>
            {/* NEW WRAPPER FOR LOGO AND TEXT */}
            <div style={logoAndTextStyle}>
              <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%2014.svg" alt="IMC Logo" style={imcLogoStyle} />
              <div style={headingGroupStyle}> {/* Grouping the two text divs */}
                <div style={indoreHeadingStyle}>इंदौर नगर निगम</div>
                <div style={indoreSubHeadingStyle}>Indore Municipal Corporation</div>
              </div>
            </div>
            <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201807.svg" alt="Indore Map" style={mapImageStyle} />
            <div style={versionStyle}>Version v1.1</div>
          </div>
        </div>

          <div>
          <div><h2 style={welcomeHeadingStyle}>Welcome to</h2>
            <h1 style={emcHeadingStyle}>e-Indore Municipal Corporation (e-IMC)</h1>
            <hr style={dividerStyle} />
            <h3 style={imcLoginStyle}>IMC Login</h3></div>
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
            heading={propsConfig.texts.header}
            headingStyle={{ textAlign: "center" }}
            cardStyle={{ margin: "auto", minWidth: "408px" }}
            className="loginFormStyleEmployee"
            buttonStyle={{ maxWidth: "100%", width: "100%" }}
          >
            <Header />
          </FormComposer>
          </div>
        </div>
      </div>

      <div style={bottomFooterStyle}>© 2025 Copyright Indore Municipal Corporation</div>

      {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}

      {/* <div className="employee-login-home-footer" style={{ backgroundColor: "unset" }}> */}
      {/* <img
          alt="Powered by DIGIT"
          src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER_BW")}
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
          }}
        />{" "} */}

      {/* </div> */}

    </Background>
  );
};

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};
const logoAndTextStyle = {
  display: "flex",        
  alignItems: "center",   
  justifyContent: "center",
  marginBottom: "15px", 
  width: "100%",        
};
const headingGroupStyle = {
  display: "flex",
  flexDirection: "column", // Stack the two text divs vertically
  alignItems: "flex-start", // Align text to the left within this group
};

const indoreHeadingStyle = {
  marginLeft: "10px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "5px", // Space between "इंदौर नगर निगम" and "Indore Municipal Corporation"
  fontFamily: "Noto Sans Devanagari, sans-serif",
  textAlign: "left", // Align text to the left within its container
};

const indoreSubHeadingStyle = {
  marginLeft: "10px",
  fontSize: "14px",
  color: "#555",
  marginBottom: "0px", // No bottom margin needed here as it's the last in its group
  textAlign: "left", // Align text to the left within its container
};

const versionStyle = {
  fontSize: "12px",
  color: "#888",
  marginTop: "auto",
};


const topBarStyle = {
  backgroundColor: "#6b133f",
  color: "white",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  fontSize: "16px",
  fontFamily: "Roboto, sans-serif",
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 1000,
};

const mpLogoStyle = {
  height: "60px",
  width: "auto",
};

const mpGovtTextEnglishStyle = {
    fontSize: "12px",
  opacity: 0.9,
};

const mainCardContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 80px)",
  padding: "20px",
  paddingTop: "60px",
  boxSizing: "border-box",
};

const mainCardStyle = {
  backgroundColor: "white", // Main card background remains white
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  overflow: "hidden",
  maxWidth: "850px",
  width: "100%",
  minHeight: "480px",
};

const cardLeftSectionStyle = {
  flex: "1",
  minWidth: "300px",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  backgroundColor: "#ffffff", // Remains light grey
  borderRight: "1px solid #eee",
  textAlign: "center",
  boxSizing: "border-box",
};


const imcLogoStyle = {
  height: "70px",
  width: "auto",
  marginBottom: "15px",

};



const mapImageStyle = {
  width: "auto",
  height: "250px",
  marginBottom: "20px",
};


const cardRightSectionStyle = {
  flex: "1",
  minWidth: "400px",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  backgroundColor: 'rgba(94, 142, 217, 0.05)'
};

const welcomeHeadingStyle = {
  marginTop: '30px',
  fontSize: "19px",
  fontWeight: "bold",
  color: "#6B133F",
  textAlign: "center",
};

const emcHeadingStyle = {
  fontSize: "19px",
  fontWeight: "bold",
  color: "#6B133F",
  textAlign: "center",
};

const dividerStyle = {
  width: "30%",
  border: "none",
  borderTop: "5px solid #6b133f",
  marginBottom: '10px',
  marginLeft: '35%'
};

const imcLoginStyle = {
  fontSize: "19px",
  fontWeight: "bold",
  color: "#6B133F",
  textAlign: "center",

};

const bottomFooterStyle = {
  backgroundColor: "#6b133f",
  color: "white",
  padding: "10px 20px",
  textAlign: "center",
  fontSize: "14px",
  fontFamily: "Roboto, sans-serif",
  position: "fixed",
  width: "100%",
  bottom: 0,
  left: 0,
  zIndex: 1000,
};






export default Login;
