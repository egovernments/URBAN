import {
  getCommonCard,
  getCommonTitle,
  getSelectField,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { generateBillApiCall, searchBillApiCall } from "../generateBillResource/functions"
import "./index.css";
import { useDispatch } from 'react-redux'
import { httpRequest } from "../../../../../ui-utils";
import get from 'lodash/get';
import { groupBy } from "lodash";
let localityhide = false;
let batchhide = false;
let arr = [
  {
    code: "Batch",
    value: "Batch",
  },
  {
    code: "Locality",
    value: "Locality",
  }

];
if (getTenantIdCommon() == "pb.patiala") {
  arr.push({ code: "Group", value: "Group" });
}
// const createBills = (dispatch) => 
//    {
// Dispatch(
//     handleField(
//       "generateBill",
//       "components.div.children.createBill.children.cardContent.children.wnsGenerateBill.children.groUp",
//       "props.isDisabled",
//       true
//     )
//   );
//  Dispatch(
//     handleField(
//       "generateBill",
//       "components.div.children.createBill.children.cardContent.children.wnsGenerateBill.children.groUp",
//       "isDisabled",
//       true
//     )
//   );
//}
//createBills();

export const createBill = getCommonCard({

  subHeader: getCommonTitle({
    label: "Generate Bill"
  },
    {
      style: {
        marginBottom: 8
      }
    }
  ),
  wnsGenerateBill: getCommonContainer({


    //  ---------------------------------------------------------------------------------------
    //             Connection Type drop down
    //-----------------------------------------------------------------------------------------
    applicationtype: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      jsonPath: "generateBillScreen.transactionType",
      props: {
        label: {
          labelName: "Connection Type",
          labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_LABEL"
        },
        labelPrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Connection Type",
          labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_PLACEHOLDER"
        },
        required: true,
        labelsFromLocalisation: true,
        data: [
          {
            code: "Water",
            value: "WS",
          },
          {
            code: "Sewerage",
            value: "SW",
          }

        ],

        className: "autocomplete-dropdown",
        jsonPath: "generateBillScreen.transactionType",

      },
      required: true,

      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    batchtype: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      jsonPath: "generateBillScreen.batchtype",
      props: {
        label: {
          labelName: "select Batch or Locality",
          labelKey: "select Batch or Locality"
        },
        labelPrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Select Batch or Locality",
          labelKey: "Select Batch or Locality"
        },
        required: true,
        labelsFromLocalisation: true,
        data: arr,

        className: "autocomplete-dropdown",
        jsonPath: "generateBillScreen.batchtype",

      },
      afterFieldChange: async (action, state, dispatch) => {


        let ConectionCategory = await get(state, "screenConfiguration.preparedFinalObject.generateBillScreen.batchtype");
        if (ConectionCategory == "Batch") {
          try {
            let payload = await httpRequest(
              "post",
              "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Block",
              "_search",
              [{ key: "tenantId", value: getTenantIdCommon() }],
              {}
            );
            let batchar = [];
            const batches =
              payload &&
              payload.TenantBoundary[0] &&
              payload.TenantBoundary[0].boundary &&
              payload.TenantBoundary[0].boundary.filter((item) => {
                batchar.push({ item });
                return batchar;
              }, []);
            dispatch(
              prepareFinalObject(
                "applyScreenMdmsData.tenant.batchs",
                batches
              )
            );
            dispatch(prepareFinalObject("applyScreenMdmsData.tenant.mohaladata", ""));
            dispatch(prepareFinalObject("applyScreenMdmsData.tenant.groups", ""));

          } catch (e) {
            console.log(e);
          }
        }
        else if (ConectionCategory == "Group") {
          let mdmsBody = {
            MdmsCriteria: {
              tenantId: getTenantIdCommon(),
              moduleDetails: [
                {
                  moduleName: "ws-services-masters",
                  masterDetails: [{ name: "groups" }]
                }
              ]
            }
          };
          try {
            let payload = await httpRequest(
              "post",
              "/egov-mdms-service/v1/_search",
              "_search",
              [],
              mdmsBody

            );
            payload = payload.MdmsRes['ws-services-masters'];
            let groupsar = [];
            const batches =
              payload &&
              payload.groups.filter((item) => {
                groupsar.push({ item });
                return groupsar;
              }, []);
            dispatch(
              prepareFinalObject(
                "applyScreenMdmsData.tenant.groups",
                batches
              )
            );
            dispatch(prepareFinalObject("applyScreenMdmsData.tenant.mohaladata", ""));
            dispatch(prepareFinalObject("applyScreenMdmsData.tenant.batchs", ""));

          } catch (e) {
            console.log(e);
          }
        }
        else {
          //locality
          
          let response = await httpRequest(
            "post",
            "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
            "_search",
            [{ key: "tenantId", value: getTenantIdCommon() }],
            {}
          );
          let mohallaDataArray = [];
          let mohallaDataRow = null;
          let name, code;
          response.TenantBoundary[0].boundary.map((element, index) => {
            name = element.name + "( " + element.code + " )";
            code = element.code;
            mohallaDataRow = {
              "code": code,
              "name": name
            };
            mohallaDataArray.push(mohallaDataRow);

          });

          dispatch(prepareFinalObject("applyScreenMdmsData.tenant.mohaladata", mohallaDataArray));
          dispatch(
            prepareFinalObject(
              "applyScreenMdmsData.tenant.batchs",
              ""
            )

          );
          dispatch(
            prepareFinalObject(
              "applyScreenMdmsData.tenant.groups",
              ""
            )
          );
        }
      },
      required: false,

      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    //---------------------------------------------------------------------------------------
    //             locality drop down
    //-----------------------------------------------------------------------------------------
    locality: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      jsonPath: "generateBillScreen.mohallaData",
      props: {
        label: { labelName: "Locality", labelKey: "Locality" },
        placeholder: { labelName: "Select maholla", labelKey: "WS_GENERATE_BILL_LOCALITY_PLACEHOLDER" },
        optionLabel: "name",
        required: false,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "applyScreenMdmsData.tenant.mohaladata",
        jsonPath: "generateBillScreen.mohallaData",

      },
      required: false,
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    batch: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      sourceJsonPath: "applyScreenMdmsData.tenant.batchs",
      jsonPath: "generateBillScreen.batch",
      props: {
        label: { labelName: "Batch", labelKey: "Batch" },
        placeholder: { labelName: "Select Batch", labelKey: "Select Batch" },
        optionLabel: "name",
        required: false,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "applyScreenMdmsData.tenant.batchs",
        jsonPath: "generateBillScreen.batch",

      },
      required: false,
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    groUp: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "AutosuggestContainer",
      sourceJsonPath: "applyScreenMdmsData.tenant.groups",
      jsonPath: "generateBillScreen.groUp",
      props: {
        label: { labelName: "Group", labelKey: "Group" },
        placeholder: { labelName: "Select Group", labelKey: "Select Group" },
        optionLabel: "name",
        required: false,
        labelsFromLocalisation: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "applyScreenMdmsData.tenant.groups",
        jsonPath: "generateBillScreen.group",

      },
      required: false,
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
  }),
  //---------------------------------------------------------------------------------------
  //             Reset Button and Submit Button
  //-----------------------------------------------------------------------------------------



  //-------------------------
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 3 },
        props: {
          variant: "outlined",
          style: {
            color: "rgba(0, 0, 0, 0.6000000238418579)",
            borderColor: "rgba(0, 0, 0, 0.6000000238418579)",
            width: "220px",
            height: "48px",
            margin: "28px",
            float: "right"
          }
        },
        children: { buttonLabel: getLabel({ labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON" }) },
        onClickDefination: {
          action: "condition",
          callBack: searchBillApiCall
        }
      },

      //---------------------------------------------------------------------------------------
      //             Generate Bill  Button
      //-----------------------------------------------------------------------------------------
      searchButton: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 4 },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "28px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px",
            float: "left"
          }
        },
        children: { buttonLabel: getLabel({ labelKey: "WS_GENERATE_BILL_GENERATE_BUTTON" }) },
        onClickDefination: {

          action: "condition",
          callBack: generateBillApiCall
        }
      },
    })


  }),


});



