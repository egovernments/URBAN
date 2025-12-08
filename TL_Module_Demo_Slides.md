---
marp: false
theme: default
paginate: true
backgroundColor: #fff
header: '<img src="https://egov-website-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2025/04/eGov-logo.png" width="150" />'
style: |
  /* Global Reset & Typography */
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 24px;
    padding: 100px 50px 50px 50px;
    display: block;
  }

  /* Header Styling */
  header {
    position: absolute;
    top: 30px;
    right: 30px;
    left: auto;
    background: transparent;
  }

  /* Headings */
  h1 {
    color: #f47738;
    font-size: 1.6em;
    margin-bottom: 0.5em;
  }
  h2 {
    color: #0b0c0c;
    border-bottom: 2px solid #f47738;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 1.3em;
  }
  h3 {
    color: #f47738;
    margin-bottom: 10px;
    font-size: 1.1em;
  }

  /* Code Blocks */
  code {
    background-color: #fdf2e9;
    color: #d63384;
    border: 1px solid #f47738;
    border-radius: 4px;
    padding: 2px 5px;
  }
  pre {
    background-color: #fdf2e9;
    border: 1px solid #f47738;
    border-radius: 8px;
    padding: 15px;
  }
  pre code {
    background-color: transparent;
    border: none;
    color: #333;
    font-size: 0.8em;
  }

  /* Layout Utilities */
  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: start;
  }
  
  /* Title Slide Specifics */
  section.title-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 0;
  }
  section.title-slide h1 {
    font-size: 2.5em;
  }
  section.title-slide h2 {
    border: none;
    font-size: 1.5em;
    color: #555;
  }
---

<!-- _class: title-slide -->
<!-- _header: "" -->

# Urban Trade License (TL) Module
## Technical Demo & Configuration Guide

---

# Agenda

1.  **Overview**: Architecture & Modules
2.  **Local Setup**: Local Setup & Running
3.  **Configurable UI Flows**: Form Steps & Validation
4.  **Creating Custom Components**: Components & Registration
5.  **Branding**: Logo, Header, Background & Footer

---

# 1. Overview: UI Architecture

**Location**: `frontend/micro-ui/web/micro-ui-internals`

This directory is the core workspace for the eGov development team. It follows a modular architecture where **UI Components**, **Business Logic**, and **Styling** are separated for scalability.

**Project Structure:**

```
micro-ui-internals/
├── packages/
│   ├── css/
│   ├── libraries/
│   ├── react-components/
│   └── modules/
│       ├── core/
│       └── tl/
```

---

# 1. Overview: Key Components

*   **`css/`**: Responsible for the overall **Theme**, **Styling**, and **UI Customizations** across the application.
*   **`libraries/`**: Contains **Core Services**, **Localization** logic, and custom **React Hooks**.
*   **`react-components/`**: Shared library of reusable UI elements (Atoms & Molecules) for consistent design.
*   **`modules/core/`**: Handles **Login**, **Routing**, and **Global State** (The App Shell).
*   **`modules/tl/`**: Contains business logic and screens specifically for the **Trade License** module.

---

# 2. Local Setup: Prerequisites

