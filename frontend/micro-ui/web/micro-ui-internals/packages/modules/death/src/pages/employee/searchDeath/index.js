import React, { useEffect, useState } from "react";
import { InboxSearchComposer, Loader } from "@egovernments/digit-ui-components";
import { searchDeathConfig } from "./searchDeathConfig";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";

const SearchDeath = () => {
    
    const { t } = useTranslation();
   
    const tenant= Digit.ULBService.getStateId(); 

    const hospitalTenantId = Digit.ULBService.getCurrentTenantId(); 
    const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
        hospitalTenantId,
        "birth-death-service",
        [{ "name": "hospitalList" }],
        {
        select: (data) => {
            const hospitalOptions = data?.["birth-death-service"]?.hospitalList
            ?.filter(hospital => hospital.active === "true" || hospital.active === true)
            .map(hospital => ({
                code: hospital.hospitalName,
                name: `COMMON_HOSPITAL_${hospital.hospitalName.replace(/\s+/g, '_').toUpperCase()}`,
                originalName: hospital.hospitalName 
            }));
            return {
            hospitalListOptions: hospitalOptions || []
            };
        },
        }
    );


     const [finalSearchConfig, setFinalSearchConfig] = useState(null);

    useEffect(() => {
        const baseConfig = searchDeathConfig(t);
        
        if (hospitalListData?.hospitalListOptions) {
            const updatedFields = baseConfig.sections.search.uiConfig.fields.map(field => {
                if (field.key === "placeofdeath") { 
                    return {
                        ...field,
                        populators: {
                            ...field.populators,
                            options: hospitalListData.hospitalListOptions,
                        }
                    };
                }
                return field;
            });

            const newConfig = {
                ...baseConfig,
                sections: {
                    ...baseConfig.sections,
                    search: {
                        ...baseConfig.sections.search,
                        uiConfig: {
                            ...baseConfig.sections.search.uiConfig,
                            fields: updatedFields,
                        }
                    }
                }
            };
            setFinalSearchConfig(newConfig);
        } else {
            setFinalSearchConfig(baseConfig);
        }
    }, [t, hospitalListData]); 

   
    if (hospitalListLoading || !finalSearchConfig) { 
        return <Loader />;
    }

   
    return (
        <React.Fragment>
            <div className="digit-inbox-search-wrapper">
                <Header styles={{ fontSize: "32px" }}>{t(finalSearchConfig?.label)}</Header>
                <InboxSearchComposer configs={finalSearchConfig}></InboxSearchComposer>
            </div>
        </React.Fragment>
    )
}
export default SearchDeath;