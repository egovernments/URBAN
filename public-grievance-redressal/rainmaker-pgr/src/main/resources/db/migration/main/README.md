# Public Grievance Redressal (PGR) Database Schema Documentation

## Overview

This database schema supports a Public Grievance Redressal (PGR) system that enables citizens to register complaints/service requests, track their progress, and provide feedback. The system maintains two parallel schemas (legacy and current) with comprehensive audit trails and action workflows.

---

## Entity Relationship Diagram

### SCHEMA 1: LEGACY PGR SYSTEM

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                          eg_pgr_serviceReq (MAIN TABLE)                        │
├────────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY KEY: (tenantId, serviceRequestId)                                      │
├────────────────────────────────────────────────────────────────────────────────┤
│  Column Name         │  Data Type       │  Constraints                         │
├──────────────────────┼──────────────────┼──────────────────────────────────────┤
│  tenantId            │  varchar(256)    │  PK, NOT NULL                        │
│  serviceRequestId    │  varchar(256)    │  PK, NOT NULL                        │
│  serviceCode         │  varchar(256)    │  NOT NULL                            │
│  description         │  varchar(4000)   │  NOT NULL                            │
│  lat                 │  numeric(9,6)    │  Nullable                            │
│  long                │  numeric(10,7)   │  Nullable                            │
│  address             │  varchar(1024)   │  Nullable                            │
│  addressId           │  varchar(256)    │  Nullable                            │
│  email               │  varchar(254)    │  Nullable                            │
│  deviceId            │  varchar(256)    │  Nullable                            │
│  accountId           │  varchar(256)    │  Nullable                            │
│  firstName           │  varchar(128)    │  Nullable                            │
│  lastName            │  varchar(128)    │  Nullable                            │
│  phone               │  varchar(64)     │  NOT NULL                            │
│  attributes          │  JSONB           │  Nullable                            │
│  status              │  varchar(64)     │  Nullable                            │
│  assignedTo          │  varchar(256)    │  Nullable                            │
│  source              │  varchar(256)    │  Nullable                            │
│  expectedTime        │  bigint          │  Nullable                            │
│  createdby           │  varchar(256)    │  NOT NULL                            │
│  createdtime         │  bigint          │  NOT NULL                            │
│  lastmodifiedby      │  varchar(256)    │  Nullable                            │
│  lastmodifiedtime    │  bigint          │  Nullable                            │
└───────────┬──────────────────────────────────┬────────────────────────────────┬┘
            │                                  │                                │
            │                                  │                                │
            │ (1)                              │ (1)                            │ (1)
            │                                  │                                │
            │ Relationship: ONE-TO-MANY        │ Relationship: ONE-TO-MANY      │ Relationship: ONE-TO-MANY
            │                                  │                                │
            │ (N)                              │ (N)                            │ (N)
            │                                  │                                │──────────────┐
