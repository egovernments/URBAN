import React, { useEffect, useState } from "react";
import { ViewComposer } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { createConfig } from "../../utils/CreateViewConfig";

export const NewApplicationDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();

  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.tl.useApplicationDetail(t, tenantId, applicationNumber);
  const config = createConfig(applicationDetails?.applicationDetails);

  return <div>{!isLoading && <ViewComposer data={config} />}</div>;
};
