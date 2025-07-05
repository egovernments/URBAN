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
<script>
	var RECOVERYLIST = "listRemitBean";
	var recoveryTableIndex = 0;
	var totalAmount = 0;
	/**
	This is for payment page where partial amount can be entered
	*/
	
	var populateRecoveryDetailsForPayment = function() {
		var recoveryDetailColumnsNew;
		var partyNameBasedOnTdsType = {key:"partyName",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyNameLable")};
		var partyCodeBasedOnTdsType = {key:"partyCode",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyCodeLable")};
		<c:if test="%{isNonControlledCodeTds}">
			partyNameBasedOnTdsType = {key:"partyName",hidden:true,label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyNameLable")};
			partyCodeBasedOnTdsType = {key:"partyCode",hidden:true,label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyCodeLable")};
		</c:if>
		<c:if test="%{isPartialPaymentEnabled}">
		recoveryDetailColumnsNew = [ 
		                        	{key:"serialNo",label:'Sl no',formatter:createLabelSamll(RECOVERYLIST,".serialNo")},				
		                        	{key:"voucherNumber",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".voucherNumberLabel")}, 
		                        	{key:"voucherNumber",hidden:true,formatter:createHiddenField(RECOVERYLIST,".voucherNumber","hidden")}, 
		                        	{key:"voucherDate",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".voucherDateLabel")},
		                        	{key:"voucherDate",hidden:true,formatter:createHiddenField(RECOVERYLIST,".voucherDate","hidden")}, 
		                        	{key:"voucherName",hidden:true,formatter:createHiddenField(RECOVERYLIST,".voucherName","hidden")}, 
		                        	{key:"voucherName",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".voucherNameLable")},
		                        	/*{key:"partyName",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyNameLable")},*/
		                        	partyNameBasedOnTdsType,
		                        	/*{key:"partyCode",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyCodeLable")},*/
		                        	partyCodeBasedOnTdsType,
		                        	/* {key:"panNo",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".panNoLable")}, */
		                        	{key:"panNo",hidden:true,formatter:createHiddenField(RECOVERYLIST,".panNo","hidden")},       
		                        	{key:"deductionAmount",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".deductionAmount")},
		                        	{key:"partyName",hidden:true,formatter:createHiddenField(RECOVERYLIST,".partyName","hidden")}, 
		                        	{key:"earlierPayment",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".earlierPayment")},
		                        	{key:"partyCode",hidden:true,formatter:createHiddenField(RECOVERYLIST,".partyCode","hidden")}, 
		                        	{key:"detailTypeId",hidden:true,formatter:createHiddenField(RECOVERYLIST,".detailTypeId","hidden")},
		                        	{key:"detailKeyid",hidden:true,formatter:createHiddenField(RECOVERYLIST,".detailKeyid","hidden")},
		                        	{key:"chkremit",label:'Amount', formatter:createAmount(RECOVERYLIST,".partialAmount")},
		                        	{key:"remittance_gl_dtlId",hidden:true, formatter:createTextFieldFormatter1(RECOVERYLIST,".remittance_gl_dtlId","hidden")},
		                        	{key:"remittanceId",hidden:true, formatter:createTextFieldFormatter1(RECOVERYLIST,".remittanceId","hidden")},
		                        	];
		</c:if>
		<c:otherwise>
		recoveryDetailColumnsNew = [ 
		                        	{key:"serialNo",label:'Sl no',formatter:createLabelSamll(RECOVERYLIST,".serialNo")},				
		                        	{key:"voucherNumber",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".voucherNumberLabel")}, 
		                        	{key:"voucherNumber",hidden:true,formatter:createHiddenField(RECOVERYLIST,".voucherNumber","hidden")}, 
		                        	{key:"voucherDate",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".voucherDateLabel")},
		                        	{key:"voucherDate",hidden:true,formatter:createHiddenField(RECOVERYLIST,".voucherDate","hidden")}, 
		                        	{key:"voucherName",hidden:true,formatter:createHiddenField(RECOVERYLIST,".voucherName","hidden")}, 
		                        	{key:"voucherName",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".voucherNameLable")},
		                        	/*{key:"partyName",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyNameLable")},*/
		                        	partyNameBasedOnTdsType,
		                        	/*{key:"partyCode",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelLarge(RECOVERYLIST,".partyCodeLable")},*/
		                        	partyCodeBasedOnTdsType,
		                        	/* {key:"panNo",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".panNoLable")}, */
		                        	{key:"panNo",hidden:true,formatter:createHiddenField(RECOVERYLIST,".panNo","hidden")},       
		                        	{key:"detailTypeId",hidden:true,formatter:createHiddenField(RECOVERYLIST,".detailTypeId","hidden")},
		                        	{key:"detailKeyid",hidden:true,formatter:createHiddenField(RECOVERYLIST,".detailKeyid","hidden")},
		                        	/* {key:"deductionAmount",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".deductionAmount")}, */
		                        	/* {key:"earlierPayment",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelMed(RECOVERYLIST,".earlierPayment")}, */
		                        	{key:"chkremit",label:'Amount', formatter:createAmount(RECOVERYLIST,".partialAmount")},
		                        	{key:"partyName",hidden:true,formatter:createHiddenField(RECOVERYLIST,".partyName","hidden")}, 
		                        	{key:"partyCode",hidden:true,formatter:createHiddenField(RECOVERYLIST,".partyCode","hidden")}, 
		                        	{key:"remittance_gl_dtlId",hidden:true, formatter:createTextFieldFormatter1(RECOVERYLIST,".remittance_gl_dtlId","hidden")},
		                        	{key:"remittanceId",hidden:true, formatter:createTextFieldFormatter1(RECOVERYLIST,".remittanceId","hidden")}
		                        	];
		</s:else>
	
	var recoveryDetailDSNew = new YAHOO.util.DataSource();   
   	var	recoveryDetailTableNew = new YAHOO.widget.DataTable("recoveryDetailsTableNew",recoveryDetailColumnsNew, new YAHOO.util.DataSource());
   <c:forEach value="listRemitBean" status="stat">
	recoveryDetailTableNew.addRow({SlNo:recoveryDetailTableNew.getRecordSet().getLength()+1});
		var index = '${#stat.index}';
		updateLabel('serialNo',index,parseInt(index)+1);
