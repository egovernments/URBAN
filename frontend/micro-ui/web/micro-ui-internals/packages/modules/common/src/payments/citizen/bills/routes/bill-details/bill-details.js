// import { Card, CardSubHeader, Header, KeyNote, Loader, RadioButtons, SubmitBar, TextInput } from "@egovernments/digit-ui-react-components";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory, useLocation, useParams, Redirect } from "react-router-dom";
// import ArrearSummary from "./arrear-summary";
// import BillSumary from "./bill-summary";
// import { stringReplaceAll } from "./utils";

// const BillDetails = ({ paymentRules, businessService }) => {
//   const { t } = useTranslation();
//   const history = useHistory();
//   const { state, pathname, search } = useLocation();
//   const userInfo = Digit.UserService.getUser();
//   let { consumerCode } = useParams();
//   const { workflow: wrkflow, tenantId: _tenantId, authorization, ConsumerName } = Digit.Hooks.useQueryParams();
//   const [bill, setBill] = useState(state?.bill);
//   const tenantId = state?.tenantId || _tenantId || Digit.UserService.getUser().info?.tenantId;
//   const propertyId = state?.propertyId;
//   if (wrkflow === "WNS" && consumerCode.includes("?")) consumerCode = consumerCode.substring(0, consumerCode.indexOf("?"));
//   const { data, isLoading } = state?.bill
//     ? { isLoading: false }
//     : Digit.Hooks.useFetchPayment({
//         tenantId,
//         businessService,
//         consumerCode: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode,
//       });

//   let Useruuid = data?.Bill?.[0]?.userId || "";
//   let requestCriteria = [
//     "/user/_search",
//     {},
//     { data: { uuid: [Useruuid] } },
//     { recordId: Useruuid, plainRequestFields: ["mobileNumber"] },
//     {
//       enabled: Useruuid ? true : false,
//       cacheTime: 100,
//     },
//   ];

//   const { isLoading: isUserLoading, data: userData, revalidate } = Digit.Hooks.useCustomAPIHook(...requestCriteria);
  
//   const { isLoading: isFSMLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.fsm.useApplicationDetail(
//     t,
//     tenantId,
//     consumerCode,
//     { enabled: pathname.includes("FSM") ? true : false },
//     "CITIZEN"
//   );
//   let { minAmountPayable, isAdvanceAllowed } = paymentRules;
//   minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;
//   const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || [];
//   const Arrears =
//     bill?.billDetails
//       ?.sort((a, b) => b.fromPeriod - a.fromPeriod)
//       ?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0;

//   const { key, label } = Digit.Hooks.useApplicationsForBusinessServiceSearch({ businessService }, { enabled: false });
//   const getBillingPeriod = () => {
//     const { fromPeriod, toPeriod } = billDetails;
//     if (fromPeriod && toPeriod) {
//       let from, to;
//       if (wrkflow === "mcollect" || wrkflow === "WNS") {
//         from =
//           new Date(fromPeriod).getDate().toString() +
//           " " +
//           Digit.Utils.date.monthNames[new Date(fromPeriod).getMonth()]?.toString() +
//           " " +
//           new Date(fromPeriod).getFullYear().toString();
//         to = new Date(toPeriod).getDate() + " " + Digit.Utils.date.monthNames[new Date(toPeriod).getMonth()] + " " + new Date(toPeriod).getFullYear();
//         return from + " - " + to;
//       }
//       from = new Date(billDetails.fromPeriod).getFullYear().toString();
//       to = new Date(billDetails.toPeriod).getFullYear().toString();
//       if (from === to) {
//         if(window.location.href.includes("BPA"))
//         {
//           if(new Date(data?.Bill?.[0]?.billDate).getMonth()+1 < 4)
//           {
//             let newfrom =  (parseInt(from)-1).toString();
//             return "FY " + newfrom + "-" + to;
//           }
//           else
//           {
//             let newTo = (parseInt(to)+1).toString();
//             return "FY " + from + "-" + newTo;
//           }
//         }
//         else
//         return "FY " + from;
//       }
//       return "FY " + from + "-" + to;
//     } else return "N/A";
//   };

//   const getBillBreakDown = () => billDetails?.billAccountDetails || [];

//   const getTotal = () => bill?.totalAmount || 0;
//   const getAdvanceAmount = () => application?.pdfData?.advanceAmount;

//   const [paymentType, setPaymentType] = useState(t("CS_PAYMENT_FULL_AMOUNT"));
//   const [amount, setAmount] = useState(getTotal());
//   const [paymentAllowed, setPaymentAllowed] = useState(true);
//   const [formError, setError] = useState("");

