import React, { useState, useMemo } from "react";
import { InboxSearchComposer, Loader, Dropdown, Card, CardLabel } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";
// The imported config will now be the "birth" version
import { searchAndDownloadConfig as getBaseSearchConfig } from "./config/searchAndDownloadConfig";

const SearchAndDownload = () => {
  const { t } = useTranslation();
  const [externalSelectedCity, setExternalSelectedCity] = useState(null);
  const [internalCityToSet, setInternalCityToSet] = useState(null);

  const baseSearchConfigTemplate = useMemo(() => getBaseSearchConfig(t), [t]);

  // 1. Fetch All Selectable Cities for the external dropdown
   const rootTenantForCityList = Digit.ULBService.getCitizenCurrentTenant() || Digit.ULBService.getStateId();
     const { data: cityOptionsFromHook, isLoading: isLoadingCities } = Digit.Hooks.useCustomMDMS(
  rootTenantForCityList, 
  "tenant", 
  [{ name: "tenants" }],
  {
    enabled: true,
    select: (data) => {
      const allTenants = data?.tenant?.tenants || [];
      let filteredTenants;

      // Check if the rootTenantForCityList is a specific city tenant (contains a '.')
      if (rootTenantForCityList.includes('.')) {
        // If it is, filter to find that single tenant
        filteredTenants = allTenants.filter(tenant => tenant.code === rootTenantForCityList);
      } else {
        // Otherwise, it's a state-level tenant, so get all tenants of type "CITY"
        filteredTenants = allTenants.filter(tenant => tenant.type === "CITY");
      }
      
      // The mapping logic remains the same, but now it acts on the correctly filtered list
      const cities = filteredTenants.map(tenant => ({
        code: tenant.code,
        name: tenant.name === "Demo"
          ? "Demo"
          : t(tenant.i18nKey || `TENANT_TENANTS_${tenant.code.replace('.', '_').toUpperCase()}`),
        i18nKey: tenant.i18nKey || `TENANT_TENANTS_${tenant.code.replace('.', '_').toUpperCase()}`
      }));
      return cities;
    },
  }
);

  // 2. Hospital List MDMS (re-usable for birth and death)
  const hospitalTenantIdForISC = internalCityToSet?.code;
  const isDemoCitySelected = internalCityToSet?.name === "Demo";
  const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
    hospitalTenantIdForISC,
    "birth-death-service",
    [{ name: "hospitalList" }],
    {
      enabled: !!hospitalTenantIdForISC,
      select: (data) => {
        const rawHospitalList = data?.["birth-death-service"]?.hospitalList || [];
        let processedHospitalOptions = [];

        if (rawHospitalList.length > 0) {
          processedHospitalOptions = rawHospitalList
            .filter((hospital) => hospital.active === "true" || hospital.active === true)
            .map((hospital) => ({
              code: hospital.hospitalName,
              name: t(`COMMON_HOSPITAL_${hospital.hospitalName.replace(/\s+/g, "_").toUpperCase()}`),
              originalName: hospital.hospitalName,
            }));
        }

        if (isDemoCitySelected && processedHospitalOptions.length === 0) {
          processedHospitalOptions = [
            {
              code: "Others",
              name: t("BPAREG_HEADER_APPL_BPAREG_OTHERS"),
              originalName: t("BPAREG_HEADER_APPL_BPAREG_OTHERS"),
            },
          ];
        }
        return {
          hospitalListOptions: processedHospitalOptions || [],
        };
      },
    }
  );

  // 3. Prepare configs for InboxSearchComposer
  const configsForISC = useMemo(() => {
    let processedConfig = JSON.parse(JSON.stringify(baseSearchConfigTemplate));
    const tenantIdFieldConfig = processedConfig.sections.search.uiConfig.fields.find((f) => f.key === "tenantId");

    if (internalCityToSet) {
      processedConfig.sections.search.uiConfig.defaultValues.tenantId = internalCityToSet;
      if (tenantIdFieldConfig) {
        tenantIdFieldConfig.disable = true;
      }
    } else {
      processedConfig.sections.search.uiConfig.defaultValues.tenantId = null;
      if (tenantIdFieldConfig) {
        const baseTenantIdFieldConfig = baseSearchConfigTemplate.sections.search.uiConfig.fields.find((f) => f.key === "tenantId");
        tenantIdFieldConfig.disable = baseTenantIdFieldConfig ? baseTenantIdFieldConfig.disable : false;
      }
    }

    Digit.Utils.preProcessMDMSConfigInboxSearch(t, processedConfig, "sections.search.uiConfig.fields", {
      updateDependent: [
        { key: "tenantId", value: cityOptionsFromHook || [] },
        // UPDATED: Changed 'placeofdeath' to 'placeofbirth' to match the new config
        { key: "placeofbirth", value: hospitalListData?.hospitalListOptions || [] },
      ],
    });

    return processedConfig;
  }, [baseSearchConfigTemplate, t, cityOptionsFromHook, internalCityToSet, hospitalListData]);

  const handleExternalCityChange = (city) => {
    setExternalSelectedCity(city);
    setInternalCityToSet(city);
  };

  if (isLoadingCities) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div className="digit-inbox-search-wrapper" style={{ padding: "16px", width: "100%" }}>
        <Header styles={{ fontSize: "32px" }}>{t(baseSearchConfigTemplate.label || "BND_SEARCH_BUTTON")}</Header>
        <Card style={{marginBottom: "16px", padding: "24px"}}>
          <CardLabel styles={{fontWeight: "bold", marginBottom:"8px"}}>{t("City")}*</CardLabel>
          <Dropdown t={t} option={cityOptionsFromHook || []} selected={externalSelectedCity} optionKey="name" select={handleExternalCityChange} placeholder={t("BND_APPL_CANT_PLACEHOLDER")} style={{width: "100%", maxWidth: "100%"}} />
        </Card>
        {internalCityToSet && hospitalListLoading && <Loader message={t("BND_LOADING_HOSPITALS_MSG")} />}
        <InboxSearchComposer key={internalCityToSet?.code || "isc-no-city-initially"} configs={configsForISC} />
      </div>
    </React.Fragment>
  );
};

export default SearchAndDownload;
