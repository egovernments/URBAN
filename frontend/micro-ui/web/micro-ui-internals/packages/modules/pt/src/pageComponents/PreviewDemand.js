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
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            padding: "10px"
        },
        '@media (max-width: 630px)': {
            padding: "8px"
        }
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        gap: "16px",
        width: "100%",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            flexDirection: "column",
            gap: "12px"
        },
        '@media (max-width: 630px)': {
            gap: "8px",
            marginBottom: "12px"
        }
    },
    field: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minWidth: "280px",
        width: "100%",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            minWidth: "100%"
        },
        '@media (max-width: 630px)': {
            minWidth: "auto",
            width: "100%"
        }
    },
    input: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "100%",
        '@media (max-width: 630px)': {
            padding: "8px",
            fontSize: "13px",
            height: "40px"
        }
    },
    label: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        color: "#282828",
        marginBottom: "4px",
        wordWrap: "break-word",
        '@media (max-width: 768px)': {
            fontSize: "13px"
        },
        '@media (max-width: 630px)': {
            fontSize: "12px",
            lineHeight: "18px"
        }
    },
    sectionHeader: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "16px",
        marginTop: "20px",
        '@media (max-width: 768px)': {
            fontSize: "15px",
            marginTop: "16px",
            marginBottom: "12px"
        }
    },
    sectionHeaderDemand: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "22px",
        lineHeight: "100%",
        color: "#6b133f",
        marginBottom: "20px",
        '@media (max-width: 768px)': {
            fontSize: "18px",
            marginBottom: "16px"
        }
    },
    tableContainer: {
        width: "100%",
        overflowX: "auto",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        '@media (max-width: 768px)': {
            fontSize: "11px"
        }
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "800px",
        '@media (max-width: 768px)': {
            minWidth: "600px"
        }
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px 4px",
        backgroundColor: "#6b133f",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "white",
        whiteSpace: "nowrap",
        '@media (max-width: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    td: {
        border: "1px solid #ccc",
        padding: "8px 4px",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        color: "#000000",
        whiteSpace: "nowrap",
        '@media (max-width: 768px)': {
            padding: "6px 3px",
            fontSize: "10px"
        }
    },
    downloadBtn: {
        padding: "6px 12px",
        background: "white",
        border: "1px solid #6b133f",
        borderRadius: "12px",
        cursor: "pointer",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        color: "#6b133f",
        boxSizing: "border-box",
        '@media (max-width: 768px)': {
            width: "100%",
            fontSize: "11px"
        },
        '@media (max-width: 630px)': {
            padding: "8px 12px",
            fontSize: "10px"
        }
    },
    cardD: {
        backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        padding: "16px",
        marginBottom: "22px",
        borderRadius: "12px",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        '@media (max-width: 768px)': {
            padding: "12px",
            marginBottom: "16px"
        },
        '@media (max-width: 630px)': {
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "8px"
        }
    },
    buttonContainer: {
        display: "flex",
        gap: "12px",
        marginLeft: "auto",
        marginTop: "20px",
        '@media (max-width: 768px)': {
            flexDirection: "column",
            marginLeft: "0",
            gap: "8px"
        }
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#6b133f",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        whiteSpace: "nowrap",
        '@media (max-width: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    },
    bottomText: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
        '@media (max-width: 768px)': {
            fontSize: "11px"
        }
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        boxSizing: "border-box"
    },
    modalContent: {
        background: "#fff",
        borderRadius: "8px",
        padding: "40px",
        textAlign: "center",
        width: "500px",
        maxWidth: "100%",
        '@media (max-width: 768px)': {
            padding: "24px",
            width: "100%",
            maxWidth: "350px"
        }
    },
    modalButtonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        '@media (max-width: 768px)': {
            flexDirection: "column",
            gap: "12px"
        }
    },
    modalButton: {
        backgroundColor: "#6b133f",
        color: "#fff",
        padding: "8px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        '@media (max-width: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    }
};

// Responsive InputField component
const InputField = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.input} value={value} readOnly />
    </div>
);

