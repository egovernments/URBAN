// import React, { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { Redirect, Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
// import { AppModules } from "../../components/AppModules";
// import ErrorBoundary from "../../components/ErrorBoundaries";
// import TopBarSideBar from "../../components/TopBarSideBar";
// import ChangePassword from "./ChangePassword";
// import ForgotPassword from "./ForgotPassword";
// import LanguageSelection from "./LanguageSelection";
// import EmployeeLogin from "./Login";
// import UserProfile from "../citizen/Home/UserProfile";
// import ErrorComponent from "../../components/ErrorComponent";

// const userScreensExempted = ["user/profile", "user/error"];
//  const containerStyle = {
//     backgroundColor: "#f9f9f9",
//     padding: "30px 20px",
//     borderTop: "1px solid #eee",
//     fontFamily: "Arial, sans-serif",
//     fontSize: "14px",
//     color: "#333",
//   };

//   const innerContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     marginBottom: "20px",
//   };

//   const columnStyle = {
//     flex: "1",
//     minWidth: "200px",
//     margin: "10px 0",
//   };

//   const titleStyle = {
//     fontWeight: "bold",
//     color: "#6b133f",
//     marginBottom: "8px",
//   };

//   const linkStyle = {
//     display: "block",
//     textDecoration: "none",
//     color: "#333",
//     marginBottom: "5px",
//   };

//   const bottomBarStyle = {
//     borderTop: "1px solid #eee",
//     paddingTop: "15px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//   };

//   const socialIconsStyle = {
//     display: "flex",
//     gap: "12px",
//     alignItems: "center",
//   };

//   const iconStyle = {
//     height: "20px",
//     width: "20px",
//   };

// const EmployeeApp = ({
//   stateInfo,
//   userDetails,
//   CITIZEN,
//   cityDetails,
//   mobileView,
//   handleUserDropdownSelection,
//   logoUrl,
//   DSO,
//   stateCode,
//   modules,
//   appTenants,
//   sourceUrl,
//   pathname,
//   initData,
// }) => {
//   const history = useHistory();
//   const { t } = useTranslation();
//   const { path } = useRouteMatch();
//   const location = useLocation();
//   const showLanguageChange = location?.pathname?.includes("language-selection");
//   const isUserProfile = userScreensExempted.some((url) => location?.pathname?.includes(url));
//   useEffect(() => {
//     Digit.UserService.setType("employee");
//   }, []);

