package com.example.financialmodule.web.controller.voucher;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Controller
@RequestMapping("/journalvoucher")
public class CreateJournalVoucherController {

    @PostMapping(value = "/create")
    public String create(
        @Valid @ModelAttribute("voucherHeader") final CVoucherHeader voucherHeader,
        final BindingResult resultBinder,
        final Model model,
        final HttpServletRequest request
    ) {
        voucherHeader.setType(FinancialConstants.STANDARD_VOUCHER_TYPE_JOURNAL);
        voucherHeader.setEffectiveDate(voucherHeader.getVoucherDate());
        populateVoucherName(voucherHeader);
        populateAccountDetails(voucherHeader);
        if (resultBinder.hasErrors()) {
            setDropDownValues(model);
            model.addAttribute(STATE_TYPE, voucherHeader.getClass().getSimpleName());
            prepareWorkflow(model, voucherHeader, new WorkflowContainer());
            prepareValidActionListByCutOffDate(model);
            voucherHeader.setVoucherDate(new Date());
            model.addAttribute(VOUCHER_NUMBER_GENERATION_AUTO, isVoucherNumberGenerationAuto(voucherHeader, model));
            return JOURNALVOUCHER_FORM;
        } else {
            Long approvalPosition = 0l;
            String approvalComment = "";
            String workFlowAction = request.getParameter("workFlowAction");
            if (request.getParameter("approvalComment") != null)
                approvalComment = request.getParameter("approvalComment");
            if (request.getParameter(APPROVAL_POSITION) != null && !request.getParameter(APPROVAL_POSITION).isEmpty())
                approvalPosition = Long.valueOf(request.getParameter(APPROVAL_POSITION));
            CVoucherHeader savedVoucherHeader;
            try {
                savedVoucherHeader = journalVoucherService.create(voucherHeader, approvalPosition, approvalComment, null,
                        workFlowAction);
            } catch (final ValidationException e) {
                setDropDownValues(model);
                model.addAttribute(STATE_TYPE, voucherHeader.getClass().getSimpleName());
                prepareWorkflow(model, voucherHeader, new WorkflowContainer());
                prepareValidActionListByCutOffDate(model);
                voucherHeader.setVoucherDate(new Date());
                model.addAttribute(VOUCHER_NUMBER_GENERATION_AUTO, isVoucherNumberGenerationAuto(voucherHeader, model));
                resultBinder.reject("", e.getErrors().get(0).getMessage());
                return JOURNALVOUCHER_FORM;
            }
            final String approverDetails = financialUtils.getApproverDetails(workFlowAction,
                    savedVoucherHeader.getState(), savedVoucherHeader.getId(), approvalPosition,"");
            return "redirect:/journalvoucher/success?approverDetails=" + approverDetails + "&voucherNumber="
                    + savedVoucherHeader.getVoucherNumber() + "&workFlowAction=" + workFlowAction;
        }
    }

    @GetMapping(value = "/success")
    public String success(
        @RequestParam("approverDetails") String approverDetails,
        @RequestParam("voucherNumber") String voucherNumber,
        @RequestParam("workFlowAction") String workFlowAction,
        final Model model,
        final HttpServletRequest request
    ) {
        final String[] keyNameArray = approverDetails.split(",");
        Long id = 0L;
        String approverName = "";
        String currentUserDesgn = "";
        String nextDesign = "";
        if (keyNameArray.length != 0 && keyNameArray.length > 0) {
            if (keyNameArray.length == 1)
                id = Long.parseLong(keyNameArray[0].trim());
            else if (keyNameArray.length == 3) {
                id = Long.parseLong(keyNameArray[0].trim());
                approverName = keyNameArray[1];
                currentUserDesgn = keyNameArray[2];
            } else {
                id = Long.parseLong(keyNameArray[0].trim());
                approverName = keyNameArray[1];
                currentUserDesgn = keyNameArray[2];
                nextDesign = keyNameArray[3];
            }
        }
        if (id != null)
            model.addAttribute("approverName", approverName);
        model.addAttribute("currentUserDesgn", currentUserDesgn);
        model.addAttribute("nextDesign", nextDesign);
        final CVoucherHeader voucherHeader = journalVoucherService.getByVoucherNumber(voucherNumber);
        final String message = getMessageByStatus(voucherHeader, approverName, nextDesign, workFlowAction);
        model.addAttribute("message", message);
        return "expensebill-success";
    }
} 