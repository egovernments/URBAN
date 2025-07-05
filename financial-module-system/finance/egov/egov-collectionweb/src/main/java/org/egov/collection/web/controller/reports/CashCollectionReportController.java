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
import org.egov.commons.entity.Source;
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
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for the cash collection report
 */
@Controller
@RequestMapping("/reports")
public class CashCollectionReportController {

    private static final Logger LOGGER = Logger.getLogger(CashCollectionReportController.class);
    
    private final Map<String, Object> critParams = new HashMap<String, Object>(0);
    private String reportId;

    public static final String REPORT = "report";
    private static final String EGOV_COUNTER_OPERATOR_ID = "EGOV_COUNTER_OPERATOR_ID";
    private static final String EGOV_COUNTER_ID = "EGOV_COUNTER_ID";
    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_INSTRUMENT_TYPE = "EGOV_INSTRUMENT_TYPE";
    private static final String EGOV_INSTRUMENT_STATUS = "EGOV_INSTRUMENT_STATUS";
    private static final String EGOV_BOUNDARY_ID = "EGOV_BOUNDARY_ID";
    private static final String EGOV_RECEIPT_IDS = "EGOV_RECEIPT_IDS";
    private static final String CASH_COLLECTION_TEMPLATE = "cash_collection";
    private static final String EGOV_SOURCE = "EGOV_SOURCE";
    private String receiptDate;
    private final Map<String, String> sources = createSourceList();

    @Autowired
    private ReportViewerUtil reportViewerUtil;
    
    @Autowired
    private CityService cityService;
    
    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private ReportService reportService;

    /**
     * @param instrumentStatus the Instrument Status to set
     */
    public void setInstrumentStatus(final String instrumentStatus) {
        critParams.put(EGOV_INSTRUMENT_STATUS, instrumentStatus);
    }

    /**
     * @param fromDate the from date to set
     */
    public void setFromDate(final Date fromDate) {
        critParams.put(EGOV_FROM_DATE, fromDate);
    }

    /**
     * @param toDate the to date to set
     */
    public void setToDate(final Date toDate) {
        critParams.put(EGOV_TO_DATE, toDate);
    }

    /**
     * @param counterId the counter id to set
     */
    public void setCounterId(final Long counterId) {
        critParams.put(EGOV_COUNTER_ID, counterId);
    }

    /**
     * @param userId the user id to set
     */
    public void setUserId(final Long userId) {
        critParams.put(EGOV_COUNTER_OPERATOR_ID, userId);
    }

    /**
     * @param boundaryId
     */
    public void setBoundaryId(final Long boundaryId) {
        critParams.put(EGOV_BOUNDARY_ID, boundaryId);
    }

    /**
     * @return the instrument status
     */
    public String getInstrumentStatus() {
        return (String) critParams.get(EGOV_INSTRUMENT_STATUS);
    }

    /**
     * @return the from date
     */
    public Date getFromDate() {
        return (Date) critParams.get(EGOV_FROM_DATE);
    }

    /**
     * @return the do date
     */
    public Date getToDate() {
        return (Date) critParams.get(EGOV_TO_DATE);
    }

    /**
     * @return the counter id
     */
    public Long getCounterId() {
        return (Long) critParams.get(EGOV_COUNTER_ID);
    }

    /**
     * @return the user id
     */
    public Long getUserId() {
        return (Long) critParams.get(EGOV_COUNTER_OPERATOR_ID);
    }

    /**
     * @return the boundary id
     */
    public Long getBoundaryId() {
        return (Long) critParams.get(EGOV_BOUNDARY_ID);
    }

    /**
     * @return the reportId
     */
    public String getReportId() {
        return reportId;
    }

    private void initCriteriaMap() {
        critParams.clear();
        critParams.put(EGOV_COUNTER_OPERATOR_ID, Long.valueOf(-1L));
        critParams.put(EGOV_COUNTER_ID, Long.valueOf(-1L));
        critParams.put(EGOV_FROM_DATE, new Date());
        critParams.put(EGOV_TO_DATE, new Date());
        critParams.put(EGOV_BOUNDARY_ID, Long.valueOf(-1L));
        critParams.put(EGOV_INSTRUMENT_STATUS, CollectionConstants.INSTRUMENT_NEW_STATUS);
        critParams.put(EGOV_INSTRUMENT_TYPE, CollectionConstants.INSTRUMENTTYPE_CASH);
    }

    private void initDropDowns(Model model) {
        model.addAttribute(CollectionConstants.DROPDOWN_DATA_COUNTER_LIST, collectionsUtil.getAllCounters());
        model.addAttribute(CollectionConstants.DROPDOWN_DATA_RECEIPT_CREATOR_LIST, collectionsUtil.getReceiptCreators());
        model.addAttribute(CollectionConstants.DROPDOWN_DATA_RECEIPTZONE_LIST, collectionsUtil.getReceiptZoneList());
        model.addAttribute("instrumentStatusList", Collections.EMPTY_LIST);
        model.addAttribute("instrumentTypeList", Collections.EMPTY_LIST);
    }

    @GetMapping("/cashCollectionReport-criteria")
    public String criteria(Model model) {
        initDropDowns(model);
        initCriteriaMap();
        
        return "reports/cashCollectionReport-index";
    }

    @PostMapping("/cashCollectionReport-submissionReport")
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

    @PostMapping("/cashCollectionReport-report")
    public String report(Model model) {
        // TODO: Implement report generation logic
        // critParams.put(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        model.addAttribute("critParams", critParams);
        return "reports/cashCollectionReport-report";
    }

    private Map<String, String> createSourceList() {
        final Map<String, String> sourcesMap = new HashMap<String, String>(0);
        sourcesMap.put(Source.APONLINE.toString(), Source.APONLINE.toString());
        sourcesMap.put(Source.ESEVA.toString(), Source.ESEVA.toString());
        sourcesMap.put(Source.MEESEVA.toString(), Source.MEESEVA.toString());
        sourcesMap.put(Source.SYSTEM.toString(), Source.SYSTEM.toString());
        return sourcesMap;
    }

    public void setReportService(final ReportService reportService) {
        this.reportService = reportService;
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

    public Map<String, String> getSources() {
        return sources;
    }

    public void setSource(final String source) {
        critParams.put(EGOV_SOURCE, source);
    }

    public String getSource() {
        return (String) critParams.get(EGOV_SOURCE);
    }
} 