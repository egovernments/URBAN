package org.egov.infra.microservice.models;

import java.util.List;

public class PlainAccessRequest {
    private String recordId;

    private List<String> plainRequestFields;

	public String getRecordId() {
		return recordId;
	}

	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}

	public List<String> getPlainRequestFields() {
		return plainRequestFields;
	}

	public void setPlainRequestFields(List<String> plainRequestFields) {
		this.plainRequestFields = plainRequestFields;
	}
    
    
}