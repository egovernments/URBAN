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
<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script type="text/javascript">
	function validate() {
		if (document.getElementById('model.name').value == null
				|| document.getElementById('model.name').value == '') {
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		if (document.getElementById('newGlcode').value == null
				|| document.getElementById('newGlcode').value == '') {
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		document.chartOfAccountsForm.action = '${pageContext.request.contextPath}/masters/chartOfAccounts-save.action';
		jQuery(chartOfAccountsForm).append(jQuery('<input>', {
            type : 'hidden',
            name : '${_csrf.parameterName}',
            value : '${_csrf.token}'
        }));
		document.chartOfAccountsForm.submit();

		return true;
	}
</script>
</head>
<body>
	<jsp:include page="../budget/budgetHeader.jsp" />
	<!-- TODO: Manual migration required for custom Struts tag -->
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
		<form:form name="chartOfAccountsForm" action="chartOfAccounts"
			id="chartOfAccountsForm" theme="simple">
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				id="chartOfAccountsTable">
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.accountCode" />:<span class="mandatory1">*</span></strong></td>
					<td width="22%" class="bluebox"><input type="text"
						readonly="readonly" name="generatedGlcode" id="generatedGlcode"
						size="10" value='${generatedGlcode}' /> <input
						type="text" name="newGlcode" id="newGlcode" size="5"
						maxlength='${glCodeLengths[model.classification]}'
						value='${newGlcode}' /></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.name" />:<span class="mandatory1">*</span></strong></td>
					<td class="bluebox"><input type="text" id="model.name"
						name="model.name" onKeyDown="textCounter('model.name',100)"
						onKeyUp="textCounter('model.name',100)"
						onblur="textCounter('model.name',100)" /></td>
				</tr>
				<tr>
					<td width="20%" class="greybox">&nbsp;</td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.description" />:</strong></td>
					<td width="22%" class="greybox"><input type="text"
						id="model.desc" name="model.desc"
						onKeyDown="textCounter('model.desc',250)"
						onKeyUp="textCounter('model.desc',250)"
						onblur="textCounter('model.desc',250)" /></td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.type" />:</strong></td>
					<td class="greybox"><input type="text" name="type"
						value='${model.type}' id="chartOfAccounts_type"
						style="border: 0px;" readOnly="true" /></td>
				</tr>
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.classification" />:</strong></td>
					<td width="22%" class="bluebox"><input type="text"
						name="model.classification"
						value='${model.classification}'
						style="border: 0px;" /></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.purpose" />:</strong></td>
					<td class="bluebox"><form:select list="dropdownData.purposeList"
							listKey="id" listValue="name" name="accountcodePurpose.id" headerKey="0"
							headerValue="%{getText('lbl.choose.options')}" value="accountcodePurpose.id"></form:select></td>
				</tr>
				<tr>
					<td width="20%" class="greybox">&nbsp;</td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.accountDetailType" />:</strong></td>
					<td width="22%" class="greybox"><form:select
							list="dropdownData.accountDetailTypeList" listKey="id"
							listValue="name" name="accountDetailTypeList" multiple="true"
							value="%{accountDetailTypeList.{id}}"></form:select></td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.activeForPosting" />:</strong></td>
					<td class="greybox"><form:checkbox path="activeForPosting"></form:checkbox></td>
				</tr>
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.functionRequired" />:</strong></td>
					<td width="22%" class="bluebox"><form:checkbox
							name="functionRequired"></form:checkbox></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.budgetRequired" />:</strong></td>
					<td class="bluebox"><form:checkbox path="budgetCheckRequired"></form:checkbox></td>
				</tr>
			</table>
			<br />
			<br />
			<div class="buttonbottom">
				<input type="hidden" name="parentId"
					value='${parentId}' />
				<s:submit name="Save" key="lbl.save"
					onclick="javascript: return validate();" cssClass="buttonsubmit" />
				<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
				onclick="javascript:window.parent.postMessage('close','*');window.close();" class="button" />
			</div>
			<!-- TODO: Manual migration required for custom Struts tag -->
		</form:form>
	</div>
</body>
</html>
