import React from "react";
import PropertyType from "./PropertyType";
import PTExemption from "./PTExemption";
import PTRoomArea from "./PTRoomArea";

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

const OtherDetailLayout = ({  t,
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
          <PropertyType   t={t}
            onSelect={onSelect}
            config={config}
            formData={formData}
            formState={formState}
            setError={setError}
            clearErrors={clearErrors}
            onBlur={onBlur}
            userType={userType}
            {...props} />
        </div>
       
        <div style={columnStyle}>
          <PTExemption   t={t}
            onSelect={onSelect}
            config={config}
            formData={formData}
            formState={formState}
            setError={setError}
            clearErrors={clearErrors}
            onBlur={onBlur}
            userType={userType}
            {...props}/>
        </div>

         <div style={columnStyle}>
          <PTRoomArea
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
    </div>
  );
};

export default OtherDetailLayout;
