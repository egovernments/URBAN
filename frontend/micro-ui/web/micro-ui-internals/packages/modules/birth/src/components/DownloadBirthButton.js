import _ from "lodash";
import { Button as ButtonNew, Toast } from "@egovernments/digit-ui-components";
import React, { useState, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const DownloadBirthButton = ({ tenantId, certificateId }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);

  const usePdfDownloader = Digit.ComponentRegistryService.getComponent("usePdfBirthDownloader");
  const { initiateDownload, isDownloading, downloadError,isDownloaded } = usePdfDownloader(certificateId);

  const handleClick = (event) => {
    event.preventDefault();
    if (isDownloading) {
      return;
    }
    initiateDownload(tenantId, certificateId);
  };

  // Only show critical download errors
  useEffect(() => {
    if (downloadError) {
      console.error(`Download error for certificate ${certificateId}:`, downloadError);
      setShowToast({ 
        key: "error", 
        label: t("BND_CERT_GEN_ERROR") 
      });
    }
  }, [downloadError, certificateId, t]);

   useEffect(() => {
      if (isDownloaded) {
        window.location.reload(); // Refresh the page when download is complete
      }
    }, [isDownloaded]);

  return (
    <Fragment>
      <ButtonNew
        className="custom-class"
        label={isDownloading ? t("DOWNLOADING") : t("FREE_DOWNLOAD")}
        onClick={!isDownloading ? handleClick : undefined}
        title={isDownloading ? t("DOWNLOAD_IN_PROGRESS") : t("DOWNLOAD_CERTIFICATE")}
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
