// import {
//   BreakLine,
//   Card,
//   CardSectionHeader,
//   CardSubHeader,
//   CheckPoint,
//   ConnectingCheckPoints,
//   Loader,
//   Row,
//   StatusTable,
// } from "@egovernments/digit-ui-react-components";
// import { values } from "lodash";
// import React, { Fragment } from "react";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import BPADocuments from "./BPADocuments";
// import InspectionReport from "./InspectionReport";
// import NOCDocuments from "./NOCDocuments";
// import PermissionCheck from "./PermissionCheck";
// import PropertyDocuments from "./PropertyDocuments";
// import PropertyEstimates from "./PropertyEstimates";
// import PropertyFloors from "./PropertyFloors";
// import PropertyOwners from "./PropertyOwners";
// import ScruntinyDetails from "./ScruntinyDetails";
// import SubOccupancyTable from "./SubOccupancyTable";
// import TLCaption from "./TLCaption";
// import TLTradeAccessories from "./TLTradeAccessories";
// import TLTradeUnits from "./TLTradeUnits";
// import WSAdditonalDetails from "./WSAdditonalDetails";
// import WSFeeEstimation from "./WSFeeEstimation";
// // import WSInfoLabel from "../../../ws/src/pageComponents/WSInfoLabel";
// import DocumentsPreview from "./DocumentsPreview";
// import InfoDetails from "./InfoDetails";
// import ViewBreakup from"./ViewBreakup";

// function ApplicationDetailsContent({
//   applicationDetails,
//   workflowDetails,
//   isDataLoading,
//   applicationData,
//   businessService,
//   timelineStatusPrefix,
//   showTimeLine = true,
//   statusAttribute = "status",
//   paymentsList,
//   oldValue,
//   isInfoLabel = false
// }) {
//   const { t } = useTranslation();

//   function OpenImage(imageSource, index, thumbnailsToShow) {
//     window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
//   }

//   const convertEpochToDateDMY = (dateEpoch) => {
//     if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
//       return "NA";
//     }
//     const dateFromApi = new Date(dateEpoch);
//     let month = dateFromApi.getMonth() + 1;
//     let day = dateFromApi.getDate();
//     let year = dateFromApi.getFullYear();
//     month = (month > 9 ? "" : "0") + month;
//     day = (day > 9 ? "" : "0") + day;
//     return `${day}/${month}/${year}`;
//   };
//   const getTimelineCaptions = (checkpoint,index=0) => {
//     if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
//       const caption = {
//         date: checkpoint?.auditDetails?.created,
//         source: applicationData?.channel || "",
//       };
//       return <TLCaption data={caption} />;
//     } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/") || window.location.href.includes("/ws/")) {
//       //From BE side assigneeMobileNumber is masked/unmasked with connectionHoldersMobileNumber and not assigneeMobileNumber
//       const privacy = { uuid: checkpoint?.assignes?.[0]?.uuid, fieldName: "mobileNumber", model: "User",showValue: false,
//       loadData: {
//         serviceName: "/egov-workflow-v2/egov-wf/process/_search",
//         requestBody: {},
//         requestParam: { tenantId : applicationDetails?.tenantId, businessIds : applicationDetails?.applicationNo, history:true },
//         jsonPath: "ProcessInstances[0].assignes[0].mobileNumber",
//         isArray: false,
//         d: (res) => {
//           let resultstring = "";
//           resultstring = `+91 ${_.get(res,`ProcessInstances[${index}].assignes[0].mobileNumber`)}`;
//           return resultstring;
//         }
//       }, }
//       const caption = {
//         date: checkpoint?.auditDetails?.lastModified,
//         name: checkpoint?.assignes?.[0]?.name,
//         mobileNumber:applicationData?.processInstance?.assignes?.[0]?.uuid===checkpoint?.assignes?.[0]?.uuid && applicationData?.processInstance?.assignes?.[0]?.mobileNumber ? applicationData?.processInstance?.assignes?.[0]?.mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
//         comment: t(checkpoint?.comment),
//         wfComment: checkpoint.wfComment,
//         thumbnailsToShow: checkpoint?.thumbnailsToShow,
//       };
//       return <TLCaption data={caption} OpenImage={OpenImage} privacy={privacy} />;
//     } else {
//       const caption = {
//         date: checkpoint?.auditDetails?.lastModified,
//         // name: checkpoint?.assigner?.name,
//         name: checkpoint?.assignes?.[0]?.name,
//         // mobileNumber: checkpoint?.assigner?.mobileNumber,
//         wfComment: checkpoint?.wfComment,
//         mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
//       };
//       return <TLCaption data={caption} />;
//     }
//   };

