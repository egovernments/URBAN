import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard, PropertyHouse,FirenocIcon } from "@egovernments/digit-ui-react-components";
import { CaseIcon } from "@egovernments/digit-ui-react-components";

const FirenocCard = () => {

   if (!Digit.Utils.FirenocAccess()) return null;
  const { t } = useTranslation();


  window.localStorage.setItem("Employee.locale", "en_IN");
  window.localStorage.setItem("locale", "en_IN");
  window.localStorage.setItem("Employee.tenant-id", Digit.ULBService.getCurrentTenantId());
  window.localStorage.setItem("tenant-id",Digit.ULBService.getCurrentTenantId());

  const links = [
    {
      label: t("ES_COMMON_INBOX"),
      link: `https://unified-demo.digit.org/employee/fire-noc/inbox`,
      hyperlink: true
    },
    {
      label: t("ES_COMMON_SEARCH"),
      link: `https://unified-demo.digit.org/employee/fire-noc/search`,
      hyperlink: true

    }
  ];

  const propsForModuleCard = {
    moduleName: t("COMMON_FIRENOC"),
    links: links,
    Icon: <FirenocIcon/>
}

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default FirenocCard;
