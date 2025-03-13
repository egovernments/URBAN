import { convertDateToEpoch } from ".";

export const transformData = (data, tenantId) => {
  let LicenseData = {
    action: "INITIATE",
    applicationType: "NEW",
    workflowCode: "NewTL",
    commencementDate: convertDateToEpoch(data?.commencementDate),
    financialYear: data?.financialYear?.code,
    licenseType: data?.licenseType?.code || "PERMANENT",
    tenantId,
    tradeName: data?.tradeName || "",
    wfDocuments: [],
    tradeLicenseDetail: {
      channel: "COUNTER",
      additionalDetail: {
        isSameAsPropertyOwner: "true",
        propertyId: "PG-PT-2025-02-27-003761"
      },
      structureType: data?.structureSubType?.code || "",
      subOwnerShipCategory: data?.ownershipCategory?.code || "",
      address: {
        doorNo: data?.doorNo,
        street: data?.street,
        locality: { code: data?.locality.code || null },
        city: data?.city?.code,
        pincode: data?.pincode
      },
      owners: [
        {
          dob: null,
          fatherOrHusbandName: "Harry",
          gender: "MALE",
          mobileNumber: 9999009999,
          name: "Dennis",
          ownerType: "NONE",
          permanentAddress: "Ajit Nagar - Area1, City A, ",
          relationship: "FATHER"
        }
      ]
    },
  }

  const finalData = {
    Licenses: [
      LicenseData
    ]
  }

  return finalData;
}