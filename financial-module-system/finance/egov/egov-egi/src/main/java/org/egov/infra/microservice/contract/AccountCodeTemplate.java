package org.egov.infra.microservice.contract;

import java.util.List;

import org.egov.infra.microservice.models.ChartOfAccounts;

public class AccountCodeTemplate {

    private int id;
    private String code;
    private String name;
    private String description;
    private String module;
    private String subModule;
    private String subledgerType;
    private List<ChartOfAccounts> debitCodeDetails;
    private List<ChartOfAccounts> creditCodeDetails;
    private ChartOfAccounts netPayable;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public String getSubModule() { return subModule; }
    public void setSubModule(String subModule) { this.subModule = subModule; }

    public String getSubledgerType() { return subledgerType; }
    public void setSubledgerType(String subledgerType) { this.subledgerType = subledgerType; }

    public List<ChartOfAccounts> getDebitCodeDetails() { return debitCodeDetails; }
    public void setDebitCodeDetails(List<ChartOfAccounts> debitCodeDetails) { this.debitCodeDetails = debitCodeDetails; }

    public List<ChartOfAccounts> getCreditCodeDetails() { return creditCodeDetails; }
    public void setCreditCodeDetails(List<ChartOfAccounts> creditCodeDetails) { this.creditCodeDetails = creditCodeDetails; }

    public ChartOfAccounts getNetPayable() { return netPayable; }
    public void setNetPayable(ChartOfAccounts netPayable) { this.netPayable = netPayable; }
}