//   const getTranslatedValues = (dataValue, isNotTranslated) => {
//     if (dataValue) {
//       return !isNotTranslated ? t(dataValue) : dataValue;
//     } else {
//       return t("NA");
//     }
//   };

//   const checkLocation =
//     window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
//   const isNocLocation = window.location.href.includes("employee/noc");
//   const isBPALocation = window.location.href.includes("employee/obps");
//   const isWS = window.location.href.includes("employee/ws");

//   const getRowStyles = () => {
//     if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
//       return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
//     } else if (checkLocation) {
//       return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
//     } else {
//       return {};
//     }
//   };

//   const getTableStyles = () => {
//     if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
//       return { position: "relative", marginTop: "19px" };
//     } else if (checkLocation) {
//       return { position: "relative", marginTop: "19px" };
//     } else {
//       return {};
//     }
//   };

//   const getMainDivStyles = () => {
//     if (
//       window.location.href.includes("employee/obps") ||
//       window.location.href.includes("employee/noc") ||
//       window.location.href.includes("employee/ws")
//     ) {
//       return { lineHeight: "19px", maxWidth: "950px", minWidth: "280px" };
//     } else if (checkLocation) {
//       return { lineHeight: "19px", maxWidth: "600px", minWidth: "280px" };
//     } else {
//       return {};
//     }
//   };

//   const getTextValue = (value) => {
//     if (value?.skip) return value.value;
//     else if (value?.isUnit) return value?.value ? `${getTranslatedValues(value?.value, value?.isNotTranslated)} ${t(value?.isUnit)}` : t("N/A");
//     else return value?.value ? getTranslatedValues(value?.value, value?.isNotTranslated) : t("N/A");
//   };

//   const getClickInfoDetails = () => {
//     if (window.location.href.includes("disconnection") || window.location.href.includes("application")) {
//       return "WS_DISCONNECTION_CLICK_ON_INFO_LABEL"
//     } else {
//       return "WS_CLICK_ON_INFO_LABEL"
//     }
//   }

//   const getClickInfoDetails1 = () => {
//     if (window.location.href.includes("disconnection") || window.location.href.includes("application")) {
//         return "WS_DISCONNECTION_CLICK_ON_INFO1_LABEL"
//     } else {
//         return ""
//     }
//   }
//   return (
//     <Card style={{ position: "relative" }} className={"employeeCard-override"}>
//       {/* For UM-4418 changes */}
//       { isInfoLabel ? <InfoDetails t={t} userType={false} infoBannerLabel={"CS_FILE_APPLICATION_INFO_LABEL"} infoClickLable={"WS_CLICK_ON_LABEL"} infoClickInfoLabel={getClickInfoDetails()} infoClickInfoLabel1={getClickInfoDetails1()} /> : null }
//       {applicationDetails?.applicationDetails?.map((detail, index) => (
//         <React.Fragment key={index}>
//           <div style={getMainDivStyles()}>
//             {index === 0 && !detail.asSectionHeader ? (
//               <CardSubHeader style={{ marginBottom: "16px", fontSize: "24px" }}>{t(detail.title)}</CardSubHeader>
//             ) : (
//               <React.Fragment>
//                 <CardSectionHeader
//                   style={
//                     index == 0 && checkLocation
//                       ? { marginBottom: "16px", fontSize: "24px" }
//                       : { marginBottom: "16px", marginTop: "32px", fontSize: "24px" }
//                   }
//                 >
//                   {isNocLocation ? `${t(detail.title)}` : t(detail.title)}
//                   {detail?.Component ? <detail.Component /> : null}
//                 </CardSectionHeader>
//               </React.Fragment>
//             )}
//             {/* TODO, Later will move to classes */}
//             {/* Here Render the table for adjustment amount details detail.isTable is true for that table*/}
//             {detail?.isTable && (
//               <table style={{ tableLayout: "fixed", width: "100%", borderCollapse: "collapse" }}>
//                 <tr style={{ textAlign: "left" }}>
//                   {detail?.headers.map((header) => (
//                     <th style={{ padding: "10px", paddingLeft:"0px" }}>{t(header)}</th>
//                   ))}
//                 </tr>

