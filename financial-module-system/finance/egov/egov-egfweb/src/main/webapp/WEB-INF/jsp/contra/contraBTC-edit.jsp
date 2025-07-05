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
	src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/contra.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title>Contra - Cash Withdrawal</title>
</head>


<body onload="onloadtask();">
	<form:form action="contraBTC" theme="simple" name="cashWithDrawalForm">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Cash Withdrawal" />
		</jsp:include>
		<div class="formmainbox">
			<div class="formheading" />
			<div class="subheadnew">Cash Withdrawal</div>
			<div id="listid" style="display: block">
				<br />
			</div>
			<div align="center">
				<font style='color: red;'>
					<p class="error-block" id="lblError"></p>
				</font> <span class="mandatory"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag -->
				</span>
			</div>
			<table border="0" width="100%">
				<tr>
					<c:if test="%{shouldShowHeaderField('vouchernumber')}">
						<td class="bluebox" width="22%"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="mandatory">*</span></td>
						<td class="bluebox" width="22%">
							<table width="100%">
								<tr>
									<td style="width: 25%"><input type="text"
										name="voucherNumberPrefix" id="voucherNumberPrefix"
										readonly="true" style="width: 100%" /></td>
									<td style="width: 75%"><form:input path="voucherNumber"
											id="voucherNumber" /></td>
								</tr>
							</table>
						</td>

					</c:if>
					<c:otherwise>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="mandatory">*</span></td>
						<td class="bluebox"><form:input path="voucherNumber"
								id="voucherNumber" readonly="true" /></td>
					</s:else>
					<td class="greybox" width="30%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="greybox"><input type="text" id="voucherDate"
						name="voucherHeader.voucherDate" style="width: 100px"
						value='<!-- TODO: Manual migration required for custom Struts tag -->' /> <a
						href="javascript:show_calendar('cashWithDrawalForm.voucherDate',null,null,'DD/MM/YYYY');"
						style="text-decoration: none">&nbsp;<img tabIndex=-1
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)
					</td>
				</tr>
				<tr>
					<td class="bluebox" width="30%"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="bluebox"><span class="mandatory">*</span></span></td>
					<td class="bluebox"><form:select path="contraBean.bankBranchId"
							id="bankId" list="dropdownData.bankList" listKey="bankBranchId"
							listValue="bankBranchName" headerKey="-1"
							headerValue="----Choose----" onChange="populateAccNum(this);" /></td>
					<td class="bluebox" width="30%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="bluebox"><form:input path="contraBean.amount"
							id="amount" onkeyup="validateAmountFormat()"
							cssStyle="text-align:right" /></td>

				</tr>
				<tr>
					<egov:ajaxdropdown id="accountNumber" fields="['Text','Value']"
						dropdownId="accountNumber"
						url="voucher/common!ajaxLoadAccNum.action" />
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="bluebox"><span class="mandatory">*</span></span></td>
					<td class="greybox"><form:select
							name="contraBean.accountNumberId" id="accountNumber"
							list="dropdownData.accNumList" listKey="id"
							listValue="accountnumber" headerKey="-1"
							headerValue="----Choose----"
							onChange="populateNarration(this);populateAvailableBalance(this);" />
						<form:input path="contraBean.accnumnar" id="accnumnar"
							value="%{contraBean.accnumnar}" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><input type="text" id="availableBalance"
						readonly="readonly" style="text-align: right" /></td>
				</tr>
				<tr>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="bluebox"><input type="text" id="chequeDate"
						name="contraBean.chequeDate" style="width: 100px"
						value='${contraBean.chequeDate}' /> <a
						href="javascript:show_calendar('cashWithDrawalForm.chequeDate',null,null,'DD/MM/YYYY');"
						style="text-decoration: none">&nbsp;<img tabIndex=-1
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)
					</td>
					<c:if test="%{showChequeNumber()}">
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="greybox"><span class="mandatory">*</span></span></td>
						<td class="bluebox"><form:input
								name="contraBean.chequeNumber" id="chequeNumber" maxlength="25" />
					</c:if>
				</tr>
				<jsp:include page="../voucher/vouchertrans-filter.jsp" />
				<tr>
					<td class="greybox">Narration &nbsp;</td>
					<td class="greybox"><form:textarea rows="4" cols="60"
							name="narration" onkeydown="textCounter('narration',250)"
							onkeyup="textCounter('narration',250)"
							onblur="textCounter('narration',250)" id="narration" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:input path="contraBean.cashInHand"
							id="cashInHand" readonly="true" /></td>
				</tr>
			</table>

			<div class="buttonbottom" style="padding-bottom: 10px;">
				<s:submit type="submit" cssClass="buttonsubmit" value="Save"
					method="edit" onclick="return validateInput()" />
				<s:reset name="button" type="submit" cssClass="button" id="button"
					value="Cancel" />
				<s:submit value="Close" onclick="javascript: self.close()"
					cssClass="button" />
			</div>

			<input type="hidden" id="voucherHeader.id" name="voucherHeader.id"
				value='${voucherHeader.id}' />
			<s:hidden id="bankBalanceMandatory" name="bankBalanceMandatory"
				value="%{isBankBalanceMandatory()}" />
		</div>
	</form:form>
	<div id="resultGrid"></div>
	<script>

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
function onloadtask(){
	document.getElementById('fundId').disabled =true;
			   <c:if test="%{shouldShowHeaderField('vouchernumber')}">
			   var tempVoucherNumber='${voucherHeader.voucherNumber}';
			   var prefixLength='${voucherNumberPrefixLength}';
			   document.getElementById('voucherNumberPrefix').value=tempVoucherNumber.substring(0,prefixLength);
			   document.getElementById('voucherNumber').value=tempVoucherNumber.substring(prefixLength,tempVoucherNumber.length);
			</c:if>
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate()
	var year = currentTime.getFullYear()
	if(document.getElementById('voucherDate').value == ''){
		document.getElementById('voucherDate').value = day + "/" + month + "/" + year ;
	}
	if(document.getElementById('chequeDate').value == ''){
		document.getElementById('chequeDate').value = day + "/" + month + "/" + year ;
	}
	var accnum =  document.getElementById('accountNumber');
	if(accnum.value != -1){
		populateAvailableBalance(accnum)
		populateNarration(accnum)
	}
}
function validateInput(){
		document.getElementById('fundId').enabled =true;
		document.getElementById('lblError').innerHTML = "";
		
		if(document.getElementById('bankId').value == -1){
		document.getElementById('lblError').innerHTML = "Please select a bank ";
		return false;
		}
		if(document.getElementById('voucherDate').value.trim().length == 0){
		document.getElementById('lblError').innerHTML = "Please enter  voucher date ";
		return false;
		}
		if(document.getElementById('accountNumber').value == -1 ){
		document.getElementById('lblError').innerHTML = "Please select an account number ";
		return false;
		}
		if(document.getElementById('amount').value.trim().length == 0 || document.getElementById('amount').value.trim() == 0){
		document.getElementById('lblError').innerHTML = "Please enter an amount greater than zero";
		return false;
		}
		if(document.getElementById('chequeNumber') && document.getElementById('chequeNumber').value == ''){
		document.getElementById('lblError').innerHTML = "Please enter cheque number";
		return false;
		}
		if(document.getElementById('chequeDate').value == ''){
		document.getElementById('lblError').innerHTML = "Please enter cheque date";
		return false;
		}
		var validMis = validateMIS();
		if(validMis == true){
			document.getElementById('fundId').disabled =false;
			//return true;
		}
		else{
			return false;
		}
		if(parseFloat(document.getElementById('amount').value)>parseFloat(document.getElementById('availableBalance').value))
		{
			if(document.getElementById('bankBalanceMandatory').value=='true')
			{
				bootbox.alert('There is no sufficient bank balance');
				return false;
			}
			else
			{
				if(confirm('There is no sufficient bank balance. Do you want to continue?'))
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		return true;
		
}
function validateAmountFormat(){
	var amount = document.getElementById('amount').value.trim();
}
if('<!-- TODO: Manual migration required for custom Struts tag -->'=='')
		document.getElementById('lblError').innerHTML = "bank_balance_mandatory parameter is not defined";
</script>

</body>

</html>
