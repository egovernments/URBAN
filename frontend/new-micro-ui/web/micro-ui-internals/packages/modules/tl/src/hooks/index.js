import { useTLInbox } from "./useInbox";
import useApplicationDetail from "./useApplicationDetail";

const tl = {
  useInbox: useTLInbox,
  useApplicationDetail,
};

const Hooks = {
  tl,
};

export const CustomisedHooks = {
  Hooks,
};
