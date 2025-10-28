# Sewerage Connection Database Schema Documentation

## Overview
This document describes the database schema for the Sewerage Connection Management System. The system manages sewerage connections, applications, service details, plumber information, documents, and audit trails.

## Database Tables

### 1. eg_sw_connection
**Purpose**: Main table for storing sewerage connection information and applications.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY, NOT NULL | Unique identifier for the connection |
| property_id | VARCHAR(64) | NOT NULL | Reference to the property for this connection |
| tenantid | VARCHAR(250) | NOT NULL, INDEXED | Tenant/city identifier for multi-tenancy |
| applicationno | VARCHAR(64) | INDEXED | Unique application number |
| applicationstatus | VARCHAR(256) | INDEXED | Current status of the application (e.g., PENDING, APPROVED) |
| status | VARCHAR(64) | NOT NULL | Connection status (e.g., ACTIVE, INACTIVE, DISCONNECTED) |
| connectionno | VARCHAR(256) | INDEXED | Unique connection number after approval |
| oldconnectionno | VARCHAR(64) | INDEXED | Legacy/old connection number if migrated |
| roadCuttingArea | FLOAT | | Area of road cutting in square units |
| action | VARCHAR(64) | | Action to be performed or last action taken |
| roadType | VARCHAR(32) | | Type of road (e.g., PAVED, UNPAVED) |
| adhocrebate | NUMERIC(12,2) | | Ad-hoc rebate amount applied |
| adhocpenalty | NUMERIC(12,2) | | Ad-hoc penalty amount applied |
| adhocpenaltyreason | VARCHAR(1024) | | Reason for applying ad-hoc penalty |
| adhocpenaltycomment | VARCHAR(1024) | | Additional comments on penalty |
| adhocrebatereason | VARCHAR(1024) | | Reason for applying ad-hoc rebate |
| adhocrebatecomment | VARCHAR(1024) | | Additional comments on rebate |
| locality | VARCHAR(64) | | Locality/area code of the connection |
| applicationType | VARCHAR(64) | | Type of application (e.g., NEW, MODIFY, DISCONNECT) |
| dateEffectiveFrom | BIGINT | | Effective date for the connection (epoch timestamp) |
| isoldapplication | BOOLEAN | DEFAULT FALSE | Flag indicating if this is a migrated old application |
| additionaldetails | JSONB | | JSON field for storing additional flexible data |
| channel | VARCHAR(128) | DEFAULT 'SYSTEM' | Channel through which application was created (e.g., SYSTEM, CITIZEN, CSC) |
| isDisconnectionTemporary | BOOLEAN | DEFAULT FALSE | Flag indicating if disconnection is temporary |
| disconnectionReason | VARCHAR(1024) | | Reason for connection disconnection |
| createdBy | VARCHAR(64) | | User ID who created the record |
| lastModifiedBy | VARCHAR(64) | | User ID who last modified the record |
| createdTime | BIGINT | | Record creation timestamp (epoch milliseconds) |
| lastModifiedTime | BIGINT | | Last modification timestamp (epoch milliseconds) |

**Indexes**: tenantid, applicationNo, connectionNo, oldConnectionNo, property_id, applicationstatus

---

### 2. eg_sw_connection_audit
**Purpose**: Audit trail table for tracking all changes to sewerage connections.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | VARCHAR(64) | Connection ID being audited |
| property_id | VARCHAR(64) | Property reference |
| tenantid | VARCHAR(250) | Tenant identifier |
| applicationno | VARCHAR(64) | Application number |
| applicationstatus | VARCHAR(256) | Application status snapshot |
| status | VARCHAR(64) | Connection status snapshot |
| connectionno | VARCHAR(256) | Connection number |
| oldconnectionno | VARCHAR(64) | Old connection number |
| roadCuttingArea | FLOAT | Road cutting area |
| action | VARCHAR(64) | Action performed |
| roadType | VARCHAR(32) | Road type |
| adhocrebate | NUMERIC(12,2) | Rebate amount |
| adhocpenalty | NUMERIC(12,2) | Penalty amount |
| adhocpenaltyreason | VARCHAR(1024) | Penalty reason |
| adhocpenaltycomment | VARCHAR(1024) | Penalty comments |
| adhocrebatereason | VARCHAR(1024) | Rebate reason |
| adhocrebatecomment | VARCHAR(1024) | Rebate comments |
| locality | VARCHAR(64) | Locality code |
| applicationType | VARCHAR(64) | Application type |
| dateEffectiveFrom | BIGINT | Effective date |
| isoldapplication | BOOLEAN | Old application flag |
| additionaldetails | JSONB | Additional data in JSON format |
| channel | VARCHAR(128) | Application channel |
| isDisconnectionTemporary | BOOLEAN | Temporary disconnection flag |
| disconnectionReason | VARCHAR(1024) | Disconnection reason |
| createdBy | VARCHAR(64) | Creator user ID |
| lastModifiedBy | VARCHAR(64) | Last modifier user ID |
| createdTime | BIGINT | Creation timestamp |
| lastModifiedTime | BIGINT | Last modification timestamp |

