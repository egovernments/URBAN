# EGF Instrument Module - Database Schema Documentation

## Overview
The EGF (e-Governance Financials) Instrument module manages financial instruments such as cheques, demand drafts, cash, and other payment methods used in government financial transactions. This module tracks instrument lifecycle from creation through reconciliation, including voucher linkage and dishonor management.

---

## Database Tables

### 1. egf_instrumenttype
Master table that defines types of financial instruments.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier for instrument type |
| name | varchar(50) | NOT NULL | Name of instrument type (e.g., Cheque, DD, Cash, NEFT, RTGS) |
| description | varchar(100) | | Detailed description of the instrument type |
| active | boolean | NOT NULL | Flag indicating if this instrument type is currently active |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrumenttype

---

### 2. egf_instrumenttypeproperty
Configuration table defining properties and status transitions for instrument types based on transaction types.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY, NOT NULL | Unique identifier |
| transactionType | varchar(6) | NOT NULL | Type of transaction (Credit/Debit) |
| reconciledOncreate | boolean | NOT NULL | Whether instrument is reconciled upon creation |
| statusOnCreateId | varchar(50) | NOT NULL | Foreign key to egf_instrumentstatus - Status when instrument is created |
| statusOnUpdateId | varchar(50) | NOT NULL | Foreign key to egf_instrumentstatus - Status when instrument is updated |
| statusOnReconcileId | varchar(50) | NOT NULL | Foreign key to egf_instrumentstatus - Status when instrument is reconciled |
| InstrumentTypeId | varchar(50) | | Foreign key to egf_instrumenttype |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrumenttypeproperty

---

### 3. egf_instrumentstatus
Master table for instrument status values throughout the instrument lifecycle.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier for status |
| moduleType | varchar(50) | NOT NULL | Module type this status belongs to |
| name | varchar(20) | NOT NULL | Status name (e.g., New, Deposited, Dishonored, Reconciled, Cancelled) |
| description | varchar(250) | NOT NULL | Detailed description of the status |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrumentstatus

---

### 4. egf_instrument
Core transaction table that stores all financial instrument details.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier for the instrument |
| transactionNumber | varchar(50) | NOT NULL | Instrument/transaction number (e.g., cheque number, DD number) |
| transactionDate | date | NOT NULL | Date of the transaction |
| amount | numeric(13,2) | NOT NULL | Instrument amount with 2 decimal precision |
| instrumentTypeId | varchar(50) | NOT NULL | Foreign key to egf_instrumenttype |
| bankId | varchar(50) | | Foreign key to bank master (external reference) |
| branchName | varchar(50) | | Bank branch name |
| bankAccountId | varchar(50) | | Foreign key to bank account master (external reference) |
| financialStatusId | varchar(50) | | Foreign key to egf_instrumentstatus - Current financial status |
| transactionType | varchar(6) | | Transaction type (Credit/Debit) |
| payee | varchar(50) | | Name of the payee receiving payment |
| drawer | varchar(100) | | Name of the drawer issuing the instrument |
| surrenderReasonId | varchar(50) | | Foreign key to egf_surrenderreason - Reason for surrender (if applicable) |
| serialNo | varchar(50) | | Serial number for tracking |
| remittanceVoucherId | varchar(50) | | Foreign key to remittance voucher (external reference) |
| payinSlipId | varchar(256) | | Reference to pay-in slip |
| reconciledAmount | numeric(13,2) | | Amount that has been reconciled |
| reconciledOn | date | | Date when instrument was reconciled |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrument

**Key Columns**:
- `transactionNumber`: The actual instrument number (cheque/DD number)
- `amount`: Total value of the instrument
- `reconciledAmount` & `reconciledOn`: Track bank reconciliation details

---

### 5. egf_instrumentvoucher
Junction table linking instruments to financial vouchers and receipts.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier |
| voucherHeaderId | varchar(50) | | Foreign key to voucher header (external reference) |
| InstrumentId | varchar(50) | | Foreign key to egf_instrument |
| receiptHeaderId | varchar(256) | | Foreign key to receipt header (external reference) |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrumentvoucher

**Purpose**: Links payment instruments to vouchers and receipts for complete financial transaction tracking.

---

### 6. egf_surrenderreason
Master table for reasons why an instrument might be surrendered.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier |
| name | varchar(50) | | Reason name (e.g., "Cancelled by Payee", "Instrument Damaged", "Duplicate Issue") |
| description | varchar(250) | | Detailed description of surrender reason |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_surrenderreason

---

### 7. egf_instrumentaccountcode
Configuration table mapping instrument types to chart of accounts.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier |
| instrumentTypeId | varchar(50) | | Foreign key to egf_instrumenttype |
| accountCodeId | varchar(50) | | Foreign key to account code master (external reference) |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrumentaccountcode

