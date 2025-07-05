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
<script>
window.history.forward(1);
function noBack() {
	window.history.forward(); 
}

function populateAccNum(bankBranch){
	var vTypeOfAccount = '${%{typeOfAccount}}';
	var fundId = '${%{advanceRequisition.egAdvanceReqMises.fund.id}}';
	var bankAndBranchIds =  bankBranch.options[bankBranch.selectedIndex].value.split("-");
	var bankId = bankAndBranchIds[0];
	var bankBranchId = bankAndBranchIds[1];
	populateaccountNumber({fundId: fundId,bankId:bankId,branchId:bankBranchId,typeOfAccount:vTypeOfAccount})
}

function validateInputBeforeSubmit() {
	voucherDate = document.advancePaymentForm.voucherDate.value;
	advanceRequisitionDate = '<!-- TODO: Manual migration required for custom Struts tag -->';
	currentDate = '<%=new java.text.SimpleDateFormat("dd/MM/yyyy").format(new java.util.Date())%>';
	if(voucherDate == '') {
		dom.get("advancePayment_error").innerHTML='<!-- TODO: Manual migration required for custom Struts tag -->'; 
        dom.get("advancePayment_error").style.display='';
        window.scroll(0,0);
		return false;
	}	 

	if(compareDate(voucherDate,advanceRequisitionDate) == 1 ) {
		dom.get("advancePayment_error").innerHTML='<!-- TODO: Manual migration required for custom Struts tag -->';
	    dom.get("advancePayment_error").style.display='';
	    window.scroll(0,0);
	    return false;
	}

	if(compareDate(voucherDate,currentDate) == -1 ){
		dom.get("advancePayment_error").innerHTML='<!-- TODO: Manual migration required for custom Struts tag -->'; 
       	dom.get("advancePayment_error").style.display='';
       	window.scroll(0,0);
		return false;
	 }	
	
	bankBranchId = document.getElementById('bankId').value;
	if(bankBranchId == '' || bankBranchId == 0 || bankBranchId == -1) {
		dom.get("advancePayment_error").innerHTML='<!-- TODO: Manual migration required for custom Struts tag -->'; 
        dom.get("advancePayment_error").style.display='';
        window.scroll(0,0);
		return false;
	}	 

	accountNumber = document.getElementById('accountNumber').value;
	if(accountNumber == '' || accountNumber == 0 || accountNumber == -1) {
		dom.get("advancePayment_error").innerHTML='<!-- TODO: Manual migration required for custom Struts tag -->'; 
        dom.get("advancePayment_error").style.display='';
        window.scroll(0,0);
		return false;
	}	
	
	dom.get("advancePayment_error").style.display="none";
	return true;	
}

function validateAppoveUser(name,value){
	document.getElementById("actionName").value= name;
	<c:if test="%{wfitemstate =='END'}">
		if(value == 'Approve' || value == 'Reject') {
			document.getElementById("approverUserId").value=-1;
			return true;
		}
	</c:if>
	<c:otherwise>
		if( (value == 'Approve' || value == 'Forward' || value=='Save And Forward' ) && null != document.getElementById("approverUserId") && document.getElementById("approverUserId").value == -1){
			bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
			return false;
		}
	</s:else>
	
	return true;
}

