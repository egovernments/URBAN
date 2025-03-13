import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Header, InboxSearchComposer, Loader } from "@egovernments/digit-ui-react-components";
import { TLInboxConfig } from "../../config/TLInboxConfig";

const Inbox = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const data = TLInboxConfig();
  const isLoading = false;

  const [pageConfig, setPageConfig] = useState(null);
  const tenant = Digit.ULBService.getStateId();

  // const { isLoading, data } = Digit.Hooks.useCustomMDMS(
  //   tenant,
  //   "commonUiConfig",
  //   [
  //     {
  //       name: "TLInboxConfig",
  //     },
  //   ],
  //   {
  //     select: (data) => {
  //       return TLInboxConfig();
  //     },
  //   }
  // );

  const updatedConfig = useMemo(() => Digit.Utils.preProcessMDMSConfigInboxSearch(t, pageConfig, "sections.search.uiConfig.fields", {}), [data, pageConfig]);
  
  useEffect(() => {
    setPageConfig(_.cloneDeep(data?.["commonUiConfig"]?.TLInboxConfig?.[0]));
  }, [location]);

  // const tlInboxSession = Digit.Hooks.useSessionStorage("TL_INBOX_SESSION", {})
  
  if (isLoading || !pageConfig) return <Loader />;

  return (
    <React.Fragment>
      <Header styles={{ fontSize: "32px" }}>
        {t(updatedConfig?.label)}
        {data?.totalCount ? <span className="inbox-count">{data?.totalCount}</span> : null}
      </Header>
      <div className="inbox-search-wrapper">
        <InboxSearchComposer configs={updatedConfig}></InboxSearchComposer>
      </div>
    </React.Fragment>
  );
};

export default Inbox;
