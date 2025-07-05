package org.egov.egf.web.controller.masters;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.egov.commons.Accountdetailtype;
import org.egov.commons.CChartOfAccountDetail;
import org.egov.commons.CChartOfAccounts;
import org.egov.commons.EgfAccountcodePurpose;
import org.egov.commons.dao.ChartOfAccountsHibernateDAO;
import org.egov.commons.service.AccountdetailtypeService;
import org.egov.infra.admin.master.entity.AppConfigValues;
import org.egov.infra.admin.master.service.AppConfigValueService;
import org.egov.infra.utils.DateUtils;
import org.egov.infra.validation.exception.ValidationError;
import org.egov.infra.validation.exception.ValidationException;
import org.egov.infstr.services.PersistenceService;
import org.egov.model.masters.AccountCodePurpose;
import org.egov.services.voucher.GeneralLedgerService;
import org.egov.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.exilant.GLEngine.ChartOfAccounts;
import com.exilant.GLEngine.CoaCache;

@Controller
@RequestMapping("/masters/chartOfAccounts")
public class ChartOfAccountsController {
    
    private static final Logger LOGGER = Logger.getLogger(ChartOfAccountsController.class);
    private static final long LONG_FOUR = 4l;
    private static final long LONG_TWO = 2l;
   
    @Autowired
    @Qualifier("persistenceService")
    private PersistenceService persistenceService;
    
    @Autowired
    @Qualifier("chartOfAccountsService")
    private PersistenceService<CChartOfAccounts, Long> chartOfAccountsService;
    
    @Autowired
    @Qualifier("chartOfAccountDetailService")
    private PersistenceService<CChartOfAccountDetail, Long> chartOfAccountDetailService;
    
    @Autowired
    AppConfigValueService appConfigValuesService;
    
    @Autowired
    private ChartOfAccounts chartOfAccounts;
    
    @Autowired
    private CoaCache coaCache;
    
    @Autowired
    private ChartOfAccountsHibernateDAO chartOfAccountsHibernateDAO;
    
    @Autowired
    private GeneralLedgerService generalLedgerService;
    
    @Autowired
    private AccountdetailtypeService accountdetailtypeService;

    private final Map<String, Object> dropdownData = new HashMap<>();
    private List<Accountdetailtype> mappedAccountDetailTypeList = new ArrayList<>();
    private boolean activeForPosting = false;
    private boolean functionRequired = false;
    private boolean budgetCheckRequired = false;
    private Long coaId;
    private Long parentId;
    private String glCode = "";
    private List<CChartOfAccounts> allChartOfAccounts;
    private int majorCodeLength = 0;
    private int minorCodeLength = 0;
    private int subMinorCodeLength = 0;
    private int detailedCodeLength = 0;
    private EgfAccountcodePurpose accountcodePurpose;
    private String generatedGlcode;
    private String newGlcode;
    private String parentForDetailedCode = "";
    private final Map<Long, Integer> glCodeLengths = new HashMap<Long, Integer>();
    private boolean updateOnly = false;

    @ModelAttribute
    public void populateDropdownData() {
        populateChartOfAccounts();
        populateCodeLength();
        parentForDetailedCode = getAppConfigValueFor("EGF", "parent_for_detailcode");
        populateGlCodeLengths();
        allChartOfAccounts = chartOfAccountsService.findAllBy("from CChartOfAccounts where classification=?",
                Long.valueOf(parentForDetailedCode));
        if (accountcodePurpose != null && accountcodePurpose.getId() != null)
            accountcodePurpose = getPurposeCode(Integer.valueOf(accountcodePurpose.getId()));
        dropdownData.put("purposeList", persistenceService.findAllBy("from EgfAccountcodePurpose order by name"));
        dropdownData.put("accountDetailTypeList", accountdetailtypeService.findAll());
    }

    @GetMapping("/view")
    public String view(@RequestParam(required = false) Long id, Model model) {
        if (id != null) {
            CChartOfAccounts coa = chartOfAccountsService.findById(id, false);
            model.addAttribute("chartOfAccounts", coa);
        }
        model.addAttribute("dropdownData", dropdownData);
        return "chartOfAccounts-view";
    }

    @GetMapping("/viewChartOfAccounts")
    public String viewChartOfAccounts(Model model) {
        model.addAttribute("dropdownData", dropdownData);
        return "chartOfAccounts-viewCoa";
    }

    @GetMapping("/modifyChartOfAccounts")
    public String modifyChartOfAccounts(Model model) {
        model.addAttribute("dropdownData", dropdownData);
        return "chartOfAccounts-viewModifyCoa";
    }

    @GetMapping("/edit")
    public String edit(@RequestParam Long id, Model model) {
        CChartOfAccounts coa = chartOfAccountsService.findById(id, false);
        model.addAttribute("chartOfAccounts", coa);
        model.addAttribute("dropdownData", dropdownData);
        return "chartOfAccounts-edit";
    }

