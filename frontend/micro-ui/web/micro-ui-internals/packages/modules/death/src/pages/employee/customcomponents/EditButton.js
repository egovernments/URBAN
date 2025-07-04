import { Button, Card } from "@egovernments/digit-ui-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const EditButtonCard = ({ certificateId,data }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/${window.contextPath}/employee/death/death-common/create-death?action=EDIT&certificateId=${certificateId}&module=death`,
        {
         editdata: data,
        }
    );
  };

  return (
    <Card style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <Button
        label={t("Edit")}
        onClick={handleEditClick}
        variation="primary"
        type="button"
      />
    </Card>
  );
};

export default EditButtonCard;
