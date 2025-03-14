package org.egov.bpa.calculator.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.egov.bpa.calculator.config.BPACalculatorConfig;
import org.egov.bpa.calculator.repository.DemandRepository;
import org.egov.bpa.calculator.repository.ServiceRequestRepository;
import org.egov.bpa.calculator.utils.BPACalculatorConstants;
import org.egov.bpa.calculator.utils.CalculationUtils;
import org.egov.bpa.calculator.web.models.Calculation;
import org.egov.bpa.calculator.web.models.RequestInfoWrapper;
import org.egov.bpa.calculator.web.models.bpa.BPA;
import org.egov.bpa.calculator.web.models.demand.Demand;
import org.egov.bpa.calculator.web.models.demand.DemandDetail;
import org.egov.bpa.calculator.web.models.demand.DemandResponse;
import org.egov.bpa.calculator.web.models.demand.TaxHeadEstimate;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class DemandService {

    @Autowired
    private ObjectMapper mapper;
    
    @Autowired
    private MDMSService mdmsService;
    
    @Autowired
    private BPACalculatorConfig config;
    
    @Autowired
    private DemandRepository demandRepository;

    @Autowired
    private CalculationUtils utils;

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private BPAService bpaService;
    
	
    /**
     * Creates or updates Demand
     * @param requestInfo The RequestInfo of the calculation request
     * @param calculations The Calculation Objects for which demand has to be generated or updated
     */
    public void generateDemand(RequestInfo requestInfo,List<Calculation> calculations,Object mdmsData){

        //List that will contain Calculation for new demands
        List<Calculation> createCalculations = new LinkedList<>();

        //List that will contain Calculation for old demands
        List<Calculation> updateCalculations = new LinkedList<>();

        if(!CollectionUtils.isEmpty(calculations)){

            //Collect required parameters for demand search
            String tenantId = calculations.get(0).getTenantId();
            Set<String> applicationNos = calculations.stream().map(calculation -> calculation.getBpa().getApplicationNo()).collect(Collectors.toSet());
//            Set<String> applicationNumbers = calculations.stream().map(calculation -> calculation.getBPA().getApplicationNo()).collect(Collectors.toSet());
            List<Demand> demands = searchDemand(tenantId,applicationNos,requestInfo,calculations.get(0));
            Set<String> applicationNumbersFromDemands = new HashSet<>();
            if(!CollectionUtils.isEmpty(demands))
                applicationNumbersFromDemands = demands.stream().map(Demand::getConsumerCode).collect(Collectors.toSet());

            //If demand already exists add it updateCalculations else createCalculations
            for(Calculation calculation : calculations)
            {      if(!applicationNumbersFromDemands.contains(calculation.getBpa().getApplicationNo()))
                        createCalculations.add(calculation);
                    else
                        updateCalculations.add(calculation);
            }
        }

        if(!CollectionUtils.isEmpty(createCalculations))
            createDemand(requestInfo,createCalculations,mdmsData);

        if(!CollectionUtils.isEmpty(updateCalculations))
            updateDemand(requestInfo,updateCalculations);
    }

    /**
     * Updates demand for the given list of calculations
     * @param requestInfo The RequestInfo of the calculation request
     * @param calculations List of calculation object
     * @return Demands that are updated
     */
    private List<Demand> updateDemand(RequestInfo requestInfo,List<Calculation> calculations){
        List<Demand> demands = new LinkedList<>();
        for(Calculation calculation : calculations) {

            List<Demand> searchResult = searchDemand(calculation.getTenantId(),Collections.singleton(calculation.getBpa().getApplicationNo())
                    , requestInfo,calculation);

            if(CollectionUtils.isEmpty(searchResult))
                throw new CustomException(BPACalculatorConstants.INVALID_UPDATE,"No demand exists for applicationNumber: "+calculation.getBpa().getApplicationNo());

            Demand demand = searchResult.get(0);
            List<DemandDetail> demandDetails = demand.getDemandDetails();
            List<DemandDetail> updatedDemandDetails = getUpdatedDemandDetails(calculation,demandDetails);
            demand.setDemandDetails(updatedDemandDetails);
            demands.add(demand);
        }
         return demandRepository.updateDemand(requestInfo,demands);
    }
   
    /**
     * Returns the list of new DemandDetail to be added for updating the demand
     * @param calculation The calculation object for the update tequest
     * @param demandDetails The list of demandDetails from the existing demand
     * @return The list of new DemandDetails
     */
    private List<DemandDetail> getUpdatedDemandDetails(Calculation calculation, List<DemandDetail> demandDetails){

        List<DemandDetail> newDemandDetails = new ArrayList<>();
        Map<String, List<DemandDetail>> taxHeadToDemandDetail = new HashMap<>();

        demandDetails.forEach(demandDetail -> {
            if(!taxHeadToDemandDetail.containsKey(demandDetail.getTaxHeadMasterCode())){
                List<DemandDetail> demandDetailList = new LinkedList<>();
                demandDetailList.add(demandDetail);
                taxHeadToDemandDetail.put(demandDetail.getTaxHeadMasterCode(),demandDetailList);
            }
            else
              taxHeadToDemandDetail.get(demandDetail.getTaxHeadMasterCode()).add(demandDetail);
        });

        BigDecimal diffInTaxAmount;
        List<DemandDetail> demandDetailList;
        BigDecimal total;

        for(TaxHeadEstimate taxHeadEstimate : calculation.getTaxHeadEstimates()){
            if(!taxHeadToDemandDetail.containsKey(taxHeadEstimate.getTaxHeadCode()))
                newDemandDetails.add(
                        DemandDetail.builder()
                                .taxAmount(taxHeadEstimate.getEstimateAmount())
                                .taxHeadMasterCode(taxHeadEstimate.getTaxHeadCode())
                                .tenantId(calculation.getTenantId())
                                .collectionAmount(BigDecimal.ZERO)
                                .build());
            else {
                 demandDetailList = taxHeadToDemandDetail.get(taxHeadEstimate.getTaxHeadCode());
                 total = demandDetailList.stream().map(DemandDetail::getTaxAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
                 diffInTaxAmount = taxHeadEstimate.getEstimateAmount().subtract(total);
                 if(diffInTaxAmount.compareTo(BigDecimal.ZERO)!=0) {
                     newDemandDetails.add(
                             DemandDetail.builder()
                                     .taxAmount(diffInTaxAmount)
                                     .taxHeadMasterCode(taxHeadEstimate.getTaxHeadCode())
                                     .tenantId(calculation.getTenantId())
                                     .collectionAmount(BigDecimal.ZERO)
                                     .build());
                 }
            }
        }
        List<DemandDetail> combinedBillDetials = new LinkedList<>(demandDetails);
        combinedBillDetials.addAll(newDemandDetails);
        addRoundOffTaxHead(calculation.getTenantId(),combinedBillDetials);
        return combinedBillDetials;
    }
    
    /**
     * Searches demand for the given consumerCode and tenantIDd
     * @param tenantId The tenantId of the tradeLicense
     * @param consumerCodes The set of consumerCode of the demands
     * @param requestInfo The RequestInfo of the incoming request
     * @return Lis to demands for the given consumerCode
     */
    private List<Demand> searchDemand(String tenantId,Set<String> consumerCodes,RequestInfo requestInfo,Calculation calculation){
    	String feeType = calculation.getFeeType();
        String uri = utils.getDemandSearchURL();
        uri = uri.replace("{1}",tenantId);
        uri = uri.replace("{2}",(utils.getBillingBusinessService(calculation.getBpa().getBusinessService(), feeType)));
        uri = uri.replace("{3}",StringUtils.join(consumerCodes, ','));

        Object result = serviceRequestRepository.fetchResult(new StringBuilder(uri),RequestInfoWrapper.builder()
                                                      .requestInfo(requestInfo).build());

        DemandResponse response;
        try {
             response = mapper.convertValue(result,DemandResponse.class);
        }
        catch (IllegalArgumentException e){
            throw new CustomException(BPACalculatorConstants.PARSING_ERROR,"Failed to parse response from Demand Search");
        }

        if(CollectionUtils.isEmpty(response.getDemands()))
            return null;

        else return response.getDemands();

    }
    
    
    /**
     * Creates demand for the given list of calculations
     * @param requestInfo The RequestInfo of the calculation request
     * @param calculations List of calculation object
     * @return Demands that are created
     */
    private List<Demand> createDemand(RequestInfo requestInfo,List<Calculation> calculations,Object mdmsData){
        List<Demand> demands = new LinkedList<>();
        for(Calculation calculation : calculations) {
            BPA bpa = null;

            if(calculation.getBpa()!=null) {
            	 	bpa = calculation.getBpa();
            } else if(calculation.getApplicationNumber()!=null) {
            		bpa = bpaService.getBuildingPlan(requestInfo, calculation.getTenantId(), calculation.getApplicationNumber(), null);
            }
            
            if (bpa == null)
                throw new CustomException(BPACalculatorConstants.INVALID_APPLICATION_NUMBER, "Demand cannot be generated for applicationNumber " +
                        calculation.getApplicationNumber() + "  Building plan application with this number does not exist ");

            String tenantId = calculation.getTenantId();
            String consumerCode = calculation.getBpa().getApplicationNo();

            User owner = bpa.getLandInfo().getOwners().get(0).toCommonUser();

            List<DemandDetail> demandDetails = new LinkedList<>();

            calculation.getTaxHeadEstimates().forEach(taxHeadEstimate -> {
                demandDetails.add(DemandDetail.builder().taxAmount(taxHeadEstimate.getEstimateAmount())
                        .taxHeadMasterCode(taxHeadEstimate.getTaxHeadCode())
                        .collectionAmount(BigDecimal.ZERO)
                        .tenantId(tenantId)
                        .build());
            });


//             addRoundOffTaxHead(calculation.getTenantId(),demandDetails);

            int year = Calendar.getInstance().get(Calendar.YEAR);
            Calendar startCal = Calendar.getInstance();
            startCal.set(Calendar.YEAR,year);
            startCal.set(Calendar.DAY_OF_YEAR, 1);  
            
            Calendar endCal = Calendar.getInstance();
            endCal.set(Calendar.YEAR, year);
            endCal.set(Calendar.MONTH, 11); // 11 = december
            endCal.set(Calendar.DAY_OF_MONTH, 31);
            
             demands.add(Demand.builder()
                    .consumerCode(consumerCode)
                    .demandDetails(demandDetails)
                    .payer(owner)
                    .minimumAmountPayable(config.getMinimumPayableAmount())
                    .tenantId(tenantId)
                    .taxPeriodFrom( startCal.getTimeInMillis())
                    .taxPeriodTo(endCal.getTimeInMillis())
                    .consumerType("BPA")
                    .businessService(utils.getBillingBusinessService(bpa.getBusinessService(),calculation.getFeeType()))
                    .build());
        }
        return demandRepository.saveDemand(requestInfo,demands);
    }

    /**
     * Adds roundOff taxHead if decimal values exists
     * @param tenantId The tenantId of the demand
     * @param demandDetails The list of demandDetail
     */
    private void addRoundOffTaxHead(String tenantId,List<DemandDetail> demandDetails){
        BigDecimal totalTax = BigDecimal.ZERO;

        DemandDetail prevRoundOffDemandDetail = null;

        /*
        * Sum all taxHeads except RoundOff as new roundOff will be calculated
        * */
        for (DemandDetail demandDetail : demandDetails){
        	/*if(!demandDetail.getTaxHeadMasterCode().equalsIgnoreCase(BPACalculatorConstants.MDMS_ROUNDOFF_TAXHEAD))
                totalTax = totalTax.add(demandDetail.getTaxAmount());
            else*/
             prevRoundOffDemandDetail = demandDetail;
        }

        BigDecimal decimalValue = totalTax.remainder(BigDecimal.ONE);
        BigDecimal midVal = new BigDecimal(0.5);
        BigDecimal roundOff = BigDecimal.ZERO;

        /*
        * If the decimal amount is greater than 0.5 we subtract it from 1 and put it as roundOff taxHead
        * so as to nullify the decimal eg: If the tax is 12.64 we will add extra tax roundOff taxHead
        * of 0.36 so that the total becomes 13
        * */
        if(decimalValue.compareTo(midVal) > 0)
            roundOff = BigDecimal.ONE.subtract(decimalValue);


        /*
         * If the decimal amount is less than 0.5 we put negative of it as roundOff taxHead
         * so as to nullify the decimal eg: If the tax is 12.36 we will add extra tax roundOff taxHead
         * of -0.36 so that the total becomes 12
         * */
        if(decimalValue.compareTo(midVal) < 0)
            roundOff = decimalValue.negate();

        /*
        * If roundOff already exists in previous demand create a new roundOff taxHead with roundOff amount
        * equal to difference between them so that it will be balanced when bill is generated. eg: If the
        * previous roundOff amount was of -0.36 and the new roundOff excluding the previous roundOff is
        * 0.2 then the new roundOff will be created with 0.2 so that the net roundOff will be 0.2 -(-0.36)
        * */
     /*   if(prevRoundOffDemandDetail!=null){
            roundOff = roundOff.subtract(prevRoundOffDemandDetail.getTaxAmount());
        }*/

        if(roundOff.compareTo(BigDecimal.ZERO)!=0){
                 DemandDetail roundOffDemandDetail = DemandDetail.builder()
                    .taxAmount(roundOff)
                    .taxHeadMasterCode(BPACalculatorConstants.MDMS_ROUNDOFF_TAXHEAD)
                    .tenantId(tenantId)
                    .collectionAmount(BigDecimal.ZERO)
                    .build();

            demandDetails.add(roundOffDemandDetail);
        }
    }
    
}
