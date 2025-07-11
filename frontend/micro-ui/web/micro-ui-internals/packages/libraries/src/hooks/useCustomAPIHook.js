import { useQuery, useQueryClient } from "react-query";
import { CustomService } from "../services/elements/CustomService";
import { useMemo } from "react";

/**
 * Custom hook which can gives the privacy functions to access
 *
 * @author jagankumar-egov
 *
 * Feature :: Privacy
 *
 * @example
 *         const { privacy , updatePrivacy } = Digit.Hooks.usePrivacyContext()
 *
 * @returns {Object} Returns the object which contains privacy value and updatePrivacy method
//  */
const useCustomAPIHook = (url, params, body, plainAccessRequest, options = {}) => {
  const client = useQueryClient();
  //api name, querystr, reqbody
  const { isLoading, data } = useQuery(
    ["CUSTOM", { ...params, ...body, ...plainAccessRequest }].filter((e) => e),
    () => CustomService.getResponse({ url, params, ...body, plainAccessRequest }),
    options
  );
  return {
    isLoading,
    data,
    revalidate: () => {
      data && client.invalidateQueries({ queryKey: ["CUSTOM", { ...params, ...body, ...plainAccessRequest }] });
    },
  };
};

export default useCustomAPIHook;


// const useCustomAPIHook = ({
//   url,
//   params = {},
//   body = {},
//   config = {},
//   headers = {},
//   method = "POST",
//   plainAccessRequest,
//   changeQueryName = "Random",
//   options = {},
// }) => {
//   const client = useQueryClient();

//   // Memoize body to prevent unnecessary re-fetching
//   const stableBody = useMemo(() => JSON.stringify(body), [body]);

//   const queryKey = useMemo(() => [url, changeQueryName, stableBody], [url, changeQueryName, stableBody]);

//   // Fetch function with error handling
//   const fetchData = async () => {
//     try {
//       const response = await CustomService.getResponse({ url, params, body, plainAccessRequest, headers, method, ...options });
//       return response || null; // Ensure it never returns undefined
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error; // React Query will handle retries if needed
//     }
//   };

//   const { isLoading, data, isFetching, refetch } = useQuery(queryKey, fetchData, {
//     cacheTime: options?.cacheTime || 1000, 
//     staleTime: options?.staleTime || 5000,
//     keepPreviousData: true, 
//     retry: 2,
//     refetchOnWindowFocus: false,
//     ...config,
//   });

//   return {
//     isLoading,
//     isFetching,
//     data,
//     refetch,
//     revalidate: () => {
//       if (data) {
//         client.invalidateQueries(queryKey);
//       }
//     },
//   };
// };


// export default useCustomAPIHook;