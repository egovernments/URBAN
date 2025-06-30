import {
    CardLabel,
    CardLabelError,
    Dropdown,
    LabelFieldPair,
    TextInput,
  } from "@egovernments/digit-ui-react-components";
  import _ from "lodash";
  import React, { useEffect, useState } from "react";
  import { Controller, useForm } from "react-hook-form";
  import { useLocation } from "react-router-dom";
  
  const PTAuthorizedPerson = ({
    t,
    config,
    onSelect,
    userType,
    formData,
    setError,
    clearErrors,
    formState,
    value,
  }) => {
    const { pathname } = useLocation();
    const presentInModifyApplication = pathname.includes("modify");
  
    let isEditProperty = formData?.isEditProperty || false;
    if (presentInModifyApplication) isEditProperty = true;
    if (formData?.isUpdateProperty) isEditProperty = true;
  
    const relationshipOptions = [
      { code: "FATHER", name: t("FATHER") },
      { code: "MOTHER", name: t("MOTHER") },
      { code: "GUARDIAN", name: t("GUARDIAN") },
      { code: "OTHER", name: t("OTHER") },
    ];
  
    const assessmentYears = [
      { code: "2024-25", name: "2024-25" },
      { code: "2023-24", name: "2023-24" },
      { code: "2022-23", name: "2022-23" },
    ];
  
    const [selectedAssessmentYear, setSelectedAssessmentYear] = useState(
      value || formData?.address?.assessmentYear || null
    );
  
    const [fields, setFields] = useState({
      registrationNumber: formData?.address?.registrationNumber || "",
      name: formData?.address?.name || "",
      aadhaar: formData?.address?.aadhaar || "",
      father: formData?.address?.father || "",
      email: formData?.address?.email || "",
      altNumber: formData?.address?.altNumber || "",
      number: formData?.address?.number || "",
      relationship: formData?.address?.relationship || null,
    });
  
    const [inputError, setInputError] = useState({});
    const {
      control,
      formState: localFormState,
      watch,
      setError: setLocalError,
      clearErrors: clearLocalErrors,
      setValue,
    } = useForm();
  
    const errorStyle = {
      width: "70%",
      marginLeft: "30%",
      fontSize: "12px",
      marginTop: "-21px",
    };
  
    const handleInputChange = (key, value) => {
      setFields((prev) => ({ ...prev, [key]: value }));
      setInputError((prev) => ({ ...prev, [key]: "" }));
  
      if (key === "registrationNumber" && value.length < 3) {
        setInputError((prev) => ({
          ...prev,
          [key]: t("ERR_DEFAULT_INPUT_FIELD_MSG"),
        }));
        return;
      }
  
      onSelect(config.key, { ...formData[config.key], ...fields, [key]: value });
    };
  
    const handleDropdownChange = (key, selected) => {
      setFields((prev) => ({ ...prev, [key]: selected }));
      onSelect(config.key, { ...formData[config.key], ...fields, [key]: selected });
    };

    const rowStyle = {
      display: "flex",
      gap: "16px",
      marginBottom: "20px",
      flexWrap: "wrap",
    };
    
    const fieldWrapperStyle = {
      display: "flex",
      flexDirection: "column",
      flex: "none",            // disable flex grow/shrink
      width: "450px",          // fixed width for field wrapper
    };
    
    // Label (heading) style - left aligned by default (flex column aligns items start)
    const labelStyle = {
      textAlign: "left",
      marginBottom: "4px",
    };
    
    // Wrapper for the actual input/dropdown to align right
    const inputWrapperStyle = {
      display: "flex",
      justifyContent: "flex-end", // right align input/dropdown
    };
    
    const dropdownStyle = {
      width: "300px",
      marginLeft:'20px',
    };
    const inputStyle = {
      width: "300px",
      marginLeft:'50px',
    };
  
    if (userType !== "employee") return null;
  
    return (
      <div>
        {/* Institute Type dropdown stays the same */}
  
        {/* Row 1: Name | Aadhaar | Owner Name */}
        <div style={rowStyle}>
          <div style={fieldWrapperStyle}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Name") + " *"}</CardLabel>
              <div style={inputWrapperStyle}>
              <TextInput
                value={fields.aadhaar}
                onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={inputStyle}
              />
              </div>
            </LabelFieldPair>
          </div>
  
          <div style={fieldWrapperStyle}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Aadhaar") + " *"}</CardLabel>
              <div style={inputWrapperStyle}>
              <TextInput
                value={fields.aadhaar}
                onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={inputStyle}
              />
              </div>
            </LabelFieldPair>
          </div>
  
          <div style={fieldWrapperStyle}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Institute Name") + " *"}</CardLabel>
              <TextInput
                value={fields.aadhaar}
                onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={inputStyle}
              />
            </LabelFieldPair>
          </div>
        </div>
  
        {/* Row 2: Father | Relationship | Email */}
        <div style={rowStyle}>
          <div style={fieldWrapperStyle}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Father") + " *"}</CardLabel>
              <TextInput
                value={fields.father}
                onChange={(e) => handleInputChange("father", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={inputStyle}
              />
            </LabelFieldPair>
          </div>
  
          <div style={fieldWrapperStyle}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Relationship") + " *"}</CardLabel>
              <Dropdown
                className="form-field"
                selected={fields.relationship}
                disable={isEditProperty}
                option={relationshipOptions}
                select={(e) => handleDropdownChange("relationship", e)}
                optionKey="code"
                t={t}
                style={dropdownStyle}
              />
            </LabelFieldPair>
          </div>
  
          <div style={fieldWrapperStyle}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Email") + " *"}</CardLabel>
              <TextInput
                value={fields.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={inputStyle}
              />
            </LabelFieldPair>
          </div>
        </div>
  
        {/* Row 3: Alternate Number | Mobile Number */}
        <div style={{ ...rowStyle, justifyContent: "flex-start" }}>
          <div style={{ ...fieldWrapperStyle, maxWidth: "300px" }}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={labelStyle}>{t("Alternate Number") + " "}</CardLabel>
              <div style={inputWrapperStyle}>
              <TextInput
                value={fields.altNumber}
                onChange={(e) => handleInputChange("altNumber", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={{width: "300px", marginLeft:'85px'}}
              />
              </div>
            </LabelFieldPair>
          </div>
  
          <div style={{ ...fieldWrapperStyle, maxWidth: "300px" }}>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller" style={{textAlign: "left", marginBottom: "4px", marginLeft:'150px'}}>{t("Mobile Number") + " "}</CardLabel>
              <div style={inputWrapperStyle}>
              <TextInput
                value={fields.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                maxLength={20}
                disable={isEditProperty}
                title={t("ERR_DEFAULT_INPUT_FIELD_MSG")}
                style={{width: "300px", marginLeft:'95px'}}
              />
              </div>
            </LabelFieldPair>
          </div>
        </div>
      </div>
    );
    
  };
  
  export default PTAuthorizedPerson;
  