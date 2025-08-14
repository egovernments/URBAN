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

// Add CSS for mobile responsiveness
const mobileStyles = `
  .login-container {
    background: linear-gradient(135deg, rgb(74, 111, 165) 0%, rgb(22, 96, 136) 50%, rgb(74, 111, 165) 100%);
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .login-card {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 900px;
    min-height: 500px;
  }
  
  .left-section {
    flex: 1;
    padding: 30px;
    text-align: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .right-section {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f8f9fa;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    justify-content: center;
  }
  
  .logo-text {
    text-align: left;
  }
  
  .hindi-text {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }
  
  .english-text {
    font-size: 16px;
    color: #666;
  }
  
  .map-box {
    margin: 20px 0;
  }
  
  .map-image {
    width: 100%;
    height: auto;
    max-width: 300px;
    min-width: 250px;
  }
  
  .welcome-text,
  .portal-title,
  .portal-subtitle {
    font-family: Inter;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 3%;
    color: #6B133F;
    text-align: center;
  }
  
  .welcome-text {
    margin-bottom: 8px;
  }
  
  .portal-title {
    margin-bottom: 4px;
  }
  
  .portal-subtitle {
    margin-bottom: 20px;
    text-decoration: underline;
  }
  
  .version {
    font-size: 12px;
    color: #888;
    margin-top: auto;
  }
  
  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .login-card {
      flex-direction: column;
      max-width: 450px;
      min-height: auto;
    }
    
    .left-section {
      padding: 20px;
      flex: none;
      align-items: center;
      text-align: center;
      width: auto;
    }
    
    .right-section {
      padding: 20px;
      flex: none;
    }
    
    .logo-container {
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    
    .logo-container img {
      height: 60px;
      width: auto;
    }
    
    .logo-text {
      text-align: center;
      width: 100%;
    }
    
    .hindi-text {
      font-size: 18px;
    }
    
    .english-text {
      font-size: 14px;
    }
    
    .map-box {
      margin: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    
    .map-image {
      max-width: 350px;
      width: 90%;
      height: auto;
      min-height: 200px;
    }
    
    .welcome-text,
    .portal-title,
    .portal-subtitle {
      font-size: 16px;
    }
    
    .portal-subtitle {
      margin-bottom: 15px;
    }
    
    .version {
      font-size: 10px;
      margin-top: 10px;
      text-align: center;
    }
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = mobileStyles;
  document.head.appendChild(styleSheet);
}

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
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <div className="logo-container">
            <img
              src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%2014.svg"
              alt="IMC Logo"
              style={{ height: "70px", width: "auto" }}
            />
            <div className="logo-text">
              <div className="hindi-text">
                इंदौर नगर निगम
              </div>
              <div className="english-text">
                Indore Municipal Corporation
              </div>
            </div>
          </div>
          <div className="">
            <img
              src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/image%201807.svg"
              alt="Indore Map"
              className="map-image"
            />
          </div>
          <p className="version">Version v1.1</p>
        </div>

        <div className="right-section">
          <h3 className="welcome-text">Welcome to</h3>
          <h2 className="portal-title">e-Indore Municipal Corporation (e-IMC)</h2>
          <p className="portal-subtitle">IMC Citizen</p>
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