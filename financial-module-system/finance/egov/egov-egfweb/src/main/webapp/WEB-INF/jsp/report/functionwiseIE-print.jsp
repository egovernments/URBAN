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
<div style="overflow-x: scroll; overflow-y: scroll;">
	<table width="100%" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td>
				<div align="center">
					<br />
					<table border="0" cellspacing="0" cellpadding="0"
						class="tablebottom" width="100%">
						<tr>
							<td colspan="6">
								<div class="subheadsmallnew">
									<strong>${%{functionwiseIE.cityName}}</strong>
								</div>
							</td>
						</tr>
						<tr>
							<td class="bluebox" colspan="4"><strong><s:text
										name="report.run.date" />:<s:date name="todayDate"
										format="dd/MM/yyyy" /></strong></td>
							<td colspan="6">
								<div class="subheadsmallnew">
									<strong>FUNCTIONWISE <c:if
											test='%{functionwiseIE.incExp == "I"}'>INCOME</c:if>
										<c:otherwise>EXPENSE</s:else> SUBSIDARY REGISTER
									</strong>
								</div>
							</td>
						</tr>
						<tr>
							<th class="bluebgheadtd">Sl.No.</th>
							<th class="bluebgheadtd">COA</th>
							<th class="bluebgheadtd">Account Head</th>
							<th class="bluebgheadtd">Schedule</th>
							<th class="bluebgheadtd">BE</th>
							<th class="bluebgheadtd">BE-ReAppropriation</th>
							<th class="bluebgheadtd">RE</th>
							<th class="bluebgheadtd">RE-ReAppropriation</th>
							<th class="bluebgheadtd">Expendiure As On</th>
							<th class="bluebgheadtd">Balancce</th>
							<c:forEach value="majorCodeList" status="stat" var="p">
								<th class="bluebgheadtd">${p}</th>
							</c:forEach>
						</tr>
						<c:forEach value="functionwiseIE.entries" status="stat">
							<tr>
								<td class="blueborderfortd">
									<div align="center">
										${slNo}
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="left">
										${functionCode}
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="left">
										<c:if test='%{slNo == ""}'>
											<strong>${functionName}</strong>
										</c:if>
										<c:otherwise>
											${functionName}
										</s:else>
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="right">
										<c:if test='%{slNo == ""}'>
											<strong>${totalIncome}</strong>
										</c:if>
										<c:otherwise>
											${totalIncome}
										</s:else>
									</div>
								</td>
								<c:forEach value="functionwiseIE.majorCodeList" var="k"
									status="s">
									<td class="blueborderfortd">
										<div align="right">
											<c:if test='%{slNo == ""}'>
												<strong>${majorcodeWiseAmount[#k]}</strong>
											</c:if>
											<c:otherwise>
												${majorcodeWiseAmount[#k]}
											</s:else>
										</div>
									</td>
								</c:forEach>
							</tr>
						</c:forEach>
					</table>
				</div>
			</td>
		</tr>
	</table>
	<jsp:include page="report-filterhidden.jsp" />
	<input type="hidden" name="model.incExp"
		value='${model.incExp}' />
	<div class="buttonbottom">
		<!-- TODO: Manual migration required for custom Struts tag -->
		: <a
			href='/EGF/report/functionwiseIE!generateFunctionwiseIEXls.action?model.incExp=${model.incExp}&model.fund.id=${model.fund.id}&model.department.id=${model.department.id}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.scheme.id=${model.scheme.id}&model.subScheme.id=${model.subScheme.id}&model.fundsource.id=${model.fundsource.id}&model.field.id=${model.field.id}&model.startDate=${model.startDate}&model.endDate=${model.endDate}'>Excel</a>
		| <a
			href='/EGF/report/functionwiseIE!generateFunctionwiseIEPdf.action?model.incExp=${model.incExp}&model.fund.id=${model.fund.id}&model.department.id=${model.department.id}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.scheme.id=${model.scheme.id}&model.subScheme.id=${model.subScheme.id}&model.fundsource.id=${model.fundsource.id}&model.field.id=${model.field.id}&model.startDate=${model.startDate}&model.endDate=${model.endDate}'>PDF</a>
	</div>
</div>
