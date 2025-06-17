import { PrivateRoute,BreadCrumb } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Switch, useLocation } from "react-router-dom";
import EGF from "./EGF";

const FinanceBreadCrumbs = ({ location }) => {
  const { t } = useTranslation();

  const search = useLocation().search;
  
  const fromScreen = new URLSearchParams(search).get("from") || null;

  const crumbs = [
    {
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true,
    },
    {
      path: "/digit-ui/employee/services/EGF",
      content: t("EGF_COMMON_HEADER"),
      show: location.pathname.includes("/services/EGF") ? true : false,
    }
  ];

  return <BreadCrumb crumbs={crumbs} spanStyle={{ maxWidth: "min-content" }} />;
};


const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container">
          <p className="breadcrumb" style={{ marginLeft: mobileView ? "2vw" : "revert" }}>
            <FinanceBreadCrumbs location={location} />
          </p>
          <PrivateRoute path={`${path}/services`}>
            <EGF />
          </PrivateRoute>
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
