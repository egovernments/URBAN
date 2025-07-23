package org.egov.egf.instrument.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.SurrenderReason;
import org.egov.egf.instrument.persistence.entity.SurrenderReasonEntity;
import org.egov.egf.instrument.web.contract.SurrenderReasonSearchContract;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.*;
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
public class SurrenderReasonESRepository extends ESRepository {

    private RestHighLevelClient restHighLevelClient;

    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger logger = LoggerFactory.getLogger(SurrenderReasonESRepository.class);

    public SurrenderReasonESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<SurrenderReason> search(SurrenderReasonSearchContract surrenderReasonSearchContract) {
        try {
            SearchRequest searchRequest = getSearchRequest(surrenderReasonSearchContract); // updated method
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToSurrenderReasonList(searchResponse);
        } catch (IOException e) {
            logger.error("Elasticsearch search failed: {}", e.getMessage(), e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<SurrenderReason> mapToSurrenderReasonList(SearchResponse searchResponse) {
        Pagination<SurrenderReason> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0)
            return page;
        List<SurrenderReason> surrenderReasons = new ArrayList<SurrenderReason>();
        SurrenderReason surrenderReason = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                surrenderReason = mapper.readValue(hit.getSourceAsString(), SurrenderReason.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                logger.error("Error while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                logger.error("JSON mapping exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                logger.error("IO Exception occurred: " + e1.getMessage());
            }

            surrenderReasons.add(surrenderReason);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
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

        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchSurrenderReason(criteria);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                String field = parts[0];
                SortOrder order = parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
                sourceBuilder.sort(field, order);
            }
        }

        SearchRequest searchRequest = new SearchRequest("surrenderreason"); // index name
        searchRequest.source(sourceBuilder);
        return searchRequest;
    }

}
