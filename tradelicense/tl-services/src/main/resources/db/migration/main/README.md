# Trade License Database Schema Documentation

## Overview
This document describes the database schema for the Trade License (TL) module, which manages trade licenses, their details, owners, addresses, and associated documents within a multi-tenant system.

---


## Entity Relationship Diagram (ASCII)


```
┌────────────────────────────────────────────────────────────────────┐
│                    TRADE LICENSE ER DIAGRAM                        │
└────────────────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  eg_tl_TradeLicense          ┃
┃  (Main License Table)        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ PK: id                       ┃
┃     accountid                ┃
┃     tenantId                 ┃
┃     licenseNumber            ┃
┃     applicationNumber        ┃
┃     tradeName                ┃
┃     status                   ┃
┃     validFrom, validTo       ┃
┗━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┛
               │
               │ 1:1
               ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  eg_tl_TradeLicenseDetail    ┃
┃  (License Detail Table)      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ PK: id                       ┃
┃ FK: tradelicenseId           ┃
┃     surveyNo                 ┃
┃     operationalArea          ┃
┃     noOfEmployees            ┃
┃     additionalDetail         ┃
┗━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┛
               │
               │ 1:N (One TradeLicenseDetail has Many child records)
               │
       ┌───────┼───────┬───────┬───────┬───────┬───────┬───────┐
       │       │       │       │       │       │       │       │
       ▼       ▼       ▼       ▼       ▼       ▼       ▼       ▼
     ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
     │ 3 │   │ 4 │   │ 5 │   │ 6 │   │ 7 │   │ 8 │   │ 9 │   │10*│
     └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ [3] TradeUnit    │ │ [4] Accessory    │ │ [5] Application  │
│                  │ │                  │ │     Document     │
│ PK: id           │ │ PK: id           │ │                  │
│ FK: tradeLicense │ │ FK: tradeLicense │ │ PK: id           │
│     DetailId     │ │     DetailId     │ │ FK: tradeLicense │
│                  │ │                  │ │     DetailId     │
│ tradetype        │ │ accessoryCategory│ │                  │
│ uom, uomValue    │ │ uom, count       │ │ documentType     │
└──────────────────┘ └──────────────────┘ │ filestoreid      │
                                          └──────────────────┘

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ [6] Verification │ │ [7] address      │ │ [8] owner        │
│     Document     │ │     [CASCADE]    │ │     [CASCADE]    │
│                  │ │                  │ │                  │
│ PK: id           │ │ PK: id           │ │ PK: id,          │
│ FK: tradeLicense │ │ FK: tradeLicense │ │     tradeLicense │
│     DetailId     │ │     DetailId     │ │     DetailId     │
│                  │ │                  │ │                  │
│ documentType     │ │ doorNo           │ │ isprimaryowner   │
│ filestoreid      │ │ addressLine1     │ │ ownertype        │
└──────────────────┘ │ city, pincode    │ │ institutionId    │
                     │ latitude         │ └────────┬─────────┘
                     │ longitude        │          │
                     └──────────────────┘          │ 1:1
                                                   ▼
┌──────────────────┐                    ┌──────────────────┐
│ [9] institution  │                    │[10] document     │
│     [CASCADE]    │                    │     _owner       │
│                  │                    │     [CASCADE]    │
│ PK: id           │                    │                  │
│ FK: tradeLicense │                    │ PK: id           │
│     DetailId     │                    │ FK: userid       │
│                  │                    │                  │
│ instituionName   │                    │ documenttype     │
│ contactNo        │                    │ filestoreId      │
│ organisationReg  │                    │ documentuid      │
└──────────────────┘                    └──────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                        AUDIT TABLES                                │
└────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐  ┌──────────────────────────────┐
│ [11] eg_tl_TradeLicense      │  │ [12] eg_tl_TradeLicense      │
│      _audit                  │  │      Detail_audit            │
│                              │  │                              │
│ No Primary Key               │  │ No Primary Key               │
│ 25 Columns (same as main)    │  │ 17 Columns (same as detail)  │
│ Historical records           │  │ Historical records           │
└──────────────────────────────┘  └──────────────────────────────┘
```


---

## Table Descriptions

### 1. **eg_tl_TradeLicense**
**Purpose**: Main table storing core trade license information.

