package org.egov.egf.instrument.domain.model;

import jakarta.validation.constraints.Size;

import org.egov.common.domain.model.Auditable;
import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DishonorReason extends Auditable {
    /**
     * id is the unique Identifier of the reason
     */
    private String id;
    /**
     * name is the reason of instrument surrender. Example "Damaged cheque", "Cheque to be scrapped" etc
     */
    @NotBlank
    @Size(max = 50, min = 5)
    private String reason;
    /**
     * description is detailed description of the surrender of a instrument
     */
    @NotBlank
    @Size(max = 250)
    private String remarks;
    private String instrument;
    private String reversalVoucherId;
    private Long dishonorDate;

}
