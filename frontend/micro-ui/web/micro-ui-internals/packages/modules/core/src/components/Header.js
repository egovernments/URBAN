// import React from "react";
// import { useTranslation } from "react-i18next";
// import { Loader } from "@egovernments/digit-ui-react-components"

// const Header = () => {
//   const { data: storeData, isLoading } = Digit.Hooks.useStore.getInitData();
//   const { stateInfo } = storeData || {};
//   const { t } = useTranslation()

//   if (isLoading) return <Loader/>;

//   return (
//     <div className="bannerHeader">
//       <img className="bannerLogo" src={stateInfo?.logoUrl} />
//       <p>{t(`TENANT_TENANTS_${stateInfo?.code.toUpperCase()}`)}</p>
//     </div>
//   );
// }

// export default Header;



import React from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@egovernments/digit-ui-react-components"

const Header = () => {
  const { data: storeData, isLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const { t } = useTranslation()

  if (isLoading) return <Loader/>;

  return (
    <div className="bannerHeader">
      <img className="bannerLogo" style={{width:"77px",height:"77px"}} src="https://tse4.mm.bing.net/th/id/OIP.LcAu4hLmyz-LQqUVPtVC9AHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" />
      {/* <p>{t(`TENANT_TENANTS_${stateInfo?.code.toUpperCase()}`)}</p> */}
      <p>IMC</p>
    </div>
  );
}

export default Header;
