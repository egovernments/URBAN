import React from "react";

const AttachmentsSection = ({ t, styles, handleFileChange,formErrors }) => {
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
        color: "#1E509E"
      }}
      viewBox="0 0 24 24"
    >
      <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
    </svg>
  );

  return (
    <div>
      <div style={styles.assessmentStyle}>
        Attachments ( *Accepted File Type : JPG/PNG/PDF **Maximum File Size 2MB)
        </div>

      {/* Photo ID */}
      <div style={styles.div}>
        <div style={styles.poppinsLabel}>
          {t("Photo ID")} <span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <div style={styles.docBox}>
          <input
          style={{...styles.poppinsLabel,paddingLeft:"10px",paddingRight:"10px",fontSize:"13px"}}
            type="file"
            onChange={(e) => handleFileChange("photoId", e.target.files[0])}
          />
          {renderSvg()}
        </div>
          {formErrors?.photoId && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.photoId}</p>
        )}
      </div>

      {/* Ownership Document */}
      <div style={styles.div}>
        <div style={styles.poppinsLabel}>
          {t("Ownership Document")} <span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <div style={styles.docBox}>
          <input
          style={{...styles.poppinsLabel,paddingLeft:"10px",paddingRight:"10px",fontSize:"13px"}}
            type="file"
            onChange={(e) => handleFileChange("ownershipDoc", e.target.files[0])}
          />
          {renderSvg()}
        </div>
         {formErrors?.ownershipDoc && (
          <p style={{ color: "red", fontSize: "12px" }}>{formErrors.ownershipDoc}</p>
        )}
      </div>

      {/* Seller's Registry Copy */}
      <div style={styles.div}>
        <div style={styles.poppinsLabel}>{t("Sellers Registry Copy")}</div>
        <div style={styles.docBox}>
          <input
          style={{...styles.poppinsLabel,paddingLeft:"10px",paddingRight:"10px",fontSize:"13px"}}
            type="file"
            onChange={(e) => handleFileChange("sellersRegistry", e.target.files[0])}
          />
          {renderSvg()}
        </div>
      </div>

      {/* Last Tax Paid Receipt */}
      <div style={styles.div}>
        <div style={styles.poppinsLabel}>{t("Last Tax Paid Receipt By Seller")}</div>
        <div style={styles.docBox}>
          <input
          style={{...styles.poppinsLabel,paddingLeft:"10px",paddingRight:"10px",fontSize:"13px"}}
            type="file"
            onChange={(e) => handleFileChange("lastTaxReceipt", e.target.files[0])}
          />
          {renderSvg()}
        </div>
      </div>
    </div>
  );
};

export default AttachmentsSection;
