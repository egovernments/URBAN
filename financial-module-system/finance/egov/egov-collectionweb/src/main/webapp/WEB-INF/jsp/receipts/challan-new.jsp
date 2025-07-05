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

<%@ include file="/includes/taglibs.jsp" %>
<%@ taglib uri="/WEB-INF/taglib/cdn.tld" prefix="cdn" %>
<head>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/challan.js?rnd=${app_release_no}"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/autocomplete-debug.js?rnd=${app_release_no}"></script>
<style type="text/css">
	#codescontainer {position:absolute;left:11em;width:9%;text-align: left;}
	#codescontainer .yui-ac-content {position:absolute;width:350px;border:1px solid #404040;background:#fff;overflow:hidden;z-index:9050;}
	#codescontainer .yui-ac-shadow {position:absolute;margin:.3em;width:300px;background:#a0a0a0;z-index:9049;}
	#codescontainer ul {padding:5px 0;width:100%;}
	#codescontainer li {padding:0 5px;cursor:default;white-space:nowrap;}
	#codescontainer li.yui-ac-highlight {background:#ff0;}
	#codescontainer li.yui-ac-prehighlight {background:#FFFFCC;}
#subledgercodescontainer {position:absolute;left:11em;width:9%;text-align: left;}
	#subledgercodescontainer .yui-ac-content {position:absolute;width:350px;border:1px solid #404040;background:#fff;overflow:hidden;z-index:9050;}
	#subledgercodescontainer .yui-ac-shadow {position:absolute;margin:.3em;width:300px;background:#a0a0a0;z-index:9049;}
	#subledgercodescontainer ul {padding:5px 0;width:100%;}
	#subledgercodescontainer li {padding:0 5px;cursor:default;white-space:nowrap;}
	#subledgercodescontainer li.yui-ac-highlight {background:#ff0;}
	#subledgercodescontainer li.yui-ac-prehighlight {background:#FFFFCC;}
	th.yui-dt-hidden,
tr.yui-dt-odd .yui-dt-hidden,
tr.yui-dt-even .yui-dt-hidden
 {
display:none;
}
</style>
<script type="text/javascript">
function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
	}
	
jQuery.noConflict();
jQuery(document).ready(function() {

     jQuery(" form ").submit(function( event ) {
    	 doLoadingMask();
    });
     var nowTemp = new Date();
     var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

      jQuery( "#challanDate").datepicker({ 
     	 format: 'dd/mm/yyyy',
     	 endDate: nowTemp, 
     	 autoclose:true,
         onRender: function(date) {
      	    return date.valueOf() < now.valueOf() ? 'disabled' : '';
      	  }
       }).on('changeDate', function(ev) {
     	  var date=jQuery(this).val();
     	  var cutOff = jQuery("#cutOffDate").val();
     	 if(process(date) >= process(cutOff))
     		jQuery("#approvedet").show();
     	 else
     		jQuery("#approvedet").hide();
     	 
     	  if(!(date.indexOf("_") > -1)){
     		  isDatepickerOpened=false; 
     	  }
       }).data('datepicker');
     doLoadingMask();
 });

jQuery(window).load(function () {
	undoLoadingMask();
});

 
path="${pageContext.request.contextPath}";
<jsp:useBean id="now" class="java.util.Date" />

<fmt:formatDate var = "currDate" pattern="dd/MM/yyyy" value="${now}" />
var currDate = "${currDate}";

function onBodyLoad(){
	<c:if test="%{model.id!=null}">
		if(document.getElementById('challanDate').value!=""){
			document.getElementById("challanDate").disabled=true;
		}
	</c:if>
	
	if(document.getElementById('challanDate').value==""){
		document.getElementById("challanDate").value=currDate;
	}
	
	if('${designationId}'!=null && '${designationId}'!="")
	{
		onChangeDesignation('${designationId}');
	}
	loadDropDownCodes();
	loadDropDownCodesFunction();
	loadFinancialYearList();
	
	check();
	
	if(dom.get("deptId")!=null){
		document.getElementById('deptId').disabled=true;
	}
	
	// page has to be disabled when view through search option/ when challan has to be modified -->
	<c:if test="%{sourcePage=='search' || (model.id!=null && model.challan.state.value=='CREATED' && sourcePage!='inbox')}">
			setAsViewPage();
	</c:if>
	return true;
}

