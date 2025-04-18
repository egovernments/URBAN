package org.egov.pt.calculator.web.models.propertyV2;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * LocalityV2
 */

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalityV2 {

	@JsonProperty("code")
	private String code;

	@JsonProperty("name")
	private String name;

	@JsonProperty("label")
	private String label;

	@JsonProperty("latitude")
	private String latitude;

	@JsonProperty("longitude")
	private String longitude;

	@JsonProperty("area")
	private String area;

	@JsonProperty("children")
	@Valid
	private List<LocalityV2> children;

	@JsonProperty("materializedPath")
	private String materializedPath;

}
