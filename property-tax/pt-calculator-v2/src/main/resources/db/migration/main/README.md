# Property Tax Calculator V2 - Database Schema Documentation

## Overview
This database schema supports the Property Tax Calculator V2 system, which calculates property taxes and mutation fees based on various property characteristics and billing slabs.

---


## Table Schemas

### 1. eg_pt_billingslab_v2
**Purpose**: Main billing slab table that stores rate configurations for property tax calculation based on multiple property characteristics.

| Column Name | Data Type | Description | Metadata |
|-------------|-----------|-------------|----------|
| `id` | VARCHAR(64) | Unique identifier for billing slab | Primary Key, NOT NULL |
| `tenantId` | VARCHAR(256) | Tenant/ULB identifier for multi-tenancy | Primary Key, NOT NULL, Indexed |
| `propertyType` | VARCHAR(64) | Type of property (e.g., Residential, Commercial) | Indexed |
| `propertySubType` | VARCHAR(64) | Sub-category of property type | Indexed |
| `usageCategoryMajor` | VARCHAR(64) | Major usage category classification | Indexed |
| `usageCategoryMinor` | VARCHAR(64) | Minor usage category classification | Indexed |
| `usageCategorySubMinor` | VARCHAR(64) | Sub-minor usage category classification | |
| `usageCategoryDetail` | VARCHAR(64) | Detailed usage category classification | |
| `ownerShipCategory` | VARCHAR(64) | Category of ownership (e.g., Individual, Institution) | |
| `subOwnerShipCategory` | VARCHAR(256) | Sub-category of ownership | |
| `fromFloor` | FLOAT8 | Starting floor number for rate applicability | Range criteria |
| `toFloor` | FLOAT8 | Ending floor number for rate applicability | Range criteria |
| `areaType` | VARCHAR(64) | Type of area (e.g., Built-up, Carpet) | |
| `occupancyType` | VARCHAR(64) | Type of occupancy (e.g., Owner, Tenant) | |
| `fromPlotSize` | DOUBLE PRECISION | Minimum plot size for rate applicability (sq ft/m) | Range criteria |
| `toPlotSize` | FLOAT8 | Maximum plot size for rate applicability (sq ft/m) | Range criteria |
| `unitRate` | NUMERIC(10,2) | Tax rate per unit area | Calculation parameter |
| `unBuiltUnitRate` | NUMERIC(10,2) | Tax rate for unbuilt/vacant land | Calculation parameter |
| `arvPercent` | NUMERIC(10,2) | Annual Rental Value percentage | Calculation parameter |
| `isPropertyMultiFloored` | BOOLEAN | Flag indicating if property is multi-storied | Filter criteria |
| `createdby` | VARCHAR(64) | User who created the record | Audit field |
| `createdtime` | BIGINT | Timestamp of record creation (epoch) | Audit field |
| `lastmodifiedby` | VARCHAR(64) | User who last modified the record | Audit field |
| `lastmodifiedtime` | BIGINT | Timestamp of last modification (epoch) | Audit field |

**Constraints**:
- Primary Key: `(id, tenantid)`
- Unique Key: `id`

---

### 2. eg_pt_mutation_billingslab
**Purpose**: Stores billing slab configurations for calculating mutation fees when property ownership changes.

| Column Name | Data Type | Description | Metadata |
|-------------|-----------|-------------|----------|
| `id` | VARCHAR(64) | Unique identifier for mutation billing slab | Primary Key, NOT NULL |
| `tenantid` | VARCHAR(256) | Tenant/ULB identifier for multi-tenancy | Primary Key, NOT NULL, Indexed |
| `propertyType` | VARCHAR(64) | Type of property | Indexed |
| `propertySubType` | VARCHAR(64) | Sub-category of property type | Indexed |
| `usageCategoryMajor` | VARCHAR(64) | Major usage category | Indexed |
| `usageCategoryMinor` | VARCHAR(64) | Minor usage category | Indexed |
| `usageCategorySubMinor` | VARCHAR(64) | Sub-minor usage category | |
| `usageCategoryDetail` | VARCHAR(64) | Detailed usage category | |
| `ownershipCategory` | VARCHAR(64) | Category of ownership | Indexed |
| `subOwnershipCategory` | VARCHAR(64) | Sub-category of ownership | Indexed |
| `minMarketValue` | FLOAT | Minimum market value for fee applicability | Range criteria |
| `maxMarketValue` | FLOAT | Maximum market value for fee applicability | Range criteria |
| `fixedAmount` | FLOAT | Fixed mutation fee amount | Calculation parameter |
| `rate` | FLOAT | Percentage rate for mutation fee calculation | Calculation parameter |
| `method` | VARCHAR(64) | Calculation method (e.g., FIXED, PERCENTAGE) | Calculation logic |

**Constraints**:
- Primary Key: `(id, tenantid)`

---

### 3. eg_pt_assessment
**Purpose**: Stores property assessment records linking properties to assessment numbers and demand generation.

