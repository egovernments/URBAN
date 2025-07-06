export const BirthConfig = [
  {
    head: "BND_REGISTRATION",
    body: [
      {
        inline: true,

        type: "checkbox",

        withoutLabel: true,
        populators: {
          name: "checkbox_legacy",
          title: "This is a Legacy Record",
        },
      },
      {
        inline: true,
        label: "BND_REG_NO_PLACEHOLDER",
        type: "text",
        isMandatory: false,
        disable: true,
        placeholder: "Registration Number",
        populators: {
          name: "registration_number",
          error: "Registration Number is Required!",
        },
      },
      {
        isMandatory: false,
        key: "Hospital Name",
        type: "dropdown",
        label: "BND_HOSPITALNAME_LABEL",
        disable: false,
        populators: {
          name: "hospital_name",
          optionsKey: "originalName",
          valueKey: "code",
          error: "Hospital Name is Required!",
        },
      },
      {
        inline: true,
        label: "BND_DEATH_DOR",
        isMandatory: true,
        key: "doRegistration",
        type: "date",
        disable: false,
        populators: {
          name: "date_of_registration",
          error: "Required",
          validation: {
            max: new Date().toISOString().split("T")[0],
          },
        },
      },
    ],
  },
  {
    head: "BND_INFO_OF_CHILD",
    body: [
      {
        inline: true,
        label: "BND_BIRTH_DOB",
        isMandatory: true,
        key: "dob",
        type: "date",
        disable: false,
        populators: {
          name: "date_of_birth",
          error: "Required",
          validation: {
            max: new Date().toISOString().split("T")[0],
          },
        },
      },
      {
        isMandatory: true,
        key: "Gender",
        type: "dropdown",
        label: "BND_GENDER_PLACEHOLDER",
        disable: false,
        populators: {
          name: "gender",
          optionsKey: "name",
          error: "Required",

          mdmsConfig: {
            masterName: "GenderType",
            moduleName: "common-masters",
            localePrefix: "COMMON_GENDER",
          },
        },
      },
      {
        inline: true,
        label: "BND_FIRSTNAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "First Name",
        populators: {
          name: "child_first_name",
          error: "First Name must be at least 3 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Only letters and spaces
          },
        },
      },
      {
        inline: true,
        label: "BND_MIDDLENAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "child_middle_name",
          error: "Middle Name must be at least 3 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_LASTNAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Last Name",
        populators: {
          name: "child_last_name",
          error: "Last Name must be at least 3 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
    ],
  },
  {
    head: "BND_BIRTH_PLACE",
    body: [
      {
        inline: true,
        label: "BND_BIRTH_PLACE",
        type: "text",
        isMandatory: true,
        placeholder: "Birth Place",
        populators: {
          name: "birth_place",
          error: "Birth Place must be 5-100 characters",
          validation: {
            minLength: 5,
            maxLength: 100,
          },
        },
      },
    ],
  },
  {
    head: "BND_FATHERS_INFO",
    body: [
      {
        inline: true,
        label: "BND_FIRSTNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "father_first_name",
          error: "First Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_MIDDLENAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "father_middle_name",
          error: "Middle Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_LASTNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "Last Name",
        populators: {
          name: "father_last_name",
          error: "Last Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_AADHAR_NO",
        type: "text",
        placeholder: "Aadhar Number",
        populators: {
          name: "father_aadhar_number",
          error: "Invalid Aadhar Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "BND_EMAIL_ID",
        type: "text",
        placeholder: "Email ID",
        populators: {
          name: "father_email_id",
          error: "Invalid Email Address",
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
        },
      },
      {
        inline: true,
        label: "CORE_COMMON_PROFILE_MOBILE_NUMBER",
        type: "number",
        placeholder: "Mobile Number",
        populators: {
          name: "father_mobile_number",
          error: "Invalid Mobile Number (10 digits)",
          validation: {
            pattern: /^\d{10}$/,
            minLength: 10,
            maxLength: 10,
          },
        },
      },
      {
        inline: true,
        label: "BND_EDUCATION",
        type: "text",
        placeholder: "Education",
        populators: {
          name: "father_education",
          error: "Education must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_PROFESSION",
        type: "text",
        placeholder: "Profession",
        isMandatory: false,
        populators: {
          name: "father_profession",
          error: "Profession must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_NATIONALITY",
        type: "text",
        isMandatory: true,
        placeholder: "Nationality",
        populators: {
          name: "father_nationality",
          error: "Nationality must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_RELIGION",
        type: "text",
        isMandatory: false,
        placeholder: "Religion",
        populators: {
          name: "father_religion",
          error: "Religion must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
    ],
  },
  {
    head: "BND_MOTHERS_INFO",
    body: [
      {
        inline: true,
        label: "BND_FIRSTNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "mother_first_name",
          error: "First Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_MIDDLENAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "mother_middle_name",
          error: "Middle Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_LASTNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "Last Name",
        populators: {
          name: "mother_last_name",
          error: "Last Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_AADHAR_NO",
        type: "text",
        placeholder: "Aadhar Number",
        populators: {
          name: "mother_aadhar_number",
          error: "Invalid Aadhar Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "BND_EMAIL_ID",
        type: "text",
        placeholder: "Email ID",
        populators: {
          name: "mother_email_id",
          error: "Invalid Email Address",
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
        },
      },
      {
        inline: true,
        label: "CORE_COMMON_PROFILE_MOBILE_NUMBER",
        type: "number",
        placeholder: "Mobile Number",
        populators: {
          name: "mother_mobile_number",
          error: "Invalid Mobile Number (10 digits)",
          validation: {
            pattern: /^\d{10}$/,
            minLength: 10,
            maxLength: 10,
          },
        },
      },
      {
        inline: true,
        label: "BND_EDUCATION",
        type: "text",
        placeholder: "Education",
        populators: {
          name: "mother_education",
          error: "Education must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_PROFESSION",
        type: "text",
        isMandatory: false,
        placeholder: "Profession",
        populators: {
          name: "mother_profession",
          error: "Profession must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_NATIONALITY",
        type: "text",
        isMandatory: true,
        placeholder: "Nationality",
        populators: {
          name: "mother_nationality",
          error: "Nationality must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_RELIGION",
        type: "text",
        isMandatory: false,
        placeholder: "Religion",
        populators: {
          name: "mother_religion",
          error: "Religion must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
    ],
  },
  {
    head: "BND_PRESENT_ADDR_DURING_BIRTH",
    body: [
      {
        inline: true,
        label: "BND_BUILDINGNO_LABEL",
        type: "number",
        isMandatory: false,
        placeholder: "Building Number",
        populators: {
          name: "birth_building_number",
          error: "Building Number is Required!",
          validation: {
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "BND_HOUSENO_LABEL",
        type: "number",
        isMandatory: false,
        placeholder: "House No",
        populators: {
          name: "birth_house_no",
          error: "House No is Required!",
          validation: {
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "BND_STREETNAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Street Name",
        populators: {
          name: "birth_street_name",
          error: "Street Name must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_LOCALITY_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Locality",
        populators: {
          name: "birth_locality",
          error: "Locality must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_TEHSIL_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Tehsil",
        populators: {
          name: "birth_tehsil",
          error: "Tehsil must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_DISTRICT_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "District",
        populators: {
          name: "birth_district",
          error: "District must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_CITY_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "City",
        populators: {
          name: "birth_city",
          error: "City must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_STATE_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "State",
        populators: {
          name: "birth_state",
          error: "State must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_COUNTRY_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Country",
        populators: {
          name: "birth_country",
          error: "Country must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_PINNO_LABEL",
        type: "number",
        isMandatory: false,
        placeholder: "Pincode",
        populators: {
          name: "birth_pincode",
          error: "Invalid Pincode (6 digits)",
          validation: {
            pattern: /^\d{6}$/,
            minLength: 6,
            maxLength: 6,
          },
        },
      },
      {
        inline: true,
        isMandatory: false,
        type: "checkbox",
        disable: false,
        withoutLabel: true,
        populators: {
          name: "same_as_permanent_address",
          title: "If Permanent Address of Parents is same as Address of Parents at the time of Birth",
        },
      },
    ],
  },
  {
    head: "BND_BIRTH_ADDR_PERM",
    body: [
      {
        inline: true,
        label: "BND_BUILDINGNO_LABEL",
        type: "number",
        isMandatory: true,
        placeholder: "Building Number",
        populators: {
          name: "permanent_building_number",
          error: "Building Number is Required!",
          validation: {
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "BND_HOUSENO_LABEL",
        type: "number",
        isMandatory: true,
        placeholder: "House No",
        populators: {
          name: "permanent_house_no",
          error: "House No is Required!",
          validation: {
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "BND_STREETNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "Street Name",
        populators: {
          name: "permanent_street_name",
          error: "Street Name must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_LOCALITY_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "Locality",
        populators: {
          name: "permanent_locality",
          error: "Locality must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_TEHSIL_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "Tehsil",
        populators: {
          name: "permanent_tehsil",
          error: "Tehsil must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_DISTRICT_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "District",
        populators: {
          name: "permanent_district",
          error: "District must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_CITY_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "City",
        populators: {
          name: "permanent_city",
          error: "City must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_STATE_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "State",
        populators: {
          name: "permanent_state",
          error: "State must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_COUNTRY_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "Country",
        populators: {
          name: "permanent_country",
          error: "Country must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_PINNO_LABEL",
        type: "number",
        isMandatory: true,
        placeholder: "Pincode",
        populators: {
          name: "permanent_pincode",
          error: "Invalid Pincode (6 digits)",
          validation: {
            pattern: /^\d{6}$/,
            minLength: 6,
            maxLength: 6,
          },
        },
      },
    ],
  },
  {
    head: "BND_INFORMANTS_INFO",
    body: [
      {
        inline: true,
        label: "BND_COMMON_NAME",
        type: "text",
        isMandatory: false,
        placeholder: "Name",
        populators: {
          name: "informant_name",
          error: "Name must be 2-100 characters",
          validation: {
            minLength: 2,
            maxLength: 100,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "BND_ADDRESS",
        type: "text",
        isMandatory: false,
        placeholder: "Address",
        populators: {
          name: "informant_address",
          error: "Address must be 5-200 characters",
          validation: {
            minLength: 5,
            maxLength: 200,
          },
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        label: "BND_REMARKS_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Remarks",
        populators: {
          name: "remarks",
          error: "Remarks must be less than 500 characters",
          validation: {
            maxLength: 500,
          },
        },
      },
    ],
  },
];
