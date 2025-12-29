# Land Services Database Schema Documentation

## Overview
This database schema manages land information, ownership details, addresses, and related entities for the Online Building Plan Approval System. The schema includes core operational tables and corresponding audit tables for tracking historical changes.


## Tables Detail

### 1. eg_land_landInfo
**Purpose**: Master table storing core land information and registration details.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | PRIMARY KEY, UNIQUE | Unique identifier for land record |
| landUid | varchar(64) | | Unique land identifier (business key) |
| landUniqueRegNo | varchar(64) | | Land unique registration number |
| tenantId | varchar(256) | NOT NULL | Tenant/organization identifier for multi-tenancy |
| status | varchar(64) | | Current status of land record (e.g., ACTIVE, INACTIVE) |
| ownershipCategory | varchar(64) | | Category of ownership (e.g., INDIVIDUAL, INSTITUTIONAL) |
| source | varchar(64) | | Source system or origin of the land record |
| channel | varchar(64) | | Channel through which record was created (e.g., WEB, MOBILE) |
| additionalDetails | JSONB | | Flexible JSON field for additional metadata |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Indexes**:
- `land_index` on (id, tenantId, landUid)

---

### 2. eg_land_Address
**Purpose**: Stores complete address information for land parcels.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | UNIQUE | Unique identifier for address record |
| tenantId | varchar(256) | NOT NULL | Tenant identifier |
| doorNo | varchar(64) | | Door/house number |
| plotNo | varchar(64) | | Plot number of the land |
| landmark | varchar(64) | | Nearby landmark for reference |
| city | varchar(64) | | City name |
| district | varchar(64) | | District name |
| region | varchar(64) | | Region/area name |
| state | varchar(64) | | State name |
| country | varchar(64) | | Country name |
| locality | varchar(64) | | Locality/neighborhood identifier |
| pincode | varchar(64) | | Postal/ZIP code |
| additionDetails | varchar(64) | | Additional address details |
| buildingName | varchar(64) | | Name of the building (if applicable) |
| street | varchar(64) | | Street name |
| landInfoId | varchar(64) | FOREIGN KEY | Reference to parent land record |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Relationships**:
- Foreign Key: `landInfoId` → `eg_land_landInfo.id`

---

### 3. eg_land_GeoLocation
**Purpose**: Stores geographic coordinates (latitude/longitude) for precise location mapping.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | | Unique identifier for geolocation record |
| latitude | double precision | | Latitude coordinate |
| longitude | double precision | | Longitude coordinate |
| addressId | varchar(64) | FOREIGN KEY | Reference to parent address record |
| additionalDetails | JSONB | | Additional geolocation metadata in JSON format |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Relationships**:
- Foreign Key: `addressId` → `eg_land_Address.id`

---

### 4. eg_land_ownerInfo
**Purpose**: Stores information about land owners, including ownership percentage and relationship.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | PRIMARY KEY, UNIQUE (with landInfoId) | Unique identifier for owner record |
| uuid | varchar(64) | | UUID of the owner (likely references user table) |
| isprimaryowner | boolean | | Flag indicating if this is the primary owner |
| ownershippercentage | double precision | | Percentage of ownership (for shared ownership) |
| institutionId | varchar(64) | | Reference to institution if owner is institutional |
| additionalDetails | JSONB | | Additional owner details in JSON format |
| landInfoId | varchar(64) | FOREIGN KEY | Reference to parent land record |
| relationship | varchar(64) | | Relationship type (e.g., OWNER, GUARDIAN) |
| status | boolean | DEFAULT TRUE | Status indicating if owner record is active |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Indexes**:
- `land_owner_index` on (id)

**Relationships**:
- Foreign Key: `landInfoId` → `eg_land_landInfo.id`

**Note**: Status column added via migration V20210607162520

---

### 5. eg_land_institution
**Purpose**: Stores institutional ownership details when land is owned by organizations.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | PRIMARY KEY, UNIQUE | Unique identifier for institution record |
| tenantId | varchar(256) | | Tenant identifier |
| type | varchar(64) | | Type of institution (e.g., GOVERNMENT, PRIVATE, NGO) |
| designation | varchar(256) | | Designation of authorized person |
| nameOfAuthorizedPerson | varchar(256) | | Name of the authorized representative |
| additionalDetails | JSONB | | Additional institutional details in JSON |
| landInfoId | varchar(64) | FOREIGN KEY | Reference to parent land record |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Relationships**:
- Foreign Key: `landInfoId` → `eg_land_landInfo.id`

---

### 6. eg_land_document
**Purpose**: Manages document attachments related to land records.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | PRIMARY KEY, UNIQUE (with landInfoId) | Unique identifier for document record |
| documentType | varchar(256) | | Type/category of document (e.g., OWNERSHIP_DEED, SURVEY_MAP) |
| fileStoreId | varchar(256) | | Reference to file storage system |
| documentUid | varchar(256) | | Unique document identifier |
| additionalDetails | JSONB | | Additional document metadata in JSON |
| landInfoId | varchar(64) | FOREIGN KEY | Reference to parent land record |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Relationships**:
- Foreign Key: `landInfoId` → `eg_land_landInfo.id`

