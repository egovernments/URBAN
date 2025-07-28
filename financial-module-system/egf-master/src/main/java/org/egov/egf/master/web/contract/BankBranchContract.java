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
package org.egov.egf.master.web.contract;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.egov.common.web.contract.AuditableContract;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@JsonPropertyOrder({ "id", "bank", "code", "name", "address", "address2", "city", "state", "pincode", "phone", "fax",
		"contactPerson", "active", "description", "micr" })
public class BankBranchContract extends AuditableContract {

	private String id;

	@NotNull
	private BankContract bank;

	@NotNull
	@Size(max = 50, min = 1, message = "Name must be between 1 and 50 characters")
	private String code;

	@NotNull
	@Size(max = 50, min = 1, message = "Name must be between 1 and 50 characters")
	@Pattern(regexp = "^[a-zA-Z0-9_]*$")
	private String name;

	@NotNull
	@Size(max = 50, min = 1, message = "Address must be between 1 and 50 characters")
	private String address;

	@Size(max = 50, message = "Address2 must be less than 50 characters")
	private String address2;

	@Size(max = 50, message = "City must be less than 50 characters")
	private String city;

	@Size(max = 50, message = "State must be less than 50 characters")
	private String state;

	@Size(max = 50, message = "Pincode must be less than 50 characters")
	private String pincode;

	@Size(max = 15, message = "Phone must be less than 15 characters")
	private String phone;

	@Size(max = 15, message = "Fax must be less than 15 characters")
	private String fax;

	@Size(max = 50, message = "ContactPerson must be less than 50 characters")
	private String contactPerson;

	@NotNull
	private Boolean active;

	@Size(max = 256, message = "Description must be less than 256 characters")
	private String description;

	@Size(max = 50, message = "Micr must be less than 50 characters")
	private String micr;

	public BankBranchContract(final String id) {
		this.id = id;
	}

}