//                 {detail?.tableRows.map((row,index)=>{
//                 if(index===detail?.tableRows.length - 1){
//                   return <>
//                     <hr style={{ width: "370%",marginTop:"15px" }} className="underline" />
//                     <tr>
//                       {row.map(element => <td style={{ textAlign: "left" }}>{t(element)}</td>)}
//                     </tr>
//                     </>
//                 }
//                 return <tr>
//                   {row.map(element => <td style={{ paddingTop:"20px",textAlign:"left" }}>{t(element)}</td>)}
//                 </tr>})}
//               </table>
//             )}
//             <StatusTable style={getTableStyles()}>
//               {detail?.title &&
//                 !detail?.title.includes("NOC") &&
//                 detail?.values?.map((value, index) => {
//                   if (value.map === true && value.value !== "N/A") {
//                     return <Row labelStyle={{wordBreak: "break-all"}} textStyle={{wordBreak: "break-all"}} key={t(value.title)} label={t(value.title)} text={<img src={t(value.value)} alt="" privacy={value?.privacy} />} />;
//                   }
//                   if (value?.isLink == true) {
//                     return (
//                       <Row
//                         key={t(value.title)}
//                         label={
//                           window.location.href.includes("tl") || window.location.href.includes("ws") ? (
//                             <div style={{ width: "200%" }}>
//                               <Link to={value?.to}>
//                                 <span className="link" style={{ color: "#F47738" }}>
//                                   {t(value?.title)}
//                                 </span>
//                               </Link>
//                             </div>
//                           ) : isNocLocation || isBPALocation ? (
//                             `${t(value.title)}`
//                           ) : (
//                             t(value.title)
//                           )
//                         }
//                         text={
//                           <div>
//                             <Link to={value?.to}>
//                               <span className="link" style={{ color: "#F47738" }}>
//                                 {value?.value}
//                               </span>
//                             </Link>
//                           </div>
//                         }
//                         last={index === detail?.values?.length - 1}
//                         caption={value.caption}
//                         className="border-none"
//                         rowContainerStyle={getRowStyles()}
//                         labelStyle={{wordBreak: "break-all"}}
//                         textStyle={{wordBreak: "break-all"}}
//                       />
//                     );
//                   }
//                   return (
//                     <div>
//                       {window.location.href.includes("modify") ?  (
//                       <Row
//                         className="border-none"
//                         key={`${value.title}`}
//                         label={`${t(`${value.title}`)}`}
//                         privacy={value?.privacy}
//                         text={value?.oldValue ? value?.oldValue : value?.value ? value?.value : ""}
//                         labelStyle={{wordBreak: "break-all"}}
//                         textStyle={{wordBreak: "break-all"}}
//                       /> ) : (<Row
//                         key={t(value.title)}
//                         label={t(value.title)}
//                         text={getTextValue(value)}
//                         last={index === detail?.values?.length - 1}
//                         caption={value.caption}
//                         className="border-none"
//                         /* privacy object set to the Row Component */
//                         privacy={value?.privacy}
//                         // TODO, Later will move to classes
//                         rowContainerStyle={getRowStyles()}
//                         labelStyle={{wordBreak: "break-all"}}
//                         textStyle={{wordBreak: "break-all"}}
//                       />
//                     )}
//                     </div>
//                   )
//                 })}
//             </StatusTable>
//           </div>
//           {detail?.belowComponent && <detail.belowComponent />}
//           {detail?.additionalDetails?.inspectionReport && (
//             <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} paymentsList={paymentsList} />
//           )}
//           {applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending?.length > 0 && detail?.additionalDetails?.fiReport && (
//             <InspectionReport fiReport={applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending} />
//           )}
//           {/* {detail?.additionalDetails?.FIdocuments && detail?.additionalDetails?.values?.map((doc,index) => (
//             <div key={index}>
//             {doc.isNotDuplicate && <div> 
//              <StatusTable>
//              <Row label={t(doc?.documentType)}></Row>
//              <OBPSDocument value={detail?.additionalDetails?.values} Code={doc?.documentType} index={index}/> 
//              <hr style={{color:"#cccccc",backgroundColor:"#cccccc",height:"2px",marginTop:"20px",marginBottom:"20px"}}/>
//              </StatusTable>
//              </div>}
//              </div>
//           )) } */}
//           {detail?.additionalDetails?.floors && <PropertyFloors floors={detail?.additionalDetails?.floors} />}
//           {detail?.additionalDetails?.owners && <PropertyOwners owners={detail?.additionalDetails?.owners} />}
//           {detail?.additionalDetails?.units && <TLTradeUnits units={detail?.additionalDetails?.units} />}
//           {detail?.additionalDetails?.accessories && <TLTradeAccessories units={detail?.additionalDetails?.accessories} />}
//           {detail?.additionalDetails?.permissions && workflowDetails?.data?.nextActions?.length > 0 && (
//             <PermissionCheck applicationData={applicationDetails?.applicationData} t={t} permissions={detail?.additionalDetails?.permissions} />
//           )}
//           {detail?.additionalDetails?.obpsDocuments && (
//             <BPADocuments
//               t={t}
//               applicationData={applicationDetails?.applicationData}
//               docs={detail.additionalDetails.obpsDocuments}
//               bpaActionsDetails={workflowDetails}
//             />
//           )}
//           {detail?.additionalDetails?.noc && (
//             <NOCDocuments
//               t={t}
//               isNoc={true}
//               NOCdata={detail.values}
//               applicationData={applicationDetails?.applicationData}
//               docs={detail.additionalDetails.noc}
//               noc={detail.additionalDetails?.data}
//               bpaActionsDetails={workflowDetails}
//             />
//           )}
//           {detail?.additionalDetails?.scruntinyDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
//           {detail?.additionalDetails?.buildingExtractionDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
//           {detail?.additionalDetails?.subOccupancyTableDetails && (
//             <SubOccupancyTable edcrDetails={detail?.additionalDetails} applicationData={applicationDetails?.applicationData} />
//           )}
//           {detail?.additionalDetails?.documentsWithUrl && <DocumentsPreview documents={detail?.additionalDetails?.documentsWithUrl} />}
//           {detail?.additionalDetails?.documents && <PropertyDocuments documents={detail?.additionalDetails?.documents} />}
//           {detail?.additionalDetails?.taxHeadEstimatesCalculation && (
//             <PropertyEstimates taxHeadEstimatesCalculation={detail?.additionalDetails?.taxHeadEstimatesCalculation} />
//           )}
//           {detail?.isWaterConnectionDetails && <WSAdditonalDetails wsAdditionalDetails={detail} oldValue={oldValue} />}
//           {/* {detail?.isLabelShow ? <WSInfoLabel t={t} /> : null} */}
//           {detail?.additionalDetails?.redirectUrl && (
//             <div style={{ fontSize: "16px", lineHeight: "24px", fontWeight: "400", padding: "10px 0px" }}>
//               <Link to={detail?.additionalDetails?.redirectUrl?.url}>
//                 <span className="link" style={{ color: "#F47738" }}>
//                   {detail?.additionalDetails?.redirectUrl?.title}
//                 </span>
//               </Link>
//             </div>
//           )}
//           {detail?.additionalDetails?.estimationDetails && <WSFeeEstimation wsAdditionalDetails={detail} workflowDetails={workflowDetails}/>}
//           {detail?.additionalDetails?.estimationDetails && <ViewBreakup wsAdditionalDetails={detail} workflowDetails={workflowDetails}/>}

