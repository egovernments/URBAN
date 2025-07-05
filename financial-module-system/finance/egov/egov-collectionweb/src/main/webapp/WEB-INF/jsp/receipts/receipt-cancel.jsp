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

<%@ include file="/includes/taglibs.jsp" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script>

jQuery.noConflict();
jQuery(document).ready(function() {
  	 
     jQuery(" form ").submit(function( event ) {
    	 doLoadingMask();
    });
     doLoadingMask();
 });

jQuery(window).load(function () {
	undoLoadingMask();
});

function warningInfo()
{
	dom.get("cancellationreasonerror").style.display="none";
	if(trimAll(document.getElementById("reasonForCancellation").value).length==0 || trimAll(document.getElementById("reasonForCancellation").value)=="")
	{
		dom.get("cancellationreasonerror").style.display="block";
		return false;
	}
	else
	{
		document.searchReceiptForm.action="receipt-saveOnCancel.action";
		document.searchReceiptForm.submit();
	}

	doLoadingMask('#loadingMask');
}

</script>
</head>

<body >
<span align="center" style="display:none" id="cancellationreasonerror">
  <li>
     <font size="2" color="red"><b><!-- TODO: Manual migration required for custom Struts tag --></b></font>
  </li>
</span>
<form:form theme="simple" name="searchReceiptForm" action="searchReceipt">
<div class="formmainbox">
	<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></div>
	<c:forEach value="%{receipts}">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<%-- <!-- TODO: Manual migration required for custom Struts tag --> --%>
			
			<tr>
				<td width="4%" class="bluebox2">&nbsp;</td>
				<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td width="24%" class="bluebox2"><b>${receiptnumber}</b></td>
				<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td width="30%" class="bluebox2"><b> 
				<fmt:formatDate value="${receiptDate}" var="receiptDate" pattern="dd-MM-yyyy"/>
				<c:out value="${receiptDate}"></c:out></b></td>
			</tr>
			<tr>
				<td width="4%" class="bluebox">&nbsp;</td>
				<td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td width="75%" class="bluebox" colspan="3">${payeeName}<br/>${payeeName}</td>
			</tr>
			<tr>
				<td width="4%" class="bluebox2">&nbsp;</td>
				<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<td width="75%" class="bluebox2" colspan="3">
					<table align="left" cellpadding="0" cellspacing="0" border="0" width="100%" class="subtable">
					<c:if test="referencenumber!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${referencenumber}</td></tr>
					</c:if>
					<c:if test="receiptMisc.fund!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${receiptMisc.fund.name}</td></tr>
					</c:if>
					<c:if test="receiptMisc.department!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${receiptMisc.department.name}</td></tr>
					</c:if>
					<c:if test="receiptMisc.fundsource!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${receiptMisc.fundsource.name}</td></tr>
					</c:if>
					<c:if test="receiptMisc.functionary!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${receiptMisc.functionary.name}</td></tr>
					</c:if>
					<c:if test="receiptMisc.scheme!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${receiptMisc.scheme.name}</td></tr>
					</c:if>
					<c:if test="receiptMisc.subscheme!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${receiptMisc.subscheme.name}</td></tr>
					</c:if>
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${service.name}</td></tr>
					<c:if test="referenceDesc!=null">
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${referenceDesc}</td></tr>
					</c:if>
						<tr><td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;${paidBy}</td></tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="5">
					<table cellspacing="0" cellpadding="0" align="center" width="100%" class="tablebottom no-border" style="empty-cells:show;">
						<tr><td>
						<div class="subheadsmallnew"><span class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></span></div>
						</td></tr>
						
						<tr>
						 <td>
						 <table width="100%" class="tablebottom">
						 <tr>
							<th class="bluebgheadtd" width="30%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="25%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="30%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="25%"><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;(<!-- TODO: Manual migration required for custom Struts tag -->)</th>
						</tr>
