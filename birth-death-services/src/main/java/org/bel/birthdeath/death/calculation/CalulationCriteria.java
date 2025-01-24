package org.bel.birthdeath.death.calculation;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.bel.birthdeath.death.certmodel.DeathCertificate;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Validated
@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-27T14:56:03.454+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalulationCriteria {
        @JsonProperty("deathCertificate")
        @Valid
        private DeathCertificate deathCertificate = null;

        @JsonProperty("deathCertificateNo")
        @Size(min=2,max=64) 
        private String deathCertificateNo = null;

        @JsonProperty("tenantId")
        @NotNull@Size(min=2,max=256) 
        private String tenantId = null;


}

