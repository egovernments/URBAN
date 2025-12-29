# Birth and Death Services Database Schema

## Overview
This database schema manages Birth and Death registration services, including certificate generation, hospital records, and associated metadata for citizens and informants.

---

## Entity Relationship Diagram

### Diagram 1: Hospital Master Table

```
┌──────────────────────────────────────────────────────┐
│           eg_birth_death_hospitals                   │
├──────────────────────────────────────────────────────┤
│ PK: id                     VARCHAR(64)               │
│                                                      │
│ hospitalname               VARCHAR(500)   NOT NULL  │
│ tenantid                   VARCHAR(50)    NOT NULL  │
│                                                      │
│ Purpose: Master registry of hospitals/facilities    │
│          where births and deaths are registered     │
└──────────────────────────────────────────────────────┘
                         │
                         │ Referenced by
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
    eg_birth_dtls.hospitalid  eg_death_dtls.hospitalid
```

---

### Diagram 2: Birth Registration Module

```
                    ┌─────────────────────────────────────────┐
                    │         eg_birth_dtls                   │
                    │      (Core Birth Record)                │
                    ├─────────────────────────────────────────┤
                    │ PK: id                  VARCHAR(64)     │
                    │ UK: registrationno + tenantid           │
                    │ FK: hospitalid → hospitals(id)          │
                    │                                         │
                    │ registrationno          VARCHAR(64)     │
                    │ dateofbirth             TIMESTAMP  ✓    │
                    │ dateofreport            TIMESTAMP       │
                    │ firstname               VARCHAR(200)    │
                    │ middlename              VARCHAR(200)    │
                    │ lastname                VARCHAR(200)    │
                    │ gender                  SMALLINT   ✓    │
                    │ placeofbirth            VARCHAR(1000)   │
                    │ informantsname          VARCHAR(200)    │
                    │ informantsaddress       VARCHAR(1000)   │
                    │ tenantid                VARCHAR(50)  ✓  │
                    │ islegacyrecord          BOOLEAN         │
                    │ counter, remarks, audit fields          │
                    │                                         │
                    │ Indexes: tenantid, hospitalid           │
                    └──────┬──────┬───────┬──────────────────┘
                           │      │       │
           ┌───────────────┘      │       └────────────────┐
           │                      │                        │
           ▼                      ▼                        ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ eg_birth_father  │   │ eg_birth_mother  │   │ eg_birth_cert    │
│ _info            │   │ _info            │   │ _request         │
├──────────────────┤   ├──────────────────┤   ├──────────────────┤
│ PK: id           │   │ PK: id           │   │ PK: id           │
│ FK: birthdtlid   │   │ FK: birthdtlid   │   │ FK: birthdtlid   │
│                  │   │                  │   │                  │
│ firstname        │   │ firstname        │   │ birthcertno      │
│ middlename       │   │ middlename       │   │ filestoreid      │
│ lastname         │   │ lastname         │   │ status           │
│ aadharno         │   │ aadharno         │   │ embeddedurl      │
│ emailid          │   │ emailid          │   │ dateofissue      │
│ mobileno         │   │ mobileno         │   │ source           │
│ education        │   │ education        │   │ additionaldetail │
│ proffession      │   │ proffession      │   │   (JSONB)        │
│ nationality      │   │ nationality      │   │                  │
│ religion         │   │ religion         │   │ Audit table:     │
│                  │   │                  │   │ _cert_req_audit  │
│ Audit table:     │   │ Audit table:     │   │                  │
│ _father_audit    │   │ _mother_audit    │   │                  │
└──────────────────┘   └──────────────────┘   └──────────────────┘

           │                      │
           └──────────┬───────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
┌──────────────────┐     ┌──────────────────┐
│ eg_birth_        │     │ eg_birth_        │
│ permaddr         │     │ presentaddr      │
├──────────────────┤     ├──────────────────┤
│ PK: id           │     │ PK: id           │
│ FK: birthdtlid   │     │ FK: birthdtlid   │
│     (NOT NULL)   │     │     (NOT NULL)   │
│                  │     │                  │
│ buildingno       │     │ buildingno       │
│ houseno          │     │ houseno          │
│ streetname       │     │ streetname       │
│ locality         │     │ locality         │
│ tehsil           │     │ tehsil           │
│ district         │     │ district         │
│ city             │     │ city             │
│ state            │     │ state            │
│ pinno            │     │ pinno            │
│ country          │     │ country          │
│                  │     │                  │
│ Audit table:     │     │ Audit table:     │
│ _permaddr_audit  │     │ _presentaddr_aud │
└──────────────────┘     └──────────────────┘
```

