

// import React, { useEffect, useState } from "react";

// const PropertyDetailsTableSection = ({ t, unit, handleUnitChange, addUnit, styles, formErrors }) => {
//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   const stateId = Digit.ULBService.getStateId();

//   const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
//   const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
//   const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
//   const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};
//   console.log("OccupancyDatabbMenuP", Menu)

//   const [usageTypes, setUsageTypes] = useState([]);
//   const [constructionTypes, setConstructionTypes] = useState([]);
//   const [floorList, setFloorList] = useState([]);
//   const [occupancyTypes, setOccupancyTypes] = useState([]);
//   const currentYear = new Date().getFullYear();
//   const startYear = 2000;

//   const years = Array.from({ length: currentYear - startYear + 6 }, (_, i) => {
//     const from = startYear + i;
//     const to = (from + 1).toString().slice(2);
//     return {
//       label: `${from}-${to}`,   // what user sees and what is stored
//       value: `${from}-${to}`,
//     };
//   });




//   useEffect(() => {
//     if (!isLoading && Menu?.PropertyTax?.UsageCategoryMajor) {
//       const usagecat = Menu.PropertyTax.UsageCategoryMajor;
//       const filtered = usagecat
//         ?.filter((e) => e?.code)
//         ?.map((item) => ({
//           i18nKey: item.name,
//           code: item.code,
//         }));
//       setUsageTypes(filtered);
//     }
//   }, [isLoading, Menu]);

//   useEffect(() => {
//     if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
//       const constructionCat = MenuP.PropertyTax.ConstructionType;
//       const filtered = constructionCat
//         ?.filter((e) => e?.code)
//         ?.map((item) => ({
//           i18nKey: item.name,
//           code: item.code,
//         }));
//       setConstructionTypes(filtered);
//     }
//   }, [isLoadings, MenuP]);

//   useEffect(() => {
//     if (!isLoadingF && FloorAll?.PropertyTax?.Floor) {
//       const floorData = FloorAll.PropertyTax.Floor;
//       const mappedFloors = floorData
//         ?.filter((f) => f?.code && f?.active)
//         ?.map((floor) => ({
//           i18nKey: floor.name,
//           code: floor.code,
//         }));
//       setFloorList(mappedFloors);
//     }
//   }, [isLoadingF, FloorAll]);

//   // 🆕 OccupancyType mapping
//   useEffect(() => {
//     if (!isLoadingO && OccupancyData?.PropertyTax?.OccupancyType) {
//       const occupancyList = OccupancyData.PropertyTax.OccupancyType;
//       const filtered = occupancyList
//         ?.filter((item) => item.active)
//         ?.map((item) => ({
//           i18nKey: item.name,
//           code: item.code,
//         }));
//       setOccupancyTypes(filtered);
//     }
//   }, [isLoadingO, OccupancyData]);

//   console.log("OccupancyData", OccupancyData)
//   console.log("occupancyTypes", occupancyTypes)
//   return (
//     <div style={{ marginTop: "1rem" }}>
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//         <label style={styles.poppinsLabel}>Property Type</label>
//         {/* <input style={styles.input} value={application?.propertyType || "Prefilled"} readOnly /> */}
//       </div>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.tableHeader}>{t("Usage Type")}</th>
//             <th style={styles.tableHeader}>{t("Usage Factor")}</th>
//             <th style={styles.tableHeader}>{t("Floor No")}</th>
//             <th style={styles.tableHeader}>{t("Type of Construction")}</th>
//             <th style={styles.tableHeader}>{t("Area (Sq feet)")}</th>
//             <th style={styles.tableHeader}>{t("From Year")}</th>
//             <th style={styles.tableHeader}>{t("To Year")}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {unit.map((unit, index) => (
//             <tr key={index}>
//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select,
//                     appearance: "auto", // enables the native arrow
//                     WebkitAppearance: "auto", // for Safari/Chrome
//                     MozAppearance: "auto", // for Firefox
//                   }}
//                   value={unit.usageType}
//                   onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
//                 >
//                   <option value="" disabled>{t("Select")}</option>
//                   {usageTypes.map((item) => (
//                     <option key={item.code} value={item.code}>
//                       {t(item.i18nKey)}
//                     </option>
//                   ))}
//                 </select>
//               </td>


