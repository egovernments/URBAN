package org.egov.pt.models.oldProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import org.egov.common.contract.request.Role;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * User
 */
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class User   {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("uuid")
        private String uuid;

        @JsonProperty("userName")
        private String userName;

        @JsonProperty("password")
        private String password;

        @JsonProperty("salutation")
        private String salutation;

        @NotNull
        @Size(max=100)
        @Pattern(regexp = "^[a-zA-Z0-9 \\-'`\\.]*$", message = "Invalid name. Only alphabets and special characters -, ',`, .")
        @JsonProperty("name")
        private String name;

        @JsonProperty("gender")
        private String gender;

        @JsonProperty("mobileNumber")
        private String mobileNumber;

        @Pattern(regexp = "^\\+[1-9][0-9]{0,3}$", message = "Invalid country code. Must be + followed by 1-4 digits, starting with non-zero")
        @JsonProperty("countryCode")
        private String countryCode;

        @JsonProperty("emailId")
        private String emailId;

        @JsonProperty("altContactNumber")
        private String altContactNumber;

        @JsonProperty("pan")
        private String pan;

        @Digits(integer = 12,fraction=0)
        @JsonProperty("aadhaarNumber")
        private String aadhaarNumber;

        @JsonProperty("permanentAddress")
        private String permanentAddress;

        @JsonProperty("permanentCity")
        private String permanentCity;

        @JsonProperty("permanentPinCode")
        private String permanentPincode;

        @JsonProperty("correspondenceCity")
        private String correspondenceCity;

        @JsonProperty("correspondencePinCode")
        private String correspondencePincode;

        @JsonProperty("correspondenceAddress")
        private String correspondenceAddress;

        @JsonProperty("active")
        private Boolean active;

        @JsonProperty("dob")
        private Long dob;

        @JsonProperty("pwdExpiryDate")
        private Long pwdExpiryDate;

        @JsonProperty("locale")
        private String locale;

        @JsonProperty("type")
        private String type;

        @JsonProperty("signature")
        private String signature;

        @JsonProperty("accountLocked")
        private Boolean accountLocked;

        @JsonProperty("roles")
        @Valid
        private List<Role> roles;

        @JsonProperty("fatherOrHusbandName")
        private String fatherOrHusbandName;

        @JsonProperty("bloodGroup")
        private String bloodGroup;

        @JsonProperty("identificationMark")
        private String identificationMark;

        @JsonProperty("photo")
        private String photo;

        @JsonProperty("createdBy")
        private String createdBy;

        @JsonProperty("createdDate")
        private Long createdDate;

        @JsonProperty("lastModifiedBy")
        private String lastModifiedBy;

        @JsonProperty("lastModifiedDate")
        private Long lastModifiedDate;

        @JsonProperty("otpReference")
        private String otpReference;

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
         * Returns the full mobile number with country code prefix
         * @return formatted mobile number with country code (e.g., +91xxxxxxxxxx) or just mobile number if no country code
         */
        public String getFullMobileNumber() {
            if (this.countryCode != null && !this.countryCode.isEmpty() && this.mobileNumber != null) {
                return this.countryCode + this.mobileNumber;
            }
            return this.mobileNumber;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                User user = (User) o;
                return Objects.equals(uuid, user.uuid) &&
                        Objects.equals(name, user.name) &&
                        Objects.equals(mobileNumber, user.mobileNumber) &&
                        Objects.equals(countryCode, user.countryCode);
        }

        @Override
        public int hashCode() {

                return Objects.hash(uuid, name, mobileNumber, countryCode);
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
                return commonUser;
        }

}

