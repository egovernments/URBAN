package org.egov.tlcalculator.web.models;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BillingSlabReq {
	@JsonProperty("RequestInfo")
	@NotNull
	@Valid
	private RequestInfo requestInfo = null;

	@JsonProperty("billingSlab")
	@Valid
	private List<BillingSlab> billingSlab = null;

}