//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select,
//                     appearance: "auto", // enables the native arrow
//                     WebkitAppearance: "auto", // for Safari/Chrome
//                     MozAppearance: "auto", // for Firefox
//                   }}
//                   value={unit.usageFactor}
//                   onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
//                 >
//                   <option value="" disabled>{t("Select")}</option>
//                   {occupancyTypes.map((item) => (
//                     <option key={item.code} value={item.code}>
//                       {t(item.i18nKey)}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select,
//                     appearance: "auto", // enables the native arrow
//                     WebkitAppearance: "auto", // for Safari/Chrome
//                     MozAppearance: "auto", // for Firefox
//                   }}
//                   value={unit.floorNo}
//                   onChange={(e) => handleUnitChange(index, "floorNo", e.target.value)}
//                 >
//                   <option value="" disabled>{t("Select")}</option>
//                   {floorList.map((floor) => (
//                     <option key={floor.code} value={floor.code}>
//                       {t(floor.i18nKey)}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select,
//                     appearance: "auto", // enables the native arrow
//                     WebkitAppearance: "auto", // for Safari/Chrome
//                     MozAppearance: "auto", // for Firefox
//                   }}
//                   value={unit.constructionType}
//                   onChange={(e) => handleUnitChange(index, "constructionType", e.target.value)}
//                 >
//                   <option value="" disabled>{t("Select")}</option>
//                   {constructionTypes.map((item) => (
//                     <option key={item.code} value={item.code}>
//                       {t(item.i18nKey)}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               {/* 🆕 OccupancyType select */}


//               <td style={styles.tableCell}>
//                 <input
//                   type="number"
//                   style={{
//                     ...styles.select,
//                     appearance: "auto", // enables the native arrow
//                     WebkitAppearance: "auto", // for Safari/Chrome
//                     MozAppearance: "auto", // for Firefox
//                   }}
//                   placeholder={t("Enter")}
//                   value={unit.area}
//                   onChange={(e) => handleUnitChange(index, "area", e.target.value)}
//                 />
//               </td>
//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select,
//                     appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
//                   }}
//                   value={unit.fromYear || ""}
//                   onChange={(e) => {
//                     const selectedFrom = e.target.value;
//                     handleUnitChange(index, "fromYear", selectedFrom);

//                     // Reset toYear if it's less than new fromYear
//                     const fromBaseYear = parseInt(selectedFrom.split("-")[0]);
//                     const toBaseYear = unit.toYear ? parseInt(unit.toYear.split("-")[0]) : null;

//                     if (toBaseYear && fromBaseYear > toBaseYear) {
//                       handleUnitChange(index, "toYear", "");
//                     }
//                   }}
//                 >
//                   <option value="" disabled>{t("From Year")}</option>
//                   {years.map((yearObj) => (
//                     <option key={yearObj.value} value={yearObj.value}>
//                       {yearObj.label}
//                     </option>
//                   ))}
//                 </select>
//               </td>


//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select,
//                     appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
//                   }}
//                   value={unit.toYear || ""}
//                   onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
//                   disabled={!unit.fromYear}
//                 >
//                   <option value="" disabled>{t("To Year")}</option>
//                   {years
//                     .filter((yearObj) => {
//                       const fromYearBase = parseInt(unit.fromYear?.split("-")[0] || startYear);
//                       const thisYearBase = parseInt(yearObj.value.split("-")[0]);
//                       return thisYearBase >= fromYearBase;
//                     })
//                     .map((yearObj) => (
//                       <option key={yearObj.value} value={yearObj.value}>
//                         {yearObj.label}
//                       </option>
//                     ))}
//                 </select>
//               </td>


//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {formErrors.totalUnitArea && (

//         <p style={{ color: "red", fontSize: "14px", padding: "4px 8px", textAlign: "right" }}>
//           {formErrors.totalUnitArea}
//         </p>

