import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useLocation, useHistory } from "react-router-dom";
import { Button, Footer } from "@egovernments/digit-ui-components";
import { ViewComposer, Loader } from "@egovernments/digit-ui-react-components";
import viewDeathConfig from "./viewDeathConfig";
import { useTranslation } from "react-i18next";
import { usePdfDownloader } from "../../../components/usePdfDownloader"; 

const ViewDeath = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.myData; // This is the certificate ID
  const Hospitalname = location.state?.myhospitalname;
  const tenantId = location.state?.mytenantId || Digit.ULBService.getCurrentTenantId(); 
  const currentLocalTenantId = Digit.ULBService.getCurrentTenantId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;

  const useDeathDownload= Digit.ComponentRegistryService.getComponent("useDeathDownload");
  const { downloadApi } = useDeathDownload();
  // --- State for UI and Data ---
  const [config, setConfig] = useState(null);
  const [showPayAndDownload, setShowPayAndDownload] = useState(false); // To control which button to show
  

  // --- Custom Hooks ---
  const {
    initiateDownload: initiateFreeDownload, // Rename for clarity
    isDownloading: isFreeDownloading,
    downloadError: freeDownloadError,
    isDownloaded
  } = usePdfDownloader(id); // 'id' is for filename in hook


  // --- Fetch Certificate View Data ---
  const {
    data: certificateViewData,
    isLoading: isViewDataLoading,
    error: viewDataError,
  } = Digit.Hooks.useCustomAPIHook({
    url: "/birth-death-services/death/_viewfullcertdata",
    method: "POST",
    params: { tenantId: currentLocalTenantId, id },
    body: {
      RequestInfo: { apiId: "Rainmaker", ver: ".01", /* ... other RequestInfo params ... */ authToken },
    },
    headers: { "Content-Type": "application/json" },
    changeQueryName: `deathCertData_${id}`,
    config: {
      enabled: !!id && !!currentLocalTenantId,
    },
  });

  // --- Effect to set up ViewComposer config and determine button type ---
  useEffect(() => {
    if (certificateViewData?.DeathCertificate && certificateViewData.DeathCertificate.length > 0) {
      const certData = certificateViewData.DeathCertificate[0];

      // Prepare data for ViewComposer
      const certsForView = [{ ...certData }]; // Create a new array/object for safety
      if (Hospitalname) { // Only add if Hospitalname is present
        certsForView[0].hospitalname = Hospitalname;
      }
      const viewConfig = viewDeathConfig(certsForView, id, currentLocalTenantId, t);
      setConfig(viewConfig);

      // Determine which button to show based on counter
      if (certData.counter >= 1) {
        setShowPayAndDownload(true);
      } else {
        setShowPayAndDownload(false);
      }
    } else if (certificateViewData && (!certificateViewData.DeathCertificate || certificateViewData.DeathCertificate.length === 0)) {
        console.warn("ViewDeath: DeathCertificate array is missing or empty in the response.");
    }
  }, [certificateViewData, Hospitalname, id, currentLocalTenantId, t]);


  // --- Event Handlers ---
  const handleEditClick = () => {
    const certs = certificateViewData?.DeathCertificate;
    if (certs && certs.length > 0) {
      const certToEdit = { ...certs[0] };
      if (Hospitalname) certToEdit.hospitalname = Hospitalname; // Ensure hospitalname is included if passed
      history.push(
        `/${window.contextPath}/employee/death/death-common/update-death?action=EDIT&certificateId=${id}&module=death`,
        { editdata: certToEdit, certificateId: id, module: "death" }
      );
    } else {
      console.error("ViewDeath: No certificate data found to edit.");
    }
  };

  const handleFreeDownload = () => {
    initiateFreeDownload(currentLocalTenantId, id);
  };

  
  const handlePayAndDownload = async () => {
  // let consumerCode;
  
  // try {
  //   consumerCode = await downloadApi(tenantId, id);
  // } catch (error) {
  //   console.error("Error fetching consumer code:", error);
  //   consumerCode = `DT-FALLBACK-${Date.now()}`; // Example fallback
  // }


  // const businessService = "DEATH_CERT";
  // history.push(`/digit-ui/employee/payment/collect/${businessService}/${consumerCode}/tenantId=${tenantId}?workflow=death`);
   const fallbackConsumerCode = `DT-${id}-${Date.now()}`;
  
  const apiPromise = downloadApi(tenantId, id)
    .then(realCode => realCode || fallbackConsumerCode)
    .catch(() => fallbackConsumerCode);

  // Navigate immediately with fallback code
  const businessService = "DEATH_CERT";
  history.push(
    `/digit-ui/employee/payment/collect/${businessService}/${fallbackConsumerCode}/tenantId=${tenantId}?workflow=death`
  );

  // If we get a different code from API, update the URL
  const finalConsumerCode = await apiPromise;
  if (finalConsumerCode !== fallbackConsumerCode) {
    history.replace(
      `/digit-ui/employee/payment/collect/${businessService}/${finalConsumerCode}/tenantId=${tenantId}?workflow=death`
    );
  }
};



 useEffect(() => {
    if (isDownloaded) {
      window.location.reload();
    }
  }, [isDownloaded]);

  
  useEffect(() => {
    if (freeDownloadError) {
      console.error("ViewDeath: Free Download Error:", freeDownloadError);
    }
  }, [freeDownloadError, t]);


  // --- Loading and Error States for Page ---
  if (!id && !location.state) {
    return <div>Error: No certificate ID found. Please go back and select a certificate.</div>;
  }
  if (isViewDataLoading || !config) { 
    return <Loader />;
  }
  if (viewDataError) {
    console.error("ViewDeath: Error fetching certificate data:", viewDataError);
    return <div>Error fetching certificate data. Please try again.</div>;
  }

  // --- Determine which action button to render ---
  let actionButton;
  if (showPayAndDownload) {
    actionButton = (
      <Button
        key="pay-download-btn"
        label={t("BND_PAY_AND_DOWNLOAD_BUTTON_LABEL", "Pay and Download")}
        onClick={handlePayAndDownload}
        className={"employee-pay-download-btn-className"} 
        variation="secondary"
        type="button"
      />
    );
  } else {
    actionButton = (
      <Button
        key="download-btn"
        label={t("BND_FREE_DOWNLOAD_BUTTON_LABEL", "Download")}
        onClick={handleFreeDownload}
        className={"employee-download-btn-className"}
        variation="secondary"
        type="button"
        icon={"FileDownload"}
        disabled={isFreeDownloading}
      />
    );
  }

  return (
    <div>
      {ViewComposer && config ? <ViewComposer data={config} /> : <div>{t("COMMON_LOADING_VIEW", "Loading View...")}</div>}
      <Footer
        actionFields={[
          <Button
            key="update-btn"
            icon="Edit"
            label={t("CORE_COMMON_UPDATE")}
            onClick={handleEditClick}
            type="button"
            variation="secondary" // Or "primary" if it's the main non-download action
            style={{ marginRight: "1rem" }} // Space between update and download/pay button
          />,
          actionButton, 
        ]}
        className=""
        style={{ paddingLeft: "70px" }} // Add some space above the footer
      />
    </div>
  );
};

export default ViewDeath;