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
import org.egov.collection.service.CollectionReportHeadWiseService;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.commons.Bankbranch;
import org.egov.commons.CChartOfAccounts;
import org.egov.commons.EgwStatus;
import org.egov.commons.dao.ChartOfAccountsHibernateDAO;
import org.egov.commons.entity.Source;
import org.egov.infra.admin.master.entity.Department;
import org.egov.infra.admin.master.service.CityService;
import org.egov.infra.reporting.engine.ReportDataSourceType;
import org.egov.infra.reporting.engine.ReportFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for the cash collection summary report
 */
@Controller
@RequestMapping("/reports")
public class CollectionSummaryHeadWiseController {

    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_PAYMENT_MODE = "EGOV_PAYMENT_MODE";
    private static final String COLLECTION_SUMMARY_TEMPLATE = "collection_summary_headwise";
    private static final String EGOV_SOURCE = "EGOV_SOURCE";
    private static final String EGOV_STATUS = "EGOV_STATUS";
    private static final String EGOV_GLCODE_NAME = "EGOV_GLCODE_NAME";
    private static final String EGOV_GLCODE_ID = "EGOV_GLCODE_ID";
    private static final String EGOV_BRANCH_NAME = "EGOV_BRANCH_NAME";

    private Integer statusId;
    private Long revenueId;
    private String glCode;
    private final Map<String, String> paymentModes = createPaymentModeList();
    private final Map<String, String> sources = createSourceList();
    private String statusName;
    private String glCodeName;
    private String branchName;

    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private CollectionReportHeadWiseService reportService;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private ChartOfAccountsHibernateDAO chartOfAccountsHibernateDAO;
    
    @Autowired
    private CityService cityService;

    private Integer branchId = -1;

    /**
     * @return the payment mode list to be shown to user in criteria screen
     */
    private Map<String, String> createPaymentModeList() {
        final Map<String, String> paymentModesMap = new HashMap<String, String>(0);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_CASH, CollectionConstants.INSTRUMENTTYPE_CASH);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_CHEQUEORDD,
                CollectionConstants.INSTRUMENTTYPE_CHEQUEORDD);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_ONLINE, CollectionConstants.INSTRUMENTTYPE_ONLINE);
        paymentModesMap.put(CollectionConstants.INSTRUMENTTYPE_CARD, CollectionConstants.INSTRUMENTTYPE_CARD);
        return paymentModesMap;
    }

    private Map<String, String> createSourceList() {
        final Map<String, String> sourcesMap = new HashMap<String, String>(0);
        sourcesMap.put(Source.APONLINE.toString(), Source.APONLINE.toString());
        sourcesMap.put(Source.ESEVA.toString(), Source.ESEVA.toString());
        sourcesMap.put(Source.MEESEVA.toString(), Source.MEESEVA.toString());
        sourcesMap.put(Source.SYSTEM.toString(), Source.SYSTEM.toString());
        return sourcesMap;
    }

    @GetMapping("/collectionSummaryHeadWise-criteria")
    public String criteria(Model model) {
        // Setup drop down data for department list
        // addRelatedEntity("department", Department.class, "name");
        model.addAttribute("bankBranchList", collectionsUtil.getBankCollectionBankBranchList());
        model.addAttribute("servicetypeList", collectionsUtil.getBillingServiceList());
        setupDropdownDataExcluding(model);

        // Set default values of criteria fields
        model.addAttribute("fromDate", new Date());
        model.addAttribute("toDate", new Date());
        // TODO: Add receipt statuses and revenue heads
        // addDropdownData("receiptStatuses", getPersistenceService().findAllByNamedQuery(CollectionConstants.STATUS_OF_RECEIPTS));
        // addDropdownData("revenueHeads", chartOfAccountsHibernateDAO.getActiveAccountsForTypes(CollectionConstants.REVENUEHEADS));
        
        return "reports/collectionSummaryHeadWise-index";
    }

    @PostMapping("/collectionSummaryHeadWise-report")
    public String report(@RequestParam(value = "fromDate", required = false) Date fromDate,
                        @RequestParam(value = "toDate", required = false) Date toDate,
                        @RequestParam(value = "paymentMode", required = false) String paymentMode,
                        @RequestParam(value = "source", required = false) String source,
                        @RequestParam(value = "statusId", required = false) Integer statusId,
                        @RequestParam(value = "revenueId", required = false) Long revenueId,
                        @RequestParam(value = "branchId", required = false) Integer branchId,
                        Model model) {
        
        /*
         * if (getServiceId() != null && getServiceId() != -1) { ServiceDetails serviceDets = (ServiceDetails)
         * entityManager.find(ServiceDetails.class, getServiceId()); setServiceName(serviceDets.getName()); }
         */
        if (statusId != null && statusId != -1) {
            final EgwStatus statusObj = entityManager.find(EgwStatus.class, statusId);
            setStatusName(statusObj.getDescription());
        }

        if (revenueId != null && revenueId != -1) {
            final CChartOfAccounts statusObj = entityManager.find(CChartOfAccounts.class, revenueId);
            setGlCodeName(statusObj.getName());
            setGlCode(statusObj.getGlcode());
        }
        
        if (branchId != null && branchId != -1) {
            final Bankbranch bankbranch = entityManager.find(Bankbranch.class, branchId);
            String brankname = bankbranch.getBank().getName() + "-" + bankbranch.getBranchname();
            setBranchName(brankname);
        } else {
            setBranchName("All Bank Branch");
        }
        
        // TODO: Implement report generation logic
        // setReportParam(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        // setReportData(reportService.getCollectionSummaryReport(fromDate, toDate, paymentMode, source, glCode, statusId, branchId));
        
        model.addAttribute("statusName", statusName);
        model.addAttribute("glCodeName", glCodeName);
        model.addAttribute("branchName", branchName);
        
        return "reports/collectionSummaryHeadWise-report";
    }

    private void setupDropdownDataExcluding(Model model) {
        // TODO: Implement dropdown data setup
        // This was previously handled in the prepare() method
    }

    protected String getReportTemplateName() {
        return COLLECTION_SUMMARY_TEMPLATE;
    }

    // Getters and setters
    public Date getFromDate() {
        return new Date(); // TODO: Get from model
    }

    public void setFromDate(final Date fromDate) {
        // TODO: Set in model
    }

    public Date getToDate() {
        return new Date(); // TODO: Get from model
    }

    public void setToDate(final Date toDate) {
        // TODO: Set in model
    }

    public String getPaymentMode() {
        return null; // TODO: Get from model
    }

    public void setPaymentMode(final String paymentMode) {
        // TODO: Set in model
    }

    public Map<String, String> getPaymentModes() {
        return paymentModes;
    }

    public String getSource() {
        return null; // TODO: Get from model
    }

    public void setSource(final String source) {
        // TODO: Set in model
    }

    public Map<String, String> getSources() {
        return sources;
    }

    public int getStatusId() {
        return statusId != null ? statusId : -1;
    }

    public void setStatusId(final int statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(final String statusName) {
        this.statusName = statusName;
    }

    public Long getGlCodeId() {
        return null; // TODO: Get from model
    }

    public void setGlCodeId(final String glCodeId) {
        // TODO: Set in model
    }

    public String getGlCodeName() {
        return glCodeName;
    }

    public void setGlCodeName(final String glCodeName) {
        this.glCodeName = glCodeName;
    }

    public String getGlCode() {
        return glCode;
    }

    public void setGlCode(final String glCode) {
        this.glCode = glCode;
    }

    public Long getRevenueId() {
        return revenueId;
    }

    public void setRevenueId(final Long revenueId) {
        this.revenueId = revenueId;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public void setBranchName(final String branchName) {
        this.branchName = branchName;
    }

    public void setCollectionsUtil(final CollectionsUtil collectionsUtil) {
        this.collectionsUtil = collectionsUtil;
    }
} 