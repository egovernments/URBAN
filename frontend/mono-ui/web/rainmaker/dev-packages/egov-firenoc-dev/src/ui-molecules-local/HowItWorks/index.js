import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import get from "lodash/get";

const styles = theme => ({
  root: {
    margin: "16px 8px",
    backgroundColor: theme.palette.background.paper
  },
  card: {
    margin: "16px 0",
    padding: "16px"
  },
  stepContent: {
    paddingLeft: "24px"
  },
  jss16: {
    margin: "1rem 1rem",
    display: "block"
  },
  jss171: {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "28px",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    userSelect: "none",
    flexShrink: 0
  }
});

// Default Fire NOC steps when MDMS data is not available
const defaultFireNocSteps = [
  {
    headerLabel: "Apply for Fire NOC",
    description: "Submit your application with required documents and property details",
    step: 1
  },
  {
    headerLabel: "Fee Payment", 
    description: "Pay the applicable Fire NOC fees for processing your application",
    step: 2
  },
  {
    headerLabel: "Document Verification",
    description: "Fire department verifies your submitted documents and payment",
    step: 3
  },
  {
    headerLabel: "Site Inspection",
    description: "Fire safety officer conducts on-site inspection of your property",
    step: 4
  },
  {
    headerLabel: "NOC Approval",
    description: "Receive your Fire NOC certificate after successful verification",
    step: 5
  }
];

const defaultFireNocData = {
  moduleCode: "FIRENOC",
  videosJson: defaultFireNocSteps.map(step => ({
    headerLabel: step.headerLabel,
    description: step.description,
    en_IN: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    hi_IN: "https://media.w3.org/2010/05/sintel/trailer.mp4"
  })),
  // pdfHeader: "FIRE_NOC_CITIZEN_CHARTER_DOCUMENT",
  // pdfDesc: "FIRE_NOC_CITIZEN_CHARTER_DOC_DESC"
};

class HowItWorks extends React.Component {
  getFireNocData = () => {
    const { mdmsData } = this.props;
    
    // Try to get MDMS data first
    const mdmsHowItWorks = get(mdmsData, "common-masters.howItWorks", []);
    let fireNocData = null;
    
    if (mdmsHowItWorks && mdmsHowItWorks.length > 0) {
      // Look for FIRENOC data in the array
      const howItWorksItem = mdmsHowItWorks.find(item => item.FIRENOC || item.FireNOC);
      if (howItWorksItem) {
        fireNocData = howItWorksItem.FIRENOC || howItWorksItem.FireNOC;
      }
    }
    
    // Fallback to default data if MDMS data is not available
    return fireNocData || defaultFireNocData;
  };

  render() {
    const { classes } = this.props;
    const fireNocData = this.getFireNocData();
    
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              How it Works?
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Follow these simple steps to get your Fire NOC
            </Typography>
            
            <Stepper orientation="vertical">
              {fireNocData.videosJson && fireNocData.videosJson.map((step, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant="subtitle1">
                      {step.headerLabel.replace(/_/g, ' ')}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <div className={classes.stepContent}>
                      <Typography variant="body2">
                        {step.description}
                      </Typography>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            
            {/* {fireNocData.pdfHeader && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {fireNocData.pdfHeader.replace(/_/g, ' ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {fireNocData.pdfDesc.replace(/_/g, ' ')}
                </Typography>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const mdmsData = get(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData", {});
  return { mdmsData };
};

export default withStyles(styles)(connect(mapStateToProps)(HowItWorks));
