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
<script>
function resetPage(){
	jQuery("#results").empty();
}
</script>
</head>
<div class="formmainbox">
	<div class="formheading"></div>
	<c:if test="%{mode == 'deduction' }">
	<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></div>
	</c:if>
	<c:otherwise>
	<div class="subheadnew">
	<!-- TODO: Manual migration required for custom Struts tag --></div>
	</s:else>

	<form:form action="pendingTDSReport" theme="simple"
		name="pendingTDSReport">
		<input type="hidden" id="csrfTokenValue" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		<table width="100%" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag -->:<span
					class="mandatory1">*</span></td>
				<td class="greybox"><form:select path="recovery" id="recovery"
						list="dropdownData.recoveryList" listKey="id" listValue="type"
						headerKey="-1" headerValue="%{getText('lbl.choose.options')}"/></td>
				<td class="greybox" width="10%">Fund:<span class="mandatory1">*</span></td>
				<td class="greybox"><form:select path="fund" id="fund"
						list="dropdownData.fundList" listKey="id" listValue="name"
						headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>

			</tr>
			<tr>
				<td class="bluebox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --><span
					class="mandatory1"></span></td>
				<td class="bluebox"><form:input path="fromDate" id="fromDate"
						cssStyle="width:100px" value='%{getFormattedDate(fromDate)}'
						onkeyup="DateFormat(this,this.value,event,false,'3')" /><a
					href="javascript:show_calendar('pendingTDSReport.fromDate');"
					style="text-decoration: none">&nbsp;<img
						src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)<br />
				</td>

				<td class="bluebox" width="10%"><!-- TODO: Manual migration required for custom Struts tag -->:<span
					class="mandatory1">*</span></td>
				<td class="bluebox"><form:input path="asOnDate" id="asOnDate"
						cssStyle="width:100px" value='%{getFormattedDate(asOnDate)}'
						onkeyup="DateFormat(this,this.value,event,false,'3')" /><a
					href="javascript:show_calendar('pendingTDSReport.asOnDate');"
					style="text-decoration: none">&nbsp;<img
						src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)<br />
				</td>
			</tr>
			<tr>
				<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag -->:</td>
				<td class="greybox"><form:select path="department" id="department"
						list="dropdownData.departmentList" listKey="code"
						listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"/>
				</td>
				<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag -->:</td>
				<td class="greybox"><input type="text" name="partyName"
					id="partyName" onclick="loadEntities()" autocomplete="off"
					onkeyup="autocompleteEntities(this,event)"
					onblur="splitValues(this)" />
					<div id="codescontainer"></div></td>
			</tr>
			<tr>
				<td class="bluebox" width="10%"><span
					id="showRemittedEntrieslabel"><!-- TODO: Manual migration required for custom Struts tag -->:</span></td>
				<td class="bluebox"><form:checkbox path="showRemittedEntries"
						id="showRemittedEntries" /></td>
				<td class="bluebox">&nbsp;</td>
				<td class="bluebox">&nbsp;</td>
			</tr>
		</table>
		<br />
		<div class="buttonbottom">
			<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"  class="buttonsubmit"
				onclick="return getData()" /> &nbsp;
			<s:reset name="button" type="submit" cssClass="button" id="button"
				key="lbl.reset" onclick="resetPage();"/>
			<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->" onclick="window.parent.postMessage('close','*');window.close();"
				Class="button" />
		</div>
		<!-- TODO: Manual migration required for custom Struts tag --></s:hidden>
	</form:form>
</div>

<div id="results"></div>
