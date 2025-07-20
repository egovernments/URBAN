import React, { useState, useEffect } from "react";
import { CardLabel } from "@egovernments/digit-ui-react-components";

const CorrespondenceAddressSection = ({
  t,
  config,
  onSelect,
  formData = {},
  userType,
}) => {
  const [correspondenceAddress, setCorrespondenceAddress] = useState(formData?.correspondenceAddress?.address || "");
  const [sameAsProperty, setSameAsProperty] = useState(formData?.correspondenceAddress?.sameAsProperty || false);

  const propertyAddress = formData?.address || {};

  // useEffect(() => {
  //   if (sameAsProperty) {
  //     const combined = `${propertyAddress?.doorNo || ""}, ${propertyAddress?.street || ""}, ${propertyAddress?.pincode || ""}`;
  //     setCorrespondenceAddress(combined);
  //     onSelect(config.key, {
  //       address: combined,
  //       sameAsProperty: true,
  //     });
  //   } else {
  //     onSelect(config.key, {
  //       address: correspondenceAddress,
  //       sameAsProperty: false,
  //     });
  //   }
  // }, [sameAsProperty, propertyAddress]);

  const handleChange = (e) => {
    setCorrespondenceAddress(e.target.value);
    onSelect(config.key, {
      address: e.target.value,
      sameAsProperty: false,
    });
  };

  const handleCheckboxChange = () => {
    setSameAsProperty((prev) => !prev);
  };

  if (userType !== "employee") return null;

  const labelStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    color: "#282828",
    marginBottom: "8px",
  };

  const textareaStyle = {
    width: "70%",
    minHeight: "100px",
    padding: "8px",
    fontFamily: "Poppins",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical",
  };

  const checkboxContainer = {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Poppins",
    fontSize: "14px",
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={labelStyle}>{t("Correspondence address")}</div>
      <textarea
        style={textareaStyle}
        value={correspondenceAddress}
        onChange={handleChange}
        disabled={sameAsProperty}
        placeholder={t("Enter")}
      />
      <div style={checkboxContainer}>
        <input
          type="checkbox"
          checked={sameAsProperty}
          onChange={handleCheckboxChange}
        />
        <label>{t("Same as property address")}</label>
      </div>
    </div>
  );
};

export default CorrespondenceAddressSection;
