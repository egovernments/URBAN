import React, { Fragment } from "react";
import { ArrowRightInbox } from "./svgindex";
import { Link } from "react-router-dom";

// const EmployeeModuleCard = ({ Icon, moduleName, kpis = [], links = [], isCitizen = false, className, styles, longModuleName=false, FsmHideCount }) => {
//   return (
//     <div className={className ? className : "employeeCard customEmployeeCard card-home home-action-cards"} style={styles ? styles : {}}>
//       <div className="complaint-links-container">
//         <div className="header" style={isCitizen ? { padding: "0px" } : longModuleName ? {alignItems:"flex-start"}:{}}>
//           <span className="text removeHeight" style={{color:"#6b133f"}}>{moduleName}</span>
//           <span className="logo removeBorderRadiusLogo" style={{backgroundColor:"#6b133f"}}>{Icon}</span>
//         </div>
//         <div className="body" style={{ margin: "0px", padding: "0px" }}>
//           {kpis.length !== 0 && (
//             <div className="flex-fit" style={isCitizen ? { paddingLeft: "17px" } : {}}>
//               {kpis.map(({ count, label, link }, index) => (
//                 <div className="card-count" key={index}>
//                   <div>
//                     <span>{count ? count : count == 0 ? 0 : "-"}</span>
//                   </div>
//                   <div>
//                     {link ? (
//                       <Link to={link} className="employeeTotalLink" >
//                         {label}
//                       </Link>
//                     ) : null}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="links-wrapper" style={{ width: "80%" }}>
//             {links.map(({ count, label, link, hyperlink }, index) => (
//               <span className="link" key={index} style={{ color: "#282828"}}>
//                 {link ? hyperlink ? <a href={link} style={{ color: "#282828"}}>{label}</a> : <Link to={link} style={{ color: "#282828"}}>{label}</Link> : null}
//                 {count ? (
//                   <>
//                     {FsmHideCount ? null : <span className={"inbox-total"} style={{ background: "#6b133f"}}>{count || "-"}</span>}
//                     <Link to={link} style={{ color: "#282828"}}>
//                       <ArrowRightInbox />
//                     </Link>
//                   </>
//                 ) : null}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const EmployeeModuleCard = ({
  Icon,
  moduleName,
  kpis = [],
  links = [],
  isCitizen = false,
  className,
  styles,
  longModuleName = false,
  FsmHideCount,
}) => {
  return (
    <div
      className={className || "employeeCard customEmployeeCard card-home home-action-cards"}
      style={{
        width: "280px",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        ...styles,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#6b133f",
          display: "flex",
          // justifyContent: "space-between",
          alignItems: longModuleName ? "center" : "center",
          padding: "10px 12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            // backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
          }}
        >
          {Icon}
        </div>

        {/* Module Name as Button */}
        <div
          style={{
            // backgroundColor: "#F9D084",
            borderRadius: "20px",
            // padding: "6px 14px",
            fontWeight: "600",
            fontSize: "14px",
            color: "white",
          }}
        >
          {moduleName}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "0", backgroundColor: "#6b133f" }}>
        {/* KPIs */}
        {kpis.length !== 0 && (
          <div style={{ padding: isCitizen ? "0 0 0 17px" : "0", display: "flex", flexWrap: "wrap", gap: "12px", backgroundColor: "#fff", paddingTop: "12px", paddingLeft: "12px", paddingRight: "12px" }}>
            {kpis.map(({ count, label, link }, index) => (
              <div key={index} style={{ flex: "1 1 100%", textAlign: "left" }}>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>{count || count === 0 ? count : "0"}</div>
                {link ? (
                  <Link to={link} style={{ fontSize: "14px", color: "#6b133f", textDecoration: "none" }}>
                    {label}
                  </Link>
                ) : (
                  <div style={{ fontSize: "14px", color: "#999" }}>{label}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Links Section */}
        <div style={{display: "flex", flexDirection: "column", gap: "10px" }}>
          {links.map(({ count, label, link, hyperlink }, index) => (
            <div
              key={index}
              style={{
                // backgroundColor: "#F9D084",
                 borderBottom:"1px solid white",
                // borderRadius: "10px",
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: "500",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {link ? (
                  hyperlink ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none" }}>
                      {label}
                    </a>
                  ) : (
                    <Link to={link} style={{ color: "white", textDecoration: "none" }}>
                      {label}
                    </Link>
                  )
                ) : (
                  <span>{label}</span>
                )}
              </div>

              {/* Count + Arrow */}
              {count !== undefined && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {!FsmHideCount && (
                    <span
                      style={{
                        backgroundColor: "#6b133f",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    >
                      {count}
                    </span>
                  )}
                  {link && (
                    <Link to={link}>
                      {/* <ArrowRightInbox /> */}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModuleCardFullWidth = ({ moduleName,  links = [], isCitizen = false, className, styles, headerStyle, subHeader, subHeaderLink }) => {
  return (
    <div className={className ? className : "employeeCard card-home customEmployeeCard home-action-cards"} style={styles ? styles : {}}>
      <div className="complaint-links-container" style={{ padding: "10px" }}>
        <div className="header" style={isCitizen ? { padding: "0px" } : headerStyle}>
          <span className="text removeHeight">{moduleName}</span>
          <span className="link">
            <a href={subHeaderLink}>
              <span className={"inbox-total"} style={{ display: "flex", alignItems: "center", color: "#F47738", fontWeight: "bold" }}>
                {subHeader || "-"}
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  <ArrowRightInbox />
                </span>
              </span>
            </a>
          </span>
        </div>
        <div className="body" style={{ margin: "0px", padding: "0px" }}>
          <div className="links-wrapper" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {links.map(({ count, label, link }, index) => (
              <span className="link full-employee-card-link" key={index}>
                {link ? (link?.includes('digit-ui/')?<Link to={link}>{label}</Link>:<a href={link}>{label}</a>) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmployeeModuleCard, ModuleCardFullWidth };
