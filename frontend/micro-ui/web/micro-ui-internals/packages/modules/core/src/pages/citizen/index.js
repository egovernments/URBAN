// import { BackButton, WhatsappIcon, Card, CitizenHomeCard, CitizenInfoLabel, PrivateRoute } from "@egovernments/digit-ui-react-components";
// import React from "react";
// import { useTranslation } from "react-i18next";
// import { Route, Switch, useRouteMatch, useHistory, Link } from "react-router-dom";
// import ErrorBoundary from "../../components/ErrorBoundaries";
// import { AppHome, processLinkData } from "../../components/Home";
// import TopBarSideBar from "../../components/TopBarSideBar";
// import StaticCitizenSideBar from "../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
// import CitizenHome from "./Home";
// import LanguageSelection from "./Home/LanguageSelection";
// import LocationSelection from "./Home/LocationSelection";
// import Login from "./Login";
// import UserProfile from "./Home/UserProfile";
// import ErrorComponent from "../../components/ErrorComponent";
// import FAQsSection from "./FAQs/FAQs";
// import HowItWorks from "./HowItWorks/howItWorks";
// import StaticDynamicCard from "./StaticDynamicComponent/StaticDynamicCard";
// import AcknowledgementCF from "../../components/AcknowledgementCF";
// import CitizenFeedback from "../../components/CitizenFeedback";
// import Search from "./SearchApp";
// const sidebarHiddenFor = [
//   "digit-ui/citizen/register/name",
//   "/digit-ui/citizen/select-language",
//   "/digit-ui/citizen/select-location",
//   "/digit-ui/citizen/login",
//   "/digit-ui/citizen/register/otp",
// ];

// const getTenants = (codes, tenants) => {
//   return tenants.filter((tenant) => codes.map((item) => item.code).includes(tenant.code));
// };

// const Home = ({
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
//   const { isLoading: islinkDataLoading, data: linkData, isFetched: isLinkDataFetched } = Digit.Hooks.useCustomMDMS(
//     Digit.ULBService.getStateId(),
//     "ACCESSCONTROL-ACTIONS-TEST",
//     [
//       {
//         name: "actions-test",
//         filter: "[?(@.url == 'digit-ui-card')]",
//       },
//     ],
//     {
//       select: (data) => {
//         const formattedData = data?.["ACCESSCONTROL-ACTIONS-TEST"]?.["actions-test"]
//           ?.filter((el) => el.enabled === true)
//           .reduce((a, b) => {
//             a[b.parentModule] = a[b.parentModule]?.length > 0 ? [b, ...a[b.parentModule]] : [b];
//             return a;
//           }, {});
//         return formattedData;
//       },
//     }
//   );

//   const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
//   const { t } = useTranslation();
//   const { path } = useRouteMatch();
//   const history = useHistory();
//   const handleClickOnWhatsApp = (obj) => {
//     window.open(obj);
//   };

//   const hideSidebar = sidebarHiddenFor.some((e) => window.location.href.includes(e));
//   const appRoutes = modules?.map(({ code, tenants }, index) => {
//     const Module = Digit.ComponentRegistryService.getComponent(`${code}Module`);
//     return Module ? (
//       <Route key={index} path={`${path}/${code.toLowerCase()}`}>
//         <Module stateCode={stateCode} moduleCode={code} userType="citizen" tenants={getTenants(tenants, appTenants)} />
//       </Route>
//     ) : null;
//   });

//   const ModuleLevelLinkHomePages = modules?.map(({ code, bannerImage }, index) => {
//     let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
//     let mdmsDataObj = isLinkDataFetched ? processLinkData(linkData, code, t) : undefined;

