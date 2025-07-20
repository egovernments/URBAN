// import { Loader } from "@egovernments/digit-ui-react-components";
// import React ,{Fragment}from "react";
// import { useTranslation } from "react-i18next";
// import { useQueryClient } from "react-query";
// import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
// import { newConfig } from "../../../config/Create/config";

// const CreateProperty = ({ parentRoute }) => {
//   const queryClient = useQueryClient();
//   const match = useRouteMatch();
//   const { t } = useTranslation();
//   const { pathname } = useLocation();
//   const history = useHistory();
//   const stateId = Digit.ULBService.getStateId();
//   let config = [];
//   const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});
//   let { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(stateId, "PropertyTax", "CommonFieldsConfig");
//   const goNext = (skipStep, index, isAddMultiple, key) => {
//     let currentPath = pathname.split("/").pop(),
//       lastchar = currentPath.charAt(currentPath.length - 1),
//       isMultiple = false,
//       nextPage;
//     if (Number(parseInt(currentPath)) || currentPath == "0" || currentPath == "-1") {
//       if (currentPath == "-1" || currentPath == "-2") {
//         currentPath = pathname.slice(0, -3);
//         currentPath = currentPath.split("/").pop();
//         isMultiple = true;
//       } else {
//         currentPath = pathname.slice(0, -2);
//         currentPath = currentPath.split("/").pop();
//         isMultiple = true;
//       }
//     } else {
//       isMultiple = false;
//     }
//     if (!isNaN(lastchar)) {
//       isMultiple = true;
//     }
//     let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
//     if (typeof nextStep == "object" && nextStep != null && isMultiple != false) {
//       if (nextStep[sessionStorage.getItem("ownershipCategory")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("ownershipCategory")]}/${index}`;
//       } else if (nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]) {
//         if (`${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}` === "un-occupied-area") {
//           nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}/${index}`;
//         } else {
//           nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}`;
//         }
//       } else if (nextStep[sessionStorage.getItem("subusagetypevar")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("subusagetypevar")]}/${index}`;
//       } else if (nextStep[sessionStorage.getItem("area")]) {
//         // nextStep = `${nextStep[sessionStorage.getItem("area")]}/${index}`;

//         if (`${nextStep[sessionStorage.getItem("area")]}` !== "map") {
//           nextStep = `${nextStep[sessionStorage.getItem("area")]}/${index}`;
//         } else {
//           nextStep = `${nextStep[sessionStorage.getItem("area")]}`;
//         }
//       } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}/${index}`;
//       } else {
//         nextStep = `${nextStep[sessionStorage.getItem("noOofBasements")]}/${index}`;
//         //nextStep = `${"floordetails"}/${index}`;
//       }
//     }
//     if (typeof nextStep == "object" && nextStep != null && isMultiple == false) {
//       if (
//         nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")] &&
//         (nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")] == "map" ||
//           nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")] == "un-occupied-area")
//       ) {
//         nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}`;
//       } else if (nextStep[sessionStorage.getItem("subusagetypevar")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("subusagetypevar")]}`;
//       } else if (nextStep[sessionStorage.getItem("area")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("area")]}`;
//       } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}`;
//       } else if (nextStep[sessionStorage.getItem("PropertyType")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("PropertyType")]}`;
//       } else if (nextStep[sessionStorage.getItem("isResdential")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("isResdential")]}`;
//       }
//     }
//     /* if (nextStep === "is-this-floor-self-occupied") {
//       isMultiple = false;
//     } */
//     let redirectWithHistory = history.push;
//     if (skipStep) {
//       redirectWithHistory = history.replace;
//     }
//     if (isAddMultiple) {
//       nextStep = key;
//     }
//     if (nextStep === null) {
//       return redirectWithHistory(`${match.path}/check`);
//     }
//     if (!isNaN(nextStep.split("/").pop())) {
//       nextPage = `${match.path}/${nextStep}`;
//     } else {
//       nextPage = isMultiple && nextStep !== "map" ? `${match.path}/${nextStep}/${index}` : `${match.path}/${nextStep}`;
//     }

//     redirectWithHistory(nextPage);
//   };

//   if(params && Object.keys(params).length>0 && window.location.href.includes("/info") && sessionStorage.getItem("docReqScreenByBack") !== "true")
//     {
//       clearParams();
//       queryClient.invalidateQueries("PT_CREATE_PROPERTY");
//     }

//   const createProperty = async () => {
//     history.push(`${match.path}/acknowledgement`);
//   };

