package org.egov.egf.instrument.domain.repository;

import java.util.Map;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.InstrumentAccountCode;
import org.egov.egf.instrument.persistence.entity.InstrumentAccountCodeEntity;
import org.egov.egf.instrument.web.contract.InstrumentAccountCodeSearchContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstrumentAccountCodeESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(InstrumentAccountCodeESRepository.class);
    private static final String INDEX_NAME = "instrumentaccountcode";

    @Autowired
    private ESHttpClient esHttpClient;

    @Autowired
    private ESQueryFactory esQueryFactory;

    public Pagination<InstrumentAccountCode> search(InstrumentAccountCodeSearchContract instrumentAccountCodeSearchContract) {
        try {
            validateSortBy(instrumentAccountCodeSearchContract.getSortBy());
            
            Map<String, Object> query = esQueryFactory.buildInstrumentAccountCodeQuery(instrumentAccountCodeSearchContract);
            
            logger.debug("Searching instrument account codes with query: {}", query);
            
            return esHttpClient.search(INDEX_NAME, query, InstrumentAccountCode.class);
            
        } catch (Exception e) {
            logger.error("Error occurred while searching instrument account codes: {}", e.getMessage(), e);
            return new Pagination<>();
        }
    }

    private void validateSortBy(String sortBy) {
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            validateSortByOrder(sortBy);
            validateEntityFieldName(sortBy, InstrumentAccountCodeEntity.class);
        }
    }
}
