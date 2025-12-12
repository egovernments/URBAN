import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FormGroup from '@material-ui/core/FormGroup';
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { toggleWater, toggleSewerage } from './toggleFeilds';
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { name } from "../../ui-config/screens/specs/wns/applyResource/reviewConnectionDetails";
import { TextFields } from "@material-ui/icons";

const styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  formControl: {
    marginTop: 0,
    paddingBottom: 0
  },
  group: {
    display: "inline-block",
    margin: 0
  },
  checked: {},
  radioRoot: {
    marginBottom: 12
  },
  formLabel: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.56
  }
};

class CheckboxLabels extends React.Component {
  state = { checkedSewerage: false, checkedWater: false, interChange: false, checkedDischarge: false, dischargeFee : 0, dischargeConnection : ''};
  componentWillMount() {
    const { preparedFinalObject } = this.props;
    
    // Use helper function to get discharge info
    const dischargeInfo = this.getDischargeInfo();
    // Update Redux if needed
    this.updateReduxForDischarge(dischargeInfo);
    
    // Set simple state
    const checkedWater = dischargeInfo.isOnlyDischarge ? false : (preparedFinalObject && preparedFinalObject.applyScreen && preparedFinalObject.applyScreen.water) || false;
    const checkedSewerage = (preparedFinalObject && preparedFinalObject.applyScreen && preparedFinalObject.applyScreen.sewerage) || false;
    
    this.setState({
      checkedWater,
      checkedSewerage,
      checkedDischarge: dischargeInfo.hasDischarge,
      dischargeFee: dischargeInfo.fee,
      dischargeConnection: dischargeInfo.type
    });
  }
  componentDidMount() {
    // Use helper function for backup Redux update
    const dischargeInfo = this.getDischargeInfo();
    this.updateReduxForDischarge(dischargeInfo);
  }

  componentDidUpdate(prevProps) {
    const { preparedFinalObject } = this.props;
    // Check if WaterConnection data has been loaded (indicating search-preview.js completed)
    const hasWaterConnectionData = preparedFinalObject && preparedFinalObject.WaterConnection && preparedFinalObject.WaterConnection.length > 0;
    const hadWaterConnectionData = prevProps.preparedFinalObject && prevProps.preparedFinalObject.WaterConnection && prevProps.preparedFinalObject.WaterConnection.length > 0;
    
    // Only process if WaterConnection data just loaded (search-preview.js completed)
    if (hasWaterConnectionData && !hadWaterConnectionData && !this.state.interChange) {
      // URL-BASED REDUX UPDATE AFTER API DATA LOADS
      const urlDischargeConnection = getQueryArg(window.location.href, "dischargeConnection");
      const urlDischargeFee = getQueryArg(window.location.href, "dischargeFee");
      const isEditMode = getQueryArg(window.location.href, "action") === "edit";
      
      if (isEditMode && urlDischargeConnection && this.props.approveCheck) {
        const { approveCheck } = this.props;
        const decodedDischargeConnection = decodeURIComponent(urlDischargeConnection);
        const decodedDischargeFee = urlDischargeFee ? parseInt(urlDischargeFee) : 0;
        
        if (decodedDischargeConnection === "OnlyDischarge") {
          // Set service flags  
          approveCheck('applyScreen.water', true);      // Backend requirement
          approveCheck('applyScreen.sewerage', false);
          approveCheck('applyScreen.discharge', true);  // UI flag
          
          // Set required water fields AFTER API data load
          approveCheck('applyScreen.additionalDetails.waterSubUsageType', 'Commercial');
          approveCheck('applyScreen.additionalDetails.connectionCategory', 'GEN');
          approveCheck('applyScreen.additionalDetails.billingType', 'STANDARD');
          approveCheck('applyScreen.additionalDetails.dischargeFee', decodedDischargeFee);
          approveCheck('applyScreen.additionalDetails.dischargeConnection', decodedDischargeConnection);
          
        } else if (decodedDischargeConnection === "true") {
          approveCheck('applyScreen.discharge', true);
        } else if (decodedDischargeConnection === "both") {
          approveCheck('applyScreen.water', true);
          approveCheck('applyScreen.sewerage', true);
          approveCheck('applyScreen.discharge', true);
        }
      }
    }
  }

  handleWater = name => event => {
    const { jsonPathWater, approveCheck, onFieldChange } = this.props;
    this.setState({ [name]: event.target.checked, interChange: true }, () => {
      if (this.state.checkedWater) {
        toggleWater(onFieldChange, true);
        if (this.state.checkedSewerage) 
          { toggleSewerage(onFieldChange, true); }
        else { toggleSewerage(onFieldChange, false); }
      } else { toggleWater(onFieldChange, false); } 
      approveCheck(jsonPathWater, this.state.checkedWater);
    });
  };

