# Trade License Calculator - Database Schema Documentation

## Overview
This database schema manages the billing and calculation system for trade licenses. It consists of three main tables that handle billing slabs, trade type calculations, and accessory calculations for trade licenses.

---

## Entity Relationship Diagram (ASCII)

```
┌─────────────────────────────────────────────────────┐
│              eg_tl_billingslab                      │
│─────────────────────────────────────────────────────│
│ PK  id                           VARCHAR            │
│ PK  tenantid                     VARCHAR            │
│     licensetype                  VARCHAR            │
│     structuretype                VARCHAR            │
│     tradetype                    VARCHAR            │
│     accessorycategory            VARCHAR            │
│     type                         VARCHAR            │
│     uom                          VARCHAR            │
│     fromUom                      FLOAT8             │
│     toUom                        FLOAT8             │
│     rate                         NUMERIC(12,2)      │
│     applicationtype              VARCHAR(64)        │
│     createdtime                  BIGINT             │
│     createdby                    VARCHAR            │
│     lastmodifiedtime             BIGINT             │
│     lastmodifiedby               VARCHAR            │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ Referenced by
                       │ (via JSONB fields)
                       │
         ──────────────┼──────────────
         │                            │
         │                            │
         ▼                            ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│ eg_tl_calculator_        │  │ eg_tl_calculator_        │
│       tradetype          │  │       accessory          │
│──────────────────────────│  │──────────────────────────│
│ PK id      VARCHAR(64)   │  │ PK id      VARCHAR(64)   │
│    tenantid VARCHAR(64)  │  │    tenantid VARCHAR(64)  │
│ IX consumercode          │  │ IX consumercode          │
│         VARCHAR(64)      │  │         VARCHAR(64)      │
│    tradeTypeFeeAnd       │  │    accessoryFeeAnd       │
│    BillingSlabIds JSONB  │  │    BillingSlabIds JSONB  │
│    createdtime   BIGINT  │  │    createdtime   BIGINT  │
│    createdby     VARCHAR │  │    createdby     VARCHAR │
│    lastmodifiedtime      │  │    lastmodifiedtime      │
│                  BIGINT  │  │                  BIGINT  │
│    lastmodifiedby        │  │    lastmodifiedby        │
│                  VARCHAR │  │                  VARCHAR │
└──────────────────────────┘  └──────────────────────────┘
         │                            │
         │                            │
         └────────────┬───────────────┘
                      │
                      │ Both link to same consumer
                      ▼
              ┌───────────────┐
              │  Consumer/    │
              │  Application  │
              │  (External)   │
              └───────────────┘
```



---

## Tables

### 1. eg_tl_billingslab
**Purpose:** Stores billing slab configuration for trade licenses, defining rate structures based on various parameters like license type, structure type, trade type, and unit of measurement ranges.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | VARCHAR | PRIMARY KEY | Unique identifier for the billing slab record |
| `tenantid` | VARCHAR | PRIMARY KEY | Tenant identifier for multi-tenancy support |
| `licensetype` | VARCHAR | UNIQUE CONSTRAINT | Type of trade license (e.g., Permanent, Temporary) |
| `structuretype` | VARCHAR | UNIQUE CONSTRAINT | Type of structure (e.g., Pucca, Kachha, Semi-pucca) |
| `tradetype` | VARCHAR | UNIQUE CONSTRAINT, INDEXED | Category/type of trade business |
| `accessorycategory` | VARCHAR | UNIQUE CONSTRAINT, INDEXED | Category of accessory items related to trade |
| `type` | VARCHAR | UNIQUE CONSTRAINT | Classification type for billing |
| `uom` | VARCHAR | UNIQUE CONSTRAINT, INDEXED | Unit of Measurement (e.g., sqft, sqmt, count) |
| `fromUom` | FLOAT8 | UNIQUE CONSTRAINT, INDEXED | Starting range of UOM for rate applicability |
| `toUom` | FLOAT8 | UNIQUE CONSTRAINT, INDEXED | Ending range of UOM for rate applicability |
| `rate` | NUMERIC(12,2) | | Billing rate applicable for the defined range |
| `applicationtype` | VARCHAR(64) | DEFAULT 'NEW' | Type of application (NEW, RENEWAL, etc.) |
| `createdtime` | BIGINT | | Timestamp (epoch) when record was created |
| `createdby` | VARCHAR | | User ID who created the record |
| `lastmodifiedtime` | BIGINT | | Timestamp (epoch) of last modification |
| `lastmodifiedby` | VARCHAR | | User ID who last modified the record |

**Indexes:**
- Primary Key: `(id, tenantid)`
- Unique Constraint: `(tenantid, licensetype, structuretype, tradetype, accessorycategory, type, uom, fromUom, toUom)`
- Index on: `tenantid`, `accessorycategory`, `tradetype`, `fromUom`, `toUom`, `uom`

**What we save:** Rate configuration and billing slabs that determine how much to charge for different trade license scenarios based on multiple parameters.

---

### 2. eg_tl_calculator_tradetype
**Purpose:** Stores calculated fee details for trade types associated with a specific trade license application.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | VARCHAR(64) | PRIMARY KEY (UNIQUE) | Unique identifier for the calculation record |
| `tenantid` | VARCHAR(64) | | Tenant identifier for multi-tenancy support |
| `consumercode` | VARCHAR(64) | INDEXED | Trade license application/consumer identifier |
| `tradeTypeFeeAndBillingSlabIds` | JSONB | NOT NULL | JSON object containing fee calculation details and references to billing slab IDs |
| `createdtime` | BIGINT | | Timestamp (epoch) when record was created |
| `createdby` | VARCHAR | | User ID who created the record |
| `lastmodifiedtime` | BIGINT | | Timestamp (epoch) of last modification |
| `lastmodifiedby` | VARCHAR | | User ID who last modified the record |

**Indexes:**
- Unique Constraint: `id`
- Index on: `consumercode`

**What we save:** Calculated fee breakup for trade types, linking trade license applications to applicable billing slabs and storing the computed fees in JSONB format.

---

### 3. eg_tl_calculator_accessory
**Purpose:** Stores calculated fee details for accessories associated with a specific trade license application.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | VARCHAR(64) | PRIMARY KEY (UNIQUE) | Unique identifier for the calculation record |
| `tenantid` | VARCHAR(64) | | Tenant identifier for multi-tenancy support |
| `consumercode` | VARCHAR(64) | INDEXED | Trade license application/consumer identifier |
| `accessoryFeeAndBillingSlabIds` | JSONB | NOT NULL | JSON object containing accessory fee calculation details and references to billing slab IDs |
| `createdtime` | BIGINT | | Timestamp (epoch) when record was created |
| `createdby` | VARCHAR | | User ID who created the record |
| `lastmodifiedtime` | BIGINT | | Timestamp (epoch) of last modification |
| `lastmodifiedby` | VARCHAR | | User ID who last modified the record |

**Indexes:**
- Unique Constraint: `id`
- Index on: `consumercode`

**What we save:** Calculated fee breakup for accessories (additional items/equipment), linking trade license applications to applicable billing slabs and storing the computed fees in JSONB format.
