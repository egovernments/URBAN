package org.egov.egf.web.controller.report;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.egov.commons.Fund;
import org.egov.infra.reporting.engine.ReportFormat;
import org.egov.infra.reporting.engine.ReportOutput;
import org.egov.infra.reporting.engine.ReportRequest;
import org.egov.infra.reporting.engine.ReportService;
import org.egov.infra.reporting.util.ReportUtil;
import org.egov.infra.validation.exception.ValidationError;
import org.egov.infra.validation.exception.ValidationException;
import org.egov.infstr.services.PersistenceService;
import org.egov.infstr.utils.EgovMasterDataCaching;
import org.egov.model.report.FundFlowBean;
import org.egov.services.report.FundFlowService;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.LongType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/report/fundFlow")
public class FundFlowController {
    
    private static Logger LOGGER = Logger.getLogger(FundFlowController.class);
    private static final String NEW = "new";
    private static final String EDIT = "edit";
    
    private List<FundFlowBean> receiptList;
    private List<FundFlowBean> concurrancePaymentList;
    private List<FundFlowBean> outStandingPaymentList;
    private List<FundFlowBean> paymentList;
    private Long fund;
    private Date asOnDate;
    private List<FundFlowBean> total;
    private List<FundFlowBean> totalrepList = new ArrayList<FundFlowBean>();
    private List<FundFlowBean> totalpayList = new ArrayList<FundFlowBean>();
    private final String jasperpath = "FundFlowReport";
    private InputStream inputStream;
    private ReportService reportService;
    SimpleDateFormat sqlformat = new SimpleDateFormat("dd-MMM-yyyy");
    Date openignBalanceCalculatedDate;
    private FundFlowService fundFlowService;
    private String mode;
    private ReportOutput reportOutput;
   
    @Autowired
    @Qualifier("persistenceService")
    private PersistenceService persistenceService;
    
    @Autowired
    private EgovMasterDataCaching masterDataCache;
    
    @Autowired
    private ReportService reportServiceBean;

    @ModelAttribute
    public void populateDropdownData(Model model) {
        model.addAttribute("fundList", masterDataCache.get("egi-fund"));
    }

    @GetMapping("/beforeSearch")
    public String beforeSearch(Model model) {
        loadDefalutDates();
        return "fundFlow-" + NEW;
    }

