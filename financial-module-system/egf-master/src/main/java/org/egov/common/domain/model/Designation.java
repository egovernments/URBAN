package org.egov.common.domain.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class Designation {

	@NotNull
	private Long id;

	@NotNull
	@Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
	private String name;

	@NotNull
	@Size(min = 3, max = 20, message = "Code must be between 3 and 20 characters")
	private String code;

	@Size(max = 250, message = "Description must be less than 250 characters")
	private String description;

	private String chartOfAccounts;

	@NotNull
	private Boolean active;

	@NotNull
	private String tenantId;

}
