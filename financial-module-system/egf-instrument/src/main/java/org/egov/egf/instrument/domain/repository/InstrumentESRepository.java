package org.egov.egf.instrument.domain.repository;

import java.util.Map;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.Instrument;
import org.egov.egf.instrument.persistence.entity.InstrumentEntity;
import org.egov.egf.instrument.web.contract.InstrumentSearchContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstrumentESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(InstrumentESRepository.class);
    private static final String INDEX_NAME = "instrument";

    @Autowired
    private ESHttpClient esHttpClient;

    @Autowired
    private ESQueryFactory esQueryFactory;

    public Pagination<Instrument> search(InstrumentSearchContract instrumentSearchContract) {
        try {
            validateSortBy(instrumentSearchContract.getSortBy());
            
            Map<String, Object> query = esQueryFactory.buildInstrumentQuery(instrumentSearchContract);
            
            logger.debug("Searching instruments with query: {}", query);
            
            return esHttpClient.search(INDEX_NAME, query, Instrument.class);
            
        } catch (Exception e) {
            logger.error("Error occurred while searching instruments: {}", e.getMessage(), e);
            return new Pagination<>();
        }
    }

    private void validateSortBy(String sortBy) {
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            validateSortByOrder(sortBy);
            validateEntityFieldName(sortBy, InstrumentEntity.class);
        }
    }
}