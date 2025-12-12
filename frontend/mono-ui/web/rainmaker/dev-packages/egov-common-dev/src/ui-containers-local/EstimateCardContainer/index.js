import React, { Component } from "react";
import { FeesEstimateCard } from "../../ui-molecules-local";
import { Dialog } from "components";
import { connect } from "react-redux";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer"; // ADD

class EstimateCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { welcomePopupOpen: false };
    this._welcomeTimer = null;
  }

  componentDidMount() {
    // Show a welcome popup 2 seconds after landing on Payment Collection Details
    if (this._welcomeTimer) {
      clearTimeout(this._welcomeTimer);
    }
    this._welcomeTimer = setTimeout(() => {
      this.setState({ welcomePopupOpen: true });
      this._welcomeTimer = null;
    }, 2000);
  }

  componentWillUnmount() {
    if (this._welcomeTimer) {
      clearTimeout(this._welcomeTimer);
      this._welcomeTimer = null;
    }
  }

  closeWelcomePopup = () => {
    if (this._welcomeTimer) {
      clearTimeout(this._welcomeTimer);
      this._welcomeTimer = null;
    }
    // Hide the popup by adding display:none class
    const popup = document.querySelector('.pt-warning-popup');
    if (popup) {
      popup.style.display = 'none';
    }
    this.setState({ welcomePopupOpen: false });
  }

  render() {
    const { estimate, isArrears } = this.props;
    const { welcomePopupOpen } = this.state;
    return (
      <React.Fragment>
        <FeesEstimateCard estimate={estimate} isArrears={isArrears} />

        <Dialog
          className="pt-warning-popup"
          open={welcomePopupOpen}
          isClose={true}
          title={
            <div
              style={{
                // marginLeft: "110px",
                // padding: "2%",
                color: "rgb(72, 72, 72)",
                fontSize: "16px",
                lineHeight: "42px",
                fontWeight: 600,
                textAlign: "center",
                background: "#f7f7f7",
              }}
            >
              <LabelContainer
                labelKey="CHECK_PAYMER_MOBILENO_MSSG"
                labelName="Check the payer's mobile number."
              />
            </div>
          }
          handleClose={this.closeWelcomePopup}
          titleStyle={{ padding: 0, backgroundColor: "#f7f7f7" }}
          actionsContainerStyle={{ padding: "2%", backgroundColor: "white" }}
          bodyStyle={{ padding: "0% 2% 2% 2%", backgroundColor: "white" }}
        >
          <div style={{ padding: "10px", textAlign: "center" }}>
            <div style={{ color: "rgba(0, 0, 0, 0.87)", fontSize: "14px", marginBottom: "4px" }}>
              <LabelContainer
                labelKey="PAYMER_MOBILE_NO_MSG"
                labelName="Check your details before payment"
              />
            </div>
          </div>
          <div className="pt-warning-button-container" style={{ textAlign: "center" }}>
            <button
              type="button"
              style={{ width: "100%", marginTop: "10px", color: "white", fontWeight: 500 }}
              className={"button-verify-link"}
              onClick={this.closeWelcomePopup}
            >
              OK
            </button>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const sortBillDetails = (billDetails = []) => {
  let sortedBillDetails = [];
  sortedBillDetails = billDetails.sort((x, y) => y.fromPeriod - x.fromPeriod);
  return sortedBillDetails;
}
const formatTaxHeaders = (billDetail = {}) => {

  let formattedFees = []
  const { billAccountDetails = [] } = billDetail;
  const billAccountDetailsSorted = orderBy(
    billAccountDetails,
    ["amount"],
    ["asce"]);
  formattedFees = billAccountDetailsSorted.map((taxHead) => {
    return {
      info: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      name: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      value: taxHead.amount
    }
  })
  formattedFees.reverse();
  return formattedFees;
}


const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;



  const fees = formatTaxHeaders(sortBillDetails(get(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []))[0]);
  // const fees = get(screenConfiguration, "preparedFinalObject.applyScreenMdmsData.estimateCardData", []);
  const billDetails = get(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []);
  const isArrears = get(screenConfiguration, "preparedFinalObject.isArrears");
  let totalAmount = 0;
  let arrears = 0;
  for (let billDetail of billDetails) {
    totalAmount += billDetail.amount;

  }
  if (totalAmount > 0) {
    arrears = totalAmount - billDetails[0].amount;
    arrears = arrears.toFixed(2);
  }
  const estimate = {
    header: { labelName: "Fee Estimate", labelKey: "NOC_FEE_ESTIMATE_HEADER" },
    fees,
    totalAmount,
    arrears
  };
  return { estimate, isArrears };
};

export default connect(
  mapStateToProps,
  null
)(EstimateCardContainer);
