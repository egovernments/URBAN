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
<title><c:if test="showMode == 'new'">
		<!-- TODO: Manual migration required for custom Struts tag -->
	</c:if> <c:otherwise>
		<!-- TODO: Manual migration required for custom Struts tag -->
	</s:else></title>
<SCRIPT type="text/javascript">
	function validate() {
		if (!validateForm_subSchemeForm()) {
			undoLoadingMask();
			return false;
		}
		if (!validateDate(document.getElementById('validfrom').value)) {
			bootbox
					.alert("Invalid Date! valid from date is greater than current date");
			return false;
		} else if (Date.parse(document.getElementById('validfrom').value) > Date
				.parse(document.getElementById('validtoId').value)) {
			bootbox
					.alert("Invalid Date Range! valid from date cannot be after valid to date!")
			return false;
		}
		if (isNaN(document.getElementById('initialEstimateAmount').value)) {
			bootbox.alert("Please enter valid Initial Estimate Amount");
			return false;
		}
		var showMode = document.getElementById('showMode').value;
		if (showMode == 'edit')
			var url = '/services/EGF/masters/subScheme-edit.action';
		else
			var url = '/services/EGF/masters/subScheme-create.action';
		document.subSchemeForm.action = url;
		jQuery(subSchemeForm).append(
                jQuery('<input>', {
                    type: 'hidden',
                    name: '${_csrf.parameterName}',
                    value: '${_csrf.token}'
                })
            );
		document.subSchemeForm.submit();
		return true;
	}
	function validateDate(date) {
		var todayDate = new Date();
		var todayMonth = todayDate.getMonth() + 1;
		var todayDay = todayDate.getDate();
		var todayYear = todayDate.getFullYear();
		var todayDateText = todayDay + "/" + todayMonth + "/" + todayYear;
		if (Date.parse(date) > Date.parse(todayDateText)) {
			return false;
		}
		return true;
	}

	function checkuniquenesscode() {
		document.getElementById('codeuniquecode').style.display = 'none';
		var code = document.getElementById('code').value;
		populatecodeuniquecode({
			code : code
		});
	}

	function checkuniquenessname() {
		document.getElementById('uniquename').style.display = 'none';
		var name = document.getElementById('name').value;
		populateuniquename({
			name : name
		});
	}
</script>