---

### 7. eg_land_unit
**Purpose**: Stores unit/property details including usage, occupancy, and floor information.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(64) | PRIMARY KEY, UNIQUE (with landInfoId, tenantId) | Unique identifier for unit record |
| tenantId | varchar(256) | | Tenant identifier |
| floorNo | varchar(64) | | Floor number (for multi-story buildings) |
| unitType | varchar(256) | | Type of unit (e.g., RESIDENTIAL, COMMERCIAL) |
| usageCategory | varchar(64) | | Usage category classification |
| occupancyType | varchar(64) | | Type of occupancy (defaults to 'A' if null) |
| occupancyDate | bigint | | Unix timestamp when occupancy started |
| additionalDetails | JSONB | | Additional unit details in JSON format |
| landInfoId | varchar(64) | FOREIGN KEY | Reference to parent land record |
| createdby | varchar(64) | | User ID who created the record |
| lastmodifiedby | varchar(64) | | User ID who last modified the record |
| createdtime | bigint | | Unix timestamp of record creation |
| lastmodifiedtime | bigint | | Unix timestamp of last modification |

**Relationships**:
- Foreign Key: `landInfoId` → `eg_land_landInfo.id`

---

## Entity Relationship Diagram (ASCII)

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    LAND SERVICES - COMPLETE DATABASE SCHEMA               ║
╚═══════════════════════════════════════════════════════════════════════════╝


                         ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                         ┃  eg_land_landInfo        ┃ ◄── MASTER TABLE
                         ┃  (Primary Key: id)       ┃
                         ┣━━━━━━━━━━━━━━━━━━━━━━━━━━┫
                         ┃ • landUid                ┃
                         ┃ • landUniqueRegNo        ┃
                         ┃ • tenantId               ┃
                         ┃ • status                 ┃
                         ┃ • ownershipCategory      ┃
                         ┗━━━━━━━━━━━━┯━━━━━━━━━━━━━┛
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        │ (1:N)                       │ (1:N)                       │ (1:N)
        ↓                             ↓                             ↓
┏━━━━━━━━━━━━━━━┓           ┏━━━━━━━━━━━━━━━┓           ┏━━━━━━━━━━━━━━━━┓
┃ eg_land_      ┃           ┃ eg_land_      ┃           ┃ eg_land_       ┃
┃ ownerInfo     ┃           ┃ document      ┃           ┃ institution    ┃
┣━━━━━━━━━━━━━━━┫           ┣━━━━━━━━━━━━━━━┫           ┣━━━━━━━━━━━━━━━━┫
┃ PK: id        ┃           ┃ PK: id        ┃           ┃ PK: id         ┃
┃ FK: landInfoId┃           ┃ FK: landInfoId┃           ┃ FK: landInfoId ┃
┃ • uuid        ┃           ┃ • documentType┃           ┃ • type         ┃
┃ • isprimary   ┃           ┃ • fileStoreId ┃           ┃ • designation  ┃
┃ • ownership%  ┃           ┃ • documentUid ┃           ┃ • nameOfAuth   ┃
┃ • status      ┃           ┗━━━━━━━━━━━━━━━┛           ┗━━━━━━━━━━━━━━━━┛
┗━━━━━━━━━━━━━━━┛

        │                             │
        │ (1:N)                       │ (1:N)
        ↓                             ↓
┏━━━━━━━━━━━━━━━┓           ┏━━━━━━━━━━━━━━━━━━━━━━┓
┃ eg_land_unit  ┃           ┃ eg_land_Address      ┃
┣━━━━━━━━━━━━━━━┫           ┣━━━━━━━━━━━━━━━━━━━━━━┫
┃ PK: id        ┃           ┃ PK: id               ┃
┃ FK: landInfoId┃           ┃ FK: landInfoId       ┃
┃ • tenantId    ┃           ┃ • doorNo, plotNo     ┃
┃ • floorNo     ┃           ┃ • street, landmark   ┃
┃ • unitType    ┃           ┃ • city, district     ┃
┃ • usageCategory┃          ┃ • state, country     ┃
┃ • occupancyType┃          ┃ • locality, pincode  ┃
┗━━━━━━━━━━━━━━━┛           ┗━━━━━━━━━┯━━━━━━━━━━━━┛
                                      │
                                      │ (1:N)
                                      ↓
                            ┏━━━━━━━━━━━━━━━━━━━━━┓
                            ┃ eg_land_GeoLocation ┃
                            ┣━━━━━━━━━━━━━━━━━━━━━┫
                            ┃ PK: id              ┃
                            ┃ FK: addressId       ┃
                            ┃ • latitude          ┃
                            ┃ • longitude         ┃
                            ┃ • additionalDetails ┃
                            ┗━━━━━━━━━━━━━━━━━━━━━┛
