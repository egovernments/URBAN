import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const usePropertyMDMS = (tenantId, moduleCode, type, config = {}) => {
  const usePropertyOwnerType = () => {
    return useQuery("PT_OWNERSHIP_CATEGORY", () => MdmsService.getPropertyOwnerType(tenantId, moduleCode, type), config);
  };
  const usePropertyEssentialTax = () => {
      return useQuery("PT_ESSENTIAL_CATEGORY", () => MdmsService.getPropertyEssentialTax(tenantId, moduleCode, type), config);
  }

  const usePropertyOwnerShipCategory = () => {
    return useQuery("PT_OWNER_TYPE", () => MdmsService.getPropertyOwnerShipCategory(tenantId, moduleCode, type), config);
  };
  const useSubOwnerShipCategory = () => {
    return useQuery("PT_SUB_OWNERSHIP_CATEGORY", () => MdmsService.getPropertySubOwnerShipCategory(tenantId, moduleCode, type), config);
  };
  const useAssessmentYear = ()=>{
    return useQuery("PT_ASSESSMENT_YEAR", () => MdmsService.getPropertyAssessmentYear(tenantId, moduleCode, type), config);
  }
   const useRoadFactor = ()=>{
    return useQuery("PT_ROAD_FACTOR", () => MdmsService.getPropertyRoadFactor(tenantId, moduleCode, type), config);
  }
  
  const useDocumentRequiredScreen = () => {
    return useQuery("PT_DOCUMENT_REQ_SCREEN", () => MdmsService.getDocumentRequiredScreen(tenantId, moduleCode), config);
  };
  const useUsageCategory = () => {
    return useQuery("PT_USAGE_CATEGORY", () => MdmsService.getUsageCategory(tenantId, moduleCode, type), config);
  };
  const usePTPropertyType = () => {
    return useQuery("PT_PROPERTY_TYPE", () => MdmsService.getPTPropertyType(tenantId, moduleCode, type), config);
  };
  const usegetPTConstructionType = () => {
    return useQuery("PT_CONSTRUCTION_TYPE", () => MdmsService.getPTConstructionType(tenantId, moduleCode, type), config);
  };
  const usegetPTOccupancyType = () => {
    return useQuery("PT_OCCUPANCY_TYPE", () => MdmsService.getPTOccupancyType(tenantId, moduleCode, type), config);
  };

  const useRentalDetails = () => {
    return useQuery("PT_RENTAL_DETAILS", () => MdmsService.getRentalDetails(tenantId, moduleCode), config);
  };
  const useChargeSlabs = () => {
    return useQuery("PT_RENTAL_DETAILS", () => MdmsService.getChargeSlabs(tenantId, moduleCode), config);
  };
  const useFloorList = () => {
    return useQuery("PT_FLOOR_LIST", () => MdmsService.getFloorList(tenantId, moduleCode), config);
  };
  const useMapConfig = () => {
    return useQuery("PT_MAP_CONFIG", () => MdmsService.getMapConfig(tenantId, moduleCode), config);
  };

  const _default = () => {
    return useQuery([tenantId, moduleCode, type], () => MdmsService.getMultipleTypes(tenantId, moduleCode, type), config);
  };

  switch (type) {
    case "OwnerShipCategory":
      return usePropertyOwnerShipCategory();
    case "OwnerType":
      return usePropertyOwnerType();
      case "EssentialTax":
      return usePropertyEssentialTax();
    case "SubOwnerShipCategory":
      return useSubOwnerShipCategory();
    case "AssessmentYear":
      return useAssessmentYear();
       case "RoadFactor":
      return useRoadFactor();
    case "Documents":
      return useDocumentRequiredScreen();
    case "UsageCategoryMajor":
      return useUsageCategory();
    case "PTPropertyType":
      return usePTPropertyType();
    case "ConstructionType":
      return usegetPTConstructionType();
    case "OccupancyType":
      return usegetPTOccupancyType();
    case "RentalDetails":
      return useRentalDetails();
    case "Floor":
      return useFloorList();
    case "MapConfig":
      return useMapConfig();
    case "ChargeSlabs":
      return useChargeSlabs();
    default:
      return _default();
  }
};

export default usePropertyMDMS;
