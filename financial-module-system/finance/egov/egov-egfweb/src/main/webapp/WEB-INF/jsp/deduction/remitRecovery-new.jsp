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
	src="/services/EGF/resources/javascript/calender.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/remitrecovery-helper.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
</head>
<body>
	<form:form action="remitRecovery" theme="simple" name="remitRecoveryForm">
	<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value='Remittance Recovery' />
		</jsp:include>

		<span> <font style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --></font>
		</span>
		<div class="formmainbox" />
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div align="center">
			<font style='color: red; font-weight: bold'>
				<p class="error-block" id="lblError"></p>
			</font>
			<table border="0" width="100%">
				<tr>
					<td class="greybox"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory"></span></td>
					<td class="greybox">
						<form:select path="remittanceBean.recoveryId" id="recoveryId" list="dropdownData.recoveryList" listKey="id" listValue="chartofaccounts.glcode+'-'+type+'-'+recoveryName" headerKey="-1" headerValue="%{getText('lbl.choose.options')}" value="%{remittanceBean.recoveryId}" />
					</td>
					<td class="greybox" width="10%">
					<td class="greybox">
				<tr>
					<td class="bluebox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> 
						<form:input id="fromVhDate" path="remittanceBean.fromVhDate" value="%{voucherDateId}" onkeyup="DateFormat(this,this.value,event,false,'3')" placeholder="DD/MM/YYYY" cssClass="form-control datepicker" data-inputmask="'mask': 'd/m/y'" />
					</td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory"></span></td>
					<td class="greybox">
						<!-- TODO: Manual migration required for custom Struts tag --> 
						<form:input id="voucherDate" path="voucherDate" value="%{voucherDateId}" onkeyup="DateFormat(this,this.value,event,false,'3')" placeholder="DD/MM/YYYY" cssClass="form-control datepicker" data-inputmask="'mask': 'd/m/y'" />
					</td>
				</tr>
				<%-- <tr>
					<td class="greybox"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="remittanceBean.bank" id="bank" list="dropdownData.bankList" listKey="id"  listValue="name" headerKey="" headerValue="----Choose----" value="%{remittanceBean.bank}" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="remittanceBean.bankBranchId" id="bankBranch" list="dropdownData.branchList" listKey="id" listValue="name" headerKey="" headerValue="----Choose----"  value="%{remittanceBean.bankBranchId}" /></td>
					</tr>
					<tr>
					<td class="greybox"></td>		
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="remittanceBean.bankAccountId" id="bankAccount" list="dropdownData.accNumList" listKey="id" listValue="accountnumber" headerKey="" headerValue="----Choose----" value="%{remittanceBean.bankAccountId}" /></td>
				</tr> --%>
				<%@ include file="../payment/paymenttrans-filter.jsp"%>

			</table>
			<jsp:include page="remitRecovery-form.jsp" />
			<!-- TODO: Manual migration required for custom Struts tag -->
			<label style="text-align: right;"></label>

			<div class="buttonbottom" style="padding-bottom: 10px;">
				<!-- TODO: Manual migration required for custom Struts tag -->
				<input type="button" id="Close" value='<!-- TODO: Manual migration required for custom Struts tag -->' onclick="javascript:window.close()" class="button" />
			</div>
		</div>
		<c:if test='%{listRemitBean != null }'>
			<c:if test="%{ listRemitBean.size()>0}">
				<div align="center">
					<font style='color: red; font-weight: bold'>
						<p class="error-block" id="remitlblError"></p>
					</font>
				</div>
				<div id="labelAD" align="center">
					<table width="100%" border=0 id="recoveryDetails">
						<th style="border-left-width: -;padding-left: 67px;"><!-- TODO: Manual migration required for custom Struts tag --> </th>
					</table>
				</div>
				<table align="center" id="totalAmtTable">
					<tr>
						<td width="1050"></td>
						<td><!-- TODO: Manual migration required for custom Struts tag --></td>
						<td><form:checkbox id="selectAll" path="selectAll" onclick="selectAllORNone(this);"></form:checkbox></td>
					</tr>
				</table>


				<div class="yui-skin-sam" align="center">
					<div id="recoveryDetailsTable"></div>
				</div>
				<script>
		
		populateRecoveryDetails();
		document.getElementById('recoveryDetailsTable').getElementsByTagName('table')[0].width="90%"
	 </script>
				<br>
				<table align="center" id="totalAmtTable">
					<tr>
						<td width="850"></td>
						<td><!-- TODO: Manual migration required for custom Struts tag --> </td>
						<td><form:input path="remittanceBean.totalAmount" id="totalAmount" style="width:90px;text-align:right" readonly="true" value="0" /></td>
					</tr>
					<tr>
						<td colspan="2" class="modeofpayment"><strong><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory1">*</span></strong><!-- TODO: Manual migration required for custom Struts tag --></td>
					</tr>
				</table>
				<div id ="remitTotal" />
				<!-- TODO: Manual migration required for custom Struts tag -->
				<div class="buttonbottom" style="padding-bottom: 10px;">
					<!-- TODO: Manual migration required for custom Struts tag -->
			</c:if>
			<c:otherwise>
				<div class="error">
					<span class="bluebgheadtd" colspan="7"><!-- TODO: Manual migration required for custom Struts tag --></span>
				</div>
			</s:else>
		</c:if>
		</div>
	</form:form>
</body>
</html>
