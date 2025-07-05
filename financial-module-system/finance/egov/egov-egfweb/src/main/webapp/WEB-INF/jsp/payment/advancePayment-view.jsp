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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/advancePaymentHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<style>
@media print {
	input#printbutton {
		display: none;
	}
}

@media print {
	input#closeButton {
		display: none;
	}
}

@media print {
	div.commontopyellowbg {
		display: none;
	}
}

@media print {
	div.commontopbluebg {
		display: none;
	}
}
</style>
<script>
window.history.forward(1);
function noBack() {
	window.history.forward(); 
}

var insuffiecientBankBalance ='<!-- TODO: Manual migration required for custom Struts tag -->';

function validateAppoveUser(actionName,actionDescription){
	document.getElementById("actionName").value= actionName;
	<c:if test="%{wfitemstate =='END'}">
		if(actionDescription == 'Approve' || actionDescription == 'Reject') {
			document.getElementById("approverUserId").value=-1;
			return true;
		}
	</c:if>
	<c:otherwise>
		if( (actionDescription == 'Approve' || actionDescription == 'Forward' || actionDescription=='Save And Forward' ) && null != document.getElementById("approverUserId") && document.getElementById("approverUserId").value == -1){
			bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
			return false;
		}
	</s:else>
	
	return true;
}

function viewARF(sourcePath){
	window.open(sourcePath,'', 'height=650,width=980,scrollbars=yes,left=0,top=0,status=yes');
} 

function printVoucher() {
	document.forms[0].action='../report/billPaymentVoucherPrint!print.action?id=${paymentheader.id}';
	document.forms[0].submit();
} 

