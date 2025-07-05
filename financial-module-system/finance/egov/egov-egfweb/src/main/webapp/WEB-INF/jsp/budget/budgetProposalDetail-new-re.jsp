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
<title>Create budget proposal (RE)</title>
<link rel="stylesheet"
	href="/services/EGF/resources/css/tabber.css?rnd=${app_release_no}"
	TYPE="text/css">
<script type="text/javascript" src="/services/EGF/resources/javascript/tabber.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/tabber2.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/helper.js?rnd=${app_release_no}"></script>
	<script type="text/javascript"
	src="/services/EGF/resources/javascript/calendar.js?rnd=${app_release_no}"></script>
<STYLE type="text/css">
.yui-dt-liner {
	text-align: right;
}

.tabbertab {
	border: 1px solid #CCCCCC;
	height: 420px;
	margin-bottom: 8px;
	overflow: scroll;
}
</STYLE>
<script>
    function onLoadTask(){
	    showMessage = '${showMessage}';
		if(showMessage == 'true' && '${getActionMessage()}' != ''){
			bootbox.alert('${getActionMessage()}');
			document.getElementById('budgetDetail_executingDepartment').value=-1;
		var functionid="";
		<c:if test="%{function.id!=0}">
		
			functionid='${function.id}';
		</c:if>
		document.forms[0].action = "${pageContext.request.contextPath}/budget/budgetProposalDetail-newRe.action?re";
		document.forms[0].submit();
		}
		defaultDept();
		 <c:if test="%{referenceBudget != null}">
			/*  document.getElementById('referenceBudget').value = '${referenceBudget.name}';  */
		</c:if> 
		//bootbox.alert(dom.get("testId"));
			//bootbox.alert(document.getElementById("testId"));
			//bootbox.alert('Financial yr --- '+document.getElementById("budgetDetail_budget").value+' ----- '+document.getElementById("financialYear").value);
	 }
    
	function validateWorkFlowApprover(name,errorDivId) {
		document.getElementById("workFlowAction").value=name; 
	  validate();
	}
		    
     function getActuals(){
		  if(validateSearch())
		 {	
		    document.getElementById('hidden_year').value = document.getElementById('financialYear').value;
		    
			document.forms[0].action = "${pageContext.request.contextPath}/budget/budgetProposalDetail-loadActualsForRe.action";
			document.forms[0].submit();
		 }
		  else{
			  return false;
		  }
				
    }
     
	function save(){
		document.forms[0].action = "${pageContext.request.contextPath}/budget/budgetProposalDetail-createRe.action";
		document.forms[0].submit();
    }
	function forward(){
		document.forms[0].action = "${pageContext.request.contextPath}/budget/budgetProposalDetail-createReAndForward.action";
		document.forms[0].submit();
	}
		    
	var elementId = null;
	function showDocumentManager(obj){
	if(obj.id == 'budgetDocUploadButton'){
		elementId = 'budgetDocNumber';
	}else{
	var index = (getRow(obj).rowIndex)-2;
		elementId = "budgetDetailList["+index+"].documentNumber";
	}
	docManager(document.getElementById(elementId).value);
	}
	
    var docNumberUpdater = function (docNumber){
	document.getElementById(elementId).value = docNumber;
	}
				
	onLoadTask();
	var dept_callback = {
	success: function(o){
	if(o.responseText != '')
		document.getElementById('approverDepartment').value = o.responseText;
		document.getElementById('approverDepartment').disabled=true;
	},
	failure: function(o) {
	}
	}
		
	<c:if test="%{showDetails}">
	var temp = window.setInterval(load,1);
	function load()
	{
		try{document.getElementById('tabber1').onclick(); window.clearInterval(temp);}catch(e){}
	}
    </c:if>
    	
	function updateApproverDepartment(obj){
		//document.getElementById('approverDepartment').value = document.getElementById('budgetDetail_executingDepartment').value;
		//populateDesg();
	}
	function defaultDept(){
		//var url = '/EGF/voucher/common!ajaxLoadDefaultDepartment.action';
		//YAHOO.util.Connect.asyncRequest('POST', url, dept_callback, null);
	}
	
	function search(){
		if(validateSearch()){
		    
			document.forms[0].action = "${pageContext.request.contextPath}/budget/budgetProposalDetail-loadBudgetDetailList.action";
			document.forms[0].submit();
			
		}
		else{
			return false;
		}
		
	}
	
	function validate(){
		validateSearch();
		anticipatory = false;
		estimate = false;
		for(i=0;i<budgetDetailsTable.getRecordSet().getLength();i++){
		if(isNaN(document.getElementById('budgetDetailList['+i+'].anticipatoryAmount').value))
			anticipatory = true;
		}				
		for(i=0;i<budgetDetailsTable.getRecordSet().getLength();i++){
		if(isNaN(document.getElementById('budgetDetailList['+i+'].originalAmount').value))
			estimate = true;
		}				
		if(estimate && anticipatory){
			bootbox.alert('Estimate amount and Anticipatory amount must be a number');
			return false;
		}else if(estimate){
			bootbox.alert('Estimate amount must be a number');
			return false;
		}else if(anticipatory){
			bootbox.alert('Anticipatory amount must be a number');
			return false;
	}
			
	/* var r=confirm("Any new budget line item cannot be added after ASSTADMIN level");
		if (r==false)
		{
			return false;
		}
	var r=confirm("Have you uploaded all the necessary documents?");
		if (r==false)
		{
			return false;
		}
	var r=confirm("There is no return facility at superior levels. Are you sure to forward?");
		if (r==false)
		{
			return false;
		}  */
		document.forms[0].action = "${pageContext.request.contextPath}/budget/budgetProposalDetail-createRE.action";
	document.budgetDetailForm.submit();
	return true;
	}
	function validateForApproval()
	{

	/*var con=confirm('<!-- TODO: Manual migration required for custom Struts tag -->');
    if(con==false)
	return false;*/
    	if(null != document.getElementById("approverUserId") && document.getElementById("approverUserId").value == -1){
			bootbox.alert("Please select User");
			return false;
		}
	var check=validate();
    	if(check==true)
		{
			forward();
	 	}else
	 	{
		 return false;
		}
				
	}

	function validateSearch()
	{
		var result=true;
		if(document.getElementById('financialYear').value==0 )
		{
			bootbox.alert("Select Financial Year");
			result=false;
		}
		 else if('${budgetDetail.budget.financialYear.id}'==''){
			document.getElementById('hidden_year').value = document.getElementById('financialYear').value;
		} 
		
		
		if(document.getElementById('budgetDetail_budget').value==0 )
		{
			bootbox.alert("Select Budget");
			result=false;
		}
		
		 /* else if('${budgetDetail.budget.id}'==''){
			document.getElementById('hidden_budget').value = document.getElementById('budgetDetail_budget').value;
			
		}  */
		
		if(document.getElementById('budgetDetail_executingDepartment').value==0 )
		{
			bootbox.alert("select Department");
			result=false;
		
		}
		
		//bootbox.alert('${function.id}');
		/* if(document.getElementById('budgetDetail_filtered_function').value==0 )
		{
			bootbox.alert("Select Function");
			result=false;
		} */
		
		/*  if(document.getElementById('budgetDetail_filtered_function').value!=0){
			document.getElementById('hidden_function').value = document.getElementById('budgetDetail_filtered_function').value;
		}  */  
		
		return result;
	}
	/* if(document.getElementById('hidden_budget')!=null)
		 document.getElementById('hidden_budget').value = '${budgetDetail.budget.id}' */ 
	     
			 
	</script>
