# EDCR (Electronic Development Control Regulations) Database Schema

## Overview
This database schema manages the electronic building plan approval system, including plan scrutiny, DXF file processing, PDF conversion, and occupancy certificate comparison.

---

## Database Tables

### 1. EDCR_RULE
**Purpose:** Stores the main building control rules and regulations.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for the rule |
| name | varchar(128) | NOT NULL | Name of the rule |
| clause | varchar(256) | NOT NULL | Building regulation clause reference |
| active | boolean | NOT NULL, DEFAULT true | Indicates if rule is currently active |
| version | numeric | DEFAULT 0 | Version number for optimistic locking |
| createdBy | bigint | NOT NULL, FK → EG_USER | User who created the rule |
| createdDate | timestamp | NOT NULL | Timestamp when rule was created |
| lastModifiedBy | bigint | FK → EG_USER | User who last modified the rule |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_RULE

---

### 2. EDCR_SUBRULE
**Purpose:** Stores sub-rules that belong to main rules for detailed regulation definitions.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for the sub-rule |
| name | varchar(128) | NOT NULL | Name of the sub-rule |
| rule | bigint | NOT NULL, FK → EDCR_RULE | Parent rule reference |
| clause | varchar(256) | NOT NULL | Building regulation sub-clause reference |
| active | boolean | NOT NULL, DEFAULT true | Indicates if sub-rule is active |
| orderby | bigint | | Display order of sub-rules |
| version | numeric | DEFAULT 0 | Version number for optimistic locking |
| createdBy | bigint | NOT NULL, FK → EG_USER | User who created the sub-rule |
| createdDate | timestamp | NOT NULL | Timestamp when sub-rule was created |
| lastModifiedBy | bigint | FK → EG_USER | User who last modified the sub-rule |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_SUBRULE

---

### 3. EDCR_PLANRULE
**Purpose:** Defines plan-specific rules based on parameters like plot area, occupancy, floors, building height, and road width.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for the plan rule |
| service | varchar(128) | | Type of service (e.g., building permit) |
| minplotArea | bigint | | Minimum plot area in sq. units |
| maxplotArea | bigint | | Maximum plot area in sq. units |
| occupancy | varchar(256) | | Type of occupancy (Residential, Commercial, etc.) |
| minfloors | bigint | | Minimum number of floors |
| maxfloors | bigint | | Maximum number of floors |
| minbuildinghgt | bigint | | Minimum building height |
| maxbuildinghgt | bigint | | Maximum building height |
| familysize | varchar(256) | | Family size classification |
| abutingroad | varchar(256) | | Type of abutting road |
| roadmin | bigint | | Minimum road width |
| roadmax | bigint | | Maximum road width |
| active | boolean | NOT NULL, DEFAULT true | Indicates if plan rule is active |
| rules | varchar(1024) | | Comma-separated list of rule IDs |
| version | numeric | DEFAULT 0 | Version number for optimistic locking |
| createdBy | bigint | NOT NULL, FK → EG_USER | User who created the plan rule |
| createdDate | timestamp | NOT NULL | Timestamp when plan rule was created |
| lastModifiedBy | bigint | FK → EG_USER | User who last modified the plan rule |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_PLANRULE

---

### 4. EDCR_PLANINFO
**Purpose:** Stores detailed building plan information including owner, architect, and plot details.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for plan info |
| plotarea | bigint | | Total plot area in sq. units |
| ownername | varchar(256) | | Name of the property owner |
| architectInformation | varchar(256) | | Architect details/information |
| occupancy | varchar(256) | | Type of occupancy |
| crzzonearea | boolean | DEFAULT false | Indicates if plot is in CRZ (Coastal Regulation Zone) |
| demolitionArea | double precision | | Area marked for demolition |
| resurveyno | varchar(256) | | Re-survey number of the plot |
| revenueward | varchar(256) | | Revenue ward information |
| desam | varchar(256) | | Desam/village administrative division |
| village | varchar(256) | | Village name |
| applicantname | varchar(128) | | Name of the applicant |
| serviceType | varchar(50) | | Type of service requested |
| amenities | varchar(200) | | Amenities provided in the building |
| acchitectId | bigint | | Architect user ID reference |
| version | numeric | DEFAULT 0 | Version number for optimistic locking |
| createdBy | bigint | NOT NULL, FK → EG_USER | User who created the plan info |
| createdDate | timestamp | NOT NULL | Timestamp when plan info was created |
| lastModifiedBy | bigint | FK → EG_USER | User who last modified |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_PLANINFO

---

