import React, { useEffect, useState } from "react";
import { Dropdown, TextInput, Loader } from "@egovernments/digit-ui-react-components";

const OtherDetailsSection = ({
  t,
  propertyDetails,
  handlePropertyDetailsChange,
  checkboxes,
  handleCheckboxChange,
  styles,
  formErrors
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "PTPropertyType") || {};
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);

  useEffect(() => {
    if (Menu?.PropertyTax?.PropertyType?.length) {
      const options = Menu.PropertyTax.PropertyType.map((item) => ({
        code: item.code,
        name: t("COMMON_PROPTYPE_" + item.code.replace(/\./g, "_")),
      })).sort((a, b) => a.name.localeCompare(b.name));
      setPropertyTypeOptions(options);
    }
  }, [Menu]);

  if (isLoading) return <Loader />;
  return (

    <div>

      {/* Other Details Heading */}
      <div style={styles.assessmentStyle}>{t("Other details")}</div>

      {/* Property Info */}
      <div style={styles.formSection}>
        {/* Property Type */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>{t("Property Type")}</div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            option={propertyTypeOptions}
            selected={propertyDetails.propertyType}
            select={(option) => handlePropertyDetailsChange("propertyType", option)}
            optionKey="name"
            placeholder={t("Select")}
          />
        </div>

        {/* Rooms/Area */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>{t("Rooms/Area")}</div>
          <TextInput
            style={styles.widthInput}
            placeholder={t("Enter")}
            value={propertyDetails.roomsArea}
            onChange={(e) => handlePropertyDetailsChange("roomsArea", e.target.value)}
          />
        </div>

        {/* Exemption */}
        <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>{t("Exemption Applicable")}</div>
          <Dropdown
            style={styles.widthInput}
            t={t}
            option={[
              { code: "NONE", name: t("None") },
              { code: "SENIOR_CITIZEN", name: t("Senior Citizen") },
              { code: "DISABLED", name: t("Disabled") }
            ]}
            selected={propertyDetails.exemption}
            select={(option) => handlePropertyDetailsChange("exemption", option)}
            optionKey="name"
            placeholder={t("Select")}
          />
        </div>
      </div>

      {/* Additional Checkboxes */}
      <div style={styles.checkboxContainer}>
        <label>
          {t("Mobile Tower")}{" "}
          <input
            type="checkbox"
            checked={checkboxes.mobileTower}
            onChange={() => handleCheckboxChange("mobileTower")}
          />
        </label>
        <label>
          {t("Broad Road")}{" "}
          <input
            type="checkbox"
            checked={checkboxes.broadRoad}
            onChange={() => handleCheckboxChange("broadRoad")}
          />
        </label>
        <label>
          {t("Advertisement")}{" "}
          <input
            type="checkbox"
            checked={checkboxes.advertisement}
            onChange={() => handleCheckboxChange("advertisement")}
          />
        </label>
      </div>

      {/* Self Declaration */}
      <div style={styles.assessmentStyle}>{t("Self Declaration")}</div>
      <label style={styles.poppinsTextStyle}>
        <input
          type="checkbox"
          checked={checkboxes.selfDeclaration}
          onChange={() => handleCheckboxChange("selfDeclaration")}
        />{" "}
        {t(
          "मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।"
        )}
      </label>
    </div>
  );
};

export default OtherDetailsSection;
