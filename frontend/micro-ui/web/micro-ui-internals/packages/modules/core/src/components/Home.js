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
 
console.log("module",modules)
  if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});
  return (
    <div className="employee-app-container">
      <div className="ground-container moduleCardWrapper gridModuleWrapper" style={{ padding: "0px", margin: "0px",justifyContent:"space-between" }}>
        {modules?.map(({ code }, index) => {
          const Card = Digit.ComponentRegistryService.getComponent(`${code}Card`) || (() => <React.Fragment />);
          return <Card key={index} />;
        })}
     

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
