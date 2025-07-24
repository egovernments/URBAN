

import utils from "../utils";
import userCustomInboxHook from "./userCustomInboxHook";

const Death = {
  userCustomInboxHook
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