---

### Diagram 3: Death Registration Module

```
                    ┌─────────────────────────────────────────┐
                    │         eg_death_dtls                   │
                    │      (Core Death Record)                │
                    ├─────────────────────────────────────────┤
                    │ PK: id                  VARCHAR(64)     │
                    │ UK: registrationno + tenantid           │
                    │ FK: hospitalid → hospitals(id)          │
                    │                                         │
                    │ registrationno          VARCHAR(64)     │
                    │ dateofdeath             TIMESTAMP  ✓    │
                    │ dateofreport            TIMESTAMP       │
                    │ firstname               VARCHAR(200)    │
                    │ middlename              VARCHAR(200)    │
                    │ lastname                VARCHAR(200)    │
                    │ gender                  SMALLINT   ✓    │
                    │ age                     VARCHAR(100)    │
                    │ placeofdeath            VARCHAR(1000)   │
                    │ informantsname          VARCHAR(200)    │
                    │ informantsaddress       VARCHAR(1000)   │
                    │ eidno                   VARCHAR(100)    │
                    │ aadharno                VARCHAR(150)    │
                    │ nationality             VARCHAR(100)    │
                    │ religion                VARCHAR(100)    │
                    │ icdcode                 VARCHAR(300)    │
                    │ tenantid                VARCHAR(50)  ✓  │
                    │ islegacyrecord          BOOLEAN         │
                    │ counter, remarks, audit fields          │
                    │                                         │
                    │ Indexes: tenantid, hospitalid           │
                    └──┬────┬─────┬──────┬───────────────────┘
                       │    │     │      │
       ┌───────────────┘    │     │      └──────────────┐
       │                    │     │                     │
       ▼                    ▼     ▼                     ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ eg_death_    │  │ eg_death_    │  │ eg_death_    │  │ eg_death_    │
│ father_info  │  │ mother_info  │  │ spouse_info  │  │ cert_request │
├──────────────┤  ├──────────────┤  ├──────────────┤  ├──────────────┤
│ PK: id       │  │ PK: id       │  │ PK: id       │  │ PK: id       │
│ FK: death    │  │ FK: death    │  │ FK: death    │  │ FK: death    │
│     dtlid    │  │     dtlid    │  │     dtlid    │  │     dtlid    │
│              │  │              │  │              │  │              │
│ firstname    │  │ firstname    │  │ firstname    │  │ deathcertno  │
│ middlename   │  │ middlename   │  │ middlename   │  │ filestoreid  │
│ lastname     │  │ lastname     │  │ lastname     │  │ status       │
│ aadharno     │  │ aadharno     │  │ aadharno     │  │ embeddedurl  │
│ emailid      │  │ emailid      │  │ emailid      │  │ dateofissue  │
│ mobileno     │  │ mobileno     │  │ mobileno     │  │ source       │
│              │  │              │  │              │  │ additional   │
│ Audit table: │  │ Audit table: │  │ Audit table: │  │   detail     │
│ _father_aud  │  │ _mother_aud  │  │ _spouse_aud  │  │   (JSONB)    │
│              │  │              │  │              │  │              │
│              │  │              │  │              │  │ Audit table: │
│              │  │              │  │              │  │ _cert_aud    │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

       │                    │
       └────────┬───────────┘
                │
    ┌───────────┴───────────┐
    │                       │
    ▼                       ▼
┌──────────────┐      ┌──────────────┐
│ eg_death_    │      │ eg_death_    │
│ permaddr     │      │ presentaddr  │
├──────────────┤      ├──────────────┤
│ PK: id       │      │ PK: id       │
│ FK: death    │      │ FK: death    │
│     dtlid    │      │     dtlid    │
│   (NOT NULL) │      │   (NOT NULL) │
│              │      │              │
│ buildingno   │      │ buildingno   │
│ houseno      │      │ houseno      │
│ streetname   │      │ streetname   │
│ locality     │      │ locality     │
│ tehsil       │      │ tehsil       │
│ district     │      │ district     │
│ city         │      │ city         │
│ state        │      │ state        │
│ pinno        │      │ pinno        │
│ country      │      │ country      │
│              │      │              │
│ Audit table: │      │ Audit table: │
│ _permaddr_aud│      │_presentaddr_a│
└──────────────┘      └──────────────┘
```

