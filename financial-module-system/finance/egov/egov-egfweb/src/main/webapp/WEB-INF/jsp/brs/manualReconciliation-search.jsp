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
<div class="panel-heading custom_form_panel_heading">
	<div class="panel-title"><!-- TODO: Manual migration required for custom Struts tag --> </div>
</div>
<div class="col-md-12 form-group report-table-container">
	<table class="table table-bordered table-hover multiheadertbl"
		id="resultTable">
		<thead>
			<tr>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
			</tr>
		</thead>
		<c:if test="%{unReconciledCheques.size>0}">
			<c:forEach var="vh" value="unReconciledCheques" status="status">
				<tr>
					<input type="hidden"
						name="instrumentHeaders[${#status.index}]"
						value='${ihId}' />
					<td style="text-align: left">${voucherNumber}</td>
					<td style="text-align: left">${chequeNumber}</td>
					<td>${chequeDate}</td>
					<td>${type}</td>
					<td  style="text-align: center;">${instrumentType}</td>
					<td style="text-align: right">${chequeAmount}</td>
					<td><input type="text"
						id="reconDates${#status.index}"
						name="reconDates[${#status.index}]"
						class="form-control datepicker" data-inputmask="'mask': 'd/m/y'" />
					</td>
				</tr>
			</c:forEach>
		</c:if>
		<c:otherwise>
			<tr>
				<td colspan="7" style="text-align: center"><!-- TODO: Manual migration required for custom Struts tag --></td>
			</tr>
		</s:else>
	</table>
</div>
<c:if test="%{unReconciledCheques.size>0}">
	<div class="buttonbottom" id="reconcileDiv" style="display: none">
		<table>
			<tr>
				<td><input type="button" class="buttonsubmit" value='<!-- TODO: Manual migration required for custom Struts tag -->'
					name="Reconcile" method="reconcile"
					onclick="return validateReconcile();" /></td>
				<td><input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
					onclick="javascript:window.close()" class="buttonsubmit" /></td>
			</tr>
		</table>
	</div>
</c:if>





