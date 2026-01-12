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
import ViewBreakup from"./ViewBreakup";

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
  const getTimelineCaptions = (checkpoint,index=0) => {
    if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
      const caption = {
        date: checkpoint?.auditDetails?.created,
        source: applicationData?.channel || "",
      };
      return <TLCaption data={caption} />;
    } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/") || window.location.href.includes("/ws/")) {
      //From BE side assigneeMobileNumber is masked/unmasked with connectionHoldersMobileNumber and not assigneeMobileNumber
      const privacy = { uuid: checkpoint?.assignes?.[0]?.uuid, fieldName: "mobileNumber", model: "User",showValue: false,
      loadData: {
        serviceName: "/egov-workflow-v2/egov-wf/process/_search",
        requestBody: {},
        requestParam: { tenantId : applicationDetails?.tenantId, businessIds : applicationDetails?.applicationNo, history:true },
        jsonPath: "ProcessInstances[0].assignes[0].mobileNumber",
        isArray: false,
        d: (res) => {
          let resultstring = "";
          resultstring = `+91 ${_.get(res,`ProcessInstances[${index}].assignes[0].mobileNumber`)}`;
          return resultstring;
        }
      }, }
      const caption = {
        date: checkpoint?.auditDetails?.lastModified,
        name: checkpoint?.assignes?.[0]?.name,
        mobileNumber:applicationData?.processInstance?.assignes?.[0]?.uuid===checkpoint?.assignes?.[0]?.uuid && applicationData?.processInstance?.assignes?.[0]?.mobileNumber ? applicationData?.processInstance?.assignes?.[0]?.mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
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
  console.log("applicationDetails",applicationDetails)
  return (
    <Card style={{ position: "relative" }} className={"employeeCard-override"}>
      {/* For UM-4418 changes */}
      { isInfoLabel ? <InfoDetails t={t} userType={false} infoBannerLabel={"CS_FILE_APPLICATION_INFO_LABEL"} infoClickLable={"WS_CLICK_ON_LABEL"} infoClickInfoLabel={getClickInfoDetails()} infoClickInfoLabel1={getClickInfoDetails1()} /> : null }
      {applicationDetails?.applicationDetails?.map((detail, index) => (
        <React.Fragment key={index}>
          <div style={getMainDivStyles()}>
            {index === 0 && !detail.asSectionHeader ? (
              <CardSubHeader style={{ marginBottom: "16px", fontSize: "24px" }}>{t(detail.title)}</CardSubHeader>
            ) : (
              <React.Fragment>
                <CardSectionHeader
                  style={
                    index == 0 && checkLocation
                      ? { marginBottom: "16px", fontSize: "24px" }
                      : { marginBottom: "16px", marginTop: "32px", fontSize: "24px" }
                  }
                >
                  {isNocLocation ? `${t(detail.title)}` : t(detail.title)}
                  {detail?.Component ? <detail.Component /> : null}
                </CardSectionHeader>
              </React.Fragment>
            )}
            {/* TODO, Later will move to classes */}
            {/* Here Render the table for adjustment amount details detail.isTable is true for that table*/}
            {detail?.isTable && (
              <table style={{ tableLayout: "fixed", width: "100%", borderCollapse: "collapse" }}>
                <tr style={{ textAlign: "left" }}>
                  {detail?.headers.map((header) => (
                    <th style={{ padding: "10px", paddingLeft:"0px" }}>{t(header)}</th>
                  ))}
                </tr>

                {detail?.tableRows.map((row,index)=>{
                if(index===detail?.tableRows.length - 1){
                  return <>
                    <hr style={{ width: "370%",marginTop:"15px" }} className="underline" />
                    <tr>
                      {row.map(element => <td style={{ textAlign: "left" }}>{t(element)}</td>)}
                    </tr>
                    </>
                }
                return <tr>
                  {row.map(element => <td style={{ paddingTop:"20px",textAlign:"left" }}>{t(element)}</td>)}
                </tr>})}
              </table>
            )}
            <StatusTable style={getTableStyles()}>
              {detail?.title &&
                !detail?.title.includes("NOC") &&
                detail?.values?.map((value, index) => {
                  if (value.map === true && value.value !== "N/A") {
                    return <Row labelStyle={{wordBreak: "break-all"}} textStyle={{wordBreak: "break-all"}} key={t(value.title)} label={t(value.title)} text={<img src={t(value.value)} alt="" privacy={value?.privacy} />} />;
                  }
                  if (value?.isLink == true) {
                    return (
                      <Row
                        key={t(value.title)}
                        label={
                          window.location.href.includes("tl") || window.location.href.includes("ws") ? (
                            <div style={{ width: "200%" }}>
                              <Link to={value?.to}>
                                <span className="link" style={{ color: "#F47738" }}>
                                  {t(value?.title)}
                                </span>
                              </Link>
                            </div>
                          ) : isNocLocation || isBPALocation ? (
                            `${t(value.title)}`
                          ) : (
                            t(value.title)
                          )
                        }
                        text={
                          <div>
                            <Link to={value?.to}>
                              <span className="link" style={{ color: "#F47738" }}>
                                {value?.value}
                              </span>
                            </Link>
                          </div>
                        }
                        last={index === detail?.values?.length - 1}
                        caption={value.caption}
                        className="border-none"
                        rowContainerStyle={getRowStyles()}
                        labelStyle={{wordBreak: "break-all"}}
                        textStyle={{wordBreak: "break-all"}}
                      />
                    );
                  }
                  return (
                    <div>
                      {window.location.href.includes("modify") ?  (
                      <Row
                        className="border-none"
                        key={`${value.title}`}
                        label={`${t(`${value.title}`)}`}
                        privacy={value?.privacy}
                        text={value?.oldValue ? value?.oldValue : value?.value ? value?.value : ""}
                        labelStyle={{wordBreak: "break-all"}}
                        textStyle={{wordBreak: "break-all"}}
                      /> ) : (<Row
                        key={t(value.title)}
                        label={t(value.title)}
                        text={getTextValue(value)}
                        last={index === detail?.values?.length - 1}
                        caption={value.caption}
                        className="border-none"
                        /* privacy object set to the Row Component */
                        privacy={value?.privacy}
                        // TODO, Later will move to classes
                        rowContainerStyle={getRowStyles()}
                        labelStyle={{wordBreak: "break-all"}}
                        textStyle={{wordBreak: "break-all"}}
                      />
                    )}
                    </div>
                  )
                })}
            </StatusTable>
          </div>
          {detail?.belowComponent && <detail.belowComponent />}
          {detail?.additionalDetails?.inspectionReport && (
            <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} paymentsList={paymentsList} />
          )}
          {applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending?.length > 0 && detail?.additionalDetails?.fiReport && (
            <InspectionReport fiReport={applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending} />
          )}
          {/* {detail?.additionalDetails?.FIdocuments && detail?.additionalDetails?.values?.map((doc,index) => (
            <div key={index}>
            {doc.isNotDuplicate && <div> 
             <StatusTable>
             <Row label={t(doc?.documentType)}></Row>
             <OBPSDocument value={detail?.additionalDetails?.values} Code={doc?.documentType} index={index}/> 
             <hr style={{color:"#cccccc",backgroundColor:"#cccccc",height:"2px",marginTop:"20px",marginBottom:"20px"}}/>
             </StatusTable>
             </div>}
             </div>
          )) } */}
          {detail?.additionalDetails?.floors && <PropertyFloors floors={detail?.additionalDetails?.floors} />}
          {detail?.additionalDetails?.owners && <PropertyOwners owners={detail?.additionalDetails?.owners} />}
          {detail?.additionalDetails?.units && <TLTradeUnits units={detail?.additionalDetails?.units} />}
          {detail?.additionalDetails?.accessories && <TLTradeAccessories units={detail?.additionalDetails?.accessories} />}
          {detail?.additionalDetails?.permissions && workflowDetails?.data?.nextActions?.length > 0 && (
            <PermissionCheck applicationData={applicationDetails?.applicationData} t={t} permissions={detail?.additionalDetails?.permissions} />
          )}
          {detail?.additionalDetails?.obpsDocuments && (
            <BPADocuments
              t={t}
              applicationData={applicationDetails?.applicationData}
              docs={detail.additionalDetails.obpsDocuments}
              bpaActionsDetails={workflowDetails}
            />
          )}
          {detail?.additionalDetails?.noc && (
            <NOCDocuments
              t={t}
              isNoc={true}
              NOCdata={detail.values}
              applicationData={applicationDetails?.applicationData}
              docs={detail.additionalDetails.noc}
              noc={detail.additionalDetails?.data}
              bpaActionsDetails={workflowDetails}
            />
          )}
          {detail?.additionalDetails?.scruntinyDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
          {detail?.additionalDetails?.buildingExtractionDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
          {detail?.additionalDetails?.subOccupancyTableDetails && (
            <SubOccupancyTable edcrDetails={detail?.additionalDetails} applicationData={applicationDetails?.applicationData} />
          )}
          {detail?.additionalDetails?.documentsWithUrl && <DocumentsPreview documents={detail?.additionalDetails?.documentsWithUrl} />}
          {detail?.additionalDetails?.documents && <PropertyDocuments documents={detail?.additionalDetails?.documents} />}
          {detail?.additionalDetails?.taxHeadEstimatesCalculation && (
            <PropertyEstimates taxHeadEstimatesCalculation={detail?.additionalDetails?.taxHeadEstimatesCalculation} />
          )}
          {detail?.isWaterConnectionDetails && <WSAdditonalDetails wsAdditionalDetails={detail} oldValue={oldValue} />}
          {/* {detail?.isLabelShow ? <WSInfoLabel t={t} /> : null} */}
          {detail?.additionalDetails?.redirectUrl && (
            <div style={{ fontSize: "16px", lineHeight: "24px", fontWeight: "400", padding: "10px 0px" }}>
              <Link to={detail?.additionalDetails?.redirectUrl?.url}>
                <span className="link" style={{ color: "#F47738" }}>
                  {detail?.additionalDetails?.redirectUrl?.title}
                </span>
              </Link>
            </div>
          )}
          {detail?.additionalDetails?.estimationDetails && <WSFeeEstimation wsAdditionalDetails={detail} workflowDetails={workflowDetails}/>}
          {detail?.additionalDetails?.estimationDetails && <ViewBreakup wsAdditionalDetails={detail} workflowDetails={workflowDetails}/>}

        </React.Fragment>
      ))}
      {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
        <React.Fragment>
          <BreakLine />
          {(workflowDetails?.isLoading || isDataLoading) && <Loader />}
          {!workflowDetails?.isLoading && !isDataLoading && (
            <Fragment>
              <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>
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
                        if(workflowDetails?.data?.timeline[index-1]?.state?.includes("BACK_FROM") || workflowDetails?.data?.timeline[index-1]?.state?.includes("SEND_TO_CITIZEN"))
                        timelineStatusPostfix = `_NOT_DONE`
                        else if(checkpoint?.performedAction === "SEND_TO_ARCHITECT")
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
                              `${timelineStatusPrefix}${
                                checkpoint?.performedAction === "REOPEN" ? checkpoint?.performedAction : checkpoint?.[statusAttribute]
                              }${timelineStatusPostfix}`
                            )}
                            customChild={getTimelineCaptions(checkpoint,index)}
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
    </Card>
  );
}

export default ApplicationDetailsContentVerifier;



// import React from "react";

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     width: "100%",
//     maxWidth: "1024px",
//     margin: "20px auto",
//     boxSizing: "border-box",
//   },
//   sectionTitle: {
//     fontWeight: "bold",
//     color: "#3e8abf",
//     marginTop: "20px",
//     marginBottom: "10px",
//     display: "block",
//   },
//   label: {
//     display: "block",
//     margin: "6px 0 2px",
//     fontWeight: "500",
//   },
//   input: {
//     width: "100%",
//     padding: "6px",
//     marginBottom: "10px",
//     borderRadius: "4px",
//     border: "1px solid #aaa",
//     boxSizing: "border-box",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "16px",
//   },
//   row: {
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap",
//   },
//   checkboxLabel: {
//     display: "flex",
//     alignItems: "center",
//     marginTop: "10px",
//   },
//   timelineBox: {
//     background: "#f7f7f7",
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     marginTop: "20px",
//   },
//   buttonsRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "20px",
//   },
//   button: {
//     padding: "8px 16px",
//     backgroundColor: "#3e8abf",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   disabledButton: {
//     backgroundColor: "#ccc",
//     cursor: "not-allowed",
//   },
// };

// const PropertyTaxForm = () => {
//   return (
//     <div style={styles.container}>
//       <label style={styles.sectionTitle}>Select Property ULB/ Year of Assessment</label>
//       <label style={styles.label}>Select Assessment Year</label>
//       <select style={styles.input}>
//         <option>PreFilled</option>
//       </select>

//       <label style={styles.sectionTitle}>Attachments</label>
//       <div style={styles.grid}>
//         {["Photo ID", "Ownership", "Seller Registry", "Govt. Tax", "LGBT Proof"].map((label) => (
//           <div key={label}>
//             <label style={styles.label}>{label}</label>
//             <input type="file" style={styles.input} />
//           </div>
//         ))}
//       </div>

//       <label style={styles.sectionTitle}>Ownership Details</label>
//       <div style={styles.grid}>
//         <div>
//           <label style={styles.label}>Provide Ownership Details</label>
//           <select style={styles.input}><option>Single</option></select>
//         </div>
//       </div>

//       <div style={styles.grid}>
//         <div>
//           <label style={styles.label}>Owner Name</label>
//           <input style={styles.input} />
//         </div>
//         <div>
//           <label style={styles.label}>Owner Name (हिंदी)</label>
//           <input style={styles.input} />
//         </div>
//         <div>
//           <label style={styles.label}>Father/Husband Name</label>
//           <input style={styles.input} />
//         </div>
//         <div>
//           <label style={styles.label}>Mobile No.</label>
//           <input style={styles.input} />
//         </div>
//         <div>
//           <label style={styles.label}>Aadhar No.</label>
//           <input style={styles.input} />
//         </div>
//         <div>
//           <label style={styles.label}>Relationship</label>
//           <select style={styles.input}><option>PreFilled</option></select>
//         </div>
//       </div>

//       <label style={styles.sectionTitle}>Property Address</label>
//       <div style={styles.grid}>
//         {["Door/House No.", "Address", "Pincode", "Colony", "Ward", "Zone"].map((label) => (
//           <div key={label}>
//             <label style={styles.label}>{label}</label>
//             <input style={styles.input} />
//           </div>
//         ))}
//       </div>

//       <label style={styles.sectionTitle}>Correspondence Address</label>
//       <textarea style={styles.input} rows={3}></textarea>
//       <div style={styles.checkboxLabel}>
//         <input type="checkbox" />
//         <span style={{ marginLeft: "8px" }}>Same as property address</span>
//       </div>

//       <label style={styles.sectionTitle}>Assessment Details</label>
//       <div style={styles.grid}>
//         {["Rate Zone", "Board Name", "Old Property ID", "Plot Area (sq.ft)"].map((label) => (
//           <div key={label}>
//             <label style={styles.label}>{label}</label>
//             <input style={styles.input} />
//           </div>
//         ))}
//       </div>

//       <label style={styles.sectionTitle}>Property Details</label>
//       <div style={styles.grid}>
//         {["Property Type", "Usage Type", "Usage Factor", "Floor Number", "Type of Construction", "Area (Sq. ft)"].map(
//           (label) => (
//             <div key={label}>
//               <label style={styles.label}>{label}</label>
//               <select style={styles.input}><option>PreFilled</option></select>
//             </div>
//           )
//         )}
//       </div>
//       <a href="#" style={{ color: "#3e8abf", marginTop: "10px", display: "inline-block" }}>Add more</a>

//       <label style={styles.sectionTitle}>Other Details</label>
//       <label style={styles.label}>Concession Applicable</label>
//       <select style={styles.input}><option>PreFilled</option></select>
//       <div style={styles.checkboxLabel}>
//         <input type="checkbox" /> <span style={{ marginLeft: "8px" }}>Mobile Tower</span>
//       </div>
//       <div style={styles.checkboxLabel}>
//         <input type="checkbox" /> <span style={{ marginLeft: "8px" }}>Advertisement</span>
//       </div>

//       <label style={styles.sectionTitle}>Self Declaration</label>
//       <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#333" }}>
//         I hereby declare that the above details are true...
//       </p>

//       <div style={styles.timelineBox}>
//         <strong>Timeline:</strong>
//         <ul>
//           <li>Field Verified on 23/03/2025</li>
//           <li>Documents Verified on 24/03/2025</li>
//           <li>Application Created on 21/03/2025</li>
//         </ul>
//       </div>

//       <div style={styles.buttonsRow}>
//         <button style={styles.button}>Previous</button>
//         <div>
//           <button style={{ ...styles.button, ...styles.disabledButton }}>Forward</button>
//           <button style={{ ...styles.button, ...styles.disabledButton, marginLeft: "10px" }}>Send Back</button>
//           <button style={{ ...styles.button, ...styles.disabledButton, marginLeft: "10px" }}>Take Action</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyTaxForm;