┌───────────▼─────────────────────┐  ┌─────────▼──────────────────────────────┐    ┌───────────▼─────────────────────────────────────────────────────────────────┐
│       eg_pgr_media              │  │         eg_pgr_comment                 │    │                      eg_pgr_servicereq_audit (AUDIT LOG)                    │
├─────────────────────────────────┤  ├────────────────────────────────────────┤    ├─────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY KEY: (id, tenantId)     │  │ PRIMARY KEY: (id, tenantId)            │    │ PRIMARY KEY: (id, tenantId)                                                 │
│ FOREIGN KEY: (tenantId,         │  │ FOREIGN KEY: (tenantId,                │    │ FOREIGN KEY: (servicerequestid, tenantid) REFERENCES eg_pgr_servicereq      │
│  serviceRequestId) REFERENCES   │  │  serviceRequestId) REFERENCES          │    ├─────────────────────────────────────────────────────────────────────────────┤
│  eg_pgr_serviceReq              │  │  eg_pgr_serviceReq                     │    │  Column Name         │  Data Type       │  Constraints                      │
├─────────────────────────────────┤  ├────────────────────────────────────────┤    ├──────────────────────┼──────────────────┼───────────────────────────────────┤
│  id           │ varchar(256) PK │  │  id           │ varchar(256) PK        │    │  id                  │  SERIAL          │  PK, Auto-increment               │
│  tenantId     │ varchar(256) PK │  │  tenantId     │ varchar(256) PK        │    │  tenantid            │  varchar(256)    │  PK, NOT NULL                     │
│  serviceReq.. │ varchar(256) FK │  │  serviceReq.. │ varchar(256) FK        │    │  servicerequestid    │  varchar(256)    │  FK, Nullable                     │
│  by           │ varchar(256)    │  │  by           │ varchar(256) NOT NULL  │    │  servicecode         │  varchar(256)    │  Nullable                         │
│  when         │ bigint NOT NULL │  │  when         │ bigint NOT NULL        │    │  description         │  varchar(4000)   │  NOT NULL                         │
│  url          │ varchar(2048)   │  │  message      │ varchar(4000) NOT NULL │    │  lat                 │  numeric(9,6)    │  Nullable                         │
│               │ NOT NULL        │  │  isInternal   │ boolean NOT NULL       │    │  long                │  numeric(10,7)   │  Nullable                         │
└─────────────────────────────────┘  └────────────────────────────────────────┘    │  address             │  varchar(1024)   │  Nullable                         │
                                                                                   │  addressid           │  varchar(256)    │  Nullable                         │
                                                                                   │  email               │  varchar(254)    │  Nullable                         │
                                                                                   │  deviceid            │  varchar(256)    │  Nullable                         │
                                                                                   │  accountid           │  varchar(256)    │  Nullable                         │
                                                                                   │  firstname           │  varchar(128)    │  Nullable                         │
                                                                                   │  lastname            │  varchar(128)    │  Nullable                         │
                                                                                   │  phone               │  varchar(64)     │  NOT NULL                         │
                                                                                   │  attributes          │  jsonb           │  Nullable                         │
                                                                                   │  status              │  varchar(64)     │  Nullable                         │
                                                                                   │  assignedto          │  varchar(256)    │  Nullable                         │
                                                                                   │  source              │  varchar(256)    │  Nullable                         │
                                                                                   │  expectedtime        │  bigint          │  Nullable                         │
                                                                                   │  createdby           │  varchar(256)    │  Nullable                         │
                                                                                   │  createdtime         │  bigint          │  Nullable                         │
                                                                                   │  auditcreatedtime    │  bigint          │  NOT NULL                         │
                                                                                   └─────────────────────────────────────────────────────────────────────────────┘
