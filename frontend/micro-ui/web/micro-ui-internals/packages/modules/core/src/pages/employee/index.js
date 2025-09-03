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
        {/* User Routes - Login, Profile, etc. */}
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
                : { 
                    "--banner-url": `url(https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201809.svg)`, 
                    padding: "0px" 
                  }
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

        {/* Main Application Routes */}
        <Route>
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
          >
            {/* Main Content Area - Wrapped by TopBarSideBar */}
            <div 
              className="employee-main-content" 
              style={{ 
                background: "rgb(244, 242, 249)", 
                minHeight: "calc(100vh - 60px)",
                width: "100%"
              }}
            >
              <div className={`${DSO ? "" : ""}`}>
                <div 
                  className="employee-app-wrapper" 
                  style={{ 
                    margin: "0",
                    padding: mobileView ? "10px" : "10px",
                    marginTop: "20px",
                  }}
                >
                  <ErrorBoundary initData={initData}>
                    <AppModules 
                      stateCode={stateCode} 
                      userType="employee" 
                      modules={modules} 
                      appTenants={appTenants} 
                    />
                  </ErrorBoundary>
                </div>

                {/* Footer */}
                <div style={{
                  backgroundColor: "#6B133F",
                  color: "white",
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: 600,
                  marginTop: "16px",
                  fontFamily: "Inter",
                  fontSize: "16px",
                }}>
                  © 2025 Copyright Indore Municipal Corporation
                </div>

                {/* Optional: Extended Footer with Links */}
                {/* Uncomment below if you want the extended footer */}
                {/*
                <div style={{
                  backgroundColor: "#f9f9f9",
                  padding: "30px 20px",
                  borderTop: "1px solid #eee",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  color: "#333",
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}>
                    <div style={{ flex: "1", minWidth: "200px", margin: "10px 0" }}>
                      <div style={{ fontWeight: "bold", color: "#6b133f", marginBottom: "8px" }}>
                        Term and Policies
                      </div>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Privacy Policy
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Hyperlink Policy
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Website Policies
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Content Policies
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Contingency Plan
                      </a>
                    </div>

                    <div style={{ flex: "1", minWidth: "200px", margin: "10px 0" }}>
                      <div style={{ fontWeight: "bold", color: "#6b133f", marginBottom: "8px" }}>
                        About
                      </div>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        About Us
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Sitemap
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Terms of Use
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        MoRTH
                      </a>
                    </div>

                    <div style={{ flex: "1", minWidth: "200px", margin: "10px 0" }}>
                      <div style={{ fontWeight: "bold", color: "#6b133f", marginBottom: "8px" }}>
                        Resources
                      </div>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Fees and User Charges
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Act, Rule and Policies
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Permit Fees and Period
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Manual
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Homologation
                      </a>
                    </div>

                    <div style={{ flex: "1", minWidth: "200px", margin: "10px 0" }}>
                      <div style={{ fontWeight: "bold", color: "#6b133f", marginBottom: "8px" }}>
                        Need Help
                      </div>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Contact Us
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        FAQ's
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Raise a Concern
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Calendar
                      </a>
                      <a href="#" style={{ display: "block", textDecoration: "none", color: "#333", marginBottom: "5px" }}>
                        Web Information Manager
                      </a>
                    </div>
                  </div>

                  <div style={{
                    borderTop: "1px solid #eee",
                    paddingTop: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}>
                    <div>© 2025 Copyright Indore Municipal Corporation</div>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <img src="facebook-icon-url" alt="Facebook" style={{ height: "20px", width: "20px" }} />
                      <img src="x-icon-url" alt="X" style={{ height: "20px", width: "20px" }} />
                      <img src="instagram-icon-url" alt="Instagram" style={{ height: "20px", width: "20px" }} />
                      <img src="linkedin-icon-url" alt="LinkedIn" style={{ height: "20px", width: "20px" }} />
                      <img src="youtube-icon-url" alt="YouTube" style={{ height: "20px", width: "20px" }} />
                    </div>
                  </div>
                </div>
                */}
              </div>
            </div>
          </TopBarSideBar>
        </Route>

        {/* Default Route */}
        <Route>
          <Redirect to={`${path}/user/language-selection`} />
        </Route>
      </Switch>
    </div>
  );
};

export default EmployeeApp;