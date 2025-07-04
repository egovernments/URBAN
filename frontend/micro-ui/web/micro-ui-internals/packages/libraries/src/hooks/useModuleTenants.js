import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const useModuleTenants = (module, config = {}) => {
  const { t } = useTranslation();

  return useQuery(
    ["ULB_TENANTS", module],
    () => {
      const initData = Digit.SessionStorage.get("initData");

      if (!initData) {
        throw new Error("Missing initData from SessionStorage");
      }

      return initData;
    },
    {
      select: (data) => {
        try {

          const moduleData = data.modules.find((e) => e.module === module);

          if (!moduleData) {
            return { ddr: [], ulb: [] };
          }

          const transformedTenants = moduleData.tenants.map((tenant) => {
            const tenantCodeKey = `TENANT_TENANTS_${tenant?.code?.toUpperCase?.()?.replace(".", "_")}`;
            const tenantObj = data.tenants.find((t) => t.code === tenant.code);
            const districtCode = tenantObj?.city?.districtTenantCode;

            if (!districtCode) {
            }

            const ddrKey = `DDR_${districtCode?.toUpperCase?.()?.replace(".", "_")}`;
            const ulbKey = t(tenantCodeKey);
            const ddrTranslatedKey = t(ddrKey);



            return {
              ...tenant,
              ulbKey,
              ddrKey: ddrTranslatedKey,
            };
          });

          const ddr = transformedTenants.filter(
            (item, index, arr) => index === arr.findIndex((t) => t.ddrKey === item.ddrKey)
          );



          return {
            ddr,
            ulb: transformedTenants,
          };
        } catch (error) {
          return { ddr: [], ulb: [] };
        }
      },
      ...config,
    }
  );
};

export default useModuleTenants;