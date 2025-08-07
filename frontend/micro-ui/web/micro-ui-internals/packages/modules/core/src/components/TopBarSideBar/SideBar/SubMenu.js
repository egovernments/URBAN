

// import React, { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   ArrowForward,
//   ArrowVectorDown,
//   ArrowDirection,
//   HomeIcon,
//   ComplaintIcon,
//   BPAHomeIcon,
//   PropertyHouse,
//   CaseIcon,
//   ReceiptIcon,
//   PersonIcon,
//   DocumentIconSolid,
//   DropIcon,
//   CollectionsBookmarIcons,
//   FinanceChartIcon,
//   CollectionIcon,
// } from "@egovernments/digit-ui-react-components";
// import { useTranslation } from "react-i18next";
// import ReactTooltip from "react-tooltip";

// const SubMenu = ({ item }) => {
//   const styles = {
//     sidebar: {
//       // width: "240px",
//       background: "white",
//       height: "100%",
//       // padding: "16px",
//       boxSizing: "border-box",
//     },
//     logoContainer: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "24px",
//     },
//     logo: {
//       // width: "40px",
//       // height: "40px",
//       marginRight: "12px",
//     },
//     logoText: {
//       fontFamily: "Barlow",
//       color: "#3E4954",
//     },
//     logoTextHeading: {
//       fontWeight: 600,
//       fontSize: "18px",
//       margin: 0,
//       lineHeight: "24px",
//     },
//     logoTextSub: {
//       fontWeight: 400,
//       fontSize: "12px",
//       lineHeight: "18px",
//       margin: 0,
//     },
//     menu: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "12px",
//       // padding:"20px 0px"
//     },
//     menuItem: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       padding: "10px 20px",
//       textDecoration: "none",
//       fontFamily: "Barlow",
//       fontSize: "14px",
//       color: "#3E4954",
//       borderRadius: "4px",
//     },
//     activeTab: {
//       // backgroundColor: "#6B133F33",
//       fontWeight: 600,
//     },
//   };


//   // const menuItems = [
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg", label: "Home", link: "/digit-ui/employee", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/passkey.svg", label: "Property Tax", link: "/digit-ui/employee/pt/PropertyLandingPage", isActive: true },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/water_ph.svg", label: "Water Tax", link: "javascript:void(0);", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg", label: "Rental", link: "javascript:void(0);", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg", label: "Marriage Registration", link: "javascript:void(0);", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg", label: "Road Cutting", link: "javascript:void(0);", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Truck.svg", label: "Funeral Van", link: "javascript:void(0);", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg", label: "Tree Cutting", link: "javascript:void(0);", isActive: false },
//   //   { icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg", label: "Other Services", link: "javascript:void(0);", isActive: false },
//   // ];
//   const menuItems = [
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Dashboard.svg", // Home Icon
//       label: "Home",
//       link: "/digit-ui/employee",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/passkey.svg", // Property Tax Icon
//       label: "Property Tax",
//       link: "/digit-ui/employee/pt/PropertyLandingPage",
//       isActive: true
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/water_ph.svg", // Water Tax Icon
//       label: "Water Tax",
//       link: "javascript:void(0);",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/real_estate_agent.svg", // Rental Icon
//       label: "Rental",
//       link: "javascript:void(0);",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Diploma.svg", // Marriage Registration Icon
//       label: "Marriage Registration",
//       link: "javascript:void(0);",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Road.svg", // Road Cutting Icon
//       label: "Road Cutting",
//       link: "javascript:void(0);",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Truck.svg", // Funeral Van Icon
//       label: "Funeral Van",
//       link: "javascript:void(0);",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Oak%20Tree.svg", // Tree Cutting Icon
//       label: "Tree Cutting",
//       link: "javascript:void(0);",
//       isActive: false
//     },
//     {
//       icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/More.svg", // Other Services Icon
//       label: "Other Services",
//       link: "javascript:void(0);",
//       isActive: false
//     }
//   ];

//   return (
//     <div style={styles.sidebar}>
//       {/* <div style={styles.logoContainer}>
//         <div style={styles.logo}>
//           <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg" alt="MP Government Logo" style={{ width: "100%", height: "100%" }} />
//         </div>
//         <div style={styles.logoText}>
//           <h3 style={styles.logoTextHeading}>मध्य प्रदेश सरकार</h3>
//           <p style={styles.logoTextSub}>Government of Madhya Pradesh</p>
//         </div>
//       </div> */}

