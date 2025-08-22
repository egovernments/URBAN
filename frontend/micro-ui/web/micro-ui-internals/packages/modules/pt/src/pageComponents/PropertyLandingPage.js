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
// import React from "react";
// import { useTranslation } from "react-i18next";

//  const PropertyLandingPage = () => {
//     const styles = {
//     main: {
//       marginLeft: "auto",
//       background: "#f3f2f7",
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",

//       // width: "80%"
//     },
//     wrapper: {
//       padding: "20px 30px",
//       flex: 1,
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       background: "#fff",
//       padding: "15px 20px",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//       borderRadius: "10px",
//       marginBottom: "20px",
//     },
//     toggleBtn: {
//       fontSize: "20px",
//       cursor: "pointer",
//     },
//     headerRight: {
//       display: "flex",
//       alignItems: "center",
//       gap: "20px",
//     },
//     userProfile: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     avatar: {
//       width: "35px",
//       height: "35px",
//       borderRadius: "50%",
//       overflow: "hidden",
//     },
//     avatarImg: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//     },
//     contentHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "20px",
//     },
//     filter: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       background: "#fff",
//       padding: "10px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//     },
//     statusCards: {
//       display: "flex",
//       gap: "20px",
//       marginBottom: "30px",
//     },
//     statusCard: {
//       background: "#fff",
//       borderRadius: "10px",
//       padding: "15px",
//       flex: 1,
//       display: "flex",
//       alignItems: "center",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//     },
//     cardIcon: {
//       width: "50px",
//       height: "50px",
//       marginRight: "15px",
//       display: "flex",
//     },
//     cardContent: {
//       flex: 1,
//     },
//     graphArea: {
//       display: "flex",
//       gap: "20px",
//       marginBottom: "30px",
//     },
//     chartContainer: {
//       flex: 1,
//       background: "#fff",
//       borderRadius: "10px",
//       padding: "20px",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//     },
//     bar: {
//       height: "16px",
//       background: "#6B133F",
//       margin: "10px 0",
//       borderRadius: "6px",
//     },
//     infoContainer: {
//       margin: "10px 0",
//     },
//     infoPill: {
//       display: "flex",
//       justifyContent: "space-between",
//       padding: "8px 12px",
//       background: "#f1f1f1",
//       borderRadius: "6px",
//       marginBottom: "8px",
//       fontSize: "14px",
//     },
//     favoriteCard: {
//       // background: "#fff",
//       // padding: "20px",
//       borderRadius: "10px",
//       // boxShadow: "0 0 6px rgba(0,0,0,0.1)",
//       marginBottom: "30px",
//       marginTop: "20px",
//     },
//     actionCards: {
//       display: "grid",
//       gridTemplateColumns: "repeat(4, 1fr)",
//       gap: "20px",
//       marginTop: "15px",
//     },
//     actionCard: {
//       textAlign: "center",
//       padding: "15px",
//       borderRadius: "10px",
//       background: "white",
//       boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",

//       fontFamily: "Barlow",
//       fontWeight: 600,
//       fontSize: "16px",
//       fontStyle: "normal", // 'SemiBold' is not valid for fontStyle
//       lineHeight: "23px",
//       letterSpacing: "0px",
//       color: "#000000"

//     },
//     footer: {
//       textAlign: "center",
//       padding: "15px",
//       background: "#6B133F",
//       color: "#fff",
//       fontSize: "14px",
//     },
//     styleHtwo: {
//       fontFamily: "Poppins",
//       fontWeight: 800, // React expects numeric value for weight
//       fontStyle: "normal", // 'ExtraBold' is not a valid value; use fontWeight for boldness
//       fontSize: "35px",
//       lineHeight: "100%",
//       letterSpacing: "0px",
//       color: "#000000",
//       textAlign: "center",
//     },
//     styletitle: {
//       fontFamily: "Barlow",
//       fontWeight: 600, // 'SemiBold' should be set using numeric weight
//       fontStyle: "normal", // 'SemiBold' is not valid for fontStyle
//       fontSize: "22px",
//       lineHeight: "100%",
//       letterSpacing: "0px",
//       color: "#6B133F",
//       textAlign: "center",
//     }
//   };


  
//   return (
//     <div className="employee-app-container">
   
//       <div style={styles.main}>
//         <div style={styles.wrapper}>
//           {/* Header */}

//           {/* Page Header */}
//           <div style={styles.contentHeader}>
//             <h2 style={{
//               fontFamily: "Barlow",
//               fontWeight: 600,
//               fontSize: "32px",
//               lineHeight: "100%",
//               letterSpacing: "0px",
//               color: "#464255"
//             }}>Property</h2>
//             <div style={styles.filter}>
//               <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon%20(1).svg" />
//               <div>
//                 <span style={{
//                   fontFamily: "Barlow",
//                   fontWeight: 500,
//                   fontSize: "18px",
//                   lineHeight: "100%",
//                   letterSpacing: "0px",
//                   color: "#3E4954"
//                 }}>Filter Period</span>
//                 <p style={{
//                   fontFamily: "Barlow",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   lineHeight: "18px",
//                   letterSpacing: "0px",
//                   color: "#3E4954"
//                 }}> 17 April 2025 - 21 Jul 2025</p>
//               </div>
//               <div style={{ color: "#B9BBBD", width: "19px", height: "10px" }}>
//                 ⌄
//               </div>
//             </div>
//           </div>

