import { Header, Loader, Card, CardSubHeader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PTApplication from "./pt-application";
import { propertyCardBodyStyle } from "../../../utils";

export const PTMyApplications = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true) || Digit.ULBService.getCurrentTenantId();
  const user = Digit.UserService.getUser().info;

  let filter = window.location.href.split("/").pop();
  let t1;
  let off;
  if (!isNaN(parseInt(filter))) {
    off = filter;
    t1 = parseInt(filter) + 50;
  } else {
    t1 = 4;
  }
  let filter1 = !isNaN(parseInt(filter))
    ? { limit: "50", sortOrder: "ASC", sortBy: "createdTime", offset: off, tenantId }
    : { limit: "4", sortOrder: "ASC", sortBy: "createdTime", offset: "0", mobileNumber: user?.mobileNumber, tenantId };

  const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ filters: filter1 }, { filters: filter1 });

  const { Properties: applicationsList } = data || {};
  let combinedApplicationNumber = applicationsList?.length > 0 ? applicationsList?.map((ob) => ob?.acknowldgementNumber) : [];
  let serviceSearchArgs = {
    tenantId: tenantId,
    referenceIds: combinedApplicationNumber,
  }

  const { isLoading: serviceloading, data: servicedata } = Digit.Hooks.useFeedBackSearch({ filters: { serviceSearchArgs } }, { filters: { serviceSearchArgs }, enabled: combinedApplicationNumber?.length > 0 ? true : false, cacheTime: 0 });

  function getLabelValue(curservice) {
    let foundValue = servicedata?.Service?.find((ob) => ob?.referenceId?.includes(curservice?.acknowldgementNumber));

    if (foundValue)
      return t("CS_CF_VIEW")
    else if (!foundValue && curservice?.status?.includes("ACTIVE"))
      return t("CS_CF_RATE_US")
    else
      return t("CS_CF_TRACK")
  }

  if (isLoading || serviceloading) {
    return <Loader />;
  }

  const tableHeaders = [
    "Property id",
    "Application no",
    "Application Type",
    "Owner name",
    "Status",
    "Address",
  ];

  const tableData = [
    {
      propertyId: "1234567890",
      applicationNo: "Prefilled",
      applicationType: "Prefilled",
      ownerName: "Ajit",
      status: "In progress",
      address: "Address",
    },
  ];
  console.log("applicationsList", applicationsList);
  return (
    <React.Fragment>
      {/* <Header>{`${t("CS_TITLE_MY_APPLICATIONS")} ${applicationsList ? `(${applicationsList.length})` : ""}`}</Header>
      <div>
        {applicationsList?.length > 0 &&
          applicationsList.map((application, index) => (
            <div key={index}>
              <PTApplication application={application} tenantId={user?.permanentCity} buttonLabel={getLabelValue(application)}/>
            </div>
          ))}
        {!applicationsList?.length > 0 && <p style={{ marginLeft: "16px", marginTop: "16px" }}>{t("PT_NO_APPLICATION_FOUND_MSG")}</p>}

        {applicationsList?.length !== 0 && (
          <div>
            <p style={{ marginLeft: "16px", marginTop: "16px" }}>
              <span className="link">{<Link to={`/digit-ui/citizen/pt/property/my-applications/${t1}`}>{t("PT_LOAD_MORE_MSG")}</Link>}</span>
            </p>
          </div>
        )}
      </div>

      <p style={{ marginLeft: "16px", marginTop: "16px" }}>
        {t("PT_TEXT_NOT_ABLE_TO_FIND_THE_APPLICATION")}{" "}
        <span className="link" style={{ display: "block" }}>
          <Link to="/digit-ui/citizen/pt/property/new-application/info">{t("PT_COMMON_CLICK_HERE_TO_REGISTER_NEW_PROPERTY")}</Link>
        </span>
      </p> */}

      <Card style={{ maxWidth: "none" }}>
        <div style={{ padding: "16px" }}>

          <CardSubHeader>My Application</CardSubHeader>

          <div style={{ overflowX: "auto" }}>
            <Card style={{ maxWidth: "none", padding: "0px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead style={{ backgroundColor: "#6B133F4D" }}>
                  <tr>
                    {tableHeaders.map((head, i) => (
                      <th
                        key={i}
                        style={{
                          padding: "12px",
                          borderBottom: "1px solid #D1D5DB",
                          color: "#6B7280",
                          textAlign: "left",
                          width: "150px",
                        }}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* <tbody>
              {tableData.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>{item.propertyId}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>{item.applicationNo}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>{item.applicationType}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>{item.ownerName}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>{item.status}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>{item.address}</td>
                </tr>
              ))}
            </tbody> */}
                <tbody>
                  {applicationsList.map((item, i) => (
                    <tr key={i}>
                      <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
                        {item.propertyId}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
                        {item.acknowldgementNumber}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
                        {item.creationReason}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
                        {item.owners[0]?.name}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
                        {item.status}
                      </td>
                      <td style={{ padding: "12px", borderBottom: "1px solid #E5E7EB" }}>
                        {`${item.address?.doorNo}, ${item.address?.street}, ${item.address?.locality?.name}, ${item.address?.city}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>


          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <SubmitBar label="Close" onSubmit={() => history.back()} />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};
