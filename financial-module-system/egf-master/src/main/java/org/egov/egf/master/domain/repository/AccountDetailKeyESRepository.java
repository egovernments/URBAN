package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import lombok.extern.log4j.Log4j;
import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.AccountDetailKey;
import org.egov.egf.master.persistence.entity.AccountDetailKeyEntity;
import org.egov.egf.master.web.contract.AccountDetailKeySearchContract;
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
public class AccountDetailKeyESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(SubSchemeESRepository.class);

    private RestHighLevelClient restHighLevelClient;

    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(AccountDetailKeyESRepository.class);

    public AccountDetailKeyESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<AccountDetailKey> search(AccountDetailKeySearchContract accountCodeKeySearchContract) {
        SearchRequest searchRequest = getSearchRequest(accountCodeKeySearchContract); // Build with SearchSourceBuilder
        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToAccountDetailKeyList(searchResponse, accountCodeKeySearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }

    @SuppressWarnings("deprecation")
    private Pagination<AccountDetailKey> mapToAccountDetailKeyList(SearchResponse searchResponse,
            AccountDetailKeySearchContract accountCodePurposeSearchContract) {
        Pagination<AccountDetailKey> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0)
            return page;
        List<AccountDetailKey> accountDetailkeys = new ArrayList<AccountDetailKey>();
        AccountDetailKey accountDetailKey = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                accountDetailKey = mapper.readValue(hit.getSourceAsString(), AccountDetailKey.class);
            } catch (JsonParseException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("Error while parsing JSON: " + e1.getMessage());
            } catch (JsonMappingException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("JSON mapping exception occurred: " + e1.getMessage());
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                LOGGER.error("IO Exception occurred: " + e1.getMessage());
            }

            accountDetailkeys.add(accountDetailKey);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(accountDetailkeys);

        return page;
    }

    private SearchRequest getSearchRequest(AccountDetailKeySearchContract criteria)
    {
        List<String> orderByList = new ArrayList<>();
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), AccountDetailKeyEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchAccountDetailKey(criteria);

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
