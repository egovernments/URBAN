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
package org.egov.collection.integration.models;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@XStreamAlias("bill")
public class BillDetails {

    @XStreamAsAttribute
    private String refNo;

    @XStreamAsAttribute
    private Date billDate;

    @XStreamAsAttribute
    private String consumerCode;

    private String consumerType;

    private String boundaryNum;
    private String boundaryType;
    private String description;

    private BigDecimal totalAmount;
    private BigDecimal minimumAmount;

    @XStreamAlias("accounts")
    private List<BillAccountDetails> accounts = new ArrayList<BillAccountDetails>(0);

    public void addBillAccountDetails(final BillAccountDetails billAccountDetail) {
        accounts.add(billAccountDetail);
    }

    public String getRefNo() { return refNo; }
    public void setRefNo(String refNo) { this.refNo = refNo; }

    public Date getBillDate() { return billDate; }
    public void setBillDate(Date billDate) { this.billDate = billDate; }

    public String getConsumerCode() { return consumerCode; }
    public void setConsumerCode(String consumerCode) { this.consumerCode = consumerCode; }

    public String getConsumerType() { return consumerType; }
    public void setConsumerType(String consumerType) { this.consumerType = consumerType; }

    public String getBoundaryNum() { return boundaryNum; }
    public void setBoundaryNum(String boundaryNum) { this.boundaryNum = boundaryNum; }

    public String getBoundaryType() { return boundaryType; }
    public void setBoundaryType(String boundaryType) { this.boundaryType = boundaryType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public BigDecimal getMinimumAmount() { return minimumAmount; }
    public void setMinimumAmount(BigDecimal minimumAmount) { this.minimumAmount = minimumAmount; }

    public List<BillAccountDetails> getAccounts() { return accounts; }
    public void setAccounts(List<BillAccountDetails> accounts) { this.accounts = accounts; }

    // For backward compatibility
    public Date getBilldate() { return billDate; }

    // Builder pattern implementation
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String refNo;
        private Date billDate;
        private String consumerCode;
        private String consumerType;
        private String boundaryNum;
        private String boundaryType;
        private String description;
        private BigDecimal totalAmount;
        private BigDecimal minimumAmount;
        private List<BillAccountDetails> accounts = new ArrayList<>();

        public Builder refNo(String refNo) { this.refNo = refNo; return this; }
        public Builder billDate(Date billDate) { this.billDate = billDate; return this; }
        public Builder consumerCode(String consumerCode) { this.consumerCode = consumerCode; return this; }
        public Builder consumerType(String consumerType) { this.consumerType = consumerType; return this; }
        public Builder boundaryNum(String boundaryNum) { this.boundaryNum = boundaryNum; return this; }
        public Builder boundaryType(String boundaryType) { this.boundaryType = boundaryType; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public Builder minimumAmount(BigDecimal minimumAmount) { this.minimumAmount = minimumAmount; return this; }
        public Builder accounts(List<BillAccountDetails> accounts) { this.accounts = accounts; return this; }
        public Builder addAccount(BillAccountDetails account) { this.accounts.add(account); return this; }
        public BillDetails build() {
            BillDetails details = new BillDetails();
            details.setRefNo(this.refNo);
            details.setBillDate(this.billDate);
            details.setConsumerCode(this.consumerCode);
            details.setConsumerType(this.consumerType);
            details.setBoundaryNum(this.boundaryNum);
            details.setBoundaryType(this.boundaryType);
            details.setDescription(this.description);
            details.setTotalAmount(this.totalAmount);
            details.setMinimumAmount(this.minimumAmount);
            details.setAccounts(this.accounts);
            return details;
        }
    }
}
