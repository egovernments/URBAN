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
<%@ page import="org.egov.budget.model.*"%>
<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<link rel="stylesheet" href="/services/EGF/resources/css/tabber.css?rnd=${app_release_no}"
	TYPE="text/css">
<script type="text/javascript" src="/services/EGF/resources/javascript/tabber.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/tabber2.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/calenderNew.js?rnd=${app_release_no}"></script>
<STYLE type="text/css">
.yui-dt-liner {
	text-align: right;
}
</STYLE>
</head>
<body>
	<%@ include file='common-includes.jsp'%>
	<jsp:include page="budgetHeader.jsp" />
	<script>
		function validateAmount(){
				invalidAmount = false;
				for(i=0;i<budgetDetailsTable.getRecordSet().getLength();i++){
					if(isNaN(document.getElementById('savedBudgetReAppropriationList['+i+'].deltaAmount').value)){
						invalidAmount = true;
						invalidMessage = 'Addition/Deduction amount must be a number';
					}
					if(document.getElementById('savedBudgetReAppropriationList['+i+'].deltaAmount').value == 0){
						invalidAmount = true;
						invalidMessage = 'Addition/Deduction amount must be greater than 0';
					}
				}				
				if(invalidAmount == true){
					bootbox.alert(invalidMessage);
					return false;	
				}
				return true;
			}
		var callback = {
				     success: function(o) {
						document.getElementById('beReGrid').innerHTML = o.responseText;
						element = document.getElementById('isBeRe');
						if(document.getElementById('newBeRe').value == 'RE')
							element.selectedIndex = 1;
						else
							element.selectedIndex = 0;
				        },
				     failure: function(o) {
				     }
			} 
		var deleteCallback = {
			     success: function(o) {
					document.getElementById('deleted').innerHTML = o.responseText;
					element = document.getElementById('deleted');
					if(document.getElementById('deleteGrid').value == 'true')
						bootbox.alert("Re Appropriation deleted successfully");
					else
						bootbox.alert("Re Appropriation could not be deleted");
			        },
			     failure: function(o) {
			     }
		} 
			function getBeRe(){
				element = document.getElementById('financialYear')
				id = element.options[element.selectedIndex].value;
				var transaction = YAHOO.util.Connect.asyncRequest('GET', 'budgetReAppropriation!ajaxLoadBeRe.action?id='+id, callback, null);
			}
			function deleteBudgetReAppropriation(seqNo,id){
				var transaction = YAHOO.util.Connect.asyncRequest('GET', 'budgetReAppropriationModify!ajaxDeleteBudgetReAppropriation.action?id='+id+'&sequenceNumber='+seqNo, deleteCallback, null);
			}
			function populateSubSchemes(scheme){
				populatebudgetReAppropriation_subScheme({schemeId:scheme.options[scheme.selectedIndex].value})
			}
			
			function onHeaderSubSchemePopulation(req,res){
				if(budgetDetailsTable != null){
					headerSubScheme=dom.get('budgetReAppropriation_subScheme');
					pattern = 'budgetDetailList[{index}].subScheme.id'
					processGrid(budgetDetailsTable,function(element,grid){
						if(element) copyOptions(headerSubScheme,element)
					},pattern)
				}
				if(typeof preselectSubScheme=='function') preselectSubScheme()
		    }
			function validateMandatoryFields(){
				if(document.getElementById('financialYear').value==0){
					bootbox.alert('Please select a Financial year');
					return false;
				}
				return true;
			}
			function validateForApproval(){
				if(null != document.getElementById("approverUserId") && document.getElementById("approverUserId").value == -1){
					bootbox.alert("Please select User");
					return false;
				}
				return validateAmount();
			}
		</script>
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->

		<form:form name="budgetReAppropriationForm"
			action="budgetReAppropriationModify" theme="simple">
			<div class="formmainbox">
				<div class="formheading"></div>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="10%" class="bluebox">&nbsp;</td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="mandatory">*</span></td>
						<td class="bluebox"><form:select list="dropdownData.finYearList"
								listKey="id" listValue="finYearRange" name="financialYear.id"
								value="financialYear.id" id="financialYear" headerKey="0"
								headerValue="--- Select ---"></form:select></td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
						<td class="bluebox"><form:select path="isBeRe" id="isBeRe"
								list="#{'BE':'BE','RE':'RE'}" value="beRe" /></td>
					</tr>
					<tr>
						<c:if test="%{shouldShowHeaderField('fund')}">
							<td class="greybox">&nbsp;</td>
							<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
									test="%{isFieldMandatory('fund')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td class="greybox"><form:select list="dropdownData.fundList"
									listKey="id" listValue="name" name="budgetDetail.fund.id"
									headerKey="0" headerValue="--- Select ---" value="fund.id"
									id="budgetReAppropriation_fund"></form:select></td>
						</c:if>
						<c:if test="%{shouldShowHeaderField('executingDepartment')}">
							<td class="greybox">&nbsp;</td>
							<td class="greybox"><s:text
									name="budgetdetail.executingDepartment" /> <c:if
									test="%{isFieldMandatory('executingDepartment')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td width="22%" class="greybox"><form:select
									list="dropdownData.executingDepartmentList" listKey="id"
									listValue="deptName" name="budgetDetail.executingDepartment.id"
									headerKey="0" headerValue="--- Select ---"
									value="budgetDetail.executingDepartment.id"
									id="budgetReAppropriation_executingDepartment"></form:select></td>
						</c:if>
					</tr>
					<tr>
						<c:if test="%{shouldShowField('function')}">
							<td class="bluebox">&nbsp;</td>
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->
								<c:if test="%{isFieldMandatory('function')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td class="bluebox"><form:select
									list="dropdownData.functionList" listKey="id" listValue="name"
									name="budgetDetail.function.id" headerKey="0"
									headerValue="--- Select ---" value="function.id"
									id="budgetReAppropriation_function"></form:select></td>
						</c:if>
						<c:if test="%{shouldShowHeaderField('functionary')}">
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->
								<c:if test="%{isFieldMandatory('functionary')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td class="bluebox"><form:select
									list="dropdownData.functionaryList" listKey="id"
									listValue="name" headerKey="0" headerValue="--- Select ---"
									name="budgetDetail.functionary.id" value="functionary.id"
									id="budgetReAppropriation_functionary"></form:select></td>
						</c:if>
					</tr>
					<tr>
						<c:if test="%{shouldShowHeaderField('scheme')}">
							<td width="10%" class="bluebox">&nbsp;</td>
							<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
									test="%{isFieldMandatory('scheme')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td class="greybox"><form:select list="dropdownData.schemeList"
									listKey="id" listValue="name" headerKey="0"
									headerValue="--- Select ---" name="budgetDetail.scheme.id"
									onchange="populateSubSchemes(this);" value="scheme.id"
									id="budgetReAppropriation_scheme"></form:select></td>
						</c:if>
						<c:if test="%{shouldShowHeaderField('subScheme')}">
							<egov:ajaxdropdown id="subScheme" fields="['Text','Value']"
								dropdownId="budgetReAppropriation_subScheme"
								url="budget/budgetDetail!ajaxLoadSubSchemes.action"
								afterSuccess="onHeaderSubSchemePopulation" />
							<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->
								<c:if test="%{isFieldMandatory('subScheme')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td class="greybox"><form:select
									list="dropdownData.subSchemeList" listKey="id" listValue="name"
									headerKey="0" headerValue="--- Select ---"
									name="budgetDetail.subScheme" value="subScheme.id"
									id="budgetReAppropriation_subScheme"></form:select></td>
						</c:if>

					</tr>
					<tr>
						<c:if test="%{shouldShowHeaderField('boundary')}">
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
									test="%{isFieldMandatory('boundary')}">
									<span class="mandatory">*</span>
								</c:if></td>
							<td class="bluebox"><form:select
									list="dropdownData.boundaryList" listKey="id" listValue="name"
									headerKey="0" headerValue="--- Select ---"
									name="budgetDetail.boundary.id" value="boundary.id"
									id="budgetReAppropriation_boundary"></form:select></td>
						</c:if>
						<c:otherwise>
							<td class="bluebox">&nbsp;</td>
							<td class="bluebox">&nbsp;</td>
						</s:else>
					</tr>
				</table>
			</div>
			<script>
