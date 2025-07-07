package com.example.financialmodule.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class FundController {

    @GetMapping(value = "/result/{id}/{mode}")
    public String result(@PathVariable("id") final Long id, @PathVariable("mode") final String mode, final Model model) {
        final Fund fund = fundService.findOne(id);
        model.addAttribute("fund", fund);
        model.addAttribute("mode", mode);
        return FUND_RESULT;
    }

    @PostMapping(value = "/search/{mode}")
    public String search(@ModelAttribute FundSearchRequest fundSearchRequest, final Model model) {
        prepareNewForm(model);
        model.addAttribute("fundSearchRequest", fundSearchRequest);
        return FUND_SEARCH;
    }

    @PostMapping(value = "/ajaxsearch/{mode}", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String ajaxSearch(@Valid @ModelAttribute FundSearchRequest fundSearchRequest) {
        final List<Fund> searchResultList = fundService.search(fundSearchRequest);
        return new StringBuilder("{ \"data\":").append(toSearchResultJson(searchResultList)).append("}").toString();
    }
} 