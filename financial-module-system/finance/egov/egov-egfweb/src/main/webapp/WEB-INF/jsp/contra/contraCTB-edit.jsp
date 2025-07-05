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
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>


<script type="text/javascript"
	src="/services/EGF/resources/javascript/calender.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title>Contra - Cash Deposit</title>

</head>


<body onload="onloadtask();">
	<form:form action="contraCTB" theme="simple" name="cashDepositForm">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<jsp:include page="../budget/budgetHeader.jsp">
				<jsp:param name="heading" value="Cash Deposit" />
			</jsp:include>

			<span class="mandatory"> <font
				style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag --></font>
			</span>
			<div class="formmainbox">
				<div class="formheading" />
				<div class="subheadnew">Cash Deposit</div>
				<div id="listid" style="display: block">
					<div align="center">
						<font style='color: red; font-weight: bold'>
							<p class="error-block" id="lblError"></p>
						</font>

						<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
						<table border="0" width="100%">
							<tr>
								<c:if test="%{shouldShowHeaderField('vouchernumber')}">
									<td class="bluebox" width="22%"><s:text
											name="voucher.number" /><span class="mandatory">*</span></td>
									<td class="bluebox" width="22%">
										<table width="100%">
											<tr>
												<td style="width: 25%"><input type="text"
													name="voucherNumberPrefix" id="voucherNumberPrefix"
													readonly="true" style="width: 100%" /></td>
												<td style="width: 75%"><form:input
														name="voucherNumber" id="voucherNumber" /></td>
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
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
									class="mandatory">*</span></td>
								<td class="bluebox"><s:date name="voucherDate"
										var="voucherDateId" format="dd/MM/yyyy" /> <form:input
										name="voucherDate" id="voucherDate" value="%{voucherDateId}"
										maxlength="10"
										onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
									href="javascript:show_calendar('cashDepositForm.voucherDate',null,null,'DD/MM/YYYY');"
									style="text-decoration: none">&nbsp;<img tabIndex=-1
										src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)
								</td>
							</tr>
							<tr>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
									class="greybox"><span class="mandatory">*</span></span></td>
								<td class="greybox" colspan="3"><form:select
										name="contraBean.bankBranchId" id="bankId"
										list="dropdownData.bankList" listKey="bankBranchId"
										listValue="bankBranchName" headerKey="-1"
										headerValue="----Choose----" onChange="populateAccNum(this);" /></td>
							</tr>
							<tr>
								<egov:ajaxdropdown id="accountNumber" fields="['Text','Value']"
									dropdownId="accountNumber"
									url="voucher/common!ajaxLoadAccNum.action" />
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
									class="bluebox"><span class="mandatory">*</span></span></td>
								<td class="bluebox"><form:select
										name="contraBean.accountNumberId" id="accountNumber"
										list="dropdownData.accNumList" listKey="id"
										listValue="accountnumber" headerKey="-1"
										headerValue="----Choose----"
										onChange="populateNarration(this);" /> <form:input
										name="contraBean.accnumnar" id="accnumnar"
										value="%{contraBean.accnumnar}" readonly="true" tabindex="-1" />
								</td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span
									class="bluebox"><span class="mandatory">*</span></span></td>
								<td class="bluebox"><form:input path="contraBean.amount"
										id="amount" onkeyup="amountFormat()"
										cssStyle="text-align:right" /></td>
							</tr>
							<jsp:include page="../voucher/vouchertrans-filter.jsp" />
							<tr id="chequeGrid">

								<td class="greybox"><span id="mdcNumber"><s:text
											name="contra.refNumber" /></span> <span class="greybox"><span
										class="mandatory">*</span></span></td>
								<td class="greybox"><form:input
										name="contraBean.chequeNumber" id="documentNum"
										value="%{contraBean.chequeNumber}" /></td>
								<td class="greybox"><span id="mdcDate"><s:text
											name="contra.refDate" /></span></td>
								<td class="greybox"><form:input
										name="contraBean.chequeDate" id="documentDate"
										onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
									href="javascript:show_calendar('cashDepositForm.documentDate');"
									style="text-decoration: none">&nbsp;<img tabIndex="-1"
										src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)</td>

							</tr>
							<tr>

								<td width="30%" class="bluebox">Narration &nbsp;</td>
								<td colspan="10" class="bluebox"><form:textarea
										maxlength="250" rows="4" cols="60" name="narration" /></td>
							</tr>
						</table>

						<table border="0" width="100%">

							<tr>
								<td class="greybox" width="25%"><s:text
										name="contra.cashInHand" /></td>
								<td class="greybox" width="25%"><form:input
										name="contraBean.cashInHand" id="cashInHand" tabindex="-1"
										readonly="true" /></td>
								<td class="greybox" width="25%"></td>
								<td class="greybox" width="25%"></td>
							</tr>
						</table>
						<div class="subheadsmallnew" /></div>
						<div class="mandatory" align="left">* Mandatory Fields</div>
					</div>
					<div>
						<table border="0" width="80%" align="center">
							<tr></tr>
							<tr>
								<td><s:submit type="submit" cssClass="buttonsubmit"
										value="Save & Close" id="save&close" name="save&close"
										method="create" onclick="return validateInput('saveclose')" />
									<s:submit type="submit" cssClass="buttonsubmit"
										value="Save & New" id="save&new" name="save&new"
										method="create" onclick="return validateInput('savenew')" /> <s:submit
										type="submit" cssClass="buttonsubmit" value="Save & View"
										id="save&view" name="save&view" method="create"
										onclick="return validateInput('saveview')" /> <s:submit
										name="Cancel" type="submit" cssClass="button" id="Cancel"
										value="Cancel"
										onclick="document.getElementById('button').value=''"
										method="newform" /> <input type="submit" value="Close"
									onclick="javascript:window.close()" cssClass="buttonsubmit"
									class="button" /></td>
							</tr>
						</table>

					</div>
				</div>
			</div>
			</div>

			<input type="hidden" id="voucherTypeBean.voucherName"
				name="voucherTypeBean.voucherName" value="CashToBank" />
			<input type="hidden" id="voucherTypeBean.voucherType"
				name="voucherTypeBean.voucherType" value="Contra" />
			<input type="hidden" id="voucherTypeBean.voucherNumType"
				name="voucherTypeBean.voucherNumType" value="Contra" />
			<input type="hidden" id="voucherTypeBean.cgnType"
				name="voucherTypeBean.cgnType" value="CTB" />
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag --></s:hidden>
			<s:hidden id="vouchermis.sourcePath" name="vouchermis.sourcePath"
				value="../contra/contraCTB!loadCTBVoucher.action?vhid="></s:hidden>
		</s:push>
	</form:form>
	<script>

