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

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/reports")
public class BankRemittanceReportController {

    private static final String EGOV_DEPT_ID = "EGOV_DEPT_ID";
    private static final String BANK_REMITTANCE_REPORT_TEMPLATE = "bank_remittance";

    @Autowired
    private CollectionsUtil collectionsUtil;
    
    @Autowired
    private CityService cityService;

    @GetMapping("/bankRemittanceReport-criteria")
    public String criteria(Model model) {
        // Setup drop down data for department list
        // TODO: Add department dropdown data to model
        // addRelatedEntity("department", Department.class, "name");
        
        // Set default values of criteria fields
        final Department dept = collectionsUtil.getDepartmentOfLoggedInUser();
        if (dept != null) {
            model.addAttribute("deptId", dept.getId());
        }
        
        return "reports/bankRemittanceReport-index";
    }

    @PostMapping("/bankRemittanceReport-report")
    public void report(@RequestParam("deptId") Integer deptId, 
                      HttpServletResponse response) throws IOException {
        // TODO: Implement report generation logic
        // setReportParam(CollectionConstants.LOGO_PATH, cityService.getCityLogoAsStream());
        // return super.report();
        
        // For now, return a simple response
        response.setContentType("text/html");
        response.getWriter().write("Bank Remittance Report - Department ID: " + deptId);
    }

    protected String getReportTemplateName() {
        return BANK_REMITTANCE_REPORT_TEMPLATE;
    }
} 