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
<tr>
	<c:if test="%{shouldShowHeaderField('fund')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('fund')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="bluebox"><form:select path="fund" id="fund"
				list="dropdownData.fundList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----"
				onChange="getSchemelist(this)" value="%{fund.id}" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('department')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('department')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="bluebox"><form:select path="department" id="department"
				list="dropdownData.departmentList" listKey="id" listValue="deptName"
				headerKey="-1" headerValue="----Choose----" value="%{department.id}" /></td>
	</c:if>
</tr>
<tr>
	<c:if test="%{shouldShowHeaderField('scheme')}">
		<egov:ajaxdropdown id="schemeid" fields="['Text','Value']"
			dropdownId="schemeid" url="report/report!ajaxLoadSchemes.action" />
		<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('scheme')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="greybox"><form:select path="scheme" id="scheme"
				list="dropdownData.schemeList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----"
				onChange="getSubSchemelist(this)" value="%{scheme.id}" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('subscheme')}">
		<egov:ajaxdropdown id="subscheme" fields="['Text','Value']"
			dropdownId="subscheme" url="report/report!ajaxLoadSubSchemes.action" />
		<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('subscheme')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="greybox"><form:select path="subscheme" id="subscheme"
				list="dropdownData.subschemeList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----" value="%{subscheme.id}" /></td>
	</c:if>
</tr>
<tr>
	<c:if test="%{shouldShowHeaderField('functionary')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('functionary')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="bluebox"><form:select path="functionary" id="functionary"
				list="dropdownData.functionaryList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----"
				value="%{functionary.id}" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('fundsource')}">
		<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('fundsource')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="bluebox"><form:select path="fundsource" id="fundsource"
				list="dropdownData.fundsourceList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----" value="%{fundsource.id}" /></td>
	</c:if>
</tr>
<tr>
	<c:if test="%{shouldShowHeaderField('function')}">
		<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <c:if
				test="%{isFieldMandatory('function')}">
				<span class="mandatory">*</span>
			</c:if></td>
		<td class="greybox"><form:select path="function" id="function"
				list="dropdownData.functionList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----" value="%{function.id}" /></td>
	</c:if>
	<c:if test="%{shouldShowHeaderField('field')}">
		<td class="greybox"><c:if test="%{isFieldMandatory('field')}">
				<span class="mandatory">*</span>
			</c:if><br>
		<br></td>
		<td class="greybox">&gt;<form:select path="field" id="field"
				list="dropdownData.fieldList" listKey="id" listValue="name"
				headerKey="-1" headerValue="----Choose----" value="%{field.id}" /></td>
	</c:if>
</tr>

<script>
	function getSchemelist(obj)
	{
		if(document.getElementById('scheme'))
			populatescheme({fund:obj.value})
	}
	function getSubSchemelist(obj)
	{
		if(document.getElementById('subscheme'))
			populatesubscheme({scheme:obj.value})
	}
</script>
