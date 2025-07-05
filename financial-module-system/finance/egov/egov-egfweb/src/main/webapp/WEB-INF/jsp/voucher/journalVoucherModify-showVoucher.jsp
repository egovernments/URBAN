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
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>

<script type="text/javascript"
	src="/services/EGF/resources/javascript/calendar.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<title>Journal Voucher -Modify</title>

</head>


<body
	onload="loadDropDownCodes();loadDropDownCodesFunction();onLoadTask()">

	<form:form action="journalVoucherModify" theme="simple"
		name="jvmodifyform">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<div id="loading"
				style="position: absolute; left: 25%; top: 70%; padding: 2px; z-index: 20001; height: auto; width: 500px; display: none;">
				<div class="loading-indicator"
					style="background: white; color: #444; font: bold 13px tohoma, arial, helvetica; padding: 10px; margin: 0; height: auto;">
					<img src="/services/egi/resources/erp2/images/loading.gif" width="32"
						height="32" style="margin-right: 8px; vertical-align: top;" />
					Loading...
				</div>
			</div>
			<jsp:include page="../budget/budgetHeader.jsp">
				<jsp:param name="heading" value="Journal voucher -Modify" />
			</jsp:include>

			<span class="mandatory"> <font
				style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag --></font>
			</span>
			<div class="formmainbox">
				<div class="formheading" />
				<div class="subheadnew">Journal Voucher</div>
				<div id="listid" style="display: block">
					<br />
					<div align="center">
						<font style='color: red; font-weight: bold'>
							<p class="error-block" id="lblError"></p>
						</font> <input type="hidden" name="selectedDate" id="selectedDate">

						<table border="0" width="100%">
							<tr>
								<c:if test="%{shouldShowHeaderField('vouchernumber')}">
									<td class="greybox" width="22%"><s:text
											name="voucher.number" /><span class="mandatory">*</span></td>
									<td class="greybox" width="22%">
										<table width="100%">
											<tr>
												<td style="width: 25%"><input type="text"
													name="voucherNumberPrefix" id="voucherNumberPrefix"
													readonly="true" style="width: 100%" /></td>
												<td style="width: 75%"><form:input
														name="voucherNumber" id="voucherNumber" /></td>
											</tr>
										</table>
									</td>
								</c:if>
								<c:otherwise>
									<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
										class="mandatory">*</span></td>
									<td class="greybox"><form:input path="voucherNumber"
											id="voucherNumber" readonly="true" /></td>
								</s:else>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
									class="mandatory">*</span></td>
								<td class="greybox"><s:date name="voucherDate"
										var="voucherDateId" format="dd/MM/yyyy" /> <form:input
										name="voucherDate" id="voucherDate" value="%{voucherDateId}"
										maxlength="10"
										onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
									href="javascript:show_calendar('jvmodifyform.voucherDate');"
									style="text-decoration: none">&nbsp;<img tabIndex=-1
										src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></a>(dd/mm/yyyy)
								</td>


							</tr>
							<jsp:include page="voucherSubType.jsp" />
							<jsp:include page="vouchertrans-filter.jsp" />
							<jsp:include page="loadYIDataTable.jsp" />
							<tr>
								<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
								<td class="greybox" colspan="3"><form:textarea id="narration"
										name="description" style="width:580px"
										onblur="checkVoucherNarrationLen(this)" /></td>
							</tr>
						</table>
					</div>
					<br />
					<div id="labelAD" align="center">
						<table width="80%" border=0 id="labelid">
							<th>Account Details</th>
						</table>
					</div>
					<div class="yui-skin-sam" align="center">
						<div id="billDetailTable"></div>
					</div>
					<script>
		
		makeVoucherDetailTable();
		document.getElementById('billDetailTable').getElementsByTagName('table')[0].width="80%"
	 </script>
					<div id="codescontainer"></div>
					<br />
					<div id="labelSL" align="center">
						<table width="80%" border=0 id="labelid">
							<th>Sub-Ledger Details</th>
						</table>
					</div>

					<div class="yui-skin-sam" align="center">
						<div id="subLedgerTable"></div>
					</div>
					<script>
			
			makeSubLedgerTable();
			
			document.getElementById('subLedgerTable').getElementsByTagName('table')[0].width="80%"
		</script>

					<br />
					<div class="subheadsmallnew" /></div>
					<div class="mandatory" align="left">* Mandatory Fields</div>
					<div id="wfHistoryDiv">
						<c:import url="/WEB-INF/jsp/workflow/workflowHistory.jsp"
							context="/egi">
							<c:param name="stateId" value="${voucherHeader.state.id}"></c:param>
						</c:import>
					</div>
					<c:if test='%{! wfitemstate.equalsIgnoreCase("END")}'>
						<%@include file="voucherWorkflow.jsp"%>
					</c:if>
					<div class="buttonbottom" id="buttondiv">
						<c:forEach value="%{getValidActions('')}" var="p">
							<s:submit type="submit" cssClass="buttonsubmit"
								value="%{description}" id="%{name}" name="%{name}"
								method="updateVoucher"
								onclick="return validateApproverUser('%{name}','%{description}')" />
						</c:forEach>
						<input type="button" class="button" id="print"
							value="Print Preview" action="journalVoucherPrint" method="print"
							onclick="printJV()" /> <input type="button" value="Close"
							onclick="javascript:window.close()" class="button" />
					</div>
					<!-- <div class="buttonbottom" style="padding-bottom:10px;" align="center">
		<table border="0" width="100%"><tr></tr>
			<tr>
				<td/><td>
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
				<input type="reset" id="Reset" value="Cancel" class="button"/>
				<input type="button" id="Close" value="Close" onclick="javascript:window.close()" class="button"/>
			</tr>
		</table>
	</div> -->
					<br />
				</div>
			</div>
			<div id="codescontainer"></div>
			<!-- TODO: Manual migration required for custom Struts tag --></s:hidden>
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<input type="hidden" id="voucherTypeBean.voucherNumType"
				name="voucherTypeBean.voucherNumType" value="Journal Voucher" />
			<!-- TODO: Manual migration required for custom Struts tag -->
		</s:push>
	</form:form>

	<script>
