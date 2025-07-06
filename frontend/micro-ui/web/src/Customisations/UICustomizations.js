import { Link } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew,Toast,Loader } from "@egovernments/digit-ui-components";

//create functions here based on module name set in mdms(eg->SearchProjectConfig)
//how to call these -> Digit?.Customizations?.[masterName]?.[moduleName]
// these functions will act as middlewares
var Digit = window.Digit || {};



const businessServiceMap = {
 
  "muster roll": "MR"
};

const inboxModuleNameMap = {
  "muster-roll-approval": "muster-roll-service",
};

export const UICustomizations = {
  businessServiceMap,
  updatePayload: (applicationDetails, data, action, businessService) => {
    
    if (businessService === businessServiceMap.estimate) {
      const workflow = {
        comment: data.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      return {
        estimate: applicationDetails,
        workflow,
      };
    }
    if (businessService === businessServiceMap.contract) {
      const workflow = {
        comment: data?.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      return {
        contract: applicationDetails,
        workflow,
      };
    }
    if (businessService === businessServiceMap?.["muster roll"]) {
      const workflow = {
        comment: data?.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      return {
        musterRoll: applicationDetails,
        workflow,
      };
    }
    if(businessService === businessServiceMap?.["works.purchase"]){
      const workflow = {
        comment: data.comments,
        documents: data?.documents?.map((document) => {
          return {
            documentType: action?.action + " DOC",
            fileName: document?.[1]?.file?.name,
            fileStoreId: document?.[1]?.fileStoreId?.fileStoreId,
            documentUid: document?.[1]?.fileStoreId?.fileStoreId,
            tenantId: document?.[1]?.fileStoreId?.tenantId,
          };
        }),
        assignees: data?.assignees?.uuid ? [data?.assignees?.uuid] : null,
        action: action.action,
      };
      //filtering out the data
      Object.keys(workflow).forEach((key, index) => {
        if (!workflow[key] || workflow[key]?.length === 0) delete workflow[key];
      });

      const additionalFieldsToSet = {
        projectId:applicationDetails.additionalDetails.projectId,
        invoiceDate:applicationDetails.billDate,
        invoiceNumber:applicationDetails.referenceId.split('_')?.[1],
        contractNumber:applicationDetails.referenceId.split('_')?.[0],
        documents:applicationDetails.additionalDetails.documents
      }
      return {
        bill: {...applicationDetails,...additionalFieldsToSet},
        workflow,
      };
    }
  },
  enableModalSubmit:(businessService,action,setModalSubmit,data)=>{
    if(businessService === businessServiceMap?.["muster roll"] && action.action==="APPROVE"){
      setModalSubmit(data?.acceptTerms)
    }
  },
  enableHrmsSearch: (businessService, action) => {
    if (businessService === businessServiceMap.estimate) {
      return action.action.includes("TECHNICALSANCTION") || action.action.includes("VERIFYANDFORWARD");
    }
    if (businessService === businessServiceMap.contract) {
      return action.action.includes("VERIFY_AND_FORWARD");
    }
     if (businessService === businessServiceMap?.["muster roll"]) {
      return action.action.includes("VERIFY");
    }
    if(businessService === businessServiceMap?.["works.purchase"]){
      return action.action.includes("VERIFY_AND_FORWARD")
    }
    return false;
  },
  getBusinessService: (moduleCode) => {
    if (moduleCode?.includes("estimate")) {
      return businessServiceMap?.estimate;
    } else if (moduleCode?.includes("contract")) {
      return businessServiceMap?.contract;
    } else if (moduleCode?.includes("muster roll")) {
      return businessServiceMap?.["muster roll"];
    }
    else if (moduleCode?.includes("works.purchase")) {
      return businessServiceMap?.["works.purchase"];
    }
    else if (moduleCode?.includes("works.wages")) {
      return businessServiceMap?.["works.wages"];
    }
    else if (moduleCode?.includes("works.supervision")) {
      return businessServiceMap?.["works.supervision"];
    }
    else {
      return businessServiceMap;
    }
  },
  getInboxModuleName: (moduleCode) => {
    if (moduleCode?.includes("estimate")) {
      return inboxModuleNameMap?.estimate;
    } else if (moduleCode?.includes("contract")) {
      return inboxModuleNameMap?.contracts;
    } else if (moduleCode?.includes("attendence")) {
      return inboxModuleNameMap?.attendencemgmt;
    } else {
      return inboxModuleNameMap;
    }
  },

  AttendanceInboxConfig: {
    preProcess: (data) => {
      
      //set tenantId
      data.body.inbox.tenantId = Digit.ULBService.getCurrentTenantId();
      data.body.inbox.processSearchCriteria.tenantId = Digit.ULBService.getCurrentTenantId();

      const musterRollNumber = data?.body?.inbox?.moduleSearchCriteria?.musterRollNumber?.trim();
      if(musterRollNumber) data.body.inbox.moduleSearchCriteria.musterRollNumber = musterRollNumber

      const attendanceRegisterName = data?.body?.inbox?.moduleSearchCriteria?.attendanceRegisterName?.trim();
      if(attendanceRegisterName) data.body.inbox.moduleSearchCriteria.attendanceRegisterName = attendanceRegisterName

      // deleting them for now(assignee-> need clarity from pintu,ward-> static for now,not implemented BE side)
      const assignee = _.clone(data.body.inbox.moduleSearchCriteria.assignee);
      delete data.body.inbox.moduleSearchCriteria.assignee;
      if (assignee?.code === "ASSIGNED_TO_ME") {
        data.body.inbox.moduleSearchCriteria.assignee = Digit.UserService.getUser().info.uuid;
      }

      //cloning locality and workflow states to format them
      // let locality = _.clone(data.body.inbox.moduleSearchCriteria.locality ? data.body.inbox.moduleSearchCriteria.locality : []);
      
      let selectedOrg =  _.clone(data.body.inbox.moduleSearchCriteria.orgId ? data.body.inbox.moduleSearchCriteria.orgId : null);
      delete data.body.inbox.moduleSearchCriteria.orgId;
      if(selectedOrg) {
         data.body.inbox.moduleSearchCriteria.orgId = selectedOrg?.[0]?.applicationNumber;
      }

      // let selectedWard =  _.clone(data.body.inbox.moduleSearchCriteria.ward ? data.body.inbox.moduleSearchCriteria.ward : null);
      // delete data.body.inbox.moduleSearchCriteria.ward;
      // if(selectedWard) {
      //    data.body.inbox.moduleSearchCriteria.ward = selectedWard?.[0]?.code;
      // }

      let states = _.clone(data.body.inbox.moduleSearchCriteria.state ? data.body.inbox.moduleSearchCriteria.state : []);
      let ward = _.clone(data.body.inbox.moduleSearchCriteria.ward ? data.body.inbox.moduleSearchCriteria.ward : []);
      // delete data.body.inbox.moduleSearchCriteria.locality;
      delete data.body.inbox.moduleSearchCriteria.state;
      delete data.body.inbox.moduleSearchCriteria.ward;

      // locality = locality?.map((row) => row?.code);
      states = Object.keys(states)?.filter((key) => states[key]);
      ward = ward?.map((row) => row?.code);
      
      
      // //adding formatted data to these keys
      // if (locality.length > 0) data.body.inbox.moduleSearchCriteria.locality = locality;
      if (states.length > 0) data.body.inbox.moduleSearchCriteria.status = states;  
      if (ward.length > 0) data.body.inbox.moduleSearchCriteria.ward = ward;
      const projectType = _.clone(data.body.inbox.moduleSearchCriteria.projectType ? data.body.inbox.moduleSearchCriteria.projectType : {});
      if (projectType?.code) data.body.inbox.moduleSearchCriteria.projectType = projectType.code;

      //adding tenantId to moduleSearchCriteria
      data.body.inbox.moduleSearchCriteria.tenantId = Digit.ULBService.getCurrentTenantId();

      //setting limit and offset becoz somehow they are not getting set in muster inbox 
      data.body.inbox .limit = data.state.tableForm.limit
      data.body.inbox.offset = data.state.tableForm.offset
      delete data.state
      return data;
    },
    postProcess: (responseArray, uiConfig) => {
      const statusOptions = responseArray?.statusMap
        ?.filter((item) => item.applicationstatus)
        ?.map((item) => ({ code: item.applicationstatus, i18nKey: `COMMON_MASTERS_${item.applicationstatus}` }));
      if (uiConfig?.type === "filter") {
        let fieldConfig = uiConfig?.fields?.filter((item) => item.type === "dropdown" && item.populators.name === "musterRollStatus");
        if (fieldConfig.length) {
          fieldConfig[0].populators.options = statusOptions;
        }
      }
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      if (key === "ATM_MUSTER_ROLL_ID") {
        return (
          <span className="link">
            <Link
              to={`/${window.contextPath}/employee/attendencemgmt/view-attendance?tenantId=${Digit.ULBService.getCurrentTenantId()}&musterRollNumber=${value}`}
            >
              {String(value ? (column.translate ? t(column.prefix ? `${column.prefix}${value}` : value) : value) : t("ES_COMMON_NA"))}
            </Link>
          </span>
        );
      }
      if (key === "ATM_ATTENDANCE_WEEK") {
        const week = `${Digit.DateUtils.ConvertTimestampToDate(value?.startDate, "dd/MM/yyyy")}-${Digit.DateUtils.ConvertTimestampToDate(
          value?.endDate,
          "dd/MM/yyyy"
        )}`;
        return <div>{week}</div>;
      }
      if (key === "ATM_NO_OF_INDIVIDUALS") {
        return <div>{value?.length}</div>;
      }
      if(key === "ATM_AMOUNT_IN_RS"){
        return <span>{value ? Digit.Utils.dss.formatterWithoutRound(value, "number") : t("ES_COMMON_NA")}</span>;
      }
      if (key === "ATM_SLA") {
        return parseInt(value) > 0 ? (
          <span className="sla-cell-success">{t(value) || ""}</span>
        ) : (
          <span className="sla-cell-error">{t(value) || ""}</span>
        );
      }
      if (key === "COMMON_WORKFLOW_STATES") {
        return <span>{t(`WF_MUSTOR_${value}`)}</span>
      }
      //added this in case we change the key and not updated here , it'll throw that nothing was returned from cell error if that case is not handled here. To prevent that error putting this default
      return <span>{t(`CASE_NOT_HANDLED`)}</span>
    },
    MobileDetailsOnClick: (row, tenantId) => {
      let link;
      Object.keys(row).map((key) => {
        if (key === "ATM_MUSTER_ROLL_ID")
          link = `/${window.contextPath}/employee/attendencemgmt/view-attendance?tenantId=${tenantId}&musterRollNumber=${row[key]}`;
      });
      return link;
    },
    populateReqCriteria: () => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      return {
        url: "/org-services/organisation/v1/_search",
        params: { limit: 50, offset: 0 },
        body: {
          SearchCriteria: {
            tenantId: tenantId,
            functions : {
              type : "CBO"
            }
          },
        },
        config: {
          enabled: true,
          select: (data) => {
            return data?.organisations;
          },
        },
      };
    },
  },
  SearchWageSeekerConfig:  {
    customValidationCheck: (data) => {
      //checking both to and from date are present
      const { createdFrom, createdTo } = data;
      if ((createdFrom === "" && createdTo !== "") || (createdFrom !== "" && createdTo === ""))
        return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };

      return false;
    },
    preProcess: (data) => {
      data.params = { ...data.params, tenantId: Digit.ULBService.getCurrentTenantId() };

      let requestBody = { ...data.body.Individual };
      const pathConfig = {
        name: "name.givenName",
      };
      const dateConfig = {
        createdFrom: "daystart",
        createdTo: "dayend",
      };
      const selectConfig = {
        wardCode: "wardCode[0].code",
        socialCategory: "socialCategory.code",
      };
      const textConfig = ["name", "individualId"]
      let Individual = Object.keys(requestBody)
        .map((key) => {
          if (selectConfig[key]) {
            requestBody[key] = _.get(requestBody, selectConfig[key], null);
          } else if (typeof requestBody[key] == "object") {
            requestBody[key] = requestBody[key]?.code;
          } else if (textConfig?.includes(key)) {
            requestBody[key] = requestBody[key]?.trim()
          }
          return key;
        })
        .filter((key) => requestBody[key])
        .reduce((acc, curr) => {
          if (pathConfig[curr]) {
            _.set(acc, pathConfig[curr], requestBody[curr]);
          } else if (dateConfig[curr] && dateConfig[curr]?.includes("day")) {
            _.set(acc, curr, Digit.Utils.date.convertDateToEpoch(requestBody[curr], dateConfig[curr]));
          } else {
            _.set(acc, curr, requestBody[curr]);
          }
          return acc;
        }, {});

      data.body.Individual = { ...Individual };
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      //here we can add multiple conditions
      //like if a cell is link then we return link
      //first we can identify which column it belongs to then we can return relevant result
      switch (key) {
        case "MASTERS_WAGESEEKER_ID":
          return (
            <span className="link">
              <Link to={`/${window.contextPath}/employee/masters/view-wageseeker?tenantId=${row?.tenantId}&individualId=${value}`}>
                 {String(value ? (column.translate ? t(column.prefix ? `${column.prefix}${value}` : value) : value) : t("ES_COMMON_NA"))}
              </Link>
            </span>
          );

        case "MASTERS_SOCIAL_CATEGORY":
          return value ? <span style={{ whiteSpace: "nowrap" }}>{String(t(`MASTERS_${value}`))}</span> : t("ES_COMMON_NA");

        case "CORE_COMMON_PROFILE_CITY":
          return value ? <span style={{ whiteSpace: "nowrap" }}>{String(t(Digit.Utils.locale.getCityLocale(value)))}</span> : t("ES_COMMON_NA");

        case "MASTERS_WARD":
          return value ? (
            <span style={{ whiteSpace: "nowrap" }}>{String(t(Digit.Utils.locale.getMohallaLocale(value, row?.tenantId)))}</span>
          ) : (
            t("ES_COMMON_NA")
          );

        case "MASTERS_LOCALITY":
          return value ? (
            <span style={{ whiteSpace: "break-spaces" }}>{String(t(Digit.Utils.locale.getMohallaLocale(value, row?.tenantId)))}</span>
          ) : (
            t("ES_COMMON_NA")
          );
        default:
          return t("ES_COMMON_NA");
      }
    },
    MobileDetailsOnClick: (row, tenantId) => {
      let link;
      Object.keys(row).map((key) => {
        if (key === "MASTERS_WAGESEEKER_ID")
          link = `/${window.contextPath}/employee/masters/view-wageseeker?tenantId=${tenantId}&wageseekerId=${row[key]}`;
      });
      return link;
    },
    additionalValidations: (type, data, keys) => {
      if (type === "date") {
        return data[keys.start] && data[keys.end] ? () => new Date(data[keys.start]).getTime() <= new Date(data[keys.end]).getTime() : true;
      }
    }
  },
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
              data.params.placeofdeath = hospitalNameString;
          } else {
              delete data.params.hospitalId;
              delete data.params.placeofdeath;
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
        return {type: "warning",warning: true, label:"DATE_VALIDATION_MSG"};
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
     searchBirthConfig: {
    preProcess: (data) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const gender = data?.state?.searchForm?.gender?.code;
      if (gender === "MALE") {
        data.params.gender = 1;
      } else if (gender === "FEMALE") {
        data.params.gender = 2;
      } else if (gender === "TRANSGENDER") {
        data.params.gender = 3;
      } else if (gender === "OTHER") {
        data.params.gender = 4;
      } else {
        data.params.gender = 0;
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
      data.params.tenantId = tenantId;

      // console.log(data, "data in preProcess of search Birth Ui config");
      if (data?.params?.fromDate || data?.params?.toDate) {
        const createdFrom = data.params?.fromDate;
        const createdTo = data.params?.toDate;
        data.params.fromDate = createdFrom;
        data.params.toDate = createdTo;
      }
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      // console.log("key", key);
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const ViewBirthLinkButton = Digit.ComponentRegistryService.getComponent("ViewBirthLinkButton");
      console.log(ViewBirthLinkButton, "*******");

      // console.log("value", value);
      // console.log("column", column);
      // console.log("t", t);
      // console.log("searchResult", searchResult);

      switch (key) {
        case "view":
          return <ViewBirthLinkButton tenantId={tenantId} certificateId={row?.id} />;

        case "BND_BIRTH_DATE":
          const epoch = row?.dateofbirth;
          console.log(epoch, "changing the format of date");
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0");
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
      //checking both to and from date are present
      const { fromDate, toDate } = data;
      if ((fromDate === "" && toDate !== "") || (fromDate !== "" && toDate === "")) return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };

      return false;
    },
  },
  searchAndDownloadBirthConfig: {
    // preProcess function to transform form data into API query parameters
    preProcess: (data) => {
      // console.log("BIRTH: UICustomization preProcess START - received data:", JSON.stringify(data, null, 2));

      const formValues = data.state.searchForm || {};
      // console.log("BIRTH: Form Values (data.state.searchForm):", JSON.stringify(formValues, null, 2));

      // 1. Tenant ID
      const tenantFromForm = formValues.tenantId;
      if (tenantFromForm && tenantFromForm.code) {
        data.params.tenantId = tenantFromForm.code;
      } else if (typeof tenantFromForm === "string" && tenantFromForm) {
        data.params.tenantId = tenantFromForm;
      } else {
        console.warn("PreProcess: tenantId issue. Value:", tenantFromForm);
      }

      // 2. Gender
      const gender = formValues.gender?.code;
      if (gender) {
        if (gender === "MALE") data.params.gender = 1;
        else if (gender === "FEMALE") data.params.gender = 2;
        else if (gender === "TRANSGENDER") data.params.gender = 3;
        else  if (gender === "OTHER") data.params.gender = 4;
        else data.params.gender = 0;
      }

      // 3. Date of Birth
      const dateOfBirth = formValues.dateOfBirth;
      if (dateOfBirth) {
        try {
          const [yyyy, mm, dd] = dateOfBirth.split("-");
          data.params.dateOfBirth = `${dd}-${mm}-${yyyy}`;
        } catch (e) {
          console.error("Error parsing dateOfBirth:", dateOfBirth, e);
        }
      }

      // 4. Registration Number
      const registrationNo = formValues.registrationno;
      if (registrationNo && String(registrationNo).trim() !== "") {
        data.params.registrationNo = String(registrationNo).trim();
      }

      // 5. Hospital ID
      const placeOfBirthRawValue = formValues.placeofbirth; // <-- CHANGED
      // console.log("Raw value of formValues.placeofbirth:", JSON.stringify(placeOfBirthRawValue));

      let placeOfBirthCode = null;
      if (typeof placeOfBirthRawValue === "string" && placeOfBirthRawValue.trim() !== "") {
        placeOfBirthCode = placeOfBirthRawValue.trim();
      } else if (typeof placeOfBirthRawValue === "object" && placeOfBirthRawValue !== null && placeOfBirthRawValue.code) {
        placeOfBirthCode = String(placeOfBirthRawValue.code).trim();
      } else {
        // console.log("placeofbirth is not a usable string or object with a code property.");
      }

      if (placeOfBirthCode) {
        data.params.hospitalId = placeOfBirthCode;
        // console.log(`PreProcess: Hospital ID set to: ${finalApiParams.hospitalId}`);
      } else {
        delete data.params.hospitalId;
      }

      return data;
    },

    // additionalCustomizations for rendering columns in the results table
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const DownloadButton = Digit.ComponentRegistryService.getComponent("DownloadBirthButton");
      const PayAndDownloadButton = Digit.ComponentRegistryService.getComponent("PayAndDownloadBirthButton");
      const colKey = column.key;
      const tenantId = searchResult?.[0]?.tenantid;
      const counter = row?.counter;

      switch (colKey) {
        case "action":
          if (counter === 0) {
            return <DownloadButton tenantId={tenantId} certificateId={row?.id} />;
          } else if (counter >= 1) {
            return <PayAndDownloadButton tenantId={tenantId} certificateId={row?.id} />;
          }

          return <span>{t("ES_COMMON_NA")}</span>;

        case "dateOfBirth":
          const epoch = row?.dateofbirth;
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
            const yyyy = date.getFullYear();
            return <span>{`${dd}-${mm}-${yyyy}`}</span>;
          }
          return <span>{t("ES_COMMON_NA")}</span>;

        default:
          return <span>{t("ES_COMMON_NA")}</span>;
      }
    },
  },
  }
};