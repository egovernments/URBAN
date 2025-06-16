import { CollectionIcon } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import LandingPageCard from "./components/LandingPageCard";

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
  const isFinanceEmployee = userRoles.find((role) => role.code === "EMPLOYEE_FINANCE");
  const { isLoading, data } = Digit.Hooks.useAccessControl();

  if (!isFinanceEmployee) return null;
  const propsForModuleCard = {
    Icon: <CollectionIcon />,
    moduleName: t("ACTION_TEST_FINANCE"),
    menuDict: buildMenuDict(data?.actions)?.["Finance"],
  };
  return <LandingPageCard {...propsForModuleCard} />
};

export default FinanceCard;