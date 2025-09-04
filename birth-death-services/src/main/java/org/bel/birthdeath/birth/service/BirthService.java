package org.bel.birthdeath.birth.service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.bel.birthdeath.birth.certmodel.BirthCertAppln;
import org.bel.birthdeath.birth.certmodel.BirthCertRequest;
import org.bel.birthdeath.birth.certmodel.BirthCertificate;
import org.bel.birthdeath.birth.certmodel.BirthCertificate.StatusEnum;
import org.bel.birthdeath.birth.model.EgBirthDtl;
import org.bel.birthdeath.birth.model.EgBirthFatherInfo;
import org.bel.birthdeath.birth.model.EgBirthMotherInfo;
import org.bel.birthdeath.birth.model.SearchCriteria;
import org.bel.birthdeath.birth.repository.BirthRepository;
import org.bel.birthdeath.birth.validator.BirthValidator;
import org.bel.birthdeath.common.calculation.collections.models.Payment;
import org.bel.birthdeath.common.calculation.collections.models.PaymentDetail;
import org.bel.birthdeath.common.calculation.collections.models.PaymentResponse;
import org.bel.birthdeath.common.calculation.collections.models.PaymentSearchCriteria;
import org.bel.birthdeath.common.consumer.ReceiptConsumer;
import org.bel.birthdeath.common.contract.*;
import org.bel.birthdeath.common.model.AuditDetails;
import org.bel.birthdeath.common.model.user.User;
import org.bel.birthdeath.common.model.user.UserDetailResponse;
import org.bel.birthdeath.common.repository.ServiceRequestRepository;
import org.bel.birthdeath.common.services.UserService;
import org.bel.birthdeath.config.BirthDeathConfiguration;
import org.bel.birthdeath.death.model.EgDeathDtl;
import org.bel.birthdeath.utils.BirthDeathConstants;
import org.bel.birthdeath.utils.CommonUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BirthService {
	
	@Autowired
	BirthRepository repository;

	@Autowired
	ServiceRequestRepository serviceRequestRepository;
	
	@Autowired
	@Qualifier("objectMapperBnd")
	ObjectMapper objectMapper;
	
	@Autowired
	BirthValidator validator;

	@Autowired
	private EncryptionDecryptionUtil encryptionDecryptionUtil;
	
	@Autowired
	EnrichmentService enrichmentService;
	
	@Autowired
	CalculationService calculationService;
	
	@Autowired
	CommonUtils commUtils;
	
	@Autowired
	BirthDeathConfiguration config;
	
	@Autowired
	ReceiptConsumer consumer;

	@Autowired
	UserService userService;
	
	public List<EgBirthDtl> search(SearchCriteria criteria, RequestInfo requestInfo) {
		List<EgBirthDtl> birthDtls = new ArrayList<>() ;
		if(requestInfo.getUserInfo().getType().equalsIgnoreCase("EMPLOYEE")) {
			if(validator.validateFieldsEmployee(criteria)) {
				birthDtls = repository.getBirthDtls(criteria);
			}
		}
		else {
			if(validator.validateFieldsCitizen(criteria)) {
				birthDtls = repository.getBirthDtls(criteria);
			}
		}

		// ✅ Decrypt full list
		if (!birthDtls.isEmpty()) {
			// Decrypt top-level fields like aadharno, icdcode
			birthDtls = encryptionDecryptionUtil.decryptObject(birthDtls, "BndDetail", EgBirthDtl.class, requestInfo);

			// Explicitly decrypt nested parent info
			for (EgBirthDtl btl : birthDtls) {
				if (btl.getBirthFatherInfo() != null) {
					btl.setBirthFatherInfo(encryptionDecryptionUtil.decryptObject(btl.getBirthFatherInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgBirthFatherInfo.class, requestInfo));
				}

				if (btl.getBirthMotherInfo() != null) {
					btl.setBirthMotherInfo(encryptionDecryptionUtil.decryptObject(btl.getBirthMotherInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgBirthMotherInfo.class, requestInfo));
				}
			}
		}


		if (!birthDtls.isEmpty()) {
			UserDetailResponse userDetailResponse = userService.getOwners(birthDtls, requestInfo);

			if (userDetailResponse != null && userDetailResponse.getUser() != null) {
				Map<String, User> mobileToUserMap = userDetailResponse.getUser().stream()
						.filter(user -> user.getMobileNumber() != null)
						.collect(Collectors.toMap(User::getMobileNumber, Function.identity(), (u1, u2) -> u1)); // avoid duplicates

				for (EgBirthDtl btl : birthDtls) {
					ParentInfo fatherInfo = btl.getFatherInfo();
					if (fatherInfo != null && fatherInfo.getMobileno() != null) {
						User user = mobileToUserMap.get(fatherInfo.getMobileno());
						if (user != null) btl.setUser(user);
					}
				}
			}
		}
		return birthDtls;
	}

	public List<BirthCertificate> plainSearch(SearchCriteria criteria) {
		return repository.getBirthCertificateForPlainSearch(criteria);
	}

	public BirthCertificate download(SearchCriteria criteria, RequestInfo requestInfo) {
		try {
		// Input validation
		if (criteria == null || criteria.getId() == null || criteria.getTenantId() == null) {
			throw new CustomException("INVALID_INPUT", "Missing required parameters: id or tenantId");
		}
		
		List<EgBirthDtl> birtDtls = repository.getBirthDtlsAll(criteria,requestInfo);
		
		// Validate birth details
		if (birtDtls == null || birtDtls.isEmpty()) {
			throw new CustomException("RECORD_NOT_FOUND", "No birth record found for the given criteria");
		}
		if(birtDtls.size() > 1) 
			throw new CustomException("MULTIPLE_RECORDS_FOUND","Multiple records found for the given criteria");
			
		// Validate user details
		UserDetailResponse userDetailResponse = userService.getOwners(birtDtls, requestInfo);
		if (userDetailResponse == null || userDetailResponse.getUser() == null || userDetailResponse.getUser().isEmpty()) {
			throw new CustomException("USER_NOT_FOUND", "User details not found");
		}
		birtDtls.get(0).setUser(userDetailResponse.getUser().get(0));
		
		// Check if certificate request already exists (for paid downloads with existing filestoreid)
		BirthCertificate existingCertificate = null;
		try {
			existingCertificate = repository.getBirthCertReqByBirthDtlId(criteria.getId(), criteria.getTenantId());
		} catch (Exception e) {
			// Certificate request doesn't exist yet, will create new one
			log.debug("Certificate request not found for birthDtlId: {}", criteria.getId());
		}
		
		// If existing certificate found, check for filestoreid or PAID status
		if (existingCertificate != null) {
			// Case 1: PDF already generated - return immediately
			if (existingCertificate.getFilestoreid() != null) {
				updateCertificateFields(existingCertificate, birtDtls.get(0));
				return existingCertificate;
			}
			
			// Case 2: Status is PAID but PDF not yet generated (race condition)
			// This happens when user clicks download immediately after payment
			if (existingCertificate.getApplicationStatus() == StatusEnum.PAID) {
				// Retry logic with exponential backoff
				int maxRetries = 5;
				long waitTime = 1000; // Start with 1 second
				
				for (int i = 0; i < maxRetries; i++) {
					try {
						Thread.sleep(waitTime);
						existingCertificate = repository.getBirthCertReqByBirthDtlId(criteria.getId(), criteria.getTenantId());
						
						if (existingCertificate != null && existingCertificate.getFilestoreid() != null) {
							log.info("PDF generated after {} retries for birthDtlId: {}", i + 1, criteria.getId());
							updateCertificateFields(existingCertificate, birtDtls.get(0));
							return existingCertificate;
						}
						
						waitTime = (long)(waitTime * 1.5); // Exponential backoff
					} catch (InterruptedException ie) {
						Thread.currentThread().interrupt();
						throw new CustomException("RETRY_INTERRUPTED", "PDF generation check was interrupted");
					}
				}
				
				// After retries, if still no PDF, return with message
				throw new CustomException("PDF_GENERATION_IN_PROGRESS", 
					"PDF is being generated. Please try downloading again in a few seconds.");
			}
		}
		
		// Create new certificate request (first time or no filestoreid yet)
		BirthCertificate birthCertificate = new BirthCertificate();
		birthCertificate.setSource(criteria.getSource().toString());
		birthCertificate.setBirthDtlId(criteria.getId());
		birthCertificate.setTenantId(criteria.getTenantId());
		BirthCertRequest birthCertRequest = BirthCertRequest.builder().birthCertificate(birthCertificate).requestInfo(requestInfo).build();
		
		updateCertificateFields(birthCertificate, birtDtls.get(0));
		
		enrichmentService.enrichCreateRequest(birthCertRequest);
		enrichmentService.setIdgenIds(birthCertRequest);
		
		// Set certificate number for both free and paid downloads
		birtDtls.get(0).setBirthcertificateno(birthCertRequest.getBirthCertificate().getBirthCertificateNo());
		
		if(birtDtls.get(0).getCounter()>0){
			// Paid download: Create payment demand and set status to ACTIVE
			// PDF will be generated by ReceiptConsumer after payment is successful
			enrichmentService.setDemandParams(birthCertRequest,birtDtls);
			enrichmentService.setGLCode(birthCertRequest);
			calculationService.addCalculation(birthCertRequest);
			birthCertificate.setApplicationStatus(StatusEnum.ACTIVE);
		}
		else{
			// Free download: Generate PDF immediately
			BirthPdfApplicationRequest applicationRequest = BirthPdfApplicationRequest.builder().requestInfo(requestInfo).birthCertificate(birtDtls).build();
			EgovPdfResp pdfResp = repository.saveBirthCertPdf(applicationRequest);
			birthCertificate.setEmbeddedUrl(applicationRequest.getBirthCertificate().get(0).getEmbeddedUrl());
			birthCertificate.setDateofissue(applicationRequest.getBirthCertificate().get(0).getDateofissue());
			birthCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
			repository.updateCounter(birthCertificate.getBirthDtlId(), birthCertificate.getTenantId());
			birthCertificate.setApplicationStatus(StatusEnum.FREE_DOWNLOAD);
		}
		birthCertificate.setCounter(birtDtls.get(0).getCounter());
		repository.save(birthCertRequest);
		return birthCertificate;
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("DOWNLOAD_ERROR","Error in Downloading Certificate");
		}
	}

	public BirthCertificate getBirthCertReqByConsumerCode(SearchCriteria criteria, RequestInfo requestInfo) {
		return repository.getBirthCertReqByConsumerCode(criteria.getConsumerCode(),requestInfo, criteria.getTenantId());
	}
	
	public List<BirthCertAppln> searchApplications(RequestInfoWrapper requestInfoWrapper, SearchCriteria searchCriteria) {
		List<BirthCertAppln> certApplns = null;
		certApplns = repository.searchApplications(requestInfoWrapper.getRequestInfo().getUserInfo().getUuid(), searchCriteria.getTenantId());
		for (BirthCertAppln certAppln : certApplns) {
			if (certAppln.getStatus().equalsIgnoreCase(StatusEnum.PAID.toString())) {
				try {
					BirthCertificate cert = repository.getBirthCertReqByConsumerCode(certAppln.getApplicationNumber(),
							requestInfoWrapper.getRequestInfo(), certAppln.getTenantId());
					String uuid = requestInfoWrapper.getRequestInfo().getUserInfo().getUuid();
				    AuditDetails auditDetails = commUtils.getAuditDetails(uuid, false);
					cert.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
					cert.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
					cert = consumer.updateBirthPDFGEN(requestInfoWrapper.getRequestInfo(), cert);
					if (null != cert.getFilestoreid()) {
						certAppln.setFileStoreId(cert.getFilestoreid());
						certAppln.setStatus(cert.getApplicationStatus().toString());
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
			} else if (certAppln.getStatus().equalsIgnoreCase(StatusEnum.ACTIVE.toString())) {
				PaymentSearchCriteria criteria = new PaymentSearchCriteria();
				criteria.setTenantId(certAppln.getTenantId());
				criteria.setConsumerCodes(Collections.singleton(certAppln.getApplicationNumber()));
				List<Payment> payments = getPayments(criteria, requestInfoWrapper);
				if (!CollectionUtils.isEmpty(payments)) {
					for (PaymentDetail paymentDetail : payments.get(0).getPaymentDetails()) {
						try {
							BirthCertificate cert = consumer.updateBirthPAID(requestInfoWrapper.getRequestInfo(),
									paymentDetail);
							if (null != cert) {
								certAppln.setStatus(cert.getApplicationStatus().toString());
							}
							cert = consumer.updateBirthPDFGEN(requestInfoWrapper.getRequestInfo(), cert);
							if (null != cert.getFilestoreid()) {
								certAppln.setFileStoreId(cert.getFilestoreid());
								certAppln.setStatus(cert.getApplicationStatus().toString());
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		return certApplns;
	}

	public void updateDownloadStatus(BirthCertRequest certRequest) {
		if(null!=certRequest.getRequestInfo() && null!=certRequest.getRequestInfo().getUserInfo() && null!=certRequest.getRequestInfo().getUserInfo().getUuid())
		{
			AuditDetails auditDetails = commUtils.getAuditDetails(certRequest.getRequestInfo().getUserInfo().getUuid(), false);
			BirthCertificate birthCert = certRequest.getBirthCertificate();
			birthCert.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
			birthCert.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
			birthCert.setApplicationStatus(StatusEnum.PAID_DOWNLOAD);
			repository.update(certRequest);
		}
	}

	public List<EgBirthDtl> viewCertificateData(SearchCriteria criteria) {
		return repository.viewCertificateData(criteria);
	}
	
	public List<EgBirthDtl> viewfullCertMasterData(SearchCriteria criteria,RequestInfo requestInfo) {
		return repository.viewfullCertMasterData(criteria,requestInfo);
	}
	
	
    public List<Payment> getPayments(PaymentSearchCriteria criteria, RequestInfoWrapper requestInfoWrapper) {
        StringBuilder url = getPaymentSearchUrl(criteria);
        return objectMapper.convertValue(serviceRequestRepository.fetchResult(url, requestInfoWrapper), PaymentResponse.class).getPayments();
    }
    
    public StringBuilder getPaymentSearchUrl(PaymentSearchCriteria criteria) {
        return new StringBuilder().append(config.getCollectionServiceHost())
                .append(config.getPaymentSearchEndpoint()).append("?")
                .append("tenantId=").append(criteria.getTenantId())
                .append("&").append("consumerCodes=")
                .append(StringUtils.join(criteria.getConsumerCodes(),","))
                .append("&").append("status=APPROVED,DEPOSITED,NEW");
    }
    
    /**
     * Helper method to safely update certificate fields with null checks
     */
    private void updateCertificateFields(BirthCertificate certificate, EgBirthDtl birthDtl) {
        try {
            certificate.setBirthPlace(birthDtl.getPlaceofbirth());
            certificate.setGender(birthDtl.getGenderStr());
            
            // Safe address field updates with null checks
            if (birthDtl.getBirthPermaddr() != null) {
                certificate.setWard(birthDtl.getBirthPermaddr().getTehsil());
                certificate.setState(birthDtl.getBirthPermaddr().getState());
                certificate.setDistrict(birthDtl.getBirthPermaddr().getDistrict());
            }
            
            certificate.setDateofbirth(birthDtl.getDateofbirth());
            certificate.setDateofreport(birthDtl.getDateofreport());
            
            // Safe date formatting with null checks
            if (birthDtl.getDateofreport() != null) {
                try {
                    SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
                    String date = format.format(birthDtl.getDateofreport());
                    if (date != null && date.contains("-")) {
                        String[] dateParts = date.split("-");
                        if (dateParts.length >= 3) {
                            certificate.setYear(dateParts[2]);
                        }
                    }
                } catch (Exception e) {
                    // If date formatting fails, log but don't break the flow
                    log.warn("Failed to format date for certificate: " + e.getMessage());
                }
            }
            
            certificate.setCounter(birthDtl.getCounter() != null ? birthDtl.getCounter() : 0);
        } catch (Exception e) {
            log.error("Error updating certificate fields: " + e.getMessage());
            throw new CustomException("FIELD_UPDATE_ERROR", "Failed to update certificate fields");
        }
    }
}
