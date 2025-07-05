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

<SCRIPT type="text/javascript">
		var selectedname;
		var childName;
		var extendCount=0;
		var res;
		var makeFDTable = function(objTable) {                   
    	var fixedDepositTableColumns = [ 
			{key:"SlNo",label:'Sl No',width:30},
			{key:"id",label:'id',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".id","hidden")},
			{key:"fileNo",label:'File Number',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".fileNo","text")},
			{key:"amount",label:'Amount Of Deposit',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".amount","text")},
			{key:"date",label:'Date Of Deposit<br />(dd/mm/yyyy)',width:100, formatter:createDateFieldFormatter('FDtable',FDLIST,".date","text")},
			{key:"bankBranch",label:'Bank and Branch',width:100,formatter:createBankBranchDropDownFormatter('FDtable',FDLIST,".bankBranch.id","text")},
			{key:"bankAccount",label:'Bank Account',width:100,formatter:createBankAccountDropDownFormatter('FDtable',FDLIST,".bankAccount.id","text")},
			//{key:"bankAccountList",label:'bankAccountList',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".bankAccountList","hidden")},
			//{key:"refNumber",label:'refrenceNumber',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".referenceNumber","hidden")},
			{key:"interestRate",label:'Rate Of Interest',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".interestRate","text")},
			{key:"period",label:'Period Of Deposit',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".period","text")},
			{key:"serialNumber",label:'FixedDeposit SerialNumber',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".serialNumber","text")},
			{key:"GJVvhid",label:'GJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".outFlowVoucher.id","hidden")},
			{key:"outFlowVoucher",label:'GJV Number',width:100, formatter:createTextFieldFormatterImg('FDtable',FDLIST,".outFlowVoucher.voucherNumber","text")},
			{key:"GJVDate",label:'Date',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".outFlowVoucher.voucherDate","text")},
			{key:"gjvAmount",label:'GJV Amount',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".gjvAmount","text")},
			{key:"maturityAmount",label:'Maturity Amount',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".maturityAmount","text")},
			{key:"maturityDate",label:'Maturity Date<br />(dd/mm/yyyy)',width:100, formatter:createDateFieldFormatter('FDtable',FDLIST,".maturityDate","text")},
			{key:"withdrawalDate",label:'Withdrawal Date <br />(dd/mm/yyyy)',width:100, formatter:createDateFieldFormatter('FDtable',FDLIST,".withdrawalDate","text")},
			{key:"receiptGJVvhid",label:'receiptGJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".inFlowVoucher.id","hidden")},
			{key:"inFlowVoucher",label:'InFlow VoucherNumber',width:100, formatter:createTextFieldFormatterImg('FDtable',FDLIST,".inFlowVoucher.voucherNumber","text")},
			{key:"receiptGJVDate",label:'Date',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".inFlowVoucher.voucherDate","text")},
			{key:"challanvhid",label:'receiptGJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".challanReceiptVoucher.id","hidden")},
			{key:"challanGJV",label:'Challan Number',width:100, formatter:createTextFieldFormatterImg('FDtable',FDLIST,".challanReceiptVoucher.voucherNumber","text")},
			{key:"receiptGJVDate",label:'Date',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".challanReceiptVoucher.voucherDate","text")},
			{key:"receiptAmount",label:'Receipt Amount',width:100, formatter:createTextFieldFormatterWithStyle('FDtable',FDLIST,".receiptAmount","width:100px")},
			{key:"instrumentid",label:'InstrumentHeaderid',width:100,hidden:true, formatter:createTextFieldFormatter('FDtable',FDLIST,".instrumentHeader.id","hidden")},
			{key:"instrumentNumber",label:'Cheuqe No',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".instrumentHeader.instrumentNumber","text")},
			{key:"instrumentDate",label:'Cheque Date',width:100, formatter:createTextFieldFormatter('FDtable',FDLIST,".instrumentHeader.instrumentDate","text")},
			{key:"remarks",label:'Remarks',width:100, formatter:createTextFieldFormatterWithStyle('FDtable',FDLIST,".remarks","width:100px")},
			{key:"parentId",label:'parentId',width:100,formatter:createTextFieldFormatter('FDtable',FDLIST,".parentId","text")},
			{key:"extend",label:'Extend',width:25, formatter:createCheckboxFieldFormatter('FDtable',FDLIST,".extend","checkbox")},
			{key:'Add',label:'Add',width:13,formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Del',width:13,formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
		];
		var fdTableDS = new YAHOO.util.DataSource();
		fdTableDT = new YAHOO.widget.DataTable(objTable,fixedDepositTableColumns, fdTableDS);
		fdTableDT.on('cellClickEvent',function (oArgs) {
		var target = oArgs.target;
		var record = this.getRecord(target);
		var column = this.getColumn(target);
		if (column.key == 'Add') { 
			fdTableDT.addRow({SlNo:fdTableDT.getRecordSet().getLength()+1});
			updateFDTableIndex();
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
		<c:forEach value="fixedDepositList" status="stat">
			fdTableDT.addRow({"SlNo":fdTableDT.getRecordSet().getLength()+1,
			"id":'${id}',
				"fileNo":'${fileNo}',
				"amount":'${amount}',
				"date":'${date}',
				"bankBranch":'${bankBranch.id}',
				"bankAccount":'${bankAccount.id}',
				//"bankAccountList":'${bankAccountList}',
				//"referenceNumber":'${referenceNumber}',
				"interestRate":'${interestRate}',
				"period":'${period}',
				"serialNumber":'${serialNumber}',
				"GJVvhid":'${outFlowVoucher.id}',
				"generalVoucher":'${outFlowVoucher.voucherNumber}',
				"GJVDate":'${outFlowVoucher.voucherDate}',
				"gjvAmount":'${gjvAmount}',		
				"maturityAmount":'${maturityAmount}',
				"maturityDate":'${maturityDate}',
				"WithdrawalDate":'${withdrawalDate}',
				"receiptGJVvhid":'${inFlowVoucher.id}',
				"inFlowVoucher":'${inFlowVoucher.voucherNumber}',
				"receiptGJVDate":'${inFlowVoucher.voucherDate}',
				"challanvhid":'${challanReceiptVoucher.id}',
				"challanGJV":'${challanReceiptVoucher.voucherNumber}',
				"challanGJVDate":'${challanReceiptVoucher.voucherDate}',
				"receiptAmount":'${receiptAmount}',
				"instrumentid":'${instrumentHeader.id}',
				"instrumentNumber":'${instrumentHeader.instrumentNumber}',
				"instrumentDate":'${instrumentHeader.instrumentDate}',
				"remarks":'${remarks}',
				"parentId":'${parentId}',
				"extend":'${extend}'
		});
		
			var index = '${#stat.index}';
			updateYUIGrid(FDLIST,'id',index,'${id}');
			updateYUIGrid(FDLIST,'fileNo',index,'${fileNo}');
			updateYUIGrid(FDLIST,'amount',index,'${amount}');
			updateYUIGrid(FDLIST,'date',index,'${date}');
			updateYUIGrid(FDLIST,'bankBranch.id',index,'${bankBranch.id}');
			updateYUIGrid(FDLIST,'bankAccount.id',index,'${bankAccount.id}');
			//updateYUIGrid(FDLIST,'bankAccountList',index,'${bankAccountList}');
			//updateYUIGrid(FDLIST,'referenceNumber',index,index+1);
			updateYUIGrid(FDLIST,'interestRate',index,'${interestRate}');
			updateYUIGrid(FDLIST,'period',index,'${period}');
			updateYUIGrid(FDLIST,'serialNumber',index,'${serialNumber}');
			updateYUIGrid(FDLIST,'outFlowVoucher.id',index,'${outFlowVoucher.id}');
			updateYUIGrid(FDLIST,'outFlowVoucher.voucherNumber',index,'${outFlowVoucher.voucherNumber}');
			updateYUIGrid(FDLIST,'outFlowVoucher.voucherDate',index,'${outFlowVoucher.voucherDate}');
			updateYUIGrid(FDLIST,'gjvAmount',index,'${gjvAmount}');
			updateYUIGrid(FDLIST,'maturityAmount',index,'${maturityAmount}');
			updateYUIGrid(FDLIST,'maturityDate',index,'${maturityDate}');
			updateYUIGrid(FDLIST,'withdrawalDate',index,'${withdrawalDate}');
			updateYUIGrid(FDLIST,'inFlowVoucher.id',index,'${inFlowVoucher.id}');
			updateYUIGrid(FDLIST,'inFlowVoucher.voucherNumber',index,'${inFlowVoucher.voucherNumber}');
			updateYUIGrid(FDLIST,'inFlowVoucher.voucherDate',index,'${inFlowVoucher.voucherDate}');
			updateYUIGrid(FDLIST,'challanReceiptVoucher.id',index,'${challanReceiptVoucher.id}');
			updateYUIGrid(FDLIST,'challanReceiptVoucher.voucherNumber',index,'${challanReceiptVoucher.voucherNumber}');
			updateYUIGrid(FDLIST,'challanReceiptVoucher.voucherDate',index,'${challanReceiptVoucher.voucherDate}');
			updateYUIGrid(FDLIST,'receiptAmount',index,'${receiptAmount}');
			updateYUIGrid(FDLIST,'instrumentHeader.id',index,'${instrumentHeader.id}');
			updateYUIGrid(FDLIST,'instrumentHeader.instrumentNumber',index,'${instrumentHeader.instrumentNumber}');
			updateYUIGrid(FDLIST,'instrumentHeader.instrumentDate',index,'${instrumentHeader.instrumentDate}');
			updateYUIGrid(FDLIST,'remarks',index,'${remarks}');
			updateYUIGrid(FDLIST,'parentId',index,'${parentId.id}');
			updateYUIGrid(FDLIST,'extend',index,'${extend}');
			updateFDTableIndex();	                          
			</c:forEach>
		
				         
			
    }
        
                                  
    
    var FDLIST='fixedDepositList';
    var fdTableIndex=0;
  //  var childTableIndex=0;
    var challanGJV=false;
    function createBankBranchDropDownFormatter(tableType,prefix,suffix){
	return function(el, oRecord, oColumn, oData) {
	var index=getIndexForTableType(tableType);
	var value = (YAHOO.lang.isValue(oData))?oData:"";
		var element=" <select  id='"+prefix+"["+index+"]"+suffix+"' name='"+prefix+"["+index+"]"+suffix+"'  style=width:90px  onchange=getbranchAccountId(this);return false;' >";
		element=element+"<option value=-1 selected='selected' > --- Choose --- </option>  ";
		
		<c:forEach value="bankBranchList" status="stat">
			var name='${bank.name}'+"-"+'${branchname}';
			var id='${id}';
			element=element+" <option value="+id +" > "+ name+" </option>  ";
		</c:forEach>
		element=element+" </select>";
		el.innerHTML =element ;
		}
	}                                        
	function createBankAccountDropDownFormatter(tableType,prefix,suffix){
	  return function(el, oRecord, oColumn, oData) {
	    var index=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		
		var accountOptions=[{label:"--- Select ---", value:"0"}];
		
		var element=" <select  id='"+prefix+"["+index+"]"+suffix+"' name='"+prefix+"["+index+"]"+suffix+"' >";
		element=element+" </select>";
		el.innerHTML =element ;
		}   
	}            
	function createTextFieldFormatterImg(tableType,prefix,suffix,type){
	   return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		var imgsuffix=suffix+"img";
		el.innerHTML = " <input type='"+type+"' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' style='width:90px;' /><img src='/services/egi/resources/erp2/images/searchicon.gif' id='"+prefix+"["+tableIndex+"]"+imgsuffix+"' name='"+prefix+"["+tableIndex+"]"+imgsuffix+"' onclick='openViewVouchers(this)'/>";
		}    
	}
	function createTextFieldFormatterWithStyle(tableType,prefix,suffix,style){
		return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = " <input type='text' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' style='"+style+"' />";
		}
	}
	
	
	function createDateFieldFormatter(tableType,prefix,suffix)
	{	
		return function(el, oRecord, oColumn, oData) {
			var value = (YAHOO.lang.isValue(oData))?oData:"";
			var index=getIndexForTableType(tableType);
			//bootbox.alert("hiii");
			var fieldName = prefix+"[" + index + "]" +  suffix;
			var idt=oColumn.getKey()+oRecord.getId();
			var id=idt.replace("-","");
			var CALENDERURL="/services/egi/resources/erp2/images/calendaricon.gif";
			var HREF='javascript:show_calendar("forms[0].'+id+'")';
			markup="<input type='text' id='"+id+"' name='"+fieldName+"' value='"+value+"'    maxlength='10' style=\"width:70px\" onkeyup='DateFormat(this,this.value,event,false,3);' onblur='checkDateLG(this);' /><a href='#' style='text-decoration:none' onclick='"+HREF+"'><img src='"+CALENDERURL+"' border='0'  /></a>";
	 		el.innerHTML = markup;
		}
	}    
	  
	function createTextFieldFormatter(tableType,prefix,suffix,type){
	return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		
			el.innerHTML = " <input type='"+type+"' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"'  style='width:90px;' />";

	}
}
function createCheckboxFieldFormatter(tableType,prefix,suffix,type){
	return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = " <input type='"+type+"' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' style=width:90px  onclick=extendFixedDeposit(this);return false;' />";
	}                          
}      

 
	function loadChequeNoAndDate(billVhId,name){
		var url = '../voucher/common!ajaxLoadChequeNoAndDate.action?billVhId='+billVhId;
		YAHOO.util.Connect.asyncRequest('POST', url, chequeNoAndDate, null);
	}
	
	var chequeNoAndDate={
		success: function(o) {
			if(o.responseText!="")
			{
				var docs=o.responseText.split("$");
				document.getElementById(onlyName+".instrumentHeader.id").value= ((docs[0]=='0')?"":docs[0]);
				document.getElementById(onlyName+".instrumentHeader.instrumentNumber" ).value= ((docs[1]=='0')?"":docs[1]);
				document.getElementById(onlyName+".instrumentHeader.instrumentDate" ).value= ((docs[2]=='-')?"":docs[2]);
				//document.getElementById(onlyName+".instrumentHeader.instrumentAmount" ).value= ((docs[3]=='0')?"":docs[3]);
				
			}
		},
		failure: function(o) {
			bootbox.alert('Cannot fetch instrument and account details');
		}
	                  
}
	function getbranchAccountId(obj){
		var branchId=obj.value;
		selectedname=obj.name;
		
		//bootbox.alert("object in get branch>>"+selectedname);
		var url = '../voucher/common!ajaxLoadBranchAccountNumbers.action?branchId='+branchId;
		YAHOO.util.Connect.asyncRequest('POST', url, bankAccountList, null);
	
	}
	function getAccountId(obj){
		var branchId=obj.value;
		selectedname=obj.name;
		
		var indexobj=selectedname.split("]");
		var test=true;
		var i=0;
		var j=0;
		var ind=indexobj[0].substring(indexobj[0].length,indexobj[0].length-1);
		var listSize='${fixedDepositList.size()}';
		var res1=new Array(listSize);
		var resId=new Array(listSize);
	
		
		<c:forEach var="p" value="fixedDepositList" status="fixedDep_staus">
		//bootbox.alert('${#fixedDep_staus.index}'+"   "+ind);
		
		if('${#fixedDep_staus.index}'==ind){
		
		<c:forEach value="#p.bankAccountList" status="bankAccount_status">
	
			var accSize='${#p.bankAccountList.size()}';
			if(i<listSize)
			 {
				res1[i]=new Array(accSize);
				resId[i]=new Array(accSize);
				///bootbox.alert(accSize);
				
				if(j<accSize){
					res1[i][j]='${accountnumber}'+"-"+'${%{chartofaccounts.glcode}}';
			 		resId[i][j]='${id}';
			 		
			 		j++;
			}i++;
		}
		</c:forEach>
		
		}
		</c:forEach>    
		//bootbox.alert(res1.length);
		var accNumid1=selectedname;
		accNumid1=accNumid1.replace('Branch','Account');
		//bootbox.alert("accnum "+accNumid);
		var x=document.getElementById(accNumid1);
				x.length=0;
				x.options[0]=new Option("----Choose----","-1");  
				//bootbox.alert(res1);     
				var k=0;    
 							for(var i=0;i<res1.length;i++)
 							{ 
 								for(var j=0;j<res1[i].length;j++){
 							   		x.options[i]=new Option(res1[i][j],resId[i][j]);
 						   		 }  
						   }
	}
	var bankAccountList={
		success: function(o) {
			if(o.responseText!="")
			{
				var docs=o.responseText;               
				res=docs.split("$");
				var accNumid=selectedname;
				//bootbox.alert("docs "+docs);
				accNumid=accNumid.replace('Branch','Account');
				//bootbox.alert("accnum "+accNumid);
				var x=document.getElementById(accNumid);
				x.length=0;
				x.options[0]=new Option("----Choose----","-1");  
				x.options[0].text='---Select---';
				x.options[0].value=0;          
 							for(var i=0;i<res.length-1;i++)
 							{
 							      
	 							var idandnum=res[i].split('~');
	 							x.options[i]=new Option(idandnum[0],idandnum[1]);
 						    }                     
			}
		},                                         
		failure: function(o) {
			bootbox.alert('Cannot fetch instrument and account details');
		}
	}
	            
	           
	function openViewVouchers(obj)
	{
		var url = '../voucher/voucherSearch!beforesearch.action?showMode=sourceLink';
		var val=	window.showModalDialog(url,"SearchBillVouchers","dialogwidth: 800; dialogheight: 600;");
		if(val!=undefined && val!=null && val!="" && val.split("$").length>0)
		{
		var objName=obj.name;
		var name=objName.replace("img","");
		var data=val.split("$");
		document.getElementById(name).value=data[0];    // voucher number
		var id=name.replace("voucherNumber","id");
		var date=name.replace("Number","Date");
		document.getElementById(date).value=data[1];    // voucherDate
		document.getElementById(id).value=data[2];   // vouchderid
		patt1 = name.match("outFlowVoucher.voucherNumber");
		patt2 = name.match("inFlowVoucher.voucherNumber");
		//bootbox.alert(name+" >>> hi name");                     
		              
		if(patt1=="outFlowVoucher.voucherNumber"){
			onlyName=name.replace(".outFlowVoucher.voucherNumber","")
		}        
		else if(patt2=="inFlowVoucher.voucherNumber"){
			onlyName=name.replace(".inFlowVoucher.voucherNumber","")
		}
		else{
			bootbox.alert("inside Challan reciept voucher");
			onlyName=name.replace(".challanReceiptVoucher.voucherNumber","")
			loadChequeNoAndDate(data[2],onlyName);
			
		}
		}
			
	}
