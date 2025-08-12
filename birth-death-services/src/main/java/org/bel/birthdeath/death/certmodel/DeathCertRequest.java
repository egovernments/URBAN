
package org.bel.birthdeath.death.certmodel;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.egov.common.contract.request.RequestInfo;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DeathCertRequest {
	
	
	 @JsonProperty("RequestInfo")
     private RequestInfo requestInfo = null;
	 
	 @JsonProperty("deathCertificate")
     private DeathCertificate deathCertificate = null;


  
}