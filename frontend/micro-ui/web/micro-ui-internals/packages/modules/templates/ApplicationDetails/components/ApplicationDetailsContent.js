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
  Card,
  Dropdown,
  Loader,
  SubmitBar
} from "@egovernments/digit-ui-react-components";
import { values } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropertyDocuments from "./PropertyDocuments";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import TLCaption from "./TLCaption";
import { CollectPayment } from "@egovernments/digit-ui-module-common/src/payments/employee/payment-collect";
import { useQueryClient } from "react-query";


const styles = {
  container: { fontFamily: "Arial", padding: "20px", fontSize: "14px" },
  section: {
    marginBottom: "20px", marginTop: "20px", backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
    padding: "16px",
    borderRadius: "12px",
  },
  assessmentStyle: {
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
    color: "#6b133f",
    marginBottom: "16px"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "10px"
  },
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
    backgroundColor: "#6b133f",
    padding: "8px",
    border: "1px solid #ccc",
    textAlign: "left",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "175%",
    letterSpacing: "-1%",
    verticalAlign: "middle",
    color: "white"
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
    width: "32%",
    height: "72px",
    borderWidth: "1px",
    borderRadius: "6px",
    border: "1px solid #D9D9D9",
    padding: "10px",
    boxShadow: "0px 4px 4px 0px #00000040",
    background: "#A3BBF347"
  },
  paymentButton: {
    padding: "10px 20px",
    backgroundColor: "#6b133f",
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
    width: "100%",
    height: "35px",
    borderWidth: "1px",
    borderRadius: "6px",
    border: "1px solid #D9D9D9",
    boxShadow: "0px 4px 4px 0px #00000040",
    background: "#A3BBF347",
    padding: "10px"

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
    backgroundColor: "#6b133f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex"
  },
  assessmentStyle: {
    background: '#6b133f',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0px',
    textDecorationStyle: 'solid',
    textDecorationColor: '#6b133f',
    textDecorationThickness: '1px',
    color: 'white',
    marginBottom: '20px',
    padding: '14px',
    // width: '52%',
    // borderBottomRightRadius: '20px',
    // borderTopRightRadius: '20px',
    textAlign: "center",

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
  const [printing, setPrinting] = useState(false);
  const [manualAmount, setManualAmount] = useState("");
  const [showAssessmentPop, setShowAssesmentPop] = useState(false);
  const [selectedModes, setSelectedModes] = useState([]);
  const [estimateData, setEstimateData] = useState("");
  const [remarks, setRemarks] = useState("");

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
  const [billFetch, setBillFetch] = useState(null);
  const [billFopayment, setBillFopayment] = useState(null);

  const [formErrors, setFormErrors] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const stateId = Digit.ULBService.getStateId();
  const tenantIdUniq = Digit.ULBService.getCurrentTenantId();
  const billData = workflowDetails?.data?.actionState?.nextActions?.[1].Bill;
  const { isLoading: assessmentLoading, mutate: assessmentMutate } = Digit.Hooks.pt.usePropertyAssessment(tenantIdUniq);
  const toggleMode = (mode) => {
    // Always set only the current mode
    setSelectedModes([mode]);
    setSelectedMode(mode);
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

  const backToNew = () => {
    // setShowPreviewButton(false);
    setShowAssesmentPop(false);
  }
  const estimatePop = () => {
    setShowAssesmentPop(true);
  };

  const units = applicationDetails?.applicationData?.units;

  const formatYearRange = (fromYear, toYear) => {
    if (fromYear === toYear) return fromYear;

    const start = fromYear?.split("-")[0];         // "2023"
    const end = toYear?.split("-")[1];             // "25"
    return `${start}-${end}`;                      // "2023-25"
  };

  const yearRange = Array.isArray(units) && units.length > 0
    ? units[0].toYear
    : "N/A";

  const { t } = useTranslation();
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;
  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
    error,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);
  const handleEstimate = () => {
    const payload = {
      Assessment: {
        financialYear: yearRange,
        propertyId: applicationData?.propertyId,
        tenantId: "pg.citya",
        source: "MUNICIPAL_RECORDS",
        channel: "CITIZEN",
        assessmentDate: Date.now(),
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    ptCalculationEstimateMutate(payload, {
      onSuccess: (data) => {

        setEstimateData(data);
        // fetchBill()
      },
      onError: (error) => {
        alert("Estimate error:", error);
      },
    });
  };
  const handleAssessment = () => {
    const payload = {
      Assessment: {
        financialYear: yearRange,
        propertyId: applicationData?.propertyId,
        tenantId: "pg.citya",
        source: "MUNICIPAL_RECORDS",
        channel: "CFC_COUNTER",
        assessmentDate: Date.now(),
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    assessmentMutate(payload, {
      onSuccess: (data, variables) => {
        const assessments = data?.Assessments || [];
        if (assessments.length > 0) {
          const latestAssessment = assessments[0];
          const status = latestAssessment?.status || "UNKNOWN";

          // Only fetch bill if assessment is ACTIVE or APPROVED
          if (status === "ACTIVE" || status === "APPROVED") {
            fetchBill(); // Call fetchBill only if valid
          } else {
            console.warn("Assessment status is not valid for billing:", status);
          }
        } else {
          console.warn("No assessments returned in response");
        }
      },
      onError: (error, variables) => {
        // 
      }

    });
  }

  useEffect(() => {
    if (yearRange && applicationData?.propertyId) {
      handleEstimate();
      handleAssessment();
    }
  }, [yearRange, applicationData?.propertyId]);

  const handlePayment = async () => {
    const tenantId = billData?.tenantId || "pg.citya";
    const consumerCode = applicationData?.propertyId;
    const selectedPaymentMode = selectedMode; // Make sure this is coming from your UI
    if (!remarks.trim()) {
      setFormErrors("Remarks are required.");
      return;
    }
    try {
      // ✅ Fetch fresh bill before processing
      const billResponse = await Digit.PTService.fetchPaymentDetails({
        tenantId,
        consumerCodes: consumerCode,
      });

      const BillList = billResponse?.Bill || [];

      // ❌ Abort if bill is already paid or not found
      if (!BillList.length) {
        alert("❌ This bill has already been paid or is not valid.");
        return;
      }

      const bill = BillList[0]; // fresh bill

      // ✅ Construct receipt request
      const receiptRequest = {
        Payment: {
          mobileNumber: bill?.mobileNumber,
          paymentDetails: [
            {
              billId: bill.id,
              businessService: bill.businessService,
              totalDue: bill.totalAmount,
              totalAmountPaid: manualAmount !== "" && !isNaN(parseFloat(manualAmount))
                ? parseFloat(manualAmount)
                : bill.totalAmount,
              remarks: remarks,
            },
          ],
          tenantId,
          totalDue: bill.totalAmount,
          totalAmountPaid: manualAmount !== "" && !isNaN(parseFloat(manualAmount))
            ? parseFloat(manualAmount)
            : bill.totalAmount,
          paymentMode: selectedPaymentMode,
          payerName: bill?.payerName || "Default User",
          paidBy: "OWNER",
        },
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: userInfo1?.authToken || "default-token",
          userInfo: {
            id: userInfo1?.id || 1,
            uuid: userInfo1?.uuid || "default-uuid",
            userName: userInfo1?.userName || "defaultuser",
            name: userInfo1?.name || "Default User",
            mobileNumber: userInfo1?.mobileNumber || "9999999999",
            emailId: userInfo1?.emailId || "default@example.com",
            locale: userInfo1?.locale || "en_IN",
            type: userInfo1?.type || "CITIZEN",
            roles: userInfo1?.roles || [],
            active: userInfo1?.active !== false,
            tenantId: userInfo1?.tenantId || tenantId,
            permanentCity: userInfo1?.permanentCity || tenantId
          },
          msgId: "1749797151521|en_IN",
          plainAccessRequest: {}
        }
      };

      // ✅ Make the API call
      const response = await Digit.PaymentService.createReciept(tenantId, receiptRequest);

      // ✅ Invalidate cache & show confirmation
      // queryClient.invalidateQueries();
      const receiptNumber = response?.Payments?.[0]?.paymentDetails?.[0]?.receiptNumber;
      setReceiptNumber(receiptNumber);
      setShowConfirmation(true);
      fetchBill(); // Refresh bill data after payment
      setFormErrors("");
    } catch (error) {
      const errorMsg = error?.response?.data?.Errors?.map((e) => e?.code)?.join(", ");
      // console.error("❌ Error creating receipt:", errorMsg || error);
      // alert(`Failed to create receipt: ${errorMsg || "Unknown error"}`);
      setFormErrors("");
    }
  };
  const fetchBill = async () => {
    if (!applicationData?.propertyId) return;

    try {
      const billResponse = await Digit.PTService.fetchPaymentDetails({
        tenantId,
        consumerCodes: applicationData?.propertyId,
      });

      const BillList = billResponse?.Bill || [];
      if (!BillList.length) {
        // alert("❌ This bill has already been paid or is not valid.");
        setBillFetch(null);
        return;
      }
      setBillFopayment(billResponse); // set fresh bill
      setBillFetch(BillList[0]); // set fresh bill
    } catch (err) {
      // console.error("Error fetching bill:", err);
    }
  };



  const { state = {} } = useLocation();
  const userInfo = Digit.UserService.getUser();
  const [showToast, setShowToast] = useState(null);
  const { tenantId: __tenantId, authorization, workflow: wrkflow, consumerCode: connectionNo } = Digit.Hooks.useQueryParams();
  console.log("wrkflow", wrkflow);
  const paymentAmount = state?.paymentAmount;
  // const history = useHistory();
  const { pathname, search } = useLocation();
  // const menu = ["AXIS"];
  let { consumerCode } = useParams();
  const tenantIdEs = state?.tenantId || __tenantId || Digit.ULBService.getCurrentTenantId();
  const propertyId = state?.propertyId;
  const stateTenant = Digit.ULBService.getStateId();

  const { data: menu, isLoading } = Digit.Hooks.useCommonMDMS(stateTenant, "DIGIT-UI", "PaymentGateway");

  const { data: paymentdetails, isLoading: paymentLoading } = Digit.Hooks.useFetchPayment(
    { tenantId: tenantIdEs, consumerCode: wrkflow === "WNS" ? connectionNo : consumerCode, businessService },
    {}
  );
  if (window.location.href.includes("ISWSCON") || wrkflow === "WNS") consumerCode = decodeURIComponent(consumerCode);
  if (wrkflow === "WNS") consumerCode = stringReplaceAll(consumerCode, "+", "/")
  useEffect(() => {
    if (billFopayment?.Bill && billFopayment.Bill.length == 0) {
      setShowToast({ key: true, label: "CS_BILL_NOT_FOUND" });
    }
  }, [billFopayment]);
  useEffect(() => {
    localStorage.setItem("BillPaymentEnabled", "true");
  }, []);
  const { name, mobileNumber } = state;

  const billDetails = billFopayment?.Bill ? billFopayment?.Bill[0] : {};
  const handlePaymentMethod = async () => {
    if (!remarks.trim()) {
      setFormErrors("Remarks are required.");
      return;
    }
    const consumerCode = applicationData?.propertyId;
    const filterData = {
      Transaction: {
        tenantId: billDetails?.tenantId,
        txnAmount: paymentAmount || billDetails.totalAmount,
        module: businessService,
        billId: billDetails.id,
        consumerCode: consumerCode,
        productInfo: "Common Payment",
        gateway: selectedMode,
        taxAndPayments: [
          {
            billId: billDetails.id,
            amountPaid: billDetails.totalAmount,
          },
        ],
        user: {
          name: billDetails?.payerName,
          mobileNumber: billDetails?.mobileNumber,
          tenantId: billDetails?.tenantId,
        },
        // success
        callbackUrl: window.location.href.includes("mcollect") || wrkflow === "WNS"
          ? `${window.location.protocol}//${window.location.host}/digit-ui/employee/${businessService}/ptsearch/property-details/${consumerCode}`
          : `${window.location.protocol}//${window.location.host}/digit-ui/employee/${businessService}/ptsearch/property-details/${consumerCode}`,
        additionalDetails: {
          isWhatsapp: false,
        },
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || tenantId,
          permanentCity: userInfo1?.permanentCity || tenantId
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    try {
      const data = await Digit.PaymentService.createCitizenReciept(billDetails?.tenantId, filterData);
      const redirectUrl = data?.Transaction?.redirectUrl;
      window.location = redirectUrl;
      setFormErrors("");
    } catch (error) {
      let messageToShow = "CS_PAYMENT_UNKNOWN_ERROR_ON_SERVER";
      if (error.response?.data?.Errors?.[0]) {
        setFormErrors("");
        const { code, message } = error.response?.data?.Errors?.[0];
        messageToShow = code;
      }
      setFormErrors("");
      setShowToast({ key: true, label: t(messageToShow) });
    }
  };
  const totalNetTax = estimateData?.Calculation?.[0]?.propertyFYTaxSummaries?.reduce(
    (acc, curr) => acc + (curr.netTax || 0),
    0
  );
  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => businessService?.includes(code))[0]?.receiptKey || "consolidatedreceipt",
  });
  const printReciept = async () => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const state = Digit.ULBService.getStateId();
    const payments = await Digit.PaymentService.getReciept(tenantId, businessService, { receiptNumbers: receiptNumber });
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

    if (!payments.Payments[0]?.fileStoreId) {
      response = await Digit.PaymentService.generatePdf(state,
        {
          Payments: payments.Payments,
          Calculation: estimateData?.Calculation?.[0]
        }
        , generatePdfKey);
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response.filestoreIds[0]], "_blank");
  };


  if (assessmentLoading) {
    return <Loader />;
  }
  return (

    <div>
      {/* Consumer Details */}
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Consumer Details</div>
        <div style={styles.row}>


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
            <div style={styles.label}>Property ID</div>
            <input
              type="text"
              readOnly
              value={applicationData?.propertyId || "N/A"}
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
              value={applicationData?.address?.ward || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Zone</div>
            <input type="text" readOnly value={applicationData?.address?.zone || "N/A"} style={styles.input} />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Colony</div>
            <input
              type="text"
              readOnly
              value={applicationData?.address?.locality?.name || "N/A"}
              style={styles.input}
            />
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Road Factor</div>
            <input type="text" readOnly value={applicationData?.units?.[0]?.roadFactor} style={styles.input} />
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

        </div>
      </div>

      <div style={styles.section}>
        {applicationDetails?.applicationDetails?.map((detail, index) => (
          <>

            {detail?.additionalDetails?.documents && <PropertyDocuments documents={detail?.additionalDetails?.documents} />}

          </>
        ))}
      </div>
      {/* Property Area Details */}
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Property Area Details</div>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Usage Type",
                  "Usage Factor",
                  "Floor",
                  "Construction Type",
                  "Area (Sq feet)",
                  "Rate",
                  "ALV",
                  "Discount (%)",
                  // "TPV"
                ].map((head, i) => (
                  <th key={i} style={styles.th}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estimateData?.Calculation?.[0]?.propertyFYDetails?.map((detail, index) => (
                <tr key={index}>
                  <td style={styles.td}>{detail.usageType || "N/A"}</td>
                  <td style={styles.td}>{detail.usageFactor || "1.0"}</td>
                  <td style={styles.td}>{detail.floorNo || "N/A"}</td>
                  <td style={styles.td}>{detail.constructionType || "RCC"}</td>
                  <td style={styles.td}>{detail.area || "N/A"}</td>
                  <td style={styles.td}>{detail.factor || "N/A"}</td>
                  <td style={styles.td}>{detail.alv || 0}</td>
                  <td style={styles.td}>{detail.constructionType === "OPENLAND" ? "0" : "10"}</td> {/* Assuming Discount not provided */}
                  {/* <td style={styles.td}>{detail.tpv || 0}</td> */}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Tax Summary */}
      <div style={styles.section}>
        <div style={styles.assessmentStyle}>Tax Summary</div>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Year",
                  "ALV",
                  "TPV",
                  "Sampatti Kar",
                  "Samekit Kar",
                  "Shiksha Upkar",
                  "Jal Abhikar",
                  "Jal Nikas Kar",
                  "Nagariya Vikas Upkar",
                  "Seva Shulk",
                  "Current Amount",
                  "Rebate",
                  "Penalty",
                  "Net Tax"
                ].map((head, i) => (
                  <th key={i} style={styles.th}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estimateData?.Calculation?.[0]?.propertyFYTaxSummaries?.map((summary, index) => (
                <tr key={index}>
                  <td style={styles.td}>{summary.year}</td>
                  <td style={styles.td}>{summary.alv}</td>
                  <td style={styles.td}>{summary.tpv}</td>
                  <td style={styles.td}>{summary.propertyTax}</td>
                  <td style={styles.td}>{summary.samekit}</td>
                  <td style={styles.td}>{summary.educationCess}</td>
                  <td style={styles.td}>{summary.jalKar}</td>
                  <td style={styles.td}>{summary.jalNikas}</td>
                  <td style={styles.td}>{summary.urbanTax}</td>
                  <td style={styles.td}>{summary.sevaKar}</td>
                  <td style={styles.td}>{summary.totalTax}</td>
                  <td style={styles.td}>{summary.rebate}</td>
                  <td style={styles.td}>{summary.penalty}</td>
                  <td style={styles.td}>{summary.netTax}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>


      {/* Payment Section */}
      <div style={styles.section}>


        <div style={styles.assessmentStyle}>Payment Amount</div>

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
        {estimateData?.Calculation?.[0] && paymentType === "full" && (
          <div style={styles.row}>
            <div style={styles.column}>
              <div style={styles.label}>Amount</div>
              <input
                placeholder="XX.XX"
                value={estimateData?.Calculation[0]?.currentYearTax || ""}
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input
                value={estimateData?.Calculation[0]?.arrear || ""}
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Payments Receivable</div>
              <input
                value={estimateData?.Calculation[0]?.taxAmount || ""}
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Advance Payment</div>
              <input
                value="0"
                readOnly
                style={styles.input}
              />
            </div>
          </div>
        )}

        {paymentType === "partial" && (
          <div style={styles.row}>
            <div style={styles.column}>
              <div style={styles.label}>Amount</div>
              <input
                placeholder="XX.XX"
                value={manualAmount}
                style={styles.input}
                onChange={(e) => setManualAmount(e.target.value)}
              />

            </div>

            <div style={styles.column}>
              <div style={styles.label}>Arrear</div>
              <input

                readOnly
                value={estimateData?.Calculation[0]?.arrear || ""}
                style={styles.input}
              />
            </div>

            <div style={styles.column}>
              <div style={styles.label}>Payments Receivable</div>
              <input
                value={(() => {
                  const arrear = parseFloat(estimateData?.Calculation?.[0]?.arrear || 0);
                  if (manualAmount) {
                    return (parseFloat(manualAmount || 0) + arrear).toFixed(2);
                  } else {
                    const currentYearTax = parseFloat(estimateData?.Calculation?.[0]?.currentYearTax || 0);
                    return (currentYearTax + arrear).toFixed(2);
                  }
                })()}
                readOnly
                style={styles.input}
              />
            </div>
            <div style={styles.column}></div>
          </div>
        )}

        <div style={styles.label}>
          Payment Method <span style={{ color: "red" }}>*</span>
        </div>
        <div style={styles.checkboxGroup}>

          {["CASH", "POS"].map((method) => (
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
                {receiptNumber}
              </div>
              <div style={styles.receiptText}>
                Total Amount Received
                <br />
                ₹{totalNetTax}
              </div>
              <button style={styles.homeButton} onClick={printReciept}>
                Download Receipt
              </button>
              <button style={styles.homeButton} onClick={() => {
                // 🏠 Navigate home or reset form here
                window.location.href = "/digit-ui/employee"; // or use React Router
              }}>
                Home
              </button>
            </div>
          </div>)}
        <div style={{ marginTop: "20px" }}>
          <div style={styles.label}>
            Remarks <span style={{ color: "red" }}>*</span>
          </div>
          <textarea
            rows="3"
            style={styles.remarkBox}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          {formErrors && <div style={{ color: "red", marginTop: "4px" }}>{formErrors}</div>}
        </div>

        <div style={{ marginTop: "30px" }}>
          {selectedModes.includes("CASH") && (
            <button
              style={{
                ...styles.paymentButton,
                backgroundColor: billFetch?.totalAmount === 0 ? "#ccc" : styles.paymentButton.backgroundColor,
                cursor: billFetch?.totalAmount === 0 ? "not-allowed" : "pointer"
              }}
              onClick={() => handlePayment()}
              disabled={billFetch?.totalAmount === 0}
            >
              Collect Payment
            </button>
          )}
          {selectedModes.includes("EASEBUZZ") && (
            <button style={{
              ...styles.paymentButton
            }} onClick={() => handlePaymentMethod()} disabled={billFetch?.totalAmount === 0}>
              Pay Now
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetailsContent;
