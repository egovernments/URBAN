import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Toast } from "@egovernments/digit-ui-react-components";

const SearchProperty = ({ onSelect }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [formValue, setFormValue] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [errorShown, setErrorShown] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isMobile = window.Digit.Utils.browser.isMobile();

  const { data: propertyData, isLoading: propertyDataLoading, error } = Digit.Hooks.pt.usePropertySearchWithDue({
    tenantId: tenantId,
    filters: {
      ...(formValue.propertyIds ? { propertyIds: formValue.propertyIds } : {}),
      ...(formValue.mobileNumber ? { mobileNumber: formValue.mobileNumber } : {}),
    },
    auth: true,
    configs: {
      enabled: !!formValue.propertyIds || !!formValue.mobileNumber,
      retry: false,
      retryOnMount: false,
      staleTime: Infinity,
    },
  });

    // ✅ Update layout on resize
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 600);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  useEffect(() => {
    if (
      propertyData?.Properties?.length > 50 && // Arbitrary max result, adjust if needed
      !errorShown
    ) {
      setShowToast({ error: true, warning: true, label: "ERR_PLEASE_REFINED_UR_SEARCH" });
      setErrorShown(true);
    }
  }, [propertyData]);

  const onPropertySearch = () => {
    const { propertyIds, mobileNumber } = formValue;

    if (!propertyIds && !mobileNumber) {
      setShowToast({ warning: true, label: "ERR_PT_FILL_VALID_FIELDS" });
      return;
    }

    if (mobileNumber && !/^[6-9]\d{9}$/.test(mobileNumber)) {
      setShowToast({ warning: true, label: "ERR_PT_INVALID_MOBILE" });
      return;
    }

    if (propertyIds && !/^[A-Za-z0-9-/]+$/.test(propertyIds)) {
      setShowToast({ warning: true, label: "ERR_PT_INVALID_PID" });
      return;
    }

    const filters = {};
    if (propertyIds) filters.propertyIds = propertyIds;
    if (mobileNumber) filters.mobileNumber = mobileNumber;

    history.push(
      `/digit-ui/citizen/pt/property/search-results?${Object.keys(filters)
        .map((key) => `${key}=${filters[key]}`)
        .join("&")}&city=${tenantId}`
    );
  };

  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "white",
        maxWidth: "960px",
        padding: "10px",
      }}
    >
      <div style={containerStyle}>
        <h4 style={headingStyle}>{t("Search Criteria")}</h4>
        <div style={rowStyle}>
          <div style={inputGroupWrapper}>
            <div>
              <label style={labelStyle}>
                {t("Property ID")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("Enter Property ID")}
                style={inputStyle}
                value={formValue?.propertyIds || ""}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    propertyIds: e.target.value,
                    mobileNumber: "",
                  }))
                }
              />
            </div>

            <div style={orStyle}>OR</div>

            <div>
              <label style={labelStyle}>
                {t("Mobile Number")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("Mobile Number")}
                style={inputStyle}
                value={formValue?.mobileNumber || ""}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                    propertyIds: "",
                  }))
                }
              />
            </div>
          </div>

          <button onClick={onPropertySearch} style={buttonStyle}>
            {t("Search")}
          </button>
        </div>
      </div>

      {showToast && (
        <Toast
          error={showToast.error}
          isDleteBtn={true}
          warning={showToast.warning}
          label={t(showToast.label)}
          onClose={() => {
            setShowToast(null);
            setErrorShown(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchProperty;

// -------------------------------------------
// STYLES
// -------------------------------------------
const containerStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px 30px",
  maxWidth: "1000px",
  margin: "20px auto",
  fontFamily: "sans-serif",
};

const headingStyle = {
  marginBottom: "20px",
  fontFamily: "Barlow",
  fontWeight: 600,
  fontStyle: "normal", // "SemiBold" is not a valid value for font-style; use fontWeight
  fontSize: "20px",
  lineHeight: "23px",
  letterSpacing: "0px",
  // textAlign: "center",
  color:"#000000"
};

const rowStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "10px",
  flexWrap: "wrap",
};

const inputGroupWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap", 
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontFamily: "Noto Sans",
  fontWeight: 400,
  fontStyle: "normal", // "Regular" is not a valid fontStyle; use "normal"
  fontSize: "16px",
  lineHeight: "100%", // or "1" for equivalent
  letterSpacing: "0%",
  color: "#000000"

};

const inputStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #e1dbe5",
  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  backgroundColor: "#f4e9f0",
  outline: "none",
  width: "240px",
  maxWidth: "100%",
};

const orStyle = {
  fontWeight: "bold",
  color: "#555",
};

const buttonStyle = {
  backgroundColor: "#6B133F",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 30px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px", 
  width: "fit-content",
};

// ✅ Inject responsive overrides via CSS
const responsiveStyle = `
  @media (max-width: 600px) {
    .search-container {
      padding: 16px;
    }
    .search-row {
      flex-direction: column;
      align-items: stretch;
    }
    .search-inputs {
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    .search-inputs input {
      width: 100% !important;
    }
    .search-btn {
      width: 100%;
      text-align: center;
    }
  }
`;












// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory, Link } from "react-router-dom";
// import { Toast } from "@egovernments/digit-ui-react-components";

// const SearchProperty = ({ onSelect }) => {
//   const { t } = useTranslation();
//   const history = useHistory();

//   const [formValue, setFormValue] = useState({});
//   const [showToast, setShowToast] = useState(null);
//   const [errorShown, setErrorShown] = useState(false);
//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   const isMobile = window.Digit.Utils.browser.isMobile();

//   const { data: propertyData, isLoading: propertyDataLoading, error } = Digit.Hooks.pt.usePropertySearchWithDue({
//     tenantId: tenantId,
//     filters: {
//       ...(formValue.propertyIds ? { propertyIds: formValue.propertyIds } : {}),
//       ...(formValue.mobileNumber ? { mobileNumber: formValue.mobileNumber } : {}),
//     },
//     auth: true,
//     configs: {
//       enabled: !!formValue.propertyIds || !!formValue.mobileNumber,
//       retry: false,
//       retryOnMount: false,
//       staleTime: Infinity,
//     },
//   });

//   useEffect(() => {
//     if (
//       propertyData?.Properties?.length > 50 && // Arbitrary max result, adjust if needed
//       !errorShown
//     ) {
//       setShowToast({ error: true, warning: true, label: "ERR_PLEASE_REFINED_UR_SEARCH" });
//       setErrorShown(true);
//     }
//   }, [propertyData]);

//   const onPropertySearch = () => {
//     const { propertyIds, mobileNumber } = formValue;

//     if (!propertyIds && !mobileNumber) {
//       setShowToast({ warning: true, label: "ERR_PT_FILL_VALID_FIELDS" });
//       return;
//     }

//     if (mobileNumber && !/^[6-9]\d{9}$/.test(mobileNumber)) {
//       setShowToast({ warning: true, label: "ERR_PT_INVALID_MOBILE" });
//       return;
//     }

//     if (propertyIds && !/^[A-Za-z0-9-/]+$/.test(propertyIds)) {
//       setShowToast({ warning: true, label: "ERR_PT_INVALID_PID" });
//       return;
//     }

//     const filters = {};
//     if (propertyIds) filters.propertyIds = propertyIds;
//     if (mobileNumber) filters.mobileNumber = mobileNumber;

//     history.push(
//       `/digit-ui/citizen/pt/property/search-results?${Object.keys(filters)
//         .map((key) => `${key}=${filters[key]}`)
//         .join("&")}&city=${tenantId}`
//     );
//   };

//   return (
//     <div style={{ marginTop: "16px", marginBottom: "16px", backgroundColor: "white", maxWidth: "960px" }}>
//       <div style={containerStyle}>
//         <h4 style={headingStyle}>{t("Search Criteria")}</h4>
//         <div style={rowStyle}>
//           <div style={inputGroupWrapper}>
//             <div>
//               <label style={labelStyle}>
//                 {t("Property ID")} <span style={{ color: "red" }}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder={t("Enter Property ID")}
//                 style={inputStyle}
//                 value={formValue?.propertyIds || ""}
//                 onChange={(e) =>
//                   setFormValue((prev) => ({
//                     ...prev,
//                     propertyIds: e.target.value,
//                     mobileNumber: "",
//                   }))
//                 }
//               />
//             </div>

//             <div style={orStyle}>OR</div>

//             <div>
//               <label style={labelStyle}>
//                 {t("Mobile Number")} <span style={{ color: "red" }}>*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder={t("Mobile Number")}
//                 value={formValue?.mobileNumber || ""}
//                 onChange={(e) =>
//                   setFormValue((prev) => ({
//                     ...prev,
//                     mobileNumber: e.target.value,
//                     propertyIds: "",
//                   }))
//                 }
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           <button onClick={onPropertySearch} style={buttonStyle}>
//             {t("Search")}
//           </button>
//         </div>
//       </div>

//       {/* <span className="link" style={{ display: "flex", justifyContent: isMobile ? "center" : "left", paddingBottom: "16px", paddingLeft: "24px", marginTop: "-24px" }}>
//         <Link to={"/digit-ui/citizen/pt/property/new-application"}>{t("CPT_REG_NEW_PROPERTY")}</Link>
//       </span> */}

//       {showToast && (
//         <Toast
//           error={showToast.error}
//           isDleteBtn={true}
//           warning={showToast.warning}
//           label={t(showToast.label)}
//           onClose={() => {
//             setShowToast(null);
//             setErrorShown(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchProperty;

// // -------------------------------------------
// // STYLES
// // -------------------------------------------
// const containerStyle = {
//   background: "#FFFFFF",
//   borderRadius: "10px",
//   padding: "20px 30px",
//   maxWidth: "1000px",
//   margin: "20px auto",
//   fontFamily: "sans-serif",
// };

// const headingStyle = {
//   marginBottom: "20px",
//   fontFamily: "Barlow",
//   fontWeight: 600,
//   fontStyle: "normal", // "SemiBold" is not a valid value for font-style; use fontWeight
//   fontSize: "20px",
//   lineHeight: "23px",
//   letterSpacing: "0px",
//   // textAlign: "center",
//   color:"#000000"
// };

// const rowStyle = {
//   display: "flex",
//   alignItems: "flex-end",
//   justifyContent: "space-between",
//   gap: "10px",
//   flexWrap: "wrap",
// };

// const inputGroupWrapper = {
//   display: "flex",
//   alignItems: "center",
//   gap: "20px",
// };

// const labelStyle = {
//   display: "block",
//   marginBottom: "5px",
//   fontFamily: "Noto Sans",
//   fontWeight: 400,
//   fontStyle: "normal", // "Regular" is not a valid fontStyle; use "normal"
//   fontSize: "16px",
//   lineHeight: "100%", // or "1" for equivalent
//   letterSpacing: "0%",
//   color: "#000000"

// };

// const inputStyle = {
//   padding: "10px 14px",
//   borderRadius: "8px",
//   border: "1px solid #e1dbe5",
//   boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
//   backgroundColor: "#f4e9f0",
//   outline: "none",
//   width: "240px",
// };

// const orStyle = {
//   fontWeight: "bold",
//   color: "#555",
// };

// const buttonStyle = {
//   backgroundColor: "#6B133F",
//   color: "#fff",
//   border: "none",
//   borderRadius: "8px",
//   padding: "10px 30px",
//   fontWeight: "bold",
//   cursor: "pointer",
// };