//         </React.Fragment>
//       ))}
//       {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
//         <React.Fragment>
//           <BreakLine />
//           {(workflowDetails?.isLoading || isDataLoading) && <Loader />}
//           {!workflowDetails?.isLoading && !isDataLoading && (
//             <Fragment>
//               <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>
//                 {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
//               </CardSectionHeader>
//               {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
//                 <CheckPoint
//                   isCompleted={true}
//                   label={t(`${timelineStatusPrefix}${workflowDetails?.data?.timeline[0]?.state}`)}
//                   customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
//                 />
//               ) : (
//                 <ConnectingCheckPoints>
//                   {workflowDetails?.data?.timeline &&
//                     workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
//                       let timelineStatusPostfix = "";
//                       if (window.location.href.includes("/obps/")) {
//                         if(workflowDetails?.data?.timeline[index-1]?.state?.includes("BACK_FROM") || workflowDetails?.data?.timeline[index-1]?.state?.includes("SEND_TO_CITIZEN"))
//                         timelineStatusPostfix = `_NOT_DONE`
//                         else if(checkpoint?.performedAction === "SEND_TO_ARCHITECT")
//                         timelineStatusPostfix = `_BY_ARCHITECT_DONE`
//                         else
//                         timelineStatusPostfix = index == 0 ? "" : `_DONE`;
//                       }