function onloadtask(){
document.getElementById('fundId').disabled =true;
var saveMode='${contraBean.saveMode}';
	var result='${contraBean.result}';
	if(result == 'success'){
	var voucherNumber = '<!-- TODO: Manual migration required for custom Struts tag -->' ;
		if(saveMode == 'saveclose'){
			bootbox.alert("Payinslip voucher created sucessfully with voucher number =  "+voucherNumber);
				window.close();
		} else if(saveMode == 'saveview'){
				bootbox.alert("Payinslip voucher created sucessfully with voucher number =  "+voucherNumber );
				window.open('../voucher/preApprovedVoucher!loadvoucherview.action?vhid=<!-- TODO: Manual migration required for custom Struts tag -->','Search','resizable=yes,scrollbars=yes,left=300,top=40,width=900, height=700');
			}
	}		
			   <c:if test="%{shouldShowHeaderField('vouchernumber')}">
			   var tempVoucherNumber='${voucherHeader.voucherNumber}';
			   var prefixLength='${voucherNumberPrefixLength}';
			   document.getElementById('voucherNumberPrefix').value=tempVoucherNumber.substring(0,prefixLength);
			   document.getElementById('voucherNumber').value=tempVoucherNumber.substring(prefixLength,tempVoucherNumber.length);
			</c:if>
}
	function validateInput(saveMode)
	{
		document.getElementById('saveMode').value=saveMode;
		document.getElementById('fundId').enabled =true;
		document.getElementById('lblError').innerHTML = "";
		
		if(document.getElementById('voucherNumber') && document.getElementById('voucherNumber').value.trim().length == 0){
		document.getElementById('lblError').innerHTML = "Please enter voucher number";
		return false;
		}
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
		if(document.getElementById('documentNum').value.trim().length == 0 || document.getElementById('documentNum').value.trim() ==""){
		document.getElementById('lblError').innerHTML = "Please enter an Reference Number";
		return false;
		}
		if(document.getElementById('documentDate').value.trim().length == 0 || document.getElementById('documentDate').value.trim() == 0){
		document.getElementById('lblError').innerHTML = "Please enter an Reference date";
		return false;
		}
		var validMis = validateMIS();
		if(validMis == true){
			document.getElementById('fundId').disabled =false;
			return true;
		}
		else{
			return false;
		}
		
}
function amountFormat(){

		var amount = document.getElementById('amount').value.trim();
		var amountlastchar = amount.substring(amount.length-1,amount.length);
		 var alphaCheck = "0123456789.";
		
	  if (alphaCheck.indexOf(amountlastchar) == -1 ) {
	   		document.getElementById('amount').value=amount.substring(0,amount.length-1);
	   		document.getElementById('amount').focus;
	   }
}
	if(dom.get('saveMode').value=='savenew' && dom.get('result').value=='sucess')
			{
				if(document.getElementById('fundId')){
					document.getElementById('fundId').value=-1;
				}
				if(document.getElementById('vouchermis.departmentid')){
					document.getElementById('vouchermis.departmentid').value=-1;
				}
				if(document.getElementById('schemeid')){
					document.getElementById('schemeid').value=-1;
				}
				if(document.getElementById('subschemeid')){
					document.getElementById('subschemeid').value=-1;
				}
				if(document.getElementById('vouchermis.functionary')){
					document.getElementById('vouchermis.functionary').value=-1;
				}
				if(document.getElementById('fundsourceId')){
					document.getElementById('fundsourceId').value=-1;
				}
				if(document.getElementById('vouchermis.divisionid')){
					document.getElementById('vouchermis.divisionid').value=-1;
				}
				if(document.getElementById('voucherNumber')){
					document.getElementById('voucherNumber').value='';
				}
				document.getElementById('bankId').value=-1;
				document.getElementById('accountNumber').value=-1;
				document.getElementById('accnumnar').value="";
				document.getElementById('amount').value=0;
			}	
			var voucherNumber = '<!-- TODO: Manual migration required for custom Struts tag -->' ;
			var cgn = '<!-- TODO: Manual migration required for custom Struts tag -->' ;
			
			if(dom.get('result').value=='sucess')
			{
				bootbox.alert("Transaction Succesfully Completed and VoucherNumber is :  "+voucherNumber);
				if(dom.get('saveMode').value=='saveclose'){
					window.close();
				}else if(dom.get('saveMode').value=='saveview'){
					var vhId='<!-- TODO: Manual migration required for custom Struts tag -->';
					document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher!loadvoucherview.action?vhid="+vhId;
					document.forms[0].submit();
					
					
				}
			}
	
function populateAccNum(branch){

	var bankbranchId = branch.options[branch.selectedIndex].value;
	var index=bankbranchId.indexOf("-");
	var bankId = bankbranchId.substring(0,index);
	var brId=bankbranchId.substring(index+1,bankbranchId.length);
	populateaccountNumber({bankId:bankId,branchId:brId})
}
function populateNarration(accnumObj){
	var accnum =  accnumObj.options[accnumObj.selectedIndex].value;
	var url = '../voucher/common!loadAccNumNarrationAndFund.action?accnum='+accnum;
	YAHOO.util.Connect.asyncRequest('POST', url, postType, null);

}
var postType = {
success: function(o) {
		var narrationfund= o.responseText;
		var index=narrationfund.indexOf("-");
		document.getElementById('accnumnar').value=narrationfund.substring(o,index);	
		var fundid = narrationfund.substring(index+1,narrationfund.length);	
		document.getElementById('fundId').value = fundid;
		document.getElementById('fundId').disabled =true;
		populateschemeid({fundId:fundid})
    },
    failure: function(o) {
    	bootbox.alert('failure');
    }
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
</script>

</body>

</html>
