package org.egov.egovsurveyservices.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.request.RequestInfo;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SurveyRequest {

    @JsonProperty("SurveyEntity")
    SurveyEntity surveyEntity;

    @JsonProperty("RequestInfo")
    RequestInfo requestInfo;

}
