export const TLInboxConfig = () => {
  return {
    commonUiConfig: {
      TLInboxConfig: [
        {
          label: "ES_COMMON_INBOX",
          type: "inbox",
          apiDetails: {
            serviceName: "/inbox/v2/_search",
            requestParam: {},
            requestBody: {
              inbox: {
                processSearchCriteria: {
                  businessService: ["NewTL", "DIRECTRENEWAL", "EDITRENEWAL"],
                  moduleName: "tl-services",
                },
                moduleSearchCriteria: {
                  sortBy: "applicationDate",
                  sortOrder: "ASC",
                },
                // limit: 10,
                // offset: 0
              }, 
            },
            minParametersForSearchForm: 0,
            minParametersForFilterForm: 0,
            masterName: "commonUiConfig",
            moduleName: "TLInboxConfig",
            tableFormJsonPath: "requestBody.inbox",
            filterFormJsonPath: "requestBody.inbox.moduleSearchCriteria",
            searchFormJsonPath: "requestBody.inbox.moduleSearchCriteria",
          },
          sections: {
            search: {
              uiConfig: {
                headerStyle: null,
                primaryLabel: "Search",
                type:"search",
                secondaryLabel: "Clear Search",
                minReqFields: 1,
                formClassName: "inbox-search-container",
                defaultValues: {
                  applicationNos: "",
                  mobileNumber: "",
                },
                fields: [
                  {
                    label: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL",
                    type: "text",
                    isMandatory: false,
                    disable: false,
                    populators: {
                      name: "applicationNumber",
                      error: "ERR_INVALID_APPLICATION_NO",
                      validation: {
                        minlength: 3,
                      },
                    },
                  },
                  {
                    label: "CORE_COMMON_MOBILE_NUMBER",
                    type: "text",
                    isMandatory: false,
                    disable: false,
                    preProcess: {
                      convertStringToRegEx: ["populators.validation.pattern"],
                    },
                    populators: {
                      name: "mobileNumber",
                      error: "ES_SEARCH_APPLICATION_MOBILE_INVALID",
                      validation: {
                        pattern: "^[0-9]{0,10}$",
                        minlength: 3,
                        maxlength: 10,
                      },
                    },
                  },
                ],
              },
              label: "",
              children: {},
              show: true,
            },
            searchResult: {
              label: "",
              estimateNumber: "",
              projectId: "",
              department: "",
              estimateStatus: "",
              fromProposalDate: "",
              toProposalDate: "",
              uiConfig: {
                columns: [
                  {
                    key: "applicationNo",
                    label: "WF_INBOX_HEADER_APPLICATION_NO",
                    jsonPath: "businessObject.applicationNumber",
                    additionalCustomization: true,
                  },
                  {
                    key: "applicationDate",
                    label: "TL_COMMON_TABLE_COL_APP_DATE",
                    jsonPath: "businessObject.applicationDate",
                    additionalCustomization: true,
                  },
                  {
                    key: "applicationType",
                    label: "TL_COMMON_TABLE_COL_APP_TYPE",
                    jsonPath: "ProcessInstance.businessService",
                    additionalCustomization: true,
                  },
                  {
                    key: "locality",
                    label: "WF_INBOX_HEADER_LOCALITY",
                    jsonPath: "businessObject.tradeLicenseDetail.address.locality",
                    additionalCustomization: true,
                  },
                  {
                    key: "status",
                    label: "WF_INBOX_HEADER_STATUS",
                    jsonPath: "businessObject.status",
                    additionalCustomization: true,
                  },
                  {
                    key: "owner",
                    label: "WF_INBOX_HEADER_CURRENT_OWNER",
                    jsonPath: "ProcessInstance.assigner.name",
                    // additionalCustomization: true,
                  },
                  {
                    key: "sla",
                    label: "WF_INBOX_HEADER_SLA_DAYS_REMAINING",
                    jsonPath: "businessObject.serviceSla",
                    additionalCustomization: true,
                  },
                ],
                enableGlobalSearch: false,
                enableColumnSort: true,
                resultsJsonPath: "items",
              },
              children: {},
              show: true,
            },
            links: {
              uiConfig: {
                links: [
                  {
                    text: "TL_NEW_APPLICATION",
                    url: "/employee/tl/new-application",
                    roles: ["TL_CEMP"],
                  },
                  {
                    text: "TL_SEARCH_APPLICATIONS",
                    url: "/employee/tl/search/application",
                    roles: ["TL_FIELD_INSPECTOR","TL_APPROVER", "TL_DOC_VERIFIER","TL_CEMP"],
                  },
                  {
                    text: "TL_SEARCH_LICENSE",
                    url: "/employee/tl/search/license",
                    roles: ["TL_APPROVER", "TL_DOC_VERIFIER","TL_FIELD_INSPECTOR"],
                  },
                  {
                    text: "TL_RENEWAL_HEADER",
                    url: "/employee/tl/search/license",
                    roles: ["TL_CEMP"],
                  },
                  {
                    text: "ACTION_TEST_DASHBOARD",
                    url: "/employee/dss/dashboard/tradelicence",
                    roles: ["STADMIN"],
                  },
                ],
                label: "ACTION_TEST_TRADELICENSE",
                logoIcon: {
                  component: "ShippingTruck",
                  customClass: "inbox-links-icon",
                },
              },
              children: {},
              show: true,
            },
            filter: {
              uiConfig: {
                formClassName: "filter",
                type: "filter",
                headerStyle: null,
                primaryLabel: "Filter",
                secondaryLabel: "",
                minReqFields: 0,
                defaultValues: {
                  status: [],
                  locality: [],
                  state: []
                },
                fields: [
                  {
                    label: "",
                    type: "radio",
                    isMandatory: false,
                    disable: false,
                    populators: {
                      name: "assignee",
                      options: [
                        {
                          code: "ASSIGNED_TO_ME",
                          name: "ES_INBOX_ASSIGNED_TO_ME",
                        },
                        {
                          code: "ASSIGNED_TO_ALL",
                          name: "ES_INBOX_ASSIGNED_TO_ALL",
                        },
                      ],
                      optionsKey: "name",
                      styles: {
                        gap: "1rem",
                        flexDirection: "column",
                      },
                      innerStyles: {
                        display: "flex",
                      },
                    },
                  },
                  {
                    label: "ES_INBOX_LOCALITY",
                    type: "apidropdown",
                    isMandatory: false,
                    disable: false,
                    populators: {
                      name: "locality",
                      type: "locality",
                      optionsKey: "i18nKey",
                      defaultText: "COMMON_SELECT_LOCALITY",
                      selectedText: "COMMON_SELECTED",
                      allowMultiSelect: true,
                      masterName: "commonUiConfig",
                      moduleName: "TLInboxConfig",
                      customfn: "localitydropdown",
                      isDropdownWithChip: true,
                    },
                  },
                  {
                    label: "CS_INBOX_STATUS_FILTER",
                    type: "workflowstatesfilter",
                    labelClassName:"checkbox-status-filter-label" ,
                    isMandatory: false,
                    disable: false,
                    populators: {
                      name: "state",
                      labelPrefix: "CS_COMMON_INBOX_",
                      businessService: "tl-services",
                    },
                  },
                ],
              },
              label: "Filter",
              show: true,
            },
          },
          additionalSections: {},
          persistFormData:true
        },
      ],
    },
  };
};