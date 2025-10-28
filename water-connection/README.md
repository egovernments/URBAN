# Water Connection Module

## Overview
The Water Connection module is a comprehensive system for managing municipal water service connections, billing, and meter reading operations within urban local bodies (ULBs). It handles the complete lifecycle of water connections including application submission, fee calculation, approval workflows, connection activation, meter reading management, and billing.

---

## Module Architecture

The Water Connection module consists of two main microservices:

```
water-connection/
├── ws-services/          # Core water connection management service
└── ws-calculator/        # Billing and meter reading calculation service
```

### 1. **ws-services** - Water Service Management
Manages the complete water connection lifecycle including:
- Water connection applications (new, modify, disconnect)
- Connection holder and property information management
- Document management (application documents)
- Plumber information tracking
- Road cutting information for pipe laying
- Connection execution and activation
- Ad-hoc penalties and rebates
- Workflow and status management
- Multi-tenant support for different cities/ULBs

**Key Features:**
- Complete CRUD operations for water connections
- Support for metered and non-metered connections
- Legacy system migration support (old connection numbers)
- Temporary and permanent disconnection handling
- Geolocation support via locality/property mapping
- Document storage integration via filestore
- Comprehensive audit trail for compliance
- Workflow integration for approval processes
- Notification system (SMS) based on application state
- Connection holder management with ownership percentages

📚 **[View Detailed Database Schema Documentation →](ws-services/src/main/resources/db/migration/ddl/README.md)**

---

### 2. **ws-calculator** - Water Supply Calculator
Handles all billing, fee calculations, and meter reading management:
- Demand generation for water bills
- Meter reading capture and tracking
- Consumption calculation from meter readings
- Billing based on:
  - Connection category (Residential/Commercial/Industrial)
  - Connection type (Metered/Non-metered)
  - Pipe size and number of taps
  - Water consumption
  - Rainwater harvesting status
- Bulk billing operations for large-scale processing
- Ad-hoc rebates and penalties

**Key Features:**
- Flexible billing engine with multiple parameters
- Meter reading management with status tracking
- Consumption-based billing calculations
- Fixed charges and flat rate support
- Bulk billing with batch processing and audit trail
- Billing period management
- Meter status tracking (WORKING/FAULTY/NOT_WORKING)
- Initial meter reading capture
- Integration with collection service for payments

📚 **[View Detailed Database Schema Documentation →](ws-calculator/src/main/resources/db/migration/ddl/README.md)**


---

## Database Tables Summary

### ws-services Tables (10 tables)
- `eg_ws_connection` - Main connection and application information
- `eg_ws_service` - Service details and meter configuration
- `eg_ws_plumberinfo` - Licensed plumber details
- `eg_ws_applicationdocument` - Application documents
- `eg_ws_roadcuttinginfo` - Road cutting information
- `eg_ws_connectionholder` - Connection holder/owner details
- `eg_ws_connection_audit` - Connection audit trail
- `eg_ws_service_audit` - Service audit trail
- `eg_ws_enc_audit` - Encryption operation audit
- `eg_ws_id_enc_audit` - ID encryption audit

### ws-calculator Tables (2 tables)
- `eg_ws_meterreading` - Meter reading records with consumption
- `eg_ws_bulkbill_audit` - Bulk billing operation audit trail

---

## Technology Stack
- **Framework:** Spring Boot 3.2.2
- **Java Version:** 17
- **Database:** PostgreSQL 42.7.1
- **Migration Tool:** Flyway 9.22.3
- **Build Tool:** Maven
- **Key Libraries:** Lombok, Jackson, SpringFox Swagger
- **eGov Libraries:** MDMS Client, Tracer, Encryption Client
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Event-driven microservices with Kafka
- **Code Generation:** TypeScript Generator for frontend integration

---

## Service Dependencies

### ws-services Dependencies
- egov-mdms-service (Master data management)
- property-service (Property information)
- egov-idgen (ID generation)
- egov-persister (Database persistence)
- ws-calculator (Billing calculations)
- egov-filestore (File storage)
- pdf-service (Document generation)
- egov-workflow (Approval workflows)
- egov-notification-sms (SMS notifications)

### ws-calculator Dependencies
- egov-mdms-service (Master data management)
- billing-service (Demand generation)
- collection-service (Payment integration)

---

## API Endpoints

### ws-services
**Base Path:** `/ws-services/wc/`
- `POST /_create` - Create new water connection application
- `POST /_update` - Update existing water connection
- `POST /_search` - Search water connections with multiple criteria

### ws-calculator
**Base Path:** `/ws-calculator/`
- `POST /_calculate` - Calculate demand for water connection
- `POST /_estimate` - Estimate charges for new connection
- `POST /meterConnection/_create` - Create meter reading
- `POST /meterConnection/_search` - Search meter readings

---

## Kafka Integration

### ws-services Topics
**Consumers:**
- `save-ws-connection` - Create notifications for new connections
- `update-ws-connection` - Update notifications
- `update-ws-workflow` - Workflow state change notifications
- `egov.collection.payment-create` - Payment notifications
- `create-meter-reading` - Initial meter reading capture

**Producers:**
- `save-ws-connection` - New application creation events
- `update-ws-connection` - Application update events
- `update-ws-workflow` - Workflow process updates
- `egov.core.notification.sms` - SMS notifications to users

### ws-calculator Topics
- Integration with billing and demand generation topics
- Meter reading creation events

---

## Getting Started

### Prerequisites
- Java 17+
- PostgreSQL 12+
- Maven 3.6+
- Apache Kafka (for event-driven operations)
- eGov DIGIT platform services


### Database Migration
Database migrations are managed using Flyway and located in:
- `ws-services/src/main/resources/db/migration/ddl/`
- `ws-calculator/src/main/resources/db/migration/ddl/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings (PostgreSQL)
- Kafka broker endpoints
- Tenant configuration
- External service URLs (MDMS, Property Service, etc.)
- Filestore integration
- Workflow service endpoints
- ID generation formats
- Billing and calculation parameters
- Notification templates

---

## Support & Documentation

For detailed database schema documentation:
- **[Water Service Schema →](ws-services/src/main/resources/db/migration/ddl/README.md)**
- **[Water Calculator Schema →](ws-calculator/src/main/resources/db/migration/ddl/README.md)**

### Additional Resources
- [eGovernments Platform Documentation](https://core.digit.org/)
- [DIGIT Water & Sewerage Module](https://core.digit.org/products/modules/ws-water-and-sewerage)
- [API Contract Documentation](https://github.com/egovernments/municipal-services/blob/master/docs/water-sewerage-services.yaml)

---

## Version History
- **ws-services:** v1.8.0-SNAPSHOT
- **ws-calculator:** v1.5.0-SNAPSHOT

---

## License
This project is part of the eGovernments DIGIT platform.

## Contributors
Maintained by eGovernments Foundation
