import React from "react";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";
import { checkForEmployee } from "../utils"; // Import the utility function

const BirthCard = () => {

  if (!Digit.Utils.BnDAccess()) {
    return null;
  }

  const { t } = useTranslation();
  const isCitizen = window.location.href.includes("/citizen/");


  const employeeLinks = [
    {
      label: t("ACTION_TEST_NEW_REGISTRATION"),
      link: `/${window.contextPath}/employee/birth/birth-common/create-birth`,
      role: "BIRTH_APPLICATION_CREATOR", // Role for creating
    },
    {
      label: t("ACTION_TEST_BIRTH_SEARCH_CERTIFICATE"),
      link: `/${window.contextPath}/employee/birth/birth-common/getCertificate`,
      role: "BND_CEMP", 
    },

    {
      label: t("ACCESSCONTROL_ROLES_ROLES_DASHBOARD_REPORT_VIEWER"), 
      link: `/${window.contextPath}/employee/dss/dashboard/birth-death`,
      role: "BIRTH_REPORT_VIEWER",
    },

  ];


  const filteredEmployeeLinks = employeeLinks.filter(
    (link) => (link.role ? checkForEmployee(link.role) : true)
  );


  const citizenLinks = [
    {
      label: t("BND_BIRTH_APPLY_CERT"),
      link: `/${window.contextPath}/citizen/birth/birth-citizen/myApplications`,
    },
    {
      label: t("BND_MY_REQUESTS"),
      link: `/${window.contextPath}/citizen/birth/birth-common/getCertificate`,
    },
  ];

  const propsForModuleCard = {
    moduleName: isCitizen ? t("ACTION_TEST_BIRTH_CERTIFICATE") : t("ACTION_TEST_BIRTH_NEW_REGISTRATION"),
    kpis: [],
    links: isCitizen ? citizenLinks : filteredEmployeeLinks,
  };

  return (
    <div className="birth-card-module" style={{
      marginLeft: isCitizen ? "30px" : "0px",
      marginTop: isCitizen ? "30px" : "0px"
    }}>
      <EmployeeModuleCard {...propsForModuleCard} />
    </div>
  );
};

export default BirthCard;