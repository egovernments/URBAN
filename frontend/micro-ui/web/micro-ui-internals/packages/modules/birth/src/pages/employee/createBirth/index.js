import React, { useEffect, useRef, useState } from "react";
import { Header, Toast } from "@egovernments/digit-ui-react-components";
import { FormComposerV2 } from "@egovernments/digit-ui-components";
import { BirthConfig } from "./config/BirthConfig";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Main component for creating birth certificates
export const CreateBirth = () => {
  const [permanent, setPermanent] = useState(false);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const [formConfig, setFormConfig] = useState(BirthConfig);
  const setValueRef = useRef(null);
  const prevLegacyCheckboxRef = useRef(false);
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();
  const prevCheckboxRef = useRef(false);
  const { t } = useTranslation();

  // Fetch current tenant ID for hospital list
  const hospitalTenantId = Digit.ULBService.getCurrentTenantId();

  // Fetch hospital list from MDMS and transform for dropdown options
  const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
    hospitalTenantId,
    "birth-death-service",
    [{ name: "hospitalList" }],
    {
      select: (data) => {
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

  console.log(hospitalListData,"qwerty")

  // Update form config with hospital list options when data is loaded
  useEffect(() => {
    if (hospitalListData?.hospitalListOptions) {
      setFormConfig((prevConfig) =>
        prevConfig.map((section) => ({
          ...section,
          body: section.body.map((field) => {
            if (field.populators?.name === "hospital_name") {
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

  // Update form config based on "Same as Permanent Address" checkbox
  const updateConfigBasedOnCheckbox = (sameAddressChecked, currentConfig) => {
  return currentConfig.map((section) => { // Use currentConfig, not BirthConfig
    if (section.head === "BND_PRESENT_ADDR_DURING_BIRTH") {
       return {
          ...section,
          body: section.body.map((field) => {
            if (field.populators?.name !== "same_as_permanent_address") {
              return {
                ...field,
                isMandatory: sameAddressChecked ? true : false,
              };
            }
            return field;
          }),
        };
    }
    if (section.head === "BND_BIRTH_ADDR_PERM" && sameAddressChecked) {
      return null;
    }
    return section;
  }).filter(Boolean);
};

  // API request configuration for creating birth certificate
  const reqCreate = {
    url: "/birth-death-services/common/savebirthimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {},
    config: { enabled: true },
  };

  // Mutation hook for API call
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  // Convert date string to epoch
  const toEpoch = (dateStr) => (dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined);

  // Transform form data to API payload structure
  const transformFormData = (formData) => {
    const presentAddress = {
      buildingno: formData?.birth_building_number || "",
      houseno: formData?.birth_house_no || "",
      streetname: formData?.birth_street_name || "",
      locality: formData?.birth_locality || "",
      tehsil: formData?.birth_tehsil || "",
      district: formData?.birth_district || "",
      city: formData?.birth_city || "",
      state: formData?.birth_state || "",
      country: formData?.birth_country || "",
      pinno: formData?.birth_pincode || "",
    };

    const permanentAddress = formData?.same_as_permanent_address ? presentAddress : {
      buildingno: formData?.permanent_building_number || "",
      houseno: formData?.permanent_house_no || "",
      streetname: formData?.permanent_street_name || "",
      locality: formData?.permanent_locality || "",
      tehsil: formData?.permanent_tehsil || "",
      district: formData?.permanent_district || "",
      city: formData?.permanent_city || "",
      state: formData?.permanent_state || "",
      country: formData?.permanent_country || "",
      pinno: formData?.permanent_pincode || "",
    };

    const isSameAddress = !!formData?.same_as_permanent_address;

    return {
      dateofbirthepoch: toEpoch(formData?.date_of_birth),
      dateofreportepoch: toEpoch(formData?.date_of_registration),
      firstname: formData?.child_first_name || "",
      middlename: formData?.child_middle_name || "",
      lastname: formData?.child_last_name || "",
      genderStr: formData?.gender?.code || "",
      checkboxforaddress: isSameAddress,
      birthFatherInfo: {
        firstname: formData?.father_first_name || "",
        middlename: formData?.father_middle_name || "",
        lastname: formData?.father_last_name || "",
        aadharno: formData?.father_aadhar_number || "",
        emailid: formData?.father_email_id || "",
        mobileno: formData?.father_mobile_number || "",
        education: formData?.father_education || "",
        proffession: formData?.father_profession || "",
        nationality: formData?.father_nationality || "",
        religion: formData?.father_religion || "",
      },
      birthMotherInfo: {
        firstname: formData?.mother_first_name || "",
        middlename: formData?.mother_middle_name || "",
        lastname: formData?.mother_last_name || "",
        aadharno: formData?.mother_aadhar_number || "",
        emailid: formData?.mother_email_id || "",
        mobileno: formData?.mother_mobile_number || "",
        education: formData?.mother_education || "",
        proffession: formData?.mother_profession || "",
        nationality: formData?.mother_nationality || "",
        religion: formData?.mother_religion || "",
      },
      placeofbirth: formData?.birth_place || "",
      registrationno: formData?.registration_number || "",
      birthPresentaddr: presentAddress,
      informantname: formData?.informant_name || "",
      informantaddress: formData?.informant_address || "",

      birthPermaddr: permanentAddress,
      hospitalname: formData?.hospital_name?.code || "Unknown",
      isLegacyRecord: !!formData?.checkbox_legacy,
      excelrowindex: -1,
      counter: !!formData?.checkbox_legacy ? 1 : 0,
      tenantid: Digit.ULBService.getCurrentTenantId(),
      remarks: formData?.remarks || "",
      informantsname: formData?.informant_name || "",
      informantsaddress: formData?.informant_address || "",
    };
  };

  // Handle form submission and API call
  const onSubmit = async (formData) => {
    const payload = {
      RequestInfo: {
        apiId: "Mihy",
        ver: ".01",
        action: "savebirthimport",
        did: "1",
        key: "",
        msgId: "20170310130900|en_IN",
        requesterId: "",
        authToken: Digit.UserService.getUser()?.accessToken || "",
      },
      birthCerts: [transformFormData(formData)],
    };

    await mutation.mutate(
      {
        url: "/birth-death-services/common/savebirthimport",
        params: { tenantId: Digit.ULBService.getCurrentTenantId() },
        body: payload,
        config: { enabled: true },
      },
      {
        onSuccess: (response) => {
          if (response?.serviceError) {
            setShowToast({ key: "error", label: `${t("BND_BIRTH_CREATION_FAILED")}: ${response.serviceError}` });
          } else {
            setShowToast({ key: "success", label: t("BND_BIRTH_CERTIFICATE_CREATED_SUCCESSFULLY") });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        },
        onError: (error) => {
          // Show error toast on API failure
          console.error("API Error:", error);
          setShowToast({ key: "error", label: t("BND_BIRTH_CREATION_FAILED") });
        },
      }
    );
  };

  // Reset form config to initial config on mount
  // useEffect(() => {
  //   setFormConfig(BirthConfig);
  // }, []);

  return (
    <React.Fragment>
      <Header>{t("BND_NEW_REGISTRATION")}</Header>
      <FormComposerV2
        config={formConfig.map((conf, i) => ({
          head: conf.head,
          body: conf.body.map((field, j) => ({
            ...field,
            key: `${i}-${j}`,
          })),
        }))}
        label={t("CORE_COMMON_SUBMIT")}
        onSubmit={onSubmit}
        showSecondaryLabel={true}
        // Handle form value changes for checkboxes and update config accordingly
        onFormValueChange={(setValue, formData) => {
          setValueRef.current = setValue;
          const isLegacy = !!formData["checkbox_legacy"];
          const isSameAddressChecked = !!formData["same_as_permanent_address"];

          // --- Handle "Same Address" checkbox ---
          if (prevCheckboxRef.current !== isSameAddressChecked) {
            prevCheckboxRef.current = isSameAddressChecked;
            setSameAddressChecked(isSameAddressChecked);
            setPermanent(isSameAddressChecked);

            // Use functional update to preserve the hospital list
            setFormConfig(prevConfig =>
              updateConfigBasedOnCheckbox(isSameAddressChecked, prevConfig)
            );
          }

          // --- Handle "Legacy Record" checkbox ---
          if (prevLegacyCheckboxRef.current !== isLegacy) {
            prevLegacyCheckboxRef.current = isLegacy;

            // Use functional update here as well
            setFormConfig(prevConfig =>
              prevConfig.map((section) => ({
                ...section,
                body: section.body.map((field) => {
                  if (field.populators?.name === "registration_number") {
                    return {
                      ...field,
                      disable: !isLegacy,
                      isMandatory: isLegacy,
                      validation: { ...(field.validation || {}), required: isLegacy },
                      populators: {
                        ...field.populators,
                        error: isLegacy ? (field.populators?.error || "Registration Number is Required!") : undefined,
                      },
                    };
                  }
                  return field;
                }),
              }))
            );
          }
        }}
        secondaryLabel={t("BND_COMMON_NEW")}
         actionClassName={"actionBarClass microplan-actionbar"}
        // Reset all form fields on secondary action
        onSecondayActionClick={() => {
          if (setValueRef.current) {
            const allNames = formConfig.flatMap((section) => section.body.map((field) => field.populators?.name).filter(Boolean));
            allNames.forEach((name) => {
              setValueRef.current(name, "");
            });
          }
        }}
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
