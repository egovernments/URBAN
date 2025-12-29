# Fire NOC Module

## Overview
The Fire NOC (No Objection Certificate) module is a comprehensive system for managing Fire NOC applications within urban local bodies (ULBs). It handles the complete lifecycle of Fire NOC certificates including application submission, property and building information management, fee calculation, approval workflows, issuance, and renewals.

---

## Module Architecture

The Fire NOC module consists of two main microservices:

```
firenoc/
├── firenoc-services/          # Core Fire NOC management service
└── firenoc-calculator/        # Billing and fee calculation service
```

### 1. **firenoc-services** - Fire NOC Management Service
Manages the complete Fire NOC lifecycle including:
- Fire NOC applications (new, provisional, renewal)
- Property and building information management
- Owner and institutional ownership details
- Address and geolocation tracking
- Building measurements (UOMs - Unit of Measurements)
- Document management (building documents)
- Fire station jurisdiction mapping
- Workflow and status management
- Multi-tenant support for different cities/ULBs

**Key Features:**
- Complete CRUD operations for Fire NOC applications
- Support for individual and institutional owners
- Multiple buildings per application support
- Flexible UOM tracking (floors, basements, plot size, built-up area, height)
- Geolocation support (latitude/longitude)
- Document storage integration via filestore
- Audit trail for compliance
- Application validity period management
- Financial year tracking
- Multiple application channels (ONLINE/COUNTER)

📚 **[View Detailed Database Schema Documentation →](firenoc-services/migration/ddl/README.md)**

---

### 2. **firenoc-calculator** - Fee Calculation Service
Handles all billing and fee calculations for Fire NOC applications:
- Billing slab configuration based on multiple parameters
- Fee calculation for different Fire NOC types
- Dynamic rate determination based on:
  - Fire NOC type (NEW/PROVISIONAL/RENEWAL)
  - Building usage type (RESIDENTIAL/COMMERCIAL/INDUSTRIAL)
  - Calculation type (FLAT/RATE_BASED)
  - Unit of measurement (AREA/HEIGHT/FLOORS)
  - Date range validity

**Key Features:**
- Flexible billing slab management with range-based pricing
- Multi-parameter rate configuration
- Building usage type-based fee calculation
- UOM range support (from-to values)
- Temporal validity (from-to dates)
- Tenant-specific rate configuration
- Active/inactive slab management
- Support for various calculation methodologies

📚 **[View Detailed Database Schema Documentation →](firenoc-calculator/migration/ddl/README.md)**

---

## Database Tables Summary

### firenoc-services Tables (8 tables)
- `eg_fn_firenoc` - Main Fire NOC application record
- `eg_fn_firenocdetail` - Detailed Fire NOC information with status and validity
- `eg_fn_address` - Property address and location information
- `eg_fn_buidlings` - Building-specific details
- `eg_fn_buildinguoms` - Unit of Measurements for buildings
- `eg_fn_buildingdocuments` - Building-related documents
- `eg_fn_owner` - Owner/Applicant information
- `eg_fn_institution` - Institutional owner details

### firenoc-calculator Tables (1 table)
- `eg_firenoc_billingslab` - Rate configuration and billing slabs

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
- `firenoc-services/migration/ddl/`
- `firenoc-calculator/migration/ddl/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings
- Tenant configuration
- Filestore integration
- Workflow service endpoints
- Fire station jurisdiction mapping
- Billing and calculation parameters

---

## Support & Documentation
For detailed database schema documentation:
- **[Fire NOC Service Schema →](firenoc-services/migration/ddl/README.md)**
- **[Fire NOC Calculator Schema →](firenoc-calculator/migration/ddl/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
