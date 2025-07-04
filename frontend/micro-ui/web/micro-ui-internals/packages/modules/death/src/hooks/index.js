// import utils from "../utils";

// const tl = {
// };

// const Hooks = {
//   tl,
// };

// const Utils = {
  
// }

// export const CustomisedHooks = {
//   Hooks,
// };

import utils from "../utils";

const Death = {
};

const Hooks = {
  Death
};

const Utils = {
  browser: {
    Death: () => { },
  },
  Death: {
    ...utils,
  },
};

export const CustomisedHooks = {
  Hooks,
  Utils,
};