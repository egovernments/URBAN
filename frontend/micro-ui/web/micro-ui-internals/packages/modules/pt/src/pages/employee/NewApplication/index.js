
import {
  Loader, Card,
  SubmitBar,
  TextInput,
  Dropdown,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { PTService } from "../../../../../../libraries/src/services/elements/PT";
import styles from "./IndexStyle"
import OwnershipDetailsSection from "./OwnershipDetailsSection";
import AddressSection from "./AddressSection";
import AssessmentDetailsSection from "./AssessmentDetailsSection";
import PropertyDetailsTableSection from "./PropertyDetailsTableSection";
import AttachmentsSection from "./Attachments";
import OtherDetailsSection from "./OtherDetailsSection";
import SuccessModal from "./SuccessModal";
import CorrespondenceAddressSection from "./CorrespondenceAddressSection";

const NewApplication = () => {
  const location = useLocation();
  const {
    generalDetails,
    addressDetailsSet,
    ownerDetails,
    unitDetails,
    propertyDocuments,
    additionalDetails,
    workflow,
    processInstance,
  } = location.state || {};

  const { t } = useTranslation();

  const [proOwnerDetail, setProOwnerDetail] = useState(null);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showAssessmentPop, setShowAssesmentPop] = useState(false);
  const [acknowledgmentNumber, setAcknowledgmentNumber] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isJointStarted, setIsJointStarted] = useState(false); // NEW
  const [selectedAssessmentYear, setSelectedAssessmentYear] = useState(null);
  const [documents, setDocuments] = useState({
    photoId: null,
    ownershipDoc: null,
    sellersRegistry: null,
  });

  const [owners, setOwners] = useState([
    {
      title: "GFHGH",
      name: "",
      aadhaar: "",
      hindiTitle: "",
      hindiName: "",
      fatherHusbandName: "",
      relationship: "",
      email: "",
      altNumber: "",
      mobile: "",
      samagraID: "",
      noSamagra: false,
    }
  ]);
  const [ownershipType, setOwnershipType] = useState(null);
  const [registryId, setRegistryId] = useState("");
  const [addressDetails, setAddressDetails] = useState({
    doorNo: "",
    address: "",
    pincode: "",
    colony: null,
    ward: null,
    zone: null,
  });
  const [correspondenceAddress, setCorrespondenceAddress] = useState("");
  const [isSameAsPropertyAddress, setIsSameAsPropertyAddress] = useState(false);
  const [rateZones, setRateZones] = useState([])
  const [assessmentDetails, setAssessmentDetails] = useState({
    rateZone: null, // Usually fetched
    roadFactor: null,
    oldPropertyId: "",
    plotArea: "",
  });
  const [unit, setUnit] = useState([{
    usageType: "",
    usageFactor: "",
    floorNo: "",
    constructionType: "",
    area: "",
    fromYear: "",
    toYear: ""
  }]);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "",
    roomsArea: "",
    exemption: "",
  });
  const [checkboxes, setCheckboxes] = useState({
    mobileTower: false,
    broadRoad: false,
    advertisement: false,
    seniorCitizenDiscount: false,
    selfDeclaration: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();

  const { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(Digit.ULBService.getStateId(), "PropertyTax", "CommonFieldsConfig");

  const token = localStorage.getItem("token");
  const stateId = Digit.ULBService.getStateId();
  const { data: AssessmentYearsList, isLoadings } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "AssessmentYear");

  const assessmentYears = (AssessmentYearsList?.PropertyTax?.AssessmentYear || []).map((item) => ({
    code: item.code,
    name: item.name, // Show year like "2024-25"
  }));

  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;
  const mutation = Digit.Hooks.pt.usePropertyAPI(tenantId, true);
  const mutationUpdate = Digit.Hooks.pt.useUpdateContent(tenantId, true);
  let tenantIdss = Digit.ULBService.getCurrentTenantId();

  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
    error,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

  const handleEstimate = () => {
    const toYear =
      Array.isArray(unit) && unit.length > 0 ? unit[0].toYear : null;

    const payload = {
      Assessment: {
        financialYear: toYear,
        propertyId: propertyId,
        tenantId: tenantId,
        source: "MUNICIPAL_RECORDS",
        channel: "CITIZEN",
        assessmentDate: Date.now(),
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    ptCalculationEstimateMutate(payload, {
      onSuccess: (data) => {
        history.push({
          pathname: "/digit-ui/employee/pt/PreviewDemand",
          state: { data, proOwnerDetail, documents, propertyDocuments, checkboxes, rateZones, owners, unit, assessmentDetails, assessmentDetails, propertyDetails, addressDetails, ownershipType, correspondenceAddress }// send full object
        });

      },
      onError: (error) => {
        alert("Estimate error:", error);
      },
    });
  };
  const handleSubmitUpdate = async () => {

    const payload = {
      Property: {
        updateIMC: true,
        id: generalDetails?.id,
        registryId: generalDetails?.registryId || "PG-PT-2025-07-15-000565",
        propertyId: generalDetails?.propertyId || "PG-PT-2025-07-15-000565",
        accountId: generalDetails?.accountId || "PG-PT-2025-07-15-000565",
        acknowldgementNumber: generalDetails?.acknowldgementNumber || "PG-PT-2025-07-15-000565",
        status: generalDetails?.status,
        tenantId: userInfo1?.tenantId,
        oldPropertyId: assessmentDetails.oldPropertyId || null,
        address: {
          city: "CityA",
          locality: {
            code: addressDetails.colony?.code || "SUN02",
            name: addressDetails.colony?.name || "map with zone",
          },
          zone: addressDetails.zone?.code || "SUN02",
          street: addressDetails.address || "main",
          doorNo: addressDetails.doorNo || "23",
          pincode: addressDetails.pincode || "",
          ward: addressDetails.ward?.code || "1",
          documents: [],
        },

        ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",

        owners: owners.map((owner, index) => ({
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
          emailId: owner.email || "abc@gmail.com",
          ownerType: propertyDetails.exemption.code,
          permanentAddress:
            addressDetails.address || "23, main, PG_CITYA_REVENUE_SUN20, City A, ",
          relationship: owner.relationship || "FATHER",
          samagraId: owner.samagraID || "Samagra ID",
          documents: [
            {
              documentType: "Photo ID",
              fileStoreId: documents.photoId?.fileStoreId || "default-filestore-photoid",
              documentUid: documents.photoId?.documentUid || "default-uid-photoid"
            },
            {
              documentType: "Sellers Registry Copy ",
              fileStoreId: documents.sellersRegistry?.fileStoreId || "default-filestore-saledeed",
              documentUid: documents.sellersRegistry?.documentUid || "default-uid-saledeed"
            },
            {
              documentType: "Ownership Document",
              fileStoreId: documents.ownershipDoc?.fileStoreId || "default-filestore-ownership",
              documentUid: documents.ownershipDoc?.documentUid || "default-uid-ownership"
            },

          ],
        })),

        institution: null,

        documents: [
          {
            documentType: "Photo ID",
            fileStoreId: documents.photoId?.fileStoreId || "default-filestore-photoid",
            documentUid: documents.photoId?.documentUid || "default-uid-photoid"
          },
          {
            documentType: "Sellers Registry Copy ",
            fileStoreId: documents.sellersRegistry?.fileStoreId || "default-filestore-saledeed",
            documentUid: documents.sellersRegistry?.documentUid || "default-uid-saledeed"
          },
          {
            documentType: "Ownership Document",
            fileStoreId: documents.ownershipDoc?.fileStoreId || "default-filestore-ownership",
            documentUid: documents.ownershipDoc?.documentUid || "default-uid-ownership"
          },

        ],

        units: unit.map(unit => (
          {
            usageCategory: unit.usageType || "RESIDENTIAL",
            usesCategoryMajor: unit.usageType || "RESIDENTIAL",
            occupancyType: unit.usageFactor || "SELFOCCUPIED",
            constructionDetail: {
              builtUpArea: unit.area || "3000",
              constructionType: unit.constructionType || null,
            },
            floorNo: parseInt(unit.floorNo) || 0,
            rateZone: rateZones?.[0]?.code || "",
            roadFactor: assessmentDetails.roadFactor?.code || unitDetails?.[0]?.roadFactor,
            fromYear: unit.fromYear,
            toYear: unit.toYear,
          })),


        landArea: assessmentDetails.plotArea?.toString() || "3000",
        propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
        noOfFloors: parseInt(unit.floorNo) || 1,
        superBuiltUpArea: null,
        // usageCategory: unit.usageType || "RESIDENTIAL",
        usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",

        additionalDetails: {
          inflammable: false,
          heightAbove36Feet: false,
          propertyType: {
            i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
            code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
          },
          mobileTower: checkboxes.mobileTower || false,
          bondRoad: checkboxes.broadRoad || false,
          advertisement: checkboxes.advertisement || false,
          builtUpArea: null,
          noOfFloors: {
            i18nKey: "PT_GROUND_FLOOR_OPTION",
            code: 0,
          },
          noOofBasements: {
            i18nKey: "PT_NO_BASEMENT_OPTION",
            code: 0,
          },
          unit: unit.map(unit => (
            {
              usageCategory: unit.usageType || "RESIDENTIAL",
              usesCategoryMajor: unit.usageType || "RESIDENTIAL",
              occupancyType: unit.usageFactor || "SELFOCCUPIED",
              constructionDetail: {
                builtUpArea: unit.area || "3000",
                constructionType: unit.constructionType || null,
              },
              floorNo: parseInt(unit.floorNo) || 0,
              rateZone: rateZones?.[0]?.code || "",
              roadFactor: assessmentDetails.roadFactor?.code || "",
              fromYear: unit.fromYear,
              toYear: unit.toYear,
            })),
          basement1: null,
          basement2: null,
        },
        workflow: {
          action: "OPEN",
          moduleName: "PT",
          businessService: "PT.UPDATE"
        },
        channel: "CFC_COUNTER",
        creationReason: "UPDATE",
        source: "MUNICIPAL_RECORDS",
      },

      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }

    }

    mutationUpdate.mutate(payload, {
      onSuccess: (data) => {
        const property = data?.Properties?.[0];
        if (property) {

          setProOwnerDetail(property);
          setAcknowledgmentNumber(property.acknowldgementNumber);
          setPropertyId(property.propertyId);
          setStatus(property.status);
          // setShowSuccessModal(true);
          setShowPreviewButton(true);

        }
      },
      onError: (err) => {

        alert(t("Submission failed"));
      },
    });
  };
  const handleSubmit = async () => {

    const errors = {};

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSizeMB = 2;

    const validateFile = (file, key, label) => {
      if (!file) { errors[key] = `${label} is required.`; }
      else if (!allowedTypes.includes(file.type)) {
        errors[key] = `${label} must be JPG, PNG, or PDF.`;
      } else if (file.size / 1024 / 1024 > maxSizeMB) {
        errors[key] = `${label} must be under 2MB.`;
      }
    };

    validateFile(documents.photoId, "photoId", "Photo ID");
    validateFile(documents.ownershipDoc, "ownershipDoc", "Ownership document");

    // ---- 3. Ownership ----
    if (!ownershipType) {
      errors.ownershipType = "Ownership type is required.";
    }
    if (registryId && !/^[a-zA-Z0-9]{19}$/.test(registryId)) {
      errors.registryId = "Registry ID must be exactly 19 alphanumeric characters.";
    }
    // ---- 4. Owner (first only) ----
    const owner = owners[0];
    if (!owner.name || owner.name.trim() === "") {
      errors.ownerName = "Owner name is required.";
    }
    if (!owner.hindiName || owner.hindiName.trim() === "") {
      errors.hindiName = "Owner name (हिंदी में) is required.";
    }
    if (!owner.fatherHusbandName || owner.fatherHusbandName.trim() === "") {
      errors.fatherHusbandName = "Owner Relation is required.";
    }
    if (!owner.relationship || owner.relationship.trim() === "") {
      errors.relationship = "Owner Relationship is required.";
    }
    if (!owner.mobile || !/^\d{10}$/.test(owner.mobile)) {
      errors.mobile = "Valid 10-digit mobile number is required.";
    }
    if (!owner.aadhaar || !/^\d{12}$/.test(owner.aadhaar)) {
      errors.aadhaar = "Valid 12-digit Aadhaar is required.";
    }
    // if (!owner.samagraID || !/^\d+$/.test(owner.samagraID)) {
    //   errors.samagraID = "Samagra ID must be digits only.";
    // }
    if (!owner.noSamagra) {
      if (!owner.samagraID || !/^\d+$/.test(owner.samagraID)) {
        errors.samagraID = "Samagra ID must be digits only.";
      }
    }
    // ---- 5. Address ----
    if (!addressDetails.doorNo || addressDetails.doorNo.trim() === "") {
      errors.doorNo = "Door/House No is required.";
    }
    if (!addressDetails.address || addressDetails.address.trim() === "") {
      errors.address = "Address is required.";
    }
    if (!addressDetails.pincode || !/^\d{6}$/.test(addressDetails.pincode)) {
      errors.pincode = "Valid 6-digit pincode is required.";
    }
    if (!addressDetails.colony) {
      errors.colony = "Colony selection is required.";
    }
    if (!addressDetails.ward) {
      errors.ward = "Ward selection is required.";
    }
    if (!addressDetails.zone) {
      errors.zone = "Zone selection is required.";
    }

    // ---- 6. Assessment ----
    if (!assessmentDetails.rateZone) {
      errors.rateZone = "Rate zone is required.";
    }
    if (!assessmentDetails.roadFactor) {
      errors.roadFactor = "Road factor is required.";
    }
    if (!checkboxes.selfDeclaration) {
      errors.selfDeclaration = "Please accept the declaration to proceed.";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    if (generalDetails?.acknowldgementNumber) {
      handleSubmitUpdate();
      return;
    }
    const payload = {
      Property: {
        updateIMC: true,
        tenantId: userInfo1?.tenantId,
        registryId: registryId,
        // oldPropertyId: assessmentDetails.oldPropertyId || null,
        address: {
          city: "CityA",
          locality: {
            code: addressDetails.colony?.code || "SUN02",
            name: addressDetails.colony?.name || "map with zone",
          },
          zone: addressDetails.zone?.code || "SUN02",
          street: addressDetails.address || "main",
          doorNo: addressDetails.doorNo || "23",
          pincode: addressDetails.pincode || "",
          ward: addressDetails.ward?.code || "1",
          documents: [],
        },

        ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",

        owners: owners.map((owner, index) => ({
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
          emailId: owner.email || "abc@gmail.com",
          ownerType: propertyDetails.exemption.code,
          permanentAddress:
            addressDetails.address || "23, main, PG_CITYA_REVENUE_SUN20, City A, ",
          relationship: owner.relationship || "FATHER",
          samagraId: owner.samagraID || "Samagra ID",
          documents: [
            {
              documentType: "Photo ID",
              fileStoreId: documents.photoId?.fileStoreId || "default-filestore-photoid",
              documentUid: documents.photoId?.documentUid || "default-uid-photoid"
            },
            {
              documentType: "Sellers Registry Copy ",
              fileStoreId: documents.sellersRegistry?.fileStoreId || "default-filestore-saledeed",
              documentUid: documents.sellersRegistry?.documentUid || "default-uid-saledeed"
            },
            {
              documentType: "Ownership Document",
              fileStoreId: documents.ownershipDoc?.fileStoreId || "default-filestore-ownership",
              documentUid: documents.ownershipDoc?.documentUid || "default-uid-ownership"
            },

          ],
        })),

        institution: null,

        documents: [
          {
            documentType: "Photo ID",
            fileStoreId: documents.photoId?.fileStoreId || "default-filestore-photoid",
            documentUid: documents.photoId?.documentUid || "default-uid-photoid"
          },
          {
            documentType: "Sellers Registry Copy ",
            fileStoreId: documents.sellersRegistry?.fileStoreId || "default-filestore-saledeed",
            documentUid: documents.sellersRegistry?.documentUid || "default-uid-saledeed"
          },
          {
            documentType: "Ownership Document",
            fileStoreId: documents.ownershipDoc?.fileStoreId || "default-filestore-ownership",
            documentUid: documents.ownershipDoc?.documentUid || "default-uid-ownership"
          },

        ],

        units: unit.map(unit => (
          {
            usageCategory: unit.usageType || "RESIDENTIAL",
            usesCategoryMajor: unit.usageType || "RESIDENTIAL",
            occupancyType: unit.usageFactor || "SELFOCCUPIED",
            constructionDetail: {
              builtUpArea: unit.area || "3000",
              constructionType: unit.constructionType || null,
            },
            floorNo: parseInt(unit.floorNo) || 0,
            rateZone: rateZones?.[0]?.code || "",
            roadFactor: assessmentDetails.roadFactor?.code || unitDetails?.[0]?.roadFactor,
            fromYear: unit.fromYear,
            toYear: unit.toYear,
          })),
        landArea: assessmentDetails.plotArea?.toString() || "3000",
        propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
        noOfFloors: parseInt(unit.floorNo) || 1,
        superBuiltUpArea: null,
        // usageCategory: unit.usageType || "RESIDENTIAL",
        usageCategory: unit.find(u => u.usageType) ? unit.find(u => u.usageType).usageType : "RESIDENTIAL",

        additionalDetails: {
          inflammable: false,
          heightAbove36Feet: false,
          propertyType: {
            i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
            code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
          },
          mobileTower: checkboxes.mobileTower || false,
          bondRoad: checkboxes.broadRoad || false,
          advertisement: checkboxes.advertisement || false,
          builtUpArea: null,
          noOfFloors: {
            i18nKey: "PT_GROUND_FLOOR_OPTION",
            code: 0,
          },
          noOofBasements: {
            i18nKey: "PT_NO_BASEMENT_OPTION",
            code: 0,
          },
          unit: unit.map(unit => (
            {
              usageCategory: unit.usageType || "RESIDENTIAL",
              usesCategoryMajor: unit.usageType || "RESIDENTIAL",
              occupancyType: unit.usageFactor || "SELFOCCUPIED",
              constructionDetail: {
                builtUpArea: unit.area || "3000",
                constructionType: unit.constructionType || null,
              },
              floorNo: parseInt(unit.floorNo) || 0,
              rateZone: rateZones?.[0]?.code || "",
              roadFactor: assessmentDetails.roadFactor?.code || "",
              fromYear: unit.fromYear,
              toYear: unit.toYear,
            })),

          basement1: null,
          basement2: null,
        },

        channel: "CFC_COUNTER",
        creationReason: "CREATE",
        source: "MUNICIPAL_RECORDS",
      },

      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    mutation.mutate(payload, {
      onSuccess: (data) => {
        const property = data?.Properties?.[0];
        if (property) {

          setProOwnerDetail(property);
          setAcknowledgmentNumber(property.acknowldgementNumber);
          setPropertyId(property.propertyId);
          setStatus(property.status);
          // setShowSuccessModal(true);
          setShowPreviewButton(true);
        }
      },
      onError: (err) => {

        alert(t("Submission failed"));
      },
    });
  };

  const backToNew = () => {
    setShowPreviewButton(false);
    setShowAssesmentPop(false);
  }
  const PreviewDemand = () => {
    // setShowAssesmentPop(true);
    handleEstimate();
  };

  useEffect(() => {
    if (!generalDetails) return;
    setOwnershipType(generalDetails.ownershipCategory || null);
    setRegistryId(generalDetails.registryId || null);
  }, [generalDetails]);

  useEffect(() => {
    if (!ownerDetails || ownerDetails.length === 0) return;

    const formatted = ownerDetails.map((owner) => ({
      title: owner.salutation || "",
      name: owner.name || "",
      aadhaar: owner.aadhaarNumber || "",
      hindiTitle: owner.salutationHindi || "",
      hindiName: owner.hindiName || "",
      fatherHusbandName: owner.fatherOrHusbandName || "",
      relationship: owner.relationship || "",
      email: owner.emailId || "abc@gmail.com",
      altNumber: owner.altContactNumber || "",
      mobile: owner.mobileNumber || "",
      samagraID: owner.samagraId || "",
      noSamagra: !owner.samagraId, // true if not available
    }));

    setOwners(formatted);
  }, [ownerDetails]);
  useEffect(() => {
    if (addressDetailsSet) {
      setAddressDetails({
        doorNo: addressDetailsSet.doorNo || "",
        address: addressDetailsSet.street || "",
        pincode: addressDetailsSet.pincode || "",
        colony: addressDetailsSet.locality
          ? { code: addressDetailsSet.locality.code, name: addressDetailsSet.locality.name || addressDetailsSet.locality.code }
          : null,
        ward: addressDetailsSet.ward
          ? { code: addressDetailsSet.ward, name: addressDetailsSet.ward }
          : null,
        zone: addressDetailsSet.zone
          ? { code: addressDetailsSet.zone, name: addressDetailsSet.zone }
          : null,
      });
    }
  }, [addressDetailsSet]);

  useEffect(() => {
    const firstUnit = unitDetails?.[0];
    if (firstUnit?.roadFactor) {
      setAssessmentDetails((prev) => ({
        ...prev,
        roadFactor: firstUnit?.roadFactor || prev.roadFactor,
        plotArea: generalDetails?.landArea || prev.plotArea,
        oldPropertyId: generalDetails?.oldPropertyId || prev.oldPropertyId,
      }));
    }
  }, [unitDetails]);


  useEffect(() => {
    if (!unitDetails || unitDetails.length === 0) return;

    const formattedUnits = unitDetails.map((unit) => ({
      usageType: unit && unit.usageCategory ? unit.usageCategory : "",
      usageFactor: unit && unit.occupancyType ? unit.occupancyType : "", // Fill if needed
      floorNo: unit && unit.floorNo ? unit.floorNo.toString() : "",
      constructionType:
        unit &&
          unit.constructionDetail &&
          unit.constructionDetail.constructionType
          ? unit.constructionDetail.constructionType
          : "",
      area:
        unit &&
          unit.constructionDetail &&
          unit.constructionDetail.builtUpArea
          ? unit.constructionDetail.builtUpArea.toString()
          : "",
      fromYear: unit && unit.fromYear ? unit.fromYear : "",
      toYear: unit && unit.toYear ? unit.toYear : "",
    }));

    setUnit(formattedUnits);
  }, [unitDetails]);


  const handleFileChange = async (key, file) => {

    try {
      setDocuments((prev) => ({
        ...prev,
        [key]: null,
      }));

      const response = await Digit.UploadServices.Filestorage(
        "PT", // module name
        file,
        Digit.ULBService.getStateId()
      );

      if (response?.data?.files?.length > 0) {
        const fileStoreId = response.data.files[0].fileStoreId;

        setDocuments((prev) => ({
          ...prev,
          [key]: {
            file,
            fileStoreId,
            documentUid: fileStoreId,
            name: file.name,
            type: file.type,
          },
        }));
      } else {
        setError(t("CS_FILE_UPLOAD_ERROR"));
      }
    } catch (err) {

      setError(t("CS_FILE_UPLOAD_ERROR"));
    }
  };


  const handleOwnershipTypeChange = (val) => {

    setOwnershipType(val.code);

    // ❗ Only reset if required. Don't reset if owners already exist.
    if (val.code === "INDIVIDUAL.SINGLEOWNER") {
      setOwners((prev) => [prev[0]]); // keep first only
    } else if (val.code === "INDIVIDUAL.MULTIPLEOWNERS") {
      // Do nothing if owners already prefilled
      if (owners.length === 0) {
        setOwners([{}]); // fallback if empty
      }
    }
  };
  const handleRestryIdChange = (e) => {
    setRegistryId(e.target.value);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, selectedOption) => {
    setAddressDetails((prev) => ({ ...prev, [field]: selectedOption }));
  };
  const handleCorrespondenceChange = (e) => {
    setCorrespondenceAddress(e.target.value);
  };

  const handleSameAsPropertyToggle = () => {
    setIsSameAsPropertyAddress((prev) => {
      const newValue = !prev;
      if (newValue) {
        setCorrespondenceAddress(addressDetails.address); // copy from property address
      } else {
        setCorrespondenceAddress("");
      }
      return newValue;
    });
  };
  const handleAssessmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssessmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnitChange = (index, key, value) => {
    const updatedUnits = [...unit];
    updatedUnits[index][key] = value;
    setUnit(updatedUnits);
  };
  const addUnit = () => {
    setUnit([
      ...unit,
      { usageType: "", usageFactor: "", floorNo: "", constructionType: "", area: "" },
    ]);
  };
  const handlePropertyDetailsChange = (field, value) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoadFactorChange = (selected) => {
    setAssessmentDetails((prev) => ({ ...prev, roadFactor: selected }));
  };
  const updateRateZone = (value) => {
    setRateZones(value);
  }
  useEffect(() => {
    if (rateZones.length > 0) {
      setAssessmentDetails(prev => ({
        ...prev,
        rateZone: rateZones[0].name,
      }));
    }
  }, [rateZones]);
  const addNewOwner = () => {
    setOwners([...owners, {}]); // Add a new empty owner object
    setIsJointStarted(true);
  };
  const handleCheckboxChange = (field) => {
    setCheckboxes((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  // if (isLoadings) {
  //   return <Loader />;
  // }

  // if (createLoader) {
  //   return <Loader />;
  // }
  // if (ptCalculationEstimateLoading) {
  //   return <Loader />;
  // }



  return (

    <React.Fragment>
      <div style={styles.assessmentStyles}>New Property Application</div>
      {!showSuccessModal && (
        <div >

          {/* Attachments Section */}
          <div style={styles.card}>
            <AttachmentsSection
              t={t}
              handleFileChange={handleFileChange}
              styles={styles}
              formErrors={formErrors}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Ownership Details")}</div>

            <OwnershipDetailsSection
              t={t}
              ownershipType={ownershipType}
              handleOwnershipTypeChange={handleOwnershipTypeChange}
              handleRestryIdChange={handleRestryIdChange}
              registryId={registryId}
              owners={owners}
              setOwners={setOwners}
              addNewOwner={addNewOwner}
              isJointStarted={isJointStarted}
              styles={styles}
              formErrors={formErrors}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Property Address")}</div>
            <AddressSection
              t={t}
              addressDetails={addressDetails}
              handleInputChange={handleInputChange}
              handleDropdownChange={handleDropdownChange}
              updateRateZone={updateRateZone}
              styles={styles}
              formErrors={formErrors}
            />
          </div>
          <div style={styles.card}>
            <CorrespondenceAddressSection
              t={t}
              correspondenceAddress={correspondenceAddress}
              handleCorrespondenceChange={handleCorrespondenceChange}
              isSameAsPropertyAddress={isSameAsPropertyAddress}
              handleSameAsPropertyToggle={handleSameAsPropertyToggle}
              styles={styles}
              formErrors={formErrors}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Assessment Details")}</div>
            <AssessmentDetailsSection
              t={t}
              assessmentDetails={assessmentDetails}
              handleAssessmentInputChange={handleAssessmentInputChange}
              handleRoadFactorChange={handleRoadFactorChange}
              styles={styles}
              formErrors={formErrors}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.assessmentStyle}>{t("Property Details")}</div>
            <PropertyDetailsTableSection
              t={t}
              unit={unit}
              handleUnitChange={handleUnitChange}
              addUnit={addUnit}
              styles={styles}
              formErrors={formErrors}
            />
          </div>
          <div style={styles.card}>
            <OtherDetailsSection
              t={t}
              propertyDetails={propertyDetails}
              handlePropertyDetailsChange={handlePropertyDetailsChange}
              checkboxes={checkboxes}
              handleCheckboxChange={handleCheckboxChange}
              styles={styles}
              formErrors={formErrors}
            />

            {showAssessmentPop && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>

                  <div style={styles.poppinsLabel}>
                    {t("Select Assessment Year")} <span className="mandatory" style={styles.mandatory}>*</span>
                  </div>
                  <Dropdown
                    style={styles.widthInput300Ass}
                    t={t}
                    option={assessmentYears} // dynamic list
                    selected={assessmentYears.find(item => item.code === selectedAssessmentYear?.code)}
                    select={(value) => setSelectedAssessmentYear(value)}
                    optionKey="name"
                    placeholder={t("Select")}
                  />
                  {formErrors.selectedAssessmentYear && (
                    <p style={{ color: "red", fontSize: "12px" }}>{formErrors.selectedAssessmentYear}</p>
                  )}
                  <div style={{ display: "flex", gap: "40px" }}>
                    <SubmitBar label={t("Back")} onSubmit={backToNew} style={{ background: "#6b133f" }} />
                    <SubmitBar label={t("Confirm")} onSubmit={handleEstimate} style={{ background: "#6b133f" }} />
                  </div>

                </div>
              </div>
            )}
            <div style={styles.buttonContainer}>
              {showPreviewButton && (
                <SubmitBar label={t("Preview")} onSubmit={PreviewDemand} style={{ background: "#6b133f" }} />
              )}
              {!showPreviewButton && (
                <SubmitBar label={t("Save")} onSubmit={handleSubmit} style={{ background: "#6b133f" }} />
              )}
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal
          t={t}
          applicationNumber={acknowledgmentNumber} // <-- dynamic
          propertyId={propertyId}                  // <-- optional, if modal accepts it
          status={status}                          // <-- optional
          onClose={() => setShowSuccessModal(false)}
          styles={styles}

        />
      )}
    </React.Fragment>
  );
};

export default NewApplication;



