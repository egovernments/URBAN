package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.AccountEntity;
import org.egov.egf.master.persistence.entity.AccountEntityEntity;
import org.egov.egf.master.web.contract.AccountEntitySearchContract;
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
public class AccountEntityESRepository extends ESRepository {

	private static final Logger logger = LoggerFactory.getLogger(AccountEntityESRepository.class);
	private RestHighLevelClient restHighLevelClient;
	private ElasticSearchQueryFactory elasticSearchQueryFactory;
	public static final Logger LOGGER = LoggerFactory.getLogger(AccountEntityESRepository.class);

	public AccountEntityESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
		this.restHighLevelClient = restHighLevelClient;
		this.elasticSearchQueryFactory = elasticSearchQueryFactory;
	}

	public Pagination<AccountEntity> search(AccountEntitySearchContract accountEntitySearchContract) {
		SearchRequest searchRequest = getSearchRequest(accountEntitySearchContract);
		try {
			SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
			return mapToAccountEntityList(searchResponse, accountEntitySearchContract);
		} catch (IOException e) {
			logger.error("Error while executing Elasticsearch search", e);
			return new Pagination<>();
		}
	}



	@SuppressWarnings("deprecation")
	private Pagination<AccountEntity> mapToAccountEntityList(SearchResponse searchResponse,AccountEntitySearchContract accountEntitySearchContract) {
		Pagination<AccountEntity> page = new Pagination<>();
		if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
			return page;
		}
		List<AccountEntity> accountDetailkeys = new ArrayList<AccountEntity>();
		AccountEntity accountDetailKey=null;
		for (SearchHit hit : searchResponse.getHits()) {
			
			ObjectMapper mapper = new ObjectMapper();
			//JSON from file to Object
			try {
				accountDetailKey = mapper.readValue(hit.getSourceAsString(), AccountEntity.class);
			} catch (JsonParseException e1) {
				// TODO Auto-generated catch block
				LOGGER.error("Exception occurred while parsing JSON: " + e1.getMessage());
			} catch (JsonMappingException e1) {
				// TODO Auto-generated catch block
				LOGGER.error("Json mapping exception occurred: " + e1.getMessage());
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				LOGGER.error("IO exception occurred: " + e1.getMessage());
			}
		
			accountDetailkeys.add(accountDetailKey);
		}

		page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
		page.setPagedData(accountDetailkeys);

		return page;
	}

	private SearchRequest getSearchRequest(AccountEntitySearchContract criteria) {
		List<String> orderByList = new ArrayList<>();
		if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
			validateSortByOrder(criteria.getSortBy());
			validateEntityFieldName(criteria.getSortBy(), AccountEntityEntity.class);
			orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
		}

		final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchAccountEntity(criteria);

		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
		sourceBuilder.query(boolQueryBuilder);

		if (!orderByList.isEmpty()) {
			for (String orderBy : orderByList) {
				String[] orderParts = orderBy.split(" ");
				SortOrder sortOrder = orderParts[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC;
				sourceBuilder.sort(orderParts[0], sortOrder);
			}
		}

		SearchRequest searchRequest = new SearchRequest(AccountEntity.class.getSimpleName().toLowerCase());
		searchRequest.source(sourceBuilder);
		return searchRequest;
	}


}
