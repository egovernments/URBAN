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


<jsp:include page="../budget/budgetHeader.jsp">
	<jsp:param name="heading" value='Fund Flow Analysis Report' />
</jsp:include>
<span class="mandatory"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
</span>
<div class="subheadsmallnew">
	<span class="subheadnew">${ulbName}</span>
</div>
<table id="header" width="100%" cellpadding="0" cellspacing="0"
	border="0">
	<tr>
		<td class="greybox" width="15%"><!-- TODO: Manual migration required for custom Struts tag --></td>
		<td class="greybox" width="34%"><form:select path="fund" id="fund"
				list="dropdownData.fundList" listKey="id" listValue="name"
				headerKey="" headerValue="-----choose----" /></td>
		<td class="greybox" width="15%"><!-- TODO: Manual migration required for custom Struts tag --><span
			class="mandatory">*</span></td>
		<td class="greybox" width="34%"><s:date name='asOnDate'
				var="asOnDateId" format='dd/MM/yyyy' /> <form:input path="asOnDate"
				id="asOnDate" value='%{asOnDateId}'
				onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
			href="javascript:show_calendar('fundFlowReport.asOnDate');"
			style="text-decoration: none">&nbsp;<img tabIndex="-1"
				src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" />
		</A></td>
	</tr>
	<tr>


	</tr>
</table>
<div class="buttonbottom">
	<s:submit value="Search" method="search" id="search"
		cssClass="buttonsubmit" onclick="return validateFundFlow()" />
	<s:reset name="button" type="submit" cssClass="button" id="button"
		value="Cancel" />
	<s:submit value="Close" onclick="javascript: self.close()"
		cssClass="button" />
</div>

<br />

