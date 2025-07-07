package com.example.financial.module.system.finance.egov.egf.web.controller.supplier;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/supplier")
public class CreateSupplierController {

    @PostMapping(value = "/search/{mode}")
    public String search(@ModelAttribute SupplierSearchRequest supplierSearchRequest, Model model) {
        prepareNewForm(model);
        model.addAttribute(STR_SUPPLIER_SEARCH_REQUEST, supplierSearchRequest);
        return SEARCH;
    }

    @PostMapping(value = "/ajaxsearch/{mode}", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String ajaxSearch(@Valid @ModelAttribute SupplierSearchRequest supplierSearchRequest) {
        final List<Supplier> searchResultList = supplierService.search(supplierSearchRequest);
        return new StringBuilder("{ \"data\":").append(toSearchResultJson(searchResultList)).append("}").toString();
    }

    @GetMapping(value = "/result/{id}/{mode}")
    public String result(@PathVariable("id") Long id, @PathVariable("mode") String mode, Model model) {
        final Supplier supplier = supplierService.getById(id);
        model.addAttribute(STR_SUPPLIER, supplier);
        model.addAttribute("mode", mode);
        return RESULT;
    }
} 