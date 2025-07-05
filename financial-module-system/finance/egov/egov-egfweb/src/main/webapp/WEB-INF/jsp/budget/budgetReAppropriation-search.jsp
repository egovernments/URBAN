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
	<form:form action="budgetReAppropriation" theme="simple">
		<jsp:include page="budgetHeader.jsp" />
		<span class="mandatory"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<table align="center" width="80%" cellpadding="0" cellspacing="0">
				<jsp:include page="budgetReAppropriation-filter.jsp" />
				<tr>
					<td class="greybox">&nbsp;</td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select
							list="dropdownData.budgetGroupList" listKey="id" listValue="name"
							name="budgetDetail.budgetGroup.id" headerKey="0"
							headerValue="--- Select ---" value="budgetGroup.id"
							id="budgetReAppropriation_budgetGroup"></form:select></td>

					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:select
							list="#{'B':'Both','A':'Addition','R':'Reduction'}" name="type"
							id="type"></form:select></td>
				</tr>
				<tr />
				<tr>
					<td>&nbsp;</td>
				</tr>
			</table>
			<div class="buttonbottom"
				style="padding-bottom: 10px; position: relative">
				<s:submit method="search" value="Search" cssClass="buttonsubmit"
					onclick="return checkMandatory()" />
				<input type="submit" value="Close"
					onclick="javascript:window.close()" class="button" />
			</div>
			<br />
			<div id="listid" style="display: none">
				<table width="100%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="tablebottom">
					<tr>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<c:if
							test="%{shouldShowHeaderField('fund')|| shouldShowGridField('fund')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</c:if>
						<c:if
							test="%{shouldShowHeaderField('executingDepartment')|| shouldShowGridField('executingDepartment')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						</c:if>
						<c:if
							test="%{shouldShowField('function')|| shouldShowGridField('function')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</c:if>
						<c:if
							test="%{shouldShowHeaderField('functionary')|| shouldShowGridField('functionary')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</c:if>
						<c:if
							test="%{shouldShowHeaderField('scheme')|| shouldShowGridField('scheme')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</c:if>
						<c:if
							test="%{shouldShowHeaderField('subScheme')|| shouldShowGridField('subScheme')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</c:if>
						<c:if
							test="%{shouldShowHeaderField('boundary')|| shouldShowGridField('boundary')}">
							<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						</c:if>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
					</tr>
					<c:set var="trclass" value="greybox" />
					<c:set var="budgetdetailid" value="0" />
					<c:forEach var="p" value="reAppropriationList" status="s">
						<tr>
							<c:if test='${budgetdetailid!=budgetDetail.id}'>
								<c:set var="totalAmt" value="${budgetDetail.approvedAmount}" />
							</c:if>
							<td class="<c:out value="${trclass}"/>"><s:property
									value="#s.index+1" /></td>
							<c:if
								test="%{shouldShowHeaderField('fund')|| shouldShowGridField('fund')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.fund.name}" /></td>
							</c:if>
							<c:if
								test="%{shouldShowHeaderField('executingDepartment')|| shouldShowGridField('executingDepartment')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.executingDepartment.deptName}" /></td>
							</c:if>
							<c:if
								test="%{shouldShowField('function')|| shouldShowGridField('function')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.function.name}" /></td>
							</c:if>
							<c:if
								test="%{shouldShowHeaderField('functionary')|| shouldShowGridField('functionary')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.functionary.name}" /></td>
							</c:if>
							<c:if
								test="%{shouldShowHeaderField('scheme')|| shouldShowGridField('scheme')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.scheme.name}" /></td>
							</c:if>
							<c:if
								test="%{shouldShowHeaderField('subScheme')|| shouldShowGridField('subScheme')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.subScheme.name}" /></td>
							</c:if>
							<c:if
								test="%{shouldShowHeaderField('boundary')|| shouldShowGridField('boundary')}">
								<td class="<c:out value="${trclass}"/>"><s:property
										value="%{budgetDetail.boundary.name}" /></td>
							</c:if>
							<td style="text-align: right" class="<c:out value="${trclass}"/>">
								${%{reAppropriationMisc.sequenceNumber}}
							</td>
							<td style="text-align: right" class="<c:out value="${trclass}"/>">
								<!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text>
							</td>
							<td style="text-align: right" class="<c:out value="${trclass}"/>">
								<!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text>
							</td>
							<td style="text-align: right" class="<c:out value="${trclass}"/>">
								<!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text>
							</td>
							<c:if
								test='${additionAmount==null || additionAmount==0 || additionAmount==0.0}'>
								<c:set var="totalAmt" value="${totalAmt-deductionAmount}" />
							</c:if>
							<c:if
								test='${deductionAmount==null || deductionAmount==0 || deductionAmount==0.0}'>
								<c:set var="totalAmt" value="${totalAmt+additionAmount}" />
							</c:if>
							<td style="text-align: right" class="<c:out value="${trclass}"/>">
								<c:out value="${totalAmt}" />.00
							</td>
							<c:choose>
								<c:when test="${trclass=='greybox'}">
									<c:set var="trclass" value="bluebox" />
								</c:when>
								<c:when test="${trclass=='bluebox'}">
									<c:set var="trclass" value="greybox" />
								</c:when>
							</c:choose>
							<c:set var="budgetdetailid" value="${budgetDetail.id}" />
						</tr>
					</c:forEach>
					<!-- TODO: Manual migration required for custom Struts tag -->
				</table>
			</div>
			<br /> <br />
			<div id="msgdiv" style="display: none">
				<table align="center" class="tablebottom" width="80%">
					<tr>
						<th class="bluebgheadtd" colspan="7"><s:text
								name="no.data.found" />
						</td>
					</tr>
				</table>
			</div>
			<br /> <br />
	</form:form>
	<script>
			<c:if test="%{reAppropriationList.size==0}">
				dom.get('msgdiv').style.display='block';
			</c:if>
			<c:if test="%{reAppropriationList.size!=0}">
				dom.get('msgdiv').style.display='none';
				dom.get('listid').style.display='block';
			</c:if>
			
			function checkMandatory()
			{
				if(document.getElementById('financialYear').value==0)
				{
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
					return false;
				}
				if(document.getElementById('budgetReAppropriation_fund').value==0 && document.getElementById('budgetReAppropriation_executingDepartment').value==0 && document.getElementById('budgetReAppropriation_function').value==0)
				{
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
					return false;
				}
				return true;
			}
		</script>
</body>
</html>
