import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew, Toast } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";

export const PayAndDownloadButton = ({ tenantId, certificateId, hospitalName }) => {
  const useDeathDownload= Digit.ComponentRegistryService.getComponent("useDeathDownload");
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const { downloadApi } = useDeathDownload();
  
  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  
  const handleClick = async () => {
     setIsLoading(true); 
    try {
     
      const fetchedConsumerCode = await downloadApi(tenantId, certificateId);

      if (fetchedConsumerCode) {
        const businessService = "DEATH_CERT";
       
        const encodedConsumerCode = encodeURIComponent(fetchedConsumerCode);
        history.push(`/${window.contextPath}/citizen/payment/my-bills/${businessService}/${encodedConsumerCode}?workflow=death`,
          {
            tenantId: tenantId,
          }
        );
      } else {
        console.error("Could not retrieve consumer code. Cannot proceed to payment.");
        setShowToast({ 
          key: "error", 
          label: t("BND_DEATH_CONSUMER_CODE_NOT_RETRIEVED") 
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching consumer code:", error);
      setShowToast({ 
        key: "error", 
        label: t("BND_DEATH_UNEXPECTED_ERROR_OCCURRED") 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <ButtonNew 
        className="custom-class" 
        label={t("PAY_AND_DOWNLOAD")}
        onClick={handleClick} 
        variation="link" 
        disabled={isLoading}
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