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
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>
<%@ page language="java"%>
<%@ taglib uri="/WEB-INF/tags/c.tld" prefix="c"%>
<%@ taglib uri="/WEB-INF/tags/cdn.tld" prefix="cdn" %>


<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --> </title>
</head>
<SCRIPT LANGUAGE="javascript"
	SRC="../resources/javascript/jsCommonMethods.js?rnd=${app_release_no}"></Script>
<script type="text/javascript">
function validate()
{
	var fundValue=document.getElementById("fund.id").value;
	var strtDate=document.getElementById('fromDate').value;
	var endDate=document.getElementById('toDate').value;
	if(fundValue!=null && fundValue!=-1)
	{	
		if(strtDate.length !=0 && endDate.length !=0)
		{
			if( compareDate(formatDateToDDMMYYYY1(strtDate),formatDateToDDMMYYYY1(endDate)) == -1 )
			{
				bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
				return false;
		    }
		 }
		
	}
	else
	{
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
		return false;
	}
	
	document.billForm.action='/services/EGF/voucher/cancelBill-search.action';
	jQuery(billForm).append(jQuery('<input>', {
        type : 'hidden',
        name : '${_csrf.parameterName}',
        value : '${_csrf.token}'
    }));
	document.billForm.submit();
	return true;
}
function update(obj)
{
	if(obj.checked)
		document.getElementById('selectedRows').value=parseInt(document.getElementById('selectedRows').value)+1;
	else
		document.getElementById('selectedRows').value=parseInt(document.getElementById('selectedRows').value)-1;
}
function resetSelectedRows()
{   
	var todate=document.getElementById('toDate').value
	//todate.mask('99/99/9999',{placeholder:"mm/dd/yyyy"});
	/* jQuery('fromDate').inputmask('99/99/9999',{placeholder:"mm/dd/yyyy"}); */
	document.getElementById('selectedRows').value="0";
}


function validateCancel()
{
	var rows=parseInt(document.getElementById('selectedRows').value);
	console.log("rows : ",rows);
	console.log("rows : ",rows == 0 || rows == "");
	if(rows == 0 || rows == "")
	{
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
		return false;
	}
	document.billForm.action='/services/EGF/voucher/cancelBill-cancelBill.action';
	jQuery(billForm).append(jQuery('<input>', {
        type : 'hidden',
        name : '${_csrf.parameterName}',
        value : '${_csrf.token}'
    }));
	document.billForm.submit();
	return true;
}
</script>
<body onload="resetSelectedRows()">
	<form:form name="billForm" action="cancelBill" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Bill Cancellation" />
		</jsp:include>
		<span id="errorSpan"> 
		<div style="color: red;"><!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --></div>
		 <div style="color: green;"><!-- TODO: Manual migration required for custom Struts tag --></div>
		</span>
		<div class="formmainbox">
			<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
				<td class="bluebox" width="10%" ></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox"><form:input path="billNumber" id="billNumber" value="%{billNumber}" /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory1">*</span></td>
					<td class="bluebox"><form:select path="fund.id" id="fund.id" list="dropdownData.fundList" listKey="id" listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}" value="%{fund.id}" /></td>
				</tr>
				</br>
				<tr>
				<td class="bluebox" ></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>

					<td class="bluebox"><s:date name="fromDate" var="fromDate"
							format="dd/MM/yyyy" /> <form:input id="fromDate"
							name="fromDate" value="%{fromDate}"
							 placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'"
							 /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>


					<td class="bluebox"><s:date name="toDate" var="toDate"
							format="dd/MM/yyyy" /> <form:input id="toDate" path="toDate"
							value="%{toDate}"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>
				</tr>
				<tr>
				<td class="bluebox" ></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="deptImpl.code"
							id="deptImpl.code" list="dropdownData.DepartmentList" listKey="code"
							listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							value="%{deptImpl.code}" /></td>
					
				
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag -->
					</td>
					
					<td class="greybox"><form:select path="expType" id="expType"
							list="dropdownData.expenditureList"
							value="%{expType}" headerKey="" headerValue="%{getText('lbl.choose.options')}" /></td>
					
				</tr>
			</table>
			<div class="buttonbottom">
				<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->" id="searchBtn" onclick="return validate()" class="buttonsubmit" />
				<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->" onclick="javascript:window.parent.postMessage('close','*');" class="button" />
			</div>
		</div>
		<c:if test="%{billListDisplay.size()!=0}">
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				</tr>
				<c:set var="trclass" value="greybox" />

				<c:forEach var="p" value="billListDisplay" status="s">
					<tr>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							${#s.index+1}
							<s:hidden id="id" name="billListDisplay[%{#s.index}].id"
								value="%{id}" />
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							<s:hidden id="billNumber"
								name="billListDisplay[%{#s.index}].billNumber"
								value="%{billNumber}" />
							${%{billNumber}}
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							<s:hidden id="billDeptName"
								name="billListDisplay[%{#s.index}].billDeptName"
								value="%{billDeptName}" />
							${%{billDeptName}}
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							<s:hidden id="billDate"
								name="billListDisplay[%{#s.index}].billDate" value="%{billDate}" />
							${%{billDate}}
						</td>
						<td style="text-align: right" class="<c:out value="${trclass}"/>">
							<s:hidden id="billAmount"
								name="billListDisplay[%{#s.index}].billAmount"
								value="%{billAmount}" />
							${%{billAmount}}
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							<form:checkbox path="billListDisplay[%{#s.index}].isSelected"
								id="isSelected%{#s.index}" onclick="update(this);" />
						</td>
						<c:choose>
							<c:when test="${trclass=='greybox'}">
								<c:set var="trclass" value="bluebox" />
							</c:when>
							<c:when test="${trclass=='bluebox'}">
								<c:set var="trclass" value="greybox" />
							</c:when>
						</c:choose>
					</tr>
				</c:forEach>
			</table>
			<div class="buttonbottom">
				<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->" id="cancelBill"
					onclick="return validateCancel();" class="buttonsubmit" />
			</div>
		</c:if>
		<!-- TODO: Manual migration required for custom Struts tag -->
			<tr>
				<td colspan="7" align="center"><font color="red"><!-- TODO: Manual migration required for custom Struts tag --></font></td>
			</tr>
		</s:elseif>
		<input type="hidden" id="selectedRows" name="selectedRows" />
	</form:form>
</body>
</html>
