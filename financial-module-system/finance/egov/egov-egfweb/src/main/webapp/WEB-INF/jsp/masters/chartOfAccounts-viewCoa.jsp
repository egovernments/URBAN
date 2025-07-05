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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>

</head>
<body>
	<jsp:include page="../budget/budgetHeader.jsp" />
	<div class="subheadnew">
		<!-- TODO: Manual migration required for custom Struts tag -->
	</div>
	<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag --></span>
	<form:form name="chartOfAccountsForm" id="chartOfAccountsForm"
		action="chartOfAccounts" theme="simple">
		<div class="formmainbox">
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				id="chartOfAccountsTable">
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.accountCode" />:</strong></td>
					<td width="22%" class="bluebox"><s:property
							value="model.glcode" /></td>
					<td class="bluebox"><strong><s:text
								name="chartOfAccount.name" />:</strong></td>
					<td class="bluebox">${model.name}</td>
				</tr>
				<tr>
					<td width="20%" class="greybox">&nbsp;</td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.description" />:</strong></td>
					<td width="22%" class="greybox">${model.desc}</td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.type" />:</strong></td>
					<td class="greybox"><c:if test="model.type == 'I'">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <c:if test="model.type == 'E'">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <c:if test="model.type == 'A'">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <c:if test="model.type == 'L'">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if></td>
				</tr>
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.classification" />:</strong></td>
					<td width="22%" class="bluebox"><c:if
							test="%{model.classification == 1}">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:elseif> <!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:elseif> <c:otherwise>
						</s:else></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.purpose" />:</strong></td>
					<td class="bluebox"><s:property
							value="accountcodePurpose.name" /></td>
				</tr>
				<tr>
					<td width="20%" class="greybox">&nbsp;</td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.accountDetailType" />:</strong></td>
					<td width="22%" class="greybox"><c:forEach
							value="model.chartOfAccountDetails" status="status">
							${detailTypeId.name}
							<c:if test="!#status.last">,</c:if>
						</c:forEach></td>
					<td width="10%" class="greybox"><strong><s:text
								name="chartOfAccount.activeForPosting" />:</strong></td>
					<td class="greybox"><c:if
							test="%{getIsActiveForPosting() == true}">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <c:otherwise>
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:else></td>
				</tr>
				<tr>
					<td width="20%" class="bluebox">&nbsp;</td>
					<td width="10%" class="bluebox"><strong><s:text
								name="Function Required" />:</strong></td>
					<td width="22%" class="bluebox"><c:if
							test="%{getFunctionReqd() == true}">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <c:otherwise>
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:else></td>
					<td width="10%" class="bluebox"><strong><s:text
								name="chartOfAccount.budgetRequired" />:</strong></td>
					<td class="bluebox"><c:if test="%{budgetCheckReq() == true}">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</c:if> <c:otherwise>
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:else></td>
				</tr>
			</table>
			<br /> <br />
		</div>
		<div class="buttonbottom">
			<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
				onclick="javascript:window.parent.postMessage('close','*');" class="button" />
		</div>
	</form:form>
</body>
</html>