    @PostMapping("/search")
    public String search(@RequestParam(required = false) Long fund, 
                        @RequestParam Date asOnDate, 
                        Model model, 
                        RedirectAttributes redirectAttributes) {
        try {
            this.fund = fund;
            this.asOnDate = asOnDate;
            
            final StringBuffer alreadyExistsQryStr = new StringBuffer(100);
            alreadyExistsQryStr.append("select openingBalance")
                    .append(" From egf_fundflow ff,bankaccount ba")
                    .append(" where ba.id=ff.bankaccountid and to_date(reportdate)=:reportDate");
            
            if (fund != null && fund != -1)
                alreadyExistsQryStr.append(" and ba.fundId=:fund ");
            
            final Query alreadyExistsQry = persistenceService.getSession()
                    .createSQLQuery(alreadyExistsQryStr.toString())
                    .setParameter("reportDate", sqlformat.format(asOnDate), StringType.INSTANCE);
            if (fund != null && fund != -1){
                alreadyExistsQry.setParameter("fund", fund, LongType.INSTANCE);
            }
            final List existsList = alreadyExistsQry.list();
            if (existsList.size() > 0) {
                paymentList = null;
                receiptList = null;
                throw new ValidationException(
                        Arrays
                        .asList(new ValidationError(
                                "fundflow.report.already.generated",
                                "Fund Flow report is already Generated for the Date and Fund. Open in modify Mode")));
            }

            receiptList = fundFlowService.getAllReceiptAccounts(fund);
            final List<FundFlowBean> btbPaymentList = fundFlowService
                    .getContraPaymentsForTheDay(asOnDate, fund);
            
            for (final FundFlowBean fall : receiptList)
                for (final FundFlowBean ftemp : btbPaymentList)
                    if (fall.getAccountNumber().equalsIgnoreCase(ftemp.getAccountNumber()))
                        fall.setBtbPayment(ftemp.getBtbPayment());

            final List<FundFlowBean> btbReceiptList = fundFlowService.getContraReceiptsForTheDay(asOnDate, fund);
            for (final FundFlowBean fall : receiptList)
                for (final FundFlowBean ftemp : btbReceiptList)
                    if (fall.getAccountNumber().equalsIgnoreCase(ftemp.getAccountNumber()))
                        fall.setBtbReceipt(ftemp.getBtbReceipt());

            paymentList = fundFlowService.getAllpaymentAccounts(fund);
            for (final FundFlowBean fall : paymentList)
                for (final FundFlowBean ftemp : btbReceiptList)
                    if (fall.getAccountNumber().equalsIgnoreCase(ftemp.getAccountNumber()))
                        fall.setBtbReceipt(ftemp.getBtbReceipt());

            for (final FundFlowBean fall : paymentList)
                for (final FundFlowBean ftemp : btbPaymentList)
                    if (fall.getAccountNumber().equalsIgnoreCase(ftemp.getAccountNumber()))
                        fall.setBtbPayment(ftemp.getBtbPayment());

            outStandingPaymentList = fundFlowService.getOutStandingPayments(asOnDate, fund);
            for (final FundFlowBean fall : paymentList)
                for (final FundFlowBean ftemp : outStandingPaymentList)
                    if (fall.getAccountNumber().equalsIgnoreCase(ftemp.getAccountNumber()))
                        fall.setOutStandingBPV(ftemp.getOutStandingBPV());

            getPreviousDayClosingBalance();
            updateListsForTotals();
            
            model.addAttribute("receiptList", receiptList);
            model.addAttribute("paymentList", paymentList);
            model.addAttribute("totalrepList", totalrepList);
            model.addAttribute("totalpayList", totalpayList);
            model.addAttribute("fund", fund);
            model.addAttribute("asOnDate", asOnDate);
            
            return "fundFlow-report";
            
        } catch (ValidationException e) {
            redirectAttributes.addFlashAttribute("error", e.getErrors().get(0).getMessage());
            return "redirect:/report/fundFlow/beforeSearch";
        } catch (Exception e) {
            LOGGER.error("Error in fund flow search", e);
            redirectAttributes.addFlashAttribute("error", "Error generating fund flow report");
            return "redirect:/report/fundFlow/beforeSearch";
        }
    }

    @GetMapping("/beforeEditSearch")
    public String beforeEditSearch(Model model) {
        loadDefalutDates();
        return "fundFlow-" + EDIT;
    }

    @PostMapping("/edit")
    public String edit(@RequestParam(required = false) Long fund, 
                      @RequestParam Date asOnDate, 
                      Model model) {
        try {
            this.fund = fund;
            this.asOnDate = asOnDate;
            
            receiptList = getOpeningBalance(asOnDate, fund);
            paymentList = getCurrentDayOpeningBalance(asOnDate, fund);
            
            updateListsForTotals();
            
            model.addAttribute("receiptList", receiptList);
            model.addAttribute("paymentList", paymentList);
            model.addAttribute("totalrepList", totalrepList);
            model.addAttribute("totalpayList", totalpayList);
            model.addAttribute("fund", fund);
            model.addAttribute("asOnDate", asOnDate);
            
            return "fundFlow-report";
            
        } catch (Exception e) {
            LOGGER.error("Error in fund flow edit", e);
            model.addAttribute("error", "Error loading fund flow report");
            return "fundFlow-" + EDIT;
        }
    }

    @GetMapping("/exportPdf")
    @ResponseBody
    public byte[] exportPdf(@RequestParam(required = false) Long fund, 
                           @RequestParam Date asOnDate) {
        try {
            this.fund = fund;
            this.asOnDate = asOnDate;
            generateReport();
            return reportOutput.getReportOutputData();
        } catch (Exception e) {
            LOGGER.error("Error exporting PDF", e);
            return new byte[0];
        }
    }

