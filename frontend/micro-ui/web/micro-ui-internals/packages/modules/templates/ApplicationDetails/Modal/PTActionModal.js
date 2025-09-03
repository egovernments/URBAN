// import { Loader, Modal, FormComposer } from "@egovernments/digit-ui-react-components";
// import React, { useState, useEffect } from "react";

// import { configPTRejectApplication, configPTVerifyApplication, configPTApproverApplication, configPTAssessProperty } from "../config";
// import * as predefinedConfig from "../config";
// const textStyle = {
//   fontFamily: "Poppins",
//   fontWeight: "bold",
//   fontSize: "16px",
//   lineHeight: "100%",
//   letterSpacing: "0%",
//   color: "#6B133F"
// };
// const Heading = (props) => {
//   return <h1 className="heading-m" style={textStyle}>{props.label}</h1>;
// };

// const Close = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6B133F">
//     <path d="M0 0h24v24H0V0z" fill="none" />
//     <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
//   </svg>
// );

// const CloseBtn = (props) => {
//   return (
//     <div className="icon-bg-secondary" style={{ display: "none" }} onClick={props.onClick}>
//       <Close />
//     </div>
//   );
// };

// const ActionModal = ({ t, action, tenantId, state, id, closeModal, submitAction, actionData, applicationData, businessService, moduleCode }) => {
//   const { data: approverData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
//     tenantId,
//     {
//       roles: action?.assigneeRoles?.map?.((e) => ({ code: e })),
//       isActive: true,
//     },
//     { enabled: !action?.isTerminateState }
//   );
//   const { isLoading: financialYearsLoading, data: financialYearsData } = Digit.Hooks.pt.useMDMS(
//     tenantId,
//     businessService,
//     "FINANCIAL_YEARLS",
//     {},
//     {
//       details: {
//         tenantId: Digit.ULBService.getStateId(),
//         moduleDetails: [{ moduleName: "egf-master", masterDetails: [{ name: "FinancialYear", filter: "[?(@.module == 'PT')]" }] }],
//       },
//     }
//   );

//   const [config, setConfig] = useState({});
//   const [defaultValues, setDefaultValues] = useState({});
//   const [approvers, setApprovers] = useState([]);
//   const [selectedApprover, setSelectedApprover] = useState(null);
//   const [file, setFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [financialYears, setFinancialYears] = useState([]);
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
//   const [disableActionSubmit, setDisableActionSubmit] = useState(false);

//   useEffect(() => {
//     if (financialYearsData && financialYearsData["egf-master"]) {
//       setFinancialYears(financialYearsData["egf-master"]?.["FinancialYear"]);
//     }
//   }, [financialYearsData]);

//   useEffect(() => {
//     setApprovers(approverData?.Employees?.map((employee) => ({ uuid: employee?.uuid, name: employee?.user?.name })));
//   }, [approverData]);

//   function selectFile(e) {
//     setFile(e.target.files[0]);
//   }

//   useEffect(() => {
//     (async () => {
//       setError(null);
//       if (file) {
//         if (file.size >= 5242880) {
//           setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
//         } else {
//           try {
//             const response = await Digit.UploadServices.Filestorage("PT", file, Digit.ULBService.getStateId());
//             if (response?.data?.files?.length > 0) {
//               setUploadedFile(response?.data?.files[0]?.fileStoreId);
//             } else {
//               setError(t("CS_FILE_UPLOAD_ERROR"));
//             }
//           } catch (err) {
//             setError(t("CS_FILE_UPLOAD_ERROR"));
//           }
//         }
//       }
//     })();
//   }, [file]);

//   function submit(data) {
//     if (!data?.comments || data?.comments.trim() === "") {
//       setError(t("ES_PT_REMARK_REQUIRED"));  // show error message
//       return; // stop submit
//     }
//     if (!action?.showFinancialYearsModal) {
//       let workflow = { action: action?.action, comment: data?.comments, businessService, moduleName: moduleCode };
//       workflow["assignes"] = action?.isTerminateState || !selectedApprover ? [] : [selectedApprover];
//       if (uploadedFile)
//         workflow["documents"] = [
//           {
//             documentType: action?.action + " DOC",
//             fileName: file?.name,
//             fileStoreId: uploadedFile,
//           },
//         ];

//       submitAction({
//         Property: {
//           ...applicationData,
//           workflow,
//         },
//       });
//     } else {
//       submitAction({
//         customFunctionToExecute: action?.customFunctionToExecute,
//         Assessment: {
//           financialYear: selectedFinancialYear?.name,
//           propertyId: applicationData?.propertyId,
//           tenantId,
//           source: applicationData?.source,
//           channel: applicationData?.channel,
//           assessmentDate: Date.now(),
//         },
//       });
//     }
//   }

