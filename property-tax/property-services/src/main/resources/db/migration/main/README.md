# Property Tax Database Schema Documentation

## Overview
This database schema manages property tax information including property details, ownership, assessments, and audit trails. The system supports multi-tenant architecture and tracks complete property lifecycle from creation to assessment.

---

## Table Descriptions

### 1. eg_pt_property
**Purpose**: Core table storing property master data and metadata.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for the property |
| propertyid | VARCHAR(256) | UNIQUE (with tenantid, status) | Human-readable property ID |
| tenantid | VARCHAR(256) | NOT NULL | Tenant/ULB identifier for multi-tenancy |
| surveyid | VARCHAR(256) | | Survey number of the property |
| accountid | VARCHAR(128) | NOT NULL | Account identifier for the property |
| oldpropertyid | VARCHAR(128) | | Previous/legacy property ID for migration |
| status | VARCHAR(128) | NOT NULL | Property status (ACTIVE, INACTIVE, etc.) |
| acknowldgementnumber | VARCHAR(128) | | Acknowledgement number for property registration |
| propertytype | VARCHAR(256) | NOT NULL | Type of property (BUILT_UP, VACANT, etc.) |
| ownershipcategory | VARCHAR(256) | NOT NULL | Ownership category (INDIVIDUAL, INSTITUTIONAL, etc.) |
| usagecategory | VARCHAR(256) | | Usage category (RESIDENTIAL, COMMERCIAL, etc.) |
| creationreason | VARCHAR(256) | | Reason for property creation (NEW, SUBDIVISION, etc.) |
| nooffloors | BIGINT | | Number of floors in the property |
| landarea | NUMERIC(10,2) | | Total land area in square units |
| superbuiltuparea | NUMERIC(10,2) | | Total super built-up area |
| linkedproperties | VARCHAR(2048) | | Comma-separated list of linked property IDs |
| source | VARCHAR(128) | NOT NULL | Source system (MUNICIPAL_RECORDS, etc.) |
| channel | VARCHAR(128) | NOT NULL | Channel of creation (WEB, MOBILE, COUNTER, etc.) |
| createdby | VARCHAR(128) | | User who created the record |
| lastModifiedBy | VARCHAR(128) | | User who last modified the record |
| createdTime | BIGINT | NOT NULL | Creation timestamp (epoch milliseconds) |
| lastModifiedTime | BIGINT | | Last modification timestamp |
| additionaldetails | JSONB | | Additional flexible attributes in JSON format |

**Indexes**: propertyid+tenantid+status, linkedproperties, accountId, tenantid, status, oldpropertyid, acknowldgementnumber, lastmodifiedtime+id

---

### 2. eg_pt_owner
**Purpose**: Stores property owner information linking users to properties.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| ownerinfouuid | VARCHAR(256) | PRIMARY KEY, NOT NULL | Unique identifier for owner record |
| tenantid | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| propertyid | VARCHAR(256) | FOREIGN KEY, NOT NULL | Reference to eg_pt_property.id |
| userid | VARCHAR(128) | UNIQUE (with propertyid), NOT NULL | User ID from user service |
| status | VARCHAR(128) | NOT NULL | Owner status (ACTIVE, INACTIVE) |
| isprimaryowner | BOOLEAN | | Flag indicating primary owner |
| ownertype | VARCHAR(256) | | Type of owner (INDIVIDUAL, COMPANY, etc.) |
| ownershippercentage | VARCHAR(128) | | Percentage of ownership |
| institutionid | VARCHAR(128) | | Reference to institution if applicable |
| relationship | VARCHAR(128) | | Relationship with primary owner |
| createdby | VARCHAR(128) | | User who created the record |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| lastmodifiedby | VARCHAR(128) | | User who last modified the record |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Indexes**: tenantid, propertyid

---

### 3. eg_pt_institution
**Purpose**: Stores institutional owner details for properties owned by organizations.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for institution |
| propertyid | VARCHAR(256) | FOREIGN KEY, NOT NULL | Reference to eg_pt_property.id |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| name | VARCHAR(1024) | NOT NULL | Name of the institution |
| nameofauthorizedperson | VARCHAR(1024) | | Name of authorized person |
| type | VARCHAR(128) | NOT NULL | Type of institution (GOVERNMENT, PRIVATE, NGO, etc.) |
| designation | VARCHAR(128) | | Designation of authorized person |
| createdby | VARCHAR(128) | NOT NULL | User who created the record |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| lastmodifiedby | VARCHAR(128) | | User who last modified the record |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Indexes**: tenantid, propertyid

