// import React from "react";
// import PTSelectColony from "./PTSelectColony";
// import PTSelectWard from "./PTSelectWard";
// import PTSelectZone from "./PTSelectZone";
// import PTSelectStreet from "./PTSelectStreet";
// import PTSelectPincode from "./PTSelectPincode";

// const containerStyle = {
//   // width: "1400px",
//   // marginLeft: "-450px",
// };

// const rowStyle = {
//   display: "flex",
//   gap: "4px",
//   marginBottom: "20px", // Adds space between rows
// };

// const columnStyle = {
//   flex: "1 1 calc(50% - 16px)", // 2 in a row, adjusting width
//   minWidth: "250px",
// };

// const threeColumnStyle = {
//   flex: "1 1 calc(33.33% - 16px)", // 3 in a row
//   minWidth: "250px",
// };

// const PropertAddressLayout = ({
//   t,
//   onSelect,
//   config,
//   formData,
//   formState,
//   setError,
//   clearErrors,
//   onBlur,
//   userType,
//   ...props
// }) => {
//   return (
//     <div style={containerStyle}>
//       {/* First Row: PTSelectStreet and PTSelectPincode */}
//       <div style={rowStyle}>
//         <div >
//           <PTSelectStreet
//             t={t}
//             onSelect={onSelect}
//             config={config}
//             formData={formData}
//             formState={formState}
//             setError={setError}
//             clearErrors={clearErrors}
//             onBlur={onBlur}
//             userType={userType}
//             {...props}
//           />
//         </div>
//         <div >
//           <PTSelectPincode
//             t={t}
//             onSelect={onSelect}
//             config={config}
//             formData={formData}
//             formState={formState}
//             setError={setError}
//             clearErrors={clearErrors}
//             onBlur={onBlur}
//             userType={userType}
//             {...props}
//           />
//         </div>
//       </div>

//       {/* Second Row: PTSelectColony, PTSelectWard, and PTSelectZone */}
//       <div style={rowStyle}>
//         <div style={threeColumnStyle}>
//           <PTSelectColony
//             t={t}
//             onSelect={onSelect}
//             config={config}
//             formData={formData}
//             formState={formState}
//             setError={setError}
//             clearErrors={clearErrors}
//             onBlur={onBlur}
//             userType={userType}
//             {...props}
//           />
//         </div>

//         <div style={threeColumnStyle}>
//           <PTSelectWard
//             t={t}
//             onSelect={onSelect}
//             config={config}
//             formData={formData}
//             formState={formState}
//             setError={setError}
//             clearErrors={clearErrors}
//             onBlur={onBlur}
//             userType={userType}
//             {...props}
//           />
//         </div>

//         <div style={threeColumnStyle}>
//           <PTSelectZone
//             t={t}
//             onSelect={onSelect}
//             config={config}
//             formData={formData}
//             formState={formState}
//             setError={setError}
//             clearErrors={clearErrors}
//             onBlur={onBlur}
//             userType={userType}
//             {...props}
//           />
//         </div>
//       </div>
//       {/*
//        <div style={rowStyle}>
//          <div style={fullWidthStyle}>
//            <PTPlotArea t={t} onSelect={onSelect} formData={formData} {...props} />
//          </div>
//        </div> */}
//     </div>
//   );
// };

// export default PropertAddressLayout;

import React from "react";
import PTSelectColony from "./PTSelectColony";
import PTSelectWard from "./PTSelectWard";
import PTSelectZone from "./PTSelectZone";
import PTSelectStreet from "./PTSelectStreet";
import PTSelectPincode from "./PTSelectPincode";

const rowStyle = {
 display: "flex",
  flexWrap: "wrap", // Enables wrapping to next line
  gap: "16px",
  marginBottom: "20px",
 
};



const PropertAddressLayout = ({
  t,
  onSelect,
  config,
  formData,
  formState,
  setError,
  clearErrors,
  onBlur,
  userType,
  ...props
}) => {
  return (
    <div>
      {/* First Row: Street, Pincode, Colony */}
      <div style={rowStyle}>
        <div>
          <PTSelectStreet
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
        <div >
          <PTSelectPincode
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
        <div style={rowStyle}>
          <PTSelectColony
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
           <PTSelectWard
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
     
          <PTSelectZone
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

      {/* Second Row: Ward, Zone, Empty (or any additional field later) */}
     
    </div>
  );
};

export default PropertAddressLayout;
