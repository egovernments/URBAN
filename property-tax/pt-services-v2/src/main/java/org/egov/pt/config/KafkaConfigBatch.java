package org.egov.pt.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.listener.AbstractMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class KafkaConfigBatch {

    @Autowired
    private KafkaProperties kafkaProperties;

    @Autowired
    private PropertyConfiguration propertyConfiguration;



    @Bean("consumerConfigsBatch")
    public Map<String, Object> consumerConfigsBatch() {
        Map<String, Object> props = new HashMap<>(
                kafkaProperties.getProperties()
        );
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, propertyConfiguration.getBatchSize());
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,org.apache.kafka.common.serialization.StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,org.egov.tracer.kafka.deserializer.HashMapDeserializer.class);
        props.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 900000);
        props.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, 10000);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "egov-pt-services-v2");
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, List.of("release-name-kafka-controller-headless.kafka-kraft:9092"));
        return props;
    }

    @Bean("consumerConfigs")
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>(
                kafkaProperties.getProperties()
        );
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,org.apache.kafka.common.serialization.StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,org.egov.tracer.kafka.deserializer.HashMapDeserializer.class);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "egov-pt-services-v2");
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, List.of("release-name-kafka-controller-headless.kafka-kraft:9092"));
        return props;
    }

    @Bean("consumerFactoryBatch")
    public ConsumerFactory<String, Object> consumerFactoryBatch() {
        return new DefaultKafkaConsumerFactory<>(consumerConfigsBatch());
    }
    @Bean("consumerFactory")
    public ConsumerFactory<String, Object> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(consumerConfigs());
    }

    // TODO Need to check the setAckMode is correctly implemented or not
    @Bean("kafkaListenerContainerFactoryBatch")
    public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactoryBatch());
        factory.setBatchListener(true);
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.BATCH);

        return factory;
    }

    @Bean("kafkaListenerContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, Object> singleKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @Bean
    public Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<>(
                kafkaProperties.getProperties()
        );
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
                org.apache.kafka.common.serialization.StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
                org.springframework.kafka.support.serializer.JsonSerializer.class);
        props.put(ProducerConfig.MAX_REQUEST_SIZE_CONFIG, 2080075);
        props.put(ProducerConfig.LINGER_MS_CONFIG, 500);
        props.put(ProducerConfig.BATCH_SIZE_CONFIG, 1000);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "egov-pt-services-v2");
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, List.of("release-name-kafka-controller-headless.kafka-kraft:9092"));
        return props;
    }

    @Bean
    public ProducerFactory<String, Object> kafkaProducerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigs());
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactory());
    }

}