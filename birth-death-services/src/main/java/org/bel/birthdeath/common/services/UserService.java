package org.bel.birthdeath.common.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import org.bel.birthdeath.common.config.CommonConfiguration;
import org.bel.birthdeath.common.contract.DeathResponse;
import org.bel.birthdeath.common.contract.ParentInfo;
import org.bel.birthdeath.common.contract.ParentInfoProvider;
import org.bel.birthdeath.common.model.user.User;
import org.bel.birthdeath.common.model.user.UserDetailResponse;
import org.bel.birthdeath.common.model.user.UserRequest;
import org.bel.birthdeath.common.model.user.UserSearchRequest;
import org.bel.birthdeath.common.repository.ServiceRequestRepository;
import org.bel.birthdeath.common.util.CommonErrorConstants;
import org.bel.birthdeath.common.util.Constants;
import org.bel.birthdeath.death.model.EgDeathDtl;
import org.bel.birthdeath.death.model.SearchCriteria;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

    @Autowired
    CommonConfiguration config;

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private ObjectMapper mapper;

    /**
     *
     */
    @SuppressWarnings("null")
    public User manageOwner(String tenantId, ParentInfo fatherInfo, RequestInfo requestInfo, boolean isUpdate) {

        if (fatherInfo == null) {
            throw new CustomException("FATHER_INFO_MISSING", "Father information is missing");
        }

        User owner = new User();
        owner.setTenantId(tenantId);
        owner.setGender(Constants.MALE);
        owner.setName(fatherInfo.getFirstname());
        owner.setMobileNumber(fatherInfo.getMobileno());

        if (owner.getMobileNumber() == null) {
            throw new CustomException(CommonErrorConstants.INVALID_OWNER_ERROR,
                    "MobileNo is mandatory for ownerInfo");
        }

        UserDetailResponse userDetailResponse = userExists(owner);

        if (userDetailResponse != null && !CollectionUtils.isEmpty(userDetailResponse.getUser()) && !isUpdate) {
            boolean notFoundUser = true;

            for (User user : userDetailResponse.getUser()) {
                if ((user.getUserName().equalsIgnoreCase(user.getMobileNumber())
                        && user.getName().equalsIgnoreCase(owner.getName()))
                        || user.getName().equalsIgnoreCase(owner.getName())) {
                    owner = user;
                    notFoundUser = false;
                    break;
                }
            }

            if (notFoundUser) {
                owner = createFatherInfo(owner, requestInfo);
            }

        } else {
            if (!isUpdate) {
                owner = createFatherInfo(owner, requestInfo);
            } else {
                HashMap<String, String> errorMap = new HashMap<>();
                owner = updateUserDetails(owner, requestInfo, errorMap);
            }
        }

        return owner;
    }

    /**
     * Update Vehicle Details
     *
     * @param userInfo
     * @param requestInfo
     * @param errorMap
     * @return
     */
    private User updateUserDetails(User userInfo, RequestInfo requestInfo, HashMap<String, String> errorMap) {
        User userUpdated = new User();
        UserRequest userRequest = UserRequest.builder().user(userInfo).requestInfo(requestInfo).build();
        StringBuilder uri = new StringBuilder();
        uri.append(config.getUserHost()).append(config.getUserContextPath()).append(config.getUserUpdateEndpoint());
        UserDetailResponse userResponse = ownerCall(userRequest, uri);
        if (userResponse != null && !userResponse.getUser().isEmpty()) {
            userUpdated = userResponse.getUser().get(0);
        } else {
            errorMap.put(CommonErrorConstants.INVALID_OWNER,
                    "Unable to Update UserDetails to the existing birth/death certificate !");
        }
        return userUpdated;

    }

    /**
     * create Father  info in User
     *
     * @param owner
     * @param requestInfo
     * @return
     */
    private User createFatherInfo(User owner, RequestInfo requestInfo) {

//        if (!isUserValid(owner)) {
//            throw new CustomException(CommonErrorConstants.INVALID_OWNER_ERROR,
//                    "Dob, relationShip, relation ship name and gender are mandaotry !");
//        }
        Role role = getCitizenRole();
        addUserDefaultFields(owner.getTenantId(), role, owner);
        StringBuilder uri = new StringBuilder(config.getUserHost()).append(config.getUserContextPath())
                .append(config.getUserCreateEndpoint());

        setUserName(owner);

        owner.setType(Constants.CITIZEN);
        UserDetailResponse userDetailResponse = userCall(new UserRequest(requestInfo, owner), uri);
        log.debug("owner created --> " + userDetailResponse.getUser().get(0).getUuid());
        return userDetailResponse.getUser().get(0);
    }

    /**
     * Creates citizen role
     *
     * @return Role object for citizen
     */
    private Role getCitizenRole() {
        Role role = new Role();
        role.setCode(Constants.CITIZEN);
        role.setName("Citizen");
        return role;
    }

    /**
     * Sets the role,type,active and tenantId for a Citizen
     *
     * @param tenantId  TenantId of the property
     * @param role
     * @param role      The role of the user set in this case to CITIZEN
     * @param applicant The user whose fields are to be set
     */
    private void addUserDefaultFields(String tenantId, Role role, User applicant) {
        applicant.setActive(true);
        applicant.setTenantId(tenantId.split("\\.")[0]);
        applicant.setRoles(Collections.singletonList(role));
        applicant.setType(Constants.CITIZEN);
    }

    /**
     * Sets the username as uuid
     *
     * @param owner The owner to whom the username is to assigned
     */
    private void setUserName(User owner) {
        String uuid = UUID.randomUUID().toString();
        owner.setUserName(uuid);
        owner.setUuid(uuid);

    }

    /**
     * Returns UserDetailResponse by calling user service with given uri and object
     *
     * @param userRequest Request object for user service
     * @param uri         The address of the end point
     * @return Response from user service as parsed as userDetailResponse
     */
    @SuppressWarnings("rawtypes")
    UserDetailResponse userCall(Object userRequest, StringBuilder uri) {
        String dobFormat = null;
        if (uri.toString().contains(config.getUserSearchEndpoint())
                || uri.toString().contains(config.getUserUpdateEndpoint()))
            dobFormat = "yyyy-MM-dd";
        else if (uri.toString().contains(config.getUserCreateEndpoint()))
            dobFormat = "dd/MM/yyyy";
        try {

            LinkedHashMap responseMap = (LinkedHashMap) serviceRequestRepository.fetchResult(uri, userRequest);
            parseResponse(responseMap, dobFormat);
            return mapper.convertValue(responseMap, UserDetailResponse.class);
        } catch (IllegalArgumentException e) {
            throw new CustomException(Constants.ILLEGAL_ARGUMENT_EXCEPTION,
                    "ObjectMapper not able to convertValue in userCall");
        }
    }

    /**
     * @return
     */
    private Role getRolObj(String roleCode, String roleName) {
        Role role = new Role();
        role.setCode(roleCode);
        role.setName(roleName);
        return role;
    }

    public UserDetailResponse userExists(User owner) {

        UserSearchRequest ownerSearchRequest = new UserSearchRequest();
        ownerSearchRequest.setTenantId(owner.getTenantId().split("\\.")[0]);

        if (!StringUtils.isEmpty(owner.getMobileNumber())) {
            ownerSearchRequest.setMobileNumber(owner.getMobileNumber());
        }

        StringBuilder uri = new StringBuilder(config.getUserHost()).append(config.getUserSearchEndpoint());
        return ownerCall(ownerSearchRequest, uri);

    }

    public Boolean isRoleAvailale(User user, String role, String tenantId) {
        Boolean flag = false;
        Map<String, List<String>> tenantIdToOwnerRoles = getTenantIdToOwnerRolesMap(user);
        flag = isRoleAvailable(tenantIdToOwnerRoles.get(tenantId), role);
        return flag;
    }

    public Map<String, List<String>> getTenantIdToOwnerRolesMap(User user) {
        Map<String, List<String>> tenantIdToOwnerRoles = new HashMap<>();
        user.getRoles().forEach(role -> {
            if (tenantIdToOwnerRoles.containsKey(role.getTenantId())) {
                tenantIdToOwnerRoles.get(role.getTenantId()).add(role.getCode());
            } else {
                List<String> roleCodes = new LinkedList<>();
                roleCodes.add(role.getCode());
                tenantIdToOwnerRoles.put(role.getTenantId(), roleCodes);
            }

        });
        return tenantIdToOwnerRoles;
    }

    private Boolean isRoleAvailable(List<String> ownerRoles, String role) {
        if (CollectionUtils.isEmpty(ownerRoles)) {
            return false;
        }
        return ownerRoles.contains(role);

    }

    /**
     * @param ownerRequest
     * @param uri
     * @return
     */
    @SuppressWarnings("rawtypes")
    UserDetailResponse ownerCall(Object ownerRequest, StringBuilder uri) {
        String dobFormat = null;
        if (uri.toString().contains(config.getUserSearchEndpoint())
                || uri.toString().contains(config.getUserUpdateEndpoint()))
            dobFormat = "yyyy-MM-dd";
        else if (uri.toString().contains(config.getUserCreateEndpoint()))
            dobFormat = "dd/MM/yyyy";
        try {
            LinkedHashMap responseMap = (LinkedHashMap) serviceRequestRepository.fetchResult(uri, ownerRequest);
            parseResponse(responseMap, dobFormat);
            return mapper.convertValue(responseMap, UserDetailResponse.class);
        } catch (IllegalArgumentException e) {
            throw new CustomException(Constants.ILLEGAL_ARGUMENT_EXCEPTION,
                    "ObjectMapper not able to convertValue in ownerCall");
        }

    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private void parseResponse(LinkedHashMap responeMap, String dobFormat) {
        List<LinkedHashMap> owners = (List<LinkedHashMap>) responeMap.get("user");
        String format1 = "dd-MM-yyyy HH:mm:ss";
        if (owners != null) {
            owners.forEach(map -> {
                map.put("createdDate", dateTolong((String) map.get("createdDate"), format1));
                if ((String) map.get("lastModifiedDate") != null)
                    map.put("lastModifiedDate", dateTolong((String) map.get("lastModifiedDate"), format1));
                if ((String) map.get("dob") != null)
                    map.put("dob", dateTolong((String) map.get("dob"), dobFormat));
                if ((String) map.get("pwdExpiryDate") != null)
                    map.put("pwdExpiryDate", dateTolong((String) map.get("pwdExpiryDate"), format1));
            });
        }
    }

    private Long dateTolong(String date, String format) {
        SimpleDateFormat f = new SimpleDateFormat(format);
        Date d = null;
        try {
            d = f.parse(date);
        } catch (ParseException e) {
            throw new CustomException("PARSING_ERROR", "Failed to parse dateTolong" + e);
        }
        return d != null ? d.getTime() : 0;
    }

//    public UserDetailResponse getOwner(UserOwnerSearchCriteria criteria, RequestInfo requestInfo) {
//        UserSearchRequest ownerSearchRequest = getOwnerSearchRequest(criteria, requestInfo);
//        StringBuilder uri = new StringBuilder(config.getUserHost()).append(config.getUserSearchEndpoint());
//        return ownerCall(ownerSearchRequest, uri);
//    }
public <T extends ParentInfoProvider> UserDetailResponse getOwners(List<T> dtls, RequestInfo requestInfo) {
    Set<String> mobileNumbers = new HashSet<>();
    String tenantId = null;

    for (T dtl : dtls) {
        ParentInfo fatherInfo = dtl.getFatherInfo();
        if (fatherInfo != null && fatherInfo.getMobileno() != null) {
            mobileNumbers.add(fatherInfo.getMobileno());
            if (tenantId == null) tenantId = dtl.getTenantid();
        }
    }

    if (mobileNumbers.isEmpty()) return new UserDetailResponse();

    UserSearchRequest searchRequest = new UserSearchRequest();
    searchRequest.setRequestInfo(requestInfo);
    searchRequest.setTenantId(tenantId.split("\\.")[0]);
    searchRequest.setMobileNumber(String.join(",", mobileNumbers));

    StringBuilder uri = new StringBuilder(config.getUserHost()).append(config.getUserSearchEndpoint());
    return ownerCall(searchRequest, uri);
}


//    private UserSearchRequest getOwnerSearchRequest(UserOwnerSearchCriteria criteria, RequestInfo requestInfo) {
//        UserSearchRequest searchRequest = new UserSearchRequest();
//        searchRequest.setRequestInfo(requestInfo);
//
//        searchRequest.setTenantId(criteria.getTenantid().split("\\.")[0]);
//
//        ParentInfo fatherInfo = criteria.getFatherInfo();
//        if (fatherInfo != null) {
//            searchRequest.setName(fatherInfo.getFirstname());
//            searchRequest.setMobileNumber(fatherInfo.getMobileno());
//        }
//
//        return searchRequest;
//    }

}