//     //if (mdmsDataObj?.header === "ACTION_TEST_WS") {
//     mdmsDataObj?.links &&
//       mdmsDataObj?.links.sort((a, b) => {
//         return a.orderNumber - b.orderNumber;
//       });
//     // }
//     return (
//       <React.Fragment>
//         <Route key={index} path={`${path}/${code.toLowerCase()}-home`}>
//           <div className="moduleLinkHomePage">
//             <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
//             <BackButton className="moduleLinkHomePageBackButton" />
//             <h1>{t("MODULE_" + code.toUpperCase())}</h1>
//             <div className="moduleLinkHomePageModuleLinks">
//               {mdmsDataObj && (
//                 <CitizenHomeCard
//                   header={t(mdmsDataObj?.header)}
//                   links={mdmsDataObj?.links}
//                   Icon={() => <span />}
//                   Info={
//                     code === "OBPS"
//                       ? () => (
//                           <CitizenInfoLabel
//                             style={{ margin: "0px", padding: "10px" }}
//                             info={t("CS_FILE_APPLICATION_INFO_LABEL")}
//                             text={t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)}
//                           />
//                         )
//                       : null
//                   }
//                   isInfo={code === "OBPS" ? true : false}
//                 />
//               )}
//               {/* <Links key={index} matchPath={`/digit-ui/citizen/${code.toLowerCase()}`} userType={"citizen"} /> */}
//             </div>
//             <StaticDynamicCard moduleCode={code?.toUpperCase()} />
//           </div>
//         </Route>
//         <Route key={"faq" + index} path={`${path}/${code.toLowerCase()}-faq`}>
//           <FAQsSection module={code?.toUpperCase()} />
//         </Route>
//         <Route key={"hiw" + index} path={`${path}/${code.toLowerCase()}-how-it-works`}>
//           <HowItWorks module={code?.toUpperCase()} />
//         </Route>
//       </React.Fragment>
//     );
//   });

//   return (
//     <div className={classname}>
//       <TopBarSideBar
//         t={t}
//         stateInfo={stateInfo}
//         userDetails={userDetails}
//         CITIZEN={CITIZEN}
//         cityDetails={cityDetails}
//         mobileView={mobileView}
//         handleUserDropdownSelection={handleUserDropdownSelection}
//         logoUrl={logoUrl}
//         showSidebar={true}
//         linkData={linkData}
//         islinkDataLoading={islinkDataLoading}
//       />

//       <div className={`main center-container citizen-home-container mb-25`}>
//         {hideSidebar ? null : (
//           <div className="SideBarStatic">
//             <StaticCitizenSideBar linkData={linkData} islinkDataLoading={islinkDataLoading} />
//           </div>
//         )}

//         <Switch>
//           <Route exact path={path}>
//             <CitizenHome />
//           </Route>

//           <PrivateRoute path={`${path}/feedback`} component={CitizenFeedback}></PrivateRoute>
//           <PrivateRoute path={`${path}/feedback-acknowledgement`} component={AcknowledgementCF}></PrivateRoute>

//           <Route exact path={`${path}/select-language`}>
//             <LanguageSelection />
//           </Route>

//           <Route exact path={`${path}/select-location`}>
//             <LocationSelection />
//           </Route>
//           <Route path={`${path}/error`}>
//             <ErrorComponent
//               initData={initData}
//               goToHome={() => {
//                 history.push("/digit-ui/citizen");
//               }}
//             />
//           </Route>
//           <Route path={`${path}/all-services`}>
//             <AppHome
//               userType="citizen"
//               modules={modules}
//               getCitizenMenu={linkData}
//               fetchedCitizen={isLinkDataFetched}
//               isLoading={islinkDataLoading}
//             />
//           </Route>

//           <Route path={`${path}/login`}>
//             <Login stateCode={stateCode} />
//           </Route>

//           <Route path={`${path}/register`}>
//             <Login stateCode={stateCode} isUserRegistered={false} />
//           </Route>

//           <Route path={`${path}/user/profile`}>
//             <UserProfile stateCode={stateCode} userType={"citizen"} cityDetails={cityDetails} />
//           </Route>

//           <Route path={`${path}/Audit`}>
//             <Search />
//           </Route>
//           <ErrorBoundary initData={initData}>
//             {appRoutes}
//             {ModuleLevelLinkHomePages}
//           </ErrorBoundary>
//         </Switch>
//       </div>
//       <div className="citizen-home-footer" style={window.location.href.includes("citizen/obps") ? { zIndex: "-1" } : {}}>
//         <img
//           alt="Powered by DIGIT"
//           src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER")}
//           style={{ height: "1.2em", cursor: "pointer" }}
//           onClick={() => {
//             window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;


