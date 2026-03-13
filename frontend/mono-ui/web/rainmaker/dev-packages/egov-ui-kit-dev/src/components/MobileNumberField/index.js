import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "../TextField";
import CountryCodeDropdown from "../CountryCodeDropdown";

const containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box",
};

const containerWithDropdownStyle = {
  position: "relative",
  display: "flex",
  gap: "10px",
  width: "100%",
  boxSizing: "border-box",
};

const textFieldBaseStyle = {
  textIndent: 35,
};

const textFieldWithDropdownStyle = {
  flex: 1,
};

const prefixBaseStyle = {
  position: "absolute",
  color: "#969696",
  zIndex: 2,
  top: 36,
  paddingRight: 5,
  borderRight: "1px solid #eee",
};

const floatingLabelStyle = {
  left: -35,
};

const countryCodeDropdownStyle = {
  width: "150px",
  minWidth: "150px",
};

/**
 * MobileNumberField - A component for mobile number input with optional country code selector
 *
 * @param {Object} props - Component props
 * @param {string} props.className - CSS class name
 * @param {Object} props.textFieldStyle - Custom styles for text field
 * @param {string} props.prefix - Static country code prefix (used when showCountryCodeSelector is false)
 * @param {Object} props.prefixStyle - Custom styles for prefix
 * @param {boolean} props.showCountryCodeSelector - Whether to show country code dropdown
 * @param {string} props.countryCode - Selected country code value
 * @param {Function} props.onCountryCodeChange - Callback when country code changes
 * @param {string} props.tenantId - Tenant ID for MDMS query
 * @param {number} props.maxLength - Maximum length for mobile number (overrides country-specific length)
 */
class MobileNumberField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: props.countryCode || props.prefix || "+91"
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.countryCode !== this.props.countryCode && this.props.countryCode) {
      this.setState({ countryCode: this.props.countryCode });
    }
  }

  /**
   * Get maxLength based on country code
   */
  getMaxLength = (code) => {
    const lengths = {
      '+91': 10,  // India
      '+1': 10,   // USA/Canada
      '+44': 10,  // UK
      '+971': 9,  // UAE
      '+86': 11,  // China
      '+61': 9,   // Australia
      '+65': 8,   // Singapore
      '+81': 10,  // Japan
      '+49': 11,  // Germany
      '+33': 9,   // France
    };
    return lengths[code] || 15; // Default to 15 if not found
  };

  handleCountryCodeChange = (code) => {
    this.setState({ countryCode: code });
    if (this.props.onCountryCodeChange) {
      this.props.onCountryCodeChange(code);
    }
  };

  render() {
    const {
      className = "",
      textFieldStyle = {},
      prefix = "+91",
      prefixStyle = {},
      showCountryCodeSelector = false,
      countryCode,
      onCountryCodeChange,
      tenantId,
      jsonPath,
      errorMessage,
      maxLength,
      ...textFieldProps
    } = this.props;

    const effectiveCountryCode = this.state.countryCode;
    const effectiveMaxLength = maxLength || this.getMaxLength(effectiveCountryCode);

    // If country code selector is enabled, render with dropdown
    if (showCountryCodeSelector && tenantId) {
      return (
        <div style={containerWithDropdownStyle}>
          <CountryCodeDropdown
            value={effectiveCountryCode}
            onChange={this.handleCountryCodeChange}
            tenantId={tenantId}
            disabled={textFieldProps.disabled}
            floatingLabelText="Country Code"
            style={countryCodeDropdownStyle}
          />
          <TextField
            className={`mobile-number-field ${className}`}
            id="mobile-number-field"
            name="mobile-number-field"
            InputProps={{
              maxLength: effectiveMaxLength,
              minLength: effectiveMaxLength,
            }}
            style={{ ...textFieldWithDropdownStyle, ...textFieldStyle }}
            {...textFieldProps}
            type="number"
          />
        </div>
      );
    }

    // Default rendering with static prefix
    return (
      <div style={containerStyle}>
        <div style={{ ...prefixBaseStyle, ...prefixStyle }}>{effectiveCountryCode}</div>
        <TextField
          className={`mobile-number-field ${className}`}
          id="mobile-number-field"
          name="mobile-number-field"
          InputProps={{
            maxLength: effectiveMaxLength,
            minLength: effectiveMaxLength,
          }}
          errorStyle={{ marginLeft: "-35px" }}
          inputStyle={{ width: "85%" }}
          style={{ ...textFieldBaseStyle, ...textFieldStyle }}
          {...textFieldProps}
          floatingLabelStyle={floatingLabelStyle}
          type="number"
        />
      </div>
    );
  }
}

MobileNumberField.propTypes = {
  textFieldStyle: PropTypes.object,
  prefixStyle: PropTypes.object,
  prefix: PropTypes.string,
  className: PropTypes.string,
  showCountryCodeSelector: PropTypes.bool,
  countryCode: PropTypes.string,
  onCountryCodeChange: PropTypes.func,
  tenantId: PropTypes.string,
  maxLength: PropTypes.number,
};

MobileNumberField.defaultProps = {
  showCountryCodeSelector: false,
  countryCode: "+91",
  prefix: "+91",
};

export default MobileNumberField;
