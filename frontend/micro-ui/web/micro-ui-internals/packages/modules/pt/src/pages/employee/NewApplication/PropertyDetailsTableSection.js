



// import React, { useEffect, useState } from "react";

// const PropertyDetailsTableSection = ({ t, unit, handleUnitChange, styles, formErrors }) => {
//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   const stateId = Digit.ULBService.getStateId();

//   const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategory") || {};
//   console.log("dafsdgdfgdfdsta", Menu)
//   const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
//   const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
//   // const { data: OwnerTypeAll = {}, isLoadingT } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType") || {};
//   console.log("FloorAll", FloorAll);
//   const [usageTypes, setUsageTypes] = useState([]);
//   const [constructionTypes, setConstructionTypes] = useState([]);

//   useEffect(() => {
//     if (!isLoading && Menu?.PropertyTax?.UsageCategory) {
//       const usagecat = Menu.PropertyTax.UsageCategory;
//       const filtered = usagecat
//         ?.filter((e) => e?.code) // optionally add any filtering logic here
//         ?.map((item) => {
//           // const arr = item?.code.split(".");
//           // if (arr.length === 2)
//           //   return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + arr[1], code: item?.code };
//           // else
//           return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + item?.code, code: item?.code };
//         });
//       setUsageTypes(filtered);
//     }
//   }, [isLoading, Menu]);

//   useEffect(() => {
//     if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
//       const constructionCat = MenuP.PropertyTax.ConstructionType;
//       const filtered = constructionCat
//         ?.filter((e) => e?.code) // optionally add any filtering logic here
//         ?.map((item) => {
//           // map to i18nKey similarly
//           return { i18nKey: "PROPERTYTAX_BILLING_SLAB_" + item.code, code: item.code };
//         });
//       setConstructionTypes(filtered);
//     }
//   }, [isLoadings, MenuP]);

//   return (
//     <div style={{ marginTop: "1rem" }}>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.tableHeader}>{t("Usage type")}</th>
//             <th style={styles.tableHeader}>{t("Usage factor")}</th>
//             <th style={styles.tableHeader}>{t("Floor no")}</th>
//             <th style={styles.tableHeader}>{t("Type of construction")}</th>
//             <th style={styles.tableHeader}>{t("Area")}</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={styles.tableCell}>
//               <select
//                 style={styles.select}
//                 value={unit.usageType}
//                 onChange={(e) => handleUnitChange("usageType", e.target.value)}
//               >
//                 <option value="" disabled>{t("Select")}</option>
//                 {usageTypes.map((item) => (
//                   <option key={item.code} value={item.code}>
//                     {t(item.i18nKey)}
//                   </option>
//                 ))}
//               </select>
//             </td>
//             <td style={styles.tableCell}>
//               <select
//                 style={styles.select}
//                 value={unit.usageFactor}
//                 onChange={(e) => handleUnitChange("usageFactor", e.target.value)}
//               >
//                 <option value="" disabled>{t("Select")}</option>
//                 <option value="SELFOCCUPIED">{t("SELFOCCUPIED")}</option>
//                 <option value="HIGH">{t("High")}</option>
//               </select>
//             </td>
//             <td style={styles.tableCell}>
//               <select
//                 style={styles.select}
//                 value={unit.floorNo}
//                 onChange={(e) => handleUnitChange("floorNo", e.target.value)}
//               >
//                 <option value="" disabled>{t("Select")}</option>
//                 <option value="0">{t("Ground")}</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//               </select>
//             </td>
//             <td style={styles.tableCell}>
//               <select
//                 style={styles.select}
//                 value={unit.constructionType}
//                 onChange={(e) => handleUnitChange("constructionType", e.target.value)}
//               >
//                 <option value="" disabled>{t("Select")}</option>
//                 {constructionTypes.map((item) => (
//                   <option key={item.code} value={item.code}>
//                     {t(item.i18nKey)}
//                   </option>
//                 ))}
//               </select>
//             </td>
//             <td style={styles.tableCell}>
//               <input
//                 type="number"
//                 style={styles.select}
//                 placeholder={t("Enter")}
//                 value={unit.area}
//                 onChange={(e) => handleUnitChange("area", e.target.value)}
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
//         <a href="#" style={styles.addMoreLink}>
//           {t("Add more")}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetailsTableSection;

import React, { useEffect, useState } from "react";