//   function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
//     if (key === "owners") {
//       let owners = params.owners || [];
//       owners[index] = data;
//       setParams({ ...params, ...{ [key]: [...owners] } });
//     } else if (key === "units") {
//       let units = params.units || [];
//       // if(index){units[index] = data;}else{
//       units = data;

//       setParams({ ...params, units });
//     } else {
//       setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
//     }
//     goNext(skipStep, index, isAddMultiple, key);
//   }

//   const handleSkip = () => {};
//   const handleMultiple = () => {};

//   const onSuccess = () => {
//     clearParams();
//     queryClient.invalidateQueries("PT_CREATE_PROPERTY");
//   };
//   if (isLoading) {
//     return <Loader />;
//   }

//   // commonFields=newConfig;
//   /* use newConfig instead of commonFields for local development in case needed */
//   commonFields = newConfig;
//   commonFields.forEach((obj) => {
//     config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
//   });
//   config.indexRoute = "info";
//   const CheckPage = Digit?.ComponentRegistryService?.getComponent("PTCheckPage");
//   const PTAcknowledgement = Digit?.ComponentRegistryService?.getComponent("PTAcknowledgement");
//   return (
//     <Switch>
//       {config.map((routeObj, index) => {
//         const { component, texts, inputs, key } = routeObj;
//         const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
//         return (
//           <Route path={`${match.path}/${routeObj.route}`} key={index}>
//             <Component config={{ texts, inputs, key }} onSelect={handleSelect} onSkip={handleSkip} t={t} formData={params} onAdd={handleMultiple} />
//           </Route>
//         );
//       })}
//       <Route path={`${match.path}/check`}>
//         <CheckPage onSubmit={createProperty} value={params} />
//       </Route>
//       <Route path={`${match.path}/acknowledgement`}>
//         <PTAcknowledgement data={params} onSuccess={onSuccess} />
//       </Route>
//       <Route>
//         <Redirect to={`${match.path}/${config.indexRoute}`} />
//       </Route>
//     </Switch>
//   );
// };

// export default CreateProperty;




import {
  Loader, Card,
  SubmitBar,
  TextInput,
  Dropdown,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
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

const CreateProperty = () => {

  const { t } = useTranslation();
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
    lastTaxReceipt: null,
  });

  const [owners, setOwners] = useState([
    {
      title: "",
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
    }
  ]);
  const [ownershipType, setOwnershipType] = useState(null);
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
  const [assessmentDetails, setAssessmentDetails] = useState({
    rateZone: "", // Usually fetched
    roadFactor: null,
    oldPropertyId: "",
    plotArea: "",
  });
  const [unit, setUnit] = useState({
    usageType: "",
    usageFactor: "",
    floorNo: "",
    constructionType: "",
    area: "",
  });
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
  console.log("commonFieldsjjj", commonFields)
  const token = localStorage.getItem("token");
  const assessmentYears = [
    { code: "2024-25", name: "2024-25" },
    { code: "2023-24", name: "2023-24" },
    { code: "2022-23", name: "2022-23" }
  ];