//                       return (
//                         <React.Fragment key={index}>
//                           <CheckPoint
//                             keyValue={index}
//                             isCompleted={index === 0}
//                             info={checkpoint.comment}
//                             label={t(
//                               `${timelineStatusPrefix}${
//                                 checkpoint?.performedAction === "REOPEN" ? checkpoint?.performedAction : checkpoint?.[statusAttribute]
//                               }${timelineStatusPostfix}`
//                             )}
//                             customChild={getTimelineCaptions(checkpoint,index)}
//                           />
//                         </React.Fragment>
//                       );
//                     })}
//                 </ConnectingCheckPoints>
//               )}
//             </Fragment>
//           )}
//         </React.Fragment>
//       )}
//     </Card>
//   );
// }

// export default ApplicationDetailsContent;

import {
  Card
} from "@egovernments/digit-ui-react-components";
import { values } from "lodash";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import PropertyDocuments from "./PropertyDocuments";

import TLCaption from "./TLCaption";


const styles = {
  container: { fontFamily: "Arial", padding: "20px", fontSize: "14px" },
  section: { marginBottom: "20px", marginTop: "20px" },
  heading: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
    verticalAlign: "bottom",
    textDecoration: "underline",
    textDecorationStyle: "solid",
    textDecorationOffset: "0%",
    textDecorationThickness: "0%",
    color: "#4729A3",
    marginBottom: "16px"
  },
  row: { display: "flex", flexWrap: "wrap", marginBottom: "10px" },
  column: { flex: "1 1 200px", marginRight: "10px", marginBottom: "10px" },
  label: {
    marginBottom: "4px", fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0%",
    color: "#282828"
  },
  input: {
    width: "100%",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
    backgroundColor: "#f4f4f4",
  },
  button: {
    padding: "8px 16px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#e0d4fa",
    color: "#333",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#d4c2f0",
    padding: "8px",
    border: "1px solid #ccc",
    textAlign: "left",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "175%",
    letterSpacing: "-1%",
    verticalAlign: "middle",
    color: "#282828"
  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "100%",
    letterSpacing: "1%",
    verticalAlign: "middle",
    color: "#323C47"
  },
  checkboxGroup: {
    display: "flex", gap: "15px", marginTop: "10px", fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%", color: "#6D6969"
  },
  remarkBox: {
    width: "100%",
    height: "60px",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "10px",
  },
  paymentButton: {
    padding: "10px 20px",
    backgroundColor: "#7f4bea",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    // float: "right",
    display: "flex",
    marginLeft: "auto",
  },
  inputGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "10px",
  },
  inputField: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
  },

  required: {
    color: "red",
  },

  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    minWidth: "400px",
  },
  modalHeader: {
    color: "blue",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "1rem",
    textDecoration: "underline",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  cancelButton: {
    border: "1px solid red",
    color: "red",
    padding: "8px 16px",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "indigo",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  checkIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "black",
    border: "3px solid green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 1rem",
    fontSize: "28px",
    color: "white",
  },
  header: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "8px",
    textAlign: "center"
  },
  receiptText: {
    color: "gray",
    fontSize: "14px",
    textAlign: "center"
  },
  homeButton: {
    marginTop: "20px",
    padding: "8px 20px",
    backgroundColor: "indigo",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex"
  },
};


