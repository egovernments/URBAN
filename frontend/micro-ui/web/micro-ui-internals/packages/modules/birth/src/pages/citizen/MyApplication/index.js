import React, { useEffect, useState } from "react";

import { ViewComposer, Loader, Header, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { viewBirthApplicationConfig } from "./config/viewApplicationsConfig.js";

// Displays user's birth applications
const MyApplications = () => {
    const { t } = useTranslation();
    const [config, setConfig] = useState(null);
    const [showToast, setShowToast] = useState(null);

    const tenantId = Digit.ULBService.getStateId();
    const authToken = window?.Digit?.UserService?.getUser()?.access_token;

    // Fetch birth applications
    const { data, isLoading, error, revalidate } = Digit.Hooks.useCustomAPIHookV2({
        url: "/birth-death-services/birth/_searchapplications",
        method: "POST",
        params: { tenantId },
        body: {},
        headers: {},
        changeQueryName: `birthApplicationsSearch-${tenantId}`,
    });

    useEffect(() => {
        const applications = data?.applications;
        if (applications) {
            const viewConfig = viewBirthApplicationConfig(applications, t, { tenantId });
            setConfig(viewConfig);
        }
    }, [data, t, tenantId]);

    // Show critical errors only
    useEffect(() => {
        if (error) {
            setShowToast({ 
                key: "error", 
                label: t("BND_ERROR_FETCHING_BIRTH_APPLICATIONS") 
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

    if (isLoading) return <Loader />;
    if (error) return <div>Error fetching applications. Please try again.</div>;

    return (
        <React.Fragment>
           <div className="myapplication" style={{ padding: "16px", width: "100vw" }}>
                <Header>{t("BND_CITIZEN_MY_APPLICATIONS")}</Header>
                <div>
                    {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View...</div>}
                </div>
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
