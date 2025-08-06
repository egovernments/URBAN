

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

import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowForward,
  ArrowVectorDown,
  ArrowDirection,
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
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  const showSubnav = () => setSubnav(!subnav);
  const IconsObject = {
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
  const leftIconArray = item?.icon?.leftIcon?.split?.(":")?.[1] || item?.leftIcon?.split?.(":")[1];
  const leftIcon = IconsObject[leftIconArray] || IconsObject.collections;
  const getModuleName = item?.moduleName?.replace(/[ -]/g, "_");
  const appendTranslate = t(`ACTION_TEST_${getModuleName}`);
  const trimModuleName = t(appendTranslate?.length > 20 ? appendTranslate.substring(0, 20) + "..." : appendTranslate);

  if (item.type === "single") {
    const getOrigin = window.location.origin;
    return (
      <div className="submenu-container">
        <div className={`sidebar-link  ${pathname === item?.navigationURL ? "active" : ""}`} >
          <div className="actions" style={{display:"flex",gap:"20px"}}>
            {/* {leftIcon} */}
            {item.navigationURL?.indexOf("/digit-ui") === -1 ? (
              <a
                data-tip="React-tooltip"
                data-for={`jk-side-${getModuleName}`}
                className="custom-link"
                href={getOrigin + "/employee/" + item.navigationURL}
              >
                <span> {trimModuleName} </span>

               {trimModuleName?.includes("...") &&<ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${getModuleName}`}>
                  {t(`ACTION_TEST_${getModuleName}`)}
                </ReactTooltip>}
              </a>
            ) : (
              // <a className="custom-link" href={getOrigin + "/employee/" + item.navigationURL}>
              //   <div className="tooltip">
              //     <p className="p1">{trimModuleName}</p>
              //     <span className="tooltiptext">{t(`ACTION_TEST_${getModuleName}`)}</span>
              //   </div>
              // </a>
              <Link className="custom-link" to={item.navigationURL}>
                <div data-tip="React-tooltip" data-for={`jk-side-${getModuleName}`}>
                  <span> {trimModuleName} </span>

                 {trimModuleName?.includes("...") && <ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${getModuleName}`}>
                    {t(`ACTION_TEST_${getModuleName}`)}
                  </ReactTooltip>}
                </div>
                {/* <div className="tooltip">
                  <p className="p1">{trimModuleName}</p>
                  <span className="tooltiptext">{t(`ACTION_TEST_${getModuleName}`)}</span>
                </div>{" "} */}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="submenu-container">
          <div onClick={item.links && showSubnav} className={`sidebar-link`}>
            <div className="actions" style={{display:"flex",gap:"20px"}}>
              {/* {leftIcon} */}
              <div data-tip="React-tooltip" data-for={`jk-side-${getModuleName}`}>
                <span> {trimModuleName} </span>

                {trimModuleName?.includes("...") && <ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${getModuleName}`}>
                  {t(`ACTION_TEST_${getModuleName}`)}
                </ReactTooltip>}
              </div>
              {/* <div className="tooltip">
                <p className="p1">{trimModuleName}</p>
                <span className="tooltiptext">{t(`ACTION_TEST_${getModuleName}`)}</span>
              </div>{" "} */}
            </div>
            {/* <div> {item.links && subnav ? <ArrowVectorDown /> : item.links ? <ArrowForward /> : null} </div> */}
          </div>
        </div>

        {subnav &&
          item.links
          .sort((a, b) => a.orderNumber - b.orderNumber)
            .filter((item) => item.url === "url" || item.url !== "")
            .map((item, index) => {
              const getChildName = item?.displayName?.toUpperCase()?.replace(/[ -]/g, "_");
              const appendTranslate = t(`ACTION_TEST_${getChildName}`);
              const trimModuleName = t(appendTranslate?.length > 20 ? appendTranslate.substring(0, 20) + "..." : appendTranslate);

              if (item.navigationURL.indexOf("/digit-ui") === -1) {
                const getOrigin = window.location.origin;
                return (
                  <a
                    key={index}
                    className={`dropdown-link ${pathname === item.link ? "active" : ""}`}
                    href={getOrigin + "/employee/" + item.navigationURL}
                  >
                    <div className="actions" style={{display:"flex",gap:"20px"}}  data-tip="React-tooltip" data-for={`jk-side-${index}`}>
                      <span> {trimModuleName} </span>
                    {trimModuleName?.includes("...") && <ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${index}`}>
                        {t(`ACTION_TEST_${getChildName}`)}
                      </ReactTooltip>}
                    </div>
                    {/* <div className="actions">
                      <div className="tooltip">
                        <p className="p1">{trimModuleName}</p>
                        <span className="tooltiptext">{t(`ACTION_TEST_${getChildName}`)}</span>
                      </div>{" "}
                    </div> */}
                  </a>
                );
              }
              return (
                <Link
                  to={item?.link || item.navigationURL}
                  key={index}
                  className={`dropdown-link ${pathname === item?.link || pathname === item?.navigationURL ? "active" : ""}`}
                >
                  <div className="actions" style={{display:"flex",gap:"20px"}} data-tip="React-tooltip" data-for={`jk-side-${index}`}>
                    <span> {trimModuleName} </span>
                   {trimModuleName?.includes("...") &&<ReactTooltip textColor="white" backgroundColor="grey" place="right" type="info" effect="solid" id={`jk-side-${index}`}>
                      {t(`ACTION_TEST_${getChildName}`)}
                    </ReactTooltip>}
                    {/* <div className="tooltip">
                      <p className="p1">{trimModuleName}</p>
                      <span className="tooltiptext">{t(`ACTION_TEST_${getChildName}`)}</span>
                    </div>{" "} */}
                  </div>
                </Link>
              );
            })}
      </React.Fragment>
    );
  }
};

export default SubMenu;