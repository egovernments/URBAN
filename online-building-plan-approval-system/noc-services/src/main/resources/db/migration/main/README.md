# NOC Services Database Schema Documentation

## Overview
This database schema supports the No Objection Certificate (NOC) management system for urban building plan approval. It consists of three main tables that handle NOC applications, their audit trails, and associated documents.

---

## Database Tables

### 1. eg_noc
**Primary Table** - Stores all NOC applications and their current state.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | VARCHAR(256) | PRIMARY KEY, NOT NULL | Unique identifier for each NOC application |
| `applicationno` | VARCHAR(64) | | Application number assigned to the NOC request |
| `tenantid` | VARCHAR(256) | | Identifier for the tenant/municipality/ULB (Urban Local Body) |
| `status` | VARCHAR(64) | | Current workflow status of the NOC application |
| `landid` | VARCHAR(256) | | Reference to the land/property identifier |
| `additionaldetails` | JSONB | | Flexible JSON field for storing additional metadata and custom fields |
| `createdby` | VARCHAR(256) | | User ID of the person who created the record |
| `lastmodifiedby` | VARCHAR(256) | | User ID of the person who last modified the record |
| `createdtime` | BIGINT | | Timestamp (epoch) when the record was created |
| `lastmodifiedtime` | BIGINT | | Timestamp (epoch) when the record was last modified |
| `nocNo` | VARCHAR(64) | DEFAULT NULL | Official NOC number issued after approval |
| `applicationType` | VARCHAR(64) | NOT NULL | Type of application (e.g., NEW, RENEWAL, MODIFICATION) |
| `nocType` | VARCHAR(64) | NOT NULL | Category of NOC (e.g., FIRE_NOC, BUILDING_NOC, AIRPORT_NOC) |
| `accountid` | VARCHAR(256) | DEFAULT NULL | Account identifier of the applicant |
| `source` | VARCHAR(64) | NOT NULL | Source system or channel (e.g., CITIZEN, EMPLOYEE, API) |
| `sourcerefid` | VARCHAR(256) | NOT NULL | Reference ID from the source system |
| `applicationstatus` | VARCHAR(64) | NOT NULL | Current application status (e.g., PENDING, APPROVED, REJECTED) |

**Indexes:**
- Composite index on: `applicationno, nocno, tenantid, id, applicationstatus, noctype`

---

### 2. eg_noc_auditdetails
**Audit Table** - Maintains historical records of all changes made to NOC applications.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | VARCHAR(256) | NOT NULL | Audit record identifier |
| `applicationno` | VARCHAR(64) | | Application number (snapshot) |
| `tenantid` | VARCHAR(256) | | Tenant identifier (snapshot) |
| `status` | VARCHAR(64) | | Status at the time of audit |
| `landid` | VARCHAR(256) | | Land identifier (snapshot) |
| `additionaldetails` | JSONB | | Additional details at the time of audit |
| `createdby` | VARCHAR(256) | | Original creator of the NOC record |
| `lastmodifiedby` | VARCHAR(256) | | User who made the change that triggered this audit |
| `createdtime` | BIGINT | | Original creation timestamp |
| `lastmodifiedtime` | BIGINT | | Timestamp of the change that triggered this audit |
| `nocNo` | VARCHAR(64) | DEFAULT NULL | NOC number (snapshot) |
| `applicationType` | VARCHAR(64) | NOT NULL | Application type (snapshot) |
| `nocType` | VARCHAR(64) | NOT NULL | NOC type (snapshot) |
| `accountid` | VARCHAR(256) | DEFAULT NULL | Account identifier (snapshot) |
| `source` | VARCHAR(64) | NOT NULL | Source system (snapshot) |
| `sourcerefid` | VARCHAR(256) | NOT NULL | Source reference ID (snapshot) |
| `applicationstatus` | VARCHAR(64) | NOT NULL | Application status (snapshot) |

**Purpose:** Provides complete audit trail for compliance, tracking changes, and historical reporting.

---

