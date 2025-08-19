import React, { useEffect } from "react";
import {
  StandaloneSearchBar,
  Loader,
  CardBasedOptions,
  ComplaintIcon,
  PTIcon,
  CaseIcon,
  DropIcon,
  HomeIcon,
  Calender,
  DocumentIcon,
  HelpIcon,
  WhatsNewCard,
  OBPSIcon,
  WSICon,
  Card
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
import { max } from "lodash";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = Digit.UserService.getUser();
  const accessToken = user?.access_token;
  const refreshToken = user?.refresh_token;
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  // let isMobile = window.Digit.Utils.browser.isMobile();
  if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = window.innerWidth <= 600; // breakpoint

  const isTablet = windowWidth > 768 && windowWidth <= 998;
  const isDesktop = windowWidth > 998;


  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (!Digit.UserService?.getUser()?.access_token) return false;
    return true;
  };

  const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  if (!tenantId) {
    Digit.SessionStorage.get("locale") === null
      ? history.push(`/digit-ui/citizen/select-language`)
      : history.push(`/digit-ui/citizen/select-location`);
  }



  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="main-content"
      style={{ display: "flex", flexDirection: "column", transition: "margin-left 0.3s", width: "100%" }}
    >
      <div className="main-content-wrapper" style={{ flex: 1 }}>
        <div className="content-area" style={{ padding: isDesktop ? 20 : isTablet ? 15 : 10 }}>
          <div
            className="content-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              flexWrap: isMobile ? "wrap" : "nowrap",
            }}
          >
            {/* <h2
              style={{
                fontWeight: "700",
                fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
                display: "flex",
                alignItems: "center",
                margin: 0,
              }}
            >
              <i className="fa-regular fa-star" style={{ marginRight: 10 }}></i>
              Payment Cart check
            </h2>
            <div
              className="filter"
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: `${isDesktop ? 10 : isTablet ? 8 : 6}px ${isDesktop ? 20 : isTablet ? 15 : 10}px`,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                width: isDesktop ? 270 : isTablet ? 220 : 180,
                marginTop: isMobile ? 15 : 0,
              }}
            >
              <div className="filter-container" style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <i
                  className="far fa-calendar"
                  style={{ color: "#801d46", fontSize: isDesktop ? 26 : isTablet ? 24 : 22 }}
                ></i>
                <div>
                  <span style={{ fontSize: isDesktop ? 14 : isTablet ? 13 : 12, color: "#333" }}>Filter Period</span>
                  <p style={{ fontSize: isDesktop ? 12 : isTablet ? 11 : 10, color: "#666", margin: 0 }}>
                    17 April 2025 - 21 Jul 2025
                  </p>
                </div>
              </div>
              <i className="fas fa-chevron-down"></i>
            </div> */}
          </div>

      <div className="card-header-view" style={{ marginBottom: 15 }}>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                }}
              >
                <i className="fa-regular fa-star" style={{ marginRight: 10 }}></i>
                Status Card
              </h2>
            </div>
          <div
            className="status-cards home-stats-card"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              marginBottom: "20px"
            }}
          >
            {[
              
              { url: `${stateInfo.BAPURL}dashboard?type=1&accessToken=${accessToken}&refreshToken=${refreshToken}&module=marriage`, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg", label: "Marriage Certificate", count: 30, className: "sendback", color: "#2196f3" },
            ].map((card, index) => (
              <a href={card.url} key={index} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    position: "relative",
                    rowGap: isMobile ? "10px" : "20px",
                    height: isMobile ? "auto" : "150px",
                  }}
                >
                 
                  <div
                    className="card-title"
                  >
                    {card.label}
                  </div>

                 
                    <img src={card.icon} alt="Due" style={{ width: "70px", height: "70px" }} />
                    
                  </div>

                 
                 
            
              </a>
            ))}
          </div>


          {/* Favorite Cards */}
          <div className="favorite-card">
            <div className="card-header-view" style={{ marginBottom: 15 }}>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                }}
              >
                <i className="fa-regular fa-star" style={{ marginRight: 10 }}></i>
                Favorites
              </h2>
            </div>

            <div
              className="action-cards"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                gap: 20,
                marginBottom: 20,
              }}
            >
              {[
                {
                  label: "Property Register",
                  image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg",
                  url: "/digit-ui/citizen/pt/property/new-application",
                },
                {
                  label: "Pay",
                  image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg",
                  url: "/digit-ui/citizen/pt/property/citizen-search",
                },
                {
                  label: "My Application",
                  image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg",
                  url: "/digit-ui/citizen/pt/property/my-applications",
                },
                {
                  label: "Daily Collection Report",
                  image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
                  url: "",
                },
              ].map((action, index) => (
                <div
                  key={index}
                  className="action-card"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    padding: isDesktop ? 20 : isTablet ? 15 : 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                  }}
                >
                  <img
                    src={action.image}
                    alt={action.label}
                    style={{
                      width: isMobile ? 40 : 50,
                      height: isMobile ? 40 : 50,
                      marginBottom: 10,
                    }}
                  />
                  <a
                    href={action.url}
                    style={{
                      fontSize: isDesktop ? 14 : isTablet ? 13 : 12,
                      margin: 0,
                      color: "#333",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {action.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
















































// // import React, { useEffect } from "react";
// // import {
// //   StandaloneSearchBar,
// //   Loader,
// //   CardBasedOptions,
// //   ComplaintIcon,
// //   PTIcon,
// //   CaseIcon,
// //   DropIcon,
// //   HomeIcon,
// //   Calender,
// //   DocumentIcon,
// //   HelpIcon,
// //   WhatsNewCard,
// //   OBPSIcon,
// //   WSICon,
// // } from "@egovernments/digit-ui-react-components";
// // import { useTranslation } from "react-i18next";
// // import { useHistory } from "react-router-dom";
// // import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
// // import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";

// // const Home = () => {
// //   const { t } = useTranslation();
// //   const history = useHistory();
// //   const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
// //   const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
// //   let isMobile = window.Digit.Utils.browser.isMobile();
// //   if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});

// //   const conditionsToDisableNotificationCountTrigger = () => {
// //     if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
// //     if (!Digit.UserService?.getUser()?.access_token) return false;
// //     return true;
// //   };

// //   const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
// //     tenantId,
// //     variant: "whats-new",
// //     config: {
// //       enabled: conditionsToDisableNotificationCountTrigger(),
// //     },
// //   });

// //   if (!tenantId) {
// //     Digit.SessionStorage.get("locale") === null
// //       ? history.push(`/digit-ui/citizen/select-language`)
// //       : history.push(`/digit-ui/citizen/select-location`);
// //   }

// //   const appBannerWebObj = uiHomePage?.appBannerDesktop;
// //   const appBannerMobObj = uiHomePage?.appBannerMobile;
// //   const citizenServicesObj = uiHomePage?.citizenServicesCard;
// //   const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
// //   const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
// //   const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
// //   const whatsNewSectionObj = uiHomePage?.whatsNewSection;

// //   const handleClickOnWhatsAppBanner = (obj) => {
// //     window.open(obj?.navigationUrl);
// //   };

// //   const allCitizenServicesProps = {
// //     header: t(citizenServicesObj?.headerLabel),
// //     sideOption: {
// //       name: t(citizenServicesObj?.sideOption?.name),
// //       onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl),
// //     },
// //     options: [
// //       {
// //         name: t(citizenServicesObj?.props?.[0]?.label),
// //         Icon: <ComplaintIcon />,
// //         onClick: () => history.push(citizenServicesObj?.props?.[0]?.navigationUrl),
// //       },
// //       {
// //         name: t(citizenServicesObj?.props?.[1]?.label),
// //         Icon: <PTIcon className="fill-path-primary-main" />,
// //         onClick: () => history.push(citizenServicesObj?.props?.[1]?.navigationUrl),
// //       },
// //       {
// //         name: t(citizenServicesObj?.props?.[2]?.label),
// //         Icon: <CaseIcon className="fill-path-primary-main" />,
// //         onClick: () => history.push(citizenServicesObj?.props?.[2]?.navigationUrl),
// //       },
// //       // {
// //       //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
// //       //     Icon: <DropIcon/>,
// //       //     onClick: () => history.push("/digit-ui/citizen")
// //       // },
// //       {
// //         name: t(citizenServicesObj?.props?.[3]?.label),
// //         Icon: <WSICon />,
// //         onClick: () => history.push(citizenServicesObj?.props?.[3]?.navigationUrl),
// //       },
// //     ],
// //     styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
// //   };
// //   const allInfoAndUpdatesProps = {
// //     header: t(infoAndUpdatesObj?.headerLabel),
// //     sideOption: {
// //       name: t(infoAndUpdatesObj?.sideOption?.name),
// //       onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl),
// //     },
// //     options: [
// //       {
// //         name: t(infoAndUpdatesObj?.props?.[0]?.label),
// //         Icon: <HomeIcon />,
// //         onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl),
// //       },
// //       {
// //         name: t(infoAndUpdatesObj?.props?.[1]?.label),
// //         Icon: <Calender />,
// //         onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl),
// //       },
// //       {
// //         name: t(infoAndUpdatesObj?.props?.[2]?.label),
// //         Icon: <DocumentIcon />,
// //         onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl),
// //       },
// //       {
// //         name: t(infoAndUpdatesObj?.props?.[3]?.label),
// //         Icon: <DocumentIcon />,
// //         onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl),
// //       },
// //       // {
// //       //     name: t("CS_COMMON_HELP"),
// //       //     Icon: <HelpIcon/>
// //       // }
// //     ],
// //     styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
// //   };

// //   return isLoading ? (
// //     <Loader />
// //   ) : (
// //     <div className="HomePageContainer">
// //       {/* <div className="SideBarStatic">
// //         <StaticCitizenSideBar />
// //       </div> */}
// //       <div className="HomePageWrapper">
// //         {
// //           <div className="BannerWithSearch">
// //             {isMobile ? <img src={appBannerMobObj?.bannerUrl} /> : <img src={appBannerWebObj?.bannerUrl} />}
// //             {/* <div className="Search">
// //             <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
// //           </div> */}
// //             <div className="ServicesSection">
// //               <CardBasedOptions style={{ marginTop: "-30px" }} {...allCitizenServicesProps} />
// //               <CardBasedOptions style={isMobile ? {} : { marginTop: "-30px" }} {...allInfoAndUpdatesProps} />
// //             </div>
// //           </div>
// //         }

// //         {(whatsAppBannerMobObj || whatsAppBannerWebObj) && (
// //           <div className="WhatsAppBanner">
// //             {isMobile ? (
// //               <img src={whatsAppBannerMobObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerMobObj)} />
// //             ) : (
// //               <img src={whatsAppBannerWebObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerWebObj)} />
// //             )}
// //           </div>
// //         )}

// //         {conditionsToDisableNotificationCountTrigger() ? (
// //           EventsDataLoading ? (
// //             <Loader />
// //           ) : (
// //             EventsData &&
// //             EventsData[0] && (
// //               <div className="WhatsNewSection">
// //                 <div className="headSection">
// //                   <h2>{t(whatsNewSectionObj?.headerLabel)}</h2>
// //                   <p onClick={() => history.push(whatsNewSectionObj?.sideOption?.navigationUrl)}>{t(whatsNewSectionObj?.sideOption?.name)}</p>
// //                 </div>
// //                 <WhatsNewCard {...EventsData?.[0]} />
// //               </div>
// //             )
// //           )
// //         ) : null}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;


// import React, { useEffect } from "react";
// import {
//   StandaloneSearchBar,
//   Loader,
//   CardBasedOptions,
//   ComplaintIcon,
//   PTIcon,
//   CaseIcon,
//   DropIcon,
//   HomeIcon,
//   Calender,
//   DocumentIcon,
//   HelpIcon,
//   WhatsNewCard,
//   OBPSIcon,
//   WSICon,
//   Card
// } from "@egovernments/digit-ui-react-components";
// import { useTranslation } from "react-i18next";
// import { useHistory, Link } from "react-router-dom";
// import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
// import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
// import { max } from "lodash";

// const Home = () => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
//   const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
//   console.log("uiHomePage", uiHomePage)
//   let isMobile = window.Digit.Utils.browser.isMobile();
//   if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});

//   const conditionsToDisableNotificationCountTrigger = () => {
//     if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
//     if (!Digit.UserService?.getUser()?.access_token) return false;
//     return true;
//   };

//   const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
//     tenantId,
//     variant: "whats-new",
//     config: {
//       enabled: conditionsToDisableNotificationCountTrigger(),
//     },
//   });

//   if (!tenantId) {
//     Digit.SessionStorage.get("locale") === null
//       ? history.push(`/digit-ui/citizen/select-language`)
//       : history.push(`/digit-ui/citizen/select-location`);
//   }

//   const appBannerWebObj = uiHomePage?.appBannerDesktop;
//   const appBannerMobObj = uiHomePage?.appBannerMobile;
//   const citizenServicesObj = uiHomePage?.citizenServicesCard;
//   const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
//   const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
//   const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
//   const whatsNewSectionObj = uiHomePage?.whatsNewSection;

//   const handleClickOnWhatsAppBanner = (obj) => {
//     window.open(obj?.navigationUrl);
//   };

//   const allCitizenServicesProps = {
//     header: t(citizenServicesObj?.headerLabel),
//     sideOption: {
//       name: t(citizenServicesObj?.sideOption?.name),
//       onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl),
//     },
//     options: [
//       {
//         name: t(citizenServicesObj?.props?.[0]?.label),
//         Icon: <ComplaintIcon />,
//         onClick: () => history.push(citizenServicesObj?.props?.[0]?.navigationUrl),
//       },
//       {
//         name: t(citizenServicesObj?.props?.[1]?.label),
//         Icon: <PTIcon className="fill-path-primary-main" />,
//         onClick: () => history.push(citizenServicesObj?.props?.[1]?.navigationUrl),
//       },
//       {
//         name: t(citizenServicesObj?.props?.[2]?.label),
//         Icon: <CaseIcon className="fill-path-primary-main" />,
//         onClick: () => history.push(citizenServicesObj?.props?.[2]?.navigationUrl),
//       },
//       // {
//       //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
//       //     Icon: <DropIcon/>,
//       //     onClick: () => history.push("/digit-ui/citizen")
//       // },
//       {
//         name: t(citizenServicesObj?.props?.[3]?.label),
//         Icon: <WSICon />,
//         onClick: () => history.push(citizenServicesObj?.props?.[3]?.navigationUrl),
//       },
//     ],
//     styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
//   };
//   const allInfoAndUpdatesProps = {
//     header: t(infoAndUpdatesObj?.headerLabel),
//     sideOption: {
//       name: t(infoAndUpdatesObj?.sideOption?.name),
//       onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl),
//     },
//     options: [
//       {
//         name: t(infoAndUpdatesObj?.props?.[0]?.label),
//         Icon: <HomeIcon />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl),
//       },
//       {
//         name: t(infoAndUpdatesObj?.props?.[1]?.label),
//         Icon: <Calender />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl),
//       },
//       {
//         name: t(infoAndUpdatesObj?.props?.[2]?.label),
//         Icon: <DocumentIcon />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl),
//       },
//       {
//         name: t(infoAndUpdatesObj?.props?.[3]?.label),
//         Icon: <DocumentIcon />,
//         onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl),
//       },
//       // {
//       //     name: t("CS_COMMON_HELP"),
//       //     Icon: <HelpIcon/>
//       // }
//     ],
//     styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
//   };
//   const cardStyle = {
//     background: "linear-gradient(to right, #f9f9f9, #ffffff)",
//     borderRadius: "10px",
//     padding: "24px",
//     width: "100%",
//     maxWidth: "648px",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//     fontFamily: "sans-serif",
//   };

//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//   };

//   const titleStyle = {
//     fontSize: "20px",
//     fontWeight: "700",
//     color: "#5B21B6", // purple-700
//   };

//   const linkStyle = {
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#5B21B6",
//     textDecoration: "none",
//   };

//   const serviceItemStyle = {
//     display: "flex",
//     alignItems: "center",
//     color: "#5B21B6",
//     fontWeight: "600",
//     fontSize: "16px",
//     cursor: "pointer",
//   };

//   const iconStyle = {
//     marginRight: "8px",
//   };

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div
//       className="main-content"
//       style={{ display: "flex", flexDirection: "column", transition: "margin-left 0.3s" ,width:"100%"}}
//     >
//       <div className="main-content-wrapper" style={{ flex: 1 }}>
//         {/* <div
//           className="header"
//           style={{
//             height: "70px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "0 20px",
//             backgroundColor: "#801d46",
//             color: "white",
//             borderBottomLeftRadius: "25px",
//             borderBottomRightRadius: "25px"
//           }}
//         >
//           <div className="toggle-btn" id="toggle-sidebar" style={{ fontSize: "20px", cursor: "pointer", position: "absolute" }}>
//             <i className="fas fa-bars"></i>
//           </div>

//           <div className="header-right-nav" style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
//             <div className="header-actions" style={{ display: "flex", gap: "20px" }}>
//               {["bell", "comment", "gift", "cog"].map((icon) => (
//                 <a
//                   key={icon}
//                   href="javascript:void(0);"
//                   style={{
//                     color: "#fff",
//                     fontSize: "18px",
//                     background: "rgba(255,255,255,0.15)",
//                     padding: "8px",
//                     borderRadius: "50%",
//                     cursor: "pointer",
//                     width: "40px",
//                     height: "40px",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     textDecoration: "none"
//                   }}
//                 >
//                   <i className={`fas fa-${icon}`}></i>
//                 </a>
//               ))}
//             </div>

//             <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
//               <span>Hello, Samantha</span>
//               <div className="avatar" style={{ width: "35px", height: "35px", borderRadius: "50%", overflow: "hidden", border: "2px solid white" }}>
//                 <img src="https://i.imgur.com/vT8WQEA.jpg" alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//               </div>
//             </div>
//           </div>
//         </div> */}

//         <div className="content-area" style={{ padding: "20px" }}>
//           <div className="content-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>

//             <h2 style={{ fontWeight: "700", fontSize: "20px", display: "flex", alignItems: "center", margin: 0 }}>
//               <i className="fa-regular fa-star" style={{ marginRight: "10px" }}></i>
//               Payment Cart
//             </h2>
//             <div
//               className="filter"
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: "8px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "10px 20px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//                 width: "270px"
//               }}
//             >
//               <div className="filter-container" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//                 <i className="far fa-calendar" style={{ color: "#801d46", fontSize: "24px" }}></i>
//                 <div>
//                   <span style={{ fontSize: "14px", color: "#333" }}>Filter Period</span>
//                   <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>17 April 2025 - 21 Jul 2025</p>
//                 </div>
//               </div>
//               <i className="fas fa-chevron-down"></i>
//             </div>
//           </div>

//           {/* Status Cards */}
//           <div
//             className="status-cards home-stats-card"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(2, 1fr)",
//               gap: "20px",
//               marginBottom: "20px"
//             }}
//           >
//             {[
//               { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg", label: "Property", count: 100, className: "approved", color: "#4caf50" },
//               { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order.svg", label: "Water", count: 50, className: "pending", color: "#ff9800" },
//               { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg", label: "Send Back", count: 30, className: "sendback", color: "#2196f3" },
//                { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg", label: "Send Back", count: 30, className: "sendback", color: "#2196f3" }
//             ].map((card, index) => (
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: "20px",
//                   borderRadius: "12px",
//                   backgroundColor: "#fff",
//                   boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
//                   width: "100%",
//                   // maxWidth: "400px",
//                   // margin: "auto",
//                   position: "relative",
//                   rowGap: "20px",
//                   // width:"500px",
//                   height:"150px"
//                 }}
//               >
//                 {/* Title (Absolute Position) */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "2px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     backgroundColor: "#fff",
//                     padding: "0 10px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {card.label}
//                 </div>

//                 {/* Left - Due */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     flex: "1 1 40%",
//                     justifyContent: "center",
//                     gap: "8px",
//                     minWidth: "120px",
//                   }}
//                 >
//                   <img src={card.icon} alt="Due" style={{ width: "32px", height: "32px" }} />
//                   <div style={{ textAlign: "center" }}>
//                     <div style={{ fontWeight: "bold", fontSize: "18px" }}>{card.count}</div>
//                     <div style={{ color: "orange", fontWeight: "500" }}>Due</div>
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div
//                   style={{
//                     width: "1px",
//                     height: "40px",
//                     backgroundColor: "#77216F",
//                     margin: "0 10px",
//                   }}
//                 ></div>

//                 {/* Right - Paid */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     flex: "1 1 40%",
//                     justifyContent: "center",
//                     gap: "8px",
//                     minWidth: "120px",
//                   }}
//                 >
//                   <img src={card.icon} alt="Paid" style={{ width: "32px", height: "32px" }} />
//                   <div style={{ textAlign: "center" }}>
//                     <div style={{ fontWeight: "bold", fontSize: "18px" }}>{card.count}</div>
//                     <div style={{ color: "green", fontWeight: "500" }}>Paid</div>
//                   </div>
//                 </div>
//               </div>

//             ))}
//           </div>

//           {/* Chart Section */}
//           {/* <div className="graph-view-area" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }}>
//             <div className="chart-container" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
//               <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Application Details</h2>
//               <canvas id="applicationDetails"></canvas>

//             </div>
//             <div className="chart-container" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
//               <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Collection</h2>
//               <div className="info-container" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
//                 {[
//                   { label: "Total Till Date", value: "₹ 12,34,567" },
//                   { label: "Last 15 days", value: "₹ 12,34,567" }
//                 ].map((info, idx) => (
//                   <div key={idx} className="info-pill" style={{ backgroundColor: "#f1f3f5", padding: "10px 16px", borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.05)", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontSize: "14px" }}>
//                     <span style={{ color: "#555", fontWeight: "500", marginRight: "15px" }}>{info.label}</span>
//                     <span style={{ fontWeight: "bold", color: "#111" }}>{info.value}</span>
//                   </div>
//                 ))}
//               </div>
//               <canvas id="collectionChart"></canvas>
//             </div>
//           </div> */}

//           {/* Favorite Cards */}
//           <div className="favorite-card">
//             <div className="card-header-view" style={{ marginBottom: "15px" }}>
//               <h2 style={{ fontWeight: "700", fontSize: "20px", display: "flex", alignItems: "center", margin: 0 }}>
//                 <i className="fa-regular fa-star" style={{ marginRight: "10px" }}></i>
//                 Favorites
//               </h2>
//             </div>

//             <div
//               className="action-cards"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(4, 1fr)",
//                 gap: "20px",
//                 marginBottom: "20px",
//               }}
//             >
//               {[
//                 {
//                   label: "Property Register",
//                   image:
//                     "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg",
//                   url: "/digit-ui/citizen/pt/property/new-application",
//                 },
//                 {
//                   label: "Pay",
//                   image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg",
//                   url:
//                     "/digit-ui/citizen/pt/property/citizen-search",
//                 },
//                 {
//                   label: "My Application",
//                   image:
//                     "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg",
//                   url: "/digit-ui/citizen/pt/property/my-applications",
//                 },
//                 {
//                   label: "Daily Collection Report",
//                   image:
//                     "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
//                   url: "",
//                 },
//               ].map((action, index) => (
//                 <div
//                   key={index}
//                   className="action-card"
//                   style={{
//                     backgroundColor: "white",
//                     borderRadius: "8px",
//                     padding: "20px",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//                     transition: "transform 0.2s",
//                   }}
//                 >
//                   <img
//                     src={action.image}
//                     alt={action.label}
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       marginBottom: "10px",
//                     }}
//                   />
//                   <a
//                     href={action.url}
//                     style={{
//                       fontSize: "14px",
//                       margin: 0,
//                       color: "#333",
//                       fontWeight: "500",
//                       textDecoration: "none",
//                     }}
//                   >
//                     {action.label}
//                   </a>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
