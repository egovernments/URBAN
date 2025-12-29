# Public Grievance Redressal (PGR) Module

## Overview
The Public Grievance Redressal (PGR) module is a comprehensive citizen-centric system for managing public grievances and service requests within urban local bodies (ULBs). It enables citizens to register complaints, track their progress in real-time, provide feedback, and rate the resolution quality. The system supports multiple channels for complaint registration and maintains complete audit trails for transparency and accountability.

---

## Module Architecture

The PGR module consists of two main microservices with support for both legacy and current schema versions:

```
public-grievance-redressal/
├── rainmaker-pgr/          # Legacy PGR service with comprehensive workflow
└── pgr-services/           # Current PGR v2 service with enhanced features
```

### 1. **rainmaker-pgr** - Legacy PGR Service
Manages the complete grievance lifecycle with dual schema support (legacy and current):

**Legacy Schema Features:**
- Service request management with detailed citizen information
- Media attachments (photos, videos, documents) for evidence
- Comments and communication tracking (internal and public)
- Comprehensive audit trail for all changes
- Status tracking and assignment management

**Current Schema Features:**
- Enhanced service request management with feedback and ratings
- Workflow actions and state transitions tracking
- Structured address management with geographic coordinates
- Soft delete support for data retention
- Migration tracking between schema versions
- Performance-optimized with strategic indexes

**Key Capabilities:**
- Multi-channel complaint registration (WEB, MOBILE, CALL_CENTER, WHATSAPP)
- Real-time status updates and notifications
- Assignment and reassignment workflows
- Escalation management
- Internal and public communication
- Geolocation support (latitude/longitude)
- Expected resolution time tracking
- Flexible attribute storage via JSONB

📚 **[View Detailed Database Schema Documentation →](rainmaker-pgr/src/main/resources/db/migration/main/README.md)**

---

### 2. **pgr-services** - Current PGR v2 Service
Modern implementation with enhanced data modeling and performance optimizations:

**Key Features:**
- Streamlined service request management
- Enhanced address model with comprehensive geographic data
- Multi-address support per service request
- Citizen satisfaction ratings (1-5 scale)
- Application status workflow management
- Source tracking for analytics
- Soft delete capability for audit compliance
- Optimized indexing strategy for faster queries
- Flexible additional details storage (JSONB)

**Address Management:**
- Detailed structured addresses (door, plot, building, street)
- Landmark-based location identification
- Complete geographic hierarchy (locality, district, region, state, country)
- GPS coordinates for mapping integration
- Multi-tenancy support

📚 **[View Detailed Database Schema Documentation →](pgr-services/src/main/resources/db/migration/main/README.md)**

---


## Database Tables Summary

### rainmaker-pgr Tables (8 tables)

**Legacy Schema (4 tables):**
- `eg_pgr_serviceReq` - Main service request table (legacy)
- `eg_pgr_media` - Media attachments (photos, videos, documents)
- `eg_pgr_comment` - Comments and communication tracking
- `eg_pgr_servicereq_audit` - Audit log for all changes

**Current Schema (4 tables):**
- `eg_pgr_service` - Enhanced service request table with feedback/ratings
- `eg_pgr_action` - Workflow actions and state transitions
- `eg_pgr_address` - Structured address information
- `eg_pgr_migration_audit` - Migration progress tracking

### pgr-services Tables (2 tables)
- `eg_pgr_service_v2` - Modern service request management
- `eg_pgr_address_v2` - Enhanced address model with foreign key relationships

---

## Technology Stack
- **Framework:** Spring Boot
- **Database:** PostgreSQL 9.6+
- **Migration Tool:** Flyway
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Microservices-based
- **Precision:** Numeric types for accurate geographic coordinates

---

## Getting Started

### Prerequisites
- Java 8+
- PostgreSQL 9.6+
- Maven 3+

### Database Migration
Database migrations are managed using Flyway and located in:
- `rainmaker-pgr/src/main/resources/db/migration/main/`
- `pgr-services/src/main/resources/db/migration/main/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings
- Tenant configuration
- Filestore integration for media uploads
- Notification service endpoints (SMS/Email)
- Workflow configuration
- SLA parameters

---


## Support & Documentation
For detailed database schema documentation:
- **[Rainmaker PGR Schema (Legacy + Current) →](rainmaker-pgr/src/main/resources/db/migration/main/README.md)**
- **[PGR Services v2 Schema →](pgr-services/src/main/resources/db/migration/main/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
