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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class Payment {
    @Size(max=64)
    @JsonProperty("id")
    private String id;

    @NotNull
    @Size(max=64)
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("totalDue")
    private BigDecimal totalDue;

    @NotNull
    @JsonProperty("totalAmountPaid")
    private BigDecimal totalAmountPaid;

    @Size(max=128)
    @JsonProperty("transactionNumber")
    private String transactionNumber;

    @JsonProperty("transactionDate")
    private Long transactionDate;

    @NotNull
    @JsonProperty("paymentMode")
    private PaymentModeEnum paymentMode;

    
    @JsonProperty("instrumentDate")
    private Long instrumentDate;

    @Size(max=128)
    @JsonProperty("instrumentNumber")
    private String instrumentNumber;

    @JsonProperty("instrumentStatus")
    private InstrumentStatusEnum instrumentStatus;

    @Size(max=64)
    @JsonProperty("ifscCode")
    private String ifscCode;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("additionalDetails")
    private JsonNode additionalDetails;

    @JsonProperty("paymentDetails")
    @Valid
    private List<PaymentDetail> paymentDetails;

    @Size(max=128)
    @NotNull
    @JsonProperty("paidBy")
    private String paidBy = null;

    @Size(max=64)
    @NotNull
    @JsonProperty("mobileNumber")
    private String mobileNumber = null;

    @Size(max=128)
    @JsonProperty("payerName")
    private String payerName = null;

    @Size(max=1024)
    @JsonProperty("payerAddress")
    private String payerAddress = null;

    @Size(max=64)
    @JsonProperty("payerEmail")
    private String payerEmail = null;

    @Size(max=64)
    @JsonProperty("payerId")
    private String payerId = null;

    @JsonProperty("paymentStatus")
    private PaymentStatusEnum paymentStatus;


    public Payment addpaymentDetailsItem(PaymentDetail paymentDetail) {
        if (this.paymentDetails == null) {
            this.paymentDetails = new ArrayList<>();
        }
        this.paymentDetails.add(paymentDetail);
        return this;
    }

    // Manual getter and setter methods since Lombok is not working properly
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    
    public BigDecimal getTotalDue() { return totalDue; }
    public void setTotalDue(BigDecimal totalDue) { this.totalDue = totalDue; }
    
    public BigDecimal getTotalAmountPaid() { return totalAmountPaid; }
    public void setTotalAmountPaid(BigDecimal totalAmountPaid) { this.totalAmountPaid = totalAmountPaid; }
    
    public String getTransactionNumber() { return transactionNumber; }
    public void setTransactionNumber(String transactionNumber) { this.transactionNumber = transactionNumber; }
    
    public Long getTransactionDate() { return transactionDate; }
    public void setTransactionDate(Long transactionDate) { this.transactionDate = transactionDate; }
    
    public PaymentModeEnum getPaymentMode() { return paymentMode; }
    public void setPaymentMode(PaymentModeEnum paymentMode) { this.paymentMode = paymentMode; }
    
    public Long getInstrumentDate() { return instrumentDate; }
    public void setInstrumentDate(Long instrumentDate) { this.instrumentDate = instrumentDate; }
    
    public String getInstrumentNumber() { return instrumentNumber; }
    public void setInstrumentNumber(String instrumentNumber) { this.instrumentNumber = instrumentNumber; }
    
    public InstrumentStatusEnum getInstrumentStatus() { return instrumentStatus; }
    public void setInstrumentStatus(InstrumentStatusEnum instrumentStatus) { this.instrumentStatus = instrumentStatus; }
    
    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }
    
    public AuditDetails getAuditDetails() { return auditDetails; }
    public void setAuditDetails(AuditDetails auditDetails) { this.auditDetails = auditDetails; }
    
    public JsonNode getAdditionalDetails() { return additionalDetails; }
    public void setAdditionalDetails(JsonNode additionalDetails) { this.additionalDetails = additionalDetails; }
    
    public List<PaymentDetail> getPaymentDetails() { return paymentDetails; }
    public void setPaymentDetails(List<PaymentDetail> paymentDetails) { this.paymentDetails = paymentDetails; }
    
    public String getPaidBy() { return paidBy; }
    public void setPaidBy(String paidBy) { this.paidBy = paidBy; }
    
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    
    public String getPayerName() { return payerName; }
    public void setPayerName(String payerName) { this.payerName = payerName; }
    
    public String getPayerAddress() { return payerAddress; }
    public void setPayerAddress(String payerAddress) { this.payerAddress = payerAddress; }
    
    public String getPayerEmail() { return payerEmail; }
    public void setPayerEmail(String payerEmail) { this.payerEmail = payerEmail; }
    
    public String getPayerId() { return payerId; }
    public void setPayerId(String payerId) { this.payerId = payerId; }
    
    public PaymentStatusEnum getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatusEnum paymentStatus) { this.paymentStatus = paymentStatus; }

    // Remove the old, incorrect builder() instance method
    // Add a static Builder class and builder() method
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id;
        private String tenantId;
        private BigDecimal totalDue;
        private BigDecimal totalAmountPaid;
        private String transactionNumber;
        private Long transactionDate;
        private PaymentModeEnum paymentMode;
        private Long instrumentDate;
        private String instrumentNumber;
        private InstrumentStatusEnum instrumentStatus;
        private String ifscCode;
        private AuditDetails auditDetails;
        private JsonNode additionalDetails;
        private List<PaymentDetail> paymentDetails;
        private String paidBy;
        private String mobileNumber;
        private String payerName;
        private String payerAddress;
        private String payerEmail;
        private String payerId;
        private PaymentStatusEnum paymentStatus;

        public Builder id(String id) { this.id = id; return this; }
        public Builder tenantId(String tenantId) { this.tenantId = tenantId; return this; }
        public Builder totalDue(BigDecimal totalDue) { this.totalDue = totalDue; return this; }
        public Builder totalAmountPaid(BigDecimal totalAmountPaid) { this.totalAmountPaid = totalAmountPaid; return this; }
        public Builder transactionNumber(String transactionNumber) { this.transactionNumber = transactionNumber; return this; }
        public Builder transactionDate(Long transactionDate) { this.transactionDate = transactionDate; return this; }
        public Builder paymentMode(PaymentModeEnum paymentMode) { this.paymentMode = paymentMode; return this; }
        public Builder instrumentDate(Long instrumentDate) { this.instrumentDate = instrumentDate; return this; }
        public Builder instrumentNumber(String instrumentNumber) { this.instrumentNumber = instrumentNumber; return this; }
        public Builder instrumentStatus(InstrumentStatusEnum instrumentStatus) { this.instrumentStatus = instrumentStatus; return this; }
        public Builder ifscCode(String ifscCode) { this.ifscCode = ifscCode; return this; }
        public Builder auditDetails(AuditDetails auditDetails) { this.auditDetails = auditDetails; return this; }
        public Builder additionalDetails(JsonNode additionalDetails) { this.additionalDetails = additionalDetails; return this; }
        public Builder paymentDetails(List<PaymentDetail> paymentDetails) { this.paymentDetails = paymentDetails; return this; }
        public Builder paidBy(String paidBy) { this.paidBy = paidBy; return this; }
        public Builder mobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; return this; }
        public Builder payerName(String payerName) { this.payerName = payerName; return this; }
        public Builder payerAddress(String payerAddress) { this.payerAddress = payerAddress; return this; }
        public Builder payerEmail(String payerEmail) { this.payerEmail = payerEmail; return this; }
        public Builder payerId(String payerId) { this.payerId = payerId; return this; }
        public Builder paymentStatus(PaymentStatusEnum paymentStatus) { this.paymentStatus = paymentStatus; return this; }

        public Payment build() {
            Payment payment = new Payment();
            payment.setId(this.id);
            payment.setTenantId(this.tenantId);
            payment.setTotalDue(this.totalDue);
            payment.setTotalAmountPaid(this.totalAmountPaid);
            payment.setTransactionNumber(this.transactionNumber);
            payment.setTransactionDate(this.transactionDate);
            payment.setPaymentMode(this.paymentMode);
            payment.setInstrumentDate(this.instrumentDate);
            payment.setInstrumentNumber(this.instrumentNumber);
            payment.setInstrumentStatus(this.instrumentStatus);
            payment.setIfscCode(this.ifscCode);
            payment.setAuditDetails(this.auditDetails);
            payment.setAdditionalDetails(this.additionalDetails);
            payment.setPaymentDetails(this.paymentDetails);
            payment.setPaidBy(this.paidBy);
            payment.setMobileNumber(this.mobileNumber);
            payment.setPayerName(this.payerName);
            payment.setPayerAddress(this.payerAddress);
            payment.setPayerEmail(this.payerEmail);
            payment.setPayerId(this.payerId);
            payment.setPaymentStatus(this.paymentStatus);
            return payment;
        }
    }
}
