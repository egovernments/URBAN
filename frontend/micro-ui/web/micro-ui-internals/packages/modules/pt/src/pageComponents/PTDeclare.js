import { LabelFieldPair, CheckBox } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";

const PTDeclare = ({ t, onSelect }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onSelect("declarationAccepted", newValue);
  };

  return (
    <LabelFieldPair>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", width: "100%" }}>
      <CheckBox
          label=""
          onChange={handleCheckboxChange}
          checked={isChecked}
          style={{ marginTop: "4px" }}
        />
        <span style={{ lineHeight: "1.5", fontSize: "14px", flex: 1 }}>
          स्वयं घोषणा समझौते मैं यह सत्यापित करता/करती हूं कि उपरोक्त विवरणी में दी गई जानकारी सत्य है। मैंने/हमने जिस भवन/भूमि के संबंध में विवरण प्रस्तुत किया है उसका मैं स्वामी/अधिभोगी हूं। इसमें कोई भी तथ्य छुपाया अथवा गलत नहीं है।<br />
          <strong>नोट:</strong> मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारण) नियम 1997 के नियम 10(1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संरक्षक (Attachment) स्कैन कर सब्मिट करे। स्व निर्धारण विवरणी मौके पर सत्यापन के अधीन रहेगी। जांच में अंतर पाए जाने पर या अन्य कारण से आवश्यक पाए जाने पर वार्षिक भाड़ा मूल्य का पुनर्धारण किया जाएगा और 10 प्रतिशत से अधिक अंतर पाए जाने पर संपत्तिकर के पुनर्धारण के अंतर की राशि की पाँच गुना शास्ति अधिरोपित की जा सकेगी।
        </span>
      
      </div>
    </LabelFieldPair>
  );
};

export default PTDeclare;
