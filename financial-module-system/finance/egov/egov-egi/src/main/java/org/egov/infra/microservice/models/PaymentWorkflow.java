/*
 *    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) 2017  eGovernments Foundation
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
 *            Further, all user interfaces, including but not limited to citizen facing interfaces,
 *            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *            derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *            For any further queries on attribution, including queries on brand guidelines,
 *            please contact contact@egovernments.org
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 *
 */

package org.egov.infra.microservice.models;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.SafeHtml;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class PaymentWorkflow {
    @SafeHtml
    @NotNull
    @Length(min = 1)
    private String paymentId;

    @NotNull
    // TODO: Migrate from Struts/XWork: private PaymentAction action;
    private String action;

    @SafeHtml
    @NotNull
    @Length(min = 1)
    private String tenantId;
    @SafeHtml
    private String reason;
    private JsonNode additionalDetails;

    /**
     * Current status of the transaction
     */
    public enum PaymentAction {
        CANCEL("CANCEL"), DISHONOUR("DISHONOUR"), REMIT("REMIT");

        private String value;

        PaymentAction(String value) {
            this.value = value;
        }

        @JsonCreator
        public static PaymentAction fromValue(String text) {
            for (PaymentAction b : PaymentAction.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }
    }

    // Manual getter and setter methods since Lombok is not working properly
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public JsonNode getAdditionalDetails() { return additionalDetails; }
    public void setAdditionalDetails(JsonNode additionalDetails) { this.additionalDetails = additionalDetails; }
    
    // Builder method
    public static PaymentWorkflowBuilder builder() {
        return new PaymentWorkflowBuilder();
    }
    
    // Builder class
    public static class PaymentWorkflowBuilder {
        private String paymentId;
        private String action;
        private String tenantId;
        private String reason;
        private JsonNode additionalDetails;
        
        public PaymentWorkflowBuilder paymentId(String paymentId) { this.paymentId = paymentId; return this; }
        public PaymentWorkflowBuilder action(String action) { this.action = action; return this; }
        public PaymentWorkflowBuilder tenantId(String tenantId) { this.tenantId = tenantId; return this; }
        public PaymentWorkflowBuilder reason(String reason) { this.reason = reason; return this; }
        public PaymentWorkflowBuilder additionalDetails(JsonNode additionalDetails) { this.additionalDetails = additionalDetails; return this; }
        
        public PaymentWorkflow build() {
            PaymentWorkflow workflow = new PaymentWorkflow();
            workflow.paymentId = this.paymentId;
            workflow.action = this.action;
            workflow.tenantId = this.tenantId;
            workflow.reason = this.reason;
            workflow.additionalDetails = this.additionalDetails;
            return workflow;
        }
    }
}
