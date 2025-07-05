package org.egov.infra.microservice.contract;

import java.util.List;

public class ActionResponse {
	
	private ResponseInfo responseInfo;
	// TODO: Migrate from Struts/XWork: private List<ActionContract> actions;
	
	// TODO: Migrate from Struts/XWork: public ActionResponse(){}

	// TODO: Migrate from Struts/XWork: public ActionResponse(ResponseInfo responseInfo, List<ActionContract> actions) {
	// 	this.responseInfo = responseInfo;
	// 	this.actions = actions;
	// }

	public ResponseInfo getResponseInfo() {
		return responseInfo;
	}

	public void setResponseInfo(ResponseInfo responseInfo) {
		this.responseInfo = responseInfo;
	}

	// TODO: Migrate from Struts/XWork: public List<ActionContract> getActions() {
	// 	return actions;
	// }

	// TODO: Migrate from Struts/XWork: public void setActions(List<ActionContract> actions) {
	// 	this.actions = actions;
	// }
	
}
