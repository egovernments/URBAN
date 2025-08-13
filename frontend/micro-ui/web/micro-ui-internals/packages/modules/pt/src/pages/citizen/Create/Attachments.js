
// import React, { useState } from "react";

// const AttachmentsSection = ({ t = (label) => label, handleFileChange, formErrors = {} }) => {
//   const [selectedFiles, setSelectedFiles] = useState({});

//   const onFileChange = (key, file) => {
//     handleFileChange(key, file);
//     setSelectedFiles((prev) => ({ ...prev, [key]: file?.name || "" }));
//   };

//   const renderSvg = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="32"
//       height="32"
//       fill="none"
//       stroke="#6b133f"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       viewBox="0 0 24 24"
//     >
//       <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
//     </svg>
//   );

//   const renderFileInput = (id, label, isRequired = false) => (
//     <div style={styles.fileBox}>
//       <div style={styles.iconBox}>{renderSvg()}</div>
//       <div style={styles.labelArea}>
//         <label style={styles.fileLabel}>
//           {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>}
//         </label>
//         <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
//       </div>

//       <input
//         id={id}
//         type="file"
//         style={{ display: "none" }}
//         onChange={(e) => onFileChange(id, e.target.files[0])}
//       />
//       <div style={styles.buttonArea}>
//         <label htmlFor={id} style={styles.selectBtn}>SELECT FILE</label>
//         <div style={styles.selectedFileText}>
//           {selectedFiles[id] || "No file selected"}
//         </div>
//       </div>

//       {formErrors?.[id] && (
//         <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{formErrors[id]}</p>
//       )}
//     </div>
//   );

//   return (
//     <div style={styles.wrapper}>
//       <h3 style={styles.header}>Attachments</h3>
//       <p style={styles.subHeader}>
//         (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
//       </p>
//       <div style={styles.gridContainer}>
//         {renderFileInput("photoId", "Photo ID", true)}
//         {renderFileInput("ownershipDoc", "Ownership Document", true)}
//         {renderFileInput("sellersRegistry", "Sellers Registry Copy")}
//       </div>
//     </div>
//   );
// };

// export default AttachmentsSection;

// // Inline styles
// const styles = {
//   wrapper: {
//     background: "#fff",
//     // padding: "20px",
//     borderRadius: "8px",
//     // boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
//     // margin: "10px 0",
//   },
//   header: {
//     fontWeight: 700,
//     fontSize: "18px",
//     marginBottom: "5px",
//     color: "#6B133F",
//   },
//   subHeader: {
//     fontSize: "12px",
//     color: "#555",
//     marginBottom: "20px",
//   },
//   gridContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "20px",
//   },
//   fileBox: {
//     border: "2px dashed #aaa",
//     borderRadius: "8px",
//     padding: "16px",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     position: "relative",
//     minHeight: "90px",
//   },
//   iconBox: {
//     flexShrink: 0,
//   },
//   labelArea: {
//     flex: "1",
//     display: "flex",
//     flexDirection: "column",
//   },
//   fileLabel: {
//     fontWeight: "600",
//     fontSize: "14px",
//     marginBottom: "4px",
//     color: "#333",
//   },
//   descText: {
//     fontSize: "12px",
//     color: "#888",
//   },
//   buttonArea: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-end",
//     gap: "4px",
//   },
//   selectBtn: {
//     backgroundColor: "#fff",
//     color: "#6B133F",
//     border: "1px solid #6B133F",
//     padding: "6px 12px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   selectedFileText: {
//     fontSize: "12px",
//     color: "#444",
//     maxWidth: "140px",
//     textAlign: "right",
//     wordBreak: "break-word",
//   },
// };



import React, { useState, useEffect } from "react";

const AttachmentsSection = ({ t = (label) => label, handleFileChange, formErrors = {} }) => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFileChange = (key, file) => {
    handleFileChange(key, file);
    setSelectedFiles((prev) => ({ ...prev, [key]: file?.name || "" }));
  };

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

  const renderFileInput = (id, label, isRequired = false) => (
    <div style={styles.fileBox}>
      <div style={styles.iconBox}>{renderSvg()}</div>
      <div style={styles.labelArea}>
        <label style={styles.fileLabel}>
          {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <div style={styles.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
      </div>

      <input
        id={id}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(id, e.target.files[0])}
      />
      <div style={styles.buttonArea}>
        <label htmlFor={id} style={styles.selectBtn}>SELECT FILE</label>
        <div style={styles.selectedFileText}>
          {selectedFiles[id] || "No file selected"}
        </div>
      </div>

      {formErrors?.[id] && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{formErrors[id]}</p>
      )}
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.header}>Attachments</h3>
      <p style={styles.subHeader}>
        (*Accepted File Type: JPG/PNG/PDF **Maximum File Size: 2MB)
      </p>
      <div style={{
        ...styles.gridContainer,
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)"
      }}>
        {renderFileInput("photoId", "Photo ID", true)}
        {renderFileInput("ownershipDoc", "Ownership Document", true)}
        {renderFileInput("sellersRegistry", "Sellers Registry Copy")}
      </div>
    </div>
  );
};

export default AttachmentsSection;

// Inline styles
const styles = {
  wrapper: {
    background: "#fff",
    // padding: "20px",
    borderRadius: "8px",
    // boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
    // margin: "10px 0",
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
  },
  selectedFileText: {
    fontSize: "12px",
    color: "#444",
    maxWidth: "140px",
    textAlign: "right",
    wordBreak: "break-word",
  },
};