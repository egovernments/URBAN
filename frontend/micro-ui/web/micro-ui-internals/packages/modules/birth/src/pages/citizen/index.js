import { AppContainer, BackButton, Header, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Switch } from "react-router-dom";
import SearchBirth from "./SearchAndDownload";
import MyApplications from "./MyApplication";
import BirthCard from "../../components/BirthCard";
import { Route } from "react-router-dom/cjs/react-router-dom.min";


const CitizenApp = ({ path, url, userType }) => {
  return (
    <span className={"birth-citizen"}>
      <Switch>
        <Route exact path={path}>
          <AppContainer>
            <BirthCard userType={userType} />
          </AppContainer>
        </Route>

        <PrivateRoute path={`${path}/birth-common/getCertificates`} component={MyApplications} />

        <PrivateRoute path={`${path}/birth-citizen/myApplications`} component={SearchBirth} />
      </Switch>
    </span>
  );
};

export default CitizenApp;
