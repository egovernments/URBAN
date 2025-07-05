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
<%@ taglib uri="/WEB-INF/tags/cdn.tld" prefix="cdn" %>
<html>

<head>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<link href="/services/EGF/resources/css/budget.css?rnd=${app_release_no}" rel="stylesheet"
	type="text/css" />
<link href="/services/EGF/resources/css/commonegovnew.css?rnd=${app_release_no}" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet" href="/services/EGF/resources/css/tabber.css?rnd=${app_release_no}"
	TYPE="text/css">
<script type="text/javascript" src="/services/EGF/resources/javascript/tabber.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/remitrecovery-helper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/tabber2.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="<cdn:url value='/resources/global/js/egov/inbox.js?rnd=${app_release_no}' context='/services/egi'/>"> </script>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script>

function showHistory(stateId)
{
var url="../voucher/common-showHistory.action?stateId="+stateId;
		window.open(url,'Search','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
}

function loadBank(fundId){
	populatebank({fundId:fundId.options[fundId.selectedIndex].value,typeOfAccount:"PAYMENTS,RECEIPTS_PAYMENTS"})	
}
function loadBankForFund(fundId){
	populatebank({fundId:fundId.options[fundId.selectedIndex].value})	
}
function validateFund(){
	var fund = document.getElementById('fundId').value;
	var bank = document.getElementById('bank');
	if(fund == -1 && bank.options.length==1){
		bootbox.alert("Please select a Fund")
		return false;
	}
	return true;
}
function populateAccNumbers(bankBranch){
	var fund = document.getElementById('fundId');
	id = bankBranch.options[bankBranch.selectedIndex].value.split("-")[1]
	populatebankaccount({branchId:id,fundId:fund.options[fund.selectedIndex].value})	
}
function populateAccNumbersForId(bankBranchId){
	var fund = document.getElementById('fundId');
	populatebankaccount({branchId:bankBranchId,fundId:fund.options[fund.selectedIndex].value})	
}
function onLoadTask(){ 
}
function populateAccNum(branch){
	var fundObj = document.getElementById('fundId');
	var bankbranchId = branch.options[branch.selectedIndex].value;
	var index=bankbranchId.indexOf("-");
	var bankId = bankbranchId.substring(0,index);
	var brId=bankbranchId.substring(index+1,bankbranchId.length);
	
	var vTypeOfAccount = '${%{typeOfAccount}}';
	
	populateaccountNumber({fundId: fundObj.options[fundObj.selectedIndex].value,bankId:bankId,branchId:brId,typeOfAccount:vTypeOfAccount})
}
function checkLength(obj)
{
	if(obj.value.length>1024)
	{
		bootbox.alert('Max 1024 characters are allowed for comments. Remaining characters are truncated.')
		obj.value = obj.value.substring(1,1024);
	}
}

function populateUser(){
	
	var desgFuncry = document.getElementById("designationId").value;
	var array = desgFuncry.split("-");
	var functionary = array[1];
	var desgId = array[0];
	if(desgId==""){ // when user doesnot selects any value in the designation drop down.
		desgId=-1;
	}
	populateapproverUserId({departmentId:document.getElementById("departmentid").value,
	designationId:desgId,functionaryName:functionary})
		
}

function printVoucher(){
	document.forms[0].action='../report/billPaymentVoucherPrint-print.action?id=${paymentheader.id}';
	jQuery(document.forms[0]).append(
            jQuery('<input>', {
                type: 'hidden',
                name: '${_csrf.parameterName}',
                value: '${_csrf.token}'
            })
        );
	document.forms[0].submit();
}
	function validate(obj,name,value)
		{
		document.getElementById('lblError').innerHTML = "";
			if(!validateMIS())
			  return false;
		if(document.getElementById('balanceAvl') && document.getElementById('balanceAvl').style.display=="block" )
			{
			if(obj.id!='wfBtn1') // in case of Reject
				{
			if(parseFloat(document.getElementById('totalAmount').value) > parseFloat(document.getElementById('availableBalance').value))
				{

				var insuffiecientBankBalance ='<!-- TODO: Manual migration required for custom Struts tag -->';
					bootbox.alert(insuffiecientBankBalance);
					return false;
				}
				}
			}  
		
			return true;
		}
	function onSubmit()
	{
		if(validate()){
			 var myform = jQuery('#remittanceForm');
			// re-disabled the set of inputs that you previously
			var disabled = myform.find(':input:disabled').removeAttr('disabled'); 
			disableRemitRecoverView();
			document.remittanceForm.action='${pageContext.request.contextPath}/deduction/remitRecovery-sendForApproval.action';
			jQuery(remittanceForm).append(
                    jQuery('<input>', {
                        type: 'hidden',
                        name: '${_csrf.parameterName}',
                        value: '${_csrf.token}'
                    })
                );
			document.remittanceForm.submit();
		}
		return true;
	}
</script>
</head>
<body>
	<form:form action="remitRecovery" theme="simple" name="remittanceForm"
		id="remittanceForm">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<jsp:include page="../budget/budgetHeader.jsp">
				<jsp:param name="heading" value="Remittance Recovery" />
			</jsp:include>
			<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<div align="center" class="error-block" id="lblError"
					style="font: bold; text-align: center"></div>
			</span>
			
			<font style='color: red;' size="2">
				
			<c:if test="%{finanicalYearAndClosedPeriodCheckIsClosed}">
				<!-- TODO: Manual migration required for custom Struts tag --></s:text>
				</c:if>
				</font>

			<div class="formmainbox">
				<div class="subheadnew">
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>
				<div id="budgetSearchGrid"
					style="display: block; width: 100%; border-top: 1px solid #ccc;">
					<table width="100%" cellpadding="0" cellspacing="0" border="0">
						<tr>
							<td>
								<div align="left">
									<br />
									<table border="0" cellspacing="0" cellpadding="0" width="100%">
										<tr>
											<td>
												<div class="tabber">
													<div class="tabbertab" id="searchtab">
														<h2>
															<!-- TODO: Manual migration required for custom Struts tag -->
														</h2>
														<span>
															<table width="100%" border="0" cellspacing="0"
																cellpadding="0">

																<tr>
																	<td align="center" colspan="6" class="serachbillhead"><s:text
																			name="remit.recovery.header" /></td>
																</tr>
																<tr>
																	<td class="bluebox">&nbsp;</td>
																	<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
																		class="mandatory1">*</span></td>
																	<td class="bluebox"><form:input
																			name="voucherNumber" id="vouchernumber" /></td>
																	<td class="bluebox" width="18%"><s:text
																			name="voucher.date" /><span class="mandatory1">*</span></td>
																	<s:date name='voucherDate' var="voucherDateId"
																		format='dd/MM/yyyy' />
																	<td class="bluebox" width="34%">
																		<div name="daterow">
																			<form:input path="voucherDate" id="voucherDate"
																				maxlength="10"
																				onkeyup="DateFormat(this,this.value,event,false,'3')"
																				size="15" value="%{voucherDateId}" />
																			<A
																				href="javascript:show_calendar('forms[0].voucherDate',null,null,'DD/MM/YYYY');"
																				style="text-decoration: none" align="left"><img
																				img width="18" height="18" border="0"
																				align="absmiddle" alt="Date"
																				src="/services/egi/resources/erp2/images/calendaricon.gif" /></A>
																		</div>
																	</td>
																<tr>
																	<jsp:include
																		page="../voucher/vouchertrans-filter-new.jsp" />

																</tr>
																<tr>
																	<td class="greybox"></td>
																	<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
																		class="greybox"><span class="mandatory1">*</span></span></td>
																	<egov:ajaxdropdown id="bankId"
																		fields="['Text','Value']" dropdownId="bankId"
																		url="/voucher/common-ajaxLoadBanksByFundAndType.action" />
																	<td class="greybox"><form:select
																			name="commonBean.bankId" id="bankId"
																			list="dropdownData.bankList" listKey="bankBranchId"
																			listValue="bankBranchName" headerKey=""
																			headerValue="----Choose----"
																			onChange="populateAccNum(this);" /></td>
																	<egov:ajaxdropdown id="accountNumber"
																		fields="['Text','Value']" dropdownId="accountNumber"
																		url="voucher/common-ajaxLoadBankAccounts.action" />
																	<td class="greybox" width="22%"><s:text
																			name="account.number" /><span class="bluebox"><span
																			class="mandatory1">*</span></span></td>
																	<td class="greybox" width="22%"><form:select
																			name="commonBean.accountNumberId" id="accountNumber"
																			list="dropdownData.accNumList" listKey="id"
																			listValue="chartofaccounts.glcode+'--'+accountnumber+'--'+accounttype"
																			headerKey="" headerValue="----Choose----"
																			onChange="populateNarration(this);populateAvailableBalance(this);" />
																		<form:input path="commonBean.accnumnar"
																			id="accnumnar" readonly="true" tabindex="-1" /></td>
																</tr>
																<tr>
																	<td class="bluebox">&nbsp;</td>
																	<td class="bluebox">Payment Amount</td>
																	<td class="bluebox"><label name="remitAmount"
																		id="remitAmount" /></td>
																	<egov:updatevalues id="availableBalance"
																		fields="['Text']"
																		url="/payment/payment-ajaxGetAccountBalance.action" />
																	<td class="bluebox" id="balanceText"
																		style="display: none" width="18%"><s:text
																			name="balance.available" /></td>
																	<td class="bluebox" id="balanceAvl"
																		style="display: none" width="32%"><form:input
																			name="commonBean.availableBalance"
																			id="availableBalance" readonly="readonly"
																			style="text-align:right"
																			value="%{commonBean.availableBalance}" /></td>
																</tr>
																<tr>
																	<td class="greybox">&nbsp;</td>
																	<td class="greybox">Mode of Payment</td>
																	<td class="greybox"><s:radio name="modeOfPayment"
																			id="paymentMode" list="%{modeOfCollectionMap}" /></td>
																	<td class="greybox" />
																	<td class="greybox" />
																</tr>
																<tr>
																	<td class="bluebox">&nbsp;</td>
																	<td class="bluebox">Narration:</td>
																	<td class="bluebox" colspan="4"><form:textarea
																			name="description" id="description"
																			value="%{voucherHeader.description}" type="text"
																			style="width:580px;"></form:textarea>
																	<td></td>
																</tr>
															</table>
														</span>
													</div>
													<div class="tabbertab" id="contractortab">
														<h2>
															<!-- TODO: Manual migration required for custom Struts tag -->
														</h2>
														<span>
															<table align="center" border="0" cellpadding="0"
																cellspacing="0" class="newtable">
																<tr>
																	<td colspan="6"><div class="subheadsmallnew">
																			<!-- TODO: Manual migration required for custom Struts tag -->
																		</div></td>
																</tr>
																<tr>
																	<td colspan="6">
																		<div style="float: left; width: 100%;">

																			<jsp:include page="remitRecoveryPayment-form.jsp" />
																			<!-- TODO: Manual migration required for custom Struts tag -->
																			<div class="yui-skin-sam" align="center">
																				<div id="recoveryDetailsTableNew"></div>
																			</div>
																			<script>
								populateRecoveryDetailsForPayment();
								document.getElementById('recoveryDetailsTableNew').getElementsByTagName('table')[0].width="80%"
							 </script>
																			<br>

																			<table align="center" id="totalAmtTable">
																				<tr>
																					<td width="80%"></td>
																					<td>Total Amount</td>
																					<td><form:input
																							name="remittanceBean.totalAmount"
																							id="totalAmount" size="10"
																							style='text-align:right' readonly="true"
																							value="0" /></td>
																				</tr>
																			</table>

																		</div>
																	</td>
																</tr>
															</table>
														</span>
													</div>
													<div class="tabbertab" id="chequetab">
														<h2>Cheque Details</h2>
														<span>
															<table align="center" border="0" cellpadding="0"
																cellspacing="0" class="newtable">
																<tr>
																	<td colspan="6"><div class="subheadsmallnew">Cheque
																			Details</div></td>
																</tr>
																<tr>
																	<td colspan="4">
																		<div style="float: left; width: 100%;">
																			<table id="chequeTable" align="center" border="0"
																				cellpadding="0" cellspacing="0" width="100%">
																				<tr>
																					<c:if
																						test="%{paymentheader.type == 'cash' || paymentheader.type == 'Cash' || paymentheader.type == 'Cheque' || paymentheader.type == 'cheque'}">
																						<th class="bluebgheadtdnew">Cheque Number
																						</td>
																						<th class="bluebgheadtdnew">Cheque Date
																						</td>
																					</c:if>
																					<c:otherwise>
																						<th class="bluebgheadtdnew">RTGS Number
																						</td>
																						<th class="bluebgheadtdnew">RTGS Date
																						</td>
																					</s:else>
																					<th class="bluebgheadtdnew">Party Code
																					</td>
																					<th class="bluebgheadtdnew">Cheque Amount(Rs)
																					
																					</td>
																					<th class="bluebgheadtdnew">Cheque Status
																					</td>
																				</tr>
																				<c:if test="%{instrumentHeaderList.size()>0}">
																					<c:forEach var="p" value="instrumentHeaderList"
																						status="s">
																						<tr>
																							<c:if
																								test="%{paymentheader.type == 'cash' || paymentheader.type == 'Cash' || paymentheader.type == 'Cheque' || paymentheader.type == 'cheque'}">
																								<td style="text-align: center"
																									class="blueborderfortdnew"><s:property
																										value="%{instrumentNumber}" /></td>
																								<td style="text-align: center"
																									class="blueborderfortdnew"><s:date
																										name="%{instrumentDate}" format="dd/MM/yyyy" /></td>
																							</c:if>
																							<c:otherwise>
																								<td style="text-align: center"
																									class="blueborderfortdnew"><s:property
																										value="%{transactionNumber}" /></td>
																								<td style="text-align: center"
																									class="blueborderfortdnew"><s:date
																										name="%{transactionDate}" format="dd/MM/yyyy" /></td>
																							</s:else>
																							<td style="text-align: center"
																								class="blueborderfortdnew"><s:property
																									value="%{payTo}" /></td>
																							<td style="text-align: right"
																								class="blueborderfortdnew"><s:text
																									name="format.number">
																									<!-- TODO: Manual migration required for custom Struts tag -->
																								</s:text></td>
																							<td style="text-align: center"
																								class="blueborderfortdnew"><s:property
																									value="%{statusId.description}" /></td>
																						</tr>
																					</c:forEach>
																				</c:if>
																			</table>
																			<c:if
																				test="%{instrumentHeaderList==null || instrumentHeaderList.size==0}">
																				<div class="bottom" align="center">
																					<!-- TODO: Manual migration required for custom Struts tag --></s:text>
																				</div>
																			</c:if>
																		</div>
																	</td>
																</tr>
															</table>
														</span>
													</div>
												</div> <!-- tabber div -->
											</td>
										</tr>
									</table>
								</div>
							</td>
						</tr>
					</table>
				</div>

			</div>
			<div class="buttonbottom" id="buttondiv">
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<c:if test="%{showMode!='view'}">
				<c:if test="%{!finanicalYearAndClosedPeriodCheckIsClosed}">
					<%@ include file='../payment/commonWorkflowMatrix.jsp'%>
					<%@ include file='../workflow/commonWorkflowMatrix-button.jsp'%>
					<s:submit cssClass="button" id="printPreview" value="Print Preview"
						onclick="printVoucher()" />
						</c:if>
						<c:otherwise>
				<input type="button" name="button2" id="button2" value="Close"
						class="button" onclick="window.parent.postMessage('close','*');window.close();" />
				</s:else>
				</c:if>
				<c:otherwise>
					<s:submit cssClass="button" id="printPreview" value="Print Preview"
						onclick="printVoucher()" />
					<input type="button" name="button2" id="button2" value="Close"
						class="button" onclick="window.close();" />
				</s:else>
			</div>
			<script type="text/javascript">
	//bootbox.alert('${fund.id}');                               
	calcTotalForPayment();
	</script>
		</s:push>
		<SCRIPT type="text/javascript">

		var frmIndex=0;
		for(var i=0;i<document.forms[frmIndex].length;i++)
		document.forms[frmIndex].elements[i].disabled =true;
		disableYUIAddDeleteButtons(true);
		if(document.getElementById("closeButton"))
			document.getElementById("closeButton").disabled=false;
		if(document.getElementById("closeButtonNew"))
			document.getElementById("closeButtonNew").disabled=false;
		if(document.getElementById("comments"))
			document.getElementById("comments").disabled=false;
		if(document.getElementById("paymentid"))
			document.getElementById("paymentid").disabled=false;
		if(document.getElementById("actionName"))
			document.getElementById("actionName").disabled=false;
		if(document.getElementById("printPreview"))
			document.getElementById("printPreview").disabled=false;
		if(document.getElementById("cancelPayment"))
			document.getElementById("cancelPayment").disabled=false;	
		if(document.getElementById("approverComments"))
			document.getElementById("approverComments").disabled=false;	
		if(null != document.getElementById("approverDepartment") ){
			document.getElementById("approverDepartment").disabled=false;    
			document.getElementById("approverDesignation").disabled=false;
			document.getElementById("approverPositionId").disabled=false;
			
		}
		if(document.getElementById("currentState"))
			document.getElementById("currentState").disabled=false;		
		if(document.getElementById("currentDesignation"))
			document.getElementById("currentDesignation").disabled=false;		
		if(document.getElementById("additionalRule"))
			document.getElementById("additionalRule").disabled=false;		
		if(document.getElementById("amountRule"))
			document.getElementById("amountRule").disabled=false;		
		if(document.getElementById("workFlowDepartment"))
			document.getElementById("workFlowDepartment").disabled=false;		
		if(document.getElementById("pendingActions"))
			document.getElementById("pendingActions").disabled=false;		
		if(document.getElementById("approverName"))
			document.getElementById("approverName").disabled=false;		
		if(document.getElementById("workFlowAction"))
			document.getElementById("workFlowAction").disabled=false;		
		if(document.getElementById("Forward"))
			document.getElementById("Forward").disabled=false;	
		if(document.getElementById("Reject"))
			document.getElementById("Reject").disabled=false;	
		if(document.getElementById("Cancel"))
			document.getElementById("Cancel").disabled=false;	
		if(document.getElementById("Approve"))
			document.getElementById("Approve").disabled=false;	
		if(document.getElementById("button2"))
			document.getElementById("button2").disabled=false;		
			  	
	<c:if test="%{showMode!='view'}">	
		
	 <c:if test="%{canCheckBalance==true}">
			if(document.getElementById('balanceText'))
			{
				document.getElementById('balanceText').style.display='block';
				document.getElementById('balanceAvl').style.display='block';
				var x=document.getElementById('availableBalance').value;
				x=parseFloat(x);
				document.getElementById('availableBalance').value=x.toFixed(2);
			}
	</c:if>	
	<c:if test="%{balance=='-1'}">
	
	bootbox.alert("FundFlow Report not Generated to check Bank Balance. Please generate Report First");
	for(var i=0;i<document.forms[0].length;i++)
	if(document.forms[0].elements[i].id!='closeButtonNew')
		document.forms[0].elements[i].disabled =true;
	</c:if>
	</c:if>
		
		
		if(document.getElementById("wfBtn0"))
		{
		document.getElementById("wfBtn0").disabled=false;
		}
		if(document.getElementById("wfBtn1"))
		{
		document.getElementById("wfBtn1").disabled=false;
		}
		if(document.getElementById("wfBtn2"))
		{
		document.getElementById("wfBtn3").disabled=false;
		}
		
		
</SCRIPT>
	</form:form>

</body>

</html>
