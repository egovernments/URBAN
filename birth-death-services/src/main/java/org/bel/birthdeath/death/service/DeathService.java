package org.bel.birthdeath.death.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.bel.birthdeath.common.calculation.collections.models.Payment;
import org.bel.birthdeath.common.calculation.collections.models.PaymentDetail;
import org.bel.birthdeath.common.calculation.collections.models.PaymentResponse;
import org.bel.birthdeath.common.calculation.collections.models.PaymentSearchCriteria;
import org.bel.birthdeath.common.consumer.ReceiptConsumer;
import org.bel.birthdeath.common.contract.*;
import org.bel.birthdeath.common.model.AuditDetails;
import org.bel.birthdeath.common.model.user.UserDetailResponse;
import org.bel.birthdeath.common.repository.ServiceRequestRepository;
import org.bel.birthdeath.common.services.UserService;
import org.bel.birthdeath.config.BirthDeathConfiguration;
import org.bel.birthdeath.death.certmodel.DeathCertAppln;
import org.bel.birthdeath.death.certmodel.DeathCertRequest;
import org.bel.birthdeath.death.certmodel.DeathCertificate;
import org.bel.birthdeath.death.certmodel.DeathCertificate.StatusEnum;
import org.bel.birthdeath.death.model.*;
import org.bel.birthdeath.death.repository.DeathRepository;
import org.bel.birthdeath.death.validator.DeathValidator;
import org.bel.birthdeath.utils.BirthDeathConstants;
import org.bel.birthdeath.utils.CommonUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.encryption.EncryptionService;
import org.bel.birthdeath.common.model.user.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DeathService {
	
	@Autowired
	DeathRepository repository;

	@Autowired
	ServiceRequestRepository serviceRequestRepository;
	
	@Autowired
	@Qualifier("objectMapperBnd")
	ObjectMapper objectMapper;

	@Autowired
	EncryptionDecryptionUtil encryptionDecryptionUtil;

	@Autowired
	DeathValidator validator;
	
	@Autowired
	EnrichmentServiceDeath enrichmentServiceDeath;
	
	@Autowired
	CalculationServiceDeath calculationServiceDeath;
	
	@Autowired
	CommonUtils commUtils;
	
	@Autowired
	BirthDeathConfiguration config;
	
	@Autowired
	ReceiptConsumer consumer;

	@Autowired
	UserService userService;
	
	public List<EgDeathDtl> search(SearchCriteria criteria,RequestInfo requestInfo) {
		List<EgDeathDtl> deathDtls = new ArrayList<>() ;
		if(requestInfo.getUserInfo().getType().equalsIgnoreCase("EMPLOYEE")) {
			if(validator.validateFieldsEmployee(criteria)) {
				deathDtls = repository.getDeathDtls(criteria);
			}
		}
		else {
			if(validator.validateFieldsCitizen(criteria)) {
				deathDtls = repository.getDeathDtls(criteria);
			}
		}
		// ✅ Decrypt full list
		if (!deathDtls.isEmpty()) {
			// Decrypt top-level fields like aadharno, icdcode
			deathDtls = encryptionDecryptionUtil.decryptObject(deathDtls, "BndDetail", EgDeathDtl.class, requestInfo);

			// Explicitly decrypt nested parent info
			for (EgDeathDtl dtl : deathDtls) {
				if (dtl.getDeathFatherInfo() != null) {
					dtl.setDeathFatherInfo(encryptionDecryptionUtil.decryptObject(dtl.getDeathFatherInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgDeathFatherInfo.class, requestInfo));
				}

				if (dtl.getDeathMotherInfo() != null) {
					dtl.setDeathMotherInfo(encryptionDecryptionUtil.decryptObject(dtl.getDeathMotherInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgDeathMotherInfo.class, requestInfo));
				}

				if (dtl.getDeathSpouseInfo() != null) {
					dtl.setDeathSpouseInfo(encryptionDecryptionUtil.decryptObject(dtl.getDeathSpouseInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgDeathSpouseInfo.class, requestInfo));
				}
			}
		}


//		// Set owner/user info if records are found
//		if (!deathDtls.isEmpty()) {
//			UserDetailResponse userDetailResponse = userService.getOwner(deathDtls.get(0), requestInfo);
//			deathDtls.get(0).setUser(userDetailResponse.getUser().get(0));
//		}

		if (!deathDtls.isEmpty()) {
			UserDetailResponse userDetailResponse = userService.getOwners(deathDtls, requestInfo);

			if (userDetailResponse != null && userDetailResponse.getUser() != null) {
				Map<String, User> mobileToUserMap = userDetailResponse.getUser().stream()
						.filter(user -> user.getMobileNumber() != null)
						.collect(Collectors.toMap(User::getMobileNumber, Function.identity(), (u1, u2) -> u1)); // avoid duplicates

				for (EgDeathDtl dtl : deathDtls) {
					ParentInfo fatherInfo = dtl.getDeathFatherInfo();
					if (fatherInfo != null && fatherInfo.getMobileno() != null) {
						User user = mobileToUserMap.get(fatherInfo.getMobileno());
						if (user != null) dtl.setUser(user);
					}
				}
			}
		}
		return deathDtls;
	}

	public List<DeathCertificate> plainSearch(SearchCriteria criteria) {
		return repository.getDeathDtlsForPlainSearch(criteria);
	}

	public DeathCertificate download(SearchCriteria criteria, RequestInfo requestInfo) {
		try {
		// Input validation
		if (criteria == null || criteria.getId() == null || criteria.getTenantId() == null) {
			throw new CustomException("INVALID_INPUT", "Missing required parameters: id or tenantId");
		}
		
		List<EgDeathDtl> deathDtls = repository.getDeathDtlsAll(criteria,requestInfo);
		
		// Validate death details
		if (deathDtls == null || deathDtls.isEmpty()) {
			throw new CustomException("RECORD_NOT_FOUND", "No death record found for the given criteria");
		}
		if(deathDtls.size() > 1) 
			throw new CustomException("MULTIPLE_RECORDS_FOUND","Multiple records found for the given criteria");
			
		// Validate user details
		UserDetailResponse userDetailResponse = userService.getOwners(deathDtls, requestInfo);
		if (userDetailResponse == null || userDetailResponse.getUser() == null || userDetailResponse.getUser().isEmpty()) {
			throw new CustomException("USER_NOT_FOUND", "User details not found");
		}
		deathDtls.get(0).setUser(userDetailResponse.getUser().get(0));
		
		// Check if certificate request already exists (for paid downloads with existing filestoreid)
		DeathCertificate existingCertificate = null;
		try {
			existingCertificate = repository.getDeathCertReqByDeathDtlId(criteria.getId(), criteria.getTenantId());
		} catch (Exception e) {
			// Certificate request doesn't exist yet, will create new one
			log.debug("Certificate request not found for deathDtlId: {}", criteria.getId());
		}
		
		// If existing certificate found, check for filestoreid or PAID_PDF_GENERATED status
		if (existingCertificate != null) {
			// Case 1: PDF already generated - return immediately
			if (existingCertificate.getFilestoreid() != null) {
				updateCertificateFields(existingCertificate, deathDtls.get(0));
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
						existingCertificate = repository.getDeathCertReqByDeathDtlId(criteria.getId(), criteria.getTenantId());
						
						if (existingCertificate != null && existingCertificate.getFilestoreid() != null) {
							log.info("PDF generated after {} retries for deathDtlId: {}", i + 1, criteria.getId());
							updateCertificateFields(existingCertificate, deathDtls.get(0));
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
		DeathCertificate deathCertificate = new DeathCertificate();
		deathCertificate.setSource(criteria.getSource().toString());
		deathCertificate.setDeathDtlId(criteria.getId());
		deathCertificate.setTenantId(criteria.getTenantId());
		DeathCertRequest deathCertRequest = DeathCertRequest.builder().deathCertificate(deathCertificate).requestInfo(requestInfo).build();
		
		updateCertificateFields(deathCertificate, deathDtls.get(0));
		
		enrichmentServiceDeath.enrichCreateRequest(deathCertRequest);
		enrichmentServiceDeath.setIdgenIds(deathCertRequest);
		
		// Set certificate number for both free and paid downloads
		deathDtls.get(0).setDeathcertificateno(deathCertRequest.getDeathCertificate().getDeathCertificateNo());
		
		if(deathDtls.get(0).getCounter()>0){
			// Paid download: Create payment demand and set status to ACTIVE
			// PDF will be generated by ReceiptConsumer after payment is successful
			enrichmentServiceDeath.setDemandParams(deathCertRequest,deathDtls);
			enrichmentServiceDeath.setGLCode(deathCertRequest);
			calculationServiceDeath.addCalculation(deathCertRequest);
			deathCertificate.setApplicationStatus(StatusEnum.ACTIVE);
		}
		else{
			// Free download: Generate PDF immediately
			DeathPdfApplicationRequest applicationRequest = DeathPdfApplicationRequest.builder().requestInfo(requestInfo).deathCertificate(deathDtls).build();
			EgovPdfResp pdfResp = repository.saveDeathCertPdf(applicationRequest);
			deathCertificate.setEmbeddedUrl(applicationRequest.getDeathCertificate().get(0).getEmbeddedUrl());
			deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getDateofissue());
			deathCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
			repository.updateCounter(deathCertificate.getDeathDtlId(), deathCertificate.getTenantId());
			deathCertificate.setApplicationStatus(StatusEnum.FREE_DOWNLOAD);
		}
		deathCertificate.setCounter(deathDtls.get(0).getCounter());
		repository.save(deathCertRequest);
		return deathCertificate;
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("DOWNLOAD_ERROR","Error in Downloading Certificate");
		}
	}

	public DeathCertificate getDeathCertReqByConsumerCode(SearchCriteria criteria, RequestInfo requestInfo) {
		return repository.getDeathCertReqByConsumerCode(criteria.getConsumerCode(),requestInfo, criteria.getTenantId());
	}
	
	public List<DeathCertAppln> searchApplications(RequestInfoWrapper requestInfoWrapper, SearchCriteria searchCriteria) {
		List<DeathCertAppln> certApplns=null;
		certApplns = repository.searchApplications(requestInfoWrapper.getRequestInfo().getUserInfo().getUuid(), searchCriteria.getTenantId());
		for (DeathCertAppln certAppln : certApplns) {
			if (certAppln.getStatus().equalsIgnoreCase(StatusEnum.PAID.toString())) {
				try {
					DeathCertificate cert = repository.getDeathCertReqByConsumerCode(certAppln.getApplicationNumber(),
							requestInfoWrapper.getRequestInfo(), certAppln.getTenantId());
					String uuid = requestInfoWrapper.getRequestInfo().getUserInfo().getUuid();
				    AuditDetails auditDetails = commUtils.getAuditDetails(uuid, false);
					cert.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
					cert.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
					cert = consumer.updateDeathPDFGEN(requestInfoWrapper.getRequestInfo(), cert);
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
							DeathCertificate cert = consumer.updateDeathPAID(requestInfoWrapper.getRequestInfo(),
									paymentDetail);
							if (null != cert) {
								certAppln.setStatus(cert.getApplicationStatus().toString());
							}
							cert = consumer.updateDeathPDFGEN(requestInfoWrapper.getRequestInfo(), cert);
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

	public void updateDownloadStatus(DeathCertRequest certRequest) {
		if(null!=certRequest.getRequestInfo() && null!=certRequest.getRequestInfo().getUserInfo() && null!=certRequest.getRequestInfo().getUserInfo().getUuid())
		{
			AuditDetails auditDetails = commUtils.getAuditDetails(certRequest.getRequestInfo().getUserInfo().getUuid(), false);
			DeathCertificate deathCert = certRequest.getDeathCertificate();
			deathCert.getAuditDetails().setLastModifiedBy(auditDetails.getLastModifiedBy());
			deathCert.getAuditDetails().setLastModifiedTime(auditDetails.getLastModifiedTime());
			deathCert.setApplicationStatus(StatusEnum.PAID_DOWNLOAD);
			repository.update(certRequest);
		}

	}
	
	public List<EgDeathDtl> viewCertificateData(SearchCriteria criteria) {
		return repository.viewCertificateData(criteria);
	}
	
	public List<EgDeathDtl> viewfullCertMasterData(SearchCriteria criteria,RequestInfo requestInfo) {
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
    private void updateCertificateFields(DeathCertificate certificate, EgDeathDtl deathDtl) {
        try {
            certificate.setGender(deathDtl.getGenderStr());
            certificate.setAge(deathDtl.getAge());
            
            // Safe address field updates with null checks
            if (deathDtl.getDeathPermaddr() != null) {
                certificate.setWard(deathDtl.getDeathPermaddr().getTehsil());
                certificate.setState(deathDtl.getDeathPermaddr().getState());
                certificate.setDistrict(deathDtl.getDeathPermaddr().getDistrict());
            }
            
            certificate.setDateofdeath(deathDtl.getDateofdeath());
            certificate.setDateofreport(deathDtl.getDateofreport());
            certificate.setPlaceofdeath(deathDtl.getPlaceofdeath());
            
            // Safe date formatting with null checks
            if (deathDtl.getDateofreport() != null) {
                try {
                    SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
                    String date = format.format(deathDtl.getDateofreport());
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
            
            certificate.setCounter(deathDtl.getCounter() != null ? deathDtl.getCounter() : 0);
        } catch (Exception e) {
            log.error("Error updating certificate fields: " + e.getMessage());
            throw new CustomException("FIELD_UPDATE_ERROR", "Failed to update certificate fields");
        }
    }
}
