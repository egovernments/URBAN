package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.Functionary;
import org.egov.egf.master.persistence.entity.FunctionaryEntity;
import org.egov.egf.master.web.contract.FunctionarySearchContract;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class FunctionaryESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(FunctionaryESRepository.class);
    private RestHighLevelClient restHighLevelClient;

    public FunctionaryESRepository(RestHighLevelClient restHighLevelClient) {
        this.restHighLevelClient = restHighLevelClient;
    }
    public static final Logger LOGGER = LoggerFactory.getLogger(FunctionaryESRepository.class);

    public Pagination<Functionary> search(FunctionarySearchContract functionarySearchContract) {

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();

        // Prepare sort fields
        List<String> orderByList = new ArrayList<>();
        if (functionarySearchContract.getSortBy() != null && !functionarySearchContract.getSortBy().isEmpty()) {
            validateSortByOrder(functionarySearchContract.getSortBy());
            validateEntityFieldName(functionarySearchContract.getSortBy(), FunctionaryEntity.class);
            orderByList = prepareOrderBys(functionarySearchContract.getSortBy());
        }

        for (String orderBy : orderByList) {
            String[] sortParts = orderBy.split(" ");
            SortOrder sortOrder = sortParts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
            sourceBuilder.sort(new FieldSortBuilder(sortParts[0]).order(sortOrder));
        }

        // Add filters
        if (functionarySearchContract.getIds() != null && !functionarySearchContract.getIds().isEmpty()) {
            boolQueryBuilder.must(QueryBuilders.termsQuery("id", functionarySearchContract.getIds()));
        }
        if (functionarySearchContract.getId() != null) {
            boolQueryBuilder.must(QueryBuilders.termQuery("id", functionarySearchContract.getId()));
        }
        if (functionarySearchContract.getName() != null) {
            boolQueryBuilder.must(QueryBuilders.matchQuery("name", functionarySearchContract.getName()));
        }
        if (functionarySearchContract.getCode() != null) {
            boolQueryBuilder.must(QueryBuilders.termQuery("code.keyword", functionarySearchContract.getCode()));
        }
        if (functionarySearchContract.getActive() != null) {
            boolQueryBuilder.must(QueryBuilders.termQuery("active", functionarySearchContract.getActive()));
        }

        sourceBuilder.query(boolQueryBuilder);
        sourceBuilder.from(functionarySearchContract.getOffset());
        sourceBuilder.size(functionarySearchContract.getPageSize());

        SearchRequest searchRequest = new SearchRequest(Functionary.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToFunctionarysList(searchResponse, functionarySearchContract);
        } catch (IOException e) {
            logger.error("Error executing Functionary search", e);
            return new Pagination<>();
        }
    }


    @SuppressWarnings("deprecation")
    private Pagination<Functionary> mapToFunctionarysList(SearchResponse searchResponse,
            FunctionarySearchContract functionarySearchContract) {
        Pagination<Functionary> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<Functionary> functionarys = new ArrayList<Functionary>();
        Functionary functionary = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            try {
                functionary = mapper.readValue(hit.getSourceAsString(), Functionary.class);
            } catch (Exception e1) {
                LOGGER.error("Exception while reading functionary: " + e1.getMessage());
            }

            functionarys.add(functionary);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(functionarys);

        return page;
    }

}
