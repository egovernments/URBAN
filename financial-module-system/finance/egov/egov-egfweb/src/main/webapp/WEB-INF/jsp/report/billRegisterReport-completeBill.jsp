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


<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>
<%@ page language="java"%>


<%@taglib uri="http://displaytag.sf.net" prefix="display"%>
<%@ include file="/includes/taglibs.jsp"%>
<link href="<egov:url path='/resources/css/displaytagFormatted.css?rnd=${app_release_no}'/>"
	rel="stylesheet" type="text/css" />
<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>

</head>
<body>
	<form:form action="billRegisterReport" name="billRegisterReport"
		theme="simple" method="post" onsubmit="javascript:doAfterSubmit()">
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<font style='color: red; font-weight: bold'>
			<p class="error-block" id="lblError"></p>
		</font>
		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
		
		<table align="center" width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<jsp:include page="../voucher/voucher-filter.jsp" />

			</tr>

			<tr>
			<td style="width: 5%"></td>
				<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td class="greybox"><s:date name="fromDate" var="fromDateId"
						format="dd/MM/yyyy" /> <form:input path="fromDate" id="fromDate"
						value="%{fromDateId}" maxlength="10"
						onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
					href="javascript:show_calendar('billRegisterReport.fromDate',null,null,'DD/MM/YYYY');"
					style="text-decoration: none">&nbsp;<img
						src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)
				</td>
				<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td class="greybox"><s:date name="toDate" var="toDateId"
						format="dd/MM/yyyy" /> <form:input path="toDate" id="toDate"
						value="%{toDateId}" maxlength="10"
						onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
					href="javascript:show_calendar('billRegisterReport.toDate',null,null,'DD/MM/YYYY');"
					style="text-decoration: none">&nbsp;<img
						src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)</td>
			</tr>
			<tr>
			<td style="width: 5%"></td>
				<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td class="bluebox"><form:select path="exptype" id="exptype"
						list="dropdownData.expenditureList" headerKey=""
						headerValue="%{getText('lbl.choose.options')}" /></td>
				<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td class="bluebox"><form:select path="billType" id="billType"
						list="dropdownData.billTypeList" headerKey=""
						headerValue="%{getText('lbl.choose.options')}" /></td>
			</tr>
			<tr>
			<td style="width: 5%"></td>
				<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td class="greybox"><form:input path="voucherNumber"
						id="voucherNumber" maxlength="30" value="%{voucherNumber}" /></td>

				<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td class="greybox"><form:input path="billNumber"
						id="billNumber" maxlength="30" value="%{billNumber}" /></td>
			</tr>

		</table>
		</div>
		
		<div class="buttonbottom">
			<s:submit method="billSearch" key="lbl.search" cssClass="buttonsubmit"
				onclick="return validate();" />
			<!-- TODO: Manual migration required for custom Struts tag -->
			<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
				onclick="javascript:window.parent.postMessage('close','*');" class="button" />

		</div>
		<br>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">

			<c:if test="%{searchResult.fullListSize != 0}">
				<tr align="right">
					<td colspan="8">
						<div align="right" style="text-align: right">
							<strong><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;&nbsp;&nbsp;</strong>
						</div>
					</td>
				</tr>
				<tr align="center">
					<td><display:table name="searchResult" export="true"
							id="searchResultid" uid="currentRowObject" cellpadding="0"
							cellspacing="0" requestURI="" sort="external" class="its"
							style="border:1px;width:100%;empty-cells:show;border-collapse:collapse;">

							<display:column title="Sl.No" style="width:4%;text-align:center">
								<s:property
									value="%{#attr.currentRowObject_rowNum+ (page-1)*pageSize}" />
							</display:column>

							<display:column title="Bill Number"
								style="width:10%;text-align:center" property="billNumber" />
							<display:column title="Bill Date"
								style="width:8%;text-align:center" property="billDate"
								sortProperty="billdate" sortable="true" />
							<display:column title="Voucher number"
								style="width:11%;text-align:center" property="voucherNumber" />
							<display:column title="Party Name"
								style="width:5%;text-align:center" property="partyName" />
							<display:column title="  Gross Amount"
								style="width:7%;text-align:right" property="grossAmount" />
							<display:column title="   Deduction"
								style="width:7%;text-align:right" property="deductionAmount" />
							<display:column title="Net Amount"
								style="width:7%;text-align:right" property="netAmount" />
							<display:column title="Paid Amount"
								style="width:7%;text-align:right" property="paidAmount" />
							<display:column title="Payment voucher number "
								style="width:11%;text-align:center"
								property="paymentVoucherNumber" />
							<display:column title="Cheque No and Date"
								style="width:11%;text-align:center" property="chequeNumAndDate" />
						  <%--  <display:column title="Remittance Payment voucher number"
								style="width:11%;text-align:center" 	
								property="remittanceVoucherNumber" />
						 	<display:column title="Remittance Cheque No and Date"
								style="width:11%;text-align:center"
								property="remittanceChequeNumberAndDate" /> --%>
							<display:column title="Status"
								style="width:10%;text-align:center" property="status" />
							<display:caption media="pdf">
						  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${%{titleName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Complete Bill Register Report  
						   
						   
				   </display:caption>
							<display:caption media="excel">
						   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Complete Bill Register Report  
						   
						   
				   </display:caption>

							<display:setProperty name="export.pdf" value="true" />
							<display:setProperty name="export.pdf.filename"
								value="BillRegister-Report.pdf" />
							<display:setProperty name="export.excel" value="true" />
							<display:setProperty name="export.excel.filename"
								value="BillRegister-Report.xls" />
							<display:setProperty name="export.csv" value="false" />
							<display:setProperty name="export.xml" value="false" />
						</display:table></td>
				</tr>

			</c:if>
			<!-- TODO: Manual migration required for custom Struts tag -->
				<tr>
					<td colspan="7" align="center"><font color="red">No
							record Found.</font></td>

				</tr>
			</s:elseif>
		</table>

	</form:form>

	<script>

		function validate(){
	
		 <c:if test="%{isFieldMandatory('fund')}"> 
				 if(null != document.getElementById('fundId') && document.getElementById('fundId').value == -1){

					document.getElementById('lblError').innerHTML = "Please Select a fund";
					return false;
				 }
			 </c:if>
			<c:if test="%{isFieldMandatory('department')}"> 
				 if(null!= document.getElementById('vouchermis.departmentid') && document.getElementById('vouchermis.departmentid').value == -1){

					document.getElementById('lblError').innerHTML = "Please select a department";
					return false;
				 }
			</c:if>
			<c:if test="%{isFieldMandatory('scheme')}"> 
				 if(null!=document.getElementById('schemeid') &&  document.getElementById('schemeid').value == -1){

					document.getElementById('lblError').innerHTML = "Please select a scheme";
					return false;
				 }
			</c:if>
			<c:if test="%{isFieldMandatory('subscheme')}"> 
				 if(null!= document.getElementById('subschemeid') && document.getElementById('subschemeid').value == -1){

					document.getElementById('lblError').innerHTML = "Please select a subscheme";
					return false;
				 }
			</c:if>
			<c:if test="%{isFieldMandatory('functionary')}"> 
				 if(null!=document.getElementById('vouchermis.functionary') &&  document.getElementById('vouchermis.functionary').value == -1){

					document.getElementById('lblError').innerHTML = "Please select a functionary";
					return false;
				 }
			</c:if>
			<c:if test="%{isFieldMandatory('fundsource')}"> 
				 if(null !=document.getElementById('fundsourceId') &&  document.getElementById('fundsourceId').value == -1){

					document.getElementById('lblError').innerHTML = "Please select a fundsource";
					return false;
				}
			</c:if>
			<c:if test="%{isFieldMandatory('field')}"> 
				 if(null!= document.getElementById('vouchermis.divisionid') && document.getElementById('vouchermis.divisionid').value == -1){

					document.getElementById('lblError').innerHTML = "Please select a field";
					return false;
				 }
			</c:if>
		

			document.forms[0].action='${pageContext.request.contextPath}/report/billRegisterReport-billSearch.action';
			jQuery(document.forms[0]).append(jQuery('<input>', {
		        type : 'hidden',
		        name : '${_csrf.parameterName}',
		        value : '${_csrf.token}'
		    }));
			document.forms[0].submit();	
			return  true;
}

		function resetAndSubmit()
		{

			document.forms[0].action='${pageContext.request.contextPath}/report/billRegisterReport-searchform.action';
			jQuery(document.forms[0]).append(jQuery('<input>', {
		        type : 'hidden',
		        name : '${_csrf.parameterName}',
		        value : '${_csrf.token}'
		    }));
			document.forms[0].submit();	
		

		}

	</script>
</body>
</html>
