import React, { useState, useEffect, useMemo } from "react";
import { InboxSearchComposer, Loader, Dropdown, Card, CardLabel, CardLabelError, SubmitBar } from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";
import { searchAndDownloadConfig as getBaseSearchConfig } from "./searchAndDownloadConfig";

const SearchAndDownload = () => {
  const { t } = useTranslation();
  const [externalSelectedCity, setExternalSelectedCity] = useState(null);
  // internalCityToSet starts as null. ISC will load without a default city.
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

  // 2. Hospital List MDMS
  const hospitalTenantIdForISC = internalCityToSet?.code;
   const isDemoCitySelected = internalCityToSet?.name === "Demo";
  const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
    hospitalTenantIdForISC, "birth-death-service", [{ "name": "hospitalList" }],
    {
      enabled: !!hospitalTenantIdForISC,
      select: (data) => { 
         const rawHospitalList = data?.["birth-death-service"]?.hospitalList || [];
        let processedHospitalOptions = []; // Renamed for clarity

        if (rawHospitalList.length > 0) {
          processedHospitalOptions = rawHospitalList
            .filter(hospital => hospital.active === "true" || hospital.active === true)
            .map(hospital => ({
              code: hospital.hospitalName,
              name: t(`COMMON_HOSPITAL_${hospital.hospitalName.replace(/\s+/g, '_').toUpperCase()}`),
              originalName: hospital.hospitalName 
            }));
        }

        // If the selected city is "Demo" AND no actual hospitals were found for it from MDMS,
        // then set the options to just "Others".
        if (isDemoCitySelected && processedHospitalOptions.length === 0) {
          processedHospitalOptions = [{
            code: "Others", // The value that will be sent if selected
            name: t("BPAREG_HEADER_APPL_BPAREG_OTHERS"),   // Display name for "Others", ensure translation exists
            originalName: t("BPAREG_HEADER_APPL_BPAREG_OTHERS") // Used by your dropdown if optionsKey is "originalName"
          }];
        }
        return {
          hospitalListOptions: processedHospitalOptions  || []
        };
      },
    }
  );

  // 3. Prepare configs for InboxSearchComposer
  const configsForISC = useMemo(() => {
    let processedConfig = JSON.parse(JSON.stringify(baseSearchConfigTemplate));
    const tenantIdFieldConfig = processedConfig.sections.search.uiConfig.fields.find(f => f.key === "tenantId");

    if (internalCityToSet) {
      // When a city is selected externally, set it as default for ISC and disable the field
      processedConfig.sections.search.uiConfig.defaultValues.tenantId = internalCityToSet;
      if (tenantIdFieldConfig) {
        tenantIdFieldConfig.disable = true; 
      }
    } else {
      // Initially, or if external city is cleared, ISC's city dropdown is enabled and has no default value.
      processedConfig.sections.search.uiConfig.defaultValues.tenantId = null; // Explicitly ensure no default
      if (tenantIdFieldConfig) {
         const baseTenantIdFieldConfig = baseSearchConfigTemplate.sections.search.uiConfig.fields.find(f => f.key === "tenantId");
        tenantIdFieldConfig.disable = baseTenantIdFieldConfig ? baseTenantIdFieldConfig.disable : false;
      }
    }

    Digit.Utils.preProcessMDMSConfigInboxSearch(t, processedConfig, "sections.search.uiConfig.fields", {
      updateDependent: [
        { key: "tenantId", value: cityOptionsFromHook || [] },
        { key: "placeofdeath", value: hospitalListData?.hospitalListOptions || [] }
      ],
    });
    
    return processedConfig;
  }, [baseSearchConfigTemplate, t, cityOptionsFromHook, internalCityToSet, hospitalListData]);

  const handleExternalCityChange = (city) => {
    setExternalSelectedCity(city);
    setInternalCityToSet(city); 
  };
  
  if (isLoadingCities) { return <Loader />; }

  return (
    <React.Fragment>
      <div className="digit-inbox-search-wrapper" style={{margin: "16px", padding: "16px"}}>
        <Header styles={{ fontSize: "32px" }}>{t(baseSearchConfigTemplate.label || "BND_SEARCH_REGISTRY")}</Header>
        <Card style={{marginBottom: "16px", padding: "24px"}}>
          <CardLabel styles={{fontWeight: "bold", marginBottom:"8px"}}>{t("City")}*</CardLabel>
          <Dropdown t={t} option={cityOptionsFromHook || []} selected={externalSelectedCity} optionKey="name" select={handleExternalCityChange} placeholder={t("BND_APPL_CANT_PLACEHOLDER")} style={{width: "100%", maxWidth: "100%"}} />
        </Card>
        {internalCityToSet && hospitalListLoading && <Loader message={t("BND_LOADING_HOSPITALS_MSG")}/> }
        <InboxSearchComposer
          // Key ensures ISC re-initializes if external city changes AFTER initial load.
          // For initial load, it will use the config with tenantId default as null.
          key={internalCityToSet?.code || "isc-no-city-initially"} 
          configs={configsForISC}
        />
      </div>
    </React.Fragment>
  );
};

export default SearchAndDownload;