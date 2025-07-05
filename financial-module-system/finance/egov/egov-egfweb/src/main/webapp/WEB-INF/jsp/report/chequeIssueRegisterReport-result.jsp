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
<c:if test="%{chequeIssueRegisterList.size()>0}">
<!-- TODO: Manual migration required for custom Struts tag --></s:hidden>
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="bluebox">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"
					class="tablebottom">
					<tr>
						<td>
							<div class="subheadsmallnew">
								<span class="subheadnew">${ulbName}</span>
							</div>
						</td>
					</tr>
					<tr>
						<th class="bluebgheadtd" width="100%"><strong
							style="font-size: 15px;"><!-- TODO: Manual migration required for custom Struts tag --> 
								for <b>${formattedBankName}</b> with <br />account
								no:<b>${accountNumber.accountnumber}</b>
								from <b>${fromDate}</b> to <b><s:property
										value="toDate" /></b>
						</strong></th>
					</tr>
					<tr>
						<td class="blueborderfortd">
							<div>
								<table width="100%" border="0" cellpadding="0" cellspacing="0"
									class="tablebottom">

									<tr>
										<th class="bluebgheadtd" width="2%">Sl No</th>
										<th class="bluebgheadtd" width="2%">Cheque Number</th>
										<th class="bluebgheadtd" width="8%">Cheque Date</th>
										<th class="bluebgheadtd" width="10%">Name of the Payee</th>
										<th class="bluebgheadtd" width="10%">Cheque Amount(Rs)</th>
										<th class="bluebgheadtd" width="10%">Nature of Payment</th>
										<th class="bluebgheadtd" width="10%">Cheque Status</th>
										<th class="bluebgheadtd" width="15%">Payment Order No.
											&amp; Date</th>
										<th class="bluebgheadtd" width="15%">Bank Payment Voucher
											No. &amp; Date</th>
										<th class="bluebgheadtd" width="15%">Bank Advice Report</th>
										<c:if
											test="%{chequePrintingEnabled && chequePrintAvailableAt=='assignment'}">
											<th class="bluebgheadtd" width="8%">Print Cheque</th>
										</c:if>
									</tr>
									<c:forEach value="chequeIssueRegisterList" status="stat">
										<tr>
											<td class="blueborderfortd"><div align="center">
													${#stat.index+1}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="center">
													${chequeNumber}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><s:property
													value="chequeDate" />&nbsp;</td>
											<td class="blueborderfortd"><div align="center">
													${payTo}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="right">
													<!-- TODO: Manual migration required for custom Struts tag -->
														<!-- TODO: Manual migration required for custom Struts tag -->
													</s:text>
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="center">
													${voucherName}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="center">
													${chequeStatus}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="center">
													${billNumberAndDate}
													&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="center">
													<a href="javascript:void(0);"
														onclick='viewVoucher("<!-- TODO: Manual migration required for custom Struts tag -->",${voucherHeaderIdsForMultiple});'><s:property
															value="voucherNumberAndDate" /></a>&nbsp;
												</div></td>
											<td class="blueborderfortd"><div align="center">
													<a
														href='/services/EGF/report/chequeIssueRegisterReport-bankAdviceExcel.action?instrumentHeaderId=${instrumentHeaderId}'>
														<!-- TODO: Manual migration required for custom Struts tag -->
													</a>
												</div></td>
											<c:if
												test="%{chequePrintingEnabled && chequePrintAvailableAt=='assignment' && chequeStatus=='New'}">
												<td class="blueborderfortd"><div align="center">
														<input type="button" value="Print"
															onclick="return printCheque(<s:property
						                           value="%{instrumentHeaderId}" />);"
															class="button" />
													</div></td>
											</c:if>
											<c:otherwise>
												<td class="blueborderfortd"></td>
											</s:else>
										</tr>
									</c:forEach>

									<input type="hidden" name='chequeFormatId' id="chequeFormatId"
										value="${chequeFormat}" />
								</table>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="excelpdf">
								<a
									href='/services/EGF/report/chequeIssueRegisterReport-generateXls.action?fromDate=${fromDate}&toDate=${toDate}&accountNumber.id=${accountNumber.id}&deptImpl.code=${deptImpl.code}&function.id=${function.id}&functionary.id=${functionary.id}&fund.id=${fund.id}&field.id=${field.id}&bank=${bank}'>Excel</a>
								<img align="absmiddle"
									src="/egi/resources/erp2/images/excel.png"> | <a
									href='/services/EGF/report/chequeIssueRegisterReport-generatePdf.action?fromDate=${fromDate}&toDate=${toDate}&accountNumber.id=${accountNumber.id}&deptImpl.code=${deptImpl.code}&function.id=${function.id}&functionary.id=${functionary.id}&fund.id=${fund.id}&field.id=${field.id}&bank=${bank}'>PDF</a>
								<img align="absmiddle" src="/egi/resources/erp2/images/pdf.png">
							</div>
						</td>
					</tr>

				</table>
			</td>
		</tr>
	</table>
</c:if>
<c:otherwise>
	<h5 style="color: red">No Data Found.</h5>
</s:else>