---

### 4. eg_pt_address
**Purpose**: Stores property address and geolocation information.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(256) | PRIMARY KEY, NOT NULL | Unique identifier for address |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| propertyid | VARCHAR(256) | FOREIGN KEY, NOT NULL | Reference to eg_pt_property.id |
| doorno | VARCHAR(128) | | Door/house number |
| plotno | VARCHAR(256) | | Plot number |
| buildingName | VARCHAR(1024) | | Building name |
| street | VARCHAR(1024) | | Street name |
| landmark | VARCHAR(1024) | | Nearby landmark |
| city | VARCHAR(512) | | City name |
| pincode | VARCHAR(16) | | Postal code |
| locality | VARCHAR(128) | NOT NULL | Locality/area code |
| district | VARCHAR(256) | | District name |
| region | VARCHAR(256) | | Region name |
| state | VARCHAR(256) | | State name |
| country | VARCHAR(512) | | Country name |
| latitude | NUMERIC(9,6) | | Geographical latitude |
| longitude | NUMERIC(10,7) | | Geographical longitude |
| createdby | VARCHAR(128) | | User who created the record |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| lastmodifiedby | VARCHAR(128) | | User who last modified the record |
| lastmodifiedtime | BIGINT | | Last modification timestamp |
| additionaldetails | JSONB | | Additional flexible attributes |

**Indexes**: tenantid, locality, propertyid

---

### 5. eg_pt_unit
**Purpose**: Stores individual unit/floor details within a property.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for unit |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| propertyid | VARCHAR(128) | FOREIGN KEY, NOT NULL | Reference to eg_pt_property.id |
| floorNo | BIGINT | | Floor number |
| unitType | VARCHAR(256) | | Type of unit (ROOM, FLOOR, etc.) |
| usageCategory | VARCHAR(2048) | NOT NULL | Usage category (RESIDENTIAL, COMMERCIAL, etc.) |
| occupancyType | VARCHAR(256) | NOT NULL | Occupancy type (OWNER, TENANT, UNOCCUPIED) |
| occupancyDate | BIGINT | | Date of occupancy |
| carpetArea | NUMERIC(10,2) | | Carpet area in square units |
| builtUpArea | NUMERIC(10,2) | | Built-up area |
| plinthArea | NUMERIC(10,2) | | Plinth area |
| superBuiltUpArea | NUMERIC(10,2) | | Super built-up area |
| arv | NUMERIC(10,2) | | Annual Rental Value |
| constructionType | VARCHAR(1024) | | Type of construction (RCC, BRICK, etc.) |
| constructionDate | BIGINT | | Construction completion date |
| dimensions | JSON | | Unit dimensions in JSON format |
| active | BOOLEAN | | Flag indicating if unit is active |
| createdby | VARCHAR(128) | | User who created the record |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| lastmodifiedby | VARCHAR(128) | | User who last modified the record |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Indexes**: tenantId, propertyid

---

### 6. eg_pt_document
**Purpose**: Stores document attachments related to properties.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for document |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| entityid | VARCHAR(256) | NOT NULL | Entity ID (property/owner/unit) this document belongs to |
| documentType | VARCHAR(128) | | Type of document (OWNERSHIP_PROOF, ID_PROOF, etc.) |
| fileStoreid | VARCHAR(128) | NOT NULL | File store service reference ID |
| documentuid | VARCHAR(128) | | Document unique identifier |
| status | VARCHAR(128) | | Document status (ACTIVE, INACTIVE) |
| createdBy | VARCHAR(128) | NOT NULL | User who created the record |
| lastModifiedBy | VARCHAR(128) | | User who last modified the record |
| createdTime | BIGINT | NOT NULL | Creation timestamp |
| lastModifiedTime | BIGINT | | Last modification timestamp |

**Indexes**: entityid, tenantid

---

