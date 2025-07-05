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


<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>
<head>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/contra.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
</head>
<script>
var callback = {
		success: function(o){
			document.getElementById('results').innerHTML=o.responseText;
			undoLoadingMask();
			},
			failure: function(o) {
				undoLoadingMask();
		    }
		}
function getData(){
	
	var asOnDate =  document.getElementById('asOnDate').value;
	var department = document.getElementById('executingDepartment').value;
	
	if(department ==-1){
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->")
		return false;
	}
	if(asOnDate ==''){
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->")
		return false;
	}
	var csrfToken = document.getElementById('csrfTokenValue').value;
	document.budgetVarianceReport.action='/services/EGF/report/budgetVarianceReport-loadData.action?asOnDate='+asOnDate+'&_csrf='+csrfToken;
	document.budgetVarianceReport.submit();  
	return true;
}

function exportXls(){
	var asOnDate =  document.getElementById('asOnDate').value;
	var departmentid =  document.getElementById('executingDepartment').value;
	var accountType =  document.getElementById('accountType').value;
	var budgetGroup =  document.getElementById('budgetGroup').value;
	var functionId =  document.getElementById('function').value;
	var fund = document.getElementById('fund').value;
	window.location = '/services/EGF/report/budgetVarianceReport-exportXls.action?asOnDate='+asOnDate+'&accountType='+accountType+
			'&budgetDetail.budgetGroup.id='+budgetGroup+'&budgetDetail.fund.id='+fund+'&budgetDetail.executingDepartment='
			+departmentid+'&budgetDetail.function.id='+functionId,'','resizable=yes,height=650,width=900,scrollbars=yes,left=30,top=30,status=no';
}

function exportPdf(){
	var asOnDate =  document.getElementById('asOnDate').value;
	var departmentid =  document.getElementById('executingDepartment').value;
	var accountType =  document.getElementById('accountType').value;
	var budgetGroup =  document.getElementById('budgetGroup').value;
	var functionId =  document.getElementById('function').value;
	var fund = document.getElementById('fund').value;
	window.location = '/services/EGF/report/budgetVarianceReport-exportPdf.action?asOnDate='+asOnDate+'&accountType='+accountType+
			'&budgetDetail.budgetGroup.id='+budgetGroup+'&budgetDetail.fund.id='+fund+'&budgetDetail.executingDepartment='
			+departmentid+'&budgetDetail.function.id='+functionId,'','resizable=yes,height=650,width=900,scrollbars=yes,left=30,top=30,status=no';
}

function validateData(){
	var asOnDate =  Date.parse(document.getElementById('asOnDate').value);
	if(asOnDate == ''){
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->")
		return false;
	}
	<c:if test="%{isFieldMandatory('executingDepartment')}">
		if(!checkMandatoryField("executingDepartment"))
			return false;
	</c:if>
	<c:if test="%{isFieldMandatory('function')}">
		if(!checkMandatoryField("function"))
			return false;
	</c:if>
	<c:if test="%{isFieldMandatory('fund')}">
		if(!checkMandatoryField("fund"))
			return false;
	</c:if>
	<c:if test="%{isFieldMandatory('functionary')}">
		if(!checkMandatoryField("functionary"))
			return false;
	</c:if>
	<c:if test="%{isFieldMandatory('scheme')}">
		if(!checkMandatoryField("scheme"))
			return false;
	</c:if>
	<c:if test="%{isFieldMandatory('subScheme')}">
		if(!checkMandatoryField("subScheme"))
			return false;
	</c:if>
	<c:if test="%{isFieldMandatory('boundary')}">
		if(!checkMandatoryField("boundary"))
			return false;
	</c:if>
	return true;	
}

function checkMandatoryField(fieldName){
	var field = document.getElementById(fieldName);
	if(field.value == -1){
		bootbox.alert("Please select a "+fieldName)
		return false;
	}
	return true;
}
function resetSubmit()
{
	document.getElementById('asOnDate').value="";
	document.getElementById('executingDepartment').value="";
	document.getElementById('accountType').value="";
	document.getElementById('budgetGroup').value="";
	document.getElementById('function').value="";
	document.getElementById('fund').value="";
	}
