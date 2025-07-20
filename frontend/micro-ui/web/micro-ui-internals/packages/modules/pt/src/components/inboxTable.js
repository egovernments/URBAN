
// import React, { useCallback, useMemo, useEffect } from "react"


// const PTinboxTable = () => {

//    const { data, isLoadings, isFetching, isSuccesss } = Digit.Hooks.useNewInboxGeneralV2({
//       tenantId: Digit.ULBService.getCurrentTenantId(),
//       ModuleCode: "PT",
//       filters: { limit: 10, offset: 0, services: ["PT.CREATE", "PT.MUTATION", "PT.UPDATE"] },
//       // config: {
//       //   select: (data) => {
//       //     return { totalCount: data?.totalCount, nearingSlaCount: data?.nearingSlaCount } || "-";
//       //   },
//       //   enabled: Digit.Utils.ptAccess(),
//       // },
//     });
//     return <React.Fragment>


//          <div style={{ border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden", marginTop: "20px" }}>
//                         <table style={{ borderCollapse: "collapse", width: "100%" }}>
//                             <thead>
//                                 <tr style={{ backgroundColor: "#6b133f" }}>
//                                     <th style={headerStyle}>Application No</th>
//                                     <th style={headerStyle}>Property ID</th>
//                                     <th style={headerStyle}>Owner Name</th>
//                                     <th style={headerStyle}>Application Type</th>
//                                     <th style={headerStyle}>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array.isArray(data) && data.length > 0 ? (
//                                     data.map((item, index) => {
//                                         const {
//                                             acknowldgementNumber,
//                                             propertyId,
//                                             owners,
//                                         } = item.searchData || {};

//                                         const applicationType = item.workflowData?.businessService || "N/A";
//                                         const status = item.workflowData?.state?.applicationStatus || "N/A";

//                                         const ownerNames = Array.isArray(owners)
//                                             ? owners.map((owner) => owner.name).join(", ")
//                                             : "N/A";

//                                         return (
//                                             <tr key={index} style={{ backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
//                                                 <td style={cellStyle}>{acknowldgementNumber || "N/A"}</td>
//                                                 <td style={cellStyle}>
//                                                     <a
//                                                         href={`/digit-ui/employee/pt/applicationsearch/application-details/${propertyId}`}
//                                                         style={{ color: "#1d70b8", textDecoration: "underline", cursor: "pointer" }}
//                                                     >
//                                                         {propertyId || "N/A"}
//                                                     </a>
//                                                 </td>

//                                                 <td style={cellStyle}>{ownerNames}</td>
//                                                 <td style={cellStyle}>{applicationType}</td>
//                                                 <td style={cellStyle}>{status}</td>
//                                             </tr>
//                                         );
//                                     })
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" style={{ textAlign: "center", padding: "12px", fontStyle: "italic" }}>
//                                             No data found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//     </React.Fragment>
// }
// const headerStyle = {
//     padding: "12px",
//     textAlign: "left",
//     fontWeight: "600",
//     fontSize: "14px",
//     color: "#333",
//     borderBottom: "1px solid #ddd",
// };

// const cellStyle = {
//     padding: "12px",
//     fontSize: "14px",
//     color: "#333",
//     borderBottom: "1px solid #f0f0f0",
// };

// export default PTinboxTable


import React, { useState, useMemo } from "react";

const PTinboxTable = () => {
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const tenantId = Digit.ULBService.getCurrentTenantId();

    const inboxParams = useMemo(() => ({
        tenantId,
        ModuleCode: "PT",
        filters: {
            limit,
            offset,
            services: ["PT.CREATE", "PT.MUTATION", "PT.UPDATE"],
        },
        config: {
            enabled: true,
            select: (res) => res,
        },
    }), [offset]);

    const { data, isLoading, isFetching } = Digit.Hooks.useNewInboxGeneralV2(inboxParams);

    const results = data?.items || [];
    const totalCount = data?.totalCount || 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    const handlePrevious = () => {
        if (offset >= limit) setOffset(offset - limit);
    };

    const handleNext = () => {
        if (offset + limit < totalCount) setOffset(offset + limit);
    };

    return (
        <React.Fragment>
            <div style={{ border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden", marginTop: "20px", background: "white" ,margin:"20px"}}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#6b133f" }}>
                            <th style={headerStyle}>Application No</th>
                            <th style={headerStyle}>Property ID</th>
                            <th style={headerStyle}>Owner Name</th>
                            <th style={headerStyle}>Application Type</th>
                            <th style={headerStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 ? (
                            results.map((item, index) => {
                                const bo = item?.businessObject || {};
                                const pi = item?.ProcessInstance || {};

                                const applicationNo = bo?.acknowldgementNumber || "N/A";
                                const propertyId = bo?.propertyId || "N/A";
                                const ownerNames = Array.isArray(bo?.owners)
                                    ? bo.owners.map((o) => o.name || o.ownerName || "").join(", ")
                                    : "N/A";

                                const applicationType = pi?.businessService || "N/A";
                                const status = pi?.state?.applicationStatus || "N/A";

                                return (
                                    <tr key={index} style={{ backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
                                        <td style={cellStyle}>{applicationNo}</td>
                                        <td style={cellStyle}>
                                            <a
                                                href={`/digit-ui/employee/pt/applicationsearch/application-details/${propertyId}`}
                                                style={{ color: "#1d70b8", textDecoration: "underline", cursor: "pointer" }}
                                            >
                                                {propertyId}
                                            </a>
                                        </td>
                                        <td style={cellStyle}>{ownerNames}</td>
                                        <td style={cellStyle}>{applicationType}</td>
                                        <td style={cellStyle}>{status}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "12px", fontStyle: "italic" }}>
                                    {isLoading || isFetching ? "Loading..." : "No data found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                    marginBottom:"10px",
                    fontFamily: "sans-serif"
                }}>
                    <button
                        onClick={handlePrevious}
                        disabled={offset === 0}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: offset === 0 ? "#f0f0f0" : "#4729A3",
                            color: offset === 0 ? "#999" : "#fff",
                            cursor: offset === 0 ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        ◀ Previous
                    </button>

                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={offset + limit >= totalCount}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: offset + limit >= totalCount ? "#f0f0f0" : "#4729A3",
                            color: offset + limit >= totalCount ? "#999" : "#fff",
                            cursor: offset + limit >= totalCount ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        Next ▶
                    </button>
                </div>
            </div>

            {/* Pagination controls */}


        </React.Fragment>
    );
};

const headerStyle = {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    color: "white",
    borderBottom: "1px solid #ddd",
};

const cellStyle = {
    padding: "12px",
    fontSize: "14px",
    color: "#333",
    borderBottom: "1px solid #f0f0f0",
};

export default PTinboxTable;
