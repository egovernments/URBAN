import React from "react";
import { Button } from "@egovernments/digit-ui-react-components";

function EditButton() {

  const  handleBtnClick=()=>
  {
    
  }
  return <Button label={"Edit "}  onButtonClick={() => {
    handleBtnClick()
  }} />;
}

export default EditButton;