//   if (authorization === "true" && !userInfo?.access_token) {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = `/digit-ui/citizen/login?from=${encodeURIComponent(pathname + search)}`;
//   }
//   useEffect(() => {
//     window.scroll({ top: 0, behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     if (paymentType == t("CS_PAYMENT_FULL_AMOUNT")) setAmount(getTotal());
//   }, [paymentType, bill]);

//   useEffect(() => {
//     let changeAdvanceAllowed = isAdvanceAllowed;
//     if (isAdvanceAllowed && wrkflow === "WNS") changeAdvanceAllowed = false;
//     const allowPayment = minAmountPayable && amount >= minAmountPayable && !changeAdvanceAllowed && amount <= getTotal() && !formError;
//     if (paymentType != t("CS_PAYMENT_FULL_AMOUNT")) setPaymentAllowed(allowPayment);
//     else setPaymentAllowed(true);
//   }, [paymentType, amount]);

//   useEffect(() => {
//     if (!isFSMLoading && application?.pdfData?.applicationStatus === "PENDING_APPL_FEE_PAYMENT") {
//       setPaymentAllowed(true);
//       setPaymentType(t("CS_PAYMENT_ADV_COLLECTION"));
//     }
//   });

//   useEffect(() => {
//     if (!bill && data) {
//       let requiredBill = data.Bill.filter((e) => e.consumerCode == (wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode))[0];
//       setBill(requiredBill);
//     }
//   }, [isLoading]);

//   const onSubmit = () => {
//     let paymentAmount =
//       paymentType === t("CS_PAYMENT_FULL_AMOUNT")
//         ? getTotal()
//         : amount || businessService === "FSM.TRIP_CHARGES"
//         ? application?.pdfData?.advanceAmount
//         : amount;
//     if (window.location.href.includes("mcollect")) {
//       history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}?workflow=mcollect`, {
//         paymentAmount,
//         tenantId: billDetails.tenantId,
//       });
//     } else if (wrkflow === "WNS") {
//       history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}?workflow=WNS&ConsumerName=${ConsumerName}`, {
//         paymentAmount,
//         tenantId: billDetails.tenantId,
//         name: bill.payerName,
//         mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
//       });
//     } else if (businessService === "PT") {
//       history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}`, {
//         paymentAmount,
//         tenantId: billDetails.tenantId,
//         name: bill.payerName,
//         mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,      });
//     } else {
//       history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, { paymentAmount, tenantId: billDetails.tenantId, propertyId: propertyId });
//     }
//   };

//   const onChangeAmount = (value) => {
//     setError("");
//     if (isNaN(value) || value.includes(".")) {
//       setError("AMOUNT_INVALID");
//     } else if (!isAdvanceAllowed && value > getTotal()) {
//       setError("CS_ADVANCED_PAYMENT_NOT_ALLOWED");
//     } else if (value < minAmountPayable) {
//       setError("CS_CANT_PAY_BELOW_MIN_AMOUNT");
//     }
//     setAmount(value);
//   };

//   if (isLoading || isFSMLoading) return <Loader />;

//   return (
//     <React.Fragment>
//       <Header>{t("CS_PAYMENT_BILL_DETAILS")}</Header>
//       <Card>
//         <div>
//           <KeyNote
//             keyValue={t(businessService == "PT.MUTATION" ? "PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL" : label)}
//             note={wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode}
//           />
//           {businessService !== "PT.MUTATION" && businessService !== "FSM.TRIP_CHARGES" && (
//             <KeyNote keyValue={t("CS_PAYMENT_BILLING_PERIOD")} note={getBillingPeriod()} />
//           )}
//           {businessService?.includes("PT") ||
//             (wrkflow === "WNS" && billDetails?.currentBillNo && <KeyNote keyValue={t("CS_BILL_NO")} note={billDetails?.currentBillNo} />)}
//           {businessService?.includes("PT") ||
//             (wrkflow === "WNS" && billDetails?.currentExpiryDate && (
//               <KeyNote keyValue={t("CS_BILL_DUEDATE")} note={new Date(billDetails?.currentExpiryDate).toLocaleDateString()} />
//             ))}
//           {businessService === "FSM.TRIP_CHARGES" ? (
//             <div>
//               <KeyNote keyValue={t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT")} note={application?.pdfData?.totalAmount} />
//               <KeyNote keyValue={t("ES_PAYMENT_DETAILS_ADV_AMOUNT")} note={application?.pdfData?.advanceAmount} />
//               {application?.pdfData?.applicationStatus !== "PENDING_APPL_FEE_PAYMENT" ? (
//                 <KeyNote keyValue={t("FSM_DUE_AMOUNT_TO_BE_PAID")} note={bill?.totalAmount} />
//               ) : null}
//             </div>
//           ) : (
//             <BillSumary billAccountDetails={getBillBreakDown()} total={getTotal()} businessService={businessService} arrears={Arrears} />
//           )}
//           <ArrearSummary bill={bill} />
//         </div>

