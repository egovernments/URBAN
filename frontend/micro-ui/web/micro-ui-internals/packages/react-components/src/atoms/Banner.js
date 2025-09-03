// import React from "react";
// import { SuccessSvg,TickMark } from "./svgindex";
// import { ErrorSvg } from "./svgindex";
// import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";

// const Successful = (props) => {
//   const { t } = useTranslation();
//   const user_type = Digit.SessionStorage.get("userType");

//   return (
//     <div className={user_type === "citizen" ? "success-wrap" : "emp-success-wrap"} style={props?.props?.style ? props?.props?.style : {}}>
//       <header style={props?.props?.headerStyles ? props?.props?.headerStyles : {}}>{props.props.message}</header>
//       <div>
//         {props.props.whichSvg==="tick"? <div><TickMark fillColor="green" /><br /><br /> </div>: (props?.props?.svg || <SuccessSvg />) } 
//         {/* {props?.props?.svg || <SuccessSvg />} */}
//         {(props?.props?.complaintNumber || props.props.info) && <h2 style={props?.props?.infoStyles ? props?.props?.infoStyles : {}}>{props?.props?.complaintNumber ? t("CS_PGR_COMPLAINT_NUMBER") : props.props.info}</h2>}
//         {(props?.props?.complaintNumber || props?.props?.applicationNumber) &&<p style={props?.props?.applicationNumberStyles ? props?.props?.applicationNumberStyles : {}}>{props?.props?.complaintNumber ? props?.props?.complaintNumber : props?.props?.applicationNumber}</p>}
//         {props?.props?.applicationNumberOne ? <h2 style={props?.props?.infoOneStyles ? props?.props?.infoOneStyles : {}}>{props.props.infoOne}</h2> : null}
//         {props?.props?.applicationNumberOne ? <p style={props?.props?.applicationNumberStyles ? props?.props?.applicationNumberStyles : {}}>{props?.props?.applicationNumberOne}</p> : null}
//       </div>
//     </div>
//   );
// };

// const Error = (props) => {
//   const { t } = useTranslation();
//   const user_type = Digit.SessionStorage.get("userType");

//   return (
//     <div className={user_type === "citizen" ? "error-wrap" : "emp-error-wrap"} style={props?.props?.style ? props?.props?.style : {}}>
//       <header style={props?.props?.headerStyles ? props?.props?.headerStyles : {}}>{props.props.message}</header>
//       <ErrorSvg />
//       {/* <img src={error} alt="error while submition"/> */}
//       <h2 style={props?.props?.infoStyles ? props?.props?.infoStyles : {}}>{props?.props?.complaintNumber ? t("CS_PGR_COMPLAINT_NUMBER") : props.props.info}</h2>
//       <p style={props?.props?.applicationNumberStyles ? props?.props?.applicationNumberStyles : {}}>{props?.props?.complaintNumber ? props?.props?.complaintNumber : props?.props?.applicationNumber}</p>
//     </div>
//   );
// };

// const Banner = (props) => {
//   return props.successful ? <Successful props={props} /> : <Error props={props} />;
// };

// Banner.propTypes = {
//   /**
//    * Is banner is successful or error?
//    */
//   successful: PropTypes.bool.isRequired,
//   /**
//    * Banner message
//    */
//   message: PropTypes.any.isRequired,
//   /**
//    * If banner is successful, then show the complaint number
//    */
//   complaintNumber: PropTypes.any,
// };

// Banner.defaultProps = {
//   successful: true,
// };

// export default Banner;


import React from "react";
import { SuccessSvg, TickMark, ErrorSvg } from "./svgindex";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
const styles = {
  successModal: {
    borderRadius: "8px",
    padding: "2rem",
    marginTop: "2rem",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  successIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#000",
    border: "3px solid green",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successButton: {
    marginTop: "1rem",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#6A1B9A",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorModal: {
    borderRadius: "8px",
    padding: "2rem",
    marginTop: "2rem",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  errorIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: "3px solid red",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorButton: {
    marginTop: "1rem",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#D32F2F",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const Successful = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const user_type = Digit.SessionStorage.get("userType");

  const onClose = props?.props?.onClose || (() => {});


  return (
    <div
      className={user_type === "citizen" ? "success-wrap" : "emp-success-wrap"}
      style={styles.successModal}
    >
      <div style={styles.successIcon}>
        <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
      </div>

      <h2 style={{ marginTop: "1rem",color:"#000000" }}>
        {props.props.message || t("Application Submitted Successfully")}
      </h2>

      <p style={{ color: "gray",marginTop:"1rem" }}>
        {props.props.info || t("Application Number")}
        <br />
        <strong>
          {props.props.applicationNumber ||
            props.props.complaintNumber ||
            "Example: PG-AC-2024"}
        </strong>
      </p>

      {props?.props?.applicationNumberOne ? (
        <>
          <h2>{props.props.infoOne}</h2>
          <p>{props.props.applicationNumberOne}</p>
        </>
      ) : null}

      <button onClick={() => history.push("/digit-ui/employee")} style={styles.successButton}>
        {t("Home")}
      </button>
    </div>
  );
};

const Error = (props) => {
  const { t } = useTranslation();
  const user_type = Digit.SessionStorage.get("userType");

  const onClose = props?.props?.onClose || (() => {});

  return (
    <div
      className={user_type === "citizen" ? "error-wrap" : "emp-error-wrap"}
      style={styles.errorModal}
    >
      <div style={styles.errorIcon}>
        <span style={{ color: "red", fontSize: "1.5rem" }}>✖</span>
      </div>

      <h2 style={{ marginTop: "1rem" }}>
        {props.props.message || t("Something went wrong")}
      </h2>

      <p style={{ color: "gray" }}>
        {props?.props?.complaintNumber
          ? t("CS_PGR_COMPLAINT_NUMBER")
          : props.props.info}
        <br />
        <strong>
          {props?.props?.complaintNumber ||
            props?.props?.applicationNumber ||
            "Error-ID: PG-ERR-2024"}
        </strong>
      </p>

      <button onClick={onClose} style={styles.errorButton}>
        {t("Home")}
      </button>
    </div>
  );
};

const Banner = (props) => {
  return props.successful ? <Successful props={props} /> : <Error props={props} />;
};

Banner.propTypes = {
  successful: PropTypes.bool.isRequired,
  message: PropTypes.any.isRequired,
  complaintNumber: PropTypes.any,
  applicationNumber: PropTypes.any,
  info: PropTypes.any,
  infoOne: PropTypes.any,
  applicationNumberOne: PropTypes.any,
  onClose: PropTypes.func,
};

Banner.defaultProps = {
  successful: true,
};

export default Banner;
