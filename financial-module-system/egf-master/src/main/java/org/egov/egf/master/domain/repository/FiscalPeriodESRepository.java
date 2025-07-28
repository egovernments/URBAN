package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.FiscalPeriod;
import org.egov.egf.master.persistence.entity.FiscalPeriodEntity;
import org.egov.egf.master.web.contract.FiscalPeriodSearchContract;
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
public class FiscalPeriodESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(FiscalPeriodESRepository.class);
    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(FiscalPeriodESRepository.class);

    public FiscalPeriodESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<FiscalPeriod> search(FiscalPeriodSearchContract fiscalPeriodSearchContract) {
        SearchRequest searchRequest = getSearchRequest(fiscalPeriodSearchContract); // now returns RestHighLevelClient-style request
        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToFiscalPeriodList(searchResponse, fiscalPeriodSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<FiscalPeriod> mapToFiscalPeriodList(SearchResponse searchResponse,
            FiscalPeriodSearchContract fiscalPeriodSearchContract) {
        Pagination<FiscalPeriod> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<FiscalPeriod> fiscalPeriods = new ArrayList<FiscalPeriod>();
        FiscalPeriod fiscalPeriod = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                fiscalPeriod = mapper.readValue(hit.getSourceAsString(), FiscalPeriod.class);
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

            fiscalPeriods.add(fiscalPeriod);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(fiscalPeriods);

        return page;
    }

    private SearchRequest getSearchRequest(FiscalPeriodSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();

        // Validate and prepare sorting fields
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), FiscalPeriodEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Build the query
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchFiscalPeriod(criteria);

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
        SearchRequest searchRequest = new SearchRequest(FiscalPeriod.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
