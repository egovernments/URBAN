// import { Dropdown, Hamburger } from "@egovernments/digit-ui-react-components";
// import React, { useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import ChangeLanguage from "../ChangeLanguage";

// const TextToImg = ({ name, toggleMenu }) => (
//   <span
//     className="user-img-txt"
//     onClick={toggleMenu}
//     title={name}
//     style={{
//       backgroundColor: "#6b133f",
//       color: "#fff",
//       borderRadius: "50%",
//       width: "36px",
//       height: "36px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontWeight: "bold",
//       fontSize: "14px",
//       cursor: "pointer"
//     }}
//   >
//     {name?.[0]?.toUpperCase()}
//   </span>
// );

// const TopBar = ({
//   t,
//   stateInfo,
//   toggleSidebar,
//   handleLogout,
//   userDetails,
//   CITIZEN,
//   cityDetails,
//   mobileView,
//   userOptions,
//   handleUserDropdownSelection,
//   showLanguageChange = true,
// }) => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [fontSize, setFontSize] = useState('medium');
//   const history = useHistory();
//   const location = useLocation();
//   const loggedIn = userDetails?.access_token ? true : false;

//   // Fetch profile picture
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const uuid = userDetails?.info?.uuid;
//       const tenant = Digit.ULBService.getCurrentTenantId();
//       if (uuid) {
//         try {
//           const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
//           const photo = usersResponse?.user?.[0]?.photo?.split(",")?.[0];
//           if (photo) setProfilePic(photo);
//         } catch (error) {
//           console.error("Error fetching profile:", error);
//         }
//       }
//     };
//     if (userDetails?.info?.uuid) {
//       fetchProfile();
//     }
//   }, [userDetails?.info?.uuid]);

//   // Notification count
//   const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);
//   const { data: { unreadCount = 0 } = {}, isSuccess: notificationCountLoaded } = Digit.Hooks.useNotificationCount({
//     tenantId: CitizenHomePageTenantId,
//     config: {
//       enabled: !!CitizenHomePageTenantId && !CITIZEN,
//     },
//   });

//   const handleNotificationClick = () => {
//     history.push("/digit-ui/citizen/engagement/notifications");
//   };

//   const changeFontSize = (size) => {
//     setFontSize(size);
//     const root = document.documentElement;
//     switch (size) {
//       case 'small':
//         root.style.fontSize = '14px';
//         break;
//       case 'medium':
//         root.style.fontSize = '16px';
//         break;
//       case 'large':
//         root.style.fontSize = '18px';
//         break;
//       default:
//         root.style.fontSize = '16px';
//     }
//   };

//   const topBarStyles = {
//     backgroundColor: "#801d46",
//     color: "white",
//     borderBottomLeftRadius: mobileView ? "0" : "25px",
//     borderBottomRightRadius: mobileView ? "0" : "25px",
//     padding: mobileView ? "8px 10px" : "10px 20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: mobileView ? "100%" : "80%",
//     marginLeft: "auto",
//     height: mobileView ? "50px" : "80px",
//     boxSizing: "border-box",
//     position: "relative",
//   };
//   const topBarStyless = {
//     backgroundColor: "#801d46",
//     color: "white",
//     borderBottomLeftRadius: mobileView ? "0" : "25px",
//     borderBottomRightRadius: mobileView ? "0" : "25px",
//     padding: mobileView ? "8px 10px" : "10px 20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: mobileView ? "100%" : "100%",
//     marginLeft: "auto",
//     height: mobileView ? "50px" : "80px",
//     boxSizing: "border-box",
//     position: "relative",
//   };
//   const logoContainerStyles = {
//     display: "flex",
//     alignItems: "center",
//     gap: mobileView ? "8px" : "12px",
//     flex: mobileView ? "0 0 auto" : "0 0 auto",
//   };

//   const logoStyles = {
//     height: mobileView ? "30px" : "40px",
//     width: "auto",
//   };

//   const rightSectionStyles = {
//     display: "flex",
//     alignItems: "center",
//     gap: mobileView ? "8px" : "15px",
//     marginLeft: "auto",
//   };

