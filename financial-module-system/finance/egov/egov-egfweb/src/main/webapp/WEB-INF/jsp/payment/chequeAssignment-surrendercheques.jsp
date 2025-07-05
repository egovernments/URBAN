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
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="/services/EGF/resources/css/ccMenu.css?rnd=${app_release_no}" />
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
</head>
<body>
	<form:form action="chequeAssignment" theme="simple"
		name="chequeAssignment" id="chequeAssignment">
		<!-- TODO: Manual migration required for custom Struts tag -->
		<input type="hidden" id="csrfTokenValue" name="${_csrf.parameterName}"
			value="${_csrf.token}" />
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Surrender/Reassign Cheque" />
		</jsp:include>
		<span class="mandatory1"> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</span>
		<div class="subheadnew"></div>
		<div class="formmainbox">
			<div class="subheadnew">
				${bank_account_dept}
			</div>
			<!--<!-- TODO: Manual migration required for custom Struts tag -->
			-->
			<!-- TODO: Manual migration required for custom Struts tag -->
			
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<th class="bluebgheadtdnew"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.instrument.serialno" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.instrument.no" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.transacton.no" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.instrument.amount" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.instrument.date" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.partycode" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.paymentvoucherno" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.surrender" /></th>
					<th class="bluebgheadtdnew"><s:text
							name="chq.assignment.surrendarreason" /></th>
					<c:if test="%{!isChequeNoGenerationAuto()}">
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.instrument.newserialno" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.newchequenumber" /></th>
						<th class="bluebgheadtdnew"><s:text
								name="chq.assignment.newchequedate" /></th>

					</c:if>
				</tr>
				<c:if test="%{instrumentHeaderList.size()>0 }">
					<c:forEach var="p" value="instrumentHeaderList" status="stat">
						<tr>
							<!-- TODO: Manual migration required for custom Struts tag -->
							<s:hidden name="paymentVoucherNumber"
								value="%{voucherHeaderId.id}" />
							<td style="text-align: center" class="blueborderfortdnew" />
							${#stat.index+1}
							</td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{serialNo.finYearRange}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{instrumentNumber}" /><s:hidden name="instrumentHeaderList[%{#stat.index}].instrumentNumber"
								value="%{instrumentNumber}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:hidden name="instrumentHeaderList[%{#stat.index}].transactionNumber"
								value="%{transactionNumber}" /><s:property
									value="%{transactionNumber}" /></td>
							<td style="text-align: right" class="blueborderfortdnew"><s:hidden name="instrumentHeaderList[%{#stat.index}].instrumentAmount"
								value="%{instrumentAmount}" /><s:text
									name="format.number">
									<!-- TODO: Manual migration required for custom Struts tag -->
								</s:text></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:date
									name="%{instrumentDate}" format="dd/MM/yyyy" /><s:hidden name="instrumentHeaderList[%{#stat.index}].instrumentDate"
								value="%{instrumentDate}" /></td>
							<td style="text-align: center" class="blueborderfortdnew"><s:property
									value="%{payTo}" /><s:hidden name="instrumentHeaderList[%{#stat.index}].payTo"
								value="%{payTo}" /></td>

							<td style="text-align: center" class="blueborderfortdnew"><c:forEach
									var="v" value="instrumentVouchers" status="st">
									<A href="#"
										onclick='openDetails(${%{voucherHeaderId.id}});'>
										${%{voucherHeaderId.voucherNumber}}
									</A>
								</c:forEach></td>
							<td style="text-align: center" class="blueborderfortdnew">
								<c:if test="%{id in surrender}">
									<form:checkbox path="surrender" id="surrender%{#stat.index}"
										value='%{true}'
										fieldValue="%{id}" />
								</c:if>
								<c:otherwise>
									<form:checkbox path="surrender" id="surrender%{#stat.index}"
										value='%{false}'
										fieldValue="%{id}" />
								</s:else>
							</td>
							<td style="text-align: center" class="blueborderfortdnew"><form:select
									name="surrendarReasons" id="surrendarReasons"
									list="surrendarReasonMap" headerKey="-1"
									headerValue="%{getText('lbl.choose.options')}"
									value='%{surrendarReasons[#stat.index]}' /> <c:if
									test="%{!isChequeNoGenerationAuto()}">
									<td style="text-align: right" class="blueborderfortdnew">
										<form:select path="newSerialNo" id="newSerialNo%{#stat.index}"
											list="chequeSlNoMap" value='%{newSerialNo[#stat.index]}'
											class="newSerialNo" />
									</td>
									<td style="text-align: left" class="blueborderfortdnew"><form:input
											maxlength="6" size="6" name="newInstrumentNumber"
											id="newInstrumentNumber%{#stat.index}"
											value='%{newInstrumentNumber[#stat.index]}'
											onkeypress='return event.charCode >= 48 && event.charCode <= 57'
											onblur="validatechequeno(this)" /></td>
									<td style="text-align: left" class="blueborderfortdnew"><form:input
											id="newInstrumentDate" name="newInstrumentDate"
											value="%{newInstrumentDate[#stat.index]}"
											data-date-end-date="0d"
											onkeyup="DateFormat(this,this.value,event,false,'3')"
											placeholder="DD/MM/YYYY" class="form-control datepicker"
											data-inputmask="'mask': 'd/m/y'" /></td>
								</c:if>
						</tr>
					</c:forEach>
					<tr>
						<td class="greybox" colspan="3"><s:text
								name="chq.issued.department" /><span class="mandatory1">*</span>
							<form:select path="department" id="department"
								list="dropdownData.departmentList" listKey="code" listValue="name"
								headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
								value="%{department}" onChange="populateYearcode(this);" /></td>
						<td class="greybox" colspan="10"></td>
					</tr>
				</c:if>


			</table>
			<br />

			<c:if test="%{instrumentHeaderList.size()>0}">
				<div class="buttonbottom">
					<!-- TODO: Manual migration required for custom Struts tag -->
					<s:hidden name="selectedRowsId" id="selectedRowsId"
						value="%{selectedRowsId}" />
						<s:hidden name="containsRTGS" id="containsRTGS"
						value="%{containsRTGS}" />
					<input type="button" Class="buttonsubmit" name="Surrender"
						value='<!-- TODO: Manual migration required for custom Struts tag -->' onclick="return surrenderChq();" method="save" />
					<c:if test="%{containsRTGS==false}">
						<input type="submit" Class="buttonsubmit"
							name="SurrenderAndReassign" value='<!-- TODO: Manual migration required for custom Struts tag -->'
							onclick="return Reassign();" method="save" />
					</c:if>
					<input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'
						onclick="javascript:window.close();window.parent.postMessage('close','*');" class="button" />
				</div>
			</c:if>
			<c:otherwise>
				<div class="subheadsmallnew" id="noRecordsDiv"><!-- TODO: Manual migration required for custom Struts tag --> </div>
			</s:else>
		</div>


		<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
	<script>
		function validatechequeno(obj)
			{
				if(isNaN(obj.value))
				{
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
					obj.value='';
					return false;
				}
				var index = obj.id.substring(19,obj.id.length);
				if(obj.value=='')
					return true;
				//bootbox.alert(index);		
				if(document.getElementById('department') && document.getElementById('department').options[document.getElementById('department').selectedIndex].value==-1)
				{
					bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
					obj.value='';
					return false;
				}
				var name=obj.id;
				name=name.replace("InstrumentNumber","SerialNo");
			   var slObj=	document.getElementById(name);
				var dept = document.getElementById('department').options[dom.get('department').selectedIndex].value;
				var slNo = slObj.options[slObj.selectedIndex].value;
				var csrfToken = document.getElementById('csrfTokenValue').value;
				var url = '${pageContext.request.contextPath}/voucher/common-ajaxValidateChequeNumber.action?bankaccountId='+document.getElementById('bankaccount').value+'&chequeNumber='+obj.value+'&index='+index+'&departmentId='+dept+"&serialNo="+slNo+'&_csrf='+csrfToken;
				var transaction = YAHOO.util.Connect.asyncRequest('POST', url,callback , null);
			}
			
			
			var callback = {
				success: function(o) {
					var res=o.responseText;
					res = res.split('~');
					if(res[1]=='false')
					{
						bootbox.alert('<!-- TODO: Manual migration required for custom Struts tag -->');
						document.getElementById('newInstrumentNumber['+parseInt(res[0])+']').value='';
					}
			    },
			    failure: function(o) {
			    	bootbox.alert('failure');
			    }
			}
			
		
	function openDetails(val)
	{
	var mode="view";
 	window.open("/services/EGF/voucher/preApprovedVoucher-loadvoucherview.action?vhid="+val+"&showMode="+mode,"","height=650,width=900,scrollbars=yes,left=30,top=30,status=yes");
 	}
 	function surrenderChq(){
 		resetSelectedRowsId();
 		if(Array.isArray(selectedRowsId) && !selectedRowsId.length){
  	  		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
  	  		return false;
  	  	}
 		disableAll();
 		document.getElementById('button').value='surrender';
 		document.chequeAssignment.action = '/services/EGF/payment/chequeAssignment-save.action';
 		jQuery(chequeAssignment).append(
 				jQuery('<input>', {
                    type: 'hidden',
                    name: '${_csrf.parameterName}',
                    value: '${_csrf.token}'
                })
            );
		document.chequeAssignment.submit();
		 return true;
 	}
  	function Reassign()
 	{
  		resetSelectedRowsId();
  		if(Array.isArray(selectedRowsId) && !selectedRowsId.length){
  	  		bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
  	  		return false;
  	  	}
	 	document.getElementById('button').value='surrenderAndReassign';
	 	var chqGenMode='${isChequeNoGenerationAuto()}';
	 	var alertNumber='<!-- TODO: Manual migration required for custom Struts tag -->';
	 	var alertOnlyNumber='<!-- TODO: Manual migration required for custom Struts tag -->';
	 	var alertDate='<!-- TODO: Manual migration required for custom Struts tag -->';
	 	if(chqGenMode=='false')
	 	{
	 		var surrenderObj=document.getElementsByName('surrender');
	 		var newChqNoObj=document.getElementsByName('newInstrumentNumber');
	 		var newChqDateObj=document.getElementsByName('newInstrumentDate');
			var i;
			var srlNo=document.getElementsByName('newSerialNo');
	 		for(i=0;i<surrenderObj.length;i++)
	 		{
	 		 if(surrenderObj[i].checked==true)
	 			{
	 			if(srlNo[i].value=="")
	 			{
	 				bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
	 				return false;
	 			}
	 				if(newChqNoObj[i].value==""||newChqNoObj[i].value==undefined)
					{
						bootbox.alert(alertNumber);
						newChqNoObj[i].focus();
						return false;
					}
					else
					{
					if(isNaN(newChqNoObj[i].value))
					{
					bootbox.alert(alertOnlyNumber);
					}
					}
					
					if(newChqDateObj[i].value=="" || newChqDateObj[i].value==undefined)
					{
					bootbox.alert(alertDate);
					newChqDateObj[i].focus();
					return false;
	 				}
	 			}
	  	
	 		}
	 	
 		}
	 	disableAll();
	 	document.chequeAssignment.action = '/services/EGF/payment/chequeAssignment-save.action?containsRTGS='
		 	+sanitizeHTML(document.getElementById('containsRTGS').value);
	 	jQuery(chequeAssignment).append(
	 			jQuery('<input>', {
	                type: 'hidden',
	                name: '${_csrf.parameterName}',
	                value: '${_csrf.token}'
	            })
	        );
		document.chequeAssignment.submit();
		
 	}
  	function  populateYearcode(departmentid){
		console.log('departmentid'+departmentid.value);
		console.log('bankaccount'+document.getElementById('bankaccount').value);
		jQuery.ajax({
			url: "/services/EGF/voucher/common-ajaxYearCode.action?departmentId="+sanitizeHTML(departmentid.value)
			+"&bankaccount="+sanitizeHTML(document.getElementById('bankaccount').value),
			method: 'GET',
		    async : false,
		    
			success: function(data)
			   {
				//console.log("inside success") ;  
				jQuery('.newSerialNo').empty();
				var output = '';
				//console.log("inside data"+data+"---"+data.ResultSet+"---"+data.ResultSet.Result) ;  
				for(i=0;i<data.ResultSet.Result.length;i++){
					output = output+ '<option value=' + data.ResultSet.Result[i].Value + '>'
					+ data.ResultSet.Result[i].Text+ '</option>';
				  }
				jQuery('.newSerialNo').append(output);  
			   },
			error: function(jqXHR, textStatus, errorThrown)
			  {
				console.log("inside Failure"+errorThrown) ;  
			  }         
		});

    }
  	var selectedRowsId = new Array();
  	function resetSelectedRowsId(){
  		
  		var newSurrendarReasonsObj=document.getElementsByName('surrendarReasons');
 		var newSerialNoObj=document.getElementsByName('newSerialNo');
 		var newChqNoObj=document.getElementsByName('newInstrumentNumber');
 		var newChqDateObj=document.getElementsByName('newInstrumentDate');
		var chequeSize='<!-- TODO: Manual migration required for custom Struts tag -->';
		   selectedRowsId = new Array();
			for(var index=0;index<chequeSize;index++){
				var obj = document.getElementById('surrender'+index);
				if(obj.checked == true){
				selectedRowsId.push(document.getElementsByName("instrumentHeaderId")[index].value+"~"+
							newChqNoObj[index].value+"~"+
							newChqDateObj[index].value+"~"+
							newSerialNoObj[index].value+"~"+
							newSurrendarReasonsObj[index].value+";"				
							);
					
					
				}
			}
			document.getElementById('selectedRowsId').value = selectedRowsId;
	}
  	function disableAll()
	{
		var frmIndex=0;
		for(var i=0;i<document.forms[frmIndex].length;i++)
			{
				for(var i=0;i<document.forms[0].length;i++)
					{
						if(document.forms[0].elements[i].name != 'bankaccount' && document.forms[0].elements[i].name != 'bank_branch'
							&& document.forms[0].elements[i].name != 'fromDate' && document.forms[0].elements[i].name != 'toDate' &&
							document.forms[0].elements[i].name != 'button' && document.forms[0].elements[i].name != 'selectedRowsId'
							&& document.forms[0].elements[i].name != 'containsRTGS' 
							&& document.forms[0].elements[i].name != 'voucherNumber'
							 /* && document.forms[0].elements[i].name != 'instrumentNumber' */ 
							/* && document.forms[0].elements[i].name != 'surrender'  */
							&& document.forms[0].elements[i].name != 'department' 
							/* && document.forms[0].elements[i].name != 'newInstrumentNumber'  */
							/* && document.forms[0].elements[i].name != 'newInstrumentDate'  */
							 /* && document.forms[0].elements[i].name != 'surrendarReasons' */  
							/* && document.forms[0].elements[i].name != 'newInstrumentDate' */ 
							/* && document.forms[0].elements[i].name != 'newSerialNo' */){
							document.forms[frmIndex].elements[i].disabled =true;
						}						
					}	
			}
	}
	</script>
</body>

</html>