---

### Diagram 4: Audit Trail System

```
═══════════════════════════════════════════════════════════
                   AUDIT ARCHITECTURE
═══════════════════════════════════════════════════════════

Every main table has:
  1. Corresponding *_audit table
  2. BEFORE UPDATE/DELETE trigger
  3. Captures OLD row state with operation type and timestamp

┌─────────────────────────────────────────────────────────┐
│  BIRTH AUDIT TABLES          │  DEATH AUDIT TABLES      │
├──────────────────────────────┼──────────────────────────┤
│  eg_birth_dtls_audit         │  eg_death_dtls_audit     │
│  eg_birth_father_info_audit  │  eg_death_father_info_aud│
│  eg_birth_mother_info_audit  │  eg_death_mother_info_aud│
│  eg_birth_permaddr_audit     │  eg_death_permaddr_audit │
│  eg_birth_presentaddr_audit  │  eg_death_presentaddr_aud│
│  eg_birth_cert_request_audit │  eg_death_spouse_info_aud│
│                              │  eg_death_cert_req_audit │
└──────────────────────────────┴──────────────────────────┘

Audit Table Structure:
┌──────────────────────────┐
│ operation   CHAR(1)      │ → 'U' = Update, 'D' = Delete
│ stamp       TIMESTAMP    │ → When change occurred
│ [all original columns]   │ → Snapshot before change
└──────────────────────────┘

Trigger Functions (examples):
• process_eg_birth_dtls_audit()
• process_eg_death_dtls_audit()
• [Similar for all 13 tables]
```

---


## Tables Documentation

### 1. eg_birth_death_hospitals
**Purpose**: Master table storing hospital information where births/deaths are registered.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier for hospital |
| hospitalname | VARCHAR(500) | NOT NULL | Name of the hospital/medical facility |
| tenantid | VARCHAR(50) | NOT NULL | Tenant/jurisdiction identifier for multi-tenancy |

**Relationships**: Referenced by `eg_birth_dtls` and `eg_death_dtls`

---

### 2. eg_birth_dtls
**Purpose**: Core table storing birth registration details.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier for birth record |
| registrationno | VARCHAR(64) | NOT NULL, UNIQUE (with tenantid) | Official birth registration number |
| hospitalname | VARCHAR(500) | | Name of hospital where birth occurred |
| dateofreport | TIMESTAMP | | Date when birth was reported |
| dateofbirth | TIMESTAMP | NOT NULL | Date and time of birth |
| firstname | VARCHAR(200) | | First name of the newborn |
| middlename | VARCHAR(200) | | Middle name of the newborn |
| lastname | VARCHAR(200) | | Last name of the newborn |
| placeofbirth | VARCHAR(1000) | | Location/place where birth occurred |
| informantsname | VARCHAR(200) | | Name of person reporting the birth |
| informantsaddress | VARCHAR(1000) | | Address of the informant |
| gender | SMALLINT | NOT NULL | Gender of newborn (coded value) |
| counter | SMALLINT | | Counter for sequential numbering |
| remarks | VARCHAR(1000) | | Additional remarks or notes |
| hospitalid | VARCHAR(64) | FOREIGN KEY | Reference to hospital in eg_birth_death_hospitals |
| tenantid | VARCHAR(50) | NOT NULL | Tenant/jurisdiction identifier |
| islegacyrecord | BOOLEAN | | Flag indicating if this is a legacy/migrated record |
| createdby | VARCHAR(64) | | User ID who created the record |
| createdtime | BIGINT | | Timestamp (epoch) when record was created |
| lastmodifiedby | VARCHAR(64) | | User ID who last modified the record |
| lastmodifiedtime | BIGINT | | Timestamp (epoch) of last modification |

