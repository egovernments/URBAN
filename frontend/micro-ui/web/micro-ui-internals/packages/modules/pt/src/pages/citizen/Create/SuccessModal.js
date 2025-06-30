import React from "react";

const SuccessModal = ({ t, applicationNumber, propertyId, status, onClose, styles }) => {
  return (
    <div style={styles.successModal}>
      <div style={styles.successIcon}>
        <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
      </div>
      <h2 style={{ marginTop: "1rem" }}>{t("Application Submitted Successfully")}</h2>
      <p style={{ color: "gray" }}>
        {t("Application Number")}
        <br />
        {propertyId && <strong>{t("Property ID")}: {propertyId}</strong>}
      </p>
      <button onClick={onClose} style={styles.successButton}>
        {t("Home")}
      </button>
    </div>
  );
};

export default SuccessModal;



// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import generatePTAcknowledgementPDF from "../../../getPTAcknowledgementData";
// import { useHistory } from "react-router-dom";
// import { useQueryClient } from "react-query";
// import { Card, Banner, CardText, SubmitBar, Loader, LinkButton, Toast, ActionBar } from "@egovernments/digit-ui-react-components";
// // import { Digit } from "@egovernments/digit-ui-react-components";

// const SuccessModal = ({t, applicationNumber, propertyId,status, onClose, styles }) => {
//   // const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const history = useHistory();
//   const [error, setError] = useState(null);
//   const [showToast, setShowToast] = useState(null);
//   const [enableAudit, setEnableAudit] = useState(false);
//   const [mutationHappened, setMutationHappened] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
//   const [successData, setSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", false);

//   const closeToast = () => {
//     setShowToast(null);
//     setError(null);
//   };

//   const currentTenantId = Digit.ULBService.getCurrentTenantId();
//   const state = location?.state || {};
//   const mutation = Digit.Hooks.pt.usePropertyAPI(currentTenantId, state.key !== "UPDATE");

//   const { data: auditData } = Digit.Hooks.pt.usePropertySearch(
//     {
//       tenantId: currentTenantId,
//       filters: { propertyIds: propertyId, audit: true },
//     },
//     {
//       enabled: enableAudit,
//       select: (data) => data?.Properties?.filter((e) => e.status === "ACTIVE"),
//     }
//   );

//   useEffect(() => {
//     if (mutation.data && mutation.isSuccess) setSuccessData(mutation.data);
//   }, [mutation.data]);

//   useEffect(() => {
//     const onSuccess = (successRes) => {
//       setMutationHappened(true);
//       queryClient.clear();
//       if (successRes?.Properties?.[0]?.creationReason === "MUTATION") {
//         setEnableAudit(true);
//       }
//     };

//     const onError = (error) => {
//       setShowToast({ key: "error" });
//       setError(error?.response?.data?.Errors?.[0]?.message || null);
//     };

//     if (!mutationHappened) {
//       mutation.mutate(
//         {
//           Property: state?.Property,
//         },
//         {
//           onSuccess,
//           onError,
//         }
//       );
//     }
//   }, []);

//   const handleDownloadPdf = async () => {
//     const { Properties = [] } = mutation.data || successData || {};
//     const Property = Properties?.[0] || {};
//     const tenants = Digit.SessionStorage.get("initData")?.tenants || [];
//     const tenantInfo = tenants.find((tenant) => tenant.code === Property.tenantId);
//     const tenantIdToUse = Property.tenantId || currentTenantId;

//     const propertyDetails = await Digit.PTService.search({
//       tenantId: tenantIdToUse,
//       filters: { propertyIds: propertyId, status: "INACTIVE" },
//     });

//     Property.transferorDetails = propertyDetails?.Properties?.[0] || {};
//     Property.isTransferor = true;
//     Property.transferorOwnershipCategory = propertyDetails?.Properties?.[0]?.ownershipCategory;

//     const data = await generatePTAcknowledgementPDF({ ...Property, auditData }, tenantInfo, t);
//     Digit.Utils.pdf.generate(data);
//   };

//   return (
//     <div style={styles.successModal}>
//       <div style={styles.successIcon}>
//         <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
//       </div>
//       <h2 style={{ marginTop: "1rem" }}>{t("Application Submitted Successfully")}</h2>
//       <div  style={{ color: "gray" }}>
//         {t("Application Number")}: <strong>{applicationNumber}</strong>
//         <br />
//         {propertyId && (
//           <div>
//             {t("Property ID")}: <strong>{propertyId}</strong>
//           </div>
//         )}
//       </div>
//       <button onClick={onClose} style={styles.successButton}>
//         {t("Home")}
//       </button>
//     <SubmitBar style={{ overflow: "hidden" }} label={t("PT_DOWNLOAD_ACK_FORM")} onSubmit={handleDownloadPdf} />
//     </div>
//   );
// };

// export default SuccessModal;