function setAsViewPage(){
	var el = document.forms[0].elements;
	
	// disable all elements except the workflow action buttons, print button and close button
	for(var i=0;i<el.length;i++){
	
		if(el[i].name!='method:save'){
		
			el[i].setAttribute('disabled',true);
		}
		if(dom.get("buttonprint")!=null){
			document.getElementById('buttonprint').disabled=false;
			document.getElementById('buttonclose2').disabled=false;		
		}
	
	}
	 
	<c:if test="%{sourcePage=='inbox' && model.challan.state.value=='APPROVED'}">
	if(document.getElementById('receiptMisc.fund.id')!=null)
		document.getElementById('receiptMisc.fund.id').disabled=false;
		 for(var i=0;i<billDetailTableIndex+1;i++)
	{
		if(null != document.getElementById('billDetailslist['+i+'].accounthead')){
			document.getElementById('billDetailslist['+i+'].accounthead').disabled=false;
			document.getElementById('billDetailslist['+i+'].glcodeIdDetail').disabled=false;
		}
	}
	  for (var j=0; j<slDetailTableIndex+1; j++ )
		{
			if(document.getElementById('subLedgerlist['+j+'].glcode.id')!=null){
				document.getElementById('subLedgerlist['+j+'].glcode.id').disabled=false;
				document.getElementById('subLedgerlist['+j+'].detailType.id').disabled=false;
				document.getElementById('subLedgerlist['+j+'].detailCode').disabled=false;
				document.getElementById('subLedgerlist['+j+'].detailKey').disabled=false;
				document.getElementById('subLedgerlist['+j+'].detailTypeName').disabled=false;
				document.getElementById('subLedgerlist['+j+'].detailKeyId').disabled=false;
			}
		}
	</c:if>
	//document.getElementById('calendarLink').style.display="none";
	document.getElementById('receiptId').disabled=false;
	document.getElementById('actionName').disabled=false;
	document.getElementById('sourcePage').disabled=false;
	<c:if test="%{sourcePage=='inbox'}"> 
	if(document.getElementById('approvalRemarks')!=null)
		document.getElementById('approvalRemarks').disabled=false;
	if(document.getElementById('designationId')!=null)
		document.getElementById('designationId').disabled=false;
	if(document.getElementById('approverDeptId')!=null)
		document.getElementById('approverDeptId').disabled=false;
	if(document.getElementById('positionUser')!=null)
		document.getElementById('positionUser').disabled=false;	
	if(document.getElementById('buttonverify')!=null)
		document.getElementById('buttonverify').disabled=false;
	if(document.getElementById('buttonreject')!=null)
		document.getElementById('buttonreject').disabled=false;
	</c:if>
}


function validate(obj){
	var actionname=document.challan.actionName.value;
	var valid=true;
	dom.get("challan_error_area").style.display="none";
	document.getElementById("challan_error_area").innerHTML="";
 	if(dom.get("actionErrors")!=null)
 	{
		dom.get("actionErrors").style.display="none";
	}
	if(dom.get("actionMessages")!=null)
	{
		dom.get("actionMessages").style.display="none";
	}
		
	//validations for challan approval
	if(actionname=="CHALLAN_CHECK" || actionname=="CHALLAN_APPROVE" || actionname=="CHALLAN_REJECT")
	{
		if(obj.value=="Reject Challan")
		{
			if(dom.get("approvalRemarks").value.trim().length==0)
			{
				document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
				valid=false;
			}
		}
	}
	//validations for challan cancel
	else if(actionname=="CHALLAN_CANCEL"){
		if(obj.value=="Cancel Challan")
		{
			if(dom.get("challan.reasonForCancellation").value.trim().length==0)
			{
				document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
				valid=false;
			}
		}
	}
	//validations for challan create/modify
	else{
	 	if(null != document.getElementById('challanDate') && document.getElementById('challanDate').value.trim().length == 0){
			document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
			valid=false;
		}
	 	 if(null != document.getElementById('payeeName') && document.getElementById('payeeName').value == ""){

             document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
             valid=false;
         }
	 	 if(null != document.getElementById('serviceCategoryId') && document.getElementById('serviceCategoryId').value == -1){

             document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
             valid=false;
         }
         if(null != document.getElementById('serviceId') && document.getElementById('serviceId').value == -1){

             document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
             valid=false;
         }
		 
		 <c:if test="%{isFieldMandatory('fund')}"> 
	 	 	if(null != document.getElementById('receiptMisc.fund.id') && document.getElementById('receiptMisc.fund.id').value == -1){
				document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+  "<br>";
				valid=false;
		 	}
		</c:if>
		<c:if test="%{isFieldMandatory('department')}"> 
			 if(null!= document.getElementById('deptId') && document.getElementById('deptId').value == -1){
					document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ '<br>';
					valid=false;
			 }
		</c:if>
		 <c:if test="%{isFieldMandatory('function')}">                     
		 if(null!= document.getElementById('functionId') && document.getElementById('functionId').value == -1){
			 document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ '<br>';                                
			valid=false;
		 }            
		</c:if>
		 var chlndate=document.getElementById("challanDate").value;
    	 var cutOff = document.getElementById("cutOffDate").value;
		if(process(chlndate) >= process(cutOff) && null!= document.getElementById('approverDeptId') && document.getElementById('approverDeptId').value == "-1"){
			document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
			valid=false;
		}
		
		if(process(chlndate) >= process(cutOff) && null!= document.getElementById('designationId') && document.getElementById('designationId').value == "-1"){
			document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
			valid=false;
		}
		
		if(process(chlndate) >= process(cutOff) && null!= document.getElementById('positionUser') &&  document.getElementById('positionUser').value == "-1"){
			document.getElementById("challan_error_area").innerHTML+='<!-- TODO: Manual migration required for custom Struts tag -->'+ "<br>";
			valid=false;
		}
		
		if(!validateAccountDetail()){
			valid=false;
		}
		if(!validateSubLedgerDetail()){
			valid=false;
		}
		
	}
	if(valid==false){
			dom.get("challan_error_area").style.display="block";
			window.scroll(0,0);
	}
	else{
	var elems = document.forms[0].elements;
		for(var i=0;i<elems.length;i++){
			elems[i].disabled=false;
		}
		doLoadingMask('#loadingMask');
	}

	return valid;
	
}