//   const fontSizeButtonStyles = {
//     background: "none",
//     border: "1px solid rgba(255,255,255,0.3)",
//     color: "white",
//     padding: mobileView ? "4px 8px" : "5px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: mobileView ? "12px" : "14px",
//     fontWeight: "500",
//     transition: "all 0.2s",
//   };

//   const notificationStyles = {
//     position: "relative",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: mobileView ? "32px" : "36px",
//     height: mobileView ? "32px" : "36px",
//   };

//   const notificationBadgeStyles = {
//     position: "absolute",
//     top: "-4px",
//     right: "-4px",
//     background: "#ff4444",
//     color: "white",
//     borderRadius: "50%",
//     fontSize: "10px",
//     width: "18px",
//     height: "18px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontWeight: "bold",
//   };

//   return (
//     <div style={CITIZEN ? topBarStyless : topBarStyles}>
//       {/* Left Section */}
//       <div style={{ display: "flex", alignItems: "center", gap: mobileView ? "8px" : "12px" }}>
//         {/* Hamburger Menu - Mobile Only */}
//         {mobileView && (
//           <Hamburger
//             handleClick={toggleSidebar}
//             color="#ffffff"
//             style={{ marginRight: "5px" }}
//           />
//         )}

//         {/* Logo Section */}
//         <div style={logoContainerStyles}>
//           {/* <img 
//             src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg" 
//             alt="MP Government Logo" 
//             style={logoStyles}
//           /> */}
//           {/* {!mobileView && (
//             <div>
//               <h3 style={{ 
//                 fontSize: "16px", 
//                 fontWeight: 600, 
//                 margin: 0, 
//                 color: "white",
//                 lineHeight: "1.2"
//               }}>
//                 मध्य प्रदेश सरकार
//               </h3>
//               <p style={{ 
//                 fontSize: "11px", 
//                 margin: 0, 
//                 opacity: 0.9,
//                 lineHeight: "1.2"
//               }}>
//                 Government of Madhya Pradesh
//               </p>
//             </div>
//           )} */}
//         </div>
//       </div>

//       {/* Right Section */}
//       <div style={rightSectionStyles}>
//         {/* Font Size Controls - Desktop Only */}
//         {!mobileView && (
//           <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//             <button
//               onClick={() => changeFontSize('small')}
//               style={{
//                 ...fontSizeButtonStyles,
//                 backgroundColor: fontSize === 'small' ? 'rgba(255,255,255,0.2)' : 'transparent'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = fontSize === 'small' ? 'rgba(255,255,255,0.2)' : 'transparent'}
//             >
//               A-
//             </button>
//             <button
//               onClick={() => changeFontSize('medium')}
//               style={{
//                 ...fontSizeButtonStyles,
//                 backgroundColor: fontSize === 'medium' ? 'rgba(255,255,255,0.2)' : 'transparent'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = fontSize === 'medium' ? 'rgba(255,255,255,0.2)' : 'transparent'}
//             >
//               A
//             </button>
//             <button
//               onClick={() => changeFontSize('large')}
//               style={{
//                 ...fontSizeButtonStyles,
//                 backgroundColor: fontSize === 'large' ? 'rgba(255,255,255,0.2)' : 'transparent'
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = fontSize === 'large' ? 'rgba(255,255,255,0.2)' : 'transparent'}
//             >
//               A+
//             </button>
//           </div>
//         )}

//         {/* Language Selector */}
//         {showLanguageChange && (
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             color: "white"
//           }}>
//             <ChangeLanguage dropdown={true} />
//           </div>
//         )}

//         {/* Notification Icon */}
//         {loggedIn && !CITIZEN && (
//           <div onClick={handleNotificationClick} style={notificationStyles}>
//             <span style={{ fontSize: mobileView ? "18px" : "20px" }}>🔔</span>
//             {notificationCountLoaded && unreadCount > 0 && (
//               <span style={notificationBadgeStyles}>
//                 {unreadCount > 99 ? "99+" : unreadCount}
//               </span>
//             )}
//           </div>
//         )}

