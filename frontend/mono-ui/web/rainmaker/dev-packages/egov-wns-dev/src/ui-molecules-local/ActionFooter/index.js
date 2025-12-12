import React from "react";
import { connect } from "react-redux";
import { Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import {
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { Container, Item } from "egov-ui-framework/ui-atoms";
import MenuButton from "egov-ui-framework/ui-molecules/MenuButton";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { isWorkflowExists } from "../../ui-utils/commons";
import { httpRequest } from "../../ui-utils/api";
import store from "ui-redux/store";
import { showHideAdhocPopup } from "../../ui-config/screens/specs/utils";
class Footer extends React.Component {
  state = {
    open: false,
  };
  render() {
    let downloadMenu = [];
    const {
      connectionNumber,
      tenantId,
      toggleSnackbar,
      applicationNo,
      applicationNos,
      businessService,
      bill,
      isAmendmentInWorkflow,
    } = this.props;
    const editButton = {
      label: "Edit",
      labelKey: "WS_MODIFY_CONNECTION_BUTTON",
      link: async () => {
        // checking for the due amount
        let due = getQueryArg(window.location.href, "due");
        let legacy = getQueryArg(window.location.href, "legacy");
        let serviceName = getQueryArg(window.location.href, "service");
        let dischargeConnection = getQueryArg(
          window.location.href,
          "dischargeConnection"
        );
        let dischargeFee = getQueryArg(window.location.href, "dischargeFee");
        let errLabel =
          applicationNo && applicationNo.includes("WS")
            ? "WS_DUE_AMOUNT_SHOULD_BE_ZERO"
            : "SW_DUE_AMOUNT_SHOULD_BE_ZERO";
        
        //Remove condition while amount is greater than 0 also able to modify connection
        if (due && parseInt(due) > 0 && legacy === "false") {
          // remove the condition if dues available prevent to modify connection
          alert(
            "Please Collect Pending " +
              serviceName +
              " Service due before proceeding to modify the connection"
          );
          // toggleSnackbar(
          //   true,
          //   {
          //     labelName: "Due Amount should be zero!",
          //     labelKey: errLabel,
          //   },
          //   "error"
          // );
          // return false;
        }

        // check for the WF Exists
        const queryObj = [
          { key: "businessIds", value: applicationNos },
          { key: "tenantId", value: tenantId },
        ];
        // ////
        let isApplicationApproved = await isWorkflowExists(queryObj);
        let connectionNumberFromURL = getQueryArg(
          window.location.href,
          "connectionNumber"
        );
        // let dischargeConnection = get(
        //   state,
        //   "screenConfiguration.preparedFinalObject.applyScreen.additionalDetails.dischargeConnection"
        // );
        // let dischargeFee = get(
        //   state,
        //   "screenConfiguration.preparedFinalObject.applyScreen.additionalDetails.dischargeFee"
        // );
        if (!isApplicationApproved) {
          toggleSnackbar(
            true,
            {
              labelName: "WorkFlow already Initiated",
              labelKey: "WS_WORKFLOW_ALREADY_INITIATED",
            },
            "error"
          );
          return false;
        }
        store.dispatch(
          setRoute(
            `/wns/apply?applicationNumber=${applicationNo}&connectionNumber=${connectionNumberFromURL}&tenantId=${tenantId}&action=edit&mode=MODIFY&dischargeConnection=${dischargeConnection}&dischargeFee=${dischargeFee}`
          )
        );
      },
    };
    const BillAmendment = {
      label: "Edit",
      labelKey: "WS_BILL_AMENDMENT_BUTTON",
      link: async () => {
        // checking for the due amount

        showHideAdhocPopup(
          this.props.state,
          store.dispatch,
          "connection-details"
        );

        // check for the WF Exists
        const queryObj = [
          { key: "businessIds", value: applicationNos },
          { key: "tenantId", value: tenantId },
        ];
      },
    };
    const cancelDemand = {
      label: "Cancel Demand",
      labelKey: "Cancel Demand",
      link: async (state, dispatch) => {
        // ////
        let arr = [];
        //  arr = state.screenConfiguration.preparedFinalObject.billwns;
        console.log(arr);

        let swservice = getQueryArg(window.location.href, "service");
        if (swservice == "SEWERAGE") {
          const queryObjectForConn = [
            { key: "consumerCode", value: connectionNumber },
            { key: "tenantId", value: tenantId },
            { key: "businessService", value: "SW" },
          ];

          //  billing-service/demand/_search
          // ////
          const responseSewerage = await httpRequest(
            "post",
            "/billing-service/demand/_search",
            "_search",
            queryObjectForConn
          );

          let latestDemand =
            responseSewerage.Demands[responseSewerage.Demands.length - 1];
          try {
            let payload = await httpRequest(
              "post",
              "/sw-calculator/sewerageCalculator/cancelDemand",
              "_update",
              [],
              {
                CancelList: [
                  {
                    tenantId: tenantId,
                    demandid: latestDemand.id,
                  },
                ],
              }
            );
            alert(
              "Demand Cancel has been Successfully for this Connection Number : " +
                connectionNumber +
                " Please wait 30 Sec for Demand Update"
            );

            setTimeout(() => {
              window.location.reload();
            }, 30000);
          } catch (e) {
            alert(
              "Unable to Demand Cancel for this  Connection Number : " +
                connectionNumber
            );
          }
        } else if (swservice == "WATER") {
          const queryObjectForConn = [
            { key: "consumerCode", value: connectionNumber },
            { key: "tenantId", value: tenantId },
            { key: "businessService", value: "WS" },
          ];

          //  billing-service/demand/_search
          ////
          const responseWater = await httpRequest(
            "post",
            "/billing-service/demand/_search",
            "_search",
            queryObjectForConn
          );

          let latestDemand =
            responseWater.Demands[responseWater.Demands.length - 1];
          try {
            //console.log("shdshfdsh-1")
            const payload = await httpRequest(
              "post",
              "/ws-calculator/waterCalculator/cancelDemand",
              "_update",
              [],
              {
                CancelList: [
                  {
                    tenantId: tenantId,
                    demandid: latestDemand.id,
                  },
                ],
              }
            );
            //console.log("shdshfdsh-2")
            alert(
              "Demand Cancel has been Successfully for this Connection Number : " +
                connectionNumber +
                " Please wait 30 Sec for Demand Update"
            );

            setTimeout(() => {
              window.location.reload();
            }, 30000);
          } catch (e) {
            alert(
              "Unable to Cancel Demand for this Water Connection Number : " +
                connectionNumber
            );
            //console.log("shdshfdsh-3")
          }
        }
      },
    };
    const SWdemand = {
      label: "Single Demand",
      labelKey: "Single Demand",
      link: async (state, dispatch) => {
        let swservice = getQueryArg(window.location.href, "service");
        let connectionNumber = getQueryArg(
          window.location.href,
          "connectionNumber"
        );
        if (swservice == "SEWERAGE") {
          try {
            let payload = await httpRequest(
              "post",
              "/sw-calculator/sewerageCalculator/_singledemand",
              "_update",
              [],
              {
                tenantId: tenantId,
                consumercode: connectionNumber,
              }
            );
            alert(
              "Demand has been Successfully Genrated for this Connection Number : " +
                connectionNumber +
                " Please wait 30 Sec for Demand Update"
            );

            setTimeout(() => {
              window.location.reload();
            }, 30000);
          } catch (e) {
            alert(
              "Unable to Generate Demand for this Water Connection Number : " +
                connectionNumber
            );
          }
        }
        // else if(this.props.bill.Demands[0].businessService == "WS"){
        else if (swservice == "WATER") {
          
          try {
            //console.log("shdshfdsh-1")
            const payload = await httpRequest(
              "post",
              "/ws-calculator/waterCalculator/_singledemand",
              "_update",
              [],
              {
                tenantId: tenantId,
                consumercode: connectionNumber,
              }
            );
            //console.log("shdshfdsh-2")
            alert(
              "Demand has been Successfully Genrated for this Connection Number : " +
                connectionNumber +
                " Please wait 30 Sec for Demand Update"
            );

            setTimeout(() => {
              window.location.reload();
            }, 30000);
          } catch (e) {
            alert(
              "Unable to Generate Demand for this Water Connection Number : " +
                connectionNumber
            );
            //console.log("shdshfdsh-3")
          }
        }
      },
    };
    const collectbutton = {
      label: "Collect",
      labelKey: "Collect",
      link: (state) => {
        let connectionNumber = getQueryArg(
          window.location.href,
          "connectionNumber"
        );
        let tenantId = getQueryArg(window.location.href, "tenantId");
        let service = getQueryArg(window.location.href, "service");
        let connectionType = getQueryArg(
          window.location.href,
          "connectionType"
        );
        store.dispatch(
          setRoute(
            `viewBill?connectionNumber=${connectionNumber}&tenantId=${tenantId}&service=${service}&connectionType=${connectionType}`
          )
        );
      },
    };

    //if(applicationType === "MODIFY"){
    downloadMenu && downloadMenu.push(collectbutton);
    downloadMenu && downloadMenu.push(SWdemand);
    downloadMenu && downloadMenu.push(cancelDemand);
    downloadMenu && downloadMenu.push(editButton);
    if (
      businessService.includes("ws-services-calculation") ||
      businessService.includes("sw-services-calculation")
    ) {
      if (bill.Demands && bill.Demands.length > 0 && isAmendmentInWorkflow) {
        downloadMenu && downloadMenu.push(BillAmendment);
      }
    }

    const buttonItems = {
      label: { labelName: "Take Action", labelKey: "WF_TAKE_ACTION" },
      rightIcon: "arrow_drop_down",
      props: {
        variant: "outlined",
        style: {
          marginRight: 15,
          backgroundColor: "#FE7A51",
          color: "#fff",
          border: "none",
          height: "60px",
          width: "200px",
        },
      },
      menu: downloadMenu,
    };

    return (
      <div className="wf-wizard-footer" id="custom-atoms-footer">
        <Container>
          <Item xs={12} sm={12} className="wf-footer-container">
            <MenuButton data={buttonItems} className="mnubtn" />
          </Item>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let connectionObj = get(
    state.screenConfiguration.preparedFinalObject,
    "WaterConnection",
    []
  );
  /* For WorkFlow check */
  let applicationNos = get(
    state.screenConfiguration.preparedFinalObject,
    "applicationNos",
    []
  );
  let bill = get(
    state.screenConfiguration.preparedFinalObject,
    "BILL_FOR_WNS",
    ""
  );
  let isAmendmentInWorkflow = get(
    state.screenConfiguration.preparedFinalObject,
    "isAmendmentInWorkflow",
    true
  );
  let connectDetailsData = get(
    state.screenConfiguration.preparedFinalObject,
    "connectDetailsData"
  );

  if (connectionObj.length === 0) {
    connectionObj = get(
      state.screenConfiguration.preparedFinalObject,
      "SewerageConnection",
      []
    );
  }
  const applicationNo =
    connectionObj && connectionObj.length > 0
      ? connectionObj[0].applicationNo
      : "";
  const businessService = connectDetailsData.BillingService.BusinessService.map(
    (item) => {
      return item.businessService;
    }
  );
  return {
    state,
    applicationNo,
    applicationNos,
    businessService,
    bill,
    isAmendmentInWorkflow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbar: (open, message, variant) =>
      dispatch(toggleSnackbar(open, message, variant)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
