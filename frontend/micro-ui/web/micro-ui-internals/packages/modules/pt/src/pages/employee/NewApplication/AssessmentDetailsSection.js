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
  const stateId = Digit.ULBService.getStateId();
  const { data: RoadFactors, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "RoadFactor");
  const RoadFactorList = (RoadFactors?.PropertyTax?.RoadFactor || []).map((item) => ({
    code: item.code,
    name: item.name, // Show year like "2024-25"
  }));

  console.log("RoadFactors", RoadFactors);
  return (
    <div style={styles.formSection}>
      {/* Rate Zone */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Rate Zone")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <TextInput
          style={styles.widthInput}
          name="rateZone"
          value={assessmentDetails.rateZone}
          placeholder={t("Auto fetched")}
          onChange={handleAssessmentInputChange}
          disabled
        />
        {formErrors?.rateZone && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.rateZone}</p>
        )}
      </div>

      {/* Road Factor */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Road Factor")}<span className="mandatory" style={styles.mandatory}>*</span></div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={RoadFactorList} // dynamic list
          selected={RoadFactorList.find(item => item.code === assessmentDetails?.roadFactor)}
          select={handleRoadFactorChange}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.roadFactor && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.roadFactor}</p>
        )}
      </div>

      {/* Old Property ID */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Old Property Id")}</div>
        <TextInput
          style={styles.widthInput}
          name="oldPropertyId"
          value={assessmentDetails.oldPropertyId}
          onChange={handleAssessmentInputChange}
          placeholder={t("Enter")}
        />
      </div>

      {/* Plot Area */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>{t("Plot Area")}</div>
        <TextInput
          style={styles.widthInput}
          name="plotArea"
          value={assessmentDetails.plotArea}
          onChange={handleAssessmentInputChange}
          placeholder={t("Enter")}
          type="number"
        />
      </div>

      <div style={styles.flex30}></div>
      <div style={styles.flex30}></div>
    </div>
  );
};

export default AssessmentDetailsSection;
