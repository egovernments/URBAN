import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSearchResults } from "../../ui-utils/commons";

class PaymentRedirect extends Component {
  componentDidMount = async () => {
    // Since we're now using direct payment API instead of payment gateway,
    // this redirect page may not be needed. Redirect to home or appropriate page.
    const { search } = this.props.location;
    const urlParams = new URLSearchParams(search);
    const applicationNumber = urlParams.get('applicationNumber');
    const tenantId = urlParams.get('tenantId');
    const status = urlParams.get('status') || 'success';
    
    if (applicationNumber && tenantId) {
      this.props.setRoute(
        `/fire-noc/acknowledgement?purpose=pay&status=${status}&applicationNumber=${applicationNumber}&tenantId=${tenantId}`
      );
    } else {
      // Fallback to fire-noc home page
      this.props.setRoute('/fire-noc/home');
    }
  };
  render() {
    return <div />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRoute: route => dispatch(setRoute(route))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(PaymentRedirect));
