


import React, { useState } from "react";
import {
    Loader, Card,
    SubmitBar,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
import { useLocation, useHistory } from "react-router-dom";
const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "16px",
        justifyContent: "space-between",
        width: "100%"
    },
    rowOwnerName: {
        // display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "16px",
        // justifyContent: "space-between",
        width: "100%"
    },
    field: {
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",

    },
    input: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",

    },
    inputs: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "300px",
    },
    label: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "0%",
        color: "#282828",
        width: "100px"
    },
    sectionHeader: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        letterSpacing: "0%",
        // textDecoration: "underline",
        textDecorationStyle: "solid",
        textDecorationOffset: "0%",
        textDecorationThickness: "0%",
        color: "#6b133f",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        marginBottom: "20px",
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#6b133f",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        color: "white",
    },
    td: {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        color: "#000000",
    },
    downloadBtn: {
        float: "right",
        marginBottom: "10px",
        padding: "6px 12px",
        background: "white",
        border: "1px solid #6b133f",
        borderRadius: "12px",
        cursor: "pointer",
        // width: "202px",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "3%",
        textAlign: "center",
        color: "#6b133f",
        position: "absolute",
        right: "0px",
        top: "-42px",
    },
    cardD: {
        backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        padding: "16px",
        // border: "1px solid #000000",
        marginBottom: "22px",
        borderRadius: "12px",
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#6b133f",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        // float: "right",
        marginTop: "20px",
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "100%",
        letterSpacing: "3%",
        color: "#FFFFFF",
        display: "flex",
        marginLeft: "auto"
    },
    bottomText: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
    },
};

const InputField = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.input} value={value} readOnly />
    </div>
);
const InputFieldNew = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.inputs} value={value} readOnly />
    </div>
);
const PropertyForm = () => {
    const history = useHistory();
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

    const location = useLocation();
    const { data, applicationData } = location.state || {}; // receive full object
    const calculation = data?.Calculation?.[0];

    const propertyFYDetails = calculation?.propertyFYDetails || [];
    const taxSummaries = calculation?.propertyFYTaxSummaries || [];
    console.log("propertyDetail", applicationData)
    const ownersDetail = applicationData?.owners || [];
    const address = applicationData?.address || {};


    return (
        <div style={{ position: "relative" }}>
            <button style={styles.downloadBtn}>⬇ Download</button>


            <div style={styles.cardD}>
                <div style={styles.row}>
                    {/* <InputField label="Property id" value={calculation?.serviceNumber || "N/A"} />
                <InputField label="Old Property id" value="567889" /> */}
                    <InputField label="Rate zone" value={applicationData?.units[0].rateZone || "N/A"} />
                </div>
            </div>
            <div style={styles.cardD}>
                {ownersDetail.map((owner, index) => (
                    <React.Fragment key={owner.uuid || index}>
                        <div style={styles.sectionHeader}>Owner {index + 1}</div>
                        <div style={styles.rowOwnerName}>
                            <InputFieldNew label="Name" value={`${owner?.salutation || ""} ${owner?.name || "N/A"}`} />
                            <div style={{ marginBottom: "20px" }}></div>
                            <InputFieldNew label="Father name" value={owner?.fatherOrHusbandName} />
                            <div style={{ marginBottom: "20px" }}></div>
                            <InputFieldNew label="Address" value={owner?.permanentAddress || "N/A"} />
                        </div>
                        <div style={styles.row}>
                            <InputField label="Zone" value={address?.zone || "N/A"} />
                            <InputField label="Ward" value={address?.ward || "N/A"} />
                            <InputField label="Colony" value={address?.locality?.name || "N/A"} />
                        </div>
                        <div style={styles.row}>
                            <InputField label="Pin" value={address?.pincode || "N/A"} />
                            <InputField label="Mobile no" value={owner?.mobileNumber || "N/A"} />
                            <InputField label="Aadhaar" value={owner?.aadhaarNumber || "N/A"} />
                        </div>
                        <div style={styles.row}>
                            <InputField label="Email" value={owner?.emailId || "N/A"} />
                            <InputField label="Exemption" value={"0"} />
                            <InputField label="Date" value={owner?.createdDate ? new Date(owner.createdDate).toLocaleDateString("en-GB") : "N/A"} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div style={styles.cardD}>
                {/* Table 1 - Property Details */}
                <div style={styles.sectionHeader}>Tax Details</div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {["Year", "Usage Type", "User", " Floor Number", "Construction Type", " Area (Sq feet)", "Rate", "ALV"].map((h) => (
                                <th key={h} style={styles.th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {propertyFYDetails.map((item) => (
                            <tr key={item.year}>
                                <td style={styles.td}>{item.year}</td>
                                <td style={styles.td}>{item.usageType}</td>
                                <td style={styles.td}>{item.usageFactor}</td>
                                <td style={styles.td}>{item.floorNo}</td>
                                <td style={styles.td}>{item.constructionType}</td>
                                <td style={styles.td}>{item.area}</td>
                                <td style={styles.td}>{item.factor}</td>
                                <td style={styles.td}>{item.alv}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={styles.cardD}>
                {/* Table 2 - Tax Summary */}
                <div style={styles.sectionHeader}>Property tax summary</div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {["Year", "ALV", "TPV", "PTAX", "Sam Tax", "Urban Tax", "Edu Tax", "Jal Abhi", "Jal Nikas", "Sewa Kar", "Total Tax", "Reb", "Penality", "Net Tax"].map((h) => (
                                <th key={h} style={styles.th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {taxSummaries.map((item) => (
                            <tr key={item.year}>
                                <td style={styles.td}>{item.year}</td>
                                <td style={styles.td}>{item.alv}</td>
                                <td style={styles.td}>{item.tpv}</td>
                                <td style={styles.td}>₹ {item.propertyTax}</td>
                                <td style={styles.td}>₹ {item.samekit}</td>
                                <td style={styles.td}>₹ {item.urbanTax}</td>
                                <td style={styles.td}>₹ {item.educationCess}</td>
                                <td style={styles.td}>₹ {item.jalKar}</td>
                                <td style={styles.td}>₹ {item.jalNikas}</td>
                                <td style={styles.td}>₹ {item.sevaKar}</td>
                                <td style={styles.td}>₹ {item.totalTax}</td>
                                <td style={styles.td}>₹ {item.rebate}</td>
                                <td style={styles.td}>₹ {item.penalty}</td>
                                <td style={styles.td}>₹ {item.netTax}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={13} style={{ ...styles.td, fontWeight: "bold", textAlign: "right" }}>TOTAL</td>
                            <td style={styles.td}>
                                ₹ {
                                    taxSummaries.reduce((sum, item) => sum + (item.netTax || 0), 0).toFixed(2)
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={styles.bottomText}>
                    All values mentioned are in “₹” (Indian Rupees).
                </div>
                <div style={{ display: "flex", width: "224px", marginLeft: "auto" }}>
                    <button style={styles.confirmBtn} onClick={() => window.history.back()}>
                        Back
                    </button>
                    {/* <button style={styles.confirmBtn} onClick={() => setShowConfirmPopup(true)}>Confirm</button> */}
                </div>
            </div>


        </div>

    );
};

export default PropertyForm;