//   return (
//     <div className="employee">
//       <Switch>
//         <Route path={`${path}/user`}>
//           {isUserProfile && (
//             <TopBarSideBar
//               t={t}
//               stateInfo={stateInfo}
//               userDetails={userDetails}
//               CITIZEN={CITIZEN}
//               cityDetails={cityDetails}
//               mobileView={mobileView}
//               handleUserDropdownSelection={handleUserDropdownSelection}
//               logoUrl={logoUrl}
//               showSidebar={isUserProfile ? true : false}
//               showLanguageChange={!showLanguageChange}
//             />
//           )}
//           <div
//             className={isUserProfile ? "grounded-container" : "loginContainer"}
//             style={
//               isUserProfile
//                 ? { padding: 0, paddingTop: "80px", marginLeft: mobileView ? "" : "64px" }
//                 : { "--banner-url": `url(${stateInfo?.bannerUrl})`, padding: "0px" }
//             }
//           >
//             <Switch>
//               <Route path={`${path}/user/login`}>
//                 <EmployeeLogin />
//               </Route>
//               <Route path={`${path}/user/forgot-password`}>
//                 <ForgotPassword />
//               </Route>
//               <Route path={`${path}/user/change-password`}>
//                 <ChangePassword />
//               </Route>
//               <Route path={`${path}/user/profile`}>
//                 <UserProfile stateCode={stateCode} userType={"employee"} cityDetails={cityDetails} />
//               </Route>
//               <Route path={`${path}/user/error`}>
//                 <ErrorComponent
//                   initData={initData}
//                   goToHome={() => {
//                     history.push("/digit-ui/employee");
//                   }}
//                 />
//               </Route>
//               <Route path={`${path}/user/language-selection`}>
//                 <LanguageSelection />
//               </Route>
//               <Route>
//                 <Redirect to={`${path}/user/language-selection`} />
//               </Route>
//             </Switch>
//           </div>
//         </Route>
//         <Route>
//           <TopBarSideBar
//             t={t}
//             stateInfo={stateInfo}
//             userDetails={userDetails}
//             CITIZEN={CITIZEN}
//             cityDetails={cityDetails}
//             mobileView={mobileView}
//             handleUserDropdownSelection={handleUserDropdownSelection}
//             logoUrl={logoUrl}
//             modules={modules}
//           />
//           <div className={`main ${DSO ? "m-auto" : ""}`}>
//             <div className="employee-app-wrapper">
//               <ErrorBoundary initData={initData}>
//                 <AppModules stateCode={stateCode} userType="employee" modules={modules} appTenants={appTenants} />
//               </ErrorBoundary>
//             </div>
//             {/* <div className="employee-home-footer">
//               <img
//                 alt="Powered by DIGIT"
//                 src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER")}
//                 style={{ height: "1.1em", cursor: "pointer" }}
//                 onClick={() => {
//                   window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
//                 }}
//               />
//             </div> */}
//             <div style={containerStyle}>
//       <div style={innerContainerStyle}>
//         <div style={columnStyle}>
//           <div style={titleStyle}>Term and Policies</div>
//           <a href="#" style={linkStyle}>Privacy Policy</a>
//           <a href="#" style={linkStyle}>Hyperlink Policy</a>
//           <a href="#" style={linkStyle}>Website Policies</a>
//           <a href="#" style={linkStyle}>Content Policies</a>
//           <a href="#" style={linkStyle}>Contingency Plan</a>
//         </div>
//         <div style={columnStyle}>
//           <div style={titleStyle}>About</div>
//           <a href="#" style={linkStyle}>About Us</a>
//           <a href="#" style={linkStyle}>Sitemap</a>
//           <a href="#" style={linkStyle}>Terms of Use</a>
//           <a href="#" style={linkStyle}>MoRTH</a>
//         </div>
//         <div style={columnStyle}>
//           <div style={titleStyle}>Recources</div>
//           <a href="#" style={linkStyle}>Fees and User Charges</a>
//           <a href="#" style={linkStyle}>Act, Rule and Policies</a>
//           <a href="#" style={linkStyle}>Permit Fees and Period</a>
//           <a href="#" style={linkStyle}>Manual</a>
//           <a href="#" style={linkStyle}>Homologation</a>
//         </div>
//         <div style={columnStyle}>
//           <div style={titleStyle}>Need Help</div>
//           <a href="#" style={linkStyle}>Contact Us</a>
//           <a href="#" style={linkStyle}>FAQ's</a>
//           <a href="#" style={linkStyle}>Raise a Concern</a>
//           <a href="#" style={linkStyle}>Calendar</a>
//           <a href="#" style={linkStyle}>Web Information Manager</a>
//         </div>
//       </div>
//       <div style={bottomBarStyle}>
//         <div>© 2025 Copyright Indore Municipal Corporation</div>
//         <div style={socialIconsStyle}>
//           <img src="facebook-icon-url" alt="Facebook" style={iconStyle} />
//           <img src="x-icon-url" alt="X" style={iconStyle} />
//           <img src="instagram-icon-url" alt="Instagram" style={iconStyle} />
//           <img src="linkedin-icon-url" alt="LinkedIn" style={iconStyle} />
//           <img src="youtube-icon-url" alt="YouTube" style={iconStyle} />
//         </div>
//       </div>
//     </div>
//           </div>
//         </Route>
//         <Route>
//           <Redirect to={`${path}/user/language-selection`} />
//         </Route>
//       </Switch>
//     </div>
//   );
// };

// export default EmployeeApp;


import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { AppModules } from "../../components/AppModules";
import ErrorBoundary from "../../components/ErrorBoundaries";
import TopBarSideBar from "../../components/TopBarSideBar";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import LanguageSelection from "./LanguageSelection";
import EmployeeLogin from "./Login";
import UserProfile from "../citizen/Home/UserProfile";
import ErrorComponent from "../../components/ErrorComponent";

