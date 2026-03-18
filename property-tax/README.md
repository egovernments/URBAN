# Property Tax Module

## Overview
The Property Tax module is a comprehensive system for managing property taxation within urban local bodies (ULBs). It handles the complete lifecycle of property management including property registration, owner management, tax assessment, billing slab configuration, fee calculation, and mutation processing. The module supports multi-tenant architecture and maintains complete audit trails for compliance.

---

## Module Architecture

The Property Tax module consists of three main microservices:

```
property-tax/
├── property-services/       # Legacy property management service
├── pt-services-v2/         # Modern property management service (V2)
└── pt-calculator-v2/       # Billing and tax calculation service (V2)
```

### 1. **property-services** - Legacy Property Management Service
The original property management service that handles comprehensive property data management including:
- Property master data management
- Owner and institutional ownership tracking
- Property addresses with geolocation support
- Unit/floor-level details
- Property assessments for each financial year
- Document management (property documents, owner documents, assessment documents)
- Draft property submissions
- Property migration tracking
- Data encryption audit trails

**Key Features:**
- Complete CRUD operations for properties and assessments
- Support for both individual and institutional ownership
- Multi-unit/floor property support
- Comprehensive address management with GPS coordinates
- Financial year-based assessments
- Full audit trail through dedicated audit tables
- Property migration support from legacy systems
- Data encryption capabilities

📚 **[View Detailed Database Schema Documentation →](property-services/src/main/resources/db/migration/main/README.md)**

---

### 2. **pt-services-v2** - Property Management Service V2
Modern redesigned service for property tax management with improved data structure:
- Streamlined property registration and management
- Enhanced owner information management
- Improved address and geolocation tracking
- Property detail and assessment management
- Unit-level property management
- Document management for properties and owners
- Institutional ownership support
- Draft property submissions
- Comprehensive audit trails

**Key Features:**
- Simplified and efficient data model
- JSONB support for flexible additional data
- Enhanced indexing for better performance
- Support for ad-hoc exemptions and penalties
- Improved multi-tenancy support
- Financial year-based property details
- Annual Rental Value (ARV) tracking
- Construction type and usage category management

📚 **[View Detailed Database Schema Documentation →](pt-services-v2/src/main/resources/db/migration/main/README.md)**

---

### 3. **pt-calculator-v2** - Tax Calculation Service V2
Specialized service handling all property tax calculations and billing:
- Billing slab configuration based on multiple property parameters
- Property tax calculation using configurable rate structures
- Mutation fee calculation for ownership transfers
- Assessment record management
- Dynamic rate determination based on:
  - Property type and sub-type
  - Usage categories (Major/Minor/Sub-minor/Detail)
  - Ownership categories
  - Floor levels
  - Plot size ranges
  - Occupancy type
  - Area type
  - Market value (for mutation fees)

**Key Features:**
- Flexible multi-parameter billing slab system
- Support for unit rate and ARV percentage-based calculations
- Unbuilt land tax calculation
- Mutation fee calculation with fixed and percentage methods
- Market value-based fee determination
- Assessment to demand linking
- Tenant-specific rate configuration
- Multi-floored property support

📚 **[View Detailed Database Schema Documentation →](pt-calculator-v2/src/main/resources/db/migration/main/README.md)**

---

## Database Tables Summary

### property-services Tables (15 tables)
**Core Tables:**
- `eg_pt_property` - Main property master table
- `eg_pt_owner` - Property owners
- `eg_pt_address` - Property addresses with geolocation
- `eg_pt_unit` - Individual units/floors
- `eg_pt_institution` - Institutional ownership details
- `eg_pt_document` - Property-related documents

**Assessment Tables:**
- `eg_pt_asmt_assessment` - Property tax assessments by financial year
- `eg_pt_asmt_unitusage` - Unit-level usage for assessments
- `eg_pt_asmt_document` - Assessment documents

**Audit Tables:**
- `eg_pt_property_audit` - Property audit trail
- `eg_pt_asmt_assessment_audit` - Assessment audit trail
- `eg_pt_asmt_unitusage_audit` - Unit usage audit trail

**Utility Tables:**
- `eg_pt_drafts_v2` - Draft property submissions
- `eg_pt_property_migration` - Migration batch tracking
- `eg_pt_enc_audit` - Encryption audit
- `eg_pt_id_enc_audit` - Property ID encryption audit

### pt-services-v2 Tables (11 tables)
**Core Tables:**
- `eg_pt_property_v2` - Property master data
- `eg_pt_propertydetail_v2` - Property assessment details
- `eg_pt_owner_v2` - Property owners
- `eg_pt_address_v2` - Property addresses
- `eg_pt_unit_v2` - Property units/floors
- `eg_pt_institution_v2` - Institutional ownership

**Document Tables:**
- `eg_pt_document_propertydetail_v2` - Property documents
- `eg_pt_document_owner_v2` - Owner documents

**Draft and Audit Tables:**
- `eg_pt_drafts_v2` - Draft submissions
- `eg_pt_property_audit_v2` - Property audit trail
- `eg_pt_address_audit_v2` - Address audit trail

### pt-calculator-v2 Tables (3 tables)
- `eg_pt_billingslab_v2` - Tax rate configuration
- `eg_pt_mutation_billingslab` - Mutation fee configuration
- `eg_pt_assessment` - Assessment to demand mapping

---

## Technology Stack
- **Framework:** Spring Boot (Java 8+)
- **Database:** PostgreSQL 9.6+
- **Migration Tool:** Flyway
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Microservices-based
- **Multi-tenancy:** Supported across all services

---

## Getting Started

### Prerequisites
- Java 8+
- PostgreSQL 9.6+
- Maven 3+
- Spring Boot 2.x

### Database Migration
Database migrations are managed using Flyway and located in:
- `property-services/src/main/resources/db/migration/main/`
- `pt-services-v2/src/main/resources/db/migration/main/`
- `pt-calculator-v2/src/main/resources/db/migration/main/`

Migrations run automatically on application startup in the order specified by Flyway version numbers.

### Configuration
Configure the following in `application.properties`:
- Database connection settings (host, port, database name)
- Tenant configuration for multi-tenancy
- Filestore integration endpoints
- Workflow service endpoints
- Billing and calculation parameters
- Assessment configuration
- Mutation fee parameters

---

## Support & Documentation

For detailed database schema documentation for each service:
- **[Property Services (Legacy) Schema →](property-services/src/main/resources/db/migration/main/README.md)**
- **[Property Tax Services V2 Schema →](pt-services-v2/src/main/resources/db/migration/main/README.md)**
- **[Property Tax Calculator V2 Schema →](pt-calculator-v2/src/main/resources/db/migration/main/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