//       <div style={styles.menu}>
//         {menuItems.map((item) => (
//           <a
//             key={item.label}
//             href={item.link}
//             style={{
//               ...styles.menuItem,
//               ...(item.isActive ? styles.activeTab : {}),
//             }}
//           >
//             <img style={{ width: "19px", height: "19px" }} src={item.icon} />
//             <h4 style={{
//               fontFamily: "Barlow",
//               fontWeight: 600,
//               fontStyle: "normal", // 'SemiBold' isn't a valid CSS value; use 'normal' or set the correct font if available
//               fontSize: "14px",
//               lineHeight: "100%",
//               letterSpacing: "0px",
//               color: "#464255"
//             }}>{item.label}</h4>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default SubMenu;

// import React, { useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   ArrowForward,
//   ArrowVectorDown,
//   ArrowDirection,
//   HomeIcon,
//   ComplaintIcon,
//   BPAHomeIcon,
//   PropertyHouse,
//   CaseIcon,
//   ReceiptIcon,
//   PersonIcon,
//   DocumentIconSolid,
//   DropIcon,
//   CollectionsBookmarIcons,
//   FinanceChartIcon,
//   CollectionIcon,
// } from "@egovernments/digit-ui-react-components";
// import { useTranslation } from "react-i18next";
// import ReactTooltip from "react-tooltip";

// const SubMenu = ({ item }) => {
//   console.log("dasdasdsa",item);
//   const [subnav, setSubnav] = useState(false);
//   const location = useLocation();
//   const { pathname } = location;
//   const { t } = useTranslation();
//   const showSubnav = () => setSubnav(!subnav);
//   const IconsObject = {
//     home: <HomeIcon />,
//     announcement: <ComplaintIcon />,
//     business: <BPAHomeIcon />,
//     store: <PropertyHouse />,
//     assignment: <CaseIcon />,
//     receipt: <ReceiptIcon />,
//     "business-center": <PersonIcon />,
//     description: <DocumentIconSolid />,
//     "water-tap": <DropIcon />,
//     "collections-bookmark": <CollectionsBookmarIcons />,
//     "insert-chart": <FinanceChartIcon />,
//     edcr: <CollectionIcon />,
//     collections: <CollectionIcon />,
//   };
//   const leftIconArray = item?.icon?.leftIcon?.split?.(":")?.[1] || item?.leftIcon?.split?.(":")[1];
//   const leftIcon = IconsObject[leftIconArray] || IconsObject.collections;
//   const getModuleName = item?.moduleName?.replace(/[ -]/g, "_");
//   const appendTranslate = t(`ACTION_TEST_${getModuleName}`);
//   const trimModuleName = t(appendTranslate?.length > 20 ? appendTranslate.substring(0, 20) + "..." : appendTranslate);

//   if (item.type === "single") {
//     const getOrigin = window.location.origin;
//     return (
//       <div className="submenu-container">
//         <div className={`sidebar-link  ${pathname === item?.navigationURL ? "active" : ""}`} >
//           <div className="actions" style={{display:"flex",gap:"20px"}}>
//             {leftIcon}
//             {item.navigationURL?.indexOf("/digit-ui") === -1 ? (
//               <a
//                 data-tip="React-tooltip"
//                 data-for={`jk-side-${getModuleName}`}
//                 className="custom-link"
//                 href={getOrigin + "/employee/" + item.navigationURL}
//               >
//                 <span> {trimModuleName} </span>

//                {trimModuleName?.includes("...") &&<ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${getModuleName}`}>
//                   {t(`ACTION_TEST_${getModuleName}`)}
//                 </ReactTooltip>}
//               </a>
//             ) : (
//               // <a className="custom-link" href={getOrigin + "/employee/" + item.navigationURL}>
//               //   <div className="tooltip">
//               //     <p className="p1">{trimModuleName}</p>
//               //     <span className="tooltiptext">{t(`ACTION_TEST_${getModuleName}`)}</span>
//               //   </div>
//               // </a>
//               <Link className="custom-link" to={item.navigationURL}>
//                 <div data-tip="React-tooltip" data-for={`jk-side-${getModuleName}`}>
//                   <span> {trimModuleName} </span>

//                  {trimModuleName?.includes("...") && <ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${getModuleName}`}>
//                     {t(`ACTION_TEST_${getModuleName}`)}
//                   </ReactTooltip>}
//                 </div>
//                 {/* <div className="tooltip">
//                   <p className="p1">{trimModuleName}</p>
//                   <span className="tooltiptext">{t(`ACTION_TEST_${getModuleName}`)}</span>
//                 </div>{" "} */}
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <React.Fragment>
//         <div className="submenu-container">
//           <div onClick={item.links && showSubnav} className={`sidebar-link`}>
//             <div className="actions">
//               {leftIcon}
//               <div data-tip="React-tooltip" data-for={`jk-side-${getModuleName}`}>
//                 <span> {trimModuleName} </span>

