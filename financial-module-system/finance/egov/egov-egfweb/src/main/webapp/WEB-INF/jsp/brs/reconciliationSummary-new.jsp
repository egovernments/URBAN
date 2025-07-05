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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script type="text/javascript">
	
		function validateBank(){
		var bank = document.getElementById('bank').value;
		if(bank == -1){
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		return true;
	}

  function validateAndSubmit(){
	  
	  var bank = document.getElementById('bankId').value;
	  var bankBranch=document.getElementById('branchId').value;
	  var bankAccount = document.getElementById('accountId').value;
	  var amount = document.getElementById('bankStBalance').value;
	  var stmtDate = document.getElementById('bankStmtDate').value;
	  
	  if(bank== "")
	  {
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
	  if(bankBranch== "")
	  {
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
	  if(bankAccount== "")
	  {
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}

	  if(amount=="")
	  {
		  bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		
		if(stmtDate == "")
		{
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		
	document.forms[0].action='/services/EGF/brs/bankReconciliation-brsSummary.action';
	jQuery(document.forms[0]).append(jQuery('<input>', {
        type : 'hidden',
        name : '${_csrf.parameterName}',
        value : '${_csrf.token}'
    }));
	document.forms[0].submit();
	return true;
	
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
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div style="color: red">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<form:form name="bankReconciliation" action="bankReconciliation"
			theme="simple">

			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr height="25px">
					<td class="bluebox"></td>
				</tr>
				<tr>
					<td class="bluebox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<egov:ajaxdropdown id="branchId" fields="['Text','Value']"
						dropdownId="branchId"
						url="/voucher/common-ajaxLoadBankBranchesByBank.action" />
					<td class="bluebox"><form:select path="bankId" id="bankId"
							list="dropdownData.bankList" listKey="id" listValue="name"
							headerKey="" headerValue="%{getText('lbl.choose.options')}"
							onchange="populatebranch(this);" /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<egov:ajaxdropdown id="accountId" fields="['Text','Value']"
						dropdownId="accountId"
						url="/voucher/common-ajaxLoadBankAccountsByBranch.action" />
					<td class="bluebox"><form:select path="branchId" id="branchId"
							list="dropdownData.branchList" listKey="id"
							listValue="branchname" headerKey="" headerValue="%{getText('lbl.choose.options')}"
							onchange="populateaccount(this);" /></td>
				</tr>
				<tr>

					<td class="bluebox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:select path="accountId" id="accountId"
							list="dropdownData.accountList" listKey="id"
							listValue="chartofaccounts.glcode+'-'+accountnumber" headerKey=""
							headerValue="%{getText('lbl.choose.options')}" /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->:<span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:input path="bankStBalance"
							id="bankStBalance" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/></td>
				</tr>
				<tr>
					<td class="bluebox"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->:<span class="bluebox"><span
							class="mandatory1">*</span></span></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="greybox"><form:input id="bankStmtDate"
							name="bankStmtDate" value="%{BSdate}"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>

				</tr>
			</table>
			<br />
	</div>
	<div class="buttonbottom" style="padding-bottom: 10px;">

		<input type="button" class="buttonsubmit" value='<!-- TODO: Manual migration required for custom Struts tag -->'
			id="search" name="Search" onclick="return validateAndSubmit();" />
		<input type="button" id="Close" value='<!-- TODO: Manual migration required for custom Struts tag -->'
			onclick="javascript:window.close()" class="button" />
	</div>


	</form:form>

</body>

</html>

