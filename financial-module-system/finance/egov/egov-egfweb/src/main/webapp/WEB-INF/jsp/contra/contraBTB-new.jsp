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


<html>
<head>
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<script
        src="<cdn:url value='/resources/app/js/i18n/jquery.i18n.properties.js?rnd=${app_release_no}' context='/services/EGF'/>"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/contraBTBHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/calendar.js?rnd=${app_release_no}"></script>
<script language="javascript"
	src="../resources/javascript/jsCommonMethods.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
</head>
<body onload="onLoadTask_new()">
	<form:form action="contraBTB" theme="simple" name="cbtbform">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<jsp:include page="../budget/budgetHeader.jsp">
				<jsp:param value="Bank to Bank Transfer" name="heading" />
			</jsp:include>
			<div class="formmainbox">
				<div class="formheading" />
				<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
				<div id="listid" style="display: block">
					<br />
				</div>

				<div align="center">
					<font style='color: red;'>
						<p class="error-block" id="lblError"></p>
					</font>
				</div>
				<span class="mandatory1">
					<div id="Errors">
						<!-- TODO: Manual migration required for custom Struts tag -->
						<!-- TODO: Manual migration required for custom Struts tag -->
					</div> <!-- TODO: Manual migration required for custom Struts tag -->
				</span>
				<table border="0" width="100%" cellspacing="0" cellpadding="0">
					<tr>
						<td class="bluebox"></td>
						<c:if test="%{shouldShowHeaderField('vouchernumber')}">

							<td class="bluebox" width="22%"><s:text
									name="voucher.number" /><span class="mandatory1">*</span></td>
							<td class="bluebox" width="22%"><form:input
									name="voucherNumber" id="voucherNumber" /></td>
						</c:if>
						<!-- TODO: Manual migration required for custom Struts tag -->

						<td class="bluebox" width="18%"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="mandatory1">*</span></td>
						<td class="bluebox" width="34%"><form:input id="voucherDate"
								name="voucherDate" data-date-end-date="0d" value="{voucherDate}"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" class="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
						<td class="bluebox"></td>
						<td class="bluebox"></td>
					</tr>
					<%@include file="contraBTB-form.jsp"%>
				</table>
			</div>
			<div class="mandatory1" align="left">* <!-- TODO: Manual migration required for custom Struts tag --> </div>

			</br>
			</br>
			<%@include file="../voucher/SaveButtons.jsp"%>
			<input type="hidden" id=name name="name" value="BankToBank" />
			<input type="hidden" id="type" name="type" value="Contra" />
			<s:hidden id="bankBalanceMandatory" name="bankBalanceMandatory"
				value="%{isBankBalanceMandatory()}" />
			<s:hidden id="startDateForBalanceCheckStr"
				name="startDateForBalanceCheckStr"
				value="%{startDateForBalanceCheckStr}" />
		</s:push>
	</form:form>
	<SCRIPT type="text/javascript">
function	onLoadTask_new()
{
	//loadFromDepartment();
	//loadToDepartment();
	var 	button='${button}';
	var 	srcFund='${contraBean.fromFundId}'
	var 	desFund='${contraBean.toFundId}'
	if(srcFund!="" && desFund!="")
	{
		if(srcFund!=desFund)
		{
		document.getElementById('interFundRow1').style.visibility="visible";
		document.getElementById('interFundRow2').style.visibility="visible";
		document.getElementById('interFundRow3').style.visibility="visible";
		}
	}
	
	if(button!=null && button!="")
	{
	
	if(document.getElementById("Errors").innerHTML=='')  
	{
	bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
		
	if(button=="Save_Close")
	{
	window.close();
	}
	else if(button=="Save_View")
	{
			var vhId='${vhId}';
			document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher-loadvoucherview.action?vhid="+vhId;
			document.forms[0].submit();
	}
	 else if(button=="Save_New")
	{      	document.forms[0].button.value='';
	        document.forms[0].action = "contraBTB-newform.action";
	 		document.forms[0].submit();
	} 
	}
 }
 
 <c:if test="egovCommon.isShowChequeNumber()">
 document.getElementById("chequeGrid").style.visibility="visible";
 </c:if>
 <c:otherwise>
 if('${contraBean.modeOfCollection}'=='cheque')
 {
 document.getElementById("chequeGrid").style.visibility="hidden";
 }else
 {
 document.getElementById("chequeGrid").style.visibility="visible";
 }
 </s:else>
 

}

	function toggleChequeAndRefNumber(obj) {
			jQuery('#chequeNum').val('');
			document.getElementById('chequeNumberlblError').innerHTML='';
			if (obj.value == "RTGS/NEFT") {
			document.getElementById("chequeGrid").style.visibility="visible";
			document.getElementById("mdcNumber").innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->';
			document.getElementById("mdcDate").innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->';
		} else {
		<c:if test="egovCommon.isShowChequeNumber()">
		 document.getElementById("chequeGrid").style.visibility="visible";
		 </c:if>
		 <c:otherwise>
		 document.getElementById("chequeGrid").style.visibility="hidden";
		 </s:else>
			document.getElementById("mdcNumber").innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->';
			document.getElementById("mdcDate").innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->';
			
		}
	}

	
	function decimalvalue(obj){
	var regexp_decimalvalue = /[^0-9.]/g ;
	if(jQuery('#modeOfCollectioncheque').is(':checked')){
		if(jQuery(obj).val().match(regexp_decimalvalue)){
			jQuery(obj).val( jQuery(obj).val().replace(regexp_decimalvalue,'') );
		}else if(jQuery(obj).val().length >= 7){
			var subString = jQuery(obj).val().substring(0,6);
			jQuery(obj).val(subString);
		}		
	}
	}

	function validateChequeNumber(obj){
		if(jQuery('#modeOfCollectioncheque').is(':checked')){
			document.getElementById('chequeNumberlblError').innerHTML='';
			if(obj.value.length != 6){
				document.getElementById('chequeNumberlblError').innerHTML =  '<!-- TODO: Manual migration required for custom Struts tag -->';
			}
		}
	}

	if('<!-- TODO: Manual migration required for custom Struts tag -->'=='')
		document.getElementById('lblError').innerHTML = '<!-- TODO: Manual migration required for custom Struts tag -->';
		
		<c:if test="%{!validateUser('createpayment')}">
			//document.getElementById('errorSpan').innerHTML='<!-- TODO: Manual migration required for custom Struts tag -->';
			if(document.getElementById('vouchermis.departmentid'))
			{
				var d = document.getElementById('vouchermis.departmentid');
				d.options[d.selectedIndex].text.value=d;
			}
			</c:if>
			
			<c:if test="%{getUserDepartment()!=null}">
				var d = document.getElementById('vouchermis.departmentid');
				var val='<!-- TODO: Manual migration required for custom Struts tag -->';
				d.value=val;
		</c:if>
		
		jQuery(document).ready(function() {
			jQuery("#voucherDate").datepicker().datepicker("setDate", new Date());
		});
</script>
</body>
</html>
