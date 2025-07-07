package org.egov.egf.web.controller.supplier;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.egov.commons.Accountdetailtype;
import org.egov.commons.CChartOfAccountDetail;
import org.egov.commons.CChartOfAccounts;
import org.egov.egf.masters.model.EgBillPayeedetails;
import org.egov.egf.masters.model.EgBilldetails;
import org.egov.egf.masters.model.EgBillregister;
import org.egov.egf.masters.model.PurchaseOrder;
import org.egov.egf.masters.service.AccountdetailtypeService;
import org.egov.egf.masters.service.PurchaseOrderService;
import org.egov.egf.masters.service.SupplierBillService;
import org.egov.egf.utils.ApplicationThreadLocals;
import org.egov.egf.utils.CommonsUtil;
import org.egov.egf.utils.FinancialConstants;
import org.egov.egf.utils.ValidationException;
import org.egov.infra.security.utils.SecurityUtils;
import org.egov.utils.FinancialUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/supplierbill")
public class CreateSupplierBillController {
    private static final String SUPPLIERBILL_FORM = "supplierbill-form";
    private static final String SUPPLIERBILL_VIEW = "supplierbill-view";
    private static final String SUPPLIERBILL_UPDATE = "supplierbill-update";
    private static final String STATE_TYPE = "stateType";
    private static final String SUPPLIER_ID = "supplierId";
    private static final String APPROVAL_COMENT = "approvalComent";
    private static final String APPROVAL_POSITION = "approvalPosition";
    private static final String APPROVAL_DESIGNATION = "approvalDesignation";
    private static final String NET_PAYABLE_ID = "netPayableId";
    private static final String NET_PAYABLE_AMOUNT = "netPayableAmount";
    private static final String DESIGNATION = "designation";
    private static final String INVALID_APPROVER = "invalid.approver";
    private static final String EG_BILLREGISTER = "egBillregister";
    private static final String APPROVER_NAME = "approverName";
    private static final String SUPPLIER = "Supplier";
    private static final String PURCHASE_ORDER = "PurchaseOrder";

    @Autowired
    private SupplierBillService supplierBillService;
    @Autowired
    private PurchaseOrderService purchaseOrderService;
    @Autowired
    private AccountdetailtypeService accountdetailtypeService;
    @Autowired
    private FinancialUtils financialUtils;
    @Autowired
    private CommonsUtil commonsUtil;
    @Autowired
    private SecurityUtils securityUtils;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        // Custom binder logic if needed
    }

    @PostMapping(value = "/create")
    public String create(@Valid @ModelAttribute(EG_BILLREGISTER) final EgBillregister egBillregister,
                        final BindingResult resultBinder, final Model model, final HttpServletRequest request) throws IOException {
        if (FinancialConstants.BUTTONFORWARD.equalsIgnoreCase(request.getParameter("workFlowAction")) && !commonsUtil
                .isValidApprover(egBillregister, Long.valueOf(request.getParameter(APPROVAL_POSITION)))) {
            populateDataOnErrors(egBillregister, model, request);
            model.addAttribute("errorMessage", INVALID_APPROVER);
            return SUPPLIERBILL_FORM;
        }
        egBillregister.setCreatedBy(ApplicationThreadLocals.getUserId());
        if (egBillregister.getExpendituretype() == null || egBillregister.getExpendituretype().isEmpty())
            egBillregister.setExpendituretype(FinancialConstants.STANDARD_EXPENDITURETYPE_PURCHASE);
        // TODO: Implement file upload using Spring MultipartFile instead of Struts2
        List<Object> list = new ArrayList<>();
        // Business logic for bill creation
        // ...
        if (resultBinder.hasErrors()) {
            return populateDataOnErrors(egBillregister, model, request);
        } else {
            // Save logic
            return "redirect:/supplierbill/success";
        }
    }

    @GetMapping(value = "/view/{billId}")
    public String view(@PathVariable("billId") String billId, final Model model, final HttpServletRequest request) {
        // Example: Fetch and populate bill details for view
        EgBillregister egBillregister = supplierBillService.getById(Long.parseLong(billId));
        model.addAttribute(EG_BILLREGISTER, egBillregister);
        return SUPPLIERBILL_VIEW;
    }

    @PostMapping(value = "/search/{mode}")
    public String search(@ModelAttribute EgBillregister egBillregister, Model model) {
        // Example: Prepare search form
        model.addAttribute(EG_BILLREGISTER, egBillregister);
        return SUPPLIERBILL_FORM;
    }

    @PostMapping(value = "/ajaxsearch/{mode}", produces = "text/plain")
    @ResponseBody
    public String ajaxSearch(@Valid @ModelAttribute EgBillregister egBillregister) {
        // Example: Return search results as JSON
        List<EgBillregister> searchResultList = supplierBillService.search(egBillregister);
        return new StringBuilder("{ \"data\":").append(searchResultList.toString()).append("}").toString();
    }

    @PostMapping(value = "/update")
    public String update(@Valid @ModelAttribute(EG_BILLREGISTER) final EgBillregister egBillregister,
                        final BindingResult resultBinder, final Model model, final HttpServletRequest request) throws IOException {
        // Example: Update bill logic
        if (resultBinder.hasErrors()) {
            return populateDataOnErrors(egBillregister, model, request);
        }
        // Save update logic
        return "redirect:/supplierbill/success";
    }

    private String populateDataOnErrors(final EgBillregister egBillregister, final Model model,
                                        final HttpServletRequest request) {
        // Populate model with error data
        return SUPPLIERBILL_FORM;
    }

    // Add any additional business logic or utility methods as needed.
} 