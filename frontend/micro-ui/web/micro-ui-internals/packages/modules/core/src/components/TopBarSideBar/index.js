// import React, { useState, useEffect, Fragment } from "react";
// import { EditPencilIcon, LogoutIcon } from "@egovernments/digit-ui-react-components";
// import TopBar from "./TopBar";
// import { useHistory } from "react-router-dom";
// import SideBar from "./SideBar";
// import LogoutDialog from "../Dialog/LogoutDialog";

// const TopBarSideBar = ({
//   t,
//   stateInfo,
//   userDetails,
//   CITIZEN,
//   cityDetails,
//   mobileView,
//   handleUserDropdownSelection,
//   logoUrl,
//   showSidebar = true,
//   showLanguageChange,
//   linkData,
//   islinkDataLoading,
//   children,
// }) => {
//   const [isSidebarOpen, toggleSidebar] = useState(false);
//   const [isSideBarScroll, setSideBarScrollTop] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const history = useHistory();
//   const [showDialog, setShowDialog] = useState(false);
//   const { data: storeData } = Digit.Hooks.useStore.getInitData();
  
//   const isMobile = windowWidth <= 768;
//   const isTablet = windowWidth > 768 && windowWidth <= 1024;
//   const isDesktop = windowWidth > 1024;
  
//   // Calculate sidebar width based on screen size
//   const getSidebarWidth = () => {
//     if (isMobile) return 0;
//     if (isTablet) return 200;
//     return 240;
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//       // Close sidebar when switching to desktop
//       if (window.innerWidth > 768) {
//         toggleSidebar(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Add/remove body class for mobile sidebar
//   useEffect(() => {
//     if (isMobile && isSidebarOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobile, isSidebarOpen]);

//   const handleLogout = () => {
//     toggleSidebar(false);
//     setShowDialog(true);
//   };

//   const handleOnSubmit = () => {
//     Digit.UserService.logout();
//     setShowDialog(false);
//   };

//   const handleOnCancel = () => {
//     setShowDialog(false);
//   };

//   const userProfile = () => {
//     history.push("/digit-ui/employee/user/profile");
//   };

//   const userOptions = [
//     { name: t("EDIT_PROFILE"), icon: <EditPencilIcon className="icon" />, func: userProfile },
//     { name: t("CORE_COMMON_LOGOUT"), icon: <LogoutIcon className="icon" />, func: handleLogout },
//   ];
//     const logoContainerStyles = {
//     display: "flex",
//     alignItems: "center",
//     marginTop:"20px",
//     marginBottom:"35px",
//     gap: mobileView ? "8px" : "12px",
//     flex: mobileView ? "0 0 auto" : "0 0 auto",
//   };
//     const logoStyles = {
//     height: mobileView ? "30px" : "60px",
//     width: "60px",
//     marginLeft:"6px",
//     paddingTop:"2px",
//     paddingBottom:"2px"
    
//   };

//   return (
//     <Fragment>
//       {/* Global CSS Fixes */}
//       <style>
//         {`
//           /* Remove any parent wrapper constraints */
//           html, body {
//             margin: 0;
//             padding: 0;
//             width: 100%;
//             overflow-x: hidden;
//           }
          
//           /* Ensure root takes full width */
//           #root {
//             width: 100% !important;
//             min-height: 100vh;
//           }
          
//           /* Remove any 20% width wrapper */
//           #root > div {
//             width: 100% !important;
//           }

//           /* Main layout container */
//           .topbar-sidebar-layout {
//             width: 100%;
//             // min-height: 100vh;
//             display: flex;
//             flex-direction: column;
//             position: relative;
//           }

//           /* Fixed topbar */
//           .topbar-fixed {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             z-index: 1100;
//             width: 100%;
//             height: ${isMobile ? '50px' : '60px'};
//           }

//           /* Content wrapper */
//           // .content-wrapper {
//           //   display: flex;
//           //   width: 100%;
//           //   min-height: 100vh;
//           //   padding-top: ${isMobile ? '50px' : '60px'};
//           // }

