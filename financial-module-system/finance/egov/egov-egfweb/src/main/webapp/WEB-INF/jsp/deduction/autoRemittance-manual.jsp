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
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/calendar.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title><!-- TODO: Manual migration required for custom Struts tag --></title>



</script>
</head>
<body>
	<form:form action="autoRemittance" theme="simple"
		name="autoRemittanceForm">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value='Manual Scheduling ' />
		</jsp:include>

		<span class="mandatory"> <font
			style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag --></font>
		</span>
		<div class="formheading" />
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<br />
		<div align="center">
			<font style='color: red; font-weight: bold'>
				<p class="error-block" id="lblError"></p>
			</font>
			<table border="0" width="100%">
				<tr>
					<td class="greybox"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="greybox"><form:select path="glcode" id="glcode"
							list="coaMap" headerKey="-1" headerValue="----Choose----"
							onchange="loadLastRundate(this)" /></td>
				</tr>
				<tr>
					<td class="bluebox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox"><s:date name="lastRunDate"
							var="lastRunDate" format="dd/MM/yyyy" /> <form:input
							name="lastRunDate" id="lastRunDate" value="%{lastRunDate}"
							maxlength="10"
							onkeyup="DateFormat(this,this.value,event,false,'3')" />**? <a
						href="javascript:show_calendar('autoRemittanceForm.lastRunDate',null,null,'DD/MM/YYYY');"
						style="text-decoration: none">&nbsp;<img
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)
					</td>
				</tr>

				<tr>
					<td class="greybox"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->
					<td class="greybox"><form:select path="dept" id="dept"
							list="dropdownData.departmentList" listKey="id"
							listValue="name" headerKey="" headerValue="----Choose----"
							onChange="loadDrawingOfficer(this);" /></td>

					</td>
				</tr>
				<tr>
					<td class="greybox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td><form:input path="drawingOfficer" id="drawingOfficer"
							size="50" /></td>
				</tr>
			</table>


			<div class="buttonbottom" style="padding-bottom: 10px;">
				<s:submit type="submit" cssClass="buttonsubmit"
					value="Generate Payment" id="search" name="search"
					method="schedule" onclick="return validateSearch();" />
				<s:submit type="submit" cssClass="buttonsubmit" value="Cancel"
					method="scheduleManual" />
				<input type="button" id="Close" value="Close"
					onclick="javascript:window.close()" class="buttonsubmit" />
			</div>
			<script>
function loadDrawingOfficer(obj)
{
	<c:forEach value="deptDOList" var="s">
	if(obj.value=='${%{department.id}}')                                              
	{
	document.getElementById("drawingOfficer").value='${%{drawingOfficer.name}}';
	}
	</c:forEach>

}

function loadLastRundate(obj)
{
	//bootbox.alert(obj.value);
	<c:forEach value="lastRunDateMap" var="s">
	if(obj.value=='${%{key}}')
	{
	document.getElementById("lastRunDate").value='${%{value}}';
	}
	</c:forEach>

}
</script>
			<div align="left" class="extracontent">
				**?. Application will generate remittance payments for all the
				pending vouchers till the date entered here<br /> **?. Do not use
				date search for generating remittance payment for already triggered
				and cancelled remittance payments <br />
			</div>
	</form:form>
</body>
</html>
