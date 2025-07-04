import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew,Toast,Loader } from "@egovernments/digit-ui-components";

//create functions here based on module name set in mdms(eg->SearchProjectConfig)
//how to call these -> Digit?.Customizations?.[masterName]?.[moduleName]
// these functions will act as middlewares
// var Digit = window.Digit || {};

const businessServiceMap = {};

const inboxModuleNameMap = {};

var Digit = window.Digit || {};




const GetSlaCell = (value) => {
  if (value === "-") return <span className="sla-cell-success">-</span>;
  if (isNaN(value)) return <span className="sla-cell-success">0</span>;
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
};



export const UICustomizations = {
 searchDeathConfig: {
    preProcess: (data) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const gender = data?.state?.searchForm?.gender?.code;
      if (gender === "MALE") {
        data.params.gender = 1;
      } else if (gender === "FEMALE") {
        data.params.gender = 2;
      }else if (gender === "TRANSGENDER") {
      data.params.gender = 3;
    } else if (gender === "OTHER") {
      data.params.gender=4;
    }
    else{
        delete data.params.gender;
    }
      const fromDate = data?.state?.searchForm?.fromDate;
      if (fromDate) {
        const [yyyy, mm, dd] = fromDate.split("-");
        data.params.fromDate = `${dd}-${mm}-${yyyy}`;
      }
      const toDate = data?.state?.searchForm?.toDate;
      if (toDate) {
        const [yyyy, mm, dd] = toDate.split("-");
        data.params.toDate = `${dd}-${mm}-${yyyy}`;
      }

      // const registrationNo = data?.state?.searchForm?.registrationno;
      // if (registrationNo && registrationNo.trim() !== "") {
      //   data.params.registrationNo = registrationNo.trim();
      // } else {
      //   delete data.params.registrationNo; 
      // }
      
      const hospitalSelection = data?.state?.searchForm?.placeofdeath;

      if (hospitalSelection) {
          let hospitalNameString = "";

          if (typeof hospitalSelection === 'string') {
              hospitalNameString = hospitalSelection.trim();
          } else if (hospitalSelection.code && typeof hospitalSelection.code === 'string') {
              hospitalNameString = hospitalSelection.code.trim();
          }

          if (hospitalNameString !== "") {
              data.params.hospitalId = hospitalNameString;
              data.params.placeofdeath = hospitalNameString; // Assuming you want to keep placeOfDeath as well
          } else {
              delete data.params.hospitalId;
              delete data.params.placeofdeath; // Remove placeOfDeath if hospitalId is not provided
          }
      } else {
          delete data.params.hospitalId;
      }


      // Add motherName if provided
      const motherName = data?.state?.searchForm?.motherName;
      if (motherName && motherName.trim() !== "") {
        data.params.motherName = motherName.trim();
      } else {
        delete data.params.motherName;
      }

      // Add fatherName if provided
      const fatherName = data?.state?.searchForm?.fatherName;
      if (fatherName && fatherName.trim() !== "") {
        data.params.fatherName = fatherName.trim();
      } else {
        delete data.params.fatherName;
      }

      // Add spouseName if provided
      const spouseName = data?.state?.searchForm?.spouseName;
      if (spouseName && spouseName.trim() !== "") {
        data.params.spouseName = spouseName.trim();
      } else {
        delete data.params.spouseName;
      }

      // Add name if provided
      const name = data?.state?.searchForm?.name;
      if (name && name.trim() !== "") {
        data.params.name = name.trim();
      } else {
        delete data.params.name;
      }

      data.params.tenantId = tenantId;
      if (data?.params?.fromDate || data?.params?.toDate) {
        const createdFrom =data.params?.fromDate;
        const createdTo = data.params?.toDate;
        data.params.fromDate = createdFrom;
        data.params.toDate = createdTo;
      }
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const ViewLinkButton = Digit.ComponentRegistryService.getComponent("ViewLinkButton");
      const tenantId = Digit.ULBService.getCurrentTenantId();
      switch (key) {
        case "View":
          return <ViewLinkButton tenantId={tenantId} certificateId={row?.id} hospitalname={row?.hospitalname} />;
        case "Death Date":
          const epoch = row?.dateofdeath;
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return <span>{`${dd}-${mm}-${yyyy}`}</span>;
          }
          return <span>{t("ES_COMMON_NA")}</span>; 
        default:
          return t("ES_COMMON_NA");
      }
    },
    additionalValidations: (type, data, keys) => {
      if (type === "date") {
        return data.fromDate && data.toDate ? () => new Date(data.fromDate).getTime() < new Date(data.toDate).getTime() : true;
      }
    },
    customValidationCheck: (data) => {
    const { fromDate, toDate } = data;

    

        if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
          return  {type: "warning",warning: true, label:"DATE_VALIDATION_MSG" };
        }
        return false;
    },
   
 },


 searchAndDownloadConfig: {
     preProcess: (data) => {

    let finalApiParams = {};
    const formValues = data.state.searchForm || {};


    // 1. Tenant ID
    const tenantFromForm = formValues.tenantId;
    if (tenantFromForm && tenantFromForm.code) {
      finalApiParams.tenantId = tenantFromForm.code;
    } else if (typeof tenantFromForm === 'string' && tenantFromForm) {
      finalApiParams.tenantId = tenantFromForm;
    } else {
      console.warn("PreProcess: tenantId issue. Value:", tenantFromForm);
    }
   
    // 2. Gender
    const gender = formValues.gender?.code;
    if (gender) {
      if (gender === "MALE") finalApiParams.gender = 1;
      else if (gender === "FEMALE") finalApiParams.gender = 2;
      else if (gender === "TRANSGENDER") finalApiParams.gender = 3;
    }
   


    // 3. Date of Death
    const dateOfDeath = formValues.dateOfDeath;
    if (dateOfDeath) {
      try {
        const [yyyy, mm, dd] = dateOfDeath.split("-");
        finalApiParams.dateOfDeath = `${dd}-${mm}-${yyyy}`;
      } catch (e) {
        console.error("Error parsing dateOfDeath:", dateOfDeath, e);
      }
    }
    

    // 4. Registration Number
    const registrationNo = formValues.registrationno;
    if (registrationNo && String(registrationNo).trim() !== "") {
      finalApiParams.registrationNo = String(registrationNo).trim();
    }
    


    // 5. Hospital ID (from placeofdeath field) - DETAILED LOGGING
    const placeOfDeathRawValue = formValues.placeofdeath;

    let placeOfDeathCode = null;
    if (typeof placeOfDeathRawValue === 'string' && placeOfDeathRawValue.trim() !== "") {
      placeOfDeathCode = placeOfDeathRawValue.trim();
    } else if (typeof placeOfDeathRawValue === 'object' && placeOfDeathRawValue !== null && placeOfDeathRawValue.code) {
      placeOfDeathCode = String(placeOfDeathRawValue.code).trim();
    } else {
      console.log("placeofdeath is not a usable string or object with a code property.");
    }


    if (placeOfDeathCode) {
      finalApiParams.hospitalId = placeOfDeathCode; 
    } else {
      delete finalApiParams.hospitalId;
    }


    // 6. Mother's Name
    const motherName = formValues.MotherName;
    if (motherName && motherName.trim() !== "") {
      finalApiParams.motherName = motherName.trim();
    }

    // 7. Father's Name
    const fatherName = formValues.FatherName;
    if (fatherName && fatherName.trim() !== "") {
      finalApiParams.fatherName = fatherName.trim();
    }


    // 8. Spouse's Name
    const spouseName = formValues.spouseName;
    if (spouseName && spouseName.trim() !== "") {
      finalApiParams.spouseName = spouseName.trim();
    }
    

    // 9. Name of Deceased
    const nameOfDeceased = formValues.nameofdeceased;
    if (nameOfDeceased && nameOfDeceased.trim() !== "") {
      finalApiParams.name = nameOfDeceased.trim();
    }
   


    data.params = finalApiParams;
    return data;
  },

     additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const DownloadButton = Digit.ComponentRegistryService.getComponent("DownloadButton");
      const PayAndDownloadButton = Digit.ComponentRegistryService.getComponent("PayAndDownloadButton");
      const tenantId = searchResult?.[0]?.tenantid;
      const counter = row?.counter;

      

      switch (key) {
        case "Action": 
          if (counter === 0) {
            return <DownloadButton tenantId={tenantId} certificateId={row?.id}  />;
          } else if (counter >= 1) { 
            return <PayAndDownloadButton tenantId={tenantId} certificateId={row?.id}  />;
          }
          return <span>{t("ES_COMMON_NA")}</span>;
        case "Death Date":
          const epoch = row?.dateofdeath;
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return <span>{`${dd}-${mm}-${yyyy}`}</span>;
          }
          return <span>{t("ES_COMMON_NA")}</span>; 
        default:
          return t("ES_COMMON_NA");
      }
    },
  },

};


