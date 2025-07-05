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
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title>Voucher - View</title>
<style type="text/css">
@media print {
	input#button1 {
		display: none;
	}
}

@media print {
	input#button2 {
		display: none;
	}
}

@media print {
	a#sourceLink {
		display: none;
	}
}

@media print {
	div#heading {
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

@media print {
	div.sourceIcon {
		display: none;
	}
}

</style>
<script>
	function openSource(){
		if("<!-- TODO: Manual migration required for custom Struts tag -->"=="" || "<!-- TODO: Manual migration required for custom Struts tag -->"=='null')
			bootbox.alert('Source is not available');
		else{
			var url = '<!-- TODO: Manual migration required for custom Struts tag -->'+'&showMode=view';
			window.open(url,'Source','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700')
		}   
	}
	function checkLength(obj)
	{
		if(obj.value.length>1024)
		{
			bootbox.alert('Max 1024 characters are allowed for comments. Remaining characters are truncated.')
			obj.value = obj.value.substring(1,1024);
		}
	}
</script>
</head>

<body onload="refreshInbox()">
	<form:form action="preApprovedVoucher" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Voucher-View" />
		</jsp:include>
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<div class="subheadnew"><label name="head" style="align:center;">Urban Local Body</label></div>
			<div class="subheadnew"><label name="head" style="align:center;"><s:property
							value="%{heading}" /></label></div>
			<div class="subheadnew">Voucher View</div>
			<table border="0" width="100%" cellspacing="0">
				<tr>
					<td width="10%" class="greybox"><b>Voucher Number :  </b></td>
					<td width="25%" class="greybox"><s:property
							value="%{voucherHeader.voucherNumber}" /></td>
					<td width="10%" class="greybox"><b>  Date :</b></td>
					<td width="25%" class="greybox"><s:date
							name="voucherHeader.voucherDate" format="dd/MM/yyyy" /></td>
				</tr>
			</table>
			<jsp:include page="voucherViewHeader.jsp" />
			<table align="center" id="sourceIcon">
				<tr>
					<td class="bluebox"><a href="#" id="sourceLink"
						onclick=" return openSource();">Source</a></td>

				</tr>
			</table>


		</div>

		<div align="center">
			<br />
			<table border="1" width="100%" cellspacing="0">
				<tr>
					<th colspan="5"><div class="subheadsmallnew">Account
							Details</div></th>
				</tr>
				<tr>
					<th class="bluebgheadtd" width="18%">Function Name</th>
					<th class="bluebgheadtd" width="17%">Account&nbsp;Code</th>
					<th class="bluebgheadtd" width="19%">Account Head</th>
					<th class="bluebgheadtd" width="17%">Debit&nbsp;Amount(Rs)</th>
					<th class="bluebgheadtd" width="16%">Credit&nbsp;Amount(Rs)</th>
				</tr>


				<c:forEach var="p" value="%{billDetails.tempList}" status="s">
					<tr>
						<td width="18%" class="bluebox setborder" style="text-align: center"><s:property
								value="function" /></td>
						<td width="17%" class="bluebox setborder" style="text-align: center"><s:property
								value="glcode" /></td>
						<td width="19%" class="bluebox setborder"><s:property
								value="accounthead" /></td>
						<td width="17%" class="bluebox setborder"
							style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
								<!-- TODO: Manual migration required for custom Struts tag -->
							</s:text></td>
						<td width="16%" class="bluebox setborder"
							style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
								<!-- TODO: Manual migration required for custom Struts tag -->
							</s:text></td>
						<c:set var="db" value="${db+debitamount}" />
						<c:set var="cr" value="${cr+creditamount}" />
					</tr>
				</c:forEach>
				<tr>
					<td class="greybox setborder" style="text-align: right" colspan="3" />
					<b>Total</b>
					</td>
					<td class="greybox setborder" style="text-align: right"><fmt:formatNumber
							value="${db}" pattern="#0.00" /></td>
					<td class="greybox setborder" style="text-align: right"><fmt:formatNumber
							value="${cr}" pattern="#0.00" /></td>
				</tr>
			</table>
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<br />
		<c:if test="%{billDetails.subLedgerlist.size()>0}">
			<div align="center">
				<br />
				<table border="1" width="100%" cellspacing="0">
					<tr>
						<th colspan="5"><div class="subheadsmallnew">Sub-ledger
								Details</div></th>
					</tr>
					<tr>
						<th class="bluebgheadtd" width="18%">Function Name</th>
						<th class="bluebgheadtd" width="18%">Account Code</th>
						<th class="bluebgheadtd" width="17%">Detailed Type</th>
						<th class="bluebgheadtd" width="19%">Detailed Key</th>
						<th class="bluebgheadtd" width="17%">Amount(Rs)</th>
					</tr>
					<c:forEach var="p" value="%{billDetails.subLedgerlist}" status="s">
						<tr>
							<td width="17%" class="bluebox setborder" style="text-align: center"><s:property
									value="functionDetail" /></td>
							<td width="17%"  class="bluebox setborder" style="text-align: center"><s:property 
									value="glcode.glcode" /></td>
							<td width="19%" class="bluebox setborder"><s:property
									value="detailType.description" /></td>
							<td width="17%" class="bluebox setborder"><s:property
									value="detailKey" /></td>
							<td width="16%" class="bluebox setborder"
								style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>

						</tr>
					</c:forEach>
				</table>
			</div>
		</c:if>
		<div id="wfHistoryDiv">
			<c:if test="%{from=='Receipt'}">
				<c:if test="%{receiptVoucher.state.id!=null}">
					<jsp:include page="../workflow/workflowHistory.jsp" />
				</c:if>
			</c:if>
			<c:if test="%{from=='Contra'}">
				<c:if test="%{contraVoucher.state.id!=null}">
					<jsp:include page="../workflow/workflowHistory.jsp" />
				</c:if>
			</c:if>
			<c:if test="%{from=='Journal Voucher'}">
				<c:if test="%{voucherHeader.state.id!=null}">
					<jsp:include page="../workflow/workflowHistory.jsp" />

				</c:if>
			</c:if>
		</div>
		<div align="center" class="buttonbottom">
			<c:if test="%{from=='Receipt'}">
				<c:forEach value="%{getValidActions()}" var="p" status="s">
					<s:submit type="submit" cssClass="buttonsubmit"
						value="%{description}" id="wfBtn%{#s.index}" name="%{name}"
						method="approve"
						onclick="document.getElementById('actionName').value='%{name}';return true" />
				</c:forEach>
			</c:if>
			<c:if test="%{from=='Contra'}">
				<c:forEach value="%{getValidActions()}" var="p" status="s">
					<s:submit type="submit" cssClass="buttonsubmit"
						value="%{description}" id="wfBtn%{#s.index}" name="%{name}"
						method="approve"
						onclick="document.getElementById('actionName').value='%{name}';return true" />
				</c:forEach>
			</c:if>
			<c:if test="%{from=='Journal Voucher'}">
				<c:forEach value="%{getValidActions('')}" var="p" status="s">
					<s:submit type="submit" cssClass="buttonsubmit"
						value="%{description}" id="wfBtn%{#s.index}" name="%{name}"
						method="approve"
						onclick="document.getElementById('actionName').value='%{name}';return true" />
				</c:forEach>
			</c:if>
			<input name="button" type="button" class="buttonsubmit" id="button1"
				value="Print" onclick="window.print()" />&nbsp; <input
				type="button" id="button2" value="Close"
				onclick="javascript:window.close()" class="button" />
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->



	</form:form>

</body>

</html>
