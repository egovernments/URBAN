
import React, { useState } from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";
import SurveyIdEditDialog from "../SurveyIdEditDialog";
const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);



export const getAddressItems = (properties, OldProperty) => {
  let oldTenantInfo = [], oldStateId = "", oldCityId = "", oldLocality = "";
  const { address = {}, tenantId = '' } = properties;
  const tenantInfo = tenantId.split('.') || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : 'NA';
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : 'NA';
  const localityCode = address.locality && address.locality.code ? address.locality.code : 'NA';
  const propertyId = properties.propertyId;
  const surveyid = properties.surveyId;
  const yearConsTruction = properties.additionalDetails && properties.additionalDetails.yearConstruction || 'NA';
  if (OldProperty) {
    oldTenantInfo = OldProperty.tenantId.split(".");
    oldStateId = oldTenantInfo[0] && oldTenantInfo[0].toUpperCase();
    oldCityId = oldTenantInfo[1] && oldTenantInfo[1].toUpperCase();
    oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code || 'NA';
  }

  return (
    address && [
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_CITY", localizationLabelsData),
        value: address.city || "NA",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.city
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_HOUSE_NO", localizationLabelsData),
        value: address.doorNo || "NA",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.doorNo
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_COLONY_NAME", localizationLabelsData),
        value: address.buildingName || "NA",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.buildingName
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_STREET_NAME", localizationLabelsData),
        value: address.street || "NA",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.street
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_MOHALLA", localizationLabelsData),
        value: (getTranslatedLabel((`${stateId}_${cityId}_REVENUE_${localityCode}`), localizationLabelsData)) || "NA",
        oldValue: (getTranslatedLabel((`${oldStateId}_${oldCityId}_REVENUE_${oldLocality}`), localizationLabelsData)) || "NA",
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_PINCODE", localizationLabelsData),
        value: address.pincode || "NA",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.pincode
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_EXISTING_PID", localizationLabelsData),
        // value: properties.oldPropertyId || "NA",
        value: propertyId || "NA",
        oldValue: OldProperty && OldProperty.oldPropertyId
      },
      {
        key: "Survey Id/UID",
        // value: properties.surveyId || "NA",
        value: surveyid,
        showEditButton: true,
        onEdit: () => {
          // Placeholder for edit button click handler
          console.log("Edit Survey Id/UID clicked");
        },
      },
      {
        key: "Year of creation of Property",
        //value: properties.additionalDetails? properties.additionalDetails.yearConstruction :"NA",
        value: yearConsTruction || "NA",
      }
    ]
  );
}

const PropertyAddressInfo = ({ properties, editIcon, OldProperty }) => {
  let surveyid = properties.surveyId;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [surveyId, setSurveyId] = useState(properties ? properties.surveyId : "");

  const handleEditClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSave = (newSurveyId) => {
    setSurveyId(newSurveyId);
    setDialogOpen(false);
    // TODO: Add further save logic here (e.g., API call to update backend)
  };
  let addressItems = [];
  const header = 'PT_PROPERTY_ADDRESS_SUB_HEADER';
  if (properties) {
    //addressItems = getAddressItems(properties, OldProperty);
    addressItems = getAddressItems(properties, OldProperty).map(item => {
      if (item.key === "Survey Id/UID") {
        return {
          ...item,
          value: surveyid,
          showEditButton: true,
          onEdit: handleEditClick,
        };
      }
      return item;
    });
  }

  return (
    <React.Fragment>
      <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header} />
      <SurveyIdEditDialog open={isDialogOpen} onClose={handleDialogClose} surveyId={surveyId} onSave={handleSave} oldSurveyId={properties.surveyId} propertiesId={properties.propertyId
      } properties={properties} />
    </React.Fragment>
  );
};

export default PropertyAddressInfo;