  handleSewerage = name => event => {
    const { jsonPathSewerage, approveCheck, onFieldChange } = this.props;
    this.setState({ [name]: event.target.checked, interChange: true }, () => {
      if (this.state.checkedSewerage) {
        toggleSewerage(onFieldChange, true);
        if (this.state.checkedWater) { toggleWater(onFieldChange, true); }
        else { toggleWater(onFieldChange, false); }
      } else { toggleSewerage(onFieldChange, false); }
      approveCheck(jsonPathSewerage, this.state.checkedSewerage);
    });
  }
  
  // Simple helper function to get discharge info
  getDischargeInfo = () => {
    const { preparedFinalObject } = this.props;

    // Check if editing and URL has discharge info
    const isEdit = getQueryArg(window.location.href, "action") === "edit";
    const urlDischarge = getQueryArg(window.location.href, "dischargeConnection");
    
    if(isEdit){
        const decoded = decodeURIComponent(urlDischarge);
        const fee = getQueryArg(window.location.href, "dischargeFee") || 0;
        if (urlDischarge === 'true' || urlDischarge === 'OnlyDischarge') {
        return {
          hasDischarge: true,
          type: decoded,
          fee: parseInt(fee),
          isOnlyDischarge: decoded === "OnlyDischarge"
        };
      }else{
         return {
          hasDischarge: false,
          type: decoded,
          fee: parseInt(fee),
          isOnlyDischarge: decoded === "OnlyDischarge"
        };
      }
    }
    
    
    // Check Redux store
    const waterConnectionDetails = preparedFinalObject && preparedFinalObject.WaterConnection && preparedFinalObject.WaterConnection[0] && preparedFinalObject.WaterConnection[0].additionalDetails;
    const applyScreenDetails = preparedFinalObject && preparedFinalObject.applyScreen && preparedFinalObject.applyScreen.additionalDetails;
    const details = waterConnectionDetails || applyScreenDetails || {};
    
    return {
      hasDischarge: details.dischargeConnection && details.dischargeConnection !== "null",
      type: details.dischargeConnection || 'false',
      fee: details.dischargeFee || 0,
      isOnlyDischarge: details.dischargeConnection === "OnlyDischarge"
    };
  }

  // Update Redux when needed
  updateReduxForDischarge = (dischargeInfo) => {
    const { approveCheck } = this.props;
    
    if (dischargeInfo.hasDischarge && approveCheck) {
      //approveCheck('applyScreen.additionalDetails', {});
      approveCheck('applyScreen.additionalDetails.dischargeFee', dischargeInfo.fee);
      approveCheck('applyScreen.additionalDetails.dischargeConnection', dischargeInfo.type);
      
      if (dischargeInfo.isOnlyDischarge) {
        // Backend needs water=true for discharge apps
        approveCheck('applyScreen.water', true);
        approveCheck('applyScreen.discharge', true);
        approveCheck('applyScreen.sewerage', false);
        approveCheck('applyScreen.additionalDetails.waterSubUsageType', 'Commercial');
      }
    }
  }

