import {
  getCommonTitle,
  getTextField,
  getCommonContainer,
  getPattern,
  getDateField,
  getLabel,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
  getLabelWithValueForModifiedLabel,

} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import updatedActivationDetails from "./functions";
import { httpRequest } from '../../../../../ui-utils/index';
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { convertEpochToDateAndHandleNA, handleNA,handleNAnew, handleRoadType } from "../../utils";
import { serviceConst } from "../../../../../ui-utils/commons";


let applicationStatusss = getQueryArg(window.location.href, "applicationStatus");
let connectionTypeee = getQueryArg(window.location.href, "connectionType");

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

const connectionDetailsHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

const connectionChargeDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PLUMBER_DETAILS"
});

const roadCuttingChargesHeader = getHeader({
  labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILS"
});

const activationDetailsHeader = getHeader({
  labelKey: "WS_ACTIVATION_DETAILS"
});

export const getReviewOwner = (isEditable = true) => {

  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Additional Details ( To be filled by Municipal Employee)",
            labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails
    viewFive: connectionDetailsHeader,
    viewSixWS: renderServiceForWater(),
    viewSixVS: renderServiceForSW(),
    // viewSix: connectionDetails,
    viewSeven: connectionChargeDetailsHeader,
    viewEight: connectionChargeDetails,
    viewNine: roadCuttingChargesHeader,
    viewTen: roadCuttingCharges,
    viewEleven: roadCuttingExtraCharges,
    viewTwelve: activationDetailsHeader,
    //viewThirteen: activationDetails
    viewThirteen: (applicationStatusss == "PENDING_FOR_PAYMENT" && connectionTypeee == "Metered") ? getCommonContainer(activationDetailsContainer) : getCommonContainer(activateDetailsMeter),
  })
};

export const plumberDetails = {
  reviewPlumberProvidedBy: getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber provided by",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.detailsProvidedBy",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.detailsProvidedBy",
      callBack: handleNA
    }
  ),
  reviewPlumberLicenseNo: getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber licence No",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].plumberInfo[0].licenseNo",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].plumberInfo[0].licenseNo",
      callBack: handleNA
    }
  ),
  reviewPlumberName: getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber Name",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].plumberInfo[0].name",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].plumberInfo[0].name",
      callBack: handleNA
    }
  ),
  reviewPlumberMobileNo: getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber mobile No.",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].plumberInfo[0].mobileNumber",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].plumberInfo[0].mobileNumber",
      callBack: handleNA
    }
  )


}
const connectionChargeDetails = getCommonContainer(plumberDetails);
export const roadDetails = {
  reviewRoadType: getLabelWithValue(
    {
      labelName: "Road Type",
      labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].roadCuttingInfo[0].roadType",
      callBack: handleRoadType
    }
  ),
  reviewArea: getLabelWithValue(
    {
      labelName: "Area (in sq ft)",
      labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].roadCuttingInfo[0].roadCuttingArea",
      callBack: handleNA
    }
  ),
}

export const roadCuttingDetails = {
  reviewCompositionFee: getLabelWithValueForModifiedLabel(
    {
      labelName: "Area (in sq ft)",
      labelKey: "WS_ADDN_DETAILS_COMPOSITION_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.compositionFee",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.compositionFee",
      callBack: handleNA
    }
  ),
  reviewUserCharges: getLabelWithValueForModifiedLabel(
    {
      labelName: "Area (in sq ft)",
      labelKey: "WS_ADDN_USER_CHARGES_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.userCharges",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.userCharges",
      callBack: handleNA
    }
  ),
  reviewOthersFee: getLabelWithValueForModifiedLabel(
    {
      labelName: "Area (in sq ft)",
      labelKey: "WS_ADDN_OTHER_FEE_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.othersFee",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.othersFee",
      callBack: handleNA
    }
  )
}
const roadCuttingExtraCharges = getCommonContainer(roadCuttingDetails);

