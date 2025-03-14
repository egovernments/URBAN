package org.egov.swcalculation.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.Size;

/**
 * Address
 */
@Validated
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MigrationCount {

    @Size(max=64)
    @JsonProperty("id")
    private String id;

    @JsonProperty("offset")
    private Long offset;

    @JsonProperty("limit")
    private Long limit;

    @JsonProperty("createdTime")
    private Long createdTime;

    @JsonProperty("tenantid")
    private String tenantid;

    @JsonProperty("recordCount")
    private Long recordCount;

    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("message")
    private String message;

    @JsonProperty("auditTopic")
    private String auditTopic;

    @JsonProperty("auditTime")
    private Long auditTime;
}
