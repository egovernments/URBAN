package com.example.web.controller.report;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequestMapping("/report")
public class RemittanceReportController {

    @SuppressWarnings("rawtypes")
    @GetMapping(value = "/service/{accountNumber}")
    public @ResponseBody ResponseEntity getServiceByAccountNumber(
        @PathVariable("accountNumber") String accountNumber
    ) {
        try {
            List<BankAccountServiceMapping> bankAcntServiceMappings = microserviceUtils
                    .getBankAcntServiceMappings(accountNumber, null);
            return new ResponseEntity<>(bankAcntServiceMappings, HttpStatus.OK);
        } catch (HttpClientErrorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
} 