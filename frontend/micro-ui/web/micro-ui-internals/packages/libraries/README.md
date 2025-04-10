# digit-ui-libraries

> Made with @egovernments/create-ui-library

## Install

```bash
npm install --save @egovernments/digit-ui-libraries
```

## Limitation

```bash
This Package is more specific to Urban
```

## Usage

```jsx
import React from "react";
import initLibraries from "@egovernments/digit-ui-libraries";

import defaultConfig from "./config";

const App = ({ deltaConfig, stateCode, cityCode, moduleCode }) => {
  initLibraries();

  const store = eGov.Services.useStore(defaultConfig, { deltaConfig, stateCode, cityCode, moduleCode });

  return <p>Create React Library Example 😄</p>;
};

export default App;
```

## Changelog

### Summary for Version [1.7.35] - 2025-03-20

Added tenantId in Multiple api calls of obps, bills, tl, pt etc

## License

MIT © [](https://github.com/)