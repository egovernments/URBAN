import React from "react";

const CorrespondenceAddressSection = ({
  t,
  correspondenceAddress,
  handleCorrespondenceChange,
  isSameAsPropertyAddress,
  handleSameAsPropertyToggle,
  styles,formErrors
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={styles.styleMtop}></div>
      <div style={styles.assessmentStyle}>{t("Correspondence Address")}</div>
      <div style={{ display: "flex" }}>
        <textarea
          style={styles.widthInputs}
          placeholder={t("Enter")}
          value={correspondenceAddress}
          onChange={handleCorrespondenceChange}
          disabled={isSameAsPropertyAddress}
        />
        <div style={styles.checkboxMargin}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              onChange={handleSameAsPropertyToggle}
              checked={isSameAsPropertyAddress}
              style={{ padding: "10px" }}
            />
            {"  "} {t("Same as property address")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceAddressSection;
