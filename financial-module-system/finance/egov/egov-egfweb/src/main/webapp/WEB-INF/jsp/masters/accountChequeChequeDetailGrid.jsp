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
   var chequeDetailsGridTable;
   var chequeRangeArray = new Array();
   var deletedChqDeptCode="";
   var CHQDETAILSLIST = "chequeDetailsList";
   var chqDetailsIndex = 0;
   var chequeDetailsMap = new Map();
	var makeChequeDetailsGridTable = function() {    
    var chequeDetailsGridColumns = [ 
	{key:"fromChqNo",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createTextField(CHQDETAILSLIST,".fromChqNo")},
	{key:"isExhaustedH",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".isExhusted","hidden")},
	{key:"toChqNo",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createTextField(CHQDETAILSLIST,".toChqNo")},
	{key:"chequeDeptId",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".chequeDeptId","hidden")},
	{key:"deptName",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelSamll(CHQDETAILSLIST,".deptName")},
	{key:"deptCode",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".deptCode","hidden")},
	{key:"receivedDateL",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelSamll(CHQDETAILSLIST,".receivedDateL")},
	{key:"receivedDateH",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".receivedDate","hidden")},
	{key:"serialNoL",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelSamll(CHQDETAILSLIST,".serialNoL")},
	{key:"serialNoH",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".serialNo","hidden")},
   	{key:"isExhaustedL",label:'<!-- TODO: Manual migration required for custom Struts tag -->', formatter:createLabelSamll(CHQDETAILSLIST,".isExhustedL")},
	{key:"nextChqPresent",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".nextChqPresent","hidden")},
	{key:"accountChequeId",hidden:true,formatter:createHiddenField(CHQDETAILSLIST,".accountChequeId","hidden")},
        {key:'Delete',label:'<!-- TODO: Manual migration required for custom Struts tag -->',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
	];
		
		var chqueDetailsGridDS = new YAHOO.util.DataSource(); 
		chequeDetailsGridTable = new YAHOO.widget.DataTable("chequeDetailsGridTable",chequeDetailsGridColumns, chqueDetailsGridDS);
		chequeDetailsGridTable.on('cellClickEvent',function (oArgs) {
			var target = oArgs.target;
			var record = this.getRecord(target);
			var column = this.getColumn(target);
			if (column.key == 'Delete') { 	
						
					if(record.getData("isExhustedL") =="Yes" || record.getData("nextChqPresent")=="Yes"){
						
						bootbox.alert("cannot be deleted");
					}else{
						this.deleteRow(record);
						var key = record.getData("fromChqNo")+"~"+record.getData("toChqNo")+"~"+record.getData("deptCode")+"~"+record.getData("serialNoH");
						if(chequeDetailsMap.has(key)){
							chequeDetailsMap.delete(key);
							document.getElementById('chequeDetailsRowId').value =[ ...chequeDetailsMap.values() ];
						}
						var index = chequeRangeArray.indexOf(record.getData("fromChqNo")+"-"+record.getData("toChqNo")+"-"+record.getData("deptCode")+"-"+record.getData("serialNoH"));
						chequeRangeArray.splice(index,1);
						if(record.getData("chequeDeptId")){ // for new cheque leaf records the chequeDeptId value will be blank
							document.getElementById("deletedChqDeptId").value = document.getElementById("deletedChqDeptId").value==""?record.getData("chequeDeptId"):document.getElementById("deletedChqDeptId").value+","+record.getData("chequeDeptId");
							
						}
						
					}
			}
			
           });
	
	<c:forEach value="chequeDetailsList" status="stat">
		chequeDetailsGridTable.addRow({
			"fromChqNo":'${fromChqNo}',
			"toChqNo":'${toChqNo}',
			"deptName":'${deptName}',
			"deptCode":'${deptCode}',
			"receivedDateL":'${receivedDate}',
			"receivedDateH":'${receivedDate}',
			"serialNoL":'${serialNoH}',
			"serialNoH":'${serialNo}',
			"isExhustedL":'${isExhusted}',
			"isExhustedH":'${isExhusted}',
			"nextChqPresent":'${nextChqPresent}',
			"accountChequeId":'${accountChequeId}',
			"chequeDeptId":'${chequeDeptId}'
		});
		updateFieldChq('fromChqNo',chqDetailsIndex,'${fromChqNo}','${nextChqPresent}','${isExhusted}');
		updateFieldChq('toChqNo',chqDetailsIndex,'${toChqNo}','${nextChqPresent}','${isExhusted}');
		updateLabel('deptName',chqDetailsIndex,'${deptName}');
		updateField('deptCode',chqDetailsIndex,'${deptCode}');
		updateLabel('receivedDateL',chqDetailsIndex,'${receivedDate}');
		updateField('receivedDate',chqDetailsIndex,'${receivedDate}');
		updateLabel('serialNoL',chqDetailsIndex,'${serialNoH}');
		updateField('serialNo',chqDetailsIndex,'${serialNo}');
		updateLabel('isExhustedL',chqDetailsIndex,'${isExhusted}');
		updateField('isExhusted',chqDetailsIndex,'${isExhusted}');
		updateField('accountChequeId',chqDetailsIndex,'${accountChequeId}');
		updateField('chequeDeptId',chqDetailsIndex,'${chequeDeptId}');
		updateField('nextChqPresent',chqDetailsIndex,'${nextChqPresent}');
		chqDetailsIndex = chqDetailsIndex + 1;
		var chequeRowDetails = "<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->;";
		var key = "<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->~<!-- TODO: Manual migration required for custom Struts tag -->";
		chequeDetailsMap.set(key,chequeRowDetails);
		var chequeRange = '${fromChqNo}'+"-"+'${toChqNo}'+"-"+'${deptCode}'+"-"+'${serialNo}';
		if(chequeRangeArray.indexOf(chequeRange) == -1){
			chequeRangeArray.push(chequeRange);
		}
		
        </c:forEach>
        document.getElementById('chequeDetailsRowId').value =[ ...chequeDetailsMap.values() ];
}

	var modifyChequeDetailRows = function(key, value){
		chequeDetailsMap.set(key,value);
		document.getElementById('chequeDetailsRowId').value = [ ...chequeDetailsMap.values() ];
	}

