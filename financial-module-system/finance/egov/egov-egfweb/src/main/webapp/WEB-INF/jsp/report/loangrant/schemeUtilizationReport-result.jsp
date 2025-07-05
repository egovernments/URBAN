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


<html>
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<head>
<script type="text/javascript" language="javascript"
	src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<style type="text/css">
#codescontainer {
	position: absolute;
	left: 11em;
	width: 9%;
	text-align: left;
}

#codescontainer .yui-ac-content {
	position: absolute;
	width: 600px;
	border: 1px solid #404040;
	background: #fff;
	overflow: hidden;
	z-index: 9050;
}

#codescontainer .yui-ac-shadow {
	position: absolute;
	margin: .3em;
	width: 300px;
	background: #a0a0a0;
	z-index: 9049;
}

#codescontainer ul {
	padding: 5px 0;
	width: 100%;
}

#codescontainer li {
	padding: 0 5px;
	cursor: default;
	white-space: nowrap;
}

#codescontainer li.yui-ac-highlight {
	background: #ff0;
}

#codescontainer li.yui-ac-prehighlight {
	background: #FFFFCC;
}
</style>
</head>

<body>
	<jsp:include page="../../budget/budgetHeader.jsp">
		<jsp:param value="Scheme Utilization Report" name="heading" />
	</jsp:include>
	<div class="formmainbox">
		<h1 class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</h1>
	</div>
	<div style="color: red">
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
	</div>
	<form:form name="schemeUtilizationReport" action="schemeUtilizationReport"
		theme="simple">
		<table align="center" width="100%" cellpadding="0" cellspacing="0"
			border="0">
			<tr>

				<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> <s:property
						value="projectCode" /></th>
				<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th columnspan="2" class="bluebgheadtd"><s:text
						name="fundingwise.utilization" /></th>
			</tr>
			<!-- TODO: Manual migration required for custom Struts tag -->
			<c:forEach var="pc" value="projectCodeResultList" status="stat">
				<c:if test="#stat.index==0">
					<tr>
						<td class="blueborderfortd" style="text-align: center"><s:set
								var="subSchemeName" value="subScheme" /> <B> <s:property
									value="subScheme" />
						</B></td>
						<td class="blueborderfortd" style="text-align: center"><s:set
								var="projectCode" value="code" /> ${code}
						</td>
						<td class="blueborderfortd" style="text-align: center"><s:property
								value="voucherNumber" /></td>
						<td class="blueborderfortd" style="text-align: center"><s:date
								name="%{voucherDate}" format="dd/MM/yyyy" /></td>
						<td class="blueborderfortd" style="text-align: right"><s:text
								name="format.amount">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</s:text></td class="blueborderfortd">
						<td class="blueborderfortd" style="text-align: center"><s:text
								name="status" /></td>
						<td columnspan="2" rowspan='${maxRows+1}'
							class="blueborderfortd">
							<div id="fdetails" valign="top"></div>
						</td>
					</tr>
				</c:if>
				<c:otherwise>
					<tr>
						<td class="blueborderfortd" style="text-align: center"><c:if
								test="%{#subSchemeName!=subScheme}">
								<!-- TODO: Manual migration required for custom Struts tag -->
								<b>${subScheme}</b>
							</c:if></td>
						<td class="blueborderfortd" style="text-align: center"><c:if
								test="#projectCode!=code">
								${code}
							</c:if></td>
						<td class="blueborderfortd" style="text-align: center"><s:property
								value="voucherNumber" /></td>
						<td class="blueborderfortd" style="text-align: center"><s:date
								name="%{voucherDate}" format="dd/MM/yyyy" /></td>
						<td class="blueborderfortd" style="text-align: right"><s:text
								name="format.amount">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</s:text></td>

						<td class="blueborderfortd" style="text-align: center"><c:if
								test="#projectCode!=code">
                           Hello
                        </c:if> <!-- TODO: Manual migration required for custom Struts tag --></td>
					</tr>
				</s:else>
			</c:forEach>
			<c:if test="%{projectCodeResultList.size() < maxRows}">
				<!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag -->
				</s:bean>
				<c:forEach value="#counter">
					<tr>
						<td class="blueborderfortd"></td>
						<td class="blueborderfortd"></td>
						<td></td>
						<td class="blueborderfortd"></td>
						<td class="blueborderfortd"></td>
						<td /></td>
					</tr>
				</c:forEach>
			</c:if>

		</table>
		<table align="center">
			<tr class="buttonsubmit">
				<td><input type="button" value="Close"
					onclick="javascript:window.close()" class="button" /></td>
			</tr>
		</table>
		<script>
  var xx=' <table align="top" valign="top" width="100%" cellpadding="0" cellspacing="0" border="0"> ' +
   <c:forEach var="fa" value="faTotalMap.keySet()">
   '<tr> <td class="blueborderfortd" style="text-align:center">${fa} </td>' +      
   '<td class="blueborderfortd" style="text-align:right"><!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text> </td>'+
   '</tr>'+</c:forEach><c:if test="%{fundingPatternBysubScheme.size() < maxRows}"><!-- TODO: Manual migration required for custom Struts tag -->   <!-- TODO: Manual migration required for custom Struts tag --></s:bean>
   <c:forEach value="#counter">'<tr><td class="blueborderfortd">&nbsp;</td><td class="blueborderfortd">&nbsp;</td></tr>'+</c:forEach></c:if>
   '<tr><td class="blueborderfortd"></td> <td class="blueborderfortd" style="text-align:right"><!-- TODO: Manual migration required for custom Struts tag -->123</s:text></td></tr></table>'; 
  document.getElementById("fdetails").innerHTML=xx;
  
  </script>

	</form:form>

</body>


</html>
