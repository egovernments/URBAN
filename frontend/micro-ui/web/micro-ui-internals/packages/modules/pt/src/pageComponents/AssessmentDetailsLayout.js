import React from "react";
import PTRateZone from "./PTRateZone";
import PTRoadFactor from "./PTRoadFactor";
import PTOldPropertyId from "./PTOldPropertyId";
import PTPlotArea from "./PTPlotArea";

const containerStyle = {

  };
  
  const rowStyle = {
  display: "flex",
  flexWrap: "wrap", // Enables wrapping to next line
  gap: "16px",
  marginBottom: "20px",
  };
  
  const columnStyle = {
    flex: "1 1 calc(33.33% - 16px)", // 3 in a row
    minWidth: "250px",
  };
  
  const fullWidthStyle = {
    flex: "1 1 100%",
    minWidth: "250px",
  };

const AssessmentDetailsLayout = ({  t,
    onSelect,
    config,
    formData,
    formState,
    setError,
    clearErrors,
    onBlur,
    userType,
    ...props }) => {
  return (
     <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={columnStyle}>
          <PTRateZone t={t} onSelect={onSelect} formData={formData} {...props} />
        </div>
       
        <div style={columnStyle}>
          <PTOldPropertyId t={t} onSelect={onSelect} formData={formData} {...props} />
        </div>

         <div style={columnStyle}>
          <PTRoadFactor
            t={t}
            onSelect={onSelect}
            config={config}
            formData={formData}
            formState={formState}
            setError={setError}
            clearErrors={clearErrors}
            onBlur={onBlur}
            userType={userType}
            {...props}
          />
        </div>

      </div>

      <div style={rowStyle}>
        <div style={fullWidthStyle}>
          <PTPlotArea t={t} onSelect={onSelect} formData={formData} {...props} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetailsLayout;
