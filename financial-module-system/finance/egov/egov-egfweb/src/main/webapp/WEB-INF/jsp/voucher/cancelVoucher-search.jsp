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
<%@ page language="java"%>
<%@ taglib uri="/WEB-INF/tags/c.tld" prefix="c"%>

<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>

</head>
<script>

function loadVoucherNames(selected)
{
	var s="";  
	if(selected==-1)
		{
		document.getElementById('name').options.length=0;
		document.getElementById('name').options[0]= new Option('--------Choose--------','0');
		}
<c:forEach value="voucherTypes" var="obj">
  s='${#obj}';
 if(selected==s)
 {
document.getElementById('name').options.length=0;
document.getElementById('name').options[0]= new Option('--------Choose--------','0');

 <c:forEach value="voucherNames[#obj]" status="stat" var="names">
 document.getElementById('name').options[${#stat.index+1}]= new Option('${#names}','${#names}');
 </c:forEach>   
 }
 </c:forEach>

 document.getElementById('name').value='${name}' ;
	
}

function loadNamesForSelectedType()
{
	if(document.getElementById('type').value!=-1)
		{
		loadVoucherNames(document.getElementById('type').value);
		}
	}
	
		
</script>
<body onload="loadNamesForSelectedType()">
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<div style="color: red">
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>

		<div style="color: green">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<form:form action="cancelVoucher" name="cancelVoucher" theme="simple">
		<input type="hidden" id="csrfTokenValue" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td class="greybox">&nbsp;</td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><form:input path="voucherNumber"
							id="voucherNumber" maxlength="25" value="%{voucherNumber}" /></td>
					<td class="greybox"></td>
					<td class="greybox"></td>
				</tr>
				<tr>
					<jsp:include page="../voucher/voucher-filter.jsp" />

				</tr>
				<tr>
					<td class="greybox">&nbsp;</td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span	class="mandatory1">*</span></td>
					<td class="greybox"><form:select path="type" id="type"	list="dropdownData.typeList" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							onchange="loadVoucherNames(this.value)" /></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span	class="mandatory1">*</span></td>
					<td class="greybox"><form:select path="name" id="name"	list="%{nameMap}"  headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
				</tr>
				<tr>
					<td class="greybox">&nbsp;</td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span	class="mandatory1">*</span></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="bluebox"><form:input id="fromDate" path="fromDate" value="%{tempFromDate}" onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"	data-inputmask="'mask': 'd/m/y'" autocomplete="off"/></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span class="mandatory1">*</span></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="bluebox"><form:input id="toDate" path="toDate" value="%{tempToDate}" onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"	data-inputmask="'mask': 'd/m/y'" autocomplete="off"/></td>
				</tr>
			</table>
			<div class="subheadsmallnew"></div>
			<div align="left" class="mandatory1"><!-- TODO: Manual migration required for custom Struts tag --> </div>
	</div>
	<div class="buttonbottom">
		<input type="button" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->" id="Search" name="button" onclick="return loadSearch();" />
		 <input type="reset" value="<!-- TODO: Manual migration required for custom Struts tag -->" class="buttonsubmit" onclick="return fieldReset();" />
		<input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->" onclick="javascript:window.parent.postMessage('close','*');" class="button" />
	</div>
	<c:if test="%{voucherSearchList.size!=0}">
		<div id="listid">
			<script>             
			</script>
			<table width="100%" border="0" align="center" cellpadding="0"
				cellspacing="0" class="tablebottom">
				<tr>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
				</tr>
				<c:set var="trclass" value="greybox" />	

				<c:forEach var="p" value="voucherSearchList" status="s">
					<tr>
						<!-- TODO: Manual migration required for custom Struts tag -->
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							${#s.index+1}
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							<a href="javascript:void(0);"
							onclick='viewVoucher(${%{id}});'><s:property
									value="%{voucherNumber}" /> </a>&nbsp;
							</div>
						</td>
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							<!-- TODO: Manual migration required for custom Struts tag -->
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							${%{fundId.name}}
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							${%{departmentName}}
						</td>
						<td style="text-align: center" class="<c:out value="${trclass}"/>">
							${%{type}}-${%{name}}
						</td>
						<td style="text-align: center" width="10%"
							class="<c:out value="${trclass}"/>"><s:property
								value="%{description}" /></td>

						<td style="text-align: center" class="<c:out value="${trclass}"/>"><div
								align="center">
								<input type="checkbox" name="selectVhs"
									value='${%{id}}'
									id='chbox_${#s.index+1}' /> &nbsp;
							</div></td>

						<c:choose>
							<c:when test="${trclass=='greybox'}">
								<c:set var="trclass" value="bluebox" />
							</c:when>
							<c:when test="${trclass=='bluebox'}">
								<c:set var="trclass" value="greybox" />
							</c:when>
						</c:choose>
					</tr>
				</c:forEach>
			</table>
			<div class="buttonbottom" align="center">
				<input type="button" Class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->" onclick="return validateVouchers();" />
			</div>

		</div>
	</c:if>
	<c:otherwise>
		<c:if test="%{voucherList.size==0 && voucherList!=null}"><!-- TODO: Manual migration required for custom Struts tag --></c:if>
	</s:else>

	<!-- TODO: Manual migration required for custom Struts tag -->
	</form:form>
	<script>

	function validateVouchers()
	{
		var csrfToken = document.getElementById('csrfTokenValue').value;
		var objLen=${%{voucherSearchList.size()}};
		var queryParams="";
		var index;
		 <c:forEach var="p" value="voucherSearchList" status="s">
		  index= ${#s.index+1};
		 var checkBox = document.getElementById('chbox_'+index);
		 if(checkBox.checked){
			var voucherId=checkBox.value;
			if(index!=1)
				queryParams+="&selectedVhs="+voucherId;
			else
			 	queryParams="selectedVhs="+voucherId;
		}                                      
		</c:forEach> 
		if(queryParams==""){
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}else{            
			document.cancelVoucher.action = "${pageContext.request.contextPath}/voucher/cancelVoucher-update.action?"+queryParams+'&_csrf='+csrfToken;
			document.cancelVoucher.submit();
		}          
	 return true;
    }                     
    
function viewVoucher(vid){
		var url = '../voucher/preApprovedVoucher-loadvoucherview.action?vhid='+vid;
		window.open(url,'',' width=900, height=700');
}

function doAfterSubmit(){
}

var callback = {
		success: function(o){
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			document.getElementById('listid').style.display ='none';
			},
		failure: function(o) {
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			}
}
function loadSearch(){
	document.cancelVoucher.action = "${pageContext.request.contextPath}/voucher/cancelVoucher-search.action";
	document.cancelVoucher.submit();
	}

function fieldReset()
{
	document.cancelVoucher.action = "${pageContext.request.contextPath}/voucher/cancelVoucher-beforeSearch.action";
	document.cancelVoucher.submit();
	/* document.getElementById('voucherNumber').value="";
	document.getElementById('fundId').value=-1;
	document.getElementById('vouchermis.departmentid').value=-1;
	document.getElementById('type').value=-1;
	document.getElementById('name').value=-1;
	document.getElementById('fromDate').value="";
	document.getElementById('toDate').value=""; */
}
		</script>
</body>
</html>