<c:if test="%{shouldShowField('scheme') and shouldShowField('subScheme')}">
populateSubSchemes(document.getElementById('budgetReAppropriation_scheme'))
function preselectSubScheme(){
	subSchemes =  document.getElementById('budgetReAppropriation_subScheme');
	selectedValue="<!-- TODO: Manual migration required for custom Struts tag -->"
	for(i=0;i<subSchemes.options.length;i++){
	  if(subSchemes.options[i].value==selectedValue){
		subSchemes.selectedIndex=i;
		break;
	  }
	}
	updateGridForTable('subScheme.id',document.getElementById('budgetReAppropriation_subScheme').selectedIndex);
}
</c:if>
</script>
			<div class="buttonbottom" style="padding-bottom: 10px;">
				<input type="submit" value="Search"
					id="budgetReAppropriationModify__list" name="method:list"
					onClick="javascript: return validateMandatoryFields();"
					class="buttonsubmit" />
				<s:submit value="Close" onclick="javascript: self.close()"
					cssClass="button" />
			</div>
			<br />
			<br />
			<c:if test="%{not savedBudgetReAppropriationList.empty}">
				<div align="left">
					<br />
					<div class="tabber">
						<div class="tabbertab">
							<h2>Budget Details</h2>
							<span>
								<div class="yui-skin-sam"
									style="width: 100%; overflow-x: auto; overflow-y: hidden;">
									<div id="budgetDetailTable"></div>
									<br />
								</div> <script>
							var BUDGETDETAILLIST='savedBudgetReAppropriationList';
							function addGridRows(){
								<c:forEach value="savedBudgetReAppropriationList" status="stat">
									budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1,
										"budgetDetail.id":'${budgetDetail.id}',
										"budgetDetail.budgetGroup.name":'${budgetDetail.budgetGroup.name}',
										<c:if test="%{shouldShowField('executingDepartment')}">				
											"budgetDetail.executingDepartment.deptName":'${budgetDetail.executingDepartment.deptName}',
										</c:if>
										<c:if test="%{shouldShowField('functionary')}">				
											"budgetDetail.functionary.name":'${budgetDetail.functionary.name}',
										</c:if>
										<c:if test="%{shouldShowField('function')}">				
											"budgetDetail.function.name":'${budgetDetail.function.name}',
										</c:if>
										<c:if test="%{shouldShowField('scheme')}">				
											"budgetDetail.scheme.name":'${budgetDetail.scheme.name}',
										</c:if>
										<c:if test="%{shouldShowField('subScheme')}">				
											"budgetDetail.subScheme.name":'${budgetDetail.subScheme.name}',
										</c:if>
										<c:if test="%{shouldShowField('fund')}">				
											"budgetDetail.fund.name":'${budgetDetail.fund.name}',
										</c:if>
										<c:if test="%{shouldShowField('boundary')}">				
											"budgetDetail.boundary.name":'${budgetDetail.boundary.name}',
										</c:if>
										"sequenceNumber":'${sequenceNumber}',
										"approved":'${approvedAmount}',
										"appropriation":'${appropriatedAmount}',
										"actuals":'${actuals}',
										"available":'${availableAmount}',
										"changeRequestType":'${changeRequestType}',
										"amount":'${deltaAmount}',
										<c:if test="%{enableApprovedAmount}">
										"approved_amount":'${approvedDeltaAmount}'
										</c:if>
									});
								</c:forEach>
							}
						
						
							var makeBudgetDetailTable = function() {
								var budgetDetailColumns = [ 
									{key:"budgetDetail.id",label:'',hidden:true,formatter:getReadOnlyTextFieldFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.id')},		                   		
									{key:"budgetDetail.budgetGroup.name",label:'Budget Group',width:150,sortable:true, formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.budgetGroup.name')},
									<c:if test="%{shouldShowField('executingDepartment')}">				
										{key:"budgetDetail.executingDepartment.deptName", label:'Executing Department',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.executingDepartment.deptName')},				
									</c:if>
									<c:if test="%{shouldShowField('functionary')}">				
										{key:"budgetDetail.functionary.name",label:'Functionary',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.functionary.name')} ,
									</c:if>
									<c:if test="%{shouldShowField('function')}">				
										{key:"budgetDetail.function.name",label:'Function',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.function.name')} ,
									</c:if>
									<c:if test="%{shouldShowField('scheme')}">				
										{key:"budgetDetail.scheme.name",label:'Scheme',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.scheme.name')} ,
									</c:if>
									<c:if test="%{shouldShowField('subScheme')}">				
										{key:"budgetDetail.subScheme.name",label:'Sub Scheme',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.subScheme.name')} ,
									</c:if>
									<c:if test="%{shouldShowField('fund')}">				
										{key:"budgetDetail.fund.name",label:'Fund',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.fund.name')} ,
									</c:if>
									<c:if test="%{shouldShowField('boundary')}">				
										{key:"budgetDetail.boundary.name",label:'Field',width:90,sortable:true,formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.budgetDetail.boundary.name')} ,
									</c:if>
									{key:"sequenceNumber",label:'Sequence Number',width:120, sortable:true,formatter:getReadOnlyTextFieldFormatter('budgetDetailsTable',BUDGETDETAILLIST,".sequenceNumber")},
									{key:"approved",label:'Sanctioned Budget(Rs)',width:125, formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,".approvedAmount")},
									{key:"appropriation",label:'Added/Released(Rs)',width:120, formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,".approvedAmount")},
									{key:"actuals",label:'Expenditure Incurred(Rs)',width:135, formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,".actuals")},
									{key:"available",label:'Balance Available(Rs)',width:125, formatter:getLabelFormatter('budgetDetailsTable',BUDGETDETAILLIST,".availableAmount")},
									{key:"changeRequestType",label:'Change Requested',width:105,formatter:getReadOnlyTextFieldFormatter('budgetDetailsTable',BUDGETDETAILLIST,'.changeRequestType')} ,
									{key:"amount",label:'Addition/Deduction<br/>Amount(Rs)',width:"50em", formatter:createTextFieldFormatterWithOnBlur('budgetDetailsTable',BUDGETDETAILLIST,".deltaAmount")},
									<c:if test="%{enableApprovedAmount}">
									{key:"approved_amount",label:'Approved Addition/<br/>Deduction Amount(Rs)',width:"50em", formatter:createTextFieldFormatterWithOnBlur('budgetDetailsTable',BUDGETDETAILLIST,".approvedDeltaAmount")},
									</c:if>
									{key:'Delete',label:'Delete',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
								];
							    var budgetDetailDS = new YAHOO.util.DataSource(); 
								budgetDetailsTable = new YAHOO.widget.DataTable("budgetDetailTable",budgetDetailColumns, budgetDetailDS);	
								budgetDetailsTable.on('cellClickEvent',function (oArgs) {
									var target = oArgs.target;
									var record = this.getRecord(target);
									var column = this.getColumn(target);
									if (column.key == 'Add') { 
										budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1});
									}
									if (column.key == 'Delete') { 			
										this.deleteRow(record);
										allRecords=this.getRecordSet();
										for(i=0;i<allRecords.getLength();i++){
											this.updateCell(this.getRecord(i),this.getColumn('SlNo'),""+(i+1));
										}
										deleteBudgetReAppropriation(record.getData('sequenceNumber'),record.getData('budgetDetail.id'));
									}        
								});
							}
							makeBudgetDetailTable();
							addGridRows();
						</script>
							</span>
						</div>
						<!-- Individual tab -->
						<div class="tabbertab">
							<h2>Approval Details</h2>
							<span> <input type="hidden" name="scriptName"
								id="scriptName" value="BudgetDetail.nextDesg" /> <%@include
									file="../voucher/workflowApproval.jsp"%>
							</span>
						</div>
						<!-- Individual tab -->
					</div>
				</div>
				<div class="buttonbottom" style="padding-bottom: 10px">
					<!-- TODO: Manual migration required for custom Struts tag -->
					<input type="submit" value="Update"
						id="budgetReAppropriationModify__update" name="method:update"
						onClick="javascript: return validateAmount();"
						class="buttonsubmit" /> <input type="submit" value="Forward"
						id="budgetReAppropriationModify__forward" name="method:forward"
						onClick="javascript: return validateForApproval();"
						class="buttonsubmit" />
					<s:submit value="Close" onclick="javascript: self.close()"
						cssClass="button" />
				</div>
			</c:if>

			<c:if test='%{message != ""}'>
				<div class="error">
					${message}
				</div>
			</c:if>
			<div id="beReGrid"></div>
		</form:form>
</body>
</html>
