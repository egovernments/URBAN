import React from "react";
import { CardLabel } from "@egovernments/digit-ui-react-components";

const PropertyDetailsTableSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const unit = formData?.propertyDetailsTable || {};

  const handleChange = (key, value) => {
    const updated = { ...unit, [key]: value };
    onSelect(config.key, updated);
  };

  if (userType !== "employee") return null;

  const styles = {

    table: {
      borderCollapse: "collapse",
      width: "100%"
    },
    tableHeader: {
      textAlign: "left",
      padding: "8px",
      border: "1px solid #ccc",
      background: "#B9B9B9",
      color: "#00000066"
    },
    tableCell: {
      padding: "8px",
      border: "1px solid #ccc"
    },
    select: {
      width: "100%",
      padding: "6px 8px",
      borderRadius: "4px",
      outline: "none",
      boxShadow: "none",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundColor: "white",
      fontSize: "14px",
      fontFamily: "inherit",
      cursor: "pointer",
    },
    addMoreLink: {
      color: "purple",
      textDecoration: "underline",
      fontSize: "0.9rem"
    },

    assessmentStyle: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0',
      textDecoration: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: '#6B133F',
      textDecorationThickness: '1px',
      textDecorationOffset: '2px',
      color: '#6B133F',
      marginBottom: '20px'
    },
  
 
 

  };
  return (

    <div>
      <div style={styles.assessmentStyle}>{t("Property Details")}</div>
      <div style={{ marginTop: "1rem" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>{t("Usage type")}</th>
              <th style={styles.tableHeader}>{t("Usage factor")}</th>
              <th style={styles.tableHeader}>{t("Floor no")}</th>
              <th style={styles.tableHeader}>{t("Type of construction")}</th>
              <th style={styles.tableHeader}>{t("Area")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.usageType || ""}
                  onChange={(e) => handleChange("usageType", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.usageFactor || ""}
                  onChange={(e) => handleChange("usageFactor", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                  <option value="LOW">Low</option>
                  <option value="HIGH">High</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.floorNo || ""}
                  onChange={(e) => handleChange("floorNo", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                  <option value="G">Ground</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.constructionType || ""}
                  onChange={(e) => handleChange("constructionType", e.target.value)}
                >
                  <option value="" >{t("Select")}</option>
                  <option value="PUCCA">Pucca</option>
                  <option value="KUTCHA">Kutcha</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <input
                  type="number"
                  style={styles.select}
                  placeholder="Enter"
                  value={unit.area || ""}
                  
                  onChange={(e) => handleChange("area", e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>


        <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
          <a href="#" style={styles.addMoreLink}>
            {t("Add more")}
          </a>
        </div>
      </div>
    </div>

  );
};

export default PropertyDetailsTableSection;
