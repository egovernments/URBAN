# EGF (eGovernance Financial) Master Module - Database Schema Documentation

## Overview
This database schema is designed for the eGovernance Financial (EGF) master module, which manages financial operations including accounting, budgeting, banking, fund management, and financial reporting for government organizations. The system supports multi-tenant architecture and maintains comprehensive audit trails.

---

## Time & Period Management

### egf_financialyear
**Purpose**: Manages financial/fiscal years for accounting and budgeting purposes.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier for financial year |
| FinancialYear | varchar(25) | Financial year name/label (e.g., "2023-24") |
| startingDate | date | Start date of the financial year |
| endingDate | date | End date of the financial year |
| active | boolean | Whether the year is currently active |
| isActiveForPosting | boolean | Whether transactions can be posted to this year |
| isClosed | boolean | Whether the year has been closed |
| transferClosingBalance | boolean | Whether to transfer closing balance to next year |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_fiscalperiod
**Purpose**: Divides financial years into smaller periods (months/quarters) for detailed financial tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier for fiscal period |
| name | varchar(25) | Period name (e.g., "April 2023", "Q1") |
| FinancialYearid | bigint | Foreign key to egf_financialyear |
| startingDate | date | Period start date |
| endingDate | date | Period end date |
| active | boolean | Whether the period is active |
| isActiveForPosting | boolean | Whether transactions can be posted to this period |
| isClosed | boolean | Whether the period has been closed |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Organizational Structure

### egf_function
**Purpose**: Hierarchical structure of organizational functions/departments for financial classification.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| name | varchar(128) | Function name (e.g., "Education", "Health") |
| code | varchar(16) | Unique function code |
| level | smallint | Hierarchy level in the function tree |
| active | boolean | Whether the function is active |
| isParent | boolean | Whether this function has child functions |
| parentId | bigint | Foreign key to parent function (self-reference) |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_functionary
**Purpose**: Stores information about functionaries (officials/authorities) responsible for financial operations.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| code | varchar(16) | Unique functionary code |
| name | varchar(256) | Functionary name |
| active | boolean | Whether the functionary is active |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Fund Management

### egf_fund
**Purpose**: Hierarchical structure of funds for tracking financial resources.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| name | varchar(50) | Fund name |
| code | varchar(50) | Unique fund code |
| identifier | varchar(1) | Single character identifier |
| level | bigint | Hierarchy level |
| parentid | bigint | Foreign key to parent fund (self-reference) |
| isParent | boolean | Whether this fund has child funds |
| active | boolean | Whether the fund is active |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_fundsource
**Purpose**: Hierarchical structure of fund sources (revenue sources like grants, taxes, etc.).

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| code | varchar(25) | Unique fund source code |
| name | varchar(25) | Fund source name |
| type | varchar(25) | Type of fund source |
| parentid | bigint | Foreign key to parent fund source (self-reference) |
| llevel | numeric(13,2) | Hierarchy level |
| active | boolean | Whether the fund source is active |
| isParent | boolean | Whether this has child fund sources |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_scheme
**Purpose**: Government schemes/programs funded under specific funds.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| fundId | bigint | Foreign key to egf_fund |
| code | varchar(25) | Unique scheme code |
| name | varchar(25) | Scheme name |
| validFrom | date | Scheme validity start date |
| validTo | date | Scheme validity end date |
| active | boolean | Whether the scheme is active |
| description | varchar(256) | Scheme description |
| boundary | bigint | Geographic boundary/area identifier |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_subscheme
**Purpose**: Sub-schemes under main schemes for detailed program tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| scheme | bigint | Foreign key to egf_scheme |
| code | varchar(50) | Unique sub-scheme code |
| name | varchar(50) | Sub-scheme name |
| validFrom | date | Validity start date |
| validTo | date | Validity end date |
| active | boolean | Whether the sub-scheme is active |
| departmentId | bigint | Department responsible for the sub-scheme |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Chart of Accounts

