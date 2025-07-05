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

package org.egov.infra.microservice.utils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.egov.infra.microservice.models.ReceiptSearchCriteria;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSearchCriteria {
    private Set<String> ids;
    private Set<String> billIds;
    private String tenantId;
    private Set<String> receiptNumbers;
    private Set<String> status;
    private Set<String> instrumentStatus;
    private Set<String> paymentModes;
    private List<String> payerIds;
    private Set<String> consumerCodes;
    private Set<String> businessServices;
    private String transactionNumber;
    private String mobileNumber;
    private Long fromDate;
    private Long toDate;
    private Integer offset;
    private Integer limit;
    
    // Manual getter and setter methods since Lombok is not working properly
    public Set<String> getIds() { return ids; }
    public void setIds(Set<String> ids) { this.ids = ids; }
    
    public Set<String> getBillIds() { return billIds; }
    public void setBillIds(Set<String> billIds) { this.billIds = billIds; }
    
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    
    public Set<String> getReceiptNumbers() { return receiptNumbers; }
    public void setReceiptNumbers(Set<String> receiptNumbers) { this.receiptNumbers = receiptNumbers; }
    
    public Set<String> getStatus() { return status; }
    public void setStatus(Set<String> status) { this.status = status; }
    
    public Set<String> getInstrumentStatus() { return instrumentStatus; }
    public void setInstrumentStatus(Set<String> instrumentStatus) { this.instrumentStatus = instrumentStatus; }
    
    public Set<String> getPaymentModes() { return paymentModes; }
    public void setPaymentModes(Set<String> paymentModes) { this.paymentModes = paymentModes; }
    
    public List<String> getPayerIds() { return payerIds; }
    public void setPayerIds(List<String> payerIds) { this.payerIds = payerIds; }
    
    public Set<String> getConsumerCodes() { return consumerCodes; }
    public void setConsumerCodes(Set<String> consumerCodes) { this.consumerCodes = consumerCodes; }
    
    public Set<String> getBusinessServices() { return businessServices; }
    public void setBusinessServices(Set<String> businessServices) { this.businessServices = businessServices; }
    
    public String getTransactionNumber() { return transactionNumber; }
    public void setTransactionNumber(String transactionNumber) { this.transactionNumber = transactionNumber; }
    
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    
    public Long getFromDate() { return fromDate; }
    public void setFromDate(Long fromDate) { this.fromDate = fromDate; }
    
    public Long getToDate() { return toDate; }
    public void setToDate(Long toDate) { this.toDate = toDate; }
    
    public Integer getOffset() { return offset; }
    public void setOffset(Integer offset) { this.offset = offset; }
    
    public Integer getLimit() { return limit; }
    public void setLimit(Integer limit) { this.limit = limit; }
    
    // Builder method
    public static PaymentSearchCriteriaBuilder builder() {
        return new PaymentSearchCriteriaBuilder();
    }
    
    // Builder class
    public static class PaymentSearchCriteriaBuilder {
        private Set<String> ids;
        private Set<String> billIds;
        private String tenantId;
        private Set<String> receiptNumbers;
        private Set<String> status;
        private Set<String> instrumentStatus;
        private Set<String> paymentModes;
        private List<String> payerIds;
        private Set<String> consumerCodes;
        private Set<String> businessServices;
        private String transactionNumber;
        private String mobileNumber;
        private Long fromDate;
        private Long toDate;
        private Integer offset;
        private Integer limit;
        
        public PaymentSearchCriteriaBuilder ids(Set<String> ids) { this.ids = ids; return this; }
        public PaymentSearchCriteriaBuilder billIds(Set<String> billIds) { this.billIds = billIds; return this; }
        public PaymentSearchCriteriaBuilder tenantId(String tenantId) { this.tenantId = tenantId; return this; }
        public PaymentSearchCriteriaBuilder receiptNumbers(Set<String> receiptNumbers) { this.receiptNumbers = receiptNumbers; return this; }
        public PaymentSearchCriteriaBuilder status(Set<String> status) { this.status = status; return this; }
        public PaymentSearchCriteriaBuilder instrumentStatus(Set<String> instrumentStatus) { this.instrumentStatus = instrumentStatus; return this; }
        public PaymentSearchCriteriaBuilder paymentModes(Set<String> paymentModes) { this.paymentModes = paymentModes; return this; }
        public PaymentSearchCriteriaBuilder payerIds(List<String> payerIds) { this.payerIds = payerIds; return this; }
        public PaymentSearchCriteriaBuilder consumerCodes(Set<String> consumerCodes) { this.consumerCodes = consumerCodes; return this; }
        public PaymentSearchCriteriaBuilder businessServices(Set<String> businessServices) { this.businessServices = businessServices; return this; }
        public PaymentSearchCriteriaBuilder transactionNumber(String transactionNumber) { this.transactionNumber = transactionNumber; return this; }
        public PaymentSearchCriteriaBuilder mobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; return this; }
        public PaymentSearchCriteriaBuilder fromDate(Long fromDate) { this.fromDate = fromDate; return this; }
        public PaymentSearchCriteriaBuilder toDate(Long toDate) { this.toDate = toDate; return this; }
        public PaymentSearchCriteriaBuilder offset(Integer offset) { this.offset = offset; return this; }
        public PaymentSearchCriteriaBuilder limit(Integer limit) { this.limit = limit; return this; }
        
        public PaymentSearchCriteria build() {
            PaymentSearchCriteria criteria = new PaymentSearchCriteria();
            criteria.ids = this.ids;
            criteria.billIds = this.billIds;
            criteria.tenantId = this.tenantId;
            criteria.receiptNumbers = this.receiptNumbers;
            criteria.status = this.status;
            criteria.instrumentStatus = this.instrumentStatus;
            criteria.paymentModes = this.paymentModes;
            criteria.payerIds = this.payerIds;
            criteria.consumerCodes = this.consumerCodes;
            criteria.businessServices = this.businessServices;
            criteria.transactionNumber = this.transactionNumber;
            criteria.mobileNumber = this.mobileNumber;
            criteria.fromDate = this.fromDate;
            criteria.toDate = this.toDate;
            criteria.offset = this.offset;
            criteria.limit = this.limit;
            return criteria;
        }
    }
}
