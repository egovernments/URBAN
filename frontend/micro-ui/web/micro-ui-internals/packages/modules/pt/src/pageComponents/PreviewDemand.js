


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
        display: "block",
        // flexDirection: "column",
        alignItems: "center",

    },
    input: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "300px"

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
      sectionHeaderDemand: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "22px",
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
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
    const tenantId = userInfo1?.tenantId;
    const mutationUpdate = Digit.Hooks.pt.usePropertyAPI(tenantId, false);
    const location = useLocation();
    const { data, proOwnerDetail, documents, checkboxes, rateZones, owners, unit, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress } = location.state || {}; // receive full object
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
                    permanentAddress:
                        addressDetails.address || "23, main, PG_CITYA_REVENUE_SUN20, City A, ",
                    relationship: owner.relationship || "FATHER",
                    samagraId: owner.samagraID || "Samagra ID",
                    documents: [
                        {
                            fileStoreId:
                                documents.ownershipDoc?.fileStoreId || "45a107bf-358e-4527-9118-5beac81abfd6",
                            documentType: "OWNER.SPECIALCATEGORYPROOF.BPLDOCUMENT",
                        },
                        {
                            fileStoreId:
                                documents.photoId?.fileStoreId || "5d7b1c69-cb1e-4467-a5a2-77de5f124f3f",
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
                // usageCategory: unit.usageType || "RESIDENTIAL",
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
                    //   setProOwnerDetail(property);
                    setAcknowledgmentNumber(property.acknowldgementNumber);
                    //   setPropertyId(property.propertyId);
                    //   setStatus(property.status);
                    //   // setShowSuccessModal(true);
                    //   setShowPreviewButton(true);
                    setShowConfirmPopup(false);
                    setShowSuccessPopup(true);
                }
            },
            onError: (err) => {
                alert(t("Submission failed"));
            },
        });
    };
    return (
        <div style={{ position: "relative" }}>
            <button style={styles.downloadBtn}>⬇ Download</button>


            <div style={styles.cardD}>
                <div style={styles.sectionHeaderDemand}>Demand</div>

                <div style={styles.row}>
                    {/* <InputField label="Property id" value={calculation?.serviceNumber || "N/A"} />
                <InputField label="Old Property id" value="567889" /> */}
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
                {/* Table 1 - Property Details */}
                <div style={styles.sectionHeader}>Tax Details</div>
                <div style={{ overflowX: 'auto', width: '100%' }}>
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
            </div>
            <div style={styles.cardD}>
                {/* Table 2 - Tax Summary */}
                <div style={styles.sectionHeader}>Property tax summary</div>
                <div style={{ overflowX: 'auto', width: '100%' }}>
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
                                    <td style={styles.td}>₹ {Math.abs(item.rebate)}</td>
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
                </div>
                <div style={styles.bottomText}>
                    All values mentioned are in “₹” (Indian Rupees).
                </div>
                <div style={{ display: "flex", width: "224px", marginLeft: "auto" }}>
                    <button style={styles.confirmBtn} onClick={() => handleGobackEdit(true)}>Back</button>
                    <button style={styles.confirmBtn} onClick={() => setShowConfirmPopup(true)}>Confirm</button>
                </div>
            </div>

            {showConfirmPopup && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "40px",
                        textAlign: "center",
                        width: "500px",
                        maxWidth: "90%"
                    }}>
                        <p style={{ fontSize: "16px", color: "#3E3E3E", marginBottom: "30px" }}>
                            Are you sure you want to submit this form?
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                            <button
                                style={{
                                    backgroundColor: "#6b133f",
                                    color: "#fff",
                                    padding: "8px 20px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => setShowConfirmPopup(false)}
                            >
                                Back
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#6b133f",
                                    color: "#fff",
                                    padding: "8px 20px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    handleSubmitUpdate();

                                    // Add actual form submission logic here if needed
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessPopup && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, width: "100vw", height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 10000
                }}>
                    <div style={{
                        background: "#fff",
                        border: "1px solid #000",
                        padding: "40px 20px",
                        borderRadius: "8px",
                        textAlign: "center",
                        width: "350px",
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
                            style={{
                                backgroundColor: "#6b133f",
                                color: "#fff",
                                padding: "10px 30px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                            onClick={() => {
                                // 🏠 Navigate home or reset form here
                                window.location.href = "/digit-ui/employee"; // or use React Router
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