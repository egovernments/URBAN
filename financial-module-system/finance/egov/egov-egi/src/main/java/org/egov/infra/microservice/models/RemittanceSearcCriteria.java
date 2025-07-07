package org.egov.infra.microservice.models;

import java.util.List;

import javax.validation.constraints.NotNull;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RemittanceSearcCriteria {
    private List<String> ids;
    private List<String> referenceNumbers;
    private Long fromDate;
    private Long toDate;
    private String voucherHeader;
    private String function;
    private String fund;
    private String remarks;
    private String reasonForDelay;
    private String status;
    private String bankaccount;
    @NotNull
    private String tenantId;
    private String sortBy;
    private String sortOrder;
    private Integer pageSize;
    private Integer limit;
    private Integer offset;
    
    // Manual getter and setter methods since Lombok is not working properly
    public List<String> getIds() { return ids; }
    public void setIds(List<String> ids) { this.ids = ids; }
    
    public List<String> getReferenceNumbers() { return referenceNumbers; }
    public void setReferenceNumbers(List<String> referenceNumbers) { this.referenceNumbers = referenceNumbers; }
    
    public Long getFromDate() { return fromDate; }
    public void setFromDate(Long fromDate) { this.fromDate = fromDate; }
    
    public Long getToDate() { return toDate; }
    public void setToDate(Long toDate) { this.toDate = toDate; }
    
    public String getVoucherHeader() { return voucherHeader; }
    public void setVoucherHeader(String voucherHeader) { this.voucherHeader = voucherHeader; }
    
    public String getFunction() { return function; }
    public void setFunction(String function) { this.function = function; }
    
    public String getFund() { return fund; }
    public void setFund(String fund) { this.fund = fund; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    
    public String getReasonForDelay() { return reasonForDelay; }
    public void setReasonForDelay(String reasonForDelay) { this.reasonForDelay = reasonForDelay; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getBankaccount() { return bankaccount; }
    public void setBankaccount(String bankaccount) { this.bankaccount = bankaccount; }
    
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    
    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }
    
    public String getSortOrder() { return sortOrder; }
    public void setSortOrder(String sortOrder) { this.sortOrder = sortOrder; }
    
    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }
    
    public Integer getLimit() { return limit; }
    public void setLimit(Integer limit) { this.limit = limit; }
    
    public Integer getOffset() { return offset; }
    public void setOffset(Integer offset) { this.offset = offset; }
}
