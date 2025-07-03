import { Card, CardSubHeader, Header, KeyNote, Loader, RadioButtons, SubmitBar, TextInput ,Dropdown, LabelFieldPair, CardLabel, CardSectionHeader} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState,useMemo  } from "react";
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
  const consumerCode = decodeURIComponent(encodedConsumerCode);
  const { workflow: wrkflow, tenantId: _tenantId, authorization, ConsumerName } = Digit.Hooks.useQueryParams();

  const [bill, setBill] = useState(state?.bill);
  const tenantId = state?.tenantId || _tenantId || Digit.UserService.getUser().info?.tenantId;
  const propertyId = state?.propertyId;
  if (wrkflow === "WNS" && consumerCode.includes("?")) consumerCode = consumerCode.substring(0, consumerCode.indexOf("?"));
  const { data, isLoading } = state?.bill
    ? { isLoading: false }
    : Digit.Hooks.useFetchPayment({
       tenantId: tenantId,
        businessService,
        consumerCode: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode,
      });

  let Useruuid = data?.Bill?.[0]?.userId || "";
  let requestCriteria = [
    "/user/_search",
    {},
    { data: { uuid: [Useruuid] } },
    { recordId: Useruuid, plainRequestFields: ["mobileNumber"] },
    {
      // enabled: Useruuid ? true : false,
       enabled: !!Useruuid,
      cacheTime: 100,
    },
  ];


  const { isLoading: isUserLoading, data: userData, revalidate } = Digit.Hooks.useCustomAPIHook(...requestCriteria);
  
  const { isLoading: isFSMLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.fsm.useApplicationDetail(
    t,
    tenantId,
    consumerCode,
    { enabled: pathname.includes("FSM") ? true : false },
    "CITIZEN"
  );
  let { minAmountPayable, isAdvanceAllowed } = paymentRules;
  minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;
  const billDetails = useMemo(() => bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || {}, [bill]); 

  const Arrears = useMemo(() =>
    bill?.billDetails
      ?.sort((a, b) => b.fromPeriod - a.fromPeriod)
      ?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0, [bill]);

  const { key, label } = Digit.Hooks.useApplicationsForBusinessServiceSearch({ businessService,tenantId }, { enabled: false });
  const getBillingPeriod = () => {
    const { fromPeriod, toPeriod } = billDetails;
    if (fromPeriod && toPeriod) {
      let from, to;
      if (wrkflow === "mcollect" || wrkflow === "WNS"|| wrkflow === "birth") {
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
        if(window.location.href.includes("BPA"))
        {
          if(new Date(data?.Bill?.[0]?.billDate).getMonth()+1 < 4)
          {
            let newfrom =  (parseInt(from)-1).toString();
            return "FY " + newfrom + "-" + to;
          }
          else
          {
            let newTo = (parseInt(to)+1).toString();
            return "FY " + from + "-" + newTo;
          }
        }
        else
        return "FY " + from;
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

  
  // const paidByOptions = useMemo(() => [
  //   { code: "OWNER", name: t("COMMON_OWNER") },
  //   { code: "OTHER", name: t("COMMON_OTHER") },
  // ], [t]);
  // const [paidBy, setPaidBy] = useState(paidByOptions[0]); // Default to Owner
  // const [payerNameInput, setPayerNameInput] = useState("");
  // const [payerMobileInput, setPayerMobileInput] = useState("");

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
  }, [paymentType, bill,getTotal]);

  useEffect(() => {
    let changeAdvanceAllowed = isAdvanceAllowed;
    if (isAdvanceAllowed && wrkflow === "WNS") changeAdvanceAllowed = false;
    const allowPayment = minAmountPayable && amount >= minAmountPayable && !changeAdvanceAllowed && amount <= getTotal() && !formError;
    if (paymentType != t("CS_PAYMENT_FULL_AMOUNT")) setPaymentAllowed(allowPayment);
    else setPaymentAllowed(true);
  }, [paymentType, amount,, isAdvanceAllowed, wrkflow, minAmountPayable, getTotal, formError]);

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

  useEffect(() => {
    if (bill && wrkflow === "birth") {
        const billPayerName = bill.payerName || "";
        let originalBillMobileNumber = bill.mobileNumber || "";

       
    }
  }, [bill, wrkflow, Useruuid, userData, t]);

  console.log("consumercode:"+consumerCode);
  console.log("encodedConsumerCode"+encodedConsumerCode);



 

  const onSubmit = () => {

    let paymentAmount =
      paymentType === t("CS_PAYMENT_FULL_AMOUNT")
        ? getTotal()
        : amount || businessService === "FSM.TRIP_CHARGES"
        ? application?.pdfData?.advanceAmount
        : amount;
     
    if (wrkflow === "mcollect") { 
      history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}?workflow=mcollect`, {
        paymentAmount,
        tenantId: billDetails.tenantId,
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
      history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}?workflow=WNS&ConsumerName=${ConsumerName}`, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
      });
    } else if (businessService === "PT") { 
      history.push(`/digit-ui/citizen/payment/billDetails/${businessService}/${consumerCode}/${paymentAmount}`, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && bill.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill.mobileNumber,
      });
    } else { 
      history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, { paymentAmount, tenantId: billDetails.tenantId, propertyId: propertyId });
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
// return <div>hi</div>

  return (
    <React.Fragment>
      <Header>{t("CS_PAYMENT_BILL_DETAILS")}</Header>
      <Card>
        <div>
          {/* <KeyNote
            keyValue={t(businessService == "PT.MUTATION" ? "PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL" : label)}
            note={wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode}
          /> */}
          <KeyNote
            keyValue={
              businessService === "BIRTH_CERT"
                ? t("PAYMENT_BND_CONSUMER_CODE")
                : businessService === "PT.MUTATION"
                ? t("PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL")
                : t(label)
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

        {/* {wrkflow === "birth" && bill && ( 
          <div style={{ marginTop: "16px" }}>
            <hr className="underline" style={{ marginBottom: "16px" }}/>
            <CardSubHeader>{t("Payer Details")}</CardSubHeader>
            <LabelFieldPair>
              <CardLabel style={{ fontWeight: "normal" }}>{t("PAYMENT_PAID_BY_LABEL")}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                option={paidByOptions}
                optionKey="name"
                select={handlePaidByChange}
                selected={paidBy}
                t={t}
                style={{width: "100%"}}
              />
            </LabelFieldPair>
            <LabelFieldPair>
              <CardLabel style={{ fontWeight: "normal" }}>{t("PAYMENT_PAYER_NAME_LABEL")}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                name="payerName"
                value={payerNameInput}
                onChange={(e) => setPayerNameInput(e.target.value)}
                disable={paidBy?.code === "OWNER"}
                required={true}
              />
            </LabelFieldPair>
            <LabelFieldPair>
              <CardLabel style={{ fontWeight: "normal" }}>{t("BND_PAYER_CONTACT")}<span className="mandatorycss">*</span></CardLabel>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
                  <span style={{ 
                      padding: '8px 10px', 
                      backgroundColor: '#f0f0f0', 
                      border: '1px solid #ccc', 
                      borderRight: 'none', 
                      borderRadius: '4px 0 0 4px',
                      color: '#505A5F'
                    }}>+91</span>
                  <TextInput
                    type="text"
                    name="payerMobile"
                    value={payerMobileInput}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val) && val.length <= 10) { 
                            setPayerMobileInput(val);
                        }
                    }}
                    disable={paidBy?.code === "OWNER"}
                    style={{ 
                        borderTopLeftRadius: '0', 
                        borderBottomLeftRadius: '0',
                        margin: '0'
                    }}
                    required={true} pattern={"^[0-9]{10}$"} 
                  />
              </div>
            </LabelFieldPair>
          </div>
        )} */}
          {businessService === "FSM.TRIP_CHARGES" ? (
            <div style={{ marginTop: "50px" }} className="bill-payment-amount">
              <KeyNote keyValue={t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT")} note={application?.pdfData?.totalAmount} />
              <KeyNote keyValue={t("ES_PAYMENT_DETAILS_ADV_AMOUNT")} note={application?.pdfData?.advanceAmount} />
              {application?.pdfData?.applicationStatus !== "PENDING_APPL_FEE_PAYMENT" ? (
                <KeyNote keyValue={t("FSM_DUE_AMOUNT_TO_BE_PAID")} note={bill?.totalAmount} />
              ) : null}
            </div>
          ) : (
            <BillSumary style={{ marginTop: "50px" }} billAccountDetails={getBillBreakDown()} total={getTotal()} businessService={businessService} arrears={Arrears} />
          )}
          <ArrearSummary bill={bill} />
        </div>
        <br></br>
        <div style={{ marginTop: "30px" }} className="bill-payment-amount">
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
            {paymentType !== t("CS_PAYMENT_FULL_AMOUNT") && businessService !== "BIRTH_CERT" ? (
              businessService === "FSM.TRIP_CHARGES" ? (
                <TextInput className="text-indent-xl"
                style={{ width: "30%" }} onChange={() => {}} value={getAdvanceAmount()} disable={true} />
              ) : (
                <TextInput className="text-indent-xl" 
                style={{ width: "30%" }}onChange={(e) => onChangeAmount(e.target.value)} value={amount} disable={getTotal() === 0} />
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
          {/* <SubmitBar disabled={!paymentAllowed || getTotal() === 0 || 
                (wrkflow === 'birth' && (!payerNameInput || payerMobileInput.length !== 10))} onSubmit={onSubmit} label={t("CS_COMMON_PROCEED_TO_PAY")} /> */}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BillDetails;