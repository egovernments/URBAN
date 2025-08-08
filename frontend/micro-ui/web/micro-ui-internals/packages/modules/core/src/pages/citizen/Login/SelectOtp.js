import React, { useState, Fragment } from "react";
import { ButtonSelector, CardText, FormStep, LinkButton, OTPInput, CardLabelError } from "@egovernments/digit-ui-react-components";
import useInterval from "../../../hooks/useInterval";

const SelectOtp = ({ config, otp, onOtpChange, onResend, onSelect, t, error, userType = "citizen", canSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useInterval(
    () => {
      setTimeLeft(timeLeft - 1);
    },
    timeLeft > 0 ? 1000 : null
  );

  const handleResendOtp = () => {
    onResend();
    setTimeLeft(2);
  };

  if (userType === "employee") {
    return (
      <Fragment>
        <OTPInput length={6} onChange={onOtpChange} value={otp} />
        {timeLeft > 0 ? (
          <CardText>{`${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t("CS_RESEND_SECONDS")}`}</CardText>
        ) : (
          <p className="card-text-button" onClick={handleResendOtp}>
            {t("CS_RESEND_OTP")}
          </p>
        )}
        {!error && <CardLabelError>{t("CS_INVALID_OTP")}</CardLabelError>}
      </Fragment>
    );
  }

  return (
        <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Enter OTP</h2>
        <p style={styles.subtitle}>OTP sent to your mobile number. OTP is valid for 5 min.</p>

        <div style={styles.otpWrapper}>
          <OTPInput length={6} onChange={onOtpChange} value={otp} />
        </div>

        <button
          style={{
            ...styles.verifyBtn,
            backgroundColor: otp?.length === 6 && canSubmit ? "#6B133F" : "#ccc",
            cursor: otp?.length === 6 && canSubmit ? "pointer" : "not-allowed",
          }}
          onClick={() => onSelect(config.key, otp)}
          disabled={!(otp?.length === 6 && canSubmit)}
        >
          Verify
        </button>

        <p style={styles.resendText}>
          Didn’t receive code?{" "}
          {timeLeft > 0 ? (
            <span style={styles.resendTimer}>Resend in {`00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`}</span>
          ) : (
            <span style={styles.resendLink} onClick={handleResendOtp}>
              Resend
            </span>
          )}
        </p>
        {!error && <CardLabelError>{t("CS_INVALID_OTP")}</CardLabelError>}
        <p style={styles.returnLogin}>Return to Login</p>
      </div>
    </div>
  );
};

export default SelectOtp;


const styles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  title: {
    marginBottom: "8px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "16px",
  },
  otpWrapper: {
    marginBottom: "24px",
  },
  verifyBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
  },
  resendText: {
    marginTop: "16px",
    fontSize: "14px",
  },
  resendTimer: {
    fontWeight: "bold",
    color: "#555",
  },
  resendLink: {
    color: "#6B133F",
    fontWeight: "bold",
    cursor: "pointer",
  },
  returnLogin: {
    marginTop: "16px",
    color: "#6B133F",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
