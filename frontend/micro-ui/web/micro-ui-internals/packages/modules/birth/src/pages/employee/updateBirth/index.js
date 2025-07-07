import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FormComposerV2, Header, Toast, Loader } from "@egovernments/digit-ui-components";
import { BirthConfig } from "../createBirth/config/BirthConfig";
import { useTranslation } from "react-i18next";

// Main component for updating a birth certificate
const UpdateBirth = () => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  // Get data passed from previous page (edit data and certificate id)
  const editData = location.state?.editdata;
  const certificateId = location.state?.certificateId;

  // State for form config, initial values, toast, and address checkbox
  const [formConfig, setFormConfig] = useState(() => JSON.parse(JSON.stringify(BirthConfig)));
  const [initialValues, setInitialValues] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const prevCheckboxRef = useRef(false);

  // Fetch hospital list from MDMS
  const hospitalTenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
    hospitalTenantId,
    "birth-death-service",
    [{ name: "hospitalList" }],
    {
      select: (data) => {
        // Filter and map hospital list for dropdown options
        const hospitalOptions = data?.["birth-death-service"]?.hospitalList
          ?.filter((hospital) => hospital.active === "true" || hospital.active === true)
          .map((hospital) => ({
            code: hospital.hospitalName,
            name: `COMMON_HOSPITAL_${hospital.hospitalName.replace(/\s+/g, "_").toUpperCase()}`,
            originalName: hospital.hospitalName,
          }));
        return {
          hospitalListOptions: hospitalOptions || [],
        };
      },
    }
  );

  // Gender dropdown options
  const genderOptions = [
    { code: "MALE", name: "COMMON_GENDER_MALE" },
    { code: "FEMALE", name: "COMMON_GENDER_FEMALE" },
    { code: "TRANSGENDER", name: "COMMON_GENDER_TRANSGENDER" },
  ];

  // Map gender number from API to gender option object
  const getMdmsGenderOption = (genderNum) => {
    switch (genderNum) {
      case 1:
        return genderOptions.find((opt) => opt.code === "MALE");
      case 2:
        return genderOptions.find((opt) => opt.code === "FEMALE");
      case 3:
        return genderOptions.find((opt) => opt.code === "TRANSGENDER");
      default:
        return undefined;
    }
  };

  // Update form config based on "same as permanent address" checkbox
  const updateConfigBasedOnSameAddressCheckbox = (isChecked, currentConfigToUpdate) => {
    return currentConfigToUpdate
      .map((section) => {
        if (section.head === "Address of Parents at the Time of Birth") {
          return {
            ...section,
            body: section.body.map((field) => ({
              ...field,
              isMandatory: isChecked
                ? true
                : BirthConfig.find((s) => s.head === section.head)?.body.find((f) => f.populators?.name === field.populators?.name)?.isMandatory ||
                  false,
            })),
          };
        }
        if (section.head === "Permanent Address of Parents" && isChecked) {
          return null; // Hide permanent address section if checkbox is checked
        }
        return section;
      })
      .filter(Boolean);
  };

  // On mount or when editData/hospitalListData changes, set initial form values and config
  useEffect(() => {
    if (editData && hospitalListData?.hospitalListOptions) {
      const transformedApiData = transformApiDataToForm(editData, hospitalListData.hospitalListOptions);
      setInitialValues(transformedApiData);

      const initialSameAddress = !!transformedApiData.same_as_permanent_address;
      setSameAddressChecked(initialSameAddress);
      prevCheckboxRef.current = initialSameAddress;

      let newConfig = JSON.parse(JSON.stringify(BirthConfig));

      // Set hospital dropdown options and disable field
      newConfig = newConfig.map((section) => ({
        ...section,
        body: section.body.map((field) => {
          if (field.populators?.name === "hospital_name") {
            return {
              ...field,
              disable: true,
              populators: {
                ...field.populators,
                options: hospitalListData.hospitalListOptions,
              },
            };
          }
          return field;
        }),
      }));

      // Update config based on address checkbox
      newConfig = updateConfigBasedOnSameAddressCheckbox(initialSameAddress, newConfig);
      setFormConfig(newConfig);
    }
  }, [editData, hospitalListData]);

  // --- START: MODIFIED SECTION ---
  // Transform address data from API to form fields
  const transformAddressData = (apiData) => {
    const presentAddr = apiData?.birthPresentaddr;
    const permAddr = apiData?.birthPermaddr;

    // A more robust check for address equality that only compares relevant fields.
    // This prevents mismatches due to metadata like 'id' or 'fullAddress' fields.
    const checkAddressEquality = (addr1, addr2) => {
      // If either address is missing, they are not the same.
      if (!addr1 || !addr2) {
        return false;
      }
      const fieldsToCompare = ["buildingno", "houseno", "streetname", "locality", "tehsil", "district", "city", "state", "country", "pinno"];

      // An address is considered "empty" if all its relevant fields are null or empty strings.
      // We don't want to consider two empty addresses as "the same" for ticking the checkbox.
      const isAddr1Empty = fieldsToCompare.every((field) => !addr1[field]);
      const isAddr2Empty = fieldsToCompare.every((field) => !addr2[field]);
      if (isAddr1Empty && isAddr2Empty) {
        return false;
      }

      // Compare each relevant field, treating null/undefined as an empty string.
      for (const field of fieldsToCompare) {
        const val1 = addr1[field] || "";
        const val2 = addr2[field] || "";
        if (val1 !== val2) {
          return false;
        }
      }
      return true;
    };

    const isSameAddress = checkAddressEquality(presentAddr, permAddr);

    // Map address fields to form fields
    return {
      birth_building_number: presentAddr?.buildingno || "",
      birth_house_no: presentAddr?.houseno || "",
      birth_street_name: presentAddr?.streetname || "",
      birth_locality: presentAddr?.locality || "",
      birth_tehsil: presentAddr?.tehsil || "",
      birth_district: presentAddr?.district || "",
      birth_city: presentAddr?.city || "",
      birth_state: presentAddr?.state || "",
      birth_country: presentAddr?.country || "",
      birth_pincode: presentAddr?.pinno || "",
      same_as_permanent_address: isSameAddress,
      // If addresses are the same, clear the permanent address form fields
      // to avoid confusion and ensure they are not submitted when the section is hidden.
      permanent_building_number: isSameAddress ? "" : permAddr?.buildingno || "",
      permanent_house_no: isSameAddress ? "" : permAddr?.houseno || "",
      permanent_street_name: isSameAddress ? "" : permAddr?.streetname || "",
      permanent_locality: isSameAddress ? "" : permAddr?.locality || "",
      permanent_tehsil: isSameAddress ? "" : permAddr?.tehsil || "",
      permanent_district: isSameAddress ? "" : permAddr?.district || "",
      permanent_city: isSameAddress ? "" : permAddr?.city || "",
      permanent_state: isSameAddress ? "" : permAddr?.state || "",
      permanent_country: isSameAddress ? "" : permAddr?.country || "",
      permanent_pincode: isSameAddress ? "" : permAddr?.pinno || "",
    };
  };

  // Transform API data to form initial values
  const transformApiDataToForm = (apiData, hospitalOptions = []) => {
    // Convert epoch to date string (YYYY-MM-DD)
    const convertToDate = (epoch) => {
      if (!epoch && epoch !== 0) return "";
      const date = new Date(epoch);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    };

    // Find selected hospital option
    const hospitalNameFromApi = apiData?.hospitalname;
    const selectedHospital = hospitalOptions.find((option) => option.originalName === hospitalNameFromApi || option.code === hospitalNameFromApi);

    // Map all fields from API to form fields
    return {
      // Use !! to ensure isLegacyRecord is converted to a clean boolean (true/false)
      checkbox_legacy: !!apiData?.isLegacyRecord,
      registration_number: apiData?.registrationno || "",
      hospital_name: selectedHospital || undefined,
      date_of_registration: convertToDate(apiData.dateofreport),
      date_of_birth: convertToDate(apiData.dateofbirth),
      gender: getMdmsGenderOption(apiData?.gender),
      child_first_name: apiData?.firstname || "",
      child_middle_name: apiData?.middlename || "",
      child_last_name: apiData?.lastname || "",
      birth_place: apiData?.placeofbirth || "",
      father_first_name: apiData?.birthFatherInfo?.firstname || "",
      father_middle_name: apiData?.birthFatherInfo?.middlename || "",
      father_last_name: apiData?.birthFatherInfo?.lastname || "",
      father_aadhar_number: apiData?.birthFatherInfo?.aadharno || "",
      father_email_id: apiData?.birthFatherInfo?.emailid || "",
      father_mobile_number: apiData?.birthFatherInfo?.mobileno || "",
      father_education: apiData?.birthFatherInfo?.education || "",
      father_profession: apiData?.birthFatherInfo?.profession || "",
      father_nationality: apiData?.birthFatherInfo?.nationality || "",
      father_religion: apiData?.birthFatherInfo?.religion || "",
      mother_first_name: apiData?.birthMotherInfo?.firstname || "",
      mother_middle_name: apiData?.birthMotherInfo?.middlename || "",
      mother_last_name: apiData?.birthMotherInfo?.lastname || "",
      mother_aadhar_number: apiData?.birthMotherInfo?.aadharno || "",
      mother_email_id: apiData?.birthMotherInfo?.emailid || "",
      mother_mobile_number: apiData?.birthMotherInfo?.mobileno || "",
      mother_education: apiData?.birthMotherInfo?.education || "",
      mother_profession: apiData?.birthMotherInfo?.profession || "",
      mother_nationality: apiData?.birthMotherInfo?.nationality || "",
      mother_religion: apiData?.birthMotherInfo?.religion || "",
      ...transformAddressData(apiData),
      informant_name: apiData?.informantsname || "",
      informant_address: apiData?.informantsaddress || "",
      remarks: apiData?.remarks || "",
    };
  };
  // --- END: MODIFIED SECTION ---

  // Map gender object from form to API payload values
  const mapGenderToPayload = (genderObj) => {
    if (!genderObj || !genderObj.code) return { gender: null, genderStr: "" };
    switch (genderObj.code.toUpperCase()) {
      case "MALE":
        return { gender: 1, genderStr: "Male" };
      case "FEMALE":
        return { gender: 2, genderStr: "Female" };
      case "TRANSGENDER":
        return { gender: 3, genderStr: "Transgender" };
      case "OTHER":
        return { gender: 4, genderStr: "Other" };
      default:
        return { gender: null, genderStr: "" };
    }
  };

  // Convert date string to epoch (milliseconds)
  const toEpoch = (dateStr) => (dateStr ? Math.floor(new Date(dateStr).getTime()) : undefined);

  // Transform form data to API update payload
  const transformFormDataForUpdate = (formData) => {
    const { gender, genderStr } = mapGenderToPayload(formData?.gender);

    // Convert date strings to milliseconds (epoch)
    const dobMs = toEpoch(formData?.date_of_birth);
    const dorMs = toEpoch(formData?.date_of_registration);

    // Helper to create full name string
    const createFullName = (first, middle, last) => [first, middle, last].filter(Boolean).join(" ");

    // Helper to create full address string
    const createFullAddress = (addr) =>
      [addr.houseno, addr.buildingno, addr.streetname, addr.locality, addr.tehsil, addr.district, addr.city, addr.state, addr.pinno, addr.country]
        .filter(Boolean)
        .join(" ");

    // Prepare present address object
    const presentAddressData = {
      buildingno: formData?.birth_building_number || null,
      houseno: formData?.birth_house_no || null,
      streetname: formData?.birth_street_name || null,
      locality: formData?.birth_locality || null,
      tehsil: formData?.birth_tehsil || null,
      district: formData?.birth_district || null,
      city: formData?.birth_city || null,
      state: formData?.birth_state || null,
      country: formData?.birth_country || null,
      pinno: formData?.birth_pincode || null,
    };
    presentAddressData.fullAddress = createFullAddress(presentAddressData);

    // Prepare permanent address object (copy present if checkbox checked)
    const permanentAddressData = formData?.same_as_permanent_address
      ? presentAddressData
      : {
          buildingno: formData?.permanent_building_number || null,
          houseno: formData?.permanent_house_no || null,
          streetname: formData?.permanent_street_name || null,
          locality: formData?.permanent_locality || null,
          tehsil: formData?.permanent_tehsil || null,
          district: formData?.permanent_district || null,
          city: formData?.permanent_city || null,
          state: formData?.permanent_state || null,
          country: formData?.permanent_country || null,
          pinno: formData?.permanent_pincode || null,
        };
    permanentAddressData.fullAddress = createFullAddress(permanentAddressData);

    // Return the full payload object for update API
    return {
      // --- Core fields from the working API structure ---
      id: certificateId,
      createdby: editData?.createdby,
      createdtime: editData?.createdtime,
      dateofbirth: dobMs,
      dateofreport: dorMs,
      dateofbirthepoch: dobMs ? Math.floor(dobMs / 1000) : null,
      dateofreportepoch: dorMs ? Math.floor(dorMs / 1000) : null,
      excelrowindex: -1, // As per working example
      dateofissue: editData?.dateofissue || null,
      firstname: formData?.child_first_name || null,
      gender,
      genderStr,
      hospitalname: formData?.hospital_name?.code || formData?.hospital_name?.originalName || editData?.hospitalname,
      informantsaddress: formData?.informant_address || null,
      informantsname: formData?.informant_name || null,
      lastname: formData?.child_last_name || null,
      middlename: formData?.child_middle_name || null,
      placeofbirth: formData?.birth_place || null,
      registrationno: formData?.registration_number || editData?.registrationno,
      remarks: formData?.remarks || null,
      lastmodifiedby: editData?.lastmodifiedby,
      lastmodifiedtime: editData?.lastmodifiedtime,
      counter: editData?.counter || 1,
      tenantid: Digit.ULBService.getCurrentTenantId(),
      embeddedUrl: editData?.embeddedUrl || null,
      hospitalid: editData?.hospitalid,
      fullName: createFullName(formData?.child_first_name, formData?.child_middle_name, formData?.child_last_name),
      isLegacyRecord: !!formData?.checkbox_legacy,
      birthcertificateno: editData?.birthcertificateno || null,
      rejectReason: editData?.rejectReason || null,

      // --- Nested Objects ---
      birthFatherInfo: {
        ...editData?.birthFatherInfo,
        aadharno: formData?.father_aadhar_number || null,
        education: formData?.father_education || null,
        emailid: formData?.father_email_id || null,
        firstname: formData?.father_first_name || null,
        lastname: formData?.father_last_name || null,
        middlename: formData?.father_middle_name || null,
        mobileno: formData?.father_mobile_number || null,
        nationality: formData?.father_nationality || null,
        proffession: formData?.father_profession || null,
        religion: formData?.father_religion || null,
        fullName: createFullName(formData?.father_first_name, formData?.father_middle_name, formData?.father_last_name),
      },
      birthMotherInfo: {
        ...editData?.birthMotherInfo,
        aadharno: formData?.mother_aadhar_number || null,
        education: formData?.mother_education || null,
        emailid: formData?.mother_email_id || null,
        firstname: formData?.mother_first_name || null,
        lastname: formData?.mother_last_name || null,
        middlename: formData?.mother_middle_name || null,
        mobileno: formData?.mother_mobile_number || null,
        nationality: formData?.mother_nationality || null,
        proffession: formData?.mother_profession || null,
        religion: formData?.mother_religion || null,
        fullName: createFullName(formData?.mother_first_name, formData?.mother_middle_name, formData?.mother_last_name),
      },
      birthPermaddr: {
        ...editData?.birthPermaddr,
        ...permanentAddressData,
      },
      birthPresentaddr: {
        ...editData?.birthPresentaddr,
        ...presentAddressData,
      },
    };
  };

  // API mutation hook for update
  const reqUpdate = {
    url: "/birth-death-services/common/updatebirthimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {},
    config: { enabled: true },
  };
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqUpdate);

  // Handle form submit
  const onSubmit = async (formData) => {
    const payload = {
      birthCerts: [transformFormDataForUpdate(formData)],
    };

    await mutation.mutate(
      { body: payload },
      {
        onSuccess: (response) => {
          if (response?.statsMap?.["Sucessful Records"] > 0) {
            setShowToast({ key: "success", label: "Birth Certificate Updated Successfully" });
            setTimeout(() => history.push(`/${window.contextPath}/employee/birth/birth-common/getCertificate`), 1000);
          } else {
            const errorMsg =
              response?.serviceError || response?.errorRowMap?.[Object.keys(response.errorRowMap)[0]]?.[0] || "Update failed with logical errors.";
            setShowToast({ key: "error", label: `Failed to Update: ${errorMsg}` });
          }
        },
        onError: (error) => {
          console.error("API Update Error:", error);
          setShowToast({
            key: "error",
            label: "Failed to Update Birth Certificate: " + (error?.response?.data?.Errors?.[0]?.message || error.message),
          });
        },
      }
    );
  };

  // Handle form value change (especially for address checkbox)
  const onFormValueChange = (setValue, formData, formState) => {
    const currentIsSameAddressChecked = !!formData?.same_as_permanent_address;
    if (prevCheckboxRef.current !== currentIsSameAddressChecked) {
      prevCheckboxRef.current = currentIsSameAddressChecked;
      setSameAddressChecked(currentIsSameAddressChecked);

      setFormConfig((prevCurrentConfig) => updateConfigBasedOnSameAddressCheckbox(currentIsSameAddressChecked, prevCurrentConfig));
    }
  };

  // Show loader while fetching data
  if (hospitalListLoading || (!initialValues && editData)) {
    return <Loader />;
  }
  // Show error if no data to edit
  if (!editData) {
    return <div>Error: No data to edit. Please go back and select a record.</div>;
  }


  return (
    <React.Fragment>
      <Header>{t("BND_UPDATE_REGISTRATION")}</Header>
      <FormComposerV2
        config={formConfig}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        label="UPDATE"
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

export default UpdateBirth;