</script>
</head>
<body class="yui-skin-sam" onload="noBack();"
	onpageshow="if(event.persisted) noBack();" onunload="">
	<div class="error-block" id="advancePayment_error"
		style="display: none; color: red;"></div>
	<c:if test="%{hasErrors()}">
		<div class="error-block" style="color: red; align: left">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
	</c:if>
	<form:form action="advancePayment" theme="css_xhtml"
		name="advancePaymentForm">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param value="Advance Payment" name="heading" />
		</jsp:include>
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
			<c:if test="%{advanceRequisitionId != null}">
				<s:hidden name="advanceRequisitionId"
					value="%{advanceRequisitionId}" id="advanceRequisitionId" />
			</c:if>
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
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;<span
									class="mandatory">*</span></td>
								<td class="bluebox" style="white-space: nowrap;"><s:date
										name="voucherDate" var="voucherDateFormat" format="dd/MM/yyyy" />
									<form:input path="voucherDate" value="%{voucherDateFormat}"
										id="voucherDate" maxlength="10" size="15"
										onfocus="javascript:vDateType='3';"
										onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
									href="javascript:show_calendar('forms[0].voucherDate',null,null,'DD/MM/YYYY');"
									onmouseover="window.status='Date Picker';return true;"
									onmouseout="window.status='';return true;"> <img
										id="voucherDateImage"
										src="/services/egi/resources/erp2/images/calendaricon.gif"
										alt="Calendar" width="16" height="16" border="0"
										align="absmiddle" /></a></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="bluebox"><s:property
										value="%{advanceRequisition.egAdvanceReqMises.egDepartment.deptName}" />
								</td>
							</tr>
							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="greybox"><s:date
										name="advanceRequisition.advanceRequisitionDate"
										format="dd/MM/yyyy" /></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="greybox"><a href="#"
									onclick="viewARF('<!-- TODO: Manual migration required for custom Struts tag -->')">
										<s:property
											value="%{advanceRequisition.advanceRequisitionNumber}" />
								</a></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="bluebox"><s:property
										value="%{advanceRequisition.egAdvanceReqMises.function.name}" /></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="bluebox"><s:property
										value="%{advanceRequisition.egAdvanceReqMises.fund.Name}" /></td>
							</tr>
							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="greybox"><c:forEach
										value="advanceRequisition.egAdvanceReqDetailses" var="detail">
										${#detail.chartofaccounts.glcode} - <s:property
											value="#detail.chartofaccounts.name" />
									</c:forEach></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="greybox" style="text-align: center"><s:text
										name="payment.format.number">
										<s:param name="value"
											value="advanceRequisition.advanceRequisitionAmount" />
									</s:text></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="bluebox"><s:property
										value="%{advanceRequisition.egAdvanceReqMises.payto}" /></td>
								<td class="bluebox"></td>
								<td class="bluebox"></td>
							</tr>
							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;<span
									class="mandatory">*</span></td>
								<td class="greybox"><form:select path="commonBean.bankId"
										id="bankId" list="dropdownData.bankBranchList"
										listKey="bank.id+'-'+id"
										listValue="bank.name+' - '+branchname" headerKey="-1"
										headerValue="----Choose----" onChange="populateAccNum(this);" />
									<egov:ajaxdropdown id="accountNumber" fields="['Text','Value']"
										dropdownId="accountNumber"
										url="voucher/common!ajaxLoadAccNumAndType.action" /></td>
								<td class="greybox"></td>
								<td class="greybox"></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;<span
									class="mandatory">*</span></td>
								<td class="bluebox"><form:select
										name="commonBean.accountNumberId" id="accountNumber"
										list="dropdownData.accountNumberList" listKey="id"
										listValue="accountnumber+'-'+accounttype" headerKey="-1"
										headerValue="----Choose----" /></td>
							</tr>

							<tr>
								<td width="10%" class="greybox"></td>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;<span
									class="mandatory">*</span></td>
								<td class="greybox"><s:radio
										name="commonBean.modeOfPayment" id="modeOfPayment"
										list="%{modeOfPaymentMap}" /></td>
								<td class="greybox"></td>
								<td class="greybox"></td>
							</tr>
							<tr>
								<td width="10%" class="bluebox"></td>
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="bluebox" colspan="3"><form:textarea
										name="description" id="description" style="width:580px"
										onblur="checkVoucherNarrationLen(this)" /></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="5">&nbsp;</td>
				</tr>
				<tr>
					<td><c:if test="%{!wfitemstate.equalsIgnoreCase('END')}">
							<%@include file="../voucher/workflowApproval.jsp"%>
						</c:if></td>
				</tr>
				<tr>
					<td class="bluebox" style="text-align: center"><strong><s:text
								path="arf.wf.label.comments" /></strong> <form:textarea path="comments"
							id="comments" cols="100" rows="3" onblur="checkLength(this)"
							value="%{getComments()}" /></td>
				</tr>
				<tr>
					<td colspan="5"><div align="right" class="mandatory"
							style="font-size: 11px; padding-right: 20px;">
							*
							<!-- TODO: Manual migration required for custom Struts tag -->
						</div></td>
				</tr>
			</table>
			<table align="center">
				<tr class="buttonbottom" id="buttondiv" style="align: middle">
					<!-- TODO: Manual migration required for custom Struts tag -->
					<c:forEach value="%{getValidActions()}" var="p" status="s">
						<td><s:submit type="submit" cssClass="buttonsubmit"
								value="%{description}" id="wfBtn%{#s.index}" name="%{name}"
								method="save"
								onclick="return validateForm('%{name}','%{description}')" /></td>
					</c:forEach>
					<td><input type="button" value="Close"
						onclick="javascript:window.close()" class="button" /></td>
				</tr>
			</table>
			</div>
			<!-- end of formmainbox -->
		</s:push>
	</form:form>
</body>
</html>
