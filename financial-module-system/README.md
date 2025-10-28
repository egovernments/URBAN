# Financial Module System (EGF)

## Overview
The Financial Module System (e-Governance Financials - EGF) is a comprehensive financial management system for urban local bodies (ULBs) and government organizations. It handles the complete financial lifecycle including accounting operations, budgeting, fund management, banking operations, financial instruments management, voucher processing, and financial reporting.

---

## Module Architecture

The Financial Module System consists of three main microservices:

```
financial-module-system/
├── egf-master/                               # Core financial masters and configuration
├── egf-instrument/                           # Financial instruments management
└── finance-collections-voucher-consumer/     # Voucher integration and logging
```

### 1. **egf-master** - Core Financial Management Service
The foundational service that manages all financial master data and core accounting operations:

**Core Capabilities:**
- **Time & Period Management**: Financial years and fiscal periods tracking
- **Organizational Structure**: Departments (functions) and functionaries management
- **Fund Management**: Hierarchical fund structure, fund sources, schemes, and sub-schemes
- **Chart of Accounts**: Complete GL (General Ledger) structure with account hierarchy
- **Banking Management**: Bank, branch, and bank account master data
- **Budget Management**: Budget groups and allocation management
- **Supplier Management**: Vendor/supplier master data with banking details
- **Recovery Management**: Tax deductions, advances, and loan recoveries
- **Financial Configuration**: System-wide financial parameters and settings

**Key Features:**
- Multi-tenant architecture for multiple ULBs
- Hierarchical data structures (funds, accounts, functions)
- Comprehensive audit trail for all financial records
- Flexible configuration management with time-based values
- Support for complex organizational structures
- Integration with external systems via account detail types

📚 **[View Detailed Database Schema Documentation →](egf-master/src/main/resources/db/migration/main/README.md)**

---

### 2. **egf-instrument** - Financial Instruments Service
Manages financial instruments such as cheques, demand drafts, cash, and other payment methods used in government financial transactions:

**Core Capabilities:**
- **Instrument Type Management**: Define and configure various payment instruments (Cheque, DD, Cash, NEFT, RTGS, etc.)
- **Instrument Lifecycle Tracking**: From creation through reconciliation
- **Status Management**: Track instrument status throughout its lifecycle (New, Deposited, Dishonored, Reconciled, Cancelled)
- **Voucher Integration**: Link instruments to financial vouchers and receipts
- **Bank Reconciliation**: Track reconciled amounts and reconciliation dates
- **Dishonor Management**: Handle bounced cheques and failed instruments with reversal tracking
- **Surrender Management**: Track reasons for instrument surrender

**Key Features:**
- Complete instrument lifecycle management
- Configurable instrument properties based on transaction types
- Status transition management for different instrument types
- Link instruments to chart of accounts
- Comprehensive dishonor tracking with reversal voucher support
- Payee and drawer information management
- Multi-instrument type support with flexible configuration

📚 **[View Detailed Database Schema Documentation →](egf-instrument/src/main/resources/db/migration/main/README.md)**

---

### 3. **finance-collections-voucher-consumer** - Voucher Integration Service
Handles voucher integration operations and maintains audit logs for financial transactions:

**Core Capabilities:**
- **Voucher Integration Logging**: Track all voucher creation/update operations
- **Audit Trail**: Maintain complete history of voucher integration requests
- **Status Tracking**: Monitor integration operation outcomes (SUCCESS, FAILED, PENDING)
- **Request Payload Storage**: Store complete request context in JSONB format
- **Reference Management**: Correlate collection transactions with generated vouchers

**Key Features:**
- Complete audit trail for financial transactions
- JSONB storage for flexible data capture
- Multi-tenancy support
- Integration monitoring and debugging support
- Reference number tracking for reconciliation

📚 **[View Detailed Database Schema Documentation →](finance-collections-voucher-consumer/src/main/resources/db/migration/main/README.md)**

---

## Database Tables Summary

### egf-master Tables (24 tables)
**Time & Period Management:**
- `egf_financialyear` - Financial/fiscal years
- `egf_fiscalperiod` - Fiscal periods (months/quarters)

**Organizational Structure:**
- `egf_function` - Organizational functions/departments hierarchy
- `egf_functionary` - Officials/authorities

**Fund Management:**
- `egf_fund` - Fund hierarchy
- `egf_fundsource` - Fund sources hierarchy
- `egf_scheme` - Government schemes/programs
- `egf_subscheme` - Sub-schemes

**Chart of Accounts:**
- `egf_accountcodepurpose` - Account code purposes
- `egf_chartofaccount` - General Ledger accounts
- `egf_accountdetailtype` - Account detail types
- `egf_accountdetailkey` - Account detail keys
- `egf_accountentitymaster` - Account entity master data
- `egf_chartofaccountdetail` - Account-to-detail type mapping

**Banking Management:**
- `egf_bank` - Bank master
- `egf_bankbranch` - Bank branches with address details
- `egf_bankaccount` - Organization bank accounts

**Budget & Supplier:**
- `egf_budgetgroup` - Budget grouping
- `egf_supplier` - Vendor/supplier master

**Configuration:**
- `egf_financialstatus` - Financial transaction status
- `egf_financialconfiguration` - System configuration
- `egf_financialconfigurationvalues` - Configuration values
- `egf_recovery` - Recovery/deduction rules

---

### egf-instrument Tables (8 tables)
**Master Tables:**
- `egf_instrumenttype` - Types of financial instruments
- `egf_instrumentstatus` - Instrument status definitions
- `egf_instrumenttypeproperty` - Instrument type configuration
- `egf_surrenderreason` - Surrender reason master

**Transaction Tables:**
- `egf_instrument` - Core instrument transaction data
- `egf_instrumentvoucher` - Instrument-to-voucher linkage
- `egf_instrumentdishonor` - Dishonored instrument tracking
- `egf_instrumentaccountcode` - Instrument-to-GL mapping

---

### finance-collections-voucher-consumer Tables (1 table)
- `egf_voucher_integration_log` - Voucher integration audit log

---

## Technology Stack
- **Framework:** Spring Boot
- **Database:** PostgreSQL 9.6+
- **Migration Tool:** Flyway
- **Data Formats:** JSON/JSONB for flexible data storage
- **Architecture:** Microservices-based
- **Multi-tenancy:** Tenant-based data segregation

---

## Getting Started

### Prerequisites
- Java 8+
- PostgreSQL 9.6+
- Maven 3+

### Database Migration
Database migrations are managed using Flyway and located in:
- `egf-master/src/main/resources/db/migration/main/`
- `egf-instrument/src/main/resources/db/migration/main/`
- `finance-collections-voucher-consumer/src/main/resources/db/migration/main/`

### Configuration
Configure the following in `application.properties`:
- Database connection settings
- Tenant configuration
- Multi-tenancy parameters
- Financial year and period settings
- Bank and payment gateway integration
- Workflow service endpoints

---

## Support & Documentation
For detailed database schema documentation:
- **[EGF Master Service Schema →](egf-master/src/main/resources/db/migration/main/README.md)**
- **[EGF Instrument Service Schema →](egf-instrument/src/main/resources/db/migration/main/README.md)**
- **[Finance Collections Voucher Consumer Schema →](finance-collections-voucher-consumer/src/main/resources/db/migration/main/README.md)**

---

## License
[Add license information here]

## Contributors
[Add contributor information here]
