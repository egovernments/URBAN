import React from "react";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";
const BirthCard = ({ userType }) => {
  const { t } = useTranslation();
  window.contextPath = window?.globalConfigs?.getConfig("CONTEXT_PATH");
  // Check URL
  const isCitizen = window?.location?.pathname?.toLowerCase().includes("citizen");

  const propsForModuleCard = {
    moduleName: isCitizen ? t("ACTION_TEST_BIRTH_CERTIFICATE") : t("COMMON_BIRTH"),
    kpis: [],
    links: isCitizen
      ? [
          {
            label: t("BND_BIRTH_APPLY_CERT"),
            link: `/${window?.contextPath}/citizen/birth/birth-citizen/myApplications`,
          },
          {
            label: t("BND_MY_REQUESTS"),
            link: `/${window?.contextPath}/citizen/birth/birth-common/getCertificate`,
          },
        ]
      : [
          {
            label: t("BIRTH_REGISTRATION"),
            link: `/${window?.contextPath}/employee/birth/birth-common/create-birth`,
          },
          {
            label: t("SEARCH_BIRTH_CERTIFICATE"),
            link: `/${window?.contextPath}/employee/birth/birth-common/getCertificate`,
          },
        ],
  };
  return <EmployeeModuleCard {...propsForModuleCard} />;
};
export default BirthCard;
