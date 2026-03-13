import React from "react";
import PropTypes from "prop-types";
import CountryCodeSelector from "./CountryCodeSelector";

const MobileNumber = (props) => {
  const user_type = Digit.SessionStorage.get("userType");

  // Get maxLength based on country code
  const getMaxLength = (code) => {
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

  // Determine the effective country code
  const effectiveCountryCode = props.countryCode || '+91';

  // Determine the effective maxLength
  const effectiveMaxLength = props.maxLength || getMaxLength(effectiveCountryCode);

  const onChange = (e) => {
    let val = e.target.value;
    if (isNaN(val) || [" ", "e", "E"].some((e) => val.includes(e)) || val.length > effectiveMaxLength) {
      val = val.slice(0, -1);
    }
    props?.onChange?.(val);
  };

  return (
    <React.Fragment>
      <div className="field-container">
        {!props.hideSpan ? (
          props.showCountryCodeSelector ? (
            <CountryCodeSelector
              countryCode={effectiveCountryCode}
              onCountryCodeChange={props.onCountryCodeChange}
              disable={props.disable}
              tenantId={props.tenantId}
              labelStyle={props.labelStyle}
              className="citizen-card-input citizen-card-input--front"
            />
          ) : (
            <span
              style={{ maxWidth: "50px", marginTop: "unset", ...props.labelStyle }}
              className="citizen-card-input citizen-card-input--front"
            >
              {effectiveCountryCode}
            </span>
          )
        ) : null}
        <div className={`text-input ${user_type === "employee"? "" : "text-mobile-input-width"} ${props.className}`}>
          <input
            type={"text"}
            name={props.name}
            id={props.id}
            className={`${user_type ? "employee-card-input" : "citizen-card-input"} ${props.disable && "disabled"} focus-visible ${props.errorStyle && "employee-card-input-error"}`}
            placeholder={props.placeholder}
            onChange={onChange}
            ref={props.inputRef}
            value={props.value}
            style={{ ...props.style }}
            // defaultValue={props.defaultValue || ""}
            minLength={props.minlength}
            maxLength={effectiveMaxLength}
            max={props.max}
            pattern={props.pattern}
            min={props.min}
            readOnly={props.disable}
            title={props.title}
            step={props.step}
            autoFocus={props.autoFocus}
            onBlur={props.onBlur}
            autoComplete="off"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

MobileNumber.propTypes = {
  userType: PropTypes.string,
  isMandatory: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  ref: PropTypes.func,
  value: PropTypes.any,
  countryCode: PropTypes.string,
  onCountryCodeChange: PropTypes.func,
  showCountryCodeSelector: PropTypes.bool,
  tenantId: PropTypes.string,
  maxLength: PropTypes.number,
  disable: PropTypes.bool,
};

MobileNumber.defaultProps = {
  isMandatory: false,
  showCountryCodeSelector: false,
  countryCode: '+91',
};

export default MobileNumber;
