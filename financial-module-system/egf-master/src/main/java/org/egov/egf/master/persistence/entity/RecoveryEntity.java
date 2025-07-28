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

package org.egov.egf.master.persistence.entity;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.egov.common.persistence.entity.AuditableEntity;
import org.egov.egf.master.domain.model.ChartOfAccount;
import org.egov.egf.master.domain.model.Recovery;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class RecoveryEntity extends AuditableEntity {

    public static final String TABLE_NAME = "egf_recovery";
    public static final String SEQUENCE_NAME = "seq_egf_recovery";
    public static final String ALIAS = "recovery";

    private static final long serialVersionUID = 7977534010758407945L;

    protected String id;

    @Size(max = 50, min = 2, message = "Name must be between 2 and 50 characters")
    @NotNull
    protected String name;

    @Size(max = 50, min = 2, message = "Code must be between 1 and 50 characters")
    @NotNull
    protected String code;

    @NotNull
    protected String chartOfAccountId;

    protected String type;

    protected Double flat;

    protected Double percentage;

    @NotNull
    protected Boolean active;

    @Size(max = 100, message = "Remitted must be less than 100 characters")
    protected String remitted;

    @Size(max = 16, message = "IfscCode must be less than 16 characters")
    protected String ifscCode;

    protected Character mode;

    protected Character remittanceMode;

    @Size(max = 32, message = "AccountNumber must be less than 32 characters")
    protected String accountNumber;


    public Recovery toDomain() {

        Recovery recovery = new Recovery();
        recovery.setId(this.id);
        recovery.setCode(this.code);
        recovery.setName(this.name);
        recovery.setAccountNumber(this.accountNumber);
        recovery.setActive(this.active);
        recovery.setChartOfAccount(ChartOfAccount.builder().glcode(this.chartOfAccountId).build());
        recovery.setFlat(this.flat);
        recovery.setIfscCode(this.ifscCode);
        recovery.setMode(this.mode);
        recovery.setPercentage(this.percentage);
        recovery.setRemittanceMode(this.remittanceMode);
        recovery.setType(this.type);
        recovery.setRemitted(this.remitted);
        return recovery;
    }

    public RecoveryEntity toEntity(Recovery recovery) {

        super.toEntity(recovery);
        this.id = recovery.getId();
        this.code = recovery.getCode();
        this.name = recovery.getName();
        this.accountNumber = recovery.getAccountNumber();
        this.active = recovery.getActive();
        if(recovery.getChartOfAccount() != null && recovery.getChartOfAccount().getGlcode() != null)
            this.chartOfAccountId = recovery.getChartOfAccount().getGlcode();
        this.flat = recovery.getFlat();
        this.ifscCode = recovery.getIfscCode();
        this.mode = recovery.getMode();
        this.percentage = recovery.getPercentage();
        this.remittanceMode = recovery.getRemittanceMode();
        this.type = recovery.getType();
        this.remitted = recovery.getRemitted();
        return this;

    }

}