**Indexes**: tenantid, applicationNo, connectionNo, oldConnectionNo, property_id, applicationstatus

**Note**: This table does not have a primary key as it stores historical snapshots of all changes.

---

### 3. eg_sw_service
**Purpose**: Stores service-specific details for each sewerage connection.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| connection_id | VARCHAR(64) | FOREIGN KEY → eg_sw_connection(id), NOT NULL | Reference to the main connection |
| connectionExecutionDate | BIGINT | | Date when connection was physically executed (epoch timestamp) |
| noOfWaterClosets | INTEGER | | Current number of water closets/toilets |
| noOfToilets | INTEGER | | Current number of toilets |
| connectiontype | VARCHAR(32) | | Type of connection (e.g., RESIDENTIAL, COMMERCIAL) |
| proposedWaterClosets | INTEGER | | Proposed number of water closets (for new applications) |
| proposedToilets | INTEGER | | Proposed number of toilets (for new applications) |
| appCreatedDate | BIGINT | INDEXED | Application creation date (epoch timestamp) |
| detailsprovidedby | VARCHAR(256) | | Person/role who provided the details |
| estimationfileStoreId | VARCHAR(256) | | File store ID for estimation document |
| sanctionfileStoreId | VARCHAR(256) | | File store ID for sanction document |
| disconnectionExecutionDate | BIGINT | | Date when disconnection was executed (epoch timestamp) |
| createdBy | VARCHAR(64) | | User ID who created the record |
| lastModifiedBy | VARCHAR(64) | | User ID who last modified the record |
| createdTime | BIGINT | | Record creation timestamp |
| lastModifiedTime | BIGINT | | Last modification timestamp |
| estimationLetterDate | BIGINT | | Date of estimation letter |

**Foreign Key**: connection_id → eg_sw_connection(id) (CASCADE on UPDATE and DELETE)

**Indexes**: appCreatedDate

---

### 4. eg_sw_service_audit
**Purpose**: Audit trail for service details changes.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| connection_id | VARCHAR(64) | Connection reference |
| connectionExecutionDate | BIGINT | Connection execution date |
| noOfWaterClosets | INTEGER | Number of water closets |
| noOfToilets | INTEGER | Number of toilets |
| connectiontype | VARCHAR(32) | Connection type |
| proposedWaterClosets | INTEGER | Proposed water closets |
| proposedToilets | INTEGER | Proposed toilets |
| appCreatedDate | BIGINT | Application created date |
| detailsprovidedby | VARCHAR(256) | Details provider |
| estimationfileStoreId | VARCHAR(256) | Estimation file reference |
| sanctionfileStoreId | VARCHAR(256) | Sanction file reference |
| disconnectionExecutionDate | BIGINT | Disconnection execution date |
| createdBy | VARCHAR(64) | Creator user ID |
| lastModifiedBy | VARCHAR(64) | Last modifier user ID |
| createdTime | BIGINT | Creation timestamp |
| lastModifiedTime | BIGINT | Last modification timestamp |
| estimationLetterDate | BIGINT | Estimation letter date |

**Indexes**: appCreatedDate

---

### 5. eg_sw_connectionholder
**Purpose**: Stores information about connection holders/owners.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| tenantId | VARCHAR(256) | | Tenant identifier |
| connectionid | VARCHAR(128) | FOREIGN KEY → eg_sw_connection(id), UNIQUE, NOT NULL | Reference to connection |
| status | VARCHAR(128) | | Status of the holder (e.g., ACTIVE, INACTIVE) |
| userid | VARCHAR(128) | INDEXED | User ID of the connection holder |
| isprimaryholder | BOOLEAN | | Flag indicating if this is the primary holder |
| connectionholdertype | VARCHAR(256) | | Type of holder (e.g., OWNER, TENANT) |
| holdershippercentage | VARCHAR(128) | | Percentage of ownership |
| relationship | VARCHAR(128) | | Relationship type |
| createdby | VARCHAR(128) | | Creator user ID |
| createdtime | BIGINT | | Creation timestamp |
| lastmodifiedby | VARCHAR(128) | | Last modifier user ID |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Foreign Key**: connectionid → eg_sw_connection(id)

