// import {
//   CardLabel,
//   CardLabelError,
//   LabelFieldPair,
// } from "@egovernments/digit-ui-react-components";
// import React from "react";

// const AttachmentsSection = ({ t, config, onSelect, formData = {}, userType }) => {
//   const [documents, setDocuments] = React.useState(formData?.documents || {});
//   const [error, setError] = React.useState("");

//   const labelStyle = {
//     textAlign: "left",
//     marginBottom: "0px",
//     display: "content",
//     lineHeight: "inherit",
//     fontFamily: "Poppins",
//     fontWeight: 500,
//     fontSize: "16px",
//     color: "#282828",
//   };

//   const fieldStyle = {
//     marginBottom: "16px",
//   };

//   const fileInputStyle = {
//     width: "300px",
//   };

//   const errorStyle = {
//     width: "70%",
//     marginLeft: "30%",
//     fontSize: "12px",
//     marginTop: "-21px",
//     color: "#d4351c",
//   };

//   const handleFileChange = (key, file) => {
//     const updatedDocs = { ...documents, [key]: file };
//     setDocuments(updatedDocs);
//     onSelect(config.key, updatedDocs);
//   };

//   if (userType === "employee") {
//     return (
//       <div>
//         {/* Photo ID */}
//         <LabelFieldPair style={{ display: "block", ...fieldStyle }}>
//           <CardLabel style={labelStyle}>
//             {t("Photo Id")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
//           </CardLabel>
//           <div className="field">
//             <input
//               type="file"
//               style={fileInputStyle}
//               onChange={(e) => handleFileChange("photoId", e.target.files[0])}
//             />
//           </div>
//         </LabelFieldPair>

//         {/* Ownership Document */}
//         <LabelFieldPair style={{ display: "block", ...fieldStyle }}>
//           <CardLabel style={labelStyle}>
//             {t("Ownership document")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
//           </CardLabel>
//           <div className="field">
//             <input
//               type="file"
//               style={fileInputStyle}
//               onChange={(e) => handleFileChange("ownershipDoc", e.target.files[0])}
//             />
//           </div>
//         </LabelFieldPair>

//         {/* Sellers Registry Copy */}
//         <LabelFieldPair style={{ display: "block", ...fieldStyle }}>
//           <CardLabel style={labelStyle}>{t("Sellers registry copy")}</CardLabel>
//           <div className="field">
//             <input
//               type="file"
//               style={fileInputStyle}
//               onChange={(e) => handleFileChange("sellersRegistry", e.target.files[0])}
//             />
//           </div>
//         </LabelFieldPair>

//         {/* Last TAX Paid Receipt */}
//         <LabelFieldPair style={{ display: "block", ...fieldStyle }}>
//           <CardLabel style={labelStyle}>{t("Last TAX paid receipt by seller")}</CardLabel>
//           <div className="field">
//             <input
//               type="file"
//               style={fileInputStyle}
//               onChange={(e) => handleFileChange("lastTaxReceipt", e.target.files[0])}
//             />
//           </div>
//         </LabelFieldPair>

//         {error ? <CardLabelError style={errorStyle}>{error}</CardLabelError> : null}
//       </div>
//     );
//   }

//   return null;
// };

// export default AttachmentsSection;

// import {
//   CardLabel,
//   CardLabelError,
//   LabelFieldPair,
// } from "@egovernments/digit-ui-react-components";
//  // Make sure this is correct or replace with an inline SVG/icon
// import React from "react";

// const AttachmentsSection = ({ t, config, onSelect, formData = {}, userType }) => {
//   const [documents, setDocuments] = React.useState(formData?.documents || {});
//   const [error, setError] = React.useState("");

//   const fields = [
//     { key: "photoId", label: "Photo ID", required: true },
//     { key: "ownershipDoc", label: "Ownership document", required: true },
//     { key: "sellersRegistry", label: "Sellers registry copy" },
//     { key: "lastTaxReceipt", label: "Last TAX paid receipt by seller" },
//   ];

//   const handleFileChange = (key, file) => {
//     const updatedDocs = { ...documents, [key]: file };
//     setDocuments(updatedDocs);
//     onSelect(config.key, updatedDocs);
//   };

//   if (userType !== "employee") return null;

//   return (
//     <div style={{ padding: "1rem 0" }}>
//       {/* Note */}
//       <div style={{ fontSize: "14px", color: "#6B133F", fontWeight: "500", fontFamily: "Poppins", marginBottom: "1rem" }}>
//         <span style={{ textDecoration: "underline", cursor: "pointer" }}>
//           Attachments
//         </span>{" "}
//         (<span style={{ fontWeight: "400" }}>*Accepted file type : JPG/PNG/PDF **Maximum file size 2MB</span>)
//       </div>

//       {/* Document upload fields */}
//       {fields.map((field) => (
//         <div key={field.key} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
//           <div style={{ width: "200px", fontSize: "14px", fontFamily: "Poppins", fontWeight: field.required ? "500" : "400", color: "#282828" }}>
//             <span style={{ textDecoration: "underline", color: "#6B133F", cursor: "pointer" }}>
//               {t(field.label)}
//             </span>
//             {field.required && <span style={{ color: "#d4351c" }}> *</span>}
//           </div>
//           <div style={{ flexGrow: 1 }}>
//             <input
//               type="file"
//               style={{
//                 width: "100%",
//                 maxWidth: "250px",
//                 padding: "6px",
//                 border: "1px solid #D6D5D4",
//                 borderRadius: "6px",
//                 fontFamily: "Poppins",
//               }}
//               onChange={(e) => handleFileChange(field.key, e.target.files[0])}
//             />
//           </div>
//           <div style={{ marginLeft: "10px" }}>
//             <UploadIcon fill="#6B133F" width="18px" height="18px" />
//           </div>
//         </div>
//       ))}

//       {error ? <CardLabelError style={{ fontSize: "12px", color: "#d4351c" }}>{error}</CardLabelError> : null}
//     </div>
//   );
// };

// export default AttachmentsSection;


import {
  CardLabel,
  CardLabelError,
  LabelFieldPair,
} from "@egovernments/digit-ui-react-components";
import React from "react";

const AttachmentsSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const [documents, setDocuments] = React.useState(formData?.documents || {});
  const [error, setError] = React.useState("");

  const fields = [
    { key: "photoId", label: "Photo ID", required: true },
    { key: "ownershipDoc", label: "Ownership document", required: true },
    { key: "sellersRegistry", label: "Sellers registry copy" },
    { key: "lastTaxReceipt", label: "Last TAX paid receipt by seller" },
  ];

  const handleFileChange = (key, file) => {
    const updatedDocs = { ...documents, [key]: file };
    setDocuments(updatedDocs);
    onSelect(config.key, updatedDocs);
  };

  const renderSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      stroke="#1E509E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "#1E509E",
      }}
      viewBox="0 0 24 24"
    >
      <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
    </svg>
  );

  if (userType !== "employee") return null;

  return (
    <div style={{ padding: "1rem 0" }}>
      {/* Note */}
      <div style={{ fontSize: "14px", color: "#6B133F", fontWeight: "500", fontFamily: "Poppins", marginBottom: "1rem" }}>
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          Attachments
        </span>{" "}
        (<span style={{ fontWeight: "400" }}>*Accepted file type : JPG/PNG/PDF **Maximum file size 2MB</span>)
      </div>

      {/* Document upload fields */}
      {fields.map((field) => (
        <div key={field.key} style={{ display: "flex", alignItems: "center", marginBottom: "1rem", position: "relative" }}>
          <div style={{ width: "200px", fontSize: "14px", fontFamily: "Poppins", fontWeight: field.required ? "500" : "400", color: "#282828" }}>
            <span style={{ textDecoration: "underline", color: "#6B133F", cursor: "pointer" }}>
              {t(field.label)}
            </span>
            {field.required && <span style={{ color: "#d4351c" }}> *</span>}
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="file"
              style={{
                width: "100%",
                maxWidth: "250px",
                padding: "6px 30px 6px 8px",
                border: "1px solid #D6D5D4",
                borderRadius: "6px",
                fontFamily: "Poppins",
              }}
              onChange={(e) => handleFileChange(field.key, e.target.files[0])}
            />
            {renderSvg()}
          </div>
        </div>
      ))}

      {error ? <CardLabelError style={{ fontSize: "12px", color: "#d4351c" }}>{error}</CardLabelError> : null}
    </div>
  );
};

export default AttachmentsSection;
