
package org.egov.waterconnection.web.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.egov.waterconnection.web.models.workflow.ProcessInstance;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * This is lightweight property object that can be used as reference by
 * definitions needing property linking. Actual Property Object extends this to
 * include more elaborate attributes of the property.
 */
@ApiModel(description = "This is lightweight property object that can be used as reference by definitions needing property linking. Actual Property Object extends this to include more elaborate attributes of the property.")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@jakarta.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2020-05-20T12:22:10.265+05:30[Asia/Kolkata]")
public class Connection {
	
	@JsonProperty("id")
	private String id = null;

	
	@JsonProperty("tenantId")
	private String tenantId = null;

	
	@JsonProperty("propertyId")
	private String propertyId = null;

	
	@JsonProperty("applicationNo")
	private String applicationNo = null;

	
	@JsonProperty("applicationStatus")
	private String applicationStatus = null;

	/**
	 * Gets or Sets status
	 */
	public enum StatusEnum {
		ACTIVE("Active"),

		INACTIVE("Inactive");

		private String value;

		StatusEnum(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static StatusEnum fromValue(String text) {
			for (StatusEnum b : StatusEnum.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}

	@JsonProperty("status")
	private StatusEnum status = null;

	
	@JsonProperty("connectionNo")
	private String connectionNo = null;

	
	@JsonProperty("oldConnectionNo")
	private String oldConnectionNo = null;

	@JsonProperty("documents")
	@Valid
	private List<Document> documents = null;

	@JsonProperty("plumberInfo")
	@Valid
	private List<PlumberInfo> plumberInfo = null;

	
	@JsonProperty("roadType")
	private String roadType = null;

	@JsonProperty("roadCuttingArea")
	private Float roadCuttingArea = null;

	@JsonProperty("roadCuttingInfo")
	private List<RoadCuttingInfo> roadCuttingInfo = null;

	@JsonProperty("connectionExecutionDate")
	private Long connectionExecutionDate = null;

	
	@JsonProperty("connectionCategory")
	private String connectionCategory = null;

	
	@JsonProperty("connectionType")
	private String connectionType = null;

	@JsonProperty("additionalDetails")
	private Object additionalDetails = null;

	@JsonProperty("auditDetails")
	private AuditDetails auditDetails = null;

	@JsonProperty("processInstance")
	private ProcessInstance processInstance = null;

	
	@JsonProperty("applicationType")
	private String applicationType = null;

	@JsonProperty("dateEffectiveFrom")
	private Long dateEffectiveFrom = null;
	
	@JsonProperty("connectionHolders")
//	@Valid
	private List<OwnerInfo> connectionHolders;

	@JsonProperty("oldApplication")
	private Boolean oldApplication = false;

	
	@JsonProperty("channel")
	private String channel = null;

	@JsonProperty("disconnectionExecutionDate")
	private Long disconnectionExecutionDate = null;

	public Connection id(String id) {
		this.id = id;
		return this;
	}

	/**
	 * Unique Identifier of the connection for internal reference.
	 * 
	 * @return id
	 **/
	@ApiModelProperty(readOnly = true, value = "Unique Identifier of the connection for internal reference.")

	@Size(min = 1, max = 64)
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Connection tenantId(String tenantId) {
		this.tenantId = tenantId;
		return this;
	}

	/**
	 * Unique ULB identifier.
	 * 
	 * @return tenantId
	 **/
	@ApiModelProperty(value = "Unique ULB identifier.")

	@Size(min = 2, max = 256)
	@NotNull
	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public Connection propertyId(String propertyId) {
		this.propertyId = propertyId;
		return this;
	}

	@ApiModelProperty(value = " ")

	public Boolean getOldApplication() {return oldApplication;}

	public void setOldApplication(Boolean oldApplication) {
		this.oldApplication = oldApplication;
	}

	/**
	 * UUID of the property.
	 * 
	 * @return propertyId
	 **/
	@ApiModelProperty(value = "UUID of the property.")

	public String getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(String propertyId) {
		this.propertyId = propertyId;
	}

	public Connection applicationNo(String applicationNo) {
		this.applicationNo = applicationNo;
		return this;
	}

	/**
	 * Formatted application number, which will be generated using ID-Gen at the
	 * time .
	 * 
	 * @return applicationNo
	 **/
	@ApiModelProperty(readOnly = true, value = "Formatted application number, which will be generated using ID-Gen at the time .")

	@Size(min = 1, max = 64)
	public String getApplicationNo() {
		return applicationNo;
	}

	public void setApplicationNo(String applicationNo) {
		this.applicationNo = applicationNo;
	}

	public Connection applicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
		return this;
	}

	/**
	 * Get applicationStatus
	 * 
	 * @return applicationStatus
	 **/
	@ApiModelProperty(value = "")

	public String getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	public Connection status(StatusEnum status) {
		this.status = status;
		return this;
	}

	/**
	 * Get status
	 * 
	 * @return status
	 **/
	@ApiModelProperty(value = "")

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	public Connection connectionNo(String connectionNo) {
		this.connectionNo = connectionNo;
		return this;
	}

	/**
	 * Formatted connection number, which will be generated using ID-Gen service
	 * after aproval of connection application in case of new application. If the
	 * source of data is \"DATA_ENTRY\" then application status will be considered
	 * as \"APROVED\" application.
	 * 
	 * @return connectionNo
	 **/
	@ApiModelProperty(readOnly = true, value = "Formatted connection number, which will be generated using ID-Gen service after aproval of connection application in case of new application. If the source of data is \"DATA_ENTRY\" then application status will be considered as \"APROVED\" application.")

	@Size(min = 1, max = 64)
	public String getConnectionNo() {
		return connectionNo;
	}

	public void setConnectionNo(String connectionNo) {
		this.connectionNo = connectionNo;
	}

	public Connection oldConnectionNo(String oldConnectionNo) {
		this.oldConnectionNo = oldConnectionNo;
		return this;
	}

	/**
	 * Mandatory if source is \"DATA_ENTRY\".
	 * 
	 * @return oldConnectionNo
	 **/
	@ApiModelProperty(readOnly = true, value = "Mandatory if source is \"DATA_ENTRY\".")

	@Size(min = 1, max = 64)
	public String getOldConnectionNo() {
		return oldConnectionNo;
	}

	public void setOldConnectionNo(String oldConnectionNo) {
		this.oldConnectionNo = oldConnectionNo;
	}

	public Connection roadCuttingInfo(List<RoadCuttingInfo> roadCuttingInfo){
		this.roadCuttingInfo = roadCuttingInfo;
		return this;
	}

	public Connection addRoadCuttingInfoList(RoadCuttingInfo roadCuttingInfoItem){
		if(this.roadCuttingInfo == null)
			this.roadCuttingInfo = new ArrayList<RoadCuttingInfo>();
		if(!this.roadCuttingInfo.contains(roadCuttingInfoItem))
			this.roadCuttingInfo.add(roadCuttingInfoItem);

		return this;
	}

	public Connection documents(List<Document> documents) {
		this.documents = documents;
		return this;
	}

	public Connection addDocumentsItem(Document documentsItem) {
		if (this.documents == null) {
			this.documents = new ArrayList<Document>();
		}
		if (!this.documents.contains(documentsItem))
			this.documents.add(documentsItem);
		return this;
	}

	/**
	 * The documents attached by owner for exemption.
	 * 
	 * @return documents
	 **/
	@ApiModelProperty(value = "The documents attached by owner for exemption.")
	@Valid
	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

	public Connection plumberInfo(List<PlumberInfo> plumberInfo) {
		this.plumberInfo = plumberInfo;
		return this;
	}

	@ApiModelProperty(value = "The road cutting information given by owner")
	@Valid
	public List<RoadCuttingInfo> getRoadCuttingInfo(){ return roadCuttingInfo; }

	public void setRoadCuttingInfo(List<RoadCuttingInfo> roadCuttingInfo) { this.roadCuttingInfo = roadCuttingInfo; }

	public Connection addPlumberInfoItem(PlumberInfo plumberInfoItem) {
		if (this.plumberInfo == null) {
			this.plumberInfo = new ArrayList<PlumberInfo>();
		}
		if (!this.plumberInfo.contains(plumberInfoItem))
			this.plumberInfo.add(plumberInfoItem);
		return this;
	}

	/**
	 * The documents attached by owner for exemption.
	 * 
	 * @return plumberInfo
	 **/
	@ApiModelProperty(value = "The documents attached by owner for exemption.")
	@Valid
	public List<PlumberInfo> getPlumberInfo() {
		return plumberInfo;
	}

	public void setPlumberInfo(List<PlumberInfo> plumberInfo) {
		this.plumberInfo = plumberInfo;
	}

	public Connection roadType(String roadType) {
		this.roadType = roadType;
		return this;
	}

	/**
	 * It is a master data, defined in MDMS. If road cutting is required to
	 * established the connection then we need to capture the details of road type.
	 * 
	 * @return roadType
	 **/
	@ApiModelProperty(value = "It is a master data, defined in MDMS. If road cutting is required to established the connection then we need to capture the details of road type.")

	@Size(min = 2, max = 32)
	public String getRoadType() {
		return roadType;
	}

	public void setRoadType(String roadType) {
		this.roadType = roadType;
	}

	public Connection roadCuttingArea(Float roadCuttingArea) {
		this.roadCuttingArea = roadCuttingArea;
		return this;
	}

	/**
	 * Capture the road cutting area in sqft.
	 * 
	 * @return roadCuttingArea
	 **/
	@ApiModelProperty(value = "Capture the road cutting area in sqft.")

	public Float getRoadCuttingArea() {
		return roadCuttingArea;
	}

	public void setRoadCuttingArea(Float roadCuttingArea) {
		this.roadCuttingArea = roadCuttingArea;
	}

	public Connection connectionExecutionDate(Long connectionExecutionDate) {
		this.connectionExecutionDate = connectionExecutionDate;
		return this;
	}

	/**
	 * Get connectionExecutionDate
	 * 
	 * @return connectionExecutionDate
	 **/
	@ApiModelProperty(readOnly = true, value = "")

	@Valid
	public Long getConnectionExecutionDate() {
		return connectionExecutionDate;
	}

	public void setConnectionExecutionDate(Long connectionExecutionDate) {
		this.connectionExecutionDate = connectionExecutionDate;
	}

	public Connection connectionCategory(String connectionCategory) {
		this.connectionCategory = connectionCategory;
		return this;
	}

	/**
	 * It is a master data, defined in MDMS
	 * 
	 * @return connectionCategory
	 **/
	@ApiModelProperty(required = true, value = "It is a master data, defined in MDMS")

	@Size(min = 2, max = 32)
	public String getConnectionCategory() {
		return connectionCategory;
	}

	public void setConnectionCategory(String connectionCategory) {
		this.connectionCategory = connectionCategory;
	}

	public Connection connectionType(String connectionType) {
		this.connectionType = connectionType;
		return this;
	}

	/**
	 * It is a master data, defined in MDMS.
	 * 
	 * @return connectionType
	 **/
	@ApiModelProperty(required = true, value = "It is a master data, defined in MDMS.")

	@Size(min = 2, max = 32)
	public String getConnectionType() {
		return connectionType;
	}

	public void setConnectionType(String connectionType) {
		this.connectionType = connectionType;
	}

	public Connection additionalDetails(Object additionalDetails) {
		this.additionalDetails = additionalDetails;
		return this;
	}

	/**
	 * Json object to capture any extra information which is not accommodated of
	 * model
	 * 
	 * @return additionalDetails
	 **/
	@ApiModelProperty(value = "Json object to capture any extra information which is not accommodated of model")

	public Object getAdditionalDetails() {
		return additionalDetails;
	}

	public void setAdditionalDetails(Object additionalDetails) {
		this.additionalDetails = additionalDetails;
	}

	public Connection auditDetails(AuditDetails auditDetails) {
		this.auditDetails = auditDetails;
		return this;
	}

	/**
	 * Get auditDetails
	 * 
	 * @return auditDetails
	 **/
	@ApiModelProperty(value = "")

	@Valid
	public AuditDetails getAuditDetails() {
		return auditDetails;
	}

	public void setAuditDetails(AuditDetails auditDetails) {
		this.auditDetails = auditDetails;
	}

	public Connection processInstance(ProcessInstance processInstance) {
		this.processInstance = processInstance;
		return this;
	}

	public ProcessInstance getProcessInstance() {
		return processInstance;
	}

	public void setProcessInstance(ProcessInstance processInstance) {
		this.processInstance = processInstance;
	}
	
	public Connection addConnectionHolderInfo(OwnerInfo ownerInfo) {
		if (this.connectionHolders == null) {
			this.connectionHolders = new ArrayList<OwnerInfo>();
		}
		if (!this.connectionHolders.contains(ownerInfo))
			this.connectionHolders.add(ownerInfo);
		return this;
	}

	@ApiModelProperty(value = "The connection holder info will enter by employee or citizen")
	@Valid
	public List<OwnerInfo> getConnectionHolders() {
		return connectionHolders;
	}

	public void setConnectionHolders(List<OwnerInfo> ownerInfo) {
		this.connectionHolders = ownerInfo;
	}
	
	public Connection dateEffectiveFrom(Long dateEffectiveFrom) {
		this.dateEffectiveFrom = dateEffectiveFrom;
		return this;
	}

	/**
	 * Get dateEffectiveFrom
	 *
	 * @return dateEffectiveFrom
	 **/
	@ApiModelProperty(readOnly = true, value = "")
	@Valid
	public Long getDateEffectiveFrom() {
		return dateEffectiveFrom;
	}

	public void setDateEffectiveFrom(Long dateEffectiveFrom) {
		this.dateEffectiveFrom = dateEffectiveFrom;
	}

	public Connection applicationType(String applicationType) {
		this.applicationType = applicationType;
		return this;
	}

	/**
	 * It is a master data, defined in MDMS.
	 *
	 * @return applicationType
	 **/
	@ApiModelProperty(readOnly = true, value = "")
	@Valid
	public String getApplicationType() {
		return applicationType;
	}

	public void setApplicationType(String applicationType) {
		this.applicationType = applicationType;
	}


	public Connection channel(String channel) {
		this.channel = channel;
		return this;
	}

	@ApiModelProperty(readOnly = true, value = "")
	@Valid
	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Connection connection = (Connection) o;
		return Objects.equals(this.id, connection.id) && Objects.equals(this.tenantId, connection.tenantId)
				&& Objects.equals(this.propertyId, connection.propertyId)
				&& Objects.equals(this.applicationNo, connection.applicationNo)
				&& Objects.equals(this.applicationStatus, connection.applicationStatus)
				&& Objects.equals(this.status, connection.status)
				&& Objects.equals(this.connectionNo, connection.connectionNo)
				&& Objects.equals(this.oldConnectionNo, connection.oldConnectionNo)
				&& Objects.equals(this.documents, connection.documents)
				&& Objects.equals(this.roadCuttingInfo,connection.roadCuttingInfo)
				&& Objects.equals(this.plumberInfo, connection.plumberInfo)
				&& Objects.equals(this.roadType, connection.roadType)
				&& Objects.equals(this.roadCuttingArea, connection.roadCuttingArea)
				&& Objects.equals(this.connectionExecutionDate, connection.connectionExecutionDate)
				&& Objects.equals(this.connectionCategory, connection.connectionCategory)
				&& Objects.equals(this.connectionType, connection.connectionType)
				&& Objects.equals(this.additionalDetails, connection.additionalDetails)
				&& Objects.equals(this.connectionHolders, connection.connectionHolders)
				&& Objects.equals(this.applicationType, connection.applicationType)
				&& Objects.equals(this.dateEffectiveFrom, connection.dateEffectiveFrom)
				&& Objects.equals(this.oldApplication,connection.oldApplication)
				&& Objects.equals(this.channel, connection.channel);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, tenantId, propertyId, applicationNo, applicationStatus, status, connectionNo,
				oldConnectionNo, documents, roadCuttingInfo, plumberInfo, roadType, roadCuttingArea, connectionExecutionDate,
				connectionCategory, connectionType, additionalDetails, auditDetails, connectionHolders,
				applicationType, dateEffectiveFrom, oldApplication, channel);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class Connection {\n");

		sb.append("    id: ").append(toIndentedString(id)).append("\n");
		sb.append("    tenantId: ").append(toIndentedString(tenantId)).append("\n");
		sb.append("    propertyId: ").append(toIndentedString(propertyId)).append("\n");
		sb.append("    applicationNo: ").append(toIndentedString(applicationNo)).append("\n");
		sb.append("    applicationStatus: ").append(toIndentedString(applicationStatus)).append("\n");
		sb.append("    status: ").append(toIndentedString(status)).append("\n");
		sb.append("    connectionNo: ").append(toIndentedString(connectionNo)).append("\n");
		sb.append("    oldConnectionNo: ").append(toIndentedString(oldConnectionNo)).append("\n");
		sb.append("    documents: ").append(toIndentedString(documents)).append("\n");
		sb.append("    roadCuttingInfo: ").append(toIndentedString(roadCuttingInfo)).append("\n");
		sb.append("    plumberInfo: ").append(toIndentedString(plumberInfo)).append("\n");
		sb.append("    roadType: ").append(toIndentedString(roadType)).append("\n");
		sb.append("    roadCuttingArea: ").append(toIndentedString(roadCuttingArea)).append("\n");
		sb.append("    connectionExecutionDate: ").append(toIndentedString(connectionExecutionDate)).append("\n");
		sb.append("    connectionCategory: ").append(toIndentedString(connectionCategory)).append("\n");
		sb.append("    connectionType: ").append(toIndentedString(connectionType)).append("\n");
		sb.append("    additionalDetails: ").append(toIndentedString(additionalDetails)).append("\n");
		sb.append("    auditDetails: ").append(toIndentedString(auditDetails)).append("\n");
		sb.append("    connectionHolders: ").append(toIndentedString(connectionHolders)).append("\n");
		sb.append("    applicationType: ").append(toIndentedString(applicationType)).append("\n");
		sb.append("	   dateEffectiveFrom: ").append(toIndentedString(dateEffectiveFrom)).append("\n");
		sb.append("	   oldApplication: ").append(toIndentedString(oldApplication)).append("\n");
		sb.append("	   channel: ").append(toIndentedString(channel)).append("\n");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * Convert the given object to string with each line indented by 4 spaces
	 * (except the first line).
	 */
	private String toIndentedString(java.lang.Object o) {
		if (o == null) {
			return "null";
		}
		return o.toString().replace("\n", "\n    ");
	}

}