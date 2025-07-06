
import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew } from "@egovernments/digit-ui-components";
const ViewBirthLinkButton = ({ tenantId, certificateId,hospitalname }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(
      `/${window.contextPath}/employee/birth/viewbirth/${certificateId}`,
      {
        myData: certificateId,
        myhospitalname: hospitalname,
        mytenantId: tenantId,
      }
    );
  };
  

  return (
    <ButtonNew
    className="custom-class"
    label="View"
    onClick={handleClick}
    variation="link"
  />
  );
};
  export default ViewBirthLinkButton;
