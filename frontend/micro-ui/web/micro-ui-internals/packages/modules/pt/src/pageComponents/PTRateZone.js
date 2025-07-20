import { LabelFieldPair, CardLabel, TextInput, CheckBox } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";

const PTRateZone = ({ t, onSelect }) => {
  const [address, setAddress] = useState("");
  const [sameAsPropertyAddress, setSameAsPropertyAddress] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    onSelect("correspondenceAddress", e.target.value);
  };


  return (
    <LabelFieldPair style={{ display: "block" }}>
      <CardLabel className="card-label-smaller" style={{marginBottom:"0px",display:"contents"}}>{t("Rate Zone")}</CardLabel>
      <div className="" >
        <TextInput
          name="correspondenceAddress"
          value={address}
          onChange={handleAddressChange}
          style={{width: "100%" }}
        />
 
      </div>
    </LabelFieldPair>
  );
};

export default PTRateZone;
