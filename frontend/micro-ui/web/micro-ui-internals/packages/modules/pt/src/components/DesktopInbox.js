import { Card, Loader } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationTable from "./inbox/ApplicationTable";
import InboxLinks from "./inbox/InboxLink";
import SearchApplication from "./inbox/search";
import { useHistory } from "react-router-dom";


const DesktopInbox = ({ tableConfig, filterComponent, ...props }) => {
  const history = useHistory();

  const { data, useNewInboxAPI } = props;
  const { t } = useTranslation();
  const [FilterComponent, setComp] = useState(() => Digit.ComponentRegistryService?.getComponent(filterComponent));
  const [EmptyInboxComp, setEmptyInboxComp] = useState(() => {
    const com = Digit.ComponentRegistryService?.getComponent(props.EmptyResultInboxComp);
    return com;
  });

  const [clearSearchCalled, setClearSearchCalled] = useState(false);

  const columns = React.useMemo(() => (props.isSearch ? tableConfig.searchColumns(props) : tableConfig.inboxColumns(props) || []), []);

  let result;
  if (props.isLoading) {
    result = <Loader />;
  } else if (clearSearchCalled) {
    result = null;
  } else if (!data || data?.length === 0 || (useNewInboxAPI && data?.[0].dataEmpty)) {
    result =
      (EmptyInboxComp && <EmptyInboxComp data={data} />) ||
      (data?.length === 0 || (useNewInboxAPI && data?.[0].dataEmpty) ? (
        <Card style={{ marginTop: 20 }}>
          {t("CS_MYAPPLICATIONS_NO_APPLICATION")
            .split("\\n")
            .map((text, index) => (
              <p key={index} style={{ textAlign: "center" }}>
                {text}
              </p>
            ))}
        </Card>
      ) : (
        <Loader />
      ));
  } else if (data?.length > 0) {
    result = (
      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Applicant Name</th>
              <th style={thStyle}>Registration No./Temporary ID</th>
              <th style={thStyle}>Submission Date</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Property ID</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((property, index) => (
              <tr key={index}>
                <td style={tdStyle}>{property.searchData.owners[0].name}</td>
                <td style={tdStyle}>{property.searchData.acknowldgementNumber}</td>
                <td style={tdStyle}>{property.searchData.auditDetails.createdTime}</td>
                <td style={tdStyle}>
                  {property.searchData.propertyType.includes('BUILTUP') ? 'Built-up Property' : 'Vacant Land'}
                </td>
                <td style={{ ...tdStyle, ...statusStyle }}>
                  {property.searchData.status === 'INWORKFLOW' ? 'Correction Pending' : property.searchData.status}
                </td>
                <td style={tdStyle}>{property.searchData.propertyId}</td>
                <td style={tdStyle}>
                  <div style={buttonContainerStyle}>
                    <button style={buttonStyle} onClick={() =>
                      history.push({
                        pathname: `/digit-ui/employee/pt/PTPropertyTaxForm/${property.searchData.propertyId}`,
                        state: { propertyData: property }
                      })
                    }>Edit Property Address</button>
                    <button style={buttonStyle} onClick={() =>
                      history.push({
                        pathname: `/digit-ui/employee/pt/PTPropertyTaxForm/${property.searchData.propertyId}`,
                        state: { propertyData: property }
                      })
                    }>Edit Property Area</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      // <ApplicationTable
      //   t={t}
      //   data={data}
      //   columns={columns}
      //   getCellProps={(cellInfo) => {
      //     return {
      //       style: {
      //         minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
      //         padding: "20px 18px",
      //         fontSize: "16px",
      //       },
      //     };
      //   }}
      //   onPageSizeChange={props.onPageSizeChange}
      //   currentPage={props.currentPage}
      //   onNextPage={props.onNextPage}
      //   onPrevPage={props.onPrevPage}
      //   pageSizeLimit={props.pageSizeLimit}
      //   onSort={props.onSort}
      //   disableSort={props.disableSort}
      //   sortParams={props.sortParams}
      //   totalRecords={props.totalRecords}
      // />
    );
  }

  return (
    <div className="inbox-container">
      {/* {!props.isSearch && (
        <div className="filters-container">
          <InboxLinks parentRoute={props.parentRoute} businessService={props.moduleCode} />
          <div>
            {
              <FilterComponent
                defaultSearchParams={props.defaultSearchParams}
                onFilterChange={props.onFilterChange}
                searchParams={props.searchParams}
                type="desktop"
                useNewInboxAPI={useNewInboxAPI}
                statusMap={useNewInboxAPI ? data?.[0].statusMap : null}
                moduleCode={props.moduleCode}
              />
            }
          </div>
        </div>
      )} */}
      <div style={{ flex: 1 }}>
        <SearchApplication
          defaultSearchParams={props.defaultSearchParams}
          onSearch={(d) => {
            props.onSearch(d);
            setClearSearchCalled(false);
          }}
          type="desktop"
          searchFields={props.searchFields}
          isInboxPage={!props?.isSearch}
          searchParams={props.searchParams}
          clearSearch={() => setClearSearchCalled(true)}
        />
        <div className="result" style={{ marginLeft: !props?.isSearch ? "" : "", flex: 1 }}>
          {result}
        </div>
      </div>
    </div>
  );
};
const tableContainer = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  fontFamily: "Poppins, sans-serif",
  fontSize: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor: "#4729A34D",
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  width: "150px",
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "175%",
  letterSpacing: "-0.01em",
  verticalAlign: "middle",
  color: "#282828",
};

const tdStyle = {
  padding: "14px 16px",
  borderBottom: "1px solid #f0f0f0",
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "175%",
  letterSpacing: "-0.01em",
  verticalAlign: "middle",
  color: "#282828",
};

const statusStyle = {
  color: "#BAD316",
  fontWeight: "500",
};

const buttonContainerStyle = {
  display: "block",
  gap: "8px",
};

const buttonStyle = {
  backgroundColor: "#686DE0",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
  margin: "4px 0",
  width: "175px",
};

export default DesktopInbox;
