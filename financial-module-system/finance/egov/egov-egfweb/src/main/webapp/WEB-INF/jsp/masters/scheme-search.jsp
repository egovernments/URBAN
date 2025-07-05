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
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>

<%@ page language="java"%>
<html>
<head>
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<SCRIPT type="text/javascript">
   
    function validateAndSubmit()
	{
		var fromDate=document.getElementById('validfromId').value;
		var toDate=document.getElementById('validtoId').value;

		var fundId=document.getElementById('fundId').value;
		

		if(fundId == "-1"){
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
			}
		
		 
		if(!validateDate(fromDate)){
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		var fdateParts=	fromDate.split("/");
		var tdateParts=	toDate.split("/");
		var fdate=new Date(fdateParts[1]+"/"+fdateParts[0]+"/"+fdateParts[2]);
		var tdate=new Date(tdateParts[1]+"/"+tdateParts[0]+"/"+tdateParts[2]);
		if (fdate > tdate) {
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->")
			return false;
			} 

		
    	document.schemeForm.action='${pageContext.request.contextPath}/masters/scheme-search.action';
    	jQuery(schemeForm).append(
                jQuery('<input>', {
                    type: 'hidden',
                    name: '${_csrf.parameterName}',
                    value: '${_csrf.token}'
                })
            );
    	document.schemeForm.submit();
    	//return true;
    	
	document.getElementById('type').disabled=false;
	return true;
	}
	function validateDate(date)
	{
		var todayDate = new Date();
		 var todayMonth = todayDate.getMonth() + 1;
		 var todayDay = todayDate.getDate();
		 var todayYear = todayDate.getFullYear();
		 var todayDateText = todayDay + "/" + todayMonth + "/" +  todayYear;
		if (Date.parse(date) > Date.parse(todayDateText)) {
			return false;
			}
		return true; 
		}

   
    </SCRIPT>
</head>
<body>
	<form:form name="schemeForm" action="scheme" theme="simple"
		validate="true">
		<div class="formmainbox">
			<div class="subheadnew">
				<c:if test="%{mode=='edit'}">
					<!-- TODO: Manual migration required for custom Struts tag -->
				</c:if>
				<c:otherwise>
					<!-- TODO: Manual migration required for custom Struts tag -->
				</s:else>
			</div>
			<!-- TODO: Manual migration required for custom Struts tag -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td style="width: 10%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1"> *</span></td>
					<td class="bluebox"><form:select path="fund" id="fundId"
							list="dropdownData.fundDropDownList" listKey="id"
							listValue="name" headerKey="-1" headerValue="%{getText('lbl.choose.options')}"
							value="scheme.fund.id" /></td>
				</tr>
				<tr>
					<td style="width: 10%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><s:date name="validfrom" var="validfromId"
							format="dd/MM/yyyy" />
						<form:input id="validfromId" path="validfrom"
							value="%{validfromId}"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>

					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
					<td class="greybox"><s:date name="validto" var="validtoId"
							format="dd/MM/yyyy" /> <form:input id="validtoId"
							name="validto" value="%{validtoId}"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>
				</tr>

			</table>
			<br />



		</div>
		<div class="buttonbottom">
			<table align="center">
				<tr>
					<td><input type="submit" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->"
						id="search" name="button" onclick="return validateAndSubmit();" />&nbsp;</td>
					<td><input type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
						onclick="javascript:window.parent.postMessage('close','*');window.close();" class="button" /></td>
			</table>
		</div>

		<c:if test="%{schemeList.size!=0}">
			<table width="100%" border="1" align="center" cellpadding="0"
				cellspacing="0" class="setborder" style="border-collapse: inherit;">
				<tr>
					<th class="bluebgheadtd" style="width: 2%; text-align: center"
						align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd" style="width: 4%; text-align: center"
						align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd" style="width: 8%; text-align: center"
						align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd" style="width: 2%; text-align: center"
						align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd" style="width: 4%; text-align: center"
						align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
					<th class="bluebgheadtd" style="width: 4%; text-align: center"
						align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
				</tr>
				<c:set var="trclass" value="greybox" />
				<c:forEach var="scheme" value="schemeList" status="f">
					<tr>

						<td class="<c:out value="${trclass}"/>" style="text-align: center"
							align="center">${#f.index+1}</td>
						<td class="<c:out value="${trclass}"/>" style="text-align: center"
							align="center"><a href="#"
							onclick="urlLoad('${%{id}}','${%{mode}}');"
							id="sourceLink" /> <!-- TODO: Manual migration required for custom Struts tag --> </a></td>
						<td class="<c:out value="${trclass}"/>" style="text-align: center"
							align="center">${name}</td>
						<td class="<c:out value="${trclass}"/>" style="text-align: center"
							align="center"><s:date name="%{validfrom}"
								format="dd/MM/yyyy" /></td>
						<td class="<c:out value="${trclass}"/>" style="text-align: center"
							align="center"><!-- TODO: Manual migration required for custom Struts tag --></td>
						<td class="<c:out value="${trclass}"/>" style="text-align: center"
							align="center"><c:if test="%{isactive==true}"><!-- TODO: Manual migration required for custom Struts tag --></c:if>
						<c:otherwise><!-- TODO: Manual migration required for custom Struts tag --></s:else></td>
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
		</c:if>

		<c:if test="%{schemeList.size==0}">
			<div id="msgdiv" style="display: block">
				<table align="center" class="tablebottom" width="80%">
					<tr>
						<th class="bluebgheadtd" colspan="7"><!-- TODO: Manual migration required for custom Struts tag -->
						</td>
					</tr>
				</table>
			</div>
		</c:if>
	</form:form>


	<script type="text/javascript">
	function urlLoad(id,showMode) {
		if(showMode=='edit')
			 url = "../masters/scheme-beforeEdit.action?schemeId="+id+"&mode=edit";
		else          
			 url = "../masters/scheme-beforeView.action?schemeId="+id+"&mode=view"; 
		window.open(url,'schemeView','resizable=yes,scrollbars=yes,left=300,top=40, width=900, height=700');
	}
	</script>
</body>
</html>