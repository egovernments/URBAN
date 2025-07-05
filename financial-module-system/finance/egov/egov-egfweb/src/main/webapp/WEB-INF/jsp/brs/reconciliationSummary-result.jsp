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
<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>

<html>
<head>

<title>Insert title here</title>
<style type="text/css">
@media print {
	input#Close {
		display: none;
	}
}

@media print {
	input#button1 {
		display: none;
	}
}
</style>
<link rel="stylesheet" type="text/css"
	href="/services/EGF/resources/css/jquery-ui/css/smoothness/jquery-ui-1.8.4.custom.css" />
<SCRIPT type="text/javascript"
	src="../resources/javascript/calendar.js?rnd=${app_release_no}"
	type="text/javascript"></SCRIPT>
<script type="text/javascript">
var opt = {
        autoOpen: false,
        modal: true,
        width: 650,
        height:523,
        title: 'Details',
        buttons: {
            Close: function () {
            	jQuery(this).dialog('close');
            }
        }
};
jQuery(function () {
		var bankStmtDate=jQuery("#bankStmtDate").val();
		var bankAccId=jQuery("#bankAccId").val();
        var url= "/services/EGF/brs/bankReconciliationDetails.action";
	jQuery("#issuedChequAndDDId").click(function () {
		opt.title="<!-- TODO: Manual migration required for custom Struts tag -->";
		jQuery.ajax({
            type: "POST",
            url:url,
            data: { bankStmtDate: bankStmtDate, bankAccId : bankAccId,actionName:"CHEQUE_DD_ISSUED_NP_IN_BANK"},
            success: function (r) {
                jQuery("#dialog").html(r);
                jQuery("#dialog").dialog(opt).dialog("open");
                jQuery('.ui-dialog-titlebar-close').hide();
            }
        });
    });

	jQuery("#issuedOtherInstrumentsId").click(function () {
		opt.title="<!-- TODO: Manual migration required for custom Struts tag -->";
		jQuery.ajax({
            type: "POST",
            url: url,
            data: { bankStmtDate: bankStmtDate, bankAccId : bankAccId,actionName:"OTHER_INSTRUMENT_ISSUED_NP_IN_BANK"},
            success: function (r) {
                jQuery("#dialog").html(r);
                jQuery("#dialog").dialog(opt).dialog("open");
                jQuery('.ui-dialog-titlebar-close').hide();
            }
        });
    });

	jQuery("#unReconciledCrBrsEntryId").click(function () {
		opt.title="<!-- TODO: Manual migration required for custom Struts tag -->";
		jQuery.ajax({
            type: "POST",
            url: url,
            data: { bankStmtDate: bankStmtDate, bankAccId : bankAccId,actionName:"RECEIPT_BRS_ENTRIES"},
            success: function (r) {
                jQuery("#dialog").html(r);
                jQuery("#dialog").dialog(opt).dialog("open");
                jQuery('.ui-dialog-titlebar-close').hide();
            }
        });
    });

	jQuery("#unReconciledDrBrsEntryId").click(function () {
		opt.title="<!-- TODO: Manual migration required for custom Struts tag -->";
		jQuery.ajax({
            type: "POST",
            url:url,
            data: { bankStmtDate: bankStmtDate, bankAccId : bankAccId,actionName:"PAYMENT_BRS_ENTRIES"},
            success: function (r) {
                jQuery("#dialog").html(r);
                jQuery("#dialog").dialog(opt).dialog("open");
                jQuery('.ui-dialog-titlebar-close').hide();
            }
        });
    });

    jQuery("#unReconciledDrId").click(function () {
		opt.title="<!-- TODO: Manual migration required for custom Struts tag -->";
		jQuery.ajax({
            type: "POST",
            url: url,
            data: { bankStmtDate: bankStmtDate, bankAccId : bankAccId,actionName:"CHEQUE_DEPOSITED_NOT_CLEARED"},
            success: function (r) {
                jQuery("#dialog").html(r);
                jQuery("#dialog").dialog(opt).dialog("open");
                jQuery('.ui-dialog-titlebar-close').hide();
            }
        });
    });
});
</script>

