package org.egov.bpa.repository;

import org.egov.bpa.config.BPAConfiguration;
import org.egov.bpa.producer.Producer;
import org.egov.bpa.repository.querybuilder.BPAQueryBuilder;
import org.egov.bpa.repository.rowmapper.BPARowMapper;
import org.egov.bpa.service.BPALandService;
import org.egov.bpa.web.model.BPA;
import org.egov.bpa.web.model.BPARequest;
import org.egov.bpa.web.model.BPASearchCriteria;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.exception.InvalidTenantIdException;
import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.tracer.model.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@Slf4j
public class BPARepository {

	@Autowired
	private BPAConfiguration config;

	@Autowired
	private Producer producer;

	@Autowired
	private BPAQueryBuilder queryBuilder;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private BPARowMapper rowMapper;

	@Autowired
	private MultiStateInstanceUtil centralInstanceUtil;

	@Autowired
	private BPALandService landService;

	/**
	 * Pushes the request on save topic through kafka
	 *
	 * @param bpaRequest
	 *            The bpa create request
	 */
	public void save(BPARequest bpaRequest) {
		producer.push(bpaRequest.getBPA().getTenantId(),config.getSaveTopic(), bpaRequest);
		producer.push(bpaRequest.getBPA().getTenantId(),config.getBpaEventInboxKafkaTopic(), bpaRequest);
	}

	/**
	 * pushes the request on update or workflow update topic through kafaka based on th isStateUpdatable 
	 * @param bpaRequest
	 * @param isStateUpdatable
	 */
	public void update(BPARequest bpaRequest, boolean isStateUpdatable) {
		RequestInfo requestInfo = bpaRequest.getRequestInfo();

		BPA bpaForStatusUpdate = null;
		BPA bpaForUpdate = null;

		BPA bpa = bpaRequest.getBPA();

		if (isStateUpdatable) {
			bpaForUpdate = bpa;
		} else {
			bpaForStatusUpdate = bpa;
		}
		if (bpaForUpdate != null) {
			producer.push(bpaRequest.getBPA().getTenantId(),config.getUpdateTopic(), new BPARequest(requestInfo, bpaForUpdate));
			producer.push(bpaRequest.getBPA().getTenantId(),config.getBpaEventInboxKafkaTopic(), new BPARequest(requestInfo, bpaForUpdate));
		}

		if (bpaForStatusUpdate != null) {
			producer.push(bpaRequest.getBPA().getTenantId(),config.getUpdateWorkflowTopic(), new BPARequest(requestInfo, bpaForStatusUpdate));
			producer.push(bpaRequest.getBPA().getTenantId(),config.getBpaEventInboxKafkaTopic(), new BPARequest(requestInfo, bpaForStatusUpdate));
		}

	}

	/**
	 * BPA search in database
	 *
	 * @param criteria
	 *            The BPA Search criteria
	 * @param edcrNos
	 *            List of EDCR numbers to filter
	 * @param requestInfo
	 *            RequestInfo for fetching landInfo
	 * @return List of BPA from search with landInfo populated
	 */
	public List<BPA> getBPAData(BPASearchCriteria criteria, List<String> edcrNos, RequestInfo requestInfo) {
		List<Object> preparedStmtList = new ArrayList<>();
		String query = queryBuilder.getBPASearchQuery(criteria, preparedStmtList, edcrNos, false);
		try {
			query = centralInstanceUtil.replaceSchemaPlaceholder(query, criteria.getTenantId());
		} catch (InvalidTenantIdException e) {
			throw new CustomException("EG_PT_TENANTID_ERROR",
					"TenantId length is not sufficient to replace query schema in a multi state instance");
		}
		List<BPA> BPAData = jdbcTemplate.query(query, preparedStmtList.toArray(), rowMapper);

		// Populate landInfo for each BPA that has a landId
		if (requestInfo != null) {
			for (BPA bpa : BPAData) {
				if (bpa.getLandId() != null) {
					try {
						org.egov.bpa.web.model.landInfo.LandSearchCriteria landCriteria =
							new org.egov.bpa.web.model.landInfo.LandSearchCriteria();
						List<String> landIds = new ArrayList<>();
						landIds.add(bpa.getLandId());
						landCriteria.setIds(landIds);
						landCriteria.setTenantId(bpa.getTenantId());
						log.debug("Fetching landInfo in getBPAData for landId: " + bpa.getLandId());
						ArrayList<org.egov.bpa.web.model.landInfo.LandInfo> landInfos =
							landService.searchLandInfoToBPA(requestInfo, landCriteria);
						if (!landInfos.isEmpty()) {
							bpa.setLandInfo(landInfos.get(0));
							log.debug("LandInfo populated in getBPAData");
						} else {
							log.warn("No landInfo found in getBPAData for landId: " + bpa.getLandId());
						}
					} catch (Exception e) {
						log.error("Error fetching landInfo in getBPAData for landId " + bpa.getLandId() + ": ", e);
					}
				}
			}
		}

		return BPAData;
	}
	
	/**
         * BPA search count in database
         *
         * @param criteria
         *            The BPA Search criteria
         * @return count of BPA from search
         */
        public int getBPACount(BPASearchCriteria criteria, List<String> edcrNos) {
                List<Object> preparedStmtList = new ArrayList<>();
                String query = queryBuilder.getBPASearchQuery(criteria, preparedStmtList, edcrNos, true);
				try {
					query = centralInstanceUtil.replaceSchemaPlaceholder(query, criteria.getTenantId());
				} catch (InvalidTenantIdException e) {
					throw new CustomException("EG_PT_TENANTID_ERROR",
							"TenantId length is not sufficient to replace query schema in a multi state instance");
				}
                int count = jdbcTemplate.queryForObject(query, preparedStmtList.toArray(), Integer.class);
                return count;
        }

        public List<BPA> getBPADataForPlainSearch(BPASearchCriteria criteria, List<String> edcrNos) {
    		List<Object> preparedStmtList = new ArrayList<>();
    		String query = queryBuilder.getBPASearchQueryForPlainSearch(criteria, preparedStmtList, edcrNos, false);
			try {
				query = centralInstanceUtil.replaceSchemaPlaceholder(query, criteria.getTenantId());
			} catch (InvalidTenantIdException e) {
				throw new CustomException("EG_PT_TENANTID_ERROR",
						"TenantId length is not sufficient to replace query schema in a multi state instance");
			}
    		List<BPA> BPAData = jdbcTemplate.query(query, preparedStmtList.toArray(), rowMapper);
    		return BPAData;
    	}

}