</head>
<body>
	<form:form name="budgetDetailForm" action="budgetProposalDetail"
		theme="simple" >
		<div align="left">
			<br />
			<div class="tabber">
				<div class="tabbertab">
					<h2>Search Details</h2>
					<span>
						<div>
							<input type="hidden" id="bere" value="re" />
							<jsp:include page="budgetHeader.jsp" />
							<%@ include file='budgetProposalDetailSetUp-re.jsp'%>

							<div class="formmainbox">
								<div class="subheadnew">Create budget proposal</div>
								<div align="center" style="color: red;">
									<!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</div>
								<%@ include file='budgetProposalDetail-form.jsp'%>
								<!-- TODO: Manual migration required for custom Struts tag -->
								
								<input type="hidden" id="re" value='${re}' />
								<table width="100%" border="0" cellspacing="0" cellpadding="0"
									id="budgetDetailFormTable">
									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td width="15%" class="bluebox">&nbsp;</td> 
										<td width="15%" class="bluebox"><s:text
												name="budgetdetail.budget.asOnDate" /></td>
										<td class="bluebox" width="20%"><input type="text"
											id="asOnDate" name="asOnDate" style="width: 100px"
											value='<!-- TODO: Manual migration required for custom Struts tag -->'
											onkeyup="DateFormat(this,this.value,event,false,'3')" readonly /><a tabindex="-1"
								href="javascript:show_calendar('budget.asOnDate');"
								style="text-decoration: none">&nbsp;(dd/mm/yyyy)
										</td>
										<td width="15%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
										<egov:ajaxdropdown id="function_filtered"
											fields="['Text','Value']"
											dropdownId="budgetDetail_filtered_function"
											url="budget/budgetProposalDetail-ajaxLoadFunctions.action" />
										<td class="bluebox"><form:select path="function.id"
												id="budgetDetail_filtered_function" list="%{functionList}"
												value="function.id" listKey="id" listValue="name"
												headerValue="---Select---" headerKey="0" /></td>
									</tr>
									<tr id="budgetGroup" style="display: none">
										<td width="15%" class="bluebox">&nbsp;</td>
										<td width="15%" class="bluebox"><s:text
												name="budgetdetail.budgetGroup" /></td>
										<egov:ajaxdropdown id="budgetgroup_filtered"
											fields="['Text','Value']"
											dropdownId="budgetDetail_filtered_budgetGroup"
											url="budget/budgetProposalDetail-ajaxLoadBudgetGroups.action" />
										<td class="bluebox" colspan="3"><form:select
												name="budgetGroup.id" id="budgetDetail_filtered_budgetGroup"
												list="%{budgetGroupList}" listKey="id" listValue="name"
												headerValue="---Select---" headerKey="0" /></td>
									</tr>

									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td align="center" colspan="5" class="bluebox"><div
												align="center">
												<input type="submit" value="Search" id="Search"
													name="method:loadBudgetDetailList"
													onclick="return search()" class="buttonsubmit" /> <input
													type="submit" id="budgetDetail__loadActualsForRe"
													onclick=" return getActuals()" value="Get Actuals"
													class="buttonsubmit" />
											</div></td>
									</tr>

								</table>
							</div>
					</span>
				</div>
				<!-- Individual tab -->
				<div class="tabbertab" id="budgetDetailTableTab">
					<h2>Budget Details</h2>
					<span> <br />
						<div class="yui-skin-sam" style="width: 100%;">
							<div id="budgetDetailTable"></div>
						</div> <script>
								makeBudgetDetailTable();
								document.getElementById('budgetDetailTable').getElementsByTagName('table')[0].width = "100%";
								addGridRows();
								hideColumns();
								updateAllGridValues()
								<c:if test="%{getActionErrors().size()>0 || getFieldErrors().size()>0}">
									setValues();
								</c:if>
							</script> <br /> <br /> 
						<!-- TODO: Manual migration required for custom Struts tag -->
                       <%--  <!-- TODO: Manual migration required for custom Struts tag --> --%>
                       <%--  <!-- TODO: Manual migration required for custom Struts tag --> --%>
                        
                        
						<div id="savedDataGrid"></div> <script>
								document.getElementById('hidden_budget').value = '${budgetDetail.budget.id}'
								</script>
					</span>
				</div>