### 7. eg_pt_asmt_assessment
**Purpose**: Stores property tax assessment information for each financial year.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(256) | PRIMARY KEY, NOT NULL | Unique identifier for assessment |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| assessmentNumber | VARCHAR(64) | UNIQUE (with tenantId), NOT NULL | Human-readable assessment number |
| financialyear | VARCHAR(256) | NOT NULL | Financial year (e.g., 2023-24) |
| propertyId | VARCHAR(256) | NOT NULL | Reference to property |
| status | VARCHAR(64) | NOT NULL | Assessment status (ACTIVE, CANCELLED, etc.) |
| source | VARCHAR(64) | | Source system |
| channel | VARCHAR(256) | | Channel of creation |
| assessmentDate | BIGINT | NOT NULL | Date of assessment |
| additionalDetails | JSONB | | Additional flexible attributes |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| lastmodifiedby | VARCHAR(64) | | User who last modified the record |
| lastmodifiedtime | BIGINT | NOT NULL | Last modification timestamp |

**Indexes**: assessmentNumber, propertyId, tenantid, financialyear, createdtime+id

---

### 8. eg_pt_asmt_unitusage
**Purpose**: Stores unit-level usage details for tax assessments.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(256) | PRIMARY KEY, NOT NULL | Unique identifier for unit usage |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| assessmentId | VARCHAR(256) | FOREIGN KEY, NOT NULL | Reference to eg_pt_asmt_assessment.id |
| unitId | VARCHAR(64) | NOT NULL | Reference to unit |
| usageCategory | VARCHAR(256) | NOT NULL | Usage category for assessment |
| occupancyType | VARCHAR(64) | NOT NULL | Occupancy type |
| occupancyDate | BIGINT | | Date of occupancy |
| active | BOOLEAN | | Flag indicating if record is active |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| lastmodifiedby | VARCHAR(64) | | User who last modified the record |
| lastmodifiedtime | BIGINT | NOT NULL | Last modification timestamp |

**Indexes**: assessmentid

---

### 9. eg_pt_asmt_document
**Purpose**: Stores document attachments related to assessments.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for document |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| entityid | VARCHAR(128) | FOREIGN KEY, NOT NULL | Reference to eg_pt_asmt_unitusage.id |
| documentType | VARCHAR(128) | | Type of document |
| fileStoreId | VARCHAR(128) | NOT NULL | File store service reference ID |
| documentuid | VARCHAR(128) | | Document unique identifier |
| status | VARCHAR(128) | | Document status |
| createdBy | VARCHAR(128) | NOT NULL | User who created the record |
| lastModifiedBy | VARCHAR(128) | | User who last modified the record |
| createdTime | BIGINT | NOT NULL | Creation timestamp |
| lastModifiedTime | BIGINT | NOT NULL | Last modification timestamp |

**Indexes**: entityid

---

### 10. eg_pt_property_audit
**Purpose**: Audit trail table storing complete property snapshots for history tracking.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| audituuid | VARCHAR(128) | NOT NULL | Unique identifier for audit record |
| propertyid | VARCHAR(128) | NOT NULL | Reference to property |
| property | JSONB | NOT NULL | Complete property object snapshot in JSON |
| auditcreatedtime | BIGINT | NOT NULL | Audit record creation timestamp |

**Indexes**: propertyid

---

### 11. eg_pt_asmt_assessment_audit
**Purpose**: Audit trail for assessment records.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(256) | NOT NULL | Assessment ID |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| assessmentNumber | VARCHAR(64) | NOT NULL | Assessment number |
| financialyear | VARCHAR(256) | NOT NULL | Financial year |
| propertyId | VARCHAR(256) | NOT NULL | Property reference |
| status | VARCHAR(64) | NOT NULL | Status |
| source | VARCHAR(64) | | Source system |
| channel | VARCHAR(256) | | Channel |
| assessmentDate | BIGINT | NOT NULL | Assessment date |
| additionalDetails | JSONB | | Additional details |
| createdby | VARCHAR(64) | NOT NULL | Creator |
| createdtime | BIGINT | NOT NULL | Creation time |
| lastmodifiedby | VARCHAR(64) | NOT NULL | Last modifier |
| lastmodifiedtime | BIGINT | NOT NULL | Last modification time |
| auditcreatedtime | BIGINT | NOT NULL | Audit record creation timestamp |

---

