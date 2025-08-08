import React from "react";

const Option = ({ name, Icon, onClick, className }) => {
  return (
    <div className={className || `CardBasedOptionsMainChildOption`} onClick={onClick}>
      <div className="ChildOptionImageWrapper" style={{background:"none"}}>{Icon}</div>
      <p className="ChildOptionName">{name}</p>
    </div>
  );
};

const CardBasedOptions = ({ header, sideOption, options, styles = {}, style = {} }) => {
  return (
    <div className="CardBasedOptions" style={style}>
      <div className="headContent">
        <h2 style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#5B21B6"
        }}>{header}</h2>
        <p onClick={sideOption.onClick} style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#5B21B6",
          textDecoration: "none",
        }}>{sideOption.name}</p>
      </div>
      <div className="mainContent">
        {options.map((props, index) => (
          <Option key={index} {...props} />
        ))}
      </div>
    </div>
  );
};

export default CardBasedOptions;
