import React from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";
import styles from "./IndexStyle"

const AddressSection = ({ t, addressDetails  }) => {
  return (
    <div className="form-section" style={styles.formSection}>
      {/* Door/House Number */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Door/House Number")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          value={addressDetails.doorNo || ""}
          isDisabled={true}
        />
      </div>

      {/* Address */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Address")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          value={addressDetails.address || ""}
          isDisabled={true}
        />
      </div>

      {/* Pincode */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Pincode")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          value={addressDetails.pincode || ""}
          isDisabled={true}
        />
      </div>

      {/* Colony */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Colony")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={[
            { code: "SUN02", name: t("SUN02") },
            { code: "SUN03", name: t("SUN03") },
            { code: "SUN04", name: t("SUN04") }
          ]}
          selected={addressDetails.colony}
          optionKey="name"
          placeholder={t("Select")}
          isDisabled={true}
        />
      </div>

      {/* Ward */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Ward")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={[
            { code: "W01", name: t("W01") },
            { code: "W02", name: t("W02") },
            { code: "W03", name: t("W03") }
          ]}
          selected={addressDetails.ward}
          optionKey="name"
          placeholder={t("Select")}
          isDisabled={true}
        />
      </div>

      {/* Zone */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={[
            { code: "Z01", name: t("Z01") },
            { code: "Z02", name: t("Z02") },
            { code: "Z03", name: t("Z03") }
          ]}
          selected={addressDetails.zone}
          optionKey="name"
          placeholder={t("Select")}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export default AddressSection;
