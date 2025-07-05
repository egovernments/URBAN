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
<c:if test="%{budgetDisplayList.size()>0}">
	<div id="result"
		style="width: 1250px; overflow-x: auto; overflow-y: hidden;">
		<br />
		<div style="overflow-x: scroll; overflow-y: scroll;">
			<table width="100%" cellpadding="0" cellspacing="0" border="0">

				<td>
					<div align="center">
						<br />
						<tr>
							<th class="bluebgheadtd" width="100%" colspan="9"><strong
								style="font-size: 15px;"> ${heading}</strong></th>
						</tr>
						<tr>
							<td colspan="9">
								<div class="blueborderfortd" align="right">
									<strong> <!-- TODO: Manual migration required for custom Struts tag -->
										&nbsp;&nbsp;
									</strong>
								</div>
							</td>
						</tr>
					</div>
				</td>

				<td>
					<div align="center">
						<br />
						<table border="0" cellspacing="0" cellpadding="0"
							class="tablebottom" width="100%">
							<tr>
								<th class="bluebgheadtd">Sl No</th>
								<c:if test='%{isFundSelected == "false"}'>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
								</c:if>
								<c:if test='%{isFunctionSelected == "false"}'>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
								</c:if>
								<c:if test='%{isDepartmentSelected == "false"}'>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
								</c:if>
								<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
								<th class="bluebgheadtd"><s:text
										name="report.budgetAppropriationNo" /></th>
								<th class="bluebgheadtd"><s:text
										name="report.appropriationDate" /></th>
								<th class="bluebgheadtd">${budgetName}</th>
								<th class="bluebgheadtd"><s:text
										name="report.budgetAdditionalAmount" /></th>
								<th class="bluebgheadtd"><s:text
										name="report.budgetDeductionAmount" /></th>
							</tr>
							</tr>
							<c:forEach value="budgetDisplayList" status="stat">
								<tr>
									<td class="blueborderfortd"><s:property
											value="#stat.index+1" />&nbsp;</td>
									<c:if test='%{isFundSelected == "false"}'>
										<td class="blueborderfortd"><div align="center">
												${fund}</td>
									</c:if>

									<c:if test='%{isFunctionSelected == "false"}'>
										<td class="blueborderfortd">
											<div align="left">
												${function}
											</div>
										</td>
									</c:if>

									<c:if test='%{isDepartmentSelected == "false"}'>
										<td class="blueborderfortd">
											<div align="left">
												${department}
											</div>
										</td>
									</c:if>

									<td class="blueborderfortd">
										<div align="left">
											${budgetHead}
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="left">
											${budgetAppropriationNo}
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="center">
											<!-- TODO: Manual migration required for custom Struts tag -->
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="right">
											${actualAmount}
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="right">
											${additionAmount}
										</div>
									</td>
									<td class="blueborderfortd">
										<div align="right">
											${deductionAmount}
										</div>
									</td>


								</tr>
							</c:forEach>
						</table>
						<div class="buttonbottom">
							<!-- TODO: Manual migration required for custom Struts tag -->
							: <a
								href='/EGF/report/budgetAppropriationReport-ajaxGenerateReportXls.action?showDropDown=false&model.budgetDetail.executingDepartment.id=${model.budgetDetail.executingDepartment.id}&model.budgetDetail.fund.id=${model.budgetDetail.fund.id}&model.budgetDetail.function.id=${model.budgetDetail.function.id}&model.budgetDetail.budget.id=${model.budgetDetail.budget.id}&fromDate=${fromDate}&toDate=${toDate}&budgetName=${budgetName}&deptName=${deptName}&fundName=${fundName}&functionName=${functionName}'>
								Excel</a> | <a
								href='/EGF/report/budgetAppropriationReport-ajaxGenerateReportPdf.action?showDropDown=false&model.budgetDetail.executingDepartment.id=${model.budgetDetail.executingDepartment.id}&model.budgetDetail.fund.id=${model.budgetDetail.fund.id}&model.budgetDetail.function.id=${model.budgetDetail.function.id}&model.budgetDetail.budget.id=${model.budgetDetail.budget.id}&fromDate=${fromDate}&toDate=${toDate}&budgetName=${budgetName}&deptName=${deptName}&fundName=${fundName}&functionName=${functionName}'>PDF</a>
						</div>
					</div>
					</div>
					</div> </c:if> <c:otherwise>
						<tr>
							<td colspan="7"><div style="color: red" align="center">No
									record Found.</div></td>
						</tr>
					</s:else>