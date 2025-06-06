package org.egov.tlcalculator.web.models.demand;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class GenerateBillCriteria {

    @NotNull
    private String tenantId;

    private String demandId;

    @NotNull
    private String consumerCode;

    private String businessService;

    @Email
    private String email;

    private String mobileNumber;

}