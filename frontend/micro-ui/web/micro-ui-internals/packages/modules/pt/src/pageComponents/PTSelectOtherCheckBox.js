import React, { useState } from "react";

const PTSelectOtherCheckBox = ({ t, onSelect }) => {
  const [checkboxStates, setCheckboxStates] = useState({
    mobileTower: false,
    bondRoad: false,
    advertisement: false,
    seniorCitizen: false,
  });

  const handleCheckboxChange = (key) => {
    const newValue = !checkboxStates[key];
    const updatedState = { ...checkboxStates, [key]: newValue };
    setCheckboxStates(updatedState);
    onSelect(key, newValue);
  };

  const renderCheckbox = (key, label) => (
    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checkboxStates[key]}
        onChange={() => handleCheckboxChange(key)}
      />
    </label>
  );

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "1rem" }}>
      {renderCheckbox("mobileTower", t("Mobile Tower"))}
      {renderCheckbox("bondRoad", t("Bond Road"))}
      {renderCheckbox("advertisement", t("Advertisement"))}
      {renderCheckbox("seniorCitizen", t("Senior Citizen Discount"))}
    </div>
  );
};

export default PTSelectOtherCheckBox;