export const roadCuttingCharges = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "applicant-summary",
    scheama: getCommonContainer(roadDetails),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "WaterConnection[0].roadCuttingInfo",
    prefixSourceJsonPath: "children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const activateDetailsMeter = {
  reviewConnectionExecutionDate: getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Execution Date",
      labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    },
    {
      jsonPath: "WaterConnection[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }
  ),
  reviewMeterId: getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter ID",
      labelKey: "WS_SERV_DETAIL_METER_ID"
    },
    {
      jsonPath: "WaterConnection[0].meterId",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].meterId",
      callBack: handleNA
    }
  ),
  reviewMeterInstallationDate: getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter Installation Date",
      labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE"
    },
    {
      jsonPath: "WaterConnection[0].meterInstallationDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].meterInstallationDate",
      callBack: convertEpochToDateAndHandleNA
    }
  ),
  reviewInitialMeterReading: getLabelWithValueForModifiedLabel(
    {
      labelName: "Initial Meter Reading",
      labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.initialMeterReading",
      callBack: handleNAnew
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.initialMeterReading",
      callBack: handleNAnew
    }
  ),
  reviewMeterMakeReading: getLabelWithValueForModifiedLabel(
    {
      labelName: " Meter Make Reading",
      labelKey: "WS_ADDN_DETAILS_INITIAL_METER_MAKE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.meterMake",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.meterMake",
      callBack: handleNA
    }
  ),
  reviewAverageMakeReading: getLabelWithValueForModifiedLabel(
    {
      labelName: "Average Meter Reading",
      labelKey: "WS_ADDN_DETAILS_INITIAL_AVERAGE_MAKE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.avarageMeterReading",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.avarageMeterReading",
      callBack: handleNA
    }
  )

}
export const activationDetailsContainer = {

  activeDetails: getCommonContainer({

    // reviewConnectionExecutionDate: getLabelWithValueForModifiedLabel(
    //   {
    //     labelName: "Connection Execution Date",
    //     labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    //   },
    //   {
    //     jsonPath: "WaterConnection[0].connectionExecutionDate",
    //     callBack: convertEpochToDateAndHandleNA
    //   }, {
    //   labelKey: "WS_OLD_LABEL_NAME"
    // },

    //   {
    //     jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
    //     callBack: convertEpochToDateAndHandleNA
    //   }
    // ),
    reviewConnectionExecutionDate: getDateField({
      label: { labelName: "Connection Execution Date",
            labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"},

      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      pattern: getPattern("Date"),
      errorMessage: "ERR_INVALID_DATE",
      jsonPath: "WaterConnection[0].connectionExecutionDate",
    }),
    meterID: getTextField({
      label: {
        labelKey: "WS_SERV_DETAIL_METER_ID"
      },
      placeholder: {
        labelKey: "WS_ADDN_DETAILS_METER_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      sourceJsonPath: "WaterConnection[0].meterId",
      required: true,
   //   pattern: /^[a-z0-9]+$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "WaterConnection[0].meterId"
    }),
    meterInstallationDate: getDateField({
      label: { labelName: "meterInstallationDate", labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE" },

      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      pattern: getPattern("Date"),
      errorMessage: "ERR_INVALID_DATE",
      jsonPath: "WaterConnection[0].meterInstallationDate"
    }),
    initialMeterReading: getTextField({
      label: {
        labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
      },
      placeholder: {
        labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "WaterConnection[0].additionalDetails.initialMeterReading"
    }),
    // ...WSMeterMakes,
    meterMake: getTextField({
      label: {
        labelKey: "WS_ADDN_DETAILS_INITIAL_METER_MAKE"
      },
      placeholder: {
        labelKey: "WS_ADDN_DETAILS_INITIAL_METER_MAKE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      //pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "WaterConnection[0].additionalDetails.meterMake"
    }),
    averageMake: getTextField({
      label: {
        labelKey: "WS_ADDN_DETAILS_INITIAL_AVERAGE_MAKE"
      },
      placeholder: {
        labelKey: "WS_ADDN_DETAILS_INITIAL_AVERAGE_MAKE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "WaterConnection[0].additionalDetails.avarageMeterReading"
    }),
    button: getCommonContainer({
			buttonContainer: getCommonContainer({
					searchButton: {
					uiFramework: "custom-atoms-local",
					moduleName: "egov-pt",
					componentPath: "Button",
					gridDefination: {
						xs: 12,
						sm: 6
					},
					props: {
						variant: "contained",
						className: "public-domain-search-buttons",
						style: {
							color: "white",
							margin: "8px",
							backgroundColor: "rgb(254, 122, 81)",
							borderRadius: "2px",
							width: "220px",
							height: "48px"
						}
					},
					children: {
						buttonLabel: getLabel({
							labelName: "Update",
							labelKey: "Update"
						})
					},
					onClickDefination: {
						action: "condition",
						callBack:  async(state, dispatch) => {
              let tenantid = getQueryArg(window.location.href, "tenantId");
                let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
                let serviceType = getQueryArg(window.location.href, "service");
                
               // console.log(state.screenConfiguration.preparedFinalObject.WaterConnection,"ddd");
                let WaterConnection =[];
               
                WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection[0];
               //  state.screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.meterMake = parseInt(state.screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.meterMake);
               state.screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.initialMeterReading = parseInt(state.screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.initialMeterReading);
              state.screenConfiguration.preparedFinalObject.WaterConnection[0].connectionExecutionDate = new Date(state.screenConfiguration.preparedFinalObject.WaterConnection[0].connectionExecutionDate).getTime();
                state.screenConfiguration.preparedFinalObject.WaterConnection[0].meterInstallationDate = new Date(state.screenConfiguration.preparedFinalObject.WaterConnection[0].meterInstallationDate).getTime();
                state.screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.avarageMeterReading = parseInt(state.screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.avarageMeterReading);
               let mydatadum = [
                  { key: "tenantId", value: tenantid },
                  { key: "applicationNumber", value: applicationNumber }
                ];
              
                const responseWater = await httpRequest(
                  "post",
                  "/ws-services/wc/_search",
                  "_search",
                  mydatadum
                );
                
                if (responseWater.WaterConnection && responseWater.WaterConnection.length > 0) {
                //  WaterConnection.push(responseWater.WaterConnection[0]);"isworkflowdisabled":true,

                }
                dispatch(prepareFinalObject("WaterConnection[0].isworkflowdisabled", true));
                WaterConnection
               if(serviceType == "WATER"){
                 let responce = await httpRequest("post","/ws-services/wc/_update","_update", [], { WaterConnection: WaterConnection });
                 if(responce.WaterConnection.length > 0 ){
                  alert("Updated Meter Details");
                 }
                }
            }
					}
				}
			})
		}),
  })
};
export const activateDetailsNonMeter = {
  reviewConnectionExecutionDate: getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Execution Date",
      labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    },
    {
      jsonPath: "WaterConnection[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }
  )
}

export const connectionWater = {
  reviewOldConsumerNo: getLabelWithValueForModifiedLabel(
    {
      labelName: "old Consumer No",
      labelKey: "WS_OLD_CONSUMER_NO"
    },
    {
      jsonPath: "WaterConnection[0].oldConnectionNo",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].oldConnectionNo",
      callBack: handleNA
    }
  ),
  reviewConnectionType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Type",
      labelKey: "WS_SERV_DETAIL_CONN_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].connectionType",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].connectionType",
      callBack: handleNA
    }
  ),
  reviewNumberOfTaps: getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
    },
    {
      jsonPath: "WaterConnection[0].noOfTaps",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].noOfTaps",
      callBack: handleNA
    }
  ),
  reviewBillingType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Billing Type",
      labelKey: "WS_SERV_DETAIL_BILLING_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.billingType",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.billingType",
      callBack: handleNA
    }
  ),
  reviewBillingAmount: getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_DETAIL_BILLING_AMOUNT"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.billingAmount",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.billingAmount",
      callBack: handleNA
    }
  ),
  reviewConnectionCategory: getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_CONNECTION_CATEGORY"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.connectionCategory",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.connectionCategory",
      callBack: handleNA
    }
  ),
  reviewLedgerId: getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_DETAIL_LEDGER_ID"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.ledgerId",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.ledgerId",
      callBack: handleNA
    }
  ),
  reviewGroups: getLabelWithValueForModifiedLabel(
    {
      labelName: "Group",
      labelKey: "Group"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.groups",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnection[0].additionalDetails.groups",
      callBack: handleNA
    }
  ),
  reviewWaterSource: getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Source",
      labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSource",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].waterSource",
      callBack: handleNA
    }
  ),
  // reviewWaterSubSource : getLabelWithValueForModifiedLabel(
  //   {
  //     labelName: "Water Sub Source",
  //     labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
  //   },
  //   {
  //     jsonPath: "WaterConnection[0].waterSubSource",
  //     callBack: handleNA
  //   }, {
  //     labelKey: "WS_OLD_LABEL_NAME"
  //   },
  //   {
  //     jsonPath: "WaterConnectionOld[0].waterSubSource",
  //     callBack: handleNA
  //   }
  // ),
  reviewPipeSize: getLabelWithValueForModifiedLabel(
    {
      labelName: "Pipe Size (in inches)",
      labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
    },
    {
      jsonPath: "WaterConnection[0].pipeSize",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].pipeSize",
      callBack: handleNA
    }
  ),
  reviewSubUsageType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Sub Usage Type",
      labelKey: "WS_SERV_DETAIL_SUB_USAGE_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.waterSubUsageType",
      callBack: handleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.waterSubUsageType",
      callBack: handleNA
    }
  ),
  reviewUnitUsageType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Unit Usage Type",
      labelKey: "WS_SERV_DETAIL_UNIT_USAGE_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.unitUsageType",
      callBack: handleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.unitUsageType",
      callBack: handleNA
    }
  )


}

