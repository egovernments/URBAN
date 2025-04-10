# eChallan-services

eChallan system enables employees to generate the challans for Adhoc services so that the payment can be recorded into the system along with service-specific details.

### DB UML Diagram

- TBD

### Service Dependencies

- eChallan-calculator
- billing-service
- egov-mdms-service
- egov-localization
- egov-idgen
- egov-user

### Swagger API Contract

Link to the swagger API contract yaml and editor link like below

https://editor.swagger.io/?url=https://raw.githubusercontent.com/egovernments/municipal-services/develop/docs/e-Challan-v1.0.0.yaml#!/


## Service Details

eChallan service allow employee to capture service details for miscellaneous services and collect payment, it also employee to update / cancel challan.
It send SMS and an email bill notification to the citizen with a payment link and bill link.

eChallan service provides the capability of capturing the unique identifier of the entity for which the challan is generated.
Workflow or Service-specific workflow can be enabled at the challan service level at any time without changing the design.

### API Details

`_create` : This API is used to create an eChallan for the adhoc service in the system. Whenever an echallan is created a echallan number is generated and assigned to the echallan for future reference.

`_search` : This API is used to search the echallan in the system based on various search parameters like mobile number, echallan number etc.

`_update` : This API is used to update / cancel the eChallan present in the system.

`_count`  : This API is used to get count of challan's present in the system.


### Reference Document

All the details and configurations on the services are explained in the document `https://digit-discuss.atlassian.net/l/c/18Rgs1cw`

### Kafka Consumers

`update-challan` : eChallan consumer listens to this topic to get the updated data
`save-challan` : eChallan consumer listens to this topic to get the eChallan data
`egov.collection.payment-cancel` : eChallan consumer listen to this topic and get data when the receipt is cancelled.

### Kafka Producers

`save-challan` : echallan-services sends data to this topic to push entries to the database table.
`update-challan` : echallan-services sends data to this topic to update the entries to the database table.
`egov.collection.payment-create` : Service sends data to this topic when the payments is triggered.
`egov.core.notification.sms` : This topic is used to send the sms notification
`persist-user-events-async` : Service uses this topic to save the event notification


***LTS UPGRADE***
1. artifact id updated to 1.1.2-SNAPSHOT from 1.1.1-SNAPSHOT
2. spring boot starter parent version upgraded from 2.2.6.RELEASE to 3.2.2
3. tracer version updated to 2.9.0-SNAPSHOT from 2.0.0-SNAPSHOT.
4. mdms client version updated to 2.9.0-SNAPSHOT from 0.0.2-SNAPSHOT.
5. Junit dependency added and the version used is 4.13.2
6. flyway-core version updated to 9.22.3 from 6.4.3.
7. postgresql version updated to 42.7.1 from 42.2.11 .
8. javax validation-api is removed
9. hibernate-validator dependency is removed