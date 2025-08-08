import React from "react";

const PropertyTable = ({ data, template, actionButtonLabel, onSubmit }) => {
  console.log("data", data)
  const tableContainerStyle = {
    borderRadius: "8px",
    border: "1px solid #eee",
    overflow: "hidden",
    width: "100%",
    fontFamily: "Noto Sans, sans-serif",
    margin: "20px auto",
    backgroundColor:"white"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const headerStyle = {
    backgroundColor: "#6B133F1A",
    color: "#555",
    fontWeight: "600",
    textAlign: "left",
    fontSize: "14px",
    padding: "12px",
    borderBottom: "1px solid #ddd",
    width:"200px"
  };

  const cellStyle = {
    padding: "12px",
    fontSize: "14px",
    color: "#333",
    borderBottom: "1px solid #eee",
  };

  const actionButtonStyle = {
    backgroundColor: "#6B133F",
    color: "white",
    padding: "6px 16px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  };



  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Property ID</th>
            {/* <th style={headerStyle}>House No</th>
            <th style={headerStyle}>Ward</th> */}
            <th style={headerStyle}>Owner Name</th>
            <th style={headerStyle}>Address</th>
            <th style={headerStyle}>Due Amount</th>
            <th style={headerStyle}>Date</th>
            {/* <th style={headerStyle}>City</th> */}
            <th style={headerStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td style={cellStyle}>{item.property_id}</td>
              <td style={cellStyle}>{item.owner_name}</td>
              <td style={cellStyle}>{item.property_address}</td>
              <td style={cellStyle}>₹{item.total_due?.toLocaleString()}</td>
              <td style={cellStyle}>{item.bil_due__date}</td>
              <td style={cellStyle}>
                <button style={actionButtonStyle} onClick={() => onSubmit?.(item)}>
                  {actionButtonLabel}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
