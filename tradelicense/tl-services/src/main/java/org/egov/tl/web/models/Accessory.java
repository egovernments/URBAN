package org.egov.tl.web.models;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.egov.tl.web.models.AuditDetails;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds the basic data for a Trade License")
@Validated
@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Accessory   {

        @Size(max=64)
        
        @JsonProperty("id")
        private String id;

        @Size(max=64)
        
        @JsonProperty("tenantId")
        private String tenantId = null;

        @JsonProperty("active")
        private Boolean active;

        @Size(max=64)
        
        @JsonProperty("accessoryCategory")
        private String accessoryCategory = null;

        @Size(max=64)
        
        @JsonProperty("uom")
        private String uom = null;

        @Size(max=64)
        
        @JsonProperty("uomValue")
        private String uomValue = null;

        @Min(value = 1)
        @JsonProperty("count")
        private Integer count;

        @JsonProperty("auditDetails")
        private AuditDetails auditDetails = null;


}

