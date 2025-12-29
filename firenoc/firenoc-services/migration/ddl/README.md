# Fire NOC Database Schema Documentation

## Overview
This database schema manages Fire NOC (No Objection Certificate) applications, including property details, building information, owner details, and supporting documents.

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Fire NOC System Schema                             │
└─────────────────────────────────────────────────────────────────────────────┘

                        ┌──────────────────────────┐
                        │    eg_fn_firenoc         │
                        │  (Main Fire NOC)         │
                        ├──────────────────────────┤
                        │ PK: uuid                 │
                        │     tenantid             │
                        │     firenocnumber        │
                        │     provisionfirenocnumber│
                        │     oldfirenocnumber     │
                        │     dateofapplied        │
                        │     createdby            │
                        │     lastmodifiedby       │
                        │     createdtime          │
                        │     lastmodifiedtime     │
                        └────────────┬─────────────┘
                                     │
                                     │ 1:N
                                     │
                        ┌────────────▼─────────────┐
                        │  eg_fn_firenocdetail     │
                        │  (Fire NOC Details)      │
                        ├──────────────────────────┤
                        │ PK: uuid                 │
                        │ FK: firenocuuid          │
                        │     applicationnumber    │
                        │     firenoctype          │
                        │     firestationid        │
                        │     applicationdate      │
                        │     financialyear        │
                        │     issueddate           │
                        │     validfrom            │
                        │     validto              │
                        │     action               │
                        │     channel              │
                        │     noofbuildings        │
                        │     status               │
                        │     propertyid           │
                        │     additionaldetail     │
                        └─┬───────┬────────┬───────┘
                          │       │        │
              ┌───────────┘       │        └─────────────┐
              │ 1:N               │ 1:N                  │ 1:N
              │                   │                      │
    ┌─────────▼──────────┐  ┌─────▼──────────┐  ┌────────▼──────────┐
    │  eg_fn_address     │  │ eg_fn_owner    │  │ eg_fn_institution │
    │  (Address Info)    │  │ (Owner Info)   │  │ (Institution)     │
    ├────────────────────┤  ├────────────────┤  ├───────────────────┤
    │ PK: uuid           │  │ PK: uuid       │  │ PK: uuid          │
    │ FK: firenocdetails │  │ FK: firenocdet │  │ FK: firenocdetails│
    │     uuid           │  │     ailsuuid   │  │     uuid          │
    │     doorno         │  │     isactive   │  │     name          │
    │     latitude       │  │     isprimaryow│  │     type          │
    │     longitude      │  │     ner        │  │     designation   │
    │     buildingname   │  │     ownertype  │  │     active        │
    │     addressline1   │  │     ownership% │  │                   │
    │     addressline2   │  │     relation   │  │                   │
    │     landmark       │  │     institution│  │                   │
    │     street         │  │     id         │  │                   │
    │     city           │  │     useruuid   │  │                   │
    │     locality       │  │     applicant  │  │                   │
    │     pincode        │  │     category   │  │                   │
    └────────────────────┘  └────────────────┘  └───────────────────┘
              1:N
               │
    ┌──────────▼──────────┐
    │  eg_fn_buidlings    │
    │  (Building Info)    │
    ├─────────────────────┤
    │ PK: uuid            │
    │ FK: firenocdetails  │
    │     uuid            │
    │     name            │
    │     usagetype       │
    │     active          │
    └──┬──────────────┬───┘
       │              │
       │ 1:N          │ 1:N
       │              │
┌──────▼────────┐  ┌──▼─────────────────────┐
│ eg_fn_building│  │ eg_fn_buildingdocuments│
│ uoms          │  │ (Building Documents)   │
│ (Unit of      │  ├────────────────────────┤
│ Measurement)  │  │ PK: uuid               │
├───────────────┤  │ FK: buildinguuid       │
│ PK: uuid      │  │     documenttype       │
│ FK: building  │  │     filestoreid        │
│     uuid      │  │     documentuid        │
│     code      │  │     active             │
│     value     │  │                        │
│     activeuom │  │                        │
│     active    │  │                        │
└───────────────┘  └────────────────────────┘

```

## Table Definitions

### 1. eg_fn_firenoc
**Purpose**: Main table storing Fire NOC application records

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for Fire NOC record |
| tenantid | varchar(128) | Tenant/ULB identifier for multi-tenancy |
| firenocnumber | varchar(64) | Final Fire NOC certificate number issued |
| provisionfirenocnumber | varchar(64) | Provisional Fire NOC number (temporary certificate) |
| oldfirenocnumber | varchar(64) | Legacy Fire NOC number from old system |
| dateofapplied | varchar(256) | Date when application was submitted |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Timestamp when record was created (epoch milliseconds) |
| lastmodifiedtime | bigint | Timestamp when record was last modified (epoch milliseconds) |

**Indexes**:
- `index_eg_fn_firenoc_tenantid` on `tenantid`
- `index_eg_fn_firenoc_createdtime` on `createdtime`

---

### 2. eg_fn_firenocdetail
**Purpose**: Detailed information for each Fire NOC application including application status and validity

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for Fire NOC detail |
| firenocuuid | varchar(128) | **Foreign Key** → eg_fn_firenoc.uuid - Links to parent Fire NOC |
| applicationnumber | varchar(64) | Unique application number for tracking |
| firenoctype | varchar(64) | Type of Fire NOC (NEW/RENEWAL/etc.) |
| firestationid | varchar(64) | Fire station jurisdiction identifier |
| applicationdate | bigint | Date of application submission (epoch milliseconds) |
| financialyear | varchar(64) | Financial year of application |
| issueddate | bigint | Date when NOC was issued (epoch milliseconds) |
| validfrom | bigint | NOC validity start date (epoch milliseconds) |
| validto | bigint | NOC validity end date (epoch milliseconds) |
| action | varchar(64) | Current action/workflow state |
| channel | varchar(64) | Application channel (ONLINE/COUNTER/etc.) |
| noofbuildings | varchar(64) | Number of buildings in application |
| status | varchar(64) | Application status (APPROVED/PENDING/REJECTED) |
| propertyid | varchar(64) | Associated property identifier |
| additionaldetail | jsonb | JSON field for flexible additional information |
| tenantid | varchar(128) | Tenant/ULB identifier |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |

**Indexes**:
- `index_eg_fn_firenocdetail_firenocuuid` on `firenocuuid`

---

### 3. eg_fn_address
**Purpose**: Stores address information for Fire NOC applications

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for address |
| firenocdetailsuuid | varchar(64) | **Foreign Key** → eg_fn_firenocdetail.uuid |
| tenantid | varchar(64) | Tenant/ULB identifier |
| doorno | varchar(64) | Door/House number |
| latitude | double precision | Geographic latitude coordinate |
| longitude | double precision | Geographic longitude coordinate |
| buildingname | varchar(64) | Name of the building |
| addressid | varchar(64) | External address system identifier |
| addressnumber | varchar(64) | Address number from master data |
| type | varchar(64) | Address type (RESIDENTIAL/COMMERCIAL/etc.) |
| addressline1 | varchar(256) | Primary address line |
| addressline2 | varchar(256) | Secondary address line |
| landmark | varchar(64) | Nearby landmark for reference |
| street | varchar(64) | Street name |
| city | varchar(64) | City name |
| locality | varchar(64) | Locality/Area name |
| pincode | varchar(64) | Postal code |
| detail | varchar(64) | Additional address details |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |

**Indexes**:
- `index_eg_fn_address_firenocdetailsuuid` on `firenocdetailsuuid`

---

### 4. eg_fn_buidlings
**Purpose**: Building-specific details for Fire NOC applications

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for building |
| firenocdetailsuuid | varchar(64) | **Foreign Key** → eg_fn_firenocdetail.uuid |
| tenantid | varchar(64) | Tenant/ULB identifier |
| name | varchar(128) | Name/identifier of the building |
| usagetype | varchar(64) | Building usage type (RESIDENTIAL/COMMERCIAL/INDUSTRIAL) |
| active | boolean | Soft delete flag (default: true) |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |

**Note**: Originally contained fields like nooffloors, noofbasements, plotsize, builtuparea, heightofbuilding, and additionalunitdetail which were removed and moved to related tables.

**Indexes**:
- `index_eg_fn_buidlings_firenocdetailsuuid` on `firenocdetailsuuid`

---

### 5. eg_fn_buildinguoms
**Purpose**: Unit of Measurements for buildings (floors, basements, areas, etc.)

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for UOM entry |
| buildinguuid | varchar(64) | **Foreign Key** → eg_fn_buidlings.uuid |
| code | varchar(128) | UOM code (NO_OF_FLOORS/PLOT_SIZE/BUILT_UP_AREA/etc.) |
| value | varchar(128) | Measurement value |
| activeuom | boolean | Whether this UOM is currently active |
| active | boolean | Soft delete flag |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |

**Indexes**:
- `index_eg_fn_buildinguoms_buildinguuid` on `buildinguuid`

---

### 6. eg_fn_buildingdocuments
**Purpose**: Stores documents/attachments related to buildings

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for document |
| buildinguuid | varchar(64) | **Foreign Key** → eg_fn_buidlings.uuid |
| tenantid | varchar(256) | Tenant/ULB identifier |
| documenttype | varchar(64) | Type of document (FLOOR_PLAN/SITE_PLAN/etc.) |
| filestoreid | varchar(64) | File store service identifier for document retrieval |
| documentuid | varchar(64) | Document unique identifier |
| active | boolean | Whether document is active/valid |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |

**Indexes**:
- `index_eg_fn_buildingdocuments_doc_buildinguuid` on `buildinguuid`

---

### 7. eg_fn_owner
**Purpose**: Owner/Applicant information for Fire NOC applications

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for owner |
| firenocdetailsuuid | varchar(64) | **Foreign Key** → eg_fn_firenocdetail.uuid |
| tenantid | varchar(256) | Tenant/ULB identifier |
| isactive | boolean | Whether owner record is active |
| isprimaryowner | boolean | Flags the primary owner among multiple owners |
| ownertype | varchar(64) | Type of owner (INDIVIDUAL/COMPANY/TRUST/etc.) |
| ownershippercentage | varchar(64) | Percentage of ownership |
| relationship | varchar(64) | Relationship type (for co-owners) |
| active | boolean | Soft delete flag |
| institutionid | varchar(64) | Reference to institution if owner is institutional |
| useruuid | varchar(64) | User system UUID for the owner |
| applicantcategory | varchar(64) | Category of applicant (BUILDER/OWNER/ARCHITECT/etc.) |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |

---

### 8. eg_fn_institution
**Purpose**: Institutional owner details (companies, trusts, organizations)

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| uuid | varchar(64) | **Primary Key** - Unique identifier for institution |
| firenocdetailsuuid | varchar(64) | **Foreign Key** → eg_fn_firenocdetail.uuid |
| tenantid | varchar(256) | Tenant/ULB identifier |
| name | varchar(64) | Institution name |
| type | varchar(64) | Institution type (PRIVATE/PUBLIC/NGO/etc.) |
| designation | varchar(64) | Designation of the institutional representative |
| active | boolean | Soft delete flag (default: true) |
| createdby | varchar(64) | User ID who created the record |
| lastmodifiedby | varchar(64) | User ID who last modified the record |
| createdtime | bigint | Creation timestamp (epoch milliseconds) |
| lastmodifiedtime | bigint | Last modification timestamp (epoch milliseconds) |