### 3. eg_noc_document
**Document Table** - Stores references to documents uploaded for NOC applications.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | VARCHAR(64) | PRIMARY KEY, NOT NULL | Unique identifier for each document record |
| `documenttype` | VARCHAR(64) | | Type/category of document (e.g., BUILDINGPLAN, OWNERSHIP_PROOF, NOC_CERTIFICATE) |
| `filestoreid` | VARCHAR(64) | | Reference ID to the file in the file storage system |
| `documentuid` | VARCHAR(64) | | Unique identifier for the document |
| `nocid` | VARCHAR(64) | FOREIGN KEY | Reference to the parent NOC application (links to `eg_noc.id`) |
| `additionaldetails` | JSONB | | Additional metadata about the document |
| `createdby` | VARCHAR(64) | | User ID who uploaded the document |
| `lastmodifiedby` | VARCHAR(64) | | User ID who last modified the document record |
| `createdtime` | BIGINT | | Timestamp when the document was uploaded |
| `lastmodifiedtime` | BIGINT | | Timestamp of last modification |

**Relationships:**
- **Foreign Key:** `nocid` references `eg_noc(id)`
- **Cascade Rules:** ON UPDATE NO ACTION, ON DELETE NO ACTION

---

## Entity Relationship Diagram (ASCII)

```
┌─────────────────────────────────────────────┐
│             eg_noc (Main Table)             │
├─────────────────────────────────────────────┤
│ PK  id                  VARCHAR(256)        │
│     applicationno       VARCHAR(64)         │
│     tenantid            VARCHAR(256)        │
│     status              VARCHAR(64)         │
│     landid              VARCHAR(256)        │
│     additionaldetails   JSONB               │
│     createdby           VARCHAR(256)        │
│     lastmodifiedby      VARCHAR(256)        │
│     createdtime         BIGINT              │
│     lastmodifiedtime    BIGINT              │
│     nocNo               VARCHAR(64)         │
│     applicationType     VARCHAR(64) [NN]    │
│     nocType             VARCHAR(64) [NN]    │
│     accountid           VARCHAR(256)        │
│     source              VARCHAR(64) [NN]    │
│     sourcerefid         VARCHAR(256) [NN]   │
│     applicationstatus   VARCHAR(64) [NN]    │
└──────────────────┬──────────────────────────┘
                   │
                   │ 1
                   │
                   │
                   │ *
┌──────────────────▼──────────────────────────┐
│         eg_noc_document                     │
├─────────────────────────────────────────────┤
│ PK  id                  VARCHAR(64)         │
│     documenttype        VARCHAR(64)         │
│     filestoreid         VARCHAR(64)         │
│     documentuid         VARCHAR(64)         │
│ FK  nocid               VARCHAR(64)         │
│     additionaldetails   JSONB               │
│     createdby           VARCHAR(64)         │
│     lastmodifiedby      VARCHAR(64)         │
│     createdtime         BIGINT              │
│     lastmodifiedtime    BIGINT              │
└─────────────────────────────────────────────┘


┌─────────────────────────────────────────────┐
│      eg_noc_auditdetails (Audit Trail)      │
├─────────────────────────────────────────────┤
│     id                  VARCHAR(256) [NN]   │
│     applicationno       VARCHAR(64)         │
│     tenantid            VARCHAR(256)        │
│     status              VARCHAR(64)         │
│     landid              VARCHAR(256)        │
│     additionaldetails   JSONB               │
│     createdby           VARCHAR(256)        │
│     lastmodifiedby      VARCHAR(256)        │
│     createdtime         BIGINT              │
│     lastmodifiedtime    BIGINT              │
│     nocNo               VARCHAR(64)         │
│     applicationType     VARCHAR(64) [NN]    │
│     nocType             VARCHAR(64) [NN]    │
│     accountid           VARCHAR(256)        │
│     source              VARCHAR(64) [NN]    │
│     sourcerefid         VARCHAR(256) [NN]   │
│     applicationstatus   VARCHAR(64) [NN]    │
└─────────────────────────────────────────────┘
         ▲
         │ (mirrors structure, no FK)
         │
    (audit trail)
```
