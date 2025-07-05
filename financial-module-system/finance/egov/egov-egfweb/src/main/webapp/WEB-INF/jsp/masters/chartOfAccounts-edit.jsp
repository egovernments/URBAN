<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  ~    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
  ~    accountability and the service delivery of the government  organizations.
  ~
  ~     Copyright (C) 2018  eGovernments Foundation
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
<script type="text/javascript"
	src="/services/EGF/resources/javascript/chartofaccountsHelper.js"></script>
<script type="text/javascript">
	function validateAndSubmit() {

		jQuery("#accountDetailTypeAss option[value!='']").each(function() {
			jQuery(this).prop('selected', true);
			accountDetailTypeList.push(jQuery(this).val());
		});

		if (!validateData())
			return false;
		document.chartOfAccountsForm.action = '${pageContext.request.contextPath}/masters/chartOfAccounts-update.action';
		jQuery(chartOfAccountsForm).append(
				jQuery('<input>', {
                    type: 'hidden',
                    name: '${_csrf.parameterName}',
                    value: '${_csrf.token}'
                })
            );
		document.chartOfAccountsForm.submit();

		return true;
	}
</script>
</head>
<body>
	<jsp:include page="../budget/budgetHeader.jsp" />

	<div class="subheadnew">
		<!-- TODO: Manual migration required for custom Struts tag -->
	</div>
	<span style="color: red"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag --></span>
	<form:form name="chartOfAccountsForm" action="chartOfAccounts"
		theme="simple">
		<div class="formmainbox">
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				id="chartOfAccountsTable">
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.accountCode" />:</strong></td>
					<td width="22%" class="bluebox"><input type="text"
						name="glcode" value='${model.glcode}'
						id="chartOfAccounts_glcode" style="border: 0px;" readOnly="true" /></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.name" />:<span class="mandatory1">*</span></strong></td>
					<td class="bluebox"><input type="text" name="name"
						value='${model.name}' id="chartOfAccounts_name" /></td>
				</tr>
				<tr>
					<td width="20%" class="greybox">&nbsp;</td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.description" />:</strong></td>
					<td width="22%" class="greybox"><form:input path="desc" /></td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.type" />:</strong></td>
					<td class="greybox"><c:if test="model.type == 'I'">
							<input type="text" name="type"
								value='<!-- TODO: Manual migration required for custom Struts tag -->'
								id="chartOfAccounts_type" style="border: 0px;" readOnly="true" />
						</c:if> <c:if test="model.type == 'E'">
							<input type="text" name="type"
								value='<!-- TODO: Manual migration required for custom Struts tag -->'
								id="chartOfAccounts_type" style="border: 0px;" readOnly="true" />
						</c:if> <c:if test="model.type == 'A'">
							<input type="text" name="type"
								value='<!-- TODO: Manual migration required for custom Struts tag -->'
								id="chartOfAccounts_type" style="border: 0px;" readOnly="true" />
						</c:if> <c:if test="model.type == 'L'">
							<input type="text" name="type"
								value='<!-- TODO: Manual migration required for custom Struts tag -->'
								id="chartOfAccounts_type" style="border: 0px;" readOnly="true" />
						</c:if></td>
				</tr>
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.purpose" />:</strong></td>
					<td class="bluebox"><form:select list="dropdownData.purposeList"
							listKey="id" listValue="name" name="accountcodePurpose.id"
							headerKey="0" headerValue="%{getText('lbl.choose.options')}"
							value="accountcodePurpose.id"></form:select></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.classification" />:</strong></td>
					<td width="22%" class="bluebox"><c:if
							test="%{model.classification == 1}">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:elseif> <!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:elseif> <c:otherwise>
						</s:else></td>
				</tr>
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.functionRequired" />:</strong></td>
					<td width="22%" class="bluebox"><c:if
							test="%{getFunctionReqd() == true}">
							<form:checkbox path="functionRequired" value="functionReqd"
								checked="checked"></form:checkbox>
						</c:if> <c:otherwise>
							<form:checkbox path="functionRequired" value="functionReqd"></form:checkbox>
						</s:else></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.budgetRequired" />:</strong></td>
					<td class="bluebox"><c:if test="%{budgetCheckReq() == true}">
							<form:checkbox path="budgetCheckRequired" value="budgetCheckReq"
								checked="checked"></form:checkbox>
						</c:if> <c:otherwise>
							<form:checkbox path="budgetCheckRequired" value="budgetCheckReq"></form:checkbox>
						</s:else></td>
				</tr>
				<tr>
					<td width="20%" class="greybox">&nbsp;</td>

					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.activeForPosting" />:</strong></td>
					<td class="greybox"><c:if
							test="%{getIsActiveForPosting() == true}">
							<form:checkbox path="activeForPosting" value="isActiveForPosting"
								checked="checked"></form:checkbox>
						</c:if> <c:otherwise>
							<form:checkbox path="activeForPosting" value="isActiveForPosting"></form:checkbox>
						</s:else></td>

				</tr>
			</table>
		</div>
		<br />
		<br />
		<div class="formmainbox">
			<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
			<table>
				<tr>
					<td width="10%" class="greybox">
					<td width="5%" class="greybox"><div align="left">
							<strong><s:text
									name="chartOfAccount.accountDetailType" />:</strong>
						</div></td>

					<td width="5%"></td>
					<td width="10%" class="greybox"><div align="left">
							<strong><s:text
									name="chartOfAccount.accountDetailType.mapped" />:</strong>
						</div></td>

				</tr>
				<tr>
					<td width="13%" class="greybox">
					<td width="20%"><div class="col-xs-10">
							<form:select list="dropdownData.accountDetailTypeList" listKey="id"
								listValue="name" id="accountDetailType" multiple="true"
								cssClass="form-control" size="5"></form:select>
						</div></td>
					<td width="5%"><div class="col-xs-10">
							<div>&nbsp;</div>
							<br />
							<button type="button" id="multiselect_rightSelected"
								class="btn btn-block btn-default">
								<i class="glyphicon glyphicon-chevron-right"></i>
							</button>
							<button type="button" id="multiselect_leftSelected"
								class="btn btn-block btn-default">
								<i class="glyphicon glyphicon-chevron-left"></i>
							</button>
						</div></td>

					<td width="20%"><div class="col-xs-10">
							<form:select list="dropdownData.mappedAccountDetailTypeList"
								listKey="id" listValue="name" name="accountDetailTypeList"
								id="accountDetailTypeAss" multiple="true" size="5"
								cssClass="form-control" value="accountDetailTypeList"></form:select>
						</div></td>
				</tr>
			</table>

			<br /> <br />
		</div>
		<div class="buttonbottom">
			<input type="hidden" name="model.id" value='${model.id}' />
		    <input type="button" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->" id="Search" name="Search" onclick="return validateAndSubmit();" /> 
			<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->" onclick="javascript:window.parent.postMessage('close','*');window.close();" class="button" />
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
</body>
</html>
