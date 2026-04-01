import React, { useState, useEffect } from "react";
import EGFFinance from "../../components/EGF";

const EGF = () => {
  let location = window.location.pathname;
  location = location.substring(location.indexOf("/services"));
  return (
    <div>
      <EGFFinance location={location} />
    </div>
  );
};

export default EGF;
