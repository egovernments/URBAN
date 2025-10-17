const createDeathConfig = [
  {
    body: [
      {
        inline: true,
        isMandatory: false,
        type: "checkbox",
        disable: false,
        withoutLabel: true,
        populators: {
          name: "checkboxlabel",
          title: "BND_IS_LEGACY_RECORD",
        },
      },
    ],
  },
  {
    head: "BND_REGISTRATION",
    body: [
      {
        inline: true,
        label: "BND_REG_NO_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Registration Number",
        disable:true,
        populators: {
          name: "RegistrationNumber",
          error: "Registration Number is Required!Minimum 5 characters",
          validation: {
            minLength: 5,
            maxLength: 100,
            // pattern: /^[A-Za-z0-9]+$/i, 
          },
        },
      },
      {
        "isMandatory": false,
        "key": "Hospital Name",
        "type": "dropdown",
        "label": "BND_HOSPITALNAME_LABEL",
        "disable": false,
        "placeholder": "Don't select if NA",
        "populators": {
          "name": "HospitalName",
          "optionsKey": "name",
          "valueKey": "code",
          "error": "Hospital Name is Required!",
          "required": false
        }
      },
      // {
      //   isMandatory: false,
      //   key: "Hospital Name",
      //   type: "dropdown",
      //   label: "BND_HOSPITALNAME_LABEL",
      //   disable: false,
      //   placeholder: "Don't select if NA",
      //   populators: {
      //     name: "HospitalName",
      //     optionsKey: "name",
      //     error: "Hospital Name is Required!",
      //     required: true,
      //     mdmsConfig: {
      //       masterName: "hospitalList",
      //       moduleName: "birth-death-service",
      //       localePrefix: "COMMON_HOSPITAL",
      //     },
      //   },
      // },
      {
        inline: true,
        label: "BND_DEATH_DOR",
        isMandatory: true,
        key: "doRegistration",
        type: "date",
        disable: false,
        populators: {
          name: "doRegistration",
          error: "Date of Registration is Required!",
          validation: {
            maxDate: new Date().toISOString().split("T")[0], 
          },
        },
      },
    ],
  },
  {
    head: "BND_INFO_OF_DECEASED",
    body: [
      {
        inline: true,
        label: "BND_DEATH_DOB_PLACEHOLDER",
        isMandatory: true,
        key: "dob",
        type: "date",
        disable: false,
        populators: {
          name: "dob",
          error: "Date of Death is Required!",
          validation: {
            maxDate: new Date().toISOString().split("T")[0], 
          },
        },
      },
      {
        isMandatory: true,
        key: "Gender",
        type: "dropdown",
        label: "BND_GENDER",
        disable: false,
        populators: {
          name: "Gender",
          optionsKey: "name",
          error: "Gender is Required!",
          required: true,
          mdmsConfig: {
            masterName: "GenderType",
            moduleName: "common-masters",
            localePrefix: "COMMON_GENDER",
          },
        },
      },
      {
        inline: true,
        label: "BND_AGE",
        type: "text",
        isMandatory: true,
        placeholder: "Age in Years",
        populators: {
          name: "age",
          error: "Age is Required!",
          validation: {
            pattern: /^[0-9]+( years)?( [0-9]+ months)?( [0-9]+ days)?$/, 
          },
        },
      },
      {
        inline: true,
        label: "BND_FIRSTNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "FirstName",
          error: "First Name is Required!",
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
          name: "MiddleName",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
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
          name: "LastName",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "BND_EIDNO",
        type: "number",
        isMandatory: false,
        placeholder: "EID Number",
        populators: {
          name: "EIDNumber",
          error: "EID Number is Required!",
          validation: {
            pattern: /^[0-9]{12}$/, // 12-digit number
          },
        },
      },
      {
        inline: true,
        label: "BND_AADHAR_NO",
        type: "text",
        isMandatory: false,
        placeholder: "National Identity Proof Number",
        populators: {
          name: "AadharNumber",
          error: "Invalid National Identity Proof Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
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
          name: "Nationality",
          error: "Nationality is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
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
          name: "Religion",
          error: "Religion is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
          },
        },
      },
    ],
  },
  {
    head: "BND_DEATH_INFO",
    body: [
      {
        inline: true,
        label: "BND_DEATH_PLACE",
        type: "text",
        isMandatory: true,
        placeholder: "Death Place",
        populators: {
          name: "DeathPlace",
          error: "Death Place is Required!",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "BND_ICDCODE",
        type: "text",
        isMandatory: false,
        placeholder: "ICD Code",
        populators: {
          name: "ICDCode",
          error: "ICD Code is Required!",
          validation: {
            pattern: /^[A-Za-z0-9]+$/, // Alphanumeric only
          },
        },
      },
    ],
  },
  {
    head: "BND_SPOUSES_INFO",
    body: [
      {
        inline: true,
        label: "BND_FIRSTNAME_LABEL",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "FirstName2",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
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
          name: "MiddleName2",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
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
          name: "LastName2",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "BND_AADHAR_NO",
        type: "text",
        isMandatory: false,
        placeholder: "National Identity Proof Number",
        populators: {
          name: "AadharNumber2",
          error: "Invalid National Identity Proof Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "BND_EMAIL_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Email ID",
        populators: {
          name: "EmailID",
          error: "Valid Email ID is required!",
          validation: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
          },
        },
      },
      {
        inline: true,
        label: "Mobile Number",
        type: "number",
        isMandatory: true,
        placeholder: "Mobile Number",
        populators: {
          name: "MobileNumber",
          error: "Valid Mobile Number is Required!Minimum 10 digits required",
          validation: {
            pattern: /^[6-9][0-9]{9}$/, // Valid Indian mobile number
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
          name: "FirstName3",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
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
          name: "MiddleName3",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
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
          name: "LastName3",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "BND_AADHAR_NO",
        type: "text",
        isMandatory: false,
        placeholder: "National Identity Proof Number",
        populators: {
          name: "AadharNumber3",
          error: "Invalid National Identity Proof Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "BND_EMAIL_LABEL",
        type: "text",
        placeholder: "Email ID",
        populators: {
          name: "EmailID2",
          error: "Valid Email ID is required!",
          validation: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
          },
        },
      },
      {
        inline: true,
        label: "Mobile Number",
         isMandatory: true,
        type: "number",
        placeholder: "Mobile Number",
        populators: {
          name: "MobileNumber2",
          error: "Valid Mobile Number is Required!Minimum 10 digits required",
          validation: {
            pattern: /^[6-9][0-9]{9}$/, // Valid Indian mobile number
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
          name: "FirstName4",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
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
          name: "MiddleName4",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
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
          name: "LastName4",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "BND_AADHAR_NO",
        type: "text",
        isMandatory: false,
        placeholder: "National Identity Proof Number",
        populators: {
          name: "AadharNumber4",
          error: "Invalid National Identity Proof Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "BND_EMAIL_LABEL",
        type: "text",
        placeholder: "Email ID",
        isMandatory: false,
        populators: {
          name: "emailId3",
          error: "Valid Email ID is required!",
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
          },
        },
      },
      {
        inline: true,
        label: "Mobile Number",
        type: "number",
        placeholder: "Mobile Number",
        isMandatory: true,
        populators: {
          name: "mobileNumber3",
          error: "Valid Mobile Number is required!Minimum 10 digits required",
          validation: {
            minLength: 10,
            maxLength: 10,
          },
        },
      },
    ]
  },
  {
    head: "BND_PRESENT_ADDR_DURING_DEATH",
    body: [
      {
        inline: true,
        label: "BND_BUILDINGNO_LABEL",
        type: "number",
        isMandatory: false,
        placeholder: "Building Number",
        populators: {
          name: "buildingNumber",
          validation: { minLength: 1 },
          error: "Building Number is required!",
        },
      },
      {
        inline: true,
        label: "BND_HOUSENO_LABEL",
        type: "number",
        isMandatory: false,
        placeholder: "House No",
        populators: {
          name: "houseNo",
          validation: { minLength: 1 },
          error: "House No is required!",
        },
      },
      {
        inline: true,
        label: "BND_STREETNAME_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Street Name",
        populators: {
          name: "streetName",
          validation: { minLength: 3 },
          error: "Street Name must have at least 3 characters!",
        },
      },
      {
        inline: true,
        label: "BND_LOCALITY_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Locality",
        populators: {
          name: "locality",
          validation: { minLength: 2 },
          error: "Locality must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_SUB_DISTRICT_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Sub-District",
        populators: {
          name: "tehsil",
          validation: { minLength: 2 },
          error: "Tehsil must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_DISTRICT_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "District",
        populators: {
          name: "district",
          validation: { minLength: 2 },
          error: "District must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_APPL_CANT",
        type: "text",
        isMandatory: false,
        placeholder: "City",
        populators: {
          name: "city",
          validation: { minLength: 2 },
          error: "City must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_STATE_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "State",
        populators: {
          name: "state",
          validation: { minLength: 2 },
          error: "State must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_COUNTRY_LABEL",
        type: "text",
        isMandatory: false,
        placeholder: "Country",
        populators: {
          name: "country",
          validation: { minLength: 2 },
          error: "Country must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_PINNO_LABEL",
        type: "number",
        isMandatory: false,
        placeholder: "Pincode",
        populators: {
          name: "pincode",
          validation: { minLength: 6, maxLength: 6 },
          error: "Pincode must be 6 digits!",
        },
      }
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "checkbox",
        isMandatory: false,
        disable: false,
        withoutLabel: false,
        populators: {
          name: "sameAddressCheckbox",
          title: "PRESENT_TO_PERM_ADDR_SWITCH_DEATH",
        },
      },
    ],
  },
  {
    head: "BND_DEATH_ADDR_PERM",
    body: [
  {
    inline: true,
    label: "BND_BUILDINGNO_LABEL",
    type: "number",
    isMandatory: true,
    placeholder: "Building Number",
    populators: {
      name: "permanentBuildingNumber",
      validation: { minLength: 1 },
      error: "Building Number is required!",
    },
  },
  {
    inline: true,
    label: "BND_HOUSENO_LABEL",
    type: "number",
    isMandatory: true,
    placeholder: "House No",
    populators: {
      name: "permanentHouseNo",
      validation: { minLength: 1 },
      error: "House No is required!",
    },
  },
  {
    inline: true,
    label: "BND_STREETNAME_LABEL",
    type: "text",
    isMandatory: true,
    placeholder: "Street Name",
    populators: {
      name: "permanentStreetName",
      validation: { minLength: 3 },
      error: "Street Name must have at least 3 characters!",
    },
  },
  {
    inline: true,
    label: "BND_LOCALITY_LABEL",
    type: "text",
    isMandatory: true,
    placeholder: "Locality",
    populators: {
      name: "permanentLocality",
      validation: { minLength: 2 },
      error: "Locality must have at least 2 characters!",
    },
  },
  {
    inline: true,
    label: "BND_SUB_DISTRICT_LABEL",
    type: "text",
    isMandatory: true,
    placeholder: "Sub-District",
    populators: {
      name: "permanentTehsil",
      validation: { minLength: 2 },
      error: "Tehsil must have at least 2 characters!",
    },
  },
  {
    inline: true,
    label: "BND_DISTRICT_LABEL",
    type: "text",
    isMandatory: true,
    placeholder: "District",
    populators: {
      name: "permanentDistrict",
      validation: { minLength: 2 },
      error: "District must have at least 2 characters!",
    },
  },
  {
    inline: true,
    label: "BND_APPL_CANT",
    type: "text",
    isMandatory: true,
    placeholder: "City",
    populators: {
      name: "permanentCity",
      validation: { minLength: 2 },
      error: "City must have at least 2 characters!",
    },
  },
  {
    inline: true,
    label: "BND_STATE_LABEL",
    type: "text",
    isMandatory: true,
    placeholder: "State",
    populators: {
      name: "permanentState",
      validation: { minLength: 2 },
      error: "State must have at least 2 characters!",
    },
  },
  {
    inline: true,
    label: "BND_COUNTRY_LABEL",
    type: "text",
    isMandatory: true,
    placeholder: "Country",
    populators: {
      name: "permanentCountry",
      validation: { minLength: 2 },
      error: "Country must have at least 2 characters!",
    },
  },
  {
    inline: true,
    label: "BND_PINNO_LABEL",
    type: "number",
    isMandatory: true,
    placeholder: "Pincode",
    populators: {
      name: "permanentPincode",
      validation: { minLength: 6, maxLength: 6 },
      error: "Pincode must be 6 digits!",
    },
  },
  ],
  },
  {
    head: "BND_INFORMANTS_INFO",
    body: [
      {
        inline: true,
        label: "Name",
        type: "text",
        isMandatory: false,
        placeholder: "Name",
        populators: {
          name: "informantName",
          validation: { minLength: 2 },
          error: "Name must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "BND_ADDRESS",
        type: "text",
        isMandatory: false,
        placeholder: "Address",
        populators: {
          name: "informantAddress",
          validation: { minLength: 2 },
          error: "Address must have at least 2 characters!",
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
          validation: { minLength: 2 },
          error: "Remarks must have at least 2 characters!",
        },
      },
    ],
  },


];


export default createDeathConfig;


