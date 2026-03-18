# Sewerage Calculator - Database Schema Documentation

## Overview
This directory contains database migration scripts for the Sewerage Calculator (SW-Calculator) module. The schemas are designed to track bulk billing audit information for sewerage connections.

---

## Table Columns

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for each audit record. Serves as the primary key for tracking individual bulk billing operations |
| `batchoffset` | BIGINT | NOT NULL | Offset value indicating the position/progress in the batch processing. Used for resuming failed batch operations or tracking processing checkpoints |
| `createdtime` | BIGINT | NOT NULL | Timestamp (in epoch milliseconds) when the audit record was created. Indicates when the bulk billing operation was initiated |
| `recordCount` | BIGINT | NOT NULL | Total number of records processed in this bulk billing batch. Used for reconciliation and monitoring purposes |
| `tenantid` | VARCHAR(256) | NOT NULL | Tenant identifier for multi-tenancy support. Identifies which municipal organization or city the bulk billing belongs to |
| `businessservice` | VARCHAR(256) | NOT NULL | Business service type identifier (e.g., "SW" for Sewerage). Categorizes the type of utility service being billed |
| `audittime` | BIGINT | NOT NULL | Timestamp (in epoch milliseconds) when the audit entry was recorded. May differ from createdtime to track when audit was logged vs when operation started |
| `message` | VARCHAR(2048) | NOT NULL | Detailed message or description of the audit event. Can contain success messages, error details, or processing status information |

#### Indexes
- **Primary Key Index**: Automatically created on `id` column for fast lookups

---

## ER Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     eg_sw_bulkbill_audit                        │
├─────────────────────────────────────────────────────────────────┤
│ PK  id                  VARCHAR(128)                            │
│     batchoffset         BIGINT                                  │
│     createdtime         BIGINT                                  │
│     recordCount         BIGINT                                  │
│     tenantid            VARCHAR(256)                            │
│     businessservice     VARCHAR(256)                            │
│     audittime           BIGINT                                  │
│     message             VARCHAR(2048)                           │
└─────────────────────────────────────────────────────────────────┘
         │
         │ (Logical Relationship - External Tables)
         │
         ├─────────────────────────────────────────────────────────┐
         │                                                         │
         ▼                                                         ▼
  ┌─────────────┐                                          ┌──────────────┐
  │  Tenant     │                                          │  Business    │
  │  (External) │                                          │  Service     │
  │             │                                          │  (External)  │
  │  tenantid   │                                          │  service     │
  └─────────────┘                                          └──────────────┘
```

