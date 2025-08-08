import { PTService } from "../../services/elements/PT";
import { useMutation } from "react-query";

const useUpdateContent = (tenantId, type = true) => {
  if (type) {
    return useMutation((data) => PTService.updateContent(data, tenantId));
  }
};

export default useUpdateContent;
