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
<tr>
	<td class="bluebox">&nbsp;</td>
	<c:if test="%{shouldShowHeaderField('fund')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('fund')}">
				<span class="mandatory1" id="fundDateMandatory">*</span>
			</c:if></td>
		<td class="bluebox"><form:select path="egBillregistermis.fund"
				id="fundId" list="dropdownData.fundList" listKey="id"
				listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.fund.id}"
				onChange="populateSchemes(this);" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('fundsource')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('fundsource')}">
				<span class="mandatory1">*</span>
			</c:if></td>
		<td class="bluebox"><form:select path="egBillregistermis.fundsource"
				id="fundsourceId" list="dropdownData.fundsourceList" listKey="id"
				listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.fundsource.id}" /></td>
	</c:if>
</tr>
<tr>
	<td class="bluebox">&nbsp;</td>
	<c:if test="%{shouldShowHeaderField('scheme')}">
		<egov:ajaxdropdown id="schemeid" fields="['Text','Value']"
			dropdownId="schemeid" url="voucher/common!ajaxLoadSchemes.action" />
		<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('scheme')}">
				<span class="mandatory1">*</span>
			</c:if></td>
		<td class="greybox"><form:select path="egBillregistermis.scheme"
				id="schemeid" list="dropdownData.schemeList" listKey="id"
				listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.scheme.id}"
				onChange="populatesubSchemes(this)" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('subscheme')}">
		<egov:ajaxdropdown id="subschemeid" fields="['Text','Value']"
			dropdownId="subschemeid"
			url="voucher/common!ajaxLoadSubSchemes.action" />
		<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('subscheme')}">
				<span class="mandatory1">*</span>
			</c:if></td>
		<td class="greybox"><form:select path="egBillregistermis.subScheme"
				id="subschemeid" list="dropdownData.subschemeList" listKey="id"
				listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.subScheme.id}" /></td>
	</c:if>
</tr>
<tr>
	<td class="bluebox">&nbsp;</td>
	<c:if test="%{shouldShowHeaderField('functionary')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('functionary')}">
				<span class="mandatory1">*</span>
			</c:if></td>
		<td class="bluebox"><form:select
				name="egBillregistermis.functionaryid" id="functionaryId"
				list="dropdownData.functionaryList" listKey="id" listValue="name"
				headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.subScheme.id}" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('department')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('department')}">
				<span class="mandatory1">*</span>
			</c:if></td>
		<td class="bluebox"><form:select
				name="egBillregistermis.departmentcode" id="departmentcode"
				list="dropdownData.departmentList" listKey="code" listValue="name"
				headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.departmentcode}" /></td>
	</c:if>
</tr>
<tr>
	<td class="bluebox">&nbsp;</td>
	<c:if test="%{shouldShowHeaderField('field')}">
		<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('field')}">
				<span class="mandatory1">*</span>
			</c:if><br> <br></td>
		<td class="greybox"><form:select path="egBillregistermis.fieldid"
				id="divisionid" list="dropdownData.fieldList" listKey="id"
				listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
				value="%{egBillregistermis.fieldid.id}" /></td>
	</c:if>
</tr>
<script>
	function populateSchemes(fund) {
		if (null != document.getElementById("schemeid")) {
			populateschemeid({
				fundId : fund.options[fund.selectedIndex].value
			})
		}

	}
	function populatesubSchemes(scheme) {

		populatesubschemeid({
			schemeId : scheme.options[scheme.selectedIndex].value
		})
	}
</script>
