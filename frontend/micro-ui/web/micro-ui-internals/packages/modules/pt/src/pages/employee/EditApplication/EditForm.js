// import { FormComposer, Loader } from "@egovernments/digit-ui-react-components";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory, useLocation } from "react-router-dom";
// import { newConfig } from "../../../config/Create/config";

// const EditForm = ({ applicationData }) => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   const { state } = useLocation();
//   const [canSubmit, setSubmitValve] = useState(false);
//   const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
//   const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
//   const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");

//   useEffect(() => {
//     setMutationHappened(false);
//     clearSuccessData();
//   }, []);

//   const defaultValues = {
//     originalData: applicationData,
//     address: applicationData?.address,
//     owners: applicationData?.owners.map((owner) => ({
//       ...owner,
//       ownerType: { code: owner.ownerType, i18nKey: owner.ownerType },
//       relationship: { code: owner.relationship, i18nKey: `PT_FORM3_${owner.relationship}` },
//       gender: {
//         code: owner.gender,
//         i18nKey: `PT_FORM3_${owner.gender}`,
//         value: owner.gender,
//       },
//     })),
//   };
//   sessionStorage.setItem("PropertyInitials",JSON.stringify(defaultValues?.originalData));

//   const onFormValueChange = (setValue, formData, formState) => {
//     if(Object.keys(formState.errors).length==1 && formState.errors.documents)
//     setSubmitValve(true);
//     else 
//     setSubmitValve(!Object.keys(formState.errors).length);
//   };

//   const onSubmit = (data) => {
//     const formData = {
//       ...applicationData,
//       address: {
//         ...applicationData?.address,
//         ...data?.address,
//         city: data?.address?.city?.name,
//       },
//       propertyType: data?.PropertyType?.code,
//       creationReason: state?.workflow?.businessService === "PT.UPDATE" || (applicationData?.documents == null )  ? "UPDATE" : applicationData?.creationReason,
//       usageCategory: data?.usageCategoryMinor?.subuagecode ? data?.usageCategoryMinor?.subuagecode : data?.usageCategoryMajor?.code,
//       usageCategoryMajor: data?.usageCategoryMajor?.code.split(".")[0],
//       usageCategoryMinor: data?.usageCategoryMajor?.code.split(".")[1] || null,
//       noOfFloors: Number(data?.noOfFloors),
//       landArea: Number(data?.landarea),
//       superBuiltUpArea: Number(data?.landarea),
//       source: "MUNICIPAL_RECORDS", // required
//       channel: "CFC_COUNTER", // required
//       documents: applicationData?.documents ? applicationData?.documents.map((old) => {
//         let dt = old.documentType.split(".");
//         let newDoc = data?.documents?.documents?.find((e) => e.documentType.includes(dt[0] + "." + dt[1]));
//         return { ...old, ...newDoc };
//       }):data?.documents?.documents.length > 0 ? data?.documents?.documents : null,
//       units: [
//         ...(applicationData?.units?.map((old) => ({ ...old, active: false })) || []),
//         ...(data?.units?.map((unit) => {
//           return { ...unit, active: true };
//         }) || []),
//       ],
//       workflow: state?.workflow,
//       applicationStatus: "UPDATE",
//     };
//     if (state?.workflow?.action === "OPEN") {
//       formData.units = formData.units.filter((unit) => unit.active);
//     }
//     history.push("/digit-ui/employee/pt/response", { Property: formData, key: "UPDATE", action: "SUBMIT" });
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   /* use newConfig instead of commonFields for local development in case needed */

//   const configs = commonFields ? commonFields : newConfig;

//   return (
//     <FormComposer
//       heading={t("PT_UPDATE_PROPERTY")}
//       isDisabled={!canSubmit}
//       label={t("ES_COMMON_APPLICATION_SUBMIT")}
//       config={configs.map((config) => {
//         return {
//           ...config,
//           body: [
//             ...config.body.filter((a) => !a.hideInEmployee),
//             {
//               withoutLabel: true,
//               type: "custom",
//               populators: {
//                 name: "originalData",
//                 component: (props, customProps) => <React.Fragment />,
//               },
//             },
//           ],
//         };
//       })}
//       fieldStyle={{ marginRight: 0 }}
//       onSubmit={onSubmit}
//       defaultValues={defaultValues}
//       onFormValueChange={onFormValueChange}
//     />
//   );
// };

// export default EditForm;



// import { FormComposer, Loader } from "@egovernments/digit-ui-react-components";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory, useLocation } from "react-router-dom";
// import { newConfig } from "../../../config/Create/config";

// const EditForm = ({ applicationData }) => {
//   const [boundaryData, setBoundaryData] = useState(null);
//   const [zones, setZones] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [colonies, setColonies] = useState([]);
//   const [rateZones, setRateZones] = useState([]);
//   const [propertyAddress, setPropertyAddress] = useState({
//     colony: "",
//     ward: "",
//     zone: "",
//   });

//   const [correspondenceAddress, setCorrespondenceAddress] = useState({
//     address: "",
//     sameAsProperty: false,
//   });

//   const [assessmentDetails, setAssessmentDetails] = useState({
//     rateZone: "",
//     roadFactor: "",
//     oldPropertyId: "",
//     plotArea: "",
//   });

//   const [propertyDetails, setPropertyDetails] = useState([
//     {
//       usageType: "",
//       usageFactor: "",
//       floorNumber: "",
//       constructionType: "",
//       area: "",
//       fromYear: "",
//       toYear: "",
//     },
//   ]);

//   const [otherDetails, setOtherDetails] = useState({
//     exemption: "",
//     mobileTower: false,
//     bondRoad: false,
//     advertisement: false,
//   });