//           /* Desktop sidebar */
//           .sidebar-desktop {
//             position: fixed;
//             left: 0;
//             // top: ${isMobile ? '50px' : '60px'};
//             // top: ${isMobile ? '0px' : '0px'};
//             width: ${getSidebarWidth()}px;
//             // height:100%;
//             // height: calc(100vh - ${isMobile ? '50px' : '60px'});
//              height: calc(100vh - ${isMobile ? '50px' : '0px'});
//             background: white;
//             box-shadow: 2px 0 4px rgba(0,0,0,0.1);
//             overflow-y: auto;
//             z-index: 1000;
//           }

//           /* Main content area */
//           .main-content-area {
//             flex: 1;
//             width: 100%;
//             margin-left: ${getSidebarWidth()}px;
//             /* padding: ${isMobile ? '10px' : '20px'};*/
//             padding: ${isMobile ? '0px' : '0px'};
//             box-sizing: border-box;
//             overflow-x: hidden;
//             min-height: calc(100vh - ${isMobile ? '50px' : '60px'});
//           }

//           /* Mobile sidebar overlay */
//           .mobile-sidebar-overlay {
//             display: none;
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: rgba(0, 0, 0, 0.5);
//             z-index: 1200;
//           }

//           .mobile-sidebar-overlay.active {
//             display: block;
//           }

//           /* Mobile sidebar container */
//           .mobile-sidebar-container {
//             position: fixed;
//             top: 0;
//             left: 0;
//             height: 100vh;
//             width: 280px;
//             background: white;
//             transform: translateX(-100%);
//             transition: transform 0.3s ease-in-out;
//             z-index: 1300;
//             overflow-y: auto;
//           }

//           .mobile-sidebar-container.open {
//             transform: translateX(0);
//           }

//           /* Responsive adjustments */
//           @media (max-width: 768px) {
//             .sidebar-desktop {
//               display: none !important;
//             }
            
//             .main-content-area {
//               margin-left: 0 !important;
//               width: 100% !important;
//               padding: 10px !important;
//             }
            
//             .content-wrapper {
//               padding-top: 50px !important;
//             }

//             /* Hide CitizenSideBar default container if it exists */
//             .layout-wrapper > div:first-child {
//               display: none !important;
//             }
//           }
          
//           /* Tablet adjustments - between mobile and desktop */
//           @media (min-width: 769px) and (max-width: 1024px) {
//             .sidebar-desktop {
//               width: 200px !important;
//             }
            
//             .main-content-area {
//               margin-left: 200px !important;
//               width: calc(100% - 200px) !important;
//             }
//           }
          
//           /* Desktop adjustments - larger screens */
//           @media (min-width: 1025px) {
//             .sidebar-desktop {
//               width: 240px !important;
//             }
            
//             .main-content-area {
//               margin-left: 240px !important;
//               width: calc(100% - 240px) !important;
//             }
//           }
          
//           /* Very small mobile screens */
//           @media (max-width: 480px) {
//             .main-content-area {
//               padding: 5px !important;
//             }
            
//             .topbar-fixed {
//               height: 45px !important;
//             }
            
//             .content-wrapper {
//               padding-top: 45px !important;
//             }
//           }

//           @media (min-width: 769px) {
//             .mobile-sidebar-overlay,
//             .mobile-sidebar-container {
//               display: none !important;
//             }
//           }

//           /* Fix for any CitizenSideBar wrapper issues */
//           .drawer-list {
//             width: 100% !important;
//           }
          
//           /* Mobile specific fixes to use full width */
//           @media (max-width: 768px) {
//             .topbar-sidebar-layout {
//               padding: 0 !important;
//               margin: 0 !important;
//             }
            
//             .main-content-area {
//               padding: 8px !important;
//               margin: 0 !important;
//             }
            
