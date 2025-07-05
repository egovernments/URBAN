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
<span class="mandatory1"> <font
	style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag --></font>
</span>
<%-- <table width="99%" border="0" cellspacing="0" cellpadding="0">

	<tr>
		<c:if test="%{fromDate!=null}">
			<th class="bluebgheadtd" width="100%" colspan="7"><strong
				style="font-size: 15px;">Deduction detailed report for <s:property
						value="type" /> from ${fromDate} to <s:property
						value="asOnDate" />
			</strong></th>
		</c:if>
		<c:otherwise>

			<th class="bluebgheadtd" width="100%" colspan="7"><strong
				style="font-size: 15px;">Deduction detailed report for <s:property
						value="type" /> as on ${asOnDate}</strong></th>
			</td>
		</s:else>
	</tr>
</table> --%>
<c:if test="%{pendingTDS.size()>0}">
	<br />
	<table width="100%" border="0" cellspacing="0" cellpadding="0">

		<tr>
			<th class="bluebgheadtd" width="100%" colspan="5"><strong
				style="font-size: 15px;"> <!-- TODO: Manual migration required for custom Struts tag --></strong></th>
		</tr>
	</table>
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td
				style="border-right-width: 1px; border-left-style: solid; padding-left: 5px; border-left-color: #E9E9E9"
				class="blueborderfortd">
				<div>
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						class="tablebottom">
						<tr>
							<th class="bluebgheadtd">Sl No</th>
							<th class="bluebgheadtd">Voucher Type</th>
							<th class="bluebgheadtd">Reference Number</th>
							<th class="bluebgheadtd">Voucher Date</th>
							<th class="bluebgheadtd">Party Name</th>
						<!-- 	<th class="bluebgheadtd">PAN Number</th>
							<th class="bluebgheadtd">TotalDeduction(Rs)</th>
							<th class="bluebgheadtd">Paid(Rs)</th> -->
							<th class="bluebgheadtd">Pending(Rs)</th>
						</tr>
						<c:forEach value="pendingTDS" status="stat" var="p">
							<tr>
								<td class="blueborderfortd"><div align="left">
										${#stat.index+1}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherName}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherDate}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${partyName}
										&nbsp;
									</div></td>
								<%-- <td class="blueborderfortd"><div align="left">
										${panNo}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="right">
										<!-- TODO: Manual migration required for custom Struts tag -->
											<!-- TODO: Manual migration required for custom Struts tag -->
										</s:text>
									</div></td>
								<td class="blueborderfortd"><div align="right">
										<!-- TODO: Manual migration required for custom Struts tag -->
											<!-- TODO: Manual migration required for custom Struts tag -->
										</s:text>
									</div></td> --%>
								<td class="blueborderfortd"><div align="right">
										<!-- TODO: Manual migration required for custom Struts tag -->
											<!-- TODO: Manual migration required for custom Struts tag -->
										</s:text>
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
</c:if>
<c:if test="%{ inWorkflowTDS.size()>0}">
	<br />
	<br />
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>


			<th class="bluebgheadtd" width="100%" colspan="7"><strong
				style="font-size: 15px;"> Deduction remittance in workflow</strong></th>


		</tr>
		<tr>
			<td class="blueborderfortd">
				<div>
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						class="tablebottom">
						<tr>
							<th class="bluebgheadtd">Sl No</th>
							<th class="bluebgheadtd">Voucher Type</th>
							<th class="bluebgheadtd">Reference Number</th>
							<th class="bluebgheadtd">Voucher Date</th>
							<th class="bluebgheadtd">Party Name</th>
							<!-- <th class="bluebgheadtd">PAN Number</th> -->
							<th class="bluebgheadtd">Payment Voucher</th>
							<th class="bluebgheadtd">Remitted On</th>
							<th class="bluebgheadtd">Payment Amount</th>
							<th class="bluebgheadtd">Cheque Number</th>
							<th class="bluebgheadtd">Drawn On</th>
							<th class="bluebgheadtd">Cheque Amount(Rs)</th>
						</tr>
						<c:forEach value="inWorkflowTDS" status="stat" var="p">
							<tr>
								<td class="blueborderfortd"><div align="left">
										${#stat.index+1}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${natureOfDeduction}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherDate}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${partyName}
										&nbsp;
									</div></td>
								<%-- <td class="blueborderfortd"><div align="left">
										${panNo}
										&nbsp;
									</div></td> --%>
								<td class="blueborderfortd"><div align="left">
										${paymentVoucherNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${remittedOn}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="right">
										<!-- TODO: Manual migration required for custom Struts tag -->
											<!-- TODO: Manual migration required for custom Struts tag -->
										</s:text>
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${chequeNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${drawnOn}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="right">
										<c:if test="%{#p.chequeAmount != null}">
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
</c:if>
<c:if test="%{showRemittedEntries==true && remittedTDS.size()>0}">
	<br />
	<br />
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>

			<th class="bluebgheadtd" width="100%" colspan="7"><strong
				style="font-size: 15px;"> Remitted Details</strong></th>

		</tr>
		<tr>
			<td class="blueborderfortd">
				<div>
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						class="tablebottom">
						<tr>
							<th class="bluebgheadtd">Sl No</th>
							<th class="bluebgheadtd">Voucher Type</th>
							<th class="bluebgheadtd">Reference Number</th>
							<th class="bluebgheadtd">Voucher Date</th>
							<th class="bluebgheadtd">Party Name</th>
							<!-- <th class="bluebgheadtd">PAN Number</th> -->
							<th class="bluebgheadtd">Payment Voucher</th>
							<th class="bluebgheadtd">Remitted On</th>
							<th class="bluebgheadtd">Payment Amount</th>
							<th class="bluebgheadtd">Cheque Number</th>
							<th class="bluebgheadtd">Drawn On</th>
							<th class="bluebgheadtd">Cheque Amount(Rs)</th>
						</tr>
						<c:forEach value="remittedTDS" status="stat" var="p">
							<tr>
								<td class="blueborderfortd"><div align="left">
										${#stat.index+1}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${natureOfDeduction}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${voucherDate}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${partyName}
										&nbsp;
									</div></td>
								<%-- <td class="blueborderfortd"><div align="left">
										${panNo}
										&nbsp;
									</div></td> --%>
								<td class="blueborderfortd"><div align="left">
										${paymentVoucherNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${remittedOn}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="right">
										<!-- TODO: Manual migration required for custom Struts tag -->
											<!-- TODO: Manual migration required for custom Struts tag -->
										</s:text>
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${chequeNumber}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="left">
										${drawnOn}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><div align="right">
										<c:if test="%{#p.chequeAmount != null}">
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
</c:if>
<c:if
	test="%{pendingTDS.size()<=0  && remittedTDS.size()<=0 && inWorkflowTDS.size()<=0}">
	<!-- TODO: Manual migration required for custom Struts tag -->
</c:if>
<c:if
	test="%{pendingTDS.size()>0 || (showRemittedEntries==true && remittedTDS.size()>0) || inWorkflowTDS.size()>0 }">
	<div class="buttonbottom" align="center">
		Export Options: <label onclick="exportXls()"><a
			href='javascript:void(0);'>Excel</a></label> | <label onclick="exportPdf()"><a
			href="javascript:void(0);">PDF</a></label>
	</div>
</c:if>
