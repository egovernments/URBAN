
import useCustomInboxSearch from "./useCustomInboxSearch";
import utils from "../utils";



const Birth = {
  useCustomInboxSearch,
};

const Hooks = {
  Birth,
};

const Utils = {
  browser: {
    Birth: () => {},
  },
  Birth: {
    ...utils,
  },
};

export const CustomisedHooks = {
  Hooks,
  Utils,
};
