import Axios from "axios";
import Urls from "./urls";
export const UploadServices = {
  Filestorage: async (module, filedata, tenantId) => {
    const formData = new FormData();

    formData.append("file", filedata, filedata.name);
    // formData.append("tenantId", tenantId);
    formData.append("module", module);
    let tenantInfo=`?tenantId=${tenantId}`;
    var config = {
      method: "post",
      url:`${Urls.FileStore}${tenantInfo}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true, // Send SESSION_ID cookie with request
    };

    return Axios(config);
  },

  MultipleFilesStorage: async (module, filesData, tenantId) => {
    const formData = new FormData();
    const filesArray = Array.from(filesData)
    filesArray?.forEach((fileData, index) => fileData ? formData.append("file", fileData, fileData.name) : null);
    // formData.append("tenantId", tenantId);
    formData.append("module", module);
    let tenantInfo=`?tenantId=${tenantId}`;
    var config = {
      method: "post",
      url:`${Urls.FileStore}${tenantInfo}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true, // Send SESSION_ID cookie with request
    };

    return Axios(config);
  },

  Filefetch: async (filesArray, tenantId) => {
    let tenantInfo=window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")?`?tenantId=${tenantId}`:"";
    var config = {
      method: "get",
      url:`${Urls.FileFetch}${tenantInfo}`,
      params: {
        tenantId: tenantId,
        fileStoreIds: filesArray?.join(","),
      },
      withCredentials: true, // Send SESSION_ID cookie with request
    };

    if (window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")) {
      config = {
        method: "get",
        url:`${Urls.FileFetch}${tenantInfo}`,
        params: {
          fileStoreIds: filesArray?.join(","),
        },
        withCredentials: true, // Send SESSION_ID cookie with request
      };
    }
    const res = await Axios(config);
    return res;
  },
};
