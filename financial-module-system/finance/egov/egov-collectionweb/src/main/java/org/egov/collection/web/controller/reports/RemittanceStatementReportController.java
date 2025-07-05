/*
 *    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) 2017  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *            Further, all user interfaces, including but not limited to citizen facing interfaces,
 *            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *            derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *            For any further queries on attribution, including queries on brand guidelines,
 *            please contact contact@egovernments.org
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 *
 */

package org.egov.collection.web.controller.reports;

import org.apache.commons.lang3.StringUtils;
import org.egov.collection.constants.CollectionConstants;
import org.egov.collection.entity.CollectionBankRemittanceReport;
import org.egov.collection.service.RemittanceServiceImpl;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.eis.entity.Employee;
import org.egov.eis.entity.Jurisdiction;
import org.egov.eis.service.OldEmployeeService;
import org.egov.infra.admin.master.entity.Boundary;
import org.egov.infra.admin.master.entity.User;
import org.egov.infra.admin.master.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/reports")
public class RemittanceStatementReportController {

    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_SERVICE_ID = "EGOV_SERVICE_ID";
    private static final String EGOV_FUND_ID = "EGOV_FUND_ID";
    private static final String EGOV_BANKBRANCH_ID = "EGOV_BANKBRANCH_ID";
    private static final String EGOV_BANKACCOUNT_ID = "EGOV_BANKACCOUNT_ID";
    private static final String EGOV_PAYMENT_MODE = "EGOV_PAYMENT_MODE";
    private static final String SELECTED_DEPT_ID = "SELECTED_DEPT_ID";
    private static final String EGOV_DEPT_ID = "EGOV_DEPT_ID";
    private static final String EGOV_CASH_AMOUNT = "EGOV_CASH_AMOUNT";
    private static final String EGOV_CHEQUE_AMOUNT = "EGOV_CHEQUE_AMOUNT";
    private static final String EGOV_BANK = "EGOV_BANK";
    private static final String EGOV_BANK_ACCOUNT = "EGOV_BANK_ACCOUNT";
    private static final String EGOV_REMITTANCE_VOUCHER = "EGOV_REMITTANCE_VOUCHER";
    private static final String EGOV_REMITTANCE_DATE = "EGOV_REMITTANCE_DATE";
    private static final String PRINT_BANK_CHALLAN_TEMPLATE = "collection_remittance_bankchallan_report";
    private static final String PRINT_CHEQUE_BANK_CHALLAN_TEMPLATE = "collection_cheque_remittance_bankchallan_report";
    private static final String PRINT_CASH_BANK_CHALLAN_TEMPLATE = "collection_cash_remittance_bankchallan_report";
    private static final String EGOV_BANKCOLL_BANKBRANCH_ID = "EGOV_BANKCOLL_BANKBRANCH_ID";

    private final Map<String, Object> critParams = new HashMap<String, Object>(0);
    private final Map<String, String> paymentModes = createPaymentModeList();
    private List<CollectionBankRemittanceReport> bankRemittanceList;
    private Double totalCashAmount;
    private Double totalChequeAmount;
    private String bank;
    private String bankAccount;
    private Date remittanceDate;
    private String voucherNumber;

    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private OldEmployeeService employeeService;
    
    @Autowired
    private CityService cityService;
    
    @Autowired
    private RemittanceServiceImpl remittanceService;

    @GetMapping("/remittanceStatementReport-criteria")
    public String criteria(Model model) {
        // TODO: Add collection service list to model
        // addDropdownData("collectionServiceList", persistenceService.findAllByNamedQuery(CollectionConstants.QUERY_COLLECTION_SERVICS));
        
        // TODO: Add collection fund list to model
        // addDropdownData("collectionFundList", persistenceService.findAllByNamedQuery(CollectionConstants.QUERY_ALL_FUND));
        
        critParams.put(EGOV_FROM_DATE, new Date());
        critParams.put(EGOV_TO_DATE, new Date());
        
        model.addAttribute("fromDate", new Date());
        model.addAttribute("toDate", new Date());
        
        model.addAttribute("bankList", Collections.EMPTY_LIST);
        model.addAttribute("bankAccountList", Collections.EMPTY_LIST);
        
        // TODO: Add boundary list to model
        // final User user = collectionsUtil.getLoggedInUser();
        // final List<Boundary> boundaryList = new ArrayList<Boundary>();
        // final Employee employee = employeeService.getEmployeeById(user.getId());
        // if (employee != null)
        //     for (final Jurisdiction element : employee.getJurisdictions())
        //         boundaryList.add(element.getBoundary());
        // addDropdownData("boundaryList", boundaryList);
        
        model.addAttribute("paymentModes", paymentModes);
        
        return "reports/remittanceStatementReport-index";
    }

    @PostMapping("/remittanceStatementReport-report")
    public void report(@RequestParam(value = "fromDate", required = false) Date fromDate,
                      @RequestParam(value = "toDate", required = false) Date toDate,
                      @RequestParam(value = "serviceId", required = false) Long serviceId,
                      @RequestParam(value = "fundId", required = false) Integer fundId,
                      @RequestParam(value = "branchId", required = false) Integer branchId,
                      @RequestParam(value = "bankAccountId", required = false) Integer bankAccountId,
                      @RequestParam(value = "paymentMode", required = false) String paymentMode,
                      @RequestParam(value = "deptId", required = false) Integer deptId,
                      @RequestParam(value = "bankCollBankBranchId", required = false) Integer bankCollBankBranchId,
                      HttpServletResponse response) throws IOException {
        
        // TODO: Implement report generation logic
        // final User user = collectionsUtil.getLoggedInUser();
        // critParams.put(SELECTED_DEPT_ID, deptId);
        // critParams.put(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        response.setContentType("text/html");
        response.getWriter().write("Remittance Statement Report - From: " + fromDate + ", To: " + toDate);
    }

