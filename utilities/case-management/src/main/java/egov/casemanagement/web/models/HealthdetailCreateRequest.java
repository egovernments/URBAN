package egov.casemanagement.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

/**
 * HealthdetailCreateRequest
 */
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2020-05-27T12:33:33.069+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HealthdetailCreateRequest   {
        @JsonProperty("RequestInfo")
        @NotNull
        private org.egov.common.contract.request.RequestInfo requestInfo = null;

        @JsonProperty("tenantId")
        @NotNull
        private String tenantId = null;

        @JsonProperty("name")
        private String name = null;

        @JsonProperty("countryCode")
        private String countryCode = null;

        @JsonProperty("mobileNumber")
        private String mobileNumber = null;

        @JsonProperty("userUuid")
        private String userUuid = null;

        @JsonProperty("healthDetails")
        private JsonNode healthDetails = null;

        /**
         * Returns the full mobile number with country code prefix
         * @return Full mobile number in format +{countryCode}{mobileNumber}
         */
        public String getFullMobileNumber() {
                if (this.mobileNumber == null) {
                        return null;
                }
                if (this.countryCode != null && !this.countryCode.isEmpty()) {
                        return "+" + this.countryCode + this.mobileNumber;
                }
                return this.mobileNumber;
        }

}

