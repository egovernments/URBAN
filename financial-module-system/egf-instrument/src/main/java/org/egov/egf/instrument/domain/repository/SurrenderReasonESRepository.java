package org.egov.egf.instrument.domain.repository;

import java.util.Map;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.SurrenderReason;
import org.egov.egf.instrument.persistence.entity.SurrenderReasonEntity;
import org.egov.egf.instrument.web.contract.SurrenderReasonSearchContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurrenderReasonESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(SurrenderReasonESRepository.class);
    private static final String INDEX_NAME = "surrenderreason";

    @Autowired
    private ESHttpClient esHttpClient;

    @Autowired
    private ESQueryFactory esQueryFactory;

    public Pagination<SurrenderReason> search(SurrenderReasonSearchContract surrenderReasonSearchContract) {
        try {
            validateSortBy(surrenderReasonSearchContract.getSortBy());
            
            Map<String, Object> query = esQueryFactory.buildSurrenderReasonQuery(surrenderReasonSearchContract);
            
            logger.debug("Searching surrender reasons with query: {}", query);
            
            return esHttpClient.search(INDEX_NAME, query, SurrenderReason.class);
            
        } catch (Exception e) {
            logger.error("Error occurred while searching surrender reasons: {}", e.getMessage(), e);
            return new Pagination<>();
        }
    }

    private void validateSortBy(String sortBy) {
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            validateSortByOrder(sortBy);
            validateEntityFieldName(sortBy, SurrenderReasonEntity.class);
        }
    }

}
