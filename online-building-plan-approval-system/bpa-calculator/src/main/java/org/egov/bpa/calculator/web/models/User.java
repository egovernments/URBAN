package org.egov.bpa.calculator.web.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.egov.common.contract.request.Role;

import com.fasterxml.jackson.annotation.JsonProperty;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {


	 @JsonProperty("id")
    private Long id;
	 
    @Size(max=64)
    @JsonProperty("uuid")
    private String uuid;

    @Size(max=64)
    @JsonProperty("userName")
    private String userName;

    @Size(max=64)
    @JsonProperty("password")
    private String password;

    @JsonProperty("salutation")
    private String salutation;

    @NotNull
    @Size(max=100)
    @JsonProperty("name")
    private String name;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("countryCode")
    @Pattern(regexp = "^\\+[1-9][0-9]{0,3}$", message = "CountryCode must be in format +X to +XXXX")
    private String countryCode;

    @NotNull
    @Pattern(regexp = "^[0-9]{4,15}$", message = "MobileNumber should be 4 to 15 digits")
    @JsonProperty("mobileNumber")
    private String mobileNumber;

    @Size(max=128)
    @JsonProperty("emailId")
    private String emailId;

    @Size(max=50)
    @JsonProperty("altContactNumber")
    private String altContactNumber;

    @Size(max=10)
    @JsonProperty("pan")
    private String pan;

    @Pattern(regexp = "^[0-9]{12}$", message = "AdharNumber should be 12 digit number")
    @JsonProperty("aadhaarNumber")
    private String aadhaarNumber;

    @Size(max=300)
    @JsonProperty("permanentAddress")
    private String permanentAddress;

    @Size(max=300)
    @JsonProperty("permanentCity")
    private String permanentCity;

    @Size(max=10)
    @JsonProperty("permanentPinCode")
    private String permanentPincode;

    @Size(max=300)
    @JsonProperty("correspondenceCity")
    private String correspondenceCity;

    @Size(max=10)
    @JsonProperty("correspondencePinCode")
    private String correspondencePincode;

    @Size(max=300)
    @JsonProperty("correspondenceAddress")
    private String correspondenceAddress;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("dob")
    private Long dob;

    @JsonProperty("pwdExpiryDate")
    private Long pwdExpiryDate;

    @Size(max=16)
    @JsonProperty("locale")
    private String locale;

    @Size(max=50)
    @JsonProperty("type")
    private String type;

    @JsonProperty("signature")
    private String signature;

    @JsonProperty("accountLocked")
    private Boolean accountLocked;

    @JsonProperty("roles")
    @Valid
    private List<Role> roles;

    @Size(max=100)
    @JsonProperty("fatherOrHusbandName")
    private String fatherOrHusbandName;

    @Size(max=32)
    @JsonProperty("bloodGroup")
    private String bloodGroup;

    @JsonProperty("identificationMark")
    private String identificationMark;

    @JsonProperty("photo")
    private String photo;

    @Size(max=64)
    @JsonProperty("createdBy")
    private String createdBy;

    @JsonProperty("createdDate")
    private Long createdDate;

    @Size(max=64)
    @JsonProperty("lastModifiedBy")
    private String lastModifiedBy;

    @JsonProperty("lastModifiedDate")
    private Long lastModifiedDate;

    @JsonProperty("otpReference")
    private String otpReference;

    @Size(max=256)
    @JsonProperty("tenantId")
    private String tenantId;


    public User addRolesItem(Role rolesItem) {
            if (this.roles == null) {
                    this.roles = new ArrayList<>();
            }
            this.roles.add(rolesItem);
            return this;
    }

    /**
     * Returns the full mobile number with country code.
     * If countryCode is present, returns countryCode + mobileNumber.
     * Otherwise, returns just the mobileNumber.
     *
     * @return Full mobile number with country code if available
     */
    public String getFullMobileNumber() {
        if (countryCode != null && !countryCode.isEmpty()) {
            return countryCode + mobileNumber;
        }
        return mobileNumber;
    }

    @Override
    public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            User user = (User) o;
            return Objects.equals(uuid, user.uuid) &&
                    Objects.equals(name, user.name) &&
                    Objects.equals(countryCode, user.countryCode) &&
                    Objects.equals(mobileNumber, user.mobileNumber);
    }

    @Override
    public int hashCode() {

            return Objects.hash(uuid, name, countryCode, mobileNumber);
    }
    
    public org.egov.common.contract.request.User toCommonUser(){
            org.egov.common.contract.request.User commonUser = new org.egov.common.contract.request.User();
            commonUser.setId(this.getId());
            commonUser.setUserName(this.getUserName());
            commonUser.setName(this.getName());
            commonUser.setType(this.getType());
            commonUser.setMobileNumber(this.getMobileNumber());
            commonUser.setEmailId(this.getEmailId());
            commonUser.setRoles(this.getRoles());
            commonUser.setTenantId(this.getTenantId());
            commonUser.setUuid(this.getUuid());
            // Note: countryCode is set separately on the common user model if it supports it
            return commonUser;
    }

}
