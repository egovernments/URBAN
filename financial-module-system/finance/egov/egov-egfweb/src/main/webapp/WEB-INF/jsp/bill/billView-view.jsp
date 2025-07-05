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
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript">
	var path = "${pageContext.request.contextPath}";
</script>
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


</head>
<body>
	<form:form action="billView" theme="simple">
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</span>

		<div class="formmainbox">
			<div class="subheadnew">
				${expendituretype}

				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="18%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td width="23%" class="bluebox"><s:date name="billdate"
							format="dd/MM/yyyy" /></td>
					<td width="17%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td width="33%" class="bluebox">${billnumber}</td>
				</tr>
				<tr>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><s:property
							value="egBillregistermis.fund.name" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><s:property
							value="%{getMasterName('department')}" /></td>
				</tr>
				<tr>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox"><s:property
							value="egBillregistermis.functionaryid.name" /></td>
					<td class="bluebox">&nbsp</td>
					<td class="bluebox">&nbsp</td>
				</tr>
				<tr>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td colspan="3" class="greybox">${narration}</td>
				</tr>
			</table>
			<br />
			<div align="center">
				<table width="100%" cellspacing="0" cellpadding="0">
					<tr>
						<th colspan="5"><div class="subheadsmallnew">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</div></th>
					</tr>
					<tr>
						<th class="bluebgheadtd" width="17%"><s:text
								name="bill.function" /></th>
						<th class="bluebgheadtd" width="17%"><s:text
								name="bill.accountcode" /></th>
						<th class="bluebgheadtd" width="19%"><s:text
								name="bill.accounthead" /></th>
						<th class="bluebgheadtd" width="17%"><s:text
								name="bill.dtamt" /></th>
						<th class="bluebgheadtd" width="16%"><s:text
								name="bill.cramt" /></th>
					</tr>
					<c:forEach var="p" value="%{billDetailsList}" status="s">
						<tr>
							<td width="17%" class="text-center bluebox setborder"><s:property
									value="function" /></td>
							<td width="17%" class="text-center bluebox setborder"><s:property
									value="glcode" /></td>
							<td width="19%" class="text-center bluebox setborder"><s:property
									value="accountHead" /></td>
							<td width="17%" class="text-center bluebox setborder"
								style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>
							<td width="16%" class="text-center bluebox setborder"
								style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>
							<c:set var="db" value="${db+debitAmount}" />
							<c:set var="cr" value="${cr+creditAmount}" />
						</tr>
					</c:forEach>
					<tr>
						<td class="text-center bluebox setborder"
							style="text-align: right" colspan="3" />Total
						</td>
						<td class="text-center bluebox setborder"
							style="text-align: right"><fmt:formatNumber value="${db}"
								pattern="#0.00" /></td>
						<td class="text-center bluebox setborder"
							style="text-align: right"><fmt:formatNumber value="${cr}"
								pattern="#0.00" /></td>
					</tr>
				</table>
			</div>
			<br />
			<c:if test="%{subledgerList.size()>0}">
				<div align="center">
					<table border="1" width="100%" cellspacing="0">
						<tr>
							<th colspan="5"><div class="subheadsmallnew">
									<!-- TODO: Manual migration required for custom Struts tag -->
								</div></th>
						</tr>

						<tr>
							<th class="bluebgheadtd" width="17%"><s:text
									name="bill.function" /></th>
							<th class="bluebgheadtd" width="17%"><s:text
									name="bill.accountcode" /></th>
							<th class="bluebgheadtd" width="17%"><s:text
									name="bill.detailtype" /></th>
							<th class="bluebgheadtd" width="16%"><s:text
									name="bill.detailkey" /></th>
							<th class="bluebgheadtd" width="16%"><s:text
									name="bill.amount" /></th>
						</tr>
						<c:forEach var="p" value="%{subledgerList}" status="s">
							<tr>
								<td width="17%" class="text-center bluebox setborder"><s:property
										value="function" /></td>
								<td width="17%" class="text-center bluebox setborder">${glcode}</td>
								<td width="19%" class="text-center bluebox setborder"><s:property
										value="detailname" /></td>
								<td width="19%" class="text-center bluebox setborder"><s:property
										value="detailkey" /></td>
								<td width="16%" class="text-center bluebox setborder" style="text-align: right"><s:text
										name="format.number">
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
							</tr>
						</c:forEach>
					</table>
				</div>
			</c:if>
		</div>
		<div class="buttonbottom">
			<input name="button" type="button" class="buttonsubmit" id="button1"
				value="Print" onclick="window.print()" />&nbsp; <input
				type="button" id="Close" value="Close"
				onclick="javascript:window.close()" class="button" />&nbsp;
		</div>
	</form:form>
</body>
</html>
