// import React from "react";
// import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
// import { Card, Divider, Button, StringManipulator } from "@egovernments/digit-ui-components"
// import { iconRender } from "../../utils";
// import { Colors } from "../constants/colors/colorconstants";

// const LandingPageCard = ({
//   icon,
//   moduleName,
//   metrics = [],
//   links = [],
//   className,
//   style,
//   moduleAlignment,
//   hideDivider,
//   metricAlignment,
//   iconBg,
//   buttonSize,
//   onMetricClick,
//   centreChildren,
//   endChildren
// }) => {
//   const history = useHistory();

//   const handleMetricClick = (link, count) => {
//     onMetricClick && onMetricClick(link, count);
//   };

//   const handleLinkClick = ({ link, label, icon }) => {
//     link?.includes(`${window?.contextPath}/`) ? history?.push(link) : window.location.href = link;
//   };
//   const primaryIconColor = Colors.lightTheme.primary[1];
//   const secondaryIconColor = Colors.lightTheme.paper.primary;

//   return (
//     <Card
//       className={`digit-landing-page-card ${
//         moduleAlignment || ""
//       } ${className}`}
//       style={style}
//     >
//       <div
//         className={`icon-module-header ${moduleAlignment || ""} ${
//           icon && iconBg ? "iconBg" : ""
//         }`}
//       >
//         {icon && moduleAlignment === "right" && (
//           <div
//             className={`digit-landingpagecard-icon ${iconBg ? "iconBg" : ""}`}
//           >
//             {iconRender(
//               icon,
//               iconBg ? secondaryIconColor : primaryIconColor,
//               "56px",
//               "56px",
//               `digit-landingpagecard-icon ${iconBg ? "iconBg" : ""}`
//             )}
//           </div>
//         )}
//         {moduleName && (
//           <div className="ladingcard-moduleName">
//             {StringManipulator(
//               "TOSENTENCECASE",
//               StringManipulator("TRUNCATESTRING", moduleName, {
//                 maxLength: 64,
//               })
//             )}
//           </div>
//         )}
//         {icon && moduleAlignment === "left" && (
//           <div
//             className={`digit-landingpagecard-icon ${iconBg ? "iconBg" : ""}`}
//           >
//             {iconRender(
//               icon,
//               iconBg ? secondaryIconColor : primaryIconColor,
//               "56px",
//               "56px",
//               `digit-landingpagecard-icon ${iconBg ? "iconBg" : ""}`
//             )}
//           </div>
//         )}
//       </div>
//       {!hideDivider && (
//         <Divider className="digit-landingpage-divider" variant={"small"} />
//       )}
//       {metrics && metrics.length > 0 && (
//         <div className={`metric-container ${metricAlignment || ""}`}>
//           {metrics.map((metric, index) => (
//             <div
//               key={index}
//               className={`metric-item ${metricAlignment || ""}`}
//               onClick={() => handleMetricClick(metric?.link, metric?.count)}
//             >
//               {metric?.count && (
//                 <div className="metric-count">{metric?.count}</div>
//               )}
//               {metric?.label && (
//                 <div className="metric-label">
//                   {" "}
//                   {StringManipulator(
//                     "TOSENTENCECASE",
//                     StringManipulator("TRUNCATESTRING", metric?.label, {
//                       maxLength: 64,
//                     })
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//       {!hideDivider &&
//         metrics &&
//         metrics.length > 0 &&
//         ((links && links.length > 0) ||
//           (centreChildren && centreChildren.length > 0)) && (
//           <Divider className="digit-landingpage-divider" variant={"small"} />
//         )}
//       {centreChildren && centreChildren.length > 0 && (
//         <div className={"landingpagecard-section"}>{centreChildren}</div>
//       )}
//       {!hideDivider &&
//         links &&
//         links.length > 0 &&
//         centreChildren &&
//         centreChildren.length > 0 && (
//           <Divider className="digit-landingpage-divider" variant={"small"} />
//         )}
//       {links.map(({ label, link, icon }, index) => (
//         <Button
//           variation="teritiary"
//           label={label}
//           icon={icon}
//           type="button"
//           size={buttonSize || "medium"}
//           onClick={() => handleLinkClick({ link, label, icon })}
//           style={{ padding: "0px" }}
//         />
//       ))}
//       {!hideDivider &&
//         endChildren &&
//         endChildren.length > 0 &&
//         links &&
//         links.length > 0 && (
//           <Divider className="digit-landingpage-divider" variant={"small"} />
//         )}
//       {endChildren && endChildren.length > 0 && (
//         <div className={"landingpagecard-section"}>{endChildren}</div>
//       )}
//     </Card>
//   );
// };

