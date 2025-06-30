import React from "react";

const CardSectionHeader = (props) => {
  return (
    <header id={props.id} className="card-section-header" 
    // style={props.style}
      style={{ color: "#4729A3", ...(props.style || {}) }}
    >
      {props.children}
    </header>
  );
};

export default CardSectionHeader;