### egf_accountcodepurpose
**Purpose**: Defines purposes for which account codes can be used.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| name | varchar(256) | Purpose name/description |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_chartofaccount
**Purpose**: Core accounting structure defining all GL (General Ledger) accounts.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| glcode | varchar(16) | General Ledger code (unique account code) |
| name | varchar(128) | Account name |
| purposeId | bigint | Foreign key to egf_accountcodepurpose |
| description | varchar(256) | Account description |
| isActiveForPosting | boolean | Whether transactions can be posted to this account |
| parentId | bigint | Parent account for hierarchical structure |
| type | varchar(1) | Account type (A=Asset, L=Liability, E=Expense, I=Income) |
| classification | bigint | Account classification code |
| functionRequired | boolean | Whether function is mandatory for this account |
| budgetCheckRequired | boolean | Whether budget check is required |
| majorCode | varchar(16) | Major account code for grouping |
| isSubLedger | boolean | Whether this account has sub-ledger details |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_accountdetailtype
**Purpose**: Defines types of additional details that can be attached to accounts.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| name | varchar(50) | Detail type name (e.g., "Contractor", "Project") |
| description | varchar(50) | Detail type description |
| tableName | varchar(25) | Database table name for this detail type |
| active | boolean | Whether this detail type is active |
| FULLY_QUALIFIED_NAME | varchar(250) | Fully qualified class/entity name |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_accountdetailkey
**Purpose**: Specific detail keys/attributes within each detail type.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| groupId | smallint | Group identifier for related keys |
| name | varchar(128) | Key name |
| key | smallint | Key code/number |
| detailTypeId | bigint | Foreign key to egf_accountdetailtype |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_accountentitymaster
**Purpose**: Master data for account entities (specific instances of detail types).

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| detailtypeid | bigint | Foreign key to egf_accountdetailtype |
| code | varchar(25) | Entity code |
| name | varchar(350) | Entity name |
| active | boolean | Whether the entity is active |
| description | varchar(256) | Entity description |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_chartofaccountdetail
**Purpose**: Links chart of accounts to required detail types.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| glcodeid | bigint | Foreign key to egf_chartofaccount |
| detailtypeid | bigint | Foreign key to egf_accountdetailtype |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Banking Management

### egf_bank
**Purpose**: Master list of banks.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| code | varchar(50) | Unique bank code |
| name | varchar(100) | Bank name |
| description | varchar(250) | Bank description |
| active | boolean | Whether the bank is active |
| type | varchar(50) | Bank type (e.g., "Nationalized", "Private", "Cooperative") |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_bankbranch
**Purpose**: Bank branches with complete address and contact information.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| bankid | bigint | Foreign key to egf_bank |
| code | varchar(50) | Unique branch code |
| name | varchar(50) | Branch name |
| address | varchar(50) | Primary address line |
| address2 | varchar(50) | Secondary address line |
| city | varchar(50) | City name |
| state | varchar(50) | State name |
| pincode | varchar(50) | Postal code |
| phone | varchar(15) | Phone number |
| fax | varchar(15) | Fax number |
| contactPerson | varchar(50) | Contact person name |
| active | boolean | Whether the branch is active |
| description | varchar(256) | Branch description |
| micr | varchar(50) | MICR code for check processing |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_bankaccount
**Purpose**: Bank accounts held by the organization.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| branchid | bigint | Foreign key to egf_bankbranch |
| glcodeid | bigint | Foreign key to egf_chartofaccount (GL mapping) |
| fundid | bigint | Foreign key to egf_fund |
| accountNumber | varchar(25) | Bank account number |
| accountType | varchar(150) | Account type (e.g., "Savings", "Current", "Fixed Deposit") |
| description | varchar(256) | Account description |
| active | boolean | Whether the account is active |
| payTo | varchar(100) | Default payee name |
| type | varchar(17) | Account category/type |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Budget Management

