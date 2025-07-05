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
var defaultDept = '${executingDepartment.id}'

function updateAllGridValues(){
	if(document.getElementById('budgetDetail_budget')){
		updateHiddenFields('budget.id',document.getElementById('budgetDetail_budget').value);
	}
	if(document.getElementById('budgetDetail_executingDepartment')){
		if(defaultDept != null && defaultDept!='' && document.getElementById('budgetDetail_executingDepartment').selectedIndex==0){
			document.getElementById('budgetDetail_executingDepartment').selectedIndex = defaultDept;
		}
		updateGrid('executingDepartment.id',document.getElementById('budgetDetail_executingDepartment').selectedIndex);
	}
	if(document.getElementById('budgetDetail_function'))
		updateGrid('function.id',document.getElementById('budgetDetail_function').selectedIndex);
	if(document.getElementById('budgetDetail_functionary'))
		updateGrid('functionary.id',document.getElementById('budgetDetail_functionary').selectedIndex);
	if(document.getElementById('budgetDetail_scheme'))
		updateGrid('scheme.id',document.getElementById('budgetDetail_scheme').selectedIndex);
	if(document.getElementById('budgetDetail_subScheme'))
		updateGrid('subScheme.id',document.getElementById('budgetDetail_subScheme').selectedIndex);
	if(document.getElementById('budgetDetail_fund'))
		updateGrid('fund.id',document.getElementById('budgetDetail_fund').selectedIndex);
	if(document.getElementById('budgetDetail_boundary'))
		updateGrid('boundary.id',document.getElementById('budgetDetail_boundary').selectedIndex);

}

var gridReappropriation = [];
var gridPreviousYearActuals = [];
var gridOldActuals = [];
var gridCurrentYearActuals = [];
var gridCurrentYearApproved = [];
var gridCurrentYearTotal = [];
<c:forEach value="budgetAmountView" status="stat">
	gridReappropriation.push('${budgetAmountView[#stat.index].reappropriation}');
	gridPreviousYearActuals.push('${budgetAmountView[#stat.index].previousYearActuals}');
	gridOldActuals.push('${budgetAmountView[#stat.index].oldActuals}');
	gridCurrentYearActuals.push('${budgetAmountView[#stat.index].currentYearBeActuals}');
	gridCurrentYearApproved.push('${budgetAmountView[#stat.index].currentYearBeApproved}');
	gridCurrentYearTotal.push('${budgetAmountView[#stat.index].total}');
</c:forEach>

