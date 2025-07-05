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


<%@ page language="java"%>
<%@ include file="/includes/taglibs.jsp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<link href="<egov:url path='/resources/css/displaytagFormatted.css?rnd=${app_release_no}'/>"
	rel="stylesheet" type="text/css" />
<html>
<head>

<title><!-- TODO: Manual migration required for custom Struts tag --></title>

</head>
<body onload="activeModeOfPayment()">
	<form:form action="voucherStatusReport" name="voucherStatusReport"
		theme="simple">

		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</span>

		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>

			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<jsp:include page="../voucher/voucher-filter.jsp" />
				</tr>
				<br />
				<br />
				<tr>
					<td style="width: 5%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="type" id="type"
							list="dropdownData.typeList" headerKey="-1"
							headerValue="%{getText('lbl.choose.options')}"
							onchange="loadVoucherNames(this.value);activeModeOfPayment()" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="name" id="name"
							list="%{nameMap}" headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>

				</tr>

				<tr id="modeofpayment">
					<td style="width: 5%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox"><form:select path="modeOfPayment"
							id="modeOfPayment" list="dropdownData.modeOfPaymentList"
							headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
					<td class="bluebox"></td>
					<td class="bluebox"></td>
				</tr>
				<tr>
					<td style="width: 5%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1">*</span></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="greybox"><form:input path="fromDate" id="fromDate"
							maxlength="20"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							value="%{tempFromDate}" autocomplete="off"/><a
						href="javascript:show_calendar('forms[0].fromDate');"
						style="text-decoration: none">&nbsp;<img
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1">*</span></td>
					 <!-- TODO: Manual migration required for custom Struts tag -->  
					<td class="greybox"><form:input path="toDate" id="toDate"
							maxlength="20"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							value="%{tempToDate}" autocomplete="off"/><a
						href="javascript:show_calendar('forms[0].toDate');"
						style="text-decoration: none">&nbsp;<img
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)</td>
				</tr>
				<tr>
					<td style="width: 5%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="status" id="status"
							list="%{statusMap}" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							value="%{status}" /></td>
					<td class="greybox"></td>
					<td class="greybox"></td>
				</tr>
			</table>
			<div class="buttonbottom">
				<s:submit method="search" key="lbl.search" cssClass="buttonsubmit"
					onclick="return validateSearch();" />
				<s:submit method="beforeSearch" key="lbl.reset" cssClass="button"
					onclick="return resetAndSubmit();" />
				<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
					onclick="javascript:window.parent.postMessage('close','*');" class="button" />

			</div>


			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<c:if test="%{pagedResults!=null}">
					<tr>
						<td width="100%"><display:table name="pagedResults"
								uid="currentRowObject" cellpadding="0" cellspacing="0"
								requestURI="" class="its"
								style=" border-left: 1px solid #C5C5C5; border-top: 1px solid #C5C5C5;border-right: 1px solid #C5C5C5;border-bottom: 1px solid #C5C5C5;">
								<display:column title=" Sl No" style="text-align:center;">
									<s:property
										value="%{#attr.currentRowObject_rowNum+ (page-1)*pageSize}" />
								</display:column>
								<display:column title="Department Name"
									style="text-align:center;">
									${%{#attr.currentRowObject.deptName}}
								</display:column>
								<display:column title="Voucher Number"
									style="text-align:center;">

									<a href="#"
										onclick="openVoucher('<!-- TODO: Manual migration required for custom Struts tag -->');"><s:property
											value="%{#attr.currentRowObject.vouchernumber}" />
								</display:column>

								<display:column title="Voucher Type" style="text-align:center;">
									${%{#attr.currentRowObject.type}}
								</display:column>
								<display:column title="Voucher Name" style="text-align:center;">
									${%{#attr.currentRowObject.name}}
								</display:column>
								<display:column title="Voucher Date" style="text-align:center;">
									<s:date name="%{#attr.currentRowObject.voucherdate}"
										format="dd/MM/yyyy" />
								</display:column>
								<display:column title="Bank Account" style="text-align:center;">
									${%{#attr.currentRowObject.accountNumber}}
								</display:column>	
								<display:column title="Source" style="text-align:center;">
									${%{#attr.currentRowObject.source}}
								</display:column>
								<display:column title="Total Amount" style="text-align:right;">
									${%{#attr.currentRowObject.amount}}
								</display:column>
								<display:column title="Owner" style="text-align:center;">
									${%{#attr.currentRowObject.owner}}
								</display:column>
								<display:column title="Status" style="text-align:center;">
									${%{#attr.currentRowObject.status}}
								</display:column>

							</display:table></td>
					<tr>
						<td><c:if test="%{#attr.currentRowObject.size!=0}">
								<div id="exportButton" class="buttonbottom">
									<input type="button" method="generatePdf" value="Save As Pdf"
										Class="buttonsubmit" id="generatePdf"
										onclick="return generatePdfsubmit();" />
									<input type="button" method="generateXls" value="Save As Xls"
										Class="buttonsubmit" id="generateXls"
										onclick="return generateXlsSubmit();" />
								</div>
							</c:if></td>
					</tr>

				</c:if>
			</table>



			<script>

	
		function loadVoucherNames(selected)
		{
			var s="";  
			if(selected==-1)
				{
				document.getElementById('name').options.length=0;
				document.getElementById('name').options[0]= new Option('--------Choose--------','0');
				}
		<c:forEach value="voucherTypes" var="obj">
		  s='${#obj}';
		 if(selected==s)
		 {
		document.getElementById('name').options.length=0;
		document.getElementById('name').options[0]= new Option('--------Choose--------','0');
		
		 <c:forEach value="voucherNames[#obj]" status="stat" var="names">
		 document.getElementById('name').options[${#stat.index+1}]= new Option('${#names}','${#names}');
		 </c:forEach>   
		 }
		 </c:forEach>
			  
			
		}
		function activeModeOfPayment()
		{
			var selected = document.getElementById('type').value;
		if(selected=="Payment")
			{
			document.getElementById('modeofpayment').style.display = "";
			}
		else{
			document.getElementById('modeofpayment').style.display = "none";
			}
		}
		
		function validateSearch()
		{
			var startDate=document.getElementById('fromDate').value;
			var endDate=document.getElementById('toDate').value;
			var fromdate= startDate.split('/');
			startDate=new Date(fromdate[2],fromdate[1]-1,fromdate[0]);
		    var todate = endDate.split('/');
		    endDate=new Date(todate[2],todate[1]-1,todate[0]);
		    if(startDate > endDate)
			{ 
				bootbox.alert("Start date should be less than end date.")
				return false;
				} 
			
 			document.forms[0].action='/services/EGF/report/voucherStatusReport-search.action';
 			jQuery(document.forms[0]).append(jQuery('<input>', {
 		        type : 'hidden',
 		        name : '${_csrf.parameterName}',
 		        value : '${_csrf.token}'
 		    }));
			document.forms[0].submit();
			return true;
		}

		function resetAndSubmit()
		{

			document.forms[0].action='${pageContext.request.contextPath}/report/voucherStatusReport-beforeSearch.action';
			jQuery(document.forms[0]).append(jQuery('<input>', {
		        type : 'hidden',
		        name : '${_csrf.parameterName}',
		        value : '${_csrf.token}'
		    }));
			document.forms[0].submit();
		}
		function generatePdfsubmit()
		{
			document.forms[0].action='${pageContext.request.contextPath}/report/voucherStatusReport-generatePdf.action';
			jQuery(document.forms[0]).append(jQuery('<input>', {
		        type : 'hidden',
		        name : '${_csrf.parameterName}',
		        value : '${_csrf.token}'
		    }));
			document.forms[0].submit();
		}
		function generateXlsSubmit()
		{
			document.forms[0].action='${pageContext.request.contextPath}/report/voucherStatusReport-generateXls.action';
			jQuery(document.forms[0]).append(jQuery('<input>', {
		        type : 'hidden',
		        name : '${_csrf.parameterName}',
		        value : '${_csrf.token}'
		    }));
			document.forms[0].submit();
		}

		function openVoucher(vid){
			var url = "${pageContext.request.contextPath}/voucher/preApprovedVoucher-loadvoucherview.action?vhid="+ vid;
			window.open(url,'','width=900, height=700');
		}
		</script>
		</div>
	</form:form>

</body>
</html>