//         {/* User Profile Dropdown */}
//         {loggedIn && (
//           <div style={{ height: "40px" }}>
//             <Dropdown
//               option={userOptions}
//               optionKey={"name"}
//               select={handleUserDropdownSelection}
//               showArrow={true}
//               freeze={true}
//               style={{ marginLeft: "8px" }}
//               customSelector={
//                 profilePic ? (
//                   <img
//                     src={profilePic}
//                     alt="user"
//                     style={{
//                       width: mobileView ? 32 : 36,
//                       height: mobileView ? 32 : 36,
//                       borderRadius: "50%",
//                       border: "2px solid rgba(255,255,255,0.3)",
//                       cursor: "pointer",
//                     }}
//                   />
//                 ) : (
//                   <TextToImg name={userDetails?.info?.name || "E"} />
//                 )
//               }
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopBar;


import { Dropdown, Hamburger } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
      border: "2px solid white"
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
  const [profilePic, setProfilePic] = useState(null);
  const [fontSize, setFontSize] = useState('medium');
  const history = useHistory();
  const location = useLocation();
  const loggedIn = userDetails?.access_token ? true : false;

  // Fetch profile picture
  useEffect(() => {
    const fetchProfile = async () => {
      const uuid = userDetails?.info?.uuid;
      const tenant = Digit.ULBService.getCurrentTenantId();
      if (uuid) {
        try {
          const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
          const photo = usersResponse?.user?.[0]?.photo?.split(",")?.[0];
          if (photo) setProfilePic(photo);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    if (userDetails?.info?.uuid) {
      fetchProfile();
    }
  }, [userDetails?.info?.uuid]);

  // Notification count
  const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { unreadCount = 0 } = {}, isSuccess: notificationCountLoaded } = Digit.Hooks.useNotificationCount({
    tenantId: CitizenHomePageTenantId,
    config: {
      enabled: !!CitizenHomePageTenantId && !CITIZEN,
    },
  });

  const handleNotificationClick = () => {
    history.push("/digit-ui/citizen/engagement/notifications");
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    const root = document.documentElement;
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  };

  const topBarStyles = {
    backgroundColor: "#6B133F",
    color: "white",
    borderBottomLeftRadius: mobileView ? "0" : "25px",
    borderBottomRightRadius: mobileView ? "0" : "25px",
    padding: mobileView ? "8px 10px" : "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: mobileView ? "100%" : "100%",
    height: mobileView ? "50px" : "80px",
    boxSizing: "border-box",
    position: "relative",
    marginLeft: "auto"
  };

  const logoContainerStyles = {
    display: "flex",
     alignItems: "center",
    gap: mobileView ? "8px" : "12px",
    flex: mobileView ? "0 0 auto" : "0 0 auto",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingRight: "10px",
  };

  const logoStyles = {
    height: mobileView ? "30px" : "56px",
    width: "auto",
  };

  const rightSectionStyles = {
    display: "flex",
    alignItems: "center",
    gap: mobileView ? "8px" : "15px",
    marginLeft: "auto",
  };

  const fontSizeButtonStyles = {
    background: "none",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    padding: mobileView ? "4px 8px" : "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: mobileView ? "12px" : "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  };

  const notificationStyles = {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: mobileView ? "32px" : "36px",
    height: mobileView ? "32px" : "36px",
  };

  const notificationBadgeStyles = {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    background: "#ff4444",
    color: "white",
    borderRadius: "50%",
    fontSize: "10px",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  };

  return (
    <div>
      {!loggedIn && (
        <div
          style={{
            backgroundColor: "#6b133f",
            color: "white",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            flexShrink: 0,
            height: "65px",
           
          }}
        >
          <img
            src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg"
            alt="MP Logo"
            style={{ height: "40px", width: "auto" }}
          />
          <div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>मध्य प्रदेश सरकार</div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Government of Madhya Pradesh</div>
          </div>
        </div>)}
      {loggedIn && (
        <div style={{ width: "100%", height: "115px", background: "white", display: "flex" }}>

          <div style={logoContainerStyles}>
            {!mobileView && (
              <img
                src="https://devtfstatep7f19.blob.core.windows.net/imc-dev-assets/image%2014.svg"
                alt="MP Government Logo"
                style={logoStyles}
              />
            )}
            {!mobileView && (
              <div>
                <h3 style={{
                  fontFamily: "Noto Sans",
                  fontWeight: 700,
                  fontStyle: "normal",   // "Display Bold" isn't valid CSS, weight handles boldness
                  fontSize: "18px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                  color: "#000000"
                }}>
                  इंदौर नगर निगम
                </h3>
                <p style={{
                  fontFamily: "Noto Sans",
                  fontWeight: 600,
                  fontStyle: "normal",  // "SemiBold" isn't valid, weight handles it
                  fontSize: "12px",
                  lineHeight: "31.68px",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                }}>
                  Indore Municipal Corporation
                </p>
              </div>
            )}
          </div>
          <div style={topBarStyles}>
            {/* Left Section */}

            <div style={{ display: "flex", alignItems: "center", gap: mobileView ? "8px" : "12px" }}>
              {/* Hamburger Menu - Mobile Only */}
              {mobileView && (
                <Hamburger
                  handleClick={toggleSidebar}
                  color="#ffffff"
                  style={{ marginRight: "5px" }}
                />
              )}

              {/* Logo Section */}
              {/* <div style={logoContainerStyles}>
          <img 
            src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg" 
            alt="MP Government Logo" 
            style={logoStyles}
          />
          {!mobileView && (
            <div>
              <h3 style={{ 
                fontSize: "16px", 
                fontWeight: 600, 
                margin: 0, 
                color: "white",
                lineHeight: "1.2"
              }}>
                मध्य प्रदेश सरकार
              </h3>
              <p style={{ 
                fontSize: "11px", 
                margin: 0, 
                opacity: 0.9,
                lineHeight: "1.2"
              }}>
                Government of Madhya Pradesh
              </p>
            </div>
          )}
        </div> */}
            </div>

            {/* Right Section */}
            <div style={rightSectionStyles}>
              {/* Font Size Controls - Desktop Only */}
              {!mobileView && (
                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <button
                    onClick={() => changeFontSize('small')}
                    style={{
                      ...fontSizeButtonStyles,
                      backgroundColor: fontSize === 'small' ? 'rgba(255,255,255,0.2)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = fontSize === 'small' ? 'rgba(255,255,255,0.2)' : 'transparent'}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => changeFontSize('medium')}
                    style={{
                      ...fontSizeButtonStyles,
                      backgroundColor: fontSize === 'medium' ? 'rgba(255,255,255,0.2)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = fontSize === 'medium' ? 'rgba(255,255,255,0.2)' : 'transparent'}
                  >
                    A
                  </button>
                  <button
                    onClick={() => changeFontSize('large')}
                    style={{
                      ...fontSizeButtonStyles,
                      backgroundColor: fontSize === 'large' ? 'rgba(255,255,255,0.2)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = fontSize === 'large' ? 'rgba(255,255,255,0.2)' : 'transparent'}
                  >
                    A+
                  </button>
                </div>
              )}

              {/* Language Selector */}
              {showLanguageChange && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white"
                }}>
                  <ChangeLanguage dropdown={true} />
                </div>
              )}

              {/* Notification Icon */}
              {loggedIn && !CITIZEN && (
                <div onClick={handleNotificationClick} style={notificationStyles}>
                  <span style={{ fontSize: mobileView ? "18px" : "20px" }}>🔔</span>
                  {notificationCountLoaded && unreadCount > 0 && (
                    <span style={notificationBadgeStyles}>
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
              )}

              {/* User Profile Dropdown */}
              {loggedIn && (
                <div style={{ height: "40px" }}>
                  <Dropdown
                    option={userOptions}
                    optionKey={"name"}
                    select={handleUserDropdownSelection}
                    showArrow={true}
                    freeze={true}
                    style={{ marginLeft: "8px" }}
                    customSelector={
                      profilePic ? (
                        <img
                          src={profilePic}
                          alt="user"
                          style={{
                            width: mobileView ? 32 : 36,
                            height: mobileView ? 32 : 36,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.3)",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <TextToImg name={userDetails?.info?.name || "E"} />
                      )
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;