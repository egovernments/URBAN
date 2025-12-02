import { BackButton, Dropdown, FormComposer, Loader, Toast } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";
import Header from "../../../components/Header";

/* Intercept localStorage.setItem to catch who sets "token" key */
const interceptTokenStorage = () => {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    if (key === "token") {
      console.error('[SECURITY] ⚠️ CAUGHT: Attempt to set "token" key in localStorage');
      console.error('[SECURITY] Value being set:', value);
      console.error('[SECURITY] Stack trace of who is setting it:');
      console.trace();
      console.error('[SECURITY] This call will be BLOCKED to prevent insecure token storage');
      // Block the call - do NOT store it
      return;
    }
    // Allow other keys
    return originalSetItem.apply(this, arguments);
  };
  console.log('[SECURITY] localStorage.setItem interceptor installed - will block "token" key');
};

/* Clean up specific token key from localStorage for security */
const cleanupTokensFromLocalStorage = () => {
  // Remove only the exact "token" key (legacy)
  const tokenValue = localStorage.getItem("token");
  if (tokenValue) {
    console.log('[SECURITY] Found and removing "token" key from localStorage');
    console.log('[SECURITY] Token value:', tokenValue);
    localStorage.removeItem("token");
    console.log('[SECURITY] "token" key removed successfully');
  }
};

