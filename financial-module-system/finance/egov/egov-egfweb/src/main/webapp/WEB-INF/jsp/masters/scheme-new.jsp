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
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<SCRIPT type="text/javascript">
    function checkuniquenesscode(){
    	document.getElementById('codeuniquecode').style.display ='none';
		var code = document.getElementById('code').value;
		populatecodeuniquecode({code:code});		
    }
    
    function checkuniquenessname(){
    	document.getElementById('uniquename').style.display ='none';
		var name = document.getElementById('name').value;
		populateuniquename({name:name});		
    }
    
    function validateFormAndSubmit(){
        if (!validateForm_scheme()) {
        	undoLoadingMask();
    		return false;
            }
        if(!validateDate(document.getElementById('validfromId').value)){
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
        if (compareDate(document.getElementById('validfromId').value,document.getElementById('validtoId').value) == -1){
            bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
            undoLoadingMask();
            document.getElementById('validtoId').value = "";
            return false;
 	    } 
 	    var showMode = document.getElementById('mode').value;
 	   if(showMode=='edit'){
        	document.schemeForm.action='${pageContext.request.contextPath}/masters/scheme-edit.action';
        	jQuery(schemeForm).append(
                    jQuery('<input>', {
                        type: 'hidden',
                        name: '${_csrf.parameterName}',
                        value: '${_csrf.token}'
                    })
                );
    		document.schemeForm.submit();
 	   }else{
 		  	document.schemeForm.action='${pageContext.request.contextPath}/masters/scheme-create.action';
 		  	jQuery(schemeForm).append(
 	                jQuery('<input>', {
 	                    type: 'hidden',
 	                    name: '${_csrf.parameterName}',
 	                    value: '${_csrf.token}'
 	                })
 	            );
 	    	document.schemeForm.submit();
 	 	   }
    	return true;
    }     

    function resetForm(){
    	document.getElementById('code').value="";
    	document.getElementById('name').value="";
    	document.getElementById('fundId').value="";
    	document.getElementById('isactive').value="";
    	document.getElementById('validfromId').value="";
    	document.getElementById('validtoId').value="";
    	document.getElementById('description').value="";
    	
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
	<form:form name="schemeForm" action="scheme" theme="css_xhtml"
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
			<!-- TODO: Manual migration required for custom Struts tag -->
			<!-- TODO: Manual migration required for custom Struts tag -->
			<div style="color: red">
				<!-- TODO: Manual migration required for custom Struts tag -->
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<div style="color: green">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<div style="color: red">
			<div  class="errorstyle" style="display: none" id="codeuniquecode" >
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			<div class="errorstyle" style="display: none" id="uniquename" >
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td style="width: 10%"></td>
					<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1"> *</span></td>
					<td class="greybox" width="30%"><form:input id="code"
							name="code" value="%{scheme.code}"
							onblur="checkuniquenesscode();" /></td>
					<egov:uniquecheck id="codeuniquecode" name="codeuniquecode"
						fieldtoreset="code" fields="['Value']"
						url='masters/scheme-codeUniqueCheck.action' />

					<td class="greybox" width="10%"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1"> *</span></td>
					<td class="greybox" width="30%"><form:input id="name"
							name="name" value="%{scheme.name}"
							onblur="checkuniquenessname();" /></td>
					<egov:uniquecheck id="uniquename" name="uniquename"
						fieldtoreset="name" fields="['Value']"
						url='masters/scheme-nameUniqueCheck.action' />
				</tr>
				<tr>
					<td style="width: 10%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1"> *</span></td>
					<td class="bluebox"><form:select path="fund" id="fundId"
							list="dropdownData.fundDropDownList" listKey="id"
							listValue="name" headerKey="" headerValue="%{getText('lbl.choose.options')}"
							value="scheme.fund.id" /></td>
					<td class="bluebox">Active</td>
					<td class="bluebox"><form:checkbox id="isactive" path="isactive"
							value="%{scheme.isactive}" /></td>
				</tr>
				<tr>
					<td style="width: 10%"></td>
					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1"> *</span></td>
					<td class="greybox"><s:date name="scheme.validfrom" var="validfromId" 
							format="dd/MM/yyyy" /> <form:input id="validfromId"
							name="validfrom" value="%{validfromId}"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>

					<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --><span
						class="mandatory1"> *</span></td>
					<td class="greybox"><s:date name="scheme.validto" var="validtoId"
							format="dd/MM/yyyy" /> <form:input id="validtoId"
							name="validto" value="%{validtoId}"
							onkeyup="DateFormat(this,this.value,event,false,'3')"
							placeholder="DD/MM/YYYY" cssClass="form-control datepicker"
							data-inputmask="'mask': 'd/m/y'" /></td>
				</tr>
				<tr>
					<td style="width: 10%"></td>
					<td class="bluebox" width="10%"><s:text
							name="scheme.description" /></td>
					<td class="bluebox" colspan="3"><form:textarea id="description"
							name="description" value="%{scheme.description}"
							style="width:470px" /></td>
				</tr>
			</table>
			<br />
		</div>
		<div class="buttonbottom">
			<table align="center">
				<tr class="buttonbottom" id="buttondiv" style="align: middle">
					<c:if test="%{mode=='new'}">
						<td><input type="submit" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							id="saveButton" name="button"
							onclick="return validateFormAndSubmit();" />&nbsp;</td>
						<td><input type="reset" class="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							 name="button" onclick="return resetForm();" />&nbsp;</td>
						<td><input type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="javascript:window.parent.postMessage('close','*');window.close()" class="button" />&nbsp;</td>
					</c:if>
					<!-- TODO: Manual migration required for custom Struts tag -->
						<td><input type="submit" class="buttonsubmit" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							id="Modify" name="button"
							onclick="return validateFormAndSubmit();" />&nbsp;</td>
						<td><input type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="javascript:window.parent.postMessage('close','*');window.close();" class="button" />&nbsp;</td>
					</s:elseif>
					<c:otherwise>
						<td><input type="button" id="Close" value="<!-- TODO: Manual migration required for custom Struts tag -->"
							onclick="javascript:window.parent.postMessage('close','*');window.close();" class="button" />&nbsp;</td>
					</s:else>

				</tr>
			</table>
		</div>
	</form:form>
</body>
</html>
