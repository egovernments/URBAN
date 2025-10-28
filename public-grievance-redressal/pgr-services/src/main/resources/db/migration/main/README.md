# PGR Services Database Schema Documentation

## Overview
This database schema supports the Public Grievance Redressal (PGR) system, managing citizen complaints and service requests with their associated address information.

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      eg_pgr_service_v2                          │
│                    (Service Requests)                            │
├─────────────────────────────────────────────────────────────────┤
│ PK: tenantId, serviceRequestId                                  │
│ UK: id                                                           │
├─────────────────────────────────────────────────────────────────┤
│ • id (VARCHAR(64))                                              │
│ • tenantId (VARCHAR(256))                                       │
│ • serviceCode (VARCHAR(256)) [NOT NULL]                         │
│ • serviceRequestId (VARCHAR(256))                               │
│ • description (VARCHAR(4000))                                   │
│ • accountId (VARCHAR(256))                                      │
│ • additionalDetails (JSONB)                                     │
│ • applicationStatus (VARCHAR(128))                              │
│ • rating (SMALLINT)                                             │
│ • source (VARCHAR(256))                                         │
│ • active (BOOLEAN) [DEFAULT TRUE]                               │
│ • createdby (VARCHAR(256)) [NOT NULL]                           │
│ • createdtime (BIGINT) [NOT NULL]                               │
│ • lastmodifiedby (VARCHAR(256))                                 │
│ • lastmodifiedtime (BIGINT)                                     │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ 1
                   │
                   │ has
                   │
                   │ *
                   │
┌──────────────────┴──────────────────────────────────────────────┐
│                    eg_pgr_address_v2                            │
│                   (Address Information)                          │
├─────────────────────────────────────────────────────────────────┤
│ PK: id                                                           │
│ FK: parentid → eg_pgr_service_v2(id)                            │
├─────────────────────────────────────────────────────────────────┤
│ • id (VARCHAR(256)) [NOT NULL]                                  │
│ • tenantId (VARCHAR(256)) [NOT NULL]                            │
│ • parentid (VARCHAR(256)) [NOT NULL, FK]                        │
│ • doorno (VARCHAR(128))                                         │
│ • plotno (VARCHAR(256))                                         │
│ • buildingName (VARCHAR(1024))                                  │
│ • street (VARCHAR(1024))                                        │
│ • landmark (VARCHAR(1024))                                      │
│ • city (VARCHAR(512))                                           │
│ • pincode (VARCHAR(16))                                         │
│ • locality (VARCHAR(128)) [NOT NULL]                            │
│ • district (VARCHAR(256))                                       │
│ • region (VARCHAR(256))                                         │
│ • state (VARCHAR(256))                                          │
│ • country (VARCHAR(512))                                        │
│ • latitude (NUMERIC(9,6))                                       │
│ • longitude (NUMERIC(10,7))                                     │
│ • additionaldetails (JSONB)                                     │
│ • createdby (VARCHAR(128)) [NOT NULL]                           │
│ • createdtime (BIGINT) [NOT NULL]                               │
│ • lastmodifiedby (VARCHAR(128))                                 │
│ • lastmodifiedtime (BIGINT)                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Relationship:**
- One service request can have multiple addresses (1:N relationship)
- Foreign Key: `eg_pgr_address_v2.parentid` references `eg_pgr_service_v2.id`

---

## Tables Documentation

### 1. eg_pgr_service_v2

**Purpose:** Stores citizen grievances and service requests in the public grievance redressal system.

**Primary Key:** Composite key of (tenantId, serviceRequestId)
**Unique Key:** id

#### Columns