</head>
<body>
	<div class="formmainbox">
		<div class="subheadnew">
			<!-- TODO: Manual migration required for custom Struts tag -->
		</div>
		<form:form name="brsDetails" action="brsDetails" theme="simple">

			<%-- <c:forEach value="bankReconList" status="stat" var="p">  --%>
			<table width="99%" border="0" cellspacing="0" cellpadding="0">

				<tr>

				</tr>
				<tr>
					<td colspan="4"></td>
				</tr>
				<tr>
					<td style="width: 5%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> :<span class="bluebox"><span
							class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:input path="bank" id="bank"
							readonly="true" /><!-- TODO: Manual migration required for custom Struts tag --></s:hidden>
							</td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> : <span class="bluebox"><span
							class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:input path="branch" id="branch"
							readonly="true" /></td>


					</td>
				</tr>


				<tr>
					<td style="width: 5%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> :<span class="bluebox"><span
							class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:input path="accountNum"
							id="accountNum" readonly="true" /></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> :<span
						class="bluebox"><span class="mandatory1">*</span></span></td>
					<td class="bluebox"><form:input path="balanceAsPerStatement"
							id="balanceAsPerStatement" readonly="true" /></td>

				</tr>

				<tr>
					<td style="width: 5%"></td>
					<td class="bluebox"><!-- TODO: Manual migration required for custom Struts tag --> :<span class="bluebox"><span
							class="mandatory1">*</span></span></td>
					<!-- TODO: Manual migration required for custom Struts tag -->
					<td class="greybox"><form:input path="bankStmtDate"
							id="bankStmtDate" readonly="true" cssStyle="width:100px"
							value='%{formtDate}'
							onkeyup="DateFormat(this,this.value,event,false,'3')" /><a
						href="javascript:show_calendar('bankReconciliation.bankStmtDate');"
						style="text-decoration: none"></a><br /></td>
				</tr>
			</table>
			<br />
			<br />
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				class="tablebottom">

				<tr>
					<td colspan=3 width="70%" class="blueborderfortd"
						style="font-weight: bold;"><div align="center"><!-- TODO: Manual migration required for custom Struts tag --> </div></td>
					<td width="15%" class="blueborderfortd" style="font-weight: bold;"><div
							align="center"><!-- TODO: Manual migration required for custom Struts tag -->  (Rs) </div></td>
					<td width="15%" class="blueborderfortd" style="font-weight: bold;"><div
							align="center"><!-- TODO: Manual migration required for custom Struts tag --> (Rs)</div></td>
				</tr>

				<tr>
					<td colspan=3 class="blueborderfortd" valign="center"
						style="font-weight: bold;">&nbsp;&nbsp;&nbsp;<!-- TODO: Manual migration required for custom Struts tag --> </td>
					<td class="blueborderfortd" align="right"></td>
					<td class="blueborderfortd" align="right"><div align="right">
							${accountBalance}
						</div></td>
				</tr>
				<tr>
					<td colspan=3 class=blueborderfortd valign="center">&nbsp;&nbsp;&nbsp;<!-- TODO: Manual migration required for custom Struts tag --> </td>
					<td class="blueborderfortd"><div align="right"
							name="addAmountDebit" id="addAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="addAmountCredit" id="addAmountCredit"  readOnly>
							<c:if test='unReconciledCr != 0'>
								<a href="#"  id="issuedChequAndDDId">${unReconciledCr}</a>
							</c:if>
							<c:otherwise>${unReconciledCr}</s:else>
						</div></td>
				</tr>

				<tr>
					<td colspan=3 class="blueborderfortd" valign="center">&nbsp;&nbsp;&nbsp;<!-- TODO: Manual migration required for custom Struts tag --> </td>
					<td class="blueborderfortd"><div align="right"
							name="addAmountDebit" id="addAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="addAmountCredit" id="addAmountCredit" readOnly>
							<c:if test='unReconciledCrOthers != 0'>
								<a href="#"  id="issuedOtherInstrumentsId">${unReconciledCrOthers}</a>
							</c:if>
							<c:otherwise>${unReconciledCrOthers}</s:else>
						</div></td>
				</tr>
				<tr>
					<td colspan=3 class="blueborderfortd" valign="center">&nbsp;&nbsp;&nbsp;<!-- TODO: Manual migration required for custom Struts tag --> <br>&nbsp;&nbsp;&nbsp;
						<!-- TODO: Manual migration required for custom Struts tag -->
					</td>
					<td class="blueborderfortd"><div align="right"
							name="addOthersAmountDebit" id="addOthersAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="addOthersAmountCredit" id="addOthersAmountCredit" readOnly>
							<c:if test='unReconciledCrBrsEntry != 0'>
								<a href="#"  id="unReconciledCrBrsEntryId">${unReconciledCrBrsEntry}</a>
							</c:if>
							<c:otherwise>${unReconciledCrBrsEntry}</s:else>
							
						</div></td>
				</tr>

				<tr>
					<td colspan=3 class="blueborderfortd" align="middle"
						valign="center" style="font-weight: bold;"><div
							align="center">
							<i>Sub-total</i>
						</div></td>
					<td class="blueborderfortd"><div align="right"
							name="subTotalAmountDebit" id="subTotalAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="subTotalAmountCredit" id="subTotalAmountCredit" readOnly>
							${subTotal}
						</div></td>
				</tr>
				<tr>
					<td colspan=3 class="blueborderfortd" valign="center">&nbsp;&nbsp;&nbsp;
						<!-- TODO: Manual migration required for custom Struts tag --> </td>
					<td class="blueborderfortd"><div align="right"
							name="lessAmountDebit" id="lessAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="lessAmountCredit" id="lessAmountCredit" readOnly>
							<c:if test='unReconciledDr != 0'>
								<a href="#" id="unReconciledDrId">${unReconciledDr}</a>
							</c:if>
							<c:otherwise>${unReconciledDr}</s:else>
						</div></td>
				</tr>

				<tr>
					<td colspan=3 class="blueborderfortd" valign="center">&nbsp;&nbsp;&nbsp;
						<!-- TODO: Manual migration required for custom Struts tag --> </td>
					<td class="blueborderfortd"><div align="right"
							name="lessAmountDebit" id="lessAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="lessAmountCredit" id="lessAmountCredit" readOnly>
							<c:if test='unReconciledDrOthers != 0'>
								<a href="#" id="unReconciledDrOthersId">${unReconciledDrOthers}</a>
							</c:if>
							<c:otherwise>${unReconciledDrOthers}</s:else>
						</div></td>
				</tr>
				<tr>
					<td colspan=3 class="blueborderfortd" valign="center">
						&nbsp;&nbsp;&nbsp; <!-- TODO: Manual migration required for custom Struts tag --><br> &nbsp;&nbsp;&nbsp;&nbsp;<!-- TODO: Manual migration required for custom Struts tag -->
					</td>
					<td class="blueborderfortd"><div align="right"
							name="lessOthersAmountDebit" id="lessOthersAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="lessOthersAmountCredit" id="lessOthersAmountCredit"
							readOnly>
							<c:if test='unReconciledDrBrsEntry != 0'>
								<a href="#"  id="unReconciledDrBrsEntryId">${unReconciledDrBrsEntry}</a>
							</c:if>
							<c:otherwise>${unReconciledDrBrsEntry}</s:else>
						</div></td>
				</tr>



				<tr>
					<td colspan=3 class="blueborderfortd" style="font-weight: bold;"><div
							align="center">
							<i>Net-total</i>
						</div></td>
					<td class="blueborderfortd"><div align="right"
							name="totalAmountDebit" id="totalAmountDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="totalAmountCredit" id="totalAmountCredit" readOnly>
							<div align="right">
								${netTotal}
							</div></td>
				</tr>
				<tr>
					<td colspan=3 class="blueborderfortd" valign="center"
						style="font-weight: bold;">&nbsp;&nbsp;&nbsp; <!-- TODO: Manual migration required for custom Struts tag --> </td>
					<td class="blueborderfortd"><div align="right"
							name="bankBalanceDebit" id="bankBalanceDebit" readOnly>&nbsp;</div></td>
					<td class="blueborderfortd"><div align="right"
							name="bankBalanceCredit" id="bankBalanceCredit" readOnly>
							${balanceAsPerStatement}
						</div></td>
				</tr>

			</table>
			<%-- </c:forEach>  --%>

			<br>
			<br>
			<table align=center>
				<tr id="hideRow1" class="row1">

					<td><input type="button" id="Close" value='<!-- TODO: Manual migration required for custom Struts tag -->'
						onclick="javascript:window.close()" class="button" /></td>
					<td><input name="button" type="button" class="buttonsubmit"
						id="button1" value='<!-- TODO: Manual migration required for custom Struts tag -->' onclick="window.print()" />&nbsp;</td>
				</tr>
			</table>
			<div id="dialog" style="display: none">
		</form:form>
	</div>
</body>
</html>