```

---

### SCHEMA 2: CURRENT PGR SYSTEM

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         eg_pgr_service (MAIN TABLE)                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY KEY: (tenantid, servicerequestid)                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Column Name         │  Data Type       │  Constraints & Notes                  │
├──────────────────────┼──────────────────┼───────────────────────────────────────┤
│  tenantid            │  varchar(64)     │  PK, NOT NULL                         │
│  servicerequestid    │  varchar(64)     │  PK, NOT NULL                         │
│  servicecode         │  varchar(64)     │  NOT NULL                             │
│  description         │  varchar(500)    │  Nullable (V20180416133458)           │
│  lat                 │  numeric(9,6)    │  Nullable                             │
│  long                │  numeric(10,7)   │  Nullable                             │
│  address             │  varchar(256)    │  Nullable                             │
│  addressid           │  varchar(64)     │  Nullable (→ eg_pgr_address.uuid)     │
│  email               │  varchar(256)    │  Nullable                             │
│  deviceid            │  varchar(64)     │  Nullable                             │
│  accountid           │  varchar(64)     │  Nullable                             │
│  firstname           │  varchar(32)     │  Nullable                             │
│  lastname            │  varchar(64)     │  Nullable                             │
│  phone               │  varchar(64)     │  NOT NULL                             │
│  attributes          │  jsonb           │  Nullable                             │
│  status              │  varchar(64)     │  Nullable                             │
│  source              │  varchar(64)     │  Nullable                             │
│  expectedtime        │  bigint          │  Nullable                             │
│  feedback            │  varchar(500)    │  Nullable                             │
│  rating              │  varchar(5)      │  Nullable                             │
│  landmark            │  varchar(2000)   │  Nullable (Added V20180405225059)     │
│  active              │  boolean         │  DEFAULT true (Added V20181105170754) │
│  createdby           │  varchar(256)    │  NOT NULL                             │
│  createdtime         │  bigint          │  NOT NULL                             │
│  lastmodifiedby      │  varchar(256)    │  Nullable                             │
│  lastmodifiedtime    │  bigint          │  Nullable                             │
└────────┬──────────────────────────────────────────────────────────────────────────┘
         │ (1)
         │
         │ Relationship: ONE-TO-MANY
         │ (businesskey = servicerequestid)
         │
         │ (N)
         │
┌────────▼─────────────────────────────────────────────────────────────────────────┐
│                            eg_pgr_action (WORKFLOW)                              │
├──────────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY KEY: (uuid, tenantid) - Changed in V20180322161059                      │
├──────────────────────────────────────────────────────────────────────────────────┤
│  Column Name     │  Data Type       │  Constraints & Notes                       │
├──────────────────┼──────────────────┼────────────────────────────────────────────┤
│  uuid            │  varchar(60)     │  PK (Resized V20180405163059: 500→60)      │
│  tenantid        │  varchar(256)    │  PK, NOT NULL                              │
│  businesskey     │  varchar(500)    │  NOT NULL, INDEXED (servicerequestid_idx)  │
│  by              │  varchar(256)    │  Nullable                                  │
│  when            │  bigint          │  NOT NULL, INDEXED (when_idx)              │
│  isinternal      │  boolean         │  Nullable                                  │
│  status          │  varchar(64)     │  Nullable                                  │
│  assignee        │  varchar(256)    │  Nullable                                  │
│  action          │  varchar(64)     │  Nullable, INDEXED (action_idx)            │
│                  │                  │  (Added V20180405225059)                   │
│  media           │  JSONB           │  Nullable                                  │
│  comments        │  varchar(1024)   │  Nullable                                  │
├──────────────────┴──────────────────┴────────────────────────────────────────────┤
│ INDEXES (Added V20190204133020):                                                │
│  • when_idx         → CREATE INDEX when_idx ON eg_pgr_action ("when")           │
│  • action_idx       → CREATE INDEX action_idx ON eg_pgr_action ("action")       │
│  • servicereq.._idx → CREATE INDEX servicerequestid_idx ON eg_pgr_action (...)) │
└──────────────────────────────────────────────────────────────────────────────────┘

                                ┌─────────────────────────────────┐
                                │ Logical Reference (Optional)    │
                                │ eg_pgr_service.addressid        │
                                │          ↓                      │
                                │ eg_pgr_address.uuid             │
                                └─────────────────────────────────┘
                                              │
                                              │ (N:1)
                                              │
┌─────────────────────────────────────────────▼─────────────────────────────────────┐
│                         eg_pgr_address (ADDRESS MASTER)                           │
├───────────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY KEY: (tenantid, uuid)                                                     │
│ Created in V20181102160704                                                        │
├───────────────────────────────────────────────────────────────────────────────────┤
│  Column Name            │  Data Type       │  Constraints & Notes                │
├─────────────────────────┼──────────────────┼─────────────────────────────────────┤
│  uuid                   │  varchar(256)    │  PK, NOT NULL                       │
│  tenantid               │  varchar(256)    │  PK, NOT NULL                       │
│  housenoandstreetname   │  varchar(512)    │  Nullable (Expanded V20181104130032)│
│  mohalla                │  varchar(256)    │  Nullable                           │
│  landmark               │  varchar(256)    │  Nullable                           │
│  latitude               │  numeric(9,6)    │  Nullable                           │
│  longitude              │  numeric(10,7)   │  Nullable                           │
│  city                   │  varchar(256)    │  Nullable                           │
│  createdby              │  varchar(256)    │  NOT NULL                           │
│  createdtime            │  bigint          │  NOT NULL                           │
│  lastmodifiedby         │  varchar(256)    │  Nullable                           │
│  lastmodifiedtime       │  bigint          │  Nullable                           │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

### SUPPORTING TABLES

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                    eg_pgr_migration_audit (MIGRATION TRACKING)                │
├───────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY KEY: (tenantId)                                                       │
│ Created in V20200914103335                                                    │
├───────────────────────────────────────────────────────────────────────────────┤
│  Column Name     │  Data Type       │  Constraints & Notes                    │
├──────────────────┼──────────────────┼─────────────────────────────────────────┤
│  tenantId        │  varchar(256)    │  PK, NOT NULL                           │
│  currentOffset   │  INT             │  Nullable                               │
├──────────────────┴──────────────────┴─────────────────────────────────────────┤
│ Purpose: Tracks the progress of data migration between schema versions        │
└───────────────────────────────────────────────────────────────────────────────┘
```

---



## Table Definitions (Detailed)

### 1. eg_pgr_serviceReq (Legacy Service Request Table)

