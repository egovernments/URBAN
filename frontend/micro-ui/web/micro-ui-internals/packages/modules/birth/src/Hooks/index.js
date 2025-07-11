
import utils from "../utils";
import userCustomInboxHook from "./userCustomInboxHook";

const Birth = {
  userCustomInboxHook
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