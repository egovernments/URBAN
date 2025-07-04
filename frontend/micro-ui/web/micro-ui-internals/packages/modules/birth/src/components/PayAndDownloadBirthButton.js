import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew } from "@egovernments/digit-ui-components";

export const PayAndDownloadBirthButton = ({ tenantId, certificateId, hospitalName }) => {
  const useBirthDownload = Digit.ComponentRegistryService.getComponent("useBirthDownload");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  // const { consumerCode } = useDeathDownload(tenantId, certificateId);
  const { downloadApi } = useBirthDownload();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const fetchedConsumerCode = await downloadApi(tenantId, certificateId);

      if (fetchedConsumerCode) {
        const businessService = "BIRTH_CERT.BIRTH_CERT";

        // const businessService = "DEATH_CERT";
        const encodedConsumerCode = encodeURIComponent(fetchedConsumerCode);
        history.push(`/${window.contextPath}/citizen/payment/my-bills/${businessService}/${encodedConsumerCode}?workflow=birth`);
      } else {
        console.error("Could not retrieve consumer code. Cannot proceed to payment.");
      }
    } catch (error) {
      console.error("An error occurred while fetching consumer code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return <ButtonNew className="custom-class" label="Pay and Download" onClick={handleClick} variation="link" />;
};