| Column Name          | Data Type      | Description |
|---------------------|----------------|-------------|
| id                  | VARCHAR(64)    | Unique identifier for the trade license (Primary Key) |
| accountid           | VARCHAR(64)    | Reference to the account owning this license |
| tenantId            | VARCHAR(64)    | Multi-tenant identifier (city/ULB code) |
| licenseType         | VARCHAR(64)    | Type of trade license (e.g., PERMANENT, TEMPORARY) |
| licenseNumber       | VARCHAR(64)    | Unique license number issued |
| applicationNumber   | VARCHAR(64)    | Application reference number |
| oldLicenseNumber    | VARCHAR(64)    | Previous license number (for renewals) |
| propertyId          | VARCHAR(256)   | Reference to property where business operates |
| oldPropertyId       | VARCHAR(64)    | Previous property ID |
| tradeName           | VARCHAR(256)   | Name of the trade/business |
| applicationDate     | BIGINT         | Date when application was submitted (epoch milliseconds) |
| commencementDate    | BIGINT         | Date when business commenced operations |
| issuedDate          | BIGINT         | Date when license was issued |
| financialYear       | VARCHAR(64)    | Financial year of the license |
| validFrom           | BIGINT         | License validity start date |
| validTo             | BIGINT         | License validity end date |
| action              | VARCHAR(64)    | Current action being performed (e.g., APPLY, RENEW) |
| status              | VARCHAR(64)    | Current status (e.g., ACTIVE, PENDING, CANCELLED) |
| filestoreid         | VARCHAR(256)   | Reference to file storage for license document |
| applicationType     | VARCHAR(64)    | Type of application (NEW, RENEWAL, etc.) |
| workflowCode        | VARCHAR(64)    | Workflow identifier (e.g., NewTL, RenewalTL) |
| businessservice     | VARCHAR(64)    | Business service type |
| createdBy           | VARCHAR(64)    | User who created the record |
| createdTime         | BIGINT         | Record creation timestamp |
| lastModifiedBy      | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime    | BIGINT         | Last modification timestamp |

**Indexes**: accountid, tenantid, applicationnumber, licensenumber, oldlicensenumber, applicationdate, validto

---

### 2. **eg_tl_TradeLicenseDetail**
**Purpose**: Stores detailed specifications and operational information about the trade license.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradelicenseId          | VARCHAR(256)   | Foreign key to eg_tl_TradeLicense.id |
| surveyNo                | VARCHAR(64)    | Land survey number |
| subOwnerShipCategory    | VARCHAR(64)    | Sub-category of ownership |
| channel                 | VARCHAR(64)    | Application submission channel (ONLINE, COUNTER) |
| operationalArea         | FLOAT          | Area of business operation in sq. units |
| noOfEmployees           | INTEGER        | Number of employees |
| structureType           | VARCHAR(64)    | Type of building structure |
| adhocExemption          | NUMERIC(12,2)  | Ad-hoc exemption amount granted |
| adhocPenalty            | NUMERIC(12,2)  | Ad-hoc penalty amount imposed |
| adhocExemptionReason    | VARCHAR(1024)  | Reason for granting exemption |
| adhocPenaltyReason      | VARCHAR(1024)  | Reason for imposing penalty |
| additionalDetail        | JSONB          | Additional details in JSON format |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Relationship**: One-to-One with eg_tl_TradeLicense

**Index**: tradelicenseid

---

### 3. **eg_tl_TradeUnit**
**Purpose**: Stores information about different trade types and their quantities associated with the license.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| tenantId                | VARCHAR(64)    | Multi-tenant identifier |
| tradetype               | VARCHAR(64)    | Type of trade/business activity |
| uom                     | VARCHAR(64)    | Unit of measurement (e.g., KG, LITRE, PIECE) |
| uomValue                | VARCHAR(64)    | Quantity value for the unit |
| active                  | BOOLEAN        | Whether this trade unit is active |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail

**Index**: tradelicensedetailid

---

### 4. **eg_tl_Accessory**
**Purpose**: Stores information about accessories or additional items/assets associated with the trade.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| tenantId                | VARCHAR(64)    | Multi-tenant identifier |
| accessoryCategory       | VARCHAR(64)    | Category of accessory (e.g., MACHINERY, VEHICLE) |
| uom                     | VARCHAR(64)    | Unit of measurement |
| uomValue                | VARCHAR(64)    | Quantity value |
| count                   | INTEGER        | Number of accessories |
| active                  | BOOLEAN        | Whether this accessory is active |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail

**Index**: tradelicensedetailid

---

### 5. **eg_tl_ApplicationDocument**
**Purpose**: Stores documents submitted during trade license application.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| tenantId                | VARCHAR(64)    | Multi-tenant identifier |
| documentType            | VARCHAR(64)    | Type of document (e.g., BUSINESS_PROOF, ADDRESS_PROOF) |
| filestoreid             | VARCHAR(64)    | Reference to file in file storage system |
| tradeCategoryDetail     | VARCHAR(64)    | Trade category details |
| active                  | BOOLEAN        | Whether this document is active |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail

**Index**: tradelicensedetailid

---

### 6. **eg_tl_VerificationDocument**
**Purpose**: Stores documents uploaded during verification process by officials.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| tenantId                | VARCHAR(64)    | Multi-tenant identifier |
| documentType            | VARCHAR(64)    | Type of verification document |
| filestoreid             | VARCHAR(64)    | Reference to file in file storage system |
| tradeCategoryDetail     | VARCHAR(64)    | Trade category details |
| active                  | BOOLEAN        | Whether this document is active |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail

**Index**: tradelicensedetailid

---

### 7. **eg_tl_address**
**Purpose**: Stores physical address information for the business location.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| tenantId                | VARCHAR(64)    | Multi-tenant identifier |
| doorNo                  | VARCHAR(64)    | Door/house number |
| buildingName            | VARCHAR(64)    | Name of the building |
| addressId               | VARCHAR(64)    | External address reference ID |
| addressNumber           | VARCHAR(64)    | Address number |
| type                    | VARCHAR(64)    | Type of address (e.g., RESIDENTIAL, COMMERCIAL) |
| addressLine1            | TEXT           | Primary address line (full text) |
| addressLine2            | VARCHAR(256)   | Secondary address line |
| landmark                | VARCHAR(64)    | Nearby landmark |
| street                  | VARCHAR(64)    | Street name |
| city                    | VARCHAR(64)    | City name |
| locality                | VARCHAR(64)    | Locality/area code or name |
| pincode                 | VARCHAR(64)    | Postal code |
| latitude                | FLOAT          | GPS latitude coordinate |
| longitude               | FLOAT          | GPS longitude coordinate |
| detail                  | VARCHAR(64)    | Additional details |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified the record |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail (with CASCADE delete/update)

**Index**: tradelicensedetailid

---

### 8. **eg_tl_owner**
**Purpose**: Stores information about the owners of the trade license.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Part of composite PK) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id (Part of composite PK) |
| tenantId                | VARCHAR(256)   | Multi-tenant identifier |
| isactive                | BOOLEAN        | Whether the owner record is active |
| isprimaryowner          | BOOLEAN        | Whether this is the primary owner |
| ownertype               | VARCHAR(64)    | Type of owner (INDIVIDUAL, INSTITUTIONAL) |
| ownershippercentage     | VARCHAR(64)    | Percentage of ownership |
| relationship            | VARCHAR(64)    | Relationship to primary owner |
| active                  | BOOLEAN        | Active status flag |
| institutionId           | VARCHAR(64)    | Reference to institution if owner is institutional |
| createdby               | VARCHAR(64)    | User who created the record |
| createdtime             | BIGINT         | Record creation timestamp |
| lastmodifiedby          | VARCHAR(64)    | User who last modified the record |
| lastmodifiedtime        | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail (with CASCADE delete/update)

**Index**: tradelicensedetailid

---

### 9. **eg_tl_document_owner**
**Purpose**: Stores personal documents of the license owners (ID proofs, photos, etc.).

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId    | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| userid                  | VARCHAR(128)   | Foreign key to eg_tl_owner.id (owner reference) |
| tenantId                | VARCHAR(256)   | Multi-tenant identifier |
| documenttype            | VARCHAR(64)    | Type of document (e.g., AADHAAR, PAN, PHOTO) |
| filestoreId             | VARCHAR(64)    | Reference to file in file storage system |
| documentuid             | VARCHAR(64)    | Unique document identifier |
| active                  | BOOLEAN        | Whether this document is active |
| createdby               | VARCHAR(64)    | User who created the record |
| createdtime             | BIGINT         | Record creation timestamp |
| lastmodifiedby          | VARCHAR(64)    | User who last modified the record |
| lastmodifiedtime        | BIGINT         | Last modification timestamp |

**Relationship**: One-to-One with eg_tl_owner (with CASCADE delete/update)

**Index**: userid

---

### 10. **eg_tl_institution**
**Purpose**: Stores detailed information about institutional owners (companies, organizations, etc.).

