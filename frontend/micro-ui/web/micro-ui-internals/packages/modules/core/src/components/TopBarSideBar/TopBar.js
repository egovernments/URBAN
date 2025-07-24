// import { Dropdown, Hamburger, TopBar as TopBarComponent } from "@egovernments/digit-ui-react-components";
// import React from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import ChangeCity from "../ChangeCity";
// import ChangeLanguage from "../ChangeLanguage";

// const TextToImg = (props) => (
//   <span className="user-img-txt" style={{backgroundColor:"#6b133f"}} onClick={props.toggleMenu} title={props.name}>
//     {props?.name?.[0]?.toUpperCase()}
//   </span>
// );
// const TopBar = ({
//   t,
//   stateInfo,
//   toggleSidebar,
//   isSidebarOpen,
//   handleLogout,
//   userDetails,
//   CITIZEN,
//   cityDetails,
//   mobileView,
//   userOptions,
//   handleUserDropdownSelection,
//   logoUrl,
//   showLanguageChange = true,
//   setSideBarScrollTop,
// }) => {
//   const [profilePic, setProfilePic] = React.useState(null);

//   React.useEffect(async () => {
//     const tenant = Digit.ULBService.getCurrentTenantId();
//     const uuid = userDetails?.info?.uuid;
//     if (uuid) {
//       const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
//       if (usersResponse && usersResponse.user && usersResponse.user.length) {
//         const userDetails = usersResponse.user[0];
//         const thumbs = userDetails?.photo?.split(",");
//         setProfilePic(thumbs?.at(0));
//       }
//     }
//   }, [profilePic !== null, userDetails?.info?.uuid]);

//   const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);

//   let history = useHistory();
//   const { pathname } = useLocation();

//   const conditionsToDisableNotificationCountTrigger = () => {
//     if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
//     if (Digit.UserService?.getUser()?.info?.type === "CITIZEN") {
//       if (!CitizenHomePageTenantId) return false;
//       else return true;
//     }
//     return false;
//   };

//   const { data: { unreadCount: unreadNotificationCount } = {}, isSuccess: notificationCountLoaded } = Digit.Hooks.useNotificationCount({
//     tenantId: CitizenHomePageTenantId,
//     config: {
//       enabled: conditionsToDisableNotificationCountTrigger(),
//     },
//   });

//   const updateSidebar = () => {
//     if (!Digit.clikOusideFired) {
//       toggleSidebar(true);
//       setSideBarScrollTop(true);
//     } else {
//       Digit.clikOusideFired = false;
//     }
//   };

//   function onNotificationIconClick() {
//     history.push("/digit-ui/citizen/engagement/notifications");
//   }

//   const urlsToDisableNotificationIcon = (pathname) =>
//     !!Digit.UserService?.getUser()?.access_token
//       ? false
//       : ["/digit-ui/citizen/select-language", "/digit-ui/citizen/select-location"].includes(pathname);

//   if (CITIZEN) {
//     return (
//       <div>
//         <TopBarComponent
//           img={stateInfo?.logoUrlWhite}
//           isMobile={true}
//           toggleSidebar={updateSidebar}
//           logoUrl={stateInfo?.logoUrlWhite}
//           onLogout={handleLogout}
//           userDetails={userDetails}
//           notificationCount={unreadNotificationCount < 99 ? unreadNotificationCount : 99}
//           notificationCountLoaded={notificationCountLoaded}
//           cityOfCitizenShownBesideLogo={t(CitizenHomePageTenantId)}
//           onNotificationIconClick={onNotificationIconClick}
//           hideNotificationIconOnSomeUrlsWhenNotLoggedIn={urlsToDisableNotificationIcon(pathname)}
//           changeLanguage={!mobileView ? <ChangeLanguage dropdown={true} /> : null}
//         />
//       </div>
//     );
//   }
//   const loggedin = userDetails?.access_token ? true : false;
//   return (
//     <div className="topbar">
//       {mobileView ? <Hamburger handleClick={toggleSidebar} color="#9E9E9E" /> : null}
//       <img className="city" src={loggedin ? cityDetails?.logoId : stateInfo?.statelogo} />
//       <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
//         {loggedin &&
//           (cityDetails?.city?.ulbGrade ? (
//             <p className="ulb" style={mobileView ? { fontSize: "14px", display: "inline-block" } : {}}>
//               {t(cityDetails?.i18nKey).toUpperCase()}{" "}
//               {t(`ULBGRADE_${cityDetails?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`).toUpperCase()}
//             </p>
//           ) : (
//             <img className="state" src={logoUrl} />
//           ))}
//         {!loggedin && (
//           <p className="ulb" style={mobileView ? { fontSize: "14px", display: "inline-block" } : {}}>
//             {t(`MYCITY_${stateInfo?.code?.toUpperCase()}_LABEL`)} {t(`MYCITY_STATECODE_LABEL`)}
//           </p>
//         )}
//         {!mobileView && (
//           <div className={mobileView ? "right" : "flex-right right w-80 column-gap-15"} style={!loggedin ? { width: "80%" } : {}}>
//             <div className="left">
//               {!window.location.href.includes("employee/user/login") && !window.location.href.includes("employee/user/language-selection") && (
//                 <ChangeCity dropdown={true} t={t} />
//               )}
//             </div>
//             <div className="left">{showLanguageChange && <ChangeLanguage dropdown={true} />}</div>
//             {userDetails?.access_token && (
//               <div className="left">
//                 <Dropdown
//                   option={userOptions}
//                   optionKey={"name"}
//                   select={handleUserDropdownSelection}
//                   showArrow={true}
//                   freeze={true}
//                   style={mobileView ? { right: 0 } : {}}
//                   optionCardStyles={{ overflow: "revert" }}
//                   customSelector={
//                     profilePic == null ? (
//                       <TextToImg name={userDetails?.info?.name || userDetails?.info?.userInfo?.name || "Employee"} />
//                     ) : (
//                       <img src={profilePic} style={{ height: "48px", width: "48px", borderRadius: "50%" }} />
//                     )
//                   }
//                 />
//               </div>
//             )}
//             <img className="state" src={logoUrl} />
//           </div>
//         )}
//       </span>
//     </div>
//   );
// };

