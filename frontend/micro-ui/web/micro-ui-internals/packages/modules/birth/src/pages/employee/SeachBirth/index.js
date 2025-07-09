import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";
import { InboxSearchComposer } from "@egovernments/digit-ui-components";
import inboxConfig from "./config/inboxConfig";

const SearchBirth = () => {
  const { t } = useTranslation();
  const configs = useMemo(() => inboxConfig(), []);

  return (
    <React.Fragment>
      <Header>{t(configs?.label)}</Header>
      <div className="inbox-search-wrapper">
        <InboxSearchComposer configs={configs} />
      </div>
    </React.Fragment>
  );
};

export default SearchBirth;