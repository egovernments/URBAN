// import React, { useState, useEffect } from "react";
// import { CardText, FormStep, CitizenConsentForm, Loader, CheckBox } from "@egovernments/digit-ui-react-components";
// import { Link } from "react-router-dom";

// const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config, canSubmit }) => {

//   const [isCheckBox, setIsCheckBox] = useState(false);
//   const [isCCFEnabled, setisCCFEnabled] = useState(false);
//   const [mdmsConfig, setMdmsConfig] = useState("");

//   const { isLoading, data } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{ name: "CitizenConsentForm" }]);

//   function setTermsAndPolicyDetails(e) {
//     setIsCheckBox(e.target.checked)
//   }

//   const checkDisbaled = () => {
//     if (isCCFEnabled?.isCitizenConsentFormEnabled) {
//       return !(mobileNumber.length === 10 && canSubmit && isCheckBox)
//     } else {
//       return !(mobileNumber.length === 10 && canSubmit)
//     }
//   }

//   useEffect(()=> {
//     if (data?.["common-masters"]?.CitizenConsentForm?.[0]?.isCitizenConsentFormEnabled) {
//       setisCCFEnabled(data?.["common-masters"]?.CitizenConsentForm?.[0])
//     }
//   }, [data]);

//   const onLinkClick = (e) => {
//     setMdmsConfig(e.target.id)
// }

//   const checkLabels = () => {
//     return <span>
//       {isCCFEnabled?.checkBoxLabels?.map((data, index) => {
//         return <span>
//           {/* {index == 0 && "CCF"} */}
//           {data?.linkPrefix && <span>{t(`${data?.linkPrefix}_`)}</span>}
//           {data?.link && <span id={data?.linkId} onClick={(e) => { onLinkClick(e) }} style={{ color: "#F47738", cursor: "pointer" }}>{t(`${data?.link}_`)}</span>}
//           {data?.linkPostfix && <span>{t(`${data?.linkPostfix}_`)}</span>}
//           {(index == isCCFEnabled?.checkBoxLabels?.length - 1) && t("LABEL")}
//         </span>
//       })}
//     </span>
//   }



//   if (isLoading) return <Loader />

//   return (
//     <FormStep
//       isDisabled={checkDisbaled()}
//       onSelect={onSelect}
//       config={config}
//       t={t}
//       componentInFront="+91"
//       onChange={onMobileChange}
//       value={mobileNumber}
//     >
//       {isCCFEnabled?.isCitizenConsentFormEnabled && <div>
//         <CheckBox
//           className="form-field"
//           label={checkLabels()}
//           value={isCheckBox}
//           checked={isCheckBox}
//           style={{ marginTop: "5px", marginLeft: "55px" }}
//           styles={{marginBottom: "30px"}}
//           onChange={setTermsAndPolicyDetails}
//         />

//         <CitizenConsentForm
//           styles={{}}
//           t={t}
//           isCheckBoxChecked={setTermsAndPolicyDetails}
//           labels={isCCFEnabled?.checkBoxLabels}
//           mdmsConfig={mdmsConfig}
//           setMdmsConfig={setMdmsConfig}
//         />
//       </div>}
//     </FormStep>
//   );
// };

// export default SelectMobileNumber;