function checkreset(){
	document.forms[0].reset();
	dom.get("challan_error_area").style.display="none";
	if(dom.get("actionErrors")!=null){
		dom.get("actionErrors").style.display="none";}
	if(dom.get("actionMessages")!=null){
		dom.get("actionMessages").style.display="none";}
	document.getElementById("challanDate").value=currDate;
	if(dom.get("receiptMisc.fund.id")!=null){
	document.getElementById("receiptMisc.fund.id").selectedIndex = 0;
	}
	if(dom.get("referencenumber")!=null){
		document.getElementById("referencenumber").value="";
	}
	document.getElementById("totalcramount").value=0;
	//document.getElementById("totaldbamount").value=0;
	resetTables('${%{currentFinancialYearId}}');
}



function loadFinancialYearList(){
var fYear=new Array();
var fcount=0;
	<c:forEach value="%{billDetailslist}">
		fYear[fcount]='${financialYearId}';
		fcount++;
	</c:forEach>
	for(var i=0;i<billDetailTableIndex+1;i++){
		if(null != document.getElementById('billDetailslist['+i+'].glcodeDetail')){
			var selectedyearid=fYear[i];
			var obj=document.getElementById('billDetailslist['+i+'].financialYearId');
			for(var k=0;k<obj.options.length;k++){
					if(obj.options[k].value==selectedyearid){
						obj.options[k].selected=true;
					}
			}
		}
	}
	
}

var totalcramt=0;
var totaldbamt=0;
var fYearOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.financialYearList">
	    fYearOptions.push({label:'${finYearRange}', value:'${id}'})
	</c:forEach>
