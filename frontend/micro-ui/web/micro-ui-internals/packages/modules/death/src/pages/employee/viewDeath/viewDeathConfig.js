import { EditIcon } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const viewDeathConfig = (deathCertArray, applicationNumber, tenantId, t) => {

   const DeathData = deathCertArray?.[0]; 
  if (!DeathData) return { cards: [], apiResponse: {}, additionalDetails: {} };

  const getValue = (value) => {
  return value !== null && value !== undefined && value !== "" ? value : "-";
  };

  const config = {
    cards: [
      {
        sections: [
          {
            type: "DATA",
            cardHeader: { value: t("BND_REGISTRATION"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_REG_NO_LABEL"), value: getValue(DeathData.registrationno) },
              { key: t("BND_HOSPITALNAME_LABEL"), value: getValue(DeathData.hospitalname) },
              { key: t("BND_DEATH_DOR"), value:DeathData.dateofreport
                  ? new Date(DeathData.dateofreport).toLocaleDateString('en-GB') 
                  : "NA" },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_INFO_OF_DECEASED"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_DEATH_DATE"), value: DeathData.dateofdeath
                ? new Date(DeathData.dateofdeath).toLocaleDateString('en-GB')
                : "NA" },
              { key:t("BND_COMMON_GENDER"), value: getValue(DeathData.genderStr) },
              { key: t("BND_FIRSTNAME_LABEL"), value: getValue(DeathData.firstname) },
              { key: t("BND_MIDDLENAME_LABEL"), value: getValue(DeathData.middlename) },
              { key: t("BND_LASTNAME_LABEL"), value: getValue(DeathData.lastname) },
              { key: t("BND_EIDNO"), value: getValue(DeathData.eidno) },
              { key: t("BND_AADHAR_NO"), value: getValue(DeathData.aadharno) },
              { key: t("BND_NATIONALITY"), value: getValue(DeathData.nationality) },
              { key: t("BND_RELIGION"), value: getValue(DeathData.religion) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_DEATH_PLACE"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_DEATH_PLACE"), value: getValue(DeathData.placeofdeath) },
              { key: t("BND_ICDCODE"), value: getValue(DeathData.icdcode) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_SPOUSES_INFO"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_FIRSTNAME_LABEL"), value: getValue(DeathData.deathSpouseInfo?.firstname) },
              { key: t("BND_MIDDLENAME_LABEL"), value: getValue(DeathData.deathSpouseInfo?.middlename) },
              { key: t("BND_LASTNAME_LABEL"), value: getValue(DeathData.deathSpouseInfo?.lastname) },
              { key: t("BND_AADHAR_NO"), value: getValue(DeathData.deathSpouseInfo?.aadharno) },
              { key: t("BND_EMAIL_ID"), value: getValue(DeathData.deathSpouseInfo?.emailid) },
              { key: t("CORE_COMMON_PROFILE_MOBILE_NUMBER"), value: getValue(DeathData.deathSpouseInfo?.mobileno) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_FATHERS_INFO"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_FIRSTNAME_LABEL"), value: getValue(DeathData.deathFatherInfo?.firstname) },
              { key: t("BND_MIDDLENAME_LABEL"), value: getValue(DeathData.deathFatherInfo?.middlename) },
              { key: t("BND_LASTNAME_LABEL"), value: getValue(DeathData.deathFatherInfo?.lastname) },
              { key: t("BND_AADHAR_NO"), value: getValue(DeathData.deathFatherInfo?.aadharno) },
              { key:  t("BND_EMAIL_ID"), value: getValue(DeathData.deathFatherInfo?.emailid) },
              { key: t("CORE_COMMON_PROFILE_MOBILE_NUMBER"), value: getValue(DeathData.deathFatherInfo?.mobileno) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_MOTHERS_INFO"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_FIRSTNAME_LABEL"), value: getValue(DeathData.deathMotherInfo?.firstname) },
              { key: t("BND_MIDDLENAME_LABEL"), value: getValue(DeathData.deathMotherInfo?.middlename) },
              { key: t("BND_LASTNAME_LABEL"), value: getValue(DeathData.deathMotherInfo?.lastname) },
              { key: t("BND_AADHAR_NO"), value: getValue(DeathData.deathMotherInfo?.aadharno) },
              { key: t("BND_EMAIL_ID"), value: getValue(DeathData.deathMotherInfo?.emailid) },
              { key: t("CORE_COMMON_PROFILE_MOBILE_NUMBER"), value: getValue(DeathData.deathMotherInfo?.mobileno) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_PRESENT_ADDR_DURING_DEATH"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_BUILDINGNO_LABEL"), value: getValue(DeathData.deathPresentaddr?.buildingno) },
              { key: t("BND_HOUSENO_LABEL"), value: getValue(DeathData.deathPresentaddr?.houseno) },
              { key: t("BND_STREETNAME_LABEL"), value: getValue(DeathData.deathPresentaddr?.streetname) },
              { key: t("BND_LOCALITY_LABEL"), value: getValue(DeathData.deathPresentaddr?.locality) },
              { key: t("BND_TEHSIL_LABEL"), value: getValue(DeathData.deathPresentaddr?.tehsil) },
              { key: t("BND_DISTRICT_LABEL"), value: getValue(DeathData.deathPresentaddr?.district) },
              { key: t("BND_APPL_CANT"), value: getValue(DeathData.deathPresentaddr?.city) },
              { key: t("BND_STATE_LABEL"), value: getValue(DeathData.deathPresentaddr?.state) },
              { key: t("BND_PINNO_LABEL"), value: getValue(DeathData.deathPresentaddr?.pinno) },
              { key: t("BND_COUNTRY_LABEL"), value: getValue(DeathData.deathPresentaddr?.country) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_DEATH_ADDR_PERM"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_BUILDINGNO_LABEL"), value: getValue(DeathData.deathPermaddr?.buildingno) },
              { key: t("BND_HOUSENO_LABEL"), value: getValue(DeathData.deathPermaddr?.houseno) },
              { key: t("BND_STREETNAME_LABEL"), value: getValue(DeathData.deathPermaddr?.streetname) },
              { key: t("BND_LOCALITY_LABEL"), value: getValue(DeathData.deathPermaddr?.locality) },
              { key: t("BND_TEHSIL_LABEL"), value: getValue(DeathData.deathPermaddr?.tehsil) },
              { key: t("BND_DISTRICT_LABEL"), value: getValue(DeathData.deathPermaddr?.district) },
              { key: t("BND_APPL_CANT"), value: getValue(DeathData.deathPermaddr?.city) },
              { key: t("BND_STATE_LABEL"), value: getValue(DeathData.deathPermaddr?.state) },
              { key: t("BND_PINNO_LABEL"), value: getValue(DeathData.deathPermaddr?.pinno) },
              { key: t("BND_COUNTRY_LABEL"), value: getValue(DeathData.deathPermaddr?.country) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_INFORMANTS_INFO"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("Name"), value: getValue(DeathData.informantsname) },
              { key: t("BND_ADDRESS"), value: getValue(DeathData.informantsaddress) }
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_REMARKS_LABEL"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_REMARKS_LABEL"), value: getValue(DeathData.remarks) },
            ],
          },
        ],
      },
    ],
    apiResponse: DeathData,
    additionalDetails: {},
  };

  return config;
};

export default viewDeathConfig;