**Relationships**:
- References: `eg_birth_death_hospitals` (hospitalid)
- Referenced by: `eg_birth_father_info`, `eg_birth_mother_info`, `eg_birth_permaddr`, `eg_birth_presentaddr`, `eg_birth_cert_request`

**Indexes**:
- `idx_eg_birth_dtls_tenantid` on tenantid
- `idx_eg_birth_dtls_hospitalid` on hospitalid

---

### 3. eg_birth_father_info
**Purpose**: Stores father's information for birth registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| firstname | VARCHAR(200) | | Father's first name |
| middlename | VARCHAR(200) | | Father's middle name |
| lastname | VARCHAR(200) | | Father's last name |
| aadharno | VARCHAR(150) | | Father's Aadhar number (national ID) |
| emailid | VARCHAR(300) | | Father's email address |
| mobileno | VARCHAR(150) | | Father's mobile number |
| education | VARCHAR(100) | | Father's education qualification |
| proffession | VARCHAR(100) | | Father's profession/occupation |
| nationality | VARCHAR(100) | | Father's nationality |
| religion | VARCHAR(100) | | Father's religion |
| birthdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to birth record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_birth_dtls` (birthdtlid)

**Indexes**: `idx_eg_birth_father_info_birthdtlid` on birthdtlid

---

### 4. eg_birth_mother_info
**Purpose**: Stores mother's information for birth registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| firstname | VARCHAR(200) | | Mother's first name |
| middlename | VARCHAR(200) | | Mother's middle name |
| lastname | VARCHAR(200) | | Mother's last name |
| aadharno | VARCHAR(150) | | Mother's Aadhar number |
| emailid | VARCHAR(300) | | Mother's email address |
| mobileno | VARCHAR(150) | | Mother's mobile number |
| education | VARCHAR(100) | | Mother's education qualification |
| proffession | VARCHAR(100) | | Mother's profession/occupation |
| nationality | VARCHAR(100) | | Mother's nationality |
| religion | VARCHAR(100) | | Mother's religion |
| birthdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to birth record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_birth_dtls` (birthdtlid)

**Indexes**: `idx_eg_birth_mother_info_birthdtlid` on birthdtlid

---

### 5. eg_birth_permaddr
**Purpose**: Stores permanent address information for birth registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| buildingno | VARCHAR(1000) | | Building number |
| houseno | VARCHAR(1000) | | House number |
| streetname | VARCHAR(1000) | | Street name |
| locality | VARCHAR(1000) | | Locality/neighborhood |
| tehsil | VARCHAR(1000) | | Tehsil/sub-district |
| district | VARCHAR(100) | | District name |
| city | VARCHAR(100) | | City name |
| state | VARCHAR(100) | | State name |
| pinno | VARCHAR(100) | | PIN/postal code |
| country | VARCHAR(100) | | Country name |
| birthdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to birth record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_birth_dtls` (birthdtlid)

**Indexes**: `idx_eg_birth_permaddr_info_birthdtlid` on birthdtlid

---

### 6. eg_birth_presentaddr
**Purpose**: Stores present/current address information for birth registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| buildingno | VARCHAR(1000) | | Building number |
| houseno | VARCHAR(1000) | | House number |
| streetname | VARCHAR(1000) | | Street name |
| locality | VARCHAR(1000) | | Locality/neighborhood |
| tehsil | VARCHAR(1000) | | Tehsil/sub-district |
| district | VARCHAR(100) | | District name |
| city | VARCHAR(100) | | City name |
| state | VARCHAR(100) | | State name |
| pinno | VARCHAR(100) | | PIN/postal code |
| country | VARCHAR(100) | | Country name |
| birthdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to birth record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_birth_dtls` (birthdtlid)