function createAmountFieldFormatter(values,prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
	    value = budgetDetailsTable.getRecordIndex(oRecord)>=values.length?0.0:values[budgetDetailsTable.getRecordIndex(oRecord)]
		el.innerHTML = "<label id='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' name='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' style='text-align:right'>"+value+"</label>";
	}
}


	var budgetGroupOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.budgetGroupList">
	    budgetGroupOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
	</c:forEach>
	<c:if test="%{shouldShowField('executingDepartment')}">		
	   	var executingDepartmentOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.executingDepartmentList">
			executingDepartmentOptions.push({label:"${deptName.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
	</c:if>
	<c:if test="%{shouldShowField('function')}">		
		var functionOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.functionList">
	    	functionOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
  	</c:if>
   	<c:if test="%{shouldShowField('functionary')}">		
		var functionaryOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.functionaryList">
	    	functionaryOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
   	</c:if>
   	<c:if test="%{shouldShowField('scheme')}">		
		var schemeOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.schemeList">
	    	schemeOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
   	</c:if>
   	<c:if test="%{shouldShowField('subScheme')}">		
		var subSchemeOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.subSchemeList">
	    	subSchemeOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
   	</c:if>
   	<c:if test="%{shouldShowField('fund')}">		
		var fundOptions=[{label:"--- Select ---", value:"0"}];
		<c:forEach value="dropdownData.fundList">
	    	fundOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
   	</c:if>
   	<c:if test="%{shouldShowField('boundary')}">		
		var boundaryOptions=[{label:"--- Select ---", value:"0"}];		
		<c:forEach value="dropdownData.boundaryList">
			boundaryOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
		</c:forEach>
	</c:if>
		
		function addGridRows(){
			<c:forEach value="budgetDetailList" status="stat">
				budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1,
					"id":'${id}',
					"documentNumber":'${documentNumber}',
					"budget.id":'${budget.id}',
					"budgetGroup.id":'${budgetGroup.id}',
					<c:if test="%{shouldShowField('executingDepartment')}">				
						"executingDepartment.id":'${executingDepartment.id}',
					</c:if>
					<c:if test="%{shouldShowField('functionary')}">				
						"functionary.id":'${functionary.id}',
					</c:if>
					<c:if test="%{shouldShowField('function')}">				
						"function.id":'${function.id}',
					</c:if>
					<c:if test="%{shouldShowField('scheme')}">				
						"scheme.id":'${scheme.id}',
					</c:if>
					<c:if test="%{shouldShowField('subScheme')}">				
						"subScheme.id":'${subScheme.id}',
					</c:if>
					<c:if test="%{shouldShowField('fund')}">				
						"fund.id":'${fund.id}',
					</c:if>
					<c:if test="%{shouldShowField('boundary')}">				
						"boundary.id":'${boundary.id}',
					</c:if>
					"old_actuals":'${budgetAmountView[#stat.index].oldActuals}',
					"actual_previous_year":'${budgetAmountView[#stat.index].previousYearActuals}',
					"approved_current_year":'${budgetAmountView[#stat.index].currentYearBeApproved}',
					"reappropriation":'${budgetAmountView[#stat.index].reappropriation}',
					"total":'${budgetAmountView[#stat.index].total}',
					"actual_current_year":'${budgetAmountView[#stat.index].currentYearBeActuals}',
					"anticipatoryAmount":'${anticipatoryAmount}',
					
					"re_amount":'${originalAmount}',
					"be_next_year_amount":'${beAmounts[#stat.index]}'
				});
			</c:forEach>
		}

		function mandatorySign(field){
			var mandatoryFields = {}
			mandatoryFields.executingDepartment = <c:if test="%{isFieldMandatory('executingDepartment')}">true</c:if><c:otherwise>false</s:else>;
			mandatoryFields.Function = <c:if test="%{isFieldMandatory('function')}">true</c:if><c:otherwise>false</s:else>;
			mandatoryFields.functionary = <c:if test="%{isFieldMandatory('functionary')}">true</c:if><c:otherwise>false</s:else>;
			mandatoryFields.scheme = <c:if test="%{isFieldMandatory('scheme')}">true</c:if><c:otherwise>false</s:else>;
			mandatoryFields.subScheme = <c:if test="%{isFieldMandatory('subScheme')}">true</c:if><c:otherwise>false</s:else>;
			mandatoryFields.boundary = <c:if test="%{isFieldMandatory('boundary')}">true</c:if><c:otherwise>false</s:else>;
			mandatoryFields.fund = <c:if test="%{isFieldMandatory('fund')}">true</c:if><c:otherwise>false</s:else>;
			if(mandatoryFields[field] == true)
				return '<span class="mandatory">*</span>';
			else 
				return ''; 
		}

	var currentYearRange = '${currentYearRange}(Rs)'; 
	var nextYearRange = '${nextYearRange}(Rs)';
	var currentYear = 'Actuals Up To(Rs)';
	var curentYearRangeWithoutRs='${currentYearRange}';
	var currentFullYear=curentYearRangeWithoutRs.substr(0,2)+curentYearRangeWithoutRs.substr(5,7);
	var previousYear = 'Actuals<br/>${previousYearRange}(Rs)';
	var lastButOneYear = 'Actuals<br/>${lastButOneYearRange}(Rs)';
	var currentYearApproved = 'BE <br/>${currentYearRange}(Rs)(A)';
	var anticipatoryAmountLable='Anticipatory Upto<br/> 31 March '+currentFullYear+' (Rs)';
	var makeBudgetDetailTable = function() {
		var budgetDetailColumns = [ 
			{key:"id",label:'documentNumber',hidden:true, formatter:createIdFieldFormatter("budgetDetailList",".id")},
			{key:"documentNumber",label:'documentNumber',hidden:true, formatter:createHiddenTextFieldFormatter("budgetDetailList",".documentNumber")},
			<c:if test="%{shouldShowField('fund')}">				
				{key:"fund.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+mandatorySign('fund'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:fundOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('function')}">				
				{key:"function.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+mandatorySign('Function'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:functionOptions} ,
			</c:if>
			{key:"budget.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->',width:90, formatter:createHiddenTextFieldFormatter("budgetDetailList",".budget.id")},
			{key:"budgetGroup.id",label:'Budget Group <span class="mandatory">*</span>',width:90, formatter:createDropdownFormatter(BUDGETDETAILLIST),dropdownOptions:budgetGroupOptions},
			<c:if test="%{shouldShowField('executingDepartment')}">				
				{key:"executingDepartment.id", label:'Executing Department'+mandatorySign('executingDepartment'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST), dropdownOptions:executingDepartmentOptions},				
			</c:if>
			<c:if test="%{shouldShowField('functionary')}">				
				{key:"functionary.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+mandatorySign('functionary'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:functionaryOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('scheme')}">				
				{key:"scheme.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+mandatorySign('scheme'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:schemeOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('subScheme')}">				
				{key:"subScheme.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+mandatorySign('subScheme'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:subSchemeOptions} ,
			</c:if>
			
			<c:if test="%{shouldShowField('boundary')}">				
				{key:"boundary.id",label:'<!-- TODO: Manual migration required for custom Struts tag -->'+mandatorySign('boundary'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:boundaryOptions} ,
			</c:if>
			{key:"old_actuals",label:lastButOneYear,width:90, formatter:createAmountFieldFormatter(gridOldActuals,"budgetAmountView",".oldActuals")},
			{key:"actual_previous_year",label:previousYear,width:90, formatter:createAmountFieldFormatter(gridPreviousYearActuals,"budgetAmountView",".previousYearActuals")},
			{key:"approved_current_year",label:currentYearApproved,width:"40em", formatter:createAmountFieldFormatter(gridCurrentYearApproved,"budgetAmountView","currentYearBeApproved")},
			{key:"reappropriation",label:'<!-- TODO: Manual migration required for custom Struts tag -->(B)',width:150, formatter:createAmountFieldFormatter(gridReappropriation,"budgetAmountView",".reappropriation")},
			{key:"total",label:'Total(A+B)<br/>'+currentYearRange,width:150, formatter:createAmountFieldFormatter(gridCurrentYearTotal,"budgetAmountView",".total")},
			{key:"actual_current_year",label:currentYear, width:"40em",formatter:createAmountFieldFormatter(gridCurrentYearActuals,"budgetAmountView","currentYearBeActuals")},
			{key:"anticipatoryAmount",label:anticipatoryAmountLable,width:"50em", formatter:createAnticipatoryFieldFormatter(BUDGETDETAILLIST,".anticipatoryAmount")},
			{key:"re_amount",label:'RE '+'<br/>'+currentYearRange+'<span class="mandatory">*</span>',width:"50em", formatter:createTextFieldFormatterOnblur(BUDGETDETAILLIST,".originalAmount")},
			{key:"be_next_year_amount",label:'BE '+'<br/>'+nextYearRange+'<span class="mandatory">*</span>',width:"50em", formatter:createTextFieldFormatter("beAmounts","")},
			{key:'Add',label:'Add',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Delete',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")},
			{key:'Upload',label:'Upload',formatter:createDocUploadFormatter("budgetDetailsTable","budgetDetailList",".documentNumber")}
		];
	    var budgetDetailDS = new YAHOO.util.DataSource(); 
		budgetDetailsTable = new YAHOO.widget.DataTable("budgetDetailTable",budgetDetailColumns, budgetDetailDS);	
		budgetDetailsTable.on('cellClickEvent',function (oArgs) {
			var target = oArgs.target;
			var record = this.getRecord(target);
			var column = this.getColumn(target);
			if (column.key == 'Add') { 
				budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1});
				updateAllGridValues();
			}
			if (column.key == 'Delete') { 			
				if(this.getRecordSet().getLength()>1){			
					this.deleteRow(record);
					allRecords=this.getRecordSet();
					for(i=0;i<allRecords.getLength();i++){
						this.updateCell(this.getRecord(i),this.getColumn('SlNo'),""+(i+1));
					}
				}
				else{
					bootbox.alert("This row can not be deleted");
				}
			}        
		});
		<c:if test="%{budgetDetailList.size() == 0 && getActionErrors().size()==0 && getFieldErrors().size()==0}">
			budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1});
			updateAllGridValues();
		</c:if>
	}


	var listValues = new Array(${budgetDetailList.size});
	<c:forEach value="budgetDetailList" status="stat">
		listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetGroup.id"] = <c:if test="budgetGroup.id">${budgetGroup.id}</c:if><c:otherwise>0</s:else>;
		listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].id"] = <c:if test="id">${id}</c:if><c:otherwise>0</s:else>;
		<c:if test="%{shouldShowField('executingDepartment')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].executingDepartment.id"] = <c:if test="executingDepartment.id">${executingDepartment.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('function')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].function.id"] = <c:if test="function.id">${function.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('functionary')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].functionary.id"] = <c:if test="functionary.id">${functionary.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('scheme')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].scheme.id"] = <c:if test="scheme.id">${scheme.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('subScheme')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].subScheme.id"] = <c:if test="subScheme.id">${subScheme.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('fund')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].fund.id"] = <c:if test="fund.id">${fund.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('boundary')}">				
			listValues["budgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].boundary.id"] = <c:if test="boundary.id">${boundary.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
	</c:forEach>

	function setValues(){
		for (key in listValues){
			setSelectedIndex(key)
		} 
	}

	function hideColumns(){
		<c:if test="%{!gridFields.contains('budget')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budget.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('executingDepartment')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('executingDepartment.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('function')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('function.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('functionary')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('functionary.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('scheme')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('scheme.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('subScheme')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('subScheme.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('fund')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('fund.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('boundary')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('boundary.id'))
		</c:if>
	}

	function makeJSONCall(fields,url,params,onSuccess,onFailure){
		 dataSource=new YAHOO.util.DataSource(url);
		            dataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
		            dataSource.connXhrMode = "queueRequests";
		            dataSource.responseSchema = {
		                resultsList: "ResultSet.Result",
		                fields: fields
		            };
			        var callbackObj = {
		            success : onSuccess,
		            failure : onFailure
		        };
		        dataSource.sendRequest("?"+toQuery(params),callbackObj);
		}

		function toQuery(params){
		   var query="";
		   for(var f in params){
		     query+=f+"="+params[f]+"&"
		   }
		   if(query.lastIndexOf('&')==query.length-1) query=query.substring(0,query.length-1);
		   return query;
		}	
		
	function updateREamount(obj)
	{
	var name=obj.name;
	var actualName=name.replace('.anticipatoryAmount','currentYearBeActuals');
	actualName=actualName.replace('budgetDetailList','budgetAmountView');
	var actualAmt=0;
	var anticipAmt=0;
	if(parseFloat(document.getElementById(actualName).innerHTML)!=NaN)
	{
	actualAmt=parseFloat(document.getElementById(actualName).innerHTML);
	}
	if(parseFloat(document.getElementById(name).value)!=NaN)
	{
	anticipAmt=parseFloat(document.getElementById(name).value);
	}
	var reName=obj.name.replace('anticipatoryAmount','originalAmount');
	document.getElementById(reName).value=actualAmt+anticipAmt;   
	}
		
		
</SCRIPT>
