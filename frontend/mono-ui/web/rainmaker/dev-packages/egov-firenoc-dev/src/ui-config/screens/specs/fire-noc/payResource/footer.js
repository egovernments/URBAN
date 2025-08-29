import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "../../../../../ui-utils/api";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { convertDateToEpoch, getBill, validateFields } from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

export const callPGService = async (state, dispatch) => {
 
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const applicationNumber = getQueryArg(
    window.location.href,
    "applicationNumber"
  );
  let callbackUrl = `${
    process.env.NODE_ENV === "production"
      ? `${window.origin}/citizen`
      : window.origin
  }/fire-noc/paymentRedirectPage`;
  try {
    const queryObj = [
      {
        key: "tenantId",
        value: tenantId
      },
      {
        key: "applicationNumber",
        value: applicationNumber
      }
    ];
    const billPayload = await getBill(queryObj);
    const taxAndPayments = get(billPayload, "Bill[0].taxAndPayments", []).map((item,index)=>{
      return {
        amountPaid :item.taxAmount,
        billId : get(billPayload, "Bill[0].id")
      }
    })
    // const taxAndPayments = get(billPayload, "Bill[0].taxAndPayments", []).map(
    //   item => {        
        // if (item.businessService === "FIRENOC") {
        //   item.amountPaid = get(
        //     billPayload,
        //     "Bill[0].billDetails[0].totalAmount"
        //   );
        //   item.billId = get(billPayload, "Bill[0].id")
        // }
        // return item;
    //   }
    // );
    try {
      const userMobileNumber = get(state,"auth.userInfo.mobileNumber")
      const userName = get(state,"auth.userInfo.name")
      const requestBody = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: get(state, "auth.accessToken"),
          userInfo: get(state, "auth.userInfo"),
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {}
        },
        Payment: {
          mobileNumber: userMobileNumber,
          paymentDetails: [
            {
              businessService: "FIRENOC",
              billId: get(billPayload, "Bill[0].id"),
              totalDue: get(billPayload, "Bill[0].billDetails[0].totalAmount"),
              totalAmountPaid: get(billPayload, "Bill[0].billDetails[0].totalAmount")
            }
          ],
          tenantId,
          totalDue: get(billPayload, "Bill[0].billDetails[0].totalAmount"),
          totalAmountPaid: get(billPayload, "Bill[0].billDetails[0].totalAmount"),
          paymentMode: get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.instrumentType.name", "CASH"),
          payerName: userName,
          paidBy: get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].paidBy", "OWNER"),
          additionalDetails: get(state, "auth.userInfo.type") === "CITIZEN" ? {
            isWhatsapp: false,
            paidBy: "OWNER"
          } : {}
        }
      };
      const paymentResponse = await httpRequest(
        "post",
        "collection-services/payments/_create",
        "_create",
        [],
        requestBody
      );
      
      // Handle payment success - similar to original PG flow but direct
      if (get(paymentResponse, "Payments[0]")) {
        const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
        const tenantId = getQueryArg(window.location.href, "tenantId");
        const receiptNumber = get(paymentResponse, "Payments[0].paymentDetails[0].receiptNumber");
        
        // Update Fire NOC status to PAY (same as original flow)
        let response = await getSearchResults([
          {
            key: "tenantId",
            value: tenantId
          },
          { key: "applicationNumber", value: applicationNumber }
        ]);
        set(response, "FireNOCs[0].fireNOCDetails.action", "PAY");
        response = await httpRequest(
          "post",
          "/firenoc-services/v1/_update",
          "",
          [],
          {
            FireNOCs: get(response, "FireNOCs", [])
          }
        );

        // Redirect to success acknowledgement (same as original flow)
        const purpose = "pay";
        const status = "success";
        const appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
        dispatch(
          setRoute(
            `${appendUrl}/fire-noc/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNumber}&tenantId=${tenantId}&secondNumber=${receiptNumber}`
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

const moveToSuccess = (dispatch, receiptNumber) => {
  const applicationNo = getQueryArg(window.location, "applicationNumber");
  const tenantId = getQueryArg(window.location, "tenantId");
  const purpose = "pay";
  const status = "success";
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  dispatch(
    setRoute(
      `${appendUrl}/fire-noc/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}&secondNumber=${receiptNumber}`
    )
  );
};

const getSelectedTabIndex = paymentType => {
  switch (paymentType) {
    case "Cash":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "Cheque":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };
    case "Card":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};

const convertDateFieldToEpoch = (finalObj, jsonPath) => {
  const dateConvertedToEpoch = convertDateToEpoch(
    get(finalObj, jsonPath),
    "daystart"
  );
  set(finalObj, jsonPath, dateConvertedToEpoch);
};

const allDateToEpoch = (finalObj, jsonPaths) => {
  jsonPaths.forEach(jsonPath => {
    if (get(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

const updatePayAction = async (
  state,
  dispatch,
  applicationNo,
  tenantId,
  receiptNumber
) => {
  try {
    let response = await getSearchResults([
      {
        key: "tenantId",
        value: tenantId
      },
      { key: "applicationNumber", value: applicationNo }
    ]);
    set(response, "FireNOCs[0].fireNOCDetails.action", "PAY");
    response = await httpRequest(
      "post",
      "/firenoc-services/v1/_update",
      "",
      [],
      {
        FireNOCs: get(response, "FireNOCs", [])
      }
    );
    if (get(response, "FireNOCs", []).length > 0) {
      moveToSuccess(dispatch, receiptNumber);
    }
  } catch (e) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: e.message, labelKey: e.message },
        "error"
      )
    );
    console.log(e);
  }
};

const callBackForPay = async (state, dispatch) => {
  let isFormValid = true;

  // --- Validation related -----//

  const selectedPaymentType = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0].instrument.instrumentType.name"
  );
  const {
    selectedTabIndex,
    selectedPaymentMode,
    fieldsToValidate
  } = getSelectedTabIndex(selectedPaymentType);

  isFormValid =
    fieldsToValidate
      .map(curr => {
        return validateFields(
          `components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[${selectedTabIndex}].tabContent.${selectedPaymentMode}.children.${curr}.children`,
          state,
          dispatch,
          "pay"
        );
      })
      .indexOf(false) === -1;
  if (
    get(
      state.screenConfiguration.preparedFinalObject,
      "Bill[0].billDetails[0].manualReceiptDate"
    )
  ) {
    isFormValid = validateFields(
      `components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.g8Details.children.cardContent.children.receiptDetailsCardContainer.children`,
      state,
      dispatch,
      "pay"
    );
  }

  //------------ Validation End -------------//

  //------------- Form related ----------------//

  const ReceiptDataTemp = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0]"
  );
  let finalReceiptData = cloneDeep(ReceiptDataTemp);

  allDateToEpoch(finalReceiptData, [
    "Bill[0].billDetails[0].manualReceiptDate",
    "instrument.transactionDateInput"
  ]);

  // if (get(finalReceiptData, "Bill[0].billDetails[0].manualReceiptDate")) {
  //   convertDateFieldToEpoch(
  //     finalReceiptData,
  //     "Bill[0].billDetails[0].manualReceiptDate"
  //   );
  // }

  // if (get(finalReceiptData, "instrument.transactionDateInput")) {
  //   convertDateFieldToEpoch(
  //     finalReceiptData,
  //     "Bill[0].billDetails[0].manualReceiptDate"
  //   );
  // }
  if (get(finalReceiptData, "instrument.transactionDateInput")) {
    set(
      finalReceiptData,
      "instrument.instrumentDate",
      get(finalReceiptData, "instrument.transactionDateInput")
    );
  }

  if (get(finalReceiptData, "instrument.transactionNumber")) {
    set(
      finalReceiptData,
      "instrument.instrumentNumber",
      get(finalReceiptData, "instrument.transactionNumber")
    );
  }

  if (selectedPaymentType === "Card") {
    //Extra check - remove once clearing forms onTabChange is fixed
    if (
      get(finalReceiptData, "instrument.transactionNumber") !==
      get(finalReceiptData, "instrument.transactionNumberConfirm")
    ) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Transaction numbers don't match !",
            labelKey: "ERR_TRANSACTION_NO_DONT_MATCH"
          },
          "error"
        )
      );
      return;
    }
  }

  //------------- Form End ----------------//

  let ReceiptBody = {
    Receipt: []
  };

  ReceiptBody.Receipt.push(finalReceiptData);

  // console.log(ReceiptBody);

  //---------------- Create Receipt ------------------//
  if (isFormValid) {
    try {
      let response = await httpRequest(
        "post",
        "collection-services/receipts/_create",
        "_create",
        [],
        ReceiptBody,
        [],
        {}
      );
      let receiptNumber = get(
        response,
        "Receipt[0].Bill[0].billDetails[0].receiptNumber",
        null
      );

      // Search NOC application and update action to PAY
      const applicationNo = getQueryArg(window.location, "applicationNumber");
      const tenantId = getQueryArg(window.location, "tenantId");
      await updatePayAction(
        state,
        dispatch,
        applicationNo,
        tenantId,
        receiptNumber
      );
    } catch (e) {
      dispatch(
        toggleSnackbar(
          true,
          { labelName: e.message, labelKey: e.message },
          "error"
        )
      );
      console.log(e);
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill all the mandatory fields",
          labelKey: "ERR_FILL_ALL_FIELDS"
        },
        "warning"
      )
    );
  }
};

export const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const footer = getCommonApplyFooter({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
      //  minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "NOC_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["NOC_CEMP"],
      action: "PAY"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
  },
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
      //  minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "MAKE PAYMENT",
        labelKey: "NOC_COMMON_BUTTON_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callPGService
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["CITIZEN"],
      action: "PAY"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});
