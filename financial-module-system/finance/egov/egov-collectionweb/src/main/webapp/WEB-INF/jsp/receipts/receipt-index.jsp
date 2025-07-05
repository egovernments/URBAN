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


<%@ include file="/includes/taglibs.jsp" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cancel Receipt</title>
</head>
<body >
<form:form theme="simple" name="searchReceiptForm" action="searchReceipt">


<table width="100%" cellpadding="0" cellspacing="0" border="0" class="main" align="center">
<tr>
<td>&nbsp;</td>
</tr>
	<td align="center"><table width="100%" border="0" cellpadding="0" cellspacing="0" class="tablebottom">
		<tr align="center">
			<font size="2" color="red"><b>
			<c:if test="target=='view'">
				<div align="center"><!-- TODO: Manual migration required for custom Struts tag --></div>
			</c:if>		
			<!-- TODO: Manual migration required for custom Struts tag -->
				<div align="center"><!-- TODO: Manual migration required for custom Struts tag --></div>
			</s:else>
			</b></font>
		</tr>
		<c:forEach value="%{receiptHeaderValues}"> 
		<tr>
			<c:if test="%{receipttype=='B'}">
			<th class="bluebgheadtd" width="20%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>
			<c:if test="%{receipttype=='C'}">
			<th class="bluebgheadtd" width="20%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>
			
			<th class="bluebgheadtd" width="30%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
			<th class="bluebgheadtd" width="25%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
			<th class="bluebgheadtd" width="25%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
		</tr>
		<tr>
			<c:if test="%{receipttype=='B'}">
			<td class="blueborderfortd"><div align="center">${%{referencenumber}}</div></td>
			</c:if>
			<c:if test="%{receipttype=='C'}">
			<td class="blueborderfortd"><div align="center">${%{challan.challanNumber}}</div></td>
			</c:if>
			<td class="blueborderfortd"><div align="center">${%{receiptnumber}}</div></td>
			<td class="blueborderfortd"><div align="center"><!-- TODO: Manual migration required for custom Struts tag -->${%{cdFormat}}</div></td>
			<td class="blueborderfortd"><div align="center">${%{status.description}}</div></td>
		</tr>
		</c:forEach>
	</table></td>
</table>
<br/>
<div class="buttonbottom">
<input name="button2" type="button" class="button" id="button" onclick="window.close()" value="<!-- TODO: Manual migration required for custom Struts tag -->"/>
</div>
</form:form>
</body>
</html>