const userScreensExempted = ["user/profile", "user/error"];
const styles = {
  header: {
    backgroundColor: "#6B133F",
    color: "white",
    padding: "10px",
    textAlign: "center",
    fontWeight: 600,
    marginTop: "16px",
    fontFamily: "Inter",
    fontSize: "16px",

  },
}

const EmployeeApp = ({
  stateInfo,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  handleUserDropdownSelection,
  logoUrl,
  DSO,
  stateCode,
  modules,
  appTenants,
  sourceUrl,
  pathname,
  initData,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const location = useLocation();
  const showLanguageChange = location?.pathname?.includes("language-selection");
  const isUserProfile = userScreensExempted.some((url) => location?.pathname?.includes(url));
  useEffect(() => {
    Digit.UserService.setType("employee");
  }, []);

  return (
    <div className="employee">
      <Switch>
        <Route path={`${path}/user`}>
          {isUserProfile && (
            <TopBarSideBar
              t={t}
              stateInfo={stateInfo}
              userDetails={userDetails}
              CITIZEN={CITIZEN}
              cityDetails={cityDetails}
              mobileView={mobileView}
              handleUserDropdownSelection={handleUserDropdownSelection}
              logoUrl={logoUrl}
              showSidebar={isUserProfile ? true : false}
              showLanguageChange={!showLanguageChange}
            />
          )}
          <div
            className={isUserProfile ? "grounded-container" : "loginContainer"}
            style={
              isUserProfile
                ? { padding: 0, paddingTop: "80px", marginLeft: mobileView ? "" : "64px" }
                :  { "--banner-url": `url(https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201809.svg)`, padding: "0px" }
                // { "--banner-url": `url(${stateInfo?.bannerUrl})`, padding: "0px" }  
            }
          >
            <Switch>
              <Route path={`${path}/user/login`}>
                <EmployeeLogin />
              </Route>
              <Route path={`${path}/user/forgot-password`}>
                <ForgotPassword />
              </Route>
              <Route path={`${path}/user/change-password`}>
                <ChangePassword />
              </Route>
              <Route path={`${path}/user/profile`}>
                <UserProfile stateCode={stateCode} userType={"employee"} cityDetails={cityDetails} />
              </Route>
              <Route path={`${path}/user/error`}>
                <ErrorComponent
                  initData={initData}
                  goToHome={() => {
                    history.push("/digit-ui/employee");
                  }}
                />
              </Route>
              <Route path={`${path}/user/language-selection`}>
                <LanguageSelection />
              </Route>
              <Route>
                <Redirect to={`${path}/user/language-selection`} />
              </Route>
            </Switch>
          </div>
        </Route>
        <Route>
          <div style={{width: "100%" ,display: "flex",marginTop:"77px"}}>
            {/* Sidebar - 25% */}
            <div style={{width:"20%"}}>
              <TopBarSideBar
                t={t}
                stateInfo={stateInfo}
                userDetails={userDetails}
                CITIZEN={CITIZEN}
                cityDetails={cityDetails}
                mobileView={mobileView}
                handleUserDropdownSelection={handleUserDropdownSelection}
                logoUrl={logoUrl}
                modules={modules}
              />
            </div>
            <div style={{ width: "80%" ,background:"rgb(244, 242, 249)"}}>
              <div className={` ${DSO ? "" : ""}`} style={{marginTop: ""}}>
                <div className="employee-app-wrapper" style={{ margin: "0" }}>
                  <ErrorBoundary initData={initData}>
                    <AppModules stateCode={stateCode} userType="employee" modules={modules} appTenants={appTenants} />
                  </ErrorBoundary>
                </div>
                {/* <div className="employee-home-footer">
              <img
                alt="Powered by DIGIT"
                src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER")}
                style={{ height: "1.1em", cursor: "pointer" }}
                onClick={() => {
                  window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
                }}
              />
            </div> */}
                <div style={styles.header}>
        © 2025 Copyright Indore Municipal Corporation
      </div>
              </div>
            </div>
          </div>
        </Route>
        <Route>
          <Redirect to={`${path}/user/language-selection`} />
        </Route>
      </Switch>
    </div>
  );
};

export default EmployeeApp;
