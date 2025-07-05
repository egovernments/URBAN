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
<html>
<head>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/javascript/voucherHelper.js?rnd=${app_release_no}"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
	<script type="text/javascript">
		function onloadtask() 
		{
			<c:forEach value="getActionErrors()" >
			  document.getElementById("search").style.display="none";
			  document.getElementById("Reset").style.display="none";
			</c:forEach>
			<c:if test="%{isFieldMandatory('department')}"> 
				// document.getElementById("departmentid").disabled=true;
			</c:if>
		}
	
	
		function validate()
		{
			var expType=document.getElementById('expType').value;
			if(expType == "-1")
			{
				bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
				return false;
			}
			
			 document.billVoucher.action='${pageContext.request.contextPath}/voucher/billVoucher-lists.action';
			 jQuery(billVoucher).append(
                     jQuery('<input>', {
                         type: 'hidden',
                         name: '${_csrf.parameterName}',
                         value: '${_csrf.token}'
                     })
                 );
			 document.billVoucher.submit();
		   
			document.getElementById('expType').disabled=false;
			return true;
		}
	
		function resetForm()
		{
			document.getElementById("expType").value=-1;
			document.getElementById("departmentid").value=-1;
			document.getElementById("voucherDateFrom").value="";
			document.getElementById("voucherDateTo").value="";
			document.getElementById("billNumber").value="";
		}
	</script>
</head>

<body onload="onloadtask();">
	<form:form action="billVoucher" theme="simple" name="billVoucher">
		<jsp:include page="../budget/budgetHeader.jsp">
			<jsp:param name="heading" value="Journal voucher search" />
		</jsp:include>
		<div class="formmainbox">
			<div class="formheading">
				<div class="subheadnew"><!-- TODO: Manual migration required for custom Struts tag --> </div>
			</div>
			<div id="listid" style="display: block">
				<br />
				<div align="left">
					<font style='color: red; font-weight: bold'>
						<p class="error-block" id="lblError"></p>
					</font> <span class="mandatory1"> <font style='color: red; font-weight: bold'> <!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag -->
							<!-- TODO: Manual migration required for custom Struts tag -->
					</font>
					</span>
					<table border="0" width="100%">
						<tr>
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> <span class="bluebox"><span class="mandatory1">*</span></span></td>
							<td class="bluebox"><form:select path="expType" id="expType" list="dropdownData.expTypeList" headerKey="-1" headerValue="%{getText('lbl.choose.options')}" /></td>
							<td class="bluebox" id="deptLabel"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td class="bluebox"><form:select path="vouchermis.departmentcode" id="departmentid" list="dropdownData.departmentList" listKey="code" listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}" value="voucherHeader.vouchermis.departmentcode" /></td>

						</tr>

						<tr>
							<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td class="greybox"><form:input id="voucherDateFrom" path="voucherTypeBean.voucherDateFrom" data-date-end-date="0d" onkeyup="DateFormat(this,this.value,event,false,'3')" placeholder="DD/MM/YYYY" class="form-control datepicker" data-inputmask="'mask': 'd/m/y'"  autocomplete="off"/></td>
							<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> </td>
							<td class="greybox"><form:input id="voucherDateTo" path="voucherTypeBean.voucherDateTo" data-date-end-date="0d" onkeyup="DateFormat(this,this.value,event,false,'3')" placeholder="DD/MM/YYYY" class="form-control datepicker" data-inputmask="'mask': 'd/m/y'"  autocomplete="off"/>
						</tr>
						<tr>
							<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td class="bluebox"><form:input path="billNumber" id="billNumber" maxlength="50" value="%{billNumber}" /></td>
							<td class="bluebox"></td>
							<td class="bluebox"></td>
						</tr>

					</table>
				</div>
				<br> <br>
			</div>
		</div>
		<div align="center">
			<div class="buttonbottom">
				<table align="center">
					<tr>

						<td><!-- TODO: Manual migration required for custom Struts tag -->&nbsp;</td>
						<td><input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->'  class="button" onclick="return resetForm();" />&nbsp;</td>
						<td><input type="button" value='<!-- TODO: Manual migration required for custom Struts tag -->' onclick="window.parent.postMessage('close','*');window.close();" class="button" />&nbsp;</td>
					</tr>
				</table>
			</div>
		</div>
		<c:if
			test="%{preApprovedVoucherList.size!=0 && preApprovedVoucherList!=null}">
			<div id="listid" style="display: block">
				<table width="100%" align="center" class="tablebottom">
					<tr>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
						<th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
					</tr>
					<c:forEach var="p" value="preApprovedVoucherList" status="s">
						<tr class="setborder">
							<td class="bluebox setborder">${#s.index+1}
							</td>
							<td class="bluebox setborder" style="text-align: center"><a href="preApprovedVoucher-voucher.action?billid=<!-- TODO: Manual migration required for custom Struts tag -->">${%{billnumber}} </a></td>
							<td class="bluebox setborder" style="text-align: center"><!-- TODO: Manual migration required for custom Struts tag --></td>
							<td class="bluebox setborder" style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> </s:text></td>
							<td class="bluebox setborder" style="text-align: right"><!-- TODO: Manual migration required for custom Struts tag --> <!-- TODO: Manual migration required for custom Struts tag --> </s:text></td>
							<td class="bluebox setborder" style="text-align: center">${%{expendituretype}}</td>
							<td class="bluebox setborder" style="text-align: center">${%{egBillregistermis.departmentName}}</td>
						</tr>
					</c:forEach>
				</table>
			</div>
		</c:if>

	</form:form>
</body>

</html>