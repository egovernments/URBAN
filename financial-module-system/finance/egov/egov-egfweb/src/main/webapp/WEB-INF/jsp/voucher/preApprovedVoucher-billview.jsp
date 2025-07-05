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
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title>${type} JV-Create</title>
</head>
<script>
	function checkBillIdBillview(){
		//if(document.getElementById('id').value!=''){
 			//document.getElementById('aa_approve').disabled=true;
		//}else{
 			//document.getElementById('aa_approve').disabled=false;
 		//}
		if('${voucherHeader.id}' ==''){
			document.getElementById('print').disabled=true;
		}else{
			document.getElementById('print').disabled=false;
		}
		if(document.getElementById('approverDepartment'))
			document.getElementById('approverDepartment').value = "-1";
	}
	
	function checkLength(obj){
		if(obj.value.length>1024)
		{
			bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->')
			obj.value = obj.value.substring(1,1024);
		}
	}
	
	function printEJV(){
		var id = '${voucherHeader.id}';
		window.open("${pageContext.request.contextPath}/report/expenseJournalVoucherPrint-print.action?id="+id,'Print','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
	}
	function printJV(){
		var id = '${voucherHeader.id}';
		window.open("${pageContext.request.contextPath}/voucher/journalVoucherPrint-print.action?id="+id,'Print','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
	}
function openSource(){
	var url = '<!-- TODO: Manual migration required for custom Struts tag -->'
	if(url!=null && url==""){
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
		return false;
	}
	window.open(url,'Source','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700')
}
function validateCutOff()
{
	console.log(document.getElementById("cutOffDate"));
var cutOffDatePart=document.getElementById("cutOffDate").value.split("/");
var voucherDatePart=document.getElementById("voucherDate").value.split("/");
var cutOffDate = new Date(cutOffDatePart[1] + "/" + cutOffDatePart[0] + "/"
		+ cutOffDatePart[2]);
var voucherDate = new Date(voucherDatePart[1] + "/" + voucherDatePart[0] + "/"
		+ voucherDatePart[2]);
if(voucherDate<=cutOffDate)
{
	return true;
}
else{
	var msg1='<!-- TODO: Manual migration required for custom Struts tag -->';
	var msg2='<!-- TODO: Manual migration required for custom Struts tag -->';
	bootbox.alert(msg1+" "+document.getElementById("cutOffDate").value+" "+msg2);
		return false;
	}
}
function onSubmit()
{
	var voucherdate =document.getElementById('voucherDate').value ;
	if(voucherdate!=null && voucherdate!=""){
		document.preApprovedVoucher.action='${pageContext.request.contextPath}/voucher/preApprovedVoucher-save.action';
		jQuery(preApprovedVoucher).append(jQuery('<input>', {
            type : 'hidden',
            name : '${_csrf.parameterName}',
            value : '${_csrf.token}'
        }));
		return true;
	}else{
		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag --> ");
		return false;
		}
}

</script>
<body onload="checkBillIdBillview()">
	<form:form action="preApprovedVoucher" theme="simple"
		name="preApprovedVoucher" id="preApprovedVoucher">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Bill Voucher -Create" />
		</jsp:include>
		<font style='color: red;'>
			<p class="error-block" id="lblError" style="font: bold"></p>
		</font>
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<span style="color: green;"><!-- TODO: Manual migration required for custom Struts tag --></span>
		<div class="formmainbox">
			<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->${type}</s:param>
			</s:text>
			</div>
			<div id="listid" style="display: block">
				<br />
				<c:if test="%{isShowVoucherDate()}">
					<div align="center">
						<table border="0" width="100%" cellspacing="0">
							<tr>
								<td class="greybox" width="12%"><!-- TODO: Manual migration required for custom Struts tag --><span
									class="mandatory1">*</span></td>
								<td class="greybox" width="25%">
									<div name="daterow">
										<s:date name="voucherDate" var="voucherDateId"
											format="dd/MM/yyyy" />
										<form:input id="voucherDate" path="voucherDate"
											class="form-control datepicker" data-date-end-date="0d" />
									</div>
								</td>
								<td class="greybox" width="25%" />
								<td class="greybox" width="25%" />
							</tr>
						</table>
					</div>
				</c:if>
				<jsp:include page="voucherViewHeader.jsp" />

				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->

				<table align="center">
					<tr class="bluebox">
						<td><a href="#" onclick=" return openSource()"><!-- TODO: Manual migration required for custom Struts tag --> </a></td>
					</tr>
				</table>

				<br />
				<div align="center">
					<table border="1" width="100%">
						<tr>
							<td colspan="5"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						</tr>
						<tr>
							<th class="bluebgheadtd" width="18%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="17%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="19%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="17%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="16%"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</tr>
						<c:forEach var="p" value="%{billDetails.tempList}" status="s">
							<tr>
								<td width="18%" class="bluebox setborder"><s:property
										value="function" /></td>
								<td width="17%" style="text-align: center"
									class="bluebox setborder">${glcode}</td>
								<td width="19%" class="bluebox setborder"><s:property
										value="accounthead" /></td>
								<td width="17%" class="bluebox setborder"
									style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
								<td width="16%" class="bluebox setborder"
									style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
								<c:set var="db" value="${db+debitamount}" />
								<c:set var="cr" value="${cr+creditamount}" />
							</tr>
						</c:forEach>
						<tr>
							<td class="greybox setborder" style="text-align: right"
								colspan="3" /><!-- TODO: Manual migration required for custom Struts tag -->
							</td>
							<td class="greybox setborder" style="text-align: right"><fmt:formatNumber
									value="${db}" pattern="#0.00" /></td>
							<td class="greybox setborder" style="text-align: right"><fmt:formatNumber
									value="${cr}" pattern="#0.00" /></td>
						</tr>
					</table>
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div>
				<div align="center">
					<table border="1" width="100%">
						<tr>
							<td colspan="5"><strong><!-- TODO: Manual migration required for custom Struts tag --> </strong></td>
						</tr>
						<tr>
							<th class="bluebgheadtd" width="18%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="17%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="19%"><!-- TODO: Manual migration required for custom Struts tag --> </th>
							<th class="bluebgheadtd" width="17%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="16%"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</tr>
						<c:forEach var="p" value="%{billDetails.payeeList}" status="s">
							<tr>
								<td width="17%" style="text-align: center"
									class="bluebox setborder">${glcode}</td>
								<td width="19%" class="bluebox setborder"><s:property
										value="detailtype" /></td>
								<td width="17%" class="bluebox setborder"><s:property
										value="detailkey" /></td>
								<td width="16%" class="bluebox setborder"
									style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
								<td width="16%" class="bluebox setborder"
									style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag -->
										<!-- TODO: Manual migration required for custom Struts tag -->
									</s:text></td>
							</tr>
						</c:forEach>
					</table>
				</div>
				<c:if test='%{! wfitemstate.equalsIgnoreCase("END")}'>
					<%@include file="workflowApproval.jsp"%>
				</c:if>
				<div align="center">
					<table border="0" width="100%">
						<tr>
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> </td>
							<td class="bluebox"><form:textarea path="comments"
									id="comments" cols="150" rows="3" onblur="checkLength(this)" /></td>
							<td><!-- TODO: Manual migration required for custom Struts tag --></td>
						</tr>
						<br />
					</table>
				</div>
				<c:if test="%{!mode.equalsIgnoreCase('save')}">
					<!-- TODO: Manual migration required for custom Struts tag -->
					<%@ include file='../workflow/commonWorkflowMatrix.jsp'%>
					<%@ include file='../workflow/commonWorkflowMatrix-button.jsp'%>
				</c:if>
				<c:otherwise>
					<div class="buttonbottom" align="center">
						<input type="button" name="button2" id="button2" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							class="button" onclick="javascript:window.parent.postMessage('close','*');" />
					</div>
				</s:else>
			</div>
		</div>
		<c:if test="%{hasErrors()}">
			<script>
document.getElementById('id').value='';
	</script>
		</c:if>
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
</body>

</html>
