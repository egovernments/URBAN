import React, { useEffect } from "react";
import { Button as ButtonNew } from "@egovernments/digit-ui-components"; 
import { usePdfDownloader } from "../../../components/usePdfDownloader";


const DownloadButton = ({ tenantId, idForFilenameAndMutation, directFileStoreId, t }) => {
 

  const { initiateDownload, isDownloading, downloadError ,isDownloaded} = usePdfDownloader(
    idForFilenameAndMutation, 
    directFileStoreId        
  );

  const handleClick = () => {
    if (isDownloading) return;
    initiateDownload(tenantId, idForFilenameAndMutation, directFileStoreId);
  };

  useEffect(() => {
    if (downloadError) {
      console.error(`DownloadButton: Download error for ID ${idForFilenameAndMutation}:`, downloadError);
    }
  }, [downloadError, idForFilenameAndMutation, t]);

   useEffect(() => {
      if (isDownloaded) {
        window.location.reload(); 
      }
    }, [isDownloaded]);

  return (
    <ButtonNew
      label={isDownloading ? t("BND_DOWNLOADING_LABEL", "Downloading...") : t("BND_DOWNLOAD_LABEL", "Download")}
      onClick={handleClick}
      title={isDownloading ? t("BND_DOWNLOAD_IN_PROGRESS_TOOLTIP", "Download in progress...") : t("BND_DOWNLOAD_CERTIFICATE_TOOLTIP", "Download Certificate")}
      variation="link"
      disabled={isDownloading}
      style={{minWidth: "150px", marginLeft: "10px", textAlign: "center",display: "contents"}}
    />
  );
};

// Helper to format epoch timestamp to dd-mm-yyyy
const formatDate = (epoch) => {
  if (!epoch && epoch !== 0) return "NA";
  try {
    const date = new Date(parseInt(epoch, 10));
    if (isNaN(date.getTime())) return "NA";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (e) {
    console.error("Error formatting date:", epoch, e);
    return "NA";
  }
};

// Helper to ensure a value is displayed or a placeholder
const getValue = (value, t) => {
  const naString = t("ES_COMMON_NA") || "NA";
  return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : naString;
};

// Function to get the translated application type
const getTranslatedApplicationType = (applicationType, t) => {
  if (!applicationType) {
    return getValue(null, t);
  }
  switch (applicationType.toUpperCase()) {
    case "CERT_DOWNLOAD":
      return t("BND_CERT_DOWNLOAD");
    default:
      const genericTypeKey = `BND_APP_TYPE_${applicationType.toUpperCase()}`;
      const translatedGenericType = t(genericTypeKey);
      return translatedGenericType !== genericTypeKey ? translatedGenericType : getValue(applicationType, t);
  }
};

// Function to get the translated application status (your current version)
const getTranslatedApplicationStatus = (status, t) => {
  if (!status) {
    return getValue(null, t);
  }
  let translationKey = "";
  const upperStatus = status.toUpperCase();

  if (upperStatus === "ACTIVE") {
    translationKey = "BND_STATUS_ACTIVE";
  } else if (status.toLowerCase() === "free download complete" || upperStatus === "FREE_DOWNLOAD") { // Handle both "free download complete" and "FREE_DOWNLOAD"
    translationKey = "BND_STATUS_FREE_DOWNLOAD";
  } else if (upperStatus === "PAID") {
    translationKey = "BND_STATUS_PAID";
  } else if (status.toLowerCase() === "paid and downloaded") {
    translationKey = "BND_STATUS_PAID_DOWNLOAD";
  } else if (status.toLowerCase() === "certificate generated") {
    translationKey = "BND_STATUS_PAID_PDF_GENERATED";
  } else {
    translationKey = `BND_STATUS_${upperStatus}`;
  }

  const translatedStatus = t(translationKey);
  if (translatedStatus !== translationKey) {
    return translatedStatus;
  } else {
    const genericWfStatusKey = `WF_STATUS_${upperStatus}`;
    const translatedWfStatus = t(genericWfStatusKey);
    return translatedWfStatus !== genericWfStatusKey ? translatedWfStatus : getValue(status, t);
  }
};


export const viewApplicationConfig = (applicationsArray, t, props = {}) => {
  if (!applicationsArray || applicationsArray.length === 0) {
    return {
      cards: [ { sections: [ { type: "DATA", cardHeader: { value: t("COMMON_NO_RESULTS_FOUND") }, values: [] } ] } ], 
      apiResponse: [],
      additionalDetails: {},
    };
  }
  const applicationCards = applicationsArray.map((appData, index) => {

    const rawStatus = appData.status;
    const translatedStatusDisplay = getTranslatedApplicationStatus(rawStatus, t);

  


    const idForDownloadLogic = appData.applicationNumber || appData.regNo || "certificate"; 
    const tenantIdForButton = appData.tenantId || props.tenantId;

    const cardValues = [
      {
        key: t("BND_APPL_DATE"),
        value: formatDate(appData.applicationDate),
      },
      {
        key: t("BND_CERT_REG_NO"),
        value: getValue(appData.regNo, t),
      },
      {
        key: t("BND_CERT_NAME"),
        value: getValue(appData.name, t),
      },
      {
        key: t("BND_APPL_TYPE"),
        value: getTranslatedApplicationType(appData.applicationType, t),
      },
      {
        key: t("BND_APPL_STATUS"),
        value: translatedStatusDisplay, 
      },
    ];

    

  const shouldShowDownloadButton =
        rawStatus &&
        rawStatus.toUpperCase() === "FREE_DOWNLOAD" &&
        appData.fileStoreId && 
         appData.fileStoreId !== "EXPIRED" &&
        idForDownloadLogic &&  
        tenantIdForButton;     
    if (shouldShowDownloadButton) {
      cardValues.push({
        key: t("BND_ACTIONS_LABEL", "Actions"),
        value: (
          <DownloadButton
            tenantId={tenantIdForButton}             
            idForFilenameAndMutation={idForDownloadLogic} 
            directFileStoreId={appData.fileStoreId}  
            t={t}
          />
        ),
        isComponent: true,
      });
    }

    return {
      sections: [
        {
          type: "DATA",
          values: cardValues,
          inlineStyles: {
            paddingBottom: "15px",
            marginBottom: "15px",
            borderBottom: applicationsArray.length - 1 === index ? "none" : "1px solid #e0e0e0"
          }
        },
      ],
    };
  });

  const config = {
    cards: applicationCards,
    apiResponse: applicationsArray,
    additionalDetails: {},
  };

  return config;
};