| Column Name                    | Data Type      | Description |
|-------------------------------|----------------|-------------|
| id                            | VARCHAR(64)    | Unique identifier (Primary Key) |
| tradeLicenseDetailId          | VARCHAR(64)    | Foreign key to eg_tl_TradeLicenseDetail.id |
| tenantId                      | VARCHAR(256)   | Multi-tenant identifier |
| name                          | VARCHAR(64)    | Name of authorized representative |
| type                          | VARCHAR(64)    | Type of institution (PRIVATE, PUBLIC, NGO) |
| designation                   | VARCHAR(64)    | Designation of representative |
| instituionName                | VARCHAR(250)   | Full name of the institution |
| contactNo                     | VARCHAR(50)    | Contact phone number |
| organisationRegistrationNo    | VARCHAR(50)    | Organization's registration number |
| address                       | VARCHAR(512)   | Institution's registered address |
| active                        | BOOLEAN        | Whether this institution record is active |
| createdby                     | VARCHAR(64)    | User who created the record |
| createdtime                   | BIGINT         | Record creation timestamp |
| lastmodifiedby                | VARCHAR(64)    | User who last modified the record |
| lastmodifiedtime              | BIGINT         | Last modification timestamp |

**Relationship**: Many-to-One with eg_tl_TradeLicenseDetail (with CASCADE delete/update)

**Index**: tradelicensedetailid

---

### 11. **eg_tl_TradeLicense_audit**
**Purpose**: Audit table that maintains historical records of changes to eg_tl_TradeLicense.

| Column Name          | Data Type      | Description |
|---------------------|----------------|-------------|
| id                  | VARCHAR(64)    | License ID (Not a Primary Key in audit table) |
| accountid           | VARCHAR(64)    | Reference to account |
| tenantId            | VARCHAR(64)    | Multi-tenant identifier |
| licenseType         | VARCHAR(64)    | Type of trade license |
| licenseNumber       | VARCHAR(64)    | License number |
| applicationNumber   | VARCHAR(64)    | Application reference number |
| oldLicenseNumber    | VARCHAR(64)    | Previous license number |
| propertyId          | VARCHAR(256)   | Property reference |
| oldPropertyId       | VARCHAR(64)    | Previous property ID |
| tradeName           | VARCHAR(256)   | Name of the trade/business |
| applicationDate     | BIGINT         | Application submission date |
| commencementDate    | BIGINT         | Business commencement date |
| issuedDate          | BIGINT         | License issuance date |
| financialYear       | VARCHAR(64)    | Financial year |
| validFrom           | BIGINT         | Validity start date |
| validTo             | BIGINT         | Validity end date |
| action              | VARCHAR(64)    | Action performed |
| status              | VARCHAR(64)    | License status |
| filestoreid         | VARCHAR(256)   | File storage reference |
| applicationType     | VARCHAR(64)    | Application type (NEW, RENEWAL, etc.) |
| workflowCode        | VARCHAR(64)    | Workflow identifier |
| businessservice     | VARCHAR(64)    | Business service type |
| createdBy           | VARCHAR(64)    | User who created the record |
| createdTime         | BIGINT         | Record creation timestamp |
| lastModifiedBy      | VARCHAR(64)    | User who last modified |
| lastModifiedTime    | BIGINT         | Last modification timestamp |

**Note**: No primary key constraint - allows multiple historical records for the same license. Used for audit trail, compliance, and historical tracking purposes.

---

### 12. **eg_tl_TradeLicenseDetail_audit**
**Purpose**: Audit table that maintains historical records of changes to eg_tl_TradeLicenseDetail.

| Column Name              | Data Type      | Description |
|-------------------------|----------------|-------------|
| id                      | VARCHAR(64)    | Detail ID (Not a Primary Key in audit table) |
| tradelicenseId          | VARCHAR(256)   | Reference to trade license |
| surveyNo                | VARCHAR(64)    | Land survey number |
| subOwnerShipCategory    | VARCHAR(64)    | Sub-category of ownership |
| channel                 | VARCHAR(64)    | Application submission channel |
| operationalArea         | FLOAT          | Area of business operation |
| noOfEmployees           | INTEGER        | Number of employees |
| structureType           | VARCHAR(64)    | Type of building structure |
| adhocExemption          | NUMERIC(12,2)  | Ad-hoc exemption amount |
| adhocPenalty            | NUMERIC(12,2)  | Ad-hoc penalty amount |
| adhocExemptionReason    | VARCHAR(1024)  | Reason for exemption |
| adhocPenaltyReason      | VARCHAR(1024)  | Reason for penalty |
| additionalDetail        | JSONB          | Additional details in JSON format |
| createdBy               | VARCHAR(64)    | User who created the record |
| createdTime             | BIGINT         | Record creation timestamp |
| lastModifiedBy          | VARCHAR(64)    | User who last modified |
| lastModifiedTime        | BIGINT         | Last modification timestamp |

**Note**: No primary key constraint - allows multiple historical records for the same detail record. Used for audit trail, compliance, and historical tracking purposes.
