


export const inboxConfig = () => {
  const id = Digit.ULBService.getCurrentTenantId();
  return {
    label: "BND_SEARCH_BUTTON",
    type: "search",
    apiDetails: {
      serviceName: "/birth-death-services/birth/_search",
      requestParam: {},
      requestBody:{},
      minParametersForSearchForm: 1,
      masterName: "commonUiConfig",
      moduleName: "searchBirthConfig",
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
          },
          fields: [
            {
              label: "BND_FROM_DATE",
              type: "date",
              isMandatory: true,
              disable: false,
              key: "fromDate",
              populators: {
                name: "fromDate",
                error: "from date is required",
                max: "currentDate",
              },
            },
            {
              label: "BND_TO_DATE",
              type: "date",
              isMandatory: true,
              disable: false,
              key: "toDate",
              populators: {
                name: "toDate",
                error: "toDate is required ",
                max: "currentDate",
              },
              // additionalValidation: {
              //   type: "date",
              //   keys: {
              //     start: "fromDate",
              //     end: "toDate",
              //   },
              // },
            },
            {
              isMandatory: true,
              type: "dropdown",
              key: "gender",
              label: "BND_GENDER",
              disable: false,
              populators: {
                name: "gender",
                optionsKey: "name",
                error: "gender is required !",
                mdmsConfig: {
                  masterName: "GenderType",
                  moduleName: "common-masters",
                  localePrefix: "COMMON_GENDER",
                },
              },
              
            },
            {
              label: "BND_REG_NO_LABEL",
              key: "registrationNo",
              type: "text",
              isMandatory: false,
              populators: { name: "registrationNo" },
            },
            {
              label: "BND_COMMON_FATHERSNAME",
              key: "fatherName",
              type: "text",
              isMandatory: false,
              populators: {
                name: "fatherName",
              },
            },
            {
              label: "BND_COMMON_MOTHERSNAME",
              key: "motherName",
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
        uiConfig: {
          columns: [
            {
              key: "registrationno",
              label: "BND_COMMON_TABLE_REGNO",
              jsonPath: "registrationno",
            },
            {
              key: "dateofbirth",
              label: "BND_BIRTH_DATE",
              jsonPath: "dateofbirth",
              additionalCustomization: true,
            },
            {
              key: "MotherName",
              label: "BND_COMMON_MOTHERSNAME",
              jsonPath: "birthMotherInfo.fullName",
            },
            {
              key: "FatherName",
              label: "BND_COMMON_FATHERSNAME",
              jsonPath: "birthFatherInfo.fullName",
            },
          
            {
              key: "view",
              label: "view",
              jsonPath: "",
              additionalCustomization: true,
            },
          ],
          enableGlobalSearch: false,
          enableColumnSort: true,
          resultsJsonPath: "birthCerts",
        },
        children: {},
        show: true,
      },
    },
    additionalSections: {},
  };
};





















export default inboxConfig;