    @GetMapping("/exportXls")
    @ResponseBody
    public byte[] exportXls(@RequestParam(required = false) Long fund, 
                           @RequestParam Date asOnDate) {
        try {
            this.fund = fund;
            this.asOnDate = asOnDate;
            generateReport();
            return reportOutput.getReportOutputData();
        } catch (Exception e) {
            LOGGER.error("Error exporting XLS", e);
            return new byte[0];
        }
    }

    // Helper methods
    private void loadDefalutDates() {
        if (asOnDate == null) {
            asOnDate = new Date();
        }
    }

    private void getPreviousDayClosingBalance() {
        // Implementation for getting previous day closing balance
    }

    private List<FundFlowBean> getOpeningBalance(final Date asPerDate, final Long fundId) {
        // Implementation for getting opening balance
        return new ArrayList<>();
    }

    private List<FundFlowBean> getCurrentDayOpeningBalance(final Date asOnDate2, final Long fund2) {
        // Implementation for getting current day opening balance
        return new ArrayList<>();
    }

    private void updateListsForTotals() {
        // Implementation for updating lists for totals
    }

    private void generateReport() {
        try {
            final ReportRequest reportRequest = new ReportRequest(jasperpath, getParamMap());
            reportOutput = reportServiceBean.createReport(reportRequest);
            inputStream = new ByteArrayInputStream(reportOutput.getReportOutputData());
        } catch (final Exception e) {
            LOGGER.error("Error generating report", e);
        }
    }

    private Map<String, Object> getParamMap() {
        final Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("ulbName", getUlbName());
        paramMap.put("fundName", fund != null ? fund.toString() : "All Funds");
        paramMap.put("asOnDate", asOnDate);
        return paramMap;
    }

    private String getUlbName() {
        final Query query = persistenceService.getSession()
                .createSQLQuery("select name from eg_city where id=1");
        final List<String> list = query.list();
        return list.get(0);
    }

    // Getters and setters
    public List<FundFlowBean> getReceiptList() {
        return receiptList;
    }

    public void setReceiptList(final List<FundFlowBean> receiptList) {
        this.receiptList = receiptList;
    }

    public List<FundFlowBean> getPaymentList() {
        return paymentList;
    }

    public void setPaymentList(final List<FundFlowBean> paymentList) {
        this.paymentList = paymentList;
    }

    public Long getFund() {
        return fund;
    }

    public void setFund(final Long fund) {
        this.fund = fund;
    }

    public Date getAsOnDate() {
        return asOnDate;
    }

    public void setAsOnDate(final Date asOnDate) {
        this.asOnDate = asOnDate;
    }

    public List<FundFlowBean> getTotal() {
        return total;
    }

    public void setTotal(final List<FundFlowBean> total) {
        this.total = total;
    }

    public List<FundFlowBean> getTotalrepList() {
        return totalrepList;
    }

    public void setTotalrepList(final List<FundFlowBean> totalrepList) {
        this.totalrepList = totalrepList;
    }

    public List<FundFlowBean> getTotalpayList() {
        return totalpayList;
    }

    public void setTotalpayList(final List<FundFlowBean> totalpayList) {
        this.totalpayList = totalpayList;
    }

    public List<FundFlowBean> getOutStandingPaymentList() {
        return outStandingPaymentList;
    }

    public void setOutStandingPaymentList(final List<FundFlowBean> outStandingPaymentList) {
        this.outStandingPaymentList = outStandingPaymentList;
    }

    public List<FundFlowBean> getConcurrancePaymentList() {
        return concurrancePaymentList;
    }

    public void setConcurrancePaymentList(final List<FundFlowBean> concurrancePaymentList) {
        this.concurrancePaymentList = concurrancePaymentList;
    }

    public Date getOpenignBalanceCalculatedDate() {
        return openignBalanceCalculatedDate;
    }

    public void setOpenignBalanceCalculatedDate(final Date openignBalanceCalculatedDate) {
        this.openignBalanceCalculatedDate = openignBalanceCalculatedDate;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(final String mode) {
        this.mode = mode;
    }

    public void setFundFlowService(final FundFlowService fundFlowService) {
        this.fundFlowService = fundFlowService;
    }

    public FundFlowService getFundFlowService() {
        return fundFlowService;
    }
} 