var makeBillDetailTable = function() {
		var billDetailColumns = [ 
			{key:"accounthead", label:'Account Head <span class="mandatory"/>',formatter:createLongTextFieldFormatter(VOUCHERDETAILLIST,".accounthead",VOUCHERDETAILTABLE)},				
			{key:"glcode",label:'Account Code ', formatter:createTextFieldFormatter(VOUCHERDETAILLIST,".glcodeDetail","text",VOUCHERDETAILTABLE)},
			{key:"creditamount",label:'Amount (Rs.)', formatter:createAmountFieldFormatter(VOUCHERDETAILLIST,".creditAmountDetail","updateCreditAmount()",VOUCHERDETAILTABLE)},
			{key:"financialYearId",label:'Financial Year <span class="mandatory"/>', formatter:createDropdownFormatterFYear(VOUCHERDETAILLIST,'${%{currentFinancialYearId}}'),  dropdownOptions:fYearOptions},
			{key:'Add',label:'Add',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Delete',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")},
			{key:"glcodeid",hidden:true, formatter:createTextFieldFormatter(VOUCHERDETAILLIST,".glcodeIdDetail","hidden",VOUCHERDETAILTABLE)},
			{key:"functionid",hidden:true,formatter:createTextFieldFormatter(VOUCHERDETAILLIST,".functionIdDetail","hidden")}
		];
		
	    var billDetailDS = new YAHOO.util.DataSource(); 
		billDetailsTable = new YAHOO.widget.DataTable("billDetailTable",billDetailColumns, billDetailDS);
		
		<c:if test="%{sourcePage=='search' || (model.id!=null && model.challan.state.value=='CREATED') || (sourcePage=='inbox' && model.challan.state.value!='REJECTED')}">
			var addColumn = billDetailsTable.getColumn(5);
			billDetailsTable.hideColumn(addColumn);
			var delColumn = billDetailsTable.getColumn(6);
			billDetailsTable.hideColumn(delColumn);
		</c:if>
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
						updateCreditAmount();
						// updateDebitAmount();
						updatetotalAmount();
						check();
					}
					else{
						bootbox.alert("This row can not be deleted");
					}
				}
					 
		});
		<c:forEach value="billDetailslist" status="stat">
				billDetailsTable.addRow({SlNo:billDetailsTable.getRecordSet().getLength()+1,
					"glcodeid":'${glcodeIdDetail}',
					"glcode":'${glcodeDetail}',
					"accounthead":'${accounthead}',
					"creditamount":'${getText(\'format.amount\',{creditAmountDetail})}',
					"financialYearId":'${%{fYear}}'
				});
				var index = '${#stat.index}';
				updateGrid(VOUCHERDETAILLIST,'glcodeIdDetail',index,'${glcodeIdDetail}');
				updateGrid(VOUCHERDETAILLIST,'glcodeDetail',index,'${glcodeDetail}');
				updateGrid(VOUCHERDETAILLIST,'accounthead',index,'${accounthead}');
				updateGrid(VOUCHERDETAILLIST,'creditAmountDetail',index,'${getText(\'format.amount\',{creditAmountDetail})}');
				updateGridDropdown('financialYearId',index,'${finYearRange}','${id}');
				totalcramt = totalcramt+parseInt('${getText(\'format.amount\',{creditAmountDetail})}');
				// totaldbamt = totaldbamt+parseFloat('${debitAmountDetail}');
				updateAccountTableIndex();	
			</c:forEach>
				
	
		var tfoot = billDetailsTable.getTbodyEl().parentNode.createTFoot();
		var tr = tfoot.insertRow(-1);
		var td1 = tr.insertCell(-1);
		td1.align="center";
		td1.colSpan = 3;
		td1.setAttribute('class','tdfortotal');
		td1.style.textAlign="right";
		td1.style.borderTop = '1px #c8c8c8 solid';
		td1.innerHTML='<b>Total</b>&nbsp;&nbsp;&nbsp;';
		td1.className='tdfortotal';
		var td2 = tr.insertCell(-1);
		td2.width="100";
		td2.height="32";
		td2.align="center";
		td2.style.borderTop = '1px #c8c8c8 solid';
		td2.setAttribute('class','tdfortotal');
		td2.className='tdfortotal';
		td2.style.padding='4px 10px';
		td2.innerHTML="<input type='text' style='text-align:right;width:80px;align:center;height:20px;'  id='totalcramount' name='totalcramount' readonly='true' tabindex='-1'/>";
		if(totalcramt>0){
			totalcramt=totalcramt;
		}
		document.getElementById('totalcramount').value=totalcramt;
		// var td3 = tr.insertCell(-1);
		// td3.width="100";
		// td3.height="32";
		// td3.align="center";
		// td3.style.borderTop = '1px #c8c8c8 solid';
		// td3.setAttribute('class','tdfortotal');
		// td3.className='tdfortotal';
		// td3.style.padding='4px 10px';
		// td3.innerHTML="<input type='text' style='text-align:right;width:80px;align:center;height:20px;'  id='totaldbamount' name='totaldbamount' readonly='true' tabindex='-1'/>";
		// document.getElementById('totaldbamount').value=totaldbamt;
		<c:if test="%{sourcePage=='search' || (model.id!=null && model.challan.state.value=='CREATED') || (sourcePage=='inbox' && model.challan.state.value!='REJECTED')}">
			var td4 = tr.insertCell(-1);
			td4.style.borderTop = '1px #c8c8c8 solid';
			td4.setAttribute('class','tdfortotal');
			td4.className='tdfortotal';
			td4.innerHTML='&nbsp;';
		</c:if>
	<c:otherwise>
		var td4 = tr.insertCell(-1);
		td4.colSpan = 4;
		td4.style.borderTop = '1px #c8c8c8 solid';
		td4.setAttribute('class','tdfortotal');
		td4.className='tdfortotal';
		td4.innerHTML='&nbsp;';
		</s:else>
	}//end of makeBillDetailTable
	
		
	var glcodeOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.glcodeList">
	    glcodeOptions.push({label:'${glcode}', value:'${id}'})
	</c:forEach>
	var detailtypeOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.detailTypeList">
	    detailtypeOptions.push({label:'${name}', value:'${id}'})
	</c:forEach>
	var detailCodeOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.detailCodeList">
	    detailtypeOptions.push({label:'${name}', value:'${id}'})
	</c:forEach>
	var makeSubLedgerTable = function() {
		var subledgerColumns = [ 
		            			
			{key:"glcode.id",label:'Account Code <span class="mandatory"/>', formatter:createDropdownFormatterCode(SUBLEDGERLIST,"loaddropdown(this)"),  dropdownOptions:glcodeOptions},
            {key:"detailType.id",label:'Type <span class="mandatory"></span>', formatter:createDropdownFormatterDetail(SUBLEDGERLIST),dropdownOptions:detailtypeOptions},
			{key:"detailCode",label:'Code <span class="mandatory"/>',formatter:createSLDetailCodeTextFieldFormatter(SUBLEDGERLIST,".detailCode","splitEntitiesDetailCode(this)")},
			{key:"detailKey",label:'Name', formatter:createSLLongTextFieldFormatter(SUBLEDGERLIST,".detailKey","")},
			{key:"amount",label:'Amount (Rs.)', formatter:createSLAmountFieldFormatter(SUBLEDGERLIST,".amount")},
			{key:"glcode",hidden:true, formatter:createSLHiddenFieldFormatter(SUBLEDGERLIST,".subledgerCode")},
			{key:"detailTypeName",hidden:true, formatter:createSLHiddenFieldFormatter(SUBLEDGERLIST,".detailTypeName")},
			{key:"detailKeyId",hidden:true, formatter:createSLHiddenFieldFormatter(SUBLEDGERLIST,".detailKeyId")}
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
					"glcode":'${subledgerCode}',
					"glcode.id":'${glcode.id}',
					"detailType.id":'${detailType.id}',
					"detailTypeName":'${detailTypeName}',
					"detailCode":'${detailCode}',
					"detailKeyId":'${detailKey}',
					"detailKey":'${detailKey}',
					"creditAmount":'${%{creditAmount}}'
				});
				var index = '${#stat.index}';
				updateGridSLDropdown('glcode.id',index,'${glcode.id}','${subledgerCode}');
				 setTimeout(function(){
					updateGridSLDropdown('detailType.id',index,'${detailType.id}','${detailTypeName}');
				 }, 1000);
				updateSLGrid('detailCode',index,'${detailCode}');
				updateSLGrid('detailKeyId',index,'${detailKeyId}');
				updateSLGrid('detailKey',index,'${detailKey}');
				updateSLGrid('amount',index,'${amount}');
				updateSLTableIndex();
			</c:forEach>
		
	}

