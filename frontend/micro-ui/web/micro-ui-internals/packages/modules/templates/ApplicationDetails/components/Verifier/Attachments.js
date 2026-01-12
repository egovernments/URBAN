

// import React, { useEffect, useState } from "react";
// import styles from "./IndexStyle";

// const AttachmentsSection = ({ t, documents }) => {
//   const [fileUrls, setFileUrls] = useState({});

//   useEffect(() => {
//     if (Array.isArray(documents) && documents.length > 0) {
//       const fileStoreIds = documents
//         .map((doc) => doc.fileStoreId)
//         .filter((id) => !!id);

//       if (fileStoreIds.length) {
//         Digit.UploadServices.Filefetch(fileStoreIds, Digit.ULBService.getStateId()).then((res) => {
//           setFileUrls(res?.data || {});
//         });
//       }
//     }
//   }, [documents]);

//   const renderSvg = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       fill="none"
//       stroke="#6b133f"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       style={{ marginLeft: "auto" }}
//       viewBox="0 0 24 24"
//     >
//       <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
//     </svg>
//   );

//   const renderFileInputUI = (label, fileStoreId, isMandatory = false) => {
//     const fileUrl = fileUrls[fileStoreId]?.split(",")[0];
//     const fileName = fileUrl ? decodeURIComponent(fileUrl.split("/").pop()) : "—";

//     return (
//       <div style={styles.flex30} key={fileStoreId}>
//         <div style={styles.poppinsLabel}>
//           {t(label)}{" "}
//           {isMandatory && <span className="mandatory" style={styles.mandatory}>*</span>}
//         </div>
//         <div style={styles.docBox}>
//           <label style={styles.fileLabel}>
//             <span style={styles.placeholderText}>
//               {fileUrl ? (
//                 <a
//                   href={fileUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   style={{ color: "#1E509E", textDecoration: "underline" }}
//                 >
//                     {t("View")}
//                 </a>
//               ) : (
//                 "Select a File"
//               )}
//             </span>
//             <span style={styles.icon}>{renderSvg()}</span>
//           </label>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div style={styles.assessmentStyle}>
//         Attachments ( *Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
//       </div>
//       <div className="form-section" style={styles.formSection}>
//         {Array.isArray(documents) &&
//           documents.map((doc) =>
//             renderFileInputUI(doc.documentType, doc.fileStoreId, doc.required)
//           )}
//       </div>
//     </div>
//   );
// };

// export default AttachmentsSection;

import React, { useEffect, useState } from "react";

const AttachmentsSection = ({ t = (label) => label, documents }) => {
  const [fileUrls, setFileUrls] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (Array.isArray(documents) && documents.length > 0) {
      const fileStoreIds = documents
        .map((doc) => doc.fileStoreId)
        .filter((id) => !!id);

      if (fileStoreIds.length) {
        Digit.UploadServices.Filefetch(fileStoreIds, Digit.ULBService.getStateId()).then((res) => {
          setFileUrls(res?.data || {});
        });
      }
    }
  }, [documents]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      stroke="#6b133f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
    </svg>
  );

  const renderFileBox = (label, fileStoreId, isMandatory = false) => {
    const fileUrl = fileUrls[fileStoreId]?.split(",")[0];
    const fileName = fileUrl ? decodeURIComponent(fileUrl.split("/").pop()) : "No file selected";

    return (
      <div style={styles.fileBox} key={fileStoreId}>
        <div style={styles.iconBox}>{renderSvg()}</div>
        <div style={styles.labelArea}>
          <label style={styles.fileLabel}>
            {t(label)} {isMandatory && <span style={{ color: "red" }}>*</span>}
          </label>
          <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
        </div>
        <div style={styles.buttonArea}>
          {fileUrl ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              style={styles.selectBtn}
            >
              View
            </a>
          ) : (
            <span style={styles.selectBtnDisabled}>No File</span>
          )}
          {/* <div style={styles.selectedFileText}>{fileName}</div> */}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.header}>Attachments</h3>
      <p style={styles.subHeader}>
        (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
      </p>
      <div
        style={{
          ...styles.gridContainer,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)"
        }}
      >
        {Array.isArray(documents) &&
          documents.map((doc) =>
            renderFileBox(doc.documentType, doc.fileStoreId, doc.required)
          )}
      </div>
    </div>
  );
};

export default AttachmentsSection;

// Reused styles from your first component
const styles = {
  wrapper: {
    background: "#fff",
    borderRadius: "8px",
  },
  header: {
    fontWeight: 700,
    fontSize: "18px",
    marginBottom: "5px",
    color: "#6B133F",
  },
  subHeader: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gap: "20px",
  },
  fileBox: {
    border: "2px dashed #aaa",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    minHeight: "90px",
  },
  iconBox: {
    flexShrink: 0,
  },
  labelArea: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  fileLabel: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
    color: "#333",
  },
  descText: {
    fontSize: "12px",
    color: "#888",
  },
  buttonArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  selectBtn: {
    backgroundColor: "#fff",
    color: "#6B133F",
    border: "1px solid #6B133F",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
    textDecoration: "none",
  },
  selectBtnDisabled: {
    backgroundColor: "#eee",
    color: "#999",
    border: "1px solid #ccc",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
  },
  selectedFileText: {
    fontSize: "12px",
    color: "#444",
    maxWidth: "140px",
    textAlign: "right",
    wordBreak: "break-word",
  },
};

