import React from "react";
import { DigitUI } from "@egovernments/digit-ui-module-core";
import SessionManager from "./SessionManager";
import ErrorBoundary from "../utils/errorBoundary";

const AppWithSessionManager = ({ stateCode, enabledModules, moduleReducers }) => {
  return (
    <ErrorBoundary>
      <DigitUI
        stateCode={stateCode}
        enabledModules={enabledModules}
        moduleReducers={moduleReducers}
      >
        <SessionManager timeoutMinutes={2} />
      </DigitUI>
    </ErrorBoundary>
  );
};

export default AppWithSessionManager;