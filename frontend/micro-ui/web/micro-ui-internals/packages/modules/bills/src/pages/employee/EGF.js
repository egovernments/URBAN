import React, { useState, useEffect } from "react";
import EGFFinance from "../../components/EGF";
// import IFrameInterface from "../../components/IFrameInterface";

const EGF = () => {
  // const queryString = window.location.search;
  // const params = new URLSearchParams(queryString);
  // const moduleName = params.get("moduleName");
  // const pageName = params.get("pageName");
  // const stateCode = window?.globalConfigs?.getConfig("STATE_LEVEL_TENANT_ID") || "pb";
  let location = window.location.pathname;
  location = location.substring(location.indexOf("/services"));
  return (
    <div className="dashboard">
      {/* <IFrameInterface
        wrapperClassName="custom-iframe-wrapper"
        className="custom-iframe"
        moduleName={moduleName}
        pageName={pageName}
        stateCode={stateCode}
        // filters={null}
      /> */}
      <EGFFinance location={location} />
    </div>
  );
};

export default EGF;
