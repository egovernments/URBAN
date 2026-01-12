import { LabelFieldPair, CardLabel, TextInput, CheckBox } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";

const PTCorrespondenceAddress = ({ t, onSelect }) => {
  const [address, setAddress] = useState("");
  const [sameAsPropertyAddress, setSameAsPropertyAddress] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    onSelect("correspondenceAddress", e.target.value);
  };

  const handleCheckboxChange = () => {
    const newVal = !sameAsPropertyAddress;
    setSameAsPropertyAddress(newVal);

    if (newVal) {
      const propertyAddress = "Sample Property Address"; // Replace with real data if needed
      setAddress(propertyAddress);
      onSelect("correspondenceAddress", propertyAddress);
    }
  };

   // Style Definitions
   const labelStyle = {
    textAlign: "left",
    marginBottom: "8px",
    fontSize: "14px",
  };

  const inputRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    width: "100%",
  };

  const inputStyle = {
    width: "250px",
  };

  const checkboxStyle = {
    display: "flex",
    marginLeft:"-300px",
    fontSize: "14px",
    
  };

  return (
    <div>
      <CardLabel className="card-label-smaller" style={labelStyle}>
      {t("Correspondence Address")}
    </CardLabel>
 <LabelFieldPair>
    
    <div style={inputRowStyle}>
      <TextInput
        name="correspondenceAddress"
        value={address}
        onChange={handleAddressChange}
        style={inputStyle}
      />
      <div style={checkboxStyle}>
          <CheckBox
            label={<span style={{ fontSize: "14px" }}>{t("Same as property address")}</span>}
            onChange={handleCheckboxChange}
            checked={sameAsPropertyAddress}
          />
        </div>
    </div>
  </LabelFieldPair>


    </div>
   
  );
};

export default PTCorrespondenceAddress;