<%-- <%@ include file='../workflow/commonWorkflowMatrix.jsp'%>
				<%@ include file='../workflow/commonWorkflowMatrix-button.jsp'%> --%>
				<%-- <div class="tabbertab">
					<h2>Approval Details</h2>
					<span> <!--  <input type="hidden" name="scriptName"
						id="scriptName" value="BudgetDetail.nextDesg" />  -->
						   <%@include
							file="../voucher/workflowApproval.jsp"%>   
							 <%@ include file='../workflow/commonWorkflowMatrix.jsp'%>
				<%@ include file='../workflow/commonWorkflowMatrix-button.jsp'%> 		
					</span>
				</div> --%>
				<!-- Individual tab -->
			</div>
		</div>
		<div class="buttonbottom"
			style="padding-bottom: 10px; position: relative">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<table style="width: 100%; text-align: center;">
		<tr>
			<td><c:forEach value="%{getValidActions()}" var="validAction">
					<c:if test="%{validAction!=''}">
						<s:submit type="submit" cssClass="buttonsubmit"
							value="%{validAction}" id="%{validAction}" name="%{validAction}"
							onclick="return validateWorkFlowApprover('%{validAction}','jsValidationErrors');" />
					</c:if>
				</c:forEach> <input type="button" name="button2" id="button2" value="Close"
				class="button" onclick="window.close();" /></td>
		</tr>
	</table>
			<%-- <input type="submit" value="Save" id="budgetDetail__createRe"
				name="method:createRe" onClick="javascript: return validate();"
				class="buttonsubmit" /> 
				<input type="submit" value="Forward"
				id="budgetDetail__createReAndForward"
				name="method:createReAndForward"
				onClick="javascript: return validateForApproval();"
				class="buttonsubmit" />
			<!-- <input type="submit" class="buttonsubmit" value="Upload Document" id="budgetDocUploadButton" onclick="showDocumentManager(this);return false;" /> -->
			<s:submit value="Close" onclick="javascript: self.close()"
				cssClass="button" /> --%>
		</div>


	</form:form>

</body>
</html>
