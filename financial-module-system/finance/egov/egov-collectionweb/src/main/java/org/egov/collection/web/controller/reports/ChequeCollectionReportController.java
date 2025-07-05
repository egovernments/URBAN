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

import org.apache.log4j.Logger;
import org.egov.collection.constants.CollectionConstants;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.infra.admin.master.service.CityService;
import org.egov.infra.reporting.engine.ReportDataSourceType;
import org.egov.infra.reporting.engine.ReportOutput;
import org.egov.infra.reporting.engine.ReportRequest;
import org.egov.infra.reporting.engine.ReportService;
import org.egov.infra.reporting.viewer.ReportViewerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for the cheque collection report
 */
@Controller
@RequestMapping("/reports")
public class ChequeCollectionReportController {

    private static final Logger LOGGER = Logger.getLogger(ChequeCollectionReportController.class);
    
    public Map<String, Object> critParams = new HashMap<String, Object>(0);
    private String reportId;

    public static final String REPORT = "report";
    private static final String EGOV_COUNTER_OPERATOR_ID = "EGOV_COUNTER_OPERATOR_ID";
    private static final String EGOV_COUNTER_ID = "EGOV_COUNTER_ID";
    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_BOUNDARY_ID = "EGOV_BOUNDARY_ID";
    private static final String EGOV_RECEIPT_IDS = "EGOV_RECEIPT_IDS";
    private static final String CHEQUE_COLLETION_TEMPLATE = "chequeCollectionReport";
    private String receiptDate;

    @Autowired
    private ReportViewerUtil reportViewerUtil;
    
    @Autowired
    private CityService cityService;
    
    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private ReportService reportService;

    public void setFromDate(final Date fromDate) {
        critParams.put(EGOV_FROM_DATE, fromDate);
    }

    public void setToDate(final Date toDate) {
        critParams.put(EGOV_TO_DATE, toDate);
    }

    public void setCounterId(final Long counterId) {
        critParams.put(EGOV_COUNTER_ID, counterId);
    }

    public void setUserId(final Long userId) {
        critParams.put(EGOV_COUNTER_OPERATOR_ID, userId);
    }

    public void setBoundaryId(final Long boundaryId) {
        critParams.put(EGOV_BOUNDARY_ID, boundaryId);
    }

    public Date getFromDate() {
        return (Date) critParams.get(EGOV_FROM_DATE);
    }

    public Date getToDate() {
        return (Date) critParams.get(EGOV_TO_DATE);
    }

    public Long getCounterId() {
        return (Long) critParams.get(EGOV_COUNTER_ID);
    }

    public Long getUserId() {
        return (Long) critParams.get(EGOV_COUNTER_OPERATOR_ID);
    }

    public Long getBoundaryId() {
        return (Long) critParams.get(EGOV_BOUNDARY_ID);
    }

    /**
     * @return the reportId
     */
    public String getReportId() {
        return reportId;
    }

    private void initializeCriteriaMap() {
        critParams.clear();
        critParams.put(EGOV_COUNTER_OPERATOR_ID, Long.valueOf(-1L));
        critParams.put(EGOV_COUNTER_ID, Long.valueOf(-1L));
        critParams.put(EGOV_FROM_DATE, new Date());
        critParams.put(EGOV_TO_DATE, new Date());
        critParams.put(EGOV_BOUNDARY_ID, Long.valueOf(-1L));
    }

    @GetMapping("/chequeCollectionReport-criteria")
    public String criteria(Model model) {
        setupDropdownDataExcluding(model);
        model.addAttribute(CollectionConstants.DROPDOWN_DATA_COUNTER_LIST, collectionsUtil.getAllCounters());
        model.addAttribute(CollectionConstants.DROPDOWN_DATA_RECEIPT_CREATOR_LIST, collectionsUtil.getReceiptCreators());
        model.addAttribute(CollectionConstants.DROPDOWN_DATA_RECEIPTZONE_LIST, collectionsUtil.getReceiptZoneList());
        initializeCriteriaMap();
        
        return "reports/chequeCollectionReport-index";
    }

    @PostMapping("/chequeCollectionReport-submissionReport")
    public String submissionReport(@RequestParam(value = "receiptDate", required = false) String receiptDate,
                                 HttpSession session,
                                 Model model) {
        // final User user = collectionsUtil.getLoggedInUser();

        // final Date today = ReportUtil.today();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date rcptDate = null;
        try {
            rcptDate = sdf.parse(receiptDate);
        } catch (ParseException e) {
            LOGGER.error("Exception occured while parsing receipt created date", e);
        }
        critParams.put(EGOV_FROM_DATE, rcptDate);
        critParams.put(EGOV_TO_DATE, rcptDate);

        // critParams.put(EGOV_COUNTER_OPERATOR_ID, user.getId().longValue());
        critParams.put(EGOV_COUNTER_OPERATOR_ID, Long.valueOf(-1L));
        
        // Extract location from session properly
        Object locationObj = session.getAttribute("location");
        if (locationObj != null) {
            // TODO: Cast to proper location type and get ID
            critParams.put(EGOV_COUNTER_ID, Long.valueOf(-1L));
        } else {
            critParams.put(EGOV_COUNTER_ID, Long.valueOf(-1L));
        }
        
        // Extract receipt IDs from session properly
        Object receiptIdsObj = session.getAttribute(CollectionConstants.SESSION_VAR_RECEIPT_IDS);
        if (receiptIdsObj instanceof Long[]) {
            critParams.put(EGOV_RECEIPT_IDS, Arrays.asList((Long[]) receiptIdsObj));
        } else {
            critParams.put(EGOV_RECEIPT_IDS, Arrays.asList());
        }

        return report(model);
    }

    @PostMapping("/chequeCollectionReport-report")
    public String report(Model model) {
        // TODO: Implement report generation logic
        // critParams.put(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        model.addAttribute("critParams", critParams);
        return "reports/chequeCollectionReport-report";
    }

    private void setupDropdownDataExcluding(Model model) {
        // TODO: Implement dropdown data setup
        // This was previously handled in the prepare() method
    }

    public void setReportService(final ReportService reportService) {
        this.reportService = reportService;
    }

    public void setCritParams(final Map<String, Object> critParams) {
        this.critParams = critParams;
    }

    public Map<String, Object> getCritParams() {
        return critParams;
    }

    public void setCollectionsUtil(final CollectionsUtil collectionsUtil) {
        this.collectionsUtil = collectionsUtil;
    }

    public String getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(String receiptDate) {
        this.receiptDate = receiptDate;
    }
} 