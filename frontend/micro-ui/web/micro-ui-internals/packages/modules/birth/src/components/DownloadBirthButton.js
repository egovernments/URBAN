import _ from "lodash";
import { Button as ButtonNew, Toast } from "@egovernments/digit-ui-components";
import React, { useState, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const DownloadBirthButton = ({ tenantId, certificateId }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);

  const usePdfDownloader = Digit.ComponentRegistryService.getComponent("usePdfBirthDownloader");
  // console.log(usePdfDownloader, "usePdfDownloaderusePdfDownloaderusePdfDownloader");
  const { initiateDownload, isDownloading, downloadError } = usePdfDownloader(certificateId);

  const handleClick = (event) => {
    event.preventDefault();
    if (isDownloading) {
      // console.log("Download already in progress for certificate:", certificateId);
      return;
    }
    // console.log(`DownloadButton clicked for cert: ${certificateId}, tenant: ${tenantId}`);
    initiateDownload(tenantId, certificateId);
  };

  // Only show critical download errors
  useEffect(() => {
    if (downloadError) {
      console.error(`Download error for certificate ${certificateId}:`, downloadError);
      setShowToast({ 
        key: "error", 
        label: t("BND_DOWNLOAD_FAILED") 
      });
    }
  }, [downloadError, certificateId, t]);

  return (
    <Fragment>
      <ButtonNew
        className="custom-class"
        label={isDownloading ? "Downloading..." : "Download"}
        onClick={!isDownloading ? handleClick : undefined}
        title={isDownloading ? "Download in progress..." : "Download Certificate"}
        variation="link"
        disabled={isDownloading}
      />
      {showToast && (
        <Toast
          error={showToast.key === "error"}
          label={showToast.label}
          onClose={() => setShowToast(null)}
        />
      )}
    </Fragment>
  );
};