const PropertyForm = () => {
    const history = useHistory();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
    const tenantId = userInfo1?.tenantId;
    const mutationUpdate = Digit.Hooks.pt.usePropertyAPI(tenantId, false);
    const location = useLocation();
    const { data, proOwnerDetail, documents, checkboxes, rateZones, owners, unit, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress } = location.state || {};
    const calculation = data?.Calculation?.[0];

    const propertyFYDetails = calculation?.propertyFYDetails || [];
    const taxSummaries = calculation?.propertyFYTaxSummaries || [];
    const ownersDetail = proOwnerDetail?.owners || [];
    const address = proOwnerDetail?.address || {};

    const handleGobackEdit = () => {
        history.push({
            pathname: "/digit-ui/employee/pt/new-application",
            state: {
                generalDetails: {
                    id: proOwnerDetail.id,
                    registryId: proOwnerDetail.registryId,
                    propertyId: proOwnerDetail.propertyId,
                    oldPropertyId: proOwnerDetail.oldPropertyId,
                    creationReason: proOwnerDetail.creationReason,
                    propertyType: proOwnerDetail.propertyType,
                    ownershipCategory: proOwnerDetail.ownershipCategory,
                    usageCategory: proOwnerDetail.usageCategory,
                    noOfFloors: proOwnerDetail.noOfFloors,
                    landArea: proOwnerDetail.landArea,
                    source: proOwnerDetail.source,
                    channel: proOwnerDetail.channel,
                    acknowldgementNumber: proOwnerDetail.acknowldgementNumber,
                    accountId: proOwnerDetail.accountId,
                    status: proOwnerDetail.status,
                },
                addressDetailsSet: proOwnerDetail.address,
                ownerDetails: proOwnerDetail.owners,
                unitDetails: proOwnerDetail.units,
                propertyDocuments: proOwnerDetail.documents,
                additionalDetails: proOwnerDetail.additionalDetails,
                workflow: proOwnerDetail.workflow,
                processInstance: proOwnerDetail.processInstance,
            },
        });
    };

    const handleSubmitUpdate = async () => {
        const payload = {
            Property: {
                updateIMC: true,
                id: proOwnerDetail.address?.id,
                registryId: proOwnerDetail.registryId,
                essentialTax: propertyDetails.essentialTax?.code,
                propertyId: proOwnerDetail?.propertyId,
                accountId: proOwnerDetail?.accountId,
                acknowldgementNumber: proOwnerDetail?.acknowldgementNumber,
                status: proOwnerDetail?.status,
                tenantId: userInfo1?.tenantId,
                oldPropertyId: assessmentDetails?.oldPropertyId,
                address: {
                    city: "CityA",
                    locality: {
                        code: addressDetails.address?.colony?.code || "SUN02",
                        name: addressDetails.address?.colony?.name || "map with zone"
                    },
                    zone: addressDetails.address?.zone?.code || "SUN02",
                    street: addressDetails.address?.address || "main",
                    doorNo: addressDetails.address?.doorNo || "23",
                    pincode: addressDetails.address?.pincode || "",
                    ward: addressDetails.address?.ward?.code || "1",
                    documents: []
                },
                ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",
                owners: owners?.map((owner, index) => ({
                    salutation: owner.title || "mr",
                    title: "title",
                    name: owner.name || `Owner ${index + 1}`,
                    salutationHindi: owner.hindiTitle,
                    hindiName: owner.hindiName || "",
                    fatherOrHusbandName: owner.fatherHusbandName || "UnitTest",
                    gender: "MALE",
                    aadhaarNumber: owner.aadhaar || "",
                    altContactNumber: owner.altNumber || "",
                    isCorrespondenceAddress: correspondenceAddress,
                    mobileNumber: owner.mobile || "9999999999",
                    emailId: owner.email || "",
                    ownerType: propertyDetails.exemption.code,
                    permanentAddress: addressDetails.address || "23, main, PG_CITYA_REVENUE_SUN20, City A, ",
                    relationship: owner.relationship || "FATHER",
                    samagraId: owner.samagraID || "Samagra ID",
                    documents: [
                        {
                            fileStoreId: documents.ownershipDoc?.fileStoreId || "45a107bf-358e-4527-9118-5beac81abfd6",
                            documentType: "OWNER.SPECIALCATEGORYPROOF.BPLDOCUMENT",
                        },
                        {
                            fileStoreId: documents.photoId?.fileStoreId || "5d7b1c69-cb1e-4467-a5a2-77de5f124f3f",
                            documentType: "OWNER.IDENTITYPROOF.AADHAAR",
                        },
                    ],
                })),
                documents: [
                    {
                        documentType: "OWNER.IDENTITYPROOF.VOTERID",
                        fileStoreId: documents.photoId?.fileStoreId,
                        documentUid: documents.photoId?.documentUid
                    },
                    {
                        documentType: "OWNER.REGISTRATIONPROOF.SALEDEED",
                        fileStoreId: documents.sellersRegistry?.fileStoreId,
                        documentUid: documents.sellersRegistry?.documentUid
                    },
                    {
                        documentType: "OWNER.SPECIALCATEGORYPROOF.BPLDOCUMENT",
                        fileStoreId: documents.ownershipDoc?.fileStoreId,
                        documentUid: documents.ownershipDoc?.documentUid
                    },
                    {
                        documentType: "OWNER.USAGEPROOF.ELECTRICITYBILL",
                        fileStoreId: documents.lastTaxReceipt?.fileStoreId,
                        documentUid: documents.lastTaxReceipt?.documentUid
                    }
                ],
                units: unit.map(unit => ({
                    usageCategory: unit.usageType,
                    usesCategoryMajor: unit.usageType,
                    occupancyType: unit.usageFactor,
                    constructionDetail: {
                        builtUpArea: unit.area,
                        constructionType: unit.constructionType
                    },
                    floorNo: parseInt(unit.floorNo),
                    rateZone: rateZones?.[0]?.code,
                    roadFactor: assessmentDetails?.roadFactor?.code,
                    fromYear: unit.fromYear,
                    toYear: unit.toYear
                })),
                landArea: assessmentDetails?.plotArea,
                propertyType: proOwnerDetail?.propertyType,
                noOfFloors: parseInt(unit.floorNo) || 1,
                superBuiltUpArea: null,
                usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",
                additionalDetails: {
                    inflammable: false,
                    heightAbove36Feet: false,
                    propertyType: {
                        i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
                        code: proOwnerDetail?.propertyType
                    },
                    mobileTower: checkboxes?.mobileTower,
                    bondRoad: checkboxes?.broadRoad,
                    advertisement: checkboxes?.advertisement,
                    builtUpArea: null,
                    noOfFloors: {
                        i18nKey: "PT_GROUND_FLOOR_OPTION",
                        code: 0
                    },
                    noOofBasements: {
                        i18nKey: "PT_NO_BASEMENT_OPTION",
                        code: 0
                    },
                    unit: unit.map(unit => ({
                        usageCategory: unit.usageType,
                        usesCategoryMajor: unit.usageType,
                        occupancyType: unit.usageFactor,
                        constructionDetail: {
                            builtUpArea: unit.area,
                            constructionType: unit.constructionType
                        },
                        floorNo: parseInt(unit.floorNo),
                        rateZone: rateZones?.[0]?.code,
                        roadFactor: assessmentDetails?.roadFactor?.code,
                        fromYear: unit.fromYear,
                        toYear: unit.toYear
                    })),
                    basement1: null,
                    basement2: null
                },
                workflow: {
                    action: "OPEN",
                    moduleName: "PT",
                    businessService: "PT.UPDATE"
                },
                channel: "CFC_COUNTER",
                creationReason: "UPDATE",
                source: "MUNICIPAL_RECORDS"
            },
            RequestInfo: {
                apiId: "Rainmaker",
                authToken: userInfo1?.authToken,
                userInfo: {
                    id: userInfo1?.id,
                    uuid: userInfo1?.uuid,
                    userName: userInfo1?.userName,
                    name: userInfo1?.name,
                    mobileNumber: userInfo1?.mobileNumber,
                    emailId: userInfo1?.emailId,
                    locale: userInfo1?.locale,
                    type: userInfo1?.type,
                    roles: userInfo1?.roles,
                    active: userInfo1?.active !== false,
                    tenantId: userInfo1?.tenantId,
                    permanentCity: userInfo1?.permanentCity
                },
                msgId: "1749797151521|en_IN",
                plainAccessRequest: {}
            }
        };

        mutationUpdate.mutate(payload, {
            onSuccess: (data) => {
                const property = data?.Properties?.[0];
                if (property) {
                    setAcknowledgmentNumber(property.acknowldgementNumber);
                    setShowConfirmPopup(false);
                    setShowSuccessPopup(true);
                }
            },
            onError: (err) => {
                alert("Submission failed");
            },
        });
    };

    return (
        <div style={{
            position: "relative",
            marginTop: "20px",
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden",
            boxSizing: "border-box",
            ...styles.container
        }}>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                <button style={styles.downloadBtn}>⬇ Download</button>
            </div>

            <div style={styles.cardD}>
                <div style={styles.sectionHeaderDemand}>Demand</div>
                <div style={styles.row}>
                    <InputField label="Rate zone" value={proOwnerDetail?.units[0].rateZone || "N/A"} />
                </div>

                {ownersDetail.map((owner, index) => (
                    <React.Fragment key={owner.uuid || index}>
                        <div style={styles.sectionHeader}>Owner {index + 1}</div>
                        <div style={styles.row}>
                            <InputField label="Name" value={`${owner?.salutation || ""} ${owner?.name || "N/A"}`} />
                            <InputField label="Father name" value={owner?.fatherOrHusbandName} />
                            <InputField label="Address" value={owner?.permanentAddress || "N/A"} />
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
                <div style={styles.sectionHeader}>Tax Details</div>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {["Year", "Usage Type", "User", "Floor Number", "Construction Type", "Area (Sq feet)", "Rate", "ALV"].map((h) => (
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
            </div>

            <div style={styles.cardD}>
                <div style={styles.sectionHeader}>Property tax summary</div>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {["Year", "TPV", "Property Tax", "Consolidated Tax", "Education Cess", "Water Cess", "Drainage Cess", "Urban Development Cess", "Service Charge", "Total Tax", "Rebate", "Penalty", "Net Tax"].map((h) => (
                                    <th key={h} style={styles.th}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {taxSummaries.map((item) => (
                                <tr key={item.year}>
                                    <td style={styles.td}>{item.year}</td>
                                    <td style={styles.td}>{item.tpv}</td>
                                    <td style={styles.td}>₹ {item.propertyTax}</td>
                                    <td style={styles.td}>₹ {item.samekit}</td>
                                    <td style={styles.td}>₹ {item.educationCess}</td>
                                    <td style={styles.td}>₹ {item.jalKar}</td>
                                    <td style={styles.td}>₹ {item.jalNikas}</td>
                                    <td style={styles.td}>₹ {item.urbanTax}</td>
                                    <td style={styles.td}>₹ {item.sevaKar}</td>
                                    <td style={styles.td}>₹ {item.totalTax}</td>
                                    <td style={styles.td}>₹ {Math.abs(item.rebate)}</td>
                                    <td style={styles.td}>₹ {item.penalty}</td>
                                    <td style={styles.td}>{item.netTax}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={12} style={{ ...styles.td, fontWeight: "bold", textAlign: "right" }}>TOTAL</td>
                                <td style={styles.td}>
                                    ₹ {taxSummaries.reduce((sum, item) => sum + (item.netTax || 0), 0).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={styles.bottomText}>
                    All values mentioned are in "₹" (Indian Rupees).
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.confirmBtn} onClick={() => handleGobackEdit(true)}>Back</button>
                    <button style={styles.confirmBtn} onClick={() => setShowConfirmPopup(true)}>Confirm</button>
                </div>
            </div>

            {showConfirmPopup && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <p style={{ fontSize: "16px", color: "#3E3E3E", marginBottom: "30px" }}>
                            Are you sure you want to submit this form?
                        </p>
                        <div style={styles.modalButtonContainer}>
                            <button style={styles.modalButton} onClick={() => setShowConfirmPopup(false)}>
                                Back
                            </button>
                            <button style={styles.modalButton} onClick={() => handleSubmitUpdate()}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div style={styles.modalOverlay}>
                    <div style={{
                        ...styles.modalContent,
                        width: "350px"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#000",
                            borderRadius: "50%",
                            border: "4px solid #00A859",
                            margin: "0 auto 20px auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "24px" }}>✔</span>
                        </div>
                        <p style={{ fontWeight: "600", fontSize: "16px", marginBottom: "10px" }}>
                            Application Submitted Successfully
                        </p>
                        <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>
                            Application Number<br />
                            {acknowledgmentNumber || "N/A"}
                        </p>
                        <button
                            style={styles.modalButton}
                            onClick={() => {
                                window.location.href = "/digit-ui/employee";
                            }}
                        >
                            Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyForm;