# E-Challan Module

## Overview
The E-Challan module is a comprehensive system for managing electronic challans (e-challans) for adhoc and miscellaneous services within urban local bodies (ULBs). It enables employees to generate challans for various services, capture service-specific details, calculate fees, and process payments with integrated notifications and workflow support.

---

## Module Architecture

The E-Challan module consists of two main microservices:

```
echallan/
├── echallan-services/          # Core e-challan management service
└── echallan-calculator/        # Fee calculation service
```

### 1. **echallan-services** - E-Challan Management Service
Manages the complete e-challan lifecycle including:
- Challan creation for adhoc and miscellaneous services
- Capture unique identifiers of entities for which challans are generated
- Challan search, update, and cancellation
- Address and location management
- Payment processing integration
- SMS and email notifications
- Workflow and status management
- Multi-tenant support for different cities/ULBs

**Key Features:**
- Complete CRUD operations for e-challans
- Auto-generation of unique challan numbers
- Geolocation support (latitude/longitude)
- Document storage integration via filestore
- Receipt management and payment tracking
- Tax period tracking
- Flexible metadata storage using JSONB
- Payment cancellation support
- Event notification system
- Audit trail for compliance

**API Endpoints:**
- `_create` - Create new e-challan with auto-generated challan number
- `_search` - Search challans by mobile number, challan number, status, etc.
- `_update` - Update or cancel existing challans
- `_count` - Get count of challans based on filters

**Kafka Integration:**
- **Consumers:** `save-challan`, `update-challan`, `egov.collection.payment-cancel`
- **Producers:** `save-challan`, `update-challan`, `egov.collection.payment-create`, `egov.core.notification.sms`, `persist-user-events-async`

📚 **[View Detailed Database Schema Documentation →](echallan-services/src/main/resources/db/migration/main/README.md)**

---

### 2. **echallan-calculator** - Fee Calculation Service
Handles all billing and fee calculations for e-challans:
- Calculate challan fees based on service details
- Dynamic demand generation
- Integration with billing services
- Support for multiple service types

**Key Features:**
- Flexible fee calculation engine
- Demand-based fee calculation
- Billing service integration
- Multi-service support

**API Endpoints:**
- `echallan-calculator/v1/_calculate` - Calculate fees based on demand created

---

## Database Tables Summary

### echallan-services Tables (2 tables)
- `eg_echallan` - Main e-challan records
  - Challan details (challanNo, businessService, referenceId)
  - Account and tenant information
  - Status tracking (applicationStatus)
  - Tax period management (taxPeriodFrom, taxPeriodTo)
  - Payment details (receiptnumber)
  - Document references (filestoreid)
  - Flexible metadata storage (additionalDetail JSONB)
  - Audit fields (createdBy, lastModifiedBy, timestamps)

- `eg_challan_address` - Address information
  - Complete address components (doorNo, plotNo, street, city, etc.)
  - Geolocation data (latitude, longitude)
  - Administrative divisions (locality, district, state, country)
  - Landmark and building references
  - Foreign key relationship with eg_echallan (CASCADE operations)

**Relationship:** One-to-One (eg_echallan → eg_challan_address)

---

## Service Dependencies

### echallan-services dependencies:
- echallan-calculator (fee calculation)
- billing-service (bill generation)
- egov-mdms-service (master data)
- egov-localization (localization)
- egov-idgen (ID generation)
- egov-user (user management)

### echallan-calculator dependencies:
- echallan-service (challan data)
- billing-service (bill generation)
- egov-mdms-service (master data)

---

## Technology Stack
- **Framework:** Spring Boot 3.2.2
- **Database:** PostgreSQL 42.7.1
- **Migration Tool:** Flyway 9.22.3
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Microservices-based with Kafka event streaming
- **Messaging:** Apache Kafka for event-driven communication
- **Java Version:** Java 8+

---

## Getting Started

### Prerequisites
- Java 8+
- PostgreSQL 9.6+
- Maven 3+
- Apache Kafka

### Database Migration
Database migrations are managed using Flyway and located in:
- `echallan-services/src/main/resources/db/migration/main/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings
- Tenant configuration
- Filestore integration
- Billing service endpoints
- Calculator service endpoints
- MDMS service configuration
- Kafka broker settings
- ID generation service
- Notification service settings (SMS, Email)

---

## Support & Documentation

For detailed information:
- **[E-Challan Service Details →](echallan-services/README.md)**
- **[E-Challan Calculator Details →](echallan-calculator/README.md)**
- **[Database Schema Documentation →](echallan-services/src/main/resources/db/migration/main/README.md)**
- **[Configuration & Setup Guide →](https://digit-discuss.atlassian.net/l/c/18Rgs1cw)**

---

## Recent Updates (LTS Upgrade)

1. Artifact ID updated to 1.1.2-SNAPSHOT from 1.1.1-SNAPSHOT
2. Spring Boot Starter Parent upgraded to 3.2.2 from 2.2.6.RELEASE
3. Tracer version updated to 2.9.0-SNAPSHOT from 2.0.0-SNAPSHOT
4. MDMS client version updated to 2.9.0-SNAPSHOT from 0.0.2-SNAPSHOT
5. JUnit dependency added (version 4.13.2)
6. Flyway-core upgraded to 9.22.3 from 6.4.3
7. PostgreSQL driver upgraded to 42.7.1 from 42.2.11
8. Removed javax validation-api
9. Removed hibernate-validator dependency

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
