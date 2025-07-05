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

import javax.validation.constraints.NotNull;

import org.apache.commons.collections.CollectionUtils;
import org.hibernate.validator.constraints.SafeHtml;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = { "id" })
public class BillDetailV2 {

    @SafeHtml
    @JsonProperty("id")
    private String id = null;

    @SafeHtml
    @JsonProperty("tenantId")
    private String tenantId = null;

    @SafeHtml
    @JsonProperty("demandId")
    private String demandId = null;

    @SafeHtml
    @JsonProperty("billId")
    private String billId = null;

    
    @JsonProperty("amount")
    @NotNull
    private BigDecimal amount = null;

    @JsonProperty("amountPaid")
    private BigDecimal amountPaid = null;

    @NotNull
    @JsonProperty("fromPeriod")
    private Long fromPeriod = null;

    @NotNull
    @JsonProperty("toPeriod")
    private Long toPeriod = null;

    @JsonProperty("additionalDetails")
    private JsonNode additionalDetails = null;

    @SafeHtml
    @JsonProperty("channel")
    private String channel = null;

    @SafeHtml
    @JsonProperty("voucherHeader")
    private String voucherHeader = null;

    @SafeHtml
    @JsonProperty("boundary")
    private String boundary = null;

    @SafeHtml
    @JsonProperty("manualReceiptNumber")
    private String manualReceiptNumber = null;

    @JsonProperty("manualReceiptDate")
    private Long manualReceiptDate = null;

    @JsonProperty("billAccountDetails")
    private List<BillAccountDetail> billAccountDetails = null;

    @NotNull
    @JsonProperty("collectionType")
    private CollectionType collectionType = null;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails = null;

    @SafeHtml
    private String billDescription;

    @NotNull
    @JsonProperty("expiryDate")
    private Long expiryDate;

    @SafeHtml
    private String displayMessage;

    private Boolean callBackForApportioning;

    @SafeHtml
    private String cancellationRemarks;

    public Boolean addBillAccountDetail(BillAccountDetail billAccountDetail) {

        if (CollectionUtils.isEmpty(billAccountDetails)) {

            billAccountDetails = new ArrayList<>();
            return billAccountDetails.add(billAccountDetail);
        } else {

            if (!billAccountDetails.contains(billAccountDetail))
                return billAccountDetails.add(billAccountDetail);
            else
                return false;
        }
    }

    // Manual getter and setter methods since Lombok is not working properly
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    
    public String getDemandId() { return demandId; }
    public void setDemandId(String demandId) { this.demandId = demandId; }
    
    public String getBillId() { return billId; }
    public void setBillId(String billId) { this.billId = billId; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    
    public BigDecimal getAmountPaid() { return amountPaid; }
    public void setAmountPaid(BigDecimal amountPaid) { this.amountPaid = amountPaid; }
    
    public Long getFromPeriod() { return fromPeriod; }
    public void setFromPeriod(Long fromPeriod) { this.fromPeriod = fromPeriod; }
    
    public Long getToPeriod() { return toPeriod; }
    public void setToPeriod(Long toPeriod) { this.toPeriod = toPeriod; }
    
    public JsonNode getAdditionalDetails() { return additionalDetails; }
    public void setAdditionalDetails(JsonNode additionalDetails) { this.additionalDetails = additionalDetails; }
    
    public String getChannel() { return channel; }
    public void setChannel(String channel) { this.channel = channel; }
    
    public String getVoucherHeader() { return voucherHeader; }
    public void setVoucherHeader(String voucherHeader) { this.voucherHeader = voucherHeader; }
    
    public String getBoundary() { return boundary; }
    public void setBoundary(String boundary) { this.boundary = boundary; }
    
    public String getManualReceiptNumber() { return manualReceiptNumber; }
    public void setManualReceiptNumber(String manualReceiptNumber) { this.manualReceiptNumber = manualReceiptNumber; }
    
    public Long getManualReceiptDate() { return manualReceiptDate; }
    public void setManualReceiptDate(Long manualReceiptDate) { this.manualReceiptDate = manualReceiptDate; }
    
    public List<BillAccountDetail> getBillAccountDetails() { return billAccountDetails; }
    public void setBillAccountDetails(List<BillAccountDetail> billAccountDetails) { this.billAccountDetails = billAccountDetails; }
    
    public CollectionType getCollectionType() { return collectionType; }
    public void setCollectionType(CollectionType collectionType) { this.collectionType = collectionType; }
    
    public AuditDetails getAuditDetails() { return auditDetails; }
    public void setAuditDetails(AuditDetails auditDetails) { this.auditDetails = auditDetails; }
    
    public String getBillDescription() { return billDescription; }
    public void setBillDescription(String billDescription) { this.billDescription = billDescription; }
    
    public Long getExpiryDate() { return expiryDate; }
    public void setExpiryDate(Long expiryDate) { this.expiryDate = expiryDate; }
    
    public String getDisplayMessage() { return displayMessage; }
    public void setDisplayMessage(String displayMessage) { this.displayMessage = displayMessage; }
    
    public Boolean getCallBackForApportioning() { return callBackForApportioning; }
    public void setCallBackForApportioning(Boolean callBackForApportioning) { this.callBackForApportioning = callBackForApportioning; }
    
    public String getCancellationRemarks() { return cancellationRemarks; }
    public void setCancellationRemarks(String cancellationRemarks) { this.cancellationRemarks = cancellationRemarks; }
}