//		bootbox.alert(""+index);
		updateLabel('voucherNumberLabel',index,'${voucherNumber}');
	//		bootbox.alert(""+index);
		updateLabel('voucherDateLabel',index,'${voucherDate}');
		//	bootbox.alert(""+index);
		updateLabel('voucherNameLable',index,'${voucherName}');
		updateLabel('partyNameLable',index,"${partyName}");
		updateLabel('partyCodeLable',index,'${partyCode}');
		/* updateLabel('panNoLable',index,'${panNo}'); */
		<c:if test="%{isPartialPaymentEnabled}">
		updateLabel('deductionAmount',index,'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		updateLabel('earlierPayment',index,'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:if>
		updateFieldValue('voucherNumber',index,'${voucherNumber}');
		updateFieldValue('voucherDate',index,'${voucherDate}');
		updateFieldValue('voucherName',index,'${voucherName}');
		updateFieldValue('partyName',index,"${partyName}");
		updateFieldValue('partyCode',index,'${partyCode}');
		updateFieldValue('panNo',index,'${panNo}');
		updateFieldValue('partialAmount',index,'<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		updateFieldValue('remittance_gl_dtlId',index,'${remittance_gl_dtlId}');
		updateFieldValue('detailTypeId',index,'${detailTypeId}');
		updateFieldValue('detailKeyid',index,'${detailKeyid}');
		updateFieldValue('remittanceId',index,'${remittanceId}');
		
		recoveryTableIndex = recoveryTableIndex +1;
		</c:forEach>
				
	
	}
	
function createHiddenField(prefix,suffix,type){
	 return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<input type='"+type+"' name='"+prefix+"["+recoveryTableIndex+"]"+suffix+"' id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"'/>";
	}
	
}
function createLabelSamll(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<label id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"'  size='4'/>";
	}
}
function createLabelMed(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<label id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"'   size='10'/>";
	}
}
function createLabelLarge(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<label id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"'  size='15'/>";
	}
}
function createTextFieldFormatter1(prefix,suffix,type){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<input type='"+type+"' id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"' name='"+prefix+"["+recoveryTableIndex+"]"+suffix+"'/>";
	}
}
function createcheckbox(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<input type='checkbox' id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"' name='"+prefix+"["+recoveryTableIndex+"]"+suffix+"' style='width:90px;'  onClick='calcTotal("+recoveryTableIndex+",this)'/>";
	}
}

