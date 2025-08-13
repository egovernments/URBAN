package org.egov.egf.instrument.domain.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.SurrenderReason;
import org.egov.egf.instrument.persistence.entity.SurrenderReasonEntity;
import org.egov.egf.instrument.web.contract.SurrenderReasonSearchContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SurrenderReasonESRepository extends ESRepository {

    private final ElasticsearchClient esClient;
    private final ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger logger = LoggerFactory.getLogger(SurrenderReasonESRepository.class);

    public SurrenderReasonESRepository(ElasticsearchClient esClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.esClient = esClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<SurrenderReason> search(SurrenderReasonSearchContract surrenderReasonSearchContract) {
        try {
            SearchRequest searchRequest = getSearchRequest(surrenderReasonSearchContract);
            SearchResponse<SurrenderReason> searchResponse =
                    esClient.search(searchRequest, SurrenderReason.class);

            return mapToSurrenderReasonList(searchResponse);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }

    private Pagination<SurrenderReason> mapToSurrenderReasonList(SearchResponse<SurrenderReason> searchResponse) {
        Pagination<SurrenderReason> page = new Pagination<>();
        if (searchResponse.hits().total() == null || searchResponse.hits().total().value() == 0)
            return page;

        List<SurrenderReason> surrenderReasons = new ArrayList<>();
        searchResponse.hits().hits().forEach(hit -> {
            if (hit.source() != null) {
                surrenderReasons.add(hit.source());
            }
        });

        page.setTotalResults((int) searchResponse.hits().total().value());
        page.setPagedData(surrenderReasons);

        return page;
    }

    private SearchRequest getSearchRequest(SurrenderReasonSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), SurrenderReasonEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        BoolQuery boolQuery = elasticSearchQueryFactory.searchSurrenderReasonBool(criteria);

        SearchRequest.Builder builder = new SearchRequest.Builder()
                .index(SurrenderReason.class.getSimpleName().toLowerCase())
                .query(boolQuery._toQuery());

        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] sortParts = orderBy.split(" ");
                builder.sort(s -> s
                        .field(f -> f
                                .field(sortParts[0])
                                .order(sortParts[1].equalsIgnoreCase("asc") ? SortOrder.Asc : SortOrder.Desc)
                        )
                );
            }
        }

        return builder.build();
    }
}
