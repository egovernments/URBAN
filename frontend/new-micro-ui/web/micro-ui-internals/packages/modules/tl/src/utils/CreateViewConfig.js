export const createConfig = (TradeLicenseData) => {
  console.log("TradeLicenseData", TradeLicenseData);

  if (!TradeLicenseData || !Array.isArray(TradeLicenseData)) {
    return {
      cards: [],
      apiResponse: {},
      additionalDetails: {},
    };
  }

  const config = {
    cards: [
      {
        sections: TradeLicenseData.map((item) => ({
          type: "DATA",
          cardHeader: {
            value: item?.title || "",
            inlineStyles: { "margin-top": "1.2em" },
            className: "estimateTable-header-class",
          },
          values: Array.isArray(item?.values)
            ? item.values.map((valueItem) => ({
                key: valueItem?.title || "",
                value: valueItem?.value || "",
              }))
            : [],
        })),
      },
    ],
    apiResponse: {},
    additionalDetails: {},
  };

  return config;
};
