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

    const styles = {
      container: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f2f9",
        fontFamily: "'Inter', sans-serif",
        fontSize: "15px",
        fontWeight: 400,
      },
      sidebar: {
        width: "270px",
        backgroundColor: "white",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        transition: "width 0.3s",
        overflowX: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      },
      logoContainer: {
        display: "flex",
        alignItems: "center",
        padding: "10px 8px",
        minHeight: "70px",
      },
      logo: {
        maxWidth: "55px",
      },
      logoText: {
        marginLeft: "10px",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
      mainContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        //   marginLeft: "270px",
      },
      header: {
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#801d46",
        color: "white",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
      },
      toggleBtn: {
        fontSize: "20px",
        cursor: "pointer",
        position: "absolute",
      },
      headerNav: {
        display: "flex",
        gap: "20px",
        marginLeft: "50px",
      },
      headerNavLink: {
        color: "white",
        textDecoration: "none",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      headerRightNav: {
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
      },
      headerActions: {
        display: "flex",
        gap: "20px",
      },
      headerActionIcon: {
        color: "#fff",
        fontSize: "18px",
        background: "rgba(255,255,255,0.15)",
        padding: "8px",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
      },
      userProfile: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginLeft: "20px",
      },
      avatar: {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid white",
      },
      subHeader: {
        display: "flex",
        backgroundColor: "white",
        padding: "0 20px",
        borderBottom: "1px solid #eee",
      },
      tab: {
        padding: "15px 20px",
        color: "#333",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderBottom: "3px solid transparent",
      },
      tabActive: {
        borderBottomColor: "#801d46",
        color: "#801d46",
      },
      contentArea: {
        padding: "20px",
      },
      contentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      },
      filter: {
        backgroundColor: "white",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "270px",
      },
      statusCards: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "20px",
      },
      card: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      },
      cardContent: {
        marginLeft: "20px",
      },
      cardContentTitle: {
        fontSize: "25px",
        fontWeight: 800,
        marginBottom: "6px",
      },
      approved: { color: "#4caf50" },
      pending: { color: "#ff9800" },
      rejected: { color: "#f44336" },
      sendback: { color: "#2196f3" },
      actionCards: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        marginBottom: "20px",
      },
      actionCard: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      },
      actionIcon: {
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
        marginBottom: "10px",
        color: "#333",
      },
      footer: {
        backgroundColor: "#801d46",
        color: "white",
        padding: "15px 20px",
        textAlign: "center",
        marginTop: "40px",
      },
    };


    return (
      // http://localhost:3000/digit-ui/citizen/pt/property/citizen-search
      // digit-ui/citizen/pt/property/my-applications
      // /digit-ui/citizen/pt/property/new-application/info
      <React.Fragment>
        <Route key={index} path={`${path}/${code.toLowerCase()}-home`}>


          <div style={styles.container}>
            {/* Sidebar */}


            {/* Main Content */}
            <div style={styles.mainContent}>
              <div>
                {/* Header */}
                {/* <div style={styles.header}>
            <div style={styles.toggleBtn}>
              <i className="fas fa-bars" />
            </div>

            <div style={styles.headerNav}>
              <a style={styles.headerNavLink}><i className="fas fa-rupee-sign" /> Payment</a>
              <a style={styles.headerNavLink}><i className="fas fa-history" /> My Transactions</a>
              <a style={styles.headerNavLink}><i className="fas fa-download" /> Download Receipt</a>
            </div>

            <div style={styles.headerRightNav}>
              <div style={styles.headerActions}>
                {["bell", "comment", "gift", "cog"].map((icon) => (
                  <a style={styles.headerActionIcon} key={icon}>
                    <i className={`fas fa-${icon}`} />
                  </a>
                ))}
              </div>
              <div style={styles.userProfile}>
                <span>Hello, Samantha</span>
                <div style={styles.avatar}>
                  <img src="https://i.imgur.com/vT8WQEA.jpg" alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div> */}

                {/* Sub-header */}
                {/* <div style={styles.subHeader}>
            <a style={styles.tab}><i className="fas fa-heart" /> Marriage Certificate</a>
            <a style={styles.tab}><i className="fas fa-certificate" /> Birth / Death Certificate</a>
            <a style={{ ...styles.tab, ...styles.tabActive }}><i className="fas fa-plus" /></a>
          </div> */}

                {/* Content Area */}
                <div style={styles.contentArea}>
                  <div style={styles.contentHeader}>
                    <h2>Property</h2>
                    <div style={styles.filter}>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <i className="far fa-calendar" style={{ color: "#801d46", fontSize: "24px" }} />
                        <div>
                          <span style={{ fontSize: "14px", color: "#333" }}>Filter Period</span>
                          <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>17 April 2025 - 21 Jul 2025</p>
                        </div>
                      </div>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>



                  {/* Action Cards */}
                  <div style={styles.actionCards}>
                    {[
                      {
                        image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg",
                        text: "New Property Application",
                        link: "/digit-ui/citizen/pt/property/new-application",
                      },
                      {
                        image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg",
                        text: "Pay",
                        link: "/digit-ui/citizen/pt/property/citizen-search",
                      },
                      {
                        image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg",
                        text: "My Application",
                        link: "/digit-ui/citizen/pt/property/my-applications",
                      },
                      {
                        image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
                        text: "Duplicate Receipt",
                        link: "/digit-ui/employee/pt/inbox",
                      },
                      {
                        image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
                        text: "Delete Receipt",
                        link: "/digit-ui/employee/pt/inbox",
                      },
                      {
                        image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
                        text: "No dues apply",
                        link: "/digit-ui/employee/pt/inbox",
                      },
                    ].map((card) => (
                      <div style={styles.actionCard} key={card.text}>
                        <img src={card.image} alt={card.text} style={{ margin: "auto" }} />
                        <p>
                          <a href={card.link}>{card.text}</a>
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>


            </div>
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
          <div className="SideBarStatic" style={{ height: "100%", marginTop: "-55px" }}>
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
      <div style={styles.header}>
        © 2025 Copyright Indore Municipal Corporation
      </div>
    </div>
  );
};

export default Home;
