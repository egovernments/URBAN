import LoadingIndicator from "egov-ui-framework/ui-molecules/LoadingIndicator";
import MenuButton from "egov-ui-framework/ui-molecules/MenuButton";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import ServiceList from "egov-ui-kit/common/common/ServiceList";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale, getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { connect } from "react-redux";
import FilterDialog from "./components/FilterDialog";
import TableData from "./components/TableData";
import "./index.css";

class Inbox extends Component {
  state = {
    actionList: [],
    hasWorkflow: false,
    filterPopupOpen: false
  };

  componentDidMount = () => {
    // FIX: Removed redundant localization fetch - App.js already handles this
    // Old code was causing duplicate API calls (language-selection → inbox = 3 calls)
    // Now App.js loads from IndexedDB on startup, so this call is unnecessary

    // const { fetchLocalizationLabel } = this.props
    // const tenantId = getTenantId();
    // fetchLocalizationLabel(getLocale(), tenantId, tenantId);

    console.log('Log => ** [Inbox] componentDidMount - Skipping localization fetch (handled by App.js)');
  }


  componentWillReceiveProps(nextProps) {
    const { menu } = nextProps;
    const workflowList = menu && menu.filter((item) => item.name === "rainmaker-common-workflow");
    if (workflowList && workflowList.length > 0) {
      this.setState({
        hasWorkflow: true,
      });
    } else {
      this.setState({
        hasWorkflow: false,
      });
    }

    const list = menu && menu.filter((item) => item.url === "card");
    this.setState({
      actionList: list,
    });
  }

  handleClose = () => {
    this.setState({ filterPopupOpen: false });
  };

  onPopupOpen = () => {
    this.setState({ filterPopupOpen: true });
  }

  render() {
    const { name, history, setRoute, menu, Loading } = this.props;
    const { hasWorkflow } = this.state;
    const a = menu ? menu.filter(item => item.url === "quickAction") : [];
    const downloadMenu = a.map((obj, index) => {
      return {
        labelName: obj.displayName,
        labelKey: `ACTION_TEST_${obj.displayName.toUpperCase().replace(/[._:-\s\/]/g, "_")}`,
        link: () => {
          if (obj.navigationURL === "tradelicence/apply") {
            this.props.setRequiredDocumentFlag();
          }
          if (obj.navigationURL && obj.navigationURL.includes('digit-ui')) {
            window.location.href = obj.navigationURL;
            return;
          } else {
            setRoute(obj.navigationURL)
          }
        }
      }
    })
    const { isLoading } = Loading;
    const buttonItems = {
      label: { labelName: "Take Action", labelKey: "INBOX_QUICK_ACTION" },
      rightIcon: "arrow_drop_down",
      props: { variant: "outlined", style: { marginLeft: 5, marginRight: 15, marginTop: 10, backgroundColor: "#FE7A51", color: "#fff", border: "none", height: "40px", width: "200px" } },
      menu: downloadMenu
    }

    return (
      <div>
        {/* <marquee style={{ color: "red", fontStyle: "italic", fontSize: "20px", margin: "20px 0" }}>
          Planned Downtime Notice: The mSeva Punjab application will be unavailable from 15th August 2025 to 18th August 2025 due to scheduled maintenance. We regret the inconvenience and appreciate your understanding.
        </marquee> */}
        <div className="rainmaker-topHeader" style={{ marginTop: "0px", justifyContent: "space-between" }}>
          {Loading && isLoading && <LoadingIndicator></LoadingIndicator>}
          <div className="rainmaker-topHeader flex">
            <Label className="landingPageHeader flex-child" label={"CS_LANDING_PAGE_WELCOME_TEXT"} />
            <Label className="landingPageUser flex-child" label={name} />,
          </div>
          {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => window.open("https://genbidemo.aibott.org/", "_blank", "noopener,noreferrer")}
              style={{
                backgroundColor: "#FE7A51",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "background-color 0.3s ease",
                height: "40px",
                marginRight: "0px",
                margin: "10px 15px 0px 5px"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#E86A41"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#FE7A51"}
            >
              GenBi
            </button>
            <div className="quick-action-button">
              <MenuButton data={buttonItems} />
            </div>
          </div> */}
          <div className="quick-action-button">
            <MenuButton data={buttonItems} />
          </div>
        </div>
        <div className={"inbox-service-list"}>
          <ServiceList history={history} />
        </div>

        {hasWorkflow && <TableData onPopupOpen={this.onPopupOpen} />}
        <FilterDialog popupOpen={this.state.filterPopupOpen} popupClose={this.handleClose} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app, screenConfiguration } = state;
  const { menu } = app;
  const { userInfo } = auth;
  const name = auth && userInfo.name;
  const { preparedFinalObject } = screenConfiguration;
  const { Loading = {} } = preparedFinalObject;
  const { isLoading } = Loading;
  return { name, menu, Loading, isLoading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: url => dispatch(setRoute(url)),
    fetchLocalizationLabel: (locale, tenantId, module) => dispatch(fetchLocalizationLabel(locale, tenantId, module)),
    setRequiredDocumentFlag: () => dispatch(prepareFinalObject("isRequiredDocuments", true))
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Inbox);