**Purpose**: Defines which general ledger account codes should be used for specific instrument types.

---

### 8. egf_instrumentdishonor
Transaction table tracking dishonored instruments (e.g., bounced cheques).

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | varchar(50) | PRIMARY KEY | Unique identifier |
| reason | varchar(100) | | Reason for dishonor (e.g., "Insufficient Funds", "Signature Mismatch") |
| remarks | varchar(250) | | Additional remarks/notes about the dishonor |
| instrumentid | varchar(50) | | Foreign key to egf_instrument |
| reversalVoucherId | varchar(50) | | Foreign key to reversal voucher created for dishonored instrument |
| dishonorDate | bigint | NOT NULL | Date when instrument was dishonored (epoch timestamp) |
| createdby | varchar(50) | | User ID who created this record |
| createddate | timestamp | | Timestamp when record was created |
| lastmodifiedby | varchar(50) | | User ID who last modified this record |
| lastmodifieddate | timestamp | | Timestamp when record was last modified |
| tenantId | varchar(250) | | Tenant identifier for multi-tenancy support |
| version | bigint | | Version number for optimistic locking |

**Sequence**: seq_egf_instrumentdishonor

**Purpose**: Maintains audit trail of dishonored instruments and links to reversal accounting entries.

---

## Entity Relationship Diagram (ASCII)

```
┌─────────────────────────┐
│  egf_instrumenttype     │
│─────────────────────────│
│ PK: id                  │
│     name                │
│     description         │
│     active              │
│     + audit fields      │
└───────────┬─────────────┘
            │
            │ 1:M
            │
    ┌───────┴────────┬──────────────────────────────┐
    │                │                              │
    │                │                              │
    ▼                ▼                              ▼
┌───────────────────────────┐        ┌─────────────────────────────┐
│egf_instrumenttypeproperty │        │ egf_instrumentaccountcode   │
│───────────────────────────│        │─────────────────────────────│
│ PK: id                    │        │ PK: id                      │
│ FK: InstrumentTypeId      │        │ FK: instrumentTypeId        │
│ FK: statusOnCreateId   ───┼───┐    │ FK: accountCodeId           │
│ FK: statusOnUpdateId   ───┼───┤    │     + audit fields          │
│ FK: statusOnReconcileId ──┼───┤    └─────────────────────────────┘
│     transactionType       │   │
│     reconciledOncreate    │   │
│     + audit fields        │   │
└───────────────────────────┘   │
                                │
                                │ M:1
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  egf_instrumentstatus   │
                    │─────────────────────────│
                    │ PK: id                  │
                    │     moduleType          │
                    │     name                │
                    │     description         │
                    │     + audit fields      │
                    └───────────┬─────────────┘
                                │
                                │ 1:M
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    egf_instrument                           │
│─────────────────────────────────────────────────────────────│
│ PK: id                                                      │
│ FK: instrumentTypeId          ───► egf_instrumenttype       │
│ FK: financialStatusId         ───► egf_instrumentstatus     │
│ FK: surrenderReasonId         ───► egf_surrenderreason      │
│ FK: bankId                    ───► (external: bank master)  │
│ FK: bankAccountId             ───► (external: bank account) │
│     transactionNumber                                       │
│     transactionDate                                         │
│     amount                                                  │
│     transactionType                                         │
│     payee                                                   │
│     drawer                                                  │
│     serialNo                                                │
│     remittanceVoucherId                                     │
│     payinSlipId                                             │
│     reconciledAmount                                        │
│     reconciledOn                                            │
│     branchName                                              │
│     + audit fields                                          │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ 1:M
               │
       ┌───────┴─────────────────────────────┐───────────────────────────────┐
       │                                     │                               │
       ▼                                     ▼                               ▼
┌──────────────────────────┐      ┌─────────────────────────┐ ┌─────────────────────────┐
│ egf_instrumentvoucher    │      │ egf_instrumentdishonor  │ │  egf_surrenderreason    │     
│──────────────────────────│      │─────────────────────────│ │─────────────────────────│
│ PK: id                   │      │ PK: id                  │ │ PK: id                  │
│ FK: InstrumentId         │      │ FK: instrumentid        │ │     name                │
│ FK: voucherHeaderId      │      │     reason              │ │     description         │
│ FK: receiptHeaderId      │      │     remarks             │ │     + audit fields      │
│     + audit fields       │      │     reversalVoucherId   │ └─────────────────────────┘
└──────────────────────────┘      │     dishonorDate        │
                                  │     + audit fields      │
                                  └─────────────────────────┘
```