# Online Building Plan Approval System

## Overview
The Online Building Plan Approval System is a comprehensive digital platform for managing the complete lifecycle of building plan approvals in urban local bodies (ULBs). It streamlines the process from land registration and electronic plan scrutiny to building permit approval and No Objection Certificate (NOC) issuance, enabling efficient, transparent, and automated building plan approval workflows.

---

## Module Architecture

The Building Plan Approval System consists of four main microservices:

```
online-building-plan-approval-system/
├── land-services/          # Land registration and ownership management
├── edcr/                   # Electronic Development Control Regulations (e-DCR)
├── bpa-services/           # Building Plan Approval processing
└── noc-services/           # No Objection Certificate management
```

### 1. **land-services** - Land Registration & Ownership Management
Manages comprehensive land information, ownership details, and property records.

**Key Features:**
- Land parcel registration with unique identifiers
- Owner and institutional ownership management
- Complete address and geolocation tracking (latitude/longitude)
- Unit/property details including floor-wise information
- Document management for ownership proofs and land records
- Multi-tenant support for different cities/ULBs
- Comprehensive audit trail for all land transactions

**Core Capabilities:**
- Individual and institutional land ownership tracking
- Ownership percentage management for shared properties
- Usage category and occupancy type classification
- Flexible JSON-based additional details storage
- Address hierarchy (door, plot, street, locality, city, state)

📚 **[View Detailed Database Schema Documentation →](land-services/src/main/resources/db/migration/main/README.md)**

---

### 2. **edcr** - Electronic Development Control Regulations
Automated building plan scrutiny system that validates architectural drawings against development control regulations.

**Key Features:**
- Automated DXF file processing and scrutiny
- Rule-based validation engine for building regulations
- Plan scrutiny based on multiple parameters:
  - Plot area, occupancy type, number of floors
  - Building height, road width, family size
  - CRZ (Coastal Regulation Zone) compliance
- PDF conversion from DXF with layer-wise processing
- Occupancy Certificate (OC) plan comparison with approved building plans
- Third-party integration support for external systems
- Detailed scrutiny reports with violation tracking

**Core Capabilities:**
- Configurable rule and sub-rule management
- Multi-parameter plan rule evaluation
- Architect and licensee information tracking
- Service type differentiation (New Construction, Addition, Alteration)
- Application type support (Building Plan, OC Plan)
- Transaction tracking for payment integration

📚 **[View Detailed Database Schema Documentation →](edcr/service/egov/egov-edcr/src/main/resources/db/migration/main/README.md)**

---

### 3. **bpa-services** - Building Plan Approval Service
Manages the core building plan approval process including application submission, workflow management, and permit issuance.

**Key Features:**
- Complete building plan application lifecycle management
- e-DCR integration for automated plan scrutiny
- Land service integration for property verification
- Workflow and status management (PENDING, APPROVED, REJECTED)
- Approval and permit number generation
- Document management for:
  - Building plans and architectural drawings
  - Site plans and floor plans
  - NOC documents from various departments
  - Ownership and verification documents
- Multi-business service support (BPA, BPA_LOW, BPA_OC)
- Applicant account management

**Core Capabilities:**
- Application number generation and tracking
- Date tracking (application date, approval date)
- Flexible JSONB storage for service-specific metadata
- Audit trail for compliance and historical tracking
- Integration with payment and billing systems

📚 **[View Detailed Database Schema Documentation →](bpa-services/src/main/resources/db/migration/main/README.md)**

---

### 4. **noc-services** - No Objection Certificate Management
Handles NOC applications and approvals from various departments and authorities.

**Key Features:**
- Multi-type NOC support (FIRE_NOC, BUILDING_NOC, AIRPORT_NOC, etc.)
- Application type handling (NEW, RENEWAL, MODIFICATION)
- Source tracking (CITIZEN, EMPLOYEE, API)
- Land integration via land ID reference
- Document management for NOC-related attachments:
  - Building plans for NOC review
  - Ownership proofs
  - NOC certificates
  - Department-specific documents
- Application status workflow management
- Complete audit trail for all NOC changes

**Core Capabilities:**
- NOC number generation post-approval
- Application and NOC number tracking
- Multi-tenant support for different ULBs
- Source reference ID tracking for integration
- Flexible metadata storage for department-specific requirements

📚 **[View Detailed Database Schema Documentation →](noc-services/src/main/resources/db/migration/main/README.md)**

---

## Database Tables Summary

### land-services Tables (7 operational tables + audit tables)
- `eg_land_landInfo` - Master land registration
- `eg_land_Address` - Complete address information
- `eg_land_GeoLocation` - GPS coordinates
- `eg_land_ownerInfo` - Owner details and percentages
- `eg_land_institution` - Institutional ownership
- `eg_land_document` - Land-related documents
- `eg_land_unit` - Unit/property specifications

### edcr Tables (8 tables)
- `EDCR_RULE` - Building control rules
- `EDCR_SUBRULE` - Detailed sub-rules
- `EDCR_PLANRULE` - Plan-specific regulations
- `EDCR_PLANINFO` - Building plan details
- `EDCR_APPLICATION` - Plan scrutiny applications
- `EDCR_APPLICATION_DETAIL` - Scrutiny results and files
- `EDCR_PDF_DETAIL` - PDF conversion tracking
- `EDCR_OC_COMPARISON_DETAIL` - OC vs BP comparison

### bpa-services Tables (3 tables)
- `eg_bpa_buildingplan` - Building plan applications
- `eg_bpa_document` - Application documents
- `eg_bpa_auditdetails` - Audit trail

### noc-services Tables (3 tables)
- `eg_noc` - NOC applications
- `eg_noc_document` - NOC-related documents
- `eg_noc_auditdetails` - NOC audit trail

---

## Technology Stack
- **Framework:** Spring Boot
- **Database:** PostgreSQL 9.6+
- **Migration Tool:** Flyway
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Microservices-based
- **CAD Processing:** DXF file parsing and validation
- **Document Management:** Filestore integration
- **Multi-tenancy:** Tenant-based data isolation

---

## Getting Started

### Prerequisites
- Java 8+
- PostgreSQL 9.6+
- Maven 3+
- DXF processing libraries (for e-DCR)

### Database Migration
Database migrations are managed using Flyway and located in:
- `land-services/src/main/resources/db/migration/main/`
- `edcr/service/egov/egov-edcr/src/main/resources/db/migration/main/`
- `bpa-services/src/main/resources/db/migration/main/`
- `noc-services/src/main/resources/db/migration/main/`

### Configuration
Configure the following in `application.properties` for each service:
- Database connection settings
- Tenant configuration
- Filestore integration endpoints
- Workflow service endpoints
- e-DCR rule engine parameters
- Inter-service communication endpoints

---

## Support & Documentation

For detailed database schema documentation:
- **[Land Services Schema →](land-services/src/main/resources/db/migration/main/README.md)**
- **[EDCR Schema →](edcr/service/egov/egov-edcr/src/main/resources/db/migration/main/README.md)**
- **[BPA Services Schema →](bpa-services/src/main/resources/db/migration/main/README.md)**
- **[NOC Services Schema →](noc-services/src/main/resources/db/migration/main/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
