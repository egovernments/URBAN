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


<html>
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/javascript/contingentBillHelper.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/calendar.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/dateValidation.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/ajaxCommonFunctions.js?rnd=${app_release_no}"></script>
<link rel="stylesheet" href="/services/EGF/resources/css/tabber.css?rnd=${app_release_no}"
	TYPE="text/css">
<script type="text/javascript" src="/services/EGF/resources/javascript/tabber.js?rnd=${app_release_no}"></script>
<script type="text/javascript"
	src="/services/EGF/resources/javascript/tabber2.js?rnd=${app_release_no}"></script>


<meta http-equiv="Content-Type"
	content="text/html; charset=windows-1252">
<style type="text/css">
#codescontainer {
	position: absolute;
	left: 11em;
	width: 9%;
	text-align: left;
}

#codescontainer .yui-ac-content {
	position: absolute;
	width: 600px;
	border: 1px solid #404040;
	background: #fff;
	overflow: hidden;
	z-index: 9050;
}

#codescontainer .yui-ac-shadow {
	position: absolute;
	margin: .3em;
	width: 300px;
	background: #a0a0a0;
	z-index: 9049;
}

#codescontainer ul {
	padding: 5px 0;
	width: 100%;
}

#codescontainer li {
	padding: 0 5px;
	cursor: default;
	white-space: nowrap;
}

#codescontainer li.yui-ac-highlight {
	background: #ff0;
}

#codescontainer li.yui-ac-prehighlight {
	background: #FFFFCC;
}

.yui-skin-sam tr.yui-dt-odd {
	background-color: #FFF;
}
</style>