### egf_budgetgroup
**Purpose**: Groups chart of accounts for budgeting purposes.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| name | varchar(250) | Budget group name |
| description | varchar(250) | Budget group description |
| majorcode | bigint | Foreign key to egf_chartofaccount (major code) |
| maxcode | bigint | Foreign key to egf_chartofaccount (maximum code) |
| mincode | bigint | Foreign key to egf_chartofaccount (minimum code) |
| accountType | varchar(19) | Type of accounts in this group |
| budgetingType | varchar(6) | Budgeting type (e.g., "RE" for Revenue, "BE" for Budget Estimate) |
| active | boolean | Whether the budget group is active |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Supplier Management

### egf_supplier
**Purpose**: Vendor/supplier master data for procurement and payments.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key, unique identifier |
| code | varchar(50) | Unique supplier code |
| name | varchar(50) | Supplier name |
| address | varchar(300) | Supplier address |
| mobile | varchar(10) | Mobile number |
| email | varchar(25) | Email address |
| description | varchar(250) | Supplier description |
| active | boolean | Whether the supplier is active |
| panNo | varchar(10) | PAN (Permanent Account Number) |
| tinNo | varchar(20) | TIN (Tax Identification Number) |
| registationNo | varchar(25) | Registration number |
| bankAccount | varchar(25) | Supplier's bank account number |
| ifscCode | varchar(12) | Bank IFSC code for transfers |
| bank | bigint | Foreign key to egf_bank |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Configuration & Status

### egf_financialstatus
**Purpose**: Workflow status definitions for financial transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(50) | Primary key, unique identifier |
| moduleType | varchar(50) | Module type (e.g., "Voucher", "Bill", "Payment") |
| code | varchar(20) | Unique status code |
| name | varchar(20) | Status name (e.g., "NEW", "APPROVED", "CANCELLED") |
| description | varchar(250) | Status description |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

**Composite Primary Key**: (name, tenantId)
**Unique Constraint**: (code, tenantId)

### egf_financialconfiguration
**Purpose**: Configurable parameters for financial operations.

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(250) | Primary key, unique identifier |
| keyName | varchar(50) | Configuration key name |
| description | varchar(250) | Configuration description |
| module | varchar(50) | Module to which configuration applies |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

### egf_financialconfigurationvalues
**Purpose**: Time-based values for financial configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(250) | Primary key, unique identifier |
| keyId | varchar(250) | Foreign key to egf_financialconfiguration |
| value | varchar(1000) | Configuration value |
| effectiveFrom | date | Date from which this value is effective |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number for optimistic locking |
| tenantId | varchar(250) | Tenant identifier for multi-tenancy |

---

## Recovery Management

### egf_recovery
**Purpose**: Manages recoveries/deductions from payments (e.g., taxes, advances, loans).

| Column | Type | Description |
|--------|------|-------------|
| id | varchar(256) | Primary key, unique identifier |
| chartofaccountid | varchar(256) | GL account for recovery |
| type | varchar(20) | Recovery type |
| flat | double precision | Flat/fixed recovery amount |
| active | boolean | Whether the recovery is active |
| remitted | varchar(100) | Remittance authority/entity |
| name | varchar(50) | Recovery name |
| code | varchar(50) | Unique recovery code |
| ifsccode | varchar(16) | IFSC code for remittance |
| mode | varchar(1) | Recovery mode |
| remittancemode | varchar(1) | Remittance mode |
| accountnumber | varchar(32) | Account number for remittance |
| percentage | double precision | Percentage-based recovery rate |
| createdby | bigint | User ID who created the record |
| createddate | timestamp | Creation timestamp |
| lastmodifiedby | bigint | User ID who last modified the record |
| lastmodifieddate | timestamp | Last modification timestamp |
| version | bigint | Version number (defaults to 0) |
| tenantid | varchar(256) | Tenant identifier for multi-tenancy |

**Composite Primary Key**: (id, tenantid)

---


## ER Diagram