const PropertyDetailsTableSection = ({ t, unit, handleUnitChange, addUnit, styles, formErrors }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();

  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategory") || {};
  const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
  const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
  const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};
  console.log("OccupancyDatabbMenuP", MenuP)

  const [usageTypes, setUsageTypes] = useState([]);
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);

  useEffect(() => {
    if (!isLoading && Menu?.PropertyTax?.UsageCategory) {
      const usagecat = Menu.PropertyTax.UsageCategory;
      const filtered = usagecat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setUsageTypes(filtered);
    }
  }, [isLoading, Menu]);

  useEffect(() => {
    if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
      const constructionCat = MenuP.PropertyTax.ConstructionType;
      const filtered = constructionCat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setConstructionTypes(filtered);
    }
  }, [isLoadings, MenuP]);

  useEffect(() => {
    if (!isLoadingF && FloorAll?.PropertyTax?.Floor) {
      const floorData = FloorAll.PropertyTax.Floor;
      const mappedFloors = floorData
        ?.filter((f) => f?.code && f?.active)
        ?.map((floor) => ({
          i18nKey: floor.name,
          code: floor.code,
        }));
      setFloorList(mappedFloors);
    }
  }, [isLoadingF, FloorAll]);

  // 🆕 OccupancyType mapping
  useEffect(() => {
    if (!isLoadingO && OccupancyData?.PropertyTax?.OccupancyType) {
      const occupancyList = OccupancyData.PropertyTax.OccupancyType;
      const filtered = occupancyList
        ?.filter((item) => item.active)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setOccupancyTypes(filtered);
    }
  }, [isLoadingO, OccupancyData]);

  console.log("OccupancyData", OccupancyData)
  console.log("occupancyTypes", occupancyTypes)
  return (
    <div style={{ marginTop: "1rem" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>{t("Usage Type")}</th>
            <th style={styles.tableHeader}>{t("Usage Factor")}</th>
            <th style={styles.tableHeader}>{t("Floor No")}</th>
            <th style={styles.tableHeader}>{t("Type of Construction")}</th>
            <th style={styles.tableHeader}>{t("Area")}</th>
            <th style={styles.tableHeader}>{t("From Year")}</th>
            <th style={styles.tableHeader}>{t("To Year")}</th>
          </tr>
        </thead>
        <tbody>
          {unit.map((unit, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.usageType}
                  onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
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
                  onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                  {occupancyTypes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {t(item.i18nKey)}
                    </option>
                  ))}
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.floorNo}
                  onChange={(e) => handleUnitChange(index, "floorNo", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                  {floorList.map((floor) => (
                    <option key={floor.code} value={floor.code}>
                      {t(floor.i18nKey)}
                    </option>
                  ))}
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={unit.constructionType}
                  onChange={(e) => handleUnitChange(index, "constructionType", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                  {constructionTypes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {t(item.i18nKey)}
                    </option>
                  ))}
                </select>
              </td>
              {/* 🆕 OccupancyType select */}


              <td style={styles.tableCell}>
                <input
                  type="number"
                  style={styles.select}
                  placeholder={t("Enter")}
                  value={unit.area}
                  onChange={(e) => handleUnitChange(index, "area", e.target.value)}
                />
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value="select"
                // onChange={(e) => handleUnitChange(index, "floorNo", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                    <option value="Select" >{t("Select")}</option>
                  {/* {floorList.map((floor) => (
                    <option key={floor.code} value={floor.code}>
                      {t(floor.i18nKey)}
                    </option>
                  ))} */}
                </select>
              </td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value="select"
                // onChange={(e) => handleUnitChange(index, "floorNo", e.target.value)}
                >
                  <option value="" disabled>{t("Select")}</option>
                   <option value="Select" >{t("Select")}</option>
                  {/* {floorList.map((floor) => (
                    <option key={floor.code} value={floor.code}>
                      {t(floor.i18nKey)}
                    </option>
                  ))} */}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formErrors.totalUnitArea && (

        <p style={{ color: "red", fontSize: "14px", padding: "4px 8px", textAlign: "right" }}>
          {formErrors.totalUnitArea}
        </p>

      )}
      <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
        <a href="#" style={styles.addMoreLink} onClick={(e) => { e.preventDefault(); addUnit(); }}>
          {t("Add more")}
        </a>
      </div>
    </div>
  );
};

export default PropertyDetailsTableSection;
