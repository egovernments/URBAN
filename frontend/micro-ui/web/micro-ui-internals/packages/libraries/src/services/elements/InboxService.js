import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const InboxGeneral = {
  Search: ({ ...filters }) => {
    return Request({
      url: Urls.InboxSearch,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      data: { ...filters },
    });
  },
  SearchV2: ({ ...filters }) => {
    return Request({
          //  url: Urls.InboxSearchV2,
      url: Urls.InboxSearch,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      data: { ...filters },
    });
  },
};