function onChangeDesignation(designationId)
{
	 var approverDeptId;
	 if(document.getElementById('approverDeptId')){
	  approverDeptId=document.getElementById('approverDeptId').value;
	 }
	if(document.getElementById('positionUser')){
		populatepositionUser({designationId:designationId,approverDeptId:approverDeptId});
	}
}
function onChangeDeparment(approverDeptId)
{
	var receiptheaderId='${model.id}';
	if(document.getElementById('designationId')){
		populatedesignationId({approverDeptId:approverDeptId,receiptheaderId:receiptheaderId});
	}
}

function openVoucherSearch(){
	window.open ("/services/EGF/voucher/voucherSearch-beforesearch.action","VoucherSearch","resizable=yes,scrollbars=yes,top=40, width=900, height=650");
}
function populatepositionuseronload()
{
	if(document.getElementById('positionUser')){
		document.getElementById('positionUser').value='${positionUser}';
	}	
}



</script>
<title><!-- TODO: Manual migration required for custom Struts tag -->
</title>
</head>

<body onload="onBodyLoad();window.setTimeout('populatepositionuseronload()', 2000);" ><br>
<div class="errorstyle" id="challan_error_area" style="display:none;"></div>
<div class="formmainbox">
<c:if test="%{hasErrors()}">
    <div id="actionErrors" class="errorstyle">
      <!-- TODO: Manual migration required for custom Struts tag -->
      <!-- TODO: Manual migration required for custom Struts tag -->
    </div>