let tenantIdss = Digit.ULBService.getCurrentTenantId();
console.log(tenantIdss,"tenantIdss")
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;
  const mutation = Digit.Hooks.pt.usePropertyAPI(tenantId, true);
  console.log("mutation", mutation)
  console.log("")
  const handleSubmit = async () => {
    const errors = {};

    // ---- 1. Assessment Year ----
    // if (!selectedAssessmentYear) {
    //   errors.selectedAssessmentYear = "Assessment year is required.";
    // }

    // ---- 2. Document Uploads ----
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
    if (!owner.samagraID || !/^\d+$/.test(owner.samagraID)) {
      errors.samagraID = "Samagra ID must be digits only.";
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
  if (!checkboxes.selfDeclaration) {
      errors.selfDeclaration = "Please accept the declaration to proceed.";
    }
    // ---- 6. Assessment ----
    // if (!assessmentDetails.rateZone) {
    //   errors.rateZone = "Rate zone is required.";
    // }
    // if (!assessmentDetails.roadFactor) {
    //   errors.roadFactor = "Road factor is required.";
    // }

    // ---- Final Error Check ----
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Don't submit if there are errors
      return;
    }

    const payload = {
      Property: {
        tenantId: userInfo1?.tenantId,
        oldPropertyId: assessmentDetails.oldPropertyId || null,
        selectAssessmentyear: selectedAssessmentYear?.code,

        address: {
          city: "citya",
          locality: {
            code: addressDetails.colony?.code || "SUN02",
            area: addressDetails.zone?.code || "map with zone",
          },
          street: addressDetails.address || "main",
          doorNo: addressDetails.doorNo || "23",
          pincode: addressDetails.pincode || "",
          ward: addressDetails.ward?.code || "1",
          colony: addressDetails.colony?.code || "SUN02",
          documents: [],
        },

        ownershipCategory: ownershipType || "INDIVIDUAL.SINGLEOWNER",

        owners: owners.map((owner, index) => ({
          salutation: owner.title || "mr",
          title: "title",
          name: owner.name || `Owner ${index + 1}`,
          hindiName: owner.hindiName || "",
          fatherOrHusbandName: owner.fatherHusbandName || "UnitTest",
          aadhaarNumber: owner.aadhaar || "",
          altContactNumber: owner.altNumber || "",
          isCorrespondenceAddress: correspondenceAddress,
          mobileNumber: owner.mobile || "9999999999",
          emailId: owner.email || "",
          ownerType: propertyDetails.exemption.code,
           gender: "MALE",
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

        institution: null,

        documents: [
          {
            documentType: "OWNER.IDENTITYPROOF.VOTERID",
            fileStoreId: documents.photoId?.fileStoreId || "default-filestore-photoid",
            documentUid: documents.photoId?.documentUid || "default-uid-photoid"
          },
          {
            documentType: "OWNER.REGISTRATIONPROOF.SALEDEED",
            fileStoreId: documents.sellersRegistry?.fileStoreId || "default-filestore-saledeed",
            documentUid: documents.sellersRegistry?.documentUid || "default-uid-saledeed"
          },
          {
            documentType: "OWNER.SPECIALCATEGORYPROOF.BPLDOCUMENT",
            fileStoreId: documents.ownershipDoc?.fileStoreId || "default-filestore-ownership",
            documentUid: documents.ownershipDoc?.documentUid || "default-uid-ownership"
          },
          {
            documentType: "OWNER.USAGEPROOF.ELECTRICITYBILL",
            fileStoreId: documents.lastTaxReceipt?.fileStoreId || "default-filestore-lastreceipt",
            documentUid: documents.lastTaxReceipt?.documentUid || "default-uid-lastreceipt"
          },
        ],

        units: [
          {
            usageCategory: unit.usageType || "RESIDENTIAL",
            occupancyType: unit.usageFactor || "SELFOCCUPIED",
            constructionDetail: {
              builtUpArea: unit.area || "3000",
              constructionType: unit.constructionType || null,
            },
            floorNo: parseInt(unit.floorNo) || 0,
            rateZone: assessmentDetails.rateZone || "",
            roadFactor: assessmentDetails.roadFactor?.code || "",
          },
        ],
        landArea: assessmentDetails.plotArea?.toString() || "3000",
        propertyType: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
        noOfFloors: parseInt(unit.floorNo) || 1,
        superBuiltUpArea: null,
        usageCategory: unit.usageType || "RESIDENTIAL",

        additionalDetails: {
          inflammable: false,
          heightAbove36Feet: false,
          propertyType: {
            i18nKey: "COMMON_PROPTYPE_BUILTUP_INDEPENDENTPROPERTY",
            code: propertyDetails.propertyType?.code || "BUILTUP.INDEPENDENTPROPERTY",
          },
          mobileTower: checkboxes.mobileTower || true,
          bondRoad: checkboxes.broadRoad || true,
          advertisement: checkboxes.advertisement || true,
          builtUpArea: null,
          noOfFloors: {
            i18nKey: "PT_GROUND_FLOOR_OPTION",
            code: 0,
          },
          noOofBasements: {
            i18nKey: "PT_NO_BASEMENT_OPTION",
            code: 0,
          },
          unit: [
            {
              usageCategory: unit.usageType || "RESIDENTIAL",
              occupancyType: unit.usageFactor || "SELFOCCUPIED",
              constructionDetail: {
                builtUpArea: unit.area || "3000",
                constructionType: unit.constructionType || null,
              },
              floorNo: parseInt(unit.floorNo) || 0,
              rateZone: assessmentDetails.rateZone || "",
              roadFactor: assessmentDetails.roadFactor?.code || "",
            },
          ],
          basement1: null,
          basement2: null,
        },

        channel: "CITIZEN",
        creationReason: "CREATE",
        source: "MUNICIPAL_RECORDS"
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
          setAcknowledgmentNumber(property.acknowldgementNumber);
          setPropertyId(property.propertyId);
          setStatus(property.status);
          setShowSuccessModal(true);
        }
      },
      onError: (err) => {
        console.error(err);
        alert(t("Submission failed"));
      },
    });
  };


  const PreviewDemand = () => {
    history.push("/digit-ui/employee/pt/PreviewDemand");
  };
  // const handleFileChange = (key, file) => {
  //   console.log("File changed for key:", key, "File:", file);
  //   setDocuments((prev) => ({
  //     ...prev,
  //     [key]: file,
  //   }));
  // };
  const handleFileChange = async (key, file) => {
    console.log("File changed for key:", key, "File:", file);
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
      console.error("Upload error:", err);
      setError(t("CS_FILE_UPLOAD_ERROR"));
    }
  };

  const handleOwnershipTypeChange = (selected) => {
    setOwnershipType(selected.code);
    if (selected.code !== "JOINT") {
      setOwners([{}]); // Reset to single owner if not joint
    }
  };
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

  const handleUnitChange = (field, value) => {
    setUnit((prev) => ({
      ...prev,
      [field]: value,
    }));
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



  return (

    <React.Fragment>
      {!showSuccessModal && (
        <Card style={styles.card}>
          {/* Newly Added ULB Assessment Section */}
          <div style={styles.assessmentStyle}>
            {t("Select Property ULB Year of Assessment")}
          </div>

          <div style={{ ...styles.poppinsLabel, color: "#888" }}>
            {t("Select Assessment year.")}{" "}
            <span className="mandatory" style={styles.mandatory}>*</span>
          </div>

          <Dropdown
            style={styles.widthInput300}
            t={t}
            option={assessmentYears}
            selected={selectedAssessmentYear}
            select={(value) => setSelectedAssessmentYear(value)}
            optionKey="name"
            placeholder={t("Select")}
            disable={true}
          />

          {formErrors.selectedAssessmentYear && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {formErrors.selectedAssessmentYear}
            </p>
          )}


          {/* Attachments Section */}
          <AttachmentsSection
            t={t}
            handleFileChange={handleFileChange}
            styles={styles}
            formErrors={formErrors}
          />

          <div style={styles.assessmentStyle}>{t("Ownership Details")}</div>

          <OwnershipDetailsSection
            t={t}
            ownershipType={ownershipType}
            handleOwnershipTypeChange={handleOwnershipTypeChange}
            owners={owners}
            setOwners={setOwners}
            addNewOwner={addNewOwner}
            isJointStarted={isJointStarted}
            styles={styles}
            formErrors={formErrors}
          />

          <div style={styles.assessmentStyle}>{t("Property Address")}</div>
          <AddressSection
            t={t}
            addressDetails={addressDetails}
            handleInputChange={handleInputChange}
            handleDropdownChange={handleDropdownChange}
            styles={styles}
            formErrors={formErrors}
          />
          <CorrespondenceAddressSection
            t={t}
            correspondenceAddress={correspondenceAddress}
            handleCorrespondenceChange={handleCorrespondenceChange}
            isSameAsPropertyAddress={isSameAsPropertyAddress}
            handleSameAsPropertyToggle={handleSameAsPropertyToggle}
            styles={styles}
            formErrors={formErrors}
          />
          <div style={styles.assessmentStyle}>{t("Assessment Details")}</div>
          <AssessmentDetailsSection
            t={t}
            assessmentDetails={assessmentDetails}
            handleAssessmentInputChange={handleAssessmentInputChange}
            handleRoadFactorChange={handleRoadFactorChange}
            styles={styles}
            formErrors={formErrors}
          />


          <div style={styles.assessmentStyle}>{t("Property Details")}</div>
          <PropertyDetailsTableSection
            t={t}
            unit={unit}
            handleUnitChange={handleUnitChange}
            // handleAddMoreClick={handleAddMoreClick}
            styles={styles}
            formErrors={formErrors}
          />

          <OtherDetailsSection
            t={t}
            propertyDetails={propertyDetails}
            handlePropertyDetailsChange={handlePropertyDetailsChange}
            checkboxes={checkboxes}
            handleCheckboxChange={handleCheckboxChange}
            styles={styles}
            formErrors={formErrors}
          />
          <div style={styles.buttonContainer}>
            <SubmitBar label={t("Preview")} onSubmit={PreviewDemand} />
            <SubmitBar label={t("Submit")} onSubmit={handleSubmit} />
          </div>
        </Card>
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

export default CreateProperty;