| Column Name | Data Type | Description | Metadata |
|-------------|-----------|-------------|----------|
| `uuid` | VARCHAR(64) | Unique identifier for assessment record | Primary Key |
| `assessmentNumber` | VARCHAR(64) | Human-readable assessment number | Unique with propertyId & demandId |
| `demandId` | VARCHAR(64) | Reference to demand/bill generation | Unique with propertyId & assessmentNumber |
| `propertyId` | VARCHAR(64) | Reference to property master record | Unique with assessmentNumber & demandId |
| `assessmentYear` | VARCHAR(64) | Financial year of assessment | |
| `tenantId` | VARCHAR(64) | Tenant/ULB identifier | |
| `active` | BOOLEAN | Flag indicating if assessment is currently active | Default: true |
| `createdBy` | VARCHAR(64) | User who created the assessment | Audit field |
| `createdTime` | BIGINT | Timestamp of assessment creation (epoch) | Audit field |
| `lastModifiedBy` | VARCHAR(64) | User who last modified the assessment | Audit field |
| `lastModifiedTime` | BIGINT | Timestamp of last modification (epoch) | Audit field |

**Constraints**:
- Primary Key: `uuid`
- Unique Key: `(propertyId, assessmentNumber, demandId)`

---

## ER Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                    eg_pt_billingslab_v2                        │
├────────────────────────────────────────────────────────────────┤
│ PK  id                        VARCHAR(64)                      │
│ PK  tenantId                  VARCHAR(256)                     │
│     propertyType              VARCHAR(64)                      │
│     propertySubType           VARCHAR(64)                      │
│     usageCategoryMajor        VARCHAR(64)                      │
│     usageCategoryMinor        VARCHAR(64)                      │
│     usageCategorySubMinor     VARCHAR(64)                      │
│     usageCategoryDetail       VARCHAR(64)                      │
│     ownerShipCategory         VARCHAR(64)                      │
│     subOwnerShipCategory      VARCHAR(256)                     │
│     fromFloor                 FLOAT8                           │
│     toFloor                   FLOAT8                           │
│     areaType                  VARCHAR(64)                      │
│     occupancyType             VARCHAR(64)                      │
│     fromPlotSize              DOUBLE PRECISION                 │
│     toPlotSize                FLOAT8                           │
│     unitRate                  NUMERIC(10,2)                    │
│     unBuiltUnitRate           NUMERIC(10,2)                    │
│     arvPercent                NUMERIC(10,2)                    │
│     isPropertyMultiFloored    BOOLEAN                          │
│     createdby                 VARCHAR(64)                      │
│     createdtime               BIGINT                           │
│     lastmodifiedby            VARCHAR(64)                      │
│     lastmodifiedtime          BIGINT                           │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ Used for tax calculation
                              │ (Lookup based on property
                              │  characteristics)
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                      eg_pt_assessment                          │
├────────────────────────────────────────────────────────────────┤
│ PK  uuid                      VARCHAR(64)                      │
│     assessmentNumber          VARCHAR(64)                      │
│     demandId                  VARCHAR(64)                      │
│     propertyId                VARCHAR(64)                      │
│     assessmentYear            VARCHAR(64)                      │
│     tenantId                  VARCHAR(64)                      │
│     active                    BOOLEAN                          │
│     createdBy                 VARCHAR(64)                      │
│     createdTime               BIGINT                           │
│     lastModifiedBy            VARCHAR(64)                      │
│     lastModifiedTime          BIGINT                           │
└────────────────────────────────────────────────────────────────┘
                                │
                                │ 
                                │
                        ┌───────┴───────────────────────────────────────────────────────┐
                        │ Used for mutation                                             │
                        │ fee calculation                                               │
                        │ (Lookup based on                                              │
                        │  property & market value)                                     │
                        │                                                               │
                        ▼                                                               ▼
┌────────────────────────────────────────────────────────────────┐          ┌──────────────────────┐
│                 eg_pt_mutation_billingslab                     │          │   Property Master    │
├────────────────────────────────────────────────────────────────┤          │   (External Table)   │
│ PK  id                        VARCHAR(64)                      │          │                      │
│ PK  tenantid                  VARCHAR(256)                     │          │ PK  propertyId       │
│     propertyType              VARCHAR(64)                      │          │     ...              │
│     propertySubType           VARCHAR(64)                      │          └──────────────────────┘
│     usageCategoryMajor        VARCHAR(64)                      │   
│     usageCategoryMinor        VARCHAR(64)                      │   
│     usageCategorySubMinor     VARCHAR(64)                      │   
│     usageCategoryDetail       VARCHAR(64)                      │   
│     ownershipCategory         VARCHAR(64)                      │   
│     subOwnershipCategory      VARCHAR(64)                      │   
│     minMarketValue            FLOAT                            │   
│     maxMarketValue            FLOAT                            │   
│     fixedAmount               FLOAT                            │   
│     rate                      FLOAT                            │   
│     method                    VARCHAR(64)                      │   
└────────────────────────────────────────────────────────────────┘   
                                                                     