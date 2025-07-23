package org.egov.infra.microservice.models;

import java.util.Set;

public class VoucherSearchCriteria {
    private Set<Long> ids;
    private String sortBy;
    private Integer pageSize;
    private Integer offset;
    private Set<String> voucherNumbers;
    private Long voucherFromDate;
    private Long voucherToDate;
    private String voucherType;
    private String voucherName;
    private String fundId;
    private String deptCode;

    public Set<Long> getIds() { return ids; }
    public void setIds(Set<Long> ids) { this.ids = ids; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }

    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }

    public Integer getOffset() { return offset; }
    public void setOffset(Integer offset) { this.offset = offset; }

    public Set<String> getVoucherNumbers() { return voucherNumbers; }
    public void setVoucherNumbers(Set<String> voucherNumbers) { this.voucherNumbers = voucherNumbers; }

    public Long getVoucherFromDate() { return voucherFromDate; }
    public void setVoucherFromDate(Long voucherFromDate) { this.voucherFromDate = voucherFromDate; }

    public Long getVoucherToDate() { return voucherToDate; }
    public void setVoucherToDate(Long voucherToDate) { this.voucherToDate = voucherToDate; }

    public String getVoucherType() { return voucherType; }
    public void setVoucherType(String voucherType) { this.voucherType = voucherType; }

    public String getVoucherName() { return voucherName; }
    public void setVoucherName(String voucherName) { this.voucherName = voucherName; }

    public String getFundId() { return fundId; }
    public void setFundId(String fundId) { this.fundId = fundId; }

    public String getDeptCode() { return deptCode; }
    public void setDeptCode(String deptCode) { this.deptCode = deptCode; }
}
