import React from "react";
import { Dropdown, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({
  t,
  ownershipType,
  handleOwnershipTypeChange,
  owners,
  setOwners,
  addNewOwner,
  isJointStarted, styles, formErrors
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: SubOwnerShipCategoryOb, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "SubOwnerShipCategory");
  const { data: OwnerShipCategoryOb, isLoading: ownerShipCatLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerShipCategory");
const dropdownOptions = (Array.isArray(OwnerShipCategoryOb) ? OwnerShipCategoryOb : []).map(item => ({
  code: item.code,
  name: t(item.name)
}));
console.log("OwnerShipCategoryOb",OwnerShipCategoryOb)
  const updateOwner = (index, field, value) => {
    const updated = [...owners];
    updated[index][field] = value;
    setOwners(updated);
  };

  const renderOwnerForm = (index) => {
    const owner = owners[index];

    return (
      <div key={index}>
        {(isJointStarted || index > 0) && (
          <div style={styles.poppinsLabel}>{t(`Owner ${index + 1}`)}</div>
        )}

        <div className="form-section" style={styles.formSection}>

          {/* Name with Title */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={[
                  { code: "MR", name: t("Mr") },
                  { code: "MRS", name: t("Mrs") },
                  { code: "MISS", name: t("Miss") }
                ]}
                selected={{ name: owner.title }}
                select={(val) => updateOwner(index, "title", val.name)}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("Enter")}
                value={owner.name}
                onChange={(e) => updateOwner(index, "name", e.target.value)}
              />
            </div>
            {formErrors.ownerName && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.ownerName}</p>
            )}
          </div>

          {/* Aadhaar */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Aadhaar id")} <span className="mandatory" style={styles.mandatory}>*</span></div>
            <TextInput
              style={styles.widthInput}
              value={owner.aadhaar}
              onChange={(e) => updateOwner(index, "aadhaar", e.target.value)}
            />
            {formErrors.aadhaar && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.aadhaar}</p>
            )}
          </div>

          {/* Hindi Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Owner Name (हिंदी में)")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <div style={styles.nameInputContainer}>
              <Dropdown
                t={t}
                option={[
                  { code: "MR", name: t("Mr") },
                  { code: "MRS", name: t("Mrs") },
                  { code: "MISS", name: t("Miss") }
                ]}
                selected={{ name: owner.hindiTitle }}
                select={(val) => updateOwner(index, "hindiTitle", val.name)}
                optionKey="name"
                style={styles.dropdown30}
                placeholder={t("Mr")}
              />
              <TextInput
                style={styles.textBox}
                placeholder={t("यहाँ लिखें")}
                value={owner.hindiName}
                onChange={(e) => updateOwner(index, "hindiName", e.target.value)}
              />
            </div>
            {formErrors?.hindiName && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.hindiName}</p>
            )}
          </div>

          {/* Father/Husband Name */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Father/Husband name")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              style={styles.widthInput}
              value={owner.fatherHusbandName}
              onChange={(e) => updateOwner(index, "fatherHusbandName", e.target.value)}
            />
            {formErrors?.fatherHusbandName && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.fatherHusbandName}</p>
            )}
          </div>

          {/* Relationship */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Relationship")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <Dropdown
              t={t}
              option={[
                { code: "FATHER", name: t("Father") },
                { code: "HUSBAND", name: t("Husband") },
                { code: "GUARDIAN", name: t("Guardian") }
              ]}
              selected={{ name: owner.relationship }}
              select={(val) => updateOwner(index, "relationship", val.name)}
              optionKey="name"
              placeholder={t("Select")}
              style={styles.widthInput}
            />
            {formErrors?.relationship && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.relationship}</p>
            )}
          </div>

          {/* Email */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Email")}</div>
            <TextInput
              value={owner.email}
              onChange={(e) => updateOwner(index, "email", e.target.value)}
              style={styles.widthInput}
            />
          </div>

          {/* Alternative Number */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>{t("Alternative Number")}</div>
            <TextInput
              value={owner.altNumber}
              onChange={(e) => updateOwner(index, "altNumber", e.target.value)}
              style={styles.widthInput}
            />
          </div>

          {/* Mobile */}
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("Mobile Number")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner.mobile}
              onChange={(e) => updateOwner(index, "mobile", e.target.value)}
              style={styles.widthInput}
            />
            {formErrors?.mobile && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.mobile}</p>
            )}
          </div>
          <div style={styles.flex30}>
            <div style={styles.poppinsLabel}>
              {t("SamagraID")} <span className="mandatory" style={styles.mandatory}>*</span>
            </div>
            <TextInput
              value={owner.samagraID}
              onChange={(e) => updateOwner(index, "samagraID", e.target.value)}
              style={styles.widthInput}
            />
            {formErrors?.samagraID && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.samagraID}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.flex45}>
        <div style={styles.poppinsLabel}>
          {t("Provide Ownership details")} <span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput300}
          t={t}
          option={dropdownOptions}
          selected={"ownershipType"}
          select={handleOwnershipTypeChange}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.ownershipType && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
            {formErrors.ownershipType}
          </p>
        )}
      </div>

      {owners.map((_, index) => renderOwnerForm(index))}

      {ownershipType === "INDIVIDUAL.MULTIPLEOWNERS" && (
        <div style={{ textAlign: "right" }}>
          <SubmitBar label={t("Add New Owner")} onSubmit={addNewOwner} />
        </div>
      )}
    </div>
  );
};

export default OwnershipDetailsSection;
