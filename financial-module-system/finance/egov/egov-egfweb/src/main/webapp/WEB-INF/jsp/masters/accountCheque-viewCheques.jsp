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
<script
        src="<cdn:url value='/resources/app/js/i18n/jquery.i18n.properties.js?rnd=${app_release_no}' context='/services/EGF'/>"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/calender.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/accountCheque.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/egi/resources/global/js/egov/patternvalidation.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">

<title>Account Cheque Create</title>

</head>


<body onload="clearHeaderData();">

	<jsp:include page="../budget/budgetHeader.jsp">
		<jsp:param name="heading" value="Account Cheque Create" />
	</jsp:include>
	<form:form action="accountCheque" theme="simple" name="chequeMaster"
		id="chequeMaster">
		<c:if test="hasActionMessages()">
			<font style='color: green; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag -->
			</font>
		</c:if>
		<div class="formmainbox">
			<div class="formheading">
				<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></div>
			</div>
			<br />
			<c:if test="%{bankaccount != null}">
				<table width="100%" cellspacing="0" cellpadding="0" border="0"
					align="center">
					<tr align="center">
						<div class="headingsmallbg">
							<td class="bluebgheadtd" width="100%" colspan="5"><strong
								style="font-size: 15px;"><!-- TODO: Manual migration required for custom Struts tag --></strong></td>
						</div
					</tr>
				</table>
				</br>
				<table border="0" width="100%">

					<tr>
						<td class="bluebox "></td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span></td>
						<td class="bluebox"><s:property
								value="bankaccount.bankbranch.bank.name" /></td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span></td>
						<td class="bluebox"><s:property
								value="bankaccount.bankbranch.branchname" /></td>
					</tr>
					<tr>
						<td class="bluebox "></td>
						<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory1">*</span></td>
						<td class="greybox"><s:property
								value="bankaccount.accountnumber" /></td>
						<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span></td>
						<td class="greybox">${bankaccount.fund.name}</td>
					</tr>
				</table>

				<!-- TODO: Manual migration required for custom Struts tag -->
			</c:if>
			</br></br>
			<c:if test="%{chequeDetailsList.size()>0}">
				<table width="100%" cellspacing="0" cellpadding="0" border="0"
					align="center">
					<tr align="center">
						<div class="headingsmallbg">
							<td><span class="bold"><!-- TODO: Manual migration required for custom Struts tag --></span></td>
						</div>
					</tr>
				</table>

				<table width="99%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td class="bluebox">
							<table width="100%" border="0" cellpadding="0" cellspacing="0"
								class="tablebottom">
								<tr>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
									<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
								</tr>
								<c:forEach value="chequeDetailsList" status="stat" var="p">
									<tr>
										<td class="blueborderfortd"><div align="center">
												${fromChqNo}
											</div></td>
										<td class="blueborderfortd"><div align="center">
												${toChqNo}
											</div></td>
										<td class="blueborderfortd"><div align="center">
												${deptName}
											</div></td>
										<td class="blueborderfortd"><div align="center">
												${receivedDate}
											</div></td>
										<td class="blueborderfortd"><div align="center">
												${serialNoH}
											</div></td>
										<td class="blueborderfortd"><div align="center">
												${isExhusted}
											</div></td>

									</tr>
								</c:forEach>
							</table>
						</td>
					</tr>
				</table>
			</c:if>
			<span class="mandatory1"> <c:otherwise><!-- TODO: Manual migration required for custom Struts tag --> </s:else></span>
		</div>
		<div class="buttonbottom">
			<input type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
				onclick="javascript:window.close()" class="button" />
		</div>
	</form:form>
</body>

</html>
