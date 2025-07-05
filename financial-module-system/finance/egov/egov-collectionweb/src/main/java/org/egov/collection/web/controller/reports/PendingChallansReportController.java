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
import org.egov.infra.admin.master.entity.Department;
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

/**
 * Controller for pending challans report
 */
@Controller
@RequestMapping("/reports")
public class PendingChallansReportController {
    
    // Report parameter names
    private static final String EGOV_DEPT_ID = "EGOV_DEPT_ID";
    private static final String EGOV_FROM_DATE = "EGOV_FROM_DATE";
    private static final String EGOV_TO_DATE = "EGOV_TO_DATE";
    private static final String EGOV_CHALLAN_SERVICE_ID = "EGOV_CHALLAN_SERVICE_ID";

    @Autowired
    private CollectionsUtil collectionsUtil;

    @GetMapping("/pendingChallansReport-criteria")
    public String criteria(Model model) {
        // Setup drop down data for department list
        // TODO: Add department dropdown data to model
        // addRelatedEntity("department", Department.class, "deptName");
        
        // Add dropdown data for challan services (serviceList)
        // TODO: Add service list to model
        // addDropdownData(CollectionConstants.DROPDOWN_DATA_SERVICE_LIST, collectionsUtil.getChallanServiceList());

        // Set default values of criteria fields
        final Department dept = collectionsUtil.getDepartmentOfLoggedInUser();
        if (dept != null) {
            model.addAttribute("deptId", dept.getId());
        }

        // default value for from/to date = today
        model.addAttribute("fromDate", new Date());
        model.addAttribute("toDate", new Date());

        return "reports/pendingChallansReport-index";
    }

    @PostMapping("/pendingChallansReport-report")
    public void report(@RequestParam("deptId") Integer deptId,
                      @RequestParam("fromDate") Date fromDate,
                      @RequestParam("toDate") Date toDate,
                      @RequestParam(value = "challanServiceId", required = false) Long challanServiceId,
                      HttpServletResponse response) throws IOException {
        // TODO: Implement report generation logic
        response.setContentType("text/html");
        response.getWriter().write("Pending Challans Report - Department ID: " + deptId + 
                                 ", From: " + fromDate + ", To: " + toDate + 
                                 ", Service ID: " + challanServiceId);
    }

    protected String getReportTemplateName() {
        return CollectionConstants.REPORT_TEMPLATE_PENDING_CHALLANS;
    }
} 