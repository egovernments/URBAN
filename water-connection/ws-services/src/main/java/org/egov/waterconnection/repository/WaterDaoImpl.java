package org.egov.waterconnection.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.common.contract.request.User;
import org.egov.common.exception.InvalidTenantIdException;
import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.tracer.model.CustomException;
import org.egov.waterconnection.config.WSConfiguration;
import org.egov.waterconnection.constants.WCConstants;
import org.egov.waterconnection.repository.rowmapper.EncryptionCountRowMapper;
import org.egov.waterconnection.repository.rowmapper.OpenWaterRowMapper;

import org.egov.waterconnection.web.models.SearchCriteria;
import org.egov.waterconnection.web.models.WaterConnection;
import org.egov.waterconnection.web.models.WaterConnectionRequest;
import org.egov.waterconnection.web.models.WaterConnectionResponse;
import org.egov.waterconnection.web.models.*;

import org.egov.waterconnection.producer.WaterConnectionProducer;
import org.egov.waterconnection.repository.builder.WsQueryBuilder;
import org.egov.waterconnection.repository.rowmapper.WaterRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class WaterDaoImpl implements WaterDao {

    @Autowired
    private WaterConnectionProducer waterConnectionProducer;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private WsQueryBuilder wsQueryBuilder;

    @Autowired
    private WaterRowMapper waterRowMapper;

    @Autowired
    private OpenWaterRowMapper openWaterRowMapper;

    @Autowired
    private WSConfiguration wsConfiguration;

    @Autowired
	private EncryptionCountRowMapper encryptionCountRowMapper;

	@Value("${egov.waterservice.createwaterconnection.topic}")
	private String createWaterConnection;

	@Value("${egov.waterservice.updatewaterconnection.topic}")
	private String updateWaterConnection;

	@Value("${egov.waterservice.oldDataEncryptionStatus.topic}")
	private String encryptionStatusTopic;

	@Value("${egov.waterservice.update.oldData.topic}")
	private String updateOldDataEncTopic;

    @Autowired
    private MultiStateInstanceUtil centralInstanceutil;

	@Override
    public void saveWaterConnection(WaterConnectionRequest waterConnectionRequest) {
        waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), createWaterConnection, waterConnectionRequest);
    }

    @Override
    public List<WaterConnection> getWaterConnectionList(SearchCriteria criteria,
                                                        RequestInfo requestInfo) {

        List<WaterConnection> waterConnectionList = new ArrayList<>();
        List<Object> preparedStatement = new ArrayList<>();
        String query = wsQueryBuilder.getSearchQueryString(criteria, preparedStatement, requestInfo);

        if (query == null)
            return Collections.emptyList();

        try {
            query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
        } catch (InvalidTenantIdException e) {
            throw new CustomException("WS_SEARCH_TENANTID_ERROR",
                    "TenantId length is not sufficient to replace query schema in a multi state instance");
        }

        Boolean isOpenSearch = isSearchOpen(requestInfo.getUserInfo());

        if (isOpenSearch)
            waterConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(),
                    openWaterRowMapper);
        else
            waterConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(),
                    waterRowMapper);
        if (waterConnectionList == null)
            return Collections.emptyList();
        return waterConnectionList;
    }

    public Integer getWaterConnectionsCount(SearchCriteria criteria, RequestInfo requestInfo) {
        List<Object> preparedStatement = new ArrayList<>();
        String query = wsQueryBuilder.getSearchCountQueryString(criteria, preparedStatement, requestInfo);

        if (query == null)
            return 0;

        try {
            query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
        } catch (InvalidTenantIdException e) {
            throw new CustomException("WS_SEARCH_COUNT_TENANTID_ERROR",
                    "TenantId length is not sufficient to replace query schema in a multi state instance");
        }

        Integer count = jdbcTemplate.queryForObject(query, preparedStatement.toArray(), Integer.class);
        return count;
    }

    @Override
    public void updateWaterConnection(WaterConnectionRequest waterConnectionRequest, boolean isStateUpdatable) {
        String reqAction = waterConnectionRequest.getWaterConnection().getProcessInstance().getAction();
        if (isStateUpdatable) {
            if (WCConstants.EXECUTE_DISCONNECTION.equalsIgnoreCase(reqAction)) {
                waterConnectionRequest.getWaterConnection().setStatus(Connection.StatusEnum.INACTIVE);
            }
            waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), updateWaterConnection, waterConnectionRequest);
        } else {
            waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), wsConfiguration.getWorkFlowUpdateTopic(), waterConnectionRequest);
        }
    }

    /**
     * push object to create meter reading
     *
     * @param waterConnectionRequest
     */
    public void postForMeterReading(WaterConnectionRequest waterConnectionRequest) {
        log.info("Posting request to kafka topic - " + wsConfiguration.getCreateMeterReading());
        waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), wsConfiguration.getCreateMeterReading(), waterConnectionRequest);
    }

    /**
     * push object for edit notification
     *
     * @param waterConnectionRequest
     */
    public void pushForEditNotification(WaterConnectionRequest waterConnectionRequest, boolean isStateUpdatable) {
        if (isStateUpdatable && !WCConstants.EDIT_NOTIFICATION_STATE
                .contains(waterConnectionRequest.getWaterConnection().getProcessInstance().getAction())) {
            waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), wsConfiguration.getEditNotificationTopic(), waterConnectionRequest);
        }
    }

    /**
     * Enrich file store Id's
     *
     * @param waterConnectionRequest
     */
    public void enrichFileStoreIds(WaterConnectionRequest waterConnectionRequest) {
        waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), wsConfiguration.getFileStoreIdsTopic(), waterConnectionRequest);
    }

    /**
     * Save file store Id's
     *
     * @param waterConnectionRequest
     */
    public void saveFileStoreIds(WaterConnectionRequest waterConnectionRequest) {
        waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), wsConfiguration.getSaveFileStoreIdsTopic(), waterConnectionRequest);
    }

    public Boolean isSearchOpen(User userInfo) {

        return userInfo.getType().equalsIgnoreCase("SYSTEM")
                && userInfo.getRoles().stream().map(Role::getCode).collect(Collectors.toSet()).contains("ANONYMOUS");
    }

    @Override
    public WaterConnectionResponse getWaterConnectionListForPlainSearch(SearchCriteria criteria, RequestInfo requestInfo) {

        List<WaterConnection> waterConnectionList = new ArrayList<>();
        List<Object> preparedStatement = new ArrayList<>();

        Set<String> ids = new HashSet<String>();
        List<String> connectionIds = null;
        if (criteria.getIds() != null && !criteria.getIds().isEmpty())
            ids = criteria.getIds();
        else
            connectionIds = fetchWaterConIds(criteria);

        if (connectionIds != null && connectionIds.size() > 0) {
//		for (String id : connectionIds) {
            ids.addAll(connectionIds);
//		}
        }
        if (ids.isEmpty())
            return new WaterConnectionResponse();

        criteria.setIds(ids);

        String query = wsQueryBuilder.getSearchQueryStringForPlainSearch(criteria, preparedStatement, requestInfo);

        if (query == null)
            return null;
        try {
            query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
        } catch (InvalidTenantIdException e) {
            throw new CustomException("WS_PLAINSEARCH_TENANTID_ERROR",
                    "TenantId length is not sufficient to replace query schema in a multi state instance");
        }

        Boolean isOpenSearch = isSearchOpen(requestInfo.getUserInfo());
        WaterConnectionResponse connectionResponse = new WaterConnectionResponse();
        if (isOpenSearch) {
            waterConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(), openWaterRowMapper);
            connectionResponse = WaterConnectionResponse.builder().waterConnection(waterConnectionList)
                    .totalCount(openWaterRowMapper.getFull_count()).build();
        } else {
            waterConnectionList = jdbcTemplate.query(query, preparedStatement.toArray(), waterRowMapper);
            connectionResponse = WaterConnectionResponse.builder().waterConnection(waterConnectionList)
                    .totalCount(waterRowMapper.getFull_count()).build();
        }
        return connectionResponse;
    }

    public List<String> fetchWaterConIds(SearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        preparedStmtList.add(criteria.getOffset());
        preparedStmtList.add(criteria.getLimit());

        String query;
        try {
            query = centralInstanceutil.replaceSchemaPlaceholder("SELECT id from {schema}.eg_ws_connection ORDER BY createdtime offset " +
                    " ? " +
                    "limit ? ", criteria.getTenantId());
        } catch (InvalidTenantIdException e) {
            throw new CustomException("WS_WATERCONNECTION_SEARCH_TENANTID_ERROR",
                    "TenantId length is not sufficient to replace query schema in a multi state instance");
        }
        List<String> ids = jdbcTemplate.query(query,
                preparedStmtList.toArray(),
                new SingleColumnRowMapper<>(String.class));
        return ids;
    }

    /* Method to push the encrypted data to the 'update' topic  */
    @Override
    public void updateOldWaterConnections(WaterConnectionRequest waterConnectionRequest) {
        waterConnectionProducer.push(waterConnectionRequest.getWaterConnection().getTenantId(), updateWaterConnection, waterConnectionRequest);
    }

    /* Method to find the total count of applications present in dB */
    @Override
    public Integer getTotalApplications(SearchCriteria criteria) {

        List<Object> preparedStatement = new ArrayList<>();
        String query = wsQueryBuilder.getTotalApplicationsCountQueryString(criteria, preparedStatement);
        if (query == null)
            return 0;
        try {
            query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
        } catch (InvalidTenantIdException e) {
            throw new CustomException("WS_ENCRYPTION_TOTAL_APPLICATION_SEARCH_TENANTID_ERROR",
                    "TenantId length is not sufficient to replace query schema in a multi state instance");
        }

        Integer count = jdbcTemplate.queryForObject(query, preparedStatement.toArray(), Integer.class);
        return count;
    }

    /* Method to push the old data encryption status to the 'ws-enc-audit' topic  */
    @Override
    public void updateEncryptionStatus(EncryptionCount encryptionCount) {
        waterConnectionProducer.push(encryptionCount.getTenantid(), encryptionStatusTopic, encryptionCount);
    }

    /* Method to find the last execution details in dB */
    @Override
    public EncryptionCount getLastExecutionDetail(SearchCriteria criteria) {

        List<Object> preparedStatement = new ArrayList<>();
        String query = wsQueryBuilder.getLastExecutionDetail(criteria, preparedStatement);

        try {
            query = centralInstanceutil.replaceSchemaPlaceholder(query, criteria.getTenantId());
        } catch (InvalidTenantIdException e) {
            throw new CustomException("WS_ENCRYPTION_TOTAL_APPLICATION_SEARCH_TENANTID_ERROR",
                    "TenantId length is not sufficient to replace query schema in a multi state instance");
        }

        log.info("\nQuery executed:" + query);
        if (query == null)
            return null;
        EncryptionCount encryptionCount = jdbcTemplate.query(query, preparedStatement.toArray(), encryptionCountRowMapper);
        return encryptionCount;
    }

}
