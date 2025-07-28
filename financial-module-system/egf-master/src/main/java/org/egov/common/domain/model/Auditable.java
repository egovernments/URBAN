package org.egov.common.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.egov.common.contract.request.User;
import jakarta.validation.constraints.Size;

import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Auditable {

    /**
     * tenantId Unique Identifier of the tenant, Like AP, AP.Kurnool etc.
     * represents the client for which the transaction is created.
     */

    @NotNull
    @Size(max = 50, min = 5, message = "TenantId must be between 5 and 50 characters")
    protected String tenantId;
    /**
     * createdBy is the logged in use who is conducting transaction
     */
    protected User createdBy;
    /**
     * lastModifiedBy is the logged in use who is updating transaction
     */
    protected User lastModifiedBy;
    /**
     * createDate date on which trnasaction is created
     */
    protected Date createdDate;
    /**
     * lastModifiedDate date is on which trnasaction is updated lastly
     */
    protected Date lastModifiedDate;

    protected String deleteReason;
}
