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
<c:if test="%{isAsstFMU()}">
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

var updateCallback = {
	     success: function(o) {

		if(o.responseText=='successful')
		{
		    // bootbox.alert("Update success");
		}else
		{
		    // bootbox.alert("Update failed");
		}


		 },
	     failure: function(o) {
		   //  bootbox.alert("Update failed");
	     }
} 


function update(obj)
{
//	bootbox.alert("calling update");
   	var name=obj.name;
  // 	bootbox.alert(name);
    var factor='Rupees'; 
   	<c:if test="%{isConsolidatedScreen()}">
   	factor='thousand';
   	</c:if>
   	
 	if(name.indexOf('proposedRE')!=-1)
	 {
   		var idName=name.replace("proposedRE","id");
   		//bootbox.alert(idName);
   		var queryParams="detailId="+document.getElementById(idName).value+"&validId="+document.getElementById(idName).value+"&amountField=originalAmount&amount="+obj.value;  
	 }
		 if(name.indexOf('proposedBE')!=-1)
		 {
		var validId=name.replace("proposedBE","id");
		var idName=name.replace("proposedBE","nextYrId")
		var queryParams="detailId="+document.getElementById(idName).value+"&validId="+document.getElementById(validId).value+"&amountField=originalAmount&amount="+obj.value;    
		 }
		 if(name.indexOf('approvedRE')!=-1)
		 {
		var idName=name.replace("approvedRE","id")
		var queryParams="detailId="+document.getElementById(idName).value+"&validId="+document.getElementById(idName).value+"&amountField=approvedAmount&amount="+obj.value;  
		 }
		if(name.indexOf('approvedBE')!=-1)
		{
		var validId=name.replace("approvedBE","id");
		var idName=name.replace("approvedBE","nextYrId")
		var queryParams="detailId="+document.getElementById(idName).value+"&validId="+document.getElementById(validId).value+"&amountField=approvedAmount&amount="+obj.value;     
		}
		queryParams=queryParams+"&factor="+factor;
//		bootbox.alert("calling update  " +queryParams); 
		lastUpdateDate=new Date();
		 var transaction = YAHOO.util.Connect.asyncRequest('POST', 'budgetProposal!ajaxUpdateBudgetDetail.action?'+queryParams, updateCallback, null);	
			}

var lastUpdateDate=new Date();

setInterval(alertTimeOut, 8*60*1000);

function alertTimeOut()
{

	//bootbox.alert(lastUpdateDate+" lastUpdateDate");
	var d=new Date();
	//bootbox.alert(d+" newDate");
	//bootbox.alert(diffMs);
	var diffMs = (d - lastUpdateDate);
	//bootbox.alert(diffMs);
	//bootbox.alert(eval(diffMs)-eval(1*60*1000));
	if(eval(diffMs)>eval(7*60*1000))
		{
		bootbox.alert("You are Inactive from more than 7 Minutes . Please refresh the home page to keep active");
		}
		lastUpdateDate=new Date();
	}

</script>
<!-- TODO: Manual migration required for custom Struts tag -->
<div id="detail" >

	<table id="detailsTable" class="table-header-fix"  >
		<thead>
			<tr>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				<th><!-- TODO: Manual migration required for custom Struts tag -->
					${twopreviousfinYearRange}</th>
				<th><!-- TODO: Manual migration required for custom Struts tag -->
					${previousfinYearRange}</th>
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
				<th><!-- TODO: Manual migration required for custom Struts tag -->
					<s:hidden name="detailsLength" id="detailsLength"
						value="%{bpBeanList.size()}" /></th>
				<th>Documents</th>
				<c:if test="%{isAsstFMU()}">
					<th><!-- TODO: Manual migration required for custom Struts tag --></th>
				</c:if>
			</tr>
		</thead>
		<tbody>
			<c:forEach value="bpBeanList" status="stat">
				<tr>
					<c:if test="%{rowType=='heading'}">
						<td style="text-align: right;">${reference}&nbsp;</td>
						<td colspan="4"><h6>
								${budgetGroup}
								&nbsp;
							</h6></td>
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
					</c:if>
					<!-- TODO: Manual migration required for custom Struts tag -->

						<td />

						<td colspan="3" class="blueborderfortd"><h6
								style="font-size: 9.6px;">
								${budgetGroup}
								&nbsp;
							</h6></td>
						<td style="text-align: right;">${reference}&nbsp;</td>
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
						<td style="text-align: right;">${proposedRE}&nbsp;</td>
						<c:if test="%{isConsolidatedScreen()}">
							<td style="text-align: right;">
								<h6>
									${approvedRE}
									&nbsp;
								</h6>
							</td>
						</c:if>
						<td style="text-align: right;">${proposedBE}&nbsp;</td>
						<c:if test="%{isConsolidatedScreen()}">
							<td style="text-align: right;">
								<h6>
									${approvedBE}
									&nbsp;
								</h6>
							</td>
						</c:if>
						<td />
						<td />
					</s:elseif>

					<!-- TODO: Manual migration required for custom Struts tag -->

						<td />

						<td colspan="3"><h6>
								${budgetGroup}
								&nbsp;
							</h6></td>
						<td style="text-align: right;">
							<h6>
								${reference}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${twoPreviousYearActuals}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${previousYearActuals}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${currentYearBE}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${reappropriation}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${total}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${currentYearActuals}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${anticipatory}
								&nbsp;
							</h6>
						</td>
						<td style="text-align: right;">
							<h6>
								${proposedRE}
								&nbsp;
							</h6>
						</td>
						<c:if test="%{isConsolidatedScreen()}">
							<td style="text-align: right;">
								<h6>
									${approvedRE}
									&nbsp;
								</h6>
							</td>
						</c:if>
						<td style="text-align: right;">
							<h6>
								${proposedBE}
								&nbsp;
							</h6>
						</td>
						<c:if test="%{isConsolidatedScreen()}">
							<td style="text-align: right;">
								<h6>
									${approvedBE}
									&nbsp;
								</h6>
							</td>
						</c:if>
						<td />
						<td />
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
						<td />


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
							<td style="text-align: right;"><s:property
									value="proposedRE" />&nbsp;</td>
							<td><input type="text" onchange="update(this);" size="10"
								style="text-align: right;"
								id='bpBeanList[${#stat.index}].approvedRE'
								name='bpBeanList[${#stat.index}].approvedRE'
								value='<!-- TODO: Manual migration required for custom Struts tag --><!-- TODO: Manual migration required for custom Struts tag --></s:text>' />&nbsp;</td>
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

						<td><textarea cols="50" rows="1" style="size: 50px"
								name='bpBeanList[${#stat.index}].remarks'><s:property
									value="remarks" /></textarea></td>


						<td></td>
						<c:if test="%{isAsstFMU()}">
							<td><a href="#" id="<!-- TODO: Manual migration required for custom Struts tag -->"
								onclick="return deleteBudgetDetail(<!-- TODO: Manual migration required for custom Struts tag -->, <!-- TODO: Manual migration required for custom Struts tag -->,this,'bpBeanList[${#stat.index}].approvedBE','bpBeanList[${#stat.index}].approvedRE');"><img
									src="/egi/resources/erp2/images/cancel.png" border="0" /></a></td>
						</c:if>
					</s:else>
				</tr>

			</c:forEach>
		</tbody>
	</table>
</div>



