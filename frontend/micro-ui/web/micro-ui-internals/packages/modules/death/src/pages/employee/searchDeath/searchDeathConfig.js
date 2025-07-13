export const searchDeathConfig = (t) => {
  const id = Digit.ULBService.getCurrentTenantId();
  return {
    label: t("BND_SEARCH_REGISTRY"),
    type: "search",
    apiDetails: {
      serviceName: "/birth-death-services/death/_search",
      requestParam: {},
      requestBody:{},
      minParametersForSearchForm: 1,
      masterName: "commonUiConfig",
      moduleName: "searchDeathConfig",
      tableFormJsonPath: "requestParam",
      filterFormJsonPath: "requestParam",
      searchFormJsonPath: "requestParam",
    },
    sections: {
      search: {
        uiConfig: {
          headerStyle: null,
          formClassName: "",
          primaryLabel: "ES_COMMON_SEARCH",
          secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
          minReqFields: 1,
          defaultValues: {
            fromDate: "",
            toDate: "",
            gender: "",
            nameofdeceased: "",
            spouseName: "",
            placeofdeath: "",
            registrationNo: "",
            fatherName: "",
            motherName: "",
          },
          fields: [
            {
              label: t("BND_FROM_DATE"),
              type: "date",
              isMandatory: true,
              disable: false,
              key: "fromDate",
              populators: {
                name: "fromDate",
                max: "currentDate",
                error: "From Date is required !",
              },
            },
            {
              label: t("BND_TO_DATE"),
              type: "date",
              isMandatory: true,
              disable: false,
              key: "toDate",
              populators: {
                name: "toDate",
                error: "To Date is required !",
                max: "currentDate",
              },
              additionalValidations: {
                type: "date",
                keys: {
                  start: "fromDate",
                  end: "toDate",
                },
              },
            },
            {
              isMandatory: false,
              type: "dropdown",
              key: "gender",
              label: t("BND_COMMON_GENDER"),
              disable: false,
              populators: {
                name: "gender",
                optionsKey: "name",
                error: "Gender is required !",
                required: true,
                mdmsConfig: {
                  masterName: "GenderType",
                  moduleName: "common-masters",
                  localePrefix: "COMMON_GENDER",
                },
              },
            },
            {
              label: t("BND_PERSON_NAME_LABEL"),
              key: "nameofdeceased",
              type: "text",
              isMandatory: false,
              populators: { name: "nameofdeceased" },
            },
            {
              label: t("BND_SPOUSE_NAME_LABEL"),
              key: "spouseName",
              type: "text",
              isMandatory: false,
              populators: { name: "spouseName" },
            },
            {
              label: t("BND_DEATH_APPL_HOSP"),
              key: "placeofdeath",
              type: "dropdown",
              isMandatory: false,
              disable: false,
              populators: {
                name: "placeofdeath",
                "optionsKey": "originalName",
                "valueKey": "code",
                "required": false
              },
            },
            {
              label: t("BND_REG_NO_LABEL"),
              key: "registrationno",
              type: "text",
              isMandatory: false,
              disable: false,
              populators: { name: "registrationNo" },
            },
            {
              label: t("BND_COMMON_FATHERSNAME"),
              key: "FatherName",
              type: "text",
              isMandatory: false,
              populators: {
                name: "fatherName",
              },
            },
            {
              label: t("BND_COMMON_MOTHERSNAME"),
              key: "MotherName",
              type: "text",
              isMandatory: false,
              populators: {
                name: "motherName",
              },
            },
          ],
        },
        label: "",
        children: {},
        show: true,
      },
      searchResult: {
        registrationno: "",
        nameofdeceased: "",
        fromDate: "",
        MotherName: "",
        FatherName: "",
        spouseName: "",
        uiConfig: {
          columns: [
            {
              key: "registrationno",
              label: t("BND_COMMON_TABLE_REGNO"),
              jsonPath: "registrationno",
            },
            {
              key: "fromDate",
              label: t("BND_DEATH_DATE"),
              jsonPath: "dateofdeath",
              additionalCustomization: true,
            },
            {
              key: "MotherName",
              label: t("BND_MOTHERS_NAME_LABEL"),
              jsonPath: "deathMotherInfo.fullName",
            },
            {
              key: "FatherName",
              label: t("BND_COMMON_FATHERSNAME"),
              jsonPath: "deathFatherInfo.fullName",
            },
            {
              key: "spouseName",
              label: t("BND_SPOUSE_NAME_LABEL"),
              jsonPath: "deathSpouseInfo.fullName",
            },
            {
              key: "view",
              label: t("BND_VIEW_CERTIFICATE"),
              jsonPath: "id",
              additionalCustomization: true,
            },
          ],
          enableGlobalSearch: false,
          enableColumnSort: true,
          resultsJsonPath: "deathCerts",
        },
        children: {},
        show: true,
      },
    },
     customHookName: "Death.userCustomInboxHook",
    additionalSections: {},
  };
};