</script>
<body>
	<div class="formmainbox">
		<div class="formheading"></div>
		<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
		<h5 style="color: red">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</h5>
		<form:form action="budgetVarianceReport" theme="simple"
			name="budgetVarianceReport">
			<input type="hidden" id="csrfTokenValue" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<table width="100%" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<c:if test="%{isFieldMandatory('executingDepartment')}">
						<td class="bluebox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> :<span
							class="mandatory1">*</span></td>
						<td class="bluebox"><form:select path="executingDepartment"
								id="executingDepartment" list="dropdownData.departmentList"
								listKey="code" listValue="name" headerKey="-1"
								value="%{budgetDetail.executingDepartment}"
								headerValue="%{getText('lbl.choose.options')}" /></td>
					</c:if>
					<c:if test="%{isFieldMandatory('function')}">
						<td class="bluebox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> :</td>
						<td class="bluebox"><form:select path="function" id="function"
								value="%{budgetDetail.function.id}"
								list="dropdownData.functionList" listKey="id" listValue="name"
								headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
					</c:if>
				</tr>
				<tr>
					<c:if test="%{isFieldMandatory('fund')}">
						<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag -->:</td>
						<td class="greybox"><form:select path="fund" id="fund"
								value="%{budgetDetail.fund.id}" list="dropdownData.fundList"
								listKey="id" listValue="name" headerKey="-1"
								headerValue="%{getText('lbl.choose.options')}" /></td>
					</c:if>
					<c:if test="%{isFieldMandatory('functionary')}">
						<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag -->:<span
							class="mandatory1">*</span></td>
						<td class="greybox"><form:select path="functionary"
								id="functionary" list="dropdownData.functionaryList"
								listKey="id" listValue="name" headerKey="-1"
								headerValue="%{getText('lbl.choose.options')}" /></td>
					</c:if>
					<c:otherwise>
						<td class="greybox">&nbsp;</td>
						<td class="greybox">&nbsp;</td>
					</s:else>
				</tr>
				<tr>
					<c:if test="%{isFieldMandatory('scheme')}">
						<td width="10%" class="bluebox">&nbsp;</td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->:<span
							class="mandatory1">*</span></td>
						<td class="bluebox"><form:select list="dropdownData.schemeList"
								listKey="id" listValue="name" headerKey="0"
								headerValue="%{getText('lbl.choose.options')}" name="scheme"
								onchange="updateGrid('scheme.id',document.getElementById('budgetDetail_scheme').selectedIndex);populateSubSchemes(this);"
								value="scheme.id" id="budgetDetail_scheme"></form:select></td>
					</c:if>
					<c:if test="%{isFieldMandatory('subScheme')}">
						<egov:ajaxdropdown id="subScheme" fields="['Text','Value']"
							dropdownId="budgetDetail_subScheme"
							url="budget/budgetDetail-ajaxLoadSubSchemes.action"
							afterSuccess="onHeaderSubSchemePopulation" />
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->:<span
							class="mandatory1">*</span></td>
						<td class="bluebox"><form:select
								list="dropdownData.subschemeList" listKey="id" listValue="name"
								headerKey="0" headerValue="%{getText('lbl.choose.options')}" name="subScheme"
								onchange="updateGrid('subScheme.id',document.getElementById('budgetDetail_subScheme').selectedIndex)"
								value="subScheme.id" id="budgetDetail_subScheme"></form:select></td>
					</c:if>
				</tr>
				<tr>
					<c:if test="%{isFieldMandatory('boundary')}">
						<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->:<span
							class="mandatory1">*</span></td>
						<td class="greybox"><form:select list="dropdownData.fieldList"
								listKey="id" listValue="name" headerKey="0"
								headerValue="%{getText('lbl.choose.options')}" name="boundary"
								onchange="updateGrid('boundary.id',document.getElementById('budgetDetail_boundary').selectedIndex)"
								value="boundary.id" id="budgetDetail_boundary"></form:select></td>
					</c:if>
				</tr>
				<tr>
					<td class="bluebox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> :</td>
					<td class="bluebox"><form:select path="accountType"
							id="accountType" list="dropdownData.accountTypeList"
							headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
					<td class="bluebox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> :</td>
					<td class="bluebox"><form:select path="budgetGroup"
							value="%{budgetGroup.id}" id="budgetGroup"
							list="dropdownData.budgetGroupList" listKey="id" listValue="name"
							headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
				</tr>
				<tr>
					<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> :<span
						class="mandatory1">*</span></td>

					<td class="greybox"><s:date name="asOnDate" var="asOnDateId"
							format="dd/MM/yyyy" /> <form:input id="asOnDate"
							name="asOnDate" value="%{asOnDateId}"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>
					<td class="greybox">&nbsp;</td>
					<td class="greybox">&nbsp;</td>
				</tr>
			</table>


			<br />
			<br />
			<div class="buttonbottom">
				<input type="submit" value="<!-- TODO: Manual migration required for custom Struts tag -->" class="buttonsubmit"
					onclick="return getData();" /> &nbsp <input name="button"
					type="submit" class="button" id="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
					onclick="resetSubmit();" /> <input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
					onclick="window.parent.postMessage('close','*');window.close();" class="button" />
			</div>
	</div>

	</form:form>

	<div id="results"><jsp:include
			page="./budgetVarianceReport-results.jsp"></jsp:include>

	</div>

</body>
</html>
