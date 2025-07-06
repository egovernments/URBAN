
import utils from "../utils";

const Birth = {
};

const Hooks = {
  Birth
};

const Utils = {
  browser: {
    Birth: () => { },
  },
  Birth: {
    ...utils,
  },
};

export const CustomisedHooks = {
  Hooks,
  Utils,
};