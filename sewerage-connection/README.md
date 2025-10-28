# Sewerage Connection Module

## Overview
The Sewerage Connection module is a comprehensive system for managing sewerage connections within urban local bodies (ULBs). It handles the complete lifecycle of sewerage connections including application submission, fee calculation, approval workflows, connection execution, and billing operations.

---

## Module Architecture

The Sewerage Connection module consists of two main microservices:

```
sewerage-connection/
├── sw-services/          # Core sewerage connection management service
└── sw-calculator/        # Billing and fee calculation service
```

### 1. **sw-services** - Sewerage Connection Management Service
Manages the complete sewerage connection lifecycle including:
- Connection applications (new, modification, disconnection)
- Property integration and service management
- Connection holder/owner management
- Plumber information tracking
- Document management (application documents, verification documents)
- Road cutting permissions and tracking
- Workflow and status management
- Multi-tenant support for different cities/ULBs

**Key Features:**
- Complete CRUD operations for sewerage connections
- Support for multiple connection holders (co-owners)
- Geolocation and locality tracking
- Document storage integration via filestore
- Audit trail for compliance and history tracking
- Ad-hoc penalty and rebate management with approval workflows
- Temporary and permanent disconnection support
- Data encryption tracking for sensitive information
- Multiple application channels (SYSTEM, CITIZEN portal, CSC)

📚 **[View Detailed Database Schema Documentation →](sw-services/src/main/resources/db/migration/ddl/README.md)**

---

### 2. **sw-calculator** - Fee Calculation Service
Handles all billing and bulk billing operations for sewerage connections:
- Bulk billing operations for sewerage connections
- Fee and charge calculations
- Batch processing and audit trails
- Financial reconciliation tracking
- Billing slab configuration

**Key Features:**
- Bulk bill processing with batch offset tracking
- Audit trail for billing operations
- Record count and reconciliation support
- Tenant-specific billing configuration
- Business service type categorization
- Error tracking and retry mechanisms

📚 **[View Detailed Database Schema Documentation →](sw-calculator/src/main/resources/db/migration/ddl/README.md)**

---

## Database Tables Summary

### sw-services Tables (10 tables)
- `eg_sw_connection` - Main connection information and applications
- `eg_sw_connection_audit` - Historical audit trail of connection changes
- `eg_sw_service` - Service-specific details (water closets, toilets, connection types)
- `eg_sw_service_audit` - Service detail audit trail
- `eg_sw_connectionholder` - Connection owners/holders information
- `eg_sw_plumberinfo` - Licensed plumber information
- `eg_sw_applicationdocument` - Application document references
- `eg_sw_roadcuttinginfo` - Road cutting area and type details
- `eg_sw_enc_audit` - Batch encryption operation tracking
- `eg_sw_id_enc_audit` - ID and number encryption status

### sw-calculator Tables (1 table)
- `eg_sw_bulkbill_audit` - Bulk billing operations and reconciliation

---

## Technology Stack
- **Framework:** Spring Boot
- **Database:** PostgreSQL with JSONB support
- **Migration Tool:** Flyway
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Microservices-based

---

## Getting Started

### Prerequisites
- Java 8+
- PostgreSQL 9.6+
- Maven 3+

### Database Migration
Database migrations are managed using Flyway and located in:
- `sw-services/src/main/resources/db/migration/ddl/`
- `sw-calculator/src/main/resources/db/migration/ddl/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings
- Tenant configuration
- Filestore integration
- Workflow service endpoints
- Property service integration
- Billing and calculation parameters

---

## Support & Documentation
For detailed database schema documentation:
- **[Sewerage Connection Service Schema →](sw-services/src/main/resources/db/migration/ddl/README.md)**
- **[Sewerage Connection Calculator Schema →](sw-calculator/src/main/resources/db/migration/ddl/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
