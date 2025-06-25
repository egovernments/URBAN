import React, { useState, useEffect } from "react";
import {
  Header,
  Card,
  RadioButtons,
  SubmitBar,
  BackButton,
  Loader,
  TextInput,
  MobileNumber,
  CheckBox,
  CitizenConsentForm
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { stringReplaceAll } from "../bills/routes/bill-details/utils";

const SelectPaymentType = (props) => {
  const optionFirst = {
    code: "PAY_BY_OWNER",
    i18nKey: "PT_PAY_BY_OWNER",
    name: "I am making the payment as the owner/ consumer of the service",
  };

  const optionSecound = {
    code: "PAY_BEHALF_OWNER",
    i18nKey: "PT_PAY_BEHALF_OWNER",
    name: "I am making the payment on behalf of the owner/ consumer of the service",
  };

  const userInfo = Digit.UserService.getUser()?.info;
  const payersActiveName = userInfo?.name;
  const payersActiveMobileNumber = userInfo?.mobileNumber;
  console.log("ikik",userInfo,payersActiveName, payersActiveMobileNumber);

  const { t } = useTranslation();
  const history = useHistory();
  const { state, ...location } = useLocation();
  const { consumerCode, businessService, paymentAmt } = useParams();
  // const { consumerCode:encodedConsumerCode } = useParams();
  // const consumerCode = decodeURIComponent(encodedConsumerCode);
  const { workflow: wrkflow, tenantId: _tenantId, ConsumerName } = Digit.Hooks.useQueryParams();
  console.log("consumername:",ConsumerName);
  const [bill, setBill] = useState(state?.bill);
  const tenantId = state?.tenantId || _tenantId || Digit.UserService.getUser().info?.tenantId;
  const isLoggedIn = Digit.UserService.getUser()


  const { data, isLoading } = state?.bill ? { isLoading: false } : Digit.Hooks.useFetchPayment({ tenantId, businessService, consumerCode });

  let Useruuid = data?.Bill?.[0]?.userId || "";
  let requestCriteria = [
    "/user/_search",
    {},
    {data : {uuid:[Useruuid]}},
    { recordId: Useruuid, plainRequestFields: ["mobileNumber"] },
    {
        enabled: Useruuid ? true : false,
        cacheTime: 100,
      }
  ]
  const { isLoading : isUserLoading, data: userData, revalidate } = Digit.Hooks.useCustomAPIHook(...requestCriteria);

  const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || [];
  const Arrears =
    bill?.billDetails
      ?.sort((a, b) => b.fromPeriod - a.fromPeriod)
      ?.reduce((total, current, index) => (index === 0 ? total : total + current.amount), 0) || 0;

  const [paymentType, setPaymentType] = useState(optionFirst);
  const [payersName, setPayersName] = useState("");
  const [payersMobileNumber, setPayersMobileNumber] = useState("");
  const { control, handleSubmit } = useForm();
  const [canSubmit, setCanSubmit] = useState(false);
  const [mobileNumberError, setmobileNumberError] = useState(null);
  const [isCheckBox, setIsCheckBox] = useState(false);
  const [isCCFEnabled, setisCCFEnabled] = useState(false);
  const [mdmsConfig, setMdmsConfig] = useState("");
  
  const { isLoading: citizenConcentFormLoading, data:ccfData } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{ name: "CitizenConsentForm" }]);

  function setTermsAndPolicyDetails(e) {
    setIsCheckBox(e.target.checked)
  }

  const checkDisbaled = () => {
    if (isCCFEnabled?.isCitizenConsentFormEnabled && !isLoggedIn?.access_token) {
      const isData = paymentType?.code !== optionSecound?.code ? false : userInfo ? false : !canSubmit;
      let isEnabled = false
      if (!isData && isCheckBox) isEnabled = false;
      else isEnabled = true;
      return isEnabled;
    } else {
      return paymentType?.code !== optionSecound?.code ? false : userInfo ? false : !canSubmit
    }
  }

  useEffect(()=> {
    if (ccfData?.["common-masters"]?.CitizenConsentForm?.[0]?.isCitizenConsentFormEnabled) {
      setisCCFEnabled(ccfData?.["common-masters"]?.CitizenConsentForm?.[0])
    }
  }, [ccfData]);

  const onLinkClick = (e) => {
    setMdmsConfig(e.target.id)
}

  const checkLabels = () => {
    return <span>
      {isCCFEnabled?.checkBoxLabels?.map((data, index) => {
        return <span>
          {/* {index == 0 && "CCF"} */}
          {data?.linkPrefix && <span>{t(`${data?.linkPrefix}_`)}</span>}
          {data?.link && <span id={data?.linkId} onClick={(e) => { onLinkClick(e) }} style={{ color: "#F47738", cursor: "pointer" }}>{t(`${data?.link}_`)}</span>}
          {data?.linkPostfix && <span>{t(`${data?.linkPostfix}_`)}</span>}
          {(index == isCCFEnabled?.checkBoxLabels?.length - 1) && t("LABEL")}
        </span>
      })}
    </span>
  }
  

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data?.Bill?.filter((e) => e.consumerCode == consumerCode)[0];
      setBill(requiredBill);
    }
  }, [isLoading]);

  const onChangePayersMobileNumber = (e) => {
    setmobileNumberError(null);
    let validation = "^\\d{10}$";
    if (!e.match(validation)) {
      setmobileNumberError("CORE_COMMON_PHONENO_INVALIDMSG");
      setCanSubmit(false);
    }
    setPayersMobileNumber(e);

    e.length == 10 && payersName != "" ? setCanSubmit(true) : setCanSubmit(false);
  };

  const onChangePayersName = (value) => {
    setPayersName(value);
    value.length !== 0 && mobileNumberError != "CORE_COMMON_PHONENO_INVALIDMSG" && payersName != "" && payersMobileNumber != "" ? setCanSubmit(true) : setCanSubmit(false);
  };

  console.log("billDetails: ", state?.bill,bill);
  const onSubmit = async() => {
    // let recieptRequest = {
    //       Payment: {
    //         mobileNumber: bill.mobileNumber,
    //         paymentDetails: [
    //           {
    //             businessService,
    //             billId: bill.id,
    //             totalDue: bill.totalAmount,
    //             totalAmountPaid: bill.totalAmount,
    //           },
    //         ],
    //         tenantId: bill.tenantId,
    //         totalDue: bill.totalAmount,
    //         totalAmountPaid: bill.totalAmount,
    //         paymentMode: "CASH",
    //         payerName: bill.payerName,
    //         paidBy: "OWNER",
    //       },
    //     };
    // console.log("recieptRequest", recieptRequest);
    //         try {
    //           const resposne = await Digit.PaymentService.createReciept(bill.tenantId, recieptRequest);
    //           sessionStorage.setItem("PaymentResponse", JSON.stringify(resposne));
    //           history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}?workflow=death`);
    //         } catch (error) {
    //           console.log("Error while creating receipt", error);
    //           // setToast({ key: "error", action: error?.response?.data?.Errors?.map((e) => t(e.code)) })?.join(" , ");
    //           // setTimeout(() => setToast(null), 5000);
    //           return;
    //         }
    if(wrkflow === "WNS")
    {
      history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}?workflow=WNS&consumerCode=${stringReplaceAll(consumerCode, "+", "/")}`, {
        paymentAmount: paymentAmt,
        tenantId: billDetails.tenantId,
        name: paymentType?.code !== optionSecound?.code && ConsumerName !== "undefined" ? ConsumerName : userInfo ? payersActiveName : payersName,
        mobileNumber: paymentType?.code !== optionSecound?.code ? (bill?.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill?.mobileNumber ) : userInfo ? payersActiveMobileNumber : payersMobileNumber,
      });
    }
    else if(wrkflow === "death"){
     console.log("billDetails inside: ",paymentAmt,billDetails.tenantId);
     console.log( paymentType?.code );
     console.log( paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName);
     console.log(paymentType?.code !== optionSecound?.code ? (bill?.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill?.mobileNumber )  : userInfo ? payersActiveMobileNumber : payersMobileNumber);
      history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}?workflow=death`, {
        bill:bill,
        paymentAmount:  paymentAmt,
        tenantId:billDetails.tenantId,
       name: paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName,
      mobileNumber: paymentType?.code !== optionSecound?.code ? (bill?.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill?.mobileNumber )  : userInfo ? payersActiveMobileNumber : payersMobileNumber,
      });
      
    //   payment
    // history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}?workflow=death`)
    }
    else{
       console.log("billDetails inside: ",paymentAmt,billDetails.tenantId);
       console.log(  paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName);
       console.log(paymentType?.code !== optionSecound?.code ? (bill?.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill?.mobileNumber ) : userInfo ? payersActiveMobileNumber : payersMobileNumber);
    history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, {
      paymentAmount: paymentAmt,
      tenantId: billDetails.tenantId,
      name: paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName,
      mobileNumber: paymentType?.code !== optionSecound?.code ? (bill?.mobileNumber?.includes("*") ? userData?.user?.[0]?.mobileNumber : bill?.mobileNumber )  : userInfo ? payersActiveMobileNumber : payersMobileNumber,
    });
  }
  };

   if (isLoading || isUserLoading || citizenConcentFormLoading) {
    return <Loader />;
  } 
