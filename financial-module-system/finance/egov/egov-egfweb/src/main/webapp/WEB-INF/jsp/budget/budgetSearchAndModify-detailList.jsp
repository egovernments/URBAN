<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  ~    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
  ~    accountability and the service delivery of the government  organizations.
  ~
  ~     Copyright (C) 2017  eGovernments Foundation
  ~
  ~     The updated version of eGov suite of products as by eGovernments Foundation
  ~     is available at http://www.egovernments.org
  ~
  ~     This program is free software: you can redistribute it and/or modify
  ~     it under the terms of the GNU General Public License as published by
  ~     the Free Software Foundation, either version 3 of the License, or
  ~     any later version.
  ~
  ~     This program is distributed in the hope that it will be useful,
  ~     but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~     GNU General Public License for more details.
  ~
  ~     You should have received a copy of the GNU General Public License
  ~     along with this program. If not, see http://www.gnu.org/licenses/ or
  ~     http://www.gnu.org/licenses/gpl.html .
  ~
  ~     In addition to the terms of the GPL license to be adhered to in using this
  ~     program, the following additional terms are to be complied with:
  ~
  ~         1) All versions of this program, verbatim or modified must carry this
  ~            Legal Notice.
  ~            Further, all user interfaces, including but not limited to citizen facing interfaces,
  ~            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
  ~            derived works should carry eGovernments Foundation logo on the top right corner.
  ~
  ~            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
  ~            For any further queries on attribution, including queries on brand guidelines,
  ~            please contact contact@egovernments.org
  ~
  ~         2) Any misrepresentation of the origin of the material is prohibited. It
  ~            is required that all modified versions of this material be marked in
  ~            reasonable ways as different from the original version.
  ~
  ~         3) This license does not grant any rights to any user of the program
  ~            with regards to rights under trademark law for use of the trade names
  ~            or trademarks of eGovernments Foundation.
  ~
  ~   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
  ~
  --%>


<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<link rel="stylesheet" href="/services/EGF/resources/css/tabber.css?rnd=${app_release_no}"
	TYPE="text/css">
<script type="text/javascript" src="/services/EGF/resources/javascript/tabber.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/tabber2.js?rnd=${app_release_no}"></script>
<script type="text/javascript" src="/services/EGF/resources/javascript/helper.js?rnd=${app_release_no}"></script>
<jsp:include page="budgetHeader.jsp" />
<SCRIPT type="text/javascript">
    var dept_callback = {
		success: function(o){
			if(trimStr(o.responseText) != '' && trimStr(o.responseText) != '0'){
				document.getElementById('departmentid').value = trimStr(o.responseText);
				if(document.getElementById('departmentid').value!=-1){
					document.getElementById('departmentid').disabled=true;
					populateDesg();
				}
			}else{
					document.getElementById('departmentid').disabled=false;
				}},
			failure: function(o) {
				document.getElementById('departmentid').disabled=false;
		    }
		}
		
		function defaultDept(){
			var url = '/EGF/voucher/common!ajaxLoadDefaultDepartment.action';
			YAHOO.util.Connect.asyncRequest('POST', url, dept_callback, null);
		}
    </SCRIPT>
