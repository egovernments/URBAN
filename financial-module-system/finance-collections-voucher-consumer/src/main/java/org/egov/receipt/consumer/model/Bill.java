/*
 * eGov suite of products aim to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) <2015>  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any Long of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.receipt.consumer.model;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Bill {
	
	  @JsonProperty("id")
	  private String id = null;

	  @JsonProperty("mobileNumber")
	  private String mobileNumber = null;
	  
	  @JsonProperty("paidBy")
	  private String paidBy = null;

	  @JsonProperty("payerName")
	  private String payerName = null;

	  @JsonProperty("payerAddress")
	  private String payerAddress = null;

	  @JsonProperty("payerEmail")
	  private String payerEmail = null;
	  
	  @JsonProperty("payerId")
	  private String payerId = null;

	  @JsonProperty("isActive")
	  private Boolean isActive = null;

	  @JsonProperty("isCancelled")
	  private Boolean isCancelled = null;

	  @JsonProperty("additionalDetails")
	  private Object additionalDetails = null;

	  @JsonProperty("taxAndPayments")
	  @Valid
	  @NotNull
	  private List<TaxAndPayment> taxAndPayments = null;
	  
	  private String businessService;

	  @JsonProperty("billDetails")
	  @Valid
	  private List<BillDetail> billDetails = null;

	  @JsonProperty("tenantId")
	  private String tenantId = null;

	  @JsonProperty("auditDetails")
	  private AuditDetails auditDetails = null;

}
