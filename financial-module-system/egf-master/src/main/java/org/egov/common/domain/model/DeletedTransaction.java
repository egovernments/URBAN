package org.egov.common.domain.model;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DeletedTransaction {


    protected String id;

    protected String tableName;

    protected String identifier;

    @Size(max = 250)
    protected String deleteReason;

    protected Date updatedDate;

    protected String data;

    @NotNull
    @Size(max = 50, min = 5)
    protected String tenantId;
}