### 12. eg_pt_asmt_unitusage_audit
**Purpose**: Audit trail for unit usage records.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(256) | NOT NULL | Unit usage ID |
| tenantId | VARCHAR(256) | NOT NULL | Tenant/ULB identifier |
| assessmentId | VARCHAR(256) | NOT NULL | Assessment reference |
| unitId | VARCHAR(64) | NOT NULL | Unit reference |
| usageCategory | VARCHAR(256) | NOT NULL | Usage category |
| occupancyType | VARCHAR(64) | NOT NULL | Occupancy type |
| occupancyDate | BIGINT | | Occupancy date |
| active | BOOLEAN | | Active flag |
| createdby | VARCHAR(64) | NOT NULL | Creator |
| createdtime | BIGINT | NOT NULL | Creation time |
| lastmodifiedby | VARCHAR(64) | NOT NULL | Last modifier |
| lastmodifiedtime | BIGINT | NOT NULL | Last modification time |
| auditcreatedtime | BIGINT | NOT NULL | Audit record creation timestamp |

---

### 13. eg_pt_property_migration
**Purpose**: Tracks property data migration batches and progress.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for migration batch |
| batch | BIGINT | NOT NULL | Batch number |
| batchsize | BIGINT | NOT NULL | Size of the batch |
| tenantid | VARCHAR(256) | NOT NULL | Tenant identifier |
| recordCount | BIGINT | NOT NULL | Number of records migrated |
| createdtime | BIGINT | NOT NULL | Creation timestamp |

---

### 14. eg_pt_enc_audit
**Purpose**: Audit trail for data encryption operations.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier |
| batchoffset | BIGINT | NOT NULL | Batch offset for encryption |
| createdtime | BIGINT | NOT NULL | Creation timestamp |
| recordCount | BIGINT | NOT NULL | Number of records encrypted |
| tenantid | VARCHAR(256) | NOT NULL | Tenant identifier |
| message | VARCHAR(2048) | NOT NULL | Encryption message/log |
| encryptiontime | BIGINT | NOT NULL | Time taken for encryption |

---

### 15. eg_pt_id_enc_audit
**Purpose**: Audit trail for property ID encryption operations.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier |
| tenantid | VARCHAR(256) | UNIQUE (with propertyid, acknowldgementnumber), NOT NULL | Tenant identifier |
| propertyid | VARCHAR(256) | | Property ID reference |
| acknowldgementnumber | VARCHAR(128) | | Acknowledgement number |
| createdTime | BIGINT | NOT NULL | Creation timestamp |

---

## Entity Relationship Diagram (ASCII)

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       PROPERTY TAX SYSTEM - COMPLETE ER DIAGRAM               ║
╚═══════════════════════════════════════════════════════════════════════════════╝


