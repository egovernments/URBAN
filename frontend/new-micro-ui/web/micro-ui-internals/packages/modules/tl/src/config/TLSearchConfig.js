import { add } from "lodash";

export const TLSearchConfig = () => {
  return {
    label: "TL_SEARCH_LICENSE",
    type: "search",
    apiDetails: {
      serviceName: "/tl-services/v1/_search",
      requestParam: {
        sortBy: "commencementDate",
        sortOrder: "ASC",
        limit: 10,
        offset: 0,
      },
      minParametersForSearchForm: 1,
      masterName: "commonUiConfig",
      moduleName: "TLSearchConfig",
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
          // showFormInstruction: "ES_SEARCH_APPLICATION_ERROR",
          defaultValues: {
            licenseNumbers: "",
            mobileNumber: "",
            fromDate: "",
            toDate: "",
            tradeName: "",
          },
          fields: [
            {
              label: "TL_TRADE_LICENSE_LABEL",
              type: "text",
              isMandatory: false,
              disable: false,
              populators: {
                name: "licenseNumbers",
                error: "ERR_INVALID_APPLICATION_NO",
              },
            },
            {
              label: "TL_TRADE_OWNER_S_NUMBER_LABEL",
              type: "text",
              isMandatory: false,
              disable: false,
              populators: {
                name: "mobileNumber",
                error: "ESTIMATE_PATTERN_ERR_MSG",
                validation: {
                  maxlength: 10,
                },
              },
            },
            {
              label: "TL_SEARCH_TRADE_LICENSE_ISSUED_FROM",
              type: "date",
              isMandatory: false,
              disable: false,
              key: "fromDate",
              populators: {
                name: "fromDate",
                max: "currentDate",
              },
            },
            {
              label: "TL_SEARCH_TRADE_LICENSE_ISSUED_TO",
              type: "date",
              isMandatory: false,
              disable: false,
              key: "toDate",
              populators: {
                name: "toDate",
                error: "DATE_VALIDATION_MSG",
                max: "currentDate",
              },
              additionalValidation: {
                type: "date",
                keys: {
                  start: "fromDate",
                  end: "toDate",
                },
              },
            },
            {
              label: "TL_LOCALIZATION_TRADE_NAME",
              type: "text",
              isMandatory: false,
              disable: false,
              populators: {
                name: "tradeName",
                error: "ESTIMATE_PATTERN_ERR_MSG",
              },
            },
          ],
        },
        label: "",
        children: {},
        show: true,
      },
      searchResult: {
        applicationNo: "",
        applicantName: "",
        mobileNumber: "",
        propertyType: "",
        subPropertyType: "",
        locality: "",
        status: "",
        uiConfig: {
          columns: [
            {
              key: "licenseNumber",
              label: "TL_TRADE_LICENSE_LABEL",
              jsonPath: "licenseNumber",
              additionalCustomization: true,
            },
            {
              key: "tradeName",
              label: "TL_LOCALIZATION_TRADE_NAME",
              jsonPath: "tradeName",
            },
            {
              key: "issuedDate",
              label: "ES_APPLICATION_SEARCH_ISSUED_DATE",
              jsonPath: "issuedDate",
              additionalCustomization: true,
            },
            {
              key: "validTo",
              label: "ES_APPLICATION_SEARCH_VALID_TO",
              jsonPath: "validTo",
              additionalCustomization: true,
            },
            {
              key: "locality",
              label: "TL_HOME_SEARCH_RESULTS__LOCALITY",
              jsonpath: "tradeLicenseDetail.address.locality",
              additionalCustomization: true,
            },
            {
              key: "status",
              label: "TL_COMMON_TABLE_COL_STATUS",
              jsonPath: "status",
              additionalCustomization: true,
            },
          ],
          enableGlobalSearch: false,
          enableColumnSort: true,
          resultsJsonPath: "Licenses",
        },
        children: {},
        show: true,
      },
    },
    additionalSections: {},
  };
};
