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

</head>

<body>
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>

		<br />
		<br />

		<form:form name="receiptPaymentReportForm" action="receiptPaymentReport"
			theme="simple">


			<br />
			<br />

			<c:if test="%{model.entries.size!=0}">
				<!-- <div align="center" class="extracontent"><h4>${fundType}  ${budgetType}</h4></div> 
		<div align="right" class="extracontent"><b>Amount in Thousands</b></div> -->
				<table width="100%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="tablebottom">
					<tr>
						<td colspan="8">
							<div class="subheadsmallnew">
								<strong>${header}</strong>
							</div>
						</td>
					</tr>
					<tr>
						<td class="bluebox" colspan="4"><strong><s:text
									name="report.run.date" />:<s:date name="todayDate"
									format="dd/MM/yyyy" /></strong></td>
						<td colspan="8">
							<div class="blueborderfortd" align="right">
								<strong> <!-- TODO: Manual migration required for custom Struts tag --> <s:property
										value="model.currency" />&nbsp;&nbsp;&nbsp;
								</strong>
							</div>
						</td>
					</tr>
					<tr>
					<tr>

						<th class="bluebgheadtd" style="width: 6%; text-align: center"
							align="center"></th>
						<th class="bluebgheadtd" style="width: 38%; text-align: center"
							align="center">Schedule Number</th>
						<th class="bluebgheadtd" style="width: 20%; text-align: center"
							align="center">Glcode</th>
						<c:if test="%{model.funds.size()>1}">
							<c:forEach value="model.funds" status="stat">
								<th class="bluebgheadtd">${name}</th>
							</c:forEach>
						</c:if>
						<th class="bluebgheadtd" style="width: 22%; text-align: center"
							align="center">${currentYearToDate}</th>
						<th class="bluebgheadtd" style="width: 22%; text-align: center"
							align="center">${previousYearToDate}</th>
					</tr>
					<c:set var="trclass" value="greybox" />
					<c:forEach value="model.entries" status="stat">
						<tr>
							<c:if
								test='%{accountName == "Sub Total" || accountName == "Grand Total" }'>
								<td class="blueborderfortd"><strong> <s:property
											value="accountName" />&nbsp;
								</strong></td>
								<td class="blueborderfortd">${glCode}&nbsp;</td>
								<td class="blueborderfortd">&nbsp;</td>
								<c:if test="%{model.funds.size()>1}">
									<c:forEach value="model.funds" status="stat">
										<td class="blueborderfortd">
											<div align="right">
												<strong> ${fundWiseAmount[code]}&nbsp;
												</strong>
											</div>
										</td>
									</c:forEach>
								</c:if>
								<td class="blueborderfortd"><strong><s:property
											value="currentYearTotal" />&nbsp;</strong></td>
								<td class="blueborderfortd"><strong> <s:property
											value="previousYearTotal" />&nbsp;
								</strong></td>
							</c:if>
							<c:otherwise>
								<td class="blueborderfortd">&nbsp;</td>
								<td class="blueborderfortd"><strong><s:property
											value="accountName" />&nbsp;</strong></td>
								<td class="blueborderfortd">${glCode}&nbsp;</td>
								<c:if test="%{model.funds.size()>1}">
									<c:forEach value="model.funds" status="stat">
										<td class="blueborderfortd">
											<div align="right">
												${fundWiseAmount[code]}
												&nbsp;
											</div>
										</td>
									</c:forEach>
								</c:if>
								<td class="blueborderfortd"><s:property
										value="currentYearTotal" />&nbsp;</td>
								<td class="blueborderfortd"><s:property
										value="previousYearTotal" />&nbsp;</td>
							</s:else>
						</tr>

					</c:forEach>

				</table>

			</c:if>

			<div class="buttonbottom">
				<!-- TODO: Manual migration required for custom Struts tag -->
				: <a
					href='/EGF/report/receiptPaymentReport!exportReceiptPaymentScheduleXls.action?
showDropDown=false&model.period=${model.period}
&model.currency=${model.currency}
&model.financialYear.id=${model.financialYear.id}
&model.fund.id=${model.fund.id}
&model.fromDate=${model.fromDate}
&model.toDate=${model.toDate}
&scheduleNo=${scheduleNo}'>Excel</a>
				| <a
					href='/EGF/report/receiptPaymentReport!exportReceiptPaymentSchedulePdf.action?
showDropDown=false&model.period=${model.period}
&model.currency=${model.currency}
&model.financialYear.id=${model.financialYear.id}
&model.fund.id=${model.fund.id}
&model.fromDate=${model.fromDate}
&model.toDate=${model.toDate}
&scheduleNo=${scheduleNo}'>PDF</a>
			</div>


		</form:form>
</body>
</html>
