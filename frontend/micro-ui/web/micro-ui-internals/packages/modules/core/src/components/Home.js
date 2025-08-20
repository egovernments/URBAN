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
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
const applicationData = [
  {
    name: "Last 7 days",
    Approved: 18000,
    Pending: 9000,
    Rejected: 9000
  },
  {
    name: "Last 15 days",
    Approved: 18000,
    Pending: 9000,
    Rejected: 9000
  },
  {
    name: "1 Month",
    Approved: 18000,
    Pending: 9000,
    Rejected: 9000
  }
];

const collectionData = [
  { mode: "Cheque", value: 9000, fill: "#FF8A00" },
  { mode: "PoS", value: 18000, fill: "#3BB85E" },
  { mode: "Cash", value: 21000, fill: "#0076CE" },
  { mode: "UPI", value: 27000, fill: "#C5D5EA" },
  { mode: "Online (Web/Mobile)", value: 30000, fill: "#4B1D59" }
];


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
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const user = Digit.UserService.getUser();
  const accessToken = user?.access_token;
  const refreshToken = user?.refresh_token;
  const roles = user?.info?.roles?.map(role => role.code) || [];

  // Define all favorites
  const allFavorites = [
    {
      label: "Property Register",
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg",
      url: "/digit-ui/employee/pt/new-application",
    },
    {
      label: "Property Cash Desk",
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg",
      url: "/digit-ui/employee/pt/search",
    },
    {
      label: "Track Application",
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg",
      url: "/digit-ui/employee/pt/application-search",
    },
    {
      label: "Daily Collection Report",
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
      url: "/digit-ui/employee/pt/inbox",
    }
  ];

  // Filter favorites based on role
  const filteredFavorites = allFavorites.filter(fav => {
    if (fav.label === "Property Cash Desk" && (roles.includes("PT_APPROVER") || roles.includes("PT_FIELD_INSPECTOR"))) {
      return false; // Hide this card
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log("module", modules)
  if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});

  return (
    <div
      className="main-content"
      style={{ display: "flex", flexDirection: "column", transition: "margin-left 0.3s" }}
    >
      <div className="main-content-wrapper" style={{ flex: 1 }}>
        {/* <div
          className="header"
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            backgroundColor: "#801d46",
            color: "white",
            borderBottomLeftRadius: "25px",
            borderBottomRightRadius: "25px"
          }}
        >
          <div className="toggle-btn" id="toggle-sidebar" style={{ fontSize: "20px", cursor: "pointer", position: "absolute" }}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="header-right-nav" style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            <div className="header-actions" style={{ display: "flex", gap: "20px" }}>
              {["bell", "comment", "gift", "cog"].map((icon) => (
                <a
                  key={icon}
                  href="javascript:void(0);"
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    background: "rgba(255,255,255,0.15)",
                    padding: "8px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none"
                  }}
                >
                  <i className={`fas fa-${icon}`}></i>
                </a>
              ))}
            </div>

            <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
              <span>Hello, Samantha</span>
              <div className="avatar" style={{ width: "35px", height: "35px", borderRadius: "50%", overflow: "hidden", border: "2px solid white" }}>
                <img src="https://i.imgur.com/vT8WQEA.jpg" alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div> */}

        <div className="content-area" style={{ padding: isMobile ? "10px" : "0px", marginTop: isMobile ? "0px" : "40px" }}>
          <div className="content-header" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", marginBottom: "20px", gap: isMobile ? "10px" : "0" }}>
            <h2>Home</h2>
            {/* <div
              className="filter"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                width: isMobile ? "100%" : "270px",
                maxWidth: "270px"
              }}
            >
              <div className="filter-container" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <i className="far fa-calendar" style={{ color: "#801d46", fontSize: "24px" }}></i>
                <div>
                  <span style={{ fontSize: "14px", color: "#333" }}>Filter Period</span>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>17 April 2025 - 21 Jul 2025</p>
                </div>
              </div>
              <i className="fas fa-chevron-down"></i>
            </div> */}
          </div>

          {/* Status Cards */}
          <div
            className="status-cards home-stats-card"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "20px"
            }}
          >
            {[
              { url: "/digit-ui/employee/pt/PropertyLandingPage", icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg", label: "Property", count: 100, className: "approved", color: "#4caf50" },
              { url: "", icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order.svg", label: "Water", count: 50, className: "pending", color: "#ff9800" },
              { url: "", icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg", label: "Send Back", count: 30, className: "sendback", color: "#2196f3" },
              { url: `${stateInfo?.BAPURL}dashboard?type=1&accessToken=${accessToken}&refreshToken=${refreshToken}&module=marriage`, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg", label: "Marriage Certificate", count: 30, className: "sendback", color: "#2196f3" },
              { url: `${stateInfo?.BAPURL}dashboard?type=4&accessToken=${accessToken}&refreshToken=${refreshToken}&module=rental`, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg", label: "Rental", count: 30, className: "sendback", color: "#4caf50" }

            ].map((card, index) => (
              <div key={index} className="" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <div className={`card-icon ${card.className}`} style={{ maxWidth: "70px", width: "70px" }}>
                  <img src={card.icon} alt={card.label} style={{ maxWidth: "100%" }} />
                </div>
                <a
                  href={card.url}
                  // style={{ ...commonStyles.labelText }}
                  data-tip="React-tooltip"
                // data-for={`tooltip-${getModuleName}`}
                >
                  <div className="card-content" style={{ marginLeft: "20px" }}>
                    <h2 style={{ fontSize: "25px", fontWeight: "800", marginBottom: "6px" }}>{card.count}</h2>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: card.color }}>{card.label}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          {/* <div className="graph-view-area" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }}>
            <div className="chart-container" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Application Details</h2>
              <canvas id="applicationDetails"></canvas>

            </div>
            <div className="chart-container" style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Collection</h2>
              <div className="info-container" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                {[
                  { label: "Total Till Date", value: "₹ 12,34,567" },
                  { label: "Last 15 days", value: "₹ 12,34,567" }
                ].map((info, idx) => (
                  <div key={idx} className="info-pill" style={{ backgroundColor: "#f1f3f5", padding: "10px 16px", borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.05)", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontSize: "14px" }}>
                    <span style={{ color: "#555", fontWeight: "500", marginRight: "15px" }}>{info.label}</span>
                    <span style={{ fontWeight: "bold", color: "#111" }}>{info.value}</span>
                  </div>
                ))}
              </div>
              <canvas id="collectionChart"></canvas>
            </div>
          </div> */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px", fontFamily: "Barlow" }}>
            {/* Application Details Card */}
            {/* <div
              style={{
                flex: 1,
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 0 8px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ fontWeight: "700", color: "#464255", fontSize: "20px", marginBottom: "10px" }}>
                Application Details
              </h3>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 12, height: 12, backgroundColor: "#3BB85E" }} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Approved</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 12, height: 12, backgroundColor: "#FFD400" }} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Pending</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 12, height: 12, backgroundColor: "#EF4C60" }} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Rejected</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={applicationData} barCategoryGap={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Approved" fill="#3BB85E" />
                  <Bar dataKey="Pending" fill="#FFD400" />
                  <Bar dataKey="Rejected" fill="#EF4C60" />
                </BarChart>
              </ResponsiveContainer>
            </div> */}

            {/* Collection Card */}
            {/* <div
              style={{
                flex: 1,
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 0 8px rgba(0,0,0,0.05)"
              }}
            >
              <h3 style={{ fontWeight: "700", color: "#464255", fontSize: "20px", marginBottom: "10px" }}>Collection</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                  fontSize: "14px",
                  marginBottom: "10px"
                }}
              >
                <span>Total Till date: ₹ 12,34,567</span>
                <span>Last 15 days: ₹ 12,34,567</span>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={collectionData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {collectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div> */}
          </div>
          {/* Favorite Cards */}
          <div className="favorite-card">
            <div className="card-header-view" style={{ marginBottom: "15px" }}>
              <h2 style={{ color: "#464255", fontWeight: "700", fontSize: "20px", display: "flex", alignItems: "center", marginLeft: 0, marginTop: 15 }}>
                {/* <i className="fa-regular fa-star" style={{ marginRight: "10px" }}></i> */}
                Favorites
              </h2>
            </div>

            <div
              className="action-cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {filteredFavorites.map((action, index) => (
                <div
                  key={index}
                  className="action-card"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "20px",
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
                      width: "50px",
                      height: "50px",
                      marginBottom: "10px",
                    }}
                  />
                  <a
                    href={action.url}
                    style={{
                      fontSize: "14px",
                      margin: 0,
                      color: "#333",
                      fontWeight: "500",
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