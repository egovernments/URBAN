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


<script language="javascript"
	src="../resources/javascript/jsCommonMethods.js?rnd=${app_release_no}"></script>
<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
<h5 style="color: red">
	<!-- TODO: Manual migration required for custom Struts tag -->
</h5>
<c:if test="%{bankBookViewEntries.size()>0}">
	<br />

	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="subheadnew">
				<div>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<th class="bluebgheadtd" width="100%" colspan="14"><strong
								style="font-size: 15px;">${ulbName}<br />
									Bank Book Report for <s:property
										value="bankAccount.bankbranch.bank.name" />-<s:property
										value="bankAccount.bankbranch.branchname" />-<s:property
										value="bankAccount.accountnumber" /> <s:property
										value="header" /> from <s:property
										value="%{getFormattedDate(startDate)}" /> to <s:property
										value="%{getFormattedDate(endDate)}" /> </strong></th>
						</tr>

					</table>
				</div>
			</td>
		</tr>
		<tr>
			<td class="blueborderfortd">
				<div>
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						class="tablebottom">
						<tr>
							<th class="bluebgheadtd" colspan="5"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" colspan="5"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</tr>
						<tr>
							<th class="bluebgheadtd" width="2%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="15%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="2%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="15%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</tr>
						<c:forEach value="bankBookViewEntries" status="stat" var="p">
							<tr>
								<td class="blueborderfortd"><div align="center">
										${receiptVoucherDate}
										&nbsp;
									</div></td>
								<td class="blueborderfortd"><a href="javascript:void(0);"
									onclick="viewVoucher(<!-- TODO: Manual migration required for custom Struts tag -->);"><s:property
											value="receiptVoucherNumber" /> </a>&nbsp;</td>
								<td class="blueborderfortd"><c:if
										test="%{#p.receiptParticulars == 'Total'}">
										<strong>${receiptParticulars}&nbsp;</strong>
									</c:if> <c:otherwise>
										${receiptParticulars}&nbsp;</s:else></td>
								<td class="blueborderfortd"><div align="right">
										<c:if test="%{#p.receiptParticulars == 'Total'}">
											<strong><!-- TODO: Manual migration required for custom Struts tag -->
													<!-- TODO: Manual migration required for custom Struts tag -->
												</s:text></strong>
										</c:if>
										<c:otherwise>
											<c:if test="%{#p.receiptAmount != null}">
												<!-- TODO: Manual migration required for custom Struts tag -->
													<!-- TODO: Manual migration required for custom Struts tag -->
												</s:text>&nbsp;
							</c:if>
										</s:else>
									</div></td>
								<td class="blueborderfortd"><c:if
										test="%{#p.receiptChequeDetail == 'MULTIPLE'}">
										<a href="javascript:void(0);"
											onclick='showChequeDetails(${voucherId});'><s:property
												value="receiptChequeDetail" /></a>&nbsp;
						</c:if> <c:otherwise>
										${receiptChequeDetail}&nbsp;</s:else></td>
								<td class="blueborderfortd"><s:property
										value="paymentVoucherDate" /></td>
								<td class="blueborderfortd"><a href="javascript:void(0);"
									onclick="viewVoucher(<!-- TODO: Manual migration required for custom Struts tag -->);"><s:property
											value="paymentVoucherNumber" /> </a>&nbsp;</td>
								<td class="blueborderfortd"><c:if
										test="%{#p.paymentParticulars == 'Total'}">
										<strong>${paymentParticulars}</strong>&nbsp;
						</c:if> <c:otherwise>
										${paymentParticulars}&nbsp;
						</s:else></td>
								<td class="blueborderfortd"><div align="right">
										<c:if test="%{#p.receiptParticulars == 'Total'}">
											<strong><!-- TODO: Manual migration required for custom Struts tag -->
													<!-- TODO: Manual migration required for custom Struts tag -->
												</s:text></strong>&nbsp;
						</c:if>
										<c:otherwise>
											<c:if test="%{#p.paymentAmount != null}">
												<!-- TODO: Manual migration required for custom Struts tag -->
													<!-- TODO: Manual migration required for custom Struts tag -->
												</s:text>&nbsp;
							</c:if>
										</s:else>
									</div></td>
								<td class="blueborderfortd"><c:if
										test="%{#p.paymentChequeDetail == 'MULTIPLE'}">
										<a href="javascript:void(0);"
											onclick='showChequeDetails(${voucherId});'><s:property
												value="paymentChequeDetail" /></a>&nbsp;
						</c:if> <c:otherwise>
										${paymentChequeDetail}&nbsp;</s:else></td>
							</tr>
						</c:forEach>
					</table>
				</div>
			</td>
		</tr>
	</table>
	</td>
	</tr>
	<tr>
		<div class="buttonbottom">
			<!-- TODO: Manual migration required for custom Struts tag --> <label onclick="exportXls()"><a
				href='javascript:void(0);'><!-- TODO: Manual migration required for custom Struts tag --> </a></label> | <label onclick="exportPdf()"><a
				href="javascript:void(0);"><!-- TODO: Manual migration required for custom Struts tag --></a></label>
		</div>
	</tr>
	</table>
</c:if>
<c:otherwise>
	<span class="mandatory1"><!-- TODO: Manual migration required for custom Struts tag --> </span>
</s:else>
