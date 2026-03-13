package org.egov.bpa.web.model.NOC;

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

	@Pattern(regexp = "(^\\+[1-9][0-9]{0,3}[0-9]{4,15}$|^[0-9]{10}$)", message = "Mobile number must be in international format (+XXXXXXXXXXXX) or 10 digits")
	private String mobileNumber;
	private String message;
}
