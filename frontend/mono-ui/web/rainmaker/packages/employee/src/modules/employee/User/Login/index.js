import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import { Banner } from "modules/common";
import LoginForm from "./components/LoginForm";
import { connect } from "react-redux";
import get from "lodash/get";

const LoginFormHOC = formHoc({ formKey: "employeeLogin" })(LoginForm);

const Login = ({ bannerUrl, logoUrl }) => {
  return (
    <Banner hideBackButton={false} bannerUrl={bannerUrl} logoUrl={logoUrl}>
      {/* <marquee style={{ color: "white", fontStyle: "italic", fontSize: "20px", margin: "20px 0" }}>
         Planned Downtime Notice: The mSeva Punjab application will be unavailable from 15th August 2025 to 18th August 2025 due to scheduled maintenance. We regret the inconvenience and appreciate your understanding.
      </marquee> */}
      <LoginFormHOC logoUrl={logoUrl} />
    </Banner>
  );
};

const mapStateToProps = ({ common }) => {
  const { stateInfoById } = common;
  let bannerUrl = get(stateInfoById, "0.bannerUrl");
  let logoUrl = get(stateInfoById, "0.logoUrl");
  return { bannerUrl, logoUrl };
};

export default connect(
  mapStateToProps,
  null
)(Login);
