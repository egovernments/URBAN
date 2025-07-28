package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.BudgetGroup;
import org.egov.egf.master.persistence.entity.BudgetGroupEntity;
import org.egov.egf.master.web.contract.BudgetGroupSearchContract;
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
public class BudgetGroupESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(SubSchemeESRepository.class);
    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(BudgetGroupESRepository.class);

    public BudgetGroupESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<BudgetGroup> search(BudgetGroupSearchContract budgetGroupSearchContract) {
        try {
            // Build the search request
            SearchRequest searchRequest = getSearchRequest(budgetGroupSearchContract);

            // Execute the search request
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

            // Map and return the results
            return mapToBudgetGroupList(searchResponse, budgetGroupSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<BudgetGroup> mapToBudgetGroupList(SearchResponse searchResponse,
            BudgetGroupSearchContract budgetGroupSearchContract) {
        Pagination<BudgetGroup> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<BudgetGroup> budgetGroups = new ArrayList<BudgetGroup>();
        BudgetGroup budgetGroup = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                budgetGroup = mapper.readValue(hit.getSourceAsString(), BudgetGroup.class);
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

            budgetGroups.add(budgetGroup);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(budgetGroups);

        return page;
    }

    private SearchRequest getSearchRequest(BudgetGroupSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();

        // Validate and prepare sorting fields
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), BudgetGroupEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build the query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchBudgetGroup(criteria);

        // Prepare SearchSourceBuilder with query and sorting
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                String field = parts[0];
                SortOrder sortOrder = parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
                sourceBuilder.sort(field, sortOrder);
            }
        }

        // Build and return SearchRequest with index name
        SearchRequest searchRequest = new SearchRequest(BudgetGroup.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
