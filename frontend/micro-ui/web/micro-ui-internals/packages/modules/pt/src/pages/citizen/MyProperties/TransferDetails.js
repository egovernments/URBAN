import React from "react";
import { Row, StatusTable } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const returnTransferData = (value, rowContainerStyles) => {
  const { t } = useTranslation();
  return Object.keys(value).map((key) => {
    return (
      <div style={{ minWidth: "0" }}>
        <Row
          rowContainerStyle={{ alignItems: "flex-start", ...rowContainerStyles }}
          label={
            <span style={{ display: "block", margin: 0, lineHeight: 1.3, whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "anywhere" }}>
              {t(key)}
            </span>
          }
          text={
            <span style={{ display: "block", margin: 0, lineHeight: 1.3, whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "anywhere" }}>
              {`${value[key] || "NA"}`}
            </span>
          }
        />
      </div>
    );
  });
};

const TransferDetails = ({ data, showHorizontalBar, wrapperStyles, tableStyles, containerStyles, rowContainerStyles }) => {
  const mergedTableStyles = {
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    ...tableStyles,
  };
  return (
    <div className={wrapperStyles}>
      {data.map((value, index) => {
        return (
          <div className={containerStyles} style={{ minWidth: "0" }}>
            {index !== 0 && showHorizontalBar && <div className="historyHorizontalBar"></div>}
            <StatusTable style={mergedTableStyles}>{returnTransferData(value, rowContainerStyles)}</StatusTable>
          </div>
        );
      })}
    </div>
  );
};

export default TransferDetails;