import { BackButton, WhatsappIcon, Card, CitizenHomeCard, CitizenInfoLabel, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useRouteMatch, useHistory, Link } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundaries";
import { AppHome, processLinkData } from "../../components/Home";
import TopBarSideBar from "../../components/TopBarSideBar";
import StaticCitizenSideBar from "../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
import CitizenHome from "./Home";
import LanguageSelection from "./Home/LanguageSelection";
import LocationSelection from "./Home/LocationSelection";
import Login from "./Login";
import UserProfile from "./Home/UserProfile";
import ErrorComponent from "../../components/ErrorComponent";
import FAQsSection from "./FAQs/FAQs";
import HowItWorks from "./HowItWorks/howItWorks";
import StaticDynamicCard from "./StaticDynamicComponent/StaticDynamicCard";
import AcknowledgementCF from "../../components/AcknowledgementCF";
import CitizenFeedback from "../../components/CitizenFeedback";
import Search from "./SearchApp";
const containerStyle = {
    backgroundColor: "#f9f9f9",
    padding: "30px 20px",
    borderTop: "1px solid #eee",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#333",
  };

  const innerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "20px",
  };

  const columnStyle = {
    flex: "1",
    minWidth: "200px",
    margin: "10px 0",
  };

  const titleStyle = {
    fontWeight: "bold",
    color: "#1a5fc2",
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
const sidebarHiddenFor = [
  "digit-ui/citizen/register/name",
  "/digit-ui/citizen/select-language",
  "/digit-ui/citizen/select-location",
  "/digit-ui/citizen/login",
  "/digit-ui/citizen/register/otp",
];

const getTenants = (codes, tenants) => {
  return tenants.filter((tenant) => codes.map((item) => item.code).includes(tenant.code));
};

const Home = ({
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
  const { isLoading: islinkDataLoading, data: linkData, isFetched: isLinkDataFetched } = Digit.Hooks.useCustomMDMS(
    Digit.ULBService.getStateId(),
    "ACCESSCONTROL-ACTIONS-TEST",
    [
      {
        name: "actions-test",
        filter: "[?(@.url == 'digit-ui-card')]",
      },
    ],
    {
      select: (data) => {
        const formattedData = data?.["ACCESSCONTROL-ACTIONS-TEST"]?.["actions-test"]
          ?.filter((el) => el.enabled === true)
          .reduce((a, b) => {
            a[b.parentModule] = a[b.parentModule]?.length > 0 ? [b, ...a[b.parentModule]] : [b];
            return a;
          }, {});
        return formattedData;
      },
    }
  );

  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const history = useHistory();
  const handleClickOnWhatsApp = (obj) => {
    window.open(obj);
  };

  const hideSidebar = sidebarHiddenFor.some((e) => window.location.href.includes(e));
  const appRoutes = modules?.map(({ code, tenants }, index) => {
    const Module = Digit.ComponentRegistryService.getComponent(`${code}Module`);
    return Module ? (
      <Route key={index} path={`${path}/${code.toLowerCase()}`}>
        <Module stateCode={stateCode} moduleCode={code} userType="citizen" tenants={getTenants(tenants, appTenants)} />
      </Route>
    ) : null;
  });

  const ModuleLevelLinkHomePages = modules?.map(({ code, bannerImage }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    let mdmsDataObj = isLinkDataFetched ? processLinkData(linkData, code, t) : undefined;

    //if (mdmsDataObj?.header === "ACTION_TEST_WS") {
    mdmsDataObj?.links &&
      mdmsDataObj?.links.sort((a, b) => {
        return a.orderNumber - b.orderNumber;
      });
    // }
  

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    color: "#6b133f", // purple-700
  };

  const linkStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b133f",
    textDecoration: "none",
  };

  const serviceItemStyle = {
    display: "flex",
    alignItems: "center",
    color: "#282828",
    fontWeight: "400",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "16px",
  };


    return (
      // http://localhost:3000/digit-ui/citizen/pt/property/citizen-search
      // digit-ui/citizen/pt/property/my-applications
      // /digit-ui/citizen/pt/property/new-application/info
      <React.Fragment>
        <Route key={index} path={`${path}/${code.toLowerCase()}-home`}>
          <div className="moduleLinkHomePage" style={{marginTop: "0px"}}>
                <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
                width: "50%",
                height: "231px",
                padding: "16px"
              }}
            >
              <Card
                style={{
                  maxWidth: "none",
                  border: "1px solid #D1D5DB80",
                  background: "linear-gradient(90deg, #EDEDED 0%, #FFFFFF 100%)",
                  padding: "16px",
                }}
               
              >
                <div style={headerStyle}>
                  <span style={titleStyle}>Property Tax</span>
                  <Link to="/view-all" style={linkStyle}>
                    View all
                  </Link>
                </div>
                <div style={serviceItemStyle}  onClick={() => history.push("/digit-ui/citizen/pt/property/citizen-search")}>Search and Pay</div>
                <div style={serviceItemStyle}  onClick={() => history.push("/digit-ui/citizen/pt/property/new-application")}>Create Property</div>
                <div style={serviceItemStyle} onClick={() => history.push("/digit-ui/citizen/pt/property/my-applications")}  >My Applications</div>
                {/* More content */}
              </Card>
            
             
            
              {/* Add more Cards as needed */}
            </div>
            {/* <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
            <BackButton className="moduleLinkHomePageBackButton" />
            <h1>{t("MODULE_" + code.toUpperCase())}</h1>
            <div className="moduleLinkHomePageModuleLinks">
              {mdmsDataObj && (
                <CitizenHomeCard
                  header={t(mdmsDataObj?.header)}
                  links={mdmsDataObj?.links}
                  Icon={() => <span />}
                  Info={
                    code === "OBPS"
                      ? () => (
                          <CitizenInfoLabel
                            style={{ margin: "0px", padding: "10px" }}
                            info={t("CS_FILE_APPLICATION_INFO_LABEL")}
                            text={t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)}
                          />
                        )
                      : null
                  }
                  isInfo={code === "OBPS" ? true : false}
                />
              )}
          
            </div> */}
            {/* <StaticDynamicCard moduleCode={code?.toUpperCase()} /> */}
          </div>
        </Route>
        <Route key={"faq" + index} path={`${path}/${code.toLowerCase()}-faq`}>
          <FAQsSection module={code?.toUpperCase()} />
        </Route>
        <Route key={"hiw" + index} path={`${path}/${code.toLowerCase()}-how-it-works`}>
          <HowItWorks module={code?.toUpperCase()} />
        </Route>
      </React.Fragment>
    );
  });

  return (
    <div className={classname}>
      <TopBarSideBar
        t={t}
        stateInfo={stateInfo}
        userDetails={userDetails}
        CITIZEN={CITIZEN}
        cityDetails={cityDetails}
        mobileView={mobileView}
        handleUserDropdownSelection={handleUserDropdownSelection}
        logoUrl={logoUrl}
        showSidebar={true}
        linkData={linkData}
        islinkDataLoading={islinkDataLoading}
      />

      <div className={`main center-container citizen-home-container mb-25`}>
        {hideSidebar ? null : (
          <div className="SideBarStatic" style={{height:"100%",marginTop:"-55px"}}>
            <StaticCitizenSideBar linkData={linkData} islinkDataLoading={islinkDataLoading} />
          </div>
        )}

        <Switch>
          <Route exact path={path}>
            <CitizenHome />
          </Route>

          <PrivateRoute path={`${path}/feedback`} component={CitizenFeedback}></PrivateRoute>
          <PrivateRoute path={`${path}/feedback-acknowledgement`} component={AcknowledgementCF}></PrivateRoute>

          <Route exact path={`${path}/select-language`}>
            <LanguageSelection />
          </Route>

          <Route exact path={`${path}/select-location`}>
            <LocationSelection />
          </Route>
          <Route path={`${path}/error`}>
            <ErrorComponent
              initData={initData}
              goToHome={() => {
                history.push("/digit-ui/citizen");
              }}
            />
          </Route>
          <Route path={`${path}/all-services`}>
            <AppHome
              userType="citizen"
              modules={modules}
              getCitizenMenu={linkData}
              fetchedCitizen={isLinkDataFetched}
              isLoading={islinkDataLoading}
            />
          </Route>

          <Route path={`${path}/login`}>
            <Login stateCode={stateCode} />
          </Route>

          <Route path={`${path}/register`}>
            <Login stateCode={stateCode} isUserRegistered={false} />
          </Route>

          <Route path={`${path}/user/profile`}>
            <UserProfile stateCode={stateCode} userType={"citizen"} cityDetails={cityDetails} />
          </Route>

          <Route path={`${path}/Audit`}>
            <Search />
          </Route>
          <ErrorBoundary initData={initData}>
            {appRoutes}
            {ModuleLevelLinkHomePages}
          </ErrorBoundary>
        </Switch>
      </div>
      {/* <div className="citizen-home-footer" style={window.location.href.includes("citizen/obps") ? { zIndex: "-1" } : {}}>
        <img
          alt="Powered by DIGIT"
          src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER")}
          style={{ height: "1.2em", cursor: "pointer" }}
          onClick={() => {
            window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
          }}
        />
      </div> */}
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
  );
};

export default Home;
