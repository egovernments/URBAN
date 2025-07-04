import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew} from "@egovernments/digit-ui-components";

export const PayAndDownloadButton = ({ tenantId, certificateId, hospitalName }) => {
  const useDeathDownload= Digit.ComponentRegistryService.getComponent("useDeathDownload");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  // const { consumerCode } = useDeathDownload(tenantId, certificateId);
  const { downloadApi } = useDeathDownload();
  console.log("tenantId of PayAndDownloadButton", tenantId);
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
       
      }
    } catch (error) {
      console.error("An error occurred while fetching consumer code:", error);
    } finally {
      setIsLoading(false);
    }
  // const businessService = "DEATH_CERT";
  //   const encodedConsumerCode = encodeURIComponent(consumerCode);
  //   history.push(`/${window.contextPath}/citizen/payment/my-bills/${businessService}/${encodedConsumerCode}?workflow=death`);
  };

  return (
     <ButtonNew
    className="custom-class"
    label="Pay and Download"
    onClick={handleClick}
    variation="link"
  />
  );
};