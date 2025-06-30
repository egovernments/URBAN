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


import React, { useRef, useEffect, useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/img/imageSv.svg";

const TextToImg = ({ name, toggleMenu }) => (
  <span
    className="user-img-txt"
    onClick={toggleMenu}
    title={name}
    style={{
      backgroundColor: "#4729A3",
      color: "#fff",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer", marginLeft: "auto",
      marginRight: "auto",
      marginTop: "10px",
      marginBottom: "10px",

    }}
  >
    {name?.[0]?.toUpperCase()}
  </span>
);
const SubMenu = ({ handleLogout, userDetails }) => {
  console.log("SubMenu component rendered", userDetails);
  const sidebarRef = useRef(null);
  const { isLoading, data } = Digit.Hooks.useAccessControl();
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading) {
      sidebarRef.current.style.cursor = "pointer";
      collapseNav();
    }
  }, [isLoading]);
  const handleMenuClick = (itemName) => {
    console.log("Clicked menu:", itemName);
    if (itemName === "Log out") {
      // Trigger logout
      handleLogout();
      // Add actual logout logic here
    } else {
      // Navigate or take some action
      console.log(`Navigating to ${itemName}`);
      // For example, use React Router: navigate(`/path-for-${itemName.toLowerCase()}`)
    }
  };
  const expandNav = () => {
    sidebarRef.current.style.width = "240px";
    sidebarRef.current.style.overflow = "auto";
    sidebarRef.current.querySelectorAll(".dropdown-link").forEach((element) => {
      element.style.display = "flex";
    });
  };

  const collapseNav = () => {
    sidebarRef.current.style.width = "100%";
    sidebarRef.current.style.overflow = "hidden";
    sidebarRef.current.querySelectorAll(".dropdown-link").forEach((element) => {
      element.style.display = "none";
    });
  };

  const menuItems = [
    { name: "Property", icon: "🏠" },
    { name: "Water", icon: "🚰" },
    { name: "D2D", icon: "🏡" },
    { name: "Rental", icon: "📅" },
    { name: "Log out", icon: "🔁" },
  ];

  if (isLoading) return <Loader />;

  return (
    <div
      ref={sidebarRef}
      style={{
        width: "240px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        borderRight: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        height: "100%"
      }}
    // onMouseOver={expandNav}
    // onMouseLeave={collapseNav}
    >
      {/* Logo */}
      <div style={{ width: "100%", borderBottom: "1px solid #6F3AFA", }}>
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.LcAu4hLmyz-LQqUVPtVC9AHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Logo"
          style={{ width: "77px", height: "77px", display: "block", margin: "auto", padding: "10px 0" }}
        />

      </div>

      {/* Profile */}
      <div style={{ textAlign: "center", paddingBottom: "12px", borderBottom: "1px solid #6F3AFA", width: "100%" }}>
        {/* <img
         
          alt="User"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "6px",
            display:"flex",
            margin: "auto",
          }}
        /> */}
        <TextToImg name={userDetails?.info?.name || "E"} />
        <div style={{ fontWeight: "600", fontSize: "14px", color: "#000" }}>{userDetails?.info?.name || "Unknown User"}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>{userDetails?.info?.userName || "Unknown User"}</div>
      </div>

      {/* Menu */}
      <div style={{ width: "100%", marginTop: "20px" }}>
        {menuItems.map((item, index) => (
          <div
            onClick={() => handleMenuClick(item.name)}
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 20px",
              gap: "10px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#555",
              justifyContent: "space-between",
              transition: "background 0.2s",
            }}
          // onMouseOver={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          // onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
            {item.name !== "Log out" && <span style={{ fontSize: "14px" }}>›</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
