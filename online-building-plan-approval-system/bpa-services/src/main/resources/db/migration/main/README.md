# BPA (Building Plan Approval) Database Schema

## Overview
This document describes the database schema for the Building Plan Approval (BPA) service. The schema consists of three main tables that handle building plan applications, their audit history, and associated documents.

---

## Tables and Columns

### 1. eg_bpa_buildingplan
**Purpose**: Main table storing building plan application details, approval information, and status tracking.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(256) | PRIMARY KEY, NOT NULL | Unique identifier for the building plan application |
| applicationno | varchar(64) | - | Application number generated for the building plan |
| tenantid | varchar(256) | - | Tenant/ULB identifier for multi-tenancy support |
| edcrnumber | varchar(64) | - | e-DCR (Electronic Development Control Regulation) number |
| status | varchar(64) | - | Current status of the application (e.g., PENDING, APPROVED, REJECTED) |
| landid | varchar(256) | - | Reference to the land/property identifier |
| additionaldetails | jsonb | - | Flexible JSON field storing additional metadata like serviceType, applicationType |
| createdby | varchar(64) | - | User UUID who created the record |
| lastmodifiedby | varchar(64) | - | User UUID who last modified the record |
| createdtime | bigint | - | Epoch timestamp (milliseconds) when record was created |
| lastmodifiedtime | bigint | - | Epoch timestamp (milliseconds) when record was last modified |
| approvalno | varchar(64) | DEFAULT NULL | Approval/Permit number assigned after approval |
| approvaldate | bigint | - | Epoch timestamp (milliseconds) of approval date |
| applicationdate | bigint | - | Epoch timestamp (milliseconds) when application was submitted |
| businessService | varchar(64) | DEFAULT NULL | Business service type (BPA, BPA_LOW, BPA_OC) |
| accountid | varchar(256) | DEFAULT NULL | Account identifier of the applicant |

**Indexes**:
- `bpa_index` on (applicationno, approvalno, tenantid, landid, id, status, edcrnumber)


---

### 2. eg_bpa_auditdetails
**Purpose**: Audit trail table maintaining historical records of all changes made to building plan applications.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(256) | NOT NULL | Unique identifier for the audit record |
| applicationno | varchar(64) | - | Application number (copied from main table) |
| tenantid | varchar(256) | - | Tenant/ULB identifier (copied from main table) |
| edcrnumber | varchar(64) | - | e-DCR number (copied from main table) |
| status | varchar(64) | - | Status at the time of audit entry |
| landid | varchar(256) | - | Land/property identifier (copied from main table) |
| additionaldetails | jsonb | - | Additional metadata snapshot at audit time |
| createdby | varchar(64) | - | User who created the original record |
| lastmodifiedby | varchar(64) | - | User who modified the record (triggering audit) |
| createdtime | bigint | - | Original creation timestamp |
| lastmodifiedtime | bigint | - | Timestamp when modification occurred |
| approvalno | varchar(64) | DEFAULT NULL | Approval number (if any at audit time) |
| approvaldate | bigint | - | Approval date (if any at audit time) |
| applicationdate | bigint | - | Application submission date |
| businessService | varchar(64) | DEFAULT NULL | Business service type snapshot |
| accountid | varchar(256) | DEFAULT NULL | Account identifier snapshot |


---

### 3. eg_bpa_document
**Purpose**: Stores document attachments and references for building plan applications.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | PRIMARY KEY, NOT NULL | Unique identifier for the document record |
| documenttype | varchar(64) | - | Type/category of document (e.g., FLOOR_PLAN, SITE_PLAN, NOC) |
| filestoreid | varchar(64) | - | Reference ID to the file in the file storage service |
| documentuid | varchar(64) | - | Unique identifier for the document |
| buildingplanid | varchar(64) | FOREIGN KEY | Reference to the parent building plan (eg_bpa_buildingplan.id) |
| additionaldetails | jsonb | - | Additional metadata about the document |
| createdby | varchar(64) | - | User UUID who uploaded the document |
| lastmodifiedby | varchar(64) | - | User UUID who last modified the document record |
| createdtime | bigint | - | Epoch timestamp when document was uploaded |
| lastmodifiedtime | bigint | - | Epoch timestamp when document record was modified |

**Foreign Keys**:
- `buildingplanid` → `eg_bpa_buildingplan.id` (ON UPDATE NO ACTION, ON DELETE NO ACTION)

---

## Entity Relationship Diagram (ASCII)

```
┌─────────────────────────────────────────────────────────────┐
│                  eg_bpa_buildingplan                        │
│─────────────────────────────────────────────────────────────│
│ PK │ id                    VARCHAR(256)                     │
│    │ applicationno         VARCHAR(64)                      │
│    │ tenantid              VARCHAR(256)                     │
│    │ edcrnumber            VARCHAR(64)                      │
│    │ status                VARCHAR(64)                      │
│    │ landid                VARCHAR(256)                     │
│    │ additionaldetails     JSONB                            │
│    │ createdby             VARCHAR(64)                      │
│    │ lastmodifiedby        VARCHAR(64)                      │
│    │ createdtime           BIGINT                           │
│    │ lastmodifiedtime      BIGINT                           │
│    │ approvalno            VARCHAR(64)                      │
│    │ approvaldate          BIGINT                           │
│    │ applicationdate       BIGINT                           │
│    │ businessService       VARCHAR(64)                      │
│    │ accountid             VARCHAR(256)                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 1
                            │
                            │
                            │ *
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    eg_bpa_document                          │
│─────────────────────────────────────────────────────────────│
│ PK │ id                    VARCHAR(64)                      │
│    │ documenttype          VARCHAR(64)                      │
│    │ filestoreid           VARCHAR(64)                      │
│    │ documentuid           VARCHAR(64)                      │
│ FK │ buildingplanid        VARCHAR(64)  ───────┐            │
│    │ additionaldetails     JSONB               │            │
│    │ createdby             VARCHAR(64)         │            │
│    │ lastmodifiedby        VARCHAR(64)         │            │
│    │ createdtime           BIGINT              │            │
│    │ lastmodifiedtime      BIGINT              │            │
└─────────────────────────────────────────────────────────────┘
                                                 │
                                                 │
                         ┌───────────────────────┘
                         │ References
                         │ (ON UPDATE NO ACTION,
                         │  ON DELETE NO ACTION)
                         │
                         ▼
              eg_bpa_buildingplan.id


┌─────────────────────────────────────────────────────────────┐
│                  eg_bpa_auditdetails                        │
│─────────────────────────────────────────────────────────────│
│    │ id                    VARCHAR(256)                     │
│    │ applicationno         VARCHAR(64)                      │
│    │ tenantid              VARCHAR(256)                     │
│    │ edcrnumber            VARCHAR(64)                      │
│    │ status                VARCHAR(64)                      │
│    │ landid                VARCHAR(256)                     │
│    │ additionaldetails     JSONB                            │
│    │ createdby             VARCHAR(64)                      │
│    │ lastmodifiedby        VARCHAR(64)                      │
│    │ createdtime           BIGINT                           │
│    │ lastmodifiedtime      BIGINT                           │
│    │ approvalno            VARCHAR(64)                      │
│    │ approvaldate          BIGINT                           │
│    │ applicationdate       BIGINT                           │
│    │ businessService       VARCHAR(64)                      │
│    │ accountid             VARCHAR(256)                     │
└─────────────────────────────────────────────────────────────┘
         │
         │ Logical Relationship (no FK constraint)
         │ Stores historical snapshots of buildingplan
         │
         ▼
  eg_bpa_buildingplan (historical reference)
```

