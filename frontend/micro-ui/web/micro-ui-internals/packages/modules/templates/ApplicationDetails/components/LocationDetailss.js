
import React, { useState, useEffect } from "react";
import IndexStyle from "./IndexStyle";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const LocationDetails = ({ t = (label) => label, handleFileChange, formErrors = {} }) => {
    const [selectedFiles, setSelectedFiles] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onFileChange = (key, file) => {
        handleFileChange(key, file);
        setSelectedFiles((prev) => ({ ...prev, [key]: file?.name || "" }));
    };

    const renderSvg = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            stroke="#6b133f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
        >
            <path d="M21.44 11.05L12.97 19.51a5.25 5.25 0 01-7.42-7.42l8.48-8.48a3.5 3.5 0 014.95 4.95l-8.49 8.48a1.75 1.75 0 01-2.47-2.47l7.78-7.78" />
        </svg>
    );

    const renderFileInput = (id, label, isRequired = false) => (
        <div style={style2.fileBox}>
            <div style={style2.iconBox}>{renderSvg()}</div>
            <div style={style2.labelArea}>
                <label style={style2.fileLabel}>
                    {t(label)} {isRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <div style={style2.descText}>JPG, PNG or PDF, file size no more than 2MB</div>
            </div>

            <input
                id={id}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => onFileChange(id, e.target.files[0])}
            />
            <div style={style2.buttonArea}>
                <label htmlFor={id} style={style2.selectBtn}>SELECT FILE</label>
                <div style={style2.selectedFileText}>
                    {selectedFiles[id] || "No file selected"}
                </div>
            </div>

            {formErrors?.[id] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{formErrors[id]}</p>
            )}
        </div>
    );

    return (
        <div>



            <div style={style2.grid}>
                <div style={style2.flex20}><label style={style2.label}>Latitude<span style={{ color: "red" }}>*</span></label><TextInput style={style2.widthInput}  value="45.5" readonly /></div>
                <div style={style2.flex20}><label style={style2.label}>Longitude<span style={{ color: "red" }}>*</span></label><TextInput style={style2.widthInput}  value="122.7" readonly /></div>
                <div style={style2.flex50}>   {renderFileInput("ownershipDoc", "Property Photograps", true)} </div>




                <label style={style2.poppinsTextStyle}>
                    <input
                        style={{ marginRight: "10px" }}
                        type="checkbox"
                    //   checked={checkboxes.selfDeclaration}
                    //   onChange={() => handleCheckboxChange("selfDeclaration")}
                    />{"    "}
                    Message To Be Confirmed For Bill Collector
                </label>
                {formErrors?.selfDeclaration && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                        {formErrors.selfDeclaration}
                    </p>
                )}


            </div>
        </div>



    );
};

export default LocationDetails;

// Inline styles
const style2 = {
    checkboxLabel: { padding: "10px" },
    poppinsTextStyle: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '10px',
        lineHeight: '24px',
        letterSpacing: '0%',
    },
    widthInput: {
        width: "100%",
        height: "35px",
        borderWidth: "1px",
        borderRadius: "6px",
        // border: "1px solid #D9D9D9",
        // boxShadow: "0px 4px 4px 0px #00000040",
        // background: "#A3BBF347",
        background: "#D2D2D280",
        border: "0.5px solid #D2D2D280",
        color: "black"
        // padding: "6px"
    },
    label: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0',
        color: '#282828',
        width: "200px"
    },
    input: {
        width: "100%",
        height: "40px",
        borderWidth: "1px",
        borderRadius: "6px",
        // border: "1px solid #D9D9D9",
        boxShadow: "0px 4px 4px 0px #00000040",
        background: "#A3BBF347",
        padding: "10px",
    },
    flex30: {
        flex: "1 1 30%",
        display: "flex",
        flexDirection: "column",

        position: "relative",
        minHeight: "90px",

    },
      flex20: {
        flex: "1 1 20%",
        display: "flex",
        flexDirection: "column",

        position: "relative",
        minHeight: "90px",

    },
     flex50: {
        flex: "1 1 50%",
        display: "flex",
        flexDirection: "column",

        position: "relative",
        minHeight: "90px",

    },
    grid: {
        // display: "grid",
        // gridTemplateColumns: "1fr 1fr 1fr",
        // gap: "16px",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
    },
    wrapper: {
        background: "#fff",
        // padding: "20px",
        borderRadius: "8px",
        // boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        // margin: "10px 0",
    },
    header: {
        fontWeight: 700,
        fontSize: "18px",
        marginBottom: "5px",
        color: "#6B133F",
    },
    subHeader: {
        fontSize: "12px",
        color: "#555",
        marginBottom: "20px",
    },
    gridContainer: {
        display: "grid",
        gap: "20px",
    },
    fileBox: {
        border: "2px dashed #aaa",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "relative",
        minHeight: "90px",
    },
    iconBox: {
        flexShrink: 0,
    },
    labelArea: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
    },
    fileLabel: {
        fontWeight: "600",
        fontSize: "14px",
        marginBottom: "4px",
        color: "#333",
    },
    descText: {
        fontSize: "12px",
        color: "#888",
    },
    buttonArea: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
    },
    selectBtn: {
        backgroundColor: "#fff",
        color: "#6B133F",
        border: "1px solid #6B133F",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "center",
    },
    selectedFileText: {
        fontSize: "12px",
        color: "#444",
        maxWidth: "140px",
        textAlign: "right",
        wordBreak: "break-word",
    },
};