**Indexes**: userid

---

### 6. eg_sw_plumberinfo
**Purpose**: Stores information about plumbers associated with connections.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(256) | PRIMARY KEY, NOT NULL | Unique identifier for plumber info |
| name | VARCHAR(256) | | Name of the plumber |
| licenseno | VARCHAR(256) | | Plumber license number |
| mobilenumber | VARCHAR(256) | | Plumber contact number |
| gender | VARCHAR(256) | | Gender of the plumber |
| fatherorhusbandname | VARCHAR(256) | | Father's or husband's name |
| correspondenceaddress | VARCHAR(1024) | | Correspondence address |
| relationship | VARCHAR(256) | | Relationship type |
| swid | VARCHAR(64) | FOREIGN KEY → eg_sw_connection(id) | Reference to sewerage connection |
| tenantid | VARCHAR(64) | | Tenant identifier |
| createdBy | VARCHAR(64) | | Creator user ID |
| lastModifiedBy | VARCHAR(64) | | Last modifier user ID |
| createdTime | BIGINT | | Creation timestamp |
| lastModifiedTime | BIGINT | | Last modification timestamp |

**Foreign Key**: swid → eg_sw_connection(id) (CASCADE on UPDATE and DELETE)

---

### 7. eg_sw_applicationdocument
**Purpose**: Stores document references for connection applications.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY, NOT NULL | Unique identifier for document record |
| tenantid | VARCHAR(64) | | Tenant identifier |
| documenttype | VARCHAR(64) | | Type of document (e.g., ID_PROOF, ADDRESS_PROOF) |
| filestoreid | VARCHAR(64) | | File store ID where document is stored |
| swid | VARCHAR(64) | FOREIGN KEY → eg_sw_connection(id) | Reference to sewerage connection |
| active | VARCHAR(64) | | Flag indicating if document is active |
| documentUid | VARCHAR(64) | | Unique document identifier |
| createdby | VARCHAR(64) | | Creator user ID |
| lastmodifiedby | VARCHAR(64) | | Last modifier user ID |
| createdtime | BIGINT | | Creation timestamp |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Foreign Key**: swid → eg_sw_connection(id)

---

### 8. eg_sw_roadcuttinginfo
**Purpose**: Stores road cutting information for connections requiring road excavation.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(64) | PRIMARY KEY, NOT NULL | Unique identifier for road cutting info |
| tenantid | VARCHAR(64) | | Tenant identifier |
| swid | VARCHAR(64) | FOREIGN KEY → eg_sw_connection(id) | Reference to sewerage connection |
| active | VARCHAR(64) | | Active status flag |
| roadtype | VARCHAR(32) | | Type of road being cut |
| roadcuttingarea | FLOAT | | Area of road to be cut (square units) |
| createdby | VARCHAR(64) | | Creator user ID |
| lastmodifiedby | VARCHAR(64) | | Last modifier user ID |
| createdtime | BIGINT | | Creation timestamp |
| lastmodifiedtime | BIGINT | | Last modification timestamp |

**Foreign Key**: swid → eg_sw_connection(id) (CASCADE on UPDATE and DELETE)

---

### 9. eg_sw_enc_audit
**Purpose**: Audit table for tracking encryption operations on sewerage connection data.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for audit record |
| batchoffset | BIGINT | NOT NULL | Offset in the batch processing |
| createdtime | BIGINT | NOT NULL | Audit record creation timestamp |
| recordCount | BIGINT | NOT NULL | Number of records processed in this batch |
| tenantid | VARCHAR(256) | NOT NULL | Tenant identifier |
| message | VARCHAR(2048) | NOT NULL | Audit message/details |
| encryptiontime | BIGINT | NOT NULL | Time taken for encryption operation |

**Purpose**: Tracks encryption batch operations for compliance and debugging.

---

