import React from "react";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";
import { checkForEmployee } from "../utils";

const DeathCard = () => {
   const isCitizen = window.location.href.includes("/citizen/");

    if(isCitizen) {
      if(!Digit.Utils.bndCitizenAccess()) {
        return null;
      }
    }else {
      if(!Digit.Utils.BnDAccess()) {
        return null;
      }
    }



  const { t } = useTranslation();



  const employeeLinks = [
    {
      label: t("ACTION_TEST_NEW_REGISTRATION"),
      link: `/${window.contextPath}/employee/death/death-common/create-death`,
      role: "DEATH_APPLICATION_CREATOR",
    },
    {
      label: t("ACTION_TEST_DEATH_SEARCH_CERTIFICATE"),
      link: `/${window.contextPath}/employee/death/death-common/getCertificate`,
      role: "BND_CEMP",
    },

    {
      label: t("ACCESSCONTROL_ROLES_ROLES_DASHBOARD_REPORT_VIEWER"), 
      link: `/${window.contextPath}/employee/dss/dashboard/birth-death`,
      role: "DEATH_REPORT_VIEWER",
    },

  ];

  const filteredEmployeeLinks = employeeLinks.filter(
    (link) => (link.role ? checkForEmployee(link.role) : true)
  );


  const citizenLinks = [
    {
      label: t("BND_DEATH_APPLY_CERT"),
      link: `/${window.contextPath}/citizen/death/death-common/getCertificate`,
    },
    {
      label: t("BND_MY_REQUESTS"),
      link: `/${window.contextPath}/citizen/death/death-citizen/myApplications`,
    },
  ];

  const propsForModuleCard = {
    moduleName: isCitizen ? t("ACTION_TEST_DEATH_CERTIFICATE") : t("ACTION_TEST_DEATH_NEW_REGISTRATION"),
    kpis: [],
    links: isCitizen ? citizenLinks : filteredEmployeeLinks,
  };

  return (
    <div className="death-card-module" style={{
      marginBottom:"1.5rem",
    }}>
      <EmployeeModuleCard {...propsForModuleCard} />
    </div>
  );
};

export default DeathCard;