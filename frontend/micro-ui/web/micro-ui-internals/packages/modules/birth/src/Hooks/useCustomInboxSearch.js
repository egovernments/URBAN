import useCustomAPIHook from "../../../../libraries/src/hooks/useCustomAPIHook";
import { useMemo, useEffect } from "react";

const useCustomInboxSearch = (args) => {

  const { url, params = {}, body = {}, plainAccessRequest = {}, options = {}, ...rest } = args || {};

  const { isLoading, data, ...other } = useCustomAPIHook(url, params, body, plainAccessRequest, options);



  const processedData = useMemo(() => {
    return data;
  }, [data]);

  return { isLoading, data: processedData, ...other };
};

export default useCustomInboxSearch;