/* Clear session by calling logout endpoint to let server remove HttpOnly SESSION_ID cookie */
const clearServerSession = async () => {
  try {
    // Call logout endpoint to clear server-side session
    // This will clear the HttpOnly SESSION_ID cookie (which JavaScript can't access)
    const response = await fetch('/user/_logout', {
      method: 'POST',
      credentials: 'include', // Send existing SESSION_ID cookie
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (response.ok) {
      console.log('[SECURITY] Successfully cleared stale server-side session');
    } else {
      console.log('[SECURITY] Logout endpoint returned error (session may not exist):', response.status);
    }
  } catch (err) {
    // Ignore errors - the session might not exist, endpoint might not be implemented yet,
    // or CORS might be blocking. Login will proceed regardless.
    console.log('[SECURITY] Could not call logout endpoint (session cleanup skipped):', err.message);
  }
};

/* set employee details to enable backward compatible */
const setEmployeeDetail = (userObject) => {
  console.log('[LOGIN-FLOW] setEmployeeDetail: Called with userObject:', userObject);

  let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
  console.log('[LOGIN-FLOW] setEmployeeDetail: Using locale:', locale);

  console.log('[LOGIN-FLOW] setEmployeeDetail: Setting localStorage items...');
  localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
  localStorage.setItem("tenant-id", userObject?.tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Employee.locale", locale);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
  console.log('[LOGIN-FLOW] setEmployeeDetail: All localStorage items set');

  // Clean up all token-related keys from localStorage AFTER setting user info
  // This ensures any legacy code that sets token keys gets cleaned up
  console.log('[LOGIN-FLOW] setEmployeeDetail: Scheduling token cleanup in 100ms');
  setTimeout(() => cleanupTokensFromLocalStorage(), 100);
};

const Login = ({ config: propsConfig, t, isDisabled }) => {
  console.log('[LOGIN-FLOW] Login component rendered/re-rendered');

  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [disable, setDisable] = useState(false);

  const history = useHistory();
  console.log('[LOGIN-FLOW] React Router history object:', history);

  // const getUserType = () => "EMPLOYEE" || Digit.UserService.getType();

  // Install localStorage interceptor on component mount to catch token storage attempts
  useEffect(() => {
    console.log('[LOGIN-FLOW] Component mounted - installing localStorage interceptor');
    interceptTokenStorage();
  }, []);

  useEffect(() => {
    console.log('[LOGIN-FLOW] Step 4: useEffect triggered with user:', user);

    if (!user) {
      console.log('[LOGIN-FLOW] Step 4a: No user data, exiting useEffect');
      return;
    }

    console.log('[LOGIN-FLOW] Step 5: Setting user request object in SessionStorage');
    Digit.SessionStorage.set("citizen.userRequestObject", user);

    console.log('[LOGIN-FLOW] Step 6: Filtering roles for tenantId:', Digit.SessionStorage.get("Employee.tenantId"));
    const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    console.log('[LOGIN-FLOW] Step 6a: Filtered roles:', filteredRoles);

    if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;

    console.log('[LOGIN-FLOW] Step 7: Calling Digit.UserService.setUser()');
    Digit.UserService.setUser(user);
    console.log('[LOGIN-FLOW] Step 7a: User set in UserService');

    console.log('[LOGIN-FLOW] Step 8: Setting employee details');
    setEmployeeDetail(user?.info);
    console.log('[LOGIN-FLOW] Step 8a: Employee details set');

    let redirectPath = "/digit-ui/employee";
    console.log('[LOGIN-FLOW] Step 9: Default redirect path:', redirectPath);

    /* logic to redirect back to same screen where we left off  */
    if (window?.location?.href?.includes("from=")) {
      redirectPath = decodeURIComponent(window?.location?.href?.split("from=")?.[1]) || "/digit-ui/employee";
      console.log('[LOGIN-FLOW] Step 9a: Redirect path from URL param:', redirectPath);
    }

    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.length > 0 &&  user?.info?.roles?.every((e) => e.code === "NATADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/NURT_DASHBOARD";
      console.log('[LOGIN-FLOW] Step 9b: NATADMIN redirect path:', redirectPath);
    }
    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "STADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/home";
      console.log('[LOGIN-FLOW] Step 9c: STADMIN redirect path:', redirectPath);
    }

    console.log('[LOGIN-FLOW] Step 10: FINAL NAVIGATION - Calling history.replace() to:', redirectPath);
    console.log('[LOGIN-FLOW] Step 10a: Current location before navigation:', window.location.href);
    history.replace(redirectPath);
    console.log('[LOGIN-FLOW] Step 10b: history.replace() called successfully');
  }, [user]);

  const onLogin = async (data) => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║ [STEP 1] LOGIN INITIATED - onLogin() called               ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('[STEP 1.1] Form data received:', data);

    if (!data.city) {
      console.error('[STEP 1 - ERROR] ❌ No city selected');
      alert("Please Select City!");
      return;
    }

    console.log('[STEP 1.2] ✓ City validated');
    console.log('[STEP 1.3] Setting form disable state to true');
    setDisable(true);

    // Clear any existing server-side session before new login
    // This calls logout endpoint to remove HttpOnly SESSION_ID cookie
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║ [STEP 2] CLEARING OLD SESSION                             ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('[STEP 2.1] Calling logout endpoint to clear old SESSION_ID cookie...');
    await clearServerSession();
    console.log('[STEP 2.2] ✓ Old session cleared');

    const requestData = {
      ...data,
      userType: "EMPLOYEE",
    };
    requestData.tenantId = data.city.code;
    delete requestData.city;

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║ [STEP 3] OAUTH AUTHENTICATION CALL                        ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('[STEP 3.1] Prepared OAuth request data:', requestData);
    console.log('[STEP 3.2] Calling /user/oauth/token endpoint...');

    try {
      const response = await Digit.UserService.authenticate(requestData);

      console.log('\n╔════════════════════════════════════════════════════════════╗');
      console.log('║ [STEP 4] OAUTH RESPONSE RECEIVED                          ║');
      console.log('╚════════════════════════════════════════════════════════════╝');
      console.log('[STEP 4.1] ✓ OAuth API call successful');
      console.log('[STEP 4.2] Response object:', response);
      console.log('[STEP 4.3] Response keys:', Object.keys(response));

      const { UserRequest: info, ...tokens } = response;
      console.log('[STEP 4.4] Destructured UserRequest (user info):', info);
      console.log('[STEP 4.5] Destructured tokens object:', tokens);
      console.log('[STEP 4.6] Token keys present:', Object.keys(tokens));

      console.log('\n╔════════════════════════════════════════════════════════════╗');
      console.log('║ [STEP 5] STORING USER DATA                                ║');
      console.log('╚════════════════════════════════════════════════════════════╝');
      console.log('[STEP 5.1] Setting Employee.tenantId in SessionStorage:', info?.tenantId);
      Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);

      console.log('[STEP 5.2] Preparing user data for setState...');
      const userDataToSet = { info, ...tokens };
      console.log('[STEP 5.3] User data structure to set:', userDataToSet);
      console.log('[STEP 5.4] Calling setUser() to update state...');
      setUser(userDataToSet);
      console.log('[STEP 5.5] ✓ setUser() called - React will trigger useEffect next');

    } catch (err) {
      console.log('\n╔════════════════════════════════════════════════════════════╗');
      console.log('║ [STEP 4 - ERROR] AUTHENTICATION FAILED                    ║');
      console.log('╚════════════════════════════════════════════════════════════╝');
      console.error('[STEP 4 - ERROR] ❌ Authentication error:', err);
      console.error('[STEP 4 - ERROR] Error response:', err?.response);
      console.error('[STEP 4 - ERROR] Error data:', err?.response?.data);
      console.error('[STEP 4 - ERROR] Error message:', err?.response?.data?.error_description);
      setShowToast(err?.response?.data?.error_description || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }

    console.log('[STEP 5.6] Re-enabling form (setting disable to false)');
    setDisable(false);
    console.log('════════════════════════════════════════════════════════════\n');
  };

  const closeToast = () => {
    setShowToast(null);
  };

  const onForgotPassword = () => {
    sessionStorage.getItem("User") && sessionStorage.removeItem("User")
    history.push("/digit-ui/employee/user/forgot-password");
  };

  const [userId, password, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: userId.name,
          },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: {
            name: password.name,
          },
          isMandatory: true,
        },
        {
          label: t(city.label),
          type: city.type,
          populators: {
            name: city.name,
            customProps: {},
            component: (props, customProps) => (
              <Dropdown
                option={cities}
                className="login-city-dd"
                optionKey="i18nKey"
                select={(d) => {
                  props.onChange(d);
                }}
                t={t}
                {...customProps}
              />
            ),
          },
          isMandatory: true,
        },
      ],
    },
  ];

  return isLoading || isStoreLoading ? (
    <Loader />
  ) : (
    <Background>
      <div className="employeeBackbuttonAlign">
        <BackButton variant="white" style={{ borderBottom: "none" }} />
      </div>

      <FormComposer
        onSubmit={onLogin}
        isDisabled={isDisabled || disable}
        noBoxShadow
        inline
        submitInForm
        config={config}
        label={propsConfig.texts.submitButtonLabel}
        secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
        onSecondayActionClick={onForgotPassword}
        heading={propsConfig.texts.header}
        headingStyle={{ textAlign: "center" }}
        cardStyle={{ margin: "auto", minWidth: "408px" }}
        className="loginFormStyleEmployee"
        buttonStyle={{ maxWidth: "100%", width: "100%" }}
      >
        <Header />
      </FormComposer>
      {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}
      <div className="employee-login-home-footer" style={{ backgroundColor: "unset" }}>
        <img
          alt="Powered by DIGIT"
          src={window?.globalConfigs?.getConfig?.("DIGIT_FOOTER_BW")}
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open(window?.globalConfigs?.getConfig?.("DIGIT_HOME_URL"), "_blank").focus();
          }}
        />{" "}
      </div>
    </Background>
  );
};

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};

export default Login;
