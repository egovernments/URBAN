import {
  getCommonCard,


  getCommonContainer,
  getLabel, getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { generateMultipleBill } from "../../utils/receiptPdf";
import { searchApiCall } from "./functions";
import { httpRequest } from "../../../../../ui-utils";
import get from 'lodash/get';
let arr =[
  {
    code: "Batch",
    value: "Batch",
  },
  {
    code: "Locality",
    value: "Locality",
  },
  {
    code: "Integrated Bill",
    value: "Integrated Bill",
  }

];
if(getTenantIdCommon() == "pb.patiala"){
  arr.push({code: "Group",value: "Group"});
}
// const wsBillinData = [
//   {
//     code: "JAN 2018 - MAR 2018",
//     label: "Jan 2018 - Mar 2018"
//   },
//   {
//     code: "APRIL 2018 - JUL 2018",
//     label: "April 2018 - Jul 2018"
//   },
//   {
//     code: "AUG 2018 - NOV 2018",
//     label: "Aug 2018 - Nov 2018"
//   }
// ]

const tenantId = process.env.REACT_APP_NAME === "Employee" ? getTenantId() : JSON.parse(getUserInfo()).permanentCity;
export const resetFields = (state, dispatch) => {
  // dispatch(
  //   handleField(
  //     "groupBills",
  //     "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.billingPeriod",
  //     "props.value",
  //     ""
  //   )
  // );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.ulb",
      "props.value",
      tenantId
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.consumerId",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.locMohalla",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.locMohalla",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.locMohalla",
      "props.helperText",
      ""
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.serviceCategory",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.serviceCategory",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "groupBills",
      "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.serviceCategory",
      "props.helperText",
      ""
    )
  );
};

