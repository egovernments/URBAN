package com.example.web.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/budget-definition")
public class BudgetDefinitionController {

    @RequestMapping(value = "/search/{mode}", method = { RequestMethod.GET, RequestMethod.POST })
    public String search(@ModelAttribute BudgetDefinitionSearchRequest budgetDefinitionSearchRequest, Model model) {
        prepareNewForm(model);
        model.addAttribute(BUDGET_DEFINITION_SEARCH_REQUEST, budgetDefinitionSearchRequest);
        return BUDGET_SEARCH;
    }

    @PostMapping(value = "/ajaxsearch/{mode}", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String ajaxSearch(@Valid @ModelAttribute BudgetDefinitionSearchRequest budgetDefinitionSearchRequest) {
        final List<Budget> searchResultList = budgetDefinitionService.search(budgetDefinitionSearchRequest);
        return new StringBuilder("{ \"data\":").append(toSearchResultJson(searchResultList)).append("}").toString();
    }

    @GetMapping(value = "/parents", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String getParents(@RequestParam String isBere, @RequestParam String financialYearId) {
        final List<Budget> budgetList = budgetDefinitionService.parentList(isBere, Long.parseLong(financialYearId));
        return toSearchResultJson(budgetList).toString();
    }

    @GetMapping(value = "/referencebudget", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String getReferenceBudget(@RequestParam String financialYearId) {
        final List<Budget> referenceBudgetList = budgetDefinitionService.referenceBudgetList(Long.parseLong(financialYearId));
        return toSearchResultJson(referenceBudgetList).toString();
    }

    @GetMapping(value = "/ajaxgetdropdownsformodify", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String getDropdownsForModify(@RequestParam String budgetId) {
        final Budget budget = budgetDefinitionService.findOne(Long.parseLong(budgetId));
        return new StringBuilder("{ \"data\":").append(toSearchResultJson(budget)).append("}").toString();
    }
} 