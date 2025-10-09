import { useQuery } from "react-query";
import AccessControlService from "../services/elements/Access";
const useAccessControl = (tenantId) => {
  const getUserRoles = Digit.SessionStorage.get("User")?.info?.roles;

  const roles = getUserRoles?.map((role) => {
    return role.code;
  });

  // Don't run query during auto-login until authentication is ready
  const isAutoLoginInProgress = window?.Digit?.AutoLoginInProgress || false;
  const hasRoles = roles && roles.length > 0;
  const shouldEnable = hasRoles && !isAutoLoginInProgress;

  const response = useQuery(["ACCESS_CONTROL", tenantId], async () => await AccessControlService.getAccessControl(roles),{enabled:shouldEnable});
  return response;
};
export default useAccessControl;
