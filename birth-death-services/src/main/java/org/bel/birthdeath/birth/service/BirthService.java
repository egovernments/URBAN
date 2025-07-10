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
import org.bel.birthdeath.death.model.EgDeathFatherInfo;
import org.bel.birthdeath.death.model.EgDeathMotherInfo;
import org.bel.birthdeath.death.model.EgDeathSpouseInfo;
import org.bel.birthdeath.utils.BirthDeathConstants;
import org.bel.birthdeath.utils.CommonUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

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
			birthDtls = encryptionDecryptionUtil.decryptObject(birthDtls, "BndDetail", EgDeathDtl.class, requestInfo);

			// Explicitly decrypt nested parent info
			for (EgBirthDtl btl : birthDtls) {
				if (btl.getBirthFatherInfo() != null) {
					btl.setBirthFatherInfo(encryptionDecryptionUtil.decryptObject(btl.getBirthFatherInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgDeathFatherInfo.class, requestInfo));
				}

				if (btl.getBirthMotherInfo() != null) {
					btl.setBirthMotherInfo(encryptionDecryptionUtil.decryptObject(btl.getBirthMotherInfo(),
							BirthDeathConstants.BND_DESCRYPT_KEY, EgDeathMotherInfo.class, requestInfo));
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
		BirthCertificate birthCertificate = new BirthCertificate();
		birthCertificate.setSource(criteria.getSource().toString());
		birthCertificate.setBirthDtlId(criteria.getId());
		birthCertificate.setTenantId(criteria.getTenantId());
		BirthCertRequest birthCertRequest = BirthCertRequest.builder().birthCertificate(birthCertificate).requestInfo(requestInfo).build();
		List<EgBirthDtl> birtDtls = repository.getBirthDtlsAll(criteria,requestInfo);
			UserDetailResponse userDetailResponse = userService.getOwners(birtDtls, requestInfo);
			birtDtls.get(0).setUser(userDetailResponse.getUser().get(0));
			birthCertificate.setBirthPlace(birtDtls.get(0).getPlaceofbirth());
			birthCertificate.setGender(birtDtls.get(0).getGenderStr());
			birthCertificate.setWard(birtDtls.get(0).getBirthPermaddr().getTehsil());
			birthCertificate.setState(birtDtls.get(0).getBirthPermaddr().getState());
			birthCertificate.setDistrict(birtDtls.get(0).getBirthPermaddr().getDistrict());
			birthCertificate.setDateofbirth(birtDtls.get(0).getDateofbirth());
			birthCertificate.setDateofreport(birtDtls.get(0).getDateofreport());
			SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
			String date = format.format(birtDtls.get(0).getDateofreport());
			String datestr= date.split("-")[2];
			birthCertificate.setYear(datestr);
		if(birtDtls.size()>1) 
			throw new CustomException("Invalid_Input","Error in processing data");
		enrichmentService.enrichCreateRequest(birthCertRequest);
		enrichmentService.setIdgenIds(birthCertRequest);
		if(birtDtls.get(0).getCounter()>0){
			enrichmentService.setDemandParams(birthCertRequest,birtDtls);
			enrichmentService.setGLCode(birthCertRequest);
			calculationService.addCalculation(birthCertRequest);
			birthCertificate.setApplicationStatus(StatusEnum.ACTIVE);
		}
		else{
			birtDtls.get(0).setBirthcertificateno(birthCertRequest.getBirthCertificate().getBirthCertificateNo());
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
}