┌─────────────────────────────────────────────────────────────────────────────┐
│                         CORE PROPERTY ENTITIES                               │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌───────────────────────────────────┐
                    │       eg_pt_property              │
                    ├───────────────────────────────────┤
                    │ PK  id                 VARCHAR(128)│
                    │     propertyid         VARCHAR(256)│
                    │     tenantid           VARCHAR(256)│
                    │     surveyid           VARCHAR(256)│
                    │     accountid          VARCHAR(128)│
                    │     oldpropertyid      VARCHAR(128)│
                    │     status             VARCHAR(128)│
                    │     acknowldgementnumber VARCHAR(128)│
                    │     propertytype       VARCHAR(256)│
                    │     ownershipcategory  VARCHAR(256)│
                    │     usagecategory      VARCHAR(256)│
                    │     creationreason     VARCHAR(256)│
                    │     nooffloors         BIGINT      │
                    │     landarea           NUMERIC(10,2)│
                    │     superbuiltuparea   NUMERIC(10,2)│
                    │     linkedproperties   VARCHAR(2048)│
                    │     source             VARCHAR(128)│
                    │     channel            VARCHAR(128)│
                    │     createdby          VARCHAR(128)│
                    │     lastModifiedBy     VARCHAR(128)│
                    │     createdTime        BIGINT      │
                    │     lastModifiedTime   BIGINT      │
                    │     additionaldetails  JSONB       │
                    └──────────┬─────────────────────────┘
                               │
             ┌─────────────────┼──────────────────┬──────────────────┐
             │                 │                  │                  │
             │                 │                  │                  │
             │                 │                  │                  │
   ┌─────────▼──────────┐  ┌──▼─────────────┐  ┌▼──────────────────┐  ┌────────▼────────────┐
   │   eg_pt_owner      │  │  eg_pt_unit    │  │  eg_pt_address    │  │ eg_pt_institution   │
   ├────────────────────┤  ├────────────────┤  ├───────────────────┤  ├─────────────────────┤
   │PK ownerinfouuid    │  │PK id           │  │PK id              │  │PK id                │
   │  VARCHAR(256)      │  │  VARCHAR(128)  │  │  VARCHAR(256)     │  │  VARCHAR(128)       │
   │FK propertyid       │  │FK propertyid   │  │FK propertyid      │  │FK propertyid        │
   │  VARCHAR(256)      │  │  VARCHAR(128)  │  │  VARCHAR(256)     │  │  VARCHAR(256)       │
   │  tenantid          │  │  tenantId      │  │  tenantId         │  │  tenantId           │
   │  VARCHAR(256)      │  │  VARCHAR(256)  │  │  VARCHAR(256)     │  │  VARCHAR(256)       │
   │  userid            │  │  floorNo       │  │  doorno           │  │  name               │
   │  VARCHAR(128)      │  │  BIGINT        │  │  VARCHAR(128)     │  │  VARCHAR(1024)      │
   │  status            │  │  unitType      │  │  plotno           │  │  nameofauthorized   │
   │  VARCHAR(128)      │  │  VARCHAR(256)  │  │  VARCHAR(256)     │  │   person            │
   │  isprimaryowner    │  │  usageCategory │  │  buildingName     │  │  VARCHAR(1024)      │
   │  BOOLEAN           │  │  VARCHAR(2048) │  │  VARCHAR(1024)    │  │  type               │
   │  ownertype         │  │  occupancyType │  │  street           │  │  VARCHAR(128)       │
   │  VARCHAR(256)      │  │  VARCHAR(256)  │  │  VARCHAR(1024)    │  │  designation        │
   │  ownershippercentage│ │  occupancyDate │  │  landmark         │  │  VARCHAR(128)       │
   │  VARCHAR(128)      │  │  BIGINT        │  │  VARCHAR(1024)    │  │  createdby          │
   │  institutionid     │  │  carpetArea    │  │  city             │  │  VARCHAR(128)       │
   │  VARCHAR(128)      │  │  NUMERIC(10,2) │  │  VARCHAR(512)     │  │  createdtime        │
   │  relationship      │  │  builtUpArea   │  │  pincode          │  │  BIGINT             │
   │  VARCHAR(128)      │  │  NUMERIC(10,2) │  │  VARCHAR(16)      │  │  lastmodifiedby     │
   │  createdby         │  │  plinthArea    │  │  locality         │  │  VARCHAR(128)       │
   │  VARCHAR(128)      │  │  NUMERIC(10,2) │  │  VARCHAR(128)     │  │  lastmodifiedtime   │
   │  createdtime       │  │  superBuiltUpArea│ │  district         │  │  BIGINT             │
   │  BIGINT            │  │  NUMERIC(10,2) │  │  VARCHAR(256)     │  └─────────────────────┘
   │  lastmodifiedby    │  │  arv           │  │  region           │
   │  VARCHAR(128)      │  │  NUMERIC(10,2) │  │  VARCHAR(256)     │
   │  lastmodifiedtime  │  │  constructionType│ │  state            │
   │  BIGINT            │  │  VARCHAR(1024) │  │  VARCHAR(256)     │
   └────────────────────┘  │  constructionDate│ │  country          │
                           │  BIGINT        │  │  VARCHAR(512)     │
                           │  dimensions    │  │  latitude         │
                           │  JSON          │  │  NUMERIC(9,6)     │
                           │  active        │  │  longitude        │
                           │  BOOLEAN       │  │  NUMERIC(10,7)    │
                           │  createdby     │  │  createdby        │
                           │  VARCHAR(128)  │  │  VARCHAR(128)     │
                           │  createdtime   │  │  createdtime      │
                           │  BIGINT        │  │  BIGINT           │
                           │  lastmodifiedby│  │  lastmodifiedby   │
                           │  VARCHAR(128)  │  │  VARCHAR(128)     │
                           │  lastmodifiedtime│ │  lastmodifiedtime │
                           │  BIGINT        │  │  BIGINT           │
                           └────────────────┘  │  additionaldetails│
                                               │  JSONB            │
                                               └───────────────────┘

                           ┌────────────────────┐
                           │  eg_pt_document    │
                           ├────────────────────┤
                           │PK id               │
                           │  VARCHAR(128)      │
                           │  tenantId          │
                           │  VARCHAR(256)      │
                           │  entityid          │
                           │  VARCHAR(256)      │
                           │  documentType      │
                           │  VARCHAR(128)      │
                           │  fileStoreid       │
                           │  VARCHAR(128)      │
                           │  documentuid       │
                           │  VARCHAR(128)      │
                           │  status            │
                           │  VARCHAR(128)      │
                           │  createdBy         │
                           │  VARCHAR(128)      │
                           │  lastModifiedBy    │
                           │  VARCHAR(128)      │
                           │  createdTime       │
                           │  BIGINT            │
                           │  lastModifiedTime  │
                           │  BIGINT            │
                           └────────────────────┘
                           (Links to property/owner/unit via entityid)


