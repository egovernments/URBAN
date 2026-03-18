# Fire NOC Calculator Database Schema

## Overview
This database schema manages the billing slab configuration for Fire NOC (No Objection Certificate) fee calculations. The schema contains a single table that stores rate slabs based on various parameters such as building usage type, Fire NOC type, and unit of measurement.

---

### Table Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                   eg_firenoc_billingslab                        │
├─────────────────────────────────────────────────────────────────┤
│ PK  id                      VARCHAR(250)                        │
│     tenantid                VARCHAR(250)                        │
│     isactive                BOOLEAN                             │
│     firenoctype             VARCHAR(250)                        │
│     buildingusagetype       VARCHAR(250)                        │
│     calculationtype         VARCHAR(250)                        │
│     uom                     VARCHAR(250)                        │
│     fromuom                 DOUBLE PRECISION (nullable)         │
│     touom                   DOUBLE PRECISION (nullable)         │
│     fromdate                BIGINT (nullable)                   │
│     todate                  BIGINT (nullable)                   │
│     rate                    NUMERIC(12,2)                       │
│     createdby               VARCHAR(250)                        │
│     createddate             BIGINT                              │
│     lastmodifiedby          VARCHAR(250)                        │
│     lastModifiedDate        BIGINT                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Column Metadata

| Column Name         | Data Type           | Nullable | Description |
|---------------------|---------------------|----------|-------------|
| **id**              | VARCHAR(250)        | NO       | Primary key - Unique identifier for the billing slab record |
| **tenantid**        | VARCHAR(250)        | NO       | Tenant/ULB (Urban Local Body) identifier for multi-tenancy support |
| **isactive**        | BOOLEAN             | YES      | Flag indicating if this slab is currently active |
| **firenoctype**     | VARCHAR(250)        | NO       | Type/category of Fire NOC (e.g., NEW, PROVISIONAL) |
| **buildingusagetype** | VARCHAR(250)      | NO       | Building usage classification (e.g., RESIDENTIAL, COMMERCIAL, INDUSTRIAL) |
| **calculationtype** | VARCHAR(250)        | NO       | Type of calculation method (e.g., FLAT, RATE_BASED) |
| **uom**             | VARCHAR(250)        | NO       | Unit of Measurement for the slab (e.g., AREA, HEIGHT, FLOORS) |
| **fromuom**         | DOUBLE PRECISION    | YES      | Starting range value for the unit of measurement |
| **touom**           | DOUBLE PRECISION    | YES      | Ending range value for the unit of measurement |
| **fromdate**        | BIGINT              | YES      | Start date of slab validity (epoch timestamp in milliseconds) |
| **todate**          | BIGINT              | YES      | End date of slab validity (epoch timestamp in milliseconds) |
| **rate**            | NUMERIC(12,2)       | YES      | Fee rate applicable for this slab configuration |
| **createdby**       | VARCHAR(250)        | NO       | User ID who created this record |
| **createddate**     | BIGINT              | NO       | Record creation timestamp (epoch milliseconds) |
| **lastmodifiedby**  | VARCHAR(250)        | YES      | User ID who last modified this record |
| **lastModifiedDate**| BIGINT              | YES      | Last modification timestamp (epoch milliseconds) |

---

## Entity Relationship Diagram

```
                    ┌─────────────────────────────────────────────┐
                    │                                             │
                    │      EG_FIRENOC_BILLINGSLAB                 │
                    │                                             │
                    ├─────────────────────────────────────────────┤
                    │                                             │
                    │  PK: id                                     │
                    │                                             │
                    │  Business Identifiers:                      │
                    │  ├─ tenantid          (indexed)             │
                    │  ├─ firenoctype       (indexed)             │
                    │  ├─ buildingusagetype (indexed)             │
                    │  ├─ calculationtype   (indexed)             │
                    │  └─ uom               (indexed)             │
                    │                                             │
                    │  Slab Range:                                │
                    │  ├─ fromuom                                 │
                    │  ├─ touom                                   │
                    │  ├─ fromdate                                │
                    │  └─ todate                                  │
                    │                                             │
                    │  Rate Configuration:                        │
                    │  ├─ rate                                    │
                    │  └─ isactive                                │
                    │                                             │
                    │  Audit Fields:                              │
                    │  ├─ createdby                               │
                    │  ├─ createddate                             │
                    │  ├─ lastmodifiedby                          │
                    │  └─ lastModifiedDate                        │
                    │                                             │
                    └─────────────────────────────────────────────┘
```

