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
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="/services/EGF/resources/css/ccMenu.css?rnd=${app_release_no}" />
<title>RTGS Ref. No Assignment Search</title>
</head>
<body onload="onload()">
	<form:form action="chequeAssignment" theme="simple" id="chequeAssignment"
		name="chequeAssignment">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="RTGS Ref. No. Assignment Search" />
		</jsp:include>
		<span id="errorSpan"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td class="bluebox" width="30%"><s:text
							name="chq.assignment.paymentvoucherdatefrom" /></td>
					<td class="bluebox"><form:input id="fromDate" path="fromDate"
							value="%{fromDate}" data-date-end-date="0d"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" class="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>
					<td class="bluebox" width="30%"><s:text
							name="chq.assignment.paymentvoucherdateto" /></td>
					<td class="bluebox"><form:input id="toDate" path="toDate"
							value="%{toDate}" data-date-end-date="0d"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" class="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>
				</tr>
				<tr>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory"></span></td>
					<td class="greybox"><s:radio id="paymentMode"
							name="paymentMode" list="#{'rtgs':'RTGS'}"
							onchange="enableOrDisableBillType(this)" value="%{paymentMode}" /></td>
					<td class="greybox"><s:text
							name="chq.assignment.paymentvoucherno" /></td>
					<td class="greybox"><form:input path="voucherNumber"
							id="voucherNumber" value="%{voucherNumber}" /></td>
				</tr>
				<tr>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->
					</td>
					<td class="bluebox"><form:select path="billType" id="billType"
							list="billTypeMap" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							value="%{billType}" /></td>
				</tr>
				<tr>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="fundId" id="fundId"
							list="dropdownData.fundList" listKey="id" listValue="name"
							headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							onChange="loadBank(this);" value="%{fundId.id}" /></td>

					<td class="greybox" id="deptLabel"><s:text
							name="voucher.department" /></td>
					<td class="greybox"><form:select path="vouchermis.departmentcode"
							id="vouchermis.departmentcode" list="dropdownData.departmentList"
							listKey="code" listValue="name" headerKey="-1"
							headerValue="%{getText('lbl.choose.options')}"
							value="voucherHeader.vouchermis.departmentcode" /></td>
				</tr>
				<tr>
					<egov:ajaxdropdown id="bank_branch" fields="['Text','Value']"
						dropdownId="bank_branch"
						url="voucher/common-ajaxLoadAllBanks.action" />
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="bank_branch"
							id="bank_branch" list="bankBranchMap" headerKey="-1"
							headerValue="%{getText('lbl.choose.options')}" onchange="loadBankAccount(this)"
							value="%{bank_branch}" /></td>
					<egov:ajaxdropdown id="bankaccount" fields="['Text','Value']"
						dropdownId="bankaccount"
						url="voucher/common-ajaxLoadBankAccountsWithApprovedPayments.action" />
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox" colspan="2"><form:select path="bankaccount"
							id="bankaccount" list="dropdownData.bankaccountList" listKey="id"
							listValue="chartofaccounts.glcode+'--'+accountnumber+'---'+accounttype"
							headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							value="%{bankaccount}" /></td>
				</tr>


				<!-- <tr> 	<td class="bluebox">
				<!-- TODO: Manual migration required for custom Struts tag -->
				</td class="bluebox">
				<td class="bluebox">
				<form:checkbox id="reassignSurrenderChq" path="reassignSurrenderChq" />
				</td class="bluebox">
				</tr> -->
			</table>
			<div class="buttonbottom">
				<s:submit method="searchRTGS" key="lbl.search" id="searchBtn"
					cssClass="buttonsubmit" onclick="submitForm();" />
				<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
					onclick="javascript:window.close();window.parent.postMessage('close','*');" class="button" />
			</div>
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
		<s:hidden name="rtgsContractorAssignment"
			id="rtgsContractorAssignment" />
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
	<script>
		var date = '<!-- TODO: Manual migration required for custom Struts tag -->';
		function onload() {
			populatebank_branch();
		}

		function loadBank(obj) {
			var vTypeOfAccount = '${%{typeOfAccount}}';

			if (obj.options[obj.selectedIndex].value != -1) {
				populatebank_branch({
					fundId : obj.options[obj.selectedIndex].value
							+ '&asOnDate=' + date
				});
			} else {
				populatebank_branch();
			}
		}
		function loadBankAccount(obj) {
			var vTypeOfAccount = '${%{typeOfAccount}}';
			var fund = document.getElementById('fundId');
			if (obj.options[obj.selectedIndex].value != -1) {
				var x = obj.options[obj.selectedIndex].value.split("-");
				//bootbox.alert("heelo"+x);                            
				document.getElementById("bankbranch").value = x[1];
				populatebankaccount({
					branchId : x[1] + '&asOnDate=' + date,
					fundId : fund.options[fund.selectedIndex].value
				});
			}

		}
		function submitForm() {
			document.chequeAssignment.action = '/services/EGF/payment/chequeAssignment-searchRTGS.action';
			jQuery(chequeAssignment).append(jQuery('<input>', {
	            type : 'hidden',
	            name : '${_csrf.parameterName}',
	            value : '${_csrf.token}'
	        }));
			document.chequeAssignment.submit();
		}
	</script>
	<c:if test="%{!validateUser('chequeassignment')}">
		<script>
			document.getElementById('searchBtn').disabled = true;
			document.getElementById('errorSpan').innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->'
		</script>
	</c:if>
</body>
</html>