**Purpose**: Legacy table for storing citizen grievance/service requests with complete details.

**Created**: V20180305141940 (Initial DDL)

**Sequence**: Uses `seq_eg_pgr_serviceRequestId` for ID generation

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| tenantId | varchar(256) | PK, NOT NULL | Tenant/City identifier for multi-tenant architecture |
| serviceRequestId | varchar(256) | PK, NOT NULL | Unique identifier for the service request |
| serviceCode | varchar(256) | NOT NULL | Type/category of service requested (e.g., WATER_COMPLAINT, ROAD_REPAIR) |
| description | varchar(4000) | NOT NULL | Detailed description of the grievance/request from citizen |
| lat | numeric(9,6) | Nullable | Latitude coordinate of the complaint location |
| long | numeric(10,7) | Nullable | Longitude coordinate of the complaint location |
| address | varchar(1024) | Nullable | Human-readable textual address of the complaint location |
| addressId | varchar(256) | Nullable | Reference to address master data |
| email | varchar(254) | Nullable | Email address of the complainant for notifications |
| deviceId | varchar(256) | Nullable | Device identifier from which request was submitted (for analytics) |
| accountId | varchar(256) | Nullable | User account identifier if registered user |
| firstName | varchar(128) | Nullable | First name of the complainant |
| lastName | varchar(128) | Nullable | Last name of the complainant |
| phone | varchar(64) | NOT NULL | Contact phone number of the complainant (mandatory for communication) |
| attributes | JSONB | Nullable | Additional flexible attributes stored as JSON (custom fields) |
| status | varchar(64) | Nullable | Current status of the request (OPEN, IN_PROGRESS, RESOLVED, CLOSED, REJECTED) |
| assignedTo | varchar(256) | Nullable | User ID or department to whom the request is currently assigned |
| source | varchar(256) | Nullable | Channel through which request was submitted (WEB, MOBILE, CALL_CENTER, WHATSAPP) |
| expectedTime | bigint | Nullable | Expected resolution time in epoch milliseconds |
| createdby | varchar(256) | NOT NULL | User ID who created the record |
| createdtime | bigint | NOT NULL | Creation timestamp in epoch milliseconds |
| lastmodifiedby | varchar(256) | Nullable | User ID who last modified the record |
| lastmodifiedtime | bigint | Nullable | Last modification timestamp in epoch milliseconds |

**Primary Key**: `CONSTRAINT pk_eg_pgr_serviceReq PRIMARY KEY (tenantId, serviceRequestId)`

---

### 2. eg_pgr_media

**Purpose**: Stores media attachments (photos, videos, documents) related to service requests as evidence or additional information.

**Created**: V20180305141940

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(256) | PK, NOT NULL | Unique identifier for the media record |
| tenantId | varchar(256) | PK, FK, NOT NULL | Tenant identifier |
| serviceRequestId | varchar(256) | FK, NOT NULL | Reference to the parent service request |
| by | varchar(256) | NOT NULL | User ID who uploaded the media (citizen or official) |
| when | bigint | NOT NULL | Upload timestamp in epoch milliseconds |
| url | varchar(2048) | NOT NULL | URL/path to the stored media file (S3, file system, CDN) |

**Primary Key**: `CONSTRAINT pk_eg_pgr_media PRIMARY KEY (id, tenantId)`

**Foreign Key**: `CONSTRAINT fk_eg_pgr_media FOREIGN KEY (tenantId, serviceRequestId) REFERENCES eg_pgr_serviceReq(tenantId, serviceRequestId)`

---

### 3. eg_pgr_comment

**Purpose**: Stores comments/notes added to service requests by citizens or officials for communication and updates.

**Created**: V20180305141940

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(256) | PK, NOT NULL | Unique identifier for the comment |
| tenantId | varchar(256) | PK, FK, NOT NULL | Tenant identifier |
| serviceRequestId | varchar(256) | FK, NOT NULL | Reference to the parent service request |
| by | varchar(256) | NOT NULL | User ID who added the comment |
| when | bigint | NOT NULL | Comment timestamp in epoch milliseconds |
| message | varchar(4000) | NOT NULL | The comment text/message content |
| isInternal | boolean | NOT NULL | Flag indicating if comment is internal (visible only to officials) or public (visible to citizen) |

**Primary Key**: `CONSTRAINT pk_eg_pgr_comments PRIMARY KEY (id, tenantId)`