// LandingPageCard.propTypes = {
//   icon: PropTypes.node.isRequired,
//   moduleName: PropTypes.string.isRequired,
//   moduleAlignment: PropTypes.string,
//   metrics: PropTypes.arrayOf(
//     PropTypes.shape({
//       count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//       label: PropTypes.string,
//       link: PropTypes.string,
//     })
//   ),
//   metricAlignment: PropTypes.string,
//   links: PropTypes.arrayOf(
//     PropTypes.shape({
//       count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//       label: PropTypes.string,
//       link: PropTypes.string,
//     })
//   ),
//   className: PropTypes.string,
//   style: PropTypes.object,
//   hideDivider: PropTypes.bool,
//   iconBg: PropTypes.bool,
//   onMetricClick: PropTypes.func,
// };

// LandingPageCard.defaultProps = {
//   metris: [],
//   links: [],
//   className: "",
//   style: {},
//   moduleAlignment: "right",
//   metricAlignment: "left",
//   moduleName: "",
//   icon: "",
//   iconBg: false,
//   hideDivider: false,
//   onMetricClick: () => {},
// };

// export default LandingPageCard;


import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Card, Divider, StringManipulator } from "@egovernments/digit-ui-components";
import { iconRender } from "../../utils";
import { Colors } from "../constants/colors/colorconstants";

const MenuItem = ({ item, level = 0 }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const handleClick = () => {
    if (hasChildren) setOpen(!open);
    else if (item.link) {
      item.link.includes(`${window.contextPath}/`)
        ? history.push(item.link)
        : (window.location.href = item.link);
    }
  };

  const indent = 16 * level;
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 4px',
    paddingLeft: `${indent + 8}px`,
    cursor: 'pointer',
    fontSize: '14px',
    color: Colors.lightTheme.primary[1],
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left'
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleClick}>
        <span>{item.label}</span>
        {hasChildren && <span>{open ? '-' : '+'}</span>}
      </button>
      {hasChildren && open && (
        <div>
          {item.children.map((child, idx) => (
            <MenuItem key={idx} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const LandingPageSubMenuCard = ({ icon, moduleName, links = [], style = {} }) => {
  const cardStyle = {
    width: '240px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    padding: '16px',
    backgroundColor: '#fff',
    ...style
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  };

  const iconStyle = {
    backgroundColor: Colors.lightTheme.paper.primary,
    borderRadius: '4px',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#333'
  };

  return (
    <Card style={cardStyle}>
      <div style={headerStyle}>
        {icon && (
          <div style={iconStyle}>
            {iconRender(icon, Colors.lightTheme.primary[1], '24px', '24px')}
          </div>
        )}
        <div style={titleStyle}>
          {StringManipulator(
            'TOSENTENCECASE',
            StringManipulator('TRUNCATESTRING', moduleName, { maxLength: 64 })
          )}
        </div>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      {links.map((item, idx) => (
        <MenuItem key={idx} item={item} />
      ))}
    </Card>
  );
};

LandingPageSubMenuCard.propTypes = {
  icon: PropTypes.node,
  moduleName: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
      children: PropTypes.array
    })
  )
};

export default LandingPageSubMenuCard;

