package org.egov.egf.instrument.domain.repository;

import java.util.Map;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.InstrumentType;
import org.egov.egf.instrument.persistence.entity.InstrumentTypeEntity;
import org.egov.egf.instrument.web.contract.InstrumentTypeSearchContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class InstrumentTypeESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(InstrumentTypeESRepository.class);
    private static final String INDEX_NAME = "instrumenttype";

    @Autowired
    private ESHttpClient esHttpClient;

    @Autowired
    private ESQueryFactory esQueryFactory;

    public Pagination<InstrumentType> search(InstrumentTypeSearchContract instrumentTypeSearchContract) {
        try {
            validateSortBy(instrumentTypeSearchContract.getSortBy());
            
            Map<String, Object> query = esQueryFactory.buildInstrumentTypeQuery(instrumentTypeSearchContract);
            
            logger.debug("Searching instrument types with query: {}", query);
            
            return esHttpClient.search(INDEX_NAME, query, InstrumentType.class);
            
        } catch (Exception e) {
            logger.error("Error occurred while searching instrument types: {}", e.getMessage(), e);
            return new Pagination<>();
        }
    }

    private void validateSortBy(String sortBy) {
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            validateSortByOrder(sortBy);
            validateEntityFieldName(sortBy, InstrumentTypeEntity.class);
        }
    }

}
