import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Eodb } from "../../ui-config/screens/specs/wns/EODB/index";
import { handleEodbDialogClose, clearSearchResults } from "../../ui-config/screens/specs/wns/applyResource/functions";

const EodbDialogContainer = ({ open, onClose, ...props }) => {
  const handleClose = () => {
    if (props.dispatch) {
      // Close the dialog
      handleEodbDialogClose(props.state, props.dispatch);
      
      // Clear search results to force fresh property selection
      clearSearchResults(props.state, props.dispatch);
    }
  };

  return (
    <Eodb 
      open={open} 
      onClose={handleClose}
      {...props}
    />
  );
};

const mapStateToProps = (state) => {
  const dialogState = get(
    state,
    "screenConfiguration.preparedFinalObject.eodbDialog",
    { open: false }
  );
  
  return {
    open: dialogState.open || false,
    state
  };
};

export default connect(mapStateToProps)(EodbDialogContainer);