┌─────────────────────────────────────────────────────────────────────────────┐
│                          ASSESSMENT ENTITIES                                 │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌────────────────────────────────┐
                    │  eg_pt_asmt_assessment         │
                    ├────────────────────────────────┤
                    │PK id                VARCHAR(256)│
                    │  tenantId           VARCHAR(256)│
                    │  assessmentNumber   VARCHAR(64) │
                    │  financialyear      VARCHAR(256)│
                    │  propertyId         VARCHAR(256)│ (ref to eg_pt_property)
                    │  status             VARCHAR(64) │
                    │  source             VARCHAR(64) │
                    │  channel            VARCHAR(256)│
                    │  assessmentDate     BIGINT      │
                    │  additionalDetails  JSONB       │
                    │  createdby          VARCHAR(64) │
                    │  createdtime        BIGINT      │
                    │  lastmodifiedby     VARCHAR(64) │
                    │  lastmodifiedtime   BIGINT      │
                    └──────────────┬─────────────────┘
                                   │
                                   │ 1:N
                                   │
                    ┌──────────────▼─────────────────┐
                    │  eg_pt_asmt_unitusage          │
                    ├────────────────────────────────┤
                    │PK id               VARCHAR(256)│
                    │  tenantId          VARCHAR(256)│
                    │FK assessmentId     VARCHAR(256)│
                    │  unitId            VARCHAR(64) │
                    │  usageCategory     VARCHAR(256)│
                    │  occupancyType     VARCHAR(64) │
                    │  occupancyDate     BIGINT      │
                    │  active            BOOLEAN     │
                    │  createdby         VARCHAR(64) │
                    │  createdtime       BIGINT      │
                    │  lastmodifiedby    VARCHAR(64) │
                    │  lastmodifiedtime  BIGINT      │
                    └──────────────┬─────────────────┘
                                   │
                                   │ 1:N
                                   │
                    ┌──────────────▼─────────────────┐
                    │  eg_pt_asmt_document           │
                    ├────────────────────────────────┤
                    │PK id               VARCHAR(128)│
                    │  tenantId          VARCHAR(256)│
                    │FK entityid         VARCHAR(128)│ (ref to unitusage)
                    │  documentType      VARCHAR(128)│
                    │  fileStoreId       VARCHAR(128)│
                    │  documentuid       VARCHAR(128)│
                    │  status            VARCHAR(128)│
                    │  createdBy         VARCHAR(128)│
                    │  lastModifiedBy    VARCHAR(128)│
                    │  createdTime       BIGINT      │
                    │  lastModifiedTime  BIGINT      │
                    └────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              AUDIT TABLES                                    │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌───────────────────────────┐  ┌─────────────────────────────┐  ┌──────────────────────────┐
  │ eg_pt_property_audit      │  │ eg_pt_asmt_assessment_audit │  │ eg_pt_asmt_unitusage     │
  ├───────────────────────────┤  ├─────────────────────────────┤  │         _audit           │
  │ audituuid      VARCHAR(128)│  │ id              VARCHAR(256)│  ├──────────────────────────┤
  │ propertyid     VARCHAR(128)│  │ tenantId        VARCHAR(256)│  │ id          VARCHAR(256) │
  │ property       JSONB       │  │ assessmentNumber VARCHAR(64)│  │ tenantId    VARCHAR(256) │
  │ auditcreatedtime BIGINT    │  │ financialyear   VARCHAR(256)│  │ assessmentId VARCHAR(256)│
  └───────────────────────────┘  │ propertyId      VARCHAR(256)│  │ unitId      VARCHAR(64)  │
                                  │ status          VARCHAR(64) │  │ usageCategory VARCHAR(256)│
                                  │ source          VARCHAR(64) │  │ occupancyType VARCHAR(64)│
                                  │ channel         VARCHAR(256)│  │ occupancyDate BIGINT     │
                                  │ assessmentDate  BIGINT      │  │ active      BOOLEAN      │
                                  │ additionalDetails JSONB     │  │ createdby   VARCHAR(64)  │
                                  │ createdby       VARCHAR(64) │  │ createdtime BIGINT       │
                                  │ createdtime     BIGINT      │  │ lastmodifiedby VARCHAR(64)│
                                  │ lastmodifiedby  VARCHAR(64) │  │ lastmodifiedtime BIGINT  │
                                  │ lastmodifiedtime BIGINT     │  │ auditcreatedtime BIGINT  │
                                  │ auditcreatedtime BIGINT     │  └──────────────────────────┘
                                  └─────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            UTILITY TABLES                                    │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────┐  ┌──────────────────────────┐  ┌───────────────────────────┐
  │ eg_pt_property_migration│  │  eg_pt_enc_audit         │  │  eg_pt_id_enc_audit       │
  ├─────────────────────────┤  ├──────────────────────────┤  ├───────────────────────────┤
  │PK id         VARCHAR(128)│  │PK id         VARCHAR(128)│  │PK id         VARCHAR(128) │
  │  batch       BIGINT      │  │  batchoffset BIGINT      │  │  tenantid    VARCHAR(256) │
  │  batchsize   BIGINT      │  │  createdtime BIGINT      │  │  propertyid  VARCHAR(256) │
  │  tenantid    VARCHAR(256)│  │  recordCount BIGINT      │  │  acknowldgementnumber     │
  │  recordCount BIGINT      │  │  tenantid    VARCHAR(256)│  │              VARCHAR(128) │
  │  createdtime BIGINT      │  │  message     VARCHAR(2048)│ │  createdTime BIGINT       │
  └─────────────────────────┘  │  encryptiontime BIGINT   │  └───────────────────────────┘
                                └──────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                          RELATIONSHIP SUMMARY                                │
