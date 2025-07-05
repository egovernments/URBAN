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

import org.egov.collection.constants.CollectionConstants;
import org.egov.collection.entity.CollectionBankRemittanceReport;
import org.egov.collection.entity.CollectionRemittanceReportResult;
import org.egov.collection.entity.ReceiptHeader;
import org.egov.collection.entity.Remittance;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.commons.dao.BankBranchHibernateDAO;
import org.egov.commons.dao.BankaccountHibernateDAO;
import org.egov.infra.admin.master.service.CityService;
import org.egov.infra.reporting.engine.ReportDataSourceType;
import org.egov.infra.reporting.engine.ReportFormat;
import org.egov.infra.reporting.engine.ReportOutput;
import org.egov.infra.reporting.engine.ReportRequest;
import org.egov.infra.reporting.engine.ReportService;
import org.egov.infra.reporting.viewer.ReportViewerUtil;
import org.egov.infstr.models.ServiceDetails;
import org.egov.infstr.services.PersistenceService;
import org.egov.model.instrument.InstrumentHeader;
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
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Controller for the remittance voucher report
 */
@Controller
@RequestMapping("/reports")
public class RemittanceVoucherReportController {

    private static final String EGOV_VOUCHER_NUMBER = "EGOV_VOUCHER_NUMBER";
    private static final String EGOV_RECEIPT_NUMBER = "EGOV_RECEIPT_NUMBER";
    private static final String EGOV_REMITTANCE_NUMBER = "EGOV_REMITTANCE_NUMBER";
    private static final String EGOV_REMITTANCE_DATE = "EGOV_REMITTANCE_DATE";
    private static final String EGOV_BANKACCOUNT_ID = "EGOV_BANKACCOUNT_ID";
    private static final String EGOV_BRANCH_ID = "EGOV_BRANCH_ID";

    private static final String ACCOUNT_NUMBER_LIST = "accountNumberList";
    private static final String RECEIPTDETAILSLIST = "receiptdetailslist";
    private static final String RECIEPT_DETAILS_TEMPLATE = "collection_receiptdetails_main_report";

    @Autowired
    private ReportService reportService;
    
    @Autowired
    private ReportViewerUtil reportViewerUtil;
    
    @Autowired
    private BankaccountHibernateDAO bankAccountHibernateDAO;
    
    @Autowired
    private BankBranchHibernateDAO bankbranchDAO;
    
    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private CityService cityService;
    
    @Autowired
    private PersistenceService<ServiceDetails, Long> serviceDetailsService;

    private Integer branchId;
    private String voucherNumber;
    private Long bankAcctId;
    private String reportId;
    private final Map<String, Object> critParams = new HashMap<String, Object>(0);
    private List<CollectionBankRemittanceReport> bankRemittanceList;
    private Long srvId;
    private Integer bankBranchId;

    @GetMapping("/remittanceVoucherReport-criteria")
    public String criteria(Model model) {
        populateBankAccountList(model);
        
        // Set default values of criteria fields
        model.addAttribute("remittanceDate", new Date());
        critParams.put(EGOV_REMITTANCE_DATE, new Date());
        
        return "reports/remittanceVoucherReport-index";
    }

