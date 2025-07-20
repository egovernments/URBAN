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
      <div className="employeeBackbuttonAlign">
        <BackButton variant="white" style={{ borderBottom: "none" }} />
      </div>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div style={{ background: "white", height: "100%" }}>
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
        <div style={{ width: "100%", position: "relative",background: "linear-gradient(180deg, rgba(5, 117, 230, 0.5) 0%, rgba(89, 50, 234, 0.5) 84.79%, rgba(2, 27, 121, 0.5) 100%)" }}>
          <div style={{marginTop:"200px"}}>
            <div style={headingStyle}>e-<strong>NagarPalika</strong></div>
            <div style={subtitleStyle}><em>Your City, Your Services – One Login Away!</em></div>
          </div>
          <div style={containerStyle}>
            <div style={innerContainerStyle}>
              <div style={columnStyle}>
                <div style={titleStyle}>Term and Policies</div>
                <a href="#" style={linkStyle}>Privacy Policy</a>
                <a href="#" style={linkStyle}>Hyperlink Policy</a>
                <a href="#" style={linkStyle}>Website Policies</a>
                <a href="#" style={linkStyle}>Content Policies</a>
                <a href="#" style={linkStyle}>Contingency Plan</a>
              </div>
              <div style={columnStyle}>
                <div style={titleStyle}>About</div>
                <a href="#" style={linkStyle}>About Us</a>
                <a href="#" style={linkStyle}>Sitemap</a>
                <a href="#" style={linkStyle}>Terms of Use</a>
                <a href="#" style={linkStyle}>MoRTH</a>
              </div>
              <div style={columnStyle}>
                <div style={titleStyle}>Recources</div>
                <a href="#" style={linkStyle}>Fees and User Charges</a>
                <a href="#" style={linkStyle}>Act, Rule and Policies</a>
                <a href="#" style={linkStyle}>Permit Fees and Period</a>
                <a href="#" style={linkStyle}>Manual</a>
                <a href="#" style={linkStyle}>Homologation</a>
              </div>
              <div style={columnStyle}>
                <div style={titleStyle}>Need Help</div>
                <a href="#" style={linkStyle}>Contact Us</a>
                <a href="#" style={linkStyle}>FAQ's</a>
                <a href="#" style={linkStyle}>Raise a Concern</a>
                <a href="#" style={linkStyle}>Calendar</a>
                <a href="#" style={linkStyle}>Web Information Manager</a>
              </div>
            </div>
            <div style={bottomBarStyle}>
              <div>© 2025 Copyright Indore Municipal Corporation</div>
              <div style={socialIconsStyle}>
                <img src="facebook-icon-url" alt="Facebook" style={iconStyle} />
                <img src="x-icon-url" alt="X" style={iconStyle} />
                <img src="instagram-icon-url" alt="Instagram" style={iconStyle} />
                <img src="linkedin-icon-url" alt="LinkedIn" style={iconStyle} />
                <img src="youtube-icon-url" alt="YouTube" style={iconStyle} />
              </div>
            </div>
          </div>
        </div>

      </div>

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
const headingStyle = {
  fontFamily: "Poppins, sans-serif",
  fontWeight: 700,
  fontSize: "40px",
  lineHeight: "100%",
  letterSpacing: "0%",
  textAlign: "center",
  color: "white"
};
const subtitleStyle = {
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  fontStyle: "italic",
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0%",
  textAlign: "center",
  marginTop: "10px",
  color: "white"
};
const containerStyle = {
  backgroundColor: "#f9f9f9",
  padding: "30px 20px",
  borderTop: "1px solid #eee",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  color: "#333",
  position: "absolute",
  bottom: 0,
  width: "100%"

};

const innerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const columnStyle = {
  flex: "1",
  minWidth: "155px",
  margin: "10px 0",
};

const titleStyle = {
  fontWeight: "bold",
  color: "#6b133f",
  marginBottom: "8px",
};

const linkStyle = {
  display: "block",
  textDecoration: "none",
  color: "#333",
  marginBottom: "5px",
};

const bottomBarStyle = {
  borderTop: "1px solid #eee",
  paddingTop: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const socialIconsStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const iconStyle = {
  height: "20px",
  width: "20px",
};
export default Login;
