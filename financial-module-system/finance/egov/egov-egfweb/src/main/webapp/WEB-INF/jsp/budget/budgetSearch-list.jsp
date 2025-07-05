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
<STYLE type="text/css">
.tabbertab {
	border: 1px solid #CCCCCC;
	height: 420px;
	margin-bottom: 8px;
	overflow: scroll;
}
</STYLE>
</head>

<body>
	<script>
			var budgetDetailsTable = null;

			function validateAndSubmit()
			{
				document.forms[0].action='/services/EGF/budget/budgetSearch-groupedBudgets.action';
				jQuery(document.forms[0]).append(jQuery('<input>', {
                    type : 'hidden',
                    name : '${_csrf.parameterName}',
                    value : '${_csrf.token}'
                }));
				document.forms[0].submit();
			}
			
		</script>
	<jsp:include page="budgetHeader.jsp" />
	<form:form action="budgetSearch" theme="simple">
		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<%@ include file='budgetSearch-form.jsp'%>
			<div class="buttonbottom" style="padding-bottom: 10px;">
				<input type="button" value="Search" class="buttonsubmit"
					  onclick="return validateAndSubmit()" />
				<!-- TODO: Manual migration required for custom Struts tag --> 
				<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
					onclick="window.parent.postMessage('close','*');window.close();" class="button" />
			</div>
			<h5 style="color:red">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag --></h5>
	</form:form>

	<c:if test="%{!budgetList.isEmpty()}">
		<div id="detail">
			<table align="center" border="0" cellpadding="0" cellspacing="0"
				width="100%" class="tablebottom"
				style="border-right: 0px solid #C5C5C5;">
				<tr>
					<td colspan="9">
						<div class="subheadsmallnew">
							<strong>Budget</strong>
						</div>
					</td>
				</tr>
				<tr>
					<th class="bluebgheadtd" width="10%"><s:text
							name="budget.budgetname" /></th>
					<th class="bluebgheadtd" width="11%"><s:text
							name="budget.parent" /></th>
					<th class="bluebgheadtd" width="10%"><s:text
							name="budget.description" /></th>
				</tr>
				<c:forEach value="budgetList" status="stat">
					<tr>
						<td class="blueborderfortd">
						<a
							href='<!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
							</s:url>'>${name}</a>  &nbsp;</td>
						<td class="blueborderfortd">${parent.name}&nbsp;</td>
						<td class="blueborderfortd">${description}&nbsp;</td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</c:if>
	
</body>
</html>
