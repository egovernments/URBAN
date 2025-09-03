import { FormComposer, Loader } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { newConfig } from "../../../config/Create/config";

const EditForm = ({ applicationData }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state } = useLocation();

  // Boundary Data
  const [boundaryData, setBoundaryData] = useState(null);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [colonies, setColonies] = useState([]);
  const [rateZones, setRateZones] = useState([]);

  // Form States
  const [propertyAddress, setPropertyAddress] = useState({
    zone: "",
    ward: "",
    colony: "",
  });
  const [correspondenceAddress, setCorrespondenceAddress] = useState({
    address: "",
    sameAsProperty: false,
  });
  const [assessmentDetails, setAssessmentDetails] = useState({
    rateZone: "",
    roadFactor: "",
    oldPropertyId: "",
    plotArea: "",
  });
  const [propertyDetails, setPropertyDetails] = useState([
    {
      usageType: "",
      usageFactor: "",
      floorNumber: "",
      constructionType: "",
      area: "",
      fromYear: "",
      toYear: "",
    },
  ]);
  const [otherDetails, setOtherDetails] = useState({
    exemption: "",
    mobileTower: false,
    bondRoad: false,
    advertisement: false,
  });
  const [selfDeclaration, setSelfDeclaration] = useState(true);
  const [canSubmit, setSubmitValve] = useState(false);

  // MDMS Data
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
  const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");
  const stateId = Digit.ULBService.getStateId();

  const { data: Menu = {}, isLoadingm } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "UsageCategoryMajor") || {};
  const { data: MenuP = {}, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "ConstructionType") || {};
  const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
  const { data: OccupancyData = {}, isLoadingO } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType") || {};

  // Dropdown Options
  const [usageTypes, setUsageTypes] = useState([]);
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);

  // Year calculations
  const startYear = 1997;
  const currentFY = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
  const years = Array.from({ length: currentFY - startYear + 1 }, (_, i) => {
    const from = startYear + i;
    const to = (from + 1).toString().slice(2);
    return {
      label: `${from}-${to}`,
      value: `${from}-${to}`,
    };
  });
  const currentFYString = `${currentFY}-${(currentFY + 1).toString().slice(2)}`;

  const normalizeRoadFactor = (value) => {
    if (!value) return "";
    const mappings = {
      'mainroad': 'main',
      'main': 'main',
      'secondaryroad': 'secondary',
      'secondary': 'secondary',
      'internalroad': 'internal',
      'internal': 'internal'
    };
    const lowerValue = value.toLowerCase();
    return mappings[lowerValue] || "";
  };

  // Add the missing handleReset function
  const handleReset = () => {
    setPropertyAddress({
      zone: "",
      ward: "",
      colony: "",
    });
    setCorrespondenceAddress({
      address: "",
      sameAsProperty: false,
    });
    setAssessmentDetails({
      rateZone: "",
      roadFactor: "",
      oldPropertyId: "",
      plotArea: "",
    });
    setPropertyDetails([
      {
        usageType: "",
        usageFactor: "",
        floorNumber: "",
        constructionType: "",
        area: "",
        fromYear: "",
        toYear: "",
      },
    ]);
    setOtherDetails({
      exemption: "",
      mobileTower: false,
      bondRoad: false,
      advertisement: false,
    });
    setSelfDeclaration(true);
  };

  useEffect(() => {
    if (applicationData) {
      setPropertyAddress({
        zone: applicationData.address?.zone || "",
        ward: applicationData.address?.ward || "",
        colony: applicationData.address?.locality?.code || "",
      });

      setCorrespondenceAddress({
        address: applicationData.address?.street || "",
        sameAsProperty: false,
      });

      setAssessmentDetails({
        rateZone: applicationData.units?.[0]?.rateZone || "",
        roadFactor: normalizeRoadFactor(applicationData.units?.[0]?.roadFactor) || "",
        oldPropertyId: applicationData.oldPropertyId || "",
        plotArea: applicationData.landArea?.toString() || "",
      });

      if (applicationData.units && applicationData.units.length > 0) {
        const formattedUnits = applicationData.units.map((unit) => ({
          usageType: unit.usageCategory || "",
          usageFactor: unit.occupancyType || "",
          floorNumber: unit.floorNo?.toString() || "",
          constructionType: unit.constructionDetail?.constructionType || "",
          area: unit.constructionDetail?.builtUpArea?.toString() || "",
          fromYear: unit.fromYear || "",
          toYear: unit.toYear || "",
        }));
        setPropertyDetails(formattedUnits);
      }

      setOtherDetails({
        exemption: "",
        mobileTower: applicationData.additionalDetails?.mobileTower || false,
        bondRoad: applicationData.additionalDetails?.bondRoad || false,
        advertisement: applicationData.additionalDetails?.advertisement || false,
      });
    }
  }, [applicationData]);

  // Fetch boundary data
  useEffect(() => {
    (async () => {
      try {
        const tenantId = Digit.ULBService.getCurrentTenantId();
        const response = await Digit.LocationService.getRevenueLocalities(tenantId);
        const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];

        if (cityBoundary?.children?.length > 0) {
          setBoundaryData(cityBoundary);
          const zoneOptions = cityBoundary.children.map((zone) => ({
            code: zone.code,
            name: zone.name || zone.code,
          }));
          setZones(zoneOptions);
        }
      } catch (error) {
        console.error("Error fetching boundary data:", error);
      }
    })();
  }, []);

  // Zone -> Ward
  useEffect(() => {
    if (propertyAddress.zone && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
      const wardList = selectedZone?.children || [];
      const formattedWards = wardList.map((ward) => ({
        code: ward.code,
        name: ward.name || ward.code,
      }));
      setWards(formattedWards);
    } else {
      setWards([]);
    }
  }, [propertyAddress.zone, boundaryData]);

  // Ward -> Colony
  useEffect(() => {
    if (propertyAddress.zone && propertyAddress.ward && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
      const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
      const colonyList = selectedWard?.children || [];
      const formattedColonies = colonyList.map((col) => ({
        code: col.code,
        name: col.name || col.code,
      }));
      setColonies(formattedColonies);
    } else {
      setColonies([]);
    }
  }, [propertyAddress.ward, propertyAddress.zone, boundaryData]);

  // Colony -> Rate Zone (auto-set)
  useEffect(() => {
    if (propertyAddress.zone && propertyAddress.ward && propertyAddress.colony && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === propertyAddress.zone);
      const selectedWard = selectedZone?.children?.find((w) => w.code === propertyAddress.ward);
      const selectedColony = selectedWard?.children?.find((c) => c.code === propertyAddress.colony);
      const rateZoneList = selectedColony?.children || [];
      const formattedRateZones = rateZoneList.map((rz) => ({
        code: rz.code,
        name: rz.name || rz.code,
      }));
      setRateZones(formattedRateZones);

      if (formattedRateZones.length > 0) {
        setAssessmentDetails((prev) => ({
          ...prev,
          rateZone: formattedRateZones[0].name,
        }));
      } else {
        setAssessmentDetails((prev) => ({
          ...prev,
          rateZone: "",
        }));
      }
    } else {
      setRateZones([]);
      setAssessmentDetails((prev) => ({
        ...prev,
        rateZone: "",
      }));
    }
  }, [propertyAddress.colony, propertyAddress.ward, propertyAddress.zone, boundaryData]);

  // MDMS Data Effects
  useEffect(() => {
    if (!isLoadingm && Menu?.PropertyTax?.UsageCategoryMajor) {
      const usagecat = Menu.PropertyTax.UsageCategoryMajor;
      const filtered = usagecat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setUsageTypes(filtered);
    }
  }, [isLoadingm, Menu]);

  useEffect(() => {
    if (!isLoadings && MenuP?.PropertyTax?.ConstructionType) {
      const constructionCat = MenuP.PropertyTax.ConstructionType;
      const filtered = constructionCat
        ?.filter((e) => e?.code)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setConstructionTypes(filtered);
    }
  }, [isLoadings, MenuP]);

  useEffect(() => {
    if (isLoadingF) return;
    const floors = FloorAll?.PropertyTax?.Floor || [];
    const mappedFloors = floors
      .filter(floor => floor?.code && floor?.active)
      .map(floor => ({
        i18nKey: floor.name,
        code: floor.code,
      }))
      .sort((a, b) => {
        const getSortValue = (val) => {
          const num = parseInt(val, 10);
          return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
        };
        return getSortValue(b.code) - getSortValue(a.code);
      });
    setFloorList(mappedFloors);
  }, [isLoadingF, FloorAll]);

  useEffect(() => {
    if (!isLoadingO && OccupancyData?.PropertyTax?.OccupancyType) {
      const occupancyList = OccupancyData.PropertyTax.OccupancyType;
      const filtered = occupancyList
        ?.filter((item) => item.active)
        ?.map((item) => ({
          i18nKey: item.name,
          code: item.code,
        }));
      setOccupancyTypes(filtered);
    }
  }, [isLoadingO, OccupancyData]);

  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
  }, []);

  const defaultValues = {
    originalData: applicationData,
    address: applicationData?.address,
    owners: applicationData?.owners?.map((owner) => ({
      ...owner,
      ownerType: { code: owner.ownerType, i18nKey: owner.ownerType },
      relationship: { code: owner.relationship, i18nKey: `PT_FORM3_${owner.relationship}` },
      gender: {
        code: owner.gender,
        i18nKey: `PT_FORM3_${owner.gender}`,
        value: owner.gender,
      },
    })),
  };

  sessionStorage.setItem("PropertyInitials", JSON.stringify(defaultValues?.originalData));

  const handleUnitChange = (index, field, value) => {
    const updatedDetails = [...propertyDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value
    };
    setPropertyDetails(updatedDetails);
  };

  const addPropertyDetailRow = () => {
    setPropertyDetails([
      ...propertyDetails,
      {
        usageType: "",
        usageFactor: "",
        floorNumber: "",
        constructionType: "",
        area: "",
        fromYear: "",
        toYear: "",
      }
    ]);
  };

  const removePropertyDetailRow = (index) => {
    if (propertyDetails.length > 1) {
      const updatedDetails = [...propertyDetails];
      updatedDetails.splice(index, 1);
      setPropertyDetails(updatedDetails);
    }
  };

  const onFormValueChange = (setValue, formData, formState) => {
    if (Object.keys(formState.errors).length == 1 && formState.errors.documents)
      setSubmitValve(true);
    else
      setSubmitValve(!Object.keys(formState.errors).length);
  };

  const onSubmit = () => {  // Remove the data parameter since we're not using FormComposer
    const selectedColony = colonies.find(
      (colony) => colony.code === propertyAddress.colony
    );

    const formData = {
      ...applicationData,
      address: {
        ...applicationData?.address,
        // Remove the data?.address references since we're not using FormComposer
        street: correspondenceAddress.address,
        city: applicationData?.address?.city || "",
        locality: {
          code: selectedColony?.code || "SUN02",
          name: selectedColony?.name || "Unknown",
        },
        zone: propertyAddress.zone || "SUN02",
        ward: propertyAddress.ward || "1",
      },
      ownerType: otherDetails.exemption,
      isCorrespondenceAddress: correspondenceAddress?.sameAsProperty,
      oldPropertyId: assessmentDetails?.oldPropertyId,
      propertyType: applicationData?.propertyType || "VACANT", // Provide default if missing

      // Calculate these from propertyDetails array
      noOfFloors: propertyDetails.length > 0 ? Math.max(...propertyDetails.map(p => parseInt(p.floorNumber) || 0)) + 1 : 1,
      usageCategory: propertyDetails[0]?.usageType || "RESIDENTIAL",

      creationReason: state?.workflow?.businessService === "PT.UPDATE" || (applicationData?.documents == null) ? "UPDATE" : applicationData?.creationReason,

      // Fix: Don't try to access data?.usageCategoryMajor since data is undefined
      usageCategoryMajor: propertyDetails[0]?.usageType?.split(".")[0] || "RESIDENTIAL",
      usageCategoryMinor: propertyDetails[0]?.usageType?.split(".")[1] || null,

      // Use assessmentDetails.plotArea instead of undefined data?.landarea
      landArea: Number(assessmentDetails.plotArea) || 0,
      superBuiltUpArea: Number(assessmentDetails.plotArea) || 0,

      source: "MUNICIPAL_RECORDS",
      channel: "CFC_COUNTER",

      additionalDetails: {
        mobileTower: otherDetails?.mobileTower || false,
        bondRoad: otherDetails?.bondRoad || false,
        advertisement: otherDetails?.advertisement || false,
        unit: propertyDetails.map(unit => ({
          usageCategory: unit.usageType || "RESIDENTIAL",
          usageCategoryMajor: unit.usageType?.split(".")[0] || "RESIDENTIAL",
          occupancyType: unit.usageFactor || "SELFOCCUPIED",
          constructionDetail: {
            builtUpArea: unit.area || "0",
            constructionType: unit.constructionType || null,
          },
          floorNo: parseInt(unit.floorNumber) || 0,
          rateZone: assessmentDetails?.rateZone || "",
          roadFactor: assessmentDetails?.roadFactor || "",
          fromYear: unit.fromYear,
          toYear: unit.toYear,
        })),
      },

      // Handle documents properly
      documents: applicationData?.documents ? applicationData?.documents : null,

      // Properly structure units array
      units: propertyDetails.map((unit, index) => ({
        id: applicationData?.units?.[index]?.id || null, // Preserve existing unit IDs if updating
        tenantId: applicationData?.tenantId,
        floorNo: parseInt(unit.floorNumber) || 0,
        unitType: unit.usageType || "RESIDENTIAL",
        usageCategory: unit.usageType || "RESIDENTIAL",
        occupancyType: unit.usageFactor || "SELFOCCUPIED",
        constructionDetail: {
          builtUpArea: parseFloat(unit.area) || 0,
          constructionType: unit.constructionType || null,
          constructionDate: null,
        },
        active: true,
        fromYear: unit.fromYear,
        toYear: unit.toYear,
        arv: null,
      })),

      workflow: state?.workflow,
      applicationStatus: "UPDATE",
    };

    // Remove units with active: false if action is OPEN
    if (state?.workflow?.action === "OPEN") {
      formData.units = formData.units.filter((unit) => unit.active);
    }

    console.log("Submitting formData:", formData); // Debug log to check the structure

    history.push("/digit-ui/employee/pt/response", {
      Property: formData,
      key: "UPDATE",
      action: "SUBMIT"
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  const configs = commonFields ? commonFields : newConfig;

  // Styles object
  const styles = {
    sectionSty: {
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      backgroundColor: "#FFFFFF",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px"
    },
    sectionStyle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      fontSize: "16px",
      color: "#6b133f",
      margin: "-20px -20px 20px -20px",
      padding: "10px 20px",
      textAlign: "left"
    },
    gridStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "24px",
      marginBottom: "20px",
    },
    labelStyle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 400,
      fontSize: "14px",
      color: "#282828",
      marginBottom: "8px",
      display: "block",
    },
    inputStyle: {
      width: "100%",
      height: "44px",
      padding: "0 12px",
      border: "1px solid #d6d5d4",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.3s ease",
      background: "white",
      outline: "none",
    },
    textareaStyle: {
      width: "100%",
      minHeight: "80px",
      padding: "12px",
      border: "1px solid #d6d5d4",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.3s ease",
      background: "white",
      outline: "none",
      resize: "vertical",
    },
    checkboxStyle: {
      width: "18px",
      height: "18px",
      marginRight: "8px",
      verticalAlign: "middle",
      cursor: "pointer",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "14px",
      color: "#282828",
      cursor: "pointer",
    },
    cellHeaderStyle: {
      padding: "12px 8px",
      textAlign: "left",
      backgroundColor: "#f8f8f8",
      borderBottom: "2px solid #6b133f",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      fontSize: "14px",
      color: "#282828",
      whiteSpace: "nowrap",
    },
    tableCell: {
      padding: "8px",
      borderBottom: "1px solid #e0e0e0",
    },
    select: {
      width: "100%",
      height: "38px",
      padding: "0 8px",
      border: "1px solid #d6d5d4",
      borderRadius: "4px",
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.3s ease",
      background: "white",
      outline: "none",
    },
    actionButton: {
      padding: "8px 16px",
      margin: "0 4px",
      backgroundColor: "#6b133f",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    removeButton: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #FF4C51",
      color: "#FF4C51",
      background: "white",
      fontSize: "13px",
      fontFamily: "'Poppins', sans-serif",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    submitButton: {
      minWidth: "140px",
      height: "44px",
      padding: "0 30px",
      backgroundColor: "#6b133f",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "15px",
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    clearButton: {
      minWidth: "140px",
      height: "44px",
      padding: "0 24px",
      borderRadius: "6px",
      border: "2px solid #FF4C51",
      color: "#FF4C51",
      background: "white",
      fontSize: "15px",
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
      marginTop: "40px",
      paddingTop: "20px",
      borderTop: "1px solid #e0e0e0",
      flexWrap: "wrap",
    },
    correspondenceWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      alignItems: "center",
      marginBottom: "20px",
    },
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #6b133f !important;
          box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1) !important;
        }
        
        .form-input:disabled, .form-select:disabled {
          background: #f5f5f5 !important;
          cursor: not-allowed !important;
        }
        
        .btn-submit:hover {
          background: #551030 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3) !important;
        }
        
        .btn-clear:hover {
          background: #fff5f5 !important;
          transform: translateY(-1px);
        }
        
        .btn-action:hover {
          background: #551030 !important;
          transform: translateY(-1px);
        }
        
        .btn-remove:hover {
          background: #fff5f5 !important;
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .button-container {
            flex-direction: column-reverse !important;
          }
          .button-container button {
            width: 100% !important;
          }
        }
      `}</style>

      {/* Property Address */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Property Address")}</div>
        <div className="form-grid" style={styles.gridStyle}>
          <div>
            <label style={styles.labelStyle}>
              {t("Zone")} <span style={{ color: "#d00000" }}>*</span>
            </label>
            <select
              className="form-select"
              style={styles.inputStyle}
              value={propertyAddress.zone}
              onChange={(e) => setPropertyAddress({ zone: e.target.value, ward: "", colony: "" })}
            >
              <option value="">{t("Select")}</option>
              {zones.map((zone) => (
                <option key={zone.code} value={zone.code}>{zone.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.labelStyle}>
              {t("Ward")} <span style={{ color: "#d00000" }}>*</span>
            </label>
            <select
              className="form-select"
              style={styles.inputStyle}
              value={propertyAddress.ward}
              onChange={(e) => setPropertyAddress({ ...propertyAddress, ward: e.target.value, colony: "" })}
              disabled={!propertyAddress.zone}
            >
              <option value="">{t("Select")}</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>{ward.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.labelStyle}>
              {t("Colony")} <span style={{ color: "#d00000" }}>*</span>
            </label>
            <select
              className="form-select"
              style={styles.inputStyle}
              value={propertyAddress.colony}
              onChange={(e) => setPropertyAddress({ ...propertyAddress, colony: e.target.value })}
              disabled={!propertyAddress.ward}
            >
              <option value="">{t("Select")}</option>
              {colonies.map((colony) => (
                <option key={colony.code} value={colony.code}>{colony.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Correspondence Address */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Correspondence Address")}</div>
        <div style={styles.correspondenceWrapper}>
          <textarea
            className="form-textarea"
            style={{
              ...styles.textareaStyle,
              flex: "1 1 300px",
              minWidth: "250px",
            }}
            placeholder={t("Enter address")}
            value={correspondenceAddress.address}
            onChange={(e) => setCorrespondenceAddress({ ...correspondenceAddress, address: e.target.value })}
            disabled={correspondenceAddress.sameAsProperty}
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              style={styles.checkboxStyle}
              checked={correspondenceAddress.sameAsProperty}
              onChange={(e) =>
                setCorrespondenceAddress({
                  ...correspondenceAddress,
                  sameAsProperty: e.target.checked,
                  address: e.target.checked ? "Same as property address" : ""
                })
              }
            />
            {t("Same as Property Address")}
          </label>
        </div>
      </div>

      {/* Assessment Details */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Assessment Details")}</div>
        <div className="form-grid" style={styles.gridStyle}>
          <div>
            <label style={styles.labelStyle}>
              {t("Rate Zone")} <span style={{ color: "#d00000" }}>*</span>
            </label>
            <input
              className="form-input"
              style={styles.inputStyle}
              placeholder={t("Auto fetched")}
              disabled
              value={assessmentDetails.rateZone}
            />
          </div>
          <div>
            <label style={styles.labelStyle}>
              {t("Road Factor")} <span style={{ color: "#d00000" }}>*</span>
            </label>
            <select
              className="form-select"
              style={styles.inputStyle}
              value={assessmentDetails.roadFactor}
              onChange={(e) => setAssessmentDetails({ ...assessmentDetails, roadFactor: e.target.value })}
            >
              <option value="">{t("Select")}</option>
              <option value="main">{t("Main Road")}</option>
              <option value="secondary">{t("Secondary Road")}</option>
              <option value="internal">{t("Internal Road")}</option>
            </select>
          </div>
          <div>
            <label style={styles.labelStyle}>{t("Old Property ID")}</label>
            <input
              className="form-input"
              style={styles.inputStyle}
              type="text"
              placeholder={t("Enter old ID")}
              value={assessmentDetails.oldPropertyId}
              onChange={(e) => setAssessmentDetails({ ...assessmentDetails, oldPropertyId: e.target.value })}
            />
          </div>
          <div>
            <label style={styles.labelStyle}>
              {t("Plot Area (Sq feet)")} <span style={{ color: "#d00000" }}>*</span>
            </label>
            <input
              className="form-input"
              style={styles.inputStyle}
              type="number"
              placeholder={t("Enter area")}
              value={assessmentDetails.plotArea}
              onChange={(e) => setAssessmentDetails({ ...assessmentDetails, plotArea: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Property Details Table */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Property Details")}</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={styles.cellHeaderStyle}>{t("Usage Type")}</th>
                <th style={styles.cellHeaderStyle}>{t("Usage Factor")}</th>
                <th style={styles.cellHeaderStyle}>{t("Floor Number")}</th>
                <th style={styles.cellHeaderStyle}>{t("Type of Construction")}</th>
                <th style={styles.cellHeaderStyle}>{t("Area (Sq feet)")}</th>
                <th style={styles.cellHeaderStyle}>{t("From Year")}</th>
                <th style={styles.cellHeaderStyle}>{t("To Year")}</th>
                <th style={styles.cellHeaderStyle}>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {propertyDetails.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>
                    <select
                      className="form-select"
                      style={styles.select}
                      value={item.usageType}
                      onChange={(e) => handleUnitChange(index, "usageType", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {usageTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {t(type.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      className="form-select"
                      style={styles.select}
                      value={item.usageFactor}
                      onChange={(e) => handleUnitChange(index, "usageFactor", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {occupancyTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {t(type.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      className="form-select"
                      style={styles.select}
                      value={item.floorNumber}
                      onChange={(e) => handleUnitChange(index, "floorNumber", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {floorList.map((floor) => (
                        <option key={floor.code} value={floor.code}>
                          {t(floor.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      className="form-select"
                      style={styles.select}
                      value={item.constructionType}
                      onChange={(e) => handleUnitChange(index, "constructionType", e.target.value)}
                    >
                      <option value="">{t("Select")}</option>
                      {constructionTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {t(type.i18nKey)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <input
                      type="number"
                      className="form-input"
                      style={styles.select}
                      placeholder={t("Enter area")}
                      value={item.area}
                      onChange={(e) => handleUnitChange(index, "area", e.target.value)}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      className="form-select"
                      style={styles.select}
                      value={item.fromYear}
                      onChange={(e) => {
                        handleUnitChange(index, "fromYear", e.target.value);
                        if (item.toYear && parseInt(item.toYear.split("-")[0]) < parseInt(e.target.value.split("-")[0])) {
                          handleUnitChange(index, "toYear", "");
                        }
                      }}
                    >
                      <option value="">{t("From Year")}</option>
                      {years.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <select
                      className="form-select"
                      style={styles.select}
                      value={item.toYear}
                      onChange={(e) => handleUnitChange(index, "toYear", e.target.value)}
                      disabled={!item.fromYear}
                    >
                      <option value="">{t("To Year")}</option>
                      {item.fromYear && (
                        <option value={currentFYString}>{currentFYString}</option>
                      )}
                    </select>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      className="btn-remove"
                      style={styles.removeButton}
                      onClick={() => removePropertyDetailRow(index)}
                      disabled={propertyDetails.length <= 1}
                    >
                      {t("Remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn-action"
          style={styles.actionButton}
          onClick={addPropertyDetailRow}
        >
          + {t("Add Row")}
        </button>
      </div>

      {/* Other Details */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Other Details")}</div>
        <div className="form-grid" style={styles.gridStyle}>
          <div>
            <label style={styles.labelStyle}>{t("Exemption Applicable")}</label>
            <select
              className="form-select"
              style={{ ...styles.inputStyle, maxWidth: "300px" }}
              value={otherDetails.exemption}
              onChange={(e) => setOtherDetails({ ...otherDetails, exemption: e.target.value })}
            >
              <option value="">{t("Select")}</option>
              <option value="yes">{t("Yes")}</option>
              <option value="no">{t("No")}</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              style={styles.checkboxStyle}
              checked={otherDetails.mobileTower}
              onChange={(e) => setOtherDetails({ ...otherDetails, mobileTower: e.target.checked })}
            />
            {t("Mobile Tower")}
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              style={styles.checkboxStyle}
              checked={otherDetails.bondRoad}
              onChange={(e) => setOtherDetails({ ...otherDetails, bondRoad: e.target.checked })}
            />
            {t("Bond Road")}
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              style={styles.checkboxStyle}
              checked={otherDetails.advertisement}
              onChange={(e) => setOtherDetails({ ...otherDetails, advertisement: e.target.checked })}
            />
            {t("Advertisement")}
          </label>
        </div>
      </div>

      {/* Self Declaration */}
      <div style={styles.sectionSty}>
        <div style={styles.sectionStyle}>{t("Self Declaration")}</div>
        <label style={{ ...styles.checkboxLabel, alignItems: "flex-start", padding: "10px 0" }}>
          <input
            type="checkbox"
            style={{ ...styles.checkboxStyle, marginTop: "3px" }}
            checked={selfDeclaration}
            onChange={(e) => setSelfDeclaration(e.target.checked)}
          />
          <span style={{ fontSize: "14px", lineHeight: "1.6", color: "#282828" }}>
            मैं यह सत्यापित करता / करती हूं कि उपरोक्त विवरणी मे दी गयी जानकारी सत्य है। मैने / हमने जिस भवन/ भूमि के संबंध मे विवरणी प्रस्तुत की है उसका मैं स्वामी/अधिभोगी हूं इसमे कोई भी तथ्य छू पाये अथवा गलत नहीं है। नोट - मध्यप्रदेश नगर पालिका (वार्षिक भाड़ा मूल्य का अवधारणा) नियम 1997 के नियम 10 (1) अंतर्गत प्रत्येक भवन स्वामी को स्व निर्धारण विवरणी (Self Assessment Form) के साथ संलग्नक (Attachment) scan कर सब्मिट करें । स्व निर्धारण विवरणी मौके पर सत्यापन के अध्याधीन रहेगी, जाँच मे अंतर पाये जाने पर या अन्य कारण से आवश्यक पाये जाने पर वार्षिक भाड़ा मूल्य का पुर्निर्धारण किया जाएगा व 0 प्रतिशत से अधिक अंतर पाये जाने पर सम्पतिकर के पुर्निर्धारण के अंतर की राशि की पाँच गुना शास्ति ,अधिरोपित की जा सकेगी।
          </span>
        </label>
      </div>

      {/* Submit and Clear buttons */}
      <div style={styles.sectionSty}>
        <div className="button-container" style={styles.buttonContainer}>
          <button
            className="btn-clear"
            type="button"
            style={styles.clearButton}
            onClick={handleReset}
          >
            {t("Clear")}
          </button>
          <button
            className="btn-submit"
            type="button"
            style={styles.submitButton}
            onClick={onSubmit}
          >
            {t("Submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;