export const connectionSewerage = {
  reviewOldConsumerNo: getLabelWithValueForModifiedLabel(
    {
      labelName: "Old Consumer No",
      labelKey: "WS_OLD_CONSUMER_NO"
    },
    {
      jsonPath: "WaterConnection[0].oldConnectionNo",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].oldConnectionNo",
      callBack: handleNA
    }
  ),
  reviewConnectionType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Type",
      labelKey: "WS_SERV_DETAIL_CONN_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].connectionType",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].connectionType",
    callBack: handleNA
  }
  ),
  reviewBillingAmount: getLabelWithValueForModifiedLabel(
    {
      labelName: "Billing Amount",
      labelKey: "WS_SERV_DETAIL_BILLING_AMOUNT"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.billingAmount",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.billingAmount",
      callBack: handleNA
    }
  ),
  reviewConnectionCategory: getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Category",
      labelKey: "WS_SERV_CONNECTION_CATEGORY"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.connectionCategory",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.connectionCategory",
      callBack: handleNA
    }
  ),
  reviewLedgerId: getLabelWithValueForModifiedLabel(
    {
      labelName: "Ledger Id",
      labelKey: "WS_SERV_DETAIL_LEDGER_ID"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.ledgerId",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.ledgerId",
      callBack: handleNA
    }
  ),
  reviewGroups: getLabelWithValueForModifiedLabel(
    {
      labelName: "Group",
      labelKey: "Group"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.groups",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
    {
      jsonPath: "WaterConnection[0].additionalDetails.groups",
      callBack: handleNA
    }
  ),
  reviewWaterClosets: getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Water Closets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfWaterClosets",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].noOfWaterClosets",
    callBack: handleNA
  }
  ),
  reviewNoOfToilets: getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Toilets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfToilets",
      callBack: handleNA
    }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].noOfToilets",
    callBack: handleNA
  }
  ),
  reviewSubUsageType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Sub Usage Type",
      labelKey: "WS_SERV_DETAIL_SUB_USAGE_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.waterSubUsageType",
      callBack: handleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.waterSubUsageType",
      callBack: handleNA
    }
  ),
  reviewUnitUsageType: getLabelWithValueForModifiedLabel(
    {
      labelName: "Unit Usage Type",
      labelKey: "WS_SERV_DETAIL_UNIT_USAGE_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.unitUsageType",
      callBack: handleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.waterSubUsageType",
      callBack: handleNA
    }
  )
}

