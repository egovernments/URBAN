import React, { useState, useEffect } from "react";
import { CardText, FormStep, CitizenConsentForm, Loader, CheckBox, MobileNumber } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, countryCode, onMobileChange, onCountryCodeChange, config, canSubmit, tenantId }) => {

  const [isCheckBox, setIsCheckBox] = useState(false);
  const [isCCFEnabled, setisCCFEnabled] = useState(false);
  const [mdmsConfig, setMdmsConfig] = useState("");

  const { isLoading, data } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{ name: "CitizenConsentForm" }]);

  function setTermsAndPolicyDetails(e) {
    setIsCheckBox(e.target.checked)
  }

  // Get maxLength based on country code
  const getMaxLength = (code) => {
    const lengths = {
      '+91': 10,  // India
      '+1': 10,   // USA/Canada
      '+44': 10,  // UK
      '+971': 9,  // UAE
      '+86': 11,  // China
      '+61': 9,   // Australia
      '+65': 8,   // Singapore
      '+81': 10,  // Japan
      '+49': 11,  // Germany
      '+33': 9,   // France
    };
    return lengths[code] || 15; // Default to 15 if not found
  };

  const requiredLength = getMaxLength(countryCode || '+91');

  const checkDisbaled = () => {
    if (isCCFEnabled?.isCitizenConsentFormEnabled) {
      return !(mobileNumber.length === requiredLength && canSubmit && isCheckBox)
    } else {
      return !(mobileNumber.length === requiredLength && canSubmit)
    }
  }

  useEffect(()=> {
    if (data?.["common-masters"]?.CitizenConsentForm?.[0]?.isCitizenConsentFormEnabled) {
      setisCCFEnabled(data?.["common-masters"]?.CitizenConsentForm?.[0])
    }
  }, [data]);

  const onLinkClick = (e) => {
    setMdmsConfig(e.target.id)
}

  const checkLabels = () => {
    return <span>
      {isCCFEnabled?.checkBoxLabels?.map((data, index) => {
        return <span>
          {/* {index == 0 && "CCF"} */}
          {data?.linkPrefix && <span>{t(`${data?.linkPrefix}_`)}</span>}
          {data?.link && <span id={data?.linkId} onClick={(e) => { onLinkClick(e) }} style={{ color: "#F47738", cursor: "pointer" }}>{t(`${data?.link}_`)}</span>}
          {data?.linkPostfix && <span>{t(`${data?.linkPostfix}_`)}</span>}
          {(index == isCCFEnabled?.checkBoxLabels?.length - 1) && t("LABEL")}
        </span>
      })}
    </span>
  }



  if (isLoading) return <Loader />

  return (
    <FormStep
      isDisabled={checkDisbaled()}
      onSelect={onSelect}
      config={config}
      t={t}
    >
      <MobileNumber
        value={mobileNumber}
        onChange={onMobileChange}
        countryCode={countryCode}
        onCountryCodeChange={onCountryCodeChange}
        showCountryCodeSelector={true}
        tenantId={tenantId}
        disable={false}
        className=""
        autoFocus={true}
      />
      {isCCFEnabled?.isCitizenConsentFormEnabled && <div>
        <CheckBox
          className="form-field"
          label={checkLabels()}
          value={isCheckBox}
          checked={isCheckBox}
          style={{ marginTop: "5px", marginLeft: "55px" }}
          styles={{marginBottom: "30px"}}
          onChange={setTermsAndPolicyDetails}
        />

        <CitizenConsentForm
          styles={{}}
          t={t}
          isCheckBoxChecked={setTermsAndPolicyDetails}
          labels={isCCFEnabled?.checkBoxLabels}
          mdmsConfig={mdmsConfig}
          setMdmsConfig={setMdmsConfig}
        />
      </div>}
    </FormStep>
  );
};

export default SelectMobileNumber;
