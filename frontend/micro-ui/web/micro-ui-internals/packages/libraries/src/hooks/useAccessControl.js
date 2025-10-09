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
  // Normal flow: only check if roles exist and auto-login is not in progress
  // Auto-login flow: additionally ensure user object exists to prevent premature API calls
  const hasUser = !!user;
  const shouldEnable = isAutoLoginInProgress
    ? (hasUser && hasRoles && !isAutoLoginInProgress) // Stricter check during auto-login
    : hasRoles; // Normal check when not auto-login

  const response = useQuery(["ACCESS_CONTROL", tenantId], async () => await AccessControlService.getAccessControl(roles),{enabled:shouldEnable});
  return response;
};
export default useAccessControl;
