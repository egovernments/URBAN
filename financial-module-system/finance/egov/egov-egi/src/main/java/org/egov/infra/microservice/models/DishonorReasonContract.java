package org.egov.infra.microservice.models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "reason", "remarks", "instrument", "reversalVoucherId", "dishonorDate" })
public class DishonorReasonContract {
    /**
     * id is the unique Identifier of the reason
     */
    private String id;
    /**
     * name is the reason of instrument surrender. Example "Damaged cheque","Cheque to be scrapped" etc
     */
    @NotBlank
    @Size(max = 100, min = 5)
    private String reason;
    /**
     * description is detailed description of the surrender of a instrument
     */
    @NotBlank
    @Size(max = 250)
    private String remarks;
    @NotBlank
    @Size(max = 250)
    private String instrument;
    private String reversalVoucherId;
    @NotNull
    private Long dishonorDate;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getInstrument() { return instrument; }
    public void setInstrument(String instrument) { this.instrument = instrument; }

    public String getReversalVoucherId() { return reversalVoucherId; }
    public void setReversalVoucherId(String reversalVoucherId) { this.reversalVoucherId = reversalVoucherId; }

    public Long getDishonorDate() { return dishonorDate; }
    public void setDishonorDate(Long dishonorDate) { this.dishonorDate = dishonorDate; }

    // Builder pattern implementation
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id;
        private String reason;
        private String remarks;
        private String instrument;
        private String reversalVoucherId;
        private Long dishonorDate;

        public Builder id(String id) { this.id = id; return this; }
        public Builder reason(String reason) { this.reason = reason; return this; }
        public Builder remarks(String remarks) { this.remarks = remarks; return this; }
        public Builder instrument(String instrument) { this.instrument = instrument; return this; }
        public Builder reversalVoucherId(String reversalVoucherId) { this.reversalVoucherId = reversalVoucherId; return this; }
        public Builder dishonorDate(Long dishonorDate) { this.dishonorDate = dishonorDate; return this; }
        public DishonorReasonContract build() {
            DishonorReasonContract contract = new DishonorReasonContract();
            contract.setId(this.id);
            contract.setReason(this.reason);
            contract.setRemarks(this.remarks);
            contract.setInstrument(this.instrument);
            contract.setReversalVoucherId(this.reversalVoucherId);
            contract.setDishonorDate(this.dishonorDate);
            return contract;
        }
    }
}