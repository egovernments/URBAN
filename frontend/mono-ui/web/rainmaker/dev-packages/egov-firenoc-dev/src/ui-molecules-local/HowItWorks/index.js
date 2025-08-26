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

const styles = theme => ({
  root: {
    margin: "16px 8px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)"
  },
  stepContainer: {
    padding: "16px 24px",
    borderBottom: "1px solid #e0e0e0"
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
    fontWeight: "bold"
  },
  stepContent: {
    flex: 1
  },
  stepTitle: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "4px",
    color: "#484848"
  },
  stepDescription: {
    fontSize: "14px",
    color: "#767676"
  },
  expandIcon: {
    color: "#f89a3f"
  }
});

class HowItWorks extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const steps = [
      {
        title: "Apply for Fire NOC",
        description: "Submit your application with required documents and property details"
      },
      {
        title: "Document Verification",
        description: "Fire department verifies your submitted documents and property information"
      },
      {
        title: "Site Inspection",
        description: "Fire safety officer conducts on-site inspection of your property"
      },
      {
        title: "Fee Payment",
        description: "Pay the applicable Fire NOC fees after inspection approval"
      },
      {
        title: "NOC Approval",
        description: "Receive your Fire NOC certificate after successful verification"
      }
    ];

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemText 
              primary={
                <Label 
                  label="How it Works?" 
                  labelKey="FIRENOC_HOW_IT_WORKS_TITLE" 
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
                    <div className={classes.stepTitle}>{step.title}</div>
                    <div className={classes.stepDescription}>{step.description}</div>
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