```
═══════════════════════════════════════════════════════════════════════════════════════════════════
                        EGF MASTER MODULE - ENTITY RELATIONSHIP DIAGRAM
═══════════════════════════════════════════════════════════════════════════════════════════════════

Legend:
  ──────>  One-to-Many relationship (1:N)
  ◄────►   Many-to-Many relationship (N:M)
  ─┐       Self-referencing relationship
   └──►

═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 1: TIME & PERIOD MANAGEMENT
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗
║     egf_financialyear                 ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • FinancialYear                       ║
║ • startingDate, endingDate            ║
║ • active, isActiveForPosting          ║
║ • isClosed, transferClosingBalance    ║
║ • tenantId                            ║
╚═══════════════╤═══════════════════════╝
                │
                │ (1:N)
                │
                ▼
╔═══════════════════════════════════════╗
║     egf_fiscalperiod                  ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • FinancialYearid (FK) ───────────────┤ ──> egf_financialyear
║ • name                                ║
║ • startingDate, endingDate            ║
║ • active, isActiveForPosting, isClosed║
║ • tenantId                            ║
╚═══════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 2: ORGANIZATIONAL STRUCTURE
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗         ╔═══════════════════════════════════════╗
║     egf_function                      ║         ║     egf_functionary                   ║
║───────────────────────────────────────║         ║───────────────────────────────────────║
║ • id (PK) ◄───────┐                   ║         ║ • id (PK)                             ║
║ • parentId (FK) ───┘ (Self-ref)       ║         ║ • code, name                          ║
║ • name, code                          ║         ║ • active                              ║
║ • level, active                       ║         ║ • tenantId                            ║
║ • isParent                            ║         ╚═══════════════════════════════════════╝
║ • tenantId                            ║
╚═══════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 3: FUND MANAGEMENT HIERARCHY
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗         ╔═══════════════════════════════════════╗
║     egf_fund                          ║         ║     egf_fundsource                    ║
║───────────────────────────────────────║         ║───────────────────────────────────────║
║ • id (PK) ◄───────┐                   ║         ║ • id (PK) ◄───────┐                   ║
║ • parentid (FK) ───┘ (Self-ref)       ║         ║ • parentid (FK) ───┘ (Self-ref)       ║
║ • name, code, identifier              ║         ║ • code, name, type                    ║
║ • level, isParent, active             ║         ║ • llevel, active, isParent            ║
║ • tenantId                            ║         ║ • tenantId                            ║
╚═══════════════╤═══════════════════════╝         ╚═══════════════════════════════════════╝
                │
                │ (1:N)
                │
                ▼
╔═══════════════════════════════════════╗
║     egf_scheme                        ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • fundId (FK) ─────────────────────────┤ ──> egf_fund
║ • code, name                          ║
║ • validFrom, validTo                  ║
║ • active, description, boundary       ║
║ • tenantId                            ║
╚═══════════════╤═══════════════════════╝
                │
                │ (1:N)
                │
                ▼
╔═══════════════════════════════════════╗
║     egf_subscheme                     ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • scheme (FK) ─────────────────────────┤ ──> egf_scheme
║ • code, name                          ║
║ • validFrom, validTo                  ║
║ • active, departmentId                ║
║ • tenantId                            ║
╚═══════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 4: CHART OF ACCOUNTS (Complex Relationships)
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗
║  egf_accountcodepurpose               ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • name, tenantId                      ║
╚═══════════════╤═══════════════════════╝
                │
                │ (1:N)
                ▼
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║  egf_chartofaccount                                                                   ║
║───────────────────────────────────────────────────────────────────────────────────────║
║ • id (PK) ◄──────┐ (Self-ref via parentId)                                           ║
║ • glcode (Unique Account Code)                                                        ║
║ • purposeId (FK) ────────────────────> egf_accountcodepurpose                         ║
║ • name, description, type, classification                                             ║
║ • isActiveForPosting, functionRequired, budgetCheckRequired                           ║
║ • parentId (FK - Self), majorCode, isSubLedger, tenantId                              ║
╚══════╤════════════════════════════════════════════════════════════════════════════════╝
       │                                    │
       │                                    │ (N:M via chartofaccountdetail)
       │                                    │
       │                                    ▼
       │                         ╔═══════════════════════════════════════╗
       │                         ║  egf_chartofaccountdetail (Link Table)║
       │                         ║───────────────────────────────────────║
       │                         ║ • id (PK)                             ║
       │    ┌────────────────────║ • glcodeid (FK) ──────────────────────┤ ──> egf_chartofaccount
       │    │                    ║ • detailtypeid (FK) ──────────────────┤ ──┐
       │    │                    ║ • tenantId                            ║   │
       │    │                    ╚═══════════════════════════════════════╝   │
       │    │                                                                │
       │    │                                                                │
       │    │    ╔═══════════════════════════════════════════════════════════╩═══════════╗
       │    │    ║  egf_accountdetailtype                                                ║
       │    │    ║───────────────────────────────────────────────────────────────────────║
       │    │    ║ • id (PK)                                                             ║
       │    │    ║ • name, description, tableName                                        ║
       │    │    ║ • active, FULLY_QUALIFIED_NAME, tenantId                              ║
       │    │    ╚══════╤═══════════════════════════════════╤════════════════════════════╝
       │    │           │                                   │
       │    │           │ (1:N)                             │ (1:N)
       │    │           │                                   │
       │    │           ▼                                   ▼
       │    │  ╔═══════════════════════════════╗  ╔═══════════════════════════════════╗
       │    │  ║ egf_accountdetailkey          ║  ║ egf_accountentitymaster           ║
       │    │  ║───────────────────────────────║  ║───────────────────────────────────║
       │    │  ║ • id (PK)                     ║  ║ • id (PK)                         ║
       │    │  ║ • detailTypeId (FK) ──────────┤  ║ • detailtypeid (FK) ──────────────┤
       │    │  ║ • groupId, name, key          ║  ║ • code, name, active              ║
       │    │  ║ • tenantId                    ║  ║ • description, tenantId           ║
       │    │  ╚═══════════════════════════════╝  ╚═══════════════════════════════════╝
       │    │
       │    │ (Used by egf_budgetgroup)
       │    │
       │    └──────────────────────┐
       │                           │
       │                           ▼
       │              ╔═══════════════════════════════════════╗
       │              ║  egf_budgetgroup                      ║
       │              ║───────────────────────────────────────║
       │              ║ • id (PK)                             ║
       │              ║ • majorcode (FK) ─────────────────────┤ ──┐
       │              ║ • maxcode (FK) ───────────────────────┤ ──┼──> All FK to egf_chartofaccount
       │              ║ • mincode (FK) ───────────────────────┤ ──┘
       │              ║ • name, description                   ║
       │              ║ • accountType, budgetingType          ║
       │              ║ • active, tenantId                    ║
       │              ╚═══════════════════════════════════════╝
       │
       │ (Referenced by egf_bankaccount)
       └─────────────────┐
                         │
                         ▼
         (See Banking Management Section below)


═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 5: BANKING MANAGEMENT
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗
║  egf_bank                             ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • code, name, description             ║
║ • active, type, tenantId              ║
╚═══════════════╤═══════════════════════╝
                │
                ├──────────────────────┐
                │ (1:N)                │ (1:N)
                │                      │
                ▼                      ▼
╔═══════════════════════════════════════╗         ╔═══════════════════════════════════════╗
║  egf_bankbranch                       ║         ║  egf_supplier                         ║
║───────────────────────────────────────║         ║───────────────────────────────────────║
║ • id (PK)                             ║         ║ • id (PK)                             ║
║ • bankid (FK) ────────────────────────┤         ║ • bank (FK) ──────────────────────────┤ ──> egf_bank
║ • code, name                          ║         ║ • code, name, address                 ║
║ • address, address2, city             ║         ║ • mobile, email, description          ║
║ • state, pincode, phone, fax          ║         ║ • active, panNo, tinNo                ║
║ • contactPerson, active               ║         ║ • registationNo, bankAccount          ║
║ • description, micr, tenantId         ║         ║ • ifscCode, tenantId                  ║
╚═══════════════╤═══════════════════════╝         ╚═══════════════════════════════════════╝
                │
                │ (1:N)
                │
                ▼
╔═══════════════════════════════════════╗
║  egf_bankaccount                      ║
║───────────────────────────────────────║
║ • id (PK)                             ║
║ • branchid (FK) ───────────────────────┤ ──> egf_bankbranch
║ • glcodeid (FK) ───────────────────────┤ ──> egf_chartofaccount
║ • fundid (FK) ─────────────────────────┤ ──> egf_fund
║ • accountNumber, accountType          ║
║ • description, active                 ║
║ • payTo, type, tenantId               ║
╚═══════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 6: CONFIGURATION & STATUS
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗         ╔═══════════════════════════════════════╗
║  egf_financialstatus                  ║         ║  egf_financialconfiguration           ║
║───────────────────────────────────────║         ║───────────────────────────────────────║
║ • id                                  ║         ║ • id (PK)                             ║
║ • moduleType (Voucher/Bill/Payment)   ║         ║ • keyName                             ║
║ • code (Unique with tenantId)         ║         ║ • description, module                 ║
║ • name (PK with tenantId)             ║         ║ • tenantId                            ║
║ • description, tenantId               ║         ╚═══════════════╤═══════════════════════╝
╚═══════════════════════════════════════╝                         │
                                                                  │ (1:N)
                                                                  │
                                                                  ▼
                                                 ╔═══════════════════════════════════════╗
                                                 ║ egf_financialconfigurationvalues      ║
                                                 ║───────────────────────────────────────║
                                                 ║ • id (PK)                             ║
                                                 ║ • keyId (FK) ──────────────────────────┤ ──> egf_financialconfiguration
                                                 ║ • value                               ║
                                                 ║ • effectiveFrom                       ║
                                                 ║ • tenantId                            ║
                                                 ╚═══════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════════════════════════
SECTION 7: RECOVERY MANAGEMENT
═══════════════════════════════════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════╗
║  egf_recovery                         ║
║───────────────────────────────────────║
║ • id, tenantid (Composite PK)         ║
║ • chartofaccountid (Ref to GL)        ║  ──> (References egf_chartofaccount)
║ • type, name, code                    ║
║ • flat, percentage                    ║
║ • active, remitted                    ║
║ • ifsccode, mode, remittancemode      ║
║ • accountnumber                       ║
╚═══════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════════════════════════
KEY RELATIONSHIP SUMMARY
═══════════════════════════════════════════════════════════════════════════════════════════════════

1. SELF-REFERENCING HIERARCHIES:
   • egf_function (parentId → id)          - Organizational hierarchy
   • egf_fund (parentid → id)              - Fund hierarchy
   • egf_fundsource (parentid → id)        - Fund source hierarchy
   • egf_chartofaccount (parentId → id)    - Account hierarchy

2. LINEAR CHAINS:
   • egf_financialyear → egf_fiscalperiod
   • egf_bank → egf_bankbranch → egf_bankaccount
   • egf_fund → egf_scheme → egf_subscheme
   • egf_financialconfiguration → egf_financialconfigurationvalues

3. MANY-TO-MANY:
   • egf_chartofaccount ◄──► egf_accountdetailtype (via egf_chartofaccountdetail)

4. MULTI-FOREIGN KEY:
   • egf_bankaccount → egf_bankbranch, egf_chartofaccount, egf_fund
   • egf_budgetgroup → egf_chartofaccount (3 times: majorcode, maxcode, mincode)

5. STANDALONE MASTERS:
   • egf_functionary (Independent master)
   • egf_supplier (References egf_bank only)
   • egf_financialstatus (Workflow states)
   • egf_recovery (References egf_chartofaccount)

═══════════════════════════════════════════════════════════════════════════════════════════════════
```
