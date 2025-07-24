import { useState, useEffect, useRef } from 'react'; // Added useRef


export const usePdfBirthDownloader = (initialCertificateIdForFilename) => {
  const [filestoreIdToFetch, setFilestoreIdToFetch] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [currentCertificateIdForFilename, setCurrentCertificateIdForFilename] = useState(initialCertificateIdForFilename);
   const [isDownloaded, setIsDownloaded] = useState(false);

  const downloadAttemptedForId = useRef(null);

  const downloadIdMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/birth/_download",
  });

  const {
    data: fileStoreLinkData,
    isLoading: isFileLinkLoading,
    isFetching: isFileLinkFetching,
    error: fileStoreLinkError,
  } = Digit.Hooks.useCustomAPIHookV2({
    url: "/filestore/v1/files/url",
    method: "GET",
    params: {
      tenantId: Digit.ULBService.getStateId(),
      fileStoreIds: filestoreIdToFetch,
    },
    config: {
      enabled: !!filestoreIdToFetch, 
    },
    changeQueryName: `fileUrl_${filestoreIdToFetch || "new"}_${currentCertificateIdForFilename || "download"}`,
  });

  // Effect to trigger the actual browser download
  useEffect(() => {
    // Only proceed if we have data, a filestoreId it was fetched for, and we haven't tried this ID yet
    if (
      fileStoreLinkData?.fileStoreIds &&
      fileStoreLinkData.fileStoreIds.length > 0 &&
      filestoreIdToFetch && // Ensure we are reacting to a specific fetch request
      downloadAttemptedForId.current !== filestoreIdToFetch // Check if we already attempted this ID
    ) {
      downloadAttemptedForId.current = filestoreIdToFetch; // Mark as attempted for this ID

      const fileData = fileStoreLinkData.fileStoreIds[0];
      const fileUrl = fileData?.url;

      if (fileUrl && currentCertificateIdForFilename) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.download = `birth_certificate_${currentCertificateIdForFilename}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadError(null);
        setIsDownloaded(true);
      } else {
        console.error("usePdfDownloader: Filestore response no URL or missing filename ID.");
        setDownloadError("Could not retrieve download link.");
      }
      // Reset states AFTER attempting the download, regardless of link click success
      setIsDownloading(false);
      setFilestoreIdToFetch(null); // Crucial: Reset to prevent re-entry with same data
                                  // This also disables the filestore hook.
    } else if (fileStoreLinkError && filestoreIdToFetch) { // Handle error only if related to current fetch attempt
      console.error("usePdfDownloader: Error fetching file link:", fileStoreLinkError);
      setDownloadError("Error fetching file link.");
      setIsDownloading(false);
      setFilestoreIdToFetch(null); // Reset on error
      downloadAttemptedForId.current = null; // Allow retry on next initiateDownload
    }
    // Removed !isFileLinkLoading && !isFileLinkFetching from the conditions for the main success block
    // as fileStoreLinkData being present should be sufficient.
    // The `else if (fileStoreLinkData && filestoreIdToFetch ...)` was potentially redundant.
  }, [
    fileStoreLinkData,
    currentCertificateIdForFilename,
    filestoreIdToFetch, // Important dependency
    fileStoreLinkError,
    // isFileLinkLoading, isFileLinkFetching // Less critical here if data is present
  ]);

  const initiateDownload = (tenantIdForMutation, idForMutationOrFilename, directFileStoreId = null) => {


    setCurrentCertificateIdForFilename(idForMutationOrFilename);
    setDownloadError(null); // Clear previous errors
    setIsDownloading(true); // Set loading true immediately


    downloadAttemptedForId.current = null; // Reset attempt flag for new download request

    if (directFileStoreId) {

      setFilestoreIdToFetch(null); 
      setTimeout(() => {

        setFilestoreIdToFetch(directFileStoreId);
      }, 0); // Trigger filestore hook
      return;
    }

    if (!idForMutationOrFilename || !tenantIdForMutation) {
      console.error("usePdfDownloader: For 2-step, ID or Tenant ID missing.");
      setDownloadError("Missing info for 2-step download.");
      setIsDownloading(false);
      return;
    }

    setFilestoreIdToFetch(null); 


    downloadIdMutation.mutate(
      { params: { tenantId: tenantIdForMutation, id: idForMutationOrFilename, source: "web" } },
      {
        onSuccess: (response) => {
         
          if (!response?.filestoreId) {
            setDownloadError("Failed to get download reference.");
            setIsDownloading(false); // Stop loading if mutation gives no ID
            return;
          }
          setFilestoreIdToFetch(response.filestoreId); // This will trigger filestore hook
        
        },
        onError: (error) => {
          console.error("usePdfDownloader: Error in mutation step:", error);
          setDownloadError("Error in mutation step.");
          setIsDownloading(false);
        
        },
      }
    );
  };
  
  // Effect to manage combined isDownloading state
  useEffect(() => {
    const mutationIsLoading = downloadIdMutation.isLoading;

    if (mutationIsLoading || (filestoreIdToFetch && (isFileLinkLoading || isFileLinkFetching))) {
        if (!isDownloading) {
          setIsDownloading(true);
        }
    }
    
  }, [downloadIdMutation.isLoading, filestoreIdToFetch, isFileLinkLoading, isFileLinkFetching, isDownloading]);


  
   useEffect(() => {
    if (isDownloaded) {
      const timer = setTimeout(() => {
        setIsDownloaded(false);
      }, 3000); // Reset after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isDownloaded]);

  return {
    initiateDownload,
    isDownloading,
    downloadError,
    isDownloaded,
  };
};