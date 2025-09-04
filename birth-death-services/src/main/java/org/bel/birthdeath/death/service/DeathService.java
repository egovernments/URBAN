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
		
		// Create new certificate request for each download
		DeathCertificate deathCertificate = new DeathCertificate();
		deathCertificate.setSource(criteria.getSource().toString());
		deathCertificate.setDeathDtlId(criteria.getId());
		deathCertificate.setTenantId(criteria.getTenantId());
		DeathCertRequest deathCertRequest = DeathCertRequest.builder().deathCertificate(deathCertificate).requestInfo(requestInfo).build();
		
		// Generate certificate number to check if payment just completed
		enrichmentServiceDeath.enrichCreateRequest(deathCertRequest);
		enrichmentServiceDeath.setIdgenIds(deathCertRequest);
		String certificateNumber = deathCertRequest.getDeathCertificate().getDeathCertificateNo();
		
		// Quick check: if user just paid and PDF is being generated, return with message
		if(deathDtls.get(0).getCounter() > 0) {
			try {
				DeathCertificate recentCert = repository.getDeathCertReqByConsumerCode(certificateNumber, requestInfo, criteria.getTenantId());
				if(recentCert != null) {
					if(recentCert.getApplicationStatus() == StatusEnum.PAID_PDF_GENERATED && recentCert.getFilestoreid() != null) {
						// PDF ready - return it
						updateCertificateFields(recentCert, deathDtls.get(0));
						return recentCert;
					} else if(recentCert.getApplicationStatus() == StatusEnum.PAID) {
						// PDF being generated
						throw new CustomException("PDF_GENERATION_IN_PROGRESS", 
							"Your PDF is being generated. Please try downloading again in a few seconds.");
					} else if(recentCert.getApplicationStatus() == StatusEnum.ACTIVE) {
						// Payment pending - return existing certificate
						updateCertificateFields(recentCert, deathDtls.get(0));
						return recentCert;
					}
				}
			} catch (CustomException ce) {
				throw ce; // Re-throw our custom exceptions
			} catch (Exception e) {
				// Certificate doesn't exist yet, continue with new creation
				log.debug("No existing certificate found, creating new one");
			}
		}
		
		updateCertificateFields(deathCertificate, deathDtls.get(0));
		
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
