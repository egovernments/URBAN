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
<link
	href="<egov:url path='/resources/css/displaytagFormatted.css?rnd=${app_release_no}'/>"
	rel="stylesheet" type="text/css" />
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="/services/EGF/resources/css/ccMenu.css?rnd=${app_release_no}" />
<title>RTGS Reference No Assignment</title>
<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
</head>

<body>
	<script>
		
	</script>
	<form:form action="chequeAssignment" theme="simple">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="RTGS Ref. No Assignment Search" />
		</jsp:include>
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="formmainbox">
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<table align="center" width="100%" cellpadding="0" cellspacing="0"
				id="paymentTable">
				<tr>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.select" /> 
							<form:checkbox id="selectall"
							name="selectall" onclick="checkAll(this)" /></th>
					<th class="bluebgheadtdnew"><!-- TODO: Manual migration required for custom Struts tag --></th>

					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.department.name" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.payment.voucherno" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.payment.voucherdate" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.partycode" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.payment.amount" /></th>

				</tr>
				<!-- TODO: Manual migration required for custom Struts tag -->
				<c:forEach value="accountNoAndRtgsEntryMap" status="stat">
					<tr>
						<td class="greybox"><s:property
								value="key.bankbranch.bank.name" /> - <s:property
								value="key.bankbranch.branchname" /></td>
						<td class="greybox">${key.accountnumber}
							<!-- TODO: Manual migration required for custom Struts tag --></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>

						<c:forEach value="value" status="s">

							<td style="text-align: center" class="blueborderfortdnew">
							<s:hidden id="voucherHeaderId"
									name="rtgsList[%{#counter}].voucherHeaderId"
									value="%{voucherHeaderId}" /> 
							<s:hidden id="billId"
									name="rtgsList[%{#counter}].billId" value="%{billId}" /> 
							<s:hidden
									id="billNumber" name="rtgsList[%{#counter}].billNumber"
									value="%{billNumber}" /> 
							<s:hidden id="expenditureType"
									name="rtgsList[%{#counter}].expenditureType"
									value="%{expenditureType}" />
							 <form:checkbox
									name="rtgsList[%{#counter}].isSelected"
									id="isSelected%{#counter}" onclick="update(this)" /></td>
							<td align="left" style="text-align: center"
								class="blueborderfortdnew" />
							${#s.index+1}
							</td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="departmentName" name="rtgsList[%{#counter}].departmentName"
									value="%{departmentName}" /> <s:property
									value="%{departmentName}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="voucherNumber" name="rtgsList[%{#counter}].voucherNumber"
									value="%{voucherNumber}" /><a href="javascript:void(0);"
								onclick='viewVoucher(${%{voucherHeaderId}});'><s:property
										value="%{voucherNumber}" /></a>&nbsp;</td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="voucherDate" name="rtgsList[%{#counter}].voucherDate"
									value="%{voucherDate}" /> <s:date name="%{voucherDate}"
									var="tempPaymentDate" format="dd/MM/yyyy" /> <s:date
									name="%{voucherDate}" format="dd/MM/yyyy" />
									 <s:hidden
									name="rtgsList[%{#counter}].tempPaymentDate"
									value="%{tempPaymentDate}" id="tempPaymentDate"></s:hidden></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden
									id="paidTo" name="rtgsList[%{#counter}].paidTo"
									value="%{paidTo}" /> ${%{paidTo}}</td>
							<td style="text-align: right" class="blueborderfortdnew"><s:hidden
									id="paidAmount" name="rtgsList[%{#counter}].paidAmount"
									value="%{paidAmount}" /> <!-- TODO: Manual migration required for custom Struts tag -->
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>
							<s:hidden id="bankAccountId"
								name="rtgsList[%{#counter}].bankAccountId"
								value="%{bankAccountId}" />
							<!-- TODO: Manual migration required for custom Struts tag -->
					</tr>
				</c:forEach>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<c:if test="%{ paymentMode=='rtgs'}">
						<!-- <td class="greybox">
							<!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory1">*</span>
							<form:input id="rtgsRefNoMap['%{#count}']" path="rtgsRefNoMap['%{#count}']" value=""/>       
						</td>         -->
						<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
							class="mandatory1">*</span> <s:date name="rtgsdateMap[%{#count}]"
								var="rtgsdateMap[%{#count}]" format="dd/MM/yyyy" /> 
								<form:input
								id="rtgsdateMapId" name="rtgsdateMap[%{#count}]"
								value="%{rtgsdateMap[%{#count}]}" data-date-end-date="0d"
								onkeyup="DateFormat(this,this.value,event,false,'3')"
								placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
								data-inputmask="'mask': 'd/m/y'" /></td>
					</c:if>
				</tr>
				</c:forEach>
			</table>
			<div class="subheadsmallnew" id="noRecordsDiv"
				style="visibility: hidden">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<br />

			<div class="buttonbottom">
			<s:hidden id="selectedRowsId" name="selectedRowsId"
					value="%{selectedRowsId}" />
				<s:hidden id="selectedRows" name="selectedRows"
					value="%{selectedRows}" />
				<s:hidden id="rtgsContractorAssignment"
					name="rtgsContractorAssignment" value="%{rtgsContractorAssignment}" />
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->

				<s:submit id="assignChequeBtn" method="update"
					key="lbl.assign.rtgs.number" cssClass="buttonsubmit"
					onclick="return validate();" />
				<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
					onclick="javascript:window.close();window.parent.postMessage('close','*');"
					class="button" />
			</div>
		</div>
		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
	<script>
	var selectedRowsId=new Array();

			function update(obj)
			{
				console.log(obj);
				if(obj.checked){
					document.getElementById('selectedRows').value = parseInt(document.getElementById('selectedRows').value)+1;
				}
				else{
					document.getElementById('selectedRows').value=parseInt(document.getElementById('selectedRows').value)-1;
				}
			}
			
			function updateDate(obj)
			{
				document.getElementById(obj).value = obj.value;         
			}
			function validate()
			{
				resetSelectedRowsId();
				var result = true;
				
				if(document.getElementById('selectedRows').value=='' || document.getElementById('selectedRows').value==0)
				{
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag --> ');
					return false;
				}
				if(document.getElementById('rtgsdateMapId').value=='')
				{	
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag --> ');
					return false;
				}
				
				<c:if test="%{paymentMode=='rtgs'}">
					result = validateForRtgsMode();  
				</c:if>  
				
				if(result)
				{
					document.chequeAssignment.action ='/services/EGF/payment/chequeAssignment-update.action';
					jQuery(document.chequeAssignment).append(
				    	jQuery('<input>', {
				        	type: 'hidden',
				            	name: '${_csrf.parameterName}',
				                value: '${_csrf.token}'
						})
				    );
					return true; 
				}
				else return false;
			}
			
			
		function validateForRtgsMode(){
				var noOfSelectedRows=document.getElementById('selectedRows').value;
				var chkCount=0;     
				var index;
				var isSelected=0;
				<!-- TODO: Manual migration required for custom Struts tag -->
				var chequeSize='<!-- TODO: Manual migration required for custom Struts tag -->';
				
					<c:forEach value="accountNoAndRtgsEntryMap" status="stat">
					<!-- TODO: Manual migration required for custom Struts tag -->
				
					<c:forEach value="value" status="s">
					index='${%{#listCount}}';       
					//chequeDate='${%{rtgsdateMap[#accountId]}}';
					chequeDate=document.getElementById('rtgsdateMapId').value;
					var paymentDate=document.getElementById('tempPaymentDate').value;
						if(document.getElementById('isSelected'+index).checked){
							chkCount++;                 
							if( compareDate(paymentDate,chequeDate) == -1){     
								bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
								return false;           
							 } 
							if(chkCount==noOfSelectedRows){ 
								return true;}                      
						}                               
					<!-- TODO: Manual migration required for custom Struts tag -->                      
					</c:forEach>          
				</c:forEach>
				return true;           
			}
		
		function resetSelectedRowsId(){
			var checkboxes = document.querySelectorAll("input[type='checkbox']");
			 var temp =[];
			for(var i =0 ; i<checkboxes.length;i++){
				if(checkboxes[i].id != 'selectall'){
					temp.push(checkboxes[i]);
				}else {
					checkboxes[i].disabled = true;
				}
			}
			var chequeSize ='<!-- TODO: Manual migration required for custom Struts tag -->';	
			   selectedRowsId = new Array();
			   
			  for(var index = 0; index<temp.length; index++){
				  var obj = document.getElementById('isSelected'+index);
				  if(obj.checked == true){
					  selectedRowsId.push(document.getElementsByName("rtgsList["+index+"].voucherHeaderId")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].paidTo")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].voucherNumber")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].voucherDate")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].bankAccountId")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].billNumber")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].departmentName")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].billId")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].expenditureType")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].tempPaymentDate")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].isSelected")[0].value+"~"+
								document.getElementsByName("rtgsList["+index+"].paidAmount")[0].value+";");
						
				  }
				  	document.getElementsByName("rtgsList["+index+"].voucherHeaderId")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].paidTo")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].voucherNumber")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].voucherDate")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].bankAccountId")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].billNumber")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].departmentName")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].billId")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].expenditureType")[0].disabled =true;
					document.getElementsByName("rtgsList["+index+"].tempPaymentDate")[0].disabled =true;
					document.getElementsByName("__checkbox_rtgsList["+index+"].isSelected")[0] && document.getElementsByName("__checkbox_rtgsList["+index+"].isSelected")[0].remove();	
					document.getElementsByName("rtgsList["+index+"].paidAmount")[0].disabled =true;
					document.getElementById('selectall').disabled = true;
					
			  } 
				document.getElementById('selectedRowsId').value = selectedRowsId;
	
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
				var url = '../voucher/preApprovedVoucher-loadvoucherview.action?vhid='+vid;
				window.open(url,'Search','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
		}
			
			function disableAll()
			{
				var frmIndex=0;
				for(var i=0;i<document.forms[frmIndex].length;i++)
					{
						for(var i=0;i<document.forms[0].length;i++)
							{
								if(document.forms[0].elements[i].name != 'bankAccountId'  
								&& document.forms[0].elements[i].name != 'rtgsContractorAssignment' 
								   && document.forms[0].elements[i].name != 'billId' 
									&& document.forms[0].elements[i].name != 'paymentMode' 
									&& document.forms[0].elements[i].name != 'billNumber'
									&& document.forms[0].elements[i].name != 'billSubType' 
									&& document.forms[0].elements[i].name != 'departmentName' 
									&& document.forms[0].elements[i].name != 'expenditureType'
									&& document.forms[0].elements[i].name != 'rtgsdateMap'
									&& document.forms[0].elements[i].name != 'selectedRowsId'){
									document.forms[frmIndex].elements[i].disabled =true;
								}						
							}	
					}
			}		
			                
		</script>


</body>
</html>
