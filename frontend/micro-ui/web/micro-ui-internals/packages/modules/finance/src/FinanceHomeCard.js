import { CollectionIcon } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import LandingPageSubMenuCard from "./components/LandingPageSubMenuCard";

const buildMenuDict = (items) => {
  const root = {};
  items?.forEach(item => {
    const parts = item.path.split('.');
    let current = root;
    parts?.forEach((part, idx) => {
      if (!current[part]) current[part] = {};
      if (idx === parts.length - 1) {
        // attach leaf data
        current[part] = {
          ...current[part],
          _meta: {
            label: item.displayName,
            link: item.navigationURL,
          }
        };
      }
      current = current[part];
    });
  });
  return root;
}

const FinanceCard = () => {
  const { t } = useTranslation();
  const userRoles = Digit.SessionStorage.get("User")?.info?.roles;
  const allowedRoles = [
    "EMPLOYEE_FINANCE", 
    "EGF_VOUCHER_CREATOR", 
    "EGF_MASTER_ADMIN", 
    "EGF_REPORT_VIEW", 
    "EGF_BILL_CREATOR", 
    "EGF_ADMINISTRATOR", 
    "EGF_BILL_APPROVER", 
    "SYS_INTEGRATOR_FINANCE", 
    "EGF_PAYMENT_CREATOR", 
    "EGF_VOUCHER_APPROVER", 
    "WORKS_FINANCIAL_APPROVER", 
    "EGF_PAYMENT_APPROVER"
  ];
  const isFinanceEmployee = userRoles.find((role) => allowedRoles.includes(role.code));
  const { isLoading, data } = Digit.Hooks.useAccessControl();

  if (!isFinanceEmployee) return null;
  const propsForModuleCard = {
    Icon: <CollectionIcon />,
    moduleName: t("ACTION_TEST_FINANCE"),
    menuDict: buildMenuDict(data?.actions)?.["Finance"],
  };
  return <LandingPageSubMenuCard {...propsForModuleCard} />
};

export default FinanceCard;