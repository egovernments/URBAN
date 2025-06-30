import React from "react";
import { CardLabel } from "@egovernments/digit-ui-react-components";

const DeclarationSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const checkboxes = formData?.declaration || {};

  const handleChange = () => {
    const updated = { ...checkboxes, selfDeclaration: !checkboxes.selfDeclaration };
    onSelect(config.key, updated);
  };

  if (userType !== "employee") return null;

  const sectionTitle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "18px",
    color: "#282828",
    margin: "24px 0 16px 0",
  };

  const checkboxStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "#282828",
    lineHeight: "22px",
    marginBottom: "24px",
  };

  const checkboxInputStyle = {
    marginTop: "4px",
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={sectionTitle}>{t("Self Declaration")}</div>
      <label style={checkboxStyle}>
        <input
          type="checkbox"
          style={checkboxInputStyle}
          checked={checkboxes.selfDeclaration || false}
          onChange={handleChange}
        />
        {t(
          "मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।"
        )}
      </label>
    </div>
  );
};

export default DeclarationSection;
