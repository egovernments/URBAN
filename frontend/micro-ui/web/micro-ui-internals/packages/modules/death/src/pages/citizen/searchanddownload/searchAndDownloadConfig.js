export const searchAndDownloadConfig = (t) => {
  const id = Digit.ULBService.getCurrentTenantId();
  return {
    label: t("BND_SEARCH_REGISTRY"),
    type: "search",
    apiDetails: {
      serviceName: "/birth-death-services/death/_search",
      requestParam: {},
      requestBody:{},
      minParametersForSearchForm: 3,
      masterName: "commonUiConfig",
      moduleName: "searchAndDownloadConfig",
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
            tenantId: "",
            dateOfDeath: "",
            gender: "",
            placeofdeath:"",
            nameofdeceased: "",
            spouseName: "",
            registrationno: "",
            FatherName: "",
            MotherName: "",
          },
          fields: [
            {
              label:t("City"),
              key: "tenantId",
              type: "dropdown",
              isMandatory: true,
              disable: true,
               preProcess : {
                        updateDependent : ["populators.options"]
              },
              populators: {
                name: "tenantId",
                optionsKey: "name",
                options: [],
                error: "City is required !",
                // required: true,
                // mdmsConfig: {
                //   masterName: "tenants",
                //   moduleName: "tenant",
                //   // localePrefix:"",
                //   localePrefix: "COMMON_CITY",
                // },
              }
            },
            {
              label: t("BND_DEATH_DOB"),
              type: "date",
              isMandatory: true,
              disable: false,
              key: "dateOfDeath",
              populators: {
                name: "dateOfDeath",
                max: "currentDate",
                error: t("Death Date is required !"),
              },
            },
            {
              isMandatory: true,
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
              preProcess : {
                  updateDependent : ["populators.options"]
              },
              populators: {
                name: "placeofdeath",
                "optionsKey": "originalName",
                "valueKey": "code",
                options:[],
                "error": "Hospital Name is Required!",
                "required": false
              },
            },
            {
              label: t("BND_REG_NO_LABEL"),
              key: "registrationno",
              type: "text",
              isMandatory: false,
              populators: { name: "registrationno" },
            },
            {
              label: t("BND_COMMON_FATHERSNAME"),
              key: "FatherName",
              type: "text",
              isMandatory: false,
              populators: {
                name: "FatherName",
              },
            },
            {
              label: t("BND_COMMON_MOTHERSNAME"),
              key: "MotherName",
              type: "text",
              isMandatory: false,
              populators: {
                name: "MotherName",
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
        dateOfDeath: "",
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
                key: "nameofdeceased",
                label: t("BND_COMMON_NAME"),
                jsonPath: "fullName",
            },
            {
              key: "dateOfDeath",
              label: t("BND_DEATH_DATE"),
              jsonPath: "dateofdeath",
              additionalCustomization: true,
            },
            {
                key:"gender",
                label: t("BND_COMMON_GENDER"),
                jsonPath: "genderStr",
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
              key: "action",
              label: t("BND_COMMON_TABLE_ACTION"),
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
