import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import {Button,Footer} from "@egovernments/digit-ui-components";
import { ViewComposer,Loader,Header,Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import {viewApplicationConfig} from "./viewApplicationsConfig";

const MyApplications = () => {
  
  const { t } = useTranslation();
  const [config, setConfig] = useState(null);
  const [showToast, setShowToast] = useState(null);

  const tenantId = Digit.ULBService.getStateId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;


  const { data, isLoading, error, revalidate } = Digit.Hooks.useCustomAPIHook({
  url: "/birth-death-services/death/_searchapplications",
  method: "POST",
  params: {
    tenantId: tenantId,
  },
  body: {},
  headers: {
  },
  changeQueryName: `deathApplicationsSearch-${tenantId}`,
});

useEffect(() => {
    const applications = data?.applications;
    if (applications) {
        // Pass the searchTenantId as props, so viewApplicationConfig can use it as a fallback
        const viewConfig = viewApplicationConfig(applications, t, { tenantId: tenantId });
        setConfig(viewConfig);
    }
  }, [data, t, tenantId]);

// Show critical errors only
useEffect(() => {
    if (error) {
        setShowToast({ 
            key: "error", 
            label: t("BND_ERROR_FETCHING_DEATH_APPLICATIONS") 
        });
    }
}, [error, t]);

// Auto-dismiss toast after 5 seconds
useEffect(() => {
    if (showToast) {
        const timer = setTimeout(() => {
            setShowToast(null);
        }, 2000);
        return () => clearTimeout(timer);
    }
}, [showToast]);

if (isLoading) {
  return <Loader />;
}

if (error) {
  return <div>Error fetching applications. Please try again.</div>;
}



    return (
      <React.Fragment>
       <Header>{t("BND_CITIZEN_MY_APPLICATIONS")}</Header>
        <div >
            {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View...</div>}
        </div>
        {showToast && (
            <Toast
                error={showToast.key === "error"}
                label={showToast.label}
                onClose={() => setShowToast(null)}
            />
        )}
      </React.Fragment>
        
      
    );
};

export default MyApplications;


