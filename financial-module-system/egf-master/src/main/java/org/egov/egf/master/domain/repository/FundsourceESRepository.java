package org.egov.egf.master.domain.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.egov.common.domain.model.Pagination;
import org.egov.common.persistence.repository.ESRepository;
import org.egov.egf.master.domain.model.Fundsource;
import org.egov.egf.master.persistence.entity.FundsourceEntity;
import org.egov.egf.master.web.contract.FundsourceSearchContract;
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
public class FundsourceESRepository extends ESRepository {

	private static final Logger logger = LoggerFactory.getLogger(FundsourceESRepository.class);
	private RestHighLevelClient restHighLevelClient;
	private ElasticSearchQueryFactory elasticSearchQueryFactory;
	public static final Logger LOGGER = LoggerFactory.getLogger(FundsourceESRepository.class);

	public FundsourceESRepository(RestHighLevelClient restHighLevelClient, ElasticSearchQueryFactory elasticSearchQueryFactory) {
		this.restHighLevelClient = restHighLevelClient;
		this.elasticSearchQueryFactory = elasticSearchQueryFactory;
	}

	public Pagination<Fundsource> search(FundsourceSearchContract fundsourceSearchContract) {
		SearchRequest searchRequest = getSearchRequest(fundsourceSearchContract);

		try {
			SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
			return mapToFundsourceList(searchResponse, fundsourceSearchContract);
		} catch (IOException e) {
			logger.error("Error while executing Elasticsearch search", e);
			return new Pagination<>();
		}
	}



	@SuppressWarnings("deprecation")
	private Pagination<Fundsource> mapToFundsourceList(SearchResponse searchResponse,FundsourceSearchContract fundsourceSearchContract) {
		Pagination<Fundsource> page = new Pagination<>();
		if (searchResponse.getHits() == null || searchResponse.getHits().getHits().length == 0) {
			return page;
		}
		List<Fundsource> Fundsources = new ArrayList<Fundsource>();
		Fundsource fundsource=null;
		for (SearchHit hit : searchResponse.getHits()) {
			
			ObjectMapper mapper = new ObjectMapper();
			//JSON from file to Object
			try {
			    fundsource = mapper.readValue(hit.getSourceAsString(), Fundsource.class);
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
		
			Fundsources.add(fundsource);
		}

		page.setTotalResults((int) Objects.requireNonNull(searchResponse.getHits().getTotalHits()).value);
		page.setPagedData(Fundsources);

		return page;
	}

	private SearchRequest getSearchRequest(FundsourceSearchContract criteria) {
		List<String> orderByList = new ArrayList<>();
		if (criteria.getSortBy() != null && !criteria.getSortBy().isEmpty()) {
			validateSortByOrder(criteria.getSortBy());
			validateEntityFieldName(criteria.getSortBy(), FundsourceEntity.class);
			orderByList = elasticSearchQueryFactory.prepareOrderBys(criteria.getSortBy());
		}

		final BoolQueryBuilder boolQueryBuilder = elasticSearchQueryFactory.searchFundsource(criteria);

		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.query(boolQueryBuilder);

		if (!orderByList.isEmpty()) {
			for (String orderBy : orderByList) {
				String[] orderSplit = orderBy.split(" ");
				searchSourceBuilder.sort(orderSplit[0], orderSplit[1].equalsIgnoreCase("asc") ? SortOrder.ASC : SortOrder.DESC);
			}
		}

		SearchRequest searchRequest = new SearchRequest(Fundsource.class.getSimpleName().toLowerCase());
		searchRequest.source(searchSourceBuilder);

		return searchRequest;
	}


}
