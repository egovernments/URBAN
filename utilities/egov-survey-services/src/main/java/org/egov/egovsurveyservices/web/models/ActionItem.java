package org.egov.egovsurveyservices.web.models;

import lombok.*;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotNull;

@Validated
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@NoArgsConstructor
@Setter
@ToString
@Builder
public class ActionItem {

    @NotNull
    private String actionUrl;

    @NotNull
    private String code;

}
