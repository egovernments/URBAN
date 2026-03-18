# Water Supply Calculator - Database Schema Documentation

## Overview
This document describes the database schema for the Water Supply Calculator service, which manages water meter readings and bulk billing audit operations.

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────┐
│        eg_ws_meterreading               │
├─────────────────────────────────────────┤
│ PK  id              VARCHAR(64)         │
│     connectionNo    VARCHAR(64)  [IDX]  │
│     billingPeriod   VARCHAR(64)         │
│     meterStatus     VARCHAR(64)         │
│     lastReading     DECIMAL             │
│     lastReadingDate BIGINT              │
│     currentReading  DECIMAL             │
│     currentReadingDate BIGINT           │
│     consumption     DECIMAL             │
│     createdBy       VARCHAR(64)         │
│     lastModifiedBy  VARCHAR(64)         │
│     createdTime     BIGINT              │
│     lastModifiedTime BIGINT             │
│     tenantid        VARCHAR(64)  [IDX]  │
└─────────────────────────────────────────┘
                    │
                    │ (logical relationship via tenantid)
                    │
                    ▼
┌─────────────────────────────────────────┐
│      eg_ws_bulkbill_audit               │
├─────────────────────────────────────────┤
│ PK  id              VARCHAR(128)        │
│     batchoffset     BIGINT              │
│     createdtime     BIGINT              │
│     recordCount     BIGINT              │
│     tenantid        VARCHAR(256)        │
│     businessservice VARCHAR(256)        │
│     audittime       BIGINT              │
│     message         VARCHAR(2048)       │
└─────────────────────────────────────────┘
```

---

## Database Tables

### 1. eg_ws_meterreading

**Purpose**: Stores water meter reading records for individual water connections, tracking consumption over billing periods.

#### Table Structure
```sql
CREATE TABLE eg_ws_meterreading (
    id                  VARCHAR(64)  PRIMARY KEY,
    connectionNo        VARCHAR(64)  NOT NULL,
    billingPeriod       VARCHAR(64)  NOT NULL,
    meterStatus         VARCHAR(64)  NOT NULL,
    lastReading         DECIMAL      NOT NULL,
    lastReadingDate     BIGINT       NOT NULL,
    currentReading      DECIMAL      NOT NULL,
    currentReadingDate  BIGINT       NOT NULL,
    consumption         DECIMAL,
    createdBy           VARCHAR(64),
    lastModifiedBy      VARCHAR(64),
    createdTime         BIGINT,
    lastModifiedTime    BIGINT,
    tenantid            VARCHAR(64)
);
```

#### Column Descriptions

| Column Name | Data Type | Nullable | Description |
|-------------|-----------|----------|-------------|
| **id** | VARCHAR(64) | No | Unique identifier for the meter reading record (Primary Key) |
| **connectionNo** | VARCHAR(64) | No | Water connection number/ID associated with the customer |
| **billingPeriod** | VARCHAR(64) | No | Billing cycle identifier (e.g., "2024-Q1", "JAN-2024") |
| **meterStatus** | VARCHAR(64) | No | Current status of the meter (e.g., "WORKING", "FAULTY", "NOT_WORKING") |
| **lastReading** | DECIMAL | No | Previous meter reading value in cubic meters or gallons |
| **lastReadingDate** | BIGINT | No | Timestamp (epoch) of the last meter reading |
| **currentReading** | DECIMAL | No | Current meter reading value in cubic meters or gallons |
| **currentReadingDate** | BIGINT | No | Timestamp (epoch) of the current meter reading |
| **consumption** | DECIMAL | Yes | Calculated water consumption (currentReading - lastReading) |
| **createdBy** | VARCHAR(64) | Yes | User ID who created the record |
| **lastModifiedBy** | VARCHAR(64) | Yes | User ID who last modified the record |
| **createdTime** | BIGINT | Yes | Timestamp (epoch) when record was created |
| **lastModifiedTime** | BIGINT | Yes | Timestamp (epoch) when record was last modified |
| **tenantid** | VARCHAR(64) | Yes | Tenant identifier for multi-tenancy support (city/organization ID) |

#### Indexes
- `index_eg_ws_meterreading_tenantId`: Optimizes queries filtering by tenant
- `index_eg_ws_meterreading_connectionNo`: Optimizes queries by connection number

---

### 2. eg_ws_bulkbill_audit

**Purpose**: Maintains audit trail for bulk billing operations, tracking batch processing history and outcomes.

#### Table Structure
```sql
CREATE TABLE eg_ws_bulkbill_audit (
    id              VARCHAR(128)  PRIMARY KEY,
    batchoffset     BIGINT        NOT NULL,
    createdtime     BIGINT        NOT NULL,
    recordCount     BIGINT        NOT NULL,
    tenantid        VARCHAR(256)  NOT NULL,
    businessservice VARCHAR(256)  NOT NULL,
    audittime       BIGINT        NOT NULL,
    message         VARCHAR(2048) NOT NULL
);
```

#### Column Descriptions

| Column Name | Data Type | Nullable | Description |
|-------------|-----------|----------|-------------|
| **id** | VARCHAR(128) | No | Unique identifier for the audit record (Primary Key) |
| **batchoffset** | BIGINT | No | Offset position in the batch processing queue for resumption |
| **createdtime** | BIGINT | No | Timestamp (epoch) when the batch was initiated |
| **recordCount** | BIGINT | No | Total number of records processed in this batch |
| **tenantid** | VARCHAR(256) | No | Tenant identifier (city/organization ID) |
| **businessservice** | VARCHAR(256) | No | Service type identifier (e.g., "WS.BILLING", "WS.CALCULATION") |
| **audittime** | BIGINT | No | Timestamp (epoch) when audit entry was recorded |
| **message** | VARCHAR(2048) | No | Audit message containing status, errors, or processing details |

#### Schema Evolution
- **V202205060600**: Initial table creation
- **V202205090600**: Added `audittime` and `message` columns for enhanced audit tracking
