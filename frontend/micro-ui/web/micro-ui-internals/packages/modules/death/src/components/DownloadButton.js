import _ from "lodash";
import { Button as ButtonNew } from "@egovernments/digit-ui-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
//     if (downloadError) {
//       console.error(`Download error for certificate ${certificateId}:`, downloadError);
//     }
//   }, [downloadError, certificateId]);

//   return (
//     <ButtonNew
//       className="custom-class"
//       label={isDownloading ? "Downloading..." : "Download"}
//       onClick={!isDownloading ? handleClick : undefined}
//       title={isDownloading ? "Download in progress..." : "Download Certificate"}
//       variation="link"
//       disabled={isDownloading}
//     />
//   );
// };

export const DownloadButton = ({ tenantId, certificateId }) => {
   const { t } = useTranslation();
  const usePdfDownloader = Digit.ComponentRegistryService.getComponent("usePdfDownloader");
  const { initiateDownload, isDownloading, downloadError, isDownloaded } = usePdfDownloader(certificateId); // Assuming usePdfDownloader returns isDownloaded status

  const handleClick = (event) => {
    event.preventDefault();
    if (isDownloading) {
      return;
    }
    initiateDownload(tenantId, certificateId);
  };

  useEffect(() => {
    if (downloadError) {
      console.error(`Download error for certificate ${certificateId}:`, downloadError);
    }
  }, [downloadError, certificateId]);

  useEffect(() => {
    if (isDownloaded) {
      window.location.reload(); // Refresh the page when download is complete
    }
  }, [isDownloaded]);

  return (
    <ButtonNew
      className="custom-class"
      label={isDownloading ? t("DOWNLOADING") : t("FREE_DOWNLOAD")}
      onClick={!isDownloading ? handleClick : undefined}
      title={isDownloading ? t("DOWNLOAD_IN_PROGRESS") : t("DOWNLOAD_CERTIFICATE")}
      variation="link"
      disabled={isDownloading}
    />
  );
};