import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EmployeeApp from "./pages/employee";
import FinanceCard from "./FinanceHomeCard";

export const FinanceModule = ({ stateCode, userType, tenants }) => {
  const tenantId =  Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")?.code || Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["finance"];

  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });
  const { path, url } = useRouteMatch();

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={"employee"} />;
  } else return null;
};

const componentsToRegister = {
  FinanceModule,
  FinanceCard,
};

export const initFinanceComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
