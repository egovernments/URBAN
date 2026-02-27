package org.egov.pt.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.egov.common.contract.request.PlainAccessRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.pt.models.Address;
import org.egov.pt.models.OwnerInfo;
import org.egov.pt.models.Property;
import org.egov.pt.models.PropertyCriteria;
import org.egov.pt.models.user.UserDetailResponse;
import org.egov.pt.models.user.UserSearchRequest;
import org.egov.pt.service.PropertyService;
import org.egov.pt.service.UserService;
import org.egov.pt.validator.PropertyValidator;
import org.egov.pt.web.contracts.PropertyRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

@Component
public class UnmaskingUtil {
	
	private static List<String> ownerPlainRequestFieldsList;
	

	@Autowired
	private UserService userService;
	


	public Property getPropertyUnmasked(PropertyRequest request,Property propertyFromRequest,List<Property> propertiesFromSearchResponse ) {

		/*Property propertyFromRequest = request.getProperty();
        PropertyCriteria criteria = validator.getPropertyCriteriaForSearch(request);
        List<Property> propertiesFromSearchResponse = service.searchProperty(criteria, request.getRequestInfo());*/
		if (CollectionUtils.isEmpty(propertiesFromSearchResponse)) {
			throw new CustomException("EG_PT_PROPERTY_NOT_FOUND", "The property to be updated does not exist in the system");
		}
		Property propertyFromSearch = getProperty(propertyFromRequest, propertiesFromSearchResponse);


		getOwnerDetailsUnmasked(request.getProperty(), request.getRequestInfo());
		return propertyFromSearch;
	}

	private static Property getProperty(Property propertyFromRequest, List<Property> propertiesFromSearchResponse) {
		Property propertyFromSearch = propertiesFromSearchResponse.get(0);

		Address addressFromRequest = propertyFromRequest.getAddress();

		if (null != addressFromRequest.getDoorNo() && addressFromRequest.getDoorNo().contains("*"))
			addressFromRequest.setDoorNo(propertyFromSearch.getAddress().getDoorNo());
		if (null != addressFromRequest.getStreet() && addressFromRequest.getStreet().contains("*"))
			addressFromRequest.setStreet(propertyFromSearch.getAddress().getStreet());
		if (null != addressFromRequest.getLandmark() && addressFromRequest.getLandmark().contains("*"))
			addressFromRequest.setLandmark(propertyFromSearch.getAddress().getLandmark());
		return propertyFromSearch;
	}

	public void getOwnerDetailsUnmasked (Property property, RequestInfo requestInfo) {
		
		PlainAccessRequest apiPlainAccessRequest = requestInfo.getPlainAccessRequest();
		
		List<String> plainRequestFieldsList = getAllFieldsPlainAccessList();
		PlainAccessRequest plainAccessRequest = PlainAccessRequest.builder()
				.plainRequestFields(plainRequestFieldsList)
				.build();
		requestInfo.setPlainAccessRequest(plainAccessRequest);
		
		UserSearchRequest userSearchRequest = userService.getBaseUserSearchRequest(property.getTenantId(), requestInfo);
		
		Set<String> ownerIds = new HashSet<>();
		
		for (OwnerInfo ownerInfo : property.getOwners()) {
			
			String currentOwnerId = ownerInfo.getUuid();
			if(currentOwnerId == null)
				continue;
			
			/*
			 * once user module is updated to handle masked update 
			 * users will be unmasked on need, currently all. 
			 */
			ownerIds.clear();
			ownerIds.add(currentOwnerId);
			userSearchRequest.setUuid(ownerIds);
			plainAccessRequest.setRecordId(currentOwnerId);

			UserDetailResponse userDetailResponse = userService.getUser(userSearchRequest);

			OwnerInfo unmaskedUser = userDetailResponse.getUser().get(0);
			updateMaskedOwnerInfoWithUnmaskedFields(ownerInfo, unmaskedUser);
			requestInfo.setPlainAccessRequest(apiPlainAccessRequest);
		}

	}

	private void updateMaskedOwnerInfoWithUnmaskedFields(OwnerInfo ownerInfo, OwnerInfo unmaskedUser) {

		if (isMasked(ownerInfo.getFatherOrHusbandName())) {
      ownerInfo.setFatherOrHusbandName(unmaskedUser.getFatherOrHusbandName());
    }
		if (isMasked(ownerInfo.getMobileNumber())) {
			ownerInfo.setMobileNumber(unmaskedUser.getMobileNumber());
		}
		
		if (isMasked(ownerInfo.getPermanentAddress())) {
			ownerInfo.setPermanentAddress(unmaskedUser.getPermanentAddress());
		}
		
		if (isMasked(ownerInfo.getCorrespondenceAddress())) {
			ownerInfo.setCorrespondenceAddress(unmaskedUser.getCorrespondenceAddress());
		}
		if (isMasked(ownerInfo.getUserName())) {
			ownerInfo.setUserName(unmaskedUser.getUserName());
		}
		if (isMasked(ownerInfo.getName())) {
			ownerInfo.setName(unmaskedUser.getName());
		}
		if (isMasked(ownerInfo.getGender())) {
			ownerInfo.setGender(unmaskedUser.getGender());
		}
	}

  private boolean isMasked(String value) {
    return value != null && value.contains("*");
  }


  public static List<String> getAllFieldsPlainAccessList() {

		if (ownerPlainRequestFieldsList == null) {
			
			ownerPlainRequestFieldsList = new ArrayList<>();
			ownerPlainRequestFieldsList.add("mobileNumber");
			ownerPlainRequestFieldsList.add("guardian");
			ownerPlainRequestFieldsList.add("fatherOrHusbandName");
			ownerPlainRequestFieldsList.add("correspondenceAddress");
			ownerPlainRequestFieldsList.add("userName");
			ownerPlainRequestFieldsList.add("name");
			ownerPlainRequestFieldsList.add("gender");
		}
		return ownerPlainRequestFieldsList;
	}
}
