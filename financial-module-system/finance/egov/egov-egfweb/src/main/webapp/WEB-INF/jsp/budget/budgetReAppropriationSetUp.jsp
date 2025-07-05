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


<SCRIPT type="text/javascript">
var defaultDept = '${executingDepartment.id}'
var BUDGETDETAILLIST='budgetReAppropriationList';

function createTextFieldFormatter(prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:0.00;
		el.innerHTML = "<input type='text' id='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' name='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' value='"+value+"' style='text-align:right;width:90px;' maxlength='15'/>";
	}
}
function updateGrid(field,index){
	if(budgetDetailsTable != null){
		len = budgetDetailsTable.getRecordSet().getLength()
		count=0;
		i=0;
		while(count < len){
			element=document.getElementById('budgetReAppropriationList['+i+'].'+field)
			if(element){
				element.selectedIndex = index;
				count++;
			}
			i++;
		}
	}
}
function updateAllGridValues(){
	if(document.getElementById('budgetReAppropriation_executingDepartment')){
		if(defaultDept != null && defaultDept!='' && document.getElementById('budgetReAppropriation_executingDepartment').selectedIndex==0){
			document.getElementById('budgetReAppropriation_executingDepartment').selectedIndex = defaultDept;
		}
		updateGrid('budgetDetail.executingDepartment.id',document.getElementById('budgetReAppropriation_executingDepartment').selectedIndex);
	}
	if(document.getElementById('budgetReAppropriation_function'))
		updateGrid('budgetDetail.function.id',document.getElementById('budgetReAppropriation_function').selectedIndex);
	if(document.getElementById('budgetReAppropriation_functionary'))
		updateGrid('budgetDetail.functionary.id',document.getElementById('budgetReAppropriation_functionary').selectedIndex);
	if(document.getElementById('budgetReAppropriation_scheme'))
		updateGrid('budgetDetail.scheme.id',document.getElementById('budgetReAppropriation_scheme').selectedIndex);
	if(document.getElementById('budgetReAppropriation_subScheme'))
		updateGrid('budgetDetail.subScheme.id',document.getElementById('budgetReAppropriation_subScheme').selectedIndex);
	if(document.getElementById('budgetReAppropriation_fund'))
		updateGrid('budgetDetail.fund.id',document.getElementById('budgetReAppropriation_fund').selectedIndex);
	if(document.getElementById('budgetReAppropriation_boundary'))
		updateGrid('budgetDetail.boundary.id',document.getElementById('budgetReAppropriation_boundary').selectedIndex);

}