<c:if test="receiptList!=null && receiptList.size()>0">
	<div id="recaluclateButton" align="right" style="display: none">
		<s:submit value="Re Calculate" method="recalculateOpeningBalance"
			id="recalculate" cssClass="buttonsubmit"
			onclick=" return alertTheMessage();" />
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="blueborderfortd">
				<div>
					<table title="RECEIPT BANK DETAILS" width="100%" cellpadding="0"
						cellspacing="0" border="0" class="tablebottom" id="receiptTable">
						<tr>
							<td colspan=8 align="center"><b>RECEIPT BANK DETAILS</b></td>
							<td align="right" border="0"><strong>(Rupees in
									Lakh)</strong></td>
						</tr>
						<tr>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
						</tr>
						<c:forEach id="t" var="fundFlowBean" value="receiptList"
							status="s">
							<c:if test="#s.odd">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</c:if>
							<c:otherwise>
								<!-- TODO: Manual migration required for custom Struts tag -->
							</s:else>
							<c:if test="#s.first">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</c:if>
							<!-- TODO: Manual migration required for custom Struts tag -->" />
							<c:if test="%{receiptList[#s.index].accountNumber!='Total'}">
								<tr>
									<input type="hidden"
										name='receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].id'
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].id"
										value="${id}" />
									<input type="hidden"
										name='receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].bankAccountId'
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].bankAccountId"
										value="${bankAccountId}" />
									<c:if test="%{receiptList[#s.index].walkinPaymentAccount}">
										<td class="${tdcss}"
											style="text-align: center; background-color: #FFAC30; color: #000000"><input
											type="text"
											name='receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].bankName'
											id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].bankName"
											value="${bankName}" readonly /></td>
									</c:if>
									<c:otherwise>
										<td class="${tdcss}" style="text-align: center;"><input
											type="text"
											name='receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].bankName'
											id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].bankName"
											value="${bankName}" readonly /></td>
									</s:else>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].fundName"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].fundName"
										value="${fundName}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].glcode"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].glcode"
										value="${glcode}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										value="${accountNumber}" readonly /></td>

									<td class="${tdcss}" style="text-align: center"><b> <input
											type="text"
											style='text-align: right; background-color: #FFFF00; color: #000000'
											name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
											id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
											value="${openingBalance}" readonly
											onblur="calculateFunds(this)" />
									</b></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; right; background-color: #FFAC30; color: #000000'
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
										value="${currentReceipt}"
										onblur="calculateFunds(this)" /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #01DFD7; color: #000000'
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
										value="${fundsAvailable}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #81BEF7; color: #000000'
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
										value="${btbPayment}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #81BEF7; color: #000000'
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
										value="${btbReceipt}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #FFFF00; color: #000000'
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
										value="${closingBalance}" readonly /></td>

								</tr>
							</c:if>
							<c:otherwise>
								<td class="${tdcss}" style="text-align: center"></td>
								<td class="${tdcss}" style="text-align: center"></td>
								<td class="${tdcss}" style="text-align: center"></td>
								<strong><td class="${tdcss}"
									style="text-align: center;"><input type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										value="${accountNumber}" readonly /></td></strong>
								<td class="${tdcss}" style="text-align: center"><input
									type="text"
									style='text-align: right; background-color: #DEB887; color: #000000'
									name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
									id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
									value="${openingBalance}" readonly
									onblur="calculateFunds(this)" /></td>
								<td class="${tdcss}" style="text-align: center"><input
									type="text"
									style='text-align: right; background-color: #DEB887; color: #000000'
									name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
									id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
									value="${currentReceipt}" readonly
									onblur="calculateFunds(this)" /></td>
								<td class="${tdcss}" style="text-align: center"><input
									type="text"
									style='text-align: right; background-color: #DEB887; color: #000000'
									name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
									id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
									value="${fundsAvailable}" readonly /></td>
								<td class="${tdcss}" style="text-align: center"><input
									type="text"
									style='text-align: right; background-color: #DEB887; color: #000000'
									name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
									id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
									value="${btbPayment}" readonly /></td>
								<td class="${tdcss}" style="text-align: center"><input
									type="text"
									style='text-align: right; background-color: #DEB887; color: #000000'
									name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
									id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
									value="${btbReceipt}" readonly /></td>
								<td class="${tdcss}"
									style="text-align: center; text-decoration: bold"><input
									type="text"
									style='text-align: right; background-color: #DEB887; color: #000000'
									name="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
									id="receiptList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
									value="${closingBalance}" readonly /></td>
							</s:else>
						</c:forEach>
						<tr>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"><B><s:text
										name="Total (A)" /> </B>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[0].openingBalance" id="total[0].openingBalance"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[0].currentReceipt" id="total[0].currentReceipt"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[0].fundsAvailable" id="total[0].fundsAvailable"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[0].btbPayment" id="total[0].btbPayment" readonly
								value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[0].btbReceipt" id="total[0].btbReceipt" readonly
								value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[0].closingBalance" id="total[0].closingBalance"
								readonly value="0.00" /></td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>
</c:if>
<!-- End of RECEIPT -->


