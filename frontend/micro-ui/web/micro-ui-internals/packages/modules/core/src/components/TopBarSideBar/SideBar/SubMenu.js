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
//         <div className={`sidebar-link  ${pathname === item?.navigationURL ? "active" : ""}`}>
//           <div className="actions">
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
//                     <div className="actions" data-tip="React-tooltip" data-for={`jk-side-${index}`}>
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
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";

import {
  HomeIcon,
  ComplaintIcon,
  BPAHomeIcon,
  PropertyHouse,
  CaseIcon,
  ReceiptIcon,
  PersonIcon,
  DocumentIconSolid,
  DropIcon,
  CollectionsBookmarIcons,
  FinanceChartIcon,
  CollectionIcon,
} from "@egovernments/digit-ui-react-components";


const iconMap = {
  home: <HomeIcon />,
  announcement: <ComplaintIcon />,
  business: <BPAHomeIcon />,
  store: <PropertyHouse />,
  assignment: <CaseIcon />,
  receipt: <ReceiptIcon />,
  "business-center": <PersonIcon />,
  description: <DocumentIconSolid />,
  "water-tap": <DropIcon />,
  "collections-bookmark": <CollectionsBookmarIcons />,
  "insert-chart": <FinanceChartIcon />,
  edcr: <CollectionIcon />,
  collections: <CollectionIcon />,
};

const SubMenu = ({ items = [], handleLogout, userDetails }) => {
  console.log("SubMenu items:", items);
  const { isLoading } = Digit.Hooks.useAccessControl();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const getOrigin = window.location.origin;

  if (isLoading) return <Loader />;

  const menuItems = items.map((module) => {
    const iconRaw = module?.icon?.leftIcon || "";
    const iconKey = iconRaw?.split(":")[1] || "";
    const moduleKey = module.moduleName?.replace(/[ -]/g, "_")?.toUpperCase();
    const translated = t(`ACTION_TEST_${moduleKey}`);
    const trimName = translated.length > 20 ? translated.slice(0, 20) + "..." : translated;
    return {
      name: trimName,
      fullName: translated,
      key: moduleKey,
      icon: iconMap[iconKey] || "📁",
      url: module.navigationURL || module?.icon?.navigationURL || "#",
      links: module.links || []
    };
  });

  // menuItems.push({ name: "Log out", icon: "🔁", url: "logout", key: "LOGOUT" });

  const handleClick = (item) => {
    if (item.name === "Log out") {
      handleLogout?.();
    } else {
      setActiveTab(item.name);
      if (!item.links?.length) {
        const redirectUrl = item.url?.includes("/digit-ui")
          ? item.url
          : `${getOrigin}/employee/${item.url}`;
        window.location.href = redirectUrl;
      } else {
        setDropdownOpen(dropdownOpen === item.name ? null : item.name);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#6b133f",
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        flexWrap: "wrap",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1000,
      }}
    >

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "20px",

          color: "#FFFFFF",
          fontWeight: "600",
          fontSize: "14px",
          cursor: "pointer",
          marginRight: "12px",
          transition: "background 0.2s",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {/* <span>{item.icon}</span> */}
          <div
           
            style={{
              fontFamily: "Noto Sans",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF"
            }}
          >
            <a href="/digit-ui/employee" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Home
            </a>
          </div>
          <div
       
            style={{
              fontFamily: "Noto Sans",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF"
            }}
          >
            <a href="/digit-ui/employee/pt/PropertyLandingPage" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              
            Property Tax
            </a>
          </div>
            <div
       
            style={{
              fontFamily: "Noto Sans",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF"
            }}
          >
            Water Tax
          </div>
            <div
       
            style={{
              fontFamily: "Noto Sans",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF"
            }}
          >
            Rental
          </div>
        </div>


      </div>


    </div>
  );
};

export default SubMenu;
