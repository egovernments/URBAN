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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
</head>
<body>
	<form:form action="chequeAssignment" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Cheque Assignment View" />
		</jsp:include>
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<span><font color="green"><!-- TODO: Manual migration required for custom Struts tag --></font></span>
		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<c:if test="%{paymentMode=='cheque' || paymentMode=='cash'}">
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.partycode" /></th>

						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.serialno" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.no" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.amount" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.date" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.status" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="instrument.bankadvice" /></th>
						<c:if
							test="%{chequePrintingEnabled && chequePrintAvailableAt=='assignment'}">
							<th class="bluebgheadtdnew"></th>
						</c:if>

					</c:if>
					<c:otherwise>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.paymentvoucherno" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.rtgs.refno" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.rtgs.amount" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.rtgs.date" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.status" /></th>
					</s:else>

				</tr>
				<c:if test="%{paymentMode=='cheque'|| paymentMode=='cash'}">
					<c:forEach var="p" value="instHeaderList" status="s">
						<tr>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{payTo}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{serialNo.finYearRange}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{instrumentNumber}" /></td>
							<td style="text-align: right" class="blueborderfortdnew"><s:text
									name="format.number">
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:date
									name="%{instrumentDate}" format="dd/MM/yyyy" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{statusId.description}" /></td>
							<td class="blueborderfortd"><div align="center">
									<a
										href='/services/EGF/payment/chequeAssignment-bankAdviceExcel.action?instHeaderId=${id}'>
										<!-- TODO: Manual migration required for custom Struts tag -->
									</a>
								</div></td>
							<c:if
								test="%{chequePrintingEnabled && chequePrintAvailableAt=='assignment'}">
								<td style="text-align: center" class="blueborderfortdnew">
									<input type="submit" value="Print"
									onclick="return printCheque(<s:property
						value="%{id}" />);"
									class="button" />
								</td>
							</c:if>
							<input type="hidden" name='chequeFormatId' id="chequeFormatId"
								value="${chequeFormat}" />

						</tr>
					</c:forEach>
				</c:if>
				<c:otherwise>
					<c:forEach var="p" value="instVoucherList" status="s">
						<tr>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{voucherHeaderId.voucherNumber}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{instrumentHeaderId.transactionNumber}" /></td>
							<td style="text-align: right" class="blueborderfortdnew"><s:property
									value="%{instrumentHeaderId.instrumentAmount}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:date
									name="%{instrumentHeaderId.transactionDate}"
									format="dd/MM/yyyy" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{instrumentHeaderId.statusId.description}" /></td>

						</tr>
					</c:forEach>
					<input type="hidden" name='transactionNumber'
						id="transactionNumber"
						value="${instVoucherList[0].instrumentHeaderId.id}" />
					<input type="hidden" name='bankAccountNoId' id="bankAccountNoId"
						value="${instVoucherList[0].instrumentHeaderId.bankAccountId.id}" />
					<input type="hidden" name='bankBranchId' id="bankBranchId"
						value="${instVoucherList[0].instrumentHeaderId.bankAccountId.bankbranch.id}" />
					<input type="hidden" name='bank' id="bank"
						value="${instVoucherList[0].instrumentHeaderId.bankAccountId.bankbranch.bank.id}" />
					<input type="hidden" name='chequeFormatId' id="chequeFormatId"
						value="${instVoucherList[0].instrumentHeaderId.bankAccountId.chequeformat}" />

				</s:else>
			</table>
			<br />
			<div class="buttonbottom">

				<c:if test="%{paymentMode=='rtgs'}">
					<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
						class="buttonsubmit" onclick="return printAdviceExcel()" />
					<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
						class="buttonsubmit" onclick="return printAdvicePdf()" />
				</c:if>
				<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
					onclick="javascript:window.parent.postMessage('close','*');" class="buttonsubmit" />
			</div>
		</div>
	</form:form>
	<script>      
function printAdviceExcel(){
	 	 var bank=document.getElementById("bank").value;
	 	var bankbranch=document.getElementById("bankBranchId").value;
	 	var bankaccount=document.getElementById("bankAccountNoId").value;
	 	 var instrumentnumber=document.getElementById("transactionNumber").value;
		 var url="${pageContext.request.contextPath}/report/bankAdviceReport!exportExcel.action?bank.id="+
		 			bank+"&bankbranch.id="+bankbranch+"&bankaccount.id="+bankaccount+"&instrumentnumber.id="+instrumentnumber;
		 window.open(url,'','height=650,width=980,scrollbars=yes,left=0,top=0,status=yes');
}
function printAdvicePdf(){
	 var bank=document.getElementById("bank").value;
	var bankbranch=document.getElementById("bankBranchId").value;
	var bankaccount=document.getElementById("bankAccountNoId").value;
	 var instrumentnumber=document.getElementById("transactionNumber").value;
	 var url="${pageContext.request.contextPath}/report/bankAdviceReport!exportPDF.action?bank.id="+
	 			bank+"&bankbranch.id="+bankbranch+"&bankaccount.id="+bankaccount+"&instrumentnumber.id="+instrumentnumber;
	 window.open(url,'','height=650,width=980,scrollbars=yes,left=0,top=0,status=yes');
}

function printCheque(id)
{
 	var chequeFormat=document.getElementById("chequeFormatId");
	if(chequeFormat == "" || chequeFormat == null){
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
		return false;
	} 
	window.open('/services/EGF/payment/chequeAssignmentPrint-generateChequeFormat.action?instrumentHeader='+id,'Search','resizable=yes,scrollbars=yes,left=300,top=40,width=900, height=700');
    return false;
}
</script>
</body>
</html>