    @PostMapping("/update")
    public String update(@ModelAttribute CChartOfAccounts chartOfAccounts, RedirectAttributes redirectAttributes) {
        try {
            // Implementation for update logic
            chartOfAccountsService.update(chartOfAccounts);
            redirectAttributes.addFlashAttribute("message", "Chart of Accounts updated successfully");
            return "redirect:/masters/chartOfAccounts/view?id=" + chartOfAccounts.getId();
        } catch (Exception e) {
            LOGGER.error("Error updating Chart of Accounts", e);
            redirectAttributes.addFlashAttribute("error", "Error updating Chart of Accounts");
            return "redirect:/masters/chartOfAccounts/edit?id=" + chartOfAccounts.getId();
        }
    }

    @GetMapping("/new")
    public String newForm(Model model) {
        model.addAttribute("chartOfAccounts", new CChartOfAccounts());
        model.addAttribute("dropdownData", dropdownData);
        return "chartOfAccounts-new";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute CChartOfAccounts chartOfAccounts, RedirectAttributes redirectAttributes) {
        try {
            // Implementation for save logic
            chartOfAccountsService.persist(chartOfAccounts);
            redirectAttributes.addFlashAttribute("message", "Chart of Accounts saved successfully");
            return "redirect:/masters/chartOfAccounts/view?id=" + chartOfAccounts.getId();
        } catch (Exception e) {
            LOGGER.error("Error saving Chart of Accounts", e);
            redirectAttributes.addFlashAttribute("error", "Error saving Chart of Accounts");
            return "redirect:/masters/chartOfAccounts/new";
        }
    }

    @GetMapping("/search")
    public String search(Model model) {
        model.addAttribute("dropdownData", dropdownData);
        return "chartOfAccounts-search";
    }

    @GetMapping("/ajaxNextGlCode")
    @ResponseBody
    public String ajaxNextGlCode(@RequestParam Long parentId) {
        try {
            CChartOfAccounts parentCoa = chartOfAccountsService.findById(parentId, false);
            Long nextGlCode = findNextGlCode(parentCoa);
            return nextGlCode.toString();
        } catch (Exception e) {
            LOGGER.error("Error generating next GL code", e);
            return "";
        }
    }

    // Helper methods
    private void populateChartOfAccounts() {
        // Implementation for populating chart of accounts
    }

    private void populateCodeLength() {
        // Implementation for populating code length
    }

    private void populateGlCodeLengths() {
        // Implementation for populating GL code lengths
    }

    private EgfAccountcodePurpose getPurposeCode(final Integer id) {
        return (EgfAccountcodePurpose) persistenceService.find("from EgfAccountcodePurpose where id=?", id);
    }

    private Long findNextGlCode(final CChartOfAccounts parentCoa) {
        // Implementation for finding next GL code
        return 1L; // Placeholder
    }

    private String getAppConfigValueFor(final String module, final String key) {
        List<AppConfigValues> values = appConfigValuesService.getConfigValuesByModuleAndKey(module, key);
        return (values != null && !values.isEmpty()) ? values.get(0).getValue() : null;
    }

    // Getters and setters
    public boolean isActiveForPosting() {
        return activeForPosting;
    }

    public void setActiveForPosting(boolean activeForPosting) {
        this.activeForPosting = activeForPosting;
    }

    public boolean isFunctionRequired() {
        return functionRequired;
    }

    public void setFunctionRequired(boolean functionRequired) {
        this.functionRequired = functionRequired;
    }

    public boolean isBudgetCheckRequired() {
        return budgetCheckRequired;
    }

    public void setBudgetCheckRequired(boolean budgetCheckRequired) {
        this.budgetCheckRequired = budgetCheckRequired;
    }

    public Long getCoaId() {
        return coaId;
    }

    public void setCoaId(Long coaId) {
        this.coaId = coaId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getGlCode() {
        return glCode;
    }

    public void setGlCode(String glCode) {
        this.glCode = glCode;
    }

    public List<CChartOfAccounts> getAllChartOfAccounts() {
        return allChartOfAccounts;
    }

    public void setAllChartOfAccounts(List<CChartOfAccounts> allChartOfAccounts) {
        this.allChartOfAccounts = allChartOfAccounts;
    }

    public EgfAccountcodePurpose getAccountcodePurpose() {
        return accountcodePurpose;
    }

    public void setAccountcodePurpose(EgfAccountcodePurpose accountcodePurpose) {
        this.accountcodePurpose = accountcodePurpose;
    }

    public String getGeneratedGlcode() {
        return generatedGlcode;
    }

    public void setGeneratedGlcode(String generatedGlcode) {
        this.generatedGlcode = generatedGlcode;
    }

    public String getNewGlcode() {
        return newGlcode;
    }

    public void setNewGlcode(String newGlcode) {
        this.newGlcode = newGlcode;
    }

    public Map<Long, Integer> getGlCodeLengths() {
        return glCodeLengths;
    }

    public List<Accountdetailtype> getMappedAccountDetailTypeList() {
        return mappedAccountDetailTypeList;
    }

    public void setMappedAccountDetailTypeList(List<Accountdetailtype> mappedAccountDetailTypeList) {
        this.mappedAccountDetailTypeList = mappedAccountDetailTypeList;
    }
} 