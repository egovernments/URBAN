import { Card, CardSubHeader, Header, KeyNote, Loader, RadioButtons, SubmitBar, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams, Redirect } from "react-router-dom";
import ArrearSummary from "./arrear-summary";
import BillSumary from "./bill-summary";
import { stringReplaceAll } from "./utils";

const BillDetails = ({ paymentRules, businessService }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state, pathname, search } = useLocation();
  const userInfo = Digit.UserService.getUser();
  // let { consumerCode } = useParams();
  const { consumerCode: encodedConsumerCode } = useParams();
  let consumerCode = decodeURIComponent(encodedConsumerCode);
  const { workflow: wrkflow, tenantId: _tenantId, authorization, ConsumerName } = Digit.Hooks.useQueryParams();
  const [bill, setBill] = useState(state?.bill);
  const tenantId = Digit.UserService.getUser().info?.tenantId || state?.tenantId || _tenantId;
  const propertyId = state?.propertyId;
  if (wrkflow === "WNS" && consumerCode && consumerCode.includes("?")) consumerCode = consumerCode.substring(0, consumerCode.indexOf("?"));
  const { data, isLoading } = state?.bill
    ? { isLoading: false }
    : Digit.Hooks.useFetchPayment({
        tenantId: tenantId,
        businessService,
        consumerCode: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode,
      });

  let Useruuid = data?.Bill?.[0]?.userId || "";
  const isUserSearchEnabled = wrkflow !== "death" && businessService !== "DEATH_CERT" && !!Useruuid;
  let requestCriteria = [
    "/user/_search",
    {},
    { data: { uuid: [Useruuid] } },
    { recordId: Useruuid, plainRequestFields: ["mobileNumber"] },
    {
      enabled: isUserSearchEnabled,
      // enabled: Useruuid ? true : false,
      cacheTime: 100,
    },
  ];

  const { isLoading: isUserLoading, data: userData, revalidate } = Digit.Hooks.useCustomAPIHook(...requestCriteria);

  const {
    isLoading: isFSMLoading,
    isError,
    error,
    data: application,
    error: errorApplication,
  } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, consumerCode, { enabled: pathname.includes("FSM") ? true : false }, "CITIZEN");
  let { minAmountPayable, isAdvanceAllowed } = paymentRules;
  minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;
  // const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || [];
  const billDetails = useMemo(() => bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || {}, [bill]);
  const Arrears = useMemo(
    () =>
      bill?.billDetails
        ?.sort((a, b) => b.fromPeriod - a.fromPeriod)
        ?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0,
    [bill]
  );

  // Removed all usage of 'label' as it is not defined in this component

  const getBillingPeriod = () => {
    const { fromPeriod, toPeriod } = billDetails;
    if (fromPeriod && toPeriod) {
      let from, to;
      if (wrkflow === "mcollect" || wrkflow === "WNS" || wrkflow === "death" || wrkflow === "birth") {
        from =
          new Date(fromPeriod).getDate().toString() +
          " " +
          Digit.Utils.date.monthNames[new Date(fromPeriod).getMonth()]?.toString() +
          " " +
          new Date(fromPeriod).getFullYear().toString();
        to = new Date(toPeriod).getDate() + " " + Digit.Utils.date.monthNames[new Date(toPeriod).getMonth()] + " " + new Date(toPeriod).getFullYear();
        return from + " - " + to;
      }
      from = new Date(billDetails.fromPeriod).getFullYear().toString();
      to = new Date(billDetails.toPeriod).getFullYear().toString();
      if (from === to) {
        if (window.location.href.includes("BPA")) {
          if (new Date(data?.Bill?.[0]?.billDate).getMonth() + 1 < 4) {
            let newfrom = (parseInt(from) - 1).toString();
            return "FY " + newfrom + "-" + to;
          } else {
            let newTo = (parseInt(to) + 1).toString();
            return "FY " + from + "-" + newTo;
          }
        } else return "FY " + from;
      }
      return "FY " + from + "-" + to;
    } else return "N/A";
  };

  const getBillBreakDown = () => billDetails?.billAccountDetails || [];

  const getTotal = () => bill?.totalAmount || 0;
  const getAdvanceAmount = () => application?.pdfData?.advanceAmount;

  const [paymentType, setPaymentType] = useState(t("CS_PAYMENT_FULL_AMOUNT"));
  const [amount, setAmount] = useState(getTotal());
  const [paymentAllowed, setPaymentAllowed] = useState(true);
  const [formError, setError] = useState("");

  if (authorization === "true" && !userInfo?.access_token) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = `/digit-ui/citizen/login?from=${encodeURIComponent(pathname + search)}`;
  }
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paymentType == t("CS_PAYMENT_FULL_AMOUNT")) setAmount(getTotal());
  }, [paymentType, bill, getTotal]);

  useEffect(() => {
    if (bill && wrkflow === "birth") {
      const billPayerName = bill.payerName || "";
      let originalBillMobileNumber = bill.mobileNumber || "";
    }
  }, [bill, wrkflow, Useruuid, userData, t]);

  useEffect(() => {
    let changeAdvanceAllowed = isAdvanceAllowed;
    if (isAdvanceAllowed && wrkflow === "WNS") changeAdvanceAllowed = false;
    const allowPayment = minAmountPayable && amount >= minAmountPayable && !changeAdvanceAllowed && amount <= getTotal() && !formError;
    if (paymentType != t("CS_PAYMENT_FULL_AMOUNT")) setPaymentAllowed(allowPayment);
    else setPaymentAllowed(true);
  }, [paymentType, amount, isAdvanceAllowed, wrkflow, minAmountPayable, getTotal, formError]);

  useEffect(() => {
    if (!isFSMLoading && application?.pdfData?.applicationStatus === "PENDING_APPL_FEE_PAYMENT") {
      setPaymentAllowed(true);
      setPaymentType(t("CS_PAYMENT_ADV_COLLECTION"));
    }
  }, [isFSMLoading, application, setPaymentType]);

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter((e) => e.consumerCode == (wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode))[0];
      setBill(requiredBill);
    }
  }, [isLoading, data, bill, consumerCode, wrkflow]);
  
  const onSubmit = async () => {
    if (!bill) {
      console.error("Bill is undefined, cannot proceed with payment");
      return;
    }

    let paymentAmount =
      paymentType === t("CS_PAYMENT_FULL_AMOUNT")
        ? getTotal()
        : amount || businessService === "FSM.TRIP_CHARGES"
        ? application?.pdfData?.advanceAmount
        : amount;

    let recieptRequest = {
      Payment: {
        mobileNumber: bill.mobileNumber,
        paymentDetails: [
          {
            businessService,
            billId: bill.id,
            totalDue: bill.totalAmount,
            totalAmountPaid: bill.totalAmount,
          },
        ],
        tenantId: bill.tenantId,
        totalDue: bill.totalAmount,
        totalAmountPaid: bill.totalAmount,
        paymentMode: "CASH",
        payerName: bill.payerName,
        paidBy: "OWNER",
      },
    };


    if (wrkflow === "mcollect") {
      try {
        const resposne = await Digit.PaymentService.createReciept(bill.tenantId, recieptRequest);
        sessionStorage.setItem("PaymentResponse", JSON.stringify(resposne));
        history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}?workflow=mcollect`);
        return; // Exit early after cash receipt creation
      } catch (error) {
        console.log("Error while creating receipt", error);
        // setToast({ key: "error", action: error?.response?.data?.Errors?.map((e) => t(e.code)) })?.join(" , ");
        // setTimeout(() => setToast(null), 5000);
        return;
      }
    }

    if (wrkflow === "mcollect") {
      history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}`);
    } else if (wrkflow === "death" || businessService === "DEATH_CERT") {
      history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}?workflow=death`, {
        paymentAmount,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
        bill: bill,
        tenantId: state?.tenantId || billDetails.tenantId,
      });
    } else if (wrkflow === "birth") {
      history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}?workflow=birth`, {
        paymentAmount,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
        bill: bill,
        tenantId: state?.tenantId || billDetails.tenantId,
        //payment
        // history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}?workflow=death`)
      });
    } else if (wrkflow === "WNS") {
      
      history.push(
        `/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}?workflow=WNS&ConsumerName=${ConsumerName}`,
        {
          paymentAmount,
          tenantId: billDetails.tenantId,
          name: bill.payerName,
          bill: bill,
          mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
        }
      );
    } else if (businessService === "PT") {
      history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}`, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
      });
    } else if (businessService === "BPA.NC_APP_FEE" || (businessService && businessService.includes("BPA"))) {
     
      try {
        const response = await Digit.PaymentService.createReciept(bill.tenantId, recieptRequest);
        sessionStorage.setItem("PaymentResponse", JSON.stringify(response));
      } catch (error) {
        console.log("Error while creating receipt for BPA", error);
        
      }
      history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}`);
    }
    else if (businessService === "TL" || (businessService && businessService.includes("TL"))) {
     
      try {
        const response = await Digit.PaymentService.createReciept(bill.tenantId, recieptRequest);
        sessionStorage.setItem("PaymentResponse", JSON.stringify(response));
      } catch (error) {
        console.log("Error while creating receipt for TL", error);

      }
      history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}`);
    } else if (businessService === "BPAREG" || wrkflow === "bpareg" || (businessService && businessService.includes("BPAREG"))) {
      console.log("*** Log ===> ", "reched here");
      try {
        const response = await Digit.PaymentService.createReciept(bill.tenantId, recieptRequest);
        sessionStorage.setItem("PaymentResponse", JSON.stringify(response));
      } catch (error) {
        console.log("Error while creating receipt for BPAREG", error);
      }
      history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}?workflow=bpareg`);
    } else {
      history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        propertyId: propertyId,
      });
    }
  };

  const onChangeAmount = (value) => {
    setError("");
    if (isNaN(value) || value.includes(".")) {
      setError("AMOUNT_INVALID");
    } else if (!isAdvanceAllowed && value > getTotal()) {
      setError("CS_ADVANCED_PAYMENT_NOT_ALLOWED");
    } else if (value < minAmountPayable) {
      setError("CS_CANT_PAY_BELOW_MIN_AMOUNT");
    }
    setAmount(value);
  };

  if (isLoading || isFSMLoading) return <Loader />;

  return (
    <React.Fragment>
      <Header>{t("CS_PAYMENT_BILL_DETAILS")}</Header>
      <Card>
        <div>
          {/* <KeyNote
            keyValue={t(businessService == "PT.MUTATION" ? "PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL" : "")}
            note={wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode}
          /> */}
          <KeyNote
            keyValue={
              businessService === "DEATH_CERT" || businessService === "BIRTH_CERT"
                ? t("PAYMENT_BND_CONSUMER_CODE")
                : businessService === "PT.MUTATION"
                ? t("PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL")
                : t("")
            }
            note={wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode}
          />

          {businessService !== "PT.MUTATION" && businessService !== "FSM.TRIP_CHARGES" && (
            <KeyNote keyValue={t("CS_PAYMENT_BILLING_PERIOD")} note={getBillingPeriod()} />
          )}
          {businessService?.includes("PT") ||
            (wrkflow === "WNS" && billDetails?.currentBillNo && <KeyNote keyValue={t("CS_BILL_NO")} note={billDetails?.currentBillNo} />)}
          {businessService?.includes("PT") ||
            (wrkflow === "WNS" && billDetails?.currentExpiryDate && (
              <KeyNote keyValue={t("CS_BILL_DUEDATE")} note={new Date(billDetails?.currentExpiryDate).toLocaleDateString()} />
            ))}
          {businessService === "FSM.TRIP_CHARGES" ? (
            <div style={{ marginTop: "50px" }} className="bill-payment-amount">
              <KeyNote keyValue={t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT")} note={application?.pdfData?.totalAmount} />
              <KeyNote keyValue={t("ES_PAYMENT_DETAILS_ADV_AMOUNT")} note={application?.pdfData?.advanceAmount} />
              {application?.pdfData?.applicationStatus !== "PENDING_APPL_FEE_PAYMENT" ? (
                <KeyNote keyValue={t("FSM_DUE_AMOUNT_TO_BE_PAID")} note={bill?.totalAmount} />
              ) : null}
            </div>
          ) : (
            <BillSumary
              style={{ marginTop: "50px" }}
              billAccountDetails={getBillBreakDown()}
              total={getTotal()}
              businessService={businessService}
              arrears={Arrears}
            />
          )}
          <ArrearSummary bill={bill} />
        </div>

        <div className="bill-payment-amount">
          <hr className="underline" />
          <CardSubHeader>{t("CS_COMMON_PAYMENT_AMOUNT")}</CardSubHeader>
          {businessService === "FSM.TRIP_CHARGES" ? null : (
            <RadioButtons
              selectedOption={paymentType}
              onSelect={setPaymentType}
              options={
                paymentRules.partPaymentAllowed &&
                application?.pdfData?.paymentPreference !== "POST_PAY" &&
                application?.pdfData?.applicationStatus === "PENDING_APPL_FEE_PAYMENT"
                  ? [t("CS_PAYMENT_ADV_COLLECTION")]
                  : [t("CS_PAYMENT_FULL_AMOUNT")]
              }
            />
          )}

          <div style={{ position: "relative" }}>
            <span
              className="payment-amount-front"
              style={{ border: `1px solid ${paymentType === t("CS_PAYMENT_FULL_AMOUNT") ? "#9a9a9a" : "#9a9a9a"}` }}
            >
              ₹
            </span>
            {(paymentType !== t("CS_PAYMENT_FULL_AMOUNT") && businessService !== "DEATH_CERT") || businessService !== "BIRTH_CERT" ? (
              businessService === "FSM.TRIP_CHARGES" ? (
                <TextInput style={{ width: "30%" }} onChange={() => {}} value={getAdvanceAmount()} disable={true} />
              ) : (
                <TextInput
                  style={{ width: "30%" }}
                  className="text-indent-xl"
                  onChange={(e) => onChangeAmount(e.target.value)}
                  value={amount}
                  disable={getTotal() === 0}
                />
              )
            ) : (
              <TextInput className="text-indent-xl" value={getTotal()} onChange={() => {}} disable={true} />
            )}
            {formError === "CS_CANT_PAY_BELOW_MIN_AMOUNT" ? (
              <span className="card-label-error">
                {t(formError)}: {"₹" + minAmountPayable}
              </span>
            ) : (
              <span className="card-label-error">{t(formError)}</span>
            )}
          </div>
          <SubmitBar disabled={!paymentAllowed || getTotal() === 0} onSubmit={onSubmit} label={t("CS_COMMON_PROCEED_TO_PAY")} />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BillDetails;
