import React, { useEffect, useState } from "react";
import styles from "./IndexStyle";

const AttachmentsSection = ({ t, documents }) => {
  const [fileUrls, setFileUrls] = useState({});

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

  const renderFile = (label, fileStoreId, isMandatory = false) => {
    const fileUrl = fileUrls[fileStoreId]?.split(",")[0];
  const isStarred = ["OWNER.IDENTITYPROOF.VOTERID", "OWNER.SPECIALCATEGORYPROOF.BPLDOCUMENT"].includes(label);
    return (
      <div style={styles.div} key={fileStoreId}>
        <div style={styles.poppinsLabel}>
          {t(label)}{" "}
          {isStarred && <span className="mandatory" style={styles.mandatory}>*</span>}
        </div>
        <div style={styles.docBox}>
          <div style={{ padding: "8px 12px", fontSize: "14px", color: "#000", flex: 1 }}>
            {fileUrl ? (
              <a href={fileUrl} target="_blank" rel="noreferrer" style={{ color: "#1E509E", textDecoration: "underline" }}>
                {t("View")}
              </a>
            ) : (
              "—"
            )}
          </div>
          {renderSvg()}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.assessmentStyle}>{t("Attachments")}</div>

      {Array.isArray(documents) &&
        documents.map((doc) =>
          renderFile(doc.documentType, doc.fileStoreId)
        )}
    </div>
  );
};

export default AttachmentsSection;
