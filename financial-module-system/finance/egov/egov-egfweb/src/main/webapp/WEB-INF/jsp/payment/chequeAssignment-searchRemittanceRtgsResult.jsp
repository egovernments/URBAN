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
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>
<link href="<egov:url path='/resources/css/displaytagFormatted.css?rnd=${app_release_no}'/>"
	rel="stylesheet" type="text/css" />
<html>
<head>
<link rel="stylesheet" type="text/css" href="/services/EGF/resources/css/ccMenu.css?rnd=${app_release_no}" />
<title><s:text
		name="rtgs.assignment.remittance.pay.search.heading" /></title>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
</head>

<body>
	<script>
		
	</script>
	<form:form action="chequeAssignment" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading"
				value="RTGS Ref. No Assignment Search for Auto Remittance Payment" />
		</jsp:include>
		<span class="error-msg"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<div class="subheadnew">
				RTGS Ref.No Assignment Search for Auto Remittance Payment
				<c:if test="%{(drawingOfficerCode!=null)}"> for the drawingofficer - <s:property
						value="drawingOfficerCode" />
				</c:if>
			</div>
			<table align="center" width="100%" cellpadding="0" cellspacing="0"
				id="paymentTable">
				<tr>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.select" />
						<form:checkbox id="selectall" path="selectall"
							onclick="checkAll(this)" /></th>
					<th class="bluebgheadtdnew"><!-- TODO: Manual migration required for custom Struts tag --></th>

					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.department.name" /></th>
					<c:if test="%{(drawingOfficerCode == null)}">
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.drawingofficer.name.tan" /></th>
					</c:if>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.payment.voucherno" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.payment.voucherdate" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.partycode" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.payment.amount" /></th>
					<c:if test="%{nonSubledger == true}">
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.voucher.details" /></th>
					</c:if>

				</tr>
				<!-- TODO: Manual migration required for custom Struts tag -->
				<c:forEach value="accountNoAndRemittanceRtgsEntryMap" status="stat">
					<tr>
						<td class="greybox"><s:property
								value="key.bankAccount.bankbranch.bank.name" /> - <s:property
								value="key.bankAccount.bankbranch.branchname" /></td>
						<td class="greybox"><s:property
								value="key.bankAccount.accountnumber" /></td>
						<td class="greybox"><s:property
								value="key.remittanceCOA.glcode" /></td>
						<td class="greybox"><s:property
								value="key.remittanceCOA.name" /> <s:set var="count"
								value="key.bankAccount.id" /></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<c:if test="%{nonSubledger == true}">
							<td></td>
						</c:if>
					</tr>
					<tr>

						<c:forEach value="value" status="s">

							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="voucherHeaderId"
									name="rtgsList[%{#counter}].voucherHeaderId"
									value="%{voucherHeaderId}" /> <form:checkbox
									name="rtgsList[%{#counter}].isSelected"
									id="isSelected%{#counter}" onclick="update(this)" /></td>
							<td align="left" style="text-align: center"
								class="blueborderfortdnew">${#s.index+1}
							</td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="departmentName" name="rtgsList[%{#counter}].departmentName"
									value="%{departmentName}" />
								${%{departmentName}}</td>
							<c:if test="%{(drawingOfficerCode == null)}">
								<td style="text-align: center" class="blueborderfortdnew">
									<s:hidden id="drawingOfficerNameTAN"
										name="rtgsList[%{#counter}].drawingOfficerNameTAN"
										value="%{drawingOfficerNameTAN}" /> <s:property
										value="%{drawingOfficerNameTAN}" />
								</td>
							</c:if>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="voucherNumber" name="rtgsList[%{#counter}].voucherNumber"
									value="%{voucherNumber}" /><a href="javascript:void(0);"
								onclick='viewVoucher(${voucherHeaderId});'><s:property
										value="%{voucherNumber}" /></a>&nbsp;</td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="voucherDate" name="rtgsList[%{#counter}].voucherDate"
									value="%{voucherDate}" />
								<s:date name="%{voucherDate}" var="tempPaymentDate"
									format="dd/MM/yyyy" />
								<!-- TODO: Manual migration required for custom Struts tag --> <s:hidden
									name="rtgsList[%{#counter}].tempPaymentDate"
									value="%{tempPaymentDate}"></s:hidden></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="paidTo" name="rtgsList[%{#counter}].paidTo"
									value="%{paidTo}" />
								${%{paidTo}}</td>
							<td style="text-align: right" class="blueborderfortdnew"><s:hidden
									id="paidAmount" name="rtgsList[%{#counter}].paidAmount"
									value="%{paidAmount}" />
								<!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>
							<s:hidden id="bankAccountId"
								name="rtgsList[%{#counter}].bankAccountId"
								value="%{bankAccountId}" />
							<!-- TODO: Manual migration required for custom Struts tag -->
							<c:if test="%{nonSubledger == true}">
								<td style="text-align: center" class="blueborderfortdnew"><a
									href="javascript:void(0);"
									onclick='viewReceiptDetails(${voucherHeaderId});'><s:text
											name="chq.assignment.voucher.details" /></a>&nbsp;</td>
							</c:if>
						</c:forEach>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<c:if test="%{ paymentMode=='rtgs'}">
							<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
								class="mandatory">*</span> <form:input
									id="rtgsdateMap[%{#count}]" name="rtgsdateMap[%{#count}]"
									value="%{rtgsdateMap[#count]}" onchange="updateDate(this)"
									onkeyup="DateFormat(this,this.value,event,false,'3')" /></td>
						</c:if>
					</tr>
				</c:forEach>
				</tr>
			</table>
			<div class="subheadsmallnew" id="noRecordsDiv"
				style="visibility: hidden">No Records Found</div>
			<br />

			<div class="buttonbottom">
				<s:hidden id="selectedRows" name="selectedRows"
					value="%{selectedRows}" />
				<s:hidden id="rtgsContractorAssignment"
					name="rtgsContractorAssignment" value="%{rtgsContractorAssignment}" />
				<!-- TODO: Manual migration required for custom Struts tag -->


				<s:submit id="assignChequeBtn" method="update" value="Assign Cheque"
					cssClass="buttonsubmit" onclick="return validate();" />
				<input type="button" value="Close"
					onclick="javascript:window.close()" class="button" />
			</div>
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
	<script>
			function update(obj)
			{
				if(obj.checked){
					document.getElementById('selectedRows').value=parseInt(document.getElementById('selectedRows').value)+1;
				}
				else{
					document.getElementById('selectedRows').value=parseInt(document.getElementById('selectedRows').value)-1;
				}
			}
			function updateDate(obj)
			{
				//bootbox.alert("Before"+obj); 
				//bootbox.alert("obj.name"+obj.name);
				//bootbox.alert("obj.value"+obj.value); 
				document.getElementById(obj).value=obj.value;         
			//	bootbox.alert("After"+obj);            
				//bootbox.alert("obj.name"+obj.name);          
			//	bootbox.alert("obj.value"+obj.value);         
			}
			function validate()
			{
				var result=true;
				
				if(document.getElementById('selectedRows').value=='' || document.getElementById('selectedRows').value==0)
				{
					bootbox.alert('Please select the payment voucher');
					return false;
				}
				
				<c:if test="%{paymentMode=='rtgs'}">
					//result= validateForRtgsMode();  
				</c:if>    
				
								 
				return true;                   
			}
		function validateForRtgsMode(){
				var noOfSelectedRows=document.getElementById('selectedRows').value;
				//bootbox.alert("sizseled"+noOfSelectedRows);      
				var chkCount=0;     
				var index;
				var isSelected=0;
				<!-- TODO: Manual migration required for custom Struts tag -->
				var chequeSize='<!-- TODO: Manual migration required for custom Struts tag -->';
				
					<c:forEach value="accountNoAndRtgsEntryMap" status="stat">
					<!-- TODO: Manual migration required for custom Struts tag -->
				
					<c:forEach value="value" status="s">
					index='${%{#listCount}}';       
					chequeDate='${%{rtgsdateMap[#accountId]}}';     
					var paymentDate= document.getElementsByName("value["+index+"].tempPaymentDate")[0].value; 
						if(document.getElementById('isSelected'+index).checked){
							chkCount++;                 
							bootbox.alert("cheque Date"+chequeDate +"paymentDate"+paymentDate) ;   
							bootbox.alert(compareDate(paymentDate,chequeDate))  ;     
							if( compareDate(paymentDate,chequeDate) == -1){     
								bootbox.alert('Cheque Date cannot be less than  payment Date');
								return false;           
							 } 
							if(chkCount==noOfSelectedRows){ 
								//bootbox.alert("hi"); 
								return true;}                      
						}                               
					<!-- TODO: Manual migration required for custom Struts tag -->                      
					</c:forEach>          
				</c:forEach>
				return true;           
			}
		
			                
			function checkAll(obj)
			{        
				var listSize='<!-- TODO: Manual migration required for custom Struts tag -->';                              
				if(obj.checked)
				{                     
					for(var j=0;j<listSize;j++)  {     
						document.getElementById("isSelected"+j).checked=true;     
					} document.getElementById('selectedRows').value=listSize;                       
				}
				else
				{ 
					for(var i=0;i<listSize;i++){      
						document.getElementById('isSelected'+i).checked=false;
					}document.getElementById('selectedRows').value=0;
				}     
			}
			function viewVoucher(vid){
				var url = '../voucher/preApprovedVoucher!loadvoucherview.action?vhid='+vid;
				window.open(url,'Search','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
			}
			function viewReceiptDetails(phId){
				var url = '../payment/chequeAssignment!getReceiptDetails.action?paymentId='+phId;
				window.open(url,'Search','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
			}
			                
		</script>


</body>
</html>