### 5. EDCR_APPLICATION
**Purpose:** Main application table for building plan scrutiny submissions.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for application |
| applicationNumber | varchar(128) | NOT NULL | Unique application number |
| applicationDate | date | NOT NULL | Date of application submission |
| planinfoid | bigint | FK → EDCR_PLANINFO | Reference to plan information |
| status | varchar(30) | | Application status (Accepted, Rejected, etc.) |
| occupancy | varchar(256) | | Type of occupancy |
| applicantname | varchar(256) | | Name of the applicant |
| architectInformation | varchar(256) | | Architect information |
| serviceType | varchar(50) | | Type of service requested |
| amenities | varchar(200) | | Amenities in the building |
| projecttype | varchar(512) | | Type of project (New Construction, Addition, etc.) |
| applicationType | varchar(48) | | Type of application (Building Plan, OC Plan) |
| permitApplicationDate | date | | Date of permit application |
| planPermitNumber | varchar(30) | | Plan permit number |
| buildingLicensee | bigint | FK → EG_USER | Building licensee user reference |
| transactionnumber | varchar(128) | | Transaction number for payment |
| thirdpartyusercode | varchar(48) | | Third-party user code for integration |
| thirdpartyusertenant | varchar(48) | | Third-party user tenant code |
| tenantId | varchar(64) | | Tenant identifier for multi-tenancy |
| version | numeric | DEFAULT 0 | Version number for optimistic locking |
| createdBy | bigint | NOT NULL, FK → EG_USER | User who created the application |
| createdDate | timestamp | NOT NULL | Timestamp when application was created |
| lastModifiedBy | bigint | FK → EG_USER | User who last modified |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequences:**
- SEQ_EDCR_APPLICATION
- SEQ_ECDR_APPLICATIONNO (for application number generation)
- SEQ_OC_PLAN_SCRUTINYNO (for OC plan scrutiny numbers)

---

### 6. EDCR_APPLICATION_DETAIL
**Purpose:** Stores detailed scrutiny results, DXF files, and generated reports for each application.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for application detail |
| application | bigint | NOT NULL, FK → EDCR_APPLICATION | Reference to parent application |
| dxffileid | bigint | | File store ID for uploaded DXF file |
| reportoutputid | bigint | | File store ID for generated scrutiny report |
| dcrnumber | varchar(128) | | Development Control Regulation number |
| status | varchar(128) | | Scrutiny status (Accepted, Rejected, etc.) |
| planDetailFileStore | bigint | | File store ID for detailed plan file |
| scrutinizedDxfFileId | bigint | | File store ID for scrutinized/annotated DXF |
| planinfoid | bigint | | Reference to plan information |
| comparisonDcrNumber | varchar(128) | | DCR number for comparison (OC vs Building Plan) |
| tenantId | varchar(64) | | Tenant identifier for multi-tenancy |
| version | numeric | NOT NULL | Version number for optimistic locking |
| createdBy | bigint | NOT NULL, FK → EG_USER | User who created the detail |
| createdDate | timestamp | NOT NULL | Timestamp when detail was created |
| lastModifiedBy | bigint | FK → EG_USER | User who last modified |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_APPLICATION_DETAIL

---

### 7. EDCR_PDF_DETAIL
**Purpose:** Manages PDF conversion from DXF files with layer-wise conversion tracking.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for PDF detail |
| applicationdetail | bigint | NOT NULL, FK → EDCR_APPLICATION_DETAIL | Reference to application detail |
| layer | varchar(512) | | DXF layers to be converted to PDF |
| convertedpdf | bigint | | File store ID for converted PDF file |
| failurereasons | varchar(512) | | Reasons for conversion failure (if any) |
| standardviolations | varchar(1024) | | Standard violations found during conversion |
| tenantId | varchar(64) | | Tenant identifier for multi-tenancy |
| version | numeric | DEFAULT 0 | Version number for optimistic locking |
| createdBy | bigint | | User who created the PDF detail |
| createdDate | timestamp | | Timestamp when PDF detail was created |
| lastModifiedBy | bigint | | User who last modified |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_PDF_DETAIL

---

### 8. EDCR_OC_COMPARISON_DETAIL
**Purpose:** Stores comparison details between Occupancy Certificate plans and original Building Plans.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | bigint | PRIMARY KEY | Unique identifier for comparison detail |
| ocdcrnumber | varchar(128) | | Occupancy Certificate DCR number |
| dcrnumber | varchar(128) | | Original Building Plan DCR number |
| occomparisonreport | bigint | | File store ID for comparison report |
| tenantid | varchar(128) | | Tenant identifier for multi-tenancy |
| status | varchar(128) | | Comparison status |
| version | numeric | NOT NULL | Version number for optimistic locking |
| createdBy | bigint | NOT NULL | User who created the comparison |
| createdDate | timestamp | NOT NULL | Timestamp when comparison was created |
| lastModifiedBy | bigint | | User who last modified |
| lastModifiedDate | timestamp | | Timestamp of last modification |

