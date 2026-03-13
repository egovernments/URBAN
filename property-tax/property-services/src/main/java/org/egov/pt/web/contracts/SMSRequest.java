package org.egov.pt.web.contracts;

import lombok.*;
import jakarta.validation.constraints.Pattern;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SMSRequest {
    @Pattern(regexp = "^(\\+[1-9][0-9]{0,3})?[0-9]{6,15}$", message = "Invalid mobile number format. Must be 6-15 digits, optionally prefixed with country code (+X to +XXXX)")
    private String mobileNumber;
    private String message;

}
