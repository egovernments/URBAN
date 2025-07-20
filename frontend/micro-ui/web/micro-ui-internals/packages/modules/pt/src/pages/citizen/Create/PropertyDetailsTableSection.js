import React, { useEffect, useState } from "react";

const PropertyDetailsTableSection = ({ t, unit, handleUnitChange,styles,formErrors }) => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategory") || {};
  const [usageTypes, setUsageTypes] = useState([]);

  useEffect(() => {
    if (!isLoading && Menu?.PropertyTax?.UsageCategory) {
      const usagecat = Menu.PropertyTax.UsageCategory;
      const filtered = usagecat
        ?.filter((e) => e?.code.split(".").length <= 2 && e.code !== "NONRESIDENTIAL")
        ?.map((item) => {
          const arr = item?.code.split(".");
          if (arr.length === 2)
            return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + arr[1], code: item?.code };
          else
            return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + item?.code, code: item?.code };
        });
      setUsageTypes(filtered);
    }
  }, [isLoading]);

  return (
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
            value={unit.usageType}
            onChange={(e) => handleUnitChange("usageType", e.target.value)}
            disabled
          >
            <option value="" disabled>{t("Select")}</option>
            {usageTypes.map((item) => (
              <option key={item.code} value={item.code}>
                {t(item.i18nKey)}
              </option>
            ))}
          </select>
        </td>
        <td style={styles.tableCell}>
          <select
            style={styles.select}
            value={unit.usageFactor}
            onChange={(e) => handleUnitChange("usageFactor", e.target.value)}
            disabled
          >
            <option value="" disabled>{t("Select")}</option>
            <option value="LOW">{t("Low")}</option>
            <option value="HIGH">{t("High")}</option>
          </select>
        </td>
        <td style={styles.tableCell}>
          <select
            style={styles.select}
            value={unit.floorNo}
            onChange={(e) => handleUnitChange("floorNo", e.target.value)}
            disabled
          >
            <option value="" disabled>{t("Select")}</option>
            <option value="G">{t("Ground")}</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </td>
        <td style={styles.tableCell}>
          <select
            style={styles.select}
            value={unit.constructionType}
            onChange={(e) => handleUnitChange("constructionType", e.target.value)}
            disabled
          >
            <option value="" disabled>{t("Select")}</option>
            <option value="PUCCA">{t("Pucca")}</option>
            <option value="KUTCHA">{t("Kutcha")}</option>
          </select>
        </td>
        <td style={styles.tableCell}>
          <input
            type="number"
            style={styles.select}
            placeholder={t("Enter")}
            value={unit.area}
            onChange={(e) => handleUnitChange("area", e.target.value)}
            disabled
          />
        </td>
      </tr>
    </tbody>
  </table>

  <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{
        ...styles.addMoreLink,
        pointerEvents: "none",
        color: "#999",
        textDecoration: "none",
        cursor: "not-allowed"
      }}
    >
      {t("Add more")}
    </a>
  </div>
</div>

  );
};

export default PropertyDetailsTableSection;