</head>
<body>
	<form:form action="budgetSearchAndModify" theme="simple">


		<!-- TODO: Manual migration required for custom Struts tag -->
		<div style="color: red">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div align="left">
			<br />
			<table border="0" cellspacing="0" cellpadding="0" width="100%">
				<tr>
					<td>
						<div class="tabber">
							<div class="tabbertab" style="height: 500px">
								<h2>Summary</h2>
								<c:if test="%{isDetailByFunction()}">
									<iframe id="report" name="report" width="100%" height="100%"
										src='/EGF/budget/budgetReport!ajaxGenerateFunctionWiseHtml.action?model.financialYear.id=${budgetDetail.budget.financialYear.id}&model.department.id=${budgetDetail.executingDepartment.id}&model.function.id=${budgetDetail.function.id}&topBudget.id=${budgetDetail.budget.id}&model.type=${model.type}&onSaveOrForward=true'></iframe>
								</c:if>
								<c:otherwise>
									<iframe id="report" name="report" width="100%" height="100%"
										src='/EGF/budget/budgetReport!ajaxGenerateFunctionWiseHtml.action?model.financialYear.id=${topBudget.financialYear.id}&model.department.id=${budgetDetail.executingDepartment.id}&topBudget.id=${topBudget.id}&departmentBudget=true&model.type=${model.type}&onSaveOrForward=true'></iframe>
								</s:else>
							</div>
							<div class="tabbertab" style="height: 500px">
								<h2>Budget Details</h2>
								<span> <script>
							var budgetDetailsTable = null;
							var callback = {
								     success: function(o) {
							     			document.getElementById('detail').innerHTML = o.responseText;
									var length = document.getElementById('detailsLength').value;
									if(length==0)
									{
										document.getElementById('buttonsDiv').style.display="none";
									}
								        },
								     failure: function(o) {
								     }
							} 
							function deleteBudgetDetail(elem){
								var transaction = YAHOO.util.Connect.asyncRequest('POST', 'budgetSearchAndModify!ajaxDeleteBudgetDetail.action?id='+elem.id+'&action=modify', callback, null);
							}  
						</script> <!-- TODO: Manual migration required for custom Struts tag --> <jsp:include
										page="budgetHeader.jsp" />
									<div align="left" class="extracontent">Amount in
										Thousands</div>
									<div class="formmainbox">
										<div class="subheadnew">
											<!-- TODO: Manual migration required for custom Struts tag -->
										</div>
										<!-- TODO: Manual migration required for custom Struts tag -->
										<c:if test="%{showApprovalDetails()}">
											<table align="center" border="0" cellpadding="0"
												cellspacing="0" width="100%" class="tablebottom"
												style="border-right: 0px solid #C5C5C5;">
												<tr>
													<td class="blueborderfortd" width="5%"><b>Budget:</b></td>
													<td class="blueborderfortd"><s:property
															value="%{getTopBudget().getName()}" /></td>
													<td class="blueborderfortd" width="5%"><b>Remarks:</b></td>
													<td class="blueborderfortd"><textarea cols="50"
															rows="3" name='comments'><s:property
																value="comments" /></textarea></td>
												</tr>
											</table>
										</c:if>
										<!-- TODO: Manual migration required for custom Struts tag -->
										<input type='hidden' name='action' value='modify' />
										<c:if test="%{!savedbudgetDetailList.isEmpty()}">
											<div id="detail" width="600">
												<%@ include file="budgetSearchAndModify-modifyList.jsp"%>
											</div>
										</c:if>
										<br />
										<br />
										<script>
								document.getElementById('hidden_budget').value = '${budgetDetail.budget.id}';
								function validateAmounts(){
									var len = ${savedbudgetDetailList.size};
									for(i=0;i<len;i++){
										if(document.getElementById('savedbudgetDetailList['+i+'].approvedAmount') && document.getElementById('savedbudgetDetailList['+i+'].approvedAmount').value == ''){
											bootbox.alert("Enter approved amount");
											return false;
										}
									}
									return true;
								}
								function validateAppoveUser(name,value){
									<c:if test="%{wfitemstate =='END'}">
										if(value == 'Approve' || value == 'Reject') {
											document.getElementById("approverUserId").value=-1;
											return true;
										}
									</c:if>
									<c:otherwise>
										if( (value == 'forward' || value == 'Forward') && null != document.getElementById("approverUserId") && document.getElementById("approverUserId").value == -1){
											bootbox.alert("Please select User");
											return false;
										}
									</s:else>
									return validateAmounts();
								}
							</script>
										<!-- TODO: Manual migration required for custom Struts tag -->
									</div>
								</span>
							</div>
							<!-- Individual tab -->
							<div class="tabbertab" id="approvalDetails">
								<h2>Approval Details</h2>
								<span> <c:if test="%{!savedbudgetDetailList.isEmpty()}">
										<c:if test='%{! "END".equalsIgnoreCase(wfitemstate)}'>
											<%@include file="../voucher/workflowApproval.jsp"%>
											<script>
										document.getElementById('departmentid').value='${savedbudgetDetailList[0].executingDepartment.id}';
										populateDesg();
										defaultDept();
									</script>
										</c:if>
									</c:if>
								</span>
							</div>
							<!-- Individual tab -->
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="buttonholderwk" id="buttonsDiv">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<div class="buttonbottom">
				<c:if test="%{showbuttons()}">
					<c:forEach value="%{validButtons}">
						<s:submit type="submit" cssClass="buttonsubmit"
							value="%{capitalize(description)}" id="%{name}" name="%{name}"
							method="update"
							onclick=" document.budgetSearchAndModify.actionName.value='%{name}';return validateAppoveUser('%{name}','%{description}')" />
					</c:forEach>
				</c:if>
				<input type="submit" value="Close"
					onclick="javascript:window.close()" class="button" />
			</div>
		</div>

	</form:form>
	<script type="text/javascript">
	if(document.getElementById("approve")){
		document.getElementById("approvalDetails").style.display = 'none';
	}
	</script>
</body>
</html>