//                 {trimModuleName?.includes("...") && <ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${getModuleName}`}>
//                   {t(`ACTION_TEST_${getModuleName}`)}
//                 </ReactTooltip>}
//               </div>
//               {/* <div className="tooltip">
//                 <p className="p1">{trimModuleName}</p>
//                 <span className="tooltiptext">{t(`ACTION_TEST_${getModuleName}`)}</span>
//               </div>{" "} */}
//             </div>
//             <div> {item.links && subnav ? <ArrowVectorDown /> : item.links ? <ArrowForward /> : null} </div>
//           </div>
//         </div>

//         {subnav &&
//           item.links
//           .sort((a, b) => a.orderNumber - b.orderNumber)
//             .filter((item) => item.url === "url" || item.url !== "")
//             .map((item, index) => {
//               const getChildName = item?.displayName?.toUpperCase()?.replace(/[ -]/g, "_");
//               const appendTranslate = t(`ACTION_TEST_${getChildName}`);
//               const trimModuleName = t(appendTranslate?.length > 20 ? appendTranslate.substring(0, 20) + "..." : appendTranslate);

//               if (item.navigationURL.indexOf("/digit-ui") === -1) {
//                 const getOrigin = window.location.origin;
//                 return (
//                   <a
//                     key={index}
//                     className={`dropdown-link ${pathname === item.link ? "active" : ""}`}
//                     href={getOrigin + "/employee/" + item.navigationURL}
//                   >
//                     <div className="actions"  data-tip="React-tooltip" data-for={`jk-side-${index}`}>
//                       <span> {trimModuleName} </span>
//                     {trimModuleName?.includes("...") && <ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${index}`}>
//                         {t(`ACTION_TEST_${getChildName}`)}
//                       </ReactTooltip>}
//                     </div>
//                     {/* <div className="actions">
//                       <div className="tooltip">
//                         <p className="p1">{trimModuleName}</p>
//                         <span className="tooltiptext">{t(`ACTION_TEST_${getChildName}`)}</span>
//                       </div>{" "}
//                     </div> */}
//                   </a>
//                 );
//               }
//               return (
//                 <Link
//                   to={item?.link || item.navigationURL}
//                   key={index}
//                   className={`dropdown-link ${pathname === item?.link || pathname === item?.navigationURL ? "active" : ""}`}
//                 >
//                   <div className="actions" data-tip="React-tooltip" data-for={`jk-side-${index}`}>
//                     <span> {trimModuleName} </span>
//                    {trimModuleName?.includes("...") &&<ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${index}`}>
//                       {t(`ACTION_TEST_${getChildName}`)}
//                     </ReactTooltip>}
//                     {/* <div className="tooltip">
//                       <p className="p1">{trimModuleName}</p>
//                       <span className="tooltiptext">{t(`ACTION_TEST_${getChildName}`)}</span>
//                     </div>{" "} */}
//                   </div>
//                 </Link>
//               );
//             })}
//       </React.Fragment>
//     );
//   }
// };

