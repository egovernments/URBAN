package org.egov.pt.models;

import java.math.BigDecimal;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


/**
 * Unit
 */

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = { "id" })
public class Unit {

	
	@JsonProperty("id")
	private String id;

	
	@JsonProperty("tenantId")
	private String tenantId;

	@Max(value = 500)
	@JsonProperty("floorNo")
	private Integer floorNo;

	
	@JsonProperty("unitType")
	private String unitType;

	@JsonProperty("usageCategory")
	
	@NotNull
	private String usageCategory;

	
	@JsonProperty("occupancyType")
	private String occupancyType;

	@JsonProperty("active")
	private Boolean active;

	@JsonProperty("occupancyDate")
	private Long occupancyDate;

	@Valid
	@NotNull
	@JsonProperty("constructionDetail")
	private ConstructionDetail constructionDetail;

	@JsonProperty("additionalDetails")
	private Object additionalDetails;

	@JsonProperty("auditDetails")
	private AuditDetails auditDetails;

	@Digits(integer = 8, fraction = 2)
	@JsonProperty("arv")
	private BigDecimal arv;
	
	//*** Added ratezone and roadfactor &&  toDate and fromDate
	
	@JsonProperty("rateZone")
	private String rateZone;
		
	@JsonProperty("roadFactor")
	private String roadFactor;
	
	@JsonProperty("toDate")
	private String toDate;
	
	@JsonProperty("fromDate")
	private String fromDate;
	
	// *****

}
