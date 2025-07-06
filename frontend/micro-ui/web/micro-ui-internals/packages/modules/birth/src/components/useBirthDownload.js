import { useState } from 'react';

const useBirthDownload = () => {
  const [consumerCode, setConsumerCode] = useState(null);

  const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/birth/_download",
    method: "POST",
  });

  const downloadApi = async (tenantId, id) => {
    try {
      // console.log("Calling download API with tenantId:", tenantId, "and id:", id);
      const response = await downloadMutation.mutateAsync({
        url: "/birth-death-services/birth/_download",
        params: { tenantId, id, source: "web" },
      });
      // console.log("Download API response:", response),"@@@@@@";
      return response?.consumerCode || null;
    } catch (error) {
      console.error("Download API error:", error);
      return null;
    }
  };

  return { consumerCode, downloadApi };
};

export default useBirthDownload;