**Foreign Key**: `CONSTRAINT fk_eg_pgr_media FOREIGN KEY (tenantId, serviceRequestId) REFERENCES eg_pgr_serviceReq(tenantId, serviceRequestId)`

---

### 4. eg_pgr_servicereq_audit

**Purpose**: Audit log table that captures historical snapshots of all changes made to service requests for compliance and tracking.

**Created**: V20180305141940

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | SERIAL | PK, Auto-increment | Auto-incrementing audit record identifier |
| tenantid | varchar(256) | PK, NOT NULL | Tenant identifier |
| servicerequestid | varchar(256) | FK, Nullable | Reference to the service request being audited |
| servicecode | varchar(256) | Nullable | Service type code at time of audit snapshot |
| description | varchar(4000) | NOT NULL | Description at time of audit snapshot |
| lat | numeric(9,6) | Nullable | Latitude at time of audit snapshot |
| long | numeric(10,7) | Nullable | Longitude at time of audit snapshot |
| address | varchar(1024) | Nullable | Address at time of audit snapshot |
| addressid | varchar(256) | Nullable | Address ID at time of audit snapshot |
| email | varchar(254) | Nullable | Email at time of audit snapshot |
| deviceid | varchar(256) | Nullable | Device ID at time of audit snapshot |
| accountid | varchar(256) | Nullable | Account ID at time of audit snapshot |
| firstname | varchar(128) | Nullable | First name at time of audit snapshot |
| lastname | varchar(128) | Nullable | Last name at time of audit snapshot |
| phone | varchar(64) | NOT NULL | Phone number at time of audit snapshot |
| attributes | jsonb | Nullable | Attributes at time of audit snapshot |
| status | varchar(64) | Nullable | Status at time of audit snapshot |
| assignedto | varchar(256) | Nullable | Assignment at time of audit snapshot |
| source | varchar(256) | Nullable | Source at time of audit snapshot |
| expectedtime | bigint | Nullable | Expected time at time of audit snapshot |
| createdby | varchar(256) | Nullable | Original creator of the service request |
| createdtime | bigint | Nullable | Original creation time of the service request |
| auditcreatedtime | bigint | NOT NULL | When this audit record/snapshot was created |

**Primary Key**: `CONSTRAINT pk_eg_pgr_servicereq_audit PRIMARY KEY (id, tenantId)`

**Foreign Key**: `CONSTRAINT fk_eg_pgr_servicereq_audit FOREIGN KEY (servicerequestid, tenantid) REFERENCES eg_pgr_servicereq(servicerequestid, tenantid)`

---

### 5. eg_pgr_service (Current Service Request Table)

**Purpose**: Current/active table for storing citizen grievance/service requests with enhanced features like feedback, rating, and landmarks.

**Created**: V20180322002941

**Evolution**:
- V20180405225059: Added `landmark` column
- V20180416133458: Made `description` nullable
- V20181105170754: Added `active` column for soft deletes

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| tenantid | varchar(64) | PK, NOT NULL | Tenant/City identifier |
| servicerequestid | varchar(64) | PK, NOT NULL | Unique identifier for the service request |
| servicecode | varchar(64) | NOT NULL | Service type/category code |
| description | varchar(500) | Nullable | Description of the grievance (made nullable in V20180416133458) |
| lat | numeric(9,6) | Nullable | Latitude coordinate |
| long | numeric(10,7) | Nullable | Longitude coordinate |
| address | varchar(256) | Nullable | Textual address |
| addressid | varchar(64) | Nullable | Reference to eg_pgr_address.uuid |
| email | varchar(256) | Nullable | Complainant email |
| deviceid | varchar(64) | Nullable | Device identifier |
| accountid | varchar(64) | Nullable | User account identifier |
| firstname | varchar(32) | Nullable | Complainant first name |
| lastname | varchar(64) | Nullable | Complainant last name |
| phone | varchar(64) | NOT NULL | Contact phone number |
| attributes | jsonb | Nullable | Additional flexible attributes as JSON |
| status | varchar(64) | Nullable | Current status of request |
| source | varchar(64) | Nullable | Channel of submission |
| expectedtime | bigint | Nullable | Expected resolution time |
| feedback | varchar(500) | Nullable | Citizen feedback after resolution |
| rating | varchar(5) | Nullable | Citizen rating (1-5 stars) |
| landmark | varchar(2000) | Nullable | Nearby landmark for location identification (Added V20180405225059) |
| active | boolean | DEFAULT true | Flag to soft-delete records without physical deletion (Added V20181105170754) |
| createdby | varchar(256) | NOT NULL | Record creator |
| createdtime | bigint | NOT NULL | Creation timestamp |
| lastmodifiedby | varchar(256) | Nullable | Last modifier |
| lastmodifiedtime | bigint | Nullable | Last modification timestamp |

