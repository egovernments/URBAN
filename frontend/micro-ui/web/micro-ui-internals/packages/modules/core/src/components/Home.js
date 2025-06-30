import {
  BackButton,
  BillsIcon,
  CitizenHomeCard,
  CitizenInfoLabel,
  FSMIcon,
  Loader,
  MCollectIcon,
  OBPSIcon,
  PGRIcon,
  PTIcon,
  TLIcon,
  WSICon,
  Card
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
const cardData = [
  {
    icon: "⏳", // Pending
    count: "1,245",
    label: "Pending",
    bgColor: "#E6F0FA",
  },
  {
    icon: "❌", // Rejected
    count: "1089",
    label: "Rejected",
    bgColor: "#FDEBEC",
  },
  {
    icon: "↩️", // Send Back
    count: "1089",
    label: "Send Back",
    bgColor: "#FDEBEC",
  },
  {
    icon: "✔️", // Approved
    count: "1089",
    label: "Approved",
    bgColor: "#EAF8EE",
  },
];
/* 
Feature :: Citizen All service screen cards
*/
export const processLinkData = (newData, code, t) => {
  const obj = newData?.[`${code}`];
  if (obj) {
    obj.map((link) => {
      (link.link = link["navigationURL"]), (link.i18nKey = t(link["name"]));
    });
  }
  const newObj = {
    links: obj?.reverse(),
    header: Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${code}`),
    iconName: `CITIZEN_${code}_ICON`,
  };
  if (code === "FSM") {
    const roleBasedLoginRoutes = [
      {
        role: "FSM_DSO",
        from: "/digit-ui/citizen/fsm/dso-dashboard",
        dashoardLink: "CS_LINK_DSO_DASHBOARD",
        loginLink: "CS_LINK_LOGIN_DSO",
      },
    ];
    //RAIN-7297
    roleBasedLoginRoutes.map(({ role, from, loginLink, dashoardLink }) => {
      if (Digit.UserService.hasAccess(role))
        newObj?.links?.push({
          link: from,
          i18nKey: t(dashoardLink),
        });
      else
        newObj?.links?.push({
          link: "/digit-ui/citizen/login",
          state: { role: "FSM_DSO", from },
          i18nKey: t(loginLink),
        });
    });
  }

  return newObj;
};
const iconSelector = (code) => {
  switch (code) {
    case "PT":
      return <PTIcon className="fill-path-primary-main" />;
    case "WS":
      return <WSICon className="fill-path-primary-main" />;
    case "FSM":
      return <FSMIcon className="fill-path-primary-main" />;
    case "MCollect":
      return <MCollectIcon className="fill-path-primary-main" />;
    case "PGR":
      return <PGRIcon className="fill-path-primary-main" />;
    case "TL":
      return <TLIcon className="fill-path-primary-main" />;
    case "OBPS":
      return <OBPSIcon className="fill-path-primary-main" />;
    case "Bills":
      return <BillsIcon className="fill-path-primary-main" />;
    default:
      return <PTIcon className="fill-path-primary-main" />;
  }
};
const CitizenHome = ({ modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
  const paymentModule = modules.filter(({ code }) => code === "Payment")[0];
  const moduleArr = modules.filter(({ code }) => code !== "Payment");
  const moduleArray = [paymentModule, ...moduleArr];
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div className="citizen-all-services-wrapper">
        <BackButton />
        <div className="citizenAllServiceGrid">
          {moduleArray
            .filter((mod) => mod)
            .map(({ code }, index) => {
              let mdmsDataObj;
              if (fetchedCitizen) mdmsDataObj = fetchedCitizen ? processLinkData(getCitizenMenu, code, t) : undefined;
              if (mdmsDataObj?.links?.length > 0) {
                return (
                  <CitizenHomeCard
                    header={t(mdmsDataObj?.header)}
                    links={mdmsDataObj?.links?.filter((ele) => ele?.link)?.sort((x, y) => x?.orderNumber - y?.orderNumber)}
                    Icon={() => iconSelector(code)}
                    Info={
                      code === "OBPS"
                        ? () => (
                          <CitizenInfoLabel
                            style={{ margin: "0px", padding: "10px" }}
                            info={t("CS_FILE_APPLICATION_INFO_LABEL")}
                            text={t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)}
                          />
                        )
                        : null
                    }
                    isInfo={code === "OBPS" ? true : false}
                  />
                );
              } else return <React.Fragment />;
            })}
        </div>
      </div>
    </React.Fragment>
  );
};
// Section.jsx
const Section = ({ title, items, color }) => (
  <div
    style={{
      // border: "1px solid #eee",
      borderRadius: "8px",
      // padding: "16px",
      marginBottom: "20px",
      background: "#fff",
      flex: 1,
      minWidth: "300px",
    }}
  >
    <h4
      style={{
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "100%",
        letterSpacing: "3%",
        color: "#4729A3",
        borderBottom: `1px solid #F2F0F0`,
        paddingBottom: "10px"
      }}
    >
      {title}
    </h4>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: "8px" }}>
          <a
            href={item.url || "#"}
            style={{
              fontSize: "14px",
              color: "#333",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            › {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const EmployeeHome = ({ modules }) => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    background: "#f9f9ff",
    width: "100%",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px"
  };

  if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});
  return (
    <div className="employee-app-container">
      <div className="ground-container moduleCardWrapper gridModuleWrapper" style={{ padding: "0px", margin: "0px" }}>
        {/* {modules?.map(({ code }, index) => {
          const Card = Digit.ComponentRegistryService.getComponent(`${code}Card`) || (() => <React.Fragment />);
          return <Card key={index} />;
        })} */}
        <Card style={{ width: "100%" }}>
          <h4 style={styles.title}>
            Overview <span style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "3%",
              color: "#4729A3",
            }}>(Application Status Till Date)</span>
          </h4>
          <div style={styles.cardContainer}>
            {cardData.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={{ ...styles.iconCircle, backgroundColor: item.bgColor }}>
                  <span style={styles.icon}>{item.icon}</span>
                </div>
                <div>
                  <div style={styles.count}>{item.count}</div>
                  <div style={styles.label}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#734500" title="New Application" items={[
              { label: "Property Mutation", url: "/mutation" },
              { label: "Track Transfer", url: "/track-transfer" },
              { label: "New Property Application", url: "/digit-ui/employee/pt/new-application" },
              { label: "No dues apply", url: "/no-dues" },
              { label: "Track New applications", url: "/track-new" },
              { label: "Search Application Inbox", url: "/digit-ui/employee/pt/application-search" },
              { label: "Check Calculation only", url: "/tax-calc" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#C64ABA" title="Cash Desk" items={[
              { label: "Cash Desk", url: "/digit-ui/employee/pt/search" },
              { label: "Duplicate Receipt", url: "/duplicate-receipt" },
              { label: "Check Online payment Status with bank", url: "/payment-status" },
              { label: "Katta details", url: "/katta-details" }
            ]} />
            <Section color="#C64ABA" title="Reports" items={[
              { label: "Collection Report", url: "/collection-report" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#C64ABA" title="Other Options For User" items={[
              { label: "Extended Property Dashboard/other Options", url: "/property-dashboard" }
            ]} />
            <Section color="#C64ABA" title="Add" items={[
              { label: "Ward/ colony mapping", url: "/ward-mapping" },
              { label: "New missing property", url: "/missing-property" }
            ]} />
          </div>
        </Card>

        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#734500" title="All Types of Correction" items={[
              { label: "Arrears Correction/Posting", url: "/arrears-correction" },
              { label: "Demand Correction Head Wise", url: "/demand-correction" },
              { label: "Change In Property Details", url: "/digit-ui/employee/pt/inbox" },
              { label: "Automatic Calculation and arrears posting", url: "/auto-arrear-posting" },
              { label: "Arrear Correction Credit Delete", url: "/arrear-credit-delete" },
              { label: "Katta NOC", url: "/katta-noc" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#734500" title="Approval" items={[
              { label: "Pending Approval", url: "/pending-approval" },
              { label: "Pending Transfer Approval", url: "/pending-transfer" },
              { label: "New missing property", url: "/missing-property" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#FC6161" title="Property Freeze" items={[
              { label: "Property Freeze", url: "/freeze" },
              { label: "Freeze Report", url: "/freeze-report" },
              { label: "No Dues Certificate Download", url: "/no-dues-download" },
              { label: "Property Unfreeze", url: "/unfreeze" },
              { label: "New Property Certificate", url: "/property-certificate" },
              { label: "No Dues Certificate Upload", url: "/no-dues-upload" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#FC6161" title="Account cash desk" items={[
              { label: "Day Closer", url: "/day-closer" },
              { label: "Collection Report", url: "/collection-report" },
              { label: "Cheque Payment Approve", url: "/cheque-approve" }
            ]} />
            <Section color="#FC6161" title="Delete receipt" items={[
              { label: "Delete receipt", url: "/delete-receipt" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#169439" title="MIS Reports" items={[
              { label: "Defaulter List", url: "/defaulter-list" },
              { label: "Property New SAF Vs Namantaran Vs Change", url: "/property-vs-change" },
              { label: "Namantaran", url: "/namantaran-info" },
              { label: "Online Payment", url: "/online-payment" },
              { label: "Track Log ", url: "/track-log" },
              { label: "Central Collection Report/सेंट्रल कलेक्शन रिपोर्ट", url: "/central-collection" },
              { label: "Madhwise Demand Vs Collection", url: "/demand-vs-collection" },
              { label: "Deletion Receipts", url: "/deletion-receipts" },
              { label: "Ward Wise Collection/वार्ड वाइज कलेक्शन", url: "/ward-collection" },
              { label: "New Property (Missing) / लुप्तप्राय: नई संपत्ति प्रविष्टि", url: "/missing-new-property" },
              { label: "Cheque Collection/चेक कलेक्शन", url: "/cheque-collection" },
              { label: "New Property", url: "/new-property" },
              { label: "Property Transfer/संपत्ति ट्रांसफर", url: "/property-transfer" },
              { label: "Arrears Correction Report/बकाया: अरेयर्स करेक्शन रिपोर्ट", url: "/arrears-correction-report" },
              { label: "Defaulter List in Excel", url: "/defaulters-excel" }
            ]} />
          </div>
        </Card>
        <Card style={{ width: "100%" }}>
          <div style={gridStyle}>
            <Section color="#169439" title="Profile" items={[
              { label: "Change Password / पासवर्ड बदलें", url: "/change-password" }
            ]} />
          </div>
        </Card>

      </div>
    </div>
  );
};
const styles = {
  wrapper: {
    // border: "1px solid #E2E2E2",
    // borderRadius: "8px",
    // padding: "16px",
    // backgroundColor: "#fff",
    // maxWidth: "900px",
    // margin: "20px auto",
    // fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "3%",
    color: "#4729A3",
    borderBottom: `1px solid #F2F0F0`,
    paddingBottom: "10px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
    // border: "1px solid #4848481A"
  },
  card: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "262px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    display: "flex"
  },
  iconCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    // margin: "0 auto 10px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: "18px",
  },
  count: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2D2D2D",
  },
  label: {
    fontSize: "14px",
    color: "#666",
    marginTop: "4px",
  },
};
export const AppHome = ({ userType, modules, getCitizenMenu, fetchedCitizen, isLoading }) => {
  if (userType === "citizen") {
    return <CitizenHome modules={modules} getCitizenMenu={getCitizenMenu} fetchedCitizen={fetchedCitizen} isLoading={isLoading} />;
  }
  return <EmployeeHome modules={modules} />;
};
