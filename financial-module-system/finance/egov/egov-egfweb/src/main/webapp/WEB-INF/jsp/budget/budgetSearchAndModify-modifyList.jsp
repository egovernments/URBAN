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
 var elementId = null;
    function showDocumentManager(obj){
        if(obj.id == 'budgetDocUploadButton'){
            elementId = 'budgetDocNumber';
        }else{
            elementId = "savedbudgetDetailList["+obj+"].documentNumber";
        }
        docManager(document.getElementById(elementId).value);
    }
 var docNumberUpdater = function (docNumber){
            document.getElementById(elementId).value = docNumber;
        }
</script>
<div id="detail"
	style="width: 100%; overflow-x: auto; overflow-y: hidden;">
	<!-- TODO: Manual migration required for custom Struts tag -->
	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="100%" class="tablebottom"
		style="border-right: 0px solid #C5C5C5;">
		<tr>
			<th class="bluebgheadtd" width="10%"><s:text
					name="budgetdetail.budget" /></th>
			<c:if
				test="%{shouldShowHeaderField('fund') || shouldShowGridField('fund')}">
				<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>
			<c:if
				test="%{shouldShowHeaderField('function') || shouldShowGridField('function')}">
				<th class="bluebgheadtd" width="10%"><s:text
						name="budgetdetail.function" /></th>
			</c:if>

			<th class="bluebgheadtd" width="11%"><s:text
					name="budgetdetail.budgetGroup" /></th>
			<c:if
				test="%{shouldShowHeaderField('executingDepartment') || shouldShowGridField('executingDepartment')}">
				<th class="bluebgheadtd" width="16%"><s:text
						name="budgetdetail.executingDepartment" /></th>
			</c:if>
			<c:if
				test="%{shouldShowHeaderField('functionary') || shouldShowGridField('functionary')}">
				<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>
			<c:if
				test="%{shouldShowHeaderField('scheme') || shouldShowGridField('scheme')}">
				<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>
			<c:if
				test="%{shouldShowHeaderField('subScheme') || shouldShowGridField('subScheme')}">
				<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>

			<c:if
				test="%{shouldShowHeaderField('boundary') || shouldShowGridField('boundary')}">
				<th class="bluebgheadtd" width="10%"><!-- TODO: Manual migration required for custom Struts tag --></th>
			</c:if>

			<th class="bluebgheadtd" width="16%"><s:text
					name="budgetdetail.actuals" />
				${twopreviousfinYearRange}(Rs)</th>
			<th class="bluebgheadtd" width="16%"><s:text
					name="budgetdetail.actuals" />
				${previousfinYearRange}(Rs)</th>
			<th class="bluebgheadtd" width="16%"><s:text
					name="budgetdetail.actuals" />
				${currentfinYearRange}(Rs)</th>
			<th class="bluebgheadtd" width="16%">BE <s:property
					value="currentfinYearRange" />(Rs)(A)
			</th>
			<th class="bluebgheadtd" width="16%"><s:text
					name="budget.reappropriation" />(B)</th>
			<th class="bluebgheadtd" width="16%">Total Rs (A+B)</th>
			<th class="bluebgheadtd" id="anticipatoryAmountheading" width="16%"><s:text
					name="budgetdetail.anticipatoryAmount" />(Rs)</th>
			<th class="bluebgheadtd" width="16%"><s:text
					name="budgetdetail.estimateAmount.revised" />(Rs)</th>
			<c:if test="%{showApprovalDetails()}">
				<c:if test="%{isConsolidatedScreen()}">
					<th class="bluebgheadtd" width="16%">RE <s:property
							value="savedbudgetDetailList.get(0).getBudget().getFinancialYear().getFinYearRange()" />
						fixed (Rs)
					</th>
				</c:if>
			</c:if>


			<th class="bluebgheadtd" width="16%"><s:text
					name="budgetdetail.estimateAmount" /> <s:property
					value="nextfinYearRange" /> (Rs)</th>
			<c:if test="%{showApprovalDetails()}">
				<c:if test="%{isConsolidatedScreen()}">
					<th class="bluebgheadtd" width="16%">BE <s:property
							value="nextfinYearRange" /> fixed (Rs)
					</th>
				</c:if>
				<th class="bluebgheadtd" with="16%"><s:text
						name="budgetdetail.remarks" /></th>
			</c:if>
			<c:otherwise>
				<th class="bluebgheadtd" width="16%"><!-- TODO: Manual migration required for custom Struts tag --></th>
			</s:else>


			<th class="bluebgheadtd" with="16%">Documents</th>
		</tr>
		<s:hidden name="detailsLength" id="detailsLength"
			value="%{savedbudgetDetailList.size()}" />
		<c:forEach value="savedbudgetDetailList" status="stat">
			<tr>
				<input type='hidden'
					name="savedbudgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].id"
					value="<!-- TODO: Manual migration required for custom Struts tag -->" />
				<input type='hidden'
					name="savedbudgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].nextYrId"
					value="<!-- TODO: Manual migration required for custom Struts tag -->" />
				<input type='hidden'
					name="savedbudgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].documentNumber"
					id="savedbudgetDetailList[<!-- TODO: Manual migration required for custom Struts tag -->].documentNumber"
					value="<!-- TODO: Manual migration required for custom Struts tag -->" />
				<td class="blueborderfortd">${budget.name}
					&nbsp;</td>
				<c:if
					test="%{shouldShowHeaderField('fund') || shouldShowGridField('fund')}">
					<td class="blueborderfortd">${fund.name}&nbsp;</td>
				</c:if>

				<c:if
					test="%{shouldShowHeaderField('function') || shouldShowGridField('function')}">
					<td class="blueborderfortd">${function.name}&nbsp;</td>
				</c:if>
				<td class="blueborderfortd"><s:property
						value="budgetGroup.name" />&nbsp;</td>
				<c:if
					test="%{shouldShowHeaderField('executingDepartment') || shouldShowGridField('executingDepartment')}">
					<td class="blueborderfortd"><s:property
							value="executingDepartment.deptName" />&nbsp;</td>
				</c:if>
				<c:if
					test="%{shouldShowHeaderField('functionary') || shouldShowGridField('functionary')}">
					<td class="blueborderfortd"><s:property
							value="functionary.name" />&nbsp;</td>
				</c:if>
				<c:if
					test="%{shouldShowField('scheme') || shouldShowGridField('scheme')}">
					<td class="blueborderfortd">${scheme.name}&nbsp;</td>
				</c:if>
				<c:if
					test="%{shouldShowHeaderField('subScheme') || shouldShowGridField('subScheme')}">
					<td class="blueborderfortd">${subScheme.name}&nbsp;</td>
				</c:if>
				<c:if
					test="%{shouldShowHeaderField('boundary') || shouldShowGridField('boundary')}">
					<td class="blueborderfortd">${boundary.name}&nbsp;</td>
				</c:if>
				<c:if test="%{isConsolidatedScreen()}">
					<s:set name="twopreviousYearActs"
						value="%{budgetAmountView[#stat.index].twopreviousYearActuals/1000}" />
					<s:set name="previousYearActs"
						value="%{budgetAmountView[#stat.index].previousYearActuals/1000}" />
					<s:set name="currentYearBeActs"
						value="%{budgetAmountView[#stat.index].currentYearBeActuals/1000}" />
					<s:set name="lastBEApp"
						value="%{budgetAmountView[#stat.index].LastBEApproved/1000}" />
					<s:set name="lastTot"
						value="%{budgetAmountView[#stat.index].lastTotal/1000}" />
					<s:set name="reAppropriation"
						value="%{budgetAmountView[#stat.index].reappropriation/1000}" />
					<!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag -->
					<s:set name="nextYroriginalAmt"
						value="%{nextYroriginalAmount/1000}" />
					<s:set name="nextYrapprovedAmt"
						value="%{nextYrapprovedAmount/1000}" />

					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${twopreviousYearActs}" /> <s:property
							value="#twopreviousYearActs" /></td>
					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${previousYearActs}" />
						${#previousYearActs}&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${currentYearBeActs}" />
						${#currentYearBeActs}&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${lastBEApp}" />
						${#lastBEApp}&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${reAppropriation}" /> <s:property
							value="#reAppropriation" />&nbsp;</td>
					<!--  divide the amount here by 1000. 2 scale places should be shown -->
					</td>
					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${lastTot}" />
						${#lastTot}&nbsp;</td>
					</td>
					<td class="blueborderfortd" style="text-align: right;"><fmt:formatNumber
							type="number" maxFractionDigits="2" minFractionDigits="2"
							value="${anticipatoryAmt}" />
						${#anticipatoryAmt}&nbsp;</td>

					<td class="blueborderfortd" style="text-align: right;"><s:text
							name="format.number">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:text>&nbsp;</td>

					<c:if test="%{showApprovalDetails()}">
						<td class="blueborderfortd"><input type="text"
							style="text-align: right; size: 50px;"
							id='savedbudgetDetailList[${#stat.index}].approvedAmount'
							name='savedbudgetDetailList[${#stat.index}].approvedAmount'
							value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>
					</c:if>
					<td class="blueborderfortd" style="text-align: right;"><s:text
							name="format.number">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</s:text>&nbsp;</td>
					<c:if test="%{showApprovalDetails()}">
						<td class="blueborderfortd"><input type="text"
							style="text-align: right; size: 50px;"
							id='savedbudgetDetailList[${#stat.index}].nextYrapprovedAmount'
							name='savedbudgetDetailList[${#stat.index}].nextYrapprovedAmount'
							value='<c:if test="%{nextYrapprovedAmount == null || nextYrapprovedAmount == 0.0}"><!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text></c:if><c:otherwise><!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text></s:else>' />&nbsp;</td>
						<td class="blueborderfortd"><textarea cols="50" rows="1"
								style="size: 50px"
								name='savedbudgetDetailList[${#stat.index}].state.text1'><s:property
									value="state.text1" /></textarea></td>
					</c:if>
					<c:otherwise>
						<td class="blueborderfortd"><a href="#"
							id="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="return deleteBudgetDetail(this);"><img
								src="/egi/resources/erp2/images/cancel.png" border="0" /></a></td>
					</s:else>
					<td><input type="submit" class="buttonsubmit" value="Edit"
						id="budgetDocUploadButton"
						onclick='showDocumentManager(${#stat.index});return false;' /></td>
				</c:if>
				<c:otherwise>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="budgetAmountView[#stat.index].twopreviousYearActuals" />&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="budgetAmountView[#stat.index].previousYearActuals" />&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="budgetAmountView[#stat.index].currentYearBeActuals" />&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="budgetAmountView[#stat.index].LastBEApproved" />&nbsp;</td>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="budgetAmountView[#stat.index].reappropriation" />&nbsp;</td>
					<!--  divide the amount here by 1000. 2 scale places should be shown -->
					</td>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="budgetAmountView[#stat.index].lastTotal" />&nbsp;</td>
					</td>
					<td class="blueborderfortd" style="text-align: right;"><s:property
							value="anticipatoryAmount" />&nbsp;</td>

					<td class="blueborderfortd"><input type="text"
						style="text-align: right; size: 50px;"
						id='savedbudgetDetailList[${#stat.index}].originalAmount'
						name='savedbudgetDetailList[${#stat.index}].originalAmount'
						value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>


					<td class="blueborderfortd"><input type="text"
						style="text-align: right; size: 50px;"
						id='savedbudgetDetailList[${#stat.index}].nextYroriginalAmount'
						name='savedbudgetDetailList[${#stat.index}].nextYroriginalAmount'
						value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>

					<c:if test="%{showApprovalDetails()}">
						<td class="blueborderfortd"><textarea cols="50" rows="1"
								style="size: 50px"
								name='savedbudgetDetailList[${#stat.index}].state.text1'><s:property
									value="state.text1" /></textarea></td>
					</c:if>
					<c:otherwise>
						<td class="blueborderfortd"><a href="#"
							id="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="return deleteBudgetDetail(this);"><img
								src="/egi/resources/erp2/images/cancel.png" border="0" /></a></td>
					</s:else>


					<td><input type="submit" class="buttonsubmit" value="Edit"
						id="budgetDocUploadButton"
						onclick='showDocumentManager(${#stat.index});return false;' /></td>
				</s:else>
			</tr>
		</c:forEach>
	</table>
</div>