<br />
<br />
<c:if test="paymentList!=null && paymentList.size()>0">
	<table width="99%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="blueborderfortd">
				<div>
					<table title="PAYMENT BANK DETAILS" width="100%" cellpadding="0"
						cellspacing="0" border="0" class="tablebottom" id="paymentTable">
						<tr>
							<td colspan="11" align="center"><b>PAYMENT BANK DETAILS</b></td>
							<td align="right"><strong>(Rupees in Lakh)</strong></td>
						</tr>
						<tr>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->
							</th>

						</tr>
						<c:forEach id="t" var="fundFlowBean" value="paymentList"
							status="s">
							<c:if test="#s.odd">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</c:if>
							<c:otherwise>
								<!-- TODO: Manual migration required for custom Struts tag -->
							</s:else>
							<c:if test="#s.first">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</c:if>
							<!-- TODO: Manual migration required for custom Struts tag -->" />
							<c:if test="%{paymentList[#s.index].accountNumber!='Total'}">
								<tr>
									<input type="hidden"
										name='paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].id'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].id"
										value="${id}" />
									<input type="hidden"
										name='paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].bankAccountId'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].bankAccountId"
										value="${bankAccountId}" />
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name='paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].bankName'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].bankName"
										value="${bankName}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name='paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].fundName'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].fundName"
										value="${fundName}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name='paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].glcode'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].glcode"
										value="${glcode}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										value="${accountNumber}" readonly /></td>
									<td class="${tdcss}" style="text-align: center;"><input
										type="text"
										style='text-align: right; background-color: #FFFF00; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
										style='text-align:right'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
										value="${openingBalance}" readonly
										onblur="calculateFundsForPayment(this)" /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #FFAC30; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
										value="${currentReceipt}"
										onblur="calculateFundsForPayment(this)" /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #81BEF7; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
										value="${btbPayment}" readonly /></td>

									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #81BEF7; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
										value="${btbReceipt}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #01DFD7; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
										value="${fundsAvailable}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #FF8484; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].concurranceBPV"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].concurranceBPV"
										value="${concurranceBPV}" readonly /></td>

									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #FFFF00; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
										value="${closingBalance}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #81BEF7; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].outStandingBPV"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].outStandingBPV"
										value="${outStandingBPV}" readonly /></td>
								</tr>
							</c:if>
							<c:otherwise>
								<tr>

									<td class="${tdcss}" style="text-align: center"></td>
									<td class="${tdcss}" style="text-align: center"></td>
									<td class="${tdcss}" style="text-align: center"></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].accountNumber"
										value="${accountNumber}" readonly /></td>
									<td class="${tdcss}"
										style="text-align: center; font-weight: bold;"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
										style='text-align:right'
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].openingBalance"
										value="${openingBalance}" readonly
										onblur="calculateFundsForPayment(this)" /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].currentReceipt"
										value="${currentReceipt}"
										onblur="calculateFundsForPayment(this)" /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbPayment"
										value="${btbPayment}" readonly /></td>

									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].btbReceipt"
										value="${btbReceipt}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].fundsAvailable"
										value="${fundsAvailable}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].concurranceBPV"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].concurranceBPV"
										value="${concurranceBPV}" readonly /></td>

									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].closingBalance"
										value="${closingBalance}" readonly /></td>
									<td class="${tdcss}" style="text-align: center"><input
										type="text"
										style='text-align: right; background-color: #DEB887; color: #000000'
										name="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].outStandingBPV"
										id="paymentList[<!-- TODO: Manual migration required for custom Struts tag -->].outStandingBPV"
										value="${outStandingBPV}" readonly /></td>
								</tr>
							</s:else>
						</c:forEach>
						<tr>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"><b><s:text
										name="Total (B)" /></b></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].openingBalance" id="total[1].openingBalance"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].currentReceipt" id="total[1].currentReceipt"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].btbPayment" id="total[1].btbPayment" readonly
								value="0.00" /></td>


							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].btbReceipt" id="total[1].btbReceipt" readonly
								value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].fundsAvailable" id="total[1].fundsAvailable"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].concurranceBPV" id="total[1].concurranceBPV"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].closingBalance" id="total[1].closingBalance"
								readonly value="0.00" /></td>


							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[1].outStandingBPV" id="total[1].outStandingBPV"
								readonly value="0.00" /></td>
						</tr>

						<tr>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"><B><s:text
										name=" Grand Total (A + B)" /></B></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[2].openingBalance" id="total[2].openingBalance"
								readonly value="0.00" /></td>
							<td class="${tdcss}" style="text-align: center;"></td>

							<td class="${tdcss}" style="text-align: center"></td>

							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"></td>

							<td class="${tdcss}" style="text-align: center"></td>
							<td class="${tdcss}" style="text-align: center"><input
								type="text"
								style='text-align: right; background-color: #F7BE81; color: #000000'
								name="total[2].closingBalance" id="total[2].closingBalance"
								readonly value="0.00" /></td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>

</c:if>

<c:if
	test="receiptList!=null && receiptList.size()==0 && paymentList!=null && paymentList.size()==0 ">
	<div class="error">
		<span class="bluebgheadtd" colspan="7"><s:text
				name="no.data.found" /></span>
	</div>
</c:if>
