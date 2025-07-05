<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>
<%@ taglib prefix="s" uri="/WEB-INF/tags/struts-tags.tld"%>
<%@ taglib prefix="egov" tagdir="/WEB-INF/tags"%>
<style>
.ui-dialog .ui-dialog-buttonpane { 
    text-align: center;
}
.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset { 
    float: none;
}
.ui-dialog .ui-dialog-buttonpane button {
    width: auto;
    font-family: semibold;
    text-align: center;
    border-style: none;
    font-size: 12px;
    font-weight: bold;
    padding: 6px 12px;
    background: #fe7a51 none repeat scroll 0% 0%;
    color: #ffffff;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #fe7a51;
    margin-right: 5px;
</style>
<html>
<table id="example" class="display" style="width:100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tablebottom">
        <thead>
        <c:if test='actionName.equals("CHEQUE_DD_ISSUED_NP_IN_BANK") or actionName.equals("CHEQUE_DEPOSITED_NOT_CLEARED")'>
            <tr>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
            </tr>
        </c:if>
        <c:if test='actionName.equals("OTHER_INSTRUMENT_ISSUED_NP_IN_BANK")'>
            <tr>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --> </th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
            </tr>
        </c:if>
        <c:if test='actionName.equals("RECEIPT_BRS_ENTRIES") or actionName.equals("PAYMENT_BRS_ENTRIES")'>
            <tr>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
                <th class="bluebgheadtd"><!-- TODO: Manual migration required for custom Struts tag --></th>
            </tr>
        </c:if>
        </thead>
        <tbody>
        <c:forEach value="chequDDNotPresentInBank"  var="item" status="stat">
            <tr>
                <td class="blueborderfortd">${#stat.index+1}</td>
                <c:if test='actionName.equals("CHEQUE_DD_ISSUED_NP_IN_BANK")'>
                <td class="blueborderfortd">${%{instrumentNumber}} (${%{instrumentType.type}}) </td>
                <td class="blueborderfortd"><!-- TODO: Manual migration required for custom Struts tag --> </td>
                </c:if>
                <c:if test='actionName.equals("OTHER_INSTRUMENT_ISSUED_NP_IN_BANK")'>
                <td class="blueborderfortd">${%{transactionNumber}} (${%{instrumentType.type}}) </td>
                <td class="blueborderfortd"><!-- TODO: Manual migration required for custom Struts tag --> </td>
                </c:if>
                <td class="blueborderfortd" style="text-align: right;">${%{instrumentAmount}}</td>
                <td class="blueborderfortd">${%{payTo}}</td>
            </tr>
        </c:forEach>
         <c:forEach value="unReconciledDepositedInst"  var="item" status="stat">
            <tr>
                <td class="blueborderfortd">${#stat.index+1}</td>
                <td class="blueborderfortd">${%{transactionNumber}} (${%{instrumentType.name}}) </td>
                <td class="blueborderfortd"><!-- TODO: Manual migration required for custom Struts tag --> </td>
                <td class="blueborderfortd" style="text-align: right;">${%{amount}}</td>
                <td class="blueborderfortd">${%{payee}}</td>
            </tr>
        </c:forEach>
        <c:forEach value="unReconciledBrsEntries"  var="item" status="stat">
            <tr>
                <td class="blueborderfortd">${#stat.index+1}</td>
                <td class="blueborderfortd">${%{refNo}}  </td>
                <td class="blueborderfortd">${%{type}}  </td>
                <td class="blueborderfortd"><!-- TODO: Manual migration required for custom Struts tag --> </td>
                <td class="blueborderfortd" style="text-align: right;">${%{txnAmount}}</td>
            </tr>
        </c:forEach>
          </tbody>
</table>

</html>