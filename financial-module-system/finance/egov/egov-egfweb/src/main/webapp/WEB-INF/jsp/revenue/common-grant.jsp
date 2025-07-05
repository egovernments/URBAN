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
    //makeGrantTable for CFC, SFC & Stamp Duty
    var makeGrantTable = function() {
    	var grantTableColumns = [ 
			{key:"SlNo",label:'Sl No',width:30},
			{key:"id",label:'id',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".id","hidden")},
			{key:"grants.department",label:'Department'+'<span class="mandatory">*</span>',width:110, formatter:createDepartmentDropDownFormatter('CFCGtable',GRANTLIST,".department.id","text")},
			{key:"grants.finYear",label:'Financial Year'+'<span class="mandatory">*</span>',width:110, formatter:createFinYearDropDownFormatter('CFCGtable',GRANTLIST,".financialYear.id","text")},
			{key:"grants.period",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+'<span class="mandatory">*</span>',width:110, formatter:createPeriodDropDownFormatter('CFCGtable',GRANTLIST,".period","text")},
            {key:"grants.proceedingsNo",label:'Proceedings No'+'<span class="mandatory">*</span>',width:100, formatter:createTextFieldFormatterWithStyle('CFCGtable',GRANTLIST,".proceedingsNo","width:100px")},
            {key:"proceedingsdate",label:'Proceedings Date<br />(dd/mm/yyyy)'+'<span class="mandatory">*</span>',width:100, formatter:createDateFieldFormatter('CFCGtable',GRANTLIST,".proceedingsDate")},
			{key:"accGJVvhid",label:'accGJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".accrualVoucher.id","hidden")},
			{key:"linkAccrualGJV",label:'Accrual GJV'+'<span class="mandatory">*</span>',width:100, formatter:createTextFieldFormatterImg('CFCGtable',GRANTLIST,".accrualVoucher.voucherNumber","text")},
			{key:"accrualGJVDate",label:'Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".accrualVoucher.voucherDate","text")},
			{key:"grants.accrualAmount",label:'Accrual Amount',width:100, formatter:createTextFieldFormatterWithStyleRO('CFCGtable',GRANTLIST,".accrualAmount","width:100px")},
            {key:"GJVvhid",label:'GJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".generalVoucher.id","hidden")},
			{key:"linkGJV",label:'GJV',width:100, formatter:createTextFieldFormatterImg('CFCGtable',GRANTLIST,".generalVoucher.voucherNumber","text")},
			{key:"GJVDate",label:'Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".generalVoucher.voucherDate","text")},
			{key:"receiptGJVvhid",label:'receiptGJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".receiptVoucher.id","hidden")},
			{key:"linkReceiptGJV",label:'Receipt',width:100, formatter:createTextFieldFormatterImg('CFCGtable',GRANTLIST,".receiptVoucher.voucherNumber","text")},
			{key:"receiptGJVDate",label:'Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".receiptVoucher.voucherDate","text")},
			{key:"grants.grantAmount",label:'Grant Amount',width:100, formatter:createTextFieldFormatterWithStyleRO('CFCGtable',GRANTLIST,".grantAmount","width:100px")},
			{key:"insHeaderId",label:'insHeaderId',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".ihID.id","hidden")},
			{key:"cheuqeNo",label:'Cheuqe No',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".ihID.instrumentNumber","text")},
			{key:"chequeDate",label:'Cheque Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".ihID.instrumentDate","text")},
			{key:"grants.remarks",label:'Remarks',width:100, formatter:createTextFieldFormatterWithStyle('CFCGtable',GRANTLIST,".remarks","width:100px")},
			{key:'Add',label:'Add',width:13,formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Del',width:13,formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
		];
		var grantTableDS = new YAHOO.util.DataSource();
		grantTableDT = new YAHOO.widget.DataTable("grantTablediv",grantTableColumns, grantTableDS);
		grantTableDT.on('cellClickEvent',function (oArgs) {
		var target = oArgs.target;
		var record = this.getRecord(target);
		var column = this.getColumn(target);
		if (column.key == 'Add') { 
			grantTableDT.addRow({SlNo:grantTableDT.getRecordSet().getLength()+1});
			updategrantTableIndex();
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
		<c:forEach value="grantsList" status="stat">
			grantTableDT.addRow({SlNo:grantTableDT.getRecordSet().getLength()+1,
				"id":'${id}',
				"grants.department":'${department.id}',
				"grants.finYear":'${financialYear.id}',
				"grants.period":'${period}',
				"grants.proceedingsNo":'${proceedingsNo}',
				"proceedingsdate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"accGJVvhid":'${accrualVoucher.id}',
				"linkAccrualGJV":'${accrualVoucher.voucherNumber}',
				"accrualGJVDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"grants.accrualAmount":'${accrualAmount}',
				"GJVvhid":'${generalVoucher.id}',
				"linkGJV":'${generalVoucher.voucherNumber}',
				"GJVDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"receiptGJVvhid":'${receiptVoucher.id}',
				"linkReceiptGJV":'${receiptVoucher.voucherNumber}',
				"receiptGJVDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"grants.grantAmount":'${grantAmount}',
				"insHeaderId":'${ihID.id}',
				"cheuqeNo":'${ihID.instrumentNumber}',
				"chequeDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"grants.remarks":'${remarks}'
			});
			var index = '${#stat.index}';
			updateYUIGrid(GRANTLIST,'id',index,'${id}');
			updateYUIGrid(GRANTLIST,'department.id',index,'${department.id}');
			updateYUIGrid(GRANTLIST,'financialYear.id',index,'${financialYear.id}');
			updateYUIGrid(GRANTLIST,'period',index,'${period}');
			updateYUIGrid(GRANTLIST,'proceedingsNo',index,'${proceedingsNo}');
			updateYUIGrid(GRANTLIST,'proceedingsDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'accrualVoucher.id',index,'${accrualVoucher.id}');
			updateYUIGrid(GRANTLIST,'accrualVoucher.voucherNumber',index,'${accrualVoucher.voucherNumber}');
			updateYUIGrid(GRANTLIST,'accrualVoucher.voucherDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'accrualAmount',index,'${accrualAmount}');
			updateYUIGrid(GRANTLIST,'generalVoucher.id',index,'${generalVoucher.id}');
			updateYUIGrid(GRANTLIST,'generalVoucher.voucherNumber',index,'${generalVoucher.voucherNumber}');
			updateYUIGrid(GRANTLIST,'generalVoucher.voucherDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'receiptVoucher.id',index,'${receiptVoucher.id}');
			updateYUIGrid(GRANTLIST,'receiptVoucher.voucherNumber',index,'${receiptVoucher.voucherNumber}');
			updateYUIGrid(GRANTLIST,'receiptVoucher.voucherDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'grantAmount',index,'${grantAmount}');
			updateYUIGrid(GRANTLIST,'ihID.id',index,'${ihID.id}');
			updateYUIGrid(GRANTLIST,'ihID.instrumentNumber',index,'${ihID.instrumentNumber}');
			updateYUIGrid(GRANTLIST,'ihID.instrumentDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'remarks',index,'${remarks}');
			updategrantTableIndex();	
		</c:forEach>
    }
    
    //makeGrantTableET for Entertainment Tax
    var makeGrantTableET = function() {
    	var grantTableColumns = [ 
			{key:"SlNo",label:'Sl No',width:30},
			{key:"id",label:'id',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".id","hidden")},
			{key:"grants.department",label:'Department'+'<span class="mandatory">*</span>',width:110, formatter:createDepartmentDropDownFormatter('CFCGtable',GRANTLIST,".department.id","text")},
			{key:"grants.finYear",label:'Financial Year'+'<span class="mandatory">*</span>',width:110, formatter:createFinYearDropDownFormatter('CFCGtable',GRANTLIST,".financialYear.id","text")},
			{key:"grants.period",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+'<span class="mandatory">*</span>',width:110, formatter:createPeriodDropDownFormatter('CFCGtable',GRANTLIST,".period","text")},
            {key:"grants.proceedingsNo",label:'Proceedings No'+'<span class="mandatory">*</span>',width:100, formatter:createTextFieldFormatterWithStyle('CFCGtable',GRANTLIST,".proceedingsNo","width:100px")},
            {key:"proceedingsdate",label:'Proceedings Date<br />(dd/mm/yyyy)'+'<span class="mandatory">*</span>',width:100, formatter:createDateFieldFormatter('CFCGtable',GRANTLIST,".proceedingsDate")},
			{key:"accGJVvhid",label:'accGJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".accrualVoucher.id","hidden")},
			{key:"linkAccrualGJV",label:'Accrual GJV'+'<span class="mandatory">*</span>',width:100, formatter:createTextFieldFormatterImg('CFCGtable',GRANTLIST,".accrualVoucher.voucherNumber","text")},
			{key:"accrualGJVDate",label:'Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".accrualVoucher.voucherDate","text")},
			{key:"grants.accrualAmount",label:'Accrual Amount',width:100, formatter:createTextFieldFormatterWithStyleRO('CFCGtable',GRANTLIST,".accrualAmount","width:100px")},
            {key:"GJVvhid",label:'GJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".generalVoucher.id","hidden")},
			{key:"linkGJV",label:'GJV',width:100, formatter:createTextFieldFormatterImg('CFCGtable',GRANTLIST,".generalVoucher.voucherNumber","text")},
			{key:"GJVDate",label:'Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".generalVoucher.voucherDate","text")},
			{key:"receiptGJVvhid",label:'receiptGJVvhid',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".receiptVoucher.id","hidden")},
			{key:"linkReceiptGJV",label:'Receipt',width:100, formatter:createTextFieldFormatterImg('CFCGtable',GRANTLIST,".receiptVoucher.voucherNumber","text")},
			{key:"receiptGJVDate",label:'Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".receiptVoucher.voucherDate","text")},
			{key:"grants.grantAmount",label:'Grant Amount',width:100, formatter:createTextFieldFormatterWithStyleRO('CFCGtable',GRANTLIST,".grantAmount","width:100px")},
			{key:"insHeaderId",label:'insHeaderId',width:100,hidden:true, formatter:createTextFieldFormatter('CFCGtable',GRANTLIST,".ihID.id","hidden")},
			{key:"cheuqeNo",label:'Cheuqe No',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".ihID.instrumentNumber","text")},
			{key:"chequeDate",label:'Cheque Date',width:100, formatter:createTextFieldFormatterRO('CFCGtable',GRANTLIST,".ihID.instrumentDate","text")},
			{key:"grants.commercial",label:'Commercial Tax Officer',width:150, formatter:createTextFieldFormatterWithStyle('CFCGtable',GRANTLIST,".commTaxOfficer","width:150px")},
			{key:"grants.remarks",label:'Remarks',width:100, formatter:createTextFieldFormatterWithStyle('CFCGtable',GRANTLIST,".remarks","width:100px")},
			{key:'Add',label:'Add',width:13,formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Del',width:13,formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
		];
		var grantTableDS = new YAHOO.util.DataSource();
		grantTableDT = new YAHOO.widget.DataTable("grantTablediv",grantTableColumns, grantTableDS);
		grantTableDT.on('cellClickEvent',function (oArgs) {
		var target = oArgs.target;
		var record = this.getRecord(target);
		var column = this.getColumn(target);
		if (column.key == 'Add') { 
			grantTableDT.addRow({SlNo:grantTableDT.getRecordSet().getLength()+1});
			updategrantTableIndex();
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
		<c:forEach value="grantsList" status="stat">
			grantTableDT.addRow({SlNo:grantTableDT.getRecordSet().getLength()+1,
				"id":'${id}',
				"grants.department":'${department.id}',
				"grants.finYear":'${financialYear.id}',
				"grants.period":'${period}',
				"grants.proceedingsNo":'${proceedingsNo}',
				"proceedingsdate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"accGJVvhid":'${accrualVoucher.id}',
				"linkAccrualGJV":'${accrualVoucher.voucherNumber}',
				"accrualGJVDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"grants.accrualAmount":'${accrualAmount}',
				"GJVvhid":'${generalVoucher.id}',
				"linkGJV":'${generalVoucher.voucherNumber}',
				"GJVDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"receiptGJVvhid":'${receiptVoucher.id}',
				"linkReceiptGJV":'${receiptVoucher.voucherNumber}',
				"receiptGJVDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"grants.grantAmount":'${grantAmount}',
				"insHeaderId":'${ihID.id}',
				"cheuqeNo":'${ihID.instrumentNumber}',
				"chequeDate":'<!-- TODO: Manual migration required for custom Struts tag -->',
				"grants.commercial":'${commTaxOfficer}',
				"grants.remarks":'${remarks}'
			});
			var index = '${#stat.index}';
			updateYUIGrid(GRANTLIST,'id',index,'${id}');
			updateYUIGrid(GRANTLIST,'department.id',index,'${department.id}');
			updateYUIGrid(GRANTLIST,'financialYear.id',index,'${financialYear.id}');
			updateYUIGrid(GRANTLIST,'period',index,'${period}');
			updateYUIGrid(GRANTLIST,'proceedingsNo',index,'${proceedingsNo}');
			updateYUIGrid(GRANTLIST,'proceedingsDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'accrualVoucher.id',index,'${accrualVoucher.id}');
			updateYUIGrid(GRANTLIST,'accrualVoucher.voucherNumber',index,'${accrualVoucher.voucherNumber}');
			updateYUIGrid(GRANTLIST,'accrualVoucher.voucherDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'accrualAmount',index,'${accrualAmount}');
			updateYUIGrid(GRANTLIST,'generalVoucher.id',index,'${generalVoucher.id}');
			updateYUIGrid(GRANTLIST,'generalVoucher.voucherNumber',index,'${generalVoucher.voucherNumber}');
			updateYUIGrid(GRANTLIST,'generalVoucher.voucherDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'receiptVoucher.id',index,'${receiptVoucher.id}');
			updateYUIGrid(GRANTLIST,'receiptVoucher.voucherNumber',index,'${receiptVoucher.voucherNumber}');
			updateYUIGrid(GRANTLIST,'receiptVoucher.voucherDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'grantAmount',index,'${grantAmount}');
			updateYUIGrid(GRANTLIST,'ihID.id',index,'${ihID.id}');
			updateYUIGrid(GRANTLIST,'ihID.instrumentNumber',index,'${ihID.instrumentNumber}');
			updateYUIGrid(GRANTLIST,'ihID.instrumentDate',index,'<!-- TODO: Manual migration required for custom Struts tag -->');
			updateYUIGrid(GRANTLIST,'commTaxOfficer',index,'${commTaxOfficer}');
			updateYUIGrid(GRANTLIST,'remarks',index,'${remarks}');
			updategrantTableIndex();	
		</c:forEach>
    }
    
    var GRANTLIST='grantsList';
    var grantTableIndex=0;
    var accrualGJV=false;
	function createTextFieldFormatter(tableType,prefix,suffix,type){
		return function(el, oRecord, oColumn, oData) {
			var tableIndex=getIndexForTableType(tableType);
			var value = (YAHOO.lang.isValue(oData))?oData:"";
			el.innerHTML = " <input type='"+type+"' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' style='width:90px;' />";
		}
	}
	//Read only field
	function createTextFieldFormatterRO(tableType,prefix,suffix,type){
		return function(el, oRecord, oColumn, oData) {
			var tableIndex=getIndexForTableType(tableType);
			var value = (YAHOO.lang.isValue(oData))?oData:"";
			el.innerHTML = " <input type='"+type+"' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' readonly='true' style='width:90px;' />";
		}
	}
    function createDepartmentDropDownFormatter(tableType,prefix,suffix){
	return function(el, oRecord, oColumn, oData) {
	var index=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		var element=" <select  id='"+prefix+"["+index+"]"+suffix+"' name='"+prefix+"["+index+"]"+suffix+"'  >";
		element=element+"<option value=-1 selected='selected' > --- Choose --- </option>  ";
		<c:forEach value="departmentList" status="stat">
			var name='${deptName}';
			var id='${id}';
			element=element+" <option value="+id +" > "+ name+" </option>  ";
		</c:forEach>
		element=element+" </select>";
		el.innerHTML =element ;
		}
	}
   function createPeriodDropDownFormatter(tableType,prefix,suffix){
   return function(el, oRecord, oColumn, oData) {
   var index=getIndexForTableType(tableType);
      var value = (YAHOO.lang.isValue(oData))?oData:"";
      var element=" <select  id='"+prefix+"["+index+"]"+suffix+"' name='"+prefix+"["+index+"]"+suffix+"'  >";
      element=element+"<option value=-1 selected='selected' > --- Choose --- </option>  ";
      <c:forEach var="period" value="periodList" status="stat">
         var name='${period}';
         var id='${period}';
         element=element+" <option value="+id +" > "+ name+" </option>  ";
      </c:forEach>
      element=element+" </select>";
      el.innerHTML =element ;
      }
   }
   
	function createFinYearDropDownFormatter(tableType,prefix,suffix){
	return function(el, oRecord, oColumn, oData) {
	var index=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		var element=" <select  id='"+prefix+"["+index+"]"+suffix+"' name='"+prefix+"["+index+"]"+suffix+"'  >";
		element=element+"<option value=-1 selected='selected' > --- Choose --- </option>  ";
		<c:forEach value="finYearList" status="stat">
			var name='${finYearRange}';
			var id='${id}';
			element=element+" <option value="+id +" > "+ name+" </option>  ";
		</c:forEach>
		element=element+" </select>";
		el.innerHTML =element ;
		}
	}
	function createTextFieldFormatterImg(tableType,prefix,suffix,type){
	return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		var imgsuffix=suffix+"img";
		el.innerHTML = " <input type='"+type+"' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' readonly='true' style='width:90px;' /><img src='/services/egi/resources/erp2/images/searchicon.gif' id='"+prefix+"["+tableIndex+"]"+imgsuffix+"' name='"+prefix+"["+tableIndex+"]"+imgsuffix+"' onclick='openViewVouchers(this)'/>";
		}    
	}
	function loadChequeNoAndDate(billVhId,name){
		var url = '../voucher/common!ajaxLoadChequeNoAndDate.action?billVhId='+billVhId;
		YAHOO.util.Connect.asyncRequest('POST', url, chequeNoAndDate, null);
	}
	function loadFundingAgencyAmount(billVhId,name){
		var grantType='${grantsType}';
		var url = '../voucher/common!ajaxLoadVoucherAmount.action?billVhId='+billVhId+'&grantType='+grantType;
		YAHOO.util.Connect.asyncRequest('POST', url, fundingAgencyAmount, null);
	}
	function loadGrantAmountAndSubLedger(billVhId,name){
		var grantType='${grantsType}';
		var url = '../voucher/common!ajaxLoadGrantAmountSubledger.action?billVhId='+billVhId+'&grantType='+grantType;
		YAHOO.util.Connect.asyncRequest('POST', url, grantAmountAndSubledger, null);
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
		document.getElementById(name).value=data[0];
		var id=name.replace("voucherNumber","id");
		var date=name.replace("Number","Date");
		document.getElementById(date).value=data[1];
		document.getElementById(id).value=data[2];
		patt1 = name.match("generalVoucher.voucherNumber")
		patt2 = name.match("receiptVoucher.voucherNumber")
		if(patt1=="generalVoucher.voucherNumber"){
			onlyName=name.replace(".generalVoucher.voucherNumber","")
			loadChequeNoAndDate(data[2],onlyName);
			accrualGJV=false;
			loadGrantAmountAndSubLedger(data[2],onlyName);
		}
		else if(patt2=="receiptVoucher.voucherNumber"){
			onlyName=name.replace(".receiptVoucher.voucherNumber","")
			loadChequeNoAndDate(data[2],onlyName);
			accrualGJV=false;
			loadGrantAmountAndSubLedger(data[2],onlyName);
		}
		else{
			onlyName=name.replace(".accrualVoucher.voucherNumber","")
			accrualGJV=true;
			loadFundingAgencyAmount(data[2],onlyName);
		}
		
		}
	}
	var fundingAgencyAmount={
		success: function(o) {
			if(o.responseText!="")
			{
				var docs=o.responseText.split("$");
				if(accrualGJV)
					document.getElementById(onlyName+".accrualAmount" ).value= ((docs[0]=='0')?"":docs[0]);
				else
					document.getElementById(onlyName+".grantAmount" ).value= ((docs[0]=='-')?"":docs[0]);
			}
		},
		failure: function(o) {
			bootbox.alert('Cannot fetch Funding Agency Grant Amount');
		}
	}
	//Populating Grant Amount and Subledger name for EntertainmentTax
	var grantAmountAndSubledger={
		success: function(o) {
			if(o.responseText!="")
			{
				var docs=o.responseText.split("$");
				document.getElementById(onlyName+".grantAmount" ).value= ((docs[0]=='0')?"":docs[0]);
				<c:if test="%{grantsType =='Entertainment Tax'}">
					document.getElementById(onlyName+".commTaxOfficer" ).value= ((docs[1]=='0')?"":docs[1]);
				</c:if>
			}
		},
		failure: function(o) {
			bootbox.alert('Cannot fetch GrantAmount and Subledger');
		}
	}
	var chequeNoAndDate={
		success: function(o) {
			if(o.responseText!="")
			{
				var docs=o.responseText.split("$");
				document.getElementById(onlyName+".ihID.id" ).value= ((docs[0]=='0')?"":docs[0]);
				document.getElementById(onlyName+".ihID.instrumentNumber" ).value= ((docs[1]=='0')?"":docs[1]);
				document.getElementById(onlyName+".ihID.instrumentDate" ).value= ((docs[2]=='-')?"":docs[2]);
			}
		},
		failure: function(o) {
			bootbox.alert('Cannot fetch instrument and account details');
		}
	}
	function createTextFieldFormatterWithStyle(tableType,prefix,suffix,style){
		return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = " <input type='text' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' style='"+style+"' />";
		}
	}
	//Read only field
	function createTextFieldFormatterWithStyleRO(tableType,prefix,suffix,style){
		return function(el, oRecord, oColumn, oData) {
		var tableIndex=getIndexForTableType(tableType);
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = " <input type='text' id='"+prefix+"["+tableIndex+"]"+suffix+"' name='"+prefix+"["+tableIndex+"]"+suffix+"' readonly='true' style='"+style+"' />";
		}
	}
	function getIndexForTableType(tableType)
	{
		if(tableType=='CFCGtable'){
		return grantTableIndex;
		}
	}
	function updateYUIGrid(GRANTSLIST, field,index,value){
		if(field=='proceedingsDate')
			document.getElementsByName(GRANTSLIST+'['+index+'].'+field)[0].value=value;
		else
			document.getElementById(GRANTSLIST+'['+index+'].'+field).value=value;
	}
	function updategrantTableIndex()
	{
		grantTableIndex++;
	}
	function createDateFieldFormatter(tableType,prefix,suffix)
	{	
		return function(el, oRecord, oColumn, oData) {
			var value = (YAHOO.lang.isValue(oData))?oData:"";
			var index=getIndexForTableType(tableType);
			var fieldName = prefix+"[" + index + "]" +  suffix;
			var idt=oColumn.getKey()+oRecord.getId();
			var id=idt.replace("-","");
			var CALENDERURL="/services/egi/resources/erp2/images/calendaricon.gif";
			var HREF='javascript:show_calendar("forms[0].'+id+'")';
			markup="<input type='text' id='"+id+"' name='"+fieldName+"' value='"+value+"'    maxlength='10' style=\"width:70px\" onkeyup='DateFormat(this,this.value,event,false,3);' onblur='checkDate(this);' /><a href='#' style='text-decoration:none' onclick='"+HREF+"'><img src='"+CALENDERURL+"' border='0'  /></a>";
	 		el.innerHTML = markup;
		}
	}
	function checkDate(obj)
	{
		var dat=validateDate(obj.value);
		if (!dat && dat!=null) 
		{
			bootbox.alert('Invalid date format : Enter Date as dd/mm/yyyy');
			obj.value="";
			return;
		}
	}
	
	//validation
	function validateMandatoryFields(){
		for( i=0;i<grantTableIndex;i++)
		{
			var obj1=document.getElementById(GRANTLIST+'['+i+'].financialYear.id');
			var obj2=document.getElementById(GRANTLIST+'['+i+'].period');
			var obj3=document.getElementById(GRANTLIST+'['+i+'].proceedingsNo');
			var obj4=document.getElementsByName(GRANTLIST+'['+i+'].proceedingsDate');
			var obj5=document.getElementById(GRANTLIST+'['+i+'].accrualVoucher.voucherNumber');
			var obj6=document.getElementById(GRANTLIST+'['+i+'].generalVoucher.voucherNumber');
			var obj7=document.getElementById(GRANTLIST+'['+i+'].receiptVoucher.voucherNumber');
			var obj8=document.getElementById(GRANTLIST+'['+i+'].department.id');
			if(obj8==null || obj8.value==-1  || obj8.value==0 || obj8.value==''){
				bootbox.alert("Select Department in Row "+(i+1));
				return false;
			}
			if(obj1==null || obj1.value==-1  || obj1.value==0 || obj1.value==''){
				bootbox.alert("Select Financial Year in Row "+(i+1));
				return false;
			}
			if(obj2==null || obj2.value==-1  || obj2.value==0 || obj2.value==''){
				bootbox.alert("Select Period in Row "+(i+1));
				return false;
			}
			if(obj3==null || obj3.value==-1  || obj3.value==0 || obj3.value==''){
				bootbox.alert("Enter Proceedings No. in Row "+(i+1));
				return false;
			}
			if(obj4==null || obj4.value==-1  || obj4.value==0 || obj4.value==''){
				bootbox.alert("Enter Proceedings Date in Row "+(i+1));
				return false;
			}
			if(obj5==null || obj5.value==-1  || obj5.value==0 || obj5.value==''){
				bootbox.alert("Link Accrual GJV in Row "+(i+1));
				return false;
			}
			if((obj6==null || obj6.value==-1  || obj6.value==0 || obj6.value=='') && (obj7==null || obj7.value==-1  || obj7.value==0 || obj7.value=='')){
				bootbox.alert("Link GJV or Receipt in Row "+(i+1));
				return false;
			}
			if(!(obj6==null || obj6.value==-1  || obj6.value==0 || obj6.value=='') && !(obj7==null || obj7.value==-1  || obj7.value==0 || obj7.value=='')){
				bootbox.alert("You have linked both GJV and Receipt in Row "+(i+1));
				obj6.value="";
				obj7.value="";	
				return false;
			}
		}
		return true;
	}
	//validation
   </SCRIPT>



<br></br>
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
	<div id="grantTablediv"></div>
</div>

<script type="text/javascript">
     		<c:if test="%{grantsType =='Entertainment Tax'}">
     			makeGrantTableET();
			</c:if>
			<c:otherwise>
				makeGrantTable();
			</s:else>
     		document.getElementById('grantTablediv').getElementsByTagName('table')[0].width="80%";
     	</script>




