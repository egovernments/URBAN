import { Toast, FormComposerV2 } from "@egovernments/digit-ui-components";
import React, { useState, useEffect, useRef } from "react";
import createDeathConfig from "./createDeathConfig"; // Ensure this path is correct
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header, Loader } from "@egovernments/digit-ui-react-components";

export const CreateDeath = () => {
  // Initialize formConfig with the base configuration
  const [formConfig, setFormConfig] = useState(createDeathConfig);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  // const [permanent, setPermanent] = useState(false); // 'permanent' state is set but not used in this component. Kept as per your original.
  const setValueRef = useRef(null);
  const prevLegacyCheckboxRef = useRef(false);
  const prevCheckboxRef = useRef(false);
   const { t } = useTranslation();

  const [isSubmitDisabledByDateError, setIsSubmitDisabledByDateError] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();

  // --- MDMS Hook for Hospital List ---
  const hospitalTenantId = Digit.ULBService.getCurrentTenantId(); // Specific tenant for hospital data
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

  // --- Effect to merge fetched hospital data into formConfig ---
  useEffect(() => {
    if (hospitalListData?.hospitalListOptions) {
      setFormConfig(prevConfig =>
        prevConfig.map(section => ({
          ...section,
          body: section.body.map(field => {
            if (field.populators?.name === "HospitalName") {
              return {
                ...field,
                populators: {
                  ...field.populators,
                  options: hospitalListData.hospitalListOptions,
                  optionsKey: field.populators.optionsKey || "name",
                  valueKey: field.populators.valueKey || "code",
                },
              };
            }
            return field;
          }),
        }))
      );
    }
  }, [hospitalListData]); 

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const checkDateOrderValidity = (formData) => {
    const dobStr = formData.dob;
    const doRegStr = formData.doRegistration;
    if (dobStr && doRegStr) {
      const deathDate = new Date(dobStr);
      const regDate = new Date(doRegStr);
      if (isNaN(deathDate.getTime()) || isNaN(regDate.getTime())) return true; // Invalid date strings, let field validation handle
      return regDate >= deathDate;
    }
    return true; 
  };


  const updateConfigBasedOnSameAddressCheckbox = (isChecked, currentConfigToUpdate) => {
    return currentConfigToUpdate.map((section) => {
      // If checkbox is checked, Present Address fields become mandatory
      if (section.head === "BND_PRESENT_ADDR_DURING_DEATH") {
        return {
          ...section,
          body: section.body.map((field) => ({
            ...field,
            // If checked, make these fields mandatory, otherwise retain their original mandatory status
            isMandatory: isChecked ? true : (createDeathConfig.find(s => s.head === section.head)?.body.find(f => f.populators?.name === field.populators?.name)?.isMandatory || false),
          })),
        };
      }
      // If checkbox is checked, hide the Permanent Address section
      if (section.head === "BND_DEATH_ADDR_PERM" && isChecked) {
        return null; 
      }
      return section;
    }).filter(Boolean); 
  };


  const transformFormData = (formData) => {
    const toEpoch = (dateStr) => dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined;

    // Present Address (always filled from form)
    const presentAddress = {
      buildingno: formData?.buildingNumber || "",
      houseno: formData?.houseNo || "",
      district: formData?.district || "",
      streetname: formData?.streetName || "",
      tehsil: formData?.tehsil || "",
      city: formData?.city || "",
      country: formData?.country || "",
      locality: formData?.locality || "",
      pinno: formData?.pincode || "",
      state: formData?.state || "",
    };

    // Permanent Address (filled from specific fields if checkbox is unchecked)
    const permanentAddress = {
      buildingno: formData?.permanentBuildingNumber || "",
      houseno: formData?.permanentHouseNo || "",
      district: formData?.permanentDistrict || "",
      streetname: formData?.permanentStreetName || "",
      tehsil: formData?.permanentTehsil || "",
      city: formData?.permanentCity || "",
      country: formData?.permanentCountry || "",
      locality: formData?.permanentLocality || "",
      pinno: formData?.permanentPincode || "",
      state: formData?.permanentState || "",
    };

    return {
      age: String(formData?.age || ""),
      checkboxforaddress: !!formData?.sameAddressCheckbox, 
      counter: !!formData?.checkboxlabel ? 1 : 0,
      // counter:0,
      dateofdeathepoch: toEpoch(formData?.dob),
      dateofreportepoch: toEpoch(formData?.doRegistration),
      deathFatherInfo: {
        firstname: formData?.FirstName3 || "",
        middlename: formData?.MiddleName3 || "",
        lastname: formData?.LastName3 || "",
        emailid: formData?.EmailID2 || "",
        mobileno: formData?.MobileNumber2 || "",
        aadharno: formData?.AadharNumber3 || "",
      },
      deathMotherInfo: {
        firstname: formData?.FirstName4 || "",
        middlename: formData?.MiddleName4 || "",
        lastname: formData?.LastName4 || "",
        emailid: formData?.emailId3 || "",
        mobileno: formData?.mobileNumber3 || "",
        aadharno: formData?.AadharNumber4 || "",
      },
      deathSpouseInfo: {
        firstname: formData?.FirstName2 || "",
        middlename: formData?.MiddleName2 || "",
        lastname: formData?.LastName2 || "",
        emailid: formData?.EmailID || "",
        mobileno: formData?.MobileNumber || "",
        aadharno: formData?.AadharNumber2 || "",
      },
      deathPermaddr: formData?.sameAddressCheckbox ? presentAddress : permanentAddress,
      deathPresentaddr: presentAddress,
      eidno: formData?.EIDNumber || "",
      excelrowindex: -1, // Assuming default
      firstname: formData?.FirstName || "",
      middlename: formData?.MiddleName || "",
      lastname: formData?.LastName || "",
      genderStr: formData?.Gender?.code || "", // Assuming Gender dropdown returns an object
      hospitalname: formData?.HospitalName?.code, // formData.HospitalName will be the 'code' (which is hospital name string)
      icdcode: formData?.ICDCode || "",
      informantsname: formData?.informantName || "",
      informantsaddress: formData?.informantAddress || "",
      isLegacyRecord: !!formData?.checkboxlabel, // From "This is a Legacy Record" checkbox
      registrationno: formData?.checkboxlabel ? (formData?.RegistrationNumber || "") : "",
      nationality: formData?.Nationality || "",
      placeofdeath: formData?.DeathPlace || "",
      aadharno: formData?.AadharNumber || "",
      religion: formData?.Religion || "",
      remarks: formData?.remarks || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
    };
  };

  const reqCreate = {
    url: "/birth-death-services/common/savedeathimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {}, 
    config: { enabled: true },
  };

  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  const onSubmit = async (formData) => {
    if (!checkDateOrderValidity(formData)) {
      setShowToast({ key: "error", label: t("BND_INVALID_REGISTRATION_DATE") });
      setIsSubmitDisabledByDateError(true);
      return;
    }
    setIsSubmitDisabledByDateError(false);

    const payload = {
      deathCerts: [transformFormData(formData)],
    };

    await mutation.mutate(
      {
        body: payload,
      },
      {
        onSuccess: (response) => {
          setShowToast({ key: "success", label: t("BND_DEATH_CERTIFICATE_CREATED_SUCCESSFULLY") });
           setTimeout(() => {
              window.location.reload();
            }, 3000);
         
        },
        onError: (error) => {
          console.error("API Error:", error);
          setShowToast({ key: "error", label: t("BND_DEATH_CREATION_FAILED") });
        },
      }
    );
  };

  const onFormValueChange = (setValue, formData, formState) => {
    setValueRef.current = setValue; // Store setValue for reset

    // Date order validation on change
    if (isSubmitDisabledByDateError && checkDateOrderValidity(formData)) {
      setIsSubmitDisabledByDateError(false);
    }

    // --- Handle "Same Address" checkbox ---
    const currentIsSameAddressChecked = !!formData?.sameAddressCheckbox;
    if (prevCheckboxRef.current !== currentIsSameAddressChecked) {
      prevCheckboxRef.current = currentIsSameAddressChecked;
      setSameAddressChecked(currentIsSameAddressChecked); // Update state if needed elsewhere
      // setPermanent(currentIsSameAddressChecked); // Update 'permanent' state if it's used

      // Update formConfig based on the checkbox, using the current formConfig as base
      setFormConfig(prevCurrentConfig =>
        updateConfigBasedOnSameAddressCheckbox(currentIsSameAddressChecked, prevCurrentConfig)
      );
    }

    // --- Handle "Legacy Record" checkbox ---
    const currentIsLegacy = !!formData?.checkboxlabel;
    if (prevLegacyCheckboxRef.current !== currentIsLegacy) {
      prevLegacyCheckboxRef.current = currentIsLegacy;

      // Update formConfig for RegistrationNumber field, using current formConfig as base
      setFormConfig(prevCurrentConfig =>
        prevCurrentConfig.map(section => ({
          ...section,
          body: section.body.map(field => {
            if (field.populators?.name === "RegistrationNumber") {
              return {
                ...field,
                disable: !currentIsLegacy,
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
  };

  const onSecondayActionClick = () => { // Reset handler
    // Reset form values using setValueRef
    if (setValueRef.current) {
      const allFieldNames = createDeathConfig.flatMap(section =>
        section.body.map(field => field.populators?.name).filter(Boolean)
      );
      const defaultValues = {
        sameAddressCheckbox: false,
        checkboxlabel: false,
        // Add other fields that need specific default non-empty values if any
      };
      allFieldNames.forEach(name => {
        setValueRef.current(name, defaultValues[name] !== undefined ? defaultValues[name] : "");
      });
      // Explicitly set checkboxes if they weren't caught by allFieldNames or need specific handling
      setValueRef.current("sameAddressCheckbox", false);
      setValueRef.current("checkboxlabel", false);
    }

    // Reset internal states
    setSameAddressChecked(false);
    // setPermanent(false);
    prevCheckboxRef.current = false;
    prevLegacyCheckboxRef.current = false;
    setIsSubmitDisabledByDateError(false);

    // Rebuild formConfig from scratch to ensure clean state
    let newConfig = [...createDeathConfig]; // Deep clone or ensure createDeathConfig is immutable

    // 1. Apply "Same Address" checkbox default state (false)
    newConfig = updateConfigBasedOnSameAddressCheckbox(false, newConfig);

    // 2. Apply "Legacy Record" checkbox default state (false) for RegistrationNumber
    newConfig = newConfig.map(section => ({
      ...section,
      body: section.body.map(field => {
        if (field.populators?.name === "RegistrationNumber") {
          return {
            ...field,
            disable: true, // Disabled by default
            isMandatory: false,
            validation: { ...(field.validation || {}), required: false },
            populators: { ...field.populators, error: undefined },
          };
        }
        return field;
      })
    }));

    // 3. Re-apply hospital data if it was fetched
    if (hospitalListData?.hospitalListOptions) {
      newConfig = newConfig.map(section => ({
        ...section,
        body: section.body.map(field => {
          if (field.populators?.name === "HospitalName") {
            return {
              ...field,
              populators: {
                ...field.populators,
                options: hospitalListData.hospitalListOptions,
              },
            };
          }
          return field;
        }),
      }));
    }
    setFormConfig(newConfig);
  };

  // --- Handle Loading State for Hospital Data ---
  if (hospitalListLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Header>Create {t("ACTION_TEST_DEATH_CERTIFICATE")}</Header>
      <div className="jk-header-btn-wrapper">
        <Header>{t("BND_NEW_REGISTRATION")}</Header>
        <p>{t("BND_NEW_REGISTRATION_SUBTEXT")}</p>
      </div>
      <FormComposerV2
        config={formConfig.map((conf) => ({
          ...conf,
          body: conf.body.map((field) => ({
            ...field,
            key: field.populators?.name || `${conf.head || 'section'}-${field.key || field.label || field.type}`, // More robust key generation
          })),
        }))}
        isDisabled={isSubmitDisabledByDateError} // FormComposerV2 also has its own isDisabled logic for mandatory fields
        label={t("CORE_COMMON_SUBMIT")} // Consider t("SUBMIT")
        onSubmit={onSubmit}
        showSecondaryLabel={true}
        onFormValueChange={onFormValueChange}
        secondaryLabel={t("BND_COMMON_NEW")} // Consider t("Reset")
        actionClassName={"actionBarClass microplan-actionbar"}
        onSecondayActionClick={onSecondayActionClick}
       
      />
      {showToast && (
        <Toast
          style={{ zIndex: 10001 }} 
          label={showToast.label}
          type={showToast.key}
          error={showToast.key === "error"}
          onClose={() => setShowToast(null)}
        />
      )}
    </React.Fragment>
  );
};