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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>

</head>

<body onload="bodyOnLoad();">
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>

		<br />
		<br />

		<form:form name="receiptPaymentReportForm" action="receiptPaymentReport"
			theme="simple">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td class="bluebox" width="15%"></td>
					<td class="bluebox" width="15%"><s:text
							name="report.financialYear.report" /><span class="mandatory">*</span>
					</td>
					<td class="bluebox"><form:select
							list="dropdownData.financialYearList" listKey="id"
							listValue="finYearRange" name="financialYear.id" headerKey="0"
							headerValue="--- Select ---" value="%{model.financialYear.id}"
							id="financialYear"></form:select></td>
					<td class="bluebox" width="15%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="bluebox" width="15%"><form:select path="period"
							id="period" onchange="checkSelected(this)"
							list="#{'Yearly':'Yearly','Date Range':'Date Range'}"
							headerKey="0" headerValue="--- Select ---"
							value="%{model.period}" /></td>
				</tr>

				<tr>
					<td class="greybox" width="15%"></td>
					<td class="greybox" width="15%"><!-- TODO: Manual migration required for custom Struts tag -->
					</td>
					<td class="greybox"><form:select list="dropdownData.fundList"
							listKey="id" listValue="name" name="fund.id" headerKey="0"
							headerValue="--- Select ---" value="%{model.fund.id}" id="fund"></form:select></td>
					<td class="greybox" width="15%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="greybox" width="15%"><form:select path="currency"
							id="currency"
							list="#{'Rupees':'Rupees','Thousands':'Thousands','Lakhs':'Lakhs'}"
							headerKey="0" headerValue="--- Select ---"
							value="%{model.currency}" /></td>
				</tr>

				<tr id="dateran">
					<td class="greybox" width="15%">&nbsp;</td>
					<td class="greybox" width="10%">From Date:<span
						class="mandatory">*</span></td>
					<td class="greybox"><form:input path="fromDate" id="fromDate"
							cssStyle="width:100px" value='%{model.fromDate}'
							onkeyup="DateFormat(this,this.value,event,false,'3')" /><a
						href="javascript:show_calendar('receiptPaymentReportForm.fromDate');"
						style="text-decoration: none">&nbsp;<img
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)<br />
					</td>

					<td class="greybox" width="10%">To Date:<span
						class="mandatory">*</span></td>
					<td class="greybox"><form:input path="toDate" id="toDate"
							cssStyle="width:100px" value='%{model.toDate}'
							onkeyup="DateFormat(this,this.value,event,false,'3')" /><a
						href="javascript:show_calendar('receiptPaymentReportForm.toDate');"
						style="text-decoration: none">&nbsp;<img
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)<br />
					</td>
				</tr>

			</table>

			<br />
			<br />

			<div class="buttonbottom">
				<s:submit method="search" value="Search" cssClass="buttonsubmit"
					onclick="return validate();" />
				<s:submit method="exportReceiptPaymentPdf" value="EXPORT PDF"
					cssClass="buttonsubmit" onclick="return validate();" />
				<s:submit method="exportReceiptPaymentXls" value="EXPORT XLS"
					cssClass="buttonsubmit" onclick="return validate();" />
				<input type="button" value="Close"
					onclick="javascript: self.close()" Class="button" />
			</div>
			<c:if test="%{model.entries.size!=0}">
				<!-- <div align="center" class="extracontent"><h4>${fundType}  ${budgetType}</h4></div> 
		<div align="right" class="extracontent"><b>Amount in Thousands</b></div> -->
				<table width="100%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="tablebottom">
					<tr>
						<td colspan="12">
							<div class="subheadsmallnew">
								<strong>${header}</strong>
							</div>
						</td>
					</tr>
					<tr>
						<td class="bluebox" colspan="4"><strong><s:text
									name="report.run.date" />:<s:date name="todayDate"
									format="dd/MM/yyyy" /></strong></td>
						<td colspan="11">
							<div class="blueborderfortd" align="right">
								<strong> <!-- TODO: Manual migration required for custom Struts tag --> <s:property
										value="model.currency" />&nbsp;&nbsp;&nbsp;&nbsp;
								</strong>
							</div>
						</td>
					</tr>
					<tr>

						<th class="bluebgheadtd" style="width: 6%; text-align: center"
							align="center"></th>
						<th class="bluebgheadtd" style="width: 42%; text-align: center"
							align="center">Head Of Account</th>
						<th class="bluebgheadtd" style="width: 13%; text-align: center"
							align="center">Schedule No</th>

						<c:if test="%{model.funds.size()>1}">
							<c:forEach value="model.funds" status="stat">
								<th class="bluebgheadtd">${name}</th>
							</c:forEach>
						</c:if>
						<th class="bluebgheadtd" style="width: 13%; text-align: center"
							align="center">${currentYearToDate}</th>
						<th class="bluebgheadtd" style="width: 13%; text-align: center"
							align="center">${previousYearToDate}</th>
					</tr>
					<c:set var="trclass" value="greybox" />
					<c:forEach value="model.entries" status="stat">
						<tr>
							<c:if
								test='%{accountName == "Operating Payment" || accountName == "Payments"|| accountName == "Operating Receipt" || accountName == "Receipts"}'>
								<td class="blueborderfortd">&nbsp;</td>
								<td class="blueborderfortd"><strong><s:property
											value="accountName" />&nbsp;</strong></td>
								<td class="blueborderfortd">&nbsp;</td>
								<c:if test="%{model.funds.size()>1}">
									<c:forEach value="model.funds" status="stat">
										<td class="blueborderfortd">
											<div align="right">&nbsp;</div>
										</td>
									</c:forEach>
								</c:if>
								<td class="blueborderfortd">&nbsp;</td>
								<td class="blueborderfortd">&nbsp;</td>
							</c:if>
							<!-- TODO: Manual migration required for custom Struts tag -->
								<td class="blueborderfortd">&nbsp;</td>
								<td class="blueborderfortd"><strong><s:property
											value="accountName" />&nbsp;</strong></td>
								<td class="blueborderfortd">&nbsp;</td>
								<c:if test="%{model.funds.size()>1}">
									<c:forEach value="model.funds" status="stat">
										<td class="blueborderfortd">
											<div align="right">
												<strong>${fundWiseAmount[code]}&nbsp;</strong>
											</div>
										</td>
									</c:forEach>
								</c:if>
								<td class="blueborderfortd"><strong><s:property
											value="currentYearTotal" />&nbsp;</strong></td>
								<td class="blueborderfortd"><strong><s:property
											value="previousYearTotal" />&nbsp;</strong></td>
							</s:elseif>
							<c:otherwise>
								<td class="blueborderfortd">&nbsp;</td>
								<td class="blueborderfortd">${accountName}&nbsp;</td>
								<td class="blueborderfortd"><a href="#"
									onclick="urlLoad('${scheduleNo}');"
									id="sourceLink" /> ${scheduleNo}&nbsp; </a></td>
								<c:if test="%{model.funds.size()>1}">
									<c:forEach value="model.funds" status="stat">
										<td class="blueborderfortd">
											<div align="right">
												${fundWiseAmount[code]}
												&nbsp;
											</div>
										</td>
									</c:forEach>
								</c:if>
								<td class="blueborderfortd"><s:property
										value="currentYearTotal" />&nbsp;</td>
								<td class="blueborderfortd"><s:property
										value="previousYearTotal" />&nbsp;</td>
							</s:else>
						</tr>
					</c:forEach>
					</c:if>

				</table>
		</form:form>
		<script>

	function validate(){
    	var finYr=document.getElementById("financialYear").value;
	 	var period=document.getElementById("period").value;
	 	var currency=document.getElementById("currency").value;
	 	var fromDate =  Date.parse(document.getElementById('fromDate').value);
		var toDate =  Date.parse(document.getElementById('toDate').value);
	 		if(finYr == 0 || period == 0 || currency == 0){
		 		bootbox.alert("Please select Mandatory fields");
		 		return false;
			}
	 		return true;

	 		if(type == 'Yearly'){
	 			document.getElementById('fromDate').value="";
	  			document.getElementById('toDate').value="";
	 		}
	 		else{
	 		  if(isNaN(fromDate)||isNaN(toDate)){
	 			bootbox.alert("Please enter a valid date");
	 			return false;
	 	   	 }
	 	}
	}

	function bodyOnLoad(){
		//bootbox.alert("hi");
		var period='${model.period}';
		//bootbox.alert("period >> "+period);  
		if(period == 'Date Range')
			document.getElementById('dateran').style.display ="inline";
		else
			document.getElementById('dateran').style.display ="none";
	}

	function checkSelected(obj){
		var type = obj.value;
		if (type == 'Date Range'){
			document.getElementById('dateran').style.display ="inline";
		}else{
			document.getElementById('dateran').style.display ="none";
			document.getElementById('fromDate').value="";
  			document.getElementById('toDate').value="";
		}
	}

	function urlLoad(scheduleNo){
		var finYr=document.getElementById("financialYear").value;
		var fundId=document.getElementById("fund").value;
		var currency=document.getElementById("currency").value;
		var period=document.getElementById("period").value;
		url = "receiptPaymentReport!searchDetail.action?financialYear.id="+finYr+"&fund.id="+fundId+"&scheduleNo="+scheduleNo+"&currency="+currency+"&period="+period;
		window.open(url,'rpReportDetailView','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
	}

	

	 </script>
</body>
</html>
