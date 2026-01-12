
import React from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";
import styles from "./IndexStyle";

const OwnershipDetailsSection = ({ t, owners }) => {
  // Assuming only 1 owner object for now (Owner 1)
  const ownerValues = owners?.[0]?.values || [];

  // Convert the values array to a key-value object
  const owner = ownerValues.reduce((acc, curr) => {
    acc[curr.title] = curr.value;
    return acc;
  }, {});

  return (
    <div>
      <div style={styles.flex45}>
        <div style={styles.poppinsLabel}>
          {t("Provide Ownership details")}{" "}
          <span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput300}
          t={t}
          option={[]}
            selected={{ name: t(owner["PT_FORM3_OWNERSHIP_TYPE"] || "—") }}
          optionKey="name"
          placeholder={t("Select")}
          isDisabled={true}
        />
      </div>

      <div>
        <div style={styles.poppinsLabel}>{t("Owner 1")}</div>

        <div className="form-section" style={styles.formSection}>
          {/* Name with Title */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={[]}
                selected={{ name: t("Mr") }}
                optionKey="name"
                placeholder={t("Mr")}
                isDisabled={true}
                style={styles.dropdown30}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner["PT_OWNERSHIP_INFO_NAME"] || ""}
                disabled
              />
            </div>
          </div>

          {/* Aadhaar - Placeholder since not present */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Aadhaar id")} <span className="mandatory" style={styles.mandatory}>*</span></div>
            <TextInput style={styles.widthInput} value="—" disabled />
          </div>

          {/* Owner Name Hindi */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Owner Name (हिंदी में)")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={[]}
                selected={{ name: t("Mr") }}
                optionKey="name"
                placeholder={t("Mr")}
                isDisabled={true}
                style={styles.dropdown30}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("यहाँ लिखें")}
                value="—"
                disabled
              />
            </div>
          </div>

          {/* Father/Husband Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Father/Husband name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              style={styles.widthInput}
              value={owner["PT_SEARCHPROPERTY_TABEL_GUARDIANNAME"] || "—"}
              disabled
            />
          </div>

          {/* Relationship */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Relationship")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <Dropdown
              t={t}
              option={[]}
              selected={{ name: "—" }} // Not available in response
              optionKey="name"
              placeholder={t("Select")}
              isDisabled={true}
              style={styles.widthInput}
            />
          </div>

          {/* Email */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Email")}</div>
            <TextInput
              value={owner["PT_OWNERSHIP_INFO_EMAIL_ID"] || "—"}
              disabled
              style={styles.widthInput}
            />
          </div>

          {/* Alternative Number - Placeholder */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
            <TextInput value="—" disabled style={styles.widthInput} />
          </div>

          {/* Mobile */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Mobile Number")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner["PT_OWNERSHIP_INFO_MOBILE_NO"] || ""}
              disabled
              style={styles.widthInput}
            />
          </div>

          {/* Samagra ID - Placeholder */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("SamagraID")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput value="—" disabled style={styles.widthInput} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipDetailsSection;
