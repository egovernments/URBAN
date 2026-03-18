import { useQuery } from "react-query";
import { MdmsService } from "../../services/elements/MDMS";

const useSalutationsMDMS = (tenantId, moduleCode, type, config = {}) => {
  const useSalutationsDetails = () => {
    return useQuery("PT_Salutations_DETAILS", () => MdmsService.getSalutationsType(tenantId, moduleCode ,type), config);
  };
  

  switch (type) {
    case "Salutations":
      return useSalutationsDetails();
  }
};



export default useSalutationsMDMS;