//       )}
//       <div style={{ textAlign: "right", marginTop: "0.5rem", width: "80%" }}>
//         <a href="#" style={styles.addMoreLink} onClick={(e) => { e.preventDefault(); addUnit(); }}>
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

  const { data: Menu = {}, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
  const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
  const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
  console.log("FloorAll", FloorAll)
  const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};

  const [usageTypes, setUsageTypes] = useState([]);
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);

  const startYear = 1997;
  const currentFY = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;

  const years = Array.from({ length: currentFY - startYear + 1 }, (_, i) => {
    const from = startYear + i;
    const to = (from + 1).toString().slice(2);
    return {
      label: `${from}-${to}`,
      value: `${from}-${to}`,
    };
  });

  const currentFYString = `${currentFY}-${(currentFY + 1).toString().slice(2)}`;

  useEffect(() => {
    if (!isLoading && Menu?.PropertyTax?.UsageCategoryMajor) {
      const usagecat = Menu.PropertyTax.UsageCategoryMajor;
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

  // useEffect(() => {
  //   if (!isLoadingF && FloorAll?.PropertyTax?.Floor) {
  //     const floorData = FloorAll.PropertyTax.Floor;
  //     const mappedFloors = floorData
  //       ?.filter((f) => f?.code && f?.active)
  //       ?.map((floor) => ({
  //         i18nKey: floor.name,
  //         code: floor.code,
  //       }));
  //     setFloorList(mappedFloors);
  //   }
  // }, [isLoadingF, FloorAll]);
  useEffect(() => {
  if (isLoadingF) return;

  const floors = FloorAll?.PropertyTax?.Floor || [];

  const mappedFloors = floors
    .filter(floor => floor?.code && floor?.active)
    .map(floor => ({
      i18nKey: floor.name,
      code: floor.code,
    }))
    .sort((a, b) => {
      const getSortValue = (val) => {
        const num = parseInt(val, 10);
        return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
      };
      return getSortValue(b.code) - getSortValue(a.code);
    });

  setFloorList(mappedFloors);
}, [isLoadingF, FloorAll]);


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

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <label style={styles.poppinsLabel}>Property Type</label>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>{t("Usage Type")}</th>
            <th style={styles.tableHeader}>{t("Usage Factor")}</th>
            <th style={styles.tableHeader}>{t("Floor No")}</th>
            <th style={styles.tableHeader}>{t("Type of Construction")}</th>
            <th style={styles.tableHeader}>{t("Area (Sq feet)")}</th>
            <th style={styles.tableHeader}>{t("From Year")}</th>
            <th style={styles.tableHeader}>{t("To Year")}</th>
          </tr>
        </thead>
        <tbody>
          {unit.map((unit, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>
                <select
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
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
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
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
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
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
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
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

              <td style={styles.tableCell}>
                <input
                  type="number"
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
                  placeholder={t("Enter")}
                  value={unit.area}
                  onChange={(e) => handleUnitChange(index, "area", e.target.value)}
                />
              </td>

              <td style={styles.tableCell}>
                <select
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
                  value={unit.fromYear || ""}
                  onChange={(e) => {
                    const selectedFrom = e.target.value;
                    handleUnitChange(index, "fromYear", selectedFrom);
                    if (unit.toYear && parseInt(unit.toYear.split("-")[0]) < parseInt(selectedFrom.split("-")[0])) {
                      handleUnitChange(index, "toYear", "");
                    }
                  }}
                >
                  <option value="" disabled>{t("From Year")}</option>
                  {years.map((yearObj) => (
                    <option key={yearObj.value} value={yearObj.value}>
                      {yearObj.label}
                    </option>
                  ))}
                </select>
              </td>

              <td style={styles.tableCell}>
                <select
                  style={{
                    ...styles.select, appearance: "auto",
                    WebkitAppearance: "auto",
                    MozAppearance: "auto",
                  }}
                  value={unit.toYear || ""}
                  onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
                  disabled={!unit.fromYear}
                >
                  <option value="" disabled>{t("To Year")}</option>
                  <option value={currentFYString}>{currentFYString}</option>
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

      <div style={{ textAlign: "right", marginTop: "0.5rem"}}>
        <a href="#" style={styles.addMoreLink} onClick={(e) => { e.preventDefault(); addUnit(); }}>
          {t("Add more")}
        </a>
      </div>
    </div>
  );
};

export default PropertyDetailsTableSection;
