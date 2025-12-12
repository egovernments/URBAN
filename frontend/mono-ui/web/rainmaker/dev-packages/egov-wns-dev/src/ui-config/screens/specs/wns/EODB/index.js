import React from "react";
import { Dialog } from "components";
import Label from "egov-ui-kit/utils/translationNode";

export const Eodb = ({ open, onClose }) => {
  const handleBackToSearch = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
    //   isClose={true}
      handleClose={onClose}
      bodyStyle={{ padding: "20px" }}
    >
      <div style={{ marginBottom: "12px", color: "#555" }}>
        <b>
          This service is currently unavailable for institutional and industrial
          properties.
          <br />
          To apply for a Water & Sewerage connection, please visit the Invest
          Punjab portal to complete the process.
        </b>
      </div>
      <button
        type="button"
        style={{
          width: "100%",
          color: "white",
          fontSize: "16px",
          fontWeight: "500",
        }}
        className={"button-verify-link"}
        onClick={handleBackToSearch}
      >
        Search Different Property
        
      </button>
    </Dialog>
  );
};


