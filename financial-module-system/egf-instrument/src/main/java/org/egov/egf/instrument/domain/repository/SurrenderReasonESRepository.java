package org.egov.egf.instrument.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.SurrenderReason;
import org.egov.egf.instrument.persistence.entity.SurrenderReasonEntity;
import org.egov.egf.instrument.web.contract.SurrenderReasonSearchContract;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.*;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SurrenderReasonESRepository extends ESRepository {

    private TransportClient esClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger logger = LoggerFactory.getLogger(SurrenderReasonESRepository.class);

    public SurrenderReasonESRepository(TransportClient esClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.esClient = esClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<SurrenderReason> search(SurrenderReasonSearchContract surrenderReasonSearchContract) {
        final SearchRequestBuilder searchRequestBuilder = getSearchRequest(surrenderReasonSearchContract);
        final SearchResponse searchResponse = searchRequestBuilder.execute().actionGet();
        return mapToSurrenderReasonList(searchResponse);
    }

    @SuppressWarnings("deprecation")
    private Pagination<SurrenderReason> mapToSurrenderReasonList(SearchResponse searchResponse) {
        Pagination<SurrenderReason> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getTotalHits() == 0L)
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

        page.setTotalResults(Long.valueOf(searchResponse.getHits().getTotalHits()).intValue());
        page.setPagedData(surrenderReasons);

        return page;
    }

    private SearchRequestBuilder getSearchRequest(SurrenderReasonSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), SurrenderReasonEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchSurrenderReason(criteria);
        SearchRequestBuilder searchRequestBuilder = esClient.prepareSearch(SurrenderReason.class.getSimpleName().toLowerCase())
                .setTypes(SurrenderReason.class.getSimpleName().toLowerCase());
        if (!orderByList.isEmpty())
            for (String orderBy : orderByList)
                searchRequestBuilder = searchRequestBuilder.addSort(orderBy.split(" ")[0],
                        orderBy.split(" ")[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC);

        searchRequestBuilder.setQuery(boolQueryBuilder);
        return searchRequestBuilder;
    }

}