function validateApproverUser(name,value){
	
	document.getElementById("actionName").value= name;
	<c:if test='%{! wfitemstate.equalsIgnoreCase("END")}'>
		if(!validateUser(name,value)){
		return false;
		}
	</c:if>
}
function validateJV(saveMode)
{
	document.getElementById('lblError').innerHTML ="";
	document.getElementById('saveMode').value=saveMode;
	var cDate = new Date();
	var currDate = cDate.getDate()+"/"+(parseInt(cDate.getMonth())+1)+"/"+cDate.getYear();
	var vhDate=document.getElementById('voucherDate').value;
	if(vhDate == '' )	{
		document.getElementById('lblError').innerHTML = "Please enter a voucher date ";
		document.getElementById('voucherDate').focus();
		return false;
	}
	
	var varVType = document.getElementById('vType').value;
	if( varVType != 'JVGeneral' && varVType != '-1' )	{
		if(document.getElementById('voucherTypeBean.partyName').value == '' ) {
			document.getElementById('lblError').innerHTML = "Please enter a Party Name ";
			document.getElementById('voucherTypeBean.partyName').focus();
			return false;
		}
	}
		
	if(!validateMIS())	return false;

	return true;
}
	function onLoadTask()
	{
		// code- JV subtype - starts
		document.getElementById('vType').value='${voucherTypeBean.voucherSubType}';
		if('${voucherTypeBean.voucherSubType}' == 'JVGeneral' ){
			document.getElementById('voucherTypeBean.partyBillNum').readOnly=true;
			document.getElementById('voucherTypeBean.partyName').readOnly=true;
			document.getElementById('partyBillDate').readOnly=true;
			document.getElementById('voucherTypeBean.billNum').readOnly=true;
			document.getElementById('billDate').readOnly=true;
		}
		
		var varVType = document.getElementById('vType').value;
		if(varVType == 'JVGeneral' || varVType == '-1') {
			document.getElementById('partyNameDivId').style.display='none';
		} else {
			document.getElementById('partyNameDivId').style.display='inline';
		}
		document.getElementById('vType').disabled=true; 
		// code- JV subtype - ends
		var target = '${target}';
		var saveMode='${saveMode}';
		var voucherNumber = '<!-- TODO: Manual migration required for custom Struts tag -->' ;
		var cgn = '<!-- TODO: Manual migration required for custom Struts tag -->' ;
		if(target == 'success' ){
			if(saveMode == 'saveclose'){
				bootbox.alert("Voucher modified sucessfully with voucher number =  "+voucherNumber );
				window.close();
			}else if(saveMode == 'saveview'){
				bootbox.alert("Voucher modified sucessfully with voucher number =  "+voucherNumber);
				window.open('preApprovedVoucher!loadvoucherview.action?vhid=<!-- TODO: Manual migration required for custom Struts tag -->','Search','resizable=yes,scrollbars=yes,left=300,top=40,width=900, height=700');
			}else if(saveMode == 'saveprint'){
				bootbox.alert("Voucher modified sucessfully with voucher number =  "+voucherNumber);
				window.open('journalVoucherPrint!print.action?id=<!-- TODO: Manual migration required for custom Struts tag -->','','resizable=yes,scrollbars=yes,left=300,top=40,width=900, height=700');
			}
		}
		<c:if test="%{shouldShowHeaderField('vouchernumber')}">
			   var tempVoucherNumber='${voucherHeader.voucherNumber}';
			   var prefixLength='${voucherNumberPrefixLength}';
			   document.getElementById('voucherNumberPrefix').value=tempVoucherNumber.substring(0,prefixLength);
			   document.getElementById('voucherNumber').value=tempVoucherNumber.substring(prefixLength,tempVoucherNumber.length);
		</c:if>
		populateslDropDown(); // to load the subledger detils when page loads, required when validation fails.		
	}

	function loadBank(fund){
	}

</script>
</body>

</html>