### 10. eg_sw_id_enc_audit
**Purpose**: Audit table for tracking ID and number encryption operations.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| tenantid | VARCHAR(256) | NOT NULL, UNIQUE (with applicationno & connectionno) | Tenant identifier |
| id | VARCHAR(128) | PRIMARY KEY, NOT NULL | Unique identifier for audit record |
| applicationno | VARCHAR(256) | UNIQUE (with tenantid & connectionno) | Application number that was encrypted |
| connectionno | VARCHAR(128) | UNIQUE (with tenantid & applicationno) | Connection number that was encrypted |
| createdTime | BIGINT | NOT NULL | Audit record creation timestamp |

**Unique Constraint**: (tenantid, applicationno, connectionno)

**Purpose**: Ensures IDs and numbers are encrypted properly and tracks encryption status.

---

## Entity Relationship Diagram (ASCII)

### Core Tables Structure

```
                    +---------------------------+
                    |    eg_sw_connection       |
                    |---------------------------|
                    | PK: id                    |
                    | property_id               |
                    | tenantid                  |
                    | applicationno             |
                    | connectionno              |
                    | applicationstatus         |
                    | status                    |
                    | applicationType           |
                    | roadCuttingArea           |
                    | roadType                  |
                    | locality                  |
                    | channel                   |
                    | dateEffectiveFrom         |
                    | disconnectionReason       |
                    | isDisconnectionTemporary  |
                    | additionaldetails (JSONB) |
                    | createdBy, createdTime    |
                    | lastModifiedBy, ...       |
                    +---------------------------+
                                 |
                                 | (1 to Many)
                +----------------+---------------+---------------+----------------+
                |                |               |               |                |
                V                V               V               V                V
    +-----------------+  +---------------+  +-------------+  +---------------+  +------------------+
    | eg_sw_service   |  |eg_sw_plumber  |  |eg_sw_       |  |eg_sw_road     |  |eg_sw_connection  |
    |                 |  |info           |  |application  |  |cuttinginfo    |  |holder            |
    |-----------------|  |---------------|  |document     |  |---------------|  |------------------|
    | connection_id◄--+  | swid◄---------+  | swid◄-------+  | swid◄---------+  | connectionid◄----+
    | (FK)            |  | (FK)          |  | (FK)        |  | (FK)          |  | (FK, UNIQUE)     |
    |                 |  |               |  |             |  |               |  |                  |
    | noOfWaterClosets|  | name          |  | documenttype|  | roadtype      |  | userid           |
    | noOfToilets     |  | licenseno     |  | filestoreid |  | roadcutting   |  | isprimaryholder  |
    | proposedWater   |  | mobilenumber  |  | documentUid |  | area          |  | holdership%      |
    | Closets         |  | gender        |  | active      |  | active        |  | relationship     |
    | connectiontype  |  | relationship  |  | tenantid    |  | tenantid      |  | status           |
    | connectionExec  |  | address       |  |             |  |               |  | tenantId         |
    | Date            |  | tenantid      |  |             |  |               |  |                  |
    | disconnection   |  |               |  |             |  |               |  |                  |
    | ExecutionDate   |  |               |  |             |  |               |  |                  |
    | estimationfile  |  |               |  |             |  |               |  |                  |
    | StoreId         |  |               |  |             |  |               |  |                  |
    | sanctionfile    |  |               |  |             |  |               |  |                  |
    | StoreId         |  |               |  |             |  |               |  |                  |
    +-----------------+  +---------------+  +-------------+  +---------------+  +------------------+
            |                                                                            |
            |                                                                            |
            V (Mirrors for audit)                                                        V (Links to)
    +-----------------+                                                         +------------------+
    | eg_sw_service   |                                                         | User Management  |
    | _audit          |                                                         | System (External)|
    +-----------------+                                                         +------------------+


    +---------------------------+
    | eg_sw_connection_audit    |  <--- Mirrors eg_sw_connection
    |---------------------------|      (No PK, stores all changes)
    | All connection fields     |
    | Historical snapshots      |
    +---------------------------+
```

### Audit & Encryption Tables

```
    +----------------------+          +----------------------+
    | eg_sw_enc_audit      |          | eg_sw_id_enc_audit   |
    |----------------------|          |----------------------|
    | PK: id               |          | PK: id               |
    | batchoffset          |          | UK: (tenantid,       |
    | recordCount          |          |      applicationno,  |
    | tenantid             |          |      connectionno)   |
    | message              |          | tenantid             |
    | encryptiontime       |          | applicationno        |
    | createdtime          |          | connectionno         |
    |                      |          | createdTime          |
    | Tracks: Batch        |          | Tracks: ID & number  |
    | encryption ops       |          | encryption status    |
    +----------------------+          +----------------------+
```
