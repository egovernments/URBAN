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
package org.egov.eis.web.controller;

import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.egov.infra.microservice.models.Assignment;
import org.egov.infra.microservice.models.Designation;
import org.egov.infra.workflow.matrix.entity.WorkFlowMatrix;
import org.egov.infra.workflow.matrix.service.CustomizedWorkFlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author subhash
 *
 */
@Controller
@RequestMapping("/workflow")
public class AjaxWorkFlowController {

    private static final String SELECT = "----Choose----";
    private static final String WF_DESIGNATIONS = "designations";
    private static final String WF_APPROVERS = "approvers";

    @Autowired
    private CustomizedWorkFlowService customizedWorkFlowService;

    // TODO: Inject microserviceUtils when available
    // @Autowired
    // private MicroserviceUtils microserviceUtils;

    @GetMapping("/ajaxWorkFlow-getPositionByPassingDesigId")
    public String getPositionByPassingDesigId(@RequestParam("designationId") String designationId,
            @RequestParam("approverDepartmentId") String approverDepartmentId, Model model) {
        List<Assignment> approverList = new ArrayList<>();
        if (isNotEmpty(designationId) && !designationId.equalsIgnoreCase("-1") && isNotEmpty(approverDepartmentId)
                && !approverDepartmentId.equalsIgnoreCase("-1")) {
            // approverList = microserviceUtils.getAssignments(approverDepartmentId, designationId);
        }
        model.addAttribute("approverList", approverList);
        return "workflow/ajaxWorkFlow-approvers";
    }

    @GetMapping("/ajaxWorkFlow-getDesignationsByObjectType")
    public String getDesignationsByObjectType(@RequestParam("departmentRule") String departmentRule, Model model) {
        List<Designation> designationList = new ArrayList<>();
        if (!SELECT.equals(departmentRule)) {
            // TODO: Implement proper workflow matrix logic
            // final WorkFlowMatrix wfmatrix = customizedWorkFlowService.getWfMatrix(...);
            // if (wfmatrix.getCurrentDesignation() != null) {
            //     List<String> workflowDesignations = Arrays.asList(wfmatrix.getCurrentDesignation().split(","));
            //     designationList = microserviceUtils.getDesignations().stream()
            //             .filter(desig -> workflowDesignations.contains(desig.getName())).collect(Collectors.toList());
            // }
        }
        model.addAttribute("designationList", designationList);
        return "workflow/ajaxWorkFlow-designations";
    }

    @GetMapping("/ajaxWorkFlow-findDesignationsByObjectType")
    public String findDesignationsByObjectType(@RequestParam("type") String type,
            @RequestParam("departmentRule") String departmentRule, @RequestParam("amountRule") BigDecimal amountRule,
            @RequestParam("additionalRule") String additionalRule, @RequestParam("currentState") String currentState,
            @RequestParam("pendingAction") String pendingAction, @RequestParam(value = "designation", required = false) String designation,
            Model model) {
        List<Designation> designationList = new ArrayList<>();
        List<String> workflowDesignations = new ArrayList<>();
        
        if ("END".equals(currentState))
            currentState = "";
            
        if (isNotEmpty(designation))
            workflowDesignations.addAll(customizedWorkFlowService.getNextDesignations(type, departmentRule, amountRule,
                    additionalRule, currentState, new Date(), designation));
        else
            workflowDesignations.addAll(customizedWorkFlowService.getNextDesignations(type, departmentRule, amountRule,
                    additionalRule, currentState, new Date()));

        // designationList = microserviceUtils.getDesignations().stream()
        //         .filter(desig -> workflowDesignations.contains(desig.getName())).collect(Collectors.toList());

        model.addAttribute("designationList", designationList);
        return "workflow/ajaxWorkFlow-designations";
    }

    @PostMapping("/ajaxWorkFlow-getAjaxValidButtonsAndNextAction")
    @ResponseBody
    public void getAjaxValidButtonsAndNextAction(@RequestParam("type") String type,
            @RequestParam("departmentRule") String departmentRule, @RequestParam("amountRule") BigDecimal amountRule,
            @RequestParam("additionalRule") String additionalRule, @RequestParam("currentState") String currentState,
            @RequestParam("pendingAction") String pendingAction, HttpServletResponse response) throws IOException {
        
        final StringBuilder actionString = new StringBuilder();
        
        if (isBlank(currentState)) {
            actionString.append("Save,Forward");
            actionString.append('@');
            actionString.append("Forward");
        } else {
            actionString.append("Forward");
            actionString.append('@');
            actionString.append("Forward");
        }
        
        response.getWriter().write(actionString.toString());
    }
} 