</c:if>
<c:if test="%{hasActionMessages()}">
    <div id="actionMessages" class="messagestyle" align="center">
    	<!-- TODO: Manual migration required for custom Struts tag -->
    </div>
    <div class="blankspace">&nbsp;</div>
</c:if>

<form:form theme="simple" name="challan">
<!-- TODO: Manual migration required for custom Struts tag -->
<!-- TODO: Manual migration required for custom Struts tag -->

<div class="subheadnew">
<c:if test="%{model.id==null}" >
	<!-- TODO: Manual migration required for custom Struts tag -->
</c:if>
<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
</s:elseif>
<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
</s:elseif>
<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
</s:elseif>
<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
</s:elseif>
<c:otherwise>
	<!-- TODO: Manual migration required for custom Struts tag -->
</s:else>
</div>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr><td>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<c:if test="%{model.id!=null}" >
	<tr>
	 	<td width="4%" class="bluebox2">&nbsp;</td>
	    	<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
	    	<td width="24%" class="bluebox2"><form:input path="challan.challanNumber" id="challan.challanNumber" value="%{challan.challanNumber}" readonly="true"/></td>
	     	<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
	    	<td width="24%" class="bluebox2"><form:input path="challan.status.description" id="challan.status.description" value="%{challan.status.description}" readonly="true"/></td>
	</tr>
</c:if>
<tr>
	      <td width="4%" class="bluebox">&nbsp;</td>
	     <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory"/></td>
	      		  <!-- TODO: Manual migration required for custom Struts tag -->
	      <td width="24%" class="bluebox">
	      		<form:input id="challanDate" path="challan.challanDate" value="%{cdFormat}" data-inputmask="'mask': 'd/m/y'"/><div>(DD/MM/YYYY)</div>
	      </td>
	        
   		<c:if test="%{shouldShowHeaderField('billNumber')}">
   			<td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
			<td width="30%" class="bluebox"><form:input path="referencenumber" id="referencenumber" value="%{referencenumber}"  maxlength="50"/></td>
   		</c:if>
   		<c:otherwise>
   			<td width="21%" class="bluebox">&nbsp;</td>
   			<td width="30%" class="bluebox">&nbsp;</td>
   		</s:else>
 		
	    </tr>
	    <tr> <td width="4%" class="bluebox2">&nbsp;</td>
	    <td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory"/></td>
	    <td width="24%" class="bluebox2"><form:input path="payeeName" id="payeeName" value="%{payeeName}" maxlength="49"/></td>
	     <td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
	    <td width="24%" class="bluebox2"><form:textarea path="payeeAddress" id="payeeAddress" value="%{payeeAddress}" cols="18" rows="1" maxlength="255" onkeyup="return ismaxlength(this)"/></td>
	    </tr>
	  <tr> 
	      	<td width="4%" class="bluebox">&nbsp;</td>
		    <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
		    <td width="24%" class="bluebox"><form:textarea path="referenceDesc" id="referenceDesc" value="%{referenceDesc}" cols="18" rows="1" maxlength="125" onkeyup="return ismaxlength(this)"/></td>
	    </tr>
	    <tr>
        <td width="4%" class="bluebox">&nbsp;</td>
         
        <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory"/> </td>
        <td width="30%" class="bluebox"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="serviceCategoryId" id="serviceCategoryId" cssClass="selectwk" list="dropdownData.serviceCategoryList" listKey="id" listValue="name" value="%{serviceCategoryId}" onChange="populateService(this);" />
       	<egov:ajaxdropdown id="service" fields="['Text','Value']" dropdownId="serviceId" url="receipts/ajaxReceiptCreate-ajaxLoadServiceByCategoryForChallan.action" /></td>
        <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory"/> </td>
        <td width="30%" class="bluebox"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="serviceId" id="serviceId" cssClass="selectwk"
			list="dropdownData.serviceList" listKey="id" listValue="code" value="%{serviceId}" onchange="loadFinDetails(this);"/>
        </td>
         
       
        </tr>
        
	    <c:if test="%{shouldShowHeaderField('fund') || shouldShowHeaderField('department')}">
	     <tr>
	      <td width="4%" class="bluebox2">&nbsp;</td>
	       <c:if test="%{shouldShowHeaderField('fund')}">
	      		<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --><c:if test="%{isFieldMandatory('fund')}"><span class="mandatory"/></c:if></td>
		  		<td width="24%" class="bluebox2"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="receiptMisc.fund" id="receiptMisc.fund.id" cssClass="selectwk"  list="dropdownData.fundList" listKey="id" listValue="name" value="%{receiptMisc.fund.id}" /> </td> 
		   </c:if>
		  <c:otherwise>
  			<td class="bluebox2" colspan="2"></td>
  			</s:else>
  			  <c:if test="%{shouldShowHeaderField('department')}">
		   <td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --><c:if test="%{isFieldMandatory('department')}"><span class="mandatory"/></c:if></td>
		  <td width="24%" class="bluebox2"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="deptId" id="deptId" cssClass="selectwk" list="dropdownData.departmentList" listKey="id" listValue="name"  /> </td>
	       </c:if>
		   <c:otherwise>
  			<td class="bluebox2" colspan="2"></td>
  			</s:else>
	     </tr>
	     </c:if>
	      <c:if test="%{shouldShowHeaderField('function')}">
         <tr>
         <c:if test="%{shouldShowHeaderField('function')}">
         <td width="4%" class="bluebox">&nbsp;</td>
           <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><c:if test="%{isFieldMandatory('function')}"><span class="bluebox"><span class="mandatory"/></c:if></td>
          <td width="24%" class="bluebox"><form:select headerKey="-1" headerValue="%{getText('miscreceipt.select')}" path="functionId" id="functionId" cssClass="selectwk" list="dropdownData.functionList" listKey="id" listValue="name"  /> </td>
            </c:if>
           <c:otherwise>
            <td colspan=2 class="bluebox"></td>
            </s:else>
         </tr>
         </c:if>
		  <c:if test="%{shouldShowHeaderField('field')}">
		   <tr>
		    <td width="4%" class="bluebox">&nbsp;</td>
		    <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><c:if test="%{isFieldMandatory('field')}"><span class="mandatory"/></c:if>  </td>
		    <td width="30%" class="bluebox"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="boundaryId" id="boundaryId" cssClass="selectwk" list="dropdownData.fieldList" listKey="id" listValue="name" /></td>
		    <td class="bluebox" colspan="2"></td>
  		 </tr>
	     </c:if>
	      <c:if test="%{shouldShowHeaderField('service')}">
	     <tr>
	      <td width="4%" class="bluebox2">&nbsp;</td>
	      <td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
		  <td width="30%" class="bluebox2"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="challan.service" id="challan.service" cssClass="selectwk" list="dropdownData.serviceList" listKey="id" listValue="serviceName" value="%{challan.service.id}" onchange="getAccountDetails(this);getServiceMISDetails(this);" /></td>
		     <td width="21%" class="bluebox2" colspan="2"></td>
	    </tr>
	     </c:if>
	   
