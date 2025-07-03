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
  CitizenConsentForm,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { stringReplaceAll } from "../bills/routes/bill-details/utils";

const SelectPaymentType = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state } = useLocation();
  const { consumerCode: encodedConsumerCode, businessService, paymentAmt } = useParams();
  const consumerCode = decodeURIComponent(encodedConsumerCode);
  const { workflow: wrkflow, tenantId: _tenantId, ConsumerName } = Digit.Hooks.useQueryParams();

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

  // User Info and State
  const userInfo = Digit.UserService.getUser()?.info;
  const payersActiveName = userInfo?.name;
  const payersActiveMobileNumber = userInfo?.mobileNumber;
  const isLoggedIn = Digit.UserService.getUser();
  const tenantId = state?.tenantId || _tenantId || Digit.UserService.getUser().info?.tenantId;

  const [bill, setBill] = useState(state?.bill);
  const [paymentType, setPaymentType] = useState(optionFirst);
  const [payersName, setPayersName] = useState("");
  const [payersMobileNumber, setPayersMobileNumber] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [mobileNumberError, setmobileNumberError] = useState(null);

  // Citizen Consent Form State
  const [isCheckBox, setIsCheckBox] = useState(false);
  const [isCCFEnabled, setisCCFEnabled] = useState(false);
  const [mdmsConfig, setMdmsConfig] = useState("");

  const { handleSubmit } = useForm();

  // Data Fetching Hooks
  const { data, isLoading } = state?.bill
    ? { isLoading: false }
    : businessService
    ? Digit.Hooks.useFetchPayment({ tenantId, businessService, consumerCode })
    : { isLoading: false, data: undefined };
  const Useruuid = data?.Bill?.[0]?.userId || "";

  const { isLoading: isUserLoading, data: userData } = Digit.Hooks.useCustomAPIHook({
    url: "/user/_search",
    method: "POST",
    body: { uuid: [Useruuid] },
    config: { enabled: !!Useruuid, cacheTime: 100 },
  });

  const { isLoading: citizenConcentFormLoading, data: ccfData } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [
    { name: "CitizenConsentForm" },
  ]);

  useEffect(() => {
    if (!bill && data && data?.Bill) {
      const requiredBill = data.Bill.find((e) => e.consumerCode === consumerCode);
      setBill(requiredBill);
    }
  }, [isLoading, data, bill, consumerCode]);

  useEffect(() => {
    if (ccfData?.["common-masters"]?.CitizenConsentForm?.[0]?.isCitizenConsentFormEnabled) {
      setisCCFEnabled(ccfData?.["common-masters"]?.CitizenConsentForm?.[0]);
    }
  }, [ccfData]);

  const billDetails = bill?.billDetails?.sort((a, b) => b.fromPeriod - a.fromPeriod)?.[0] || {};

  // --- Event Handlers ---

  const onChangePayersMobileNumber = (value) => {
    setPayersMobileNumber(value);
    const validation = /^\d{10}$/;
    if (!validation.test(value)) {
      setmobileNumberError("CORE_COMMON_PHONENO_INVALIDMSG");
      setCanSubmit(false);
    } else {
      setmobileNumberError(null);
      if (payersName) setCanSubmit(true);
    }
  };

  const onChangePayersName = (value) => {
    setPayersName(value);
    if (value && mobileNumberError === null && payersMobileNumber) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const setTermsAndPolicyDetails = (e) => {
    setIsCheckBox(e.target.checked);
  };

  const onSubmit = async () => {

    if (wrkflow === "WNS") {
      history.push(
        `/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}?workflow=WNS&consumerCode=${stringReplaceAll(consumerCode, "+", "/")}`,
        {
          paymentAmount: paymentAmt,
          tenantId: billDetails.tenantId,
          name: paymentType?.code !== optionSecound?.code && ConsumerName !== "undefined" ? ConsumerName : userInfo ? payersActiveName : payersName,
          mobileNumber:
            paymentType?.code !== optionSecound?.code
              ? bill?.mobileNumber?.includes("*")
                ? userData?.user?.[0]?.mobileNumber
                : bill?.mobileNumber
              : userInfo
              ? payersActiveMobileNumber
              : payersMobileNumber,
        }
      );
    } else if (wrkflow === "birth") {
      // console.log("billDetails inside: ", paymentAmt, billDetails.tenantId);
      // console.log(paymentType?.code);
      // console.log(paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName);
      // console.log(
      //   paymentType?.code !== optionSecound?.code
      //     ? bill?.mobileNumber?.includes("*")
      //       ? userData?.user?.[0]?.mobileNumber
      //       : bill?.mobileNumber
      //     : userInfo
      //     ? payersActiveMobileNumber
      //     : payersMobileNumber
      // );
      // history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}?workflow=birth`, {
      //   bill: bill,
      //   paymentAmount: paymentAmt,
      //   tenantId: billDetails.tenantId,
      //   name: paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName,
      //   mobileNumber:
      //     paymentType?.code !== optionSecound?.code
      //       ? bill?.mobileNumber?.includes("*")
      //         ? userData?.user?.[0]?.mobileNumber
      //         : bill?.mobileNumber
      //       : userInfo
      //       ? payersActiveMobileNumber
      //       : payersMobileNumber,
      // });

      //payment
      history.push(`/digit-ui/citizen/payment/success/${businessService}/${consumerCode}/${tenantId}?workflow=birth`)
    } else {
      history.push(`/digit-ui/citizen/payment/collect/${businessService}/${consumerCode}`, {
        paymentAmount: paymentAmt,
        tenantId: billDetails.tenantId,
        name: paymentType?.code !== optionSecound?.code ? bill?.payerName : userInfo ? payersActiveName : payersName,
        mobileNumber:
          paymentType?.code !== optionSecound?.code
            ? bill?.mobileNumber?.includes("*")
              ? userData?.user?.[0]?.mobileNumber
              : bill?.mobileNumber
            : userInfo
            ? payersActiveMobileNumber
            : payersMobileNumber,
      });
    }
  };

  // --- UI Rendering ---

  if (isLoading || isUserLoading || citizenConcentFormLoading) {
    return <Loader />;
  }

  const checkDisbaled = () => {
    // If user is not logged in and consent form is enabled, checkbox must be checked
    if (isCCFEnabled?.isCitizenConsentFormEnabled && !isLoggedIn?.access_token) {
      if (!isCheckBox) return true;
    }
    // If paying on behalf, name and mobile number must be valid
    if (paymentType?.code === optionSecound.code && !userInfo) {
      return !canSubmit;
    }
    return false;
  };

  const onLinkClick = (e) => {
    setMdmsConfig(e.target.id);
  };

  const checkLabels = () => (
    <span>
      {isCCFEnabled?.checkBoxLabels?.map((data, index) => (
        <span key={index}>
          {data?.linkPrefix && <span>{t(`${data?.linkPrefix}_`)}</span>}
          {data?.link && (
            <span id={data?.linkId} onClick={onLinkClick} style={{ color: "#F47738", cursor: "pointer" }}>
              {t(`${data?.link}_`)}
            </span>
          )}
          {data?.linkPostfix && <span>{t(`${data?.linkPostfix}_`)}</span>}
          {index === isCCFEnabled?.checkBoxLabels?.length - 1 && t("LABEL")}
        </span>
      ))}
    </span>
  );

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>{t("PT_PAYERS_DETAILS_HEADER")}</Header>
        <Card>
          <RadioButtons
            selectedOption={paymentType}
            onSelect={setPaymentType}
            options={[optionFirst, optionSecound]}
            optionsKey="name"
            inputStyle={{ marginTop: "11px" }}
            innerStyles={{ display: "flex" }}
          />
          {paymentType?.code === optionSecound.code && !userInfo && (
            <div style={{ position: "relative", marginTop: "1rem" }}>
              <span className="card-label-error">{t(mobileNumberError)}</span>
              <div>
                <p>{t("PT_PAYERS_MOBILE_NO")}</p>
                <MobileNumber onChange={onChangePayersMobileNumber} value={payersMobileNumber} />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p>{t("PT_PAYERS_NAME")}</p>
                <TextInput onChange={(e) => onChangePayersName(e.target.value)} value={payersName} />
              </div>
            </div>
          )}

          {isCCFEnabled?.isCitizenConsentFormEnabled && !isLoggedIn?.access_token && (
            <div>
              <CheckBox
                className="form-field"
                label={checkLabels()}
                value={isCheckBox}
                checked={isCheckBox}
                onChange={setTermsAndPolicyDetails}
                styles={{ marginBottom: "30px", marginTop: "1.5rem" }}
              />
              <CitizenConsentForm
                t={t}
                isCheckBoxChecked={setTermsAndPolicyDetails}
                labels={isCCFEnabled?.checkBoxLabels}
                mdmsConfig={mdmsConfig}
                setMdmsConfig={setMdmsConfig}
              />
            </div>
          )}

          <SubmitBar label={t("CS_COMMON_NEXT")} disabled={checkDisbaled()} submit={true} />
        </Card>
      </form>
    </React.Fragment>
  );
};

export default SelectPaymentType;
