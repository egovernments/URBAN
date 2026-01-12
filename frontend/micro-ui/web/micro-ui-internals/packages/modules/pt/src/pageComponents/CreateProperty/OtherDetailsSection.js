// import React from "react";
// import { CardLabel } from "@egovernments/digit-ui-react-components";

// const OtherDetailsSection = ({ t, config, onSelect, formData = {}, userType }) => {
//   const details = formData?.otherDetails || {};

//   const handleChange = (key, value) => {
//     const updated = { ...details, [key]: value };
//     onSelect(config.key, updated);
//   };

//   if (userType !== "employee") return null;

//   const sectionTitle = {
//     fontFamily: "Poppins",
//     fontWeight: 500,
//     fontSize: "18px",
//     color: "#282828",
//     margin: "24px 0 16px 0",
//   };

//   const labelStyle = {
//     fontFamily: "Poppins",
//     fontWeight: 500,
//     fontSize: "14px",
//     color: "#505A5F",
//     marginBottom: "4px",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "6px",
//     fontSize: "14px",
//     marginBottom: "16px",
//   };

//   const fieldContainer = {
//     width: "32%",
//     // marginRight: "2%",
//     // marginBottom: "16px",
//   };

//   const containerStyle = {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   };

//   return (
//     <div style={{ marginTop: "24px" }}>
//       <div style={sectionTitle}>{t("Other details")}</div>
//       <div style={containerStyle}>
//         {/* Property Type */}
//         <div style={fieldContainer}>
//           <div style={labelStyle}>{t("Property Type")}</div>
//           <select
//             style={inputStyle}
//             value={details.propertyType || ""}
//             onChange={(e) => handleChange("propertyType", e.target.value)}
//           >
//             <option value="">{t("Select")}</option>
//             <option value="RESIDENTIAL">{t("Residential")}</option>
//             <option value="COMMERCIAL">{t("Commercial")}</option>
//             <option value="INDUSTRIAL">{t("Industrial")}</option>
//           </select>
//         </div>

//         {/* Rooms/Area */}
//         <div style={fieldContainer}>
//           <div style={labelStyle}>{t("Rooms/Area")}</div>
//           <input
//             type="text"
//             style={inputStyle}
//             value={details.roomsArea || ""}
//             onChange={(e) => handleChange("roomsArea", e.target.value)}
//             placeholder={t("Enter")}
//           />
//         </div>

//         {/* Exemption Applicable */}
//         <div style={fieldContainer}>
//           <div style={labelStyle}>{t("Exemption Applicable")}</div>
//           <select
//             style={inputStyle}
//             value={details.exemption || ""}
//             onChange={(e) => handleChange("exemption", e.target.value)}
//           >
//             <option value="">{t("Select")}</option>
//             <option value="NONE">{t("None")}</option>
//             <option value="SENIOR_CITIZEN">{t("Senior Citizen")}</option>
//             <option value="DISABLED">{t("Disabled")}</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtherDetailsSection;


import React from "react";
import { CardLabel, TextInput, Dropdown } from "@egovernments/digit-ui-react-components";

const OtherDetailsSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const details = formData?.otherDetails || {};

  const handleChange = (key, value) => {
    const updated = { ...details, [key]: value };
    onSelect(config.key, updated);
  };

  if (userType !== "employee") return null;

  const sectionTitle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "18px",
    color: "#282828",
    margin: "24px 0 16px 0",
  };

  const labelStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "14px",
    color: "#505A5F",
    marginBottom: "4px",
  };

  const inputStyle = {
    width: "100%",
    // padding: "6px",
    fontSize: "14px",
    marginBottom: "16px",
  };

  const fieldContainer = {
    width: "32%",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={sectionTitle}>{t("Other details")}</div>
      <div style={containerStyle}>
        {/* Property Type */}
        <div style={fieldContainer}>
          <div style={labelStyle}>{t("Property Type")}</div>
          <Dropdown
            t={t}
            option={[
              { code: "RESIDENTIAL", name: t("Residential") },
              { code: "COMMERCIAL", name: t("Commercial") },
              { code: "INDUSTRIAL", name: t("Industrial") },
            ]}
            selected={
              details.propertyType
                ? { name: details.propertyType }
                : null
            }
            select={(val) => handleChange("propertyType", val?.name)}
            optionKey="name"
            placeholder={t("Select")}
            style={inputStyle}
          />
        </div>

        {/* Rooms/Area */}
        <div style={fieldContainer}>
          <div style={labelStyle}>{t("Rooms/Area")}</div>
          <TextInput
            value={details.roomsArea || ""}
            onChange={(e) => handleChange("roomsArea", e.target.value)}
            placeholder={t("Enter")}
            style={inputStyle}
            name="roomsArea"
            type="text"
          />
        </div>

        {/* Exemption Applicable */}
        <div style={fieldContainer}>
          <div style={labelStyle}>{t("Exemption Applicable")}</div>
          <Dropdown
            t={t}
            option={[
              { code: "NONE", name: t("None") },
              { code: "SENIOR_CITIZEN", name: t("Senior Citizen") },
              { code: "DISABLED", name: t("Disabled") },
            ]}
            selected={
              details.exemption
                ? { name: details.exemption }
                : null
            }
            select={(val) => handleChange("exemption", val?.name)}
            optionKey="name"
            placeholder={t("Select")}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherDetailsSection;
