import React from "react";
import {
  Card,
  HeaderComponent,
  LabelFieldPair,
  TextInput
} from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";

const Address = () => {
  const { t } = useTranslation();

  const addressFields = [
    { name: "buildingNumber", label: "Building Number", required: true, type: "number" },
    { name: "houseNo", label: "House No", required: true, type: "number" },
    { name: "streetName", label: "Street Name", required: true },
    { name: "locality", label: "Locality", required: true },
    { name: "tehsil", label: "Tehsil", required: true },
    { name: "district", label: "District", required: true },
    { name: "city", label: "City", required: true },
    { name: "state", label: "State", required: true },
    { name: "country", label: "Country", required: true },
    { name: "pincode", label: "Pincode", required: true, type: "number" },
  ];

  return (
    <Card style={{ padding: "1rem" }}>
   
      {addressFields.map((field) => (
        <LabelFieldPair key={field.name} style={{ marginBottom: "1rem" }}>
          <label className="label">{t(field.label)}</label>
          <TextInput
            type={field.type || "text"}
            name={field.name}
            isMandatory={field.required}
            placeholder={t(field.label)}
          />
        </LabelFieldPair>
      ))}
    </Card>
  );
};

export default Address;
