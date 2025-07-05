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
<link href="/services/EGF/resources/css/budget.css?rnd=${app_release_no}" rel="stylesheet"
	type="text/css" />
<style type="text/css">
@media print {
	div#exportButton {
		display: none;
	}
}
</style>

<c:if test="%{balanceSheet.size()>0}">
	<div id="budgetSearchGrid"
		style="width: 1250px; overflow-x: auto; overflow-y: hidden;">
		<br />
		<div style="overflow-x: scroll; overflow-y: scroll;">

			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td>
						<div align="center">
							<br />
							<table width="100%" border="0" cellpadding="0" cellspacing="0"
								width="100%">
								<tr>
									<th class="subheadsmallnew" colspan="16" bgcolor="#CCCCCC"><s:property
											value="ulbName" /><br /> <strong><s:text
												name="report.balancesheet.year" /> <s:property
												value="model.financialYear.finYearRange" />
											${header}</strong></th>
									</td>
								</tr>
								<tr>

									<td class="bluebox" colspan="2" align="left"><strong><s:text
												name="report.run.date" />-<s:date name="todayDate"
												format="dd/MM/yyyy" /></strong>
									</div></td>
									<td colspan="16">
										<div class="blueborderfortd" align="right">
											<strong>Amount in ${model.currency}
												&nbsp;&nbsp;&nbsp;&nbsp;
											</strong>
										</div>
									</td>
								</tr>
								<tr>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<th class="bluebgheadtd"><s:text
											name="report.headOfAccount" /></th>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<c:if test="%{balanceSheet.funds.size()>1}">
										<c:forEach value="balanceSheet.funds" status="stat">
											<th class="bluebgheadtd">${name}</th>
										</c:forEach>
									</c:if>
									<th class="bluebgheadtd"><s:property
											value="currentYearToDate" /></th>
									<th class="bluebgheadtd"><s:property
											value="previousYearToDate" /></th>
								</tr>
								<c:forEach value="balanceSheet.entries" status="stat">
									<tr>
										<td class="blueborderfortd">
											<div align="center">
												<c:if test='%{glCode != ""}'>
													<c:if test='%{displayBold == true}'>
														<strong>${glCode}</strong>
													</c:if>
													<c:otherwise>
														${glCode}
													</s:else>
												</c:if>
												&nbsp;
											</div>
										</td>
										<td class="blueborderfortd">
											<div align="left">
												<c:if test='%{scheduleNo == ""}'>
													<strong>${accountName}</strong>
												</c:if>
												<c:otherwise>
													${accountName}
												</s:else>
												&nbsp;
											</div>
										</td>
										<td class="blueborderfortd">
											<div align="center">
												<a href="javascript:void(0);"
													onclick='return showSchedule(${glCode})'><s:property
														value="scheduleNo" /></a>&nbsp;
											</div>
										</td>
										<c:if test="%{balanceSheet.funds.size()>1}">
											<c:forEach value="balanceSheet.funds" status="stat">
												<td class="blueborderfortd">
													<div align="right">
														<c:if test='%{displayBold == true}'>
															<strong>${fundWiseAmount[name]}&nbsp;</strong>
														</c:if>
														<c:otherwise>
															${fundWiseAmount[name]}&nbsp;</s:else>
													</div>
												</td>
											</c:forEach>
										</c:if>
										<td class="blueborderfortd">
											<div align="right">
												<c:if test='%{displayBold == true}'>
													<strong><c:if test='%{currentYearTotal != 0}'>
															${currentYearTotal}
														</c:if>
														<c:otherwise>0.0</s:else></strong>
												</c:if>
												<c:otherwise>
													<c:if test='%{currentYearTotal != 0}'>
														${currentYearTotal}
													</c:if>
													<c:otherwise>0.0</s:else>
												</s:else>
												&nbsp;
											</div>
										</td>
										<td class="blueborderfortd">
											<div align="right">
												<c:if test='%{displayBold == true}'>
													<strong><c:if test='%{previousYearTotal != 0}'>
															${previousYearTotal}
														</c:if>
														<c:otherwise>0.0</s:else></strong>
												</c:if>
												<c:otherwise>
													<c:if test='%{previousYearTotal != 0}'>
														${previousYearTotal}
													</c:if>
													<c:otherwise>0.0</s:else>
												</s:else>
												&nbsp;
											</div>
										</td>
									</tr>
								</c:forEach>
							</table>
						</div>
					</td>
				</tr>
			</table>
			<div class="buttonbottom" id="exportButton">
				<!-- TODO: Manual migration required for custom Struts tag -->
				: <a
					href='/services/EGF/report/balanceSheetReport-generateBalanceSheetXls.action?showDropDown=false&model.period=${model.period}&model.currency=${model.currency}&model.financialYear.id=${model.financialYear.id}&model.department.id=${model.department.id}&model.fund.id=${model.fund.id}&model.asOndate=${model.asOndate}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.field.id=${model.field.id}'>Excel</a>
				| <a
					href='/services/EGF/report/balanceSheetReport-generateBalanceSheetPdf.action?showDropDown=false&model.period=${model.period}&model.currency=${model.currency}&model.financialYear.id=${model.financialYear.id}&model.department.id=${model.department.id}&model.fund.id=${model.fund.id}&model.asOndate=${model.asOndate}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.field.id=${model.field.id}'>PDF</a>
			</div>
		</div>
</c:if>
