import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer,

} from "egov-ui-framework/ui-containers";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import set from "lodash/set";
import { Dialog, DialogContent } from "@material-ui/core";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "egov-ui-framework/ui-molecules";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { hideSpinner, showSpinner } from "egov-ui-kit/redux/common/actions";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";

const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});
//const validityDropDown = [{ "value": 1, "label": 1 }, { "value": 2, "label": 2 }, { "value": 3, "label": 3 }]
const fieldConfig = {
  approverName: {
    label: {
      labelName: "Validity Years",
      labelKey: "Validity Years"
    },
    placeholder: {
      labelName: "Select Validity Years",
      labelKey: "Select Validity Years"
    }
  },

};

class TlRenewDialog extends React.Component {
  state = {
    validityYears: [],
    roles: "",
    tlValidity : "",
    unType : false
  };

  // onEmployeeClick = e => {
  //   const { handleFieldChange, toggleSnackbar } = this.props;
  //   const selectedValue = e.target.value;
  //   const currentUser = JSON.parse(getUserInfo()).uuid;
  //   if (selectedValue === currentUser) {
  //     toggleSnackbar(
  //       true,
  //       "Please mark to different Employee !",
  //       "error"
  //     );
  //   } else {
  //     handleFieldChange("Licenses[0].assignee", e.target.value);
  //   }
  // };

  getButtonLabelName = label => {
    return "Submit"
  };
  renewTradelicence = async (licenseData, tlValidity, isHAZ) => {
    
      //showSpinner();
      console.log("isHAZ"+isHAZ)
    let licences = [];
    let validityYears = {
      validityYears :tlValidity
    }
   const wfCode = isHAZ  ? "NEWTL.HAZ" : "DIRECTRENEWAL";
   const action = isHAZ ? "APPLY" : "INITIATE";
   const businessService = isHAZ ? "TL" : "TL"

   const nextFinancialYear =  get(licenseData, "financialYear");
   const tenantId = get(licenseData, "tenantId");
   //console.log("nextFinancialYear"+nextFinancialYear)
   set(licenseData, "tradeLicenseDetail.additionalDetail", validityYears);
   set(licenseData, "workflowCode" ,wfCode)
   set (licenseData, "action", action)
   set (licenseData, "businessService", businessService)
   //set(licenseData,)
   licences.push(licenseData)
   try {
    const response = await httpRequest(
      "post",
      "/tl-services/v1/_update",
      "",
      [],
      {
        Licenses: licences
      }
    );
    const renewedapplicationNo = get(response, `Licenses[0].applicationNumber`);
    const licenseNumber = get(response, `Licenses[0].licenseNumber`);
    const url = window.location.href
    const userType = url.includes('employee') ? 'employee' : 'citizen';
   
    const reDirectUrl = process.env.NODE_ENV === "production"  ? 
      `${userType}/tradelicence/acknowledgement?purpose=DIRECTRENEWAL&status=success&applicationNumber=${renewedapplicationNo}&licenseNumber=${licenseNumber}&FY=${nextFinancialYear}&tenantId=${tenantId}&action=${wfCode}`
      :
          `/tradelicence/acknowledgement?purpose=DIRECTRENEWAL&status=success&applicationNumber=${renewedapplicationNo}&licenseNumber=${licenseNumber}&FY=${nextFinancialYear}&tenantId=${tenantId}&action=${wfCode}`;
    
    window.location.href = `acknowledgement?purpose=DIRECTRENEWAL&status=success&applicationNumber=${renewedapplicationNo}&licenseNumber=${licenseNumber}&FY=${nextFinancialYear}&tenantId=${tenantId}&action=${wfCode}`;

    // setRoute(
    //   `/tradelicence/acknowledgement?purpose=DIRECTRENEWAL&status=success&applicationNumber=${renewedapplicationNo}&licenseNumber=${licenseNumber}&FY=${nextFinancialYear}&tenantId=${tenantId}&action=${wfCode}`
    // );

    } catch (exception) {
     hideSpinner();
      console.log(exception);
      alert(exception.message)
      toggleSnackbar(
        true,
        {
          labelName: "Please fill all the mandatory fields!",
          labelKey: exception && exception.message || exception
        },
        "error"
      );

    }

  };
  


  render() {

    let {
      open,
      onClose,
      licenseData,
      wFCode,
      isHAZ
    } = this.props;
    
    let dropdowndata = []
    const {validityYears, roles, tlValidity, unType} = this.state
    const { getButtonLabelName } = this;
    //console.log("licenseData"+JSON.stringify(licenseData.tradeLicenseDetail))
     if (isHAZ) {
          dropdowndata.push ({ "value": 1, "label": 1 })       
     }else{
       dropdowndata.push ({ "value": 1, "label": 1 }, { "value": 2, "label": 2 }, { "value": 3, "label": 3 })     
     }
    
   const dialogHeader = { "labelName": "Select Validity", "Key": "Select Validity" }
    let fullscreen = false;
    const showAssignee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
    if (window.innerWidth <= 768) {
      fullscreen = true;
    }
   
    return (
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={onClose}
        maxWidth={false}
        style={{ zIndex: 2000 }}
      >
        <DialogContent
          children={
            <Container
              children={
                <Grid
                  container="true"
                  spacing={12}
                  marginTop={16}
                  className="action-container"
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer {...dialogHeader} />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      position: "absolute",
                      right: "16px",
                      top: "16px"
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>

                  <Grid
                    item
                    sm="12"
                    style={{
                      marginTop: 16
                    }}
                  >
                    <TextFieldContainer
                      select={true}
                      style={{ marginRight: "15px" }}
                      label={fieldConfig.approverName.label}
                      placeholder={fieldConfig.approverName.placeholder}
                      required={true}
                      data={dropdowndata}
                      optionValue="value"
                      optionLabel="label"
                      hasLocalization={false}
                      onChange ={(e)=> this.setState({
                        tlValidity : e.target.value
                      })}
                      value ={tlValidity}
                    //onChange={e => this.onEmployeeClick(e)}
                    // onChange={e =>
                    //   handleFieldChange(
                    //     assigneePath,
                    //     e.target.value
                    //   )
                    // }
                    // jsonPath={assigneePath}
                    />
                  </Grid>


                  <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      required={true}
                      style={{
                        minWidth: "200px",
                        height: "48px"
                      }}
                      className="bottom-button"
                     onClick={() =>
                       this.renewTradelicence(licenseData, tlValidity,isHAZ)
                     }
                    >
                      <LabelContainer
                        labelName="Submit"
                        labelKey=""
                      />
                    </Button>
                  </Grid>
                </Grid>

              }
            />
          }
        />
      </Dialog>
    );
  }
}
export default withStyles(styles)(TlRenewDialog);
