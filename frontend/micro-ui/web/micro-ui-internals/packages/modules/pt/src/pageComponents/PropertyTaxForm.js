
import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";
const PropertyTaxForm = () => {
    const location = useLocation();
    const propertyData = location.state?.propertyData?.searchData;
    const propertyId = propertyData?.id;
    console.log("Property Data:", propertyData);
       const [supportingDocuments, setSupportingDocuments] = useState([]);

  
    // Initialize form state with all possible fields
    const [formData, setFormData] = useState({
        // Assessment Info
        assessmentYear: '',
        
        // Ownership Details
        ownershipCategory: 'INDIVIDUAL.SINGLEOWNER',
        owner: {
            salutation: 'Mr',
            name: '',
            nameHindi: '',
            fatherOrHusbandName: '',
            relationship: '',
            email: '',
            mobileNumber: '',
            alternateNumber: '',
            aadharNumber: '',
            samagraId: '',
            ownerType: '',
            gender: 'MALE'
        },
        
        // Property Address
        address: {
            doorNo: '',
            street: '',
            pincode: '',
            locality: '',
            ward: '',
            zone: '',
            city: '',
            landmark: ''
        },
        
        // Correspondence Address
        correspondenceAddress: '',
        sameAsPropertyAddress: false,
        
        // Assessment Details
        rateZone: '',
        roadFactor: '',
        oldPropertyId: '',
        plotArea: '',
        
        // Property Details
        propertyType: 'BUILTUP.SHAREDPROPERTY',
        usageCategory: '',
        usageFactor: '',
        floorNo: '',
        constructionType: '',
        builtUpArea: '',
        landArea: '',
        
        // Other Details
        exemptionApplicable: '',
        hasMobileTower: false,
        hasBondRoad: false,
        hasAdvertisement: false,
        remarks: '',
        
        // Documents
        documents: []
    });
 const labels = [
        "Usage type",
        "Usage factor",
        "Floor no",
        "Type of construction",
        "Area (Sq feet)",
    ];

      const handleFileChange = (e, fieldName) => {
        if (fieldName === 'Supporting Documents') {
            setSupportingDocuments([...e.target.files]);
        }
        // For other fields, we're not storing the files
    };
    // Initialize form with existing data if available
    useEffect(() => {
        if (propertyData) {
            const owner = propertyData.owners?.[0];
            const address = propertyData.address;
            const unit = propertyData.units?.[0];
            
            setFormData({
                ...formData,
                assessmentYear: propertyData.assessmentYear || '',
                ownershipCategory: propertyData.ownershipCategory || 'INDIVIDUAL.SINGLEOWNER',
                owner: {
                    salutation: owner?.gender === 'FEMALE' ? 'Mrs' : 'Mr',
                    name: owner?.name || '',
                    nameHindi: owner?.name || '', // Assuming same as English name if not available
                    fatherOrHusbandName: owner?.fatherOrHusbandName || '',
                    relationship: owner?.relationship || '',
                    email: owner?.emailId || '',
                    mobileNumber: owner?.mobileNumber || '',
                    alternateNumber: '',
                    aadharNumber: propertyData.documents?.find(d => d.documentType === 'OWNER.ADDRESSPROOF.AADHAAR')?.fileStoreId || '',
                    samagraId: '',
                    ownerType: owner?.ownerType || '',
                    gender: owner?.gender || 'MALE'
                },
                address: {
                    doorNo: address?.doorNo || '',
                    street: address?.street || '',
                    pincode: address?.pincode || '',
                    locality: address?.locality?.name || '',
                    ward: '',
                    zone: '',
                    city: address?.city || '',
                    landmark: address?.landmark || ''
                },
                correspondenceAddress: owner?.permanentAddress || '',
                oldPropertyId: propertyData.propertyId || '',
                plotArea: propertyData.landArea || '',
                propertyType: propertyData.propertyType || 'BUILTUP.SHAREDPROPERTY',
                usageCategory: unit?.usageCategory?.split('.')[3] || '',
                floorNo: unit?.floorNo || '',
                builtUpArea: unit?.constructionDetail?.builtUpArea || '',
                landArea: propertyData.landArea || '',
                exemptionApplicable: owner?.ownerType || ''
            });
        }
    }, [propertyData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.includes('.')) {
            // Handle nested objects (e.g., owner.name, address.doorNo)
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Prepare the payload according to your API schema
            const formPayload = new FormData();

        // Append supporting documents if they exist
        if (supportingDocuments.length > 0) {
            supportingDocuments.forEach((file, index) => {
                formPayload.append('supportingDocuments', file);
            });
        }
            const payload = {
                ...formData,
                propertyId: propertyId,
                tenantId: propertyData?.tenantId || 'pg.cityb',
                source: 'MUNICIPAL_RECORDS',
                creationReason: 'UPDATE',
                status: 'ACTIVE',
                units: [{
                    unitType: formData.usageCategory,
                    occupancyType: 'RENTED', // Default or from form
                    constructionDetail: {
                        builtUpArea: formData.builtUpArea
                    },
                    arv: 3425, // Should come from form if applicable
                    floorNo: formData.floorNo,
                    usageCategory: `NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.${formData.usageCategory}`
                }],
                additionalDetails: {
                    propertyType: {
                        code: formData.propertyType,
                        name: formData.propertyType.includes('BUILTUP') ? 
                              'Flat/Part of the building' : 'Other type'
                    },
                    heightAbove36Feet: false,
                    inflammable: false
                }
            };

            const response = await fetch(`/update/${propertyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Property updated successfully!');
              
            } else {
                throw new Error('Failed to update property');
            }
        } catch (error) {
            console.error('Error updating property:', error);
            alert('Error updating property. Please try again.');
        }
    };



    return (
        <Card style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                {/* Assessment Year */}
                <div style={formGroup}>
                    <label style={sectionHeader}>Select Property ULB Year of Assessment *</label>
                    <input 
                        type="text" 
                        name="assessmentYear"
                        value={formData.assessmentYear}
                        onChange={handleChange}
                        style={inputStyle} 
                        disabled
                    />
                </div>

                {/* ... file inputs ... */}
                   <div style={sectionHeader}>Attachments ( *Accepted file type : JPG/PNG/PDF **Maximum file size 2MB)</div>
                <div style={{ ...inlineRow, display: "block" }}>
                    {[
                        "Photo ID",
                        "Ownership Document",
                        "Seller registry",
                        "Latest tax paid receipt",
                        "Supporting Documents",
                    ].map((label) => (
                        <div style={{ ...formGroup, flexDirection: "row", alignItems: "center" }} key={label}>
                            <div style={{ ...labelStyle, width: "150px" }}>{label}</div>
                            <input 
                                type="file" 
                                style={inputStyle}
                                onChange={(e) => handleFileChange(e, label)}
                                accept=".jpg,.jpeg,.png,.pdf"
                                multiple={label === "Supporting Documents"}
                                required={label === "Supporting Documents" && supportingDocuments.length === 0}
                                disabled={label !== "Supporting Documents"}
                            />
                        </div>
                    ))}
                </div>
                {/* Ownership Details */}
                <div style={sectionHeader}>Ownership Details</div>
                <div style={formGroup}>
                    <label style={labelStyle}>Provide Ownership details</label>
                    <select 
                        name="ownershipCategory"
                        value={formData.ownershipCategory}
                        onChange={handleChange}
                        style={inputStyle}
                        disabled
                    >
                        <option value="INDIVIDUAL.SINGLEOWNER">Single</option>
                        <option value="INDIVIDUAL.MULTIPLEOWNERS">Joint</option>
                    </select>
                </div>

                <div style={inlineRow}>
                    {/* Owner Name (English) */}
                    <div style={formGroup}>
                        <label style={labelStyle}>Owner Name *</label>
                        <div style={{ display: "flex" }}>
                            <select
                                name="owner.salutation"
                                value={formData.owner.salutation}
                                onChange={handleChange}
                                style={{
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRight: "none",
                                    borderRadius: "4px 0 0 4px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Ms</option>
                            </select>
                            <input
                                type="text"
                                name="owner.name"
                                value={formData.owner.name}
                                onChange={handleChange}
                                style={{
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderLeft: "none",
                                    borderRadius: "0 4px 4px 0",
                                    flex: 1,
                                }}
                            />
                        </div>
                    </div>

                    {/* Owner Name (Hindi) */}
                    <div style={formGroup}>
                        <label style={labelStyle}>Owner Name (हिंदी में) *</label>
                        <div style={{ display: "flex" }}>
                            <select
                                name="owner.salutationHindi"
                                value={formData.owner.salutation}
                                onChange={handleChange}
                                style={{
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRight: "none",
                                    borderRadius: "4px 0 0 4px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Ms</option>
                            </select>
                            <input
                                type="text"
                                name="owner.nameHindi"
                                value={formData.owner.nameHindi}
                                onChange={handleChange}
                                style={{
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderLeft: "none",
                                    borderRadius: "0 4px 4px 0",
                                    flex: 1,
                                }}
                            />
                        </div>
                    </div>

                    {/* Other owner fields */}
                    {[
                        { name: 'owner.fatherOrHusbandName', label: 'Father/Husband Name' },
                        { name: 'owner.relationship', label: 'Relationship' },
                        { name: 'owner.email', label: 'Email' },
                        { name: 'owner.mobileNumber', label: 'Mobile Number' },
                        { name: 'owner.alternateNumber', label: 'Alternative Number' },
                        { name: 'owner.aadharNumber', label: 'Aadharcard' },
                        { name: 'owner.samagraId', label: 'Samagra Id' },
                    ].map((field) => (
                        <div style={formGroup} key={field.name}>
                            <label style={labelStyle}>{field.label}</label>
                            <input 
                                type="text" 
                                name={field.name}
                                value={field.name.split('.').reduce((o, i) => o[i], formData)}
                                onChange={handleChange}
                                style={inputStyle} 
                            />
                        </div>
                    ))}
                </div>

                {/* Property Address */}
                <div style={sectionHeader}>Property Address</div>
                <div style={inlineRow}>
                    {[
                        { name: 'address.doorNo', label: 'Door/House No' },
                        { name: 'address.street', label: 'Address' },
                        { name: 'address.pincode', label: 'Pincode' },
                        { name: 'address.locality', label: 'Colony' },
                        { name: 'address.ward', label: 'Ward' },
                        { name: 'address.zone', label: 'Zone' },
                    ].map((field) => (
                        <div style={formGroup} key={field.name}>
                            <label style={labelStyle}>{field.label}</label>
                            <input 
                                type="text" 
                                name={field.name}
                                value={field.name.split('.').reduce((o, i) => o[i], formData)}
                                onChange={handleChange}
                                style={inputStyle} 
                            />
                        </div>
                    ))}
                </div>

                {/* Correspondence Address */}
                <div style={sectionHeader}>Correspondence Address</div>
                <div style={formGroup}>
                    <label style={labelStyle}>Correspondence address</label>
                    <textarea 
                        name="correspondenceAddress"
                        value={formData.correspondenceAddress}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: "60px" }} 
                    />
                    <div style={checkboxGroup}>
                        <input 
                            type="checkbox" 
                            name="sameAsPropertyAddress"
                            checked={formData.sameAsPropertyAddress}
                            onChange={handleChange}
                        />
                        <label>Same as property address</label>
                    </div>
                </div>

                {/* Assessment Details */}
                <div style={sectionHeader}>Assessment Details</div>
                <div style={inlineRow}>
                    {[
                        { name: 'rateZone', label: 'Rate zone' },
                        { name: 'roadFactor', label: 'Road factor' },
                        { name: 'oldPropertyId', label: 'Old property id' },
                        { name: 'plotArea', label: 'Plot area' },
                    ].map((field) => (
                        <div style={formGroup} key={field.name}>
                            <label style={labelStyle}>{field.label}</label>
                            <input 
                                type="text" 
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                style={inputStyle} 
                                disabled
                            />
                        </div>
                    ))}
                </div>

                {/* Property Details */}
                <div style={sectionHeader}>Property Details</div>
                <div style={inlineRow}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                {labels.map((label) => (
                                    <th key={label} style={{ ...headerCell, width: "150px" }}>
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={cellStyle}>
                                    <select 
                                    disabled
                                        name="usageCategory"
                                        value={formData.usageCategory}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, border: "none", width: "150px" }}
                                    >
                                        <option value="">Select</option>
                                        <option value="ACRESTAURANT">AC Restaurant</option>
                                        <option value="RESTAURANT">Restaurant</option>
                                    </select>
                                </td>
                                <td style={cellStyle}>
                                    <select 
                                    disabled
                                        name="usageFactor"
                                        value={formData.usageFactor}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, border: "none", width: "150px" }}
                                    >
                                        <option value="">Select</option>
                                        <option value="1.0">1.0</option>
                                        <option value="1.5">1.5</option>
                                    </select>
                                </td>
                                <td style={cellStyle}>
                                    <select 
                                    disabled
                                        name="floorNo"
                                        value={formData.floorNo}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, border: "none", width: "150px" }}
                                    >
                                        <option value="">Select</option>
                                        <option value="0">Ground Floor</option>
                                        <option value="1">First Floor</option>
                                    </select>
                                </td>
                                <td style={cellStyle}>
                                    <select 
                                    disabled
                                        name="constructionType"
                                        value={formData.constructionType}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, border: "none", width: "150px" }}
                                    >
                                        <option value="">Select</option>
                                        <option value="RCC">RCC</option>
                                        <option value="PUCCA">Pucca</option>
                                    </select>
                                </td>
                                <td style={cellStyle}>
                                    <input 
                                    disabled
                                        type="text" 
                                        name="builtUpArea"
                                        value={formData.builtUpArea}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, border: "none", width: "150px" }} 
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Other Details */}
                <div style={sectionHeader}>Other Details</div>
                <div style={formGroup}>
                    <label style={labelStyle}>Exemption Applicable</label>
                    <select 
                        name="exemptionApplicable"
                        value={formData.exemptionApplicable}
                        onChange={handleChange}
                        style={inputStyle}
                        disabled
                    >
                        <option value="">None</option>
                        <option value="WIDOW">Widow</option>
                        <option value="SENIOR_CITIZEN">Senior Citizen</option>
                    </select>
                </div>

                {/* Checkboxes */}
                <div style={checkboxGroup}>
                    <label style={labelStyle}>
                        Mobile Tower {" "}
                        <input 
                        disabled
                            type="checkbox" 
                            name="hasMobileTower"
                            checked={formData.hasMobileTower}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={labelStyle}>
                        Bond Road {" "}
                        <input 
                        disabled
                            type="checkbox" 
                            name="hasBondRoad"
                            checked={formData.hasBondRoad}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={labelStyle}>
                        Advertisement {" "}
                        <input 
                        disabled
                            type="checkbox" 
                            name="hasAdvertisement"
                            checked={formData.hasAdvertisement}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {/* Remarks */}
                <div style={formGroup}>
                    <label style={labelStyle}>Remarks</label>
                    <textarea 
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: "60px" }} 
                    />
                </div>

                {/* Submit */}
                <button type="submit" variant="contained" color="primary" style={submitButton}>
                   Submit
                </button>
            </form>
        </Card>
    );
};
const formGroup = {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "#282828",
};

const labelStyle = {
    marginBottom: "4px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0%",
    color: "#282828",
};

const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "Poppins",
    width: "250px"
};

const sectionHeader = {

    marginTop: "32px",
    marginBottom: "16px",
    paddingBottom: "4px",

    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
    textDecoration: "underline",
    textDecorationStyle: "solid",
    textDecorationOffset: "0%",
    textDecorationThickness: "0%",
    color: "#6B133F",
};

const inlineRow = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "space-between",
};

const checkboxGroup = {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    marginBottom: "16px",
    alignItems: "center",
};

const submitButton = {
    marginTop: "24px",
    backgroundColor: "#6B133F",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "Poppins",
    fontSize: "14px",
    lineHeight: "100%",
    letterSpacing: "3%",
    color: "#FFFFFF",
    margin: "auto",
    display: "flex",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const headerCell = {
    backgroundColor: "#B9B9B9",
    padding: "12px",
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "130%",
    letterSpacing: "0%",
    color: "#000000",
};

const cellStyle = {
    padding: "12px",
    border: "1px solid #B9B9B9",
    // borderRight: "1px solid #e0e0e0",
};

export default PropertyTaxForm;