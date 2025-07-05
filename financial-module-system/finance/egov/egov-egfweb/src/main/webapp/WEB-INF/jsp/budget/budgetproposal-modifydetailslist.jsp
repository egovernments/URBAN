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
<script>
 <!-- TODO: Manual migration required for custom Struts tag -->
<c:if test="%{isConsolidatedScreen()}">
<!-- TODO: Manual migration required for custom Struts tag -->
</c:if>	

jQuery.noConflict();
jQuery(document).ready(function() {
	    jQuery('#detailsTable').fixheadertable({
         caption: 'Budget Detail', 
         height: 400,
         minColWidth: 10,  
         resizeCol: true,
         colratio:${colratio}
    });
});
 
</script>

<div id="detail">

	<table id="detailsTable" class="table-header-fix">
		<thead>
			<tr>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>

				<th><!-- TODO: Manual migration required for custom Struts tag --> <s:property
						value="twopreviousfinYearRange" /></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --> <s:property
						value="previousfinYearRange" /></th>
				<th>BE ${currentfinYearRange}(A)
				</th>
				<th><!-- TODO: Manual migration required for custom Struts tag -->(B)</th>
				<th>Total (A+B)</th>
				<th><!-- TODO: Manual migration required for custom Struts tag --> upto <s:property
						value="currentfinYearRange" /></th>
				<th id="anticipatoryAmountheading"><s:text
						name="budgetdetail.anticipatoryAmount" /> <s:property
						value="currentfinYearRange" /></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --> <s:property
						value="savedbudgetDetailList.get(0).getBudget().getFinancialYear().getFinYearRange()" />
					Proposed</th>
				<c:if test="%{isConsolidatedScreen()}">
					<th>RE <s:property
							value="savedbudgetDetailList.get(0).getBudget().getFinancialYear().getFinYearRange()" />
						Fixed
					</th>
				</c:if>
				<th><!-- TODO: Manual migration required for custom Struts tag --> <s:property
						value="nextfinYearRange" /> Proposed</th>
				<c:if test="%{isConsolidatedScreen()}">
					<th width="10%">BE ${nextfinYearRange}
						Fixed
					</th>
				</c:if>

			</tr>
		</thead>
		<tbody>
			<c:forEach value="bpBeanList" status="stat">
				<tr>
					<c:if test="%{rowType=='heading'}">

					</c:if>
					<!-- TODO: Manual migration required for custom Struts tag -->
					</s:elseif>

					<!-- TODO: Manual migration required for custom Struts tag -->
					</s:elseif>

					<c:otherwise>
						<input type='hidden'
							name="bpBeanList[<!-- TODO: Manual migration required for custom Struts tag -->].id"
							id="bpBeanList[<!-- TODO: Manual migration required for custom Struts tag -->].id"
							value="<!-- TODO: Manual migration required for custom Struts tag -->" />
						<input type='hidden'
							name="bpBeanList[<!-- TODO: Manual migration required for custom Struts tag -->].nextYrId"
							id="bpBeanList[<!-- TODO: Manual migration required for custom Struts tag -->].nextYrId"
							value="<!-- TODO: Manual migration required for custom Struts tag -->" />
						<input type='hidden'
							name="bpBeanList[<!-- TODO: Manual migration required for custom Struts tag -->].documentNumber"
							id="bpBeanList[<!-- TODO: Manual migration required for custom Struts tag -->].documentNumber"
							value="<!-- TODO: Manual migration required for custom Struts tag -->" />
						<td>${executingDepartment} &nbsp;</td>
						<td>${fund}&nbsp;</td>
						<td>${function}&nbsp;</td>
						<td>${budgetGroup}&nbsp;</td>



						<td style="text-align: right;"><s:property
								value="twoPreviousYearActuals" />&nbsp;</td>
						<td style="text-align: right;"><s:property
								value="previousYearActuals" />&nbsp;</td>
						<td style="text-align: right;"><s:property
								value="currentYearBE" />&nbsp;</td>
						<td style="text-align: right;"><s:property
								value="reappropriation" />&nbsp;</td>
						<td style="text-align: right;">${total}&nbsp;</td>
						<td style="text-align: right;"><s:property
								value="currentYearActuals" />&nbsp;</td>
						<td style="text-align: right;"><s:property
								value="anticipatory" />&nbsp;</td>


						<c:if test="%{isConsolidatedScreen()}">

						</c:if>
						<c:otherwise>
							<td><input type="text" onchange="update(this);"
								style="text-align: right; size: 50px;"
								id='bpBeanList[${#stat.index}].proposedRE'
								name='bpBeanList[${#stat.index}].proposedRE'
								value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>
						</s:else>
						<c:if test="%{isConsolidatedScreen()}">
							<td style="text-align: right;"><s:property
									value="proposedBE" />&nbsp;</td>
							<td><input type="text" onchange="update(this);" size="10"
								style="text-align: right;"
								id='bpBeanList[${#stat.index}].approvedBE'
								name='bpBeanList[${#stat.index}].approvedBE'
								value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>
						</c:if>
						<c:otherwise>
							<td><input type="text" onChange="update(this);"
								style="text-align: right; size: 50px;"
								id='bpBeanList[${#stat.index}].proposedBE'
								name='bpBeanList[${#stat.index}].proposedBE'
								value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>
						</s:else>

					</s:else>
				</tr>

			</c:forEach>

		</tbody>

	</table>

</div>



