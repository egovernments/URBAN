package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.BankBranch;
import org.egov.egf.master.persistence.entity.BankBranchEntity;
import org.egov.egf.master.web.contract.BankBranchSearchContract;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BankBranchESRepository extends ESRepository {

    private static final Logger logger = LoggerFactory.getLogger(BankBranchESRepository.class);
    private RestHighLevelClient restHighLevelClient;
    private ElasticSearchQueryFactory elasticSearchQueryFactory;
    public static final Logger LOGGER = LoggerFactory.getLogger(BankBranchESRepository.class);

    public BankBranchESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
        this.restHighLevelClient = restHighLevelClient;
        this.elasticSearchQueryFactory = elasticSearchQueryFactory;
    }

    public Pagination<BankBranch> search(BankBranchSearchContract bankBranchSearchContract) {
        SearchRequest searchRequest = getSearchRequest(bankBranchSearchContract);
        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            return mapToBankBranchList(searchResponse, bankBranchSearchContract);
        } catch (IOException e) {
            logger.error("Error while executing Elasticsearch search", e);
            return new Pagination<>();
        }
    }

    @SuppressWarnings("deprecation")
    private Pagination<BankBranch> mapToBankBranchList(SearchResponse searchResponse,
            BankBranchSearchContract bankBranchSearchContract) {
        Pagination<BankBranch> page = new Pagination<>();
        if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
            return page;
        }
        List<BankBranch> bankBranchs = new ArrayList<BankBranch>();
        BankBranch bankBranch = null;
        for (SearchHit hit : searchResponse.getHits()) {

            ObjectMapper mapper = new ObjectMapper();
            // JSON from file to Object
            try {
                bankBranch = mapper.readValue(hit.getSourceAsString(), BankBranch.class);
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

            bankBranchs.add(bankBranch);
        }

        page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
        page.setPagedData(bankBranchs);

        return page;
    }

    private SearchRequest getSearchRequest(BankBranchSearchContract criteria) {
        List<String> orderByList = new ArrayList<>();

        // Sorting logic
        if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
            validateSortByOrder(criteria.getSortBy());
            validateEntityFieldName(criteria.getSortBy(), BankBranchEntity.class);
            orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
        }

        // Query construction
        final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchBankBranch(criteria);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        // Sorting
        if (!orderByList.isEmpty()) {
            for (String orderBy : orderByList) {
                String[] orderSplit = orderBy.split(" ");
                String field = orderSplit[0];
                SortOrder sortOrder = orderSplit[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
                sourceBuilder.sort(new FieldSortBuilder(field).order(sortOrder));
            }
        }

        // Pagination
        sourceBuilder.from(criteria.getOffset());
        sourceBuilder.size(criteria.getPageSize());

        // Build and return SearchRequest
        SearchRequest searchRequest = new SearchRequest(BankBranch.class.getSimpleName().toLowerCase());
        searchRequest.source(sourceBuilder);

        return searchRequest;
    }


}
