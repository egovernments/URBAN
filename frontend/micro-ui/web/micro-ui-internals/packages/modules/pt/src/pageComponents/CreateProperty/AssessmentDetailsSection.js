import React from "react";
import { CardLabel, TextInput, Dropdown } from "@egovernments/digit-ui-react-components";

const AssessmentDetailsSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const assessment = formData?.assessmentDetails || {};

  const handleChange = (e) => {
    const updated = { ...assessment, [e.target.name]: e.target.value };
    onSelect(config.key, updated);
  };

  const handleDropdownChange = (key, value) => {
    const updated = { ...assessment, [key]: value.name };
    onSelect(config.key, updated);
  };

  if (userType !== "employee") return null;

  const labelStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    color: "#282828",
    marginBottom: "6px",
  };

  const fieldStyle = {
    marginBottom: "24px",
    width: "30%",
  };

  const inputStyle = {
    width: "100%",
    // padding: "8px",
    fontSize: "14px",
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{ ...labelStyle, fontSize: "18px", marginBottom: "16px" }}>
        {t("Assessment Details")}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {/* Rate Zone */}
        <div style={fieldStyle}>
          <div style={labelStyle}>{t("Rate zone")}</div>
          <TextInput
            name="rateZone"
            value={assessment.rateZone || ""}
            onChange={handleChange}
            placeholder={t("Auto fetched")}
            style={inputStyle}
          />
        </div>

        {/* Road Factor */}
        <div style={fieldStyle}>
          <div style={labelStyle}>{t("Road factor")}</div>
          <Dropdown
            t={t}
            option={[
              { code: "LOW", name: t("Low") },
              { code: "HIGH", name: t("High") },
            ]}
            selected={assessment.roadFactor ? { name: assessment.roadFactor } : null}
            select={(val) => handleDropdownChange("roadFactor", val)}
            optionKey="name"
            placeholder={t("Select")}
            style={inputStyle}
          />
        </div>

        {/* Old Property ID */}
        <div style={fieldStyle}>
          <div style={labelStyle}>{t("Old property id")}</div>
          <TextInput
            name="oldPropertyId"
            value={assessment.oldPropertyId || ""}
            onChange={handleChange}
            placeholder={t("Enter")}
            style={inputStyle}
          />
        </div>

        {/* Plot Area */}
        <div style={fieldStyle}>
          <div style={labelStyle}>{t("Plot area")}</div>
          <TextInput
            name="plotArea"
            value={assessment.plotArea || ""}
            onChange={handleChange}
            placeholder={t("Enter")}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetailsSection;
