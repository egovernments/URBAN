# Property Tax Database Schema Documentation

## Overview
This database schema manages property tax information including property details, owners, addresses, units, documents, and audit trails for the eGovernance Property Tax system.


---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                  PROPERTY TAX SYSTEM SCHEMA                      │
└─────────────────────────────────────────────────────────────────┘

                ┌───────────────────────────────────────┐
                │  eg_pt_property_v2                    │
                ├───────────────────────────────────────┤
                │ PK  PropertyId          varchar(64)   │
                │ PK  tenantId            varchar(256)  │
                │     acknowldgementNumber varchar(64)  │
                │     status              varchar(64)   │
                │     oldPropertyId       varchar(256)  │
                │     creationReason      varchar(256)  │
                │     occupancyDate       bigint        │
                │     additionalDetails   JSONB         │
                │     createdby           varchar(64)   │
                │     createdtime         bigint        │
                │     lastmodifiedby      varchar(64)   │
                │     lastmodifiedtime    bigint        │
                └─────────────┬─────────────────────────┘
                              │
              ┌───────────────┴──────────────┐
              │                              │
              ▼                              ▼
┌──────────────────────────┐   ┌─────────────────────────────────┐
│  eg_pt_address_v2        │   │ eg_pt_propertydetail_v2         │
├──────────────────────────┤   ├─────────────────────────────────┤
│ PK  id      varchar(64)  │   │ PK  assessmentNumber varchar(64)│
│ PK  property varchar(64) │   │ FK  property         varchar(64)│
│ FK  property             │   │     tenantId         varchar(256│
│     tenantId varchar(256)│   │     source           varchar(64)│
│     latitude numeric(9,6)│   │     usage            varchar(64)│
│     longitude numeric(10)│   │     noOfFloors       bigint     │
│     addressid varchar(64)│   │     disclaimeragreed boolean    │
│     addressnumber var(64)│   │     landArea         numeric    │
│     doorNo    varchar(64)│   │     buildUpArea      numeric    │
│     type      varchar(64)│   │     propertyType     varchar(64)│
│     addressline1  var(1K)│   │     propertySubType  varchar(64)│
│     addressline2  var(1K)│   │     usageCategoryMajor var(64)  │
│     landmark  varchar(1K)│   │     usageCategoryMinor var(64)  │
│     city      varchar(1K)│   │     financialYear    varchar(64)│
│     pincode   varchar(6) │   │     assessmentDate   bigint     │
│     detail    varchar(2K)│   │     ownershipCategory var(64)   │
│     buildingName var(1K) │   │     subOwnershipCategory v(64)  │
│     street    varchar(1K)│   │     adhocExemption   numeric(12)│
│     locality  varchar(64)│   │     adhocPenalty     numeric(12)│
│     additionaldetails JB │   │     adhocExemptionReason v(1K)  │
│     createdby varchar(64)│   │     adhocPenaltyReason var(1K)  │
│     createdtime bigint   │   │     accountId        varchar(64)│
│     lastmodifiedby v(64) │   │     channel          varchar(64)│
│     lastmodifiedtime big │   │     status           varchar(64)│
└──────────────────────────┘   │     additionaldetails JSONB     │
                               │     createdby        varchar(64)│
                               │     createdtime      bigint     │
                               │     lastmodifiedby   varchar(64)│
                               │     lastmodifiedtime bigint     │
                               └──────┬──────────────────────────┘
                                      │
          ┌───────────────────────────┼──────────────────────────────────────────────────────┬────────────────────────────────┐
          │                           │                                                      │                                │
          ▼                           ▼                                                      ▼                                ▼
┌──────────────────────┐  ┌────────────────────────────────────────┐ ┌────────────────────────────────────────┐ ┌────────────────────────────────────────┐
│ eg_pt_owner_v2       │  │ eg_pt_unit_v2                          │ │ eg_pt_institution_v2                   │ │ eg_pt_document_propertydetail_v2       │
├──────────────────────┤  ├────────────────────────────────────────┤ ├────────────────────────────────────────┤ ├────────────────────────────────────────┤
│ PK userid     var(64)│  │ PK  id               varchar(64)       │ │ PK  id            varchar(64)          │ │ PK  id            varchar(64)          │
│ PK propertydet v(64) │  │ FK  propertydetail   varchar(64)       │ │ FK  propertydetail varchar(64)         │ │ FK  propertydetail varchar(64)         │
│ FK propertydetail    │  │     tenantId         varchar(256)      │ │     tenantId      varchar(256)         │ │     tenantId      varchar(256)         │
│    tenantId   var(256│  │     floorNo          varchar(64)       │ │     name          varchar(64)          │ │     documenttype  varchar(64)          │
│    isactive   boolean│  │     unitType         varchar(64)       │ │     type          varchar(64)          │ │     filestore     varchar(64)          │
│    isprimaryowner boo│  │     unitArea         numeric           │ │     designation   varchar(64)          │ │     isactive      boolean              │
│    ownertype  var(64)│  │     usageCategoryMajor varchar(64)     │ │     additionaldetails JSONB            │ │     documentuid   varchar(64)          │
│    ownershipperc v(64│  │     usageCategoryMinor varchar(64)     │ │     createdby     varchar(64)          │ │     createdby     varchar(64)          │
│    institutionId v(64│  │     usageCategorySubMinor varchar(64)  │ │     createdtime   bigint               │ │     createdtime   bigint               │
│    relationship v(64)│  │     usageCategoryDetail varchar(64)    │ │     lastmodifiedby varchar(64)         │ │     lastmodifiedby varchar(64)         │
│    additionaldeta JB │  │     occupancyType    varchar(64)       │ │     lastmodifiedtime bigint            │ │     lastmodifiedtime bigint            │
│    createdby  var(64)│  │     occupancyDate    bigint            │ └────────────────────────────────────────┘ └────────────────────────────────────────┘
│    createdtime bigint│  │     constructionType varchar(64)       │
│    lastmodifiedby v64│  │     constructionSubType varchar(64)    │
│    lastmodifiedt big │  │     arv              numeric(12,2)     │
└─────┬────────────────┘  │     additionaldetails JSONB            │
      │                   │     createdby        varchar(64)       │
      │                   │     createdtime      bigint            │
      ▼                   │     lastmodifiedby   varchar(64)       │
┌──────────────────────┐  │     lastmodifiedtime bigint            │
│eg_pt_document_owner  │  └────────────────────────────────────────┘
│_v2                   │
├──────────────────────┤  
│ PK id        var(64) │  
│ FK userid    var(128)│  
│ FK propertydet v(64) │  
│ UK userid,propertydet│  
│    tenantId  var(256)│  
│    documenttype v(64)│  
│    filestore var(64) │  
│    documentuid v(64) │  
│    isactive  boolean │  
│    createdby var(64) │  
│    createdtime big   │  
│    lastmodifiedby v64│  
│    lastmodifiedt big │  
└──────────────────────┘  


STANDALONE TABLES:
─────────────────────────────────────────────────────────────────
┌──────────────────────────┐  ┌─────────────────────────────────┐
│ eg_pt_drafts_v2          │  │ eg_pt_property_audit_v2         │
├──────────────────────────┤  ├─────────────────────────────────┤
│ PK id          var(64)   │  │    PropertyId      varchar(64)  │
│ PK tenantId    var(256)  │  │    tenantId        varchar(256) │
│ UK id                    │  │    acknowldgementNumber var(64) │
│    userId      var(64)   │  │    status          varchar(64)  │
│    draft       JSONB     │  │    oldPropertyId   varchar(256) │
│    isActive    boolean   │  │    creationReason  varchar(256) │
│    assessmentNumber v(64)│  │    occupancyDate   bigint       │
│    createdby   var(64)   │  │    additionalDetails JSONB      │
│    createdtime bigint    │  │    createdby       varchar(64)  │
│    lastmodifiedby v(64)  │  │    createdtime     bigint       │
│    lastmodifiedtime big  │  │    lastmodifiedby  varchar(64)  │
└──────────────────────────┘  │    lastmodifiedtime bigint      │
                              └─────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ eg_pt_address_audit_v2                                       │
├──────────────────────────────────────────────────────────────┤
│    id                varchar(64)                             │
│    property          varchar(64)                             │
│    tenantId          varchar(256)                            │
│    latitude          numeric(9,6)                            │
│    longitude         numeric(10,7)                           │
│    addressid         varchar(64)                             │
│    addressnumber     varchar(64)                             │
│    doorNo            varchar(64)                             │
│    type              varchar(64)                             │
│    addressline1      varchar(1024)                           │
│    addressline2      varchar(1024)                           │
│    landmark          varchar(1024)                           │
│    city              varchar(1024)                           │
│    pincode           varchar(6)                              │
│    detail            varchar(2048)                           │
│    buildingName      varchar(1024)                           │
│    street            varchar(1024)                           │
│    locality          varchar(64)                             │
│    additionaldetails JSONB                                   │
│    createdby         varchar(64)                             │
│    createdtime       bigint                                  │
│    lastmodifiedby    varchar(64)                             │
│    lastmodifiedtime  bigint                                  │
└──────────────────────────────────────────────────────────────┘

LEGEND: PK=Primary Key | FK=Foreign Key | UK=Unique | 1K=1024
```

---

---

## Table Definitions

### 1. eg_pt_property_v2 (Core Property Table)

**Purpose**: Stores the core property information and acts as the master table for all property-related entities.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| PropertyId          | varchar(64)       | Unique identifier for the property (system generated)                 | PK, Unique  |
| tenantId            | varchar(256)      | Tenant/ULB identifier for multi-tenancy support                       | PK          |
| acknowldgementNumber| varchar(64)       | Acknowledgement number for property registration                      |             |
| status              | varchar(64)       | Current status of property (e.g., ACTIVE, INACTIVE, PENDING)          | Indexed     |
| oldPropertyId       | varchar(256)      | Legacy property ID from old system (for migration purposes)           |             |
| creationReason      | varchar(256)      | Reason for property creation (e.g., NEW, SUBDIVISION, MUTATION)       |             |
| occupancyDate       | bigint            | Date when property was first occupied (epoch timestamp)               |             |
| additionalDetails   | JSONB             | Flexible JSON field for storing additional custom attributes          |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               | Indexed     |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

**Indexes**:
- idx_eg_pt_property_v2_propertyid (PropertyId, tenantId)
- idx_eg_pt_property_v2_tenantid (tenantId)
- idx_eg_pt_property_v2_status (status)
- idx_eg_pt_property_v2_createdtime (createdtime)

---

### 2. eg_pt_propertydetail_v2 (Property Assessment Details)

**Purpose**: Stores property assessment details including financial year, property type, usage, and tax calculation parameters.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| assessmentNumber    | varchar(64)       | Unique assessment number for property tax assessment                  | PK, Unique  |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| property            | varchar(64)       | Reference to property ID                                              | FK to eg_pt_property_v2.PropertyId |
| source              | varchar(64)       | Source of property data (e.g., MUNICIPAL_RECORDS, SURVEY)             |             |
| usage               | varchar(64)       | Property usage type                                                   |             |
| noOfFloors          | bigint            | Total number of floors in the property                                |             |
| disclaimeragreed    | boolean           | Whether disclaimer was agreed during assessment                       |             |
| landArea            | numeric           | Total land area in sq. meters                                         |             |
| buildUpArea         | numeric           | Total built-up area in sq. meters                                     |             |
| propertyType        | varchar(64)       | Type of property (e.g., RESIDENTIAL, COMMERCIAL, INDUSTRIAL)          |             |
| propertySubType     | varchar(64)       | Sub-type of property for detailed classification                      |             |
| usageCategoryMajor  | varchar(64)       | Major usage category                                                  |             |
| usageCategoryMinor  | varchar(64)       | Minor usage category for granular classification                      |             |
| financialYear       | varchar(64)       | Financial year for the assessment (e.g., 2023-24)                     | Indexed     |
| assessmentDate      | bigint            | Date of property assessment (epoch timestamp)                         |             |
| ownershipCategory   | varchar(64)       | Category of ownership (e.g., INDIVIDUAL, INSTITUTIONAL)               |             |
| subOwnershipCategory| varchar(64)       | Sub-category of ownership                                             |             |
| adhocExemption      | numeric(12,2)     | Ad-hoc exemption amount granted                                       |             |
| adhocPenalty        | numeric(12,2)     | Ad-hoc penalty amount imposed                                         |             |
| adhocExemptionReason| varchar(1024)     | Reason for granting ad-hoc exemption                                  |             |
| adhocPenaltyReason  | varchar(1024)     | Reason for imposing ad-hoc penalty                                    |             |
| accountId           | varchar(64)       | Associated account ID for billing                                     | Indexed     |
| channel             | varchar(64)       | Channel through which assessment was done (e.g., WEB, MOBILE, COUNTER)|             |
| status              | varchar(64)       | Assessment status (default: ACTIVE)                                   |             |
| additionaldetails   | JSONB             | Flexible JSON field for additional custom data                        |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

**Indexes**:
- idx_eg_pt_propertydetail_v2_financialyear (financialYear)
- idx_eg_pt_propertydetail_v2_accountId (accountId)

---

### 3. eg_pt_owner_v2 (Property Owners)

**Purpose**: Stores information about property owners including ownership percentage and relationship to property.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| userid              | varchar(64)       | User ID of the property owner                                         | PK          |
| propertydetail      | varchar(64)       | Assessment number reference                                           | PK, FK to eg_pt_propertydetail_v2.assessmentNumber |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| isactive            | boolean           | Whether the owner is currently active                                 |             |
| isprimaryowner      | boolean           | Whether this is the primary owner                                     |             |
| ownertype           | varchar(64)       | Type of owner (e.g., INDIVIDUAL, COMPANY, TRUST)                      |             |
| ownershippercentage | varchar(64)       | Percentage of ownership                                               |             |
| institutionId       | varchar(64)       | Institution ID if owner is an institution                             |             |
| relationship        | varchar(64)       | Relationship to primary owner (e.g., FATHER, MOTHER, SPOUSE)          |             |
| additionaldetails   | JSONB             | Flexible JSON field for additional owner information                  |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

---

### 4. eg_pt_address_v2 (Property Address)

**Purpose**: Stores complete address information with geolocation for each property.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                  | varchar(64)       | Unique identifier for the address                                     | PK          |
| property            | varchar(64)       | Reference to property ID                                              | PK, FK to eg_pt_property_v2.PropertyId |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| latitude            | numeric(9,6)      | Geographical latitude coordinate                                      |             |
| longitude           | numeric(10,7)     | Geographical longitude coordinate                                     |             |
| addressid           | varchar(64)       | External address system ID                                            |             |
| addressnumber       | varchar(64)       | Address number                                                        |             |
| doorNo              | varchar(64)       | Door/House number                                                     |             |
| type                | varchar(64)       | Type of address (e.g., RESIDENTIAL, CORRESPONDENCE)                   |             |
| addressline1        | varchar(1024)     | Address line 1                                                        |             |
| addressline2        | varchar(1024)     | Address line 2                                                        |             |
| landmark            | varchar(1024)     | Nearby landmark for easy identification                               |             |
| city                | varchar(1024)     | City name                                                             |             |
| pincode             | varchar(6)        | Postal code (6 digits)                                                |             |
| detail              | varchar(2048)     | Additional address details                                            |             |
| buildingName        | varchar(1024)     | Building/complex name                                                 |             |
| street              | varchar(1024)     | Street name                                                           |             |
| locality            | varchar(64)       | Locality/area code                                                    | Indexed     |
| additionaldetails   | JSONB             | Flexible JSON field for additional address data                       |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

**Indexes**:
- idx_eg_pt_address_v2_locality (locality)

---

### 5. eg_pt_unit_v2 (Property Units/Floors)

**Purpose**: Stores individual unit/floor details within a property for granular tax calculation.

| Column Name            | Data Type         | Description                                                          | Constraints |
|-----------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                    | varchar(64)       | Unique identifier for the unit                                        | PK          |
| propertydetail        | varchar(64)       | Assessment number reference                                           | FK to eg_pt_propertydetail_v2.assessmentNumber |
| tenantId              | varchar(256)      | Tenant/ULB identifier                                                 |             |
| floorNo               | varchar(64)       | Floor number (e.g., G, 1, 2, BASEMENT)                                |             |
| unitType              | varchar(64)       | Type of unit (e.g., RESIDENTIAL, COMMERCIAL)                          |             |
| unitArea              | numeric           | Area of the unit in sq. meters                                        |             |
| usageCategoryMajor    | varchar(64)       | Major usage category for the unit                                     | Indexed     |
| usageCategoryMinor    | varchar(64)       | Minor usage category                                                  |             |
| usageCategorySubMinor | varchar(64)       | Sub-minor usage category                                              |             |
| usageCategoryDetail   | varchar(64)       | Detailed usage category                                               |             |
| occupancyType         | varchar(64)       | Type of occupancy (e.g., OWNER, TENANT, VACANT)                       |             |
| occupancyDate         | bigint            | Date of occupancy (epoch timestamp)                                   |             |
| constructionType      | varchar(64)       | Type of construction (e.g., RCC, LOAD_BEARING)                        |             |
| constructionSubType   | varchar(64)       | Sub-type of construction                                              |             |
| arv                   | numeric(12,2)     | Annual Rental Value for tax calculation                               |             |
| additionaldetails     | JSONB             | Flexible JSON field for additional unit data                          |             |
| createdby             | varchar(64)       | User ID who created the record                                        |             |
| createdtime           | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby        | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime      | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

**Indexes**:
- idx_eg_pt_unit_v2_usagecategorymajor (usagecategorymajor)

---

### 6. eg_pt_institution_v2 (Institutional Ownership)

**Purpose**: Stores details of institutional owners (e.g., government departments, companies, trusts).

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                  | varchar(64)       | Unique identifier for the institution                                 | PK          |
| propertydetail      | varchar(64)       | Assessment number reference                                           | FK to eg_pt_propertydetail_v2.assessmentNumber |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| name                | varchar(64)       | Name of the institution                                               |             |
| type                | varchar(64)       | Type of institution (e.g., GOVERNMENT, PRIVATE, NGO, TRUST)           |             |
| designation         | varchar(64)       | Designation of the institutional representative                       |             |
| additionaldetails   | JSONB             | Flexible JSON field for additional institution data                   |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

---

### 7. eg_pt_document_propertydetail_v2 (Property Documents)

**Purpose**: Stores documents attached to property assessments (e.g., ownership proof, tax receipts).

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                  | varchar(64)       | Unique identifier for the document                                    | PK          |
| propertydetail      | varchar(64)       | Assessment number reference                                           | FK to eg_pt_propertydetail_v2.assessmentNumber |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| documenttype        | varchar(64)       | Type of document (e.g., OWNERSHIP_PROOF, TAX_RECEIPT)                 |             |
| filestore           | varchar(64)       | File store ID/reference for the uploaded document                     |             |
| documentuid         | varchar(64)       | Unique document identifier                                            |             |
| isactive            | boolean           | Whether the document is currently active                              |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

---

### 8. eg_pt_document_owner_v2 (Owner Documents)

**Purpose**: Stores documents specific to property owners (e.g., ID proof, address proof).

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                  | varchar(64)       | Unique identifier for the document                                    | PK          |
| userid              | varchar(128)      | User ID of the owner                                                  | Unique (with propertydetail), FK composite |
| propertydetail      | varchar(64)       | Assessment number reference                                           | Unique (with userid), FK composite |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| documenttype        | varchar(64)       | Type of document (e.g., ID_PROOF, ADDRESS_PROOF, PHOTO)               |             |
| filestore           | varchar(64)       | File store ID/reference for the uploaded document                     |             |
| documentuid         | varchar(64)       | Unique document identifier                                            |             |
| isactive            | boolean           | Whether the document is currently active                              |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

---

### 9. eg_pt_drafts_v2 (Draft Property Submissions)

**Purpose**: Stores incomplete/draft property submissions for later completion.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                  | varchar(64)       | Unique identifier for the draft                                       | PK, Unique  |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 | PK          |
| userId              | varchar(64)       | User ID who created the draft                                         |             |
| draft               | JSONB             | Complete draft data stored as JSON                                    |             |
| isActive            | boolean           | Whether the draft is still active/valid                               |             |
| assessmentNumber    | varchar(64)       | Assessment number if partially generated                              |             |
| createdby           | varchar(64)       | User ID who created the record                                        |             |
| createdtime         | bigint            | Creation timestamp (epoch milliseconds)                               |             |
| lastmodifiedby      | varchar(64)       | User ID who last modified the record                                  |             |
| lastmodifiedtime    | bigint            | Last modification timestamp (epoch milliseconds)                      |             |

---

### 10. eg_pt_property_audit_v2 (Property Audit Trail)

**Purpose**: Maintains complete audit history of all changes to property records.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| PropertyId          | varchar(64)       | Property ID being audited                                             |             |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| acknowldgementNumber| varchar(64)       | Acknowledgement number                                                |             |
| status              | varchar(64)       | Status at the time of audit                                           |             |
| oldPropertyId       | varchar(256)      | Legacy property ID                                                    |             |
| creationReason      | varchar(256)      | Reason for creation                                                   |             |
| occupancyDate       | bigint            | Occupancy date                                                        |             |
| additionalDetails   | JSONB             | Additional details at time of audit                                   |             |
| createdby           | varchar(64)       | User ID who created the original record                               |             |
| createdtime         | bigint            | Original creation timestamp                                           |             |
| lastmodifiedby      | varchar(64)       | User ID who made the change being audited                             |             |
| lastmodifiedtime    | bigint            | Timestamp of the change being audited                                 |             |

---

### 11. eg_pt_address_audit_v2 (Address Audit Trail)

**Purpose**: Maintains complete audit history of all changes to address records.

| Column Name          | Data Type         | Description                                                          | Constraints |
|---------------------|-------------------|----------------------------------------------------------------------|-------------|
| id                  | varchar(64)       | Address ID being audited                                              |             |
| property            | varchar(64)       | Property ID reference                                                 |             |
| tenantId            | varchar(256)      | Tenant/ULB identifier                                                 |             |
| latitude            | numeric(9,6)      | Latitude at time of audit                                             |             |
| longitude           | numeric(10,7)     | Longitude at time of audit                                            |             |
| addressid           | varchar(64)       | Address ID                                                            |             |
| addressnumber       | varchar(64)       | Address number                                                        |             |
| doorNo              | varchar(64)       | Door number                                                           |             |
| type                | varchar(64)       | Address type                                                          |             |
| addressline1        | varchar(1024)     | Address line 1                                                        |             |
| addressline2        | varchar(1024)     | Address line 2                                                        |             |
| landmark            | varchar(1024)     | Landmark                                                              |             |
| city                | varchar(1024)     | City                                                                  |             |
| pincode             | varchar(6)        | Pincode                                                               |             |
| detail              | varchar(2048)     | Additional details                                                    |             |
| buildingName        | varchar(1024)     | Building name                                                         |             |
| street              | varchar(1024)     | Street                                                                |             |
| locality            | varchar(64)       | Locality                                                              |             |
| additionaldetails   | JSONB             | Additional details at time of audit                                   |             |
| createdby           | varchar(64)       | User ID who created the original record                               |             |
| createdtime         | bigint            | Original creation timestamp                                           |             |
| lastmodifiedby      | varchar(64)       | User ID who made the change being audited                             |             |
| lastmodifiedtime    | bigint            | Timestamp of the change being audited                                 |             |