//           {/* Status Cards */}
//           <div style={styles.statusCards}>
//             <div style={styles.statusCard}>
//               <div style={styles.cardIcon}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg" alt="Property" style={{ width: "100%" }} />
//               </div>
//               <div style={styles.cardContent}>
//                 <h2 style={styles.styleHtwo}>100</h2>
//                 <p style={{...styles.styletitle,color:"#008814"}}>Approve</p>
//               </div>
//             </div>

//             <div style={styles.statusCard}>
//               <div style={styles.cardIcon}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order.svg" alt="Water" style={{ width: "100%" }} />
//               </div>
//               <div style={{...styles.cardContent}}>
//                 <h2 style={styles.styleHtwo}>50</h2>
//                 <p style={{...styles.styletitle,color:"#DBA800"}}>Pending</p>
//               </div>
//             </div>

//             <div style={styles.statusCard}>
//               <div style={styles.cardIcon}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Rental" style={{ width: "100%" }} />
//               </div>
//               <div style={styles.cardContent}>
//                 <h2 style={styles.styleHtwo}>30</h2>
//                 <p style={{...styles.styletitle,color:"#F03232"}}>Rejected</p>
//               </div>
//             </div>
//              <div style={styles.statusCard}>
//               <div style={styles.cardIcon}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg" alt="Rental" style={{ width: "100%" }} />
//               </div>
//               <div style={styles.cardContent}>
//                 <h2 style={styles.styleHtwo}>30</h2>
//                 <p style={{...styles.styletitle,color:"#0056B3"}}>Send Back</p>
//               </div>
//             </div>
//           </div>

         
//           {/* Favorites */}
//           <div style={styles.favoriteCard}>
//             {/* <h3 style={{
//               color: "#464255",
//               fontFamily: "Barlow",
//               fontWeight: 600,
//               fontSize: "32px",
//               lineHeight: "100%",
//               letterSpacing: "0px",
//               display: "flex",
//               alignItems: "center",
//             }}> Favorites{" "} <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon%20Button.svg" /></h3> */}
//             <div style={styles.actionCards}>
//               <div style={styles.actionCard}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg" alt="Water" style={{ margin: "auto" }} />
//                 <p><a href="/digit-ui/employee/pt/new-application">New Property Applictaion</a></p>
//               </div>
//               <div style={styles.actionCard}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg" alt="Water" style={{ margin: "auto" }} />

//                 <p><a href="/digit-ui/employee/pt/search">Cash Desk</a></p>
//               </div>
//               <div style={styles.actionCard}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg" alt="Water" style={{ margin: "auto" }} />

//                 <p><a href="/digit-ui/employee/pt/application-search">Track Application</a></p>
//               </div>
//               <div style={styles.actionCard}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
//                 <p><a href="/digit-ui/employee/pt/inbox">Duplicate Receipt</a></p>
//               </div>
//                <div style={styles.actionCard}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
//                 <p><a href="/digit-ui/employee/pt/inbox">Delete Receipt</a></p>
//               </div>
//                <div style={styles.actionCard}>
//                 <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
//                 <p><a href="/digit-ui/employee/pt/inbox">No dues apply</a></p>
//               </div>
//             </div>
//           </div>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default PropertyLandingPage;

import React, { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f2f9",
      fontFamily: "'Inter', sans-serif",
      fontSize: "15px",
      fontWeight: 400,
    },
    sidebar: {
      width: "270px",
      backgroundColor: "white",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      transition: "width 0.3s",
      overflowX: "hidden",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      zIndex: 1000,
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      padding: "10px 8px",
      minHeight: "70px",
    },
    logo: {
      maxWidth: "55px",
    },
    logoText: {
      marginLeft: "10px",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    //   marginLeft: "270px",
    },
    header: {
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      backgroundColor: "#6B133F",
      color: "white",
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
    },
    toggleBtn: {
      fontSize: "20px",
      cursor: "pointer",
      position: "absolute",
    },
    headerNav: {
      display: "flex",
      gap: "20px",
      marginLeft: "50px",
    },
    headerNavLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    headerRightNav: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    headerActions: {
      display: "flex",
      gap: "20px",
    },
    headerActionIcon: {
      color: "#fff",
      fontSize: "18px",
      background: "rgba(255,255,255,0.15)",
      padding: "8px",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginLeft: "20px",
    },
    avatar: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      overflow: "hidden",
      border: "2px solid white",
    },
    subHeader: {
      display: "flex",
      backgroundColor: "white",
      padding: "0 20px",
      borderBottom: "1px solid #eee",
    },
    tab: {
      padding: "15px 20px",
      color: "#333",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderBottom: "3px solid transparent",
    },
    tabActive: {
      borderBottomColor: "#6B133F",
      color: "#6B133F",
    },
    contentArea: {
      padding: isMobile ? "10px" : "20px",
    },
    contentHeader: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      marginBottom: "20px",
      gap: isMobile ? "15px" : "0",
    },
    filter: {
      backgroundColor: "white",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: isMobile ? "100%" : "270px",
      maxWidth: "270px",
    },
    statusCards: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: "20px",
      marginBottom: "20px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: isMobile ? "15px" : "20px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      textAlign: isMobile ? "center" : "left",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    cardContent: {
      marginLeft: isMobile ? "0" : "20px",
      marginTop: isMobile ? "10px" : "0",
    },
    cardContentTitle: {
      fontSize: "25px",
      fontWeight: 800,
      marginBottom: "6px",
    },
    approved: { color: "#4caf50" },
    pending: { color: "#ff9800" },
    rejected: { color: "#f44336" },
    sendback: { color: "#2196f3" },
    actionCards: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
      gap: "20px",
      marginBottom: "20px",
    },
    actionCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: isMobile ? "15px" : "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
      minHeight: isMobile ? "120px" : "auto",
    },
    actionIcon: {
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      marginBottom: "10px",
      color: "#333",
    },
    footer: {
      backgroundColor: "#6B133F",
      color: "white",
      padding: "15px 20px",
      textAlign: "center",
      marginTop: "40px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}


      {/* Main Content */}
      <div style={styles.mainContent}>
        <div>
          {/* Header */}
          {/* <div style={styles.header}>
            <div style={styles.toggleBtn}>
              <i className="fas fa-bars" />
            </div>

            <div style={styles.headerNav}>
              <a style={styles.headerNavLink}><i className="fas fa-rupee-sign" /> Payment</a>
              <a style={styles.headerNavLink}><i className="fas fa-history" /> My Transactions</a>
              <a style={styles.headerNavLink}><i className="fas fa-download" /> Download Receipt</a>
            </div>

            <div style={styles.headerRightNav}>
              <div style={styles.headerActions}>
                {["bell", "comment", "gift", "cog"].map((icon) => (
                  <a style={styles.headerActionIcon} key={icon}>
                    <i className={`fas fa-${icon}`} />
                  </a>
                ))}
              </div>
              <div style={styles.userProfile}>
                <span>Hello, Samantha</span>
                <div style={styles.avatar}>
                  <img src="https://i.imgur.com/vT8WQEA.jpg" alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div> */}

          {/* Sub-header */}
          {/* <div style={styles.subHeader}>
            <a style={styles.tab}><i className="fas fa-heart" /> Marriage Certificate</a>
            <a style={styles.tab}><i className="fas fa-certificate" /> Birth / Death Certificate</a>
            <a style={{ ...styles.tab, ...styles.tabActive }}><i className="fas fa-plus" /></a>
          </div> */}

          {/* Content Area */}
          <div style={styles.contentArea}>
            <div style={styles.contentHeader}>
              <h2>Property</h2>
              <div style={styles.filter}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <i className="far fa-calendar" style={{ color: "#6B133F", fontSize: "24px" }} />
                  <div>
                    <span style={{ fontSize: "14px", color: "#333" }}>Filter Period</span>
                    <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>17 April 2025 - 21 Jul 2025</p>
                  </div>
                </div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>

            {/* Status Cards */}
            <div style={styles.statusCards}>
              {[
                { label: "Approved", value: 100, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg", style: styles.approved },
                { label: "Pending", value: 50, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order.svg", style: styles.pending },
                { label: "Rejected", value: 20, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg", style: styles.rejected },
                { label: "Send Back", value: 30, icon: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg", style: styles.sendback },
              ].map((card) => (
                <div style={styles.card} key={card.label}>
                  <div>
                    <img src={card.icon} alt={card.label} style={{ width: "70px" }} />
                  </div>
                  <div style={styles.cardContent}>
                    <h2 style={styles.cardContentTitle}>{card.value}</h2>
                    <p style={card.style}>{card.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Cards */}
          <div style={styles.actionCards}>
  {[
    {
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg",
      text: "New Property Application",
      link: "/digit-ui/employee/pt/new-application",
    },
    {
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg",
      text: "Cash Desk",
      link: "/digit-ui/employee/pt/search",
    },
    {
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg",
      text: "Track Application",
      link: "/digit-ui/employee/pt/application-search",
    },
    {
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
      text: "Duplicate Receipt",
      link: "/digit-ui/employee/pt/inbox",
    },
    {
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
      text: "Delete Receipt",
      link: "/digit-ui/employee/pt/inbox",
    },
    {
      image: "https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg",
      text: "No dues apply",
      link: "/digit-ui/employee/pt/inbox",
    },
  ].map((card) => (
    <div style={styles.actionCard} key={card.text}>
      <img src={card.image} alt={card.text} style={{ margin: "auto" }} />
      <p>
        <a href={card.link}>{card.text}</a>
      </p>
    </div>
  ))}
</div>

          </div>
        </div>

    
      </div>
    </div>
  );
};

export default DashboardLayout;