import React, { useEffect } from "react";
import {
  StandaloneSearchBar,
  Loader,
  CardBasedOptions,
  ComplaintIcon,
  PTIcon,
  CaseIcon,
  DropIcon,
  HomeIcon,
  Calender,
  DocumentIcon,
  HelpIcon,
  WhatsNewCard,
  OBPSIcon,
  WSICon,
  FirenocIcon,
  BirthIcon,
  DeathIcon,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  let isMobile = window.Digit.Utils.browser.isMobile();
  if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});

  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (!Digit.UserService?.getUser()?.access_token) return false;
    return true;
  };

  const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  if (!tenantId) {
    Digit.SessionStorage.get("locale") === null
      ? history.push(`/digit-ui/citizen/select-language`)
      : history.push(`/digit-ui/citizen/select-location`);
  }

  const appBannerWebObj = uiHomePage?.appBannerDesktop;
  const appBannerMobObj = uiHomePage?.appBannerMobile;
  const citizenServicesObj = uiHomePage?.citizenServicesCard;
  const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
  const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
  const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
  const whatsNewSectionObj = uiHomePage?.whatsNewSection;

  const handleClickOnWhatsAppBanner = (obj) => {
    window.open(obj?.navigationUrl);
  };

  const userNullCheck = () => {
    if (Digit.UserService.getUser() === null) return true;
    else if (Digit.UserService.getUser()?.info === null) return true;
    else if (Digit.UserService.getUser()?.info?.roles === null) return true;
    return false;
  };

  const user = Digit.UserService.getUser();
  const userRoles = user?.info?.roles?.map((r) => r.code) || [];
  const isOnlyCitizen = userRoles.length === 1 && userRoles.includes("CITIZEN");
  const isOnlyFireNocCitizen =
    userRoles.length === 2 &&
    userRoles.includes("CITIZEN") &&
    userRoles.includes("FN_CITIZEN");


  let options = [];


  citizenServicesObj?.props?.forEach((element) => {
    let serviceIcon = null;
    if (!isOnlyCitizen && isOnlyFireNocCitizen && element?.label !== "ACTION_TEST_FIRE_NOC") {
      return; // skip everything except FireNOC
    }

    if (options.length >= 4) return;

    switch (element?.label) {
      case "ACTION_TEST_FIRE_NOC":
        if (Digit.Utils.NOCCitizenAccess() || userNullCheck()) {
          serviceIcon = <FirenocIcon className="fill-path-primary-main" />;
        } else return;
        break;
      case "ACTION_TEST_MCOLLECT":
        if (Digit.Utils.mCollectCitizenAccess() || userNullCheck()) {
          serviceIcon = <ComplaintIcon />;
        } else return;
        break;
      case "MODULE_PT":
        if (Digit.Utils.ptCitizenAccess() || userNullCheck()) {
          serviceIcon = <PTIcon className="fill-path-primary-main" />;
        } else return;
        break;
      case "MODULE_TL":
        if (Digit.Utils.tlCitizenAccess() || userNullCheck()) {
          serviceIcon = <CaseIcon className="fill-path-primary-main" />;
        } else return;
        break;
      case "ACTION_TEST_BPA_STAKEHOLDER_HOME":
        if (Digit.Utils.BPACitizenAccess() || userNullCheck()) {
          serviceIcon = <OBPSIcon className="fill-path-primary-main" />;
        } else return;
        break;
      case "ACTION_TEST_WATER_AND_SEWERAGE":
        if (Digit.Utils.wsCitizenAccess() || userNullCheck()) {
          serviceIcon = <WSICon className="fill-path-primary-main" />;
        } else return;
        break;
      case "ACTION_TEST_BIRTH_CERTIFICATE":
        if (Digit.Utils.bdCitizenAccess() || userNullCheck()) {
          serviceIcon = <BirthIcon className="fill-path-primary-main" />;
        } else return;
        break;
      case "ACTION_TEST_DEATH_CERTIFICATE":
        if (Digit.Utils.bdCitizenAccess() || userNullCheck()) {
          serviceIcon = <DeathIcon className="fill-path-primary-main" />;
        } else return;
        break;
      default:
        return;
    }

    options.push({
      name: t(element?.label),
      Icon: serviceIcon,
      onClick: () => {
        if (element?.label === "ACTION_TEST_FIRE_NOC") {
          window.location.href = element?.navigationUrl; // or use window.location.assign()
        } else {
          history.push(element?.navigationUrl);
        }
      },
    });
  });


  const allCitizenServicesProps = {
    header: t(citizenServicesObj?.headerLabel),
    sideOption: {
      name: t(citizenServicesObj?.sideOption?.name),
      onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl),
    },
    options: options,
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoAndUpdatesProps = {
    header: t(infoAndUpdatesObj?.headerLabel),
    sideOption: {
      name: t(infoAndUpdatesObj?.sideOption?.name),
      onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl),
    },
    options: [
      {
        name: t(infoAndUpdatesObj?.props?.[0]?.label),
        Icon: <HomeIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[1]?.label),
        Icon: <Calender />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[2]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[3]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl),
      },
      // {
      //     name: t("CS_COMMON_HELP"),
      //     Icon: <HelpIcon/>
      // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="HomePageContainer">
      {/* <div className="SideBarStatic">
        <StaticCitizenSideBar />
      </div> */}
      <div className="HomePageWrapper">
        {
          <div className="BannerWithSearch">
            {isMobile ? <img src={appBannerMobObj?.bannerUrl} /> : <img src={appBannerWebObj?.bannerUrl} />}
            {/* <div className="Search">
            <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
          </div> */}
            <div className="ServicesSection">
              <CardBasedOptions style={{ marginTop: "-30px" }} {...allCitizenServicesProps} />
              <CardBasedOptions style={isMobile ? {} : { marginTop: "-30px" }} {...allInfoAndUpdatesProps} />
            </div>
          </div>
        }

        {(whatsAppBannerMobObj || whatsAppBannerWebObj) && (
          <div className="WhatsAppBanner">
            {isMobile ? (
              <img src={whatsAppBannerMobObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerMobObj)} />
            ) : (
              <img src={whatsAppBannerWebObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerWebObj)} />
            )}
          </div>
        )}

        {conditionsToDisableNotificationCountTrigger() ? (
          EventsDataLoading ? (
            <Loader />
          ) : (
            EventsData &&
            EventsData[0] && (
              <div className="WhatsNewSection">
                <div className="headSection">
                  <h2>{t(whatsNewSectionObj?.headerLabel)}</h2>
                  <p onClick={() => history.push(whatsNewSectionObj?.sideOption?.navigationUrl)}>{t(whatsNewSectionObj?.sideOption?.name)}</p>
                </div>
                <WhatsNewCard {...EventsData?.[0]} />
              </div>
            )
          )
        ) : null}
      </div>
    </div>
  );
};

export default Home;
