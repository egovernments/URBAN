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

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.egov.infra.microservice.utils.PaymentSearchCriteria;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Setter
@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class ReceiptSearchCriteria {
    private Set<String>  ids;
    private Set<String> status;
    private Set<String> businessCodes;
    private Date fromDate;
    private Date toDate;
    private Set<String> receiptNumbers;
    private String fund;
    private String department;
    private String classification;
    private String tenantId;
    
    public void toPayemntSerachCriteriaContract(PaymentSearchCriteria contract){
//        contract.setIds(this.ids);
        contract.setStatus(this.status);
        contract.setBusinessServices(this.businessCodes);
        contract.setFromDate(this.fromDate != null ? this.fromDate.getTime() : null);
        contract.setToDate(this.toDate != null ? this.toDate.getTime() : null);
//        contract.setReceiptNumbers(this.receiptNumbers);
        contract.setIds(this.receiptNumbers);
        contract.setTenantId(this.tenantId);
    }
    
    // Manual getter and setter methods since Lombok is not working properly
    public Set<String> getIds() { return ids; }
    public void setIds(Set<String> ids) { this.ids = ids; }
    
    public Set<String> getStatus() { return status; }
    public void setStatus(Set<String> status) { this.status = status; }
    
    public Set<String> getBusinessCodes() { return businessCodes; }
    public void setBusinessCodes(Set<String> businessCodes) { this.businessCodes = businessCodes; }
    
    public Date getFromDate() { return fromDate; }
    public void setFromDate(Date fromDate) { this.fromDate = fromDate; }
    
    public Date getToDate() { return toDate; }
    public void setToDate(Date toDate) { this.toDate = toDate; }
    
    public Set<String> getReceiptNumbers() { return receiptNumbers; }
    public void setReceiptNumbers(Set<String> receiptNumbers) { this.receiptNumbers = receiptNumbers; }
    
    public String getFund() { return fund; }
    public void setFund(String fund) { this.fund = fund; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getClassification() { return classification; }
    public void setClassification(String classification) { this.classification = classification; }
    
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    
    // Builder method
    public static ReceiptSearchCriteriaBuilder builder() {
        return new ReceiptSearchCriteriaBuilder();
    }
    
    // Builder class
    public static class ReceiptSearchCriteriaBuilder {
        private Set<String> ids;
        private Set<String> status;
        private Set<String> businessCodes;
        private Date fromDate;
        private Date toDate;
        private Set<String> receiptNumbers;
        private String fund;
        private String department;
        private String classification;
        private String tenantId;
        
        public ReceiptSearchCriteriaBuilder ids(Set<String> ids) { this.ids = ids; return this; }
        public ReceiptSearchCriteriaBuilder status(Set<String> status) { this.status = status; return this; }
        public ReceiptSearchCriteriaBuilder businessCodes(Set<String> businessCodes) { this.businessCodes = businessCodes; return this; }
        public ReceiptSearchCriteriaBuilder fromDate(Date fromDate) { this.fromDate = fromDate; return this; }
        public ReceiptSearchCriteriaBuilder toDate(Date toDate) { this.toDate = toDate; return this; }
        public ReceiptSearchCriteriaBuilder receiptNumbers(Set<String> receiptNumbers) { this.receiptNumbers = receiptNumbers; return this; }
        public ReceiptSearchCriteriaBuilder fund(String fund) { this.fund = fund; return this; }
        public ReceiptSearchCriteriaBuilder department(String department) { this.department = department; return this; }
        public ReceiptSearchCriteriaBuilder classification(String classification) { this.classification = classification; return this; }
        public ReceiptSearchCriteriaBuilder tenantId(String tenantId) { this.tenantId = tenantId; return this; }
        
        public ReceiptSearchCriteria build() {
            ReceiptSearchCriteria criteria = new ReceiptSearchCriteria();
            criteria.ids = this.ids;
            criteria.status = this.status;
            criteria.businessCodes = this.businessCodes;
            criteria.fromDate = this.fromDate;
            criteria.toDate = this.toDate;
            criteria.receiptNumbers = this.receiptNumbers;
            criteria.fund = this.fund;
            criteria.department = this.department;
            criteria.classification = this.classification;
            criteria.tenantId = this.tenantId;
            return criteria;
        }
    }
}
