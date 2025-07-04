// import { useState } from 'react';

// const useDeathDownload = () => {
//   const [consumerCode, setConsumerCode] = useState(null);

//   const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
//     url: "/birth-death-services/death/_download",
//     method: "POST",
//   });

//   const downloadApi = async (tenantId, id) => {
//     try {
//       const response = await downloadMutation.mutateAsync({
//         url: "/birth-death-services/death/_download",
//         params: {
//           tenantId: tenantId,
//           id: id,
//           source: "web"
//         },
//       });

//       const code = response?.consumerCode;
//       if (code) {
//         setConsumerCode(code);
//         return code;
//       }
//       return null;
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   };

//   return { 
//     consumerCode, 
//     downloadApi 
//   };
// };

// export default useDeathDownload;


import { useState } from 'react';

const useDeathDownload = () => {
  const [consumerCode, setConsumerCode] = useState(null);

  const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/death/_download",
    method: "POST",
  });

  const downloadApi = async (tenantId, id) => {
    try {
      const response = await downloadMutation.mutateAsync({
        url: "/birth-death-services/death/_download",
        params: { tenantId, id, source: "web" },
      });
      return response?.consumerCode || null;
    } catch (error) {
      console.error("Download API error:", error);
      return null;
    }
  };

  return { consumerCode, downloadApi };
};

export default useDeathDownload;