package org.egov.swcalculation.web.models;

import jakarta.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SMSRequest {
    @Pattern(regexp = "^[0-9]{10}$|^\\+[0-9]{1,4}[0-9]{10,15}$", message = "MobileNumber should be 10 digit number or full number with country code")
    private String mobileNumber;
    private String message;
    private Category category;
    private Long expiryTime;
}