//             /* Remove any potential container padding that limits width */
//             .employee-app-wrapper,
//             .citizen-app-wrapper,
//             .application-container,
//             .page-container {
//               padding: 0 !important;
//               margin: 0 !important;
//               width: 100% !important;
//             }
//           }
          
//           /* Ensure no horizontal scroll */
//           * {
//             max-width: 100vw;
//             box-sizing: border-box;
//           }
//         `}
//       </style>

//       <div className="topbar-sidebar-layout">
//         {/* Top Bar */}
//         <div className="topbar-fixed">
//           <TopBar
//             t={t}
//             stateInfo={stateInfo}
//             toggleSidebar={toggleSidebar}
//             setSideBarScrollTop={setSideBarScrollTop}
//             isSidebarOpen={isSidebarOpen}
//             isSideBarScroll={isSideBarScroll}
//             handleLogout={handleLogout}
//             userDetails={userDetails}
//             CITIZEN={CITIZEN}
//             cityDetails={cityDetails}
//             mobileView={isMobile}
//             userOptions={userOptions}
//             handleUserDropdownSelection={handleUserDropdownSelection}
//             logoUrl={logoUrl}
//             showLanguageChange={showLanguageChange}
//           />
//         </div>

//         <div className="content-wrapper">
//           {/* Desktop Sidebar */}
//           {showSidebar && !isMobile && (
//             <div className="sidebar-desktop">
           
//               <div style={logoContainerStyles}>
//           <img 
//             src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/MP%20Emblem%201%201.svg" 
//             alt="MP Government Logo" 
//             style={logoStyles}
//           />
//           {!mobileView && (
//             <div>
//               <h3 style={{ 
//                 fontSize: "16px", 
//                 fontWeight: 600, 
//                 margin: 0, 
//                 // color: "rgb(128,29,70)",
//                 color:"black",
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
//           )}
//         </div>
//               <SideBar
//                 t={t}
//                 CITIZEN={CITIZEN}
//                 isSidebarOpen={true}
//                 toggleSidebar={toggleSidebar}
//                 isSideBarScroll={isSideBarScroll}
//                 setSideBarScrollTop={setSideBarScrollTop}
//                 handleLogout={handleLogout}
//                 mobileView={false}
//                 userDetails={userDetails}
//                 linkData={linkData}
//                 islinkDataLoading={islinkDataLoading}
//               />
//             </div>
//           )}

//           {/* Mobile Sidebar Overlay & Container */}
//           {isMobile && (
//             <>
//               <div 
//                 className={`mobile-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
//                 onClick={() => toggleSidebar(false)}
//               />
//               <div className={`mobile-sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
//                 <SideBar
//                   t={t}
//                   CITIZEN={CITIZEN}
//                   isSidebarOpen={isSidebarOpen}
//                   toggleSidebar={toggleSidebar}
//                   isSideBarScroll={isSideBarScroll}
//                   setSideBarScrollTop={setSideBarScrollTop}
//                   handleLogout={handleLogout}
//                   mobileView={true}
//                   userDetails={userDetails}
//                   linkData={linkData}
//                   islinkDataLoading={islinkDataLoading}
//                 />
//               </div>
//             </>
//           )}

//           {/* Main Content - Only render if children are provided */}
//           {children && (
//             <main className="main-content-area">
//               {children}
//             </main>
//           )}
//         </div>

//         {/* Logout Dialog */}
//         {showDialog && (
//           <LogoutDialog 
//             onSelect={handleOnSubmit} 
//             onCancel={handleOnCancel} 
//             onDismiss={handleOnCancel}
//           />
//         )}
//       </div>
//     </Fragment>
//   );
// };

// export default TopBarSideBar;



import React, { useState, useEffect, Fragment } from "react";
import { EditPencilIcon, LogoutIcon } from "@egovernments/digit-ui-react-components";
import TopBar from "./TopBar";
import { useHistory } from "react-router-dom";
import SideBar from "./SideBar";
import LogoutDialog from "../Dialog/LogoutDialog";

