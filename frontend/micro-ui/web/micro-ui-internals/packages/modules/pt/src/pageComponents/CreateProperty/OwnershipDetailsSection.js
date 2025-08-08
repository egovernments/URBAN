import React, { useState, useEffect } from "react";
import {
  CardLabel,
  CardLabelError,
  LabelFieldPair,
  Dropdown,
  TextInput,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";

const OwnershipDetailsSection = ({ t, config, onSelect, formData = {}, userType }) => {
  const [ownershipType, setOwnershipType] = useState(formData?.ownershipType || null);
  const [owners, setOwners] = useState(
    formData?.owners || [
      {
        name: "",
        title: "",
        aadhaar: "",
        hindiName: "",
        hindiTitle: "",
        fatherHusbandName: "",
        relationship: "",
        email: "",
        altNumber: "",
        mobile: "",
      },
    ]
  );

  const [error, setError] = useState("");

  const ownershipOptions = [
    { code: "SINGLE", name: t("Single") },
    { code: "JOINT", name: t("Joint owner") },
    { code: "INSTITUTIONAL", name: t("Institutional owner") },
  ];

  const titleOptions = [
    { code: "MR", name: t("Mr") },
    { code: "MRS", name: t("Mrs") },
    { code: "MISS", name: t("Miss") },
  ];

  const labelStyle = {
    textAlign: "left",
    marginBottom: "0px",
    display: "content",
    lineHeight: "inherit",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    color: "#282828",
    width:"200px"
  };

  const errorStyle = {
    width: "70%",
    marginLeft: "30%",
    fontSize: "12px",
    marginTop: "-21px",
    color: "#d4351c",
  };

  const inputStyle = {
    // width: "303px",
  };

  const handleOwnershipChange = (selected) => {
    setOwnershipType(selected);
    const initialOwners = selected?.code === "JOINT" ? [{ name: "", title: "", aadhaar: "" }, { name: "", title: "", aadhaar: "" }] : [{ name: "", title: "", aadhaar: "" }];
    setOwners(initialOwners);
    onSelect(config.key, { ownershipType: selected, owners: initialOwners });
  };

  const handleOwnerChange = (index, field, value) => {
    const updatedOwners = [...owners];
    updatedOwners[index][field] = value;
    setOwners(updatedOwners);
    onSelect(config.key, { ownershipType, owners: updatedOwners });
  };

  const addNewOwner = () => {
    const updatedOwners = [...owners, { name: "", title: "", aadhaar: "" }];
    setOwners(updatedOwners);
    onSelect(config.key, { ownershipType, owners: updatedOwners });
  };

  const renderOwnerForm = (index) => (
   <div
  key={index}
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "32px",
    marginTop: "16px",
  }}
>
  {/* Column 1 */}
  <div style={{ display: "flex",justifyContent:"space-between",width:"100%" }}>
    {/* Owner Name */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>
        {t("Owner Name")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
      </CardLabel>
      <div style={{ display: "flex" }}>
        <Dropdown
          t={t}
          option={titleOptions}
          selected={{ name: owners[index].title }}
          select={(e) => handleOwnerChange(index, "title", e.name)}
          optionKey="name"
          placeholder={t("Mr")}
          style={{ width: "100px" }}
        />
        <TextInput
          style={inputStyle}
          value={owners[index].name}
          onChange={(e) => handleOwnerChange(index, "name", e.target.value)}
          placeholder={t("Prefilled")}
        />
      </div>
    </LabelFieldPair>

    {/* Relationship */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>{t("Relationship")}</CardLabel>
      <Dropdown
        t={t}
        option={[
          { code: "FATHER", name: t("Father") },
          { code: "HUSBAND", name: t("Husband") },
          { code: "GUARDIAN", name: t("Guardian") },
        ]}
        selected={{ name: owners[index].relationship }}
        select={(e) => handleOwnerChange(index, "relationship", e.name)}
        optionKey="name"
        placeholder={t("Prefilled")}
        style={inputStyle}
      />
    </LabelFieldPair>

    {/* Alternative Mobile No */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>{t("Alternative Mobile No")}</CardLabel>
      <TextInput
        style={inputStyle}
        value={owners[index].altNumber}
        onChange={(e) => handleOwnerChange(index, "altNumber", e.target.value)}
        placeholder={t("Prefilled")}
      />
    </LabelFieldPair>
  </div>

  {/* Column 2 */}
  <div style={{ display: "flex", justifyContent:"space-between",width:"100%"}}>
    {/* Owner Name (Hindi) */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>
        {t("Owner Name (हिंदी में)")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
      </CardLabel>
      <div style={{ display: "flex" }}>
        <Dropdown
          t={t}
          option={titleOptions}
          selected={{ name: owners[index].hindiTitle }}
          select={(e) => handleOwnerChange(index, "hindiTitle", e.name)}
          optionKey="name"
          placeholder={t("Mr")}
          style={{ width: "100px" }}
        />
        <TextInput
          style={inputStyle}
          value={owners[index].hindiName}
          onChange={(e) => handleOwnerChange(index, "hindiName", e.target.value)}
          placeholder={t("Prefilled")}
        />
      </div>
    </LabelFieldPair>

    {/* Email */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>{t("Email ID")}</CardLabel>
      <TextInput
        style={inputStyle}
        value={owners[index].email}
        onChange={(e) => handleOwnerChange(index, "email", e.target.value)}
        placeholder={t("Prefilled")}
      />
    </LabelFieldPair>

    {/* Aadhaar ID */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>
        {t("Aadhaar ID")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
      </CardLabel>
      <TextInput
        style={inputStyle}
        value={owners[index].aadhaar}
        onChange={(e) => handleOwnerChange(index, "aadhaar", e.target.value)}
        placeholder={t("Prefilled")}
      />
    </LabelFieldPair>
  </div>

  {/* Column 3 */}
  <div style={{ display: "flex",justifyContent:"space-between",width:"100%" }}>
    {/* Father/Husband Name */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>
        {t("Father/Husband name")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
      </CardLabel>
      <TextInput
        style={inputStyle}
        value={owners[index].fatherHusbandName}
        onChange={(e) => handleOwnerChange(index, "fatherHusbandName", e.target.value)}
        placeholder={t("Prefilled")}
      />
    </LabelFieldPair>

    {/* Mobile No */}
    <LabelFieldPair style={{ display: "block",width:"303px"}}>
      <CardLabel style={labelStyle}>
        {t("Mobile No")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
      </CardLabel>
      <TextInput
        style={inputStyle}
        value={owners[index].mobile}
        onChange={(e) => handleOwnerChange(index, "mobile", e.target.value)}
        placeholder={t("Prefilled")}
      />
    </LabelFieldPair>

    {/* Samagra ID */}
    <LabelFieldPair style={{ display: "block",width:"303px" }}>
      <CardLabel style={labelStyle}>
        {t("Samagra ID")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
      </CardLabel>
      <TextInput
        style={inputStyle}
        value={owners[index].samagraId || ""}
        onChange={(e) => handleOwnerChange(index, "samagraId", e.target.value)}
        placeholder={t("Prefilled")}
      />
    </LabelFieldPair>
  </div>
</div>

  );


  if (userType !== "employee") return null;

  return (
    <div>
      <LabelFieldPair style={{ alignItems: "center", display: "block",width:"303px" }}>
        <CardLabel className="card-label-smaller" style={labelStyle}>
          {t("Provide Ownership details")} <span className="mandatory" style={{ color: "#d4351c" }}>*</span>
        </CardLabel>
        <div className="field" style={{ width: "303px" }}>
          <Dropdown
            option={ownershipOptions}
            selected={ownershipType}
            select={handleOwnershipChange}
            optionKey="name"
            placeholder={t("Select")}
            style={inputStyle}
          />
        </div>
      </LabelFieldPair>

      {owners.map((_, index) => renderOwnerForm(index))}

      {ownershipType?.code === "JOINT" && (
        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <SubmitBar label={t("Add New Owner")} onSubmit={addNewOwner} />
        </div>
      )}

      {error ? <CardLabelError style={errorStyle}>{error}</CardLabelError> : null}
    </div>
  );
};

export default OwnershipDetailsSection;
