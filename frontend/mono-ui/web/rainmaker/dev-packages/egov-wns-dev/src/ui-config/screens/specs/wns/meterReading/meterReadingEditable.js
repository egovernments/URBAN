import {
    getCommonCard,
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getDateField,
    getLabel,
    convertDateToEpoch
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import { createMeterReading } from "../../../../../ui-utils/commons"
import {
    getQueryArg
} from "egov-ui-framework/ui-utils/commons";

function parseDDMMYYYY(dateStr) {
  if (!dateStr) return new Date('Invalid Date');
  const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
  if (parts.length !== 3) return new Date('Invalid Date');
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}

const saveData = async (state, dispatch) => {
    const mode = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.mode");
    let data = get(state, "screenConfiguration.preparedFinalObject.metereading");
    
    if (!data || data.length === 0) {
        dispatch(
            toggleSnackbar(
                true,
                {
                    labelName: "Please fill valid fields to start search",
                    labelKey: "ERR_FILL_VALID_FIELDS"
                },
                "warning"
            )
        );
        return;
    }

    data.billingPeriod = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.billingPeriod");
    
    // Validation for Billing Period
    if (data.billingPeriod) {
        if (!data.currentReadingDate) {
            data.currentReadingDate = new Date().getTime();
        }
        
        const separator = data.billingPeriod.includes(' - ') ? ' - ' : '-';
        const fromDateStr = data.billingPeriod.split(separator)[0].trim();
        const fromDate = parseDDMMYYYY(fromDateStr);
        const selectedDate = new Date(new Date(data.currentReadingDate).toDateString());
        const toDate = new Date(new Date().toDateString());
        
        if (!(selectedDate >= fromDate && selectedDate <= toDate)) {
            dispatch(
                toggleSnackbar(
                    true,
                    {
                        labelName: "Reading date should not be less than from date and not be greater than to date",
                        labelKey: "ERR_CURRENT_READING_DATE_SHOULD_NOT_BE_LESS_THAN_FROM_DATE_AND_NOT_GREATER_THAN_TO_DATE"
                    },
                    "warning"
                )
            );
            return;
        }
        
        const endDate = ("0" + selectedDate.getDate()).slice(-2) + '/' + 
                        ("0" + (selectedDate.getMonth() + 1)).slice(-2) + '/' + 
                        selectedDate.getFullYear();
        data.billingPeriod = fromDateStr + separator + endDate;
    }

    if (!data.meterStatus) {
        data.meterStatus = get(state, "screenConfiguration.preparedFinalObject.meterMdmsData.['ws-services-calculation'].MeterStatus[0].code");
    }
    data.connectionNo = getQueryArg(window.location.href, "connectionNos")
    data.lastReading = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");

    // Set last reading date and ID based on mode (add vs edit)
    if (mode === 'edit') {
     
        data.lastReadingDate = get(state, "screenConfiguration.preparedFinalObject.consumptionDetails[0].lastReadingDate");
    } else {
        const lastReadingDate = get(state, "screenConfiguration.preparedFinalObject.consumptionDetails[0].currentReadingDate");
        if (lastReadingDate) {
            data.lastReadingDate = lastReadingDate;
        } else {
            data.lastReadingDate = new Date().setMonth(new Date().getMonth() - 1);
        }
    }
    
    if (data.meterStatus === 'Working') {
        validateFields(
            "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children",
            state,
            dispatch,
            "meter-reading"
        );
        validateFields(
            "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children",
            state,
            dispatch,
            "meter-reading"
        );
    } 
    else if (data.meterStatus === 'Locked' || data.meterStatus === 'Breakdown') {
        validateFields(
            "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children",
            state,
            dispatch,
            "meter-reading"
        );
        validateFields(
            "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children",
            state,
            dispatch,
            "meter-reading"
        );
        data.currentReading = data.lastReading;
         if (data.currentReading === null || data.currentReading === undefined || data.currentReading === '') {
         return;
    }
    } 
    else {
        const consumption = validateFields(
            "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children",
            state,
            dispatch,
            "meter-reading"
        );
        if (!data.consumption) {
            return;
        }
        const previousreading = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");
        data.currentReading = parseFloat(data.consumption) + previousreading;
        data.currentReadingDate = new Date().getTime();
    }
    
    set(data, "currentReadingDate", convertDateToEpoch(data.currentReadingDate, "dayend"));
    data.currentReading = parseFloat(data.currentReading);
    
    if (data.consumption) {
        delete data.consumption;
    }
    
    data.tenantId = getQueryArg(window.location.href, "tenantId");
    data.generateDemand = true;
    
    createMeterReading(dispatch, data, mode);
}




export const meterReadingEditable =
{
    uiFramework: "custom-atoms",
    moduleName: "egov-wns",
    componentPath: "Div",
    visible: false,
    props: {
        style: {
            margin: '7px'
        }
    },
    children: {
        card: getCommonCard({
            firstContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'

                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                        })
                    },
                },
                billingCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            secondContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL"
                        })
                    },
                },
                status:
                {
                    ...getSelectField({
                        placeholder: {
                            labelKey: "WS_SELECT_METER_STATUS_PLACEHOLDER"
                        },
                        labelPrefix: {
                            moduleName: "ws-services-calculation",
                            masterName: "MeterStatus"
                        },
                        props: {
                            value: "",
                        },
                        sourceJsonPath: "meterMdmsData['ws-services-calculation'].MeterStatus",
                        jsonPath: "metereading.meterStatus",
                        gridDefination: {
                            xs: 6,
                            sm: 3
                        },
                        required: false,
                        errorMessage: "ERR_INVALID_BILLING_PERIOD",
                    }),
                    afterFieldChange: async (action, state, dispatch) => {
                        let status = get(state, "screenConfiguration.preparedFinalObject.metereading.meterStatus");
                        if (status == 'Working') {
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                                    "visible",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    false
                                )
                            );
                            let todayDate = new Date()
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "value",
                                    todayDate
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                                    "labelName",
                                    ""
                                )
                            );
                        }

                        else if (status == 'Locked' || status == 'Breakdown') {
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "disabled",
                                    true
                                )
                            );
                            // dispatch(

                            //     handleField(

                            //         "meter-reading",

                            //         "components.div.children.meterReadingEditable.children.card.children.cardContent.children.secondContainer.children.currentReadingDate.props",

                            //         "disabled",

                            //         true

                            //     )

                            // );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                                    "visible",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    false
                                )
                            );
                            let todayDate = new Date()
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "value",
                                    todayDate
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                                    "labelName",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props",
                                    "value",
                                    ""
                                )
                            );
                        } 
                        else if (status == 'Reset'  || status == 'Replacement' || status == 'No-meter' ) {
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "disabled",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "disabled",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                                    "visible",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                                    "labelName",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props",
                                    "value",
                                    ""
                                )
                            );
                        }
                        else {
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "disabled",
                                    false
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                                    "visible",
                                    true
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                                    "visible",
                                    false
                                )
                            );
                            let todayDate = new Date()
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                                    "value",
                                    todayDate
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props",
                                    "value",
                                    ""
                                )
                            );
                            dispatch(
                                handleField(
                                    "meter-reading",
                                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                                    "labelName",
                                    ""
                                )
                            );
                        }

                    }
                },


                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            thirdContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_LABEL"
                        })
                    },
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            lastReadingContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_DATE_LABEL"
                        })
                    },
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            fourthContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL"
                        })
                    },
                },
                currentReading:
                {
                    ...getTextField({
                        placeholder: {
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_PLACEHOLDER"
                        },
                        gridDefination: {
                            xs: 6,
                            sm: 3
                        },
                        required: true,
                        pattern: /^[1-9]\d*(\.\d+)?$/i,
                        // errorMessage: "ERR_INVALID_CONSUMER_NO",
                        jsonPath: "metereading.currentReading"
                    }),
                    afterFieldChange: async (action, state, dispatch) => {
                        let lastReading = get(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");
                        let currentReading = get(state, "screenConfiguration.preparedFinalObject.metereading.currentReading");
                        let consumption;
                        if (lastReading === 0) {
                            consumption = currentReading
                        } else {
                            consumption = (currentReading - lastReading).toFixed(2);
                        }
                        if (currentReading == '' || consumption < 0) {
                            consumption = ''
                        }
                        dispatch(
                            handleField(
                                "meter-reading",
                                "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                                "labelName",
                                consumption
                            )
                        );
                    }
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            fifthContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                        })
                    },
                },
                currentReadingDate: getDateField({
                    placeholder: {
                        labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                    },
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    required: true,
                    pattern: getPattern("Date"),
                    // errorMessage: "ERR_INVALID_CONSUMER_NO",
                    jsonPath: "metereading.currentReadingDate"
                }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            sixthContainer: getCommonContainer({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL"
                        })
                    },
                },
                secCont:
                {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    visible: true,
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: getLabel({
                            labelName: ""
                        })
                    },
                },
                thirdCont:
                    getTextField({
                        placeholder: {
                            labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_READING_PLACEHOLDER"
                        },
                        gridDefination: {
                            xs: 6,
                            sm: 3
                        },
                        visible: false,
                        required: true,
                        pattern: /^[1-9]\d*(\.\d+)?$/i,
                        // errorMessage: "ERR_INVALID_CONSUMER_NO",
                        jsonPath: "metereading.consumption"
                    }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),

            button: getCommonContainer({

                buttonContainer: getCommonContainer({
                    firstCont: {
                        uiFramework: "custom-atoms",
                        componentPath: "Div",
                        gridDefination: {
                            xs: 3,
                            sm: 3
                        }
                    },
                    searchButton: {
                        componentPath: "Button",
                        gridDefination: {
                            xs: 6,
                            sm: 4,
                            align: "center"
                        },
                        props: {
                            variant: "outlined",
                            style: {
                                color: "#FE7A51",
                                borderColor: "#FE7A51",
                                width: "150px",
                                height: "40px",
                                margin: "15px 0px",
                                float: "left"
                            }
                        },
                        children: {
                            buttonLabel: getLabel({
                                labelKey: "WS_COMMON_BUTTON_SAVE"
                            })
                        },
                        onClickDefination: {
                            action: "condition",
                            callBack: saveData
                        }
                    },
                    lastCont: {
                        uiFramework: "custom-atoms",
                        componentPath: "Div",
                        gridDefination: {
                            xs: 6,
                            sm: 4
                        }
                    }
                })
            })
        })
    }

}