└─────────────────────────────────────────────────────────────────────────────┘

FOREIGN KEY RELATIONSHIPS:
  eg_pt_property (1) ──────< eg_pt_owner (N)
                     └─────< eg_pt_unit (N)
                     └─────< eg_pt_address (N)
                     └─────< eg_pt_institution (N)

  eg_pt_asmt_assessment (1) ──────< eg_pt_asmt_unitusage (N)
  eg_pt_asmt_unitusage (1) ───────< eg_pt_asmt_document (N)

REFERENCE RELATIONSHIPS (No FK):
  eg_pt_asmt_assessment.propertyId ────> eg_pt_property.id
  eg_pt_document.entityid ─────────────> property/owner/unit (varies)


LEGEND:
═══════════════════════════════════════════════════════════════════════════════
PK  = Primary Key
FK  = Foreign Key
──< = One-to-Many Relationship (Foreign Key)
───> = Reference Relationship (No FK Constraint)
(N) = Many side of relationship
(1) = One side of relationship
═══════════════════════════════════════════════════════════════════════════════
```

---

## Relationship Summary

### Primary Relationships

1. **Property → Owners** (1:N)
   - One property can have multiple owners
   - FK: eg_pt_owner.propertyid → eg_pt_property.id

2. **Property → Units** (1:N)
   - One property can have multiple units/floors
   - FK: eg_pt_unit.propertyid → eg_pt_property.id

3. **Property → Address** (1:N)
   - One property can have multiple addresses
   - FK: eg_pt_address.propertyid → eg_pt_property.id

4. **Property → Institution** (1:N)
   - One property can be linked to multiple institutions
   - FK: eg_pt_institution.propertyid → eg_pt_property.id

5. **Assessment → Unit Usage** (1:N)
   - One assessment can have multiple unit usage entries
   - FK: eg_pt_asmt_unitusage.assessmentId → eg_pt_asmt_assessment.id

6. **Unit Usage → Assessment Documents** (1:N)
   - One unit usage record can have multiple documents
   - FK: eg_pt_asmt_document.entityid → eg_pt_asmt_unitusage.id

### Reference Relationships (No FK Constraint)

1. **Assessment → Property** (N:1)
   - Many assessments reference one property
   - Ref: eg_pt_asmt_assessment.propertyId → eg_pt_property.id

2. **Document → Entity** (N:1)
   - Documents can be linked to various entities (property, owner, unit)
   - Ref: eg_pt_document.entityid → various tables

---

