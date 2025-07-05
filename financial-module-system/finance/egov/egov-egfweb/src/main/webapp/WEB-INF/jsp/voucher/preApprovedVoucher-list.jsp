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


<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<html>
<head>
<title>Generate PJV</title>
</head>
<body>
	<form:form action="preApprovedVoucher" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Generate PJV" />
		</jsp:include>
		<span class="mandatory"> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<div class="subheadnew">Generate PJV</div>
			<br />
			<div align="left">
				<c:if test="%{shouldShowHeaderField('department')}">
					<strong><!-- TODO: Manual migration required for custom Struts tag --> : </strong>
					${%{getCurrentDepartment().deptName}}
				</c:if>
			</div>
			<br />
			<div id="listid" style="display: block">
				<table width="100%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="tablebottom">
					<tr>
						<th class="bluebgheadtd">Sl. No.</th>
						<th class="bluebgheadtd">Bill Number</th>
						<th class="bluebgheadtd">Bill Date</th>
						<th class="bluebgheadtd">Bill Amount</th>
						<th class="bluebgheadtd">Passed Amount</th>
						<th class="bluebgheadtd">Expenditure Type</th>
					</tr>
					<c:forEach var="p" value="preApprovedVoucherList" status="s">
						<tr>
							<td>${#s.index+1}</td>
							<td><a
								href="preApprovedVoucher!voucher.action?billid=<!-- TODO: Manual migration required for custom Struts tag -->"><s:property
										value="%{billnumber}" /> </a></td>
							<td><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td style="text-align: right"><s:property
									value="%{billamount}" /></td>
							<td style="text-align: right"><s:property
									value="%{passedamount}" /></td>
							<td>${%{expendituretype}}</td>
						</tr>
					</c:forEach>
				</table>
			</div>
			<div class="buttonbottom" id="buttondiv">
				<input type="button" value="Close"
					onclick="javascript:window.close()" class="button" />
				</td>
			</div>
	</form:form>
</body>
</html>
