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
<%@ taglib uri="/WEB-INF/taglib/cdn.tld" prefix="cdn" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
</head>
<body>

<form:form theme="simple" name="challan">
<!-- TODO: Manual migration required for custom Struts tag -->
	<div class="subheadnew">
	<c:if test="%{sourcePage=='cancelReceipt'}">
	
				  <!--  copy from receipt index start -->
				 <table width="100%" border="0" cellpadding="0" cellspacing="0" class="tablebottom">
					<tr align="center">
					<font size="2" color="red"><b>
						<div align="center"><!-- TODO: Manual migration required for custom Struts tag --></div>
					</b></font>
					</tr>
					<tr>
						<th class="bluebgheadtd" width="20%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd" width="30%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd" width="25%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd" width="25%" ><!-- TODO: Manual migration required for custom Struts tag --></th>
					</tr>
					<tr>
						<td class="blueborderfortd"><div align="center">${%{challan.challanNumber}}</div></td>
						<td class="blueborderfortd"><div align="center">${%{receiptnumber}}</div></td>
						<td class="blueborderfortd"><div align="center"><!-- TODO: Manual migration required for custom Struts tag -->${%{cdFormat}}</div></td>
						<td class="blueborderfortd"><div align="center">${%{status.description}}</div></td>
					</tr>
				</table>
				 <!--  copy end -->
	</c:if>
		<!-- TODO: Manual migration required for custom Struts tag -->
    <c:if test="%{sourcePage==null || sourcePage=='inbox' }"> 
		<c:if test="%{challan.state.value=='CHECKED'}">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</c:if> 
		<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</s:elseif>
		<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</s:elseif> 
		<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag --> ${%{approverName}}
		</s:elseif>
		<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</s:elseif>
		</c:if>
		
	</div>
	<br />

	<div class="buttonbottom">
	<input name="buttonClose" type="button" class="button"
		id="buttonClose" value="Close" onclick="window.close()" />
	</div>
</s:push>
</form:form>
<script src="<cdn:url value='/resources/global/js/egov/inbox.js?rnd=${app_release_no}' context='/services/egi'/>"></script>
</body>
</html>