    @PostMapping("/remittanceVoucherReport-reportReceiptDetails")
    public void reportReceiptDetails(@RequestParam(value = "voucherNumber", required = false) String voucherNumber,
                                   @RequestParam(value = "srvId", required = false) Long srvId,
                                   HttpServletResponse response) throws IOException {
        
        // TODO: Use proper Remittance service instead of ServiceDetails
        // final Remittance remittanceObj = (Remittance) serviceDetailsService
        //         .findByNamedQuery(CollectionConstants.REMITTANCE_BY_VOUCHER_NUMBER, voucherNumber);
        final Remittance remittanceObj = null; // TODO: Implement proper remittance lookup
        critParams.put(EGOV_REMITTANCE_DATE, new Date());
        final List<CollectionBankRemittanceReport> reportList = new ArrayList<CollectionBankRemittanceReport>(0);
        
        if (remittanceObj != null) {
            for (final ReceiptHeader receiptHead : remittanceObj.getCollectionRemittance()) {
                final Iterator<InstrumentHeader> itr = receiptHead.getReceiptInstrument().iterator();
                while (itr.hasNext()) {
                    final CollectionBankRemittanceReport collBankRemitReport = new CollectionBankRemittanceReport();
                    final InstrumentHeader instHead = itr.next();
                    collBankRemitReport.setPaymentMode(instHead.getInstrumentType().getType());
                    collBankRemitReport.setAmount(instHead.getInstrumentAmount().doubleValue());
                    collBankRemitReport.setReceiptNumber(receiptHead.getReceiptnumber());
                    collBankRemitReport.setReceiptDate(receiptHead.getReceiptDate());
                    collBankRemitReport.setServiceType(receiptHead.getService());
                    reportList.add(collBankRemitReport);
                }
            }
        }
        
        ServiceDetails service = serviceDetailsService.findById(srvId, false);
        critParams.put(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        final CollectionRemittanceReportResult collReportResult = new CollectionRemittanceReportResult();
        collReportResult.setCollectionBankRemittanceReportList(reportList);
        
        // TODO: Implement report generation logic
        response.setContentType("text/html");
        response.getWriter().write("Remittance Voucher Report Receipt Details - Voucher: " + voucherNumber);
    }

    @PostMapping("/remittanceVoucherReport-report")
    public void report(@RequestParam(value = "voucherNumber", required = false) String voucherNumber,
                      @RequestParam(value = "receiptNumber", required = false) String receiptNumber,
                      @RequestParam(value = "remittanceNumber", required = false) String remittanceNumber,
                      @RequestParam(value = "remittanceDate", required = false) Date remittanceDate,
                      @RequestParam(value = "bankAcctId", required = false) Long bankAcctId,
                      @RequestParam(value = "branchId", required = false) Integer branchId,
                      HttpServletResponse response) throws IOException {
        
        // TODO: Implement report generation logic
        critParams.put(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        response.setContentType("text/html");
        response.getWriter().write("Remittance Voucher Report - Voucher: " + voucherNumber);
    }

    public void populateBankAccountList(Model model) {
        // TODO: Implement bank account list population
        // final AjaxBankRemittanceAction ajaxBankRemittanceAction = new AjaxBankRemittanceAction();
        // ajaxBankRemittanceAction.setPersistenceService(getPersistenceService());
        // ajaxBankRemittanceAction.setCollectionsUtil(collectionsUtil);
        // ajaxBankRemittanceAction.bankBranchListOfService();
        // addDropdownData("bankBranchList", ajaxBankRemittanceAction.getBankBranchArrayList());
        
        model.addAttribute("bankBranchList", Collections.EMPTY_LIST);
        model.addAttribute(ACCOUNT_NUMBER_LIST, Collections.EMPTY_LIST);
    }

    protected String getReportTemplateName() {
        return "collection_remittance_voucher_report";
    }

    public static String getReceiptdetailslist() {
        return RECEIPTDETAILSLIST;
    }

    // Getters and setters
    public Integer getBankAccountId() {
        return null; // TODO: Get from model
    }

    public void setBankAccountId(Integer bankAccountId) {
        // TODO: Set in model
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public Date getRemittanceDate() {
        return (Date) critParams.get(EGOV_REMITTANCE_DATE);
    }

    public void setRemittanceDate(final Date remittanceDate) {
        critParams.put(EGOV_REMITTANCE_DATE, remittanceDate);
    }

    public String getReceiptNumber() {
        return null; // TODO: Get from model
    }

    public void setReceiptNumber(String receiptNumber) {
        // TODO: Set in model
    }

    public String getRemittanceNumber() {
        return null; // TODO: Get from model
    }

    public void setRemittanceNumber(String remittanceNumber) {
        // TODO: Set in model
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }

    public String getReportId() {
        return reportId;
    }

    public List<CollectionBankRemittanceReport> getBankRemittanceList() {
        return bankRemittanceList;
    }

    public void setBankRemittanceList(final List<CollectionBankRemittanceReport> bankRemittanceList) {
        this.bankRemittanceList = bankRemittanceList;
    }

    public Long getBankAcctId() {
        return bankAcctId;
    }

    public void setBankAcctId(Long bankAcctId) {
        this.bankAcctId = bankAcctId;
    }

    public Integer getBankBranchId() {
        return bankBranchId;
    }

    public void setBankBranchId(Integer bankBranchId) {
        this.bankBranchId = bankBranchId;
    }

    public void setServiceDetailsService(final PersistenceService<ServiceDetails, Long> serviceDetailsService) {
        this.serviceDetailsService = serviceDetailsService;
    }
} 