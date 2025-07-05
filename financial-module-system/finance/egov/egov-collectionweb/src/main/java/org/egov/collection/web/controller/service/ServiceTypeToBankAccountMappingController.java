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

import org.apache.commons.lang.StringUtils;
import org.egov.commons.Bank;
import org.egov.commons.Bankaccount;
import org.egov.commons.dao.BankBranchHibernateDAO;
import org.egov.commons.dao.BankHibernateDAO;
import org.egov.commons.dao.BankaccountHibernateDAO;
import org.egov.commons.entity.BankAccountServiceMap;
import org.egov.infra.microservice.models.BankAccountServiceMapping;
import org.egov.infra.microservice.models.BusinessDetails;
import org.egov.infra.microservice.models.BusinessService;
import org.egov.infstr.models.ServiceDetails;
import org.egov.infstr.services.PersistenceService;
import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Controller for service type to bank account mapping
 */
@Controller
@RequestMapping("/service")
public class ServiceTypeToBankAccountMappingController {

    private static final String BANK_BRANCH_LIST = "bankBranchList";
    private static final String BANK_NAME_LIST = "bankNameList";
    private static final String BANK_ACCOUNT_LIST = "bankAccountIdList";

    @Autowired
    private PersistenceService<BankAccountServiceMap, Long> bankAccountMappingService;
    
    @Autowired
    private BankHibernateDAO bankHibernateDAO;
    
    @Autowired
    private BankBranchHibernateDAO bankBrankHibernateDAO;
    
    @Autowired
    private BankaccountHibernateDAO bankAccountHibernateDAO;

    private List<BankAccountServiceMap> bankAccountServices = new ArrayList<>();
    private List<BankAccountServiceMapping> mappings = new ArrayList<>();
    private Integer bankId;
    private Integer branchId;
    private String serviceCategory;
    private String serviceTypeCode;
    private Long serviceAccountId;
    private String sourcePage;
    private String target;
    private Integer fundId;
    Map<String,String> serviceCategoryNames = new HashMap<String,String>();
    Map<String,Map<String,String>> serviceTypeMap = new HashMap<>();

    @GetMapping("/serviceTypeToBankAccountMapping-newform")
    public String newform(@RequestParam(value = "serviceAccountId", required = false) Long serviceAccountId,
                         Model model) {
        if (serviceAccountId != null) {
            populateListsForView(model);
            setupDropdownDataExcluding(model);
            BankAccountServiceMap bankAccountServiceMap = bankAccountMappingService.findById(serviceAccountId, false);
            model.addAttribute(
                    BANK_BRANCH_LIST,
                    bankBrankHibernateDAO.getAllBankBranchsByBank(bankAccountServiceMap.getBankAccountId()
                            .getBankbranch().getBank().getId()));
            model.addAttribute(
                    BANK_ACCOUNT_LIST,
                    bankAccountHibernateDAO.getBankAccountByBankBranchForReceiptsPayments(bankAccountServiceMap
                            .getBankAccountId().getBankbranch().getId(), bankAccountServiceMap.getServiceDetails()
                                    .getFund().getId()));
            setServiceCategory(bankAccountServiceMap.getServiceDetails().getServiceCategory().getCode());
            setBankId(bankAccountServiceMap.getBankAccountId().getBankbranch().getBank().getId());
            setBranchId(bankAccountServiceMap.getBankAccountId().getBankbranch().getId());
        } else
            populateLists(model);
        return "service/serviceTypeToBankAccountMapping-new";
    }

    private void populateLists(Model model) {
        this.getServiceCategoryList();
        model.addAttribute(BANK_NAME_LIST, bankHibernateDAO.getAllBankHavingBranchAndAccounts());
        model.addAttribute(BANK_BRANCH_LIST, Collections.emptyList());
        model.addAttribute(BANK_ACCOUNT_LIST, Collections.emptyList());
    }

    private void populateListsForView(Model model) {
        this.getServiceCategoryList();
        if (serviceCategory != null && !serviceCategory.isEmpty() && !serviceCategory.equalsIgnoreCase("-1")){
            // TODO: Set service type code if needed
        }
        if (sourcePage != null && "modify".equals(sourcePage))
            model.addAttribute(BANK_NAME_LIST, bankHibernateDAO.getAllBankHavingBranchAndAccounts());
        else
            model.addAttribute(BANK_NAME_LIST, getBankMappedToService());
        model.addAttribute(
                BANK_BRANCH_LIST,
                bankId != null && bankId != -1 ? bankBrankHibernateDAO
                        .getAllBankBranchsByBankForReceiptPayments(bankId) : Collections.emptyList());
        model.addAttribute(
                BANK_ACCOUNT_LIST, getBankAccountMappedToService());
    }

