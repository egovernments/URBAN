package com.example.web.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AccountdetailtypeController {

    @GetMapping(value = "/result/{id}/{mode}")
    public String result(@PathVariable("id") Integer id, @PathVariable("mode") String mode, Model model) {
        Accountdetailtype accountdetailtype = accountdetailtypeService.findOne(id);
        model.addAttribute(ACCOUNTDETAILTYPE, accountdetailtype);
        model.addAttribute("mode", mode);
        return ACCOUNTDETAILTYPE_RESULT;
    }

    @PostMapping(value = "/search/{mode}")
    public String search(@ModelAttribute AccountDetailTypeSearchRequest accountDetailTypeSearchRequest, Model model) {
        prepareNewForm(model);
        model.addAttribute(ACCOUNTDETAILTYPE_SEARCH_REQUEST, accountDetailTypeSearchRequest);
        return ACCOUNTDETAILTYPE_SEARCH;
    }

    @PostMapping(value = "/ajaxsearch/{mode}", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String ajaxSearch(@Valid @ModelAttribute AccountDetailTypeSearchRequest accountDetailTypeSearchRequest, @PathVariable("mode") String mode) {
        List<Accountdetailtype> searchResultList = accountdetailtypeService.search(accountDetailTypeSearchRequest, mode);
        return new StringBuilder("{ \"data\":").append(toSearchResultJson(searchResultList)).append("}").toString();
    }
} 