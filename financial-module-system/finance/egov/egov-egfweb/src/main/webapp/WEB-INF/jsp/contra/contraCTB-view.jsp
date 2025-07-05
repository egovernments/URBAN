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


<body onload="onloadTask();">
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
					<br />
					<div align="center">
						<font style='color: red; font-weight: bold'>
							<p class="error-block" id="lblError"></p>
						</font>
						<table id="boundarytableGrid" border="0" cellSpacing=0
							cellPadding=0 width="55%" align="center">
							<tr class="tableheader">
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
							</tr>
							<td class="greybox"><form:input
									name="contraBean.cashInHand" id="cashInHand" readonly="true" /></td>
							</tr>
						</table>
						<%@include file="contraCTB-form.jsp"%>
					</div>
				</div>
			</div>
			</div>
		</s:push>
	</form:form>
	<script>

function onloadTask(){
	disableControls(0,true);
	var message = '${message}';
	if(message != null && message != '')
		showMessage(message);
	var element = document.getElementById('accountNumber');
	if(element != undefined){
		populateAvailableBalance(element)
		if(element.value != -1){
			populateNarration(element)
		}
	}
}

function showMessage(message){
	var close = ${close};
	var voucherHeaderId = ${voucherHeader.id};
	bootbox.alert(message);
	if(close == true){
		self.close();
	}
	document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher!loadvoucherview.action?vhid="+voucherHeaderId;
	document.forms[0].submit();
}

</script>

</body>

</html>