**Sequence:** SEQ_EDCR_OC_COMPARISON_DETAIL

---

## Entity Relationship Diagram

```
┌─────────────────────┐
│    EG_USER          │
│  (External Table)   │
└──────┬──────────────┘
       │
       │ Referenced by multiple tables
       │ for audit fields
       │
┌──────┴──────────────────────────────────────────────────┐
│                                                         │
│  ┌────────────────┐         ┌────────────────┐          │
│  │  EDCR_RULE     │         │ EDCR_PLANRULE  │          │
│  │                │         │                │          │
│  │ PK: id         │         │ PK: id         │          │
│  │    name        │         │    service     │          │
│  │    clause      │         │    minplotArea │          │
│  │    active      │         │    maxplotArea │          │
│  └────┬───────────┘         │    occupancy   │          │
│       │                     │    minfloors   │          │
│       │ 1:N                 │    maxfloors   │          │
│       │                     │    rules       │          │
│  ┌────┴───────────┐         └────────────────┘          │
│  │ EDCR_SUBRULE   │                                     │
│  │                │                                     │
│  │ PK: id         │                                     │
│  │ FK: rule       │──────────┐                          │
│  │    name        │          │                          │
│  │    clause      │          │                          │
│  │    orderby     │          │                          │
│  └────────────────┘          │                          │
│                              │                          │
│                              │                          │
└──────────────────────────────┼──────────────────────────┘
                               │
                               │
      ┌────────────────────────┼────────────────────────┐
      │                        │                        │
      │  ┌─────────────────────┴──────┐                 │
      │  │   EDCR_PLANINFO            │                 │
      │  │                            │                 │
      │  │ PK: id                     │                 │
      │  │    plotarea                │                 │
      │  │    ownername               │                 │
      │  │    architectInformation    │                 │
      │  │    occupancy               │                 │
      │  │    crzzonearea             │                 │
      │  │    demolitionArea          │                 │
      │  │    resurveyno              │                 │
      │  │    applicantname           │                 │
      │  └───────────┬────────────────┘                 │
      │              │                                  │
      │              │ 1:N                              │
      │              │                                  │
      │  ┌───────────┴────────────────────┐             │
      │  │   EDCR_APPLICATION             │             │
      │  │                                │             │
      │  │ PK: id                         │             │
      │  │    applicationNumber           │             │
      │  │    applicationDate             │             │
      │  │ FK: planinfoid                 │             │
      │  │ FK: buildingLicensee           │             │
      │  │    status                      │             │
      │  │    occupancy                   │             │
      │  │    applicantname               │             │
      │  │    serviceType                 │             │
      │  │    projecttype                 │             │
      │  │    applicationType             │             │
      │  │    transactionnumber           │             │
      │  │    thirdpartyusercode          │             │
      │  │    tenantId                    │             │
      │  └───────────┬────────────────────┘             │
      │              │                                  │
      │              │ 1:N                              │
      │              │                                  │
      │  ┌───────────┴─────────────────────┐            │
      │  │  EDCR_APPLICATION_DETAIL        │            │
      │  │                                 │            │
      │  │ PK: id                          │            │
      │  │ FK: application                 │            │
      │  │    dxffileid                    │            │
      │  │    reportoutputid               │            │
      │  │    dcrnumber                    │            │
      │  │    status                       │            │
      │  │    planDetailFileStore          │            │
      │  │    scrutinizedDxfFileId         │            │
      │  │    comparisonDcrNumber          │            │
      │  │    tenantId                     │            │
      │  └───────────┬─────────────────────┘            │
      │              │                                  │
      │              │ 1:N                              │
      │              │                                  │
      │  ┌───────────┴─────────────────────┐            │
      │  │   EDCR_PDF_DETAIL               │            │
      │  │                                 │            │
      │  │ PK: id                          │            │
      │  │ FK: applicationdetail           │            │
      │  │    layer                        │            │
      │  │    convertedpdf                 │            │
      │  │    failurereasons               │            │
      │  │    standardviolations           │            │
      │  │    tenantId                     │            │
      │  └─────────────────────────────────┘            │
      │                                                 │
      └─────────────────────────────────────────────────┘


┌────────────────────────────────────────┐
│  EDCR_OC_COMPARISON_DETAIL             │
│  (Standalone - no direct FK relations) │
│                                        │
│ PK: id                                 │
│    ocdcrnumber                         │
│    dcrnumber                           │
│    occomparisonreport                  │
│    status                              │
│    tenantid                            │
└────────────────────────────────────────┘
```

