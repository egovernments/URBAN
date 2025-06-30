


import React from "react";
import {
    Loader, Card,
    SubmitBar,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
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
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "100%",
        letterSpacing: "0%",
        textDecoration: "underline",
        textDecorationStyle: "solid",
        textDecorationOffset: "0%",
        textDecorationThickness: "0%",
        color: "#4729A3",
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
        backgroundColor: "#f2f2f2",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        color: "#000000",
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
        border: "1px solid #4729A3",
        borderRadius: "12px",
        cursor: "pointer",
        // width: "202px",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "3%",
        textAlign: "center",
        color: "#4729A3",
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#4729A3",
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
    return (
        <Card>
            <button style={styles.downloadBtn}>⬇ Download</button>

            {/* Property Details */}
            <div style={styles.row}>
                <InputField label="Property id" value="123456" />
                <InputField label="Old Property id" value="567889" />
                <InputField label="Rate zone" value="5" />
            </div>

            {/* Owner 1 */}
            <div style={styles.sectionHeader}>Owner 1</div>
            <div style={styles.rowOwnerName}>
                <InputFieldNew label="Name" value="Mr. john" />
                <div style={{ marginBottom: "20px" }}></div>
                <InputFieldNew label="Father name" value="Mr. pradeep" />
                <div style={{ marginBottom: "20px" }}></div>
                <InputFieldNew label="Address" value="Adarsh nagar, zone 45" />

            </div>
            <div style={styles.row}>
                <InputField label="Zone" value="45" />
                <InputField label="Ward" value="3" />
                <InputField label="Colony" value="sikhar nagar" />
            </div>
            <div style={styles.row}>
                <InputField label="Pin" value="1104778" />
                <InputField label="Mobile no" value="9874XXXX" />
                <InputField label="Aadhaar" value="1234567XXXX" />
            </div>
            <div style={styles.row}>
                <InputField label="Email" value="Demo@gmail.com" />
                <InputField label="Exemption" value="4" />
                <InputField label="Date" value="22/05/2025" />
            </div>



            {/* Table 1 */}
            <div style={styles.sectionHeader}>अचल विवरण</div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {["वर्ष", "उपयोग प्रकार", "उपयोगकर्ता", "मंजिल", "निर्माण प्रकार", "क्षेत्र", "दर", "वार्षिक मूल्य(ALV)"].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[2014, 2015].map((year) => (
                        <tr key={year}>
                            <td style={styles.td}>{year}-15</td>
                            <td style={styles.td}>Residential</td>
                            <td style={styles.td}>Self occupied</td>
                            <td style={styles.td}>Ground Floor</td>
                            <td style={styles.td}>Open land</td>
                            <td style={styles.td}>1000</td>
                            <td style={styles.td}>9.0</td>
                            <td style={styles.td}>9000.0</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Table 2 */}
            <div style={styles.sectionHeader}>Property tax summary</div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {["Year", "ALV", "TPV", "PTAX", "SAM TAX", "URBAN TAX", "EDU TAX", "JAL ABHI", "JAL NIKAS", "SEWA KAR", "TOTAL TAX", "REB", "PENALTY", "NET TAX"].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[2014, 2015].map((year) => (
                        <tr key={year}>
                            <td style={styles.td}>{year}-15</td>
                            <td style={styles.td}>9000.0</td>
                            <td style={styles.td}>9000.0</td>
                            <td style={styles.td}>270</td>
                            <td style={styles.td}>270</td>
                            <td style={styles.td}>90</td>
                            <td style={styles.td}>180</td>
                            <td style={styles.td}>27</td>
                            <td style={styles.td}>54</td>
                            <td style={styles.td}>10</td>
                            <td style={styles.td}>901</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>135</td>
                            <td style={styles.td}>1036</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={13} style={{ ...styles.td, fontWeight: "bold" }}>TOTAL</td>
                        <td style={styles.td}>1036</td>
                    </tr>
                </tbody>
            </table>
            <button style={styles.confirmBtn}>Confirm</button>
        </Card>
    );
};

export default PropertyForm;