| Column Name | Data Type | Nullable | Description |
|------------|-----------|----------|-------------|
| `id` | VARCHAR(64) | No | Unique identifier for the service request (UUID) |
| `tenantId` | VARCHAR(256) | No | Tenant/city identifier for multi-tenancy support |
| `serviceCode` | VARCHAR(256) | No | Code identifying the type of service/grievance (e.g., "WATER_COMPLAINT", "ROAD_REPAIR") |
| `serviceRequestId` | VARCHAR(256) | No | Human-readable service request number for citizen reference |
| `description` | VARCHAR(4000) | Yes | Detailed description of the grievance or service request provided by the citizen |
| `accountId` | VARCHAR(256) | Yes | Reference to the citizen's account who filed the complaint |
| `additionalDetails` | JSONB | Yes | Flexible JSON field for storing additional metadata, custom fields, or extended attributes |
| `applicationStatus` | VARCHAR(128) | Yes | Current status of the grievance (e.g., "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED") |
| `rating` | SMALLINT | Yes | Citizen satisfaction rating (typically 1-5 scale) for resolved complaints |
| `source` | VARCHAR(256) | Yes | Channel through which the complaint was received (e.g., "WEB", "MOBILE_APP", "CALL_CENTER") |
| `active` | BOOLEAN | Yes | Soft delete flag - indicates if the record is active (default: TRUE) |
| `createdby` | VARCHAR(256) | No | User ID of the person who created the record |
| `createdtime` | BIGINT | No | Timestamp (epoch milliseconds) when the record was created |
| `lastmodifiedby` | VARCHAR(256) | Yes | User ID of the person who last modified the record |
| `lastmodifiedtime` | BIGINT | Yes | Timestamp (epoch milliseconds) when the record was last modified |

#### Indexes

- **index_eg_pgr_service_v2_tenantId_serviceRequestId**: Composite index on (tenantId, serviceRequestId) for fast lookups by service request
- **index_eg_pgr_service_v2_id**: Index on id for UUID-based queries
- **index_eg_pgr_service_v2_applicationStatus**: Index on applicationStatus for filtering by status
- **index_eg_pgr_service_v2_serviceCode**: Index on serviceCode for grouping by service type
- **index_eg_pgr_service_v2_accountId**: Index on accountId for citizen-specific queries

---

### 2. eg_pgr_address_v2

**Purpose:** Stores detailed address information for each grievance/service request location.

**Primary Key:** id
**Foreign Key:** parentid references eg_pgr_service_v2(id)

#### Columns

| Column Name | Data Type | Nullable | Description |
|------------|-----------|----------|-------------|
| `id` | VARCHAR(256) | No | Unique identifier for the address record (UUID) |
| `tenantId` | VARCHAR(256) | No | Tenant/city identifier for multi-tenancy support |
| `parentid` | VARCHAR(256) | No | Foreign key reference to the service request (eg_pgr_service_v2.id) |
| `doorno` | VARCHAR(128) | Yes | Door number or house number of the address |
| `plotno` | VARCHAR(256) | Yes | Plot number for the property |
| `buildingName` | VARCHAR(1024) | Yes | Name of the building or complex |
| `street` | VARCHAR(1024) | Yes | Street name or road name |
| `landmark` | VARCHAR(1024) | Yes | Nearby landmark for easier location identification |
| `city` | VARCHAR(512) | Yes | City name |
| `pincode` | VARCHAR(16) | Yes | Postal/ZIP code |
| `locality` | VARCHAR(128) | No | Locality or neighborhood name (mandatory for geographic organization) |
| `district` | VARCHAR(256) | Yes | District name |
| `region` | VARCHAR(256) | Yes | Region or zone name |
| `state` | VARCHAR(256) | Yes | State or province name |
| `country` | VARCHAR(512) | Yes | Country name |
| `latitude` | NUMERIC(9,6) | Yes | Geographic latitude coordinate (for mapping and location services) |
| `longitude` | NUMERIC(10,7) | Yes | Geographic longitude coordinate (for mapping and location services) |
| `additionaldetails` | JSONB | Yes | Flexible JSON field for storing additional address metadata or custom fields |
| `createdby` | VARCHAR(128) | No | User ID of the person who created the record |
| `createdtime` | BIGINT | No | Timestamp (epoch milliseconds) when the record was created |
| `lastmodifiedby` | VARCHAR(128) | Yes | User ID of the person who last modified the record |
| `lastmodifiedtime` | BIGINT | Yes | Timestamp (epoch milliseconds) when the record was last modified |

#### Indexes

- **index_eg_pgr_address_v2_locality**: Index on locality for geographic filtering and reporting