// export default TopBar;


import { Dropdown, TopBar as TopBarComponent } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import ChangeCity from "../ChangeCity";
import ChangeLanguage from "../ChangeLanguage";

const TextToImg = ({ name, toggleMenu }) => (
  <span
    className="user-img-txt"
    onClick={toggleMenu}
    title={name}
    style={{
      backgroundColor: "#6b133f",
      color: "#fff",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer"
    }}
  >
    {name?.[0]?.toUpperCase()}
  </span>
);

const TopBar = ({
  t,
  stateInfo,
  toggleSidebar,
  handleLogout,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  userOptions,
  handleUserDropdownSelection,
  showLanguageChange = true,
}) => {
  const [profilePic, setProfilePic] = React.useState(null);
  const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { pathname } = useLocation();
  const history = useHistory();

  // Notification Hook
  const { data: { unreadCount = 0 } = {}, isSuccess: notificationCountLoaded } =
    Digit.Hooks.useNotificationCount({
      tenantId: CitizenHomePageTenantId,
      config: {
        enabled: Digit.UserService?.getUser()?.info?.type === "CITIZEN" && !!CitizenHomePageTenantId,
      },
    });

  // Profile Image Fetch
  React.useEffect(() => {
    const fetchProfile = async () => {
      const uuid = userDetails?.info?.uuid;
      const tenant = Digit.ULBService.getCurrentTenantId();
      if (uuid) {
        const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
        const photo = usersResponse?.user?.[0]?.photo?.split(",")?.[0];
        if (photo) setProfilePic(photo);
      }
    };
    fetchProfile();
  }, [userDetails?.info?.uuid]);

  const handleNotificationClick = () => {
    history.push("/digit-ui/citizen/engagement/notifications");
  };

  const loggedIn = !!userDetails?.access_token;

  return (
    <div style={{
      backgroundColor: "#801d46",
      color: "white",
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
      padding: "0px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      position: "absolute",
      right: "0",
      top: "0",
    }}>
      {/* Left Side */}

      {/* <div> <img
        src="https://tse4.mm.bing.net/th/id/OIP.LcAu4hLmyz-LQqUVPtVC9AHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Logo"
        style={{
          width: "59px",
          height: "51px",
          marginRight: "16px",
          borderRadius: "50%",
        }} /></div> */}
      {/* Right Side */}
      <div style={styles.logoContainer}>
        <div style={styles.logo}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg" alt="MP Government Logo" style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={styles.logoText}>
          <h3 style={styles.logoTextHeading}>मध्य प्रदेश सरकार</h3>
          <p style={styles.logoTextSub}>Government of Madhya Pradesh</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "auto" }}>
        <button onClick={() => document.documentElement.style.fontSize = "smaller"} style={{ background: "none", border: "none" }}>A-</button>
        <button onClick={() => document.documentElement.style.fontSize = "larger"} style={{ background: "none", border: "none" }}>A+</button>
        {showLanguageChange && <ChangeLanguage dropdown={true} />}
        <div onClick={handleNotificationClick} style={{ position: "relative", cursor: "pointer" }}>
          <span role="img" aria-label="notification">🔔</span>
          {notificationCountLoaded && unreadCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "10px",
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {unreadCount < 99 ? unreadCount : "99+"}
            </span>
          )}
        </div>
        {loggedIn && (
          <div style={{ height: "40px" }}>
            <Dropdown
              option={userOptions}
              optionKey={"name"}
              select={handleUserDropdownSelection}
              showArrow={true}
              freeze={true}
              customSelector={
                profilePic ? (
                  <img src={profilePic} alt="user" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                ) : (
                  <TextToImg name={userDetails?.info?.name || "E"} />
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
const styles = {
  sidebar: {
    width: "240px",
    background: "white",
    height: "100vh",
    padding: "16px",
    boxSizing: "border-box",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    // marginBottom: "24px",
  },
  logo: {
    // width: "40px",
    // height: "40px",
    marginRight: "12px",
  },
  logoText: {
    fontFamily: "Barlow",
    color: "white",
  },
  logoTextHeading: {
    fontWeight: 600,
    fontSize: "18px",
    margin: 0,
    lineHeight: "24px",
  },
  logoTextSub: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    margin: 0,
  }
}
export default TopBar;
