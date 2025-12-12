// export const options = {
//   "rainmaker-pgr-nonframework": [
//     {

//       reportResultUrl: "/report/rainmaker-pgr/reportname/_get",
//       metaDataUrl: "/report/rainmaker-pgr/reportname/metadata/_get",
//       customReportName: "SourceWiseReport",
//       needDefaultSearch: true,
//     },
//   ]
// };

export const getResultUrl = (moduleName,reportName) => {
  let windowURL = window.location.href;
  let endpoints = windowURL.includes("report-v2") ? "report-v2" : "report";
  let reportResultUrl = `/${endpoints}/${moduleName}/_get`;
  return reportResultUrl;
}

export const getMetaDataUrl = (moduleName,reportName) => {
  let windowURL = window.location.href;
  let endpoints = windowURL.includes("report-v2") ? "report-v2" : "report";
  let metaDataUrl = `/${endpoints}/${moduleName}/metadata/_get`;
  //let metaDataUrl = `/report/${moduleName}/metadata/_get`;
  return metaDataUrl;
};

export const getReportName = (moduleName, reportName) => {
  let finalName = reportName;
  return finalName;
};


// export const getResultUrl = (moduleName) => {
//   let reportResultUrl = options[moduleName] ? options[moduleName][0].reportResultUrl : "/report/" + moduleName + "/_get";
//   return reportResultUrl;
// };

// export const getMetaDataUrl = (moduleName,reportName) => {
//   let metaDataUrl = options[moduleName] ? options[moduleName][0].metaDataUrl : `/report/${moduleName}/${reportName}/metadata/_get`;
//   return metaDataUrl;
// };

// export const getReportName = (moduleName, reportName) => {
//   let finalName = options[moduleName] && options[moduleName][0].customReportName ? options[moduleName][0].customReportName : reportName;
//   return finalName;
// };