//         <div className="bill-payment-amount">
//           <hr className="underline" />
//           <CardSubHeader>{t("CS_COMMON_PAYMENT_AMOUNT")}</CardSubHeader>
//           {businessService === "FSM.TRIP_CHARGES" ? null : (
//             <RadioButtons
//               selectedOption={paymentType}
//               onSelect={setPaymentType}
//               options={
//                 paymentRules.partPaymentAllowed &&
//                 application?.pdfData?.paymentPreference !== "POST_PAY" &&
//                 application?.pdfData?.applicationStatus === "PENDING_APPL_FEE_PAYMENT"
//                   ? [t("CS_PAYMENT_ADV_COLLECTION")]
//                   : [t("CS_PAYMENT_FULL_AMOUNT")]
//               }
//             />
//           )}

//           <div style={{ position: "relative" }}>
//             <span
//               className="payment-amount-front"
//               style={{ border: `1px solid ${paymentType === t("CS_PAYMENT_FULL_AMOUNT") ? "#9a9a9a" : "#9a9a9a"}` }}
//             >
//               ₹
//             </span>
//             {paymentType !== t("CS_PAYMENT_FULL_AMOUNT") ? (
//               businessService === "FSM.TRIP_CHARGES" ? (
//                 <TextInput className="text-indent-xl" onChange={() => {}} value={getAdvanceAmount()} disable={true} />
//               ) : (
//                 <TextInput className="text-indent-xl" onChange={(e) => onChangeAmount(e.target.value)} value={amount} disable={getTotal() === 0} />
//               )
//             ) : (
//               <TextInput className="text-indent-xl" value={getTotal()} onChange={() => {}} disable={true} />
//             )}
//             {formError === "CS_CANT_PAY_BELOW_MIN_AMOUNT" ? (
//               <span className="card-label-error">
//                 {t(formError)}: {"₹" + minAmountPayable}
//               </span>
//             ) : (
//               <span className="card-label-error">{t(formError)}</span>
//             )}
//           </div>
//           <SubmitBar disabled={!paymentAllowed || getTotal() === 0} onSubmit={onSubmit} label={t("CS_COMMON_PROCEED_TO_PAY")} />
//         </div>
//       </Card>
//     </React.Fragment>
//   );
// };

// export default BillDetails;






import {
  Loader
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringReplaceAll } from "./utils";

