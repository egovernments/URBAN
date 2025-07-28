package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.ChartOfAccount;
import org.egov.egf.master.persistence.entity.ChartOfAccountEntity;
import org.egov.egf.master.web.contract.ChartOfAccountSearchContract;
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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ChartOfAccountESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(SubSchemeESRepository.class);

    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(ChartOfAccountESRepository.class);

    public ChartOfAccountESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<ChartOfAccount> search(ChartOfAccountSearchContract chartOfAccountSearchContract) {
        try {
            // Build the search request
            SearchRequest searchRequest = getSearchRequest(chartOfAccountSearchContract);

            // Execute the search
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

            // Map and return the results
            return mapToChartOfAccountList(searchResponse, chartOfAccountSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<ChartOfAccount> mapToChartOfAccountList(SearchResponse searchResponse,
            ChartOfAccountSearchContract chartOfAccountSearchContract) {
        Pagination<ChartOfAccount> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<ChartOfAccount> chartOfAccounts = new ArrayList<ChartOfAccount>();
        ChartOfAccount chartOfAccount = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                chartOfAccount = mapper.readValue(hit.getSourceAsString(), ChartOfAccount.class);
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

            chartOfAccounts.add(chartOfAccount);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(chartOfAccounts);

        return page;
    }

    private SearchRequest getSearchRequest(ChartOfAccountSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();

        // Validate and prepare sorting fields
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), ChartOfAccountEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build the query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchChartOfAccount(criteria);

        // Prepare search source
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        // Apply sorting
        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                String field = parts[0];
                SortOrder order = parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
                sourceBuilder.sort(field, order);
            }
        }

        // Build and return the search request
        SearchRequest searchRequest = new SearchRequest(ChartOfAccount.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
