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
<html>
<head>
 <link rel="stylesheet" type="text/css"
	href="/services/EGF/resources/commonyui/yui2.7/paginator/assets/skins/sam/paginator.css">
<script src="/services/EGF/resources/commonyui/yui2.7/paginator/paginator-min.js"></script>

<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<style>
.budgetSearch {
	overflow: hidden;
	font-size: 12px;
	width: 90px;
}
.
</style>
</head>
<body>
	<jsp:include page="budgetHeader.jsp">
		<jsp:param name="heading" value="Budget Details" />
	</jsp:include>
	<c:if test="%{not savedbudgetDetailList.empty}">
		<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
		<div class="yui-skin-sam">
		<td class="bluebox">
		<strong><!-- TODO: Manual migration required for custom Struts tag --></strong>
		</td>
		
			<div id="budgetDetailTable"
				style="width: 100%; overflow-x: auto; overflow-y: hidden;"></div>
		</div>
		<script>
			function createAmountFieldFormatter(values,prefix,suffix){
			    return function(el, oRecord, oColumn, oData) {
					var value = (YAHOO.lang.isValue(oData))?oData:"";
				    value = budgetDetailsTable.getRecordIndex(oRecord)>=values.length?0.0:values[budgetDetailsTable.getRecordIndex(oRecord)]
					el.innerHTML = "<label id='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' name='"+prefix+"["+budgetDetailsTable.getRecordIndex(oRecord)+"]"+suffix+"' style='text-align:right'>"+value+"</label>";
				}
			}
			
			var budgetDetailTable = function() {
				var budgetDetailColumns = [ 
					{key:"budget.id",label:'Budget',width:90,className:"budgetSearch", sortable:true},
					{key:"budgetGroup.id",label:'Budget Group',className:"budgetSearch",sortable:true,width:200},
					<c:if test="%{shouldShowHeaderField('executingDepartment') || shouldShowGridField('executingDepartment')}">
						{key:"executingDepartment", label:'Executing Department',className:"budgetSearch",sortable:true},
					</c:if>
					<c:if test="%{shouldShowHeaderField('functionary') || shouldShowGridField('functionary')}">				
						{key:"functionary.id",label:'Functionary',className:"budgetSearch",sortable:true} ,
					</c:if>
					<c:if test="%{shouldShowHeaderField('function') || shouldShowGridField('function')}">
						{key:"function.id",label:'Function',className:"budgetSearch",sortable:true,width:90} ,
					</c:if>
					<c:if test="%{shouldShowHeaderField('scheme') || shouldShowGridField('scheme')}">
						{key:"scheme.id",label:'Scheme',className:"budgetSearch",sortable:true} ,
					</c:if>
					<c:if test="%{shouldShowHeaderField('subScheme') || shouldShowGridField('subScheme')}">
						{key:"subScheme.id",label:'Sub Scheme',className:"budgetSearch",sortable:true} ,
					</c:if>
					<c:if test="%{shouldShowHeaderField('fund') || shouldShowGridField('fund')}">
						{key:"fund.id",label:'Fund',width:90,className:"budgetSearch",sortable:true} ,
					</c:if>
					<c:if test="%{shouldShowHeaderField('boundary') || shouldShowGridField('boundary')}">
						{key:"boundary.id",label:'Field',className:"budgetSearch",sortable:true} ,
					</c:if>
						{key:"anticipatoryAmount",label:'Anticipatory Upto<br/>31 March',className:"budgetSearch"},
						{key:"amount",label:'Estimate Amount',width:"50em"},
						{key:"actual_previous_year",label:'${previousfinYearRange} Actual <br/> Amount',className:"budgetSearch"},
						<c:if test="%{re}">
							{key:"actual_current_year",label:'${currentfinYearRange} Revised<br/> Actual Amount',className:"budgetSearch"},
							{key:"estimate_current_year",label:'${currentfinYearRange} Revised<br/> Approved Amount',className:"budgetSearch"},
						</c:if>
						<c:otherwise>
							{key:"actual_current_year",label:'${currentfinYearRange} Actual<br/> Amount',className:"budgetSearch"},
							{key:"estimate_current_year",label:'${currentfinYearRange} Approved<br/> Amount',className:"budgetSearch"},
						</s:else>
						{key:"reappropriation_amount",label:'Total <br/>Reappropriation Amount',className:"budgetSearch"},
						{key:"approved_amount",label:'Total <br/>Approved Amount',className:"budgetSearch"},
						{key:"comment",label:'Comments',className:"budgetSearch"},
						/* {key:"document",label:'Documents',className:"budgetSearch"} */
				];
				var myConfigs = {
    				paginator : new YAHOO.widget.Paginator({
        				rowsPerPage: 10
    				})
				};
			    var budgetDetailDS = new YAHOO.util.DataSource(); 
				budgetDetailsTable = new YAHOO.widget.DataTable("budgetDetailTable",budgetDetailColumns, budgetDetailDS,myConfigs);	
				budgetDetailsTable.on('cellClickEvent',function (oArgs) {
					var target = oArgs.target;
					var record = this.getRecord(target);
					var column = this.getColumn(target);
					if (column.key == 'Delete') { 			
						this.deleteRow(record);
						allRecords=this.getRecordSet();
						for(i=0;i<allRecords.getLength();i++){
							this.updateCell(this.getRecord(i),this.getColumn('SlNo'),""+(i+1));
						}
					}        
				});
					<c:forEach value="savedbudgetDetailList" status="stat" var="p">
						budgetDetailsTable.addRow({SlNo:budgetDetailsTable.getRecordSet().getLength()+1,
							"budget.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							"budgetGroup.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							<c:if test="%{shouldShowHeaderField('executingDepartment') || shouldShowGridField('executingDepartment')}">
								"executingDepartment":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							<c:if test="%{shouldShowHeaderField('functionary') || shouldShowGridField('functionary')}">				
								"functionary.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							<c:if test="%{shouldShowHeaderField('function') || shouldShowGridField('function')}">
								"function.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							<c:if test="%{shouldShowHeaderField('scheme') || shouldShowGridField('scheme')}">
								"scheme.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							<c:if test="%{shouldShowHeaderField('subScheme') || shouldShowGridField('subScheme')}">
								"subScheme.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							<c:if test="%{shouldShowHeaderField('fund') || shouldShowGridField('fund')}">
								"fund.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							<c:if test="%{shouldShowHeaderField('boundary') || shouldShowGridField('boundary')}">
								"boundary.id":"<!-- TODO: Manual migration required for custom Struts tag -->",
							</c:if>
							"anticipatoryAmount":'${anticipatoryAmount}',
							"amount":'${originalAmount}',
							<c:if test="%{previousYearBudgetDetailIdsAndAmount[#p.id.toString()] != null}">
								"actual_previous_year":'${%{previousYearBudgetDetailIdsAndAmount[#p.id.toString()]}}',
							</c:if>
							<c:otherwise>
								"actual_previous_year":'0.00',
							</s:else>
							<c:if test="%{budgetDetailIdsAndAmount[#p.id.toString()] != null}">
								"actual_current_year":'${%{budgetDetailIdsAndAmount[#p.id.toString()]}}',
							</c:if>
							<c:otherwise>
								"actual_current_year":'0.00',
							</s:else>
							<c:if test="%{re}">
								"estimate_current_year":'${budgetAmountView[#stat.index].currentYearReApproved}',
							</c:if>
							<c:otherwise>
								"estimate_current_year":'${budgetAmountView[#stat.index].currentYearBeApproved}',
							</s:else>
							"reappropriation_amount":'${%{(approvedReAppropriationsTotal.setScale(2).toString())/1000}}',
							"approved_amount":'${%{calculateTotal(#p)}}',
							"comment":'${comment}',
							/* "document":'<input type="submit" class="buttonsubmit" value="View" onclick="'+'viewDocumentManager(${#p.documentNumber});return false;"/>' */
						});
					</c:forEach>
			}
			budgetDetailTable();
			</script>
	</c:if>
	<c:otherwise>
		<div class="error">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
	</s:else>
	<br />
	<br />
	<br />
</body>
</html>
