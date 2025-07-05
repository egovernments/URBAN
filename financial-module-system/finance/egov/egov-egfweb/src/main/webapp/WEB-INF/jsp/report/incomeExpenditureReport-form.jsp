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

<br />
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td>
			<div align="center">
				<br />
				<table border="0" cellspacing="0" cellpadding="0"
					class="tablebottom" width="100%">
					<tr>
						<td class="bluebgheadtd" width="100%"  colspan="12">
							${scheduleheading} </strong>
						</td>
					</tr>
					<tr>
						<td class="bluebox" colspan="2"><strong><s:text
									name="report.run.date" />:<s:date name="todayDate"
									format="dd/MM/yyyy" /></strong></td>
						<td colspan="12">
							<div class="blueborderfortd" align="right">
								<strong> <!-- TODO: Manual migration required for custom Struts tag --> <s:property
										value="model.currency" />&nbsp;&nbsp;&nbsp;&nbsp;
								</strong>
							</div>
						</td>
					</tr>

					<tr>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd" width="20%"><s:text
								name="report.headOfAccount" /></th>
						<c:forEach value="incomeExpenditureStatement.funds" status="stat">
							<th class="bluebgheadtd" colspan="2"><s:property
									value="name" />(Rs)</th>
						</c:forEach>
					</tr>
					<tr>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<c:forEach value="incomeExpenditureStatement.funds" status="stat">
							<th class="bluebgheadtd" width="15%" align="center" colspan="1"><s:text
									name="report.currentTotals" /> <s:property
									value="currentYearToDate" /></th>
							<th class="bluebgheadtd" width="15%" align="center" colspan="1"><s:text
									name="report.previousTotals" /> <s:property
									value="previousYearToDate" /></th>
						</c:forEach>
					</tr>
					</tr>
					<c:forEach value="incomeExpenditureStatement.ieEntries"
						status="stat">
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
									<c:if test='%{displayBold == true}'>
										<strong>${accountName}</strong>
									</c:if>
									<c:otherwise>
										${accountName}
									</s:else>
									&nbsp;
								</div>
							</td>
							<c:forEach value="incomeExpenditureStatement.funds"
								status="stat">
								<c:if
									test='%{accountName == "Total" || accountName == "Schedule Total"}'>
									<td class="blueborderfortd">
										<div align="right">
											<strong>${netAmount[name]}</strong>
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="right">
											<strong>${previousYearAmount[name]}</strong>
										</div>
									</td>
								</c:if>
								<c:otherwise>
									<td class="blueborderfortd">
										<div align="right">
											<a href="javascript:void(0);"
												onclick='return showDetail(${glCode},"${id}","${currentYearToDate}","${currentYearFromDate}")'><s:property
													value="netAmount[name]" /></a>&nbsp;
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="right">
											<a href="javascript:void(0);"
												onclick='return showDetail(${glCode},"${id}","${previousYearToDate}","${previousYearFromDate}")'><s:property
													value="previousYearAmount[name]" /></a>&nbsp;
										</div>
									</td>
								</s:else>
							</c:forEach>

						</tr>
					</c:forEach>
				</table>
			</div>
		</td>
	</tr>
</table>