<script>
mode='modify';
<c:forEach value="commonBean.checkListValuesMap" status="stat">
var option${#stat.index}=new Option('${key}','${value}');
</c:forEach>




var succesMessage='<!-- TODO: Manual migration required for custom Struts tag -->';
var 	button='${button}';
var enterpayto='<!-- TODO: Manual migration required for custom Struts tag -->';
var entityNotSelected='<!-- TODO: Manual migration required for custom Struts tag -->';
var invalidEntityselected='<!-- TODO: Manual migration required for custom Struts tag -->';
var invalidAccountCode='<!-- TODO: Manual migration required for custom Struts tag -->';
path="${pageContext.request.contextPath}";
var totaldbamt=0,totalcramt=0;
var makeVoucherDetailTable = function() {
 var voucherDetailColumns = [ 
{key:"glcode",label:'Account Code',width:'15%', formatter:glcodeFormatter("billDetailsTable",".glcodeDetail","text")},
{key:"accounthead", label:'Account Head',width:'60%',formatter:accountheadFormatter("billDetailsTable",".accounthead","text")},				
{key:"amount",label:'Debit',width:'15%', formatter:amountFormatter("billDetailsTable",".debitAmountDetail","text")}, 
{key:'Add',label:'Add',width:'5%',formatter:createAddImageFormatter("${pageContext.request.contextPath}","addYUIRow('billDetailsTable',this)")},
{key:'Delete',label:'Delete',width:'5%',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}","deleteYUIRow('billDetailsTable',this)")}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTable = new YAHOO.widget.DataTable("billDetailTable",voucherDetailColumns, voucherDetailDS);
<c:forEach value="billDetailslist" status="stat">

	billDetailsTable.addRow({SlNo:billDetailsTable.getRecordSet().getLength()+1,
		
		"glcodeid":'${glcodeIdDetail}',
		"glcode":'${glcodeDetail}',
		"isSubledger":'${isSubledger}',
		"accounthead":'${accounthead}',
		"amount":'${%{debitAmountDetail}}'
		});
	var index = '${#stat.index}';
	updateGridCbill('billDetailsTable','glcodeIdDetail',index,'${glcodeIdDetail}');
	updateGridCbill('billDetailsTable','glcodeDetail',index,'${glcodeDetail}');
	updateGridCbill('billDetailsTable','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTable','debitAmountDetail',index,'${debitAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>


	

}
var totaldbamt=0,totalcramt=0;
var makeVoucherDetailTableCredit = function() {
 var voucherDetailColumnsCredit = [ 
{key:"glcode",label:'Account Code',width:'15%', disable:true, formatter:glcodeFormatter("billDetailsTableCredit",".glcodeDetail","text")},
{key:"accounthead", label:'Account Head',width:'50%',disable:true,formatter:accountheadFormatter("billDetailsTableCredit",".accounthead","text")},				
{key:"amount",label:'Credit',width:'15%', formatter:amountFormatter("billDetailsTableCredit",".debitAmountDetail","text")}, 
{key:'Add',label:'Add',width:'5%',formatter:createAddImageFormatter("${pageContext.request.contextPath}","addYUIRow('billDetailsTableCredit',this)")},
{key:'Delete',label:'Delete',width:'5%',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}","deleteYUIRow('billDetailsTableCredit',this)")}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTableCredit = new YAHOO.widget.DataTable("billDetailTableCredit",voucherDetailColumnsCredit, voucherDetailDS);
<c:forEach value="billDetailslist" status="stat">

	billDetailsTableCredit.addRow({SlNo:billDetailsTableCredit.getRecordSet().getLength()+1,
		"glcodeid":'${glcodeIdDetail}',
		"glcode":'${glcodeDetail}',
		"accounthead":'${accounthead}',
		"amount":'${%{debitAmountDetail}}'
		});
	var index = '${#stat.index}';
	updateGridCbill('billDetailsTableCredit','glcodeIdDetail',index,'${glcodeIdDetail}');
	updateGridCbill('billDetailsTableCredit','glcodeDetail',index,'${glcodeDetail}');
	updateGridCbill('billDetailsTableCredit','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTableCredit','debitAmountDetail',index,'${debitAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>


}
var makeVoucherDetailTableNet = function() {
 var voucherDetailColumnsNet = [ 
{key:"glcode",label:'Account Code',width:'15%', formatter:netglcodeFormatter("billDetailsTableNet",".glcodeDetail","text")},
{key:"accounthead", label:'Account Head',width:'60%',formatter:accountheadFormatter("billDetailsTableNet",".accounthead","text")},				
{key:"amount",label:'Net',width:'15%',formatter:amountFormatter("billDetailsTableNet",".debitAmountDetail","text")},
{key:'Add',label:'Add',width:'5%'},
{key:'Delete',label:'Delete',width:'5%'}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTableNet = new YAHOO.widget.DataTable("billDetailTableNet",voucherDetailColumnsNet, voucherDetailDS);
<c:forEach value="billDetailslist" status="stat">

	billDetailsTableNet.addRow({SlNo:billDetailsTableNet.getRecordSet().getLength()+1,
		"glcodeid":'${glcodeIdDetail}',
		"glcode":'${glcodeDetail}',
		"accounthead":'${accounthead}',
		"amount":'${%{debitAmountDetail}}'
		});
	var index = '${#stat.index}';
	updateGridCbill('billDetailsTableNet','glcodeIdDetail',index,'${glcodeIdDetail}');
	updateGridCbill('billDetailsTableNet','glcodeDetail',index,'${glcodeDetail}');
	updateGridCbill('billDetailsTableNet','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTableNet','debitAmountDetail',index,'${debitAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>
}


var makeVoucherDetailTableFinal = function() {
 var voucherDetailColumns = [ 
{key:"glcode",label:'Account Code',width:'15%', formatter:glcodeFormatterCbillModify("billDetailsTableFinal",".glcodeDetail","text")},
{key:"accounthead", label:'Account Head',width:'60%',formatter:accountheadFormatter("billDetailsTableFinal",".accounthead","text")},				
{key:"amount",label:'Debit',width:'15%', formatter:amountFormatterForGrid("billDetailsTableFinal",".debitAmountDetail","text")}, 
{key:'Add',label:'Add',width:'5%',formatter:createAddImageFormatterEmpty("${pageContext.request.contextPath}","addYUIRow('billDetailsTableFinal',this)")},
{key:'Delete',label:'Delete',width:'5%',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}","deleteYUIRow1('billDetailsTableFinal',this)")}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTableFinal = new YAHOO.widget.DataTable("billDetailTableFinal",voucherDetailColumns, voucherDetailDS);
<c:forEach value="billDetailsTableFinal" status="stat">

	billDetailsTableFinal.addRow({SlNo:billDetailsTableFinal.getRecordSet().getLength()+1,
		"glcodeid":'${glcodeIdDetail}',
		"glcode":'${glcodeDetail}',
		"accounthead":'${accounthead}',
		"isSubledger":'${isSubldger}',
		"amount":'${%{debitAmountDetail}}'
		});
	var index = '${#stat.index}';
	updateGridCbill('billDetailsTableFinal','glcodeIdDetail',index,'${glcodeIdDetail}');
	updateGridCbill('billDetailsTableFinal','glcodeDetail',index,'${glcodeDetail}');
	updateGridCbill('billDetailsTableFinal','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTableFinal','isSubledger',index,'${isSubledger}');
	updateGridCbill('billDetailsTableFinal','debitAmountDetail',index,'${debitAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>


	

}
var totaldbamt=0,totalcramt=0;
var makeVoucherDetailTableCreditFinal = function() {
 var voucherDetailColumnsCredit = [ 
{key:"glcode",label:'Account Code',width:'15%', formatter:glcodeFormatterCbillModify("billDetailsTableCreditFinal",".glcodeDetail","text")},
{key:"accounthead", label:'Account Head',width:'50%',formatter:accountheadFormatter("billDetailsTableCreditFinal",".accounthead","text")},				
{key:"amount",label:'Credit',width:'15%', formatter:amountFormatterForGrid("billDetailsTableCreditFinal",".creditAmountDetail","text")},
{key:'Add',label:'Add',width:'5%',formatter:createAddImageFormatterEmpty("${pageContext.request.contextPath}","addYUIRow('billDetailsTableCreditFinal',this)")},
{key:'Delete',label:'Delete',width:'5%',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}","deleteYUIRow1('billDetailsTableCreditFinal',this)")}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTableCreditFinal = new YAHOO.widget.DataTable("billDetailTableCreditFinal",voucherDetailColumnsCredit, voucherDetailDS);
<c:forEach value="billDetailsTableCreditFinal" status="stat">

	billDetailsTableCreditFinal.addRow({SlNo:billDetailsTableCredit.getRecordSet().getLength()+1,
		"glcodeid":'${glcodeIdDetail}',
		"glcode":'${glcodeDetail}',
		"accounthead":'${accounthead}',
	    "isSubledger":'${isSubldger}',
		"amount":'${%{creditAmountDetail}}'
		});
	var index = '${#stat.index}';
	
	updateGridCbill('billDetailsTableCreditFinal','glcodeIdDetail',index,'${glcodeIdDetail}');
	updateGridCbill('billDetailsTableCreditFinal','glcodeDetail',index,'${glcodeDetail}');
	updateGridCbill('billDetailsTableCreditFinal','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTableCreditFinal','isSubledger',index,'${isSubledger}');
	updateGridCbill('billDetailsTableCreditFinal','creditAmountDetail',index,'${creditAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>


}
var makeVoucherDetailTableNetFinal = function() {
 var voucherDetailColumnsNet = [ 
{key:"glcode",label:'Account Code',width:'15%', formatter:glcodeFormatter("billDetailsTableNetFinal",".glcodeDetail","text")},
{key:"accounthead", label:'Account Head',width:'60%',formatter:accountheadFormatter("billDetailsTableNetFinal",".accounthead","text")},				
{key:"amount",label:'Net',width:'15%',formatter:amountFormatter("billDetailsTableNetFinal",".creditAmountDetail","text")},
{key:'Add',label:'Add',width:'5%'},
{key:'Delete',label:'Delete',width:'5%'}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTableNetFinal = new YAHOO.widget.DataTable("billDetailTableNetFinal",voucherDetailColumnsNet, voucherDetailDS);
<c:forEach value="billDetailsTableNetFinal" status="stat">
	billDetailsTableNetFinal.addRow({SlNo:billDetailsTableNetFinal.getRecordSet().getLength()+1,
		"glcodeid":'${glcodeIdDetail}',
		"glcode":'${glcodeDetail}',
		"accounthead":'${accounthead}',
		"isSubledger":'${isSubldger}',
		"amount":'${%{creditAmountDetail}}'
		});
	var index = '${#stat.index}';
	updateGridCbill('billDetailsTableNetFinal','glcodeIdDetail',index,'${glcodeIdDetail}');
	updateGridCbill('billDetailsTableNetFinal','glcodeDetail',index,'${glcodeDetail}');
	updateGridCbill('billDetailsTableNetFinal','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTableNetFinal','isSubledger',index,'${isSubledger}');
	updateGridCbill('billDetailsTableNetFinal','creditAmountDetail',index,'${creditAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>
}

var makeVoucherDetailTableSubledger = function() {
 var voucherDetailColumnsSubledger = [ 
{key:"subledgerCode",label:'Subledger Code',width:'10%',  formatter:subledgerFormatter("billDetailsTableSubledger",".subledgerCode","text")},
{key:"detailCode",label:'Entity Code',width:'10%', formatter:detailcodeFormatter("billDetailsTableSubledger",".detailCode","text")},
{key:"detailName",label:'Entity Name',width:'15%', formatter:detailnameFormatter("billDetailsTableSubledger",".detailName","text")},
{key:"accounthead", label:'Account Head',width:'20%',formatter:accountheadFormatter1("billDetailsTableSubledger",".accounthead","text")},				
{key:"amount",label:'Amount',width:'15%',formatter:amountFormatter("billDetailsTableSubledger",".debitAmountDetail","text")},
{key:'Add',label:'Add',width:'5%',formatter:createAddImageFormatter("${pageContext.request.contextPath}","addYUIRow('billDetailsTableSubledger',this)")},
{key:'Delete',label:'Delete',width:'5%',formatter:createDeleteImageFormatter("${pageContext.request.contextPath}","deleteYUIRow('billDetailsTableSubledger',this)")}
];
var voucherDetailDS = new YAHOO.util.DataSource(); 
billDetailsTableSubledger = new YAHOO.widget.DataTable("billDetailTableSubledger",voucherDetailColumnsSubledger, voucherDetailDS);
<c:forEach value="billDetailsTableSubledger" status="stat">

	billDetailsTableSubledger.addRow({SlNo:billDetailsTableSubledger.getRecordSet().getLength()+1,
		"subledgerCode":'${subledgerCode}',
		"detailName":'${detailNameEscSpecChar}',
		"detailCode":'${detailCode}',
		"detailKey":'${detailKey}',
		"accounthead":'${accounthead}',
		"amount":'${amount}'
		});
	var index = '${#stat.index}';
	updateGridCbill('billDetailsTableSubledger','subledgerCode',index,'${subledgerCode}');
	updateGridCbill('billDetailsTableSubledger','detailCode',index,'${detailCode}');
	updateGridCbill('billDetailsTableSubledger','detailName',index,'${detailNameEscSpecChar}');
	updateGridCbill('billDetailsTableSubledger','detailKey',index,'${detailKey}');
	updateGridCbill('billDetailsTableSubledger','accounthead',index,'${accounthead}');
	updateGridCbill('billDetailsTableSubledger','debitAmountDetail',index,'${debitAmountDetail}');
	//updateAccountTableIndex();	
</c:forEach>
}

var makeCheckListTable = function() {
 var checkListColumns = [ 
{key:"name",label:'Check List Name',width:680, formatter:checkListNameFormatter("checkListsTable",".name","text")},
{key:"val", label:'Check List Value',width:120,formatter:checkListValueFormatter("checkListsTable",".val","text")}			
];
var checkListDS = new YAHOO.util.DataSource(); 
checkListsTable = new YAHOO.widget.DataTable("checkListTable",checkListColumns, checkListDS);
<c:forEach value="checkListsTable" status="stat">

	checkListsTable.addRow({SlNo:checkListsTable.getRecordSet().getLength()+1,
		"name":'${name}',
		"id":'${id}',
		"val":'${value}'
		});
	var index = '${#stat.index}';
	updateDropdown('checkListsTable','val',index);
	updateGridCbill('checkListsTable','name',index,'${name}');
	updateGridCbill('checkListsTable','id',index,'${id}');
	updateGridCbill('checkListsTable','val',index,'${val}');
	
	//updateAccountTableIndex();	
</c:forEach>
}


function onLoadTask_new(){


if(button!=undefined && button!="")
{

if(document.getElementById("Errors").innerHTML=='')  
{
bootbox.alert(succesMessage);

if(button=="Save_Close")
{
window.close();
}
else if(button=="Save_View")
{
//	var vhId='${voucherHeader.id}';
//	document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher!loadvoucherview.action?vhid="+vhId;
//	document.forms[0].submit();
}
else if(button=="Save_New")

{      	
document.forms[0].button.value='';
document.forms[0].action = "contingentBill!newform.action";
document.forms[0].submit();
}
}
}

}

function loadCheckList(obj)
{

var table_name=eval("checkListsTable");
			var Len=table_name.getRecordSet().getLength();

if(table_name.getRecordSet().getLength()>=1)
{			
	allRecords=table_name.getRecordSet();
	for(var i=allRecords.getLength();i>=0;i--)
	{
	table_name.deleteRow(i);
	}
}	
if(obj.value!=0)
{

var	url = path+"/voucher/common!ajaxLoadCheckList.action?billSubtypeId="+obj.value;
	var req2 = initiateRequest();
	req2.onreadystatechange = function()
	{
	  if (req2.readyState == 4)
	  {
		  if (req2.status == 200)
		  {
			var entity=req2.responseText;
			var a = entity.split("^");
			var eachEntity = a[0];
			chekListArray=eachEntity.split("+");
			if(chekListArray.length>0)
			{
			//var tab=document.getElementById("checkListTable");
			for(var i=0;i<chekListArray.length-1;i++)
			{
			var s_table_name=eval("checkListsTable");
			var Len=s_table_name.getRecordSet().getLength();
			s_table_name.addRow({SlNo:Len});
		    var v=chekListArray[i].split("`-`");
			document.getElementById("checkListsTable["+(Len)+"].name").value=v[0];
			document.getElementById("checkListsTable["+(Len)+"].id").value=v[1];
			<c:forEach value="commonBean.checkListValuesMap" status="stat">
				document.getElementById("checkListsTable["+(Len)+"].val").options[${#stat.index}]=new Option("<!-- TODO: Manual migration required for custom Struts tag -->", "<!-- TODO: Manual migration required for custom Struts tag -->");
			</c:forEach>
			document.getElementById("checkListsTable["+(Len)+"].val").value='na';
			//bootbox.alert("1");
			}
			}
			
			
		  }
	  }
 	};
	req2.open("GET", url, true);
	//bootbox.alert(url)
	req2.send(null);

}




}
function updateDropdown(tab,field,idx)
{
<c:forEach value="commonBean.checkListValuesMap" status="stat">
document.getElementById(tab+"["+idx+"]."+field).options[${#stat.index}]=new Option('${value}','${key}');
</c:forEach>
}

</script>
</head>
<body>
	<form:form action="contingentBill" theme="css_xhtml" name="cbill"
		validate="true">
		<!-- TODO: Manual migration required for custom Struts tag -->
			<div id="loading"
				style="position: absolute; left: 25%; top: 70%; padding: 2px; z-index: 20001; height: auto; width: 500px; display: none;">
				<div class="loading-indicator"
					style="background: white; color: #444; font: bold 13px tohoma, arial, helvetica; padding: 10px; margin: 0; height: auto;">
					<img src="/services/egi/resources/erp2/images/loading.gif" width="32"
						height="32" style="margin-right: 8px; vertical-align: top;" />
					Loading...
				</div>
			</div>
			<div class="tabber" id="main" align="left">
				<div class="tabbertab" id=maintab
					style="height: 420px; overflow: false">
					<h2>Header</h2>
					<jsp:include page="../budget/budgetHeader.jsp">
						<jsp:param value="Contingent Bill" name="heading" />
					</jsp:include>
					<div class="formmaininbox">
						<div class="formheading" />
						<div class="subheadnew">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</div>
					</div>
					<center>
						<span class="mandatory">
							<div id="Errors">
								<!-- TODO: Manual migration required for custom Struts tag -->
								<!-- TODO: Manual migration required for custom Struts tag -->
							</div> <!-- TODO: Manual migration required for custom Struts tag -->
						</span>
					</center>
					<table border="0" width="100%" cellspacing="0" cellpadding="0">
						<tr>
							<td class="bluebox"></td>
							<c:if test="%{!billNumberGenerationAuto}">
								<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
									class="mandatory">*</span></td>
								<td class="bluebox"><form:input
										name="commonBean.billNumber" /></td>
							</c:if>
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
								class="mandatory">*</span></td>
							<s:date name='commonBean.billDate' var="commonBean.billDateId"
								format='dd/MM/yyyy' />
							<td class="bluebox"><form:input path="commonBean.billDate"
									id="billDate"
									onkeyup="DateFormat(this,this.value,event,false,'3')"
									value="%{commonBean.billDateId}" /> <a tabindex="-1"
								href="javascript:show_calendar('cbill.billDate');"
								style="text-decoration: none">&nbsp;<img
									src="/services/egi/resources/erp2/images/calendaricon.gif" border="0" /></A></td>
						</tr>
						<%@include file="contingentBill-form.jsp"%>
					</table>
				</div>
			</div>
			<div class="tabbertab" id="checkList">
				<h2>Check List</h2>
				<div class="yui-skin-sam" align="center">
					<div id="checkListTable"></div>
				</div>

				<script>
			   	makeCheckListTable();
			   	document.getElementById('checkListTable').getElementsByTagName('table')[0].width="800";
	</script>


				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->

			</div>
			<div class="tabbertab" id="approval">
				<h2>Approval Information</h2>
				<font style='color: red;'>
					<div align="center" class="error-block" id="lblError"
						style="font: bold; text-align: center"></div>
					<div align="center" class="error-block" id="Errors"
						style="font: bold; text-align: center"></div>
				</font>
				<c:if test='%{! nextLevel.equalsIgnoreCase("END")}'>

					<%@include file="../voucher/workflowApproval-contingent.jsp"%>
				</c:if>
				<!-- TODO: Manual migration required for custom Struts tag -->

				<div align="center">
					<table border="0" width="100%">
						<tr>
							<td class="bluebox">Comments</td>
							<td class="bluebox"><form:textarea path="comments"
									id="comments" cols="150" rows="3" onblur="checkLength(this)" /></td>
						</tr>
						<br />
					</table>
				</div>
				<div class="buttonbottom">
					<table border="0" width="75%" cellspacing="0" align="center">
						<tr></tr>
						<!-- TODO: Manual migration required for custom Struts tag -->
						<tr>
							<c:forEach value="%{validButtons}" var="p">
								<td><s:submit type="submit" cssClass="buttonsubmit"
										value="%{description}" id="%{name}" name="%{name}"
										method="edit"
										onclick="document.getElementById('button').value='%{description}';return validate('%{name}','%{description}');" /></td>
							</c:forEach>
							<td><input type="button" id="closeButton" value="Close"
								onclick="javascript:window.close()" class="button" /></td>
						</tr>
					</table>
				</div>
			</div>
			</div>
		</s:push>
	</form:form>

	<script>
autocompleteEntitiesBy20();
document.getElementById("budgetReappRow").style.display="none";
document.getElementById("billDetailsTableNet[0].detailTypes").value='${%{detailTypeIdandName}}';
var net=document.getElementById('billDetailsTableNet[0].glcodeDetail');
net.options[0] =new Option("----Choose----","-1");
var i=1;
<c:forEach value="netPayList" status="stat">
           
	<c:if test="%{chartOfAccountDetails.size()>0}">
	net.options[i] =new Option('${glcode}','${glcode}~#${name}~#true');
	
	</c:if> 
	<c:otherwise>
	net.options[i] =new Option('${glcode}','${glcode}~#${name}~#false');
	</s:else>    
i++;
</c:forEach>
	<c:if test="%{billDetailsTableNetFinal==null}">
	document.getElementById('billDetailsTableNet[0].accounthead').value='${defaultNetPayCode.name}';
	document.getElementById('billDetailsTableNet[0].glcodeIdDetail').value='${defaultNetPayCode.id}';
	<c:if test="%{defaultNetPayCode.chartOfAccountDetails.size()>0}">
	  
		net.value='${defaultNetPayCode.glcode}-${defaultNetPayCode.name}-true';	
		document.getElementById('billDetailsTableNet[0].isSubledger').value='true';
	</c:if>
	<c:otherwise>
		net.value='${defaultNetPayCode.glcode}-${defaultNetPayCode.name}-false';	
		document.getElementById('billDetailsTableNet[0].isSubledger').value='false';
	</s:else>
</c:if>
<c:otherwise>
document.getElementById('billDetailsTableNet[0].accounthead').value='${billDetailsTableNetFinal[0].accounthead}';
document.getElementById('billDetailsTableNet[0].glcodeIdDetail').value='${billDetailsTableNetFinal[0].glcodeIdDetail}';
net.value='${billDetailsTableNetFinal[0].glcodeDetail}-${billDetailsTableNetFinal[0].accounthead}-${billDetailsTableNetFinal[0].isSubledger}';	
document.getElementById('billDetailsTableNet[0].isSubledger').value='${billDetailsTableNetFinal[0].isSubledger}';
</s:else>
loadDropDownCodesFunction();
if(button!=undefined && button!="")
{

if(document.getElementById("Errors").innerHTML=='')  
{
bootbox.alert(succesMessage);

if(button=="Save_Close")
{
window.close();
}
else if(button=="Save_View")
{
//	var vhId='${voucherHeader.id}';
//	document.forms[0].action = "${pageContext.request.contextPath}/voucher/preApprovedVoucher!loadvoucherview.action?vhid="+vhId;
//	document.forms[0].submit();
}
else  if(button=="Save_New")
{  
document.forms[0].button.value='';
document.forms[0].action = "contingentBill!newform.action";
document.forms[0].submit();
}
}
}
else
{

}
if(document.getElementById('commonBean.subledgerType').value!=undefined)
{
//loadDropDownCodesForAccountDetailType(document.getElementById('commonBean.subledgerType'));
load_COA_Entities(document.getElementById('commonBean.subledgerType'));
}else
{
//loadDropDownCodesForAccountDetailType(null);
}

</script>

</body>