import React, { useState, useEffect } from "react";
import {
  CardText,
  FormStep,
  CitizenConsentForm,
  Loader,
  CheckBox,
  TextInput,
  SubmitBar
} from "@egovernments/digit-ui-react-components";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config, canSubmit }) => {
  const [isCheckBox, setIsCheckBox] = useState(true);
  const [isCCFEnabled, setisCCFEnabled] = useState(false);
  const [mdmsConfig, setMdmsConfig] = useState("");
  const { isLoading, data } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{ name: "CitizenConsentForm" }]);

  useEffect(() => {
    if (data?.["common-masters"]?.CitizenConsentForm?.[0]?.isCitizenConsentFormEnabled) {
      setisCCFEnabled(data?.["common-masters"]?.CitizenConsentForm?.[0]);
    }
  }, [data]);

  const setTermsAndPolicyDetails = (e) => {
    setIsCheckBox(e.target.checked);
  };

  const onLinkClick = (e) => {
    setMdmsConfig(e.target.id);
  };

  const checkDisbaled = () => {
    if (isCCFEnabled?.isCitizenConsentFormEnabled) {
      return !(mobileNumber.length === 10 && canSubmit && isCheckBox);
    } else {
      return !(mobileNumber.length === 10 && canSubmit);
    }
  };

  const checkLabels = () => {
    return (
      <span>
        {isCCFEnabled?.checkBoxLabels?.map((data, index) => (
          <span key={index}>
            {data?.linkPrefix && <span>{t(`${data?.linkPrefix}_`)}</span>}
            {data?.link && (
              <span
                id={data?.linkId}
                onClick={(e) => onLinkClick(e)}
                style={{ color: "#F47738", cursor: "pointer" }}
              >
                {t(`${data?.link}_`)}
              </span>
            )}
            {data?.linkPostfix && <span>{t(`${data?.linkPostfix}_`)}</span>}
            {index === isCCFEnabled?.checkBoxLabels?.length - 1 && t("LABEL")}
          </span>
        ))}
      </span>
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.leftSection}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
            <img
              src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%2014.svg"
              alt="IMC Logo"
              style={{ height: "70px", width: "auto" }}
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "5px" }}>
                इंदौर नगर निगम
              </div>
              <div style={{ fontSize: "16px", color: "#666" }}>
                Indore Municipal Corporation
              </div>
            </div>
          </div>
          <div style={styles.mapBox}>
            <img
              src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201807.svg"
              alt="Indore Map"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <p style={styles.version}>Version v1.1</p>
        </div>

        <div style={styles.rightSection}>
          <h3 style={styles.welcomeText}>Welcome to</h3>
          <h2 style={styles.portalTitle}>e-Indore Municipal Corporation (e-IMC)</h2>
          <p style={styles.portalSubtitle}>IMC Citizen</p>
          <FormStep
            isDisabled={checkDisbaled()}
            onSelect={onSelect}
            config={config}
            t={t}
            componentInFront="+91"
            onChange={onMobileChange}
            value={mobileNumber}
          >

          </FormStep>
        </div>
      </div>

    </div>
  );
};

export default SelectMobileNumber;

const styles = {
  container: {
    background: "linear-gradient(135deg, rgb(74, 111, 165) 0%, rgb(22, 96, 136) 50%, rgb(74, 111, 165) 100%)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    width: "80%",
    // maxWidth: "900px",
    minHeight: "500px"
  },
  leftSection: {
    flex: 1,
    padding: "30px",
    textAlign: "center",
    backgroundColor: "white"
  },
  mapBox: {
    margin: "20px 0"
  },
  rightSection: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#f8f9fa"
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  subheading: {
    fontSize: "16px",
    color: "#444"
  },
  welcomeText: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontStyle: "bold", // note: valid values are "normal" or "italic", "bold" is set via fontWeight
    fontSize: "20px",
    lineHeight: "100%", // or "1" for exact 100%
    letterSpacing: "3%",
    color: "#6B133F",
    marginBottom: "8px",
    textAlign: "center"
  },
  portalTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontStyle: "bold", // note: valid values are "normal" or "italic", "bold" is set via fontWeight
    fontSize: "20px",
    lineHeight: "100%", // or "1" for exact 100%
    letterSpacing: "3%",
    color: "#6B133F",
    marginBottom: "4px",
    textAlign: "center"
  },
  portalSubtitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontStyle: "bold", // note: valid values are "normal" or "italic", "bold" is set via fontWeight
    fontSize: "20px",
    lineHeight: "100%", // or "1" for exact 100%
    letterSpacing: "3%",
    color: "#6B133F",
    marginBottom: "20px",
    textAlign: "center",
    textDecoration: "underline"
  },
  input: {
    fontSize: "16px",
    padding: "10px",
    marginBottom: "10px"
  },
  submitButton: {
    marginTop: "20px",
    backgroundColor: "#73004e"
  },
  version: {
    fontSize: "12px",
    color: "#888"
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#fff"
  }
};