  handleDischarge = (name) => event => {
    const { jsonPathDischarge, approveCheck, onFieldChange } = this.props;
    // Update local component state and trigger Redux updates
    this.setState({ [name]: event.target.checked, interChange: true }, () => {

      // Handle field visibility for discharge applications
      if (this.state.checkedDischarge) {
        // Discharge applications should show water fields (as per backend integration requirements)
        // Backend treats discharge as a water service, so we show water form fields
        toggleWater(onFieldChange, true);
        if (this.state.checkedSewerage) {
          // If both discharge and sewerage are selected, show sewerage fields too
          toggleSewerage(onFieldChange, true);
        } else {
          // If only discharge is selected, hide sewerage fields
          toggleSewerage(onFieldChange, false);
        }
      } else {
        // When discharge is unchecked, handle visibility based on other selections
        // Revert to normal water/sewerage selection behavior
        if (this.state.checkedWater) {
          toggleWater(onFieldChange, true);
        } else {
          toggleWater(onFieldChange, false);
        }
        if (this.state.checkedSewerage) {
          toggleSewerage(onFieldChange, true);
        } else {
          toggleSewerage(onFieldChange, false);
        }
      }
      
      // Update Redux state with discharge checkbox value
      approveCheck(jsonPathDischarge, this.state.checkedDischarge);
      
      // Ensure additionalDetails object exists before setting discharge connection details
      // This prevents null reference errors when accessing nested properties
      //approveCheck('applyScreen.additionalDetails', {});
      
      // Set discharge connection type based on current selection combination
      // This logic is used later in commons.js parserFunction for API payload construction
      if(this.state.checkedDischarge === true){
          if(this.state.checkedWater !== true && this.state.checkedSewerage !== true){
            // Discharge-only application: will be processed as "OnlyDischarge" in backend
            approveCheck('applyScreen.additionalDetails.dischargeConnection', 'OnlyDischarge');
          }else if(this.state.checkedWater === true && this.state.checkedSewerage === true){
              // Discharge + Water + Sewerage combination
              approveCheck('applyScreen.additionalDetails.dischargeConnection','both');
          }
          else{
              // Discharge + either Water or Sewerage (but not both)
              approveCheck('applyScreen.additionalDetails.dischargeConnection', 'true');
            }
        }
    });
  }
  handleDischargeAmount = (name, dispatch)=> event=>{
    const {approveCheck, onFieldChange } = this.props;    
    // Update local component state and trigger Redux updates
    this.setState({ [name]: event.target.value, interChange: true }, () => {    
       // Ensure additionalDetails object exists before setting dischargeFee
       // This prevents null reference errors in nested object access
      // approveCheck('applyScreen.additionalDetails', {});
       // Store the discharge fee amount in Redux state for later use in API payload
       approveCheck('applyScreen.additionalDetails.dischargeFee', this.state.dischargeFee);
    });
  }
  render() {
    const { classes, required, preparedFinalObject, disabled = false} = this.props;
   
    // Simplified render logic using helper function
    let checkedWater, checkedSewerage, checkedDischarge, dischargeFee;
    
    if (this.state.interChange) {
      // User has made changes, use component state
      checkedWater = this.state.checkedWater;
      checkedSewerage = this.state.checkedSewerage;
      checkedDischarge = this.state.checkedDischarge;
      dischargeFee = this.state.dischargeFee;
    } else {
      // Use helper function to get discharge info
      const dischargeInfo = this.getDischargeInfo();
      
      checkedDischarge = dischargeInfo.hasDischarge;
      dischargeFee = dischargeInfo.fee;
      
      if (dischargeInfo.isOnlyDischarge) {
        checkedWater = false;
        checkedSewerage = false;
      } else {
        checkedWater = (preparedFinalObject && preparedFinalObject.applyScreen && preparedFinalObject.applyScreen.water) || false;
        checkedSewerage = (preparedFinalObject && preparedFinalObject.applyScreen && preparedFinalObject.applyScreen.sewerage) || false;
      }
    }
    
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl} required={required}>
          <FormLabel className={classes.formLabel}>
            <LabelContainer className={classes.formLabel} labelKey="WS_APPLY_FOR" />
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              classes={{ label: "checkbox-button-label" }}
              control={
                <Checkbox
                  checked={checkedWater}
                  onChange={this.handleWater("checkedWater")}
                  classes={{ root: classes.radioRoot, checked: classes.checked }}
                  color="primary"
                  disabled={disabled}
                />}
              label={<LabelContainer labelKey="WS_APPLY_WATER" />}
            />
            <FormControlLabel
              classes={{ label: "checkbox-button-label" }}
              control={
                <Checkbox
                  checked={checkedSewerage}
                  onChange={this.handleSewerage("checkedSewerage")}
                  classes={{ root: classes.radioRoot, checked: classes.checked }}
                  color="primary"
                  disabled={disabled}
                />}
              label={<LabelContainer labelKey="WS_APPLY_SEWERAGE" />}
            />
            {
              (process.env.REACT_APP_NAME !== "Citizen" &&
                <FormControlLabel
                    classes={{ label: "checkbox-button-label" }}
                    control={
                      <Checkbox
                        checked={checkedDischarge}
                        onChange={this.handleDischarge("checkedDischarge")}
                        classes={{ root: classes.radioRoot, checked: classes.checked }}
                        color="primary"
                        disabled={disabled}
                      />}
                    label={<LabelContainer labelKey="Discharge" />}
                  />
              )
            }
             
         
          {checkedDischarge && 
              
                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            name=""
                            label="Discharge Amount"
                            value={dischargeFee}
                            className={classes.textField}
                            required={checkedDischarge}
                            onChange={this.handleDischargeAmount("dischargeFee")}
                            InputProps={{
                              className: classes.input,
                            }}
                            inputProps={{
                              style: { textAlign: "left", padding: "0.5rem" },
                            }}
                          />
                         
                      }                
              
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  const { screenConfiguration } = state;
  const { jsonPathWater, jsonPathSewerage, jsonPathDischarge } = ownprops;
  const { preparedFinalObject } = screenConfiguration;
  return { preparedFinalObject, jsonPathWater, jsonPathSewerage, jsonPathDischarge};
};

const mapDispatchToProps = dispatch => {
  return { approveCheck: (jsonPath, value) => { dispatch(prepareFinalObject(jsonPath, value)); } };
};

CheckboxLabels.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CheckboxLabels));
