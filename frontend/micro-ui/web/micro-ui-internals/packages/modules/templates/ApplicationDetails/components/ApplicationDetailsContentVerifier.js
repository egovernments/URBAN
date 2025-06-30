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
import React, { Fragment } from "react";
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
        source: applicationData?.channel || "",
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
  return (
    <div >
      {/* For UM-4418 changes */}

      <div>
        <div>
          <label style={styles.sectionTitle}>Select Property ULB/ Year of Assessment</label>
        </div>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Select Assessment year<span style={{ color: "red" }}>*</span></label>

            <input style={styles.input} value="2025-26" readOnly />
          </div>
        </div>
        <AttachmentsSection
          t={t}
          documents={documents}
        />

        <label style={styles.sectionTitle}>Ownership Details</label>
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
              <div>
                <label style={styles.label}>Owner Name<span style={{ color: "red" }}>*</span></label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    value={owner?.salutation}
                    disabled
                    style={{
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "8px 0 0 8px",
                      backgroundColor: "#f9f9f9",
                      width: "80px",
                      textAlign: "center",
                      fontSize: "14px",
                      cursor: "default"
                      // DO NOT use 'appearance: none' if you want the arrow
                    }}
                  >
                    <option>{owner?.salutation}</option>
                  </select>
                  <input
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderLeft: "none",
                      borderRadius: "0 8px 8px 0",
                      backgroundColor: "#f9f9f9",
                      fontSize: "14px"
                    }}
                    value={owner?.name || ""}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label style={styles.label}>Owner Name (हिंदी)<span style={{ color: "red" }}>*</span></label>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    value={owner?.salutation}
                    disabled
                    style={{
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "8px 0 0 8px",
                      backgroundColor: "#f9f9f9",
                      width: "80px",
                      textAlign: "center",
                      fontSize: "14px",
                      cursor: "default"
                      // DO NOT use 'appearance: none' if you want the arrow
                    }}
                  >
                    <option>{owner?.salutation}</option>
                  
                  </select>
                  <input
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderLeft: "none",
                      borderRadius: "0 8px 8px 0",
                      backgroundColor: "#f9f9f9",
                      fontSize: "14px"
                    }}
                    value={owner?.nameInHindi || ""}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label style={styles.label}>Father/Husband Name</label>
                <input style={styles.input} value={owner.fatherOrHusbandName} readOnly />
              </div>


              <div>
                <label style={styles.label}>Relationship</label>
                <input style={styles.input} value={owner.relationship} readOnly />
              </div>
              <div>
                <label style={styles.label}>Email Id</label>
                <input style={styles.input} value={owner.emailId} readOnly />
              </div>
              <div>
                <label style={styles.label}>Mobile No.<span style={{ color: "red" }}>*</span></label>
                <input style={styles.input} value={owner.mobileNumber} readOnly />
              </div>
              <div>
                <label style={styles.label}>Alternative Mobile No</label>
                <input style={styles.input} value={owner.altContactNumber || ""} readOnly />
              </div>
              <div>
                <label style={styles.label}>Aadhar No.<span style={{ color: "red" }}>*</span></label>
                <input style={styles.input} value={owner.aadhaarNumber || ""} readOnly />
              </div>
              <div>
                <label style={styles.label}>Samagra ID <span style={{ color: "red" }}>*</span></label>
                <input style={styles.input} value={owner.samagraId} readOnly />
              </div>
            </div>
          </React.Fragment>
        ))}



        <label style={styles.sectionTitle}>Property Address</label>
        <div style={styles.grid}>
          <div><label style={styles.label}>Door/House No.<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.doorNo} readOnly /></div>
          <div><label style={styles.label}>Address<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.street} readOnly /></div>
          <div><label style={styles.label}>Pincode<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.pincode || ""} readOnly /></div>
          <div><label style={styles.label}>Colony<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.locality?.name} readOnly /></div>
          <div><label style={styles.label}>Ward<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.ward} readOnly /></div>
          <div><label style={styles.label}>Zone<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={address?.locality?.area} readOnly /></div>
        </div>
        <div style={styles.grid}>
          <div>
            <label style={styles.sectionTitle}>Correspondence Address</label>
            <textarea style={styles.input} rows={3} value={owner?.permanentAddress} readOnly />

          </div>
          <div style={styles.checkboxLabel}>
            <input type="checkbox" checked readOnly />
            <span style={{ marginLeft: "8px" }}>Same as property address</span>
          </div>
        </div>


        <label style={styles.sectionTitle}>Assessment Details</label>
        <div style={styles.grid}>
          <div><label style={styles.label}>Rate Zone<span style={{ color: "red" }}>*</span></label><input style={styles.input} value={additionalDetailsT?.unit?.[0]?.rateZone} readOnly /></div>
          <div><label style={styles.label}>Road factor <span style={{ color: "red" }}>*</span></label><input style={styles.input} value={additionalDetailsT?.unit?.[0]?.roadFactor} readOnly /></div>
          <div><label style={styles.label}>Old Property ID</label><input style={styles.input} value={application?.oldPropertyId || ""} readOnly /></div>
          <div><label style={styles.label}>Plot Area (sq.ft)</label><input style={styles.input} value={application?.landArea} readOnly /></div>
        </div>

        <label style={styles.sectionTitle}>Property Details</label>
        <div >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ ...styles.label, marginRight: "16px", minWidth: "120px" }}>Property Type</label>
            {/* <input style={styles.input} value={application?.propertyType || "Prefilled"} readOnly /> */}
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px", border: "1px solid #ccc" }}>
            <thead style={{ background: "#f0f0f0", height: "40px" }}>
              <tr>
                <th style={{ ...styles.label, textAlign: "left", padding: "14px" }}>Usage type</th>
                <th style={{ ...styles.label, textAlign: "left", padding: "14px" }}>Usage factor</th>
                <th style={{ ...styles.label, textAlign: "left", padding: "14px" }}>Floor number</th>
                <th style={{ ...styles.label, textAlign: "left", padding: "14px" }}>Type of construction</th>
                <th style={{ ...styles.label, textAlign: "left", padding: "14px" }}>Area (Sq feet)</th>
              </tr>
            </thead>
            <tbody>
              {(application?.units || []).map((unit, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <select
                      value={unit?.usageCategory || ""}
                      disabled
                      style={{ ...styles.input, border: "none", background: "none", width: "100%" }}
                    >
                      <option value={unit?.usageCategory || ""}>{unit?.usageCategory || ""}</option>

                    </select>
                  </td>

                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <select
                      value={unit?.occupancyType || ""}
                      disabled
                      style={{ ...styles.input, border: "none", background: "none", width: "100%" }}
                    >
                      <option value={unit?.occupancyType || ""}>{unit?.occupancyType || ""}</option>

                    </select>
                  </td>

                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <select
                      value={unit?.floorNo?.toString() || ""}
                      disabled
                      style={{ ...styles.input, border: "none", background: "none", width: "100%" }}
                    >

                      <option value={unit?.floorNo?.toString() || ""}>{unit?.floorNo?.toString() || ""}</option>

                    </select>
                  </td>

                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <select
                      value={unit?.constructionDetail?.constructionType || ""}
                      disabled
                      style={{ ...styles.input, border: "none", background: "none", width: "100%" }}
                    >
                      <option value={unit?.constructionDetail?.constructionType || ""}>{unit?.constructionDetail?.constructionType || ""}</option>

                      {/* Add more options if needed */}
                    </select>
                  </td>

                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    <input
                      style={{ ...styles.input, border: "none", background: "none" }}
                      value={unit?.constructionDetail?.builtUpArea || ""}
                      readOnly
                    />
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>


        <div >
          {/* Section Header */}
          <div>
            <label style={styles.sectionTitle}>Other details</label>
          </div>
          <div>
            {/* Exemption Dropdown */}
            <label style={styles.label}>Exemption Applicable.</label>
          </div>
          <select style={styles.input} value={owner?.ownerType} disabled>
            <option>{owner?.ownerType}</option>
          </select>

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
          <label style={{ ...styles.sectionTitle, marginBottom: "8px" }}>Self Declaration</label>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <input type="checkbox" checked readOnly style={{ marginTop: "4px" }} />
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#333", margin: 0 }}>
              मैं यह सत्यापित करता / करती हूं कि उपर्युक्त विवरणों में जो जानकारी दर्शायी गई है वह सही है। और | हमारी मिलकियत / भूमि के संबंध से विक्रय हेतु प्रस्तुत की है | इसका कोई भी सबूत मेरे पास उपलब्ध नहीं है | नोट - सम्पत्तिकर नगर पालिका (वार्षिक आयकर मूल्य का आकलन) नियम 1997 के नियम 10 (1) अंतर्गत विक्रय कारण बताकर कर निर्धारण विवरण (Self Assessment Form) के साथ दस्तावेज़ (Attachment) scan कर संलग्न करें | यह विवरणित विक्रयकृत नोट पर सत्यापित के प्रमाणस्वरूप होगी, जो कि अवैध पाए जाने पर सम्पत्ति का वार्षिक आयकर मूल्य एवं झूठी जानकारी पाए जाने पर झूठा जानकारी के आधार की राशि की पांच गुना राशि, अतिरिक्त कर की जा सकेगी।
            </p>
          </div>
        </div>

      </div>
      {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
        <React.Fragment>
          {/* <BreakLine /> */}
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
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    fontFamily: "Poppins, sans-serif",
  },


  sectionTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: "bold",
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0',
    // textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#4729A3',
    textDecorationThickness: '1px',
    textDecorationOffset: '2px',
    color: '#4729A3',
    marginBottom: '20px'

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
    padding: "6px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #aaa",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
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