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

package org.egov.collection.web.controller.service;

import org.apache.log4j.Logger;
import org.egov.collection.constants.CollectionConstants;
import org.egov.collection.entity.BranchUserMap;
import org.egov.commons.Bankbranch;
import org.egov.commons.dao.BankBranchHibernateDAO;
import org.egov.commons.dao.BankHibernateDAO;
import org.egov.infra.admin.master.entity.User;
import org.egov.infra.admin.master.service.UserService;
import org.egov.infstr.services.PersistenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
@RequestMapping("/service")
public class BranchUserMapController {
    
    private static final Logger LOGGER = Logger.getLogger(BranchUserMapController.class);
    private static final String BANK_BRANCH_LIST = "bankBranchList";
    private static final String BANK_NAME_LIST = "bankNameList";
    private static final String BANK_COLLECTION_OPERATOR_USER_LIST = "bankCollectionOperatorUserList";
    
    private BranchUserMap branchUserMap = new BranchUserMap();
    private List<Bankbranch> bankBranchArrayList = new ArrayList<Bankbranch>(0);
    private List<BranchUserMap> branchUserList = null;
    private Integer bankId;
    private Integer branchId;
    private Long userId;
    private Boolean isActive = Boolean.FALSE;

    @Autowired
    private BankHibernateDAO bankHibernateDAO;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private BankBranchHibernateDAO bankBranchHibernateDAO;
    
    @Autowired
    private PersistenceService<BranchUserMap, Long> branchUserMapService;
    
    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/branchUserMap-newform")
    public String newform(Model model) {
        // TODO: Add bank name list to model
        // addDropdownData(BANK_NAME_LIST, bankHibernateDAO.getAllBankHavingBranchAndAccounts());
        
        model.addAttribute("bankBranchList", Collections.emptyList());
        
        // TODO: Add bank collection operator user list to model
        // addDropdownData(BANK_COLLECTION_OPERATOR_USER_LIST, getBankCollectionOperator());
        
        return "service/branchUserMap-new";
    }

    private List<User> getBankCollectionOperator() {
        List<User> bankCollOpUserList = new ArrayList<User>(
                userService.getUsersByRoleName(CollectionConstants.BANK_COLLECTION_OPERATOR));
        final Query query = entityManager.createNamedQuery(CollectionConstants.QUERY_ACTIVE_BRANCHUSER, User.class);
        List<User> userMapToBranchList = query.getResultList();
        if (!userMapToBranchList.isEmpty())
            bankCollOpUserList.removeAll(userMapToBranchList);
        if (bankCollOpUserList.isEmpty())
            return Collections.emptyList();
        else
            return bankCollOpUserList;
    }

    @PostMapping("/branchUserMap-bankBranchsByBankForReceiptPayments")
    @ResponseBody
    public List<Bankbranch> bankBranchsByBankForReceiptPayments(@RequestParam("bankId") Integer bankId) {
        return bankBranchHibernateDAO.getAllBankBranchsByBankForReceiptPayments(bankId);
    }

    @PostMapping("/branchUserMap-create")
    public String create(@RequestParam(value = "branchId", required = false) Integer branchId,
                        @RequestParam(value = "userId", required = false) Long userId,
                        @RequestParam(value = "isActive", required = false) Boolean isActive,
                        Model model) {
        if (LOGGER.isDebugEnabled())
            LOGGER.debug("Inside create");
        
        if (branchId != null && userId != null) {
            branchUserMap.setBankbranch(bankBranchHibernateDAO.findById(branchId, Boolean.FALSE));
            branchUserMap.setIsActive(isActive != null ? isActive : Boolean.FALSE);
            branchUserMap.setBankuser(userService.getUserById(userId));
            branchUserMapService.persist(branchUserMap);
            
            // TODO: Add success message to model
            // addActionMessage(getText("branchuser.master.success", new String[] {
            //     branchUserMap.getBankuser().getUsername(),
            //     branchUserMap.getBankbranch().getBranchname() }));
        }
        
        if (LOGGER.isDebugEnabled())
            LOGGER.debug("end create");
        
        return "service/branchUserMap-success";
    }

    // Getters and setters
    public Integer getBankId() {
        return bankId;
    }

    public void setBankId(final Integer bankId) {
        this.bankId = bankId;
    }

    public List getBankBranchArrayList() {
        return bankBranchArrayList;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<BranchUserMap> getBranchUserList() {
        return branchUserList;
    }
} 