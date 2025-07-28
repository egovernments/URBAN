package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.AccountDetailType;
import org.egov.egf.master.persistence.entity.AccountDetailTypeEntity;
import org.egov.egf.master.web.contract.AccountDetailTypeSearchContract;
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
public class AccountDetailTypeESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(SubSchemeESRepository.class);
    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(AccountDetailTypeESRepository.class);

    public AccountDetailTypeESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<AccountDetailType> search(AccountDetailTypeSearchContract accountCodeTypeSearchContract) {
        try {
            // Build the search request
            SearchRequest searchRequest = getSearchRequest(accountCodeTypeSearchContract);

            // Execute the search
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

            // Map and return the results
            return mapToAccountDetailTypeList(searchResponse, accountCodeTypeSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }

    @SuppressWarnings("deprecation")
    private Pagination<AccountDetailType> mapToAccountDetailTypeList(SearchResponse searchResponse,
            AccountDetailTypeSearchContract accountCodeTypeSearchContract) {
        Pagination<AccountDetailType> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<AccountDetailType> accountDetailkeys = new ArrayList<AccountDetailType>();
        AccountDetailType accountDetailKey = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                accountDetailKey = mapper.readValue(hit.getSourceAsString(), AccountDetailType.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("Exception occurred while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("Json mapping exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("IO exception occurred: " + e1.getMessage());
            }

            accountDetailkeys.add(accountDetailKey);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(accountDetailkeys);

        return page;
    }

    private SearchRequest getSearchRequest(AccountDetailTypeSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();

        // Validate and prepare sorting fields
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), AccountDetailTypeEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build the query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchAccountDetailType(criteria);

        // Prepare SearchSourceBuilder with query
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        // Apply sorting
        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                String field = parts[0];
                SortOrder sortOrder = parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
                sourceBuilder.sort(field, sortOrder);
            }
        }

        // Build and return SearchRequest
        SearchRequest searchRequest = new SearchRequest(AccountDetailType.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
