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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>

</head>

<body>
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>

		<br />
		<br />

		<form:form name="budgetProposalStatusReportForm"
			action="budgetProposalStatusReport" theme="simple">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<c:if test="%{mode=='function'}">
					<tr>
						<td class="bluebox" width="15%"></td>
						<td class="bluebox" width="15%"><s:text
								name="report.Department.report" /><span class="mandatory">*</span>
						</td>
						<td class="bluebox"><form:select
								list="dropdownData.departmentList" listKey="id"
								listValue="name" name="department.id" headerKey="0"
								headerValue="--- Select ---" value="department.id"
								id="department"></form:select></td>
						<td class="bluebox" width="15%"></td>
						<td class="bluebox" width="15%"></td>
						<td class="bluebox" width="15%"></td>
					</tr>
				</c:if>
				<tr>
					<td class="bluebox" width="15%"></td>
					<td class="bluebox" width="15%"><s:text
							name="report.fund.type" /><span class="mandatory">*</span></td>
					<td class="bluebox" width="15%"><form:select path="fundType"
							id="fundType"
							list="#{'Select':'---Choose---','REVENUE':'REVENUE','CAPITAL':'CAPITAL'}"
							value="%{fundType}" /></td>
					<td class="bluebox" width="15%"></td>
					<td class="bluebox" width="15%"><s:text
							name="report.budget.type" /><span class="mandatory">*</span></td>
					<td class="bluebox" width="15%"><form:select path="budgetType"
							id="budgetType"
							list="#{'Select':'---Choose---','RECEIPTS':'RECEIPTS','EXPENDITURE':'EXPENDITURE'}"
							value="%{budgetType}" /></td>
				</tr>

			</table>

			<br />
			<br />

			<div class="buttonbottom">
				<s:submit method="search" value="Show Status"
					cssClass="buttonsubmit" onclick="return validate();" />
				<!--<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->-->
				<!-- <input type="button" class="buttonsubmit" value="EXPORT PDF" id="exportpdf" name="exportpdf" onclick="return exportPDF();"/>
			<input type="button" class="buttonsubmit" value="EXPORT EXCEL" id="exportpdf" name="exportpdf" onclick="return exportExcel();"/>  -->
				<input type="submit" value="Close"
					onclick="javascript:window.close()" class="button" />
			</div>

			<c:if test="%{mode=='function'}">
				<c:if test="%{budgetProposalStatusFuncList.size!=0}">
					<div align="center" class="extracontent">
						<h4>
							${fundType}
							${budgetType}
						</h4>
					</div>
					<table width="100%" border="0" align="center" cellpadding="0"
						cellspacing="0" class="tablebottom">

						<tr>
							<td colspan="12">
								<div class="subheadsmallnew">
									<strong>${statementheading}</strong>
								</div>
							</td>
						</tr>
						<tr>
							<td class="bluebox" colspan="4"><strong><s:text
										name="report.run.date" />:</strong>
							<!-- TODO: Manual migration required for custom Struts tag --></td>
						</tr>

						<tr>
							<th class="bluebgheadtd" style="width: 5%; text-align: center"
								align="center"></th>
							<th class="bluebgheadtd" style="width: 50%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 15%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 15%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 15%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</tr>
						<c:set var="trclass" value="greybox" />
						<c:forEach var="bp" value="budgetProposalStatusFuncList"
							status="f">
							<tr>
								<td class="blueborderfortd">
									<div align="center"></div>
								</td>
								<td class="blueborderfortd">
									<div align="left">
										${function.name}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${asstAdmin}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${smAdmin}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${hod}
										&nbsp;
									</div>
								</td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
			</c:if>

			<br></br>

			<c:if test="%{mode=='department'}">
				<c:if test="%{budgetProposalStatusDeptList.size!=0}">
					<table width="100%" border="0" align="center" cellpadding="0"
						cellspacing="0" class="tablebottom">

						<tr>
							<th class="bluebgheadtd" style="width: 10%; text-align: center"
								align="center"></th>
							<th class="bluebgheadtd" style="width: 50%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 10%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 10%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 10%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 10%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" style="width: 10%; text-align: center"
								align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</tr>
						<c:set var="trclass" value="greybox" />
						<c:forEach var="bp" value="budgetProposalStatusDeptList"
							status="f">
							<tr>
								<td class="blueborderfortd">
									<div align="center"></div>
								</td>
								<td class="blueborderfortd">
									<div align="left">
										${department.deptName}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${hod}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${asstBud}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${smBud}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${aoBud}
										&nbsp;
									</div>
								</td>
								<td class="blueborderfortd">
									<div align="center">
										${caoBud}
										&nbsp;
									</div>
								</td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
			</c:if>


		</form:form>
		<script>

	function validate(){
	 	 var dept=document.getElementById("department").value;
	 	 var fundType=document.getElementById("fundType").value;
	 	 var budgetType=document.getElementById("budgetType").value;
	 	var mode=document.getElementById("mode").value;

	 	if(mode =="function"){
	 		if(dept == 0 || fundType == 'Select' || budgetType == 'Select'){
		 		bootbox.alert("Select all fields");
		 		return false;
			}
	 	}
	 	if(mode =="department"){
	 		if(fundType == 'Select' || budgetType == 'Select'){
		 		bootbox.alert("Select all fields");
		 		return false;
			}
	 	}		 	
	 	return true;
	}

	 </script>
</body>
</html>
