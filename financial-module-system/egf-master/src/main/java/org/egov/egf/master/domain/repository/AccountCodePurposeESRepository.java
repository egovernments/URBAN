package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.AccountCodePurpose;
import org.egov.egf.master.persistence.entity.AccountCodePurposeEntity;
import org.egov.egf.master.web.contract.AccountCodePurposeSearchContract;
import org.elasticsearch.action.search.SearchRequest;
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
public class AccountCodePurposeESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(FundsourceESRepository.class);
    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(AccountCodePurposeESRepository.class);

    public AccountCodePurposeESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<AccountCodePurpose> search(AccountCodePurposeSearchContract accountCodePurposeSearchContract) {
        SearchRequest searchRequest = getSearchRequest(accountCodePurposeSearchContract); // updated method as per previous reply
        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToAccountCodePurposeList(searchResponse, accountCodePurposeSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<AccountCodePurpose> mapToAccountCodePurposeList(SearchResponse searchResponse,
            AccountCodePurposeSearchContract accountCodePurposeSearchContract) {
        Pagination<AccountCodePurpose> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<AccountCodePurpose> accountCodePurposes = new ArrayList<AccountCodePurpose>();
        AccountCodePurpose accountCodePurpose = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                accountCodePurpose = mapper.readValue(hit.getSourceAsString(), AccountCodePurpose.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("Exception occurred while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("JSON Mapping Exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("IO Exception occurred: " + e1.getMessage());
            }

            accountCodePurposes.add(accountCodePurpose);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(accountCodePurposes);

        return page;
    }

    private SearchRequest getSearchRequest(AccountCodePurposeSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), AccountCodePurposeEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build the query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchAccountCodePurpose(criteria);

        // Prepare SearchSourceBuilder
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQueryBuilder);

        // Add sorting if available
        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                if (parts.length == 2) {
                    searchSourceBuilder.sort(parts[0],
                            parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC);
                }
            }
        }

        // Create and return SearchRequest
        SearchRequest searchRequest = new SearchRequest(AccountCodePurpose.class.getSimpleName().toLowerCase());
        searchRequest.source(searchSourceBuilder);

        return searchRequest;
    }

}