// export default SubMenu;



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowForward, ArrowVectorDown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  const showSubnav = () => setSubnav(!subnav);

  const imageSrc = item?.icon?.image || item?.image || "https://cdn-icons-png.flaticon.com/512/10758/10758675.png";
  const leftIcon = (
    <img
      src={imageSrc}
      alt="menu-icon"
      style={{
        width: "24px",
        height: "24px",
        objectFit: "contain",
        display: "block",
      }}
    />
  );

  const getModuleName = item?.moduleName?.replace(/[ -]/g, "_");
  const translatedLabel = t(`ACTION_TEST_${getModuleName}`);
  const isLongText = translatedLabel?.length > 20;
  const trimmedLabel = isLongText ? translatedLabel.substring(0, 20) + "..." : translatedLabel;

  const commonStyles = {
    submenuContainer: {
      marginBottom: "8px",
    },
    sidebarLink: (isActive) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      backgroundColor: isActive ? "rgba(107, 19, 63, 0.3)" : "#fff",
      color: "#333",
      textDecoration: "none",
      borderLeft: isActive ? "4px solid #007acc" : "4px solid transparent",
      cursor: "pointer",
    }),
    iconAndText: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    labelText: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "1.2",
    },
    dropdownLink: (isActive) => ({
      display: "flex",
      alignItems: "center",
      padding: "10px 40px",
      backgroundColor: isActive ? "rgba(107, 19, 63, 0.3)" : "#fff",
      color: "#333",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "400",
    }),
  };

  if (item.type === "single") {
    const isExternal = item.navigationURL?.indexOf("/digit-ui") === -1;
    const isActive = pathname === item?.navigationURL;
    const getOrigin = window.location.origin;

    return (
      <div style={commonStyles.submenuContainer}>
        <div style={commonStyles.sidebarLink(isActive)}>
          <div style={commonStyles.iconAndText}>
            {leftIcon}
            {isExternal ? (
              <a
                href={`${getOrigin}/employee/${item.navigationURL}`}
                style={{ ...commonStyles.labelText }}
                data-tip="React-tooltip"
                data-for={`tooltip-${getModuleName}`}
              >
                {trimmedLabel}
                {isLongText && (
                  <ReactTooltip
                    id={`tooltip-${getModuleName}`}
                    textColor="white"
                    backgroundColor="grey"
                    place="right"
                    type="info"
                    effect="solid"
                  >
                    {translatedLabel}
                  </ReactTooltip>
                )}
              </a>
            ) : (
              <Link
                to={item.navigationURL}
                style={{ ...commonStyles.labelText }}
                data-tip="React-tooltip"
                data-for={`tooltip-${getModuleName}`}
              >
                {trimmedLabel}
                {isLongText && (
                  <ReactTooltip
                    id={`tooltip-${getModuleName}`}
                    textColor="white"
                    backgroundColor="grey"
                    place="right"
                    type="info"
                    effect="solid"
                  >
                    {translatedLabel}
                  </ReactTooltip>
                )}
              </Link>
            )}


          </div>

        </div>

      </div>
    );
  } else {
    return (
      <div>
        <div style={commonStyles.submenuContainer}>
          <div
            onClick={item.links && showSubnav}
            style={commonStyles.sidebarLink(false)}
          >
            <div style={commonStyles.iconAndText}>
              {leftIcon}
              <span
                style={commonStyles.labelText}
                data-tip="React-tooltip"
                data-for={`tooltip-${getModuleName}`}
              >
                {trimmedLabel}
                {isLongText && (
                  <ReactTooltip
                    id={`tooltip-${getModuleName}`}
                    textColor="white"
                    backgroundColor="grey"
                    place="right"
                    type="info"
                    effect="solid"
                  >
                    {translatedLabel}
                  </ReactTooltip>
                )}
              </span>
            </div>
            <div>{subnav ? <ArrowVectorDown /> : <ArrowForward />}</div>
          </div>
        </div>

        {subnav &&
          item.links
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .filter((link) => link.url !== "")
            .map((link, index) => {
              const getChildName = link?.displayName?.toUpperCase()?.replace(/[ -]/g, "_");
              const translatedChild = t(`ACTION_TEST_${getChildName}`);
              const childIsLong = translatedChild.length > 20;
              const trimmedChild = childIsLong
                ? translatedChild.substring(0, 20) + "..."
                : translatedChild;
              const isActive = pathname === link?.link || pathname === link?.navigationURL;
              const isExternal = link.navigationURL?.indexOf("/digit-ui") === -1;
              const getOrigin = window.location.origin;

              return isExternal ? (
                <a
                  key={index}
                  href={`${getOrigin}/employee/${link.navigationURL}`}
                  style={commonStyles.dropdownLink(isActive)}
                  data-tip="React-tooltip"
                  data-for={`child-tooltip-${index}`}
                >
                  <span>{trimmedChild}</span>
                  {childIsLong && (
                    <ReactTooltip
                      id={`child-tooltip-${index}`}
                      textColor="white"
                      backgroundColor="grey"
                      place="right"
                      type="info"
                      effect="solid"
                    >
                      {translatedChild}
                    </ReactTooltip>
                  )}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link?.link || link.navigationURL}
                  style={commonStyles.dropdownLink(isActive)}
                  data-tip="React-tooltip"
                  data-for={`child-tooltip-${index}`}
                >
                  <span>{trimmedChild}</span>
                  {childIsLong && (
                    <ReactTooltip
                      id={`child-tooltip-${index}`}
                      textColor="white"
                      backgroundColor="grey"
                      place="right"
                      type="info"
                      effect="solid"
                    >
                      {translatedChild}
                    </ReactTooltip>
                  )}
                </Link>
              );
            })}
     
      </div>
    );
  }
};

export default SubMenu;
