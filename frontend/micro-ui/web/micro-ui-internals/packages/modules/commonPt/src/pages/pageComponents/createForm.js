import { FormComposer, Loader, Dropdown, Localities, Header, Toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch,useLocation } from "react-router-dom";
import { newConfig } from "../../config/Create/config";
import _, { create, unset } from "lodash";

const CreatePropertyForm = ({ config, onSelect,value,formData, userType, redirectUrl }) => {
  const userInfo = Digit.UserService.getUser();
  const [showToast, setShowToast] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const tenants = Digit.Hooks.pt.useTenants();
  const { t } = useTranslation();
  const location = useLocation();

  const [canSubmit, setCanSubmit] = useState(false);
  // Build stable default values once user info / incoming formData changes
  const defaultValues = useMemo(() => {
    const base = { ...(value || {}) };
    // Prefer formData.owners if passed, else value.owners, else seed from user mobile
    const incomingOwners = formData?.owners || value?.owners;
    if (incomingOwners && incomingOwners.length) {
      base.owners = incomingOwners.map((o, idx) => ({ ...o, ...(idx === 0 && !o?.mobileNumber && userInfo?.info?.mobileNumber ? { mobileNumber: userInfo.info.mobileNumber } : {}) }));
    } else if (userInfo?.info?.mobileNumber) {
      base.owners = [{ mobileNumber: userInfo.info.mobileNumber }];
    }
    return base;
  }, [formData?.owners, value, userInfo?.info?.mobileNumber]);
  const history = useHistory();
  const match = useRouteMatch();
  sessionStorage.setItem("VisitedCommonPTSearch",true);
  sessionStorage.setItem("VisitedLightCreate",true);
  const isMobile = window.Digit.Utils.browser.isMobile();

  const allCities = Digit.Hooks.pt.useTenants()?.sort((a, b) => a?.i18nKey?.localeCompare?.(b?.i18nKey));
  
  const [formValue, setFormValue] = useState(defaultValues);
  const [cityCode, setCityCode] = useState("");
  let enableSkip = userType=="employee"?false :config?.isSkipEnabled || sessionStorage.getItem("skipenabled");
  // delete
  // const [_formData, setFormData,_clear] = Digit.Hooks.useSessionStorage("store-data",null);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", { });
  const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = async () => {
    if((formValue?.owners?.ownershipCategory?.includes("MULTIPLEOWNERS") || formValue?.owners?.[0]?.ownershipCategory?.code?.includes("MULTIPLEOWNERS")) && formValue?.owners?.length==1){
      setShowToast({ key: true, label: "PT_COMMON_ONE_MORE_OWNER_INFROMATION_REQUIRED" });
    }else{

    if(onSelect) {
      onSelect('cptNewProperty', { property: formValue });
    } else {
      if(userType === 'employee') {
        history.push(`${match.path}/save-property?redirectToUrl=${redirectUrl}`, {
          data: formValue,
          prevState:{...location?.state}
        });
      } else {
        history.replace(`/digit-ui/citizen/commonPt/property/citizen-otp`,
          {
            // from: getFromLocation(location.state, searchParams),
            mobileNumber: formValue?.owners?.[0]?.mobileNumber,
            redirectBackTo: '/digit-ui/citizen/commonPt/property/new-application/save-property',
            redirectData: formValue,
          }
        );
      }
    }
  }
  };

  const onSkip = () => {
    onSelect("isSkip",true);
  }

  const onFormValueChange = (setValue, data, formState) => {
    // const city = data?.locationDet?.city;
    // const locality = data?.locationDet?.locality;

    // if (city?.code !== cityCode) {
    //   setCityCode(city?.code);
    // }
    if (!_.isEqual(data, formValue)) {
      // if (data?.city.code !== formValue?.city?.code) setValue("locality", null);
      setFormValue(data);
    }

  if(data?.assemblyDet && data?.locationDet && data?.owners && !Object.keys(formState?.errors).length){
      setCanSubmit(true);
    }else{
      setCanSubmit(false);
    }

    // if (!locality) {
    //   setCanSubmit(false);
    //   return;
    // }

    // setCanSubmit(true);
  };

  const getHeaderLabel = () => {
    let url = window.location.href;
    let moduleName = url?.split("=")?.[1]?.split("/")?.[3];
    if (moduleName) return t(`ES_COMMON_CREATE_PROPERTY_HEADER_${moduleName?.toUpperCase()}`);
    else return t('ES_COMMON_CREATE_PROPERTY_HEADER');
  }

  return (
    <React.Fragment>
      <div style={{marginLeft: "12px"}}>
        <Header styles={window.location.href.includes("citizen") ? {paddingLeft: "0px", marginLeft: "0px"} : {}}>{t(getHeaderLabel())}</Header>
      </div>
    <FormComposer
      onSkip = {onSkip}
      showSkip = {enableSkip}
      skipStyle = {isMobile?{}:{textAlign:"right",marginRight:"55px"}}
      sectionHeadStyle = {{marginBottom:"16px"}}
      onSubmit={onSubmit}
      noBoxShadow
      inline
      config={newConfig}
      label={t('SUBMIT')}
      isDisabled={!canSubmit}
      defaultValues={defaultValues}
      onFormValueChange={onFormValueChange}
    />
     {showToast && (
        <Toast
          error={showToast.key}
          label={t(showToast.label)}
          onClose={() => {
            setShowToast(null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default CreatePropertyForm;