//   const [selfDeclaration, setSelfDeclaration] = useState(true);
//   const { t } = useTranslation();
//   const history = useHistory();
//   const { state } = useLocation();
//   const [canSubmit, setSubmitValve] = useState(false);
//   const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
//   const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
//   const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
//    const stateId = Digit.ULBService.getStateId();

//     const { data: Menu = {}, isLoadingm } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
//     const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
//     const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
//     const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};

//     const [usageTypes, setUsageTypes] = useState([]);
//     const [constructionTypes, setConstructionTypes] = useState([]);
//     const [floorList, setFloorList] = useState([]);
//     const [occupancyTypes, setOccupancyTypes] = useState([]);

//     const startYear = 1997;
//     const currentFY = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;

//     const years = Array.from({ length: currentFY - startYear + 1 }, (_, i) => {
//       const from = startYear + i;
//       const to = (from + 1).toString().slice(2);
//       return {
//         label: `${from}-${to}`,
//         value: `${from}-${to}`,
//       };
//     });

//     const currentFYString = `${currentFY}-${(currentFY + 1).toString().slice(2)}`;

//     useEffect(() => {
//       if (!isLoadingm && Menu?.PropertyTax?.UsageCategoryMajor) {
//         const usagecat = Menu.PropertyTax.UsageCategoryMajor;
//         const filtered = usagecat
//           ?.filter((e) => e?.code)
//           ?.map((item) => ({
//             i18nKey: item.name,
//             code: item.code,
//           }));
//         setUsageTypes(filtered);
//       }
//     }, [isLoadingm, Menu]);

//     useEffect(() => {
//       if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
//         const constructionCat = MenuP.PropertyTax.ConstructionType;
//         const filtered = constructionCat
//           ?.filter((e) => e?.code)
//           ?.map((item) => ({
//             i18nKey: item.name,
//             code: item.code,
//           }));
//         setConstructionTypes(filtered);
//       }
//     }, [isLoadings, MenuP]);

//     // useEffect(() => {
//     //   if (!isLoadingF && FloorAll?.PropertyTax?.Floor) {
//     //     const floorData = FloorAll.PropertyTax.Floor;
//     //     const mappedFloors = floorData
//     //       ?.filter((f) => f?.code && f?.active)
//     //       ?.map((floor) => ({
//     //         i18nKey: floor.name,
//     //         code: floor.code,
//     //       }));
//     //     setFloorList(mappedFloors);
//     //   }
//     // }, [isLoadingF, FloorAll]);
//     useEffect(() => {
//     if (isLoadingF) return;

//     const floors = FloorAll?.PropertyTax?.Floor || [];

//     const mappedFloors = floors
//       .filter(floor => floor?.code && floor?.active)
//       .map(floor => ({
//         i18nKey: floor.name,
//         code: floor.code,
//       }))
//       .sort((a, b) => {
//         const getSortValue = (val) => {
//           const num = parseInt(val, 10);
//           return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
//         };
//         return getSortValue(b.code) - getSortValue(a.code);
//       });

//     setFloorList(mappedFloors);
//   }, [isLoadingF, FloorAll]);


//     useEffect(() => {
//       if (!isLoadingO && OccupancyData?.PropertyTax?.OccupancyType) {
//         const occupancyList = OccupancyData.PropertyTax.OccupancyType;
//         const filtered = occupancyList
//           ?.filter((item) => item.active)
//           ?.map((item) => ({
//             i18nKey: item.name,
//             code: item.code,
//           }));
//         setOccupancyTypes(filtered);
//       }
//     }, [isLoadingO, OccupancyData]);


//   useEffect(() => {
//     (async () => {
//       try {
//         const tenantId = Digit.ULBService.getCurrentTenantId();
//         const response = await Digit.LocationService.getRevenueLocalities(tenantId);
//         const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];

//         if (cityBoundary?.children?.length > 0) {
//           setBoundaryData(cityBoundary);

//           const zoneOptions = cityBoundary.children.map((zone) => ({
//             code: zone.code,
//             name: zone.name || zone.code,
//           }));
//           setZones(zoneOptions);
//         }
//       } catch (error) {
//         console.error("Error fetching boundary data:", error);
//       }
//     })();
//   }, []);
//   // Zone -> Ward
//   useEffect(() => {
//     if (propertyAddress.zone && boundaryData?.children?.length > 0) {
//       const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
//       const wardList = selectedZone?.children || [];
//       const formattedWards = wardList.map((ward) => ({
//         code: ward.code,
//         name: ward.name || ward.code,
//       }));
//       setWards(formattedWards);
//     } else {
//       setWards([]);
//     }
//   }, [propertyAddress.zone, boundaryData]);

//   // Ward -> Colony
//   useEffect(() => {
//     if (propertyAddress.zone && propertyAddress.ward && boundaryData?.children?.length > 0) {
//       const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
//       const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
//       const colonyList = selectedWard?.children || [];
//       const formattedColonies = colonyList.map((col) => ({
//         code: col.code,
//         name: col.name || col.code,
//       }));
//       setColonies(formattedColonies);
//     } else {
//       setColonies([]);
//     }
//   }, [propertyAddress.ward, propertyAddress.zone, boundaryData]);

//   // Colony -> Rate Zone (auto-set)
//   useEffect(() => {
//     if (propertyAddress.zone && propertyAddress.ward && propertyAddress.colony && boundaryData?.children?.length > 0) {
//       const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
//       const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
//       const selectedColony = selectedWard?.children?.find((c) => c.code === propertyAddress.colony);
//       const rateZoneList = selectedColony?.children || [];
//       const formattedRateZones = rateZoneList.map((rz) => ({
//         code: rz.code,
//         name: rz.name || rz.code,
//       }));
//       setRateZones(formattedRateZones);

