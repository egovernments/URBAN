package org.egov.swservice.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.common.exception.InvalidTenantIdException;
import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.swservice.config.SWConfiguration;

import org.egov.swservice.repository.rowmapper.EncryptionCountRowMapper;
import org.egov.swservice.repository.rowmapper.OpenSewerageRowMapper;
import org.egov.swservice.web.models.*;
import org.egov.swservice.producer.SewarageConnectionProducer;
import org.egov.swservice.repository.builder.SWQueryBuilder;
import org.egov.swservice.repository.rowmapper.OpenSewerageRowMapper;
import org.egov.swservice.repository.rowmapper.SewerageRowMapper;
import org.egov.swservice.util.SWConstants;
import org.egov.swservice.web.models.SearchCriteria;
import org.egov.swservice.web.models.SewerageConnection;
import org.egov.swservice.web.models.SewerageConnectionRequest;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class SewerageDaoImpl implements SewerageDao {

	@Autowired
	private SewarageConnectionProducer sewarageConnectionProducer;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private SWQueryBuilder swQueryBuilder;

	@Autowired
	private SewerageRowMapper sewarageRowMapper;

	@Autowired
	private OpenSewerageRowMapper openSewerageRowMapper;

	@Autowired
	private SWConfiguration swConfiguration;

	@Autowired
	private MultiStateInstanceUtil centralInstanceutil;

	private EncryptionCountRowMapper encryptionCountRowMapper;

	@Value("${egov.sewarageservice.createconnection.topic}")
	private String createSewarageConnection;

	@Value("${egov.sewarageservice.updateconnection.topic}")
	private String updateSewarageConnection;

	@Value("${egov.sewerageservice.oldDataEncryptionStatus.topic}")
	private String encryptionStatusTopic;

	@Value("${egov.sewerageservice.update.oldData.topic}")
	private String updateOldDataEncTopic;

	@Override
	public void saveSewerageConnection(SewerageConnectionRequest sewerageConnectionRequest) {
		sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(),createSewarageConnection, sewerageConnectionRequest);
	}

	@Override
	public List<SewerageConnection> getSewerageConnectionList(SearchCriteria criteria, RequestInfo requestInfo) {
		List<Object> preparedStatement = new ArrayList<>();
		String query = swQueryBuilder.getSearchQueryString(criteria, preparedStatement, requestInfo);
		if (query == null)
			return Collections.emptyList();

		try {
			query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
		} catch (InvalidTenantIdException e) {
			throw new CustomException("SW_SEARCH_TENANTID_ERROR",
					"TenantId length is not sufficient to replace query schema in a multi state instance");
		}

		Boolean isOpenSearch = isSearchOpen(requestInfo.getUserInfo());
		List<SewerageConnection> sewerageConnectionList = new ArrayList<>();
		if(isOpenSearch)
			sewerageConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(),
					openSewerageRowMapper);
		else
			sewerageConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(),
					sewarageRowMapper);

		if (sewerageConnectionList == null) {
			return Collections.emptyList();
		}
		return sewerageConnectionList;
	}

	public Integer getSewerageConnectionsCount(SearchCriteria criteria, RequestInfo requestInfo) {
		List<Object> preparedStatement = new ArrayList<>();
		String query = swQueryBuilder.getSearchCountQueryString(criteria, preparedStatement, requestInfo);
		if (query == null)
			return 0;

		try {
			query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
		} catch (InvalidTenantIdException e) {
			throw new CustomException("SW_SEARCH_COUNT_TENANTID_ERROR",
					"TenantId length is not sufficient to replace query schema in a multi state instance");
		}
		Integer count = jdbcTemplate.queryForObject(query, preparedStatement.toArray(), Integer.class);
		return count;
	}

	public Boolean isSearchOpen(User userInfo) {

		return userInfo.getType().equalsIgnoreCase("SYSTEM")
				&& userInfo.getRoles().stream().map(Role::getCode).collect(Collectors.toSet()).contains("ANONYMOUS");
	}

	public void updateSewerageConnection(SewerageConnectionRequest sewerageConnectionRequest,
			boolean isStateUpdatable) {
		String reqAction = sewerageConnectionRequest.getSewerageConnection().getProcessInstance().getAction();
		if (isStateUpdatable) {
			if (SWConstants.EXECUTE_DISCONNECTION.equalsIgnoreCase(reqAction)) {
				sewerageConnectionRequest.getSewerageConnection().setStatus(Connection.StatusEnum.INACTIVE);
			}
			sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(), updateSewarageConnection, sewerageConnectionRequest);
		} else if (SWConstants.EXECUTE_DISCONNECTION.equalsIgnoreCase(sewerageConnectionRequest.getSewerageConnection().getProcessInstance().getAction())) {
			sewerageConnectionRequest.getSewerageConnection().setStatus(Connection.StatusEnum.INACTIVE);
			sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(), updateSewarageConnection, sewerageConnectionRequest);
		} else {
			sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(), swConfiguration.getWorkFlowUpdateTopic(), sewerageConnectionRequest);
		}
	}

	/**
	 * push object for edit notification
	 * 
	 * @param sewerageConnectionRequest - Sewerage Connection Request Object
	 */
	public void pushForEditNotification(SewerageConnectionRequest sewerageConnectionRequest,
										boolean isStateUpdatable) {
		if (isStateUpdatable && !SWConstants.EDIT_NOTIFICATION_STATE
				.contains(sewerageConnectionRequest.getSewerageConnection().getProcessInstance().getAction())) {
			sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(),swConfiguration.getEditNotificationTopic(), sewerageConnectionRequest);
		}
	}

	/**
	 * Enrich file store Id's
	 * 
	 * @param sewerageConnectionRequest - Sewerage Connection Request Object
	 */
	public void enrichFileStoreIds(SewerageConnectionRequest sewerageConnectionRequest) {
		sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(),swConfiguration.getFileStoreIdsTopic(), sewerageConnectionRequest);
	}

	/**
	 * Save file store Id's
	 * 
	 * @param sewerageConnectionRequest - Sewerage Connection Request Object
	 */
	public void saveFileStoreIds(SewerageConnectionRequest sewerageConnectionRequest) {
		sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(),swConfiguration.getSaveFileStoreIdsTopic(), sewerageConnectionRequest);
	}

	@Override
	public List<SewerageConnection> getSewerageConnectionPlainSearchList(SearchCriteria criteria, RequestInfo requestInfo) {
		List<Object> preparedStatement = new ArrayList<>();
		String query = swQueryBuilder.getSearchQueryStringForPlainSearch(criteria, preparedStatement, requestInfo);
		if (query == null)
			return Collections.emptyList();

		try {
			query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
		} catch (InvalidTenantIdException e) {
			throw new CustomException("SW_PLAINSEARCH_TENANTID_ERROR",
					"TenantId length is not sufficient to replace query schema in a multi state instance");
		}

		log.info("\nFinal Query ::" + query);
		Boolean isOpenSearch = isSearchOpen(requestInfo.getUserInfo());
		List<SewerageConnection> sewerageConnectionList = new ArrayList<>();
		if(isOpenSearch)
			sewerageConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(),
					openSewerageRowMapper);
		else
			sewerageConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(),
					sewarageRowMapper);

		if (sewerageConnectionList == null) {
			return Collections.emptyList();
		}
		return sewerageConnectionList;
	}

	/* Method to push the encrypted data to the 'update' topic  */
	@Override
	public void updateOldSewerageConnections(SewerageConnectionRequest sewerageConnectionRequest) {
		sewarageConnectionProducer.push(sewerageConnectionRequest.getSewerageConnection().getTenantId(), updateSewarageConnection, sewerageConnectionRequest);

	}

	/* Method to find the total count of applications present in dB */
	@Override
	public Integer getTotalApplications(SearchCriteria criteria) {
		List<Object> preparedStatement = new ArrayList<>();
		String query = swQueryBuilder.getTotalApplicationsCountQueryString(criteria, preparedStatement);
		if (query == null)
			return 0;

		try {
			query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
		} catch (InvalidTenantIdException e) {
			throw new CustomException("SW_ENCRYPTION_TOTAL_APPLICATION_SEARCH_TENANTID_ERROR",
					"TenantId length is not sufficient to replace query schema in a multi state instance");
		}

		Integer count = jdbcTemplate.queryForObject(query, preparedStatement.toArray(), Integer.class);
		return count;
	}

	/* Method to push the old data encryption status to the 'ws-enc-audit' topic  */
	@Override
	public void updateEncryptionStatus(EncryptionCount encryptionCount) {
		sewarageConnectionProducer.push(encryptionCount.getTenantid(), encryptionStatusTopic, encryptionCount);
	}

	/* Method to find the last execution details in dB */
	@Override
	public EncryptionCount getLastExecutionDetail(SearchCriteria criteria) {

		List<Object> preparedStatement = new ArrayList<>();
		String query = swQueryBuilder.getLastExecutionDetail(criteria, preparedStatement);

		log.info("\nQuery executed:" + query);
		if (query == null)
			return null;
		EncryptionCount encryptionCount = jdbcTemplate.query(query, preparedStatement.toArray(), encryptionCountRowMapper);
		return encryptionCount;
	}

}
