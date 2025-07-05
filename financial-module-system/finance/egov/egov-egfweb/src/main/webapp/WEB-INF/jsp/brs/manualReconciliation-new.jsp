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


<html>
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<%@ taglib uri="/WEB-INF/tags/cdn.tld" prefix="cdn" %>

<head>
<script src="<cdn:url value='/resources/app/js/i18n/jquery.i18n.properties.js?rnd=${app_release_no}' context='/services/EGF'/>"></script>
<script type="text/javascript" src="<cdn:url value='/resources/app/js/reconciliationHelper.js?rnd=${app_release_no}'/>"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script type="text/javascript">


	function validateSubmit() {
		if(!validate())
			{
				return false;
			}
	    callAjaxSearch();
		//return true;
	}
	function populatebranch(obj) {
		var bid = document.getElementById("bankId").value;
		populatebranchId( {
			bankId : bid
		})
	}

	function populateaccount(obj) {
		var bid = document.getElementById("branchId").value;
		populateaccountId( {
			branchId : bid
		})
	}
</script>
</head>
<body>
	<form:form action="autoReconciliation" theme="simple" name="mrform" id="mrform">
		<input type="hidden" id="csrfTokenValue" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param value="Auto Bank Reconciliation" name="heading" />
		</jsp:include>
		<div class="formmainbox">
			<div class="formheading"></div>
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
	
		<div align="center">
			<font style='color: red;'>
				<p class="error-block" id="lblError"></p>
			</font>
		</div>
		<span class="mandatory1">
			<div id="Errors">
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<center>
			<table border="0" width="100%" cellspacing="0" cellpadding="0">
				<tr>
					<td class="greybox"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="greybox"><span class="mandatory1">*</span></span></td>
					<egov:ajaxdropdown id="branchId" fields="['Text','Value']"
						dropdownId="branchId"
						url="/voucher/common-ajaxLoadBankBranchesByBank.action" />
					<td class="greybox"><form:select path="reconcileBean.bankId" id="bankId"
							list="dropdownData.bankList" listKey="id" listValue="name"
							headerKey="" headerValue="%{getText('lbl.choose.options')}"
							onchange="populatebranch(this);" value="%{bankId}" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="greybox"><span class="mandatory1">*</span></span></td>
					<egov:ajaxdropdown id="accountId" fields="['Text','Value']"
						dropdownId="accountId"
						url="/voucher/common-ajaxLoadBankAccountsByBranch.action" />
					<td class="greybox"><form:select path="reconcileBean.branchId" id="branchId"
							list="dropdownData.branchList" listKey="id" listValue="name"
							headerKey="" headerValue="%{getText('lbl.choose.options')}"
							onchange="populateaccount(this);" /></td>
				</tr>
				<tr>
					<td class="bluebox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:select path="reconcileBean.accountId" id="accountId"
							list="dropdownData.accountList" listKey="id"
							listValue="accountnumber" headerKey=""
							headerValue="%{getText('lbl.choose.options')}" /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<td class="bluebox"><input type="text" name="reconcileBean.reconciliationDate" class="form-control datepicker"
							 data-inputmask="'mask': 'd/m/y'"  id="reconciliationDate"/>

					</td>
				</tr>
				<tr>
					<td class="greybox"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="greybox"><span class="mandatory1">*</span></span></td>
					<td class="greybox"><input type="text"  name="reconcileBean.fromDate" id="fromDate" class="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" />

					</td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="greybox"><span class="mandatory1">*</span></span></td>
					<td class="greybox"><input type="text"  name="reconcileBean.toDate" id="toDate" class="form-control datepicker" 
						data-inputmask="'mask': 'd/m/y'" />	 

					</td>
				</tr>
        <tr>
          <td class="greybox"></td>
           <td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
            class="greybox"></td>
          <td class="greybox"><input type="text"  name="reconcileBean.instrumentNo" id="instrumentNo" /></td>

          </td>
          <td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
            class="greybox"></td>
          <td class="greybox"><form:input path="reconcileBean.limit" id="limit"  /></td>
        </tr>
			</table>

			<div class="buttonbottom" id="buttondiv">
				<table>
					<tr>
						<td><input  type="button" class="buttonsubmit"
								value='<!-- TODO: Manual migration required for custom Struts tag -->' name="Search" method="search"
								onclick="return validateSubmit();" /></td>
                <td><input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
                        onclick="showBalance()" class="buttonsubmit" /></td>
						<td><input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
							onclick="javascript:window.close()" class="buttonsubmit" /></td>
					</tr>
				</table>
			</div>
      <div class="col-md-12 form-group report-table-container" id="balanceDiv"></div>
      <div id="resultDiv"> </div>
      
     
		</center>
      </div>
	</form:form>
</body>
</html>