const customStyles = {
  cardWrapper: {
    fontFamily: "Poppins, sans-serif",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    width: "fit-content",
    minWidth: "400px",
    overflow: "hidden",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  cardHeader: {
    backgroundColor: "#C4B8E7",
    color: "#fff",
    fontWeight: 500,
    padding: "10px 16px",
    fontSize: "14px",
  },
  dataRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 16px",
    fontSize: "14px",
    borderBottom: "1px solid #f0f0f0",
  },
  labelText: {
    color: "#000",
    fontWeight: 400,
  },
  labelTextRed: {
    color: "#DB1F1F",
    fontWeight: 400,
  },
  labelTextGreen: {
    color: "#28A745",
    fontWeight: 400,
  },
  valueText: {
    fontWeight: 500,
    color: "#000",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 16px",
    fontWeight: 600,
    fontSize: "14px",
  },
};

const ApplicationDetailsContent = ({
  applicationDetails,
  workflowDetails,
  isDataLoading,
  applicationData,
  businessService,
  timelineStatusPrefix,
  showTimeLine = true,
  statusAttribute = "status",
  paymentsList,
  oldValue,
  isInfoLabel = false
}) => {
  const [showSummary, setShowSummary] = useState(false);
  const [selectedModes, setSelectedModes] = useState([]);
  const [chequeDetails, setChequeDetails] = useState({
    issueDate: "",
    chequeNumber: "",
    accountHolder: "",
    bankName: "",
  });
  const [posDetails, setPosDetails] = useState({
    referenceNumber: "",
    edcBankName: "",
    cardName: "",
    cardLast4Digit: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [upiMobile, setUPIMobile] = useState("");
  const [paymentType, setPaymentType] = useState("full");

  // const toggleMode = (mode) => {
  //     setSelectedModes("");
  //   const newSelection = selectedModes.includes(mode)
  //     ? selectedModes.filter((m) => m !== mode)
  //     : [...selectedModes, mode];

  //   setSelectedModes(newSelection);

  //   if (mode === "UPI" && !selectedModes.includes("UPI")) {
  //     setShowUPIModal(true);
  //   }
  // };
  const toggleMode = (mode) => {
  // Always set only the current mode
  setSelectedModes([mode]);

  // Show UPI modal only when UPI is newly selected
  if (mode === "UPI") {
    setShowUPIModal(true);
  } else {
    setShowUPIModal(false);
  }
};

  const closeUPIModal = () => {
    setShowUPIModal(false);
  };

  console.log("applicationDetails", applicationDetails);
  const { t } = useTranslation();

  return (

    <div>
      {/* Consumer Details */}
      <div style={styles.section}>
        <div style={styles.heading}>Consumer Details</div>
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.label}>Assessment Year</div>
            <input
              type="text"
              readOnly
              value={applicationData?.financialYear || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Owner Name(English)</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.name || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Owner Name (Hindi)</div>
            <input type="text" readOnly value="N/A" style={styles.input} />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Father/Husband (English)</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.fatherOrHusbandName || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Father/Husband (Hindi)</div>
            <input type="text" readOnly value="N/A" style={styles.input} />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Property ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.propertyId || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Old Property ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.oldPropertyId || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Exemption</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.ownerType === "BPL" ? "BPL" : "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Ward</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.locality?.name || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Zone</div>
            <input type="text" readOnly value="N/A" style={styles.input} />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Colony</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.colony || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Road Factor</div>
            <input type="text" readOnly value="N/A" style={styles.input} />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Rate Zone of Current Year</div>
            <input type="text" readOnly value="N/A" style={styles.input} />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Address</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.doorNo + ", " + applicationData?.address?.street || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Property Area</div>
            <input
              type="text"
              readOnly
              value={applicationData?.landArea || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Mobile No.</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.mobileNumber || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Email ID / ईमेल आईडी</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.emailId || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Aadhaar</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.aadhaarNumber || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Samagra ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.owners?.[0]?.samagraId || "N/A"}
              style={styles.input}
            />
          </div>
          <div style={styles.column}></div>
        </div>
      </div>


      {applicationDetails?.applicationDetails?.map((detail, index) => (
        <>

          {detail?.additionalDetails?.documents && <PropertyDocuments documents={detail?.additionalDetails?.documents} />}

        </>
      ))}

      {/* Property Area Details */}
      <div style={styles.section}>
        <div style={styles.heading}>Property Area Details</div>
        <div style={{ borderRadius: "16px" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Usage Type", "Usage Factor", "Floor", "Construction %", "Area", "Rate", "ALV", "Discount", "TPV", "PTax"].map((head, i) => (
                  <th key={i} style={styles.th}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applicationData?.units?.map((unit, index) => (
                <tr key={index}>
                  <td style={styles.td}>{unit.usageCategory || "N/A"}</td>
                  <td style={styles.td}>1.0</td>
                  <td style={styles.td}>{unit.floorNo || "N/A"}</td>
                  <td style={styles.td}>100%</td>
                  <td style={styles.td}>{unit.constructionDetail?.builtUpArea || "N/A"}</td>
                  <td style={styles.td}>10</td>
                  <td style={styles.td}>1000</td>
                  <td style={styles.td}>0</td>
                  <td style={styles.td}>1000</td>
                  <td style={styles.td}>100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Summary */}
      <div style={styles.section}>
        <div style={styles.heading}>Tax Summary</div>
        <div style={{ borderRadius: "16px" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "ALV",
                  "TPV",
                  "Samrakshit",
                  "Property Tax",
                  "Education Cess",
                  "Urban Dev. Cess",
                  "Total",
                  "Rebate",
                  "Penalty",
                  "Net Tax",
                ].map((head, i) => (
                  <th key={i} style={styles.th}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1000</td>
                <td style={styles.td}>1000</td>
                <td style={styles.td}>0</td>
                <td style={styles.td}>100</td>
                <td style={styles.td}>2</td>
                <td style={styles.td}>1</td>
                <td style={styles.td}>103</td>
                <td style={styles.td}>0</td>
                <td style={styles.td}>0</td>
                <td style={styles.td}>103</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Section */}
      <div style={styles.section}>


        <div style={styles.heading}>Payment Amount</div>

        {/* Payment Type Toggle */}
        <div style={{ marginTop: "16px", display: "flex", gap: "20px", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === "full"}
              onChange={() => setPaymentType("full")}
            />
            <span style={styles.label}>Full Payment</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === "partial"}
              onChange={() => setPaymentType("partial")}
            />
            <span style={styles.label}>Partial Payment</span>
          </label>
        </div>

        {/* Conditional Payment Fields */}
        {paymentType === "full" && (
          <div style={styles.row}>
            <div style={styles.column}>
              <div style={styles.label}>Amount</div>
              <input
                placeholder="XX.XX"
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input
                value="View Only"
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Payments Receivable</div>
              <input
                value="View Only"
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Advance Payment</div>
              <input
                value="View Only"
                readOnly
                style={styles.input}
              />
            </div>
            <div style={customStyles.cardWrapper}>
              <div style={customStyles.cardHeader}>Lok Adalat Discount Summary</div>

              <div style={customStyles.dataRow}>
                <div style={customStyles.labelText}>Total Demant Without Lok Adalat Discount</div>
                <div style={customStyles.valueText}>28087</div>
              </div>

              <div style={customStyles.dataRow}>
                <div style={customStyles.labelTextRed}>Arrears Adithar Penalty</div>
                <div style={customStyles.valueText}>2197</div>
              </div>

              <div style={customStyles.dataRow}>
                <div style={customStyles.labelTextGreen}>Lok Adalat Discount %</div>
                <div style={customStyles.valueText}>100%</div>
              </div>

              <div style={customStyles.dataRow}>
                <div style={customStyles.labelTextRed}>Discount Given</div>
                <div style={customStyles.valueText}>2197</div>
              </div>

              <div style={customStyles.totalRow}>
                <div style={customStyles.labelText}>Total</div>
                <div style={customStyles.valueText}>26790</div>
              </div>
            </div>
          </div>
        )}
        {paymentType === "partial" && (
          <div style={styles.row}>
            <div style={styles.column}>
              <div style={styles.label}>Amount</div>
              <input
                placeholder="XX.XX"
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input
                value="View Only"
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Payments Receivable</div>
              <input
                value="View Only"
                readOnly
                style={styles.input}
              />
            </div>
            <div style={styles.column}></div>
          </div>
        )}
        {/* Remarks */}
     

        {/* Payment Mode */}
        {/* <div style={styles.checkboxGroup}>
          {["Cash", "POS", "UPI", "Cheque"].map((mode) => (
            <label key={mode} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input type="radio" name="paymentMode"
                checked={selectedModes.includes(mode)}
                onChange={() => toggleMode(mode)} />
              <span style={{ fontWeight: 500 }}>{mode}</span>
            </label>
          ))}
        </div> */}

        <div style={styles.checkboxGroup}>
          {["Cash", "POS", "UPI", "Cheque"].map((method) => (
            <label key={method}>
              <input
                type="radio"
                checked={selectedModes.includes(method)}
                onChange={() => toggleMode(method)}
              />{" "}
              {method}
            </label>
          ))}
        </div>
        {selectedModes.includes("Cheque") && (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Cheque Issue Date <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                style={styles.input}
                value={chequeDetails.issueDate}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, issueDate: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Cheque Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Cheque Number"
                style={styles.input}
                value={chequeDetails.chequeNumber}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, chequeNumber: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Account Holder Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Cheque Drawer"
                style={styles.input}
                value={chequeDetails.accountHolder}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, accountHolder: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Bank Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Cheque Bank Name"
                style={styles.input}
                value={chequeDetails.bankName}
                onChange={(e) =>
                  setChequeDetails({ ...chequeDetails, bankName: e.target.value })
                }
              />
            </div>
               
          </div>
        )}
        {selectedModes.includes("POS") && (
          <div style={styles.inputGroup}>
            <div style={styles.inputField}>
              <label style={styles.label}>
                POS reference number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="POS reference number"
                style={styles.input}
                value={posDetails.referenceNumber}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, referenceNumber: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                EDC Bank Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter EDC Bank Name"
                style={styles.input}
                value={posDetails.edcBankName}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, edcBankName: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Bank Card Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Name on card"
                style={styles.input}
                value={posDetails.cardName}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, cardName: e.target.value })
                }
              />
            </div>
            <div style={styles.inputField}>
              <label style={styles.label}>
                Card Last 4 Digit <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="Card last four digit"
                style={styles.input}
                maxLength={4}
                value={posDetails.cardLast4Digit}
                onChange={(e) =>
                  setPosDetails({ ...posDetails, cardLast4Digit: e.target.value })
                }
              />
            </div>
          </div>
        )}
        {showUPIModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>Confirm Mobile Number</div>
              <div style={styles.inputField}>
                <label style={styles.label}>
                  Mobile Number <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="+91-xxxxxxxx"
                  style={styles.input}
                  value={upiMobile}
                  onChange={(e) => setUPIMobile(e.target.value)}
                />
              </div>
              <div style={styles.buttonRow}>
                <button style={styles.cancelButton} onClick={closeUPIModal}>
                  Cancel
                </button>
                <button
                  style={styles.submitButton}
                  onClick={() => {
                    // You can add validation or API logic here
                    closeUPIModal();
                  }}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
        {showConfirmation && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.checkIcon}>✓</div>
              <div style={styles.header}>Payment Collected</div>
              <div style={styles.receiptText}>
                Receipt Number
                <br />
                Example: PG-AC-1234
              </div>
              <button style={styles.homeButton} onClick={() => setShowConfirmation(false)}>
                Home
              </button>
            </div>
          </div>)}

      </div>
      <div style={{ marginTop: "20px" }}>
          <div style={styles.label}>
            Remarks <span style={{ color: "red" }}>*</span>
          </div>
          <textarea
            rows="3"
            style={styles.remarkBox}
          />
        </div>
      <div style={{ marginTop: "30px" }}>
        <button
          style={styles.paymentButton}
          onClick={() => setShowConfirmation(true)}
        >
          Collect Payment
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailsContent;
