import _ from "lodash";
import { Button as ButtonNew } from "@egovernments/digit-ui-components";
import React, { useState, Fragment, useEffect } from "react";

// export const DownloadButton = ({ tenantId, certificateId }) => {
// const usePdfDownloader= Digit.ComponentRegistryService.getComponent("usePdfDownloader");
//     console.log(usePdfDownloader,"usePdfDownloaderusePdfDownloaderusePdfDownloader")
//   const { initiateDownload, isDownloading, downloadError } = usePdfDownloader(certificateId);

//   const handleClick = (event) => {
//     event.preventDefault();
//     if (isDownloading) {
//       console.log("Download already in progress for certificate:", certificateId);
//       return;
//     }
//     console.log(`DownloadButton clicked for cert: ${certificateId}, tenant: ${tenantId}`);
//     initiateDownload(tenantId, certificateId);
//   };

//   useEffect(() => {
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
  const usePdfDownloader = Digit.ComponentRegistryService.getComponent("usePdfDownloader");
  const { initiateDownload, isDownloading, downloadError, isDownloaded } = usePdfDownloader(certificateId); // Assuming usePdfDownloader returns isDownloaded status

  const handleClick = (event) => {
    event.preventDefault();
    if (isDownloading) {
      console.log("Download already in progress for certificate:", certificateId);
      return;
    }
    console.log(`DownloadButton clicked for cert: ${certificateId}, tenant: ${tenantId}`);
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
      label={isDownloading ? "Downloading..." : "Download"}
      onClick={!isDownloading ? handleClick : undefined}
      title={isDownloading ? "Download in progress..." : "Download Certificate"}
      variation="link"
      disabled={isDownloading}
    />
  );
};