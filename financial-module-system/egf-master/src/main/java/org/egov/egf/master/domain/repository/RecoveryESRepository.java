package org.egov.egf.master.domain.repository;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.Recovery;
import org.egov.egf.master.persistence.entity.RecoveryEntity;
import org.egov.egf.master.web.contract.RecoverySearchContract;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RecoveryESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(SubSchemeESRepository.class);
    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(RecoveryESRepository.class);

    public RecoveryESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<Recovery> search(RecoverySearchContract recoverySearchContract) {
        try {
            // Build the search request
            SearchRequest searchRequest = getSearchRequest(recoverySearchContract);

            // Execute the search
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

            // Map and return the results
            return mapToRecoveryList(searchResponse, recoverySearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<Recovery> mapToRecoveryList(SearchResponse searchResponse, RecoverySearchContract recoverySearchContract) {
        Pagination<Recovery> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<Recovery> recoverys = new ArrayList<Recovery>();
        Recovery recovery = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                recovery = mapper.readValue(hit.getSourceAsString(), Recovery.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("Error while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("JSON mapping exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("IO exception occurred: " + e1.getMessage());
            }

            recoverys.add(recovery);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(recoverys);

        return page;
    }

    private SearchRequest getSearchRequest(RecoverySearchContract criteria) {
        List<String> orderByList = new ArrayList<>();

        // Validate and prepare sorting fields
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), RecoveryEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build the query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchRecovery(criteria);

        // Prepare the SearchSourceBuilder
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        // Apply sorting
        for (String orderBy : orderByList) {
            String[] parts = orderBy.split(" ");
            String field = parts[0];
            SortOrder order = parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
            sourceBuilder.sort(field, order);
        }

        // Build and return the SearchRequest
        SearchRequest searchRequest = new SearchRequest(Recovery.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
