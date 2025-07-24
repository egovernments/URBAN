import React from "react";

import { Switch, useLocation } from "react-router-dom";
import { AppContainer, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { CreateBirth } from "./createBirth";
import SearchBirth from "./SeachBirth";
import BirthCard from "../../components/BirthCard";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import ViewBirth from "./ViewBirth";
import UpdateBirth from "./updateBirth";

const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;

  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container">
          <Route exact path={path}>
            <AppContainer>
              <BirthCard userType={userType} />
            </AppContainer>
          </Route>
          <PrivateRoute path={`${path}/birth-common/create-birth`} component={CreateBirth} />
          <PrivateRoute path={`${path}/birth-common/getCertificate`} component={SearchBirth} />
          <PrivateRoute path={`${path}/viewbirth/:id`} component={ViewBirth} />
          <PrivateRoute path={`${path}/update-birth`} component={UpdateBirth} />
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
