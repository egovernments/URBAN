export const searchAndDownloadConfig = (t) => {
    return {
        label: t("BND_SEARCH_BUTTON"), 
        type: "search",
        apiDetails: {
            serviceName: "/birth-death-services/birth/_search",
            requestParam: {},
            requestBody: {},
            minParametersForSearchForm: 3,
            masterName: "commonUiConfig",
            moduleName: "searchAndDownloadBirthConfig",
            tableFormJsonPath: "requestParam",
            filterFormJsonPath: "requestParam",
            searchFormJsonPath: "requestParam",
        },
        sections: {
            search: {
                uiConfig: {
                    headerStyle: null,
                    formClassName: "",
                    primaryLabel: t("ES_COMMON_SEARCH"),
                    secondaryLabel: t("ES_COMMON_CLEAR_SEARCH"),
                    minReqFields: 1,
                    defaultValues: {
                        tenantId: "",
                        dateOfBirth: "",
                        gender: "",
                        placeofbirth: "",
                        childName: "",
                        registrationno: "",
                        FatherName: "",
                        MotherName: "",
                    },
                    fields: [
                        {
                            label: t("City"),
                            key: "tenantId",
                            type: "dropdown",
                            isMandatory: true,
                            disable: true,
                            preProcess: {
                                updateDependent: ["populators.options"]
                            },
                            populators: {
                                name: "tenantId",
                                optionsKey: "name",
                                options: [],
                                error: "City is required !",
                            }
                        },
                        {
                            label: t("BND_BIRTH_DOB"),
                            type: "date",
                            isMandatory: true,
                            disable: false,
                            key: "dateOfBirth",
                            populators: {
                                name: "dateOfBirth",
                                max: "currentDate",
                                error: t("DATE_VALIDATION_MSG")
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
                                error: "gender is required !",
                                required: true,
                                mdmsConfig: {
                                    masterName: "GenderType",
                                    moduleName: "common-masters",
                                    localePrefix: "COMMON_GENDER",
                                },
                            },
                        },
                        {
                            label: t("BND_BIRTH_APPL_HOSP"),
                            key: "placeofbirth",
                            type: "dropdown",
                            isMandatory: false,
                            disable: false,
                            preProcess: {
                                updateDependent: ["populators.options"]
                            },
                            populators: {
                                name: "placeofbirth",
                                "optionsKey": "originalName",
                                "valueKey": "code",
                                options: [],
                                "error": "Hospital Name is Required!",
                                "required": false
                            },
                        },
                        {
                            label: t("BND_REG_NO_LABEL"),
                            key: "registrationNo",
                            type: "text",
                            isMandatory: false,
                            populators: { name: "registrationNo" },
                        },
                        {
                            label: t("BND_COMMON_FATHERSNAME"),
                            key: "fatherName",
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
                uiConfig: {
                    columns: [
                        {
                            key: "registrationno",
                            label: t("BND_COMMON_TABLE_REGNO"),
                            jsonPath: "registrationno",
                        },
                        {
                            key: "childName",
                            label: t("BND_COMMON_NAME"),
                            jsonPath: "fullName",
                        },
                        {
                            key: "dateOfBirth",
                            label: t("BND_BIRTH_DATE"),
                            jsonPath: "dateofbirth",
                            additionalCustomization: true,
                        },
                        {
                            key: "gender",
                            label: t("BND_COMMON_GENDER"),
                            jsonPath: "genderStr",
                        },
                        {
                            key: "MotherName",
                            label: t("BND_MOTHERS_NAME_LABEL"),
                            jsonPath: "birthMotherInfo.fullName",
                        },
                        {
                            key: "FatherName",
                            label: t("BND_COMMON_FATHERSNAME"),
                            jsonPath: "birthFatherInfo.fullName",
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
                    resultsJsonPath: "birthCerts",
                },
                children: {},
                show: true,
            },
        },
          customHookName: "Birth.userCustomInboxHook",
        additionalSections: {},
    };
};