    @PostMapping("/remittanceStatementReport-printBankChallan")
    public void printBankChallan(HttpServletResponse response) throws IOException {
        // TODO: Implement bank challan printing logic
        response.setContentType("text/html");
        response.getWriter().write("Print Bank Challan");
    }

    @PostMapping("/remittanceStatementReport-printChequeBankChallan")
    public void printChequeBankChallan(HttpServletResponse response) throws IOException {
        // TODO: Implement cheque bank challan printing logic
        response.setContentType("text/html");
        response.getWriter().write("Print Cheque Bank Challan");
    }

    @PostMapping("/remittanceStatementReport-printCashBankChallan")
    public void printCashBankChallan(HttpServletResponse response) throws IOException {
        // TODO: Implement cash bank challan printing logic
        response.setContentType("text/html");
        response.getWriter().write("Print Cash Bank Challan");
    }

    @PostMapping("/remittanceStatementReport-reportPrintBankChallan")
    public void reportPrintBankChallan(HttpServletResponse response) throws IOException {
        // TODO: Implement report print bank challan logic
        response.setContentType("text/html");
        response.getWriter().write("Report Print Bank Challan");
    }

    private Map<String, String> createPaymentModeList() {
        final Map<String, String> paymentModesMap = new HashMap<String, String>(0);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_CASH, CollectionConstants.INSTRUMENTTYPE_CASH);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_CHEQUEORDD,
                CollectionConstants.INSTRUMENTTYPE_CHEQUEORDD);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_ONLINE, CollectionConstants.INSTRUMENTTYPE_ONLINE);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_BANK, CollectionConstants.INSTRUMENTTYPE_BANK);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_CARD, CollectionConstants.INSTRUMENTTYPE_CARD);
        return paymentModesMap;
    }

    protected String getReportTemplateName() {
        return "collection_remittance_statement_report";
    }

    // Getters and setters
    public Date getFromDate() {
        return (Date) critParams.get(EGOV_FROM_DATE);
    }

    public void setFromDate(final Date fromDate) {
        critParams.put(EGOV_FROM_DATE, fromDate);
    }

    public Date getToDate() {
        return (Date) critParams.get(EGOV_TO_DATE);
    }

    public void setToDate(final Date toDate) {
        critParams.put(EGOV_TO_DATE, toDate);
    }

    public Long getServiceId() {
        return (Long) critParams.get(EGOV_SERVICE_ID);
    }

    public void setServiceId(final Long serviceId) {
        critParams.put(EGOV_SERVICE_ID, serviceId);
    }

    public Integer getFundId() {
        return (Integer) critParams.get(EGOV_FUND_ID);
    }

    public void setFundId(final Integer fundId) {
        critParams.put(EGOV_FUND_ID, fundId);
    }

    public Integer getBranchId() {
        return (Integer) critParams.get(EGOV_BANKBRANCH_ID);
    }

    public void setBranchId(final Integer branchId) {
        critParams.put(EGOV_BANKBRANCH_ID, branchId);
    }

    public Integer getBankaccountId() {
        return (Integer) critParams.get(EGOV_BANKACCOUNT_ID);
    }

    public void setBankaccountId(final Integer bankAccountId) {
        critParams.put(EGOV_BANKACCOUNT_ID, bankAccountId);
    }

    public Integer getBankCollBankBranchId() {
        return (Integer) critParams.get(EGOV_BANKCOLL_BANKBRANCH_ID);
    }

    public void setBankCollBankBranchId(final Integer bankCollBranchId) {
        critParams.put(EGOV_BANKCOLL_BANKBRANCH_ID, bankCollBranchId);
    }

    public String getPaymentMode() {
        return (String) critParams.get(EGOV_PAYMENT_MODE);
    }

    public void setPaymentMode(final String paymentMode) {
        critParams.put(EGOV_PAYMENT_MODE, paymentMode);
    }

    public Integer getDeptId() {
        return (Integer) critParams.get(EGOV_DEPT_ID);
    }

    public void setDeptId(final Integer deptId) {
        critParams.put(EGOV_DEPT_ID, deptId);
    }

    public Map<String, String> getPaymentModes() {
        return paymentModes;
    }

    public Double getTotalCashAmount() {
        return totalCashAmount;
    }

    public void setTotalCashAmount(final Double totalCashAmount) {
        this.totalCashAmount = totalCashAmount;
    }

    public Double getTotalChequeAmount() {
        return totalChequeAmount;
    }

    public void setTotalChequeAmount(final Double totalChequeAmount) {
        this.totalChequeAmount = totalChequeAmount;
    }

    public List<CollectionBankRemittanceReport> getBankRemittanceList() {
        return bankRemittanceList;
    }

    public void setBankRemittanceList(final List<CollectionBankRemittanceReport> bankRemittanceList) {
        this.bankRemittanceList = bankRemittanceList;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(final String bank) {
        this.bank = bank;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(final String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Date getRemittanceDate() {
        return remittanceDate;
    }

    public void setRemittanceDate(final Date remittanceDate) {
        this.remittanceDate = remittanceDate;
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(final String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }
} 