</table>
</td></tr>

 <tr><td>
    
	<div class="subheadsmallnew"><span class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></span></div>
	
	<div class="yui-skin-sam" align="center">
       <div id="billDetailTable"></div>
       
     </div>
     <script>
		
		makeBillDetailTable();
		document.getElementById('billDetailTable').getElementsByTagName('table')[0].width="100%";
	 </script>
	 <div id="codescontainer"></div>
	 <br/>
	 <div class="subheadsmallnew"><span class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></span></div>
	
	 	
		<div class="yui-skin-sam" align="center">
	       <div id="subLedgerTable"></div>
	     </div>
		<script>
			
			makeSubLedgerTable();
			
			document.getElementById('subLedgerTable').getElementsByTagName('table')[0].width="100%";
		</script>
 <div id="subledgercodescontainer"></div>
	 </td>
</tr>
</table>
<br>

<!-- Change to Manual WorkFlow on Create Challan-->
 <!-- When request is to check/approve challan -->
	<table id="approvedet" width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr><td> 
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	    <!-- Remarks have to displayed on Challan Check/Approve. -->
		<c:if test="%{sourcePage=='inbox' && (model.challan.state.value=='CREATED' || model.challan.state.value=='CHECKED')}">
		<tr>
		   <td width="4%" class="bluebox">&nbsp;</td>
		   <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
		   <td width="75%" class="bluebox" colspan="3"><form:input id="approvalRemarks" type="text" path="approvalRemarks" cssStyle="width:75%" /></td>
		</tr>
		</c:if>
		<!-- Reason For Cancellation has to be displayed for Challan CANCEL	 -->
		<c:if test="%{(sourcePage=='inbox' && model.challan.state.value=='REJECTED') || (actionName=='CHALLAN_MODIFY' && hasErrors())}">
			<tr>
			   <td width="4%" class="bluebox">&nbsp;</td>
			   <td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
			   <td width="75%" class="bluebox" colspan="3"><form:input type="text" id="challan.reasonForCancellation" path="challan.reasonForCancellation" value="%{challan.reasonForCancellation}" cssStyle="width:75%" /></td>
			</tr>
		</c:if>
		<!--  Designation and Position has to be displayed for Challan Create/Check/Modify -->
		<!--  Designation and Position should not be displayed when invoked from search -->
		<c:if test="%{model.id==null || (model.challan.state.value=='REJECTED' || model.challan.state.value=='CHECKED')}">
		<tr> 
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		 </tr>
		<tr>
			<td width="4%" class="bluebox2">&nbsp;</td>
			<td width="15%" class="bluebox2"> Approver Department <c:if test="%{model.id==null}"><span class="mandatory"/></c:if></td>
			<td width="20%" class="bluebox2"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="approverDeptId" id="approverDeptId" cssClass="selectwk" list="dropdownData.approverDepartmentList" listKey="id" listValue="name" value="%{approverDeptId}"
