import React, { useEffect, useState } from "react";

import { ViewComposer, Loader, Header } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { viewBirthApplicationConfig } from "./config/viewApplicationsConfig.js";

// Displays user's birth applications
const MyApplications = () => {
    const { t } = useTranslation();
    const [config, setConfig] = useState(null);

    const tenantId = Digit.ULBService.getStateId();
    const authToken = window?.Digit?.UserService?.getUser()?.access_token;

    // Fetch birth applications
    const { data, isLoading, error, revalidate } = Digit.Hooks.useCustomAPIHook({
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

    if (isLoading) return <Loader />;
    if (error) return <div>Error fetching applications. Please try again.</div>;

    return (
        <React.Fragment>
            <Header>{t("BND_CITIZEN_MY_APPLICATIONS")}</Header>
            <div>
                {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View...</div>}
            </div>
        </React.Fragment>
    );
};

export default MyApplications;