//   useEffect(() => {
//     if (action) {
//       if (action?.showFinancialYearsModal) {
//         setConfig(
//           configPTAssessProperty({
//             t,
//             action,
//             financialYears,
//             selectedFinancialYear,
//             setSelectedFinancialYear,
//           })
//         );
//       } else {
//         setConfig(
//           configPTApproverApplication({
//             t,
//             action,
//             approvers,
//             selectedApprover,
//             setSelectedApprover,
//             selectFile,
//             uploadedFile,
//             setUploadedFile,
//             businessService,
//           })
//         );
//       }
//     }
//   }, [action, approvers, financialYears, selectedFinancialYear, uploadedFile]);

//   return action && config.form ? (
//     <Modal
//       headerBarMain={<Heading label={t(config.label.heading)} />}
//       headerBarEnd={<CloseBtn onClick={closeModal} />}
//       actionCancelLabel={t(config.label.cancel)}
//       actionCancelOnSubmit={closeModal}
//       actionSaveLabel={t(config.label.submit)}
//       actionSaveOnSubmit={() => { }}
//       isDisabled={!action.showFinancialYearsModal ? PTALoading || (action?.docUploadRequired && !uploadedFile) : !selectedFinancialYear}
//       formId="modal-action"

//     >
//       {financialYearsLoading ? (
//         <Loader />
//       ) : (
//         <FormComposer
//           config={config.form}
//           noBoxShadow
//           inline
//           childrenAtTheBottom
//           onSubmit={submit}
//           defaultValues={defaultValues}
//           formId="modal-action"
//         // isDisabled={!action.showFinancialYearsModal ? PTALoading || (!action?.isTerminateState && !selectedApprover?.uuid) : !selectedFinancialYear}
//         />
//       )}
//       {error && <div className="error-message" style={{color:"red",paddingLeft:"38px"}}>{t("Remark is required")}</div>}
//     </Modal>
//   ) : (
//     <Loader />
//   );
// };

// export default ActionModal;

import { Loader, Modal } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { configPTApproverApplication, configPTAssessProperty } from "../config";

