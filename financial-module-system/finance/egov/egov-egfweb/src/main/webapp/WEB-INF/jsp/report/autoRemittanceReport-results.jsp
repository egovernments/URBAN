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
<span class="mandatory"> <font
	style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag --></font>
</span>

<c:if test="%{autoRemittance.size()>0}">
	<br />
	<table width="99%" border="0" cellspacing="0" cellpadding="0">

		<tr>
			<td class="blueborderfortd"><c:if test="%{level == 'atcoc'}">
					<table width="50%" border="0" cellpadding="0" cellspacing="0"
						class="tablebottom">
						<c:forEach value="%{coaAbstract}" status="status">
							<tr>
								<th class="bluebgheadtd" colspan='4'>Summary of remittance</th>
							</tr>
							<tr>
								<td class="greybox">&nbsp;</td>
								<th class="bluebgheadtd">Grand Total</th>
								<td class="greybox">${%{grandTotal}}</td>
								<td class="greybox">&nbsp;</td>
							</tr>
							<tr>
								<th class="bluebgheadtd">Income Tax</th>
								<th class="bluebgheadtd">Sales Tax</th>
								<th class="bluebgheadtd">MWGWF</th>
								<th class="bluebgheadtd">Service Tax</th>
							</tr>
							<tr>
								<td class="greybox"><s:property
										value="%{incomeTaxRemittedAmt}" /></td>
								<td class="greybox"><s:property
										value="%{salesTaxRemittedAmt}" /></td>
								<td class="greybox">${%{mwgwfRemittedAmt}}
								</td>
								<td class="greybox"><s:property
										value="%{serviceTaxRemittedAmt}" /></td>

							</tr>
							<tr>
								<th class="bluebgheadtd">Department</th>
								<th class="bluebgheadtd">Remitted For</th>
								<th class="bluebgheadtd">Amount Remitted For</th>
								<th class="bluebgheadtd">Total</th>
							</tr>
						</c:forEach>
						<c:forEach value="%{remittanceList}" status="status">

							<tr>
								<td class="greybox">${%{departmentCode}}
								</td>
								<td class="greybox">IT</td>
								<td class="greybox"><s:property
										value="%{incomeTaxRemittedAmt}" /></td>
								<td class="greybox">-</td>

							</tr>
							<tr>
								<td class="greybox">-</td>
								<td class="greybox">ST</td>
								<td class="greybox"><s:property
										value="%{salesTaxRemittedAmt}" /></td>
								<td class="greybox">-</td>

							</tr>
							<tr>
								<td class="greybox">-</td>
								<td class="greybox">MWGWF</td>
								<td class="greybox">${%{mwgwfRemittedAmt}}
								</td>
								<td class="greybox">-</td>

							</tr>
							<tr>
								<td class="greybox">-</td>
								<td class="greybox">Service Tax</td>
								<td class="greybox"><s:property
										value="%{serviceTaxRemittedAmt}" /></td>
								<td class="greybox">${%{departmentTotal}}</td>

							</tr>
						</c:forEach>
					</table>
				</c:if>
				<div>
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						class="tablebottom">
						<tr>
							<th class="bluebgheadtd">Sl No</th>
							<th class="bluebgheadtd">Party Name</th>
							<c:if test="%{level == 'atcoc'}">
								<th class="bluebgheadtd">PAN Number</th>
							</c:if>
							<th class="bluebgheadtd">Bill Number/Reciept Number</th>
							<th class="bluebgheadtd">Bill/Receipt Amount(Rs)</th>
							<th class="bluebgheadtd">Voucher Number</th>
							<th class="bluebgheadtd">Remittance Payment Number/Amount</th>
							<th class="bluebgheadtd">Amount Remitted(Rs)</th>
							<th class="bluebgheadtd">RTGS Number/Date</th>
							<th class="bluebgheadtd">RTGS Amount</th>
						</tr>
						<!-- TODO: Manual migration required for custom Struts tag -->
						<c:forEach value="autoremittanceMap" status="stat">
							<tr>
								<td class="greybox">Remittance COA - <s:property
										value="key.remittanceCOA" />
								</td>
								<c:if test="%{level == 'atcoc'}">
									<td class="greybox">Department/Drawing Officer -<s:property
											value="key.department" /> / <s:property
											value="key.drawingOfficer" />
								</c:if>
								<c:if test="%{level == 'atdepartment'}">
									<td class="greybox">Fund -${key.fundName}
								</c:if>
								</td>
								<td class="greybox">Bank/Branch - <s:property
										value="key.bankbranchAccount" />
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>

							<tr>
								<c:forEach value="value" status="s">

									<td align="left" style="text-align: center"
										class="blueborderfortdnew" />
									${#s.index+1}
									</td>
									<td class="blueborderfortd"><div align="left">
											${partyName}
											&nbsp;
										</div></td>
									<c:if test="%{level == 'atcoc'}">
										<td class="blueborderfortd"><div align="left">
												${panNumber}
												&nbsp;
											</div></td>
									</c:if>
									<td class="blueborderfortd"><a href="javascript:void(0);"
										onclick="viewBill(<!-- TODO: Manual migration required for custom Struts tag -->);"><s:property
												value="billNumber" /></a>&nbsp;</td>
									<td class="blueborderfortd"><div align="left">
											${billAmount}
											&nbsp;
										</div></td>
									<td class="blueborderfortd"><a href="javascript:void(0);"
										onclick="viewVoucher(<!-- TODO: Manual migration required for custom Struts tag -->);"><s:property
												value="voucherNumber" /></a>&nbsp;</td>
									<td class="blueborderfortd"><a href="javascript:void(0);"
										onclick="viewVoucher(<!-- TODO: Manual migration required for custom Struts tag -->);"><s:property
												value="remittancePaymentNo" /></a>&nbsp; / <s:property
											value="remittedAmount" /></td>
									<td class="blueborderfortd"><div align="right">
											${remittedAmount}
											&nbsp;
										</div></td>
									<td class="blueborderfortd"><div align="right">
											${rtgsNoDate}
											&nbsp;
										</div></td>
									<td class="blueborderfortd"><div align="right">
											${rtgsAmount}
											&nbsp;
										</div></td>
									<!-- TODO: Manual migration required for custom Struts tag -->
							</tr>
						</c:forEach>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<c:if test="%{level == 'atcoc'}">
								<td></td>
							</c:if>
							<td class="greybox"><div align="left">SubTotal:</div></td>
							<td class="greybox"><div align="right">
									${key.remittedAmountSubtotal}
								</div></td>
						</tr>
						</c:forEach>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<c:if test="%{level == 'atcoc'}">
								<td></td>
							</c:if>
							<td class="greybox"><div align="left">Grand Total:</div></td>
							<td class="greybox"><div align="right">
									${remittedAmountTotal}
								</div>
						</tr>
					</table>
				</div></td>
		</tr>
	</table>
	</td>
	</tr>
	</table>
</c:if>
<c:otherwise>No Records found</s:else>
<c:if test="%{autoRemittance.size()>0}">
	<div class="buttonbottom" align="center">
		Export Options: <label onclick="exportXls()"><a
			href='javascript:void(0);'>Excel</a></label> | <label onclick="exportPdf()"><a
			href="javascript:void(0);">PDF</a></label>
	</div>
</c:if>
