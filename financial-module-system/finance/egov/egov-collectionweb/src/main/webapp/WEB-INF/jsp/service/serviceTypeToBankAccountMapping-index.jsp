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
<html>
<head>
<title></title>
<script>
	function onChangeBankBranch(bankId) {
		dom.get("bankAccountId").value = "-1";
		populatebranchId({
			bankId : bankId,
		});
	}

	function onChangeBankAccount(branchId,serviceId) {
		populatebankAccountId({
			branchId : branchId,
			serviceId : serviceId,
		});
	}
	function populateService(serviceId) {
		document.getElementById('serviceDetailsId').value = "-1"
		populateserviceDetailsId({
			serviceCatId : serviceId,
		});
	}

	function populateServiceType(selected){
        var isServiceTypeExist = false;
        document.getElementById('serviceTable').innerHTML='';
        if(selected == -1){
			return;
        }
        <c:forEach value="serviceCategoryNames" var="obj">
        var serTypeKey = '${#obj.key}';
        var serTypeValue = '${serviceTypeMap[#obj.key]}';
        if(selected == serTypeKey && serTypeValue != ''){
        	isServiceTypeExist = true;
        	addServiceTypeDropdown('serviceTable');
 			<c:forEach value="serviceTypeMap[#obj.key]" status="stat" var="names">
 				var stKey = '${#names.key}';
 				var stValue = '${#names.value}';
 				document.getElementById('serviceDetailsId').options[${#stat.index+1}]= new Option(stValue,stKey);
			</c:forEach>
        }
		 </c:forEach>
	}
	function addServiceTypeDropdown(tableId){
        var table = document.getElementById(tableId);
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.className='bluebox';
        cell2.className='bluebox';
        cell1.innerHTML = '<!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory"/>';
        cell2.innerHTML = '<select name="serviceDetails.code" id="serviceDetailsId"/>';
		document.getElementById('serviceDetailsId').options.length=0;
		document.getElementById('serviceDetailsId').options[0]= new Option('--------Choose--------','0');
	
	}

	function validate(obj){
		dom.get('error_area').innerHTML = '';
		dom.get("error_area").style.display="none";
		<c:if test="%{null != bankAccountServices && bankAccountServices.size() >0}">
			if(dom.get('serviceAccountId').value == "") {
				dom.get("error_area").innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->';
				dom.get("error_area").style.display="block";
				return false;
			}
		</c:if>
		document.forms[0].action=obj;
		document.forms[0].submit;
	}

	function resetValues()
	{
		jQuery("select").val(-1);
	}
</script>
</head>
<body>
	<form:form name="serviceBankMappingForm" method="post" theme="simple">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<div class="errorstyle" id="error_area" style="display: none;"></div>

			<div class="formmainbox">
				<div class="subheadnew">
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>

				<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 960px; margin: 0 auto;">
					<%-- <tr>
						<td class="bluebox">&nbsp;</td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> </td>
						<td class="bluebox"><form:select headerKey="-1" headerValue="----Choose----" path="bankId" id="bankId" cssClass="selectwk" list="dropdownData.bankNameList" listKey="id" listValue="name" value="%{bankId}" onchange="onChangeBankBranch(this.value)" /> 
							<egov:ajaxdropdown id="bankIdDropdown" fields="['Text','Value']" dropdownId='branchId' url='receipts/ajaxBankRemittance-bankBranchsByBankForReceiptPayments.action' />
						</td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> </td>
						<td class="bluebox"><form:select headerKey="-1" headerValue="----Choose----" path="branchId" id="branchId" cssClass="selectwk" list="dropdownData.bankBranchList" listKey="id" listValue="branchname" value="%{branchId}" onChange="onChangeBankAccount(this.value,document.getElementById('serviceDetailsId').value)" /> 
							<egov:ajaxdropdown id="bankbranchIdDropDown" fields="['Text','Value']" dropdownId='bankAccountId' url='receipts/ajaxBankRemittance-bankAccountByBankBranch.action' />
						</td>
					</tr> --%>
					<tr>
						<td class="bluebox">&nbsp;</td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> </td>
						<td class="bluebox"><form:select headerKey="-1" headerValue="----Choose----" path="bankAccountId.accountnumber" id="bankAccountId" cssClass="selectwk"  list="dropdownData.bankAccountIdList" listKey="accountnumber" listValue="accountnumber" value="%{bankAccountId.accountnumber}" /></td>
					</tr>
					<tr>
						<td class="bluebox">&nbsp;</td>
						<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
						<td class="bluebox">
						<form:select headerKey="-1" headerValue="----Choose----" path="serviceCategory" id="serviceCategoryid" cssClass="selectwk" list="serviceCategoryNames" value="%{serviceCategory}" onChange="populateServiceType(this.value);" /> 
						</td>
						<td colspan="2">
						<table width="100%" id='serviceTable'>
						</table>
						</td>
							<script type="text/javascript">
							console.log(document.getElementById("serviceCategoryid").value);
							if(document.getElementById("serviceCategoryid").value != -1){
								populateServiceType(document.getElementById("serviceCategoryid").value);
								jQuery('#serviceTable option').each(function() {
								    if(jQuery(this).val() == "<!-- TODO: Manual migration required for custom Struts tag -->") {
								    	jQuery(this).prop("selected", true);
								    }
								});
							}
							</script>
						
					</tr>
				</table>
				<div align="left" class="mandatorycoll">
					&nbsp;&nbsp;&nbsp;
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>
				<br />
			</div>
			<div class="buttonbottom">
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
				<!-- TODO: Manual migration required for custom Struts tag -->
				<input type="button" class="button" value="Reset" id="resetbutton" name="clear" onclick="resetValues();">
				<input name="close" type="button" class="button" id="button" onclick="window.close()" value="Close" />
			</div>
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<div>
				<c:if
					test="%{null != mappings && mappings.size() >0}">
					<div align="center">
						<table width="100%" border="1">
							<tr>
								<th class="bluebgheadtd" style="text-align: left;"><!-- TODO: Manual migration required for custom Struts tag --></th>
								<th class="bluebgheadtd" style="text-align: left;"><!-- TODO: Manual migration required for custom Struts tag --></th>
								<th class="bluebgheadtd" style="text-align: left;"><!-- TODO: Manual migration required for custom Struts tag --></th>
							</tr>
							<c:forEach var="p" value="%{mappings}" status="s">
								<tr>
									<td class="bluebox"><div align="left"> ${businessDetailsName} </div></td>
									<td class="bluebox"><div align="left"> ${bank} </div></td>
									<td class="bluebox"><div align="left"> ${bankAccount} </div></td>
								</tr>
							</c:forEach>
						</table>
						<input type="button" id="Close" value="Close" onclick="javascript:window.close()" class="buttonsubmit" />
					</div>
				</c:if>
				<c:otherwise>
					<c:if test="target=='searchresult'">
					<table width="90%" border="0" align="center" cellpadding="0"
						cellspacing="0" class="tablebottom">
						<tr>
							<div>&nbsp;</div>
							<div class="subheadnew">
								<!-- TODO: Manual migration required for custom Struts tag -->
							</div>
						</tr>
					</table>
					</c:if>
				</s:else>
			</div>
		</s:push>
	</form:form>
</body>
</html>
