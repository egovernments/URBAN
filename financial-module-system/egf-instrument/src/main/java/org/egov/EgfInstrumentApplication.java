package org.egov;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.tracer.config.TracerConfiguration;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.apache.http.HttpHost;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

@Import({ TracerConfiguration.class })
@SpringBootApplication
public class EgfInstrumentApplication {

    public static void main(String[] args) {
        SpringApplication.run(EgfInstrumentApplication.class, args);
    }

    @Value("${app.timezone}")
    private String timeZone;

    @Value("${es.host}")
    private String elasticSearchHost;

    @Value("${es.rest.port}")
    private Integer elasticSearchRestPort;

    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone(timeZone));
    }

    @Bean(destroyMethod = "close")
    @Primary
    public RestHighLevelClient restHighLevelClient() {
        return new RestHighLevelClient(
                RestClient.builder(new HttpHost(elasticSearchHost, elasticSearchRestPort, "http"))
        );
    }

    @Bean
    public MappingJackson2HttpMessageConverter jacksonConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        mapper.setDateFormat(new SimpleDateFormat("dd-MM-yyyy"));
        mapper.setTimeZone(TimeZone.getTimeZone(timeZone));
        converter.setObjectMapper(mapper);
        return converter;
    }

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
                configurer.defaultContentType(MediaType.APPLICATION_JSON);
            }
        };
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public FlywayMigrationStrategy cleanMigrateStrategy() {
        return flyway -> {
            flyway.repair();
            flyway.migrate();
        };
    }
}
