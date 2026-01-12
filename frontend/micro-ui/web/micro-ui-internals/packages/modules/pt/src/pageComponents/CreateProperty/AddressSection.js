import React, { useState, useEffect } from "react";
import {
  CardLabel,
  LabelFieldPair,
  Dropdown,
  TextInput
} from "@egovernments/digit-ui-react-components";

const AddressSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const [address, setAddress] = useState({
    doorNo: formData?.address?.doorNo || "",
    street: formData?.address?.street || "",
    pincode: formData?.address?.pincode || "",
    colony: formData?.address?.colony || null,
    ward: formData?.address?.ward || null,
    zone: formData?.address?.zone || null
  });

  const labelStyle = {
    textAlign: "left",
    marginBottom: "0px",
    display: "content",
    lineHeight: "inherit",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    color: "#282828",
    width:"200px"
  };

  const inputStyle = {
    width: "300px",
  };

  const dropdownOptions = [
    { code: "FATHER", name: t("Father") },
    { code: "HUSBAND", name: t("Husband") },
    { code: "GUARDIAN", name: t("Guardian") },
  ];

  const handleChange = (key, value) => {
    console.log("AddressSection handleChange", key, value);
    const updated = { ...address, [key]: value };
    setAddress(updated);
    onSelect(config.key, updated);
  };
  


  if (userType !== "employee") return null;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <LabelFieldPair style={{ alignItems: "center", display: "block", marginTop: "16px" }}>
          <CardLabel className="card-label-smaller" style={labelStyle}>{t("Door/House Number")}</CardLabel>
          <div className="field">
            <TextInput
              style={inputStyle}
              value={address.doorNo}
              onChange={(e) => handleChange("doorNo", e.target.value)}
              placeholder={t("Enter")}
            />
          </div>
        </LabelFieldPair>

        <LabelFieldPair style={{ alignItems: "center", display: "block", marginTop: "16px" }}>
          <CardLabel style={labelStyle}>{t("Address")}</CardLabel>
          <div className="field">
            <TextInput
              style={inputStyle}
              value={address.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder={t("Enter")}
            />
          </div>
        </LabelFieldPair>

        <LabelFieldPair style={{ alignItems: "center", display: "block", marginTop: "16px" }}>
          <CardLabel style={labelStyle}>{t("Pincode")}</CardLabel>
          <div className="field">
            <TextInput
              style={inputStyle}
              value={address.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              placeholder={t("Enter")}
            />
          </div>
        </LabelFieldPair>
      </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
        <LabelFieldPair style={{ alignItems: "center", display: "block", marginTop: "16px" }}>
          <CardLabel style={labelStyle}>{t("Colony")}</CardLabel>
          <div className="field">
            <Dropdown
              option={dropdownOptions}
              selected={address.colony}
              select={(val) => handleChange("colony", val)}
              optionKey="name"
              placeholder={t("Select")}
              style={inputStyle}
              t={t}
            />
          </div>
        </LabelFieldPair>

        <LabelFieldPair style={{ alignItems: "center", display: "block", marginTop: "16px" }}>
          <CardLabel style={labelStyle}>{t("Ward")}</CardLabel>
          <div className="field">
            <Dropdown
              option={dropdownOptions}
              selected={address.ward}
              select={(val) => handleChange("ward", val)}
              optionKey="name"
              placeholder={t("Select")}
              style={inputStyle}
              t={t}
            />
          </div>
        </LabelFieldPair>

        <LabelFieldPair style={{ alignItems: "center", display: "block", marginTop: "16px" }}>
          <CardLabel style={labelStyle}>{t("Zone")}</CardLabel>
          <div className="field">
            <Dropdown
              option={dropdownOptions}
              selected={address.zone}
              select={(val) => handleChange("zone", val)}
              optionKey="name"
              placeholder={t("Select")}
              style={inputStyle}
              t={t}
            />
          </div>
        </LabelFieldPair>
      </div>
    </div>
  );
};

export default AddressSection;
