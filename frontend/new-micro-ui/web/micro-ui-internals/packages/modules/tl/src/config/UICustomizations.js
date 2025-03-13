import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import React from "react";
import { stringReplaceAll } from "../utils";

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
  TLInboxConfig: {
    preProcess: (data) => {
      //fetch everything from data.state instead of data.body
      // application no, mobile no are getting auto populated correctly
      
      //set tenantId
      const tenantId = Digit.ULBService.getCurrentTenantId();
      data.body.inbox.tenantId = tenantId;

      // assignee filter
      const assignee = _.clone(data.body.inbox.moduleSearchCriteria.assignee);
      delete data.body.inbox.moduleSearchCriteria.assignee;
      if (assignee?.code === "ASSIGNED_TO_ME") {
        data.body.inbox.moduleSearchCriteria.assignee = JSON.parse(localStorage.getItem("user-info")).uuid;
      } else {
        delete data.body.inbox.moduleSearchCriteria.assignedToMe;
      }
      
      // cloning locality and workflow states to format them
      const {locality:localityFromState, state:stateFromState} = data?.state?.filterForm || {}
      let locality = _.clone(localityFromState?.length>0 ? localityFromState : []);
      let states = _.clone(stateFromState ? stateFromState : []);
      delete data.body.inbox.moduleSearchCriteria.state;

      states = Object.keys(states)
        ?.filter((key) => states[key])
        .flatMap((i) => i.split(", "));
      locality = locality?.map((row) => row?.code);
      states.length > 0 ? (data.body.inbox.moduleSearchCriteria.status = states) : delete data.body.inbox.moduleSearchCriteria.status;
      locality.length > 0 ? (data.body.inbox.moduleSearchCriteria.locality = locality) : delete data.body.inbox.moduleSearchCriteria.locality;

      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      switch (key) {
        case "WF_INBOX_HEADER_APPLICATION_NO":
          return (
            <span className="link">
              <Link to={`/${window.contextPath}/employee/tl/application-details/${row?.businessObject?.applicationNumber}`}>{value}</Link>
            </span>
          );
        case "TL_COMMON_TABLE_COL_APP_DATE":
          value = new Date(value);
          return <span>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</span>;
        case "TL_COMMON_TABLE_COL_APP_TYPE":
          return <span>{value ? t(`CS_COMMON_INBOX_${value}`) : t("CS_COMMON_NA")}</span>;
        case "WF_INBOX_HEADER_LOCALITY":
          return value ? <span>{t(Digit.Utils.locale.getRevenueLocalityCode(value, tenantId))}</span> : <span>{t("NA")}</span>;
        case "WF_INBOX_HEADER_STATUS":
          return <span>{row?.ProcessInstance?.state?.state ? t(`CS_COMMON_INBOX_${row?.ProcessInstance?.businessService.toUpperCase()}_STATE_${row?.ProcessInstance?.state?.state}`) : t("CS_COMMON_NA")}</span>;
        case "WF_INBOX_HEADER_SLA_DAYS_REMAINING":
          return GetSlaCell(value);
        default:
          return t("ES_COMMON_NA");
      }
    },
    localitydropdown: () => {
      const tenantId = Digit.ULBService.getCurrentTenantId();

      return {
        url: "/egov-location/location/v11/boundarys/_search",
        params: { hierarchyTypeCode: "ADMIN", boundaryType: "Locality", tenantId: tenantId },
        body: {},
        config: {
          enabled: true,
          select: (data) => {
            const localities = [];
            data?.TenantBoundary[0]?.boundary.forEach((item) => {
              localities.push({ code: item.code, name: item.name, i18nKey: `${tenantId.replace(".", "_").toUpperCase()}_REVENUE_${item?.code}` });
            });
            return localities;
          },
        },
      };
    },
  },
  TLSearchApplicationConfig: {
    preProcess: (data) => {
      //set tenantId
      const tenantId = Digit.ULBService.getCurrentTenantId();
      data.params.tenantId = tenantId;
      data.params.applicationStatus = data.params.applicationStatus?.[0].name;
      if (data?.params?.fromDate || data?.params?.toDate) {
        const createdFrom = Digit.Utils.pt.convertDateToEpoch(data.params?.fromDate);
        const createdTo = Digit.Utils.pt.convertDateToEpoch(data.params?.toDate);
        data.params.fromDate = createdFrom;
        data.params.toDate = createdTo;
      }
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();

      switch (key) {
        case "TL_COMMON_TABLE_COL_APP_NO":
          return (
            <span className="link">
              <Link to={`/${window.contextPath}/employee/tl/application-details/${value}`}>{value}</Link>
            </span>
          );
        case "TL_COMMON_TABLE_COL_APP_DATE":
          value = new Date(value);
          return <span>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</span>;
        case "TL_APPLICATION_TYPE_LABEL":
          return <span>{t(`TL_LOCALIZATION_APPLICATIONTYPE_${value}`)}</span>
        case "TL_LICENSE_YEAR_LABEL":
          return <span>{row.financialYear}</span>
        case "TL_LOCALIZATION_TRADE_OWNER_NAME":
          return <span>{value?.map( o => o.name ). join(",") || t("CS_COMMON_NA")}</span>
        case "WF_INBOX_HEADER_CURRENT_OWNER":
          return <span>{ value?.[0]?.currentOwner || t("CS_COMMON_NA")}</span>
        case "TL_COMMON_TABLE_COL_STATUS":
          return <span>{t(`WF_${row.workflowCode}_${value}`)}</span>;
        default:
          return t("ES_COMMON_NA");
      }
    },
    getApplicationType: (props) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      return {
        url: "/egov-mdms-service/v1/_search",
        params: { tenantId: tenantId },
        body: {
          "MdmsCriteria": {
            "tenantId": tenantId,
            "moduleDetails": [
              {
                "moduleName": "TradeLicense",
                "masterDetails": [
                  {
                    "name": "ApplicationType"
                  }
                ]
              }
            ]
          }
        },
        config: {
          enabled: true,
          select: (data) => 
            data.MdmsRes.TradeLicense.ApplicationType?.map((type) => ({
              code: type.code.split(".")[1],
              i18nKey: `TL_APPLICATIONTYPE.${type.code.split(".")[1]}`,
            })),
        },
      };
    },
    getApplicationStatus: () => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      return {
        url: "/egov-workflow-v2/egov-wf/businessservice/_search",
        params: { tenantId: tenantId, businessServices: "EDITRENEWAL,DIRECTRENEWAL,NewTL" },
        body: {},
        config: {
          enabled: true,
          select: (data) => {
            let applicationStatuses = [];
            const filteredData = data?.BusinessServices;
            filteredData.forEach((service) => {
              service?.states.forEach((state) => {
                applicationStatuses?.some((el) => el?.code === state.applicationStatus) ? false : applicationStatuses.push({ code: state.applicationStatus, i18nKey: `WF_NEWTL_${state.applicationStatus}` });
              })
            })
            return applicationStatuses.filter((state) => state.code !== null);
          }
        },
      };
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
  TLSearchConfig: {
    preProcess: (data) => {
      //set tenantId
      const tenantId = Digit.ULBService.getCurrentTenantId();
      data.params.tenantId = tenantId;
      if (data?.params?.fromDate || data?.params?.toDate) {
        const createdFrom = Digit.Utils.pt.convertDateToEpoch(data.params?.fromDate);
        const createdTo = Digit.Utils.pt.convertDateToEpoch(data.params?.toDate);
        data.params.fromDate = createdFrom;
        data.params.toDate = createdTo;
      }
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();

      switch (key) {
        case "TL_TRADE_LICENSE_LABEL":
          return (
            <span className="link">
              <Link to={`/${window.contextPath}/employee/tl/application-details/${row?.applicationNumber}`}>{value}</Link>
            </span>
          );
        case "ES_APPLICATION_SEARCH_ISSUED_DATE":
          value = new Date(value);
          return <span>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</span>;
        case "ES_APPLICATION_SEARCH_VALID_TO":
          value = new Date(value);
          return <span>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</span>;
        case "TL_HOME_SEARCH_RESULTS__LOCALITY":
          return <span>{t(`${stringReplaceAll(row.tenantId?.toUpperCase(), ".", "_")}_REVENUE_${row.tradeLicenseDetail.address.locality.code}`)}</span>
        case "TL_COMMON_TABLE_COL_STATUS":
          return <span>{t(`WF_${row.workflowCode}_${value}`)}</span>;
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
};