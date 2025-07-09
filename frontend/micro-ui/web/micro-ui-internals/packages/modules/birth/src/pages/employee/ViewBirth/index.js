import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Footer } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";
import useBirthConfig from "./config/useBirthConfig";
import { ViewComposer } from "@egovernments/digit-ui-react-components";
import { usePdfBirthDownloader } from "../../../components/usePdfBirthDownloader";

const ViewBirth = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [showPayAndDownload, setShowPayAndDownload] = useState(false);

  if (!id) return <div>{t("ERROR_UNAUTHORIZED_ACCESS", "Error: Unauthorized access")}</div>;

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;

  const { data, isLoading, error } = Digit.Hooks.useCustomAPIHook(
    "/birth-death-services/birth/_viewfullcertdata",
    { tenantId, id },
    {
      RequestInfo: {
        apiId: "Rainmaker",
        ver: ".01",
        action: "_viewcertdata",
        did: "1",
        key: "",
        msgId: "20170310130900|en_IN",
        requesterId: "",
        authToken,
      },
    },
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  useEffect(() => {
    if (data?.BirthCertificate?.length > 0) {
      const certData = data.BirthCertificate[0];
      setShowPayAndDownload(certData.counter === 1);
    }
  }, [data]);

  const config = useBirthConfig(data);

  const { initiateDownload: initiateFreeDownload } = usePdfBirthDownloader(id);
  const useBirthDownload = Digit.ComponentRegistryService.getComponent("useBirthDownload");
//  console.log(useBirthDownload); 
  const { downloadApi } = useBirthDownload();
  const handlePayAndDownload = () => {
    const api = downloadApi(tenantId, id);
    // console.log(api, "*****");
    const businessService = "BIRTH_CERT.BIRTH_CERT";
    history.push(`/digit-ui/employee/payment/collect/${businessService}/${id}/tenantId=${tenantId}?workflow=birth`);
  };

  const handleFreeDownload = () => {
    initiateFreeDownload(tenantId, id);
  };

  const handleEditClick = () => {
    if (data?.BirthCertificate?.length > 0) {
      const certToEdit = { ...data.BirthCertificate[0] };
      // console.log("certToEdit", certToEdit);
      // console.log("id****", id);
      history.push(`/${window.contextPath}/employee/birth/update-birth?action=EDIT&certificateId=${id}&module=birth`, {
        editdata: certToEdit,
        certificateId: id,
        module: "birth",
      });
    }
  };

  const actionButton = showPayAndDownload ? (
    <Button
      key="pay-download-btn"
      label={t("PAY_AND_DOWNLOAD", "Pay and Download")}
      onClick={handlePayAndDownload}
      className={"employee-pay-download-btn-className"}
      variation="secondary"
      type="button"
    />
  ) : (
    <Button
      key="download-btn"
      label={t("BND_DOWNLOAD_CERTIFICATE")}
      onClick={handleFreeDownload}
      className={"employee-download-btn-className"}
      variation="secondary"
      type="button"
      icon={"FileDownload"}
    />
  );

  return (
    <React.Fragment>
      <ViewComposer data={config} />
      <Footer
        actionFields={[
          <Button
            key="update-btn"
            icon="Edit"
            label={t("CORE_COMMON_UPDATE")}
            onClick={handleEditClick}
            type="button"
            variation="secondary"
            style={{ marginRight: "1rem" }}
          />,
          actionButton,
        ]}
      />
    </React.Fragment>
  );
};

export default ViewBirth;
