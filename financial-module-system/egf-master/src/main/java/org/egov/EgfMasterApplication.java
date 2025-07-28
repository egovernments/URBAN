package org.egov;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.annotation.PostConstruct;
import org.apache.http.HttpHost;
import org.egov.tracer.config.TracerConfiguration;
import org.egov.tracer.kafka.LogAwareKafkaTemplate;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.net.UnknownHostException;
import java.util.TimeZone;

@Import({ TracerConfiguration.class })
@SpringBootApplication
public class EgfMasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(EgfMasterApplication.class, args);
	}

	private static final String CLUSTER_NAME = "cluster.name";

	@Value("${app.timezone}")
	private String timeZone;

	@Value("${es.host}")
	private String elasticSearchHost;

	@Value("${es.transport.port}")
	private Integer elasticSearchHttpPort;

	@Value("${es.cluster.name}")
	private String elasticSearchClusterName;

	private RestHighLevelClient restHighLevelClient;

	@Autowired
	private LogAwareKafkaTemplate<String, Object> logAwareKafkaTemplate;

	@PostConstruct
	public void init() throws UnknownHostException {
		TimeZone.setDefault(TimeZone.getTimeZone(timeZone));
		// Set JVM time zone
		TimeZone.setDefault(TimeZone.getTimeZone(timeZone));

		// Create HTTP-based Elasticsearch client
		restHighLevelClient = new RestHighLevelClient(
				RestClient.builder(
						new HttpHost(elasticSearchHost, elasticSearchHttpPort, "http")
				)
		);
	}

	@Bean
	public MappingJackson2HttpMessageConverter jacksonConverter() {
		// DateFormat std=DateFormat.getInstance().f
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		mapper.setTimeZone(TimeZone.getTimeZone(timeZone));
		converter.setObjectMapper(mapper);
		return converter;
	}

	@Bean
	public WebMvcConfigurer webMvcConfigurerAdapter() {
		return new WebMvcConfigurer() {

			@Override
			public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
				configurer.defaultContentType(MediaType.APPLICATION_JSON_UTF8);
			}

		};
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public RestHighLevelClient getRestHighLevelClient() {
		return restHighLevelClient;
	}

	@Bean
    public FlywayMigrationStrategy cleanMigrateStrategy() {
        return flyway -> {
            flyway.repair();
            flyway.migrate();
        };
    }

	public void close() throws Exception {
		if (restHighLevelClient != null) {
			restHighLevelClient.close();
		}
	}
}
