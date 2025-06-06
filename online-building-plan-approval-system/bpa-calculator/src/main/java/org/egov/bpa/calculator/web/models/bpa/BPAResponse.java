package  org.egov.bpa.calculator.web.models.bpa;

import java.util.List;
import java.util.Objects;

import jakarta.validation.Valid;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * Contains the ResponseHeader and the created/updated property
 */
@ApiModel(description = "Contains the ResponseHeader and the created/updated property")
@Validated
@jakarta.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2020-06-23T05:52:32.717Z[GMT]")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BPAResponse   {
  @JsonProperty("ResponseInfo")
  private ResponseInfo responseInfo = null;

  @JsonProperty("BPA")
  private List<BPA> BPA = null;

  public BPAResponse responseInfo(ResponseInfo responseInfo) {
    this.responseInfo = responseInfo;
    return this;
  }

  /**
   * Get responseInfo
   * @return responseInfo
  **/
  @ApiModelProperty(value = "")
  
    @Valid
    public ResponseInfo getResponseInfo() {
    return responseInfo;
  }

  public void setResponseInfo(ResponseInfo responseInfo) {
    this.responseInfo = responseInfo;
  }

  public BPAResponse BPA(List<BPA> BPA) {
    this.BPA = BPA;
    return this;
  }

  /**
   * Get BPA
   * @return BPA
  **/
  @ApiModelProperty(value = "")
  
    @Valid
    public List<BPA> getBPA() {
    return BPA;
  }

  public void setBPA(List<BPA> BPA) {
    this.BPA = BPA;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BPAResponse bpAResponse = (BPAResponse) o;
    return Objects.equals(this.responseInfo, bpAResponse.responseInfo) &&
        Objects.equals(this.BPA, bpAResponse.BPA);
  }

  @Override
  public int hashCode() {
    return Objects.hash(responseInfo, BPA);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BPAResponse {\n");
    
    sb.append("    responseInfo: ").append(toIndentedString(responseInfo)).append("\n");
    sb.append("    BPA: ").append(toIndentedString(BPA)).append("\n");
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
