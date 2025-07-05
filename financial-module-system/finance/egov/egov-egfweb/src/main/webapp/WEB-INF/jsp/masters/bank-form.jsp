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

<div style="color: red">
	<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
</div>
<div style="color: green">
	<!-- TODO: Manual migration required for custom Struts tag -->
</div>

<form:form name="bankForm" action="bank" theme="simple">
	<!-- TODO: Manual migration required for custom Struts tag -->
	<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
		<!-- TODO: Manual migration required for custom Struts tag -->
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td class="bluebox">&nbsp;</td>
				<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
					class="mandatory1"> *</span></td>
				<c:if test="%{mode.equals('VIEW')}">
					<td class="bluebox"><form:input id="name" path="name"
							readonly="true" /></td>
				</c:if>
				<c:otherwise>
					<td class="bluebox"><form:input id="name" path="name"
							onblur="checkUniqueBankName(this);" /> <span
						style="display: none; color: red" id="nameuniquename"> <s:text
								name="bank.name.already.exists" />
					</span></td>

				</s:else>

			</tr>
			<tr>
				<td class="bluebox">&nbsp;</td>
				<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --><span
					class="mandatory1"> *</span></td>
				<c:if test="%{mode.equals('VIEW')}">
					<td class="bluebox"><form:input id="code" path="code"
							readonly="true" /></td>
				</c:if>
				<c:otherwise>
					<td class="bluebox"><form:input id="code" path="code"
							onblur="checkUniqueBankCode(this);" /> <span
						style="display: none; color: red" id="codeuniquecode"> <s:text
								name="bank.code.already.exists" />
					</span></td>

				</s:else>
			</tr>
			<tr>
				<td class="bluebox"></td>
				<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<c:if test="%{mode.equals('VIEW')}">
					<td class="bluebox" colspan="2"><form:checkbox id="isActive"
							name="isActive" value="%{isActive}" disabled="disabled"
							checked="checked" /></td>
				</c:if>
				<c:otherwise>
					<td class="bluebox" colspan="2"><form:checkbox id="isActive"
							name="isActive" value="%{isActive}" /></td>

				</s:else>
			</tr>

			<tr>
				<td class="greybox"></td>
				<td class="greybox"><!-- TODO: Manual migration required for custom Struts tag --></td>
				<c:if test="%{mode.equals('VIEW')}">
					<td class="greybox" colspan="2"><form:textarea id="narration"
							name="narration" cols="80" rows="5" readonly="true" /></td>
				</c:if>
				<c:otherwise>
					<td class="greybox" colspan="2"><form:textarea id="narration"
							name="narration" cols="80" rows="5" /></td>

				</s:else>
			</tr>
		</table>
		<br />
		<c:if test="%{id != null}">
			<div class="center">
				<table id="listsg11"></table>
				<div id="pagersg11"></div>
			</div>
		</c:if>
		<br />
	</s:push>


</form:form>
<script src="../resources/javascript/bank.js" type="text/javascript"></script>