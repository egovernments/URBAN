# Trade License Module

## Overview
The Trade License module is a comprehensive system for managing trade licenses within urban local bodies (ULBs). It handles the complete lifecycle of trade licenses including application submission, fee calculation, approval workflows, issuance, and renewals.

---

## Module Architecture

The Trade License module consists of two main microservices:

```
tradelicense/
├── tl-services/          # Core trade license management service
└── tl-calculator/        # Billing and fee calculation service
```

### 1. **tl-services** - Trade License Management Service
Manages the complete trade license lifecycle including:
- License applications (new, renewal, amendments)
- Owner and business information management
- Document management (application documents, verification documents, owner documents)
- Address and location tracking
- Trade types and accessories
- Institutional ownership support
- Workflow and status management
- Multi-tenant support for different cities/ULBs

**Key Features:**
- Complete CRUD operations for trade licenses
- Support for individual and institutional owners
- Geolocation support (latitude/longitude)
- Document storage integration via filestore
- Audit trail for compliance
- Workflow integration for approval processes

📚 **[View Detailed Database Schema Documentation →](tl-services/src/main/resources/db/migration/main/README.md)**

---

### 2. **tl-calculator** - Fee Calculation Service
Handles all billing and fee calculations for trade licenses:
- Billing slab configuration based on multiple parameters
- Fee calculation for different trade types
- Accessory fee calculations
- Dynamic rate determination based on:
  - License type (Permanent/Temporary)
  - Structure type (Pucca/Kachha/Semi-pucca)
  - Trade category
  - Unit of measurement (area, count, etc.)
  - Application type (NEW/RENEWAL)

**Key Features:**
- Flexible billing slab management
- Multi-parameter rate configuration
- Trade type fee calculation with billing slab mapping
- Accessory fee calculation
- JSON-based fee detail storage
- Tenant-specific rate configuration

📚 **[View Detailed Database Schema Documentation →](tl-calculator/src/main/resources/db/migration/main/README.md)**

---


## Database Tables Summary

### tl-services Tables (12 tables)
- `eg_tl_TradeLicense` - Main license information
- `eg_tl_TradeLicenseDetail` - Detailed specifications
- `eg_tl_TradeUnit` - Trade types and quantities
- `eg_tl_Accessory` - Accessories/equipment
- `eg_tl_ApplicationDocument` - Application documents
- `eg_tl_VerificationDocument` - Verification documents
- `eg_tl_address` - Business location addresses
- `eg_tl_owner` - License owners
- `eg_tl_document_owner` - Owner documents
- `eg_tl_institution` - Institutional owner details
- `eg_tl_TradeLicense_audit` - Audit trail
- `eg_tl_TradeLicenseDetail_audit` - Detail audit trail

### tl-calculator Tables (3 tables)
- `eg_tl_billingslab` - Rate configuration
- `eg_tl_calculator_tradetype` - Trade type fee calculations
- `eg_tl_calculator_accessory` - Accessory fee calculations

---

## Technology Stack
- **Framework:** Spring Boot
- **Database:** PostgreSQL
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
- `tl-services/src/main/resources/db/migration/main/`
- `tl-calculator/src/main/resources/db/migration/main/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings
- Tenant configuration
- Filestore integration
- Workflow service endpoints
- Billing and calculation parameters

---

## Support & Documentation
For detailed database schema documentation:
- **[Trade License Service Schema →](tl-services/src/main/resources/db/migration/main/README.md)**
- **[Trade License Calculator Schema →](tl-calculator/src/main/resources/db/migration/main/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