function getIndexForTableType(tableType)
{	               
		if(tableType=='FDtable'){
 			return fdTableIndex;
		}
}

	
function updateYUIGrid(fdlist, field,index,value){
	  var obj="";
	  if(value==null)
		return;
	 if(field=='date' || field=='maturityDate' || field=='withdrawalDate' ||field=='extend'){
		document.getElementsByName(fdlist+'['+index+'].'+field)[0].value=value;
	 }else if(field=='bankBranch.id'){
	 	document.getElementById(fdlist+'['+index+'].'+field).value=value;
	 	var docobj=document.getElementById(fdlist+'['+index+'].'+'bankBranch.id');
		getAccountId(docobj);
	 }else {
		 	document.getElementById(fdlist+'['+index+'].'+field).value=value;
	}
	          
}	
 
function updateFDTableIndex()
{
	fdTableIndex++;
}

</SCRIPT>

<div id="labelAD" align="center">
	<h1>
		<!-- TODO: Manual migration required for custom Struts tag -->
	</h1>
</div>
<br></br>

<div class="formmainbox">
	<div class="formheading" />
	<div class="subheadnew">
		<!-- TODO: Manual migration required for custom Struts tag -->
	</div>
</div>
</div>
<div id="listid" style="display: block"></div>
<br></br>
<div class="yui-skin-sam" align="center" style="overflow-x: scroll">
	<div id="fdTablediv"></div>
</div>


<script type="text/javascript">
     		makeFDTable('fdTablediv');
     		document.getElementById('fdTablediv').getElementsByTagName('table')[0].width="80%";
     		 
     	</script>
