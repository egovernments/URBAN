import {
  BackButton,
  BillsIcon,
  CitizenHomeCard,
  CitizenInfoLabel,
  FSMIcon,
  Loader,
  MCollectIcon,
  OBPSIcon,
  PGRIcon,
  PTIcon,
  TLIcon,
  WSICon,
  Card
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

export const processLinkData = (newData, code, t) => {
  const obj = newData?.[`${code}`];
  if (obj) {
    obj.map((link) => {
      (link.link = link["navigationURL"]), (link.i18nKey = t(link["name"]));
    });
  }
  const newObj = {
    links: obj?.reverse(),
    header: Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${code}`),
    iconName: `CITIZEN_${code}_ICON`,
  };
  if (code === "FSM") {
    const roleBasedLoginRoutes = [
      {
        role: "FSM_DSO",
        from: "/digit-ui/citizen/fsm/dso-dashboard",
        dashoardLink: "CS_LINK_DSO_DASHBOARD",
        loginLink: "CS_LINK_LOGIN_DSO",
      },
    ];
    //RAIN-7297
    roleBasedLoginRoutes.map(({ role, from, loginLink, dashoardLink }) => {
      if (Digit.UserService.hasAccess(role))
        newObj?.links?.push({
          link: from,
          i18nKey: t(dashoardLink),
        });
      else
        newObj?.links?.push({
          link: "/digit-ui/citizen/login",
          state: { role: "FSM_DSO", from },
          i18nKey: t(loginLink),
        });
    });
  }

  return newObj;
};
const iconSelector = (code) => {
  switch (code) {
    case "PT":
      return <PTIcon className="fill-path-primary-main" />;
    case "WS":
      return <WSICon className="fill-path-primary-main" />;
    case "FSM":
      return <FSMIcon className="fill-path-primary-main" />;
    case "MCollect":
      return <MCollectIcon className="fill-path-primary-main" />;
    case "PGR":
      return <PGRIcon className="fill-path-primary-main" />;
    case "TL":
      return <TLIcon className="fill-path-primary-main" />;
    case "OBPS":
      return <OBPSIcon className="fill-path-primary-main" />;
    case "Bills":
      return <BillsIcon className="fill-path-primary-main" />;
    default:
      return <PTIcon className="fill-path-primary-main" />;
  }
};
const CitizenHome = ({ modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
  const paymentModule = modules.filter(({ code }) => code === "Payment")[0];
  const moduleArr = modules.filter(({ code }) => code !== "Payment");
  const moduleArray = [paymentModule, ...moduleArr];
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div className="citizen-all-services-wrapper">
        <BackButton />
        <div className="citizenAllServiceGrid">
          {moduleArray
            .filter((mod) => mod)
            .map(({ code }, index) => {
              let mdmsDataObj;
              if (fetchedCitizen) mdmsDataObj = fetchedCitizen ? processLinkData(getCitizenMenu, code, t) : undefined;
              if (mdmsDataObj?.links?.length > 0) {
                return (
                  <CitizenHomeCard
                    header={t(mdmsDataObj?.header)}
                    links={mdmsDataObj?.links?.filter((ele) => ele?.link)?.sort((x, y) => x?.orderNumber - y?.orderNumber)}
                    Icon={() => iconSelector(code)}
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
                );
              } else return <React.Fragment />;
            })}
        </div>
      </div>
    </React.Fragment>
  );
};
// Section.jsx


const EmployeeHome = ({ modules }) => {


  const styles = {
    main: {
      marginLeft: "auto",
      background: "#f3f2f7",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",

      // width: "80%"
    },
    wrapper: {
      padding: "20px 30px",
      flex: 1,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      padding: "15px 20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    toggleBtn: {
      fontSize: "20px",
      cursor: "pointer",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    avatar: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      overflow: "hidden",
    },
    avatarImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    contentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    filter: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#fff",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    statusCards: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
    },
    statusCard: {
      background: "#fff",
      borderRadius: "10px",
      padding: "15px",
      flex: 1,
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    cardIcon: {
      width: "50px",
      height: "50px",
      marginRight: "15px",
      display: "flex",
    },
    cardContent: {
      flex: 1,
    },
    graphArea: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
    },
    chartContainer: {
      flex: 1,
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    bar: {
      height: "16px",
      background: "#6B133F",
      margin: "10px 0",
      borderRadius: "6px",
    },
    infoContainer: {
      margin: "10px 0",
    },
    infoPill: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 12px",
      background: "#f1f1f1",
      borderRadius: "6px",
      marginBottom: "8px",
      fontSize: "14px",
    },
    favoriteCard: {
      // background: "#fff",
      // padding: "20px",
      borderRadius: "10px",
      // boxShadow: "0 0 6px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      marginTop: "20px",
    },
    actionCards: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "15px",
    },
    actionCard: {
      textAlign: "center",
      padding: "15px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",

      fontFamily: "Barlow",
      fontWeight: 600,
      fontSize: "16px",
      fontStyle: "normal", // 'SemiBold' is not valid for fontStyle
      lineHeight: "23px",
      letterSpacing: "0px",
      color: "#000000"

    },
    footer: {
      textAlign: "center",
      padding: "15px",
      background: "#6B133F",
      color: "#fff",
      fontSize: "14px",
    },
    styleHtwo: {
      fontFamily: "Poppins",
      fontWeight: 800, // React expects numeric value for weight
      fontStyle: "normal", // 'ExtraBold' is not a valid value; use fontWeight for boldness
      fontSize: "35px",
      lineHeight: "100%",
      letterSpacing: "0px",
      color: "#000000",
      textAlign: "center",
    },
    styletitle: {
      fontFamily: "Barlow",
      fontWeight: 600, // 'SemiBold' should be set using numeric weight
      fontStyle: "normal", // 'SemiBold' is not valid for fontStyle
      fontSize: "22px",
      lineHeight: "100%",
      letterSpacing: "0px",
      color: "#6B133F",
      textAlign: "center",
    }
  };
  console.log("module", modules)
  if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});
  const barStyle = (height, color) => ({
    height: `${height}px`,
    width: "30px",
    backgroundColor: color,
    borderRadius: "6px",
    margin: "0 4px",
  });

  const sectionTitleStyle = {
    color: "#464255",
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "100%",
    letterSpacing: "0px"
  };

  const labelStyle = {
    fontSize: "12px",
    fontFamily: "Barlow",
    color: "#3E4954",
    textAlign: "center",
    marginTop: "8px",
  };

  const boxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "16px",
    width: "48%",
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",  
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"

  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "2%",
    fontFamily: "Barlow",
  };

  const barGroupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  };

  const barStack = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "180px",
    marginTop: "16px",
  };
  return (
    <div className="employee-app-container">
      {/* <div className="ground-container moduleCardWrapper gridModuleWrapper" style={{ padding: "0px", margin: "0px",justifyContent:"space-between" }}>
        {modules?.map(({ code }, index) => {
          const Card = Digit.ComponentRegistryService.getComponent(`${code}Card`) || (() => <React.Fragment />);
          return <Card key={index} />;
        })}
     

      </div> */}
      <div style={styles.main}>
        <div style={styles.wrapper}>
          {/* Header */}

          {/* Page Header */}
          <div style={styles.contentHeader}>
            <h2 style={{
              fontFamily: "Barlow",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0px",
              color: "#464255"
            }}>Dashboard</h2>
            <div style={styles.filter}>
              <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon%20(1).svg" />
              <div>
                <span style={{
                  fontFamily: "Barlow",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                  color: "#3E4954"
                }}>Filter Period</span>
                <p style={{
                  fontFamily: "Barlow",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  letterSpacing: "0px",
                  color: "#3E4954"
                }}> 17 April 2025 - 21 Jul 2025</p>
              </div>
              <div style={{ color: "#B9BBBD", width: "19px", height: "10px" }}>
                ⌄
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div style={styles.statusCards}>
            <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg" alt="Property" style={{ width: "100%" }} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.styleHtwo}>100</h2>
                <p style={styles.styletitle}>Property</p>
              </div>
            </div>

            <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order.svg" alt="Water" style={{ width: "100%" }} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.styleHtwo}>50</h2>
                <p style={styles.styletitle}>Water</p>
              </div>
            </div>

            <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg" alt="Rental" style={{ width: "100%" }} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.styleHtwo}>30</h2>
                <p style={styles.styletitle}>Send Back</p>
              </div>
            </div>
          </div>

          {/* Graphs */}
          {/* <div style={containerStyle}>
     
            <div style={boxStyle}>
              <div style={sectionTitleStyle}>Application Details</div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {["Last 7 days", "Last 15 days", "1 Month"].map((label, i) => (
                  <div key={i} style={barGroupStyle}>
                    <div style={barStack}>
                      <div style={barStyle(120, "#F9E37A")}></div>
                      <div style={barStyle(150, "#45C977")}></div>
                      <div style={barStyle(130, "#F15B5B")}></div>
                    </div>
                    <div style={labelStyle}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

          
            <div style={boxStyle}>
              <div style={sectionTitleStyle}>Collection</div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#3E4954" }}>Total Till date</div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>₹ 12,34,567</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#3E4954" }}>Last 15 days</div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>₹ 12,34,567</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {[
                  { label: "Cheque", color: "#F89C3A", height: 100 },
                  { label: "PoS", color: "#45C977", height: 130 },
                  { label: "Cash", color: "#3F8CFF", height: 160 },
                  { label: "UPI", color: "#005DA4", height: 180 },
                  { label: "Online (Web/Mobile)", color: "#4B0E2C", height: 180 },
                ].map((item, i) => (
                  <div key={i} style={barGroupStyle}>
                    <div style={barStyle(item.height, item.color)}></div>
                    <div style={labelStyle}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Favorites */}
          <div style={styles.favoriteCard}>
            <h3 style={{
              color: "#464255",
              fontFamily: "Barlow",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0px",
              display: "flex",
              alignItems: "center",
            }}> Favorites{" "} <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon%20Button.svg" /></h3>
            <div style={styles.actionCards}>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg" alt="Water" style={{ margin: "auto" }} />
                <p><a href="/digit-ui/employee/pt/new-application">Property Register</a></p>
              </div>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg" alt="Water" style={{ margin: "auto" }} />

                <p><a href="/digit-ui/employee/pt/search">Property Cash Desk</a></p>
              </div>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg" alt="Water" style={{ margin: "auto" }} />

                <p><a href="/digit-ui/employee/pt/application-search">Track Application</a></p>
              </div>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
                <p><a href="/digit-ui/employee/pt/inbox">Daily Collection Report</a></p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export const AppHome = ({ userType, modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
  if (userType === "citizen") {
    return <CitizenHome modules={modules} getCitizenMenu={getCitizenMenu} fetchedCitizen={fetchedCitizen} isLoading={isLoading} />;
  }
  return <EmployeeHome modules={modules} />;
};




// import {
//   BackButton,
//   BillsIcon,
//   CitizenHomeCard,
//   CitizenInfoLabel,
//   FSMIcon,
//   Loader,
//   MCollectIcon,
//   OBPSIcon,
//   PGRIcon,
//   PTIcon,
//   TLIcon,
//   WSICon,
//   Card
// } from "@egovernments/digit-ui-react-components";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import styles from "./Style";

// /*
// Feature :: Citizen All service screen cards
// */
// export const processLinkData = (newData, code, t) => {
//   const obj = newData?.[`${code}`];
//   if (obj) {
//     obj.map((link) => {
//       (link.link = link["navigationURL"]), (link.i18nKey = t(link["name"]));
//     });
//   }
//   const newObj = {
//     links: obj?.reverse(),
//     header: Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${code}`),
//     iconName: `CITIZEN_${code}_ICON`,
//   };
//   if (code === "FSM") {
//     const roleBasedLoginRoutes = [
//       {
//         role: "FSM_DSO",
//         from: "/digit-ui/citizen/fsm/dso-dashboard",
//         dashoardLink: "CS_LINK_DSO_DASHBOARD",
//         loginLink: "CS_LINK_LOGIN_DSO",
//       },
//     ];
//     //RAIN-7297
//     roleBasedLoginRoutes.map(({ role, from, loginLink, dashoardLink }) => {
//       if (Digit.UserService.hasAccess(role))
//         newObj?.links?.push({
//           link: from,
//           i18nKey: t(dashoardLink),
//         });
//       else
//         newObj?.links?.push({
//           link: "/digit-ui/citizen/login",
//           state: { role: "FSM_DSO", from },
//           i18nKey: t(loginLink),
//         });
//     });
//   }

//   return newObj;
// };
// const iconSelector = (code) => {
//   switch (code) {
//     case "PT":
//       return <PTIcon className="fill-path-primary-main" />;
//     case "WS":
//       return <WSICon className="fill-path-primary-main" />;
//     case "FSM":
//       return <FSMIcon className="fill-path-primary-main" />;
//     case "MCollect":
//       return <MCollectIcon className="fill-path-primary-main" />;
//     case "PGR":
//       return <PGRIcon className="fill-path-primary-main" />;
//     case "TL":
//       return <TLIcon className="fill-path-primary-main" />;
//     case "OBPS":
//       return <OBPSIcon className="fill-path-primary-main" />;
//     case "Bills":
//       return <BillsIcon className="fill-path-primary-main" />;
//     default:
//       return <PTIcon className="fill-path-primary-main" />;
//   }
// };
// const CitizenHome = ({ modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
//   const paymentModule = modules.filter(({ code }) => code === "Payment")[0];
//   const moduleArr = modules.filter(({ code }) => code !== "Payment");
//   const moduleArray = [paymentModule, ...moduleArr];
//   const { t } = useTranslation();
//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <React.Fragment>
//       <div className="citizen-all-services-wrapper">
//         <BackButton />
//         <div className="citizenAllServiceGrid">
//           {moduleArray
//             .filter((mod) => mod)
//             .map(({ code }, index) => {
//               let mdmsDataObj;
//               if (fetchedCitizen) mdmsDataObj = fetchedCitizen ? processLinkData(getCitizenMenu, code, t) : undefined;
//               if (mdmsDataObj?.links?.length > 0) {
//                 return (
//                   <CitizenHomeCard
//                     header={t(mdmsDataObj?.header)}
//                     links={mdmsDataObj?.links?.filter((ele) => ele?.link)?.sort((x, y) => x?.orderNumber - y?.orderNumber)}
//                     Icon={() => iconSelector(code)}
//                     Info={
//                       code === "OBPS"
//                         ? () => (
//                           <CitizenInfoLabel
//                             style={{ margin: "0px", padding: "10px" }}
//                             info={t("CS_FILE_APPLICATION_INFO_LABEL")}
//                             text={t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)}
//                           />
//                         )
//                         : null
//                     }
//                     isInfo={code === "OBPS" ? true : false}
//                   />
//                 );
//               } else return <React.Fragment />;
//             })}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };


// const EmployeeHome = ({ modules }) => {
//   const [openMenu, setOpenMenu] = useState(null); // which service is open

//   const toggleMenu = (service) => {
//     setOpenMenu(openMenu === service ? null : service);
//   };
//   const containerStyle = {
//     fontFamily: "sans-serif",
//     padding: "20px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     textAlign: "center",
//     borderRadius: "20px",
//     width: "90%",
//     margin: "auto",
//     height:"614px"
//   };

//   const headerStyle = {
//     fontFamily: 'Noto Sans',
//     fontWeight: 600,
//     fontStyle: 'normal', // 'SemiBold' is not valid; use fontWeight instead
//     fontSize: '32px',
//     lineHeight: '56px',
//     letterSpacing: '0%',
//     textAlign: 'center',
//     verticalAlign: 'middle',
//     color: '#4729A3'
//   };

//   const subHeaderStyle = {
//     fontFamily: 'Noto Sans',
//     fontWeight: 600,            // SemiBold corresponds to font-weight 600
//     fontStyle: 'normal',        // 'SemiBold' is not valid for fontStyle
//     fontSize: '16px',
//     lineHeight: '100%',         // Use string to preserve percentage
//     letterSpacing: '0px',       // 0% letter spacing = 0px
//     color: 'rgb(40, 40, 40)',
//     textAlign: "left"
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "20px",
//     justifyItems: "center",
//     marginBottom: "20px",
//     marginTop: "20px"
//   };

//   const cardStyle = {
//     backgroundColor: "#4729A3",
//     borderRadius: "10px",
//     padding: "10px",
//     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     width: "322px",
//     // maxWidth: "220px",
//     justifyContent: "space-between",
//     cursor: "pointer",
//     height: "70px"
//   };

//   const iconStyle = {
//     width: "50px",
//     height: "50px",
//     backgroundColor: "#fff",
//     padding: "5px",
//     borderRadius: "10px"
//   };

//   const buttonStyle = {
//     backgroundColor: "#F4D390",
//     border: "none",
//     padding: "7px 15px",
//     borderRadius: "20px",
//     fontFamily: 'Noto Sans',
//     fontWeight: 900,            // 'Black' corresponds to 900
//     fontStyle: 'normal',        // 'Black' is not a valid font-style
//     fontSize: '16px',
//     lineHeight: '24px',
//     letterSpacing: '0px',
//     color: '#282828'
//   };

//   const dropdownStyle = {
//     backgroundColor: "#4729A3",
//     borderRadius: "10px",
//     padding: "10px",
//     marginTop: "5px",
//     color: "#000",
//     position: "absolute",
//     width: "322px"
//   };

//   const dropdownItemStyle = {
//     backgroundColor: "#F4D390",
//     border: "none",
//     padding: "8px",
//     borderRadius: "10px",
//     margin: "5px 0",
//     width: "100%",
//     textAlign: "left",
//     cursor: "pointer",
//     fontFamily: 'Noto Sans',
//     fontWeight: 600,             // 'SemiBold' → fontWeight: 600
//     fontStyle: 'normal',         // 'SemiBold' is not a valid font-style
//     fontSize: '14px',
//     lineHeight: '100%',
//     letterSpacing: '0.48px',     // 3% of 16px font size = 0.03 * 16 = 0.48px
//     verticalAlign: 'middle',
//     color: '#282828'
//   };

//   const viewMoreButton = {
//     height: "45px",
//     width: "217px",
//     backgroundColor: "#4729A3",
//     color: "#FFFFFF",
//     borderRadius: "20px",
//     fontFamily: 'Noto Sans',
//     fontWeight: 500,            // Medium = 500
//     fontStyle: 'normal',        // 'Medium' is not a valid font-style
//     fontSize: '16px',
//     lineHeight: '24px',
//     letterSpacing: '0px',
//     textAlign: 'center',
//     verticalAlign: 'middle'
//   };

//   if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});


//   return (

//     <div style={styles.containerStyle}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//         <div style={styles.headerStyle}>Online Services</div>
//         <div>
//           <input
//             type="text"
//             placeholder="🔍 Search"
//             style={{
//               backgroundColor: "#F4D390",
//               border: "1px solid #ccc",
//               padding: "8px 12px",
//               borderRadius: "8px",
//               fontSize: "14px",
//             }}
//           />
//         </div>
//       </div>
//       <div style={styles.subHeaderStyle}>
//         Welcome to Indore Municipal Corporation Portal Which Is Simple & Convenient Way For Users To Access Various Services From Anywhere At Anytime.
//       </div>

//       <div style={styles.gridStyle}>
//         {/* New Application with dropdown */}
//         <div>
//           <div style={styles.cardStyle} onClick={() => toggleMenu("New Application")}>
//             <div style={styles.iconStyle}>🏠</div>
//             <div style={styles.buttonStyle}>New Application</div>
//           </div>

//           {openMenu === "New Application" && (
//             <div style={styles.dropdownStyle}>
//               {[
//                 { label: "New Property Application", route: "/digit-ui/employee/pt/new-application" },
//                 {label: "Search Application Inbox", route: "/digit-ui/employee/pt/application-search"},
//                 { label: "Cash Desk", route: "/digit-ui/employee/pt/search" },
//                 { label: "Change In Property Details", route: "/digit-ui/employee/pt/inbox" },
//                 { label: "Track Application" },
//               ].map((item, idx) => (
//                 <div key={idx} style={styles.dropdownItemStyle}>
//                   {/* &gt; {item}
//                    */}
//                   <a
//                     href={item.route || "#"}
//                     style={{
//                       fontSize: "14px",
//                       color: "#333",
//                       cursor: "pointer",
//                       textDecoration: "none",
//                     }}
//                   >
//                   &gt; {item.label}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Other services without dropdown */}
//         {[
//           { title: "Tax Payment", icon: "💰" },
//           { title: "Namantaran", icon: "📄" },
//           { title: "Track Application", icon: "📱" },
//           { title: "Other Services", icon: "🏘️" },
//           { title: "Correction", icon: "❌" },
//         ].map((service, index) => (
//           <div key={index} style={styles.cardStyle}>
//             <div style={styles.iconStyle}>{service.icon}</div>
//             <div style={styles.buttonStyle}>{service.title}</div>
//           </div>
//         ))}
//       </div>

//       <button style={styles.viewMoreButton}>View More</button>
//     </div>
//   );
// };

// export const AppHome = ({ userType, modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
//   if (userType === "citizen") {
//     return <CitizenHome modules={modules} getCitizenMenu={getCitizenMenu} fetchedCitizen={fetchedCitizen} isLoading={isLoading} />;
//   }
//   return <EmployeeHome modules={modules} />;
// };
