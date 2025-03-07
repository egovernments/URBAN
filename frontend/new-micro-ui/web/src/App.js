import React from "react";

import { DigitUI } from "@egovernments/digit-ui-module-core";
import { initLibraries } from "@egovernments/digit-ui-libraries";

import {
  TLModule,
  TLLinks,
  initTLComponents,
} from "@egovernments/digit-ui-module-tl";


initLibraries();

const enabledModules = [
  "TL",
];

window.Digit.ComponentRegistryService.setupRegistry({
  TLModule,
  TLLinks,
});

initTLComponents();

const moduleReducers = (initData) => ({
  initData,
});

function App() {
  const stateCode =
    window.globalConfigs?.getConfig("STATE_LEVEL_TENANT_ID") ||
    process.env.REACT_APP_STATE_LEVEL_TENANT_ID;
  if (!stateCode) {
    return <h1>stateCode is not defined</h1>;
  }
  return (
    <DigitUI
      stateCode={stateCode}
      enabledModules={enabledModules}
      moduleReducers={moduleReducers}
    />
  );
}

export default App;
