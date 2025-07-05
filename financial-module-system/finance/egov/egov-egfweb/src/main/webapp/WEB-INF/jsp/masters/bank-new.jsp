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
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>

<%@ page language="java"%>
<html>
<head>

<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<SCRIPT type="text/javascript">
    function checkuniquenesscode(){
    	document.getElementById('codeuniquecode').style.display ='none';
		var code=document.getElementById('code').value;
		populatecodeuniquecode({code:code});
    }
    function checkuniquenessname(){
    	document.getElementById('nameuniquename').style.display ='none';
		var name=document.getElementById('name').value;
		populatenameuniquename({name:name});
    }
    
    </SCRIPT>
</head>
<body>
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div style="color: red">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div style="color: green">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div class="errorstyle" style="display: none" id="codeuniquecode">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div class="errorstyle" style="display: none" id="nameuniquename">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>

		<form:form name="bankForm" action="bank" theme="simple">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td class="bluebox" width="10%"></td>
						<td class="bluebox" width="10%"><s:text
								name="bank.create.name" /><span class="mandatory1">*</span></td>
						<td class="bluebox" width="46%"><form:input id="name"
								name="name" onblur="checkuniquenessname();" /></td>
						<egov:uniquecheck id="nameuniquename" name="nameuniquename"
							fieldtoreset="name" fields="['Value']"
							url='masters/bank!nameUniqueCheckName.action' />
					</tr>
					<tr>
						<td class="greybox" width="10%"></td>
						<td class="greybox" width="10%"><s:text
								name="bank.create.code" /><span class="mandatory1">*</span></td>
						<td class="greybox" width="30%" colspan=8><form:input
								id="code" name="code" onblur="checkuniquenesscode();" /></td>
						<egov:uniquecheck id="codeuniquecode" name="codeuniquecode"
							fieldtoreset="code" fields="['Value']"
							url='masters/bank!codeUniqueCheckCode.action' />
						<td class="greybox" width="2%"><s:text
								name="bank.create.isactive" /></td>
						<td class="greybox"><form:checkbox id="isactive" path="isactive" />
						</td>
					</tr>

				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td class="bluebox" width="10%"></td>
						<td class="bluebox" width="10%"><s:text
								name="bank.create.remarks" /></td>
						<td class="bluebox"><form:textarea id="narration"
								name="narration" style="width:470px" /></td>
					</tr>

				</table>
				<br />
				<br />
				<div class="buttonbottom" style="padding-bottom: 10px;">
					<s:submit name="Save" value="Save" method="create"
						cssClass="buttonsubmit" />
					<input type="button" id="Close" value="Close"
						onclick="javascript:window.parent.postMessage('close','*');" class="button" />
				</div>
			</s:push>
		</form:form>
</body>
</html>
