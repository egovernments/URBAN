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
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --> </title>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/directBankPaymentHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/calendar.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/autocomplete-debug.js"></script>
<link rel="stylesheet" href="/services/EGF/struts/xhtml/styles.css"
	type="text/css" />
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<style type="text/css">
#codescontainer {
	position: absolute;
	left: 11em;
	width: 9%;
	text-align: left;
}

#codescontainer .yui-ac-content {
	position: absolute;
	width: 600px;
	border: 1px solid #404040;
	background: #fff;
	overflow: hidden;
	z-index: 9050;
}

#codescontainer .yui-ac-shadow {
	position: absolute;
	margin: .3em;
	width: 300px;
	background: #a0a0a0;
	z-index: 9049;
}

#codescontainer ul {
	padding: 5px 0;
	width: 100%;
}

#codescontainer li {
	padding: 0 5px;
	cursor: default;
	white-space: nowrap;
}

#codescontainer li.yui-ac-highlight {
	background: #ff0;
}

#codescontainer li.yui-ac-prehighlight {
	background: #FFFFCC;
}
</style>
<script>
	path="${pageContext.request.contextPath}";
	var showMode='${showMode}';	
		var totaldbamt=0,totalcramt=0;
		var OneFunctionCenter= ${isRestrictedtoOneFunctionCenter}; 
		//bootbox.alert(">>.."+OneFunctionCenter);                 
		var makeVoucherDetailTable = function() {
			<c:if test='%{isRestrictedtoOneFunctionCenter == true}'>                                   
			var voucherDetailColumns = [                   
				{key:"functionid",hidden:true,  formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".functionIdDetail","hidden")},
				{key:"function",hidden:true,label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createTextFieldFormatterForFunctionJV(VOUCHERDETAILLIST,".functionDetail","hidden")},    
				{key:"glcodeid",hidden:true, formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".glcodeIdDetail","hidden")},
				{key:"glcode",label:'<!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span>',   formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".glcodeDetail","text")},
				{key:"accounthead", label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createLongTextFieldFormatterJV(VOUCHERDETAILLIST,".accounthead")},				
				{key:"debitamount",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createAmountFieldFormatterJV(VOUCHERDETAILLIST,".debitAmountDetail","updateDebitAmountJV()")}, 
				{key:"creditamount",label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createAmountFieldFormatterJV(VOUCHERDETAILLIST,".creditAmountDetail","updateCreditAmountJV()")},
				{key:'Add',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
				{key:'Delete',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
			];
			</c:if>
			<c:otherwise>
			var voucherDetailColumns = [ 
       			{key:"functionid",hidden:true,  formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".functionIdDetail","hidden")},
       			{key:"function",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createTextFieldFormatterForFunctionJV(VOUCHERDETAILLIST,".functionDetail","text")},         
       			{key:"glcodeid",hidden:true, formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".glcodeIdDetail","hidden")},
       			{key:"glcode",label:'<!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span>',formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".glcodeDetail","text")},
       			{key:"accounthead", label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createLongTextFieldFormatterJV(VOUCHERDETAILLIST,".accounthead")},				
       			{key:"debitamount",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createAmountFieldFormatterJV(VOUCHERDETAILLIST,".debitAmountDetail","updateDebitAmountJV()")}, 
       			{key:"creditamount",label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createAmountFieldFormatterJV(VOUCHERDETAILLIST,".creditAmountDetail","updateCreditAmountJV()")},
       			{key:'Add',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
       			{key:'Delete',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
       		];
		</s:else>         
	    var voucherDetailDS = new YAHOO.util.DataSource(); 
		billDetailsTable = new YAHOO.widget.DataTable("billDetailTable",voucherDetailColumns, voucherDetailDS);
		billDetailsTable.on('cellClickEvent',function (oArgs) {
			var target = oArgs.target;
			var record = this.getRecord(target);
			var column = this.getColumn(target);
			if (column.key == 'Add') { 
			 	if(showMode=='nonbillPayment')
			 	return;
					billDetailsTable.addRow({SlNo:billDetailsTable.getRecordSet().getLength()+1});
				updateAccountTableIndex();
			}
			if (column.key == 'Delete') { 	
				if(showMode=='nonbillPayment')
			 		return;
				if(this.getRecordSet().getLength()>1){			
					this.deleteRow(record);
					allRecords=this.getRecordSet();
					for(var i=0;i<allRecords.getLength();i++){
						this.updateCell(this.getRecord(i),this.getColumn('SlNo'),""+(i+1));
					}
					updateDebitAmountJV();updateCreditAmountJV();
					check();
				}
				else{
					bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
				}
			}
			
			        
		}
		);
		<c:forEach value="billDetailslist" status="stat">
				billDetailsTable.addRow({SlNo:billDetailsTable.getRecordSet().getLength()+1,
					"functionid":'${functionIdDetail}',
					"function":'${functionDetail}',
					"glcodeid":'${glcodeIdDetail}',
					"glcode":'${glcodeDetail}',
					"accounthead":'${accounthead}',
					"debitamount":'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>',
					"creditamount":'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>'
				});
				var index = '${#stat.index}';
				updateGridPJV('functionIdDetail',index,'${functionIdDetail}');
				updateGridPJV('functionDetail',index,'${functionDetail}');
				updateGridPJV('glcodeIdDetail',index,'${glcodeIdDetail}');
				updateGridPJV('glcodeDetail',index,'${glcodeDetail}');
				updateGridPJV('accounthead',index,'${accounthead}');
				updateGridPJV('debitAmountDetail',index,'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
				updateGridPJV('creditAmountDetail',index,'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
				totaldbamt = totaldbamt+parseFloat('${debitAmountDetail}');
				totalcramt = totalcramt+parseFloat('${creditAmountDetail}');
				updateAccountTableIndex();	
			</c:forEach>
				

		var tfoot = billDetailsTable.getTbodyEl().parentNode.createTFoot();
		var tr = tfoot.insertRow(-1);
		var th = tr.appendChild(document.createElement('th'));
		th.colSpan = 5;
		th.innerHTML = 'Total&nbsp;&nbsp;&nbsp;';
		th.align='right';
		var td = tr.insertCell(-1);
		td.width="90"
		td.innerHTML="<input type='text' style='text-align:right;width:100px;'  id='totaldbamount' name='totaldbamount' readonly='true' tabindex='-1'/>";
		var td = tr.insertCell(-1);
		td.width="90"
		td.align="right"
		td.innerHTML="<input type='text' style='text-align:right;width:100px;'  id='totalcramount' name='totalcramount' readonly='true' tabindex='-1'/>";
		document.getElementById('totaldbamount').value=totaldbamt.toFixed(2);
		document.getElementById('totalcramount').value=totalcramt.toFixed(2); 
		}
		var glcodeOptions=[{label:"<!-- TODO: Manual migration required for custom Struts tag -->", value:"0"}];
		<c:forEach value="dropdownData.glcodeList">
	    glcodeOptions.push({label:'${glcode}', value:'${id}'})
	</c:forEach>
	var detailtypeOptions=[{label:"<!-- TODO: Manual migration required for custom Struts tag -->", value:"0"}];
	<c:forEach value="dropdownData.detailTypeList">
	    detailtypeOptions.push({label:'${name}', value:'${id}'})
	</c:forEach>
	
	
	
		
	var makeSubLedgerTable = function() {
		var subledgerColumns = [ 
			{key:"subledgerCode",hidden:true, formatter:createSLTextFieldFormatterJV(SUBLEDGERLIST,".subledgerCode","hidden")},
			{key:"glcode.id",label:'<!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span>', formatter:createDropdownFormatterJV(SUBLEDGERLIST,"loaddropdown(this)"),  dropdownOptions:glcodeOptions},
			{key:"detailTypeName",hidden:true, formatter:createSLTextFieldFormatterJV(SUBLEDGERLIST,".detailTypeName","hidden")},
			{key:"detailType.id",label:'<!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span>', formatter:createDropdownFormatterJV1(SUBLEDGERLIST),dropdownOptions:detailtypeOptions},
			{key:"detailCode",label:'<!-- TODO: Manual migration required for custom Struts tag --> <span class="mandatory1">*</span>', formatter:createSLDetailCodeTextFieldFormatterJV(SUBLEDGERLIST,".detailCode","splitEntitiesDetailCode(this)", ".search", "openSearchWindowFromJV(this)")},
			{key:"detailKeyId",hidden:true, formatter:createSLHiddenFieldFormatterJV(SUBLEDGERLIST,".detailKeyId")},
			{key:"detailKey",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createSLLongTextFieldFormatterJV(SUBLEDGERLIST,".detailKey","")},
			{key:"amount",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createSLAmountFieldFormatterJV(SUBLEDGERLIST,".amount")},
			{key:'Add',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
		];
	    var subledgerDS = new YAHOO.util.DataSource(); 
		subLedgersTable = new YAHOO.widget.DataTable("subLedgerTable",subledgerColumns, subledgerDS);
		subLedgersTable.on('cellClickEvent',function (oArgs) {
			var target = oArgs.target;
			var record = this.getRecord(target);
			var column = this.getColumn(target);
			if (column.key == 'Add') { 
			if(showMode=='nonbillPayment')
			 		return;
				subLedgersTable.addRow({SlNo:subLedgersTable.getRecordSet().getLength()+1});
				updateSLTableIndex();
				check();
			}
			if (column.key == 'Delete') { 	
			if(showMode=='nonbillPayment')
			 		return;		
				if(this.getRecordSet().getLength()>1){			
					this.deleteRow(record);
					allRecords=this.getRecordSet();
					for(var i=0;i<allRecords.getLength();i++){
						this.updateCell(this.getRecord(i),this.getColumn('SlNo'),""+(i+1));
					}
				}
				else{
					bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
				}
			}        
		});
	
		<c:forEach value="subLedgerlist" status="stat">
				subLedgersTable.addRow({SlNo:subLedgersTable.getRecordSet().getLength()+1,
					"subledgerCode":'${subledgerCode}',
					"glcode.id":'${glcode.id}',
					"detailType.id":'${detailType.id}',
					"detailTypeName":'${detailTypeName}',
					"detailCode":'${detailCode}',
					"detailKeyId":'${detailKeyId}',
					"detailKey":'${detailKey}',
					"debitAmount":'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>',
					"creditAmount":'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>'
				});'${glcode.id}'
				var index = '${#stat.index}';
				updateGridSLDropdownJV('glcode.id',index,'${glcode.id}','${subledgerCode}');
				updateGridSLDropdownJV('detailType.id',index,'${detailType.id}','${detailTypeName}');
				updateSLGridPJV('detailCode',index,'${detailCode}');
				updateSLGridPJV('subledgerCode',index,'${subledgerCode}');
				updateSLGridPJV('detailKeyId',index,'${detailKeyId}');
				updateSLGridPJV('detailKey',index,'${detailKey}');
				updateSLGridPJV('amount',index,'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
				updateSLTableIndex();
			</c:forEach>
	
	}
	var amountshouldbenumeric='<!-- TODO: Manual migration required for custom Struts tag -->';
	var succesMessage='<!-- TODO: Manual migration required for custom Struts tag -->';
	var totalsnotmatchingamount='<!-- TODO: Manual migration required for custom Struts tag -->';
	var 	button='${button}';
	</script>

</head>
<body
	onload="onLoadTask_new();loadDropDownCodesExcludingCashAndBank();loadDropDownCodesFunction();">
	<form:form action="directBankPayment" theme="css_xhtml" name="dbpform"
		validate="true">
		<input type="hidden" id="csrfTokenValue" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		<!-- TODO: Manual migration required for custom Struts tag -->
			<jsp:include page="../budget/budgetHeader.jsp">
				<jsp:param value="Direct Bank Payment" name="heading" />
			</jsp:include>
			<div class="formmainbox">
				<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>

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
						<td width="10%" class="bluebox"></td>
						<c:if test="%{shouldshowVoucherNumber()}">
							<td class="bluebox" width="22%"><s:text
									name="voucher.number" /><span class="mandatory1">*</span></td>
							<td class="bluebox" width="22%"><form:input
									name="voucherNumber" id="voucherNumber" /></td>
						</c:if>
						<!-- TODO: Manual migration required for custom Struts tag -->

						<td class="bluebox" width="18%"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="mandatory1">*</span></td>
						<!-- TODO: Manual migration required for custom Struts tag -->
						<td class="bluebox" width="34%">
							<div name="daterow">
								<form:input id="voucherDate" path="voucherDate"
									value="%{voucherDateId}" data-date-end-date="0d"
									onkeyup="DateFormat(this,this.value,event,false,'3')"
									placeholder="DD/MM/YYYY" class="form-control datepicker"
									data-inputmask="'mask': 'd/m/y'" />

							</div>
						</td>
					</tr>
					<%@include file="directBankPayment-form.jsp"%>


					<div class="subheadsmallnew"></div>
					<div align="left" class="mandatory1">* <!-- TODO: Manual migration required for custom Struts tag --> </div>
					<s:hidden name="typeOfAccount" id="typeOfAccount"
						value="%{typeOfAccount}" />

					</br>
				</table>
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
            	<jsp:include page="../payment/commonWorkflowMatrix.jsp"/>
			</div>
			<div align="center">
            	<jsp:include page="../payment/commonWorkflowMatrix-button.jsp"/>
			</div>
		</s:push>
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
	<script type="text/javascript">
function onLoadTask_new()
{
	//bootbox.alert(showMode);                                                      
	if(button!=null && button!="")
	{
		if(document.getElementById("Errors").innerHTML=='')  
		{
			bootbox.alert(succesMessage);
			if(button=="Save_Close")
				{
				window.close();
				}
			else if(button=="Save_View")
				{
						var vhId='${voucherHeader.id}';
						document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher-loadvoucherview.action?vhid="+vhId;
						return true;
				}
			else if(button=="Save_New")
				{      	
					document.forms[0].button.value='';
				    document.forms[0].action = "directBankPayment-newform.action";
				 	return true;
				}
		}
		
		
 	}else
 	{
 		
 		<c:if test="%{showMode=='nonbillPayment'}">
			//bootbox.alert('${showMode}');
			if(document.getElementById("Errors").innerHTML!='')
			{
			document.getElementById('buttondiv').style.display="none";
			document.getElementById('buttondivdefault').style.display="block";
			}
		</c:if>
 	}
 	
		
		if(showMode=='nonbillPayment')
		{
		disableForNonBillPayment();	
		disableYUIAddDeleteButtons(true);
		}
		if(document.getElementById('approverDepartment'))
			document.getElementById('approverDepartment').value = "-1";
		if (jQuery("#bankBalanceCheck") == null || jQuery("#bankBalanceCheck").val() == "") {
			disableForm();
		}
}

function populateAccNum(branch){
	var fundObj = document.getElementById('fundId');
	var bankbranchId = branch.options[branch.selectedIndex].value;
	var index=bankbranchId.indexOf("-");
	var bankId = bankbranchId.substring(0,index);
	var brId=bankbranchId.substring(index+1,bankbranchId.length);
	
	var vTypeOfAccount = '${%{typeOfAccount}}';
	
	populateaccountNumber({fundId: fundObj.options[fundObj.selectedIndex].value,bankId:bankId,branchId:brId,typeOfAccount:vTypeOfAccount})
}
function onSubmit()
{
	enableAll();
	var balanceCheckMandatory='<!-- TODO: Manual migration required for custom Struts tag -->';
	var balanceCheckWarning='<!-- TODO: Manual migration required for custom Struts tag -->';
	var noBalanceCheck='<!-- TODO: Manual migration required for custom Struts tag -->';
	if (!validateForm_directBankPayment()) {
		undoLoadingMask();
		return false;
	}
	else if (!updateAndCheckAmount()) {
		undoLoadingMask();
		return false;
	}
	else if(jQuery("#bankBalanceCheck").val()==noBalanceCheck)
		{
		document.dbpform.action = '/services/EGF/payment/directBankPayment-create.action';
		return true;
		}
	else if(!balanceCheck() && jQuery("#bankBalanceCheck").val()==balanceCheckMandatory){
			 bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			 return false;
			}
	else if(!balanceCheck() && jQuery("#bankBalanceCheck").val()==balanceCheckWarning){
		 var msg = confirm("<!-- TODO: Manual migration required for custom Struts tag -->");
		 if (msg == true) {
			 document.dbpform.action = '/services/EGF/payment/directBankPayment-create.action';
			 //document.dbpform.submit();
			return true;
		 } else {
			 undoLoadingMask();
		   	return false;
			}
		}
	else{
		document.dbpform.action = '/services/EGF/payment/directBankPayment-create.action';
		//document.dbpform.submit();
	}
		
}

function validateCutOff()
{
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

</SCRIPT>
</body>
</html>