export const reviewModificationsEffectiveDate = {
  reviewModification: getLabelWithValueForModifiedLabel(
    {
      labelName: "Modifications Effective Date",
      labelKey: "WS_MODIFICATIONS_EFFECTIVE_DATE"
    },
    {
      jsonPath: "WaterConnection[0].dateEffectiveFrom",
      callBack: convertEpochToDateAndHandleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].dateEffectiveFrom",
      callBack: convertEpochToDateAndHandleNA
    }
  )
};

export const reviewModificationsEffective = () => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelKey: "WS_MODIFICATIONS_EFFECTIVE_FROM"
          })
        }
      }
    },
    viewOne: modificationsEffectiveDateDetails
  })
};

const modificationsEffectiveDateDetails = getCommonContainer(
  reviewModificationsEffectiveDate
);
export const additionDetailsWater = connectionWater;

export const additionDetailsSewerage = connectionSewerage;

export const renderService = () => {
  let isService = getQueryArg(window.location.href, "service");
  if (isService === serviceConst.WATER) {
    return getCommonContainer(connectionWater);
  } else if (isService === serviceConst.SEWERAGE) {
    return getCommonContainer(connectionSewerage)
  }
}

export const renderServiceForWater = () => {
  return getCommonContainer(connectionWater);
}

export const renderServiceForSW = () => {
  return getCommonContainer(connectionSewerage)
}