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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><!-- TODO: Manual migration required for custom Struts tag --></title>
<script type="text/javascript">
	function validate(event) {
		event.preventDefault();
		document.getElementById("msg").innerHTML = "";
		document.getElementById("Errors").innerHTML = "";

		if (document.getElementById("budgetInXls").value == "") {
			bootbox.alert("<!-- TODO: Manual migration required for custom Struts tag -->");
			return false;
		}
		document.budgetLoad.action = '/services/EGF/budget/budgetLoad-upload.action';
		jQuery(budgetLoad).append(jQuery('<input>', {
            type : 'hidden',
            name : '${_csrf.parameterName}',
            value : '${_csrf.token}'
        }));
		document.budgetLoad.submit();
		return true;
	}
	function urlLoad(fileStoreId) {
		var sUrl = "/services/egi/downloadfile?fileStoreId=" + fileStoreId
				+ "&moduleName=EGF";
		window.location = sUrl;
	}
	jQuery(document).ready(function() {
		var fileformats = [ 'xls' ];

		jQuery('#budgetInXls').on('change.bs.fileinput', function(e) {
			/*validation for file upload*/
			myfile = jQuery(this).val();
			var ext = myfile.split('.').pop();
			if (jQuery.inArray(ext, fileformats) > -1) {
				//do something    
			} else {
				bootbox.alert(ext + "<!-- TODO: Manual migration required for custom Struts tag -->");
				jQuery(this).val("");
				return;
			}
		});
	});
</script>
</head>
<body>
	<form:form action="budgetLoad" theme="css_xhtml" name="budgetLoad"
		id="budgetLoad" enctype="multipart/form-data" method="post">
		<div class="formmainbox">
			<div class="formheading"></div>
			<div class="subheadnew">
				<!-- TODO: Manual migration required for custom Struts tag -->
			</div>

			<div align="center">
				<font style='color: red;'>
					<div id="msg">
						${message}
					</div>
					<p class="error-block" id="lblError"></p>
				</font>
			</div>
			<span class="mandatory1">
				<div id="Errors">
					<!-- TODO: Manual migration required for custom Struts tag -->
					<!-- TODO: Manual migration required for custom Struts tag -->
				</div> <!-- TODO: Manual migration required for custom Struts tag -->
			</span>
										
			<center>
				<table border="0" width="100%" cellspacing="0" cellpadding="0">
					<tr width="50%">
						<th width="50%"></th>
						<th width="25%" class="bluebgheadtd"
							style="width: 4%; text-align: center" align="center"><!-- TODO: Manual migration required for custom Struts tag --> </th>
						<th width="25%" class="bluebgheadtd"
							style="width: 4%; text-align: center" align="center"><!-- TODO: Manual migration required for custom Struts tag --></th>
					</tr>
					<tr>
						<td width="50%">
							<table border="0" width="100%" cellspacing="0" cellpadding="0">
								<tr>
									<td class="greybox" width="20%"></td>
									<td class="greybox"></td>
									<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --> <span
										class="greybox"><span class="mandatory1">*</span></span></td>
									<td class="greybox"><s:file name="budgetInXls"
											id="budgetInXls" /></td>
									<span class="greybox" colspan="2">
										</td>
										<td class="greybox"></td>
								</tr>
								
							</table>
						</td>
						<td width="25%">
							<table border="1" width="100%" cellspacing="0" cellpadding="0">
								<c:forEach var="scheme" value="originalFiles" status="f">
									<tr>

										<td style="text-align: center" align="center"><a href="#"
											onclick="urlLoad('${%{fileStoreId}}');"
											id="originalFileId" /> <!-- TODO: Manual migration required for custom Struts tag --> </a></td>
									</tr>
								</c:forEach>
							</table>
						</td>
						<td width="25%">
							<table border="1" width="100%" cellspacing="0" cellpadding="0">
								<c:forEach var="scheme" value="outPutFiles" status="f">
									<tr>

										<td style="text-align: center" align="center"><a href="#"
											onclick="urlLoad('${%{fileStoreId}}');"
											id="outputFileId" /> <!-- TODO: Manual migration required for custom Struts tag --> </a></td>
									</tr>
									
								</c:forEach>
							</table>
						</td>
					</tr>
					<tr>

						<td class="greybox" colspan="2"><a
							href="/services/EGF/resources/app/formats/Budget_Data_Template.xls"><!-- TODO: Manual migration required for custom Struts tag --> </a></td>
					</tr>
				</table>
				<div  class="text-left error-msg" style="color: #C00000">&nbsp;* <!-- TODO: Manual migration required for custom Struts tag -->.</span></div>
				<div class="buttonbottom" id="buttondiv">
					<table>
						<tr>

							<td><s:submit type="submit" cssClass="buttonsubmit"
									key="lbl.upload.budget" name="upload" method="upload"
									onclick="return validate(event);" /></td>
							<td><input type="button" value="<!-- TODO: Manual migration required for custom Struts tag -->"
								onclick="javascript:window.close()" class="buttonsubmit" /></td>
						</tr>
					</table>
				</div>
			</center>
		</div>

	</form:form>
</body>
</html>