function createAmount(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<input type='text' id='"+prefix+"["+recoveryTableIndex+"]"+suffix+"' name='"+prefix+"["+recoveryTableIndex+"]"+suffix+"'   style='width:90px;text-align:right' <c:if test='%{!isPartialPaymentEnabled}'>readonly='true'</c:if> onblur='calcTotalForPayment()' onkeypress='return isNumber(event)'/>";
	}
}

function updateLabel(field,index,value){
	
	document.getElementById(RECOVERYLIST+'['+index+'].'+field).innerHTML =value;
}
function updateFieldValue(field,index,value){
	
	document.getElementById(RECOVERYLIST+'['+index+'].'+field).value =value;
}
function calcTotal(index,obj){
	if(obj.checked == true){
		totalAmount = parseFloat(totalAmount) + parseFloat(document.getElementById('listRemitBean['+index+'].amount').value);
		document.getElementById('listRemitBean['+index+'].chkremit').value=true;
	}else{
		totalAmount = parseFloat(totalAmount) - parseFloat(document.getElementById('listRemitBean['+index+'].amount').value);
	}
	document.getElementById('totalAmount').value =  totalAmount.toFixed(2);
}


function calcTotalForPayment(){
 var totalAmount=0;
 var selectedDedRowForPartialPayment='';
 var selectedRows=document.getElementById('selectedRows').value.split(",");
	for(var index=0;index<recoveryTableIndex;index++){
				var partialAmt = parseFloat(document.getElementById('listRemitBean['+index+'].partialAmount').value);
				totalAmount = parseFloat(totalAmount + partialAmt);
				selectedDedRowForPartialPayment += selectedRows[index]+"~"+partialAmt+",";
		}
	console.log('selectedDedRowForPartialPayment : '+selectedDedRowForPartialPayment);
	totalAmount= totalAmount.toFixed(2);
	document.getElementById('totalAmount').value = totalAmount;
	document.getElementById("remitAmount").innerHTML=totalAmount;
	document.getElementById('remittanceForm_selectedPartialDeductionRows').value = selectedDedRowForPartialPayment;
}

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    	return false;
	}
	return true;
}


function selectAllORNone(obj){
	totalAmount=0;
	for(var index=0;index<recoveryTableIndex;index++){
		if(obj.checked == true){
			document.getElementById('listRemitBean['+index+'].chkremit').checked=true;
			document.getElementById('listRemitBean['+index+'].chkremit').value=true;
			totalAmount = parseFloat(totalAmount) + parseFloat(document.getElementById('listRemitBean['+index+'].amount').value);
		}else{
			document.getElementById('listRemitBean['+index+'].chkremit').checked=false;
		}
		
		
	}
	document.getElementById('totalAmount').value =totalAmount.toFixed(2);
}

function validateSearch()
{
	document.getElementById('lblError').innerHTML ="";
	
	if(document.getElementById('recoveryId').value==-1){
		document.getElementById('lblError').innerHTML = "Please select a recovery code";
		return false;
	}
	if(document.getElementById('voucherDate').value.trim().length == 0){
		document.getElementById('lblError').innerHTML = "Please select date";
		return false;
	}
	if(!validateMisAttributes())
	  return false;
	return true;
}