**1. Node.js (v14.x+)**
*   **Download**: [nodejs.org](https://nodejs.org/)
*   **Verify**: Run `node -v` in terminal.

**2. Git (Version Control)**
*   **Download**: [git-scm.com](https://git-scm.com/downloads)
*   **Verify**: Run `git --version`.

**3. Yarn (Package Manager)**
*   **Install**: Run `npm install -g yarn` (requires Node.js).
*   **Verify**: Run `yarn --version`.

---

# 2. Local Setup: Cloning & Installation

**1. Clone the Repository**
```bash
git clone https://github.com/egovernments/URBAN.git
```

**2. Install Dependencies**
Switch to the `micro-ui-internals` directory and install packages:
```bash
cd frontend/micro-ui/web/micro-ui-internals
yarn install
```
*This installs all required dependencies for the URBAN app.*

---



# 2. Local Setup: Environment Configuration

**3. Configure Environment Variables**
Create a `.env` file in `frontend/micro-ui/web/micro-ui-internals/example` with:

```env
SKIP_PREFLIGHT_CHECK=true
REACT_APP_PROXY_API=https://unified-demo.digit.org
REACT_APP_PROXY_ASSETS=https://unified-demo.digit.org
REACT_APP_GLOBAL=https://unified-demo-central-instance.s3.ap-south-1.amazonaws.com/stagingGlobalConfigs.js
```

**Global Config**: `REACT_APP_GLOBAL` points to a remote JS file (`stagingGlobalConfigs.js`) that handles tenant-specific settings, logos, and localization URLs.

---

# 2. Local Setup: Running the App

**3. Start Development Server**
```bash
yarn start
```

**What does this command do?**
1.  **Builds & Links**: Compiles all internal packages and links them together to form a single application.
2.  **Runs Locally**: Starts a local web server on your machine at `http://localhost:3000`.
3.  **Opens**: Automatically launches a new browser window pointing to this local address so you can see your changes instantly.

---

# 3. Configurable UI Flows (1/2)

## New Trade License & Apply Flow
**Goal**: Customize the application form steps and validation.

*   **File**: `packages/modules/tl/src/config/config.js`
*   **What you can change**:
    *   **Steps**: Add/Remove screens (e.g., hide "Pincode").
    *   **Order**: Change the sequence of questions.
    *   **Visibility**: Use `hideInCitizen` or `hideInEmployee`.

*   **Demo**: Open `config.js`, search for `"route": "pincode"`, add `hideInCitizen: true`, and watch the step disappear!

---

# 3. Configurable UI Flows (2/2)

## Validation Logic
Validation logic is controlled via the configuration object.

**Example Config:**
```javascript
{
  type: "component",
  component: "TLTradeDetails",
  key: "tradeDetails",
  isMandatory: true, // 🔴 Makes the field required
  // isMandatory: false // 🟢 Makes the field optional
}
```

*   **`isMandatory: true`**: The system enforces validation before proceeding.
*   **`isMandatory: false`**: The user can skip the field.

---


# 4. Creating Custom Components (1/2)

**Goal**: Add a completely new screen/feature that doesn't exist out-of-the-box.

**Step 1: Create the Component**
*   **Location**: `packages/modules/tl/src/pageComponents/MyNewComponent.js`
*   **Code**: Create a standard React component.

**Step 2: Register the Component**
*   **File**: `packages/modules/tl/src/Module.js`
*   **Code**: Use `Digit.ComponentRegistryService.setComponent`.
    ```javascript
    Digit.ComponentRegistryService.setComponent("MyNewComponent", MyNewComponent);
    ```

---

# 4. Creating Custom Components (2/2)

**Step 3: Use in Config**
*   **File**: `packages/modules/tl/src/config/config.js`
*   **Code**: Reference it by the registered string name.

    ```javascript
    {
      route: "my-new-step",
      component: "MyNewComponent",
      nextStep: "next-step-route",
      key: "myNewStepKey"
    }
    ```




---

# 5. Branding: Logo & Header

**1. Logo Configuration**
*   **Source**: Fetched from MDMS (`stateInfo` or `cityDetails`).
*   **File**: `packages/modules/core/src/components/TopBar.js`.
*   **Customization**: Update the logo URL in the MDMS `tenant` config.

**2. Header Bar**
*   **Styling**: Controlled by `digit-ui-header` class.
*   **Content**: Includes Hamburger menu, Logo, and Login/Logout.

---

# 6. Branding: Background & Footer

**1. Background Image**
*   **CSS Class**: `.banner` in `index.css`.
*   **MDMS Config**: `stateInfo.bannerUrl` in `common-masters` JSON.
*   **Customization**: Replace the image URL in MDMS or override the CSS class locally.

**2. Footer Configuration**
*   **Global Config**: `DIGIT_FOOTER` in `globalConfigs.js`.
*   **Content**: Links, Copyright text, and Social icons.
*   **Customization**: Edit the global config object to change links or text.

---





# Q&A

**Thank You!**

*   **Questions?**

