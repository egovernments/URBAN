import React from "react";

const CardSubHeader = (props) => {
  const user_type = Digit.SessionStorage.get("user_type") === "employee" ? true : false;

  return (
    <header
      className={`${user_type ? "employee-card-sub-header" : "card-sub-header"} ${props?.className ? props?.className : ""}`}
      // style={props.style}
        style={{ color: "#3F0071", fontWeight: "bold", textDecoration: "underline" ,fontSize:"16px",marginTop:"1rem", ...(props.style || {}) }}
    >
      {props.children}
    </header>
  );
};

export default CardSubHeader;
