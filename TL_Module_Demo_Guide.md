# Urban TL Module Demo Guide

This guide provides instructions for setting up the Urban Trade License (TL) module locally, configuring the UI, and understanding customization options.

## 1. Prerequisites

Before starting, ensure you have the following installed on your system:
*   **Node.js**: v14.x or later
*   **Yarn**: Package manager (`npm install -g yarn`)
*   **Git**: Version control system

## 2. Local Setup Instructions

To run the TL module frontend locally:

1.  **Navigate to the Web Directory**:
    Open your terminal and navigate to the `frontend/micro-ui/web` directory.
    ```bash
    cd frontend/micro-ui/web
    ```

2.  **Install Dependencies**:
    Run the following command to install all necessary packages.
    ```bash
    yarn install
    ```

3.  **Environment Configuration**:
    Ensure you have a `.env` file in the `web` directory. You can copy `.env.sample` to `.env`.
    ```bash
    cp .env.sample .env
    ```
    Verify the content of `.env`:
    ```env
    REACT_APP_STATE_LEVEL_TENANT_ID=pb
    REACT_APP_PROXY_URL=https://qa.digit.org
    ```
    *Note: `REACT_APP_PROXY_URL` should point to a running backend environment (e.g., QA).*

4.  **Start the Development Server**:
    Run the application.
    ```bash
    yarn start
    ```
    The application should now be accessible at `http://localhost:3000`.

## 3. What's Configurable in the TL UI?

The Trade License (TL) UI is highly configurable through a central configuration file.

*   **Configuration File Location**:
    `frontend/micro-ui/web/micro-ui-internals/packages/modules/tl/src/config/config.js`

*   **What you can configure**:
    *   **Form Flow**: The order of screens (e.g., Trade Details -> Location -> Owner Details).
    *   **Field Visibility**: Hide/Show fields for Citizens or Employees using `hideInCitizen` or `hideInEmployee` flags.
    *   **Components**: Specify which React component renders for a step (e.g., `TLSelectAddress`).
    *   **Labels**: Change header and card text keys (mapped to localization).
    *   **Mandatory Fields**: Set `isMandatory: true`.

    **Example Config Snippet**:
    ```javascript
    {
      head: "TL_COMMON_TR_DETAILS",
      body: [
        {
          type: "component",
          component: "TLTradeDetailsEmployee",
          key: "tradedetils",
          withoutLabel: true,
          hideInCitizen: true,
        }
      ]
    }
    ```

## 4. Branding Setup (Background, Header, Footer, Logo)

Branding elements are managed globally or via the Core module.

### Logo and Header
*   **Configuration**: The logo is typically fetched from the MDMS (Master Data Management System) based on the tenant/city.
*   **Code Location**: `frontend/micro-ui/web/micro-ui-internals/packages/modules/core/src/components/TopBarSideBar/TopBar.js`
*   **Customization**:
    *   The `TopBar` component receives `logoUrl` and `stateInfo` props.
    *   `stateInfo.logoUrlWhite` or `cityDetails.logoId` are used.
    *   To change it locally for a demo, you can hardcode the `src` in `TopBar.js` or update the MDMS data if you have access.

### Background
*   **Login Page**: The background image is set via CSS variables or `stateInfo.bannerUrl`.
*   **Code Location**: `frontend/micro-ui/web/micro-ui-internals/packages/modules/core/src/pages/employee/index.js` (for Employee login).
*   **CSS**: Look for `.banner` class in `frontend/micro-ui/web/micro-ui-internals/packages/modules/core/src/components/Background.js`.

### Footer
*   **Configuration**: The footer logo/text is often configured via a global config key `DIGIT_FOOTER`.
*   **Code Location**: `frontend/micro-ui/web/micro-ui-internals/packages/modules/core/src/pages/employee/index.js` (Employee App) or `App.js`.

## 5. How to Add/Remove Fields in the TL UI?

Modifying fields involves changes in the Frontend Config, Data Transformation, and potentially the Backend.

### 1. Frontend Configuration (Add/Remove)
*   **Remove a Field**:
    *   Open `frontend/micro-ui/web/micro-ui-internals/packages/modules/tl/src/config/config.js`.
    *   Find the object corresponding to the field.
    *   Add `hideInCitizen: true` and `hideInEmployee: true`, or simply remove the object from the array.

*   **Add a Field**:
    *   Define a new object in the `config.js` array in the desired step.
    *   Specify the `component` (use an existing generic component like `TextInput` or create a new one in `pageComponents`).
    *   Define the `key` where the data will be stored in the form state.

### 2. Data Transformation (Frontend)
If you add a new field, you must ensure it gets sent to the API.
*   **File**: `frontend/micro-ui/web/micro-ui-internals/packages/modules/tl/src/utils/index.js`
*   **Function**: `convertToTrade` (for creation) or `convertToUpdateTrade` (for updates).
*   **Action**: Map your new form state key (from `config.js`) to the appropriate field in the `tradeLicenseDetail` object of the API payload.

### 3. Backend Changes (If applicable)
*   **If the field is new to the data model**:
    *   The Backend Service (`tradelicense` module) must be updated to accept and store this new field.
    *   Database schema changes may be required.
    *   If using `additionalDetail` JSON column, strict schema changes might be avoided, but the backend must still persist it.

### 4. Localization
*   Add the new label keys (e.g., `TL_NEW_FIELD_LABEL`) to the localization JSONs (MDMS) so they appear correctly in the UI.
