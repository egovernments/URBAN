# Finance Collections Voucher Consumer - Database Schema Documentation

## Overview
This module contains database migration scripts for the Finance Collections Voucher Consumer service. The primary purpose is to track and log voucher integration operations in the financial management system.

---

## Database Tables

### `egf_voucher_integration_log`

This table serves as an audit/log table for tracking voucher integration operations between the finance collections module and the voucher generation system.

#### Purpose
- Logs all voucher integration requests and their outcomes
- Maintains audit trail for financial transactions
- Supports multi-tenancy architecture
- Stores complete request payloads for debugging and reconciliation

---

## Table Structure

### egf_voucher_integration_log

| Column Name      | Data Type     | Constraints        | Description                                                                 |
|------------------|---------------|--------------------|-----------------------------------------------------------------------------|
| `id`             | varchar(250)  | -                  | Unique identifier for each integration log entry. Primary key for the record |
| `referenceNumber`| varchar(50)   | -                  | Reference number from the source system/transaction. Used for correlation   |
| `status`         | varchar(20)   | -                  | Current status of the integration operation (e.g., SUCCESS, FAILED, PENDING)|
| `voucherNumber`  | varchar(30)   | -                  | The voucher number generated/assigned by the voucher system                 |
| `type`           | varchar(50)   | -                  | Type of voucher or operation (e.g., PAYMENT, RECEIPT, JOURNAL)              |
| `description`    | text          | -                  | Detailed description or message about the integration operation             |
| `requestJson`    | JSONB         | -                  | Complete request payload in JSON format. Stores the full context of request |
| `tenantId`       | varchar(50)   | -                  | Multi-tenancy identifier to segregate data by organization/municipality     |
| `createddate`    | TIMESTAMP     | NOT NULL, DEFAULT now() | Timestamp when the log record was created. Auto-populated                   |

---

## ER Diagram

Since this module contains only one table, the diagram shows the standalone entity:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           egf_voucher_integration_log                   │
│                    (Log Table)                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  PK  id                      VARCHAR(250)               │
│      referenceNumber         VARCHAR(50)                │
│      status                  VARCHAR(20)                │
│      voucherNumber           VARCHAR(30)                │
│      type                    VARCHAR(50)                │
│      description             TEXT                       │
│      requestJson             JSONB                      │
│      tenantId                VARCHAR(50)                │
│      createddate             TIMESTAMP NOT NULL         │
│                              DEFAULT now()              │
└─────────────────────────────────────────────────────────┘
             │
             │ (Conceptual Relationships - Not FK)
             │
             ├────► [Referenced by referenceNumber]
             │      to Collections Module
             │
             ├────► [Referenced by voucherNumber]
             │      to Voucher System (egf-master)
             │
             └────► [Filtered by tenantId]
                    for Multi-tenancy
```

