import React from "react";
import { Loader } from "@egovernments/digit-ui-react-components";

import { useTranslation } from "react-i18next";
import EmployeeApp from "../src/pages/employee/index";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

import CitizenApp from "./pages/citizen";
import BirthCard from "./components/BirthCard";
import Address from "./pages/employee/createBirth/components/Address";
import EditButton from "./components/EditButton";
import { usePdfDownloader } from "./components/usePdfDownloader.js";
import { DownloadButton } from "./components/DownloadButton";
import { PayAndDownloadButton } from "./components/PayAndDownloadButton";
import useBirthDownload from "./components/useBirthDownload";
import { overrideHooks, updateCustomConfigs } from "./utils";
import ViewBirthLinkButton from "./components/ViewBirthLinkButton";

export const BirthModule = ({ stateCode, userType, tenants }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["birth", "common", "workflow", "bnd"];
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }
  const { path, url } = useRouteMatch();
  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else {
    return <CitizenApp path={path} url={url} userType={userType} />;
  }
};

const componentsToRegister = {
  BirthModule,
  Address,
  BirthCard,
  EditButton,
  usePdfDownloader: usePdfDownloader,
  useBirthDownload: useBirthDownload,
  DownloadButton: DownloadButton,
  ViewBirthLinkButton: ViewBirthLinkButton,
  PayAndDownloadButton: PayAndDownloadButton,
};
export const initBirthComponents = () => {
  overrideHooks();
  updateCustomConfigs();
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
