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
<link href="<egov:url path='/resources/css/displaytagFormatted.css?rnd=${app_release_no}'/>"
	rel="stylesheet" type="text/css" />

<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<base target="_self" />
<script type="text/javascript">
	function disableTypeForEditMode()
	{
		var showMode='${showMode}';
		if(showMode=='edit' )
			{ 
			document.getElementById("type").disabled=true;
			}
		if(document.getElementById('type').value!=-1)
		{
		loadVoucherNames(document.getElementById('type').value);
		}
		if(document.getElementById('voucherNumber')!=null && document.getElementById('voucherNumber').value!="")
		{
			changeField();
		}
	}
	</script>
</head>
<body onload="disableTypeForEditMode()">
	<form:form action="voucherSearch" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Voucher Search" />
		</jsp:include>
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<c:if test="%{showMode=='nonbillPayment'}">
				<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
			</c:if>
			<c:otherwise>
				<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
			</s:else>
			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td style="width: 5%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:input path="voucherNumber"
							id="voucherNumber" maxlength="25" value="%{voucherNumber}"  onblur="changeField();" /></td>
					<td class="greybox"></td>
					<td class="greybox"></td>
				</tr>
				<tr>
					<td style="width: 5%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox"><form:select path="type" id="type"
							list="dropdownData.typeList" headerKey="-1"
							headerValue="%{getText('lbl.choose.options')}"
							onchange="loadVoucherNames(this.value)" /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox"><form:select path="name" id="name"
							list="%{nameList}" headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
				</tr>
				<tr>
					<td style="width: 5%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1" id="disableFromDateCheck">*</span></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="greybox">
							<form:input id="fromDate" path="fromDate"
							value="%{tempFromDate}"  data-date-end-date="0d" 
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" autocomplete="off"/>
							</td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1" id="disableToDateCheck">*</span></td>
					<td class="greybox">
							<form:input id="toDate" path="toDate"
							value="%{tempToDate}"  data-date-end-date="0d" 
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" autocomplete="off"/>
							
							</td>
				</tr>
				<tr>
					<jsp:include page="../voucher/voucher-filter.jsp" />
				</tr>
				<!-- tr>
					<td style="width: 5%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select path="moduleId" id="moduleId"
							list="sourceMap" headerKey="-1" headerValue="----Choose----" /></td>
				</tr>  -->
				<!-- TODO: Manual migration required for custom Struts tag -->
			</table>
			<br />
			<div class="subheadsmallnew"></div>
			<div align="left" class="mandatory1"><!-- TODO: Manual migration required for custom Struts tag --> </div>
		</div>
	
		<div align="center" class="buttonbottom">
			<s:submit key="lbl.search" onclick="return validateAndSubmit()"
				cssClass="buttonsubmit" />
			<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
				onclick="javascript:window.parent.postMessage('close','*');" class="button" />
		</div>
		<br />
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<c:if test="%{pagedResults!=null}">
				<tr>
					<td width="100%"><display:table name="pagedResults"	uid="currentRowObject" cellpadding="0" cellspacing="0"
							requestURI="" class="its" style=" border-left: 1px solid #C5C5C5; border-top: 1px solid #C5C5C5;border-right: 1px solid #C5C5C5;border-bottom: 1px solid #C5C5C5;">
							<display:column title=" Sl No" style="text-align:center;">
								${%{#attr.currentRowObject_rowNum+ (page-1)*pageSize}}
							</display:column>
							<display:column title="Voucher Number" style="text-align:center;">
								<a href="#"	onclick="openVoucher('<!-- TODO: Manual migration required for custom Struts tag -->','${%{#attr.currentRowObject.vouchernumber}}','<!-- TODO: Manual migration required for custom Struts tag -->');"><s:property
										value="%{#attr.currentRowObject.vouchernumber}" />
							</display:column>

							</a>

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
							<display:column title="Fund Name" style="text-align:center;">
								${%{#attr.currentRowObject.fundname}}
							</display:column>
							<display:column title="Department Name"
								style="text-align:center;">
								${%{#attr.currentRowObject.deptName}}
							</display:column>
							<display:column title="Total Amount" style="text-align:right;">
								${%{#attr.currentRowObject.amount}}
							</display:column>
							<display:column title="Status" style="text-align:center;">
								${%{#attr.currentRowObject.status}}
							</display:column>

						</display:table></td>
				<tr>

				</tr>
			</c:if>
			<!-- TODO: Manual migration required for custom Struts tag -->
				<div id="listid" style="display: none">
					<table width="100%" border="0" align="center" cellpadding="0"
						cellspacing="0" class="tablebottom">
						<tr>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag -->Type</th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<!-- <th class="bluebgheadtd">Source</th> -->
						</tr>
						<c:set var="trclass" value="greybox" />

						<c:forEach var="p" value="voucherList" status="s">
							<tr>
								<td class="<c:out value="${trclass}"/>"><s:property
										value="#s.index+1" /></td>
								<td align="left" class="<c:out value="${trclass}"/>"><a
									href="#"
									onclick="openVoucher(<!-- TODO: Manual migration required for custom Struts tag -->,'<!-- TODO: Manual migration required for custom Struts tag -->','${%{vouchernumber}} ' ,'<!-- TODO: Manual migration required for custom Struts tag -->');"><s:property
											value="%{vouchernumber}" /> </a></td>
								<td align="left" class="<c:out value="${trclass}"/>"><s:property
										value="%{type}" /></td>
								<td align="left" class="<c:out value="${trclass}"/>"><s:property
										value="%{name}" /></td>
								<td class="<c:out value="${trclass}"/>"><s:date
										name="%{voucherdate}" format="dd/MM/yyyy" /></td>
								<td align="left" class="<c:out value="${trclass}"/>"><s:property
										value="%{fundname}" /></td>
								<td align="left" class="<c:out value="${trclass}"/>"><s:property
										value="%{deptName}" /></td>
								<td style="text-align: right"
									class="<c:out value="${trclass}"/>"><s:text
										name="format.number">
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
								<td class="<c:out value="${trclass}"/>"><s:text
										name="%{status}" /></td>
								<!-- <td class="<c:out value="${trclass}"/>"><s:text
										name="%{source}" /></td> -->
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
						<!-- TODO: Manual migration required for custom Struts tag -->
					</table>
				</div>
			</s:elseif>
		</table>
		<br />
		<br />
		<br />
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>

	<script>
		
		function loadVoucherNames(selected)
		{
			var s="";  
			if(selected==-1)
				{
				document.getElementById('name').options.length=0;
				document.getElementById('name').options[0]= new Option('<!-- TODO: Manual migration required for custom Struts tag -->','0');
				}
		<c:forEach value="voucherTypes" var="obj">
		  s='${#obj}';
		 if(selected==s)
		 {
		document.getElementById('name').options.length=0;
		document.getElementById('name').options[0]= new Option('<!-- TODO: Manual migration required for custom Struts tag -->','0');

		 <c:forEach value="voucherNames[#obj]" status="stat" var="names">
		 document.getElementById('name').options[${#stat.index+1}]= new Option('${#names}','${#names}');
		 </c:forEach>   
		 }
		 </c:forEach>
		 document.getElementById('name').value='${name}' ;   
			
		}
		function openVoucher(vid,url,voucherNumber,voucherDate){
		
		var showMode = document.getElementById('showMode').value ;
		
		if(showMode=='nonbillPayment')
		{
		url="../payment/directBankPayment-nonBillPayment.action?showMode="+showMode+"&voucherHeader.id="+vid;
		window.open(url,'Search','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
		}
		else if(showMode == 'sourceLink' ){
			window.returnValue = voucherNumber+"$"+voucherDate+"$"+vid;
	        window.close();
	        return;
		}
		else if(showMode == '' ){
			var url = "${pageContext.request.contextPath}/voucher/preApprovedVoucher-loadvoucherview.action?vhid="+ vid;
		}
		else{

			var url =  url+'='+ vid+'&showMode='+showMode;
		}
			window.open(url,'','width=900, height=700');
			// var form = document.createElement("voucherform");
			// form.setAttribute("method", "post");
			 //form.setAttribute("action", url, '');
			 //form.setAttribute("target", "NewFile");
			// document.body.appendChild(form);
			 //window.open("post.htm", "NewFile", 'width=800, height=600');
			 //form.submit();
			 //document.body.removeChild(form);
		}
		function validateAndSubmit(){
			if(document.getElementById('voucherNumber')!=null && document.getElementById('voucherNumber').value!="")
				{
				document.voucherSearch.action='${pageContext.request.contextPath}/voucher/voucherSearch-search.action';
				jQuery(voucherSearch).append(jQuery('<input>', {
		            type : 'hidden',
		            name : '${_csrf.parameterName}',
		            value : '${_csrf.token}'
		        }));
	    		document.voucherSearch.submit();
	    		return true;
				}
			else{
			if(!validate()){
				return false;
			}
			else
				{
				document.voucherSearch.action='${pageContext.request.contextPath}/voucher/voucherSearch-search.action';
				jQuery(voucherSearch).append(jQuery('<input>', {
		            type : 'hidden',
		            name : '${_csrf.parameterName}',
		            value : '${_csrf.token}'
		        }));
	    		document.voucherSearch.submit();
				return true;
				}
			}
		}
		
		function validate()
		{
			var fromDate=document.getElementById('fromDate').value;
			var toDate=document.getElementById('toDate').value;
			var fundId=document.getElementById('fundId').value;
			var voucherNumber=document.getElementById('voucherNumber').value;
			console.log('fromDate : ',fromDate);
			if(!DateValidation(fromDate,toDate))
				return false;
			if(fromDate == "" && voucherNumber!=""){
				bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
				return false;
				}
			
			if(toDate == "" && voucherNumber==""){
				bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
				return false;
				}

			if(fundId == "-1" && voucherNumber==""){
				bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
				return false;
				}
			
			if(!DateValidation(fromDate,toDate))
				return false;
			
		document.getElementById('type').disabled=false;
		return true;
		}
		
			
		var showMode = document.getElementById('showMode').value ;
		if(showMode=='nonbillPayment')
		{
			if(document.getElementById('type'))
			{
			document.getElementById('type').disabled=true;
			}
			document.title="<!-- TODO: Manual migration required for custom Struts tag -->";
		}
		
		function changeField()
		{
			if(document.getElementById('voucherNumber')!=null && document.getElementById('voucherNumber').value!="")
				{
			document.getElementById("disableFromDateCheck").innerHTML="";
			document.getElementById("disableToDateCheck").innerHTML="";
			document.getElementById("disableFundCheck").innerHTML="";
				}
			else
				{
				document.getElementById("disableFromDateCheck").innerHTML="*";
				document.getElementById("disableToDateCheck").innerHTML="*";
				document.getElementById("disableFundCheck").innerHTML="*";
				}
			
		}
		</script>
</body>
</html>