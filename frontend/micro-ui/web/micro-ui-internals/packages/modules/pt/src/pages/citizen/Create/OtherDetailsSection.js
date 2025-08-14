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
  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "AssessmentYear") || {};
  const { data: OwnerType = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType") || {};
  console.log("OwnerTypeMenu", OwnerType)
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [ownerTypeOptions, setOwnerTypeOptions] = useState([]);
  useEffect(() => {
    if (Menu?.PropertyTax?.PropertyType?.length) {
      const options = Menu.PropertyTax.PropertyType.map((item) => ({
        code: item.code,
        name: t("COMMON_PROPTYPE_" + item.code.replace(/\./g, "_")),
      })).sort((a, b) => a.name.localeCompare(b.name));
      setPropertyTypeOptions(options);
    }
  }, [Menu]);
  // useEffect(() => {
  //   if (OwnerType?.length) {
  //     const options = OwnerType.map((item) => ({
  //       code: item.code,
  //       name: t(item.name),
  //     }));
  //     setOwnerTypeOptions(options);
  //   }
  // }, [isLoadingO, OwnerType]);
  useEffect(() => {
  if (OwnerType?.length) {
    const filteredItems = OwnerType.filter((item) => item.fromFY === "2025-26");

    if (filteredItems.length) {
      const options = filteredItems.map((item) => ({
        code: item.code,
        name: t(item.name),
      }));
      setOwnerTypeOptions(options);
    }
  }
}, [isLoadingO, OwnerType]);

  if (isLoading) return <Loader />;
  return (

    <div>

      {/* Other Details Heading */}
      <div style={styles.assessmentStyle}>{t("Other Details")}</div>

      {/* Property Info */}
      {/* <div style={styles.formSection}> */}
      {/* Property Type */}
      {/* <div style={styles.flex30}>
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
        </div> */}

      {/* Rooms/Area */}
      {/* <div style={styles.flex30}>
          <div style={styles.poppinsLabel}>{t("Rooms/Area")}</div>
          <TextInput
            style={styles.widthInput}
            placeholder={t("Enter")}
            value={propertyDetails.roomsArea}
            onChange={(e) => handlePropertyDetailsChange("roomsArea", e.target.value)}
          />
        </div> */}

      {/* Exemption */}
      <div style={{pointerEvents : "none", opacity: 0.5 }}>
        <div style={styles.flex45}>

          <div style={styles.poppinsLabel}>{t("Exemption Applicable")}</div>
          <Dropdown
            style={styles.widthInput300}
            t={t}
            option={ownerTypeOptions}
            selected={propertyDetails.ownerType}
            select={(option) => handlePropertyDetailsChange("exemption", option)}
            optionKey="name"
            placeholder={t("Select")}
          />
        </div>
      </div>
      {/* </div> */}

      {/* Additional Checkboxes */}
    
      <div style={{...styles.checkboxContainer, pointerEvents: "none", opacity: 0.5 }}>
        <label style={styles.poppinsLabels}>
          {t("Mobile Tower")}{" "}
          <input
            type="checkbox"
            checked={checkboxes.mobileTower}
            onChange={() => handleCheckboxChange("mobileTower")}
          />
        </label>
        <label style={styles.poppinsLabels}>
          {t("Bond Road")}{" "}
          <input
            type="checkbox"
            checked={checkboxes.broadRoad}
            onChange={() => handleCheckboxChange("broadRoad")}
          />
        </label>
        <label style={styles.poppinsLabels}>
          {t("Advertisement")}{" "}
          <input
            type="checkbox"
            checked={checkboxes.advertisement}
            onChange={() => handleCheckboxChange("advertisement")}
          />
        </label>
      </div>

      {/* Self Declaration */}
      <div style={styles.poppinsLabel}>{t("Self Declaration")}</div>
      <label style={styles.poppinsTextStyle}>
        <input
          style={{ marginRight: "10px" }}
          type="checkbox"
          checked={checkboxes.selfDeclaration}
          onChange={() => handleCheckboxChange("selfDeclaration")}
        />{"    "}
        {t(
          " मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।"
        )}
      </label>
      {formErrors?.selfDeclaration && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {formErrors.selfDeclaration}
        </p>
      )}
    </div>
  );
};

export default OtherDetailsSection;
