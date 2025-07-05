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



<c:if test="%{budgetVarianceEntries.size()>0}">
	<br />
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="bluebox">
				<table width="99%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td class="blueborderfortd">
							<div>
								<table width="100%" border="0" cellpadding="0" cellspacing="0"
									class="tablebottom">
									<tr>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd">${type}<!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
										<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									</tr>
									<c:forEach value="budgetVarianceEntries" status="stat" var="p">
										<tr>
											<td class="blueborderfortd"><div align="left">
													${fundCode}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="left">
													${functionCode}
												</div>&nbsp;</td>
											<td class="blueborderfortd"><div align="left">
													${departmentName}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="left">
													${budgetHead}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="right">
													<c:if test="%{#p.estimate != null}">
														<!-- TODO: Manual migration required for custom Struts tag -->
															<!-- TODO: Manual migration required for custom Struts tag -->
														</s:text>&nbsp;
													</c:if>
													<c:otherwise>0.00</s:else>
												</div></td>
											<td class="blueborderfortd"><div align="right">
													<c:if test="%{#p.additionalAppropriation != null}">
														<!-- TODO: Manual migration required for custom Struts tag -->
															<!-- TODO: Manual migration required for custom Struts tag -->
														</s:text>&nbsp;
													</c:if>
													<c:otherwise>0.00</s:else>
												</div></td>
											<td class="blueborderfortd"><div align="right">
													<c:if test="%{#p.total != null}">
														<!-- TODO: Manual migration required for custom Struts tag -->
															<!-- TODO: Manual migration required for custom Struts tag -->
														</s:text>&nbsp;
													</c:if>
													<c:otherwise>0.00</s:else>
												</div></td>
											<td class="blueborderfortd"><div align="right">
													<c:if test="%{#p.actual != null}">
														<!-- TODO: Manual migration required for custom Struts tag -->
															<!-- TODO: Manual migration required for custom Struts tag -->
														</s:text>&nbsp;
													</c:if>
													<c:otherwise>0.00</s:else>
												</div></td>
											<td class="blueborderfortd"><div align="right">
													<c:if test="%{#p.variance != null}">
														<!-- TODO: Manual migration required for custom Struts tag -->
															<!-- TODO: Manual migration required for custom Struts tag -->
														</s:text>&nbsp;
														</c:if>
													<c:otherwise>0.00</s:else>
												</div></td>
												<td class="blueborderfortd"><div align="right">
													<c:if test="%{#p.variancePercentage != null}">
														<!-- TODO: Manual migration required for custom Struts tag -->
															<!-- TODO: Manual migration required for custom Struts tag -->
														</s:text>&nbsp;
														</c:if>
													<c:otherwise>0.00</s:else>
												</div></td>
										</tr>
									</c:forEach>
								</table>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>

	<div class="buttonbottom" align="center">
		<!-- TODO: Manual migration required for custom Struts tag --> <label onclick="exportXls()"><a
			href='javascript:void(0);'><!-- TODO: Manual migration required for custom Struts tag --> </a></label> | <label onclick="exportPdf()"><a
			href="javascript:void(0);"><!-- TODO: Manual migration required for custom Struts tag --> </a></label>

	</div>

</c:if>