**Primary Key**: `CONSTRAINT pk_eg_pgr_service PRIMARY KEY (tenantid, servicerequestid)`

---

### 6. eg_pgr_action

**Purpose**: Tracks workflow actions and state transitions for service requests (assignment, status changes, escalations, resolution).

**Created**: V20180322002941

**Evolution**:
- V20180322161059: Changed primary key from `(tenantid, businesskey)` to `(uuid, tenantid)`
- V20180405163059: Reduced uuid size from varchar(500) to varchar(60)
- V20180405225059: Added `action` column
- V20190204133020: Added indexes on `when`, `action`, and `businesskey`

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| uuid | varchar(60) | PK, NOT NULL | Unique identifier for the action (resized from 500 to 60) |
| tenantid | varchar(256) | PK, NOT NULL | Tenant identifier |
| businesskey | varchar(500) | NOT NULL, Indexed | Reference to servicerequestid (logical FK) |
| by | varchar(256) | Nullable | User who performed the action |
| when | bigint | NOT NULL, Indexed | Action timestamp in epoch milliseconds |
| isinternal | boolean | Nullable | Whether action is internal/not visible to citizen |
| status | varchar(64) | Nullable | Status after the action was performed |
| assignee | varchar(256) | Nullable | User/department assigned after action |
| action | varchar(64) | Indexed | Type of action performed (ASSIGN, REASSIGN, RESOLVE, REOPEN, COMMENT, ESCALATE) - Added V20180405225059 |
| media | JSONB | Nullable | Media files attached with this action |
| comments | varchar(1024) | Nullable | Comments added with this action |

**Primary Key**: `ALTER TABLE eg_pgr_action DROP CONSTRAINT pk_eg_pgr_action, ADD CONSTRAINT pk_eg_pgr_action PRIMARY KEY (uuid, tenantid)` (Changed in V20180322161059)

**Indexes** (Added V20190204133020):
- `CREATE INDEX when_idx ON eg_pgr_action ("when")`
- `CREATE INDEX action_idx ON eg_pgr_action ("action")`
- `CREATE INDEX servicerequestid_idx ON eg_pgr_action ("businesskey")`

---

### 7. eg_pgr_address

**Purpose**: Stores structured, detailed address information for service requests to enable better location management and analytics.

**Created**: V20181102160704

**Evolution**:
- V20181104130032: Expanded `housenoandstreetname` from varchar(32) to varchar(512)

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| uuid | varchar(256) | PK, NOT NULL | Unique identifier for the address |
| tenantid | varchar(256) | PK, NOT NULL | Tenant identifier |
| housenoandstreetname | varchar(512) | Nullable | House/building number and street name (expanded from 32 to 512) |
| mohalla | varchar(256) | Nullable | Locality/ward/neighborhood name |
| landmark | varchar(256) | Nullable | Nearby landmark for easier location identification |
| latitude | numeric(9,6) | Nullable | Latitude coordinate |
| longitude | numeric(10,7) | Nullable | Longitude coordinate |
| city | varchar(256) | Nullable | City name |
| createdby | varchar(256) | NOT NULL | Record creator |
| createdtime | bigint | NOT NULL | Creation timestamp |
| lastmodifiedby | varchar(256) | Nullable | Last modifier |
| lastmodifiedtime | bigint | Nullable | Last modification timestamp |

**Primary Key**: `CONSTRAINT pk_eg_pgr_address PRIMARY KEY (tenantId, uuid)`

---

### 8. eg_pgr_migration_audit

**Purpose**: Tracks progress of data migration processes between schema versions to enable resumable migrations.

**Created**: V20200914103335

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| tenantId | varchar(256) | PK, NOT NULL | Tenant identifier |
| currentOffset | INT | Nullable | Current offset/position in migration process (for pagination/batching) |

**Primary Key**: `CONSTRAINT pk_eg_pgr_migration_audit PRIMARY KEY (tenantId)`

---

