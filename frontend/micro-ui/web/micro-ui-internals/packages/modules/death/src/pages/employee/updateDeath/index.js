import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FormComposerV2, Toast, Loader } from "@egovernments/digit-ui-components";
import createDeathConfig from "../createDeath/createDeathConfig";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";
const UpdateDeath = () => {
  const location = useLocation();
  const history = useHistory();
  const editData = location.state?.editdata;
  const certificateId = location.state?.certificateId;
  const { t } = useTranslation();

  const [formConfig, setFormConfig] = useState(() => JSON.parse(JSON.stringify(createDeathConfig)));
  const [initialValues, setInitialValues] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const prevCheckboxRef = useRef(false);
  const prevLegacyCheckboxRef = useRef(false);

  const hospitalTenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
    hospitalTenantId,
    "birth-death-service",
    [{ "name": "hospitalList" }],
    {
      select: (data) => {
        const hospitalOptions = data?.["birth-death-service"]?.hospitalList
          ?.filter(hospital => hospital.active === "true" || hospital.active === true)
          .map(hospital => ({
            code: hospital.hospitalName,
            name: `COMMON_HOSPITAL_${hospital.hospitalName.replace(/\s+/g, '_').toUpperCase()}`,
            originalName: hospital.hospitalName
          }));
        return {
          hospitalListOptions: hospitalOptions || []
        };
      },
    }
  );

  const genderOptions = [
    { code: "MALE", name: "COMMON_GENDER_MALE" },
    { code: "FEMALE", name: "COMMON_GENDER_FEMALE" },
    { code: "TRANSGENDER", name: "COMMON_GENDER_TRANSGENDER" },
    { code: "OTHER", name: "COMMON_GENDER_OTHER" },
  ];

  const getMdmsGenderOption = (genderNum) => {
    switch (genderNum) {
      case 1: return genderOptions.find(opt => opt.code === "MALE");
      case 2: return genderOptions.find(opt => opt.code === "FEMALE");
      case 3: return genderOptions.find(opt => opt.code === "TRANSGENDER");
      case 4: return genderOptions.find(opt => opt.code === "OTHER");
      default: return undefined;
    }
  };
  
  const updateConfigBasedOnSameAddressCheckbox = (isChecked, currentConfigToUpdate) => {
    return currentConfigToUpdate.map((section) => {
      if (section.head === "BND_PRESENT_ADDR_DURING_DEATH") { // Ensure this head key matches createDeathConfig
        return {
          ...section,
          body: section.body.map((field) => ({
            ...field,
            isMandatory: isChecked ? true : (createDeathConfig.find(s => s.head === section.head)?.body.find(f => f.populators?.name === field.populators?.name)?.isMandatory || false),
          })),
        };
      }
      if (section.head === "BND_DEATH_ADDR_PERM" && isChecked) { // Ensure this head key matches createDeathConfig
        return null; 
      }
      return section;
    }).filter(Boolean); 
  };

  useEffect(() => {
    if (editData && hospitalListData?.hospitalListOptions) {
      const transformedApiData = transformApiDataToForm(editData, hospitalListData.hospitalListOptions);
      setInitialValues(transformedApiData);

      const initialSameAddress = !!transformedApiData.sameAddressCheckbox;
      setSameAddressChecked(initialSameAddress);
      prevCheckboxRef.current = initialSameAddress;

      const initialIsLegacy = !!transformedApiData.checkboxlabel;
      prevLegacyCheckboxRef.current = initialIsLegacy;

      let newConfig = JSON.parse(JSON.stringify(createDeathConfig));

      newConfig = newConfig.map(section => ({
        ...section,
        body: section.body.map(field => {
          if (field.populators?.name === "HospitalName") {
            return {
              ...field,
              disable: true, 
              populators: {
                ...field.populators,
                options: hospitalListData.hospitalListOptions,
                optionsKey: field.populators.optionsKey || "name",
              },
            };
          }
          return field;
        }),
      }));

      newConfig = newConfig.map(section => ({
        ...section,
        body: section.body.map(field => {
          if (field.populators?.name === "RegistrationNumber") {
            return {
              ...field,
              disable: true,
              isMandatory: initialIsLegacy,
              validation: { ...(field.validation || {}), required: initialIsLegacy },
              populators: {
                ...field.populators,
                error: initialIsLegacy ? (field.populators?.error || "Registration Number is Required!") : undefined,
              },
            };
          }

          return field;
        })
      }));
      
      newConfig = updateConfigBasedOnSameAddressCheckbox(initialSameAddress, newConfig);
      
      setFormConfig(newConfig);
    }
  }, [editData, hospitalListData]);


  const transformAddressData = (apiData) => {
    const presentAddr = apiData?.deathPresentaddr || {};
    const permAddr = apiData?.deathPermaddr || {};
    
    const checkSame = (addr1, addr2) => {
        const keys1 = Object.keys(addr1);
        const keys2 = Object.keys(addr2);
        if (keys1.length === 0 && keys2.length === 0) return true;
        if (keys1.length !== keys2.length) return false;
        for (let key of keys1) {
            if ((addr1[key] || "") !== (addr2[key] || "")) return false;
        }
        return true;
    };
    const isSameAddress = checkSame(presentAddr, permAddr) && (Object.keys(presentAddr).length > 0 || Object.keys(permAddr).length > 0);

    return {
      buildingNumber: presentAddr?.buildingno || "", // Key for present address building no
      houseNo: presentAddr?.houseno || "",
      streetName: presentAddr?.streetname || "",
      locality: presentAddr?.locality || "",
      tehsil: presentAddr?.tehsil || "",
      district: presentAddr?.district || "",
      city: presentAddr?.city || "",
      state: presentAddr?.state || "",
      country: presentAddr?.country || "",
      pincode: presentAddr?.pinno || "",
      sameAddressCheckbox: isSameAddress,
      permanentBuildingNumber: isSameAddress ? "" : (permAddr?.buildingno || ""), // Key for permanent address building no
      permanentHouseNo: isSameAddress ? "" : (permAddr?.houseno || ""),
      permanentStreetName: isSameAddress ? "" : (permAddr?.streetname || ""),
      permanentLocality: isSameAddress ? "" : (permAddr?.locality || ""),
      permanentTehsil: isSameAddress ? "" : (permAddr?.tehsil || ""),
      permanentDistrict: isSameAddress ? "" : (permAddr?.district || ""),
      permanentCity: isSameAddress ? "" : (permAddr?.city || ""),
      permanentState: isSameAddress ? "" : (permAddr?.state || ""),
      permanentCountry: isSameAddress ? "" : (permAddr?.country || ""),
      permanentPincode: isSameAddress ? "" : (permAddr?.pinno || "")
    };
  };

  const transformApiDataToForm = (apiData, hospitalOptions = []) => {
    const convertToDate = (epoch) => {
      if (!epoch && epoch !==0) return "";
      const date = new Date(epoch);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    };

    const hospitalNameFromApi = apiData?.hospitalname;
    const selectedHospital = hospitalOptions.find(
      option => option.originalName === hospitalNameFromApi || option.code === hospitalNameFromApi
    );

    return {
      checkboxlabel: apiData?.isLegacyRecord || false,
      RegistrationNumber: apiData?.registrationno || "",
      HospitalName: selectedHospital || undefined, 
      doRegistration: convertToDate(apiData.dateofreport),
      dob: convertToDate(apiData.dateofdeath),
      Gender: getMdmsGenderOption(apiData?.gender),
      age: apiData?.age || "",
      FirstName: apiData?.firstname || "", MiddleName: apiData?.middlename || "", LastName: apiData?.lastname || "",
      EIDNumber: apiData?.eidno || "", AadharNumber: apiData?.aadharno || "",
      Nationality: apiData?.nationality || "", Religion: apiData?.religion || "",
      DeathPlace: apiData?.placeofdeath || "", ICDCode: apiData?.icdcode || "",
      FirstName2: apiData?.deathSpouseInfo?.firstname || "", MiddleName2: apiData?.deathSpouseInfo?.middlename || "", LastName2: apiData?.deathSpouseInfo?.lastname || "",
      AadharNumber2: apiData?.deathSpouseInfo?.aadharno || "", EmailID: apiData?.deathSpouseInfo?.emailid || "", MobileNumber: apiData?.deathSpouseInfo?.mobileno || "",
      FirstName3: apiData?.deathFatherInfo?.firstname || "", MiddleName3: apiData?.deathFatherInfo?.middlename || "", LastName3: apiData?.deathFatherInfo?.lastname || "",
      AadharNumber3: apiData?.deathFatherInfo?.aadharno || "", EmailID2: apiData?.deathFatherInfo?.emailid || "", MobileNumber2: apiData?.deathFatherInfo?.mobileno || "",
      FirstName4: apiData?.deathMotherInfo?.firstname || "", MiddleName4: apiData?.deathMotherInfo?.middlename || "", LastName4: apiData?.deathMotherInfo?.lastname || "",
      AadharNumber4: apiData?.deathMotherInfo?.aadharno || "", emailId3: apiData?.deathMotherInfo?.emailid || "", mobileNumber3: apiData?.deathMotherInfo?.mobileno || "",
      ...transformAddressData(apiData),
      informantName: apiData?.informantsname || "", informantAddress: apiData?.informantsaddress || "",
      remarks: apiData?.remarks || "",
    };
  };

  const mapGenderToPayload = (genderObj) => {
    if (!genderObj || !genderObj.code) return { gender: null, genderStr: "" };
    switch (genderObj.code.toUpperCase()) {
      case "MALE": return { gender: 1, genderStr: "Male" };
      case "FEMALE": return { gender: 2, genderStr: "Female" };
      case "TRANSGENDER": return { gender: 3, genderStr: "Transgender" };
      case "OTHER": return { gender: 4, genderStr: "Other" };
      default: return { gender: null, genderStr: "" };
    }
  };

  const toEpoch = (dateStr) => dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined; 

  const transformFormDataForUpdate = (formData) => {
    const { gender, genderStr } = mapGenderToPayload(formData?.Gender);
    const presentAddress = {
      buildingno: formData?.buildingNumber || "", houseno: formData?.houseNo || "",
      district: formData?.district || "", streetname: formData?.streetName || "",
      tehsil: formData?.tehsil || "", city: formData?.city || "",
      country: formData?.country || "", locality: formData?.locality || "",
      pinno: formData?.pincode || "", state: formData?.state || "",
    };

    const permanentAddress = formData?.sameAddressCheckbox ? presentAddress : {
      buildingno: formData?.permanentBuildingNumber || "", houseno: formData?.permanentHouseNo || "",
      district: formData?.permanentDistrict || "", streetname: formData?.permanentStreetName || "",
      tehsil: formData?.permanentTehsil || "", city: formData?.permanentCity || "",
      country: formData?.permanentCountry || "", locality: formData?.permanentLocality || "",
      pinno: formData?.permanentPincode || "", state: formData?.permanentState || "",
    };

    const registrationNumberForPayload = formData?.RegistrationNumber || editData?.registrationno || "";

    return {
      id: certificateId,
      age: String(formData?.age || ""),
      counter: editData?.counter || 1, 
      dateofdeathepoch: toEpoch(formData?.dob), // Uses the corrected toEpoch
      dateofreportepoch: toEpoch(formData?.doRegistration), // Uses the corrected toEpoch
      deathFatherInfo: { ...editData?.deathFatherInfo, 
        firstname: formData?.FirstName3 || "", middlename: formData?.MiddleName3 || "", lastname: formData?.LastName3 || "",
        emailid: formData?.EmailID2 || "", mobileno: formData?.MobileNumber2 || "", aadharno: formData?.AadharNumber3 || "" },
      deathMotherInfo: { ...editData?.deathMotherInfo,
        firstname: formData?.FirstName4 || "", middlename: formData?.MiddleName4 || "", lastname: formData?.LastName4 || "",
        emailid: formData?.emailId3 || "", mobileno: formData?.mobileNumber3 || "", aadharno: formData?.AadharNumber4 || "" },
      deathSpouseInfo: { ...editData?.deathSpouseInfo,
        firstname: formData?.FirstName2 || "", middlename: formData?.MiddleName2 || "", lastname: formData?.LastName2 || "",
        emailid: formData?.EmailID || "", mobileno: formData?.MobileNumber || "", aadharno: formData?.AadharNumber2 || "" },
      deathPermaddr: { ...editData?.deathPermaddr, ...permanentAddress }, 
      deathPresentaddr: { ...editData?.deathPresentaddr, ...presentAddress }, 
      eidno: formData?.EIDNumber || "",
      excelrowindex: editData?.excelrowindex === 0 ? 0 : (editData?.excelrowindex || -1),
      firstname: formData?.FirstName || "",
      middlename: formData?.MiddleName || "",
      lastname: formData?.LastName || "",
      gender,
      genderStr,
      hospitalname: formData?.HospitalName?.code || formData?.HospitalName?.originalName || editData?.hospitalname || "Others",
      hospitalid: editData?.hospitalid, 
      icdcode: formData?.ICDCode || "",
      informantsname: formData?.informantName || "",
      informantsaddress: formData?.informantAddress || "",
      isLegacyRecord: !!formData?.checkboxlabel,
      // registrationno: formData?.checkboxlabel ? (formData?.RegistrationNumber || "") : (editData?.isLegacyRecord ? editData?.registrationno : ""),
      registrationno:registrationNumberForPayload,
      aadharno: formData?.AadharNumber || "",
      nationality: formData?.Nationality || "",
      placeofdeath: formData?.DeathPlace || "",
      religion: formData?.Religion || "",
      remarks: formData?.remarks || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
      createdby: editData?.createdby,
      createdtime: editData?.createdtime,
      lastmodifiedby: editData?.lastmodifiedby, 
      lastmodifiedtime: editData?.lastmodifiedtime, 
      deathcertificateno: editData?.deathcertificateno,
      dateofissue: editData?.dateofissue,
      embeddedUrl: editData?.embeddedUrl,
      rejectReason: editData?.rejectReason, // This will be overwritten by API if successful
    };
  };

  const reqUpdate = {
    url: "/birth-death-services/common/updatedeathimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {},
    config: { enabled: true }
  };
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqUpdate);

  const onSubmit = async (formData) => {
    const payload = {
      deathCerts: [transformFormDataForUpdate(formData)]
    };
    await mutation.mutate(
      { body: payload },
      {
        onSuccess: (response) => {
          if (response?.statsMap?.["Sucessful Records"] > 0) {
            setShowToast({ key: "success", label: t("BND_DEATH_CERTIFICATE_UPDATED_SUCCESSFULLY") });
            setTimeout(() => history.push(`/${window.contextPath}/employee/death/death-common/getCertificate`), 1000); 
          } else {
            const errorMsg = response?.serviceError || response?.errorRowMap?.[Object.keys(response.errorRowMap)[0]]?.[0] || "Update failed with logical errors.";
            setShowToast({ key: "error", label: `${t("BND_DEATH_UPDATE_FAILED")}: ${errorMsg}` });
          }
        },
        onError: (error) => {
          console.error("API Update Error:", error);
          setShowToast({ key: "error", label: t("BND_DEATH_UPDATE_FAILED") + ": " + (error?.response?.data?.Errors?.[0]?.message || error.message) });
        },
      }
    );
  };

  const onFormValueChange = (setValue, formData, formState) => {
    const currentIsSameAddressChecked = !!formData?.sameAddressCheckbox;
    if (prevCheckboxRef.current !== currentIsSameAddressChecked) {
      prevCheckboxRef.current = currentIsSameAddressChecked;
      setSameAddressChecked(currentIsSameAddressChecked);

      setFormConfig(prevCurrentConfig =>
        updateConfigBasedOnSameAddressCheckbox(currentIsSameAddressChecked, prevCurrentConfig)
      );
    }

    const currentIsLegacy = !!formData?.checkboxlabel;
    if (prevLegacyCheckboxRef.current !== currentIsLegacy) {
      prevLegacyCheckboxRef.current = currentIsLegacy;

      setFormConfig(prevCurrentConfig =>
        prevCurrentConfig.map(section => ({
          ...section,
          body: section.body.map(field => {
            if (field.populators?.name === "RegistrationNumber") {
              return {
                ...field,
                isMandatory: currentIsLegacy,
                validation: { ...(field.validation || {}), required: currentIsLegacy },
                populators: {
                  ...field.populators,
                  error: currentIsLegacy ? (field.populators?.error || "Registration Number is Required!") : undefined,
                },
              };
            }
            return field;
          })
        }))
      );
    }
  }; // <-- Add this closing brace to properly end onFormValueChange

  if (hospitalListLoading || (!initialValues && editData)) {
    return <Loader />;
  }
  if(!editData) {
    return <div>Error: No data to edit. Please go back and select a record.</div>;
  }

  return (
    <React.Fragment >
      <Header>Update Death Certificate</Header>
      <FormComposerV2
        config={formConfig} 
        onSubmit={onSubmit}
        defaultValues={initialValues}
        label={t("CORE_COMMON_UPDATE")}
        onFormValueChange={onFormValueChange}
        noBreakPoint 
      />
      {showToast && (
        <Toast
          label={showToast.label}
          isDismissBtn={true}
          onClose={() => setShowToast(null)}
          error={showToast.key === "error"}
          type={showToast.key}
        />
      )}
    </React.Fragment>
  );
};

export default UpdateDeath;