const ActionModal = ({
  t,
  action,
  tenantId,
  closeModal,
  submitAction,
  applicationData,
  businessService,
  moduleCode,
}) => {
  const { data: approverData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    { roles: action?.assigneeRoles?.map((e) => ({ code: e })), isActive: true },
    { enabled: !action?.isTerminateState }
  );

  const { isLoading: financialYearsLoading, data: financialYearsData } =
    Digit.Hooks.pt.useMDMS(
      tenantId,
      businessService,
      "FINANCIAL_YEARLS",
      {},
      {
        details: {
          tenantId: Digit.ULBService.getStateId(),
          moduleDetails: [
            {
              moduleName: "egf-master",
              masterDetails: [
                { name: "FinancialYear", filter: "[?(@.module == 'PT')]" },
              ],
            },
          ],
        },
      }
    );

  const [config, setConfig] = useState({});
  const [comments, setComments] = useState("");
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [financialYears, setFinancialYears] = useState([]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);

  // Map approvers
  useEffect(() => {
    setApprovers(
      approverData?.Employees?.map((emp) => ({
        uuid: emp?.uuid,
        name: emp?.user?.name,
      })) || []
    );
  }, [approverData]);

  // Set financial years
  useEffect(() => {
    if (financialYearsData?.["egf-master"]) {
      setFinancialYears(financialYearsData["egf-master"]?.["FinancialYear"]);
    }
  }, [financialYearsData]);

  // File upload
  useEffect(() => {
    if (!file) return;

    (async () => {
      setError(null);
      if (file.size >= 5242880) {
        setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        return;
      }
      try {
        const res = await Digit.UploadServices.Filestorage(
          "PT",
          file,
          Digit.ULBService.getStateId()
        );
        const uploaded = res?.data?.files?.[0]?.fileStoreId;
        uploaded ? setUploadedFile(uploaded) : setError(t("CS_FILE_UPLOAD_ERROR"));
      } catch {
        setError(t("CS_FILE_UPLOAD_ERROR"));
      }
    })();
  }, [file, t]);

  // Config builder
  useEffect(() => {
    if (!action) return;
    setConfig(
      action?.showFinancialYearsModal
        ? configPTAssessProperty({
            t,
            action,
            financialYears,
            selectedFinancialYear,
            setSelectedFinancialYear,
          })
        : configPTApproverApplication({
            t,
            action,
            approvers,
            selectedApprover,
            setSelectedApprover,
            selectFile: (e) => setFile(e.target.files[0]),
            uploadedFile,
            setUploadedFile,
            businessService,
          })
    );
  }, [action, approvers, financialYears, selectedFinancialYear, uploadedFile, t, businessService]);

  // Submit handler
  function submit() {
    if (!comments.trim()) {
      setError(t("ES_PT_REMARK_REQUIRED"));
      return;
    }

    if (!action?.showFinancialYearsModal) {
      const workflow = {
        action: action?.action,
        comment: comments,
        businessService,
        moduleName: moduleCode,
        assignes:
          action?.isTerminateState || !selectedApprover ? [] : [selectedApprover],
        ...(uploadedFile && {
          documents: [
            {
              documentType: `${action?.action} DOC`,
              fileName: file?.name,
              fileStoreId: uploadedFile,
            },
          ],
        }),
      };

      submitAction({ Property: { ...applicationData, workflow } });
    } else {
      submitAction({
        customFunctionToExecute: action?.customFunctionToExecute,
        Assessment: {
          financialYear: selectedFinancialYear?.name,
          propertyId: applicationData?.propertyId,
          tenantId,
          source: applicationData?.source,
          channel: applicationData?.channel,
          assessmentDate: Date.now(),
        },
      });
    }
  }

  // ==== UI ====
  return action && config.form ? (
    <div className="pop_modal_w">
    <Modal
   
     hideSubmit={true}
      isDisabled={
        !action.showFinancialYearsModal
          ? PTALoading || (action?.docUploadRequired && !uploadedFile)
          : !selectedFinancialYear
      }
      formId="modal-action"
    >
       <style>
    {`
      .pop_modal_w .popup-module {
      width:60% !important;
        border-radius: 20px !important;
      }
    `}
  </style>
      {financialYearsLoading ? (
        <Loader />
      ) : (
        <div style={styles.container}>
          <h2 style={styles.heading}>Forward to Approver</h2>

          {/* Remarks */}
          <div style={styles.field}>
            <label style={styles.label}>
              Remarks <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="comments"
              placeholder="Enter"
              value={comments}
              style={styles.input}
              onChange={(e) => setComments(e.target.value)}
            />
            {error && <div style={styles.error}>{t("Remark is required")}</div>}
          </div>

          {/* File Upload */}
         <div style={styles.uploadBox}>
      <div style={styles.uploadText}>
        <span style={{ fontWeight: "500" }}>Supporting Documents</span>
        <span style={styles.uploadSubtext}>
          JPG, PNG or PDF, file size no more than 2MB
        </span>
      </div>
      <div style={{display:"flex",flexDirection:"column",textAlign:"right"}}>
<span>
      <label style={styles.uploadBtn}>
        SELECT FILE
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label>
      </span>
      <span>{file?.name}</span>
      </div>
    </div>

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button type="button" onClick={closeModal} style={styles.btn}>
              Back
            </button>
            <button onClick={submit} type="submit" form="modal-action" style={styles.btn}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </Modal>
    </div>
  ) : (
    <div></div>
  );
};

// ==== Styles ====
const styles = {
  container: { padding: "20px", fontFamily: "Poppins" },
  heading: {
     fontFamily: "Poppins",
    fontWeight: 700,
    fontStyle: "normal",  // "Bold" is not valid, weight handles boldness
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#6B133F",
    marginBottom: "70px",
  },
  field: { marginBottom: "20px",width:"60%", marginLeft:"auto",
      marginRight:"auto" },
  label: { fontWeight: "500", fontSize: "14px", color: "#000" },
  input: {
    height:"40px",
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    borderRadius: "4px",
    border: "0.5px solid #D2D2D280",
    backgroundColor: "#F7F7F7",
  },
  error: { color: "red", marginTop: "10px" },
  // uploadBox: {
  //   border: "2px dashed #B0B0B0",
  //   borderRadius: "8px",
  //   padding: "20px",
  //   textAlign: "center",
  //   marginBottom: "30px",
  // },
  // uploadText: { fontSize: "14px", marginBottom: "10px" },
  // uploadSubtext: { color: "#666", fontSize: "12px" },
  // uploadBtn: {
  //   display: "inline-block",
  //   padding: "8px 18px",
  //   border: "1px solid #6B133F",
  //   borderRadius: "4px",
  //   color: "#6B133F",
  //   fontWeight: "500",
  //   cursor: "pointer",
  // },
  uploadBox: {
      border: "2px dashed #ccc",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      // width: "500px",
      backgroundColor: "#fff",
      marginBottom: "70px",
      width:"60%",
      marginLeft:"auto",
      marginRight:"auto"
    },
    uploadText: {
      display: "flex",
      flexDirection: "column",
    },
    uploadSubtext: {
      fontSize: "12px",
      color: "#777",
      marginTop: "4px",
    },
    uploadBtn: {
     border: "2px solid #6B133FB2",
      borderRadius: "6px",
      padding: "6px 16px",
      fontSize: "14px",
      color: "#6B133FB2",
      fontWeight: "500",
      cursor: "pointer",
      backgroundColor: "transparent",
    },
  btnRow: { display: "flex", justifyContent: "center", gap: "20px" },
  btn: {
    background: "#6B133F",
    color: "#fff",
    // padding: "10px 40px",
    height:"35px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    width: "326px",
  },
};

export default ActionModal;

