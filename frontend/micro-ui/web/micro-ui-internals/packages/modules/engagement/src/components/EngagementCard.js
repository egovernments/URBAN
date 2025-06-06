import React, { useEffect, Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  EmployeeModuleCard,
  DocumentIconSolid,
  EventsIconSolid,
  PMBIconSolid,
  SurveyIconSolid,
  PropertyHouse,
} from "@egovernments/digit-ui-react-components";

const EngagementCard = () => {
  const userRoles = Digit.SessionStorage.get("User")?.info?.roles;
  const isEmployee = userRoles.find((role) => role.code === "EMPLOYEE");

  useEffect(() => {
    Digit.SessionStorage.set("CITIZENSURVEY.INBOX", null);
  }, []);

  if (!isEmployee) return null;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: documentsCount, isLoading: isLoadingDocs } = Digit.Hooks.engagement.useDocSearch(
    { tenantIds: tenantId },
    {
      select: (data) => {
        return data?.totalCount;
      },
    }
  );
  const { data: MessagesCount, isLoading: isLoadingMessages } = Digit.Hooks.events.useInbox(
    tenantId,
    {},
    { status: "ACTIVE,INACTIVE", eventTypes: "BROADCAST" },
    {
      select: (data) => data?.totalCount,
    }
  );

  const { data: totalEvents, isLoading: isLoadingEvents } = Digit.Hooks.events.useInbox(
    tenantId,
    {},
    { eventTypes: "EVENTSONGROUND" },
    {
      select: (data) => data?.totalCount,
    }
  );

  const { data: surveysCount, isLoading: isLoadingSurveys } = Digit.Hooks.survey.useSearch(
    { tenantId: tenantId },
    { select: (data) => data?.TotalCount }
  );

  const totalDocsCount = useMemo(() => (isLoadingDocs ? "-" : documentsCount), [isLoadingDocs, documentsCount]);
  const totalEventsCount = useMemo(() => (isLoadingEvents ? "-" : totalEvents), [isLoadingEvents, totalEvents]);
  const totalMessagesCount = useMemo(() => (isLoadingMessages ? "-" : MessagesCount), [isLoadingMessages, MessagesCount]);
  const totalSurveysCount = useMemo(() => (isLoadingSurveys ? "-" : surveysCount), [isLoadingSurveys, surveysCount]);

  const { t } = useTranslation();
  let result = null;

  const propsForSurveyModuleCard = {
    Icon: <SurveyIconSolid />,
    moduleName: t("CS_COMMON_SURVEYS"),
    kpis: [
      {
        count: totalSurveysCount,
        label: t("TOTAL_SURVEYS"),
        link: `/digit-ui/employee/engagement/surveys/inbox`,
      },
    ],
    links: [
      {
        count: totalSurveysCount,
        label: t("ES_TITLE_INBOX"),
        link: `/digit-ui/employee/engagement/surveys/inbox`,
      },
      {
        label: t("CS_COMMON_NEW_SURVEY"),
        link: `/digit-ui/employee/engagement/surveys/create`,
      },
    ],
  };

  const propsForPMBModuleCard = {
    Icon: <PMBIconSolid />,
    moduleName: t("ACTION_TEST_PUBLIC_MESSAGE_BROADCAST"),
    kpis: [
      {
        count: totalMessagesCount,
        label: t("TOTAL_MESSAGES"),
        link: `/digit-ui/employee/engagement/messages/inbox`,
      },
    ],

    links: [
      {
        count: totalMessagesCount,
        label: t("ES_TITLE_INBOX"),
        link: `/digit-ui/employee/engagement/messages/inbox`,
      },
      {
        label: t("NEW_PUBLIC_MESSAGE_BUTTON_LABEL"),
        link: `/digit-ui/employee/engagement/messages/create`,
      },
    ],
  };
  const propsForEventsModuleCard = {
    Icon: <EventsIconSolid />,
    moduleName: t("TOTAL_EVENTS"),
    kpis: [
      {
        count: totalEventsCount,
        label: t("TOTAL_EVENTS"),
        link: `/digit-ui/employee/engagement/event/inbox`,
      },
    ],

    links: [
      {
        count: totalEventsCount,
        label: t("ES_TITLE_INBOX"),
        link: `/digit-ui/employee/engagement/event/inbox`,
      },
      {
        label: t("ES_TITLE_NEW_EVENTS"),
        link: `/digit-ui/employee/engagement/event/new-event`,
      },
    ],
  };
  const propsForDocumentModuleCard = {
    Icon: <DocumentIconSolid />,
    moduleName: t("ES_TITLE_DOCS"),
    kpis: [
      {
        count: totalDocsCount,
        label: t("TOTAL_DOCUMENTS"),
        link: `/digit-ui/employee/engagement/documents/inbox`,
      },
    ],
    links: [
      {
        count: totalDocsCount,
        label: t("ES_TITLE_INBOX"),
        link: `/digit-ui/employee/engagement/documents/inbox`,
      },
      {
        label: t("NEW_DOCUMENT_TEXT"),
        link: `/digit-ui/employee/engagement/documents/new-doc`,
      },
    ],
  };

  const engagementSubModulesProps = [propsForDocumentModuleCard, propsForEventsModuleCard, propsForPMBModuleCard, propsForSurveyModuleCard];

  if (isEmployee)
    result = (
      <>
        {engagementSubModulesProps.map((propsForModuleCard, index) => (
          <EmployeeModuleCard key={index} longModuleName={true} {...propsForModuleCard} />
        ))}
      </>
    );

  return result;
};

export default EngagementCard;
