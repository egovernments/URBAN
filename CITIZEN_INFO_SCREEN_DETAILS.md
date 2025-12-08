# Deep Dive: How the Citizen Info Screen is Rendered

**URL**: `http://localhost:3000/digit-ui/citizen/tl/tradelicence/new-application/info`

This screen is NOT hardcoded. It is dynamically rendered based on the configuration. Here is the chain of logic:

## 1. The Configuration Source (`config.js`)
*   **File**: `packages/modules/tl/src/config/config.js`
*   **Logic**: This file defines the "steps" of the application wizard.
*   **Code**: Look for the object with `route: "info"`.

```javascript
{
  route: "info",
  component: "TradeLicense", // <--- This maps to the React Component
  nextStep: "TradeName",     // <--- Defines where the "Next" button goes
  hideInEmployee: true,
  key: "tl",
}
```

## 2. The Component Mapping (`TradeLicense.js`)
*   **File**: `packages/modules/tl/src/pageComponents/TradeLicense.js`
*   **Logic**: The string `"TradeLicense"` in the config maps to this actual React component.
*   **What it does**: This component renders the UI you see (The "Documents Required" card). It fetches the list of documents from the MDMS database.

```javascript
const TradeLicense = ({ t, config, onSelect, ... }) => {
  // Fetches MDMS data
  const { isLoading, data: Documentsob } = Digit.Hooks.tl.useTradeLicenseMDMS(...);
  
  return (
    <Card>
      <CardHeader>{t("TL_DOC_REQ_SCREEN_HEADER")}</CardHeader>
      {/* Renders the list of documents */}
    </Card>
  );
};
```

## 3. The Router / Orchestrator (`Create/index.js`)
*   **File**: `packages/modules/tl/src/pages/citizen/Create/index.js`
*   **Logic**: This is the "Engine" that reads the config and builds the routes.
*   **Code**: It iterates through the `config` array and creates a `<Route>` for each step.

```javascript
// Iterates through the config
{config?.map((routeObj, index) => {
  const { component, texts, inputs, key } = routeObj;
  // Resolves the component string to the actual component
  const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
  
  return (
    <Route path={`${match.path}/${routeObj.route}`} key={index}>
      <Component ... /> {/* Renders TradeLicense.js */}
    </Route>
  );
})}
```

## Summary for Demo
1.  **Config**: Defines *WHAT* to show (`config.js`).
2.  **Component**: Defines *HOW* it looks (`TradeLicense.js`).
3.  **Router**: Connects them together (`Create/index.js`).