// Javascript validation of the MIS Manadate attributes.
function validateMisAttributes()
{
			<c:if test="%{isFieldMandatory('vouchernumber')}"> 
				 if(null != document.getElementById('voucherNumber') && document.getElementById('voucherNumber').value.trim().length == 0 ){

					document.getElementById('lblError').innerHTML = "Please enter a voucher number";
					return false;
				 }
			 </c:if>
		 <c:if test="%{isFieldMandatory('voucherdate')}"> 
				 if(null != document.getElementById('voucherDate') && document.getElementById('voucherDate').value.trim().length == 0){

					document.getElementById('lblError').innerHTML = "Please enter a voucher date";
					return false;
				 }
			 </c:if>
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
			return true;

}

function validateRemit(){
	var atleastOnecheque = false;
	var chkBox;
	for(var index=0;index<recoveryTableIndex;index++){
		
		chkBox =document.getElementById('listRemitBean['+index+'].chkremit');
		if(chkBox.checked)
		{
			atleastOnecheque = true;
			break;
		 }
	}
	if(atleastOnecheque == false){
		 document.getElementById('remitlblError').innerHTML = "Please Select atleast one recovery " ;
		 return false;
	}
	return true;
}
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function disableAll()
{
	console.log("remitRecoveryPayment");
	var frmIndex=0;
	for(var i=0;i<document.forms[frmIndex].length;i++)
		{
			for(var i=0;i<document.forms[0].length;i++)
				{
					if(document.forms[0].elements[i].name != 'voucherDate' && document.forms[0].elements[i].name != 'fundId'
						&& document.forms[0].elements[i].name != 'vouchermis.departmentcode' && document.forms[0].elements[i].name != 'vouchermis.function' 
						&& document.forms[0].elements[i].name != 'bank' && document.forms[0].elements[i].name != 'commonBean.accountNumberId'
						&& document.forms[0].elements[i].name != 'commonBean.availableBalance' && document.forms[0].elements[i].name != 'modeOfPayment' 
						&& document.forms[0].elements[i].name != 'remittedTo' && document.forms[0].elements[i].name != 'description'
						&& document.forms[0].elements[i].name != 'typeOfAccount' && document.forms[0].elements[i].name != 'remittanceBean.totalAmount' 
						&& document.forms[0].elements[i].name != 'selectedRows' && document.forms[0].elements[i].name != 'cutOffDate'
						&& document.forms[0].elements[i].name != 'bankBalanceCheck' && document.forms[0].elements[i].name != 'approverName' 
						&& document.forms[0].elements[i].name != 'approverDepartment' && document.forms[0].elements[i].name != 'approverDesignation'									
						&& document.forms[0].elements[i].name != 'approverPositionId' && document.forms[0].elements[i].name != 'approverComments'
						&& document.forms[0].elements[i].name != 'workFlowAction' && document.forms[0].elements[i].name != 'remittanceBean.recoveryId'
						&& document.forms[0].elements[i].name != 'selectedPartialDeductionRows'){
						document.forms[frmIndex].elements[i].disabled =true;   
					}						
				}	
		}
}
function disableRemitRecoverView()
{
	var frmIndex=0;
	for(var i=0;i<document.forms[frmIndex].length;i++)
		{
			for(var i=0;i<document.forms[0].length;i++)
				{
					if(document.forms[0].elements[i].name != 'approverPositionId' && document.forms[0].elements[i].name != 'approverComments'
						&& document.forms[0].elements[i].name != 'workFlowAction' && document.forms[0].elements[i].name != 'currentState' 
						&& document.forms[0].elements[i].name != 'paymentid' ){
						document.forms[frmIndex].elements[i].disabled =true;   
					}						
				}	
		}
	}

</script>
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

.yui-skin-sam tr.yui-dt-odd {
	background-color: #f7f7f7;
}
</style>
