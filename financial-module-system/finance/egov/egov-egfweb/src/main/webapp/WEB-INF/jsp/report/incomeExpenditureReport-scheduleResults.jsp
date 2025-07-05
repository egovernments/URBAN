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


<script language="javascript"
	src="../resources/javascript/jsCommonMethods.js?rnd=${app_release_no}"></script>
<%@ include file="incomeExpenditureReport-form.jsp"%>
<c:if test='%{detailReport == true}'>
	<div class="buttonbottom">
		<!-- TODO: Manual migration required for custom Struts tag -->
		: <a
			href='/services/EGF/report/incomeExpenditureReport-generateDetailCodeXls.action?showDropDown=false&model.period=${model.period}&model.currency=${model.currency}&model.financialYear.id=${model.financialYear.id}&model.fund.id=${model.fund.id}&model.department.id=${model.department.id}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.field.id=${model.field.id}&model.asOndate=${model.asOndate}&majorCode=${#parameters['majorCode']}'>Excel</a>
		| <a
			href='/services/EGF/report/incomeExpenditureReport-generateDetailCodePdf.action?showDropDown=false&model.period=${model.period}&model.currency=${model.currency}&model.financialYear.id=${model.financialYear.id}&model.department.id=${model.department.id}&model.fund.id=${model.fund.id}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.field.id=${model.field.id}&model.asOndate=${model.asOndate}&majorCode=${#parameters['majorCode']}'>PDF</a>
	</div>
</c:if>
<c:otherwise>
	<div class="buttonbottom">
		<!-- TODO: Manual migration required for custom Struts tag -->
		: <a
			href='/services/EGF/report/incomeExpenditureReport-generateIncomeExpenditureScheduleXls.action?showDropDown=false&model.period=${model.period}&model.currency=${model.currency}&model.financialYear.id=${model.financialYear.id}&model.fund.id=${model.fund.id}&model.department.id=${model.department.id}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.field.id=${model.field.id}&model.asOndate=${model.asOndate}&majorCode=${#parameters['majorCode']}'>Excel</a>
		| <a
			href='/services/EGF/report/incomeExpenditureReport-generateIncomeExpenditureSchedulePdf.action?showDropDown=false&model.period=${model.period}&model.currency=${model.currency}&model.financialYear.id=${model.financialYear.id}&model.department.id=${model.department.id}&model.fund.id=${model.fund.id}&model.function.id=${model.function.id}&model.functionary.id=${model.functionary.id}&model.field.id=${model.field.id}&model.asOndate=${model.asOndate}&majorCode=${#parameters['majorCode']}'>PDF</a>
	</div>
</s:else>




<script>

function getTodayDate()
{
var date;
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
curr_month++;
var curr_year = d.getFullYear();
date=curr_date+"/"+curr_month+"/"+curr_year;
return date;
}

var todaysDate=getTodayDate();


function showDetail(glcode1, fundId,toDate,stDate){
var deptId = '${model.department.id}';
var scheduleNo = '${scheduleNo}';
var functionaryId = '${model.functionary.id}';
var functionName = '${model.function.name}';
var functionId = '${model.function.id}';
var fieldId = '${model.field.id}';	
var functionCode1=functionName+"~"+functionId;
	if(deptId == ""){
		deptId = "";
		//bootbox.alert("Hi2");
	}
if(functionaryId==0){
functionaryId="";
}

if(functionId==0){
functionCode1="";
functionId="";
}
if(fieldId==0){
fieldId="";
}
var endDate=formatDateToDDMMYYYY4(toDate); 
var startDate=formatDateToDDMMYYYY4(stDate); 
var chkd1=endDate.split('/');
var chkd2=todaysDate.split('/');
var end1=new Date(chkd1[2],chkd1[1],chkd1[0]);
var today1=new Date(chkd2[2],chkd2[1],chkd2[0]);


if(end1>=today1){
	endDate=todaysDate;                
	}    
	
	
	
	
window.open('/services/EGF/report/generalLedgerReport-searchDrilldown.action?fromBean=1&glCode1='+glcode1+'&fund_id='+fundId+'&fundSource_id=&startDate='+startDate+'&endDate='+endDate+'&departmentId='+deptId+'&functionaryId='+functionaryId+'&functionCodeId='+functionId+'&functionCode='+functionCode1+'&fieldId='+fieldId,'','resizable=yes,height=650,width=900,scrollbars=yes,left=30,top=30,status=no');
}

</script>