export const abgSearchCard = getCommonCard({
  searchContainer: getCommonContainer(
    {
      ulb: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-abg",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "ULB",
            labelKey: "ABG_ULB_LABEL"
          },
          localePrefix: {
            moduleName: "TENANT",
            masterName: "TENANTS"
          },
          optionLabel: "name",
          placeholder: {
            labelName: "Select ULB",
            labelKey: "ABG_ULB_PLACEHOLDER"
          },
          required: true,
          value: tenantId,
          disabled: true,
          isClearable: true,
          labelsFromLocalisation: true,
          className:"autocomplete-dropdown",
          jsonPath: "searchCriteria.tenantId",
          sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
        },
        required: true,
        jsonPath: "searchCriteria.tenantId",
        disabled: false,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      serviceCategory: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-abg",
        componentPath: "AutosuggestContainer",
        props: {
          label: {
            labelName: "Service Category",
            labelKey: "ABG_SERVICE_CATEGORY_LABEL"
          },
          placeholder: {
            labelName: "Select Service Category",
            labelKey: "ABG_SERVICE_CATEGORY_PLACEHOLDER"
          },
          required: true,
          localePrefix : {
            moduleName : "BillingService",
            masterName : "BusinessService"
          },
          labelsFromLocalisation: true,
          isClearable: true,
          className:"autocomplete-dropdown",
          jsonPath: "searchCriteria.businesService",
          sourceJsonPath: "searchScreenMdmsData.BillingService.BusinessService",
        },
        required: true,
        jsonPath: "searchCriteria.businesService",
        gridDefination: {
          xs: 12,
          sm: 4
        },

        // beforeFieldChange :(action, state, dispatch) => {
        //   if(action.value === "WS"){
        //     dispatch(
        //       handleField(
        //         "groupBills",
        //         "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.billingPeriod",
        //         "props.data",
        //         wsBillinData
        //       )
        //     );
        //   }else if(action.value === "PT"){
        //     dispatch(
        //       handleField(
        //         "groupBills",
        //         "components.div.children.abgSearchCard.children.cardContent.children.searchContainer.children.billingPeriod",
        //         "props.sourceJsonPath",
        //         "searchScreenMdmsData.egf-master.FinancialYear"
        //       )
        //     );
        //   }

        // }
      },
      batchtype: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-abg",
        componentPath: "AutosuggestContainer",
        jsonPath: "generateBillScreen.batchtype",
        required: true,
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
          labelsFromLocalisation: true,
          required: true,
          isClearable:true,
          data: arr,
  
          className: "autocomplete-dropdown",
          jsonPath: "generateBillScreen.batchtype",
  
        },
        afterFieldChange: async (action, state, dispatch) => {
       
       
          let ConectionCategory = await get(state, "screenConfiguration.preparedFinalObject.generateBillScreen.batchtype");
          if(ConectionCategory=="Batch"){
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
            dispatch(prepareFinalObject("applyScreenMdmsData.tenant.groups",""));
  
          } catch (e) {
            console.log(e);
          }
        }
        else if(ConectionCategory=="Group"){
          let mdmsBody = {
            MdmsCriteria: {
              tenantId: getTenantIdCommon(),
              moduleDetails: [
                {
                  moduleName: "ws-services-masters",
                  masterDetails: [{ name: "groups"}]
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
            dispatch(prepareFinalObject("applyScreenMdmsData.tenant.batchs",""));
  
          } catch (e) {
            console.log(e);
          }
        }
        else{
  //locality
  
  let response = await httpRequest(
    "post",
    "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
    "_search",
    [{ key: "tenantId", value: getTenantIdCommon() }],
    {}
  );
  let mohallaDataArray = [];
  let localitysar = [];
  let mohallaDataRow=null;
  let name,code;
  // response.TenantBoundary[0].boundary.map((element,index) => {
  //  // name = element.name + "( "+element.code+" )";
  //  // code=element.code;
  //   mohallaDataRow={"code":element.code};
  //  mohallaDataArray.push(mohallaDataRow);
  
  // });
  mohallaDataArray =
  response &&
  response.TenantBoundary[0].boundary.filter((item) => {
    localitysar.push({ item });
    return localitysar;
  }, []);
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
        required: true,
        labelsFromLocalisation: true,
        isClearable: true,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      // billingPeriod: getSelectField({
      //   label: {
      //     labelName: "Financial Year",
      //     labelKey: "ABG_BILLING_PERIOD_LABEL"
      //   },
      //   placeholder: {
      //     labelName: "Select Financial Year",
      //     labelKey: "ABG_BILLING_PERIOD_PLACEHOLDER"
      //   },
      //   required: true,
      //   visible: true,
      //   jsonPath: "searchCriteria.billingPeriod",
      //   gridDefination: {
      //     xs: 12,
      //     sm: 4
      //   },
      //   visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
      // }),
      locMohalla: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-abg",
        componentPath: "AutosuggestContainer",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        jsonPath: "searchCriteria.locality",
        required: false,
        props: {
          className: "autocomplete-dropdown",
          label: {
            labelName: "Location/Mohalla",
            labelKey: "ABG_LOCMOHALLA_LABEL"
          },
          placeholder: {
            labelName: "Select Location/Mohalla",
            labelKey: "ABG_LOCMOHALLA_PLACEHOLDER"
          },
          jsonPath: "searchCriteria.locality",
          sourceJsonPath: "applyScreenMdmsData.tenant.mohaladata", //applyScreenMdmsData.tenant.mohaladata
          //sourceJsonPath: mohallaDataArray,
          labelsFromLocalisation: true,
          required: false,
          isClearable:true,
        }
      },
      batch: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-abg",
        componentPath: "AutosuggestContainer",
        sourceJsonPath: "applyScreenMdmsData.tenant.batchs",
        jsonPath: "searchCriteria.locality",
        props: {
          label: { labelName: "Batch", labelKey: "Batch" },
          placeholder: { labelName: "Select Batch", labelKey: "Select Batch" },
          optionLabel: "name",
          required: false,
          labelsFromLocalisation: true,
          isClearable: true,
          className: "autocomplete-dropdown",
          sourceJsonPath: "applyScreenMdmsData.tenant.batchs",
          jsonPath: "searchCriteria.locality",
  
        },
        required: false,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      groUp: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-wns",
        componentPath: "AutosuggestContainer",
        sourceJsonPath: "applyScreenMdmsData.tenant.groups",
        jsonPath: "searchCriteria.group",
        props: {
          label: { labelName: "Group", labelKey: "Group" },
          placeholder: { labelName: "Select Group", labelKey: "Select Group" },
          optionLabel: "name",
          required: false,
          labelsFromLocalisation: true,
          className: "autocomplete-dropdown",
          sourceJsonPath: "applyScreenMdmsData.tenant.groups",
          jsonPath: "searchCriteria.group",
  
        },
        required: false,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      consumerId: getTextField({
        label: {
          labelName: "Consumer ID",
          labelKey: "ABG_CONSUMER_ID_LABEL"
        },
        placeholder: {
          labelName: "Enter Consumer ID",
          labelKey: "ABG_CONSUMER_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: false,
        jsonPath: "searchCriteria.consumerCode"
      }),
      // status: getSelectField({
      //   label: {
      //     labelName: "Status",
      //     labelKey: "ABG_STATUS_LABEL"
      //   },
      //   placeholder: {
      //     labelName: "Enter Status",
      //     labelKey: "ABG_STATUS_PLACEHOLDER"
      //   },
      //   gridDefination: {
      //     xs: 12,
      //     sm: 4
      //   },
      //   data : [
      //     {
      //       code: "ACTIVE",
      //       label: "BILL_GENIE_ACTIVE_LABEL"
      //     },
      //     {
      //       code: "INACTIVE",
      //       label: "BILL_GENIE_PAID_LABEL"
      //     },
      //     {
      //       code: "PAID",
      //       label: "BILL_GENIE_INACTIVE_LABEL"
      //     }
      //   ],
      //   required: false,
      //   jsonPath: "searchCriteria.status"
      // })
    },
    {
      style: {
        overflow: "visible"
      }
    }
  ),

  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 3
        }
      },
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            border: "#FE7A51 solid 1px",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "RESET",
            labelKey: "ABG_RESET_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFields
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            backgroundColor: "#FE7A51",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "ABG_GROUP_BILL_SEARCH_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      },
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 3
        }
      }
    })
  })
});

export const mergeDownloadButton = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  props: {
    className: "abg-button-container",
    style: {
      textAlign: "right"
    }
  },
  children: {
    mergeButton: {
      componentPath: "Button",
      visible: false,
      props: {
        variant: "contained",
        color: "primary",
        style: {
          color: "white",
          borderRadius: "2px",
          width: "250px",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "MERGE & DOWNLOAD",
          labelKey: "ABG_GROUP_BILLS_MERGE_AND_DOWNLOAD_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: generateMultipleBill
      },
      visible: false
    }
  }
};
