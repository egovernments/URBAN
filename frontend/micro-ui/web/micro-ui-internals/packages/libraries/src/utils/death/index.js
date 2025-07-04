import BrowserUtil from "./browser";
import * as date from "./date";
import * as dss from "./dss";
import * as locale from "./locale";
import * as obps from "./obps";
import * as pt from "./pt";
import * as privacy from "./privacy";
import PDFUtil, { downloadReceipt ,downloadPDFFromLink,downloadBill ,getFileUrl} from "./pdf";
import getFileTypeFromFileStoreURL from "./fileType";
// import preProcessMDMSConfig from "./preProcessMDMSConfig";
// import preProcessMDMSConfigInboxSearch from "./preProcessMDMSConfigInboxSearch";
// import * as parsingUtils from "../services/atoms/Utils/ParsingUtils"
// import { iconRender } from "./iconRender";
// import {getFieldIdName} from "./field";

const didEmployeeHasRole = (role = "") => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const userInfo = Digit.UserService.getUser();
    const rolearray = userInfo?.info?.roles.filter((item) => {
      if (item.code === role && item.tenantId === tenantId) return true;
    });
    return rolearray?.length > 0;
  };


const didEmployeeHasAtleastOneRole = (roles = []) => {
    return roles.some((role) => didEmployeeHasRole(role));
  };

  export default {
    didEmployeeHasRole,
    didEmployeeHasAtleastOneRole,
  }