//       // 👇 Set rate zone name in assessmentDetails
//       if (formattedRateZones.length > 0) {
//         setAssessmentDetails((prev) => ({
//           ...prev,
//           rateZone: formattedRateZones[0].name,
//         }));
//       } else {
//         setAssessmentDetails((prev) => ({
//           ...prev,
//           rateZone: "",
//         }));
//       }
//     } else {
//       setRateZones([]);
//       setAssessmentDetails((prev) => ({
//         ...prev,
//         rateZone: "",
//       }));
//     }
//   }, [propertyAddress.colony, propertyAddress.ward, propertyAddress.zone, boundaryData]);


//   useEffect(() => {
//     setMutationHappened(false);
//     clearSuccessData();
//   }, []);

//   const defaultValues = {
//     originalData: applicationData,
//     address: applicationData?.address,
//     owners: applicationData?.owners.map((owner) => ({
//       ...owner,
//       ownerType: { code: owner.ownerType, i18nKey: owner.ownerType },
//       relationship: { code: owner.relationship, i18nKey: `PT_FORM3_${owner.relationship}` },
//       gender: {
//         code: owner.gender,
//         i18nKey: `PT_FORM3_${owner.gender}`,
//         value: owner.gender,
//       },
//     })),
//   };
//   sessionStorage.setItem("PropertyInitials", JSON.stringify(defaultValues?.originalData));

//   const onFormValueChange = (setValue, formData, formState) => {
//     if (Object.keys(formState.errors).length == 1 && formState.errors.documents)
//       setSubmitValve(true);
//     else
//       setSubmitValve(!Object.keys(formState.errors).length);
//   };

//   const onSubmit = (data) => {
//     const formData = {
//       ...applicationData,
//       address: {
//         ...applicationData?.address,
//         ...data?.address,
//         city: data?.address?.city?.name,
//       },
//       propertyType: data?.PropertyType?.code,
//       creationReason: state?.workflow?.businessService === "PT.UPDATE" || (applicationData?.documents == null) ? "UPDATE" : applicationData?.creationReason,
//       usageCategory: data?.usageCategoryMinor?.subuagecode ? data?.usageCategoryMinor?.subuagecode : data?.usageCategoryMajor?.code,
//       usageCategoryMajor: data?.usageCategoryMajor?.code.split(".")[0],
//       usageCategoryMinor: data?.usageCategoryMajor?.code.split(".")[1] || null,
//       noOfFloors: Number(data?.noOfFloors),
//       landArea: Number(data?.landarea),
//       superBuiltUpArea: Number(data?.landarea),
//       source: "MUNICIPAL_RECORDS", // required
//       channel: "CFC_COUNTER", // required
//       documents: applicationData?.documents ? applicationData?.documents.map((old) => {
//         let dt = old.documentType.split(".");
//         let newDoc = data?.documents?.documents?.find((e) => e.documentType.includes(dt[0] + "." + dt[1]));
//         return { ...old, ...newDoc };
//       }) : data?.documents?.documents.length > 0 ? data?.documents?.documents : null,
//       units: [
//         ...(applicationData?.units?.map((old) => ({ ...old, active: false })) || []),
//         ...(data?.units?.map((unit) => {
//           return { ...unit, active: true };
//         }) || []),
//       ],
//       workflow: state?.workflow,
//       applicationStatus: "UPDATE",
//     };
//     if (state?.workflow?.action === "OPEN") {
//       formData.units = formData.units.filter((unit) => unit.active);
//     }
//     history.push("/digit-ui/employee/pt/response", { Property: formData, key: "UPDATE", action: "SUBMIT" });
//   };




//   if (isLoading) {
//     return <Loader />;
//   }

//   /* use newConfig instead of commonFields for local development in case needed */

//   const configs = commonFields ? commonFields : newConfig;

//   return (

//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       {/* Property Address */}
//       <div style={sectionSty}>
//         <div style={sectionStyle}>Property Address</div>
//         <div style={gridStyle}>
//           <div>
//             <label style={labelStyle}>Zone</label>
//             <select
//               style={inputStyle}
//               value={propertyAddress.zone}
//               onChange={(e) => setPropertyAddress({ zone: e.target.value, ward: "", colony: "" })}
//             >
//               <option>Select</option>
//               {zones.map((zone) => (
//                 <option key={zone.code} value={zone.code}>{zone.name}</option>
//               ))}
//             </select>

//           </div>
//           <div>
//             <label style={labelStyle}>Ward *</label>
//             <select
//               style={inputStyle}
//               value={propertyAddress.ward}
//               onChange={(e) => setPropertyAddress({ ...propertyAddress, ward: e.target.value, colony: "" })}
//             >
//               <option>Select</option>
//               {wards.map((ward) => (
//                 <option key={ward.code} value={ward.code}>{ward.name}</option>
//               ))}
//             </select>

//           </div>
//           <div>
//             <label style={labelStyle}>Colony *</label>
//             <select
//               style={inputStyle}
//               value={propertyAddress.colony}
//               onChange={(e) => setPropertyAddress({ ...propertyAddress, colony: e.target.value })}
//             >
//               <option>Select</option>
//               {colonies.map((colony) => (
//                 <option key={colony.code} value={colony.code}>{colony.name}</option>
//               ))}
//             </select>

//           </div>
//         </div>
//       </div>

//       {/* Correspondence Address */}
//       <div style={sectionSty}>
//         <div style={sectionStyle}>Correspondence Address</div>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
//           <textarea
//             style={{ ...inputStyle, flex: 1 }}
//             placeholder="Enter"
//             value={correspondenceAddress.address}
//             onChange={(e) => setCorrespondenceAddress({ ...correspondenceAddress, address: e.target.value })}
//           />
//           <label>
//             <input
//               type="checkbox"
//               style={checkboxStyle}
//               checked={correspondenceAddress.sameAsProperty}
//               onChange={(e) =>
//                 setCorrespondenceAddress({ ...correspondenceAddress, sameAsProperty: e.target.checked })
//               }
//             />{" "}
//             Same as Property Address
//           </label>
//         </div>
//       </div>

//       {/* Assessment Details */}
//       <div style={sectionSty}>
//         <div style={sectionStyle}>Assessment Details</div>
//         <div style={gridStyle}>
//           <div>
//             <label style={labelStyle}>Rate Zone *</label>
//             <input
//               style={inputStyle}
//               placeholder="Auto fetched"
//               disabled
//               value={assessmentDetails.rateZone}
//             />
//           </div>
//           <div>
//             <label style={labelStyle}>Road Factor *</label>
//             <select
//               style={inputStyle}
//               value={assessmentDetails.roadFactor}
//               onChange={(e) => setAssessmentDetails({ ...assessmentDetails, roadFactor: e.target.value })}
//             >
//               <option>Select</option>
//             </select>
//           </div>
//           <div>
//             <label style={labelStyle}>Old Property ID</label>
//             <input
//               style={inputStyle}
//               placeholder="Enter"
//               value={assessmentDetails.oldPropertyId}
//               onChange={(e) => setAssessmentDetails({ ...assessmentDetails, oldPropertyId: e.target.value })}
//             />
//           </div>
//           <div>
//             <label style={labelStyle}>Plot Area (Sq feet) *</label>
//             <input
//               style={inputStyle}
//               placeholder="Enter"
//               value={assessmentDetails.plotArea}
//               onChange={(e) => setAssessmentDetails({ ...assessmentDetails, plotArea: e.target.value })}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Property Details Table */}
//       <div style={sectionSty}>
//         <div style={sectionStyle}>Property Details</div>
//         <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#6B133F66", textAlign: "left" }}>
//               <th style={cellHeaderStyle}>Usage Type</th>
//               <th style={cellHeaderStyle}>Usage Factor</th>
//               <th style={cellHeaderStyle}>Floor Number</th>
//               <th style={cellHeaderStyle}>Type of Construction</th>
//               <th style={cellHeaderStyle}>Area (Sq feet)</th>
//               <th style={cellHeaderStyle}>From Year</th>
//               <th style={cellHeaderStyle}>To Year</th>
//             </tr>
//           </thead>
//           <tbody>
//             {propertyDetails.map((item, index) => (
//              <tr key={index}>
//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
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
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
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
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
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
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
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

//               <td style={styles.tableCell}>
//                 <input
//                   type="number"
//                   style={{
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
//                   }}
//                   placeholder={t("Enter")}
//                   value={unit.area}
//                   onChange={(e) => handleUnitChange(index, "area", e.target.value)}
//                 />
//               </td>

//               <td style={styles.tableCell}>
//                 <select
//                   style={{
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
//                   }}
//                   value={unit.fromYear || ""}
//                   onChange={(e) => {
//                     const selectedFrom = e.target.value;
//                     handleUnitChange(index, "fromYear", selectedFrom);
//                     if (unit.toYear && parseInt(unit.toYear.split("-")[0]) < parseInt(selectedFrom.split("-")[0])) {
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
//                     ...styles.select, appearance: "auto",
//                     WebkitAppearance: "auto",
//                     MozAppearance: "auto",
//                   }}
//                   value={unit.toYear || ""}
//                   onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
//                   disabled={!unit.fromYear}
//                 >
//                   <option value="" disabled>{t("To Year")}</option>
//                   <option value={currentFYString}>{currentFYString}</option>
//                 </select>
//               </td>
//             </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Other Details */}
//       <div style={sectionSty}>
//         <div style={sectionStyle}>Other Details</div>
//         <div style={{ marginBottom: "20px" }}>
//           <label style={labelStyle}>Exemption Applicable</label>
//           <select
//             style={{ ...inputStyle, width: "30%" }}
//             value={otherDetails.exemption}
//             onChange={(e) => setOtherDetails({ ...otherDetails, exemption: e.target.value })}
//           >
//             <option>Select</option>
//           </select>
//           <div style={{ marginTop: "10px" }}>
//             <label>
//               <input
//                 type="checkbox"
//                 style={checkboxStyle}
//                 checked={otherDetails.mobileTower}
//                 onChange={(e) => setOtherDetails({ ...otherDetails, mobileTower: e.target.checked })}
//               />{" "}
//               Mobile Tower
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 style={checkboxStyle}
//                 checked={otherDetails.bondRoad}
//                 onChange={(e) => setOtherDetails({ ...otherDetails, bondRoad: e.target.checked })}
//               />{" "}
//               Bond Road
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 style={checkboxStyle}
//                 checked={otherDetails.advertisement}
//                 onChange={(e) => setOtherDetails({ ...otherDetails, advertisement: e.target.checked })}
//               />{" "}
//               Advertisement
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Self Declaration */}
//       <div style={sectionSty}>
//         <div style={sectionStyle}>Self Declaration</div>
//         <div style={{ margin: "15px 0" }}>
//           <label>
//             <input
//               type="checkbox"
//               defaultChecked
//               style={checkboxStyle}
//               checked={selfDeclaration}
//               onChange={(e) => setSelfDeclaration(e.target.checked)}
//             />
//             <span>
//               मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।
//             </span>
//           </label>
//         </div>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={onSubmit}
//             style={{
//               padding: "10px 30px",
//               backgroundColor: "#6B133F",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontWeight: "bold",
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const sectionSty = {
//   boxShadow: "0px 4px 4px 0px #0000000A",
//   backgroundColor: "#FFFFFF",
//   borderRadius: "10px",
//   padding: "10px",
//   marginBottom: "15px"

// }
// const cellHeaderStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   fontWeight: "bold",
//   fontSize: "14px",
// };

// const cellStyle = {
//   // padding: "10px",
//   border: "1px solid #ccc",
// };


// const sectionStyle = {
//   backgroundColor: "#6B133F",
//   padding: "10px",
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: "16px",
//   marginBottom: "20px",
//   textAlign: "center"
// };

// const labelStyle = {
//   display: "block",
//   marginBottom: "5px",
//   fontWeight: "500",
//   fontSize: "14px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "8px",
//   marginBottom: "15px",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
// };
// const inputStyleStyle = {
//   width: "100%",
//   padding: "8px",
//   // marginBottom: "15px",
//   // border: "1px solid #ccc",
//   borderRadius: "4px",
// };
// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr 1fr",
//   gap: "20px",
//   marginBottom: "20px",
// };

// const checkboxStyle = {
//   marginRight: "10px",
// };
// export default EditForm;




import { FormComposer, Loader } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { newConfig } from "../../../config/Create/config";

const EditForm = ({ applicationData }) => {
  console.log("applicationData", applicationData)
  const { t } = useTranslation();
  const history = useHistory();
  const { state } = useLocation();

  // Boundary Data
  const [boundaryData, setBoundaryData] = useState(null);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [colonies, setColonies] = useState([]);
  const [rateZones, setRateZones] = useState([]);

  // Form States
  const [propertyAddress, setPropertyAddress] = useState({
    zone: "",
    ward: "",
    colony: "",
  });
  const [correspondenceAddress, setCorrespondenceAddress] = useState({
    address: "",
    sameAsProperty: false,
  });
  const [assessmentDetails, setAssessmentDetails] = useState({
    rateZone: "",
    roadFactor: "",
    oldPropertyId: "",
    plotArea: "",
  });
  const [propertyDetails, setPropertyDetails] = useState([
    {
      usageType: "",
      usageFactor: "",
      floorNumber: "",
      constructionType: "",
      area: "",
      fromYear: "",
      toYear: "",
    },
  ]);
  const [otherDetails, setOtherDetails] = useState({
    exemption: "",
    mobileTower: false,
    bondRoad: false,
    advertisement: false,
  });
  const [selfDeclaration, setSelfDeclaration] = useState(true);
  const [canSubmit, setSubmitValve] = useState(false);

  // MDMS Data
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
  const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
  const stateId = Digit.ULBService.getStateId();

  const { data: Menu = {}, isLoadingm } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
  const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
  const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
  const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};

  // Dropdown Options
  const [usageTypes, setUsageTypes] = useState([]);
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);

  // Year calculations
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
  const normalizeRoadFactor = (value) => {
    if (!value) return "";
    // Handle different possible formats
    const mappings = {
      'mainroad': 'main',
      'main': 'main',
      'secondaryroad': 'secondary',
      'secondary': 'secondary',
      'internalroad': 'internal',
      'internal': 'internal'
    };
    const lowerValue = value.toLowerCase();
    return mappings[lowerValue] || "";
  };

  useEffect(() => {
    if (applicationData) {
      // Property Address
      setPropertyAddress({
        zone: applicationData.address?.zone || "",
        ward: applicationData.address?.ward || "",
        colony: applicationData.address?.locality?.code || "",
      });

      // Correspondence Address
      setCorrespondenceAddress({
        address: applicationData.address?.street || "",
        sameAsProperty: false, // Default to false, adjust as needed
      });

      // Assessment Details
      setAssessmentDetails({
        rateZone: applicationData.units?.[0]?.rateZone || "",
        roadFactor: normalizeRoadFactor(applicationData.units?.[0]?.roadFactor) || "",
        oldPropertyId: applicationData.oldPropertyId || "",
        plotArea: applicationData.landArea?.toString() || "",
      });

      // Property Details
      if (applicationData.units && applicationData.units.length > 0) {
        const unit = applicationData.units[0];
        setPropertyDetails([
          {
            usageType: unit.usageCategory || "",
            usageFactor: "", // Not in the data, adjust as needed
            floorNumber: unit.floorNo?.toString() || "",
            constructionType: unit.constructionDetail?.constructionType || "",
            area: unit.constructionDetail?.builtUpArea?.toString() || "",
            fromYear: unit.fromYear || "",
            toYear: unit.toYear || "",
          },
        ]);
      }

      // Other Details
      setOtherDetails({
        exemption: "", // Not in the data, adjust as needed
        mobileTower: applicationData.additionalDetails?.mobileTower || false,
        bondRoad: applicationData.additionalDetails?.bondRoad || false,
        advertisement: applicationData.additionalDetails?.advertisement || false,
      });
    }
  }, [applicationData]);
  // Fetch boundary data
  useEffect(() => {
    (async () => {
      try {
        const tenantId = Digit.ULBService.getCurrentTenantId();
        const response = await Digit.LocationService.getRevenueLocalities(tenantId);
        const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];

        if (cityBoundary?.children?.length > 0) {
          setBoundaryData(cityBoundary);
          const zoneOptions = cityBoundary.children.map((zone) => ({
            code: zone.code,
            name: zone.name || zone.code,
          }));
          setZones(zoneOptions);
        }
      } catch (error) {
        console.error("Error fetching boundary data:", error);
      }
    })();
  }, []);

  // Zone -> Ward
  useEffect(() => {
    if (propertyAddress.zone && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
      const wardList = selectedZone?.children || [];
      const formattedWards = wardList.map((ward) => ({
        code: ward.code,
        name: ward.name || ward.code,
      }));
      setWards(formattedWards);
    } else {
      setWards([]);
    }
  }, [propertyAddress.zone, boundaryData]);

  // Ward -> Colony
  useEffect(() => {
    if (propertyAddress.zone && propertyAddress.ward && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
      const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
      const colonyList = selectedWard?.children || [];
      const formattedColonies = colonyList.map((col) => ({
        code: col.code,
        name: col.name || col.code,
      }));
      setColonies(formattedColonies);
    } else {
      setColonies([]);
    }
  }, [propertyAddress.ward, propertyAddress.zone, boundaryData]);

  // Colony -> Rate Zone (auto-set)
  useEffect(() => {
    if (propertyAddress.zone && propertyAddress.ward && propertyAddress.colony && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
      const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
      const selectedColony = selectedWard?.children?.find((c) => c.code === propertyAddress.colony);
      const rateZoneList = selectedColony?.children || [];
      const formattedRateZones = rateZoneList.map((rz) => ({
        code: rz.code,
        name: rz.name || rz.code,
      }));
      setRateZones(formattedRateZones);

      if (formattedRateZones.length > 0) {
        setAssessmentDetails((prev) => ({
          ...prev,
          rateZone: formattedRateZones[0].name,
        }));
      } else {
        setAssessmentDetails((prev) => ({
          ...prev,
          rateZone: "",
        }));
      }
    } else {
      setRateZones([]);
      setAssessmentDetails((prev) => ({
        ...prev,
        rateZone: "",
      }));
    }
  }, [propertyAddress.colony, propertyAddress.ward, propertyAddress.zone, boundaryData]);

  // MDMS Data Effects
  useEffect(() => {
    if (!isLoadingm && Menu?.PropertyTax?.UsageCategoryMajor) {
      const usagecat = Menu.PropertyTax.UsageCategoryMajor;
      const filtered = usagecat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setUsageTypes(filtered);
    }
  }, [isLoadingm, Menu]);

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

  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
  }, []);

  const defaultValues = {
    originalData: applicationData,
    address: applicationData?.address,
    owners: applicationData?.owners.map((owner) => ({
      ...owner,
      ownerType: { code: owner.ownerType, i18nKey: owner.ownerType },
      relationship: { code: owner.relationship, i18nKey: `PT_FORM3_${owner.relationship}` },
      gender: {
        code: owner.gender,
        i18nKey: `PT_FORM3_${owner.gender}`,
        value: owner.gender,
      },
    })),
  };
  console.log("defaultValues", defaultValues)
  sessionStorage.setItem("PropertyInitials", JSON.stringify(defaultValues?.originalData));

  const handleUnitChange = (index, field, value) => {
    const updatedDetails = [...propertyDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value
    };
    setPropertyDetails(updatedDetails);
  };

  const addPropertyDetailRow = () => {
    setPropertyDetails([
      ...propertyDetails,
      {
        usageType: "",
        usageFactor: "",
        floorNumber: "",
        constructionType: "",
        area: "",
        fromYear: "",
        toYear: "",
      }
    ]);
  };

  const removePropertyDetailRow = (index) => {
    if (propertyDetails.length > 1) {
      const updatedDetails = [...propertyDetails];
      updatedDetails.splice(index, 1);
      setPropertyDetails(updatedDetails);
    }
  };

  const onFormValueChange = (setValue, formData, formState) => {
    if (Object.keys(formState.errors).length == 1 && formState.errors.documents)
      setSubmitValve(true);
    else
      setSubmitValve(!Object.keys(formState.errors).length);
  };


  const onSubmit = (data) => {
    console.log("data,", data)
    const formData = {
      ...applicationData,
      address: {
        ...applicationData?.address,
        ...data?.address,
        city: data?.address?.city?.name,
        //       zone: propertyAddress.zone,
        //       ward: propertyAddress.ward,
        //       locality: propertyAddress.colony,
        locality: {
          code: propertyAddress.colony || "SUN02",
          name: propertyAddress.colony || "map with zone",
        },
        zone: propertyAddress.zone || "SUN02",
        ward: propertyAddress.ward || "1",
      },
      ownerType: otherDetails.exemption,
      isCorrespondenceAddress: correspondenceAddress?.sameAsProperty,
      oldPropertyId: assessmentDetails?.oldPropertyId,
      propertyType: data?.PropertyType?.code,
      creationReason: state?.workflow?.businessService === "PT.UPDATE" || (applicationData?.documents == null) ? "UPDATE" : applicationData?.creationReason,
      usageCategory: data?.usageCategoryMinor?.subuagecode ? data?.usageCategoryMinor?.subuagecode : data?.usageCategoryMajor?.code,
      usageCategoryMajor: data?.usageCategoryMajor?.code.split(".")[0],
      usageCategoryMinor: data?.usageCategoryMajor?.code.split(".")[1] || null,
      noOfFloors: Number(data?.noOfFloors),
      landArea: Number(data?.landarea),
      superBuiltUpArea: Number(data?.landarea),
      source: "MUNICIPAL_RECORDS", // required
      channel: "CFC_COUNTER", // required
      additionalDetails: {
        mobileTower: otherDetails?.mobileTower || false,
        bondRoad: otherDetails?.bondRoad || false,
        advertisement: otherDetails?.advertisement || false,
      },
      documents: applicationData?.documents ? applicationData?.documents.map((old) => {
        let dt = old.documentType.split(".");
        let newDoc = data?.documents?.documents?.find((e) => e.documentType.includes(dt[0] + "." + dt[1]));
        return { ...old, ...newDoc };
      }) : data?.documents?.documents.length > 0 ? data?.documents?.documents : null,
      // units: [
      //   ...(applicationData?.units?.map((old) => ({ ...old, active: false })) || []),
      //   ...(data?.units?.map((unit) => {
      //     return { ...unit, active: true };
      //   }) || []),
      // ],
      units: propertyDetails.map(unit => (
        {
          usageCategory: unit.usageType || "RESIDENTIAL",
          usesCategoryMajor: unit.usageType || "RESIDENTIAL",
          occupancyType: unit.usageFactor || "SELFOCCUPIED",
          constructionDetail: {
            builtUpArea: unit.area || "3000",
            constructionType: unit.constructionType || null,
          },
          floorNo: parseInt(unit.floorNo) || 0,
          rateZone: assessmentDetails?.rateZone || "",
          roadFactor: assessmentDetails?.roadFactor || "",
          fromYear: unit.fromYear,
          toYear: unit.toYear,
        })),
      unit: propertyDetails.map(unit => (
        {
          usageCategory: unit.usageType || "RESIDENTIAL",
          usesCategoryMajor: unit.usageType || "RESIDENTIAL",
          occupancyType: unit.usageFactor || "SELFOCCUPIED",
          constructionDetail: {
            builtUpArea: unit.area || "3000",
            constructionType: unit.constructionType || null,
          },
          floorNo: parseInt(unit.floorNo) || 0,
          rateZone: assessmentDetails?.rateZone || "",
          roadFactor: assessmentDetails?.roadFactor || "",
          fromYear: unit.fromYear,
          toYear: unit.toYear,
        })),
      landArea: assessmentDetails.plotArea,
      workflow: state?.workflow,
      applicationStatus: "UPDATE",
    };
    if (state?.workflow?.action === "OPEN") {
      formData.units = formData.units.filter((unit) => unit.active);
    }
    history.push("/digit-ui/employee/pt/response", { Property: formData, key: "UPDATE", action: "SUBMIT" });
  };

  if (isLoading) {
    return <Loader />;
  }

  const configs = commonFields ? commonFields : newConfig;

  // Styles
  const styles = {
    sectionSty: {
      boxShadow: "0px 4px 4px 0px #0000000A",
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
      padding: "10px",
      marginBottom: "15px"
    },
    sectionStyle: {
      backgroundColor: "#6B133F",
      padding: "10px",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "20px",
      textAlign: "center"
    },
    gridStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(266px, 1fr))",
      gap: "20px",
      marginBottom: "20px",
    },
    labelStyle: {
      fontFamily: "Noto Sans",
      fontWeight: 400,
      fontStyle: "normal", // "Regular" is not valid; use "normal"
      fontSize: "16px",
      lineHeight: "100%",  // Or use a unitless number like 1 for better scaling
      letterSpacing: "0px",
    },
    inputStyle: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    checkboxStyle: {
      marginRight: "8px",
      verticalAlign: "middle",
    },

    cellHeaderStyle: {
       padding: "10px 0px",
      textAlign:"center",
      border: "1px solid #6B133F66",
      fontWeight: "bold",
      fontSize: "14px",
      width: "220px"
    },

    tableCell: {
      // padding: "10px",
      border: "1px solid #6B133F66",
    },
    select: {
      width: "100%",
      padding: "8px",
      // border: "1px solid #ddd",
      borderRadius: "4px",
    },
    actionButton: {
      padding: "6px 12px",
      margin: "0 4px",
      backgroundColor: "#6B133F",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    submitButton: {
      padding: "10px 30px",
      backgroundColor: "#6B133F",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Property Address */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Property Address")}</div>
        <div style={styles.gridStyle}>
          <div>
            <label style={styles.labelStyle}>{t("Zone")} <span style={{color:"red"}}>*</span></label>
            <select
              style={styles.inputStyle}
              value={propertyAddress.zone}
              onChange={(e) => setPropertyAddress({ zone: e.target.value, ward: "", colony: "" })}
            >
              <option value="">{t("Select")}</option>
              {zones.map((zone) => (
                <option key={zone.code} value={zone.code}>{zone.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.labelStyle}>{t("Ward")}<span style={{color:"red"}}>*</span></label>
            <select
              style={styles.inputStyle}
              value={propertyAddress.ward}
              onChange={(e) => setPropertyAddress({ ...propertyAddress, ward: e.target.value, colony: "" })}
              disabled={!propertyAddress.zone}
            >
              <option value="">{t("Select")}</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>{ward.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.labelStyle}>{t("Colony")}<span style={{color:"red"}}>*</span></label>
            <select
              style={styles.inputStyle}
              value={propertyAddress?.colony}
              onChange={(e) => setPropertyAddress({ ...propertyAddress, colony: e.target.value })}
              disabled={!propertyAddress.ward}
            >
              <option value="">{t("Select")}</option>
              {colonies.map((colony) => (
                <option key={colony.code} value={colony.code}>{colony.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Correspondence Address */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Correspondence Address")}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <textarea
            style={{ ...styles.inputStyle, flex: 1, minHeight: "80px" }}
            placeholder={t("Enter address")}
            value={correspondenceAddress.address}
            onChange={(e) => setCorrespondenceAddress({ ...correspondenceAddress, address: e.target.value })}
            disabled={correspondenceAddress.sameAsProperty}
          />
          <label>
            <input
              type="checkbox"
              style={styles.checkboxStyle}
              checked={correspondenceAddress.sameAsProperty}
              onChange={(e) =>
                setCorrespondenceAddress({
                  ...correspondenceAddress,
                  sameAsProperty: e.target.checked,
                  address: e.target.checked ? "Same as property address" : ""
                })
              }
            />
            {t("Same as Property Address")}
          </label>
        </div>
      </div>

      {/* Assessment Details */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Assessment Details")}</div>
        <div style={styles.gridStyle}>
          <div>
            <label style={styles.labelStyle}>{t("Rate Zone")}<span style={{color:"red"}}>*</span></label>
            <input
              style={styles.inputStyle}
              placeholder={t("Auto fetched")}
              disabled
              value={assessmentDetails.rateZone}
            />
          </div>
          <div>
            <label style={styles.labelStyle}>{t("Road Factor")}<span style={{color:"red"}}>*</span></label>
            <select
              style={styles.inputStyle}
              value={assessmentDetails.roadFactor}
              onChange={(e) => setAssessmentDetails({ ...assessmentDetails, roadFactor: e.target.value })}
            >
              <option value="">{t("Select")}</option>
              <option value="main">{t("Main Road")}</option>
              <option value="secondary">{t("Secondary Road")}</option>
              <option value="internal">{t("Internal Road")}</option>
            </select>
          </div>
          <div>
            <label style={styles.labelStyle}>{t("Old Property ID")}</label>
            <input
              style={styles.inputStyle}
              placeholder={t("Enter old ID")}
              value={assessmentDetails.oldPropertyId}
              onChange={(e) => setAssessmentDetails({ ...assessmentDetails, oldPropertyId: e.target.value })}
            />
          </div>
          <div>
            <label style={styles.labelStyle}>{t("Plot Area (Sq feet)")}<span style={{color:"red"}}>*</span></label>
            <input
              style={styles.inputStyle}
              type="number"
              placeholder={t("Enter area")}
              value={assessmentDetails.plotArea}
              onChange={(e) => setAssessmentDetails({ ...assessmentDetails, plotArea: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Property Details Table */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Property Details")}</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <thead>
              <tr style={{ backgroundColor: "#6B133F66", textAlign: "left" }}>
                <th style={styles.cellHeaderStyle}>{t("Usage Type")}</th>
                <th style={styles.cellHeaderStyle}>{t("Usage Factor")}</th>
                <th style={styles.cellHeaderStyle}>{t("Floor Number")}</th>
                <th style={styles.cellHeaderStyle}>{t("Type of Construction")}</th>
                <th style={styles.cellHeaderStyle}>{t("Area (Sq feet)")}</th>
                <th style={styles.cellHeaderStyle}>{t("From Year")}</th>
                <th style={styles.cellHeaderStyle}>{t("To Year")}</th>
                <th style={styles.cellHeaderStyle}>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {propertyDetails.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>
                    <select
                      style={styles.select}
                      value={item.usageType}
                      onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {usageTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {t(type.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      style={styles.select}
                      value={item.usageFactor}
                      onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {occupancyTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {t(type.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      style={styles.select}
                      value={item.floorNumber}
                      onChange={(e) => handleUnitChange(index, "floorNumber", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
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
                      value={item.constructionType}
                      onChange={(e) => handleUnitChange(index, "constructionType", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {constructionTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {t(type.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="number"
                      style={styles.select}
                      placeholder={t("Enter area")}
                      value={item.area}
                      onChange={(e) => handleUnitChange(index, "area", e.target.value)}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      style={styles.select}
                      value={item.fromYear}
                      onChange={(e) => {
                        handleUnitChange(index, "fromYear", e.target.value);
                        if (item.toYear && parseInt(item.toYear.split("-")[0]) < parseInt(e.target.value.split("-")[0])) {
                          handleUnitChange(index, "toYear", "");
                        }
                      }}
                    >
                      <option value="">{t("From Year")}</option>
                      {years.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      style={styles.select}
                      value={item.toYear}
                      onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
                      disabled={!item.fromYear}
                    >
                      <option value="">{t("To Year")}</option>
                      {item.fromYear && (
                        <option value={currentFYString}>{currentFYString}</option>
                      )}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.actionButton}
                      onClick={() => removePropertyDetailRow(index)}
                      disabled={propertyDetails.length <= 1}
                    >
                      {t("Remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          style={styles.actionButton}
          onClick={addPropertyDetailRow}
        >
          {t("Add Row")}
        </button>
      </div>

      {/* Other Details */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Other Details")}</div>
        <label style={styles.labelStyle}>{t("Exemption Applicable")}</label>
        <div style={{ marginBottom: "20px" }}>

          <select
            style={{ ...styles.inputStyle, width: "30%" }}
            value={otherDetails.exemption}
            onChange={(e) => setOtherDetails({ ...otherDetails, exemption: e.target.value })}
          >
            <option value="">{t("Select")}</option>
            <option value="yes">{t("Yes")}</option>
            <option value="no">{t("No")}</option>
          </select>
          <div style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "15px" }}>
              <input
                type="checkbox"
                style={styles.checkboxStyle}
                checked={otherDetails.mobileTower}
                onChange={(e) => setOtherDetails({ ...otherDetails, mobileTower: e.target.checked })}
              />
              {t("Mobile Tower")}
            </label>
            <label style={{ marginRight: "15px" }}>
              <input
                type="checkbox"
                style={styles.checkboxStyle}
                checked={otherDetails.bondRoad}
                onChange={(e) => setOtherDetails({ ...otherDetails, bondRoad: e.target.checked })}
              />
              {t("Bond Road")}
            </label>
            <label>
              <input
                type="checkbox"
                style={styles.checkboxStyle}
                checked={otherDetails.advertisement}
                onChange={(e) => setOtherDetails({ ...otherDetails, advertisement: e.target.checked })}
              />
              {t("Advertisement")}
            </label>
          </div>
        </div>
      </div>

      {/* Self Declaration */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Self Declaration")}</div>
        <div style={{ margin: "15px 0" }}>
          <label>
            <input
              type="checkbox"
              style={styles.checkboxStyle}
              checked={selfDeclaration}
              onChange={(e) => setSelfDeclaration(e.target.checked)}
            />
            <span>
              मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।</span>
          </label>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={onSubmit}
            // disabled={!canSubmit}
            style={styles.submitButton}
          >
            {t("Submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;