**Indexes**: `idx_eg_birth_presentaddr_birthdtlid` on birthdtlid

---

### 7. eg_birth_cert_request
**Purpose**: Manages birth certificate generation requests and metadata.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier for certificate request |
| birthcertificateno | VARCHAR(25) | | Generated birth certificate number |
| filestoreid | VARCHAR(256) | | File storage reference for generated certificate |
| status | VARCHAR(25) | | Status of certificate (PENDING, ISSUED, etc.) |
| embeddedurl | VARCHAR(64) | | URL for embedded certificate viewing |
| dateofissue | BIGINT | | Date when certificate was issued (epoch) |
| source | VARCHAR(64) | | Source/channel of request (ONLINE, OFFLINE, etc.) |
| additionaldetail | JSONB | | Additional metadata in JSON format |
| birthdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to birth record |
| createdby | VARCHAR(64) | | User who created the request |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_birth_dtls` (birthdtlid)

---

### 8. eg_death_dtls
**Purpose**: Core table storing death registration details.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier for death record |
| registrationno | VARCHAR(64) | NOT NULL, UNIQUE (with tenantid) | Official death registration number |
| hospitalname | VARCHAR(500) | | Name of hospital where death occurred |
| dateofreport | TIMESTAMP | | Date when death was reported |
| dateofdeath | TIMESTAMP | NOT NULL | Date and time of death |
| firstname | VARCHAR(200) | | First name of deceased |
| middlename | VARCHAR(200) | | Middle name of deceased |
| lastname | VARCHAR(200) | | Last name of deceased |
| placeofdeath | VARCHAR(1000) | | Location/place where death occurred |
| informantsname | VARCHAR(200) | | Name of person reporting the death |
| informantsaddress | VARCHAR(1000) | | Address of the informant |
| gender | SMALLINT | NOT NULL | Gender of deceased (coded value) |
| age | VARCHAR(100) | | Age of deceased at time of death |
| counter | SMALLINT | | Counter for sequential numbering |
| remarks | VARCHAR(1000) | | Additional remarks or notes |
| eidno | VARCHAR(100) | | Electronic ID number of deceased |
| aadharno | VARCHAR(150) | | Aadhar number of deceased |
| nationality | VARCHAR(100) | | Nationality of deceased |
| religion | VARCHAR(100) | | Religion of deceased |
| icdcode | VARCHAR(300) | | ICD (International Classification of Diseases) code for cause of death |
| hospitalid | VARCHAR(64) | FOREIGN KEY | Reference to hospital |
| tenantid | VARCHAR(50) | NOT NULL | Tenant/jurisdiction identifier |
| islegacyrecord | BOOLEAN | | Flag indicating if this is a legacy/migrated record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**:
- References: `eg_birth_death_hospitals` (hospitalid)
- Referenced by: `eg_death_father_info`, `eg_death_mother_info`, `eg_death_spouse_info`, `eg_death_permaddr`, `eg_death_presentaddr`, `eg_death_cert_request`

**Indexes**:
- `idx_eg_death_dtls_tenantid` on tenantid
- `idx_eg_death_dtls_hospitalid` on hospitalid

---

### 9. eg_death_father_info
**Purpose**: Stores father's information for death registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| firstname | VARCHAR(200) | | Father's first name |
| middlename | VARCHAR(200) | | Father's middle name |
| lastname | VARCHAR(200) | | Father's last name |
| aadharno | VARCHAR(150) | | Father's Aadhar number |
| emailid | VARCHAR(300) | | Father's email address |
| mobileno | VARCHAR(150) | | Father's mobile number |
| deathdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to death record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_death_dtls` (deathdtlid)

**Indexes**: `idx_eg_death_father_info_deathdtlid` on deathdtlid

---

