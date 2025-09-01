import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const styles = (theme) => ({
  root: {
    margin: "16px 8px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
  },
  stepContainer: {
    padding: "16px 24px",
    borderBottom: "1px solid #e0e0e0",
  },
  stepIcon: {
    height: "32px",
    width: "32px",
    borderRadius: "50%",
    backgroundColor: "#f89a3f",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "4px",
    color: "#484848",
  },
  stepDescription: {
    fontSize: "14px",
    color: "#767676",
  },
  expandIcon: {
    color: "#f89a3f",
  },
});

class HowItWorks extends Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const steps = [
      {
        titleLabel: "Apply for Fire NOC",
        titleKey: "FIRENOC_STEP_1_APPLY_TITLE",
        descriptionLabel: "Submit your application with required documents and property details",
        descriptionKey: "FIRENOC_STEP_1_APPLY_DESCRIPTION",
      },
      {
        titleLabel: "Fee Payment",
        titleKey: "FIRENOC_STEP_2_PAYMENT_TITLE",
        descriptionLabel: "Pay the applicable Fire NOC fees for processing your application",
        descriptionKey: "FIRENOC_STEP_2_PAYMENT_DESCRIPTION",
      },
      {
        titleLabel: "Document Verification",
        titleKey: "FIRENOC_STEP_3_VERIFICATION_TITLE",
        descriptionLabel: "Fire department verifies your submitted documents and payment",
        descriptionKey: "FIRENOC_STEP_3_VERIFICATION_DESCRIPTION",
      },
      {
        titleLabel: "Site Inspection",
        titleKey: "FIRENOC_STEP_4_INSPECTION_TITLE",
        descriptionLabel: "Fire safety officer conducts on-site inspection of your property",
        descriptionKey: "FIRENOC_STEP_4_INSPECTION_DESCRIPTION",
      },
      {
        titleLabel: "NOC Approval",
        titleKey: "FIRENOC_STEP_5_APPROVAL_TITLE",
        descriptionLabel: "Receive your Fire NOC certificate after successful verification",
        descriptionKey: "FIRENOC_STEP_5_APPROVAL_DESCRIPTION",
      },
    ];

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemText
              primary={
                <Label
                  label="How it Works?"
                  labelKey="COMMON_HOW_IT_WORKS"
                  fontSize="16px"
                  color="#484848"
                  fontWeight="500"
                />
              }
            />
            {open ? (
              <ExpandLess className={classes.expandIcon} />
            ) : (
              <ExpandMore className={classes.expandIcon} />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {steps.map((step, index) => (
              <div key={index} className={classes.stepContainer}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div className={classes.stepIcon}>{index + 1}</div>
                  <div className={classes.stepContent}>
                    <div className={classes.stepTitle}>
                      <Label
                        label={step.titleLabel}
                        labelKey={step.titleKey}
                        fontSize="16px"
                        color="#484848"
                        fontWeight="500"
                      />
                    </div>
                    <div className={classes.stepDescription}>
                      <Label
                        label={step.descriptionLabel}
                        labelKey={step.descriptionKey}
                        fontSize="14px"
                        color="#767676"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Collapse>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(HowItWorks);