const BillDetails = ({ paymentRules, businessService }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state, pathname, search } = useLocation();
  const userInfo = Digit.UserService.getUser();
  let { consumerCode } = useParams();
  const { workflow: wrkflow, tenantId: _tenantId, authorization, ConsumerName } = Digit.Hooks.useQueryParams();
  const [bill, setBill] = useState(state?.bill);
  const tenantId = state?.tenantId || _tenantId || Digit.UserService.getUser().info?.tenantId;
  const propertyId = state?.propertyId;

  if (wrkflow === "WNS" && consumerCode.includes("?")) consumerCode = consumerCode.substring(0, consumerCode.indexOf("?"));

  const { data, isLoading } = state?.bill
    ? { isLoading: false }
    : Digit.Hooks.useFetchPayment({
        tenantId,
        businessService,
        consumerCode: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode,
      });

  const {
    isLoading: isFSMLoading,
    data: application,
  } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, consumerCode, { enabled: pathname.includes("FSM") }, "CITIZEN");

  let { minAmountPayable, isAdvanceAllowed } = paymentRules;
  minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;

  const [paymentAllowed, setPaymentAllowed] = useState(true);
  const [formError, setError] = useState("");
  const [amount, setAmount] = useState(0);

  const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || {};
  const Arrears =
    bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0;
  const getTotal = () => bill?.totalAmount || 0;
  const getAdvanceAmount = () => application?.pdfData?.advanceAmount;

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter((e) => e.consumerCode == (wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode))[0];
      setBill(requiredBill);
      setAmount(requiredBill?.totalAmount || 0);
    }
  }, [data]);

  const getRebate = () => {
    return (
      billDetails?.billAccountDetails
        ?.filter((item) => item.taxHeadCode?.includes("REBATE"))
        ?.reduce((acc, cur) => acc + cur.amount, 0) || 0
    );
  };

  const onSubmit = () => {
    const paymentAmount = getTotal();
    history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}`, {
      paymentAmount,
      tenantId: billDetails.tenantId,
      name: bill?.payerName,
      mobileNumber: bill?.mobileNumber,
    });
  };

  if (isLoading || isFSMLoading || !bill) return <Loader />;

  return (
    <div style={styles.container}>
      {/* Applicant Details */}
      <div style={styles.section}>Applicant Details</div>
      <div style={styles.formGroup}>
        <div style={styles.labelInput}>
          <label style={styles.label}>Property ID *</label>
          <input style={styles.input} value={consumerCode || ""} readOnly />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Plot Area (Sq feet) *</label>
          <input style={styles.input} value={bill?.additionalDetails?.plotArea || ""} readOnly />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Rate Zone *</label>
          <input style={styles.input} value={bill?.additionalDetails?.rateZone || ""} readOnly />
        </div>
      </div>

      {/* Owner Details */}
      <div style={styles.section}>Owner Details</div>
      <div style={styles.formGroup}>
        <div style={styles.labelInput}>
          <label style={styles.label}>Owner Name *</label>
          <input style={styles.input} value={bill?.payerName || ""} readOnly />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Father/Husband Name</label>
          <input style={styles.input} value={bill?.additionalDetails?.guardianName || ""} readOnly />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Aadhaar ID</label>
          <input style={styles.input} value={bill?.additionalDetails?.aadhaarNumber || ""} readOnly />
        </div>
      </div>

      {/* Property Address */}
      <div style={styles.section}>Property Address</div>
      <div style={styles.formGroup}>
        <div style={styles.labelInput}>
          <label style={styles.label}>Address *</label>
          <input
            style={styles.input}
            value={bill?.payerAddress}
            readOnly
          />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Ward *</label>
          <input style={styles.input} value={billDetails?.address?.ward || ""} readOnly />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Colony *</label>
          <input style={styles.input} value={billDetails?.address?.colony || ""} readOnly />
        </div>
        <div style={styles.labelInput}>
          <label style={styles.label}>Zone *</label>
          <input style={styles.input} value={billDetails?.address?.zone || ""} readOnly />
        </div>
      </div>

      {/* Tax Details */}
      <div style={styles.section}>Tax Details</div>
      <div style={{ backgroundColor: "#fff", padding: "20px" }}>
        <div style={styles.taxRow}>
          <span style={styles.taxLabel}>Arrear</span>
          <span>₹ {Arrears}</span>
        </div>
        <div style={styles.taxRow}>
          <span style={styles.taxLabel}>Advance</span>
          <span>₹ {getAdvanceAmount() || 0}</span>
        </div>
        <div style={styles.taxRow}>
          <span style={styles.taxLabel}>Current Year Tax</span>
          <span>₹ {billDetails?.amount || 0}</span>
        </div>
        <div style={styles.taxRow}>
          <span style={styles.taxLabel}>Rebate Given</span>
          <span>₹ {getRebate()}</span>
        </div>
        <div style={{ ...styles.taxRow, ...styles.totalRow }}>
          <span>Total</span>
          <span>₹ {getTotal()}</span>
        </div>
        <div style={styles.disclaimer}>
          *Tax calculation is based on current system data. If there is any
          difference in the tax calculation, the property owner will have to
          pay the difference amount later.
        </div>
        <button style={styles.payButton} disabled={!paymentAllowed || getTotal() === 0} onClick={onSubmit}>
          Pay
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Noto Sans",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  section: {
    backgroundColor: "#6B133F",
    color: "#fff",
    padding: "10px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  formGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.1)",
  },
  labelInput: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
  },
  input: {
    backgroundColor: "#f5edf3",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
  },
  taxRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  taxLabel: {
    fontWeight: "500",
  },
  totalRow: {
    fontWeight: "700",
    color: "#000",
    paddingTop: "10px",
  },
  disclaimer: {
    color: "#d40000",
    fontSize: "12px",
    marginTop: "10px",
  },
  payButton: {
    marginTop: "20px",
    backgroundColor: "#6B133F",
    color: "#fff",
    padding: "10px 40px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    marginLeft: "auto",
  },
};

export default BillDetails;
