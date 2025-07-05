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
	width: 350px;
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
		var totaldbamt=0,totalcramt=0;
		var makeVoucherDetailTable = function() {
		var voucherDetailColumns = [ 
			{key:"functionid",hidden:true,width:90, formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".functionIdDetail","hidden")},
			{key:"function",label:'Function Name',width:90, formatter:createTextFieldFormatterForFunctionJV(VOUCHERDETAILLIST,".functionDetail")},
			{key:"glcodeid",hidden:true,width:90, formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".glcodeIdDetail","hidden")},
			{key:"glcode",label:'Account Code <span class="mandatory">*</span>',width:100, formatter:createTextFieldFormatterJV(VOUCHERDETAILLIST,".glcodeDetail","text")},
			{key:"accounthead", label:'Account Head',width:250,formatter:createLongTextFieldFormatterJV(VOUCHERDETAILLIST,".accounthead")},				
			{key:"debitamount",label:'Debit Amount',width:90, formatter:createAmountFieldFormatterJV(VOUCHERDETAILLIST,".debitAmountDetail","updateDebitAmountJV()")}, 
			{key:"creditamount",label:'Credit Amount',width:90, formatter:createAmountFieldFormatterJV(VOUCHERDETAILLIST,".creditAmountDetail","updateCreditAmountJV()")},
			{key:'Add',label:'Add',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Delete',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
		];
	    var voucherDetailDS = new YAHOO.util.DataSource(); 
		billDetailsTable = new YAHOO.widget.DataTable("billDetailTable",voucherDetailColumns, voucherDetailDS);
		billDetailsTable.on('cellClickEvent',function (oArgs) {
			var target = oArgs.target;
			var record = this.getRecord(target);
			var column = this.getColumn(target);
			if (column.key == 'Add') { 
				billDetailsTable.addRow({SlNo:billDetailsTable.getRecordSet().getLength()+1});
				updateAccountTableIndex();
			}
			if (column.key == 'Delete') { 	
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
					bootbox.alert("This row can not be deleted");
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
				updateGridPJV('debitAmountDetail',index,'${debitAmountDetail}');
				updateGridPJV('creditAmountDetail',index,'${creditAmountDetail}');
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
		document.getElementById('totaldbamount').value=totaldbamt.toFixed(2);;
		document.getElementById('totalcramount').value=totalcramt.toFixed(2);; 
		}
		var glcodeOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.glcodeList">
	    glcodeOptions.push({label:'${glcode}', value:'${id}'})
	</c:forEach>
	var detailtypeOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.detailTypeList">
	    detailtypeOptions.push({label:'${name}', value:'${id}'})
	</c:forEach>
	
	
	
		
		var makeSubLedgerTable = function() {
		var subledgerColumns = [ 
			{key:"subledgerCode",hidden:true,width:90, formatter:createSLTextFieldFormatterJV(SUBLEDGERLIST,".subledgerCode","hidden")},
			{key:"glcode.id",label:'Account Code <span class="mandatory">*</span>',width:90, formatter:createDropdownFormatterJV(SUBLEDGERLIST,"loaddropdown(this)"),  dropdownOptions:glcodeOptions},
			{key:"detailTypeName",hidden:true,width:90, formatter:createSLTextFieldFormatterJV(SUBLEDGERLIST,".detailTypeName","hidden")},
			{key:"detailType.id",label:'Type <span class="mandatory">*</span>',width:90, formatter:createDropdownFormatterJV1(SUBLEDGERLIST),dropdownOptions:detailtypeOptions},
			{key:"detailCode",label:'Code <span class="mandatory">*</span>',width:90, formatter:createSLTextFieldFormatterJV(SUBLEDGERLIST,".detailCode","validateDetailCodeForJV(this)")},
			{key:"detailKeyId",hidden:true,width:100, formatter:createSLHiddenFieldFormatterJV(SUBLEDGERLIST,".detailKeyId")},
			{key:"detailKey",label:'Name',width:180, formatter:createSLLongTextFieldFormatterJV(SUBLEDGERLIST,".detailKey","")},
			{key:"amount",label:'Amount',width:90, formatter:createSLAmountFieldFormatterJV(SUBLEDGERLIST,".amount")},
			{key:'Add',label:'Add',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Delete',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
		];
	    var subledgerDS = new YAHOO.util.DataSource(); 
		subLedgersTable = new YAHOO.widget.DataTable("subLedgerTable",subledgerColumns, subledgerDS);
		subLedgersTable.on('cellClickEvent',function (oArgs) {
			var target = oArgs.target;
			var record = this.getRecord(target);
			var column = this.getColumn(target);
			if (column.key == 'Add') { 
				subLedgersTable.addRow({SlNo:subLedgersTable.getRecordSet().getLength()+1});
				updateSLTableIndex();
				check();
			}
			if (column.key == 'Delete') { 			
				if(this.getRecordSet().getLength()>1){			
					this.deleteRow(record);
					allRecords=this.getRecordSet();
					for(var i=0;i<allRecords.getLength();i++){
						this.updateCell(this.getRecord(i),this.getColumn('SlNo'),""+(i+1));
					}
				}
				else{
					bootbox.alert("This row can not be deleted");
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
					"detailKeyId":'${detailKey}',
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
	var amountCannotBeNegetive='<!-- TODO: Manual migration required for custom Struts tag -->';
	var succesMessage='<!-- TODO: Manual migration required for custom Struts tag -->';
	var 	button='${button}';
	</script>
</head>
<body onload="onLoadTask_reverse();">
	<form:form action="directBankPayment" theme="css_xhtml" name="dbpform"
		validate="true">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<jsp:include page="../budget/budgetHeader.jsp">
				<jsp:param value="Bank to Bank Transfer" name="heading" />
			</jsp:include>
			<div class="formmainbox">
				<div class="formheading" />
				<div class="subheadnew">Reverse Direct Bank Payment</div>
				<div id="listid" style="display: block">
					<br />
				</div>
			</div>
			<div align="center">
				<font style='color: red;'>
					<p class="error-block" id="lblError"></p>
				</font>
			</div>
			<span class="mandatory">
				<div id="Errors">
					<!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div> <!-- TODO: Manual migration required for custom Struts tag -->
			</span>
			<table border="0" width="100%" cellspacing="0" cellpadding="0">
				<tr>
					<td class="bluebox" width="10%"></td>
					<td class="bluebox" width="22%"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="bluebox" width="22%"><form:input
							name="voucherNumber" id="voucherNumber" /></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="bluebox" width="18%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory">*</span></td>
					<td class="bluebox" width="38%"><input type="text"
						name="voucherDate"
						onkeyup="DateFormat(this,this.value,event,false,'3')"
						value='<!-- TODO: Manual migration required for custom Struts tag -->' /> <a
						href="javascript:show_calendar('cbtbform.voucherDate');"
						style="text-decoration: none">&nbsp;<img tabIndex="-1"
							src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></A></td>
				</tr>
				<%@include file="directBankPayment-form.jsp"%>
				<table border="0" width="100%" cellspacing="0" cellpadding="0">

					<tr>
						<td class="bluebox" width="10%"></td>
						<c:if test="%{shouldShowHeaderField('vouchernumber')}">

							<td class="bluebox" width="22%"><s:text
									name="reversalVoucherNumber" /><span class="mandatory">*</span></td>
							<td class="bluebox" width="22%"><form:input
									name="reversalVoucherNumber" id="reversalVoucherNumber" /></td>
						</c:if>
						<td class="bluebox" width="18%"><s:text
								name="reversalVoucherDate" /><span class="mandatory">*</span></td>
						<td class="bluebox" width="38%"><form:input
								name="reversalVoucherDate" id="reversalVoucherDate"
								onkeyup="DateFormat(this,this.value,event,false,'3')" /> <a
							href="javascript:show_calendar('dbpform.reversalVoucherDate');"
							style="text-decoration: none">&nbsp;<img tabIndex="-1"
								src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></A>(dd/mm/yyyy)</td>
					</tr>
				</table>
				</div>
				<%@include file="../voucher/ReverseButtons.jsp"%>
			</table>
			<div class="subheadsmallnew" /></div>
			<div class="mandatory" align="left">* Mandatory Fields</div>
			</div>
		</s:push>
	</form:form>

	<SCRIPT type="text/javascript">
 function onLoadTask_reverse() {
        if (button != null && button != "") {
				if (document.getElementById("Errors").innerHTML == '') {
				bootbox.alert(succesMessage);
						if (button == "Reverse_Close") {
							window.close();
						} else if (button == "Reverse_View") {
							var vhId = '${voucherHeader.id}';
							document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher!loadvoucherview.action?vhid="
									+ vhId;
							document.forms[0].submit();
						}
					}
				}
				else
				{
				disableControls(0,true);
				}
				document.getElementById('button').disabled=false;
				document.getElementById('Save_View').disabled=false;
				document.getElementById('Save_Close').disabled=false;
				document.getElementById('Close').disabled=false;
				//document.getElementById('reversalVouhernumber').disabled=false;
				document.getElementById('reversalVoucherDate').disabled=false;
				var revVoucherNumberObj=document.getElementById('reversalVoucherNumber');
				if(revVoucherNumberObj!=null && revVoucherNumberObj!=undefined)
				{
				revVoucherNumberObj.disabled=false;
				}
				 
			
			}

 function validateReverse() {
        form = document.getElementById("directBankPayment");
        clearErrorMessages(form);
        clearErrorLabels(form);
        var errors = false;
        var continueValidation = true;
         if (form.elements['reversalVoucherDate']) {
            field = form.elements['reversalVoucherDate'];
            var error = "Required";
            if (field.value == "") {
                addError(field, error);
                errors = true;
                
            }
        }
        if (form.elements['reversalVoucherNumber']) {
            field = form.elements['reversalVoucherNumber'];
            var error = "Required";
            if (field.value == "") {
                addError(field, error);
                errors = true;
                
            }
        }
        return !errors;
        
}

	
</SCRIPT>
</body>
</html>
