package org.egov.rb.pgr.v2.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.egov.common.contract.request.Role;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private Long id;
    private String userName;
    private String name;
    private String type;
    private String mobileNumber;
    private String countryCode;
    private String emailId;
    private List<Role> roles;
    private String tenantId;
    private String uuid;
    private Boolean active;

    @JsonIgnore
    public String getFullMobileNumber() {
        if (countryCode != null && mobileNumber != null) {
            return countryCode + mobileNumber;
        }
        return mobileNumber;
    }

}
