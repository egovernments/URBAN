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

 const PropertyLandingPage = () => {
    const styles = {
    main: {
      marginLeft: "auto",
      background: "#f3f2f7",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",

      // width: "80%"
    },
    wrapper: {
      padding: "20px 30px",
      flex: 1,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      padding: "15px 20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    toggleBtn: {
      fontSize: "20px",
      cursor: "pointer",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    avatar: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      overflow: "hidden",
    },
    avatarImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    contentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    filter: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#fff",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    statusCards: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
    },
    statusCard: {
      background: "#fff",
      borderRadius: "10px",
      padding: "15px",
      flex: 1,
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    cardIcon: {
      width: "50px",
      height: "50px",
      marginRight: "15px",
      display: "flex",
    },
    cardContent: {
      flex: 1,
    },
    graphArea: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
    },
    chartContainer: {
      flex: 1,
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    bar: {
      height: "16px",
      background: "#6B133F",
      margin: "10px 0",
      borderRadius: "6px",
    },
    infoContainer: {
      margin: "10px 0",
    },
    infoPill: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 12px",
      background: "#f1f1f1",
      borderRadius: "6px",
      marginBottom: "8px",
      fontSize: "14px",
    },
    favoriteCard: {
      // background: "#fff",
      // padding: "20px",
      borderRadius: "10px",
      // boxShadow: "0 0 6px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      marginTop: "20px",
    },
    actionCards: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "15px",
    },
    actionCard: {
      textAlign: "center",
      padding: "15px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",

      fontFamily: "Barlow",
      fontWeight: 600,
      fontSize: "16px",
      fontStyle: "normal", // 'SemiBold' is not valid for fontStyle
      lineHeight: "23px",
      letterSpacing: "0px",
      color: "#000000"

    },
    footer: {
      textAlign: "center",
      padding: "15px",
      background: "#6B133F",
      color: "#fff",
      fontSize: "14px",
    },
    styleHtwo: {
      fontFamily: "Poppins",
      fontWeight: 800, // React expects numeric value for weight
      fontStyle: "normal", // 'ExtraBold' is not a valid value; use fontWeight for boldness
      fontSize: "35px",
      lineHeight: "100%",
      letterSpacing: "0px",
      color: "#000000",
      textAlign: "center",
    },
    styletitle: {
      fontFamily: "Barlow",
      fontWeight: 600, // 'SemiBold' should be set using numeric weight
      fontStyle: "normal", // 'SemiBold' is not valid for fontStyle
      fontSize: "22px",
      lineHeight: "100%",
      letterSpacing: "0px",
      color: "#6B133F",
      textAlign: "center",
    }
  };


  
  return (
    <div className="employee-app-container">
   
      <div style={styles.main}>
        <div style={styles.wrapper}>
          {/* Header */}

          {/* Page Header */}
          <div style={styles.contentHeader}>
            <h2 style={{
              fontFamily: "Barlow",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0px",
              color: "#464255"
            }}>Property</h2>
            <div style={styles.filter}>
              <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon%20(1).svg" />
              <div>
                <span style={{
                  fontFamily: "Barlow",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                  color: "#3E4954"
                }}>Filter Period</span>
                <p style={{
                  fontFamily: "Barlow",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  letterSpacing: "0px",
                  color: "#3E4954"
                }}> 17 April 2025 - 21 Jul 2025</p>
              </div>
              <div style={{ color: "#B9BBBD", width: "19px", height: "10px" }}>
                ⌄
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div style={styles.statusCards}>
            <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Group%20188.svg" alt="Property" style={{ width: "100%" }} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.styleHtwo}>100</h2>
                <p style={{...styles.styletitle,color:"#008814"}}>Approve</p>
              </div>
            </div>

            <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order.svg" alt="Water" style={{ width: "100%" }} />
              </div>
              <div style={{...styles.cardContent}}>
                <h2 style={styles.styleHtwo}>50</h2>
                <p style={{...styles.styletitle,color:"#DBA800"}}>Pending</p>
              </div>
            </div>

            <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Rental" style={{ width: "100%" }} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.styleHtwo}>30</h2>
                <p style={{...styles.styletitle,color:"#F03232"}}>Rejected</p>
              </div>
            </div>
             <div style={styles.statusCard}>
              <div style={styles.cardIcon}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon_Order%20(1).svg" alt="Rental" style={{ width: "100%" }} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.styleHtwo}>30</h2>
                <p style={{...styles.styletitle,color:"#0056B3"}}>Send Back</p>
              </div>
            </div>
          </div>

         
          {/* Favorites */}
          <div style={styles.favoriteCard}>
            {/* <h3 style={{
              color: "#464255",
              fontFamily: "Barlow",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0px",
              display: "flex",
              alignItems: "center",
            }}> Favorites{" "} <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Icon%20Button.svg" /></h3> */}
            <div style={styles.actionCards}>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315418.svg" alt="Water" style={{ margin: "auto" }} />
                <p><a href="/digit-ui/employee/pt/new-application">New Property Applictaion</a></p>
              </div>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417.svg" alt="Water" style={{ margin: "auto" }} />

                <p><a href="/digit-ui/employee/pt/search">Cash Desk</a></p>
              </div>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315417%20(1).svg" alt="Water" style={{ margin: "auto" }} />

                <p><a href="/digit-ui/employee/pt/application-search">Track Application</a></p>
              </div>
              <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
                <p><a href="/digit-ui/employee/pt/inbox">Duplicate Receipt</a></p>
              </div>
               <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
                <p><a href="/digit-ui/employee/pt/inbox">Delete Receipt</a></p>
              </div>
               <div style={styles.actionCard}>
                <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321315419.svg" alt="Water" style={{ margin: "auto" }} />
                <p><a href="/digit-ui/employee/pt/inbox">No dues apply</a></p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PropertyLandingPage;

