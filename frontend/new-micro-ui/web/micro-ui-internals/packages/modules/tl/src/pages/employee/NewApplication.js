import { Loader, FormComposerV2, Header } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect, useMemo, use } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Toast } from '@egovernments/digit-ui-components';

import { createConfig } from "../../config/TLCreateConfig";
import { transformData } from "../../utils/transformCreateData";

const NewApplication = ({ props }) => {
  const stateTenant = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [selectedStructure, setSelectedStructure] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [canSubmit, setSubmitValve] = useState(false);
  const [propertyId, setPropertyId] = useState(new URLSearchParams(useLocation().search).get("propertyId"));
  // const [sessionFormData, setSessionFormData] = useState({});
  const [showToast, setShowToast] = useState({display: false, type: ""});
  const [error, setError] = useState("");

  let TLData = {};
  const EstimateSession = Digit.Hooks.useSessionStorage("NEW_TL_CREATE", TLData);
  const [sessionFormData, setSessionFormData, clearSessionFormData] = EstimateSession;


  // use this for call create or update
  const reqCriteria = {
    url: props?.isUpdate ? `/tl-services/v1/_update` : `/tl-services/v1/_create`,
    params: {},
    body: {},
    config: {
      enabled: false,
    },
  };

  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCriteria);

  // config
  // const { isLoading, data: configs } = Digit.Hooks.useCustomAPIHook(
  //   tenantId,
  //   "commonUiConfig",
  //   [
  //     {
  //       name: "TLCreateConfig",
  //     },
  //   ],
  // );
  const isLoading = false;
  // let configs = createConfig;

  const { isLoading: locationDataFetching, data : localities } = Digit.Hooks.useLocation(
    city, 'Locality',
    {
        select: (data) => {
          const localities = [];
          data?.TenantBoundary[0]?.boundary.forEach((item) => {
            localities.push({ code: item.code, name: item.name, i18nKey: `${tenantId.replace(".", "_").toUpperCase()}_REVENUE_${item?.code}` });
          })
          console.log(localities, "localities")
          return localities;
        }
    },true);
  // const filteredLocalities = wardsAndLocalities?.localities[selectedWard];

  const {isLoading: tlDataFetching, data: tlData } = Digit.Hooks.useCustomMDMS(
    stateTenant,
    "common-masters",
    [ { "name": "StructureType" }],
    {
        select: (data) => {
          console.log(data, "tlData")
            let structureTypes = []
            let structureSubTypes = {}
            data?.["common-masters"]?.StructureType?.forEach(item => {
                if(!item?.active) return
                const structureType = item?.code?.split('.')?.[0]
                const structureSubType = item?.code?.split('.')?.[1]
                if(!structureTypes.includes(structureType)) structureTypes.push(structureType)
                if(structureSubTypes[structureType]) {
                    structureSubTypes[structureType].push({code: item.code, name: `COMMON_MASTERS_STRUCTURETYPE_${structureType}_${structureSubType}`})
                } else {
                    structureSubTypes[structureType] = [{code: item.code, name: `COMMON_MASTERS_STRUCTURETYPE_${structureType}_${structureSubType}`}]
                }
            })
            structureTypes = structureTypes.map(item => ({code: item, name: `COMMON_MASTERS_STRUCTURETYPE_${item}`}))
            return {
                structureTypes,
                structureSubTypes,
            }
        }
    }
);

  const filteredStructureSubTypes = tlData?.structureSubTypes[selectedStructure];

  const updatedConfigs = useMemo(
    () =>
      Digit.Utils.preProcessMDMSConfig(t, createConfig, {
        updateDependent: [
          {
            key: "structureType",
            value: [tlData?.structureTypes]
          },
          {
            key: "structureSubType",
            value: [filteredStructureSubTypes],
          },
          {
            key: "locality",
            value: [localities],
          },
        ],
      }),
    [tlData, filteredStructureSubTypes, localities, createConfig]
  );

  console.log(localities, createConfig, "here1");

  const propertyReqCriteria = {
    url: "/property-services/property/_search",
    params: {
      propertyIds: propertyId,
      tenantId: tenantId,
    },
  }
  const { isLoading: propertyLoading, data: propertyDetails } = Digit.Hooks.useCustomAPIHook(propertyReqCriteria);


  // Handle form submission
  const onSubmit = async (data) => {
    
    const Licenses = transformData(data, tenantId);
    const onError = (resp) => {
      setError(resp?.response?.data?.Errors?.[0]?.message);
      setShowToast({display:true, type:"error"});
    };
    const onSuccess = (resp) => {
      sessionStorage.removeItem("Digit.NEW_TL_CREATE");
      clearSessionFormData();
      history.push(`/${window.contextPath}/employee/tl/response`);
    };
    mutation.mutate(
      {
        params: {},
        body: Licenses,
        config: {
          enabled: true,
        },
      },
      {
        onError,
        onSuccess,
      }
    );
  };

  const closeToast = () => {
    setShowToast({display:false});
  };
  //remove Toast after 3s
  useEffect(() => {
    if (showToast && showToast?.display === true) {
      setTimeout(() => {
        closeToast();
      }, 3000);
    }
  }, [showToast]);


  const onFormValueChange = (setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
    if (!_.isEqual(sessionFormData, formData)) {
      const difference = _.pickBy(sessionFormData, (v, k) => !_.isEqual(formData[k], v));
      if(formData.structureType) {
        setSelectedStructure(formData?.structureType?.code)
      }
      if(formData.pinCode) {
        setPincode(formData?.pinCode?.code)
      }
      setValue("licenseType", {code: "PERMANENT", name: "TRADELICENSE_LICENSETYPE_PERMANENT"});
      setValue("city", {code: tenantId, name: tenantId});
      setValue("ownershipCategory", {code: "INDIVIDUAL.SINGLEOWNER" })
      setCity(tenantId);
      setSessionFormData({ ...sessionFormData, ...formData });
    }
  };

  if (isLoading || propertyLoading || tlDataFetching) {
    return <Loader />;
  }

  return (
    <div>
      <div style={{ marginLeft: "15px" }}>
        <Header>{t("ES_TITLE_NEW_TRADE_LICESE_APPLICATION")}</Header>
      </div>
      <FormComposerV2
        label={t("ES_COMMON_APPLICATION_SUBMIT")}
        config={updatedConfigs?.form?.map((config) => {
          return {
            ...config,
            body: config.body.filter((a) => {
              return !a.hideInEmployee;
            }),
          };
        })}
        fieldStyle={{ marginRight: 0 }}
        onSubmit={onSubmit}
        defaultValues={{ ...sessionFormData }}
        onFormValueChange={onFormValueChange}
        noBreakLine={true}
      />
      {showToast && <Toast isDleteBtn={true} error={showToast?.key === "error" ? true : false} label={error} onClose={closeToast} />}
    </div>
  );
};
export default NewApplication;
