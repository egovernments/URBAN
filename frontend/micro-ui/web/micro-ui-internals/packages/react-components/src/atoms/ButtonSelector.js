// import React from "react";
// import PropTypes from "prop-types";
// const buttonStyle = {
//   marginTop: "1rem",
//   backgroundColor: "rgb(106, 27, 154)",
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// const ButtonSelector = (props) => {
//   let theme = "selector-button-primary";
//   switch (props.theme) {
//     case "border":
//       theme = "selector-button-border";
//       break;
//     default:
//       theme = "selector-button-primary";
//       break;
//   }
//   return (
//     <button
//       className={props.isDisabled ? "selector-button-primary-disabled" : theme}
//       type={props.type || "submit"}
//       form={props.formId}
//       onClick={props.onSubmit}
//       disabled={props.isDisabled}
//       style={props.style ? props.style : null}
//     >
//       <h2 style={{ ...props?.textStyles, ...{ width: "100%" } }}>{props.label}</h2>
//     </button>
//   );
// };

// ButtonSelector.propTypes = {
//   /**
//    * ButtonSelector content
//    */
//   label: PropTypes.string.isRequired,
//   /**
//    * button border theme
//    */
//   theme: PropTypes.string,
//   /**
//    * click handler
//    */
//   onSubmit: PropTypes.func,
// };

// ButtonSelector.defaultProps = {
//   label: "",
//   theme: "",
//   onSubmit: undefined,
// };

// export default ButtonSelector;

import React from "react";
import PropTypes from "prop-types";

const styles = {
  primary: {
    backgroundColor: "#4729A3", // Solid purple
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1.5rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  border: {
    backgroundColor: "transparent",
    color: "#f47738", // Red color
    border: "1px solid #f47738",
    borderRadius: "5px",
    padding: "0.5rem 1.5rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

const ButtonSelector = (props) => {
  const {
    label,
    theme,
    isDisabled,
    type,
    formId,
    onSubmit,
    style,
    textStyles,
  } = props;

  // ✅ FIX: Define this to use consistently
  const isBorderTheme = theme === "border";

  const appliedStyle = {
    ...(isBorderTheme ? styles.border : styles.primary),
    ...(isDisabled ? styles.disabled : {}),
    ...(style || {}),
  };

  return (
    <button
      type={type || "submit"}
      form={formId}
      onClick={onSubmit}
      disabled={isDisabled}
      style={appliedStyle}
    >
      <span
        style={{
          width: "100%",
          color: isBorderTheme ? styles.border.color : styles.primary.color,
          ...textStyles,
        }}
      >
        {label}
      </span>
    </button>
  );
};

ButtonSelector.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.string,
  onSubmit: PropTypes.func,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
  formId: PropTypes.string,
  style: PropTypes.object,
  textStyles: PropTypes.object,
};

ButtonSelector.defaultProps = {
  label: "",
  theme: "",
  onSubmit: undefined,
  isDisabled: false,
  type: "submit",
  formId: undefined,
  style: null,
  textStyles: {},
};

export default ButtonSelector;
