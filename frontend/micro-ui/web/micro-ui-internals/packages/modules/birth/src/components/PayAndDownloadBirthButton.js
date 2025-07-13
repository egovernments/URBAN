import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew, Toast } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";

export const PayAndDownloadBirthButton = ({ tenantId, certificateId, hospitalName }) => {
  const useBirthDownload = Digit.ComponentRegistryService.getComponent("useBirthDownload");
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const { downloadApi } = useBirthDownload();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const fetchedConsumerCode = await downloadApi(tenantId, certificateId);

      if (fetchedConsumerCode) {
        const businessService = "BIRTH_CERT.BIRTH_CERT";

        const encodedConsumerCode = encodeURIComponent(fetchedConsumerCode);
        // Defensive: onlsy navigate if businessService and encodedConsumerCode are valid
        if (businessService && encodedConsumerCode) {
          history.push(`/${window.contextPath}/citizen/payment/my-bills/${businessService}/${encodedConsumerCode}?workflow=birth`);
        } else {
          console.error("Missing businessService or consumerCode. Cannot proceed to payment.");
          setShowToast({ key: "error", label: t("BND_PAYMENT_NAVIGATION_FAILED") });
        }
      } else {
        console.error("Could not retrieve consumer code. Cannot proceed to payment.");
        setShowToast({ key: "error", label: t("BND_CONSUMER_CODE_NOT_RETRIEVED") });
      }
    } catch (error) {
      console.error("An error occurred while fetching consumer code:", error);
      setShowToast({ key: "error", label: t("BND_UNEXPECTED_ERROR_OCCURRED") });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <ButtonNew className="custom-class" label="Pay and Download" onClick={handleClick} variation="link" />
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
