import { useHistory } from "react-router-dom";
import React from "react";
import { Button as ButtonNew } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";

export const ViewLinkButton = ({ tenantId, certificateId,hospitalname }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleClick = () => {
    history.push(
      `/${window.contextPath}/employee/death/death-common/viewDeath`,
      {
        myData: certificateId,
        myhospitalname: hospitalname,
        mytenantId: tenantId,
      }
    );
  };

  return (
    <ButtonNew
      className="custom-class"
      label={t("BND_VIEW_CERTIFICATE")}
      onClick={handleClick}
      variation="link"
    />
  );
};