### 10. eg_death_mother_info
**Purpose**: Stores mother's information for death registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| firstname | VARCHAR(200) | | Mother's first name |
| middlename | VARCHAR(200) | | Mother's middle name |
| lastname | VARCHAR(200) | | Mother's last name |
| aadharno | VARCHAR(150) | | Mother's Aadhar number |
| emailid | VARCHAR(300) | | Mother's email address |
| mobileno | VARCHAR(150) | | Mother's mobile number |
| deathdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to death record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_death_dtls` (deathdtlid)

**Indexes**: `idx_eg_death_mother_info_deathdtlid` on deathdtlid

---

### 11. eg_death_spouse_info
**Purpose**: Stores spouse information for death registrations (for married deceased).

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| firstname | VARCHAR(200) | | Spouse's first name |
| middlename | VARCHAR(200) | | Spouse's middle name |
| lastname | VARCHAR(200) | | Spouse's last name |
| aadharno | VARCHAR(150) | | Spouse's Aadhar number |
| emailid | VARCHAR(300) | | Spouse's email address |
| mobileno | VARCHAR(150) | | Spouse's mobile number |
| deathdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to death record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_death_dtls` (deathdtlid)

**Indexes**: `idx_eg_death_spouse_info_deathdtlid` on deathdtlid

---

### 12. eg_death_permaddr
**Purpose**: Stores permanent address information for death registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| buildingno | VARCHAR(1000) | | Building number |
| houseno | VARCHAR(1000) | | House number |
| streetname | VARCHAR(1000) | | Street name |
| locality | VARCHAR(1000) | | Locality/neighborhood |
| tehsil | VARCHAR(1000) | | Tehsil/sub-district |
| district | VARCHAR(100) | | District name |
| city | VARCHAR(100) | | City name |
| state | VARCHAR(100) | | State name |
| pinno | VARCHAR(100) | | PIN/postal code |
| country | VARCHAR(100) | | Country name |
| deathdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to death record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_death_dtls` (deathdtlid)

**Indexes**: `idx_eg_death_permaddr_info_deathdtlid` on deathdtlid

---

### 13. eg_death_presentaddr
**Purpose**: Stores present/current address information for death registrations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier |
| buildingno | VARCHAR(1000) | | Building number |
| houseno | VARCHAR(1000) | | House number |
| streetname | VARCHAR(1000) | | Street name |
| locality | VARCHAR(1000) | | Locality/neighborhood |
| tehsil | VARCHAR(1000) | | Tehsil/sub-district |
| district | VARCHAR(100) | | District name |
| city | VARCHAR(100) | | City name |
| state | VARCHAR(100) | | State name |
| pinno | VARCHAR(100) | | PIN/postal code |
| country | VARCHAR(100) | | Country name |
| deathdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to death record |
| createdby | VARCHAR(64) | | User who created the record |
| createdtime | BIGINT | | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_death_dtls` (deathdtlid)

**Indexes**: `idx_eg_death_presentaddr_deathdtlid` on deathdtlid

---

### 14. eg_death_cert_request
**Purpose**: Manages death certificate generation requests and metadata.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY | Unique identifier for certificate request |
| deathcertificateno | VARCHAR(25) | NOT NULL | Generated death certificate number |
| filestoreid | VARCHAR(256) | | File storage reference for generated certificate |
| status | VARCHAR(25) | | Status of certificate (PENDING, ISSUED, etc.) |
| embeddedurl | VARCHAR(64) | | URL for embedded certificate viewing |
| dateofissue | BIGINT | | Date when certificate was issued (epoch) |
| source | VARCHAR(64) | | Source/channel of request (ONLINE, OFFLINE, etc.) |
| additionaldetail | JSONB | | Additional metadata in JSON format |
| deathdtlid | VARCHAR(64) | NOT NULL, FOREIGN KEY | Reference to death record |
| createdby | VARCHAR(64) | NOT NULL | User who created the request |
| createdtime | BIGINT | NOT NULL | Creation timestamp (epoch) |
| lastmodifiedby | VARCHAR(64) | | User who last modified |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Relationships**: References `eg_death_dtls` (deathdtlid)
