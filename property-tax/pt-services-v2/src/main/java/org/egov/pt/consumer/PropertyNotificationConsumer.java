package org.egov.pt.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

import org.egov.common.contract.request.RequestInfo;
import org.egov.pt.config.PropertyConfiguration;
import org.egov.pt.service.NotificationService;
import org.egov.pt.service.PaymentNotificationService;
import org.egov.pt.web.models.Property;
import org.egov.pt.web.models.PropertyDetail;
import org.egov.pt.web.models.PropertyRequest;
import org.egov.pt.web.models.collection.PaymentRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class PropertyNotificationConsumer {

    @Autowired
    private NotificationService notificationService;


    @Autowired
    private PaymentNotificationService paymentNotificationService;


	@Autowired
	private ObjectMapper mapper;


    @KafkaListener(topics = {"${persister.save.property.topic}","${persister.update.property.topic}"})
    public void listen(final HashMap<String, Object> record, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        ObjectMapper mapper = new ObjectMapper();
        PropertyRequest propertyRequest = new PropertyRequest();
        try {
            log.info("Consuming record: " + record);
            propertyRequest = mapper.convertValue(record, PropertyRequest.class);
        } catch (final Exception e) {
            log.error("Error while listening to value: " + record + " on topic: " + topic + ": " + e);
        }
        log.info("property Received: "+propertyRequest.getProperties().get(0).getPropertyId());

        PropertyDetail.SourceEnum source = propertyRequest.getProperties().get(0).getPropertyDetails().get(0).getSource();

        if (source == null || !source.equals(PropertyDetail.SourceEnum.LEGACY_RECORD))
            notificationService.process(propertyRequest,topic);
    }


    @KafkaListener(topics = {"${kafka.topics.notification.payment}"}, containerFactory="kafkaListenerPaymentContainerFactory")
    public void listenPayments(final PaymentRequest paymentRequest, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        paymentNotificationService.process(null,topic,paymentRequest,null,paymentRequest.getRequestInfo());
    }

    @KafkaListener(topics = {"${kafka.topics.notification.pg.save.txns}"})
    public void listenUpdatePgTxn(final HashMap<String, Object> record, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        String jsonString = new JSONObject(record).toString();
		DocumentContext documentContext = JsonPath.parse(jsonString);
		RequestInfo requestInfo = mapper.convertValue(record.get("RequestInfo"), RequestInfo.class);
        paymentNotificationService.process(record,topic, null,documentContext,requestInfo);
    }





}