console.log("consumerCode: ",state?.bill, consumerCode);
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*  <Header>{t("PAYMENT_CS_HEADER")}</Header> */}
        <Header>{t("PT_PAYERS_DETAILS_HEADER")}</Header>
        <Card>
          <span className="card-label-error">{t(mobileNumberError)}</span>
          <RadioButtons
            selectedOption={paymentType}
            onSelect={setPaymentType}
            options={[optionFirst, optionSecound]}
            optionsKey="name"
            inputStyle={{ marginTop: "11px" }}
            innerStyles={{ display: "flex" }}
          />
          <div style={{ position: "relative" }}>
            {paymentType?.code !== optionFirst?.code && !userInfo ? (
              <div style={{ position: "relative" }}>
                <span>
                  <span>{t("PT_PAYERS_MOBILE_NO")}</span>
                  <MobileNumber
                    // className="text-indent-xl"
                    onChange={onChangePayersMobileNumber}
                    value={payersMobileNumber}
                  />
                </span>
                <span>
                  <span>{t("PT_PAYERS_NAME")}</span>
                  <TextInput
                    //style={{ width: "40%" }}

                    onChange={(e) => onChangePayersName(e.target.value)}
                    value={payersName}
                  />
                </span>
              </div>
            ) : null}
          </div>

          {isCCFEnabled?.isCitizenConsentFormEnabled && !isLoggedIn?.access_token && <div>
            <CheckBox
              className="form-field"
              label={checkLabels()}
              value={isCheckBox}
              checked={isCheckBox}
              style={{ marginTop: "5px", marginLeft: "55px" }}
              styles={{marginBottom: "30px"}}
              onChange={setTermsAndPolicyDetails}
            />

            <CitizenConsentForm
              styles={{}}
              t={t}
              isCheckBoxChecked={setTermsAndPolicyDetails}
              labels={isCCFEnabled?.checkBoxLabels}
              mdmsConfig={mdmsConfig}
              setMdmsConfig={setMdmsConfig}
            />
          </div>}

          <SubmitBar
            label={t("CS_COMMON_NEXT")}
            disabled={checkDisbaled()}
            // disabled={paymentType?.code !== optionSecound?.code ? false : userInfo ? false : !canSubmit}
            submit={true}
          />
        </Card>
      </form>
    </React.Fragment>
  );
};

export default SelectPaymentType;