<%! int rebateaccountavalailable=0;%>
						<c:forEach value="%{receiptDetails}" >

						<c:if test="cramount!=0">
						<tr>
							<td class="blueborderfortd"><div align="center">${%{function.name}}</div></td>
							<td class="blueborderfortd"><div align="center">${%{accounthead.glcode}}</div></td>
							<td class="blueborderfortd"><div align="center">${%{description}}</div></td>						<fmt:formatNumber var="newcramount" value='${cramount}' pattern='#0.00' />
							<td class="blueborderfortd"><div align="center">${newcramount}</div></td>
						</tr>
						</c:if>
						<c:if test="dramount!=0 && !isRevenueAccountHead(accounthead)">
						<% rebateaccountavalailable=1; %>
						</c:if>
						
						</c:forEach>
						</table>
						</td>
						</tr>
						
						<%if(rebateaccountavalailable==1){ %>
						<tr><td>
						<div class="subheadsmallnew"><span class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --></span></div>
						</td></tr>
						<tr><td>
						<table cellspacing="0" cellpadding="0" align="center" width="100%" class="tablebottom" style="empty-cells:show;">
						<tr>
							<th class="bluebgheadtd" width="30%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="25%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="30%"><!-- TODO: Manual migration required for custom Struts tag --></th>
							<th class="bluebgheadtd" width="25%"><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;(<!-- TODO: Manual migration required for custom Struts tag -->)</th>
						</tr>
						<%} %>
						<c:forEach value="%{receiptDetails}" >
						<c:if test="dramount!=0 && !isRevenueAccountHead(accounthead)">
						<tr>
							<td class="blueborderfortd"><div align="center">${%{function.name}}</div></td>
							<td class="blueborderfortd"><div align="center">${%{accounthead.glcode}}</div></td>
							<td class="blueborderfortd"><div align="center">${%{description}}</div></td>						<fmt:formatNumber var="newdramount" value='${dramount}' pattern='#0.00' />
							<td class="blueborderfortd"><div align="center">${newdramount}</div></td>
						</tr>
						
						
						</c:if>
						</c:forEach>
						<tr>
						    <td colspan="2" class="blueborderfortd">&nbsp;</td>
							<td class="blueborderfortd"><div align="right"><b>Total&nbsp;&nbsp;</b></div></td>							<fmt:formatNumber var="newtotalamount" value='${amount}' pattern='#0.00' />	
							<td class="blueborderfortd"><div align="center"><b>${newtotalamount}</b></div></td>			
						</tr>
						<%if(rebateaccountavalailable==1){ %>
						</table>
						</td></tr>
						<%} %>
							
					</table>
					
				</td>
			</tr>
			<tr>
					<table cellspacing="0" cellpadding="0" align="center" width="100%" class="tablebottom">
						<tr>
							<td width="4%" class="bluebox2">&nbsp;</td>
							<td width="21%" class="bluebox2"><b><!-- TODO: Manual migration required for custom Struts tag --></b></td>
							<td width="75%" class="bluebox2" colspan="7"><u><b>${amountInWords(amount)} </b></u></td>
						</tr>
						<tr>
							<td width="4%" class="bluebox">&nbsp;</td>
							<td width="21%" class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="75%" class="bluebox" colspan="7">${payeeName}</td>
						</tr>

						<c:forEach value='%{getInstruments("cash")}' >

						<tr>
							<td width="4%" class="bluebox2">&nbsp;</td>
							<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<fmt:formatNumber var="totalRecievedAmount" value='${amount}' pattern='#0.00' />
							<td width="75%" class="bluebox2" colspan="7">${totalRecievedAmount}</td>
						</tr>

						</c:forEach>

						<c:forEach value='%{getInstruments("cheque")}' >
						<tr>
							<td width="4%" class="bluebox2">&nbsp;</td>
							<td width="15%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="21%" class="bluebox2">${%{instrumentNumber}}&nbsp;-&nbsp;<!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="10%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<fmt:formatNumber var="chequeAmount" value='${instrumentAmount}' pattern='#0.00' />
							<td width="15%" class="bluebox2">${chequeAmount}</td>
							<td width="10%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="25%" class="bluebox2">${%{bankId.name}}&nbsp;-&nbsp;${%{bankBranchName}}</td>
						</tr>
						</c:forEach>

						<c:forEach value='%{getInstruments("dd")}' >
						<tr>
							<td width="4%" class="bluebox2">&nbsp;</td>
							<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="15%" class="bluebox2">${%{instrumentNumber}}&nbsp;-&nbsp;<!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="10%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<fmt:formatNumber var="chequeAmount" value='${instrumentAmount}' pattern='#0.00' />
							<td width="15%" class="bluebox2">${chequeAmount}</td>
							<td width="10%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="25%" class="bluebox2">${%{bankId.name}}
							<c:if test="bankBranchName!=null">
							&nbsp;-&nbsp;${%{bankBranchName}}
							</c:if>
							</td>
						</tr>
						
						</c:forEach>

						<c:forEach value='%{getInstruments("card")}' >
						<tr>
							<td width="4%" class="bluebox2">&nbsp;</td>
							<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td width="24%" class="bluebox2" colspan="3">${%{instrumentNumber}}</td>
						</tr>
						</c:forEach>

						
						<tr>
							<td width="4%" class="bluebox2">&nbsp;</td>
							<td width="21%" class="bluebox2"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory1">*</span></td>
							<td width="24%" class="bluebox2" colspan="7"><form:textarea id="reasonForCancellation" label="reasonforcancellation" cols="90" rows="8" path="reasonForCancellation"/></td>
						</tr>
					</table>
			</tr>	
			
			
		</table>

		   <div id="loadingMask" style="display:none;overflow:hidden;text-align: center"><img src="/services/collection/resources/images/bar_loader.gif"/> <span style="color: red">Please wait....</span></div>
		   
		<div align="left" class="mandatorycoll"><!-- TODO: Manual migration required for custom Struts tag --></div>
		<div class="buttonbottom">
		<c:if test="isReceiptCancelEnable">
		<input name="button32" type="button" class="buttonsubmit" id="button32"  value="Cancel Receipt" onclick="return warningInfo()"/>
		</c:if>
		<input name="button2" type="button" class="button" id="button" onclick="window.close()" value="Close"/>
		<input name="buttonBack" type="button" class="button" id="buttonBack" value="Back" onclick="window.location='${pageContext.request.contextPath}/receipts/searchReceipt.action';"  /> 
		</div>
	</c:forEach>
</div>
</form:form>
</body>
</html>

