import { useQuery } from "react-query";
import AccessControlService from "../services/elements/Access";
const useAccessControl = (tenantId) => {
  const user = Digit.SessionStorage.get("User");
  const getUserRoles = user?.info?.roles;

  const roles = getUserRoles?.map((role) => {
    return role.code;
  });

  const isAutoLoginInProgress = window?.Digit?.AutoLoginInProgress || false;
  const hasRoles = roles && roles.length > 0;

  // Safety check specific to auto-login: ensure user data and roles are ready
  // During auto-login: block query until both user and roles are ready AND auto-login completes
  // Normal flow: only check if roles exist
  const hasUser = !!user;
  const shouldEnable = isAutoLoginInProgress
    ? false // Block during auto-login - will re-enable when AutoLoginInProgress becomes false
    : (hasUser && hasRoles); // After auto-login or during normal flow, ensure user and roles exist

  const response = useQuery(["ACCESS_CONTROL", tenantId], async () => await AccessControlService.getAccessControl(roles),{enabled:shouldEnable});
  return response;
};
export default useAccessControl;