</head>
<body>
	<jsp:include page="../budget/budgetHeader.jsp" />
	<div class="formmainbox">
		<div class="subheadnew">
			<c:if test="showMode == 'new'">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</c:if>
			<c:otherwise>
				<!-- TODO: Manual migration required for custom Struts tag -->
			</s:else>
			<div style="color: red" align="left">
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<div style="color: green" align="left">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<div style="color: red" align="left">
			</br>
				<div class="errorstyle" style="display: none" id="codeuniquecode">
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>
				<div class="errorstyle" style="display: none" id="uniquename">
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>
			</div>
			<!-- TODO: Manual migration required for custom Struts tag -->

			<form:form id="subSchemeForm" name="subSchemeForm" action="subScheme"
				theme="css_xhtml" validate="true">

				<!-- TODO: Manual migration required for custom Struts tag -->
				<s:hidden id="subSchemeId" name="subSchemeId"
					value="%{subScheme.id}" />
					
					</br>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td class="bluebox">&nbsp;</td>
						<td class="bluebox" width="20%"><strong><!-- TODO: Manual migration required for custom Struts tag --><span
								class="mandatory1"> *</span></strong></td>
						<td class="bluebox"><form:select path="schemeId" id="scheme"
								list="dropdownData.schemeList" listKey="id" listValue="name"
								headerKey="" headerValue="%{getText('lbl.choose.options')}"
								value="%{subScheme.scheme.id}" /></td>
						<td class="bluebox" width="20%"><strong><!-- TODO: Manual migration required for custom Struts tag --><span
								class="mandatory1"> *</span></strong></td>
						<%-- <c:if test="showMode == 'new'"> --%>
						<td class="bluebox"><form:input id="name" path="name"
								value="%{subScheme.name}" cssStyle="width: 250px"
								onblur="checkuniquenessname();" /></td>
						<egov:uniquecheck id="uniquename" name="uniquename"
							fieldtoreset="name" fields="['Value']"
							url='masters/subScheme-nameUniqueCheck.action' />

					</tr>
					<tr>
						<td class="greybox">&nbsp;</td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --></strong><span
							class="mandatory1"> *</span></td>
						<%-- <c:if test="showMode == 'new'"> --%>
						<td class="greybox"><form:input id="code" path="code"
								value="%{subScheme.code}" onblur="checkuniquenesscode();" /></td>
						<egov:uniquecheck id="codeuniquecode" name="codeuniquecode"
							fieldtoreset="code" fields="['Value']"
							url='masters/subScheme-codeUniqueCheck.action' />

						<td class="greybox"><strong>Active</strong></td>
						<td class="greybox"><form:checkbox id="isactive" path="isactive"
								value="%{subScheme.isactive}" /></td>

						
					</tr>
					<tr>
						<td class="bluebox">&nbsp;</td>
						
						<td class="bluebox"><strong><!-- TODO: Manual migration required for custom Struts tag --></strong><span
							class="mandatory1"> *</span></td>
						<td class="bluebox"><s:date name="subScheme.validfrom"
								var="validfromId" format="dd/MM/yyyy" /> <form:input
								id="validfrom" name="validfrom" value="%{validfromId}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
								<td class="bluebox"><strong><!-- TODO: Manual migration required for custom Struts tag --></strong><span
							class="mandatory1"> *</span></td>
						<td class="bluebox"><s:date name="subScheme.validto"
								var="validtoId" format="dd/MM/yyyy" /> <form:input
								id="validtoId" name="validto" value="%{validtoId}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
						
						
					</tr>
					<tr>
						<td class="greybox">&nbsp;</td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="greybox"><form:select
								list="dropdownData.departmentList" listKey="code" listValue="name"
								headerKey="0" headerValue="%{getText('lbl.choose.options')}" name="department"
								id="department" value="%{subScheme.department}"></form:select></td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="greybox"><form:input
								cssStyle="text-align: right;" id="initialEstimateAmount"
								name="initialEstimateAmount"
								value="%{subScheme.initialEstimateAmount}"
								onkeypress='return event.charCode >= 48 && event.charCode <= 57' /></td>
					</tr>
					<tr>
						<td class="bluebox">&nbsp;</td>
						<td class="bluebox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="bluebox"><form:input
								id="councilLoanProposalNumber" name="councilLoanProposalNumber"
								value="%{subScheme.councilLoanProposalNumber}" /></td>
						<td class="bluebox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="bluebox"><s:date
								name="subScheme.councilLoanProposalDate"
								var="councilLoanProposalDateId" format="dd/MM/yyyy" /> <form:input
								id="subScheme.councilLoanProposalDate"
								name="councilLoanProposalDate"
								value="%{councilLoanProposalDateId}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
					</tr>
					<tr>
						<td class="greybox">&nbsp;</td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="greybox"><form:input
								id="councilAdminSanctionNumber"
								name="councilAdminSanctionNumber"
								value="%{subScheme.councilAdminSanctionNumber}" /></td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="greybox"><s:date
								name="subScheme.councilAdminSanctionDate"
								var="councilAdminSanctionDateId" format="dd/MM/yyyy" />
							<form:input id="councilAdminSanctionDate"
								name="councilAdminSanctionDate"
								value="%{councilAdminSanctionDateId}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
					</tr>
					<tr>
						<td class="bluebox">&nbsp;</td>
						<td class="bluebox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="bluebox"><form:input id="govtLoanProposalNumber"
								name="govtLoanProposalNumber"
								value="%{subScheme.govtLoanProposalNumber}" /></td>
						<td class="bluebox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="bluebox"><s:date
								name="subScheme.govtLoanProposalDate"
								var="govtLoanProposalDateId" format="dd/MM/yyyy" />
							<form:input id="govtLoanProposalDate"
								name="govtLoanProposalDate" value="%{govtLoanProposalDateId}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
					</tr>
					<tr>
						<td class="greybox">&nbsp;</td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="greybox"><form:input id="govtAdminSanctionNumber"
								name="govtAdminSanctionNumber"
								value="%{subScheme.govtAdminSanctionNumber}" /></td>
						<td class="greybox"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						<td class="greybox"><s:date
								name="subScheme.govtAdminSanctionDate"
								var="govtAdminSanctionDateId" format="dd/MM/yyyy" /> <form:input
								id="govtAdminSanctionDate" name="govtAdminSanctionDate"
								value="%{govtAdminSanctionDateId}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
					</tr>
				</table>
				<br />
				<br />

				<c:if test="%{showMode=='new'}">
					<div align="center" class="buttonbottom"
						style="padding-bottom: 10px;">
						<input type="submit" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							id="saveButton" name="button" onclick="return validate();" /> 
							<input type="reset" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							id="resetButton" name="button" onclick="return resetSubmit();" /> <input
							type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="javascript:window.close()" class="button" />
					</div>
				</c:if>
				<!-- TODO: Manual migration required for custom Struts tag -->
					<div class="buttonbottom" style="padding-bottom: 10px;">
						<input type="submit" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							id="saveButton" name="button" onclick="return validate();" /> <input
							type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="javascript:window.close()" class="button" />
					</div>
				</s:elseif>
				<c:otherwise>
					<div class="buttonbottom" style="padding-bottom: 10px;">
						<input type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="javascript:window.parent.postMessage('close','*');window.close();" class="button" />
						</dev>
				</s:else>
			</form:form>
			<script type="text/javascript">
				function resetSubmit()
				{
					document.getElementById('scheme').value = 0;
					document.getElementById('department').value = 0;
					document.getElementById('name').value = "";
					document.getElementById('code').value = "";
					document.getElementById('validfrom').value = "";
					document.getElementById('validto').value = "";
					document.getElementById('initialEstimateAmount').value = "";
					
					document.getElementById('councilLoanProposalNumber').value = "";
					document.getElementById('councilLoanProposalDate').value = "";
					document.getElementById('councilAdminSanctionNumber').value = "";
					document.getElementById('councilAdminSanctionDate').value = "";
					document.getElementById('govtLoanProposalNumber').value = "";
					document.getElementById('govtLoanProposalDate').value = "";
					document.getElementById('govtAdminSanctionNumber').value = "";
					document.getElementById('govtAdminSanctionDate').value = "";
				}
			</script>
</body>
</html>
