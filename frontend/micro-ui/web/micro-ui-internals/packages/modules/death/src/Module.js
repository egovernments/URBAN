
import DeathCard from "./components/DeathCard";
import { CitizenHomeCard, Loader } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import EmployeeApp from "../src/pages/employee/index";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import CitizenApp from "../src/pages/citizen/index";
import { overrideHooks,updateCustomConfigs } from "./utils";
import ViewDeath from "./pages/employee/viewDeath";
import EditButton from "./pages/employee/customcomponents/EditButton";
import { usePdfDownloader } from "./components/usePdfDownloader";
import useDeathDownload from "./components/useDeathDownload";
import { DownloadButton } from "./components/DownloadButton";
import { PayAndDownloadButton } from "./components/PayAndDownloadButton";
import { ViewLinkButton } from "./components/ViewLinkButton";



export const DeathModule = ({ stateCode, userType, tenants }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["death", "common", "workflow","bnd","pt"];
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
  if(userType==="employee"){
    return <EmployeeApp path={path} url={url} userType={userType}/>
  }else{
    return <CitizenApp path={path} url={url} userType={userType}/>
  }
};
const componentsToRegister = {
  DeathModule,
  DeathCard,
  ViewDeath,
  EditButton,
  usePdfDownloader:usePdfDownloader,
  useDeathDownload:useDeathDownload,
  DownloadButton: DownloadButton,
  PayAndDownloadButton: PayAndDownloadButton,
  ViewLinkButton: ViewLinkButton,
};
export const initDeathComponents = () => {
  overrideHooks();
  updateCustomConfigs();
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