function showHistory(stateId) {
var url="../voucher/common!showHistory.action?stateId="+stateId;
	window.open(url,'Search','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
}

function balanceCheck(obj, actionName,actionDescription) {
	if(!validateAppoveUser(actionName,actionDescription))
		return false;

	if(obj.id=='wfBtn1') // in case of Reject
		return true;
	if(document.getElementById('bankAccountBalance')) {
		if(parseFloat(eval('${paymentheader.paymentAmount}'))>parseFloat(eval(document.getElementById('bankAccountBalance').innerHTML))) {
			bootbox.alert(insuffiecientBankBalance);
			return false;
		}
	}
	return true;
}


</script>
</head>
<body class="yui-skin-sam" onload="noBack();"
	onpageshow="if(event.persisted) noBack();" onunload="">
	<div class="error-block" id="advancePayment_error"
		style="display: none; color: red;"></div>
	<c:if test="%{hasErrors() || hasActionMessages()}">
		<div class="error-block" style="color: red; align: left">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
	</c:if>
	<form:form action="advancePayment" theme="css_xhtml"
		name="advancePaymentViewForm">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param value="Advance Payment View" name="heading" />
		</jsp:include>
		<!-- TODO: Manual migration required for custom Struts tag -->
			<c:if test="%{advanceRequisitionId != null}">
				<s:hidden name="advanceRequisitionId"
					value="%{advanceRequisitionId}" id="advanceRequisitionId" />
			</c:if>
			<!-- TODO: Manual migration required for custom Struts tag -->
			<div class="formmainbox">
				<div class="formheading" />
				<div class="subheadnew">
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><strong><s:text
											name="voucher.number" /></strong></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="bluebox"><strong><s:text
											name="advancepayment.date" /></strong></td>
								<td class="bluebox"><s:date name="voucherDate"
										format="dd/MM/yyyy" /></td>
							</tr>
							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><strong><s:text
											name="arf.arfdate" /></strong></td>
								<td class="greybox"><s:date
										name="advanceRequisition.advanceRequisitionDate"
										format="dd/MM/yyyy" /></td>
								<td class="greybox"><strong><s:text
											name="arf.arfnumber" /></strong></td>
								<td class="greybox"><a href="#"
									onclick="viewARF('<!-- TODO: Manual migration required for custom Struts tag -->')">
										<s:property
											value="%{advanceRequisition.advanceRequisitionNumber}" />
								</a></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><strong><s:text
											name="arf.function" /></strong></td>
								<td class="bluebox"><s:property
										value="%{paymentheader.voucherheader.vouchermis.function.name}" /></td>
								<td class="bluebox"><strong><s:text
											name="arf.fund" /></strong></td>
								<td class="bluebox"><s:property
										value="%{paymentheader.voucherheader.fundId.Name}" /></td>
							</tr>
							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><strong><s:text
											name="arf.advance.coa" /></strong></td>
								<td class="greybox"><c:forEach
										value="advanceRequisition.egAdvanceReqDetailses" var="detail">
										${#detail.chartofaccounts.glcode} - <s:property
											value="#detail.chartofaccounts.name" />
									</c:forEach></td>
								<td class="greybox"><strong><s:text
											name="arf.advanceamount" /></strong></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->
										<s:param name="value"
											value="advanceRequisition.advanceRequisitionAmount" />
									</s:text></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><strong><s:text
											name="arf.contractor" /></strong></td>
								<td class="bluebox"><s:property
										value="%{advanceRequisition.egAdvanceReqMises.payto}" /></td>
								<td class="bluebox"><strong><s:text
											name="arf.department" /></strong></td>
								<td class="bluebox"><s:property
										value="%{paymentheader.voucherheader.vouchermis.departmentid.deptName}" />
								</td>
							</tr>
							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><strong><s:text
											name="arf.bankbranch" /></strong></td>
								<td class="greybox"><s:property
										value="%{paymentheader.bankaccount.bankbranch.bank.name}" />-<s:property
										value="%{paymentheader.bankaccount.bankbranch.branchname}" />
								</td>
								<td class="greybox"><strong><s:text
											name="arf.bank.accountnumber" /></strong></td>
								<td class="greybox"><s:property
										value="%{paymentheader.bankaccount.accountnumber}" />-<s:property
										value="%{paymentheader.bankaccount.accounttype}" /></td>
							</tr>
							<tr id="bankbalanceRow" style="visibility: hidden">
								<td class="bluebox" width="10%">&nbsp;</td>
								<td class="bluebox" width="15%"><strong><s:text
											name="balance.available" />(Rs)</strong></td>
								<td class="bluebox" colspan="4"><span
									id="bankAccountBalance" /></span></td>
							</tr>

							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><strong><s:text
											name="modeofpayment" /></strong></td>
								<td class="greybox"><s:property
										value="%{commonBean.modeOfPayment}" /></td>
								<td class="greybox"><strong><s:text
											name="payment.amount" />(Rs)</strong></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><strong><s:text
											name="voucher.narration" /></strong></td>
								<td class="bluebox" colspan="3"><s:property
										value="%{paymentheader.voucherheader.description}" /></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="5">&nbsp;</td>
				</tr>

				<c:if test="%{!hasActionMessages()}">
					<tr>
						<td><c:if test="%{!wfitemstate.equalsIgnoreCase('END')}">
								<%@include file="../voucher/workflowApproval.jsp"%>
							</c:if></td>
					</tr>
					<c:if test="%{showApprove}">
						<tr>
							<td class="bluebox" style="text-align: center"><strong><s:text
										path="arf.wf.label.comments" /></strong> <form:textarea path="comments"
									id="comments" cols="100" rows="3" onblur="checkLength(this)"
									value="%{getComments()}" /></td>
						</tr>
					</c:if>
				</c:if>
			</table>
			<c:if test="%{showApprove}">
				<c:if test="%{paymentheader.state.value != 'NEW'}">
					<c:if test="%{paymentheader.state.id!=null}">
						<div id="labelAD" align="center">
							<h5>
								<a href="#"
									onclick="showHistory(<!-- TODO: Manual migration required for custom Struts tag -->); "><s:text
										name="message.show.history" /></a>
							</h5>
						</div>
					</c:if>
				</c:if>

				<table align="center">
					<tr class="buttonbottom" id="buttondiv" style="align: middle">
						<!-- TODO: Manual migration required for custom Struts tag -->
						<c:if test="%{!hasActionMessages()}">
							<c:forEach value="%{getValidActions()}" var="p" status="s">
								<td><s:submit type="submit" cssClass="buttonsubmit"
										value="%{description}" id="wfBtn%{#s.index}" name="%{name}"
										method="sendForApproval"
										onclick="return balanceCheck(this, '%{name}','%{description}')" />
								</td>
							</c:forEach>
							<c:if test="%{paymentheader.state.value.contains('Reject')}">
								<td><s:submit method="cancelPayment" value="Cancel Payment"
										cssClass="buttonsubmit"
										onclick="document.getElementById('actionName').value='cancelPayment';" /></td>
							</c:if>
						</c:if>
						<td><s:submit cssClass="button" id="printPreview"
								value="Print Preview" onclick="printVoucher()" /></td>
						<td><input type="button" value="Close" id="Close"
							onclick="javascript:window.close()" class="button" /></td>
					</tr>
				</table>
				<script>
		  <c:if test="%{hasActionMessages()}">   
			  if(opener && opener.top && opener.top.document.getElementById('inboxframe'))
				opener.top.document.getElementById('inboxframe').contentWindow.egovInbox.refresh();
		 </c:if>
			if(document.getElementById('actionName').value!='' ||( '<%=request.getParameter("showMode")%>'!=null && '<%=request.getParameter("showMode")%>'=='view'))
			{
				if(document.getElementById('wfBtn0'))
					document.getElementById('wfBtn0').style.display='none';
				if(document.getElementById('wfBtn1'))
					document.getElementById('wfBtn1').style.display='none';
			}
		    <c:if test="%{showMode!='view'}" >
				<c:if test="%{validateUser('balancecheck')}">
						if(document.getElementById('bankbalanceRow')) {
							document.getElementById('bankbalanceRow').style.visibility='visible';
							document.getElementById('bankAccountBalance').innerHTML='${%{balance}}'
						}  
				</c:if>
				<c:if test="%{balance=='-1'}">
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
					for(var i=0;i<document.forms[0].length;i++)
					if(document.forms[0].elements[i].id!='Close')
						document.forms[0].elements[i].disabled =true;   
				</c:if>
			</c:if>
		
		</script>
			</c:if>
			<c:otherwise>
				<input type="button" value="Close" id="Close"
					onclick="javascript:window.close()" class="button" />
			</s:else>
			<div align="right" class="mandatory"
				style="font-size: 11px; padding-right: 20px;">
				*
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			</div>
			<!-- end of formmainbox -->
		</s:push>
	</form:form>
</body>
</html>
