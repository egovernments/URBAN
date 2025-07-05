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
import org.egov.collection.utils.CollectionsUtil;
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
import java.util.Date;
import java.util.Map;

@Controller
@RequestMapping("/reports")
public class DishonoredChequeReportController {

    private static final String COLLECTION_DISHONORED_CHEQUE_REPORT = "collection_dishonored_cheque_report";
    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_PAYMENT_MODE = "EGOV_PAYMENT_MODE";
    private static final String EGOV_SERVICE_ID = "EGOV_SERVICE_ID";
    private static final String EGOV_STATUS_ID = "EGOV_STATUS_ID";
    private static final String EGOV_LOCATION_ID = "EGOV_LOCATION_ID";
    private static final String EGOV_TRANSACTION_FROM_DATE = "EGOV_TRANSACTION_FROM_DATE";
    private static final String EGOV_TRANSACTION_TO_DATE = "EGOV_TRANSACTION_TO_DATE";
    private static final String EGOV_FUND_ID = "EGOV_FUND_ID";
    private static final String EGOV_USER_ID = "EGOV_USER_ID";
    private static final String EGOV_INSTRUMENT_NUMBER = "EGOV_INSTRUMENT_NUMBER";

    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private CityService cityService;

    @GetMapping("/dishonoredChequeReport-criteria")
    public String criteria(Model model) {
        // Set default values
        model.addAttribute("fromDate", new Date());
        model.addAttribute("toDate", new Date());
        
        // TODO: Add dropdown data to model
        // addDropdownData("servicetypeList", getPersistenceService().findAllByNamedQuery(CollectionConstants.QUERY_COLLECTION_SERVICS));
        // addDropdownData(CollectionConstants.DROPDOWN_DATA_LOCATION_LIST, collectionsUtil.getAllLocations());
        // addDropdownData("statusList", getPersistenceService().findAllByNamedQuery(CollectionConstants.QUERY_INSTRUMENT_DISHONOR_STATUSES));
        
        Map<String, String> paymentModes = CollectionConstants.INSTRUMENT_MODES_MAP;
        model.addAttribute("paymentModes", paymentModes);
        
        return "reports/dishonoredChequeReport-index";
    }

    @PostMapping("/dishonoredChequeReport-generateReport")
    public void generateReport(@RequestParam(value = "serviceId", required = false) Long serviceId,
                              @RequestParam("fromDate") Date fromDate,
                              @RequestParam("toDate") Date toDate,
                              @RequestParam(value = "paymentMode", required = false) String paymentMode,
                              @RequestParam(value = "statusId", required = false) Integer statusId,
                              @RequestParam(value = "locationId", required = false) Long locationId,
                              @RequestParam(value = "transactionFromDate", required = false) Date transactionFromDate,
                              @RequestParam(value = "transactionToDate", required = false) Date transactionToDate,
                              @RequestParam(value = "fundId", required = false) Long fundId,
                              @RequestParam(value = "userId", required = false) Long userId,
                              @RequestParam(value = "instrumentNumber", required = false) String instrumentNumber,
                              HttpServletResponse response) throws IOException {
        // TODO: Implement report generation logic
        // setReportParam(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        
        response.setContentType("text/html");
        response.getWriter().write("Dishonored Cheque Report - From: " + fromDate + ", To: " + toDate);
    }

    protected String getReportTemplateName() {
        return COLLECTION_DISHONORED_CHEQUE_REPORT;
    }
} 