// import React, { useMemo } from "react";
// import { PageBasedInput, Loader, RadioButtons, CardHeader } from "@egovernments/digit-ui-react-components";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";

// const LanguageSelection = () => {
//   const { t } = useTranslation();
//   const history = useHistory();

//   const { data: { languages, stateInfo } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
//   const selectedLanguage = Digit.StoreData.getCurrentLanguage();

//   const texts = useMemo(
//     () => ({
//       header: t("CS_COMMON_CHOOSE_LANGUAGE"),
//       submitBarLabel: t("CORE_COMMON_CONTINUE"),
//     }),
//     [t]
//   );

//   const RadioButtonProps = useMemo(
//     () => ({
//       options: languages,
//       optionsKey: "label",
//       additionalWrapperClass: "reverse-radio-selection-wrapper",
//       onSelect: (language) => Digit.LocalizationService.changeLanguage(language.value, stateInfo.code),
//       selectedOption: languages?.filter((i) => i.value === selectedLanguage)[0],
//     }),
//     [selectedLanguage, languages]
//   );

//   function onSubmit() {
//     history.push(`/digit-ui/citizen/select-location`);
//   }

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div className="selection-card-wrapper">
//       <PageBasedInput texts={texts} onSubmit={onSubmit}>
//         <CardHeader>{t("CS_COMMON_CHOOSE_LANGUAGE")}</CardHeader>
//         <RadioButtons {...RadioButtonProps} />
//       </PageBasedInput>
//     </div>
//   );
// };

// export default LanguageSelection;


import React from "react";

const LanguageSelection = () => {
 
  return (
   <div style={styles.container}>
      <div style={styles.header}>
        Welcome to e-Indore Municipal Corporation (e-IMC)
      </div>

      <div style={styles.banner}>
        <img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Rectangle%2010.svg"
          alt="Rajwada"
          style={styles.image}
        />
        <div style={styles.bannerText}>
          <h2 style={styles.yourUrban}>Your Urban Services<br />One Login Away!</h2>
          <div style={styles.loginButtons}>
            <button style={styles.loginButton} > <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Vector.svg" />{" "} Citizen Login</button>
            <button style={styles.loginButton} onClick={() => window.location.href = "/digit-ui/employee/user/login"}><img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Vector.svg" />{" "} IMC Login</button>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <img
            src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/currency-coin-rupee.svg"
            style={{ margin: "auto" }} />
          Quick Payments</div>
        <div style={styles.verticalDivider}></div>
        <div style={styles.card}>  <img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Vector%20(1).svg"
        /> Property Tax</div>
        <div style={styles.verticalDivider}></div>
        <div style={styles.card}> <img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/water_voc.svg"
        /> Water Tax</div>
        <div style={styles.verticalDivider}></div>
        <div style={styles.card}><img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313953.svg"
        /> Shop Rent</div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <img
            src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/user-profile-star.svg"
            style={{ margin: "auto" }} />
          Other Services</div>
        <div style={styles.verticalDivider}></div>
        <div style={styles.card}><img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201000006503.svg"
        /> Marriage Registration</div>
        <div style={styles.verticalDivider}></div>
        <div style={styles.card}><img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/delivery.svg"
        /> Funeral Van</div>
        <div style={styles.verticalDivider}></div>
        <div style={styles.card}><img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/08dbb3cd-e05f-4b0e-870c-60f8b7bacc29.svg" /> Road Cutting</div>
      </div>


      <div style={{ ...styles.footer, display: "flex", gap: "20px" }}>
        {/* Social Media Column */}
        <div style={{ flex: 1 }}>
          <div style={styles.sectionTitle}>Social Media</div>
          <div style={styles.column}>
            {/* ... Social Media Content ... */}
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313967.svg"
                  alt="News Thumbnail" />
                <p>
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span><br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313964.svg"
                  alt="News Thumbnail" />
                <p style={{ marginTop: "20px" }}>
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span><br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>
            </div>
            <div style={styles.viewMore}>View More +</div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div style={{
          width: "2px",
          backgroundColor: "#6B133F",
          // height: "100%",
          margin: "0 10px"
        }}></div>

        {/* Latest News Column */}
        <div style={{ flex: 1 }}>
          <div style={styles.sectionTitle}>Latest News</div>
          <div style={styles.column}>
            <div style={styles.newsItem}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313966.svg"
                  alt="News Thumbnail" />
                <p>
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span><br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>
              <p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={styles.figtreeBoldTextStyle}>Today</div>
                  <div style={styles.figtreeBoldTextStyle}> • <a href="#">Read More</a></div>
                </div>
              </p>
            </div>
            <div style={styles.newsItem}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313965.svg"
                  alt="News Thumbnail" />
                <p style={{ marginTop: "20px" }}>
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span><br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>
              <p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={styles.figtreeBoldTextStyle}>18-07-2024</div>
                  <div style={styles.figtreeBoldTextStyle}>• <a href="#">Read More</a></div>
                </div>
              </p>
            </div>
            <div style={styles.viewMore}>View More +</div>
          </div>
        </div>
      </div>
   
    </div>
  );
};
 const styles = {
    container: {
      fontFamily: "sans-serif",
      backgroundColor: "#f5f1f7",
      width: "100%"
    },
    header: {
      backgroundColor: "#6B133F",
      color: "white",
      padding: "10px",
      textAlign: "center",
      fontWeight: "bold",
      marginTop: "16px",
      fontFamily: "Inter",
      fontSize: "24px",

    },
    footerStyle: {
      backgroundColor: "#6B133F",
      color: "white",
      padding: "10px",
      textAlign: "center",
      fontWeight: "bold",
      marginTop: "16px",
      fontFamily: "Inter",
      fontSize: "16px",

    },
    banner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#6B133F4D",
      // padding: "20px",
      // height: "400px",
      borderRadius: "10px",
      marginTop: "6px"
    },
    bannerText: {
      flex: 1,
      textAlign: "right",
      paddingRight: "30px",
    },
    yourUrban: {
      fontFamily: "Inter",
      fontWeight: 700,
      fontStyle: "italic",
      fontSize: "32px",
      lineHeight: "100%",
      color: "#6B133F",
      letterSpacing: "3%"
    },
    image: {
      width: "60%",
      borderRadius: "10px",
    },
    loginButtons: {
      marginTop: "10px",

    },
    loginButton: {
      backgroundColor: "#6B133F",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontFamily: "Inter",
      fontWeight: 500,
      fontStyle: "normal", // 'Medium' is not a valid value for fontStyle
      fontSize: "20px",
      lineHeight: "100%",
      color: "#FFFFFF",
      letterSpacing: "3%",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
    },
    section: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      padding: "20px",
      backgroundColor: "#6B133F4D",
      borderRadius: "10px",
      marginTop: "10px",
      alignItems: "center",
    },
    sectionTitle: {
      width: "100%",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#6B133F",
      fontFamily: "Inter",        // 'Bold' is not a valid fontStyle
      fontSize: "24px",
      lineHeight: "100%",
      letterSpacing: "0px",       // % not valid here
      verticalAlign: "middle",
      flex: "1 1 57px",
      display: "block",
      alignItems: "center",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
      margin: "10px",
      flex: "1 1 200px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      cursor: "pointer",
      fontFamily: "Inter",
      fontWeight: 700,    // 'Bold' is not valid, use 'normal' or 'italic'
      fontSize: "24px",
      lineHeight: "100%",
      letterSpacing: "0px",      // '0%' is not valid for letter-spacing
      verticalAlign: "middle",
      color: "#6B133F",
      height: "100px",
      display: "flex",
      alignItems: "center",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      backgroundColor: "#6B133F4D",
      marginTop: "10px",
      borderRadius: "10px",
    },
    column: {
      flex: "1",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "10px",
      marginTop: "10px",
      marginBottom: "10px",
      overflowY: "auto",
      maxHeight: "500px",
    },
    newsItem: {
      borderBottom: "1px solid #ccc",
      paddingBottom: "10px",
      marginBottom: "10px",
    },
    viewMore: {
      textAlign: "right",
      marginTop: "200px",
      fontWeight: "bold",
      color: "#6B133F",
      cursor: "pointer",
    },
    verticalDivider: {
      width: "3px",
      height: "115px",
      backgroundColor: "#6B133F",
    },
    headDropStyle: {
      fontFamily: "Inter",
      fontWeight: 700,
      fontStyle: "normal", // use "italic" if needed
      fontSize: "20px",
      lineHeight: "100%",   // equivalent to line-height: 1
      color: "#6B133F",
      letterSpacing: "0%",
      verticalAlign: "middle",
    },
    parraStyle: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontStyle: "normal", // "Regular" = normal
      fontSize: "20px",
      lineHeight: "100%",
      letterSpacing: "0%",
      verticalAlign: "middle",
      color: "#6B133F",
    },
    figtreeBoldTextStyle: {
      fontFamily: "Figtree",
      fontWeight: 700,
      fontStyle: "normal", // "Bold" is controlled by fontWeight
      fontSize: "14px",
      lineHeight: "100%",
      letterSpacing: "0%",
      color: "#6B133F",
    }
  };
export default LanguageSelection;