function createAmountFieldFormatter(values,prefix,suffix){
    return function(el, oRecord, oColumn, oData) {
		var value = (YAHOO.lang.isValue(oData))?oData:"";
	    value = budgetDetailsTable.getRecordIndex(oRecord)>=values.length?0.00:values[budgetDetailsTable.getRecordIndex(oRecord)]
		el.innerHTML = "<div id='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' name='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' style='text-align:right'>"+value+"</div>";
	}
}

	var budgetOptions=[{label:"--- Select ---", value:"0"}];
	<c:forEach value="dropdownData.budgetList">
	    budgetOptions.push({label:"${name.replaceAll('\n',' ')}", value:'${id}'})
	</c:forEach>
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
	var changeRequested = [{label:"Addition", value:"Addition"},{label:"Deduction", value:"Deduction"}];		
		function addGridRows(){
			<c:forEach value="budgetReAppropriationList" status="stat">
				budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1,
					"budgetDetail.budgetGroup.id":'${budgetDetail.budgetGroup.id}',
					<c:if test="%{shouldShowField('executingDepartment')}">				
						"budgetDetail.executingDepartment.id":'${budgetDetail.executingDepartment.id}',
					</c:if>
					<c:if test="%{shouldShowField('functionary')}">				
						"budgetDetail.functionary.id":'${budgetDetail.functionary.id}',
					</c:if>
					<c:if test="%{shouldShowField('function')}">				
						"budgetDetail.function.id":'${budgetDetail.function.id}',
					</c:if>
					<c:if test="%{shouldShowField('scheme')}">				
						"budgetDetail.scheme.id":'${budgetDetail.scheme.id}',
					</c:if>
					<c:if test="%{shouldShowField('subScheme')}">				
						"budgetDetail.subScheme.id":'${budgetDetail.subScheme.id}',
					</c:if>
					<c:if test="%{shouldShowField('fund')}">				
						"budgetDetail.fund.id":'${budgetDetail.fund.id}',
					</c:if>
					<c:if test="%{shouldShowField('boundary')}">				
						"budgetDetail.boundary.id":'${budgetDetail.boundary.id}',
					</c:if>
					"planningPercent":'${planningPercent}',
					"approved":'${approvedAmount}',
					"planningBudgetApproved":'${planningBudgetApproved}',
					"actuals":'${actuals}',
					"planningBudgetUsage":'${planningBudgetUsage}',
					"available":'${availableAmount}',
					"planningBudgetAvailable":'${planningBudgetAmount}',
					"anticipatoryAmount":'${anticipatoryAmount}',
					"changeRequestType":'${changeRequestType}',
					"amount":'${deltaAmount}',
					"total_available":'${originalAmount}',
					"newPlanningBudgetAvailable":'${newPlanningBudget}'
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
				return '<span class="mandatory1">*</span>';
			else 
				return ''; 
		}
	var planningPercentageList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
		planningPercentageList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var planningBudgetApprovedList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
		planningBudgetApprovedList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var planningBudgetUsageList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
		planningBudgetUsageList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var planningBudgetAvailableList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
		planningBudgetAvailableList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var approvedAmountList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
			approvedAmountList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var appropriatedAmountList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
			appropriatedAmountList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var actualsList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
			actualsList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
	var availableList=[];		
		<c:forEach value="budgetReAppropriationList" status="stat">
			availableList.push('<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>');
		</c:forEach>
		
	var makeBudgetDetailTable = function() {
		var budgetDetailColumns = [ 
			{key:"budgetDetail.budgetGroup.id",label:'Budget Group <span class="mandatory1">*</span>',width:120, formatter:createDropdownFormatter(BUDGETDETAILLIST),dropdownOptions:budgetGroupOptions},
			<c:if test="%{shouldShowField('executingDepartment')}">				
				{key:"budgetDetail.executingDepartment.id", label:'Executing Department'+mandatorySign('executingDepartment'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST), dropdownOptions:executingDepartmentOptions},				
			</c:if>
			<c:if test="%{shouldShowField('functionary')}">				
				{key:"budgetDetail.functionary.id",label:'Functionary'+mandatorySign('functionary'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:functionaryOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('function')}">				
				{key:"budgetDetail.function.id",label:'Function'+mandatorySign('Function'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:functionOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('scheme')}">				
				{key:"budgetDetail.scheme.id",label:'Scheme'+mandatorySign('scheme'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:schemeOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('subScheme')}">				
				{key:"budgetDetail.subScheme.id",label:'Sub Scheme'+mandatorySign('subScheme'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:subSchemeOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('fund')}">				
				{key:"budgetDetail.fund.id",label:'Fund'+mandatorySign('fund'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:fundOptions} ,
			</c:if>
			<c:if test="%{shouldShowField('boundary')}">				
				{key:"budgetDetail.boundary.id",label:'Field'+mandatorySign('boundary'),width:90,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:boundaryOptions} ,
			</c:if>
			{key:"planningPercent",label:'Planning Percentage',width:"30em", formatter:createAmountFieldFormatter(planningPercentageList,BUDGETDETAILLIST,".planningPercent")},
			{key:"approved",label:'Sanctioned<br/>Budget(Rs)',width:120, formatter:createAmountFieldFormatter(approvedAmountList,BUDGETDETAILLIST,".approvedAmount")},
			{key:"appropriated",label:'Added/Released<br/>(Rs)',width:120, formatter:createAmountFieldFormatter(appropriatedAmountList,BUDGETDETAILLIST,".appropriatedAmount")},
			{key:"planningBudgetApproved",label:'Planning Budget<br/> Approved(Rs)',width:"50em", formatter:createAmountFieldFormatter(planningBudgetApprovedList,BUDGETDETAILLIST,".planningBudgetApproved")},
			{key:"actuals",label:'Expenditure <br/>Incurred(Rs)',width:120, formatter:createAmountFieldFormatter(actualsList,BUDGETDETAILLIST,".actuals")},
			{key:"planningBudgetUsage",label:'Planning Budget<br/>Usage(Rs)',width:"50em", formatter:createAmountFieldFormatter(planningBudgetUsageList,BUDGETDETAILLIST,".planningBudgetUsage")},
			{key:"available",label:'Balance Fund <br/>Available(Rs)',width:120, formatter:createAmountFieldFormatter(availableList,BUDGETDETAILLIST,".availableAmount")},
			{key:"planningBudgetAvailable",label:'Planning Budget<br/>Available(Rs)',width:"50em", formatter:createAmountFieldFormatter(planningBudgetAvailableList,BUDGETDETAILLIST,".planningBudgetAvailable")},
			{key:"anticipatoryAmount",label:'Anticipated<br/>Expenditure(Rs)',width:120, formatter:createTextFieldFormatter(BUDGETDETAILLIST,".anticipatoryAmount")},
			{key:"changeRequestType",label:'Change Requested',width:105,formatter:createDropdownFormatter(BUDGETDETAILLIST),  dropdownOptions:changeRequested} ,
			{key:"amount",label:'Addition of <br/>Funds sought(Rs)',width:"50em", formatter:createTextFieldFormatterWithOnBlur('budgetDetailsTable',BUDGETDETAILLIST,".deltaAmount")},
			{key:"total_available",label:'Budget Provision avail<br/> after Additional Appropriation(Rs)',width:"50em", formatter:createAmountFieldFormatter(actualsList,BUDGETDETAILLIST,".remainingAmount")},
			{key:"newPlanningBudgetAvailable",label:'New Planning Budget<br/> Available(Rs)',width:"50em", formatter:createAmountFieldFormatter(planningBudgetAvailableList,BUDGETDETAILLIST,".newPlanningBudgetAvailable")},
			{key:'Add',label:'Add',formatter:createAddImageFormatter("${pageContext.request.contextPath}")},
			{key:'Delete',label:'Delete',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}")}
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
		<c:if test="%{budgetReAppropriationList.size() == 0 && getActionErrors().size()==0 && getFieldErrors().size()==0}">
			budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1});
			updateAllGridValues();
		</c:if>
	}


	var listValues = new Array(${budgetReAppropriationList.size});
	<c:forEach value="budgetReAppropriationList" status="stat">
		listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.budgetGroup.id"] = <c:if test="budgetDetail.budgetGroup.id">${budgetDetail.budgetGroup.id}</c:if><c:otherwise>0</s:else>;
		<c:if test="%{shouldShowField('executingDepartment')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.executingDepartment.id"] = <c:if test="budgetDetail.executingDepartment.id">${budgetDetail.executingDepartment.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('function')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.function.id"] = <c:if test="budgetDetail.function.id">${budgetDetail.function.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('functionary')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.functionary.id"] = <c:if test="budgetDetail.functionary.id">${budgetDetail.functionary.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('scheme')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.scheme.id"] = <c:if test="budgetDetail.scheme.id">${budgetDetail.scheme.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('subScheme')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.subScheme.id"] = <c:if test="budgetDetail.subScheme.id">${budgetDetail.subScheme.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('fund')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.fund.id"] = <c:if test="budgetDetail.fund.id">${budgetDetail.fund.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
		<c:if test="%{shouldShowField('boundary')}">				
			listValues["budgetReAppropriationList[<!-- TODO: Manual migration required for custom Struts tag -->].budgetDetail.boundary.id"] = <c:if test="budgetDetail.boundary.id">${budgetDetail.boundary.id}</c:if><c:otherwise>0</s:else>;
		</c:if>
	</c:forEach>

	function setValues(){
		for (key in listValues){
			setSelectedIndex(key)
		} 
	}

	function hideColumns(){
		<c:if test="%{!gridFields.contains('executingDepartment')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.executingDepartment.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('function')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.function.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('functionary')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.functionary.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('scheme')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.scheme.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('subScheme')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.subScheme.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('fund')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.fund.id'))
		</c:if>
		<c:if test="%{!gridFields.contains('boundary')}">
			budgetDetailsTable.hideColumn(budgetDetailsTable.getColumn('budgetDetail.boundary.id'))
		</c:if>
	}
</SCRIPT>