    @SuppressWarnings("unchecked")
    private List<Bank> getBankMappedToService() {
        // TODO: Implement microservice call
        List<BankAccountServiceMapping> mappings = new ArrayList<>(); // microserviceUtils.getBankAcntServiceMappings();
        List<String> accountNumbers = new ArrayList<String>();
        for (BankAccountServiceMapping basm : mappings) {
            accountNumbers.add(basm.getBankAccount());
        }
        final StringBuilder serviceBankQueryString = new StringBuilder(
                "select distinct ba.bankbranch.bank from Bankaccount ba where ba.accountnumber in(:accountnumbers))");

        final Query bankListQuery = bankAccountMappingService.getSession().createQuery(serviceBankQueryString.toString());
        if(!accountNumbers.isEmpty()){
            bankListQuery.setParameterList("accountnumbers", accountNumbers);
        }
        return bankListQuery.list();
    }

    @SuppressWarnings("unchecked")
    private List<Bankaccount> getBankAccountMappedToService() {
        // TODO: Implement microservice call
        List<BankAccountServiceMapping> mappings = new ArrayList<>(); // microserviceUtils.getBankAcntServiceMappings();
        List<String> accountNumbers = new ArrayList<String>();
        if(!mappings.isEmpty()){
            for (BankAccountServiceMapping basm : mappings) {
                accountNumbers.add(basm.getBankAccount());
            }
        }
        final StringBuilder serviceBankQueryString = new StringBuilder(
                "select distinct ba from Bankaccount ba where ba.accountnumber in(:accountnumbers))");

        final Query bankAccListQuery = bankAccountMappingService.getSession().createQuery(serviceBankQueryString.toString());
        bankAccListQuery.setParameterList("accountnumbers", accountNumbers);
        return bankAccListQuery.list();
    }

    @GetMapping("/serviceTypeToBankAccountMapping-list")
    public String list(Model model) {
        // TODO: Implement list functionality
        return "service/serviceTypeToBankAccountMapping-list";
    }

    @PostMapping("/serviceTypeToBankAccountMapping-search")
    public String search(@RequestParam(value = "serviceCategory", required = false) String serviceCategory,
                        @RequestParam(value = "serviceTypeCode", required = false) String serviceTypeCode,
                        Model model) {
        // TODO: Implement search functionality
        return "service/serviceTypeToBankAccountMapping-list";
    }

    @PostMapping("/serviceTypeToBankAccountMapping-create")
    public String create(@RequestParam(value = "serviceCategory", required = false) String serviceCategory,
                        @RequestParam(value = "serviceTypeCode", required = false) String serviceTypeCode,
                        @RequestParam(value = "bankId", required = false) Integer bankId,
                        @RequestParam(value = "branchId", required = false) Integer branchId,
                        @RequestParam(value = "serviceAccountId", required = false) Long serviceAccountId,
                        Model model) {
        // TODO: Implement create functionality
        return "service/serviceTypeToBankAccountMapping-success";
    }

    private void getServiceCategoryList() {
        // TODO: Implement service category list population
    }

    private void setupDropdownDataExcluding(Model model) {
        // TODO: Implement dropdown data setup
    }

    // Getters and setters
    public List<BankAccountServiceMap> getBankAccountServices() {
        return bankAccountServices;
    }

    public void setBankAccountServices(final List<BankAccountServiceMap> bankAccountServices) {
        this.bankAccountServices = bankAccountServices;
    }

    public Integer getBankId() {
        return bankId;
    }

    public void setBankId(final Integer bankId) {
        this.bankId = bankId;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(final Integer branchId) {
        this.branchId = branchId;
    }

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(final String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public Long getServiceAccountId() {
        return serviceAccountId;
    }

    public void setServiceAccountId(final Long serviceAccountId) {
        this.serviceAccountId = serviceAccountId;
    }

    public String getSourcePage() {
        return sourcePage;
    }

    public void setSourcePage(final String sourcePage) {
        this.sourcePage = sourcePage;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(final String target) {
        this.target = target;
    }

    public List<BankAccountServiceMapping> getMappings() {
        return mappings;
    }

    public void setMappings(List<BankAccountServiceMapping> mappings) {
        this.mappings = mappings;
    }

    public Map<String, String> getServiceCategoryNames() {
        return serviceCategoryNames;
    }

    public void setServiceCategoryNames(Map<String, String> serviceCategoryNames) {
        this.serviceCategoryNames = serviceCategoryNames;
    }

    public Map<String, Map<String, String>> getServiceTypeMap() {
        return serviceTypeMap;
    }

    public void setServiceTypeMap(Map<String, Map<String, String>> serviceTypeMap) {
        this.serviceTypeMap = serviceTypeMap;
    }

    public String getServiceTypeCode() {
        return serviceTypeCode;
    }

    public void setServiceTypeCode(String serviceTypeCode) {
        this.serviceTypeCode = serviceTypeCode;
    }
} 