const TopBarSideBar = ({
  t,
  stateInfo,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  handleUserDropdownSelection,
  logoUrl,
  showSidebar = true,
  showLanguageChange,
  linkData,
  islinkDataLoading,
  children,
}) => {
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [isSideBarScroll, setSideBarScrollTop] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;
  
  // Calculate sidebar width based on screen size
  const getSidebarWidth = () => {
    if (isMobile) return 0;
    if (isTablet) return 200;
    return 240;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close sidebar when switching to desktop
      if (window.innerWidth > 768) {
        toggleSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add/remove body class for mobile sidebar
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isSidebarOpen]);

  const handleLogout = () => {
    toggleSidebar(false);
    setShowDialog(true);
  };

  const handleOnSubmit = () => {
    Digit.UserService.logout();
    setShowDialog(false);
  };

  const handleOnCancel = () => {
    setShowDialog(false);
  };

  const userProfile = () => {
    history.push("/digit-ui/employee/user/profile");
  };

  const userOptions = [
    { name: t("EDIT_PROFILE"), icon: <EditPencilIcon className="icon" />, func: userProfile },
    { name: t("CORE_COMMON_LOGOUT"), icon: <LogoutIcon className="icon" />, func: handleLogout },
  ];

  return (
    <Fragment>
      {/* Global CSS Fixes */}
      <style>
        {`
          /* Remove any parent wrapper constraints */
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          
          /* Ensure root takes full width */
          #root {
            width: 100% !important;
            min-height: 100vh;
          }
          
          /* Remove any 20% width wrapper */
          #root > div {
            width: 100% !important;
          }

          /* Main layout container */
          .topbar-sidebar-layout {
            width: 100%;
            // min-height: 100vh;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          /* Fixed topbar */
          .topbar-fixed {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1100;
            width: 100%;
            height: ${isMobile ? '50px' : '60px'};
          }

          /* Content wrapper */
          // .content-wrapper {
          //   display: flex;
          //   width: 100%;
          //   min-height: 100vh;
          //   padding-top: ${isMobile ? '50px' : '60px'};
          // }

          /* Desktop sidebar */
          .sidebar-desktop {
          padding-top:24px;
            position: fixed;
            left: 0;
            top: ${isMobile ? '50px' : '100px'};
            width: ${getSidebarWidth()}px;
            height: calc(100vh - ${isMobile ? '50px' : '60px'});
            background: white;
            box-shadow: 2px 0 4px rgba(0,0,0,0.1);
            overflow-y: auto;
            z-index: 1000;
          }

          /* Main content area */
          .main-content-area {
            flex: 1;
            width: 100%;
            margin-left: ${getSidebarWidth()}px;
            /* padding: ${isMobile ? '10px' : '20px'};*/
            padding: ${isMobile ? '0px' : '0px'};
            box-sizing: border-box;
            overflow-x: hidden;
            min-height: calc(100vh - ${isMobile ? '50px' : '60px'});
          }

          /* Mobile sidebar overlay */
          .mobile-sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1200;
          }

          .mobile-sidebar-overlay.active {
            display: block;
          }

          /* Mobile sidebar container */
          .mobile-sidebar-container {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 280px;
            background: white;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            z-index: 1300;
            overflow-y: auto;
          }

          .mobile-sidebar-container.open {
            transform: translateX(0);
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .sidebar-desktop {
              display: none !important;
            }
            
            .main-content-area {
              margin-left: 0 !important;
              width: 100% !important;
              padding: 10px !important;
            }
            
            .content-wrapper {
              padding-top: 50px !important;
            }

            /* Hide CitizenSideBar default container if it exists */
            .layout-wrapper > div:first-child {
              display: none !important;
            }
          }
          
          /* Tablet adjustments - between mobile and desktop */
          @media (min-width: 769px) and (max-width: 1024px) {
            .sidebar-desktop {
              width: 200px !important;
            }
            
            .main-content-area {
              margin-left: 200px !important;
              width: calc(100% - 200px) !important;
            }
          }
          
          /* Desktop adjustments - larger screens */
          @media (min-width: 1025px) {
            .sidebar-desktop {
              width: 240px !important;
            }
            
            .main-content-area {
              margin-left: 240px !important;
              width: calc(100% - 240px) !important;
            }
          }
          
          /* Very small mobile screens */
          @media (max-width: 480px) {
            .main-content-area {
              padding: 5px !important;
            }
            
            .topbar-fixed {
              height: 45px !important;
            }
            
            .content-wrapper {
              padding-top: 45px !important;
            }
          }

          @media (min-width: 769px) {
            .mobile-sidebar-overlay,
            .mobile-sidebar-container {
              display: none !important;
            }
          }

          /* Fix for any CitizenSideBar wrapper issues */
          .drawer-list {
            width: 100% !important;
          }
          
          /* Mobile specific fixes to use full width */
          @media (max-width: 768px) {
            .topbar-sidebar-layout {
              padding: 0 !important;
              margin: 0 !important;
            }
            
            .main-content-area {
              padding: 8px !important;
              margin: 0 !important;
            }
            
            /* Remove any potential container padding that limits width */
            .employee-app-wrapper,
            .citizen-app-wrapper,
            .application-container,
            .page-container {
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
            }
          }
          
          /* Ensure no horizontal scroll */
          * {
            max-width: 100vw;
            box-sizing: border-box;
          }
        `}
      </style>

      <div className="topbar-sidebar-layout">
        {/* Top Bar */}
        <div className="topbar-fixed">
          <TopBar
            t={t}
            stateInfo={stateInfo}
            toggleSidebar={toggleSidebar}
            setSideBarScrollTop={setSideBarScrollTop}
            isSidebarOpen={isSidebarOpen}
            isSideBarScroll={isSideBarScroll}
            handleLogout={handleLogout}
            userDetails={userDetails}
            CITIZEN={CITIZEN}
            cityDetails={cityDetails}
            mobileView={isMobile}
            userOptions={userOptions}
            handleUserDropdownSelection={handleUserDropdownSelection}
            logoUrl={logoUrl}
            showLanguageChange={showLanguageChange}
          />
        </div>

        <div className="content-wrapper" style={{marginTop:"70px"}}>
          {/* Desktop Sidebar */}
          {showSidebar && !isMobile && (
            <div className="sidebar-desktop">
              <SideBar
                t={t}
                CITIZEN={CITIZEN}
                isSidebarOpen={true}
                toggleSidebar={toggleSidebar}
                isSideBarScroll={isSideBarScroll}
                setSideBarScrollTop={setSideBarScrollTop}
                handleLogout={handleLogout}
                mobileView={false}
                userDetails={userDetails}
                linkData={linkData}
                islinkDataLoading={islinkDataLoading}
              />
            </div>
          )}

          {/* Mobile Sidebar Overlay & Container */}
          {isMobile && (
            <>
              <div 
                className={`mobile-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={() => toggleSidebar(false)}
              />
              <div className={`mobile-sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                <SideBar
                  t={t}
                  CITIZEN={CITIZEN}
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  isSideBarScroll={isSideBarScroll}
                  setSideBarScrollTop={setSideBarScrollTop}
                  handleLogout={handleLogout}
                  mobileView={true}
                  userDetails={userDetails}
                  linkData={linkData}
                  islinkDataLoading={islinkDataLoading}
                />
              </div>
            </>
          )}

          {/* Main Content - Only render if children are provided */}
          {children && (
            <main className="main-content-area">
              {children}
            </main>
          )}
        </div>

        {/* Logout Dialog */}
        {showDialog && (
          <LogoutDialog 
            onSelect={handleOnSubmit} 
            onCancel={handleOnCancel} 
            onDismiss={handleOnCancel}
          />
        )}
      </div>
    </Fragment>
  );
};

export default TopBarSideBar;