onChange="onChangeDeparment(this.value)" /> 
		<egov:ajaxdropdown id="designationIdDropdown" fields="['Text','Value']" dropdownId='designationId'
			         url='receipts/ajaxChallanApproval-approverDesignationList.action' selectedValue="%{designationId}"/>
			</td>

			
		      	<td width="15%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --><c:if test="%{model.id==null}"><span class="mandatory"/></c:if></td>
			  <td width="20%" class="bluebox2"><form:select headerKey="-1" headerValue="%{getText('challan.select')}" path="designationId" id="designationId" cssClass="selectwk"  list="dropdownData.designationMasterList" listKey="id" listValue="name" value="%{designationId}" onChange="onChangeDesignation(this.value)"/>
			  <egov:ajaxdropdown id="positionUserDropdown" fields="['Text','Value']" dropdownId='positionUser'
			         url='receipts/ajaxChallanApproval-positionUserList.action' selectedValue="%{position.id}"/>	 
			 </td>
			 <td width="15%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --><c:if test="%{model.id==null}"><span class="mandatory"/></c:if></td>
				<td width="20%" class="bluebox2">
					<form:select headerValue="%{getText('challan.select')}"  headerKey="-1"
	                list="dropdownData.postionUserList" listKey="position.id" id="positionUser" listValue="position.name"
	                label="positionUser" name="positionUser" value="%{positionUser}"/>
				</td>
		</tr>
		</c:if>
	</table>
	</td></tr>
	</table>
<div id="loadingMask" style="display:none;overflow:hidden;text-align: center"><img src="/services/collection/resources/images/bar_loader.gif"/> <span style="color: red">Please wait....</span></div>

<div align="left" class="mandatorycoll"><!-- TODO: Manual migration required for custom Struts tag --> </div>
<!-- </div> -->
	<input type="hidden" name="actionName" id="actionName" value="{actionName}" />
	<!-- TODO: Manual migration required for custom Struts tag -->
    <!-- TODO: Manual migration required for custom Struts tag -->
	 <div class="buttonbottom" align="center" id="printButton">
		<!-- Action Buttons should be displayed only in case of Create New Challan or 
		     If page is opened from inbox -->
			<c:if test="%{model.id==null || (sourcePage=='inbox' && !hasActionMessages()) || (actionName=='CHALLAN_MODIFY' && hasErrors()) || (actionName=='CHALLAN_VALIDATE' && hasErrors())}" >
			<c:forEach value="%{validActions}">
				<!-- TODO: Manual migration required for custom Struts tag -->
		    </c:forEach>	
	    </c:if>
	   
	     &nbsp;
	    <c:if test="%{model.id==null}" >
	    	<input name="button" type="button" class="button" id="button" value="Reset" onclick="checkreset();"/>
	    </c:if>
	    <c:if test="%{model.id!=null}" >
				
				<!-- TODO: Manual migration required for custom Struts tag --> 			
	    </c:if>
	    &nbsp;<input name="button" type="button" class="button" id="buttonclose2" value="Close" onclick="window.close();" />
    </div>
   
   	<!-- TODO: Manual migration required for custom Struts tag -->
   	<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
</s:push>
</form:form>
</div>
<script src="<cdn:url value='/resources/global/js/egov/inbox.js?rnd=${app_release_no}' context='/services/egi'/>"></script>
</body>

