import {
  CardLabel,
  CardLabelError,
  LabelFieldPair,
  Dropdown,
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";

const PTSelectAssessmentYears = ({ t, config, onSelect, formData = {}, userType }) => {
  const [selectedYear, setSelectedYear] = useState(formData?.assessmentYear || null);
  const [years, setYears] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = Array.from({ length: 5 }, (_, i) => ({
      code: `${currentYear - i}`,
      name: `${currentYear - i}`,
    }));
    setYears(yearList);
  }, []);

  const handleChange = (value) => {
    setSelectedYear(value);
    setError("");
    onSelect(config.key, value);
  };

  if (userType === "employee") {
    const labelStyle = {
      textAlign: "left",
      marginBottom: "0px",
      display: "block",
      lineHeight: "inherit",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "16px",
      color: "#282828",
    };

    const errorStyle = {
      width: "70%",
      marginLeft: "30%",
      fontSize: "12px",
      marginTop: "-21px",
      color: "#d4351c",
    };

    return (
      <React.Fragment>
        <LabelFieldPair style={{ alignItems: "center", display: "block", marginBottom: "1rem" }}>
          <CardLabel className="card-label-smaller" style={labelStyle}>
            {t("Select Assessment Year")} <span style={{ color: "#d4351c" }}>*</span>
          </CardLabel>
          <div className="field">
            <Dropdown
              option={years}
              selected={selectedYear}
              select={handleChange}
              optionKey="name"
              placeholder={t("Select")}
              style={{ width: "300px" }}
            />
          </div>
        </LabelFieldPair>
        {error ? <CardLabelError style={errorStyle}>{error}</CardLabelError> : null}
      </React.Fragment>
    );
  }

  return null;
};

export default PTSelectAssessmentYears;
