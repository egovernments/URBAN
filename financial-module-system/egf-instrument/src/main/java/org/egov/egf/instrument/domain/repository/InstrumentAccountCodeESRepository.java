package org.egov.egf.instrument.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.instrument.domain.model.InstrumentAccountCode;
import org.egov.egf.instrument.persistence.entity.InstrumentAccountCodeEntity;
import org.egov.egf.instrument.web.contract.InstrumentAccountCodeSearchContract;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class InstrumentAccountCodeESRepository extends ESRepository {

    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger logger = LoggerFactory.getLogger(InstrumentAccountCodeESRepository.class);

    public InstrumentAccountCodeESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<InstrumentAccountCode> search(InstrumentAccountCodeSearchContract criteria) {
        SearchRequest searchRequest = getSearchRequest(criteria);
        SearchResponse searchResponse;

        try {
            searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException("Elasticsearch search failed", e);
        }

        return mapToInstrumentAccountCodeList(searchResponse);
    }

    @SuppressWarnings("deprecation")
    private Pagination<InstrumentAccountCode> mapToInstrumentAccountCodeList(SearchResponse searchResponse) {
        Pagination<InstrumentAccountCode> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0)
            return page;
        List<InstrumentAccountCode> instrumentAccountCodes = new ArrayList<InstrumentAccountCode>();
        InstrumentAccountCode instrumentAccountCode = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                instrumentAccountCode = mapper.readValue(hit.getSourceAsString(), InstrumentAccountCode.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                logger.error("Error occurred while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                logger.error("JSON mapping exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                logger.error("IO exception occured: " + e1.getMessage());
            }

            instrumentAccountCodes.add(instrumentAccountCode);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(instrumentAccountCodes);

        return page;
    }

    private SearchRequest getSearchRequest(InstrumentAccountCodeSearchContract criteria) {
        List<SortBuilder<?>> sortBuilders = new ArrayList<>();
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), InstrumentAccountCodeEntity.class);
            List<String> orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());

            for (String orderBy : orderByList) {
                String[] parts = orderBy.split(" ");
                SortOrder sortOrder = parts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
                sortBuilders.add(SortBuilders.fieldSort(parts[0]).order(sortOrder));
            }
        }

        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchInstrumentAccountCode(criteria);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        for (SortBuilder<?> sortBuilder : sortBuilders) {
            sourceBuilder.sort(sortBuilder);
        }

        SearchRequest searchRequest = new SearchRequest(InstrumentAccountCode.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
