package org.egov.rb.pgrmodels;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;



import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Address {

	@JsonProperty("uuid")
	public String uuid;

	@JsonProperty("houseNoAndStreetName")
	@Pattern(regexp = "^[a-zA-Z0-9!@#.,-/: ()&']*$")
	@Size(max=160)
	public String houseNoAndStreetName;

	@NotNull
	@JsonProperty("mohalla")
	@Pattern(regexp="^[a-zA-Z0-9 .+_-]*$")
	@Size(max=30)
	public String mohalla;
	
	@JsonProperty("locality")
	@Size(max=300)
	public String locality;

	@NotNull
	@JsonProperty("city")
	@Pattern(regexp="^[a-zA-Z0-9._]*$")
	@Size(max=30)
	public String city;

	@JsonProperty("latitude")
	private Double latitude;

	@JsonProperty("longitude")
	private Double longitude;

	@JsonProperty("landmark")
	@Pattern(regexp = "^[a-zA-Z0-9!@#.,/: ()&'-]*$")
	@Size(max=160)
	public String landmark;
	
	@JsonProperty("tenantId")
	@Size(min=2,max=25)
	@Pattern(regexp="^[a-zA-Z.]*$")
	public String tenantId;
	
	@JsonProperty("auditDetails")
	public AuditDetails auditDetails;

}
