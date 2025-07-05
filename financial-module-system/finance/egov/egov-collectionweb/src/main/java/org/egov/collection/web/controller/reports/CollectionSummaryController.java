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
import org.egov.collection.service.CollectionReportService;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.commons.EgwStatus;
import org.egov.commons.entity.Source;
import org.egov.infra.admin.master.entity.Department;
import org.egov.infra.admin.master.service.CityService;
import org.egov.infstr.models.ServiceDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * Controller for the cash collection summary report
 */
@Controller
@RequestMapping("/reports")
public class CollectionSummaryController {

    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_PAYMENT_MODE = "EGOV_PAYMENT_MODE";
    private static final String COLLECTION_SUMMARY_TEMPLATE = "collection_summary";
    private static final String EGOV_SOURCE = "EGOV_SOURCE";
    private static final String EGOV_SERVICE_ID = "EGOV_SERVICE_ID";
    private static final String EGOV_SERVICE_NAME = "EGOV_SERVICE_NAME";
    private static final String EGOV_STATUS = "EGOV_STATUS";
    private static final String EGOV_CLASSIFICATION = "EGOV_CLASSIFICATION";

    private Integer statusId;
    private String serviceType;

    private final Map<String, String> paymentModes = createPaymentModeList();
    private final Map<String, String> sources = createSourceList();
    private TreeMap<String, String> serviceTypeMap = new TreeMap<String, String>();

    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private CollectionReportService reportService;
    
    @Autowired
    private CityService cityService;
    
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * @return the payment mode list to be shown to user in criteria screen
     */
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

    private Map<String, String> createSourceList() {
        final Map<String, String> sourcesMap = new HashMap<String, String>(0);
        sourcesMap.put(Source.APONLINE.toString(), Source.APONLINE.toString());
        sourcesMap.put(Source.ESEVA.toString(), Source.ESEVA.toString());
        sourcesMap.put(Source.MEESEVA.toString(), Source.MEESEVA.toString());
        sourcesMap.put(Source.SYSTEM.toString(), Source.SYSTEM.toString());
        return sourcesMap;
    }

    /**
     * Action method for criteria screen
     *
     * @return index
     */
    @GetMapping("/collectionSummary-criteria")
    public String criteria(Model model) {
        // Setup drop down data for department list
        // TODO: Add department dropdown data to model
        // addRelatedEntity("department", Department.class, "name");
        
        // TODO: Add service type list to model
        // addDropdownData("servicetypeList", collectionsUtil.getBillingServiceList());
        
        // Set default values of criteria fields
        model.addAttribute("fromDate", new Date());
        model.addAttribute("toDate", new Date());
        
        // TODO: Add receipt statuses to model
        // addDropdownData("receiptStatuses", getPersistenceService().findAllByNamedQuery(CollectionConstants.STATUS_OF_RECEIPTS));
        
        serviceTypeMap.putAll(CollectionConstants.SERVICE_TYPE_CLASSIFICATION);
        serviceTypeMap.remove(CollectionConstants.SERVICE_TYPE_PAYMENT);
        model.addAttribute("serviceTypeMap", serviceTypeMap);
        model.addAttribute("paymentModes", paymentModes);
        model.addAttribute("sources", sources);
        
        return "reports/collectionSummary-index";
    }

    @PostMapping("/collectionSummary-report")
    public void report(@RequestParam(value = "fromDate", required = false) Date fromDate,
                      @RequestParam(value = "toDate", required = false) Date toDate,
                      @RequestParam(value = "paymentMode", required = false) String paymentMode,
                      @RequestParam(value = "source", required = false) String source,
                      @RequestParam(value = "serviceId", required = false) Long serviceId,
                      @RequestParam(value = "statusId", required = false) Integer statusId,
                      @RequestParam(value = "serviceType", required = false) String serviceType,
                      HttpServletResponse response) throws IOException {
        
        String serviceName = null;
        String statusName = null;
        String classification = null;
        
        if (serviceId != null && serviceId != -1) {
            ServiceDetails serviceDets = entityManager.find(ServiceDetails.class, serviceId);
            serviceName = serviceDets.getName();
        }
        if (statusId != null && statusId != -1) {
            EgwStatus statusObj = entityManager.find(EgwStatus.class, statusId);
            statusName = statusObj.getDescription();
        }
        classification = serviceType;
        
        // TODO: Implement report generation logic
        // setReportData(reportService.getCollectionSummaryReport(fromDate, toDate, paymentMode, source, serviceId, statusId, serviceType));
        // setReportParam(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        response.setContentType("text/html");
        response.getWriter().write("Collection Summary Report - From: " + fromDate + ", To: " + toDate + 
                                 ", Service: " + serviceName + ", Status: " + statusName);
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

    public Long getServiceId() {
        return null; // TODO: Get from model
    }

    public void setServiceId(final Long serviceId) {
        // TODO: Set in model
    }

    public String getServiceName() {
        return null; // TODO: Get from model
    }

    public void setServiceName(final String serviceName) {
        // TODO: Set in model
    }

    public int getStatusId() {
        return statusId != null ? statusId : -1;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return null; // TODO: Get from model
    }

    public void setStatusName(final String statusName) {
        // TODO: Set in model
    }

    public TreeMap<String, String> getServiceTypeMap() {
        return serviceTypeMap;
    }

    public void setServiceTypeMap(final TreeMap<String, String> serviceTypeMap) {
        this.serviceTypeMap = serviceTypeMap;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getClassification() {
        return null; // TODO: Get from model
    }

    public void setClassification(final String classification) {
        // TODO: Set in model
    }
} 