import React, { useEffect } from "react";
import { Button as ButtonNew } from "@egovernments/digit-ui-components"; 
import { usePdfBirthDownloader } from "../../../../components/usePdfBirthDownloader";

const DownloadButton = ({ tenantId, idForFilenameAndMutation, directFileStoreId, t }) => {
    const { initiateDownload, isDownloading, downloadError } = usePdfBirthDownloader(idForFilenameAndMutation, directFileStoreId);

    const handleClick = () => {
        if (isDownloading) return;
        initiateDownload(tenantId, idForFilenameAndMutation, directFileStoreId);
    };

    useEffect(() => {
        if (downloadError) {
            console.error(`DownloadButton: Download error for ID ${idForFilenameAndMutation}:`, downloadError);
        }
    }, [downloadError, idForFilenameAndMutation, t]);

    return (
        <ButtonNew
            label={isDownloading ? t("BND_DOWNLOADING_LABEL", "Downloading...") : t("BND_DOWNLOAD_LABEL", "Download")}
            onClick={handleClick}
            title={isDownloading ? t("BND_DOWNLOAD_IN_PROGRESS_TOOLTIP", "Download in progress...") : t("BND_DOWNLOAD_CERTIFICATE_TOOLTIP", "Download Certificate")}
            variation="link"
            disabled={isDownloading}
            style={{minWidth: "150px", marginLeft: "10px", textAlign: "center", display: "contents"}}
        />
    );
};

// Formats epoch date to DD-MM-YYYY or returns "NA"
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

// Returns value or "NA" if empty/null
const getValue = (value, t) => {
    const naString = t("ES_COMMON_NA") || "NA";
    return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : naString;
};

// Returns translated application type or fallback
const getTranslatedApplicationType = (applicationType, t) =>  {
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

// Returns translated application status or fallback
const getTranslatedApplicationStatus = (status, t) => {
    if (!status) return getValue(null, t);
    const upperStatus = status.toUpperCase();
    let translationKey = `BND_STATUS_${upperStatus}`;

    if (status.toLowerCase() === "free download complete") {
        translationKey = "BND_STATUS_FREE_DOWNLOAD";
    } else if (status.toLowerCase() === "paid and downloaded") {
        translationKey = "BND_STATUS_PAID_DOWNLOAD";
    } else if (status.toLowerCase() === "certificate generated") {
        translationKey = "BND_STATUS_PAID_PDF_GENERATED";
    }

    const translatedStatus = t(translationKey);
    if (translatedStatus !== translationKey) return translatedStatus;

    const genericWfStatusKey = `WF_STATUS_${upperStatus}`;
    const translatedWfStatus = t(genericWfStatusKey);
    return translatedWfStatus !== genericWfStatusKey ? translatedWfStatus : getValue(status, t);
};

/**
 * Generates the configuration for ViewComposer to display Birth Application cards.
 * @param {Array} applicationsArray - Array of birth application objects from the API.
 * @param {Function} t - Translation function.
 * @param {Object} props - Additional props, like a fallback tenantId.
 * @returns {Object} - Configuration object for ViewComposer.
 */
export const viewBirthApplicationConfig = (applicationsArray, t, props = {}) => {
    if (!applicationsArray || applicationsArray.length === 0) {
        return {
            cards: [{ sections: [{ type: "DATA", cardHeader: { value: t("BND_NO_BIRTH_APPLICATIONS_FOUND", "No Birth Applications Found") }, values: [] }] }],
            apiResponse: [],
            additionalDetails: {},
        };
    }

    const applicationCards = applicationsArray.map((appData, index) => {
        const rawStatus = appData.status;
        const translatedStatusDisplay = getTranslatedApplicationStatus(rawStatus, t);

        const idForDownloadLogic = appData.applicationNumber || appData.regNo || "birth_certificate"; 
        const tenantIdForButton = appData.tenantId || props.tenantId;

        const cardValues = [
            {
                key: t("BND_APPL_DATE"),
                value: formatDate(appData.applicationDate),
            },
            {
                key: t("BND_BIRTH_DOB"),
                value: formatDate(appData.dateOfBirth),
            },
            {
                key: t("BND_COMMON_TABLE_REGNO"),
                value: getValue(appData.regNo, t),
            },
            {
                key: t("BND_COMMON_NAME"),
                value: getValue(appData.name, t),
            },
            {
                key: t("BND_COMMON_MOTHERSNAME"),
                value: getValue(appData.motherName, t),
            },
            {
                key: t("BND_COMMON_FATHERSNAME"),
                value: getValue(appData.fatherName, t),
            },
            {
                key: t("BND_APPL_TYPE", "Application Type"),
                value: getTranslatedApplicationType(appData.applicationType, t),
            },
            {
                key: t("BND_APPL_STATUS", "Application Status"),
                value: translatedStatusDisplay,
            },
        ];

        // Show download button if status is FREE_DOWNLOAD and fileStoreId is valid
        const shouldShowDownloadButton =
            rawStatus?.toUpperCase() === "FREE_DOWNLOAD" &&
            appData.fileStoreId && 
            appData.fileStoreId !== "EXPIRED" &&
            idForDownloadLogic &&  
            tenantIdForButton;     
            
        if (shouldShowDownloadButton) {
            cardValues.push({
                key: t("BND_COMMON_TABLE_ACTION"),
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

    return {
        cards: applicationCards,
        apiResponse: applicationsArray,
        additionalDetails: {},
    };
};
