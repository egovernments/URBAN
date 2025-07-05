package org.egov.infra.microservice.contract;

import java.util.Date;

public class Action {
	private Long id;
	private String name;
	private String url;
	private String displayName;
	private Integer orderNumber;
	private String queryParams;
	private String parentModule;
	private boolean enabled;
	private String serviceCode;
	private String tenantId;
	private Date createdDate;
	private Long createdBy;
	private Date lastModifiedDate;
	private Long lastModifiedBy;
	private String path;
	private String navigationURL;
	private String leftIcon;
	private String rightIcon;

	public Action() {}

	public Action(Long id, String name, String url, String displayName, Integer orderNumber, String queryParams,
				 String parentModule, boolean enabled, String serviceCode, String tenantId, Date createdDate, Long createdBy,
				 Date lastModifiedDate, Long lastModifiedBy, String path, String navigationURL, String leftIcon,
				 String rightIcon) {
		this.id = id;
		this.name = name;
		this.url = url;
		this.displayName = displayName;
		this.orderNumber = orderNumber;
		this.queryParams = queryParams;
		this.parentModule = parentModule;
		this.enabled = enabled;
		this.serviceCode = serviceCode;
		this.tenantId = tenantId;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.lastModifiedDate = lastModifiedDate;
		this.lastModifiedBy = lastModifiedBy;
		this.path = path;
		this.navigationURL = navigationURL;
		this.leftIcon = leftIcon;
		this.rightIcon = rightIcon;
	}

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }
	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	public String getUrl() { return url; }
	public void setUrl(String url) { this.url = url; }
	public String getDisplayName() { return displayName; }
	public void setDisplayName(String displayName) { this.displayName = displayName; }
	public Integer getOrderNumber() { return orderNumber; }
	public void setOrderNumber(Integer orderNumber) { this.orderNumber = orderNumber; }
	public String getQueryParams() { return queryParams; }
	public void setQueryParams(String queryParams) { this.queryParams = queryParams; }
	public String getParentModule() { return parentModule; }
	public void setParentModule(String parentModule) { this.parentModule = parentModule; }
	public boolean isEnabled() { return enabled; }
	public void setEnabled(boolean enabled) { this.enabled = enabled; }
	public String getServiceCode() { return serviceCode; }
	public void setServiceCode(String serviceCode) { this.serviceCode = serviceCode; }
	public String getTenantId() { return tenantId; }
	public void setTenantId(String tenantId) { this.tenantId = tenantId; }
	public Date getCreatedDate() { return createdDate; }
	public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }
	public Long getCreatedBy() { return createdBy; }
	public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }
	public Date getLastModifiedDate() { return lastModifiedDate; }
	public void setLastModifiedDate(Date lastModifiedDate) { this.lastModifiedDate = lastModifiedDate; }
	public Long getLastModifiedBy() { return lastModifiedBy; }
	public void setLastModifiedBy(Long lastModifiedBy) { this.lastModifiedBy = lastModifiedBy; }
	public String getPath() { return path; }
	public void setPath(String path) { this.path = path; }
	public String getNavigationURL() { return navigationURL; }
	public void setNavigationURL(String navigationURL) { this.navigationURL = navigationURL; }
	public String getLeftIcon() { return leftIcon; }
	public void setLeftIcon(String leftIcon) { this.leftIcon = leftIcon; }
	public String getRightIcon() { return rightIcon; }
	public void setRightIcon(String rightIcon) { this.rightIcon = rightIcon; }

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((parentModule == null) ? 0 : parentModule.hashCode());
		result = prime * result + ((serviceCode == null) ? 0 : serviceCode.hashCode());
		result = prime * result + ((tenantId == null) ? 0 : tenantId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Action other = (Action) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (parentModule == null) {
			if (other.parentModule != null)
				return false;
		} else if (!parentModule.equals(other.parentModule))
			return false;
		if (serviceCode == null) {
			if (other.serviceCode != null)
				return false;
		} else if (!serviceCode.equals(other.serviceCode))
			return false;
		if (tenantId == null) {
			if (other.tenantId != null)
				return false;
		} else if (!tenantId.equals(other.tenantId))
			return false;
		return true;
	}
}