function createLabelSamll(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<label id='"+prefix+"["+chqDetailsIndex+"]"+suffix+"'  size='1' style='font-size:0.9em;'/>";
	}
}
function createTextField(prefix,suffix){
	
	 return function(el, oRecord, oColumn, oData) {
			var value = (YAHOO.lang.isValue(oData))?oData:"";
			el.innerHTML = "<input type='text'  id='"+prefix+"["+chqDetailsIndex+"]"+suffix+"' name='"+prefix+"["+chqDetailsIndex+"]"+suffix+"' onblur='validateCheque(this);' style='width:130px;' maxlength='18' onkeyup='validateOnlyNumber(this);'/>";
		}
}
function createHiddenField(prefix,suffix,type){
	 return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
		el.innerHTML = "<input type='"+type+"' name='"+prefix+"["+chqDetailsIndex+"]"+suffix+"' id='"+prefix+"["+chqDetailsIndex+"]"+suffix+"'/>";
	}
	
}
function updateFieldChq(field,index,value,nxtChqPrsnt,isExhausted){
	
	document.getElementById(CHQDETAILSLIST+'['+index+'].'+field).value =value;
	if(nxtChqPrsnt=="Yes" || isExhausted =="Yes" ){
		document.getElementById(CHQDETAILSLIST+'['+index+'].'+field).readOnly=true;
	}
}
function updateField(field,index,value){
	
	document.getElementById(CHQDETAILSLIST+'['+index+'].'+field).value =value;
}
function updateLabel(field,index,value){
	document.getElementById(CHQDETAILSLIST+'['+index+'].'+field).innerHTML =value;
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

.yui-skin-sam td.yui-dt-col-isExhusted .yui-dt-liner {
	text-align: center;
}

.subheadcustom {
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
	color: #000000;
	background-color: #CCCCCC;
	text-align: center;
	padding-right: 8px;
	padding-left: 8px;
	border: 1px solid #CCCCCC;
	padding-top: -2px;
	padding-bottom: -2px;
}
</style>
