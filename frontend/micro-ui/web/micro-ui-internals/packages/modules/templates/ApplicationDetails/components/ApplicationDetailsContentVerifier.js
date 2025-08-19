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
  BreakLine,
  Card,
  CardSectionHeader,
  CardSubHeader,
  CheckPoint,
  ConnectingCheckPoints,
  Loader,
  Row,
  StatusTable,
} from "@egovernments/digit-ui-react-components";
import { values } from "lodash";
import React, { Fragment, useEffect } from "react";
import Accordion from "../../Accrodion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BPADocuments from "./BPADocuments";
import InspectionReport from "./InspectionReport";
import NOCDocuments from "./NOCDocuments";
import PermissionCheck from "./PermissionCheck";
import PropertyDocuments from "./PropertyDocuments";
import PropertyEstimates from "./PropertyEstimates";
import PropertyFloors from "./PropertyFloors";
import PropertyOwners from "./PropertyOwners";
import ScruntinyDetails from "./ScruntinyDetails";
import SubOccupancyTable from "./SubOccupancyTable";
import TLCaption from "./TLCaption";
import TLTradeAccessories from "./TLTradeAccessories";
import TLTradeUnits from "./TLTradeUnits";
import WSAdditonalDetails from "./WSAdditonalDetails";
import WSFeeEstimation from "./WSFeeEstimation";
// import WSInfoLabel from "../../../ws/src/pageComponents/WSInfoLabel";
import DocumentsPreview from "./DocumentsPreview";
import InfoDetails from "./InfoDetails";
import ViewBreakup from "./ViewBreakup";
import OwnershipDetailsSection from "./Verifier/OwnershipDetailsSection";
import AttachmentsSection from "./Verifier/Attachments";
import AddressSection from "./Verifier/AddressSection";
import { useState } from "react";
function ApplicationDetailsContentVerifier({
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
}) {
  const { t } = useTranslation();
  console.log("workflowDetails", workflowDetails)
  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

  const convertEpochToDateDMY = (dateEpoch) => {
    if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
      return "NA";
    }
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  };
  const getTimelineCaptions = (checkpoint, index = 0) => {
    if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
      const caption = {
        date: checkpoint?.auditDetails?.created,
        source: ""
        // source: applicationData?.channel || "",
      };
      return <TLCaption data={caption} />;
    } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/") || window.location.href.includes("/ws/")) {
      //From BE side assigneeMobileNumber is masked/unmasked with connectionHoldersMobileNumber and not assigneeMobileNumber
      const privacy = {
        uuid: checkpoint?.assignes?.[0]?.uuid, fieldName: "mobileNumber", model: "User", showValue: false,
        loadData: {
          serviceName: "/egov-workflow-v2/egov-wf/process/_search",
          requestBody: {},
          requestParam: { tenantId: applicationDetails?.tenantId, businessIds: applicationDetails?.applicationNo, history: true },
          jsonPath: "ProcessInstances[0].assignes[0].mobileNumber",
          isArray: false,
          d: (res) => {
            let resultstring = "";
            resultstring = `+91 ${_.get(res, `ProcessInstances[${index}].assignes[0].mobileNumber`)}`;
            return resultstring;
          }
        },
      }
      const caption = {
        date: checkpoint?.auditDetails?.lastModified,
        name: checkpoint?.assignes?.[0]?.name,
        mobileNumber: applicationData?.processInstance?.assignes?.[0]?.uuid === checkpoint?.assignes?.[0]?.uuid && applicationData?.processInstance?.assignes?.[0]?.mobileNumber ? applicationData?.processInstance?.assignes?.[0]?.mobileNumber : checkpoint?.assignes?.[0]?.mobileNumber,
        comment: t(checkpoint?.comment),
        wfComment: checkpoint.wfComment,
        thumbnailsToShow: checkpoint?.thumbnailsToShow,
      };
      return <TLCaption data={caption} OpenImage={OpenImage} privacy={privacy} />;
    } else {
      const caption = {
        date: checkpoint?.auditDetails?.lastModified,
        // name: checkpoint?.assigner?.name,
        name: checkpoint?.assignes?.[0]?.name,
        // mobileNumber: checkpoint?.assigner?.mobileNumber,
        wfComment: checkpoint?.wfComment,
        mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
      };
      return <TLCaption data={caption} />;
    }
  };

  const getTranslatedValues = (dataValue, isNotTranslated) => {
    if (dataValue) {
      return !isNotTranslated ? t(dataValue) : dataValue;
    } else {
      return t("NA");
    }
  };

  const checkLocation =
    window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
  const isNocLocation = window.location.href.includes("employee/noc");
  const isBPALocation = window.location.href.includes("employee/obps");
  const isWS = window.location.href.includes("employee/ws");

  const getRowStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
    } else if (checkLocation) {
      return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
    } else {
      return {};
    }
  };

  const getTableStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { position: "relative", marginTop: "19px" };
    } else if (checkLocation) {
      return { position: "relative", marginTop: "19px" };
    } else {
      return {};
    }
  };

  const getMainDivStyles = () => {
    if (
      window.location.href.includes("employee/obps") ||
      window.location.href.includes("employee/noc") ||
      window.location.href.includes("employee/ws")
    ) {
      return { lineHeight: "19px", maxWidth: "950px", minWidth: "280px" };
    } else if (checkLocation) {
      return { lineHeight: "19px", maxWidth: "600px", minWidth: "280px" };
    } else {
      return {};
    }
  };

  const getTextValue = (value) => {
    if (value?.skip) return value.value;
    else if (value?.isUnit) return value?.value ? `${getTranslatedValues(value?.value, value?.isNotTranslated)} ${t(value?.isUnit)}` : t("N/A");
    else return value?.value ? getTranslatedValues(value?.value, value?.isNotTranslated) : t("N/A");
  };

  const getClickInfoDetails = () => {
    if (window.location.href.includes("disconnection") || window.location.href.includes("application")) {
      return "WS_DISCONNECTION_CLICK_ON_INFO_LABEL"
    } else {
      return "WS_CLICK_ON_INFO_LABEL"
    }
  }

  const getClickInfoDetails1 = () => {
    if (window.location.href.includes("disconnection") || window.location.href.includes("application")) {
      return "WS_DISCONNECTION_CLICK_ON_INFO1_LABEL"
    } else {
      return ""
    }
  }
  console.log("applicationDetails", applicationDetails)

  const application = applicationDetails?.applicationData || {};
  const additionalDetailsT = applicationDetails?.additionalDetails || {};
  const owner = application?.owners?.[0] || {};
  const address = application?.address || {};
  const unitde = application?.units?.[0] || {};
  const documents = application?.documents || [];
  console.log("application", application)
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;

  const fetchBill = async () => {
    if (!application?.propertyId) return;

    try {
      const billResponse = await Digit.PTService.fetchPaymentDetails({
        tenantId,
        consumerCodes: application?.propertyId,
      });

      const BillList = billResponse?.Bill || [];
      if (!BillList.length) {
        // alert("❌ This bill has already been paid or is not valid.");
        setBillFetch(null);
        return;
      }

      setBillFetch(BillList[0]); // set fresh bill
    } catch (err) {
      // console.error("Error fetching bill:", err);
    }
  };
  useEffect(() => {
    const propertyIdValid = applicationData?.propertyId;
    const tenantIdValid = tenantId && tenantId !== "undefined";

    if (propertyIdValid && tenantIdValid) {
      console.log("✅ Fetching bill with:", {
        propertyId: applicationData.propertyId,
        tenantId,
      });
      fetchBill();
    }
  }, [applicationData?.propertyId, tenantId]);




    const [openIndex, setOpenIndex] = useState(0);
  
    const items = [
     
      
       {
        title: <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Ownership Details</h3></div>,
        content:
            <div >



          {/* <div style={styles.sectionTitle}>Ownership Details</div> */}
          <div style={styles.grid}>
            <div style={styles.flex30}>
              <label style={styles.label}>Ownership Type<span style={{ color: "red" }}>*</span></label>
              <input style={styles.input} value={application?.ownershipCategory} readOnly />
            </div>
            <div style={styles.flex30}>
              <label style={styles.label}>POA Registration Number</label>
              <input style={styles.input} value={application?.registryId} readOnly />
            </div>
          </div>


          {(application?.owners || []).map((owner, index) => (
            <React.Fragment key={index}>
              {(application?.owners?.length > 1) && (

                <label style={styles.label}>Owner {index + 1}</label>

              )}
              <div style={{ ...styles.grid, marginTop: "20px" }}>
                <div style={styles.flex30}>
                  <label style={styles.label}>Owner Name<span style={{ color: "red" }}>*</span></label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <select
                      value={owner?.salutation}
                      disabled
                      style={styles.widthInput}
                    >
                      <option>{owner?.salutation}</option>
                    </select>
                    <input
                      style={styles.input}
                      value={owner?.name || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Owner Name (हिंदी)<span style={{ color: "red" }}>*</span></label>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <select
                      value={owner?.salutation}
                      disabled
                      style={styles.widthInput}
                    >
                      <option>{owner?.salutationHindi}</option>

                    </select>
                    <input
                      style={styles.input}
                      value={owner?.hindiName || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Father/Husband Name</label>
                  <input style={styles.input} value={owner.fatherOrHusbandName} readOnly />
                </div>


                <div style={styles.flex30}>
                  <label style={styles.label}>Relationship</label>
                  <input style={styles.input} value={owner.relationship} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Email ID</label>
                  <input style={styles.input} value={owner.emailId} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Mobile No.<span style={{ color: "red" }}>*</span></label>
                  <input style={styles.input} value={owner.mobileNumber} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Alternative Mobile No</label>
                  <input style={styles.input} value={owner.altContactNumber || ""} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Aadhar No.<span style={{ color: "red" }}>*</span></label>
                  <input style={styles.input} value={owner.aadhaarNumber || ""} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Samagra ID <span style={{ color: "red" }}>*</span></label>
                  <input style={styles.input} value={owner.samagraId} readOnly />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        
      },
      {
        title: <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Property Address</h3></div>,
        content:
           <div >

          {/* <div style={styles.sectionTitle}>Property Address</div> */}
          <div style={styles.grid}>
            <div style={styles.flex30}><label style={styles.label}>Door/House No.<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.doorNo} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Address<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.street} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Pincode<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.pincode || ""} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Colony<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.locality?.name} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Ward<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.ward} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Zone<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.zone} readOnly /></div>
          </div>
        </div>
      },
       {
        title: <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Correspondence Address</h3></div>,
        content:
            <div >
          <div >
            <div style={styles.flex30} >
              {/* <div style={styles.sectionTitle}>Correspondence Address</div> */}
              <textarea style={styles.widthInputs} rows={3} value={owner?.permanentAddress} readOnly />

            </div>
            <div style={styles.checkboxLabel}>
              <input type="checkbox" checked readOnly />
              <span style={{ marginLeft: "8px" }}>Same As Property Address</span>
            </div>
          </div>

        </div>
      },
       {
        title: <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Assessment Details</h3></div>,
        content:
           <div >
          {/* <div style={styles.sectionTitle}>Assessment Details</div> */}
          <div style={styles.grid}>
            <div style={styles.flex30}><label style={styles.label}>Rate Zone<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={additionalDetailsT?.unit?.[0]?.rateZone} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Road Factor <span style={{ color: "red" }}>*</span></label><input style={styles.input} value={additionalDetailsT?.unit?.[0]?.roadFactor} readOnly /></div>
            {/* <div><label style={styles.label}>Old Property ID</label><input style={styles.input} value={application?.oldPropertyId || ""} readOnly /></div> */}
            <div style={styles.flex30}><label style={styles.label}>Plot Area (sq.ft)</label><input style={styles.input} value={application?.landArea} readOnly /></div>
          </div>
        </div>
      },
       {
        title: <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Property Details</h3></div>,
        content:
           <div >
          {/* <div style={styles.sectionTitle}>Property Details</div> */}
          <div >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ ...styles.label, marginRight: "16px", minWidth: "120px" }}>Property Type</label>
              {/* <input style={styles.input} value={application?.propertyType || "Prefilled"} readOnly /> */}
            </div>
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table style={{ borderCollapse: "collapse", marginTop: "8px", border: "1px solid #ccc" }}>
                <thead style={{ background: "#f0f0f0", height: "40px" }}>
                  <tr>
                    <th style={{ ...styles.labelTable }}>Usage Type</th>
                    <th style={{ ...styles.labelTable }}>Usage Factor</th>
                    <th style={{ ...styles.labelTable }}>Floor Number</th>
                    <th style={{ ...styles.labelTable }}>Type of Construction</th>
                    <th style={{ ...styles.labelTable }}>Area (Sq feet)</th>
                    <th style={{ ...styles.labelTable }}>From Year</th>
                    <th style={{ ...styles.labelTable }}>To Year</th>
                  </tr>
                </thead>
                <tbody>
                  {(application?.units || []).map((unit, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.usageCategory || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >
                          <option value={unit?.usageCategory || ""}>{unit?.usageCategory || ""}</option>

                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.occupancyType || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >
                          <option value={unit?.occupancyType || ""}>{unit?.occupancyType || ""}</option>

                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.floorNo?.toString() || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >

                          <option value={unit?.floorNo?.toString() || ""}>{unit?.floorNo?.toString() || ""}</option>

                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.constructionDetail?.constructionType || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >
                          <option value={unit?.constructionDetail?.constructionType || ""}>{unit?.constructionDetail?.constructionType || ""}</option>

                          {/* Add more options if needed */}
                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <input
                          style={{ border: "none", background: "none" }}
                          value={unit?.constructionDetail?.builtUpArea || ""}
                          readOnly
                        />
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                          value={unit.fromYear || ""}

                        >
                          <option value={unit?.fromYear}>{unit?.fromYear}</option>
                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                          value={unit.toYear || ""}

                        >
                          <option value={unit?.toYear}>{unit?.toYear}</option>
                        </select>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          </div>
        </div>
      },
       {
        title: <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Other Details</h3></div>,
        content:
            <div >
          {/* Section Header */}
          <div>
            {/* <div style={styles.sectionTitle}>Other Details</div> */}
          </div>
          <div style={styles.grid}>

            <div style={styles.flex30} >
              {/* Exemption Dropdown */}
              <label style={styles.label}>Exemption Applicable.</label>

              <select style={styles.input} value={owner?.ownerType} disabled>
                <option>{owner?.ownerType}</option>
              </select>


            </div>
            <div style={styles.flex30}>
              <label style={styles.label}>Essential Tax</label>
              <input style={styles.input} value={application?.essentialTax} readOnly />
            </div>
          </div>
          {/* Checkboxes */}
          <div style={{ display: "flex", gap: "20px", marginTop: "12px", marginBottom: "24px" }}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" checked={additionalDetailsT?.mobileTower} readOnly />
              <span style={{ marginLeft: "8px" }}>Mobile Tower</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" checked={additionalDetailsT?.bondRoad} readOnly />
              <span style={{ marginLeft: "8px" }}>Bond Road</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" checked={additionalDetailsT?.advertisement} readOnly />
              <span style={{ marginLeft: "8px" }}>Advertisement</span>
            </label>
          </div>

          {/* Self Declaration Section */}
          <div style={{ ...styles.label, marginBottom: "8px" }}>Self Declaration</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <input type="checkbox" checked readOnly style={{ marginTop: "4px" }} />
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#333", margin: 0 }}>
              मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।
            </p>
          </div>
        </div>
      },
      {
        title:   <div ><h3 style={{color:"#6B133F", fontWeight: "700"}}>Attachments</h3></div>,
        content:
          //  <div style={styles.card}>
          <AttachmentsSection
            t={t}
            documents={documents}
          />
        // </div>
      },
       {
        title: <div ><CardSectionHeader style={{ color:"#6B133F" }}>
                  {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
                </CardSectionHeader></div>,
        content:
           <div style={styles.card}>
        {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
          <React.Fragment>
            {/* <BreakLine /> */}
            {(workflowDetails?.isLoading || isDataLoading) && <Loader />}
            {!workflowDetails?.isLoading && !isDataLoading && (
              <Fragment>
                {/* <CardSectionHeader style={{ ...styles.sectionTitle, marginBottom: "16px", marginTop: "32px" }}>
                  {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
                </CardSectionHeader> */}
                  {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
                    <CheckPoint
                      isCompleted={true}
                      label={t(`${timelineStatusPrefix}${workflowDetails?.data?.timeline[0]?.state}`)}
                      customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
                    />
                  ) : (
                    <ConnectingCheckPoints>
                      {workflowDetails?.data?.timeline &&
                        workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                          let timelineStatusPostfix = "";
                          if (window.location.href.includes("/obps/")) {
                            if (workflowDetails?.data?.timeline[index - 1]?.state?.includes("BACK_FROM") || workflowDetails?.data?.timeline[index - 1]?.state?.includes("SEND_TO_CITIZEN"))
                              timelineStatusPostfix = `_NOT_DONE`
                            else if (checkpoint?.performedAction === "SEND_TO_ARCHITECT")
                              timelineStatusPostfix = `_BY_ARCHITECT_DONE`
                            else
                              timelineStatusPostfix = index == 0 ? "" : `_DONE`;
                          }

                          return (
                            <React.Fragment key={index}>
                              <CheckPoint
                                keyValue={index}
                                isCompleted={index === 0}
                                info={checkpoint.comment}
                                label={t(
                                  `${timelineStatusPrefix}${checkpoint?.performedAction === "REOPEN" ? checkpoint?.performedAction : checkpoint?.[statusAttribute]
                                  }${timelineStatusPostfix}`
                                )}
                                customChild={getTimelineCaptions(checkpoint, index)}
                              />
                            </React.Fragment>
                          );
                        })}
                    </ConnectingCheckPoints>
                  )}
                </Fragment>
              )}
            </React.Fragment>
          )}
        </div>
    }

  ];



  const onToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const onKeyDown = (e, idx) => {
    // support Enter/Space to toggle
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(idx);
    }
  };


  return (
    <div >
      {/* For UM-4418 changes */}

      <div>
        {/* <div>
          <label style={styles.sectionTitle}>Select Property ULB/ Year of Assessment</label>
        </div>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Select Assessment year<span style={{ color: "red" }}>*</span></label>

            <input style={styles.input} value="2025-26" readOnly />
          </div>
        </div> */}


        {/* <Accordion/> */}
        <div style={styles.wrapper}>
          {items.map((item, idx) => {
            const expanded = openIndex === idx;
            return (
              <div style={styles.item} key={idx}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={expanded}
                  aria-controls={`panel-${idx}`}
                  onClick={() => onToggle(idx)}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  style={styles.header(expanded)}
                >
                  <span>{item.title}</span>
                  {/* simple chevron without any icon library */}
                  <span style={styles.chevron(expanded)}>▾</span>
                </div>

                {/* animated content area (max-height anim) */}
                <div
                  id={`panel-${idx}`}
                  style={{
                    ...styles.panelOuter,
                    maxHeight: expanded ? 500 : 0,
                    overflowY: "scroll"
                    // adjust if your content is taller
                  }}
                >
                  <div style={styles.panelInner}>{item.content}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div style={styles.card}>
          <AttachmentsSection
            t={t}
            documents={documents}
          />
        </div> */}

        {/* <div style={styles.card}>



          <div style={styles.sectionTitle}>Ownership Details</div>
          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Ownership Type<span style={{ color: "red" }}>*</span></label>
              <input style={styles.input} value={application?.ownershipCategory} readOnly />
            </div>
          </div>


          {(application?.owners || []).map((owner, index) => (
            <React.Fragment key={index}>
              {(application?.owners?.length > 1) && (

                <label style={styles.label}>Owner {index + 1}</label>

              )}
              <div style={styles.grid}>
                <div style={styles.flex30}>
                  <label style={styles.label}>Owner Name<span style={{ color: "red" }}>*</span></label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <select
                      value={owner?.salutation}
                      disabled
                      style={styles.widthInput}
                    >
                      <option>{owner?.salutation}</option>
                    </select>
                    <input
                      style={styles.input}
                      value={owner?.name || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Owner Name (हिंदी)<span style={{ color: "red" }}>*</span></label>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <select
                      value={owner?.salutation}
                      disabled
                      style={styles.widthInput}
                    >
                      <option>{owner?.salutationHindi}</option>

                    </select>
                    <input
                      style={styles.input}
                      value={owner?.hindiName || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Father/Husband Name</label>
                  <input style={styles.input} value={owner.fatherOrHusbandName} readOnly />
                </div>


                <div style={styles.flex30}>
                  <label style={styles.label}>Relationship</label>
                  <input style={styles.input} value={owner.relationship} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Email ID</label>
                  <input style={styles.input} value={owner.emailId} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Mobile No.<span style={{ color: "red" }}>*</span></label>
                  <input style={styles.input} value={owner.mobileNumber} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Alternative Mobile No</label>
                  <input style={styles.input} value={owner.altContactNumber || ""} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Aadhar No.<span style={{ color: "red" }}>*</span></label>
                  <input style={styles.input} value={owner.aadhaarNumber || ""} readOnly />
                </div>
                <div style={styles.flex30}>
                  <label style={styles.label}>Samagra ID <span style={{ color: "red" }}>*</span></label>
                  <input style={styles.input} value={owner.samagraId} readOnly />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div> */}

        {/* <div style={styles.card}>

          <div style={styles.sectionTitle}>Property Address</div>
          <div style={styles.grid}>
            <div style={styles.flex30}><label style={styles.label}>Door/House No.<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.doorNo} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Address<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.street} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Pincode<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.pincode || ""} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Colony<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.locality?.name} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Ward<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.ward} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Zone<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.zone} readOnly /></div>
          </div>
        </div> */}

        {/* <div style={styles.card}>
          <div >
            <div style={styles.flex30} >
              <div style={styles.sectionTitle}>Correspondence Address</div>
              <textarea style={styles.widthInputs} rows={3} value={owner?.permanentAddress} readOnly />

            </div>
            <div style={styles.checkboxLabel}>
              <input type="checkbox" checked readOnly />
              <span style={{ marginLeft: "8px" }}>Same As Property Address</span>
            </div>
          </div>

        </div> */}

        {/* <div style={styles.card}>
          <div style={styles.sectionTitle}>Assessment Details</div>
          <div style={styles.grid}>
            <div style={styles.flex30}><label style={styles.label}>Rate Zone<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={additionalDetailsT?.unit?.[0]?.rateZone} readOnly /></div>
            <div style={styles.flex30}><label style={styles.label}>Road Factor <span style={{ color: "red" }}>*</span></label><input style={styles.input} value={additionalDetailsT?.unit?.[0]?.roadFactor} readOnly /></div>
            
            <div style={styles.flex30}><label style={styles.label}>Plot Area (sq.ft)</label><input style={styles.input} value={application?.landArea} readOnly /></div>
          </div>
        </div> */}

        {/* <div style={styles.card}>
          <div style={styles.sectionTitle}>Property Details</div>
          <div >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ ...styles.label, marginRight: "16px", minWidth: "120px" }}>Property Type</label>
             
            </div>
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table style={{ borderCollapse: "collapse", marginTop: "8px", border: "1px solid #ccc" }}>
                <thead style={{ background: "#f0f0f0", height: "40px" }}>
                  <tr>
                    <th style={{ ...styles.labelTable }}>Usage Type</th>
                    <th style={{ ...styles.labelTable }}>Usage Factor</th>
                    <th style={{ ...styles.labelTable }}>Floor Number</th>
                    <th style={{ ...styles.labelTable }}>Type of Construction</th>
                    <th style={{ ...styles.labelTable }}>Area (Sq feet)</th>
                    <th style={{ ...styles.labelTable }}>From Year</th>
                    <th style={{ ...styles.labelTable }}>To Year</th>
                  </tr>
                </thead>
                <tbody>
                  {(application?.units || []).map((unit, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.usageCategory || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >
                          <option value={unit?.usageCategory || ""}>{unit?.usageCategory || ""}</option>

                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.occupancyType || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >
                          <option value={unit?.occupancyType || ""}>{unit?.occupancyType || ""}</option>

                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.floorNo?.toString() || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >

                          <option value={unit?.floorNo?.toString() || ""}>{unit?.floorNo?.toString() || ""}</option>

                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          value={unit?.constructionDetail?.constructionType || ""}
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                        >
                          <option value={unit?.constructionDetail?.constructionType || ""}>{unit?.constructionDetail?.constructionType || ""}</option>

                     
                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <input
                          style={{ border: "none", background: "none" }}
                          value={unit?.constructionDetail?.builtUpArea || ""}
                          readOnly
                        />
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                          value={unit.fromYear || ""}

                        >
                          <option value={unit?.fromYear}>{unit?.fromYear}</option>
                        </select>
                      </td>

                      <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                        <select
                          disabled
                          style={{ border: "none", background: "none", width: "100%" }}
                          value={unit.toYear || ""}

                        >
                          <option value={unit?.toYear}>{unit?.toYear}</option>
                        </select>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          </div>
        </div> */}

        {/* <div style={styles.card}>
        
          <div>
            <div style={styles.sectionTitle}>Other Details</div>
          </div>
          <div style={styles.grid}>
            <div>
            <div style={styles.flex30} >
             
              <label style={styles.label}>Exemption Applicable.</label>

              <select style={styles.input} value={owner?.ownerType} disabled>
                <option>{owner?.ownerType}</option>
              </select>
            </div>
            </div>
          </div>
        
          <div style={{ display: "flex", gap: "20px", marginTop: "12px", marginBottom: "24px" }}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" checked={additionalDetailsT?.mobileTower} readOnly />
              <span style={{ marginLeft: "8px" }}>Mobile Tower</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" checked={additionalDetailsT?.bondRoad} readOnly />
              <span style={{ marginLeft: "8px" }}>Bond Road</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" checked={additionalDetailsT?.advertisement} readOnly />
              <span style={{ marginLeft: "8px" }}>Advertisement</span>
            </label>
          </div>

       
          <div style={{ ...styles.label, marginBottom: "8px" }}>Self Declaration</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <input type="checkbox" checked readOnly style={{ marginTop: "4px" }} />
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#333", margin: 0 }}>
              मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।
            </p>
          </div>
        </div> */}

      </div>
      {/* <div style={styles.card}>
        {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
          <React.Fragment>
         
            {(workflowDetails?.isLoading || isDataLoading) && <Loader />}
            {!workflowDetails?.isLoading && !isDataLoading && (
              <Fragment>
                <CardSectionHeader style={{ ...styles.sectionTitle, marginBottom: "16px", marginTop: "32px" }}>
                  {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
                </CardSectionHeader>
                {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
                  <CheckPoint
                    isCompleted={true}
                    label={t(`${timelineStatusPrefix}${workflowDetails?.data?.timeline[0]?.state}`)}
                    customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
                  />
                ) : (
                  <ConnectingCheckPoints>
                    {workflowDetails?.data?.timeline &&
                      workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                        let timelineStatusPostfix = "";
                        if (window.location.href.includes("/obps/")) {
                          if (workflowDetails?.data?.timeline[index - 1]?.state?.includes("BACK_FROM") || workflowDetails?.data?.timeline[index - 1]?.state?.includes("SEND_TO_CITIZEN"))
                            timelineStatusPostfix = `_NOT_DONE`
                          else if (checkpoint?.performedAction === "SEND_TO_ARCHITECT")
                            timelineStatusPostfix = `_BY_ARCHITECT_DONE`
                          else
                            timelineStatusPostfix = index == 0 ? "" : `_DONE`;
                        }

                        return (
                          <React.Fragment key={index}>
                            <CheckPoint
                              keyValue={index}
                              isCompleted={index === 0}
                              info={checkpoint.comment}
                              label={t(
                                `${timelineStatusPrefix}${checkpoint?.performedAction === "REOPEN" ? checkpoint?.performedAction : checkpoint?.[statusAttribute]
                                }${timelineStatusPostfix}`
                              )}
                              customChild={getTimelineCaptions(checkpoint, index)}
                            />
                          </React.Fragment>
                        );
                      })}
                  </ConnectingCheckPoints>
                )}
              </Fragment>
            )}
          </React.Fragment>
        )}
      </div> */}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "100%",
    margin: "20px auto",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
  },
  item: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)"
  },
  header: (expanded) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "14px 16px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    textAlign: "left",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.3,
    outline: "none",
    transition: "background 120ms ease",
    ...(expanded ? { background: "#f9fafb" } : {})
  }),
  chevron: (expanded) => ({
    display: "inline-block",
    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 150ms ease",
    marginLeft: 12
  }),
  panelOuter: {
    transition: "max-height 220ms ease",
    overflow: "hidden"
  },
  panelInner: {
    padding: "0 16px 16px",
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.6
  },

  width2: {
    maxWidth: "160px"
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
    padding: "16px",
    // border: "1px solid #000000",
    marginBottom: "22px",
    borderRadius: "12px",
  },
  flex30: {
    flex: "1 1 30%",
    display: "flex",
    flexDirection: "column",

    position: "relative",
    minHeight: "90px",

  },
  container: {
    padding: "24px",
    fontFamily: "Poppins, sans-serif",
  },
  widthInput: {
    width: "20%",
    height: "40px",
    borderWidth: "1px",
    borderRadius: "4px",
    // border: "1px solid #D9D9D9",
    // boxShadow: "0px 4px 4px 0px #00000040",
    background: "#7575754D",
    // padding: "6px"
  },
  widthInputs: {
    width: "32%",
    minWidth: "300px",
    height: "72px",
    borderWidth: "1px",
    border: "1px solid #D9D9D9",
    padding: "10px",
    borderRadius: "4px",
    background: "#7575754D",
  },
  labelTable: {
    textAlign: "left",
    padding: "8px",
    border: "1px solid #ccc",
    background: "#6B133F4D",
    color: "#282828",
    width: "240px",
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "130%",
    letterSpacing: "0%"
  },
  sectionTitle: {
    background: '#6B133F',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0px',
    textDecorationStyle: 'solid',
    textDecorationColor: '#6B133F',
    textDecorationThickness: '1px',
    color: 'white',
    marginBottom: '20px',
    padding: '14px',
    // width: '52%',
    // borderBottomRightRadius: '20px',
    // borderTopRightRadius: '20px',
    textAlign: "center",

  },
  label: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0',
    color: '#282828',
    width: "200px"
  },
  input: {
    width: "100%",
    height: "40px",
    borderWidth: "1px",
    borderRadius: "4px",
    // border: "1px solid #D9D9D9",
    // boxShadow: "0px 4px 4px 0px #00000040",
    background: "#7575754D",
    padding: "10px",
    marginLeft: "1px",
  },
  flex30: {
    flex: "1 1 30%",
    display: "flex",
    flexDirection: "column",

    position: "relative",
    minHeight: "90px",

  },
  grid: {
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr",
    // gap: "16px",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  timelineBox: {
    background: "#f7f7f7",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "20px",
  },
  buttonsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#3e8abf",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};

export default ApplicationDetailsContentVerifier;