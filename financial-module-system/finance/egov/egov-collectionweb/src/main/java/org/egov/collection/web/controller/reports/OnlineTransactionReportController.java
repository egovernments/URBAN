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
import org.egov.collection.entity.OnlinePayment;
import org.egov.collection.utils.CollectionsUtil;
import org.egov.commons.EgwStatus;
import org.egov.infra.admin.master.entity.Department;
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
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * Controller for Online Transaction Report
 */
@Controller
@RequestMapping("/reports")
public class OnlineTransactionReportController {
    
    // Report parameter names
    private static final String EGOV_DEPT_ID = "EGOV_DEPT_ID";
    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_BILLING_SERVICE_ID = "EGOV_BILLING_SERVICE_ID";
    private static final String EGOV_ONLINETRANSACTION_STATUS_ID = "EGOV_ONLINETRANSACTION_STATUS_ID";
    private static final String EGOV_PAYMENT_SERVICE_ID = "EGOV_PAYMENT_SERVICE_ID";
    private static final String EGOV_COUNTER_OPERATOR_ID = "EGOV_COUNTER_OPERATOR_ID";
    private static final String EGOV_COLLECTION_TYPE = "EGOV_COLLECTION_TYPE";

    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private CityService cityService;

    @GetMapping("/onlineTransactionReport-criteria")
    public String criteria(Model model) {
        // Setup drop down data for department list
        // TODO: Add department dropdown data to model
        // addRelatedEntity("department", Department.class, "name");
        
        // Add dropdown data for billing services (serviceList)
        // TODO: Add service list to model
        // addDropdownData(CollectionConstants.DROPDOWN_DATA_SERVICE_LIST, collectionsUtil.getBillingServiceList());
        
        model.addAttribute("fromDate", new Date());
        model.addAttribute("toDate", new Date());
        
        // Add dropdown data for payment services (paymentServiceList)
        // TODO: Add payment service list to model
        // addDropdownData("paymentServiceList", persistenceService.findAllByNamedQuery(CollectionConstants.QUERY_SERVICES_BY_TYPE, CollectionConstants.SERVICE_TYPE_PAYMENT));
        
        // TODO: Add online transaction status list to model
        // addDropdownData(CollectionConstants.DROPDOWN_DATA_ONLINETRANSACTIONSTATUS_LIST, getOnlineReceiptStatuses());
        
        model.addAttribute("userList", Collections.emptyList());
        
        Map<Character, String> collectionTypeMap = new TreeMap<>();
        collectionTypeMap.put(CollectionConstants.COLLECTION_TYPE_COUNTER, "Counter");
        collectionTypeMap.put(CollectionConstants.COLLECTION_TYPE_ONLINECOLLECTION, "Online");
        model.addAttribute("collectionTypeMap", collectionTypeMap);
        
        return "reports/onlineTransactionReport-index";
    }

    @PostMapping("/onlineTransactionReport-report")
    public void report(@RequestParam(value = "departmentId", required = false) Integer departmentId,
                      @RequestParam("fromDate") Date fromDate,
                      @RequestParam("toDate") Date toDate,
                      @RequestParam(value = "billingServiceId", required = false) Long billingServiceId,
                      @RequestParam(value = "statusId", required = false) Long statusId,
                      @RequestParam(value = "paymentServiceId", required = false) Long paymentServiceId,
                      @RequestParam(value = "userId", required = false) Long userId,
                      @RequestParam(value = "collectionType", required = false) String collectionType,
                      HttpServletResponse response) throws IOException {
        // TODO: Implement report generation logic
        // setReportParam(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        response.setContentType("text/html");
        response.getWriter().write("Online Transaction Report - From: " + fromDate + ", To: " + toDate);
    }

    private List<EgwStatus> getOnlineReceiptStatuses() {
        // TODO: Implement this method
        // return persistenceService.findAllByNamedQuery(CollectionConstants.QUERY_ALL_STATUSES_FOR_MODULE, OnlinePayment.class.getSimpleName());
        return Collections.emptyList();
    }

    protected String getReportTemplateName() {
        return CollectionConstants.REPORT_TEMPLATE_ONLINE_TRANSACTION;
    }
} 