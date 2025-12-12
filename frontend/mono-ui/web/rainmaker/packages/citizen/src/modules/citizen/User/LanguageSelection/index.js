import React, { Component } from "react";
import { connect } from "react-redux";
import { Banner } from "modules/common";
import { LanguageSelectionForm } from "modules/common";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale, isValidLocale } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";

class LanguageSelection extends Component {
  state = {
    value: getLocale() || 'en_IN', // getLocale() now has fallback built-in
  };

  componentDidMount=()=>{
    // Ensure valid locale, fallback to en_IN
    const locale = this.state.value || 'en_IN';
    this.props.fetchLocalizationLabel(locale);
  }

  onClick = (value) => {
    // Validate locale before setting, fallback to en_IN if invalid
    const validLocale = isValidLocale(value) ? value : 'en_IN';

    if (!isValidLocale(value)) {
      console.warn(`[LanguageSelection] Invalid locale selected: "${value}", using en_IN instead`);
    }

    this.setState({ value: validLocale });
    this.props.fetchLocalizationLabel(validLocale);
  };

  onLanguageSelect = () => {
    //this.props.history.push("/user/register");
    this.props.history.push("/user/login");
  };

  render() {
    const { value } = this.state;
    const { onLanguageSelect, onClick } = this;
    const { bannerUrl, logoUrl, languages } = this.props;
    return (
      <Banner className="language-selection" bannerUrl={bannerUrl} logoUrl={logoUrl}>
        <LanguageSelectionForm items={languages} value={value} onLanguageSelect={onLanguageSelect} onClick={onClick} />
      </Banner>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { stateInfoById } = common;
  let bannerUrl = get(stateInfoById, "0.bannerUrl");
  let logoUrl = get(stateInfoById, "0.logoUrl");
  let languages = get(stateInfoById, "0.languages", []);
  return { bannerUrl, logoUrl, languages };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocalizationLabel: (locale) => dispatch(fetchLocalizationLabel(locale)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelection);
