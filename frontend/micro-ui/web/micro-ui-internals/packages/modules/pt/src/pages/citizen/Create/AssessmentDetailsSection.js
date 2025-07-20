import React from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AssessmentDetailsSection = ({
  t,
  assessmentDetails,
  handleAssessmentInputChange,
  handleRoadFactorChange,
styles,
formErrors
}) => {
 return (
  <div style={styles.formSection}>
    {/* Rate Zone */}
    <div style={styles.flex30}>
      <div style={{ ...styles.poppinsLabel, color: "#888" }}>
        {t("Rate zone")}<span className="mandatory" style={styles.mandatory}>*</span>
      </div>
      <TextInput
        style={styles.widthInput}
        name="rateZone"
        value={assessmentDetails.rateZone}
        placeholder={t("Auto fetched")}
        onChange={handleAssessmentInputChange}
        disable={true}
      />
      {formErrors?.rateZone && (
        <p style={{ color: "red", fontSize: "12px" }}>{formErrors.rateZone}</p>
      )}
    </div>

    {/* Road Factor */}
    <div style={styles.flex30}>
      <div style={{ ...styles.poppinsLabel, color: "#888" }}>
        {t("Road factor")}<span className="mandatory" style={styles.mandatory}>*</span>
      </div>
      <Dropdown
        style={styles.widthInput}
        t={t}
        option={[
          { code: "LOW", name: t("Low") },
          { code: "HIGH", name: t("High") }
        ]}
        selected={assessmentDetails.roadFactor}
        select={handleRoadFactorChange}
        optionKey="name"
        placeholder={t("Select")}
        disable={true}
      />
      {formErrors?.roadFactor && (
        <p style={{ color: "red", fontSize: "12px" }}>{formErrors.roadFactor}</p>
      )}
    </div>

    {/* Old Property ID */}
    <div style={styles.flex30}>
      <div style={{ ...styles.poppinsLabel, color: "#888" }}>{t("Old property id")}</div>
      <TextInput
        style={styles.widthInput}
        name="oldPropertyId"
        value={assessmentDetails.oldPropertyId}
        onChange={handleAssessmentInputChange}
        placeholder={t("Enter")}
        disable={true}
      />
    </div>

    {/* Plot Area */}
    <div style={styles.flex30}>
      <div style={{ ...styles.poppinsLabel, color: "#888" }}>{t("Plot area")}</div>
      <TextInput
        style={styles.widthInput}
        name="plotArea"
        value={assessmentDetails.plotArea}
        onChange={handleAssessmentInputChange}
        placeholder={t("Enter")}
        disable={true}
      />
    </div>

    <div style={styles.flex30}></div>
    <div style={styles.flex30}></div>
  </div>
);

};

export default AssessmentDetailsSection;
