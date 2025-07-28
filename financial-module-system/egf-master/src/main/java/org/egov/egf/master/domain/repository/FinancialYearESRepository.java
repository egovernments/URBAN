package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.FinancialYear;
import org.egov.egf.master.persistence.entity.FinancialYearEntity;
import org.egov.egf.master.web.contract.FinancialYearSearchContract;
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
public class FinancialYearESRepository extends ESRepository {

    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger logger = LoggerFactory.getLogger(FinancialYearESRepository.class);

    public FinancialYearESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<FinancialYear> search(FinancialYearSearchContract financialYearSearchContract) {
        SearchRequest searchRequest = getSearchRequest(financialYearSearchContract); // now returns SearchRequest
        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToFinancialYearList(searchResponse, financialYearSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<FinancialYear> mapToFinancialYearList(SearchResponse searchResponse,
            FinancialYearSearchContract financialYearSearchContract) {
        Pagination<FinancialYear> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<FinancialYear> financialYears = new ArrayList<FinancialYear>();
        FinancialYear financialYear = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                financialYear = mapper.readValue(hit.getSourceAsString(), FinancialYear.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                logger.error("Error while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                logger.error("JSON mapping exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                logger.error("IO exception occurred: " + e1.getMessage());
            }

            financialYears.add(financialYear);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(financialYears);

        return page;
    }

    private SearchRequest getSearchRequest(FinancialYearSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), FinancialYearEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchFinancialYear(criteria);
        // Build search source
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQueryBuilder);
        // Apply sorting if specified
        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                if (parts.length == 2) {
                    searchSourceBuilder.sort(parts[0],
                            parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC);
                }
            }
        }
        // Create and return the search request
        SearchRequest searchRequest = new SearchRequest(FinancialYear.class.getSimpleName().toLowerCase());
        searchRequest.source(searchSourceBuilder);

        return searchRequest;
    }


}
