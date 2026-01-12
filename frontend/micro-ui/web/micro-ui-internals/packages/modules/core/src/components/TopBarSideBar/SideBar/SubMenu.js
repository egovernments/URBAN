import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowForward, ArrowVectorDown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  const showSubnav = () => setSubnav(!subnav);

  const imageSrc = item?.icon?.image || item?.image || "https://cdn-icons-png.flaticon.com/512/10758/10758675.png";
  const leftIcon = (
    <img
      src={imageSrc}
      alt="menu-icon"
      style={{
        width: "24px",  // Back to original size
        height: "24px",
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
      }}
    />
  );

  const getModuleName = item?.moduleName?.replace(/[ -]/g, "_");
  const translatedLabel = t(`ACTION_TEST_${getModuleName}`);
  const isLongText = translatedLabel?.length > 20;
  const trimmedLabel = isLongText ? translatedLabel.substring(0, 20) + "..." : translatedLabel;

  const commonStyles = {
    submenuContainer: {
      marginBottom: "8px",  // Back to original spacing
      width: "100%",
      boxSizing: "border-box",
    },
    sidebarLink: (isActive) => ({
      display: "flex",
      justifyContent: "flex-start",  // Changed from space-between
      alignItems: "center",
      padding: "12px 16px",
      backgroundColor: isActive ? "rgba(107, 19, 63, 0.3)" : "#fff",
      color: "#333",
      textDecoration: "none",
      borderLeft: isActive ? "4px solid #007acc" : "4px solid transparent",
      cursor: "pointer",
      minHeight: "40px",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    }),
    iconAndText: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
    },
    labelText: {
      fontSize: "14px",  // Back to original font size
      fontWeight: 500,
      lineHeight: "1.2",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      flex: 1,
      minWidth: 0,
      color: "inherit",
      textDecoration: "none",
    },
    arrowContainer: {
      flexShrink: 0,
      marginLeft: "4px",  // Reduced space between label and arrow
      width: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    dropdownLink: (isActive) => ({
      display: "flex",
      alignItems: "center",
      padding: "10px 40px",  // Back to original padding
      backgroundColor: isActive ? "rgba(107, 19, 63, 0.3)" : "#fff",
      color: "#333",
      textDecoration: "none",
      fontSize: "14px",  // Back to original font size
      fontWeight: "400",
      minHeight: "36px",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }),
  };

  if (item.type === "single") {
    const isExternal = item.navigationURL?.indexOf("/digit-ui") === -1;
    const isActive = pathname === item?.navigationURL;
    const getOrigin = window.location.origin;

    return (
      <div style={commonStyles.submenuContainer}>
        <div style={commonStyles.sidebarLink(isActive)}>
          <div style={commonStyles.iconAndText}>
            {leftIcon}
            {isExternal ? (
              <a
                href={`${getOrigin}/employee/${item.navigationURL}`}
                style={commonStyles.labelText}
                data-tip="React-tooltip"
                data-for={`tooltip-${getModuleName}`}
                title={translatedLabel}
              >
                {trimmedLabel}
              </a>
            ) : (
              <Link
                to={item.navigationURL}
                style={commonStyles.labelText}
                data-tip="React-tooltip"
                data-for={`tooltip-${getModuleName}`}
                title={translatedLabel}
              >
                {trimmedLabel}
              </Link>
            )}
          </div>
        </div>
        {isLongText && (
          <ReactTooltip
            id={`tooltip-${getModuleName}`}
            textColor="white"
            backgroundColor="grey"
            place="right"
            type="info"
            effect="solid"
          >
            {translatedLabel}
          </ReactTooltip>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <div style={commonStyles.submenuContainer}>
          <div
            onClick={item.links && showSubnav}
            style={commonStyles.sidebarLink(false)}
          >
            <div style={commonStyles.iconAndText}>
              {leftIcon}
              <span
                style={{...commonStyles.labelText, marginRight: "8px"}}  // Added margin to create space
                data-tip="React-tooltip"
                data-for={`tooltip-${getModuleName}`}
                title={translatedLabel}
              >
                {trimmedLabel}
              </span>
              <div style={commonStyles.arrowContainer}>
                {item.links && (subnav ? <ArrowVectorDown /> : <ArrowForward />)}
              </div>
            </div>
          </div>
        </div>
        {isLongText && (
          <ReactTooltip
            id={`tooltip-${getModuleName}`}
            textColor="white"
            backgroundColor="grey"
            place="right"
            type="info"
            effect="solid"
          >
            {translatedLabel}
          </ReactTooltip>
        )}

        {subnav &&
          item.links
            ?.sort((a, b) => a.orderNumber - b.orderNumber)
            .filter((link) => link.url !== "")
            .map((link, index) => {
              const getChildName = link?.displayName?.toUpperCase()?.replace(/[ -]/g, "_");
              const translatedChild = t(`ACTION_TEST_${getChildName}`);
              const childIsLong = translatedChild.length > 20;
              const trimmedChild = childIsLong
                ? translatedChild.substring(0, 20) + "..."
                : translatedChild;
              const isActive = pathname === link?.link || pathname === link?.navigationURL;
              const isExternal = link.navigationURL?.indexOf("/digit-ui") === -1;
              const getOrigin = window.location.origin;

              return isExternal ? (
                <a
                  key={index}
                  href={`${getOrigin}/employee/${link.navigationURL}`}
                  style={commonStyles.dropdownLink(isActive)}
                  data-tip="React-tooltip"
                  data-for={`child-tooltip-${index}`}
                  title={translatedChild}
                >
                  <span>{trimmedChild}</span>
                  {childIsLong && (
                    <ReactTooltip
                      id={`child-tooltip-${index}`}
                      textColor="white"
                      backgroundColor="grey"
                      place="right"
                      type="info"
                      effect="solid"
                    >
                      {translatedChild}
                    </ReactTooltip>
                  )}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link?.link || link.navigationURL}
                  style={commonStyles.dropdownLink(isActive)}
                  data-tip="React-tooltip"
                  data-for={`child-tooltip-${index}`}
                  title={translatedChild}
                >
                  <span>{trimmedChild}</span>
                  {childIsLong && (
                    <ReactTooltip
                      id={`child-tooltip-${index}`}
                      textColor="white"
                      backgroundColor="grey"
                      place="right"
                      type="info"
                      effect="solid"
                    >
                      {translatedChild}
                    </ReactTooltip>
                  )}
                </Link>
              );
            })}
      </div>
    );
  }
};

export default SubMenu;