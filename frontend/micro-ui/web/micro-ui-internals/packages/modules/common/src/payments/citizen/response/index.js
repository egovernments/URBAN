import { Banner, Card, CardText, Loader, Row, StatusTable, SubmitBar, DownloadPrefixIcon } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";

export const SuccessfulPayment = (props)=>{
  if(localStorage.getItem("BillPaymentEnabled")!=="true"){
    window.history.forward();
   return null;
 }
 return <WrapPaymentComponent {...props}/>
}


 const WrapPaymentComponent = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { eg_pg_txnid: egId, workflow: workflw, propertyId } = Digit.Hooks.useQueryParams();
  const [printing, setPrinting] = useState(false);
  const [allowFetchBill, setallowFetchBill] = useState(false);
  const { businessService: business_service, consumerCode, tenantId } = useParams();
  const isBpaFlow = (window.location.href.includes("bpa") || window.location.href.includes("BPA")) && !window.location.href.includes("BPAREG");
  const { data: bpaData = {}, isLoading: isBpaSearchLoading, isSuccess: isBpaSuccess, error: bpaerror } = Digit.Hooks.obps.useOBPSSearch(
    "", {}, tenantId, { applicationNo: consumerCode }, {}, {enabled: isBpaFlow}
  );

  // Function to trigger _getfilestoreid API for death certificates after payment success
  const triggerDeathCertificateFileStoreIdAfterPayment = async (consumerCode, tenantId) => {
    try {
      console.log("*** TRIGGERING _getfilestoreid API for Death Certificate from Payment Success ***");
      console.log("Consumer Code:", consumerCode);
      console.log("Tenant ID:", tenantId);
      
      const user = Digit.UserService.getUser();
      const userInfo = user?.info || user;
      const authToken = user?.access_token || user?.authToken || "";
      
      const requestPayload = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: authToken,
          userInfo: userInfo,
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {}
        }
      };

      console.log("Request Payload:", requestPayload);
      console.log("API URL:", `/birth-death-services/death/_getfilestoreid?tenantId=${tenantId}&consumerCode=${encodeURIComponent(consumerCode)}`);

      const response = await fetch(`/birth-death-services/death/_getfilestoreid?tenantId=${tenantId}&consumerCode=${encodeURIComponent(consumerCode)}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("*** _getfilestoreid API Response from Payment Success ***");
        console.log("Full Response:", data);
        console.log("*** FILESTORE ID from Payment Success:", data?.filestoreId || "NOT FOUND");
        
        // Store the filestore ID for later use
        if (data?.filestoreId) {
          sessionStorage.setItem("DeathCertificateFileStoreId", data.filestoreId);
          console.log("Filestore ID stored in sessionStorage from Payment Success");
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to trigger _getfilestoreid API from Payment Success:");
        console.error("Status:", response.status);
        console.error("Error:", errorText);
      }
    } catch (error) {
      console.error("Error triggering death certificate _getfilestoreid API from Payment Success:", error);
    }
  };

  
  const { isLoading, data, isError } = Digit.Hooks.usePaymentUpdate({ egId }, business_service, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  console.log("*** Log ===> bpaData ", bpaData);
  console.log("*** Log ===> data ", data);



  const { label } = Digit.Hooks.useApplicationsForBusinessServiceSearch({ businessService: business_service }, { enabled: false });



  // const { data: demand } = Digit.Hooks.useDemandSearch(
  //   { consumerCode, businessService: business_service },
  //   { enabled: !isLoading, retry: false, staleTime: Infinity, refetchOnWindowFocus: false }
  // );

  // const { data: billData, isLoading: isBillDataLoading } = Digit.Hooks.useFetchPayment(
  //   { tenantId, consumerCode, businessService: business_service },
  //   { enabled: allowFetchBill, retry: false, staleTime: Infinity, refetchOnWindowFocus: false }
  // );

  const { data: reciept_data, isLoading: recieptDataLoading } = Digit.Hooks.useRecieptSearch(
    {
      tenantId,
      businessService: business_service,
      receiptNumbers: data?.payments?.Payments?.[0]?.paymentDetails[0].receiptNumber,
    },
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      select: (dat) => {
        return dat.Payments[0];
      },
      enabled: allowFetchBill,
    }
  );


  console.log("*** Log ===> reciept_data ", reciept_data);

  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => business_service?.includes(code))[0]?.receiptKey || "consolidatedreceipt",
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const payments = data?.payments;

  useEffect(() => {
    return () => {
      localStorage.setItem("BillPaymentEnabled","false")
      queryClient.clear();
    };
  }, []);

  useEffect(() => {
    if (data && data.txnStatus && data.txnStatus !== "FAILURE") {
      setallowFetchBill(true);
      
      // Check for Pay and Download flow - Death or Birth certificates
      const isDeathCert = business_service === "DEATH_CERT" || business_service === "DEATH_CERT.DEATH_CERT";
      const isBirthCert = business_service === "BIRTH_CERT" || business_service === "BIRTH_CERT.BIRTH_CERT";
      const storedDeathData = JSON.parse(sessionStorage.getItem("DeathApplicationData") || "{}");
      const storedBirthData = JSON.parse(sessionStorage.getItem("BirthApplicationData") || "{}");
      const isDeathPayAndDownload = isDeathCert && storedDeathData.id;
      const isBirthPayAndDownload = isBirthCert && storedBirthData.id;
      
      if (isDeathPayAndDownload || isBirthPayAndDownload) {
        console.log("*** PAY AND DOWNLOAD SUCCESS PAGE DETECTED ***");
        console.log("Business Service:", business_service);
        console.log("Death Pay and Download:", isDeathPayAndDownload);
        console.log("Birth Pay and Download:", isBirthPayAndDownload);
        console.log("Consumer Code from URL:", consumerCode);
        console.log("Tenant ID:", tenantId);
        console.log("Payment Data:", data);
        
        // Extract consumer code from payment response if available
        const paymentConsumerCode = data?.payments?.Payments?.[0]?.paymentDetails?.[0]?.bill?.consumerCode;
        if (paymentConsumerCode) {
          console.log("*** Consumer Code from Payment Response:", paymentConsumerCode);
        }
        
        // Trigger download process for death certificates
        if (isDeathPayAndDownload) {
          console.log("*** TRIGGERING DEATH CERTIFICATE DOWNLOAD PROCESS ***");
          console.log("Death Certificate ID:", storedDeathData.id);
          console.log("Hospital Name:", storedDeathData.hospitalName);
          triggerDeathCertificateFileStoreIdAfterPayment(paymentConsumerCode || consumerCode, tenantId);
        }
        
        // Trigger download process for birth certificates  
        if (isBirthPayAndDownload) {
          console.log("*** TRIGGERING BIRTH CERTIFICATE DOWNLOAD PROCESS ***");
          console.log("Birth Certificate ID:", storedBirthData.id);
          // Add birth certificate download trigger here if needed
        }
      }
    }
  }, [data]);

  if (isBpaFlow && (isBpaSearchLoading || !bpaData || !Array.isArray(bpaData) || bpaData.length === 0)) {
    return <Loader />;
  }




  if (isLoading || recieptDataLoading) {
    return <Loader />;
  }

  const applicationNo = data?.applicationNo;

  const isMobile = window.Digit.Utils.browser.isMobile();


  if (isError || !payments || !payments.Payments || payments.Payments.length === 0 || data.txnStatus === "FAILURE") {
    return (
      <Card>
        <Banner
          message={t("CITIZEN_FAILURE_COMMON_PAYMENT_MESSAGE")}
          info={t("CS_PAYMENT_TRANSANCTION_ID")}
          applicationNumber={egId}
          successful={false}
        />
        <CardText>{t("CS_PAYMENT_FAILURE_MESSAGE")}</CardText>
        {!(business_service?.includes("PT")) ? (
          <Link to={`/digit-ui/citizen`}>
            <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        ) : (
          <React.Fragment>
            <Link to={(applicationNo && `/digit-ui/citizen/payment/my-bills/${business_service}/${applicationNo}`) || "/digit-ui/citizen"}>
              <SubmitBar label={t("CS_PAYMENT_TRY_AGAIN")} />
            </Link>
            {/* {business_service?.includes("PT") &&<div style={{marginTop:"10px"}}><Link to={`/digit-ui/citizen/feedback?redirectedFrom=${"digit-ui/citizen/payment/success"}&propertyId=${consumerCode? consumerCode : ""}&acknowldgementNumber=${egId ? egId : ""}&tenantId=${tenantId}&creationReason=${business_service?.split(".")?.[1]}`}>
              <SubmitBar label={t("CS_REVIEW_AND_FEEDBACK")} />
            </Link></div>} */}
            <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }}>
              <Link to={`/digit-ui/citizen`}>{t("CORE_COMMON_GO_TO_HOME")}</Link>
            </div>
          </React.Fragment>
        )}
      </Card>
    );
  }

  const paymentData = data?.payments?.Payments[0];
  const amount = reciept_data?.paymentDetails?.[0]?.totalAmountPaid;
  const transactionDate = paymentData?.transactionDate;
  const printCertificate = async () => {
    //const tenantId = Digit.ULBService.getCurrentTenantId();
    const state = tenantId;
    const applicationDetails = await Digit.TLService.search({ applicationNumber: consumerCode, tenantId });
    const generatePdfKeyForTL = "tlcertificate";

    if (applicationDetails) {
      let response = await Digit.PaymentService.generatePdf(state, { Licenses: applicationDetails?.Licenses }, generatePdfKeyForTL);
      const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
  };

  const printReciept = async () => {
    if (printing) return;
    setPrinting(true);
    const tenantId = paymentData?.tenantId;
    const state = Digit.ULBService.getStateId();
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };
    if (!paymentData?.fileStoreId) {
      response = await Digit.PaymentService.generatePdf(state, { Payments: [payments.Payments[0]] }, generatePdfKey);
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    if (fileStore && fileStore[response.filestoreIds[0]]) {
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
    setPrinting(false);
  };


    const downloadCertificateFromPayment = async (certificateType) => {
    try {
      // Step 1: Use consumer code for the new _getfilestoreid API from payment flow
      const downloadConsumerCode = consumerCode;
      
      console.log(`Downloading ${certificateType} certificate from payment using consumer code:`, downloadConsumerCode);
      console.log("Consumer Code (from payment):", consumerCode);
      console.log("Tenant ID:", tenantId);

      // Step 2: Prepare the API request
      const user = Digit.UserService.getUser();
      const userInfo = user?.info || user;
      const authToken = user?.access_token || user?.authToken || "";
      
      const requestPayload = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: authToken,
          userInfo: userInfo,
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {}
        }
      };

      console.log(`Step 1: Getting filestore ID from ${certificateType} service using _getfilestoreid API...`);

      // Step 3: Call birth/death service to get filestore ID using the new _getfilestoreid API
      const serviceResponse = await fetch(`/birth-death-services/${certificateType}/_getfilestoreid?tenantId=${tenantId}&consumerCode=${encodeURIComponent(downloadConsumerCode)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(requestPayload)
      });

      if (!serviceResponse.ok) {
        const errorText = await serviceResponse.text();
        console.error(`${certificateType} service error:`, serviceResponse.status, errorText);
        alert(`Failed to get certificate info. Status: ${serviceResponse.status}`);
        return;
      }

      const serviceData = await serviceResponse.json();
      console.log(`${certificateType} service response:`, serviceData?.filestoreId);
      console.log(`Full ${certificateType} response:`, serviceData);
      
      const filestoreId = serviceData?.filestoreId;
      console.log("Extracted filestoreId:", filestoreId);
      console.log("Type of filestoreId:", typeof filestoreId);
      console.log("Is filestoreId truthy?", !!filestoreId);
      
      if (!filestoreId || filestoreId.trim() === "") {
        console.error("No valid filestoreId in response:", serviceData);
        alert(`Could not get download reference from ${certificateType} service.`);
        return;
      }

      console.log("Step 2: Getting download URL from filestore service...");

      const state = Digit.ULBService.getStateId();
      console.log(`*** ${certificateType.toUpperCase()} LOG ***`, state);

      // Step 4: Get the actual download URL from filestore service
      const filestoreResponse = await fetch(`/filestore/v1/files/url?tenantId=${state}&fileStoreIds=${filestoreId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=utf-8',
        }
      });

      if (!filestoreResponse.ok) {
        const errorText = await filestoreResponse.text();
        console.error("Filestore service error:", filestoreResponse.status, errorText);
        alert(`Failed to get download URL. Status: ${filestoreResponse.status}`);
        return;
      }

      const filestoreData = await filestoreResponse.json();
      console.log("Filestore service response:", filestoreData);
      
      const fileUrl = filestoreData?.fileStoreIds?.[0]?.url;
      if (!fileUrl) {
        console.error("No download URL in filestore response:", filestoreData);
        alert("Could not get download URL from filestore service.");
        return;
      }

      // Step 5: Trigger the download
      console.log("Step 3: Initiating download...");
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.download = `${certificateType}_certificate_${downloadConsumerCode.replace(/\//g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`${certificateType} certificate download initiated successfully`);
      
    } catch (error) {
      console.error(`Error downloading ${certificateType} certificate:`, error);
      alert(`Error downloading ${certificateType} certificate: ${error.message}`);
    }
  };

  const downloadBirthCertificate = async () => {
    try {
      // Step 1: Get the actual birth certificate ID (from Pay and Download selection)
      const storedBirthData = JSON.parse(sessionStorage.getItem("BirthApplicationData") || "{}");
      
      // Priority: Use the stored birth certificate ID from the Pay and Download selection
      let birthCertificateId = storedBirthData.id || storedBirthData.birthCertificateId;
      
      console.log("Stored birth application data:", storedBirthData);
      console.log("Birth Certificate ID from storage:", birthCertificateId);
      console.log("Consumer Code (receipt number):", consumerCode);
      console.log("Tenant ID:", tenantId);
      
      // If no stored ID, show error message (consumer code is not the certificate ID)
      if (!birthCertificateId) {
        console.error("Birth certificate ID not found in stored data");
        alert("Birth certificate ID not found. This usually means the payment was not initiated from the certificate search page. Please go to My Applications to download your certificate.");
        return;
      }

      // Step 2: Prepare the API request to get filestore ID
      const user = Digit.UserService.getUser();
      const userInfo = user?.info || user;
      const authToken = user?.access_token || user?.authToken || "";
      
      const requestPayload = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: authToken,
          userInfo: userInfo,
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {}
        }
      };

      console.log("Step 1: Getting filestore ID from birth service...");
      console.log("API URL:", `/birth-death-services/birth/_download?tenantId=${tenantId}&id=${birthCertificateId}&source=web`);

      // Step 3: Call birth service to get filestore ID
      const birthResponse = await fetch(`/birth-death-services/birth/_download?tenantId=${tenantId}&id=${birthCertificateId}&source=web`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(requestPayload)
      });

      if (!birthResponse.ok) {
        const errorText = await birthResponse.text();
        console.error("Birth service error:", birthResponse.status, errorText);
        alert(`Failed to get certificate info. Status: ${birthResponse.status}`);
        return;
      }

      const birthData = await birthResponse.json();
      console.log("Birth service response:", birthData);
      
      const filestoreId = birthData?.filestoreId;
      if (!filestoreId) {
        console.error("No filestoreId in response:", birthData);
        alert("Could not get download reference from birth service.");
        return;
      }

      console.log("Step 2: Getting download URL from filestore service...");
      console.log("Filestore ID:", filestoreId);
      console.log("Filestore API URL:", `/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${filestoreId}`);

      // Step 4: Get the actual download URL from filestore service
      const filestoreResponse = await fetch(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${filestoreId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=utf-8',
        }
      });

      if (!filestoreResponse.ok) {
        const errorText = await filestoreResponse.text();
        console.error("Filestore service error:", filestoreResponse.status, errorText);
        alert(`Failed to get download URL. Status: ${filestoreResponse.status}`);
        return;
      }

      const filestoreData = await filestoreResponse.json();
      console.log("Filestore service response:", filestoreData);
      
      const fileUrl = filestoreData?.fileStoreIds?.[0]?.url;
      if (!fileUrl) {
        console.error("No download URL in filestore response:", filestoreData);
        alert("Could not get download URL from filestore service.");
        return;
      }

      // Step 5: Trigger the download
      console.log("Step 3: Initiating download...");
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.download = `birth_certificate_${birthCertificateId.replace(/\//g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log("Birth certificate download initiated successfully");
      
    } catch (error) {
      console.error("Error downloading birth certificate:", error);
      alert(`Error downloading birth certificate: ${error.message}`);
    }
  };

  const downloadDeathCertificate = async () => {
    try {
      // Step 1: Use consumer code for the new _getfilestoreid API
      const downloadConsumerCode = consumerCode;
      
      console.log("Downloading death certificate using consumer code:", downloadConsumerCode);
      console.log("Consumer Code from URL:", consumerCode);
      console.log("Tenant ID:", tenantId);

      // Step 2: Prepare the API request to get filestore ID using _getfilestoreid API
      const user = Digit.UserService.getUser();
      const userInfo = user?.info || user;
      const authToken = user?.access_token || user?.authToken || "";
      
      const requestPayload = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: authToken,
          userInfo: userInfo,
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {}
        }
      };

      console.log("Step 1: Getting filestore ID from death service using _getfilestoreid API...");
      console.log("API URL:", `/birth-death-services/death/_getfilestoreid?tenantId=${tenantId}&consumerCode=${encodeURIComponent(downloadConsumerCode)}`);

      // Step 3: Call death service to get filestore ID using the new _getfilestoreid API
      const deathResponse = await fetch(`/birth-death-services/death/_getfilestoreid?tenantId=${tenantId}&consumerCode=${encodeURIComponent(downloadConsumerCode)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(requestPayload)
      });

      if (!deathResponse.ok) {
        const errorText = await deathResponse.text();
        console.error("Death service error:", deathResponse.status, errorText);
        alert(`Failed to get certificate info. Status: ${deathResponse.status}`);
        return;
      }

      const deathData = await deathResponse.json();
      console.log("Death service response:", deathData.filestoreId);
      console.log("Full death response:", deathData);
      
      const filestoreId = deathData?.filestoreId;
      console.log("Extracted filestoreId:", filestoreId);
      console.log("Type of filestoreId:", typeof filestoreId);
      console.log("Is filestoreId truthy?", !!filestoreId);
      
      if (!filestoreId || filestoreId.trim() === "") {
        console.error("No valid filestoreId in response:", deathData);
        alert("Could not get download reference from death service.");
        return;
      }

      console.log("Step 2: Getting download URL from filestore service...");
      console.log("Filestore ID:", filestoreId);
      console.log("Filestore API URL:", `/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${filestoreId}`);

      // Step 4: Get the actual download URL from filestore service
      const filestoreResponse = await fetch(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${filestoreId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=utf-8',
        }
      });

      if (!filestoreResponse.ok) {
        const errorText = await filestoreResponse.text();
        console.error("Filestore service error:", filestoreResponse.status, errorText);
        alert(`Failed to get download URL. Status: ${filestoreResponse.status}`);
        return;
      }

      const filestoreData = await filestoreResponse.json();
      console.log("Filestore service response:", filestoreData);
      
      const fileUrl = filestoreData?.fileStoreIds?.[0]?.url;
      if (!fileUrl) {
        console.error("No download URL in filestore response:", filestoreData);
        alert("Could not get download URL from filestore service.");
        return;
      }

      // Step 5: Trigger the download
      console.log("Step 3: Initiating download...");
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.download = `death_certificate_${downloadConsumerCode.replace(/\//g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log("Death certificate download initiated successfully");
      
    } catch (error) {
      console.error("Error downloading death certificate:", error);
      alert(`Error downloading death certificate: ${error.message}`);
    }
  };

  const convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
    //example input format : "2018-10-02"
    try {
      const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
      DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
      if (dayStartOrEnd === "dayend") {
        DateObj.setHours(DateObj.getHours() + 24);
        DateObj.setSeconds(DateObj.getSeconds() - 1);
      }
      return DateObj.getTime();
    } catch (e) {
      return dateString;
    }
  };

  const printPdf = (blob) => {
    const fileURL = URL.createObjectURL(blob);
    var myWindow = window.open(fileURL);
    if (myWindow != undefined) {
      myWindow.addEventListener("load", (event) => {
        myWindow.focus();
        myWindow.print();
      });
    }
  };

  const downloadPdf = (blob, fileName) => {
    if (window.mSewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        mSewaApp.downloadBase64File(base64data, fileName);
      };
    } else {
      const link = document.createElement("a");
      // create a blobURI pointing to our Blob
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      // some browser needs the anchor to be in the doc
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }
  };

  const getPermitOccupancyOrderSearch = async(order, mode="download") => {
    let queryObj = { applicationNo: bpaData?.[0]?.applicationNo };
    let bpaResponse = await Digit.OBPSService.BPASearch(bpaData?.[0]?.tenantId, queryObj);
    const edcrResponse = await Digit.OBPSService.scrutinyDetails(bpaData?.[0]?.tenantId, { edcrNumber: bpaData?.[0]?.edcrNumber });
    let bpaDataDetails = bpaResponse?.BPA?.[0], edcrData = edcrResponse?.edcrDetail?.[0];
    let currentDate = new Date();
    bpaDataDetails.additionalDetails.runDate = convertDateToEpoch(
      currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()
    );
    let reqData = { ...bpaDataDetails, edcrDetail: [{ ...edcrData }] };
    let response = await Digit.PaymentService.generatePdf(bpaDataDetails?.tenantId, { Bpa: [reqData] }, order);
    const fileStore = await Digit.PaymentService.printReciept(bpaDataDetails?.tenantId, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response?.filestoreIds[0]], "_blank");

    reqData["applicationType"] = bpaDataDetails?.additionalDetails?.applicationType;
    let edcrresponse = await Digit.OBPSService.edcr_report_download({ BPA: { ...reqData } });
    const responseStatus = parseInt(edcrresponse.status, 10);
    if (responseStatus === 201 || responseStatus === 200) {
      mode == "print"
        ? printPdf(new Blob([edcrresponse.data], { type: "application/pdf" }))
        : downloadPdf(new Blob([edcrresponse.data], { type: "application/pdf" }), `edcrReport.pdf`);
    }
  };

  const getBillingPeriod = (billDetails) => {
    const { taxPeriodFrom, taxPeriodTo, fromPeriod, toPeriod } = billDetails || {};
    if (taxPeriodFrom && taxPeriodTo) {
      let from = new Date(taxPeriodFrom).getFullYear().toString();
      let to = new Date(taxPeriodTo).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else if (fromPeriod && toPeriod) {
      if (workflw === "mcollect") {
        let from =
          new Date(fromPeriod).getDate().toString() +
          " " +
          Digit.Utils.date.monthNames[new Date(fromPeriod).getMonth() ].toString() +
          " " +
          new Date(fromPeriod).getFullYear().toString();
        let to =
          new Date(toPeriod).getDate() +
          " " +
          Digit.Utils.date.monthNames[new Date(toPeriod).getMonth()] +
          " " +
          new Date(toPeriod).getFullYear();
        return from + " - " + to;
      }
      else if(workflw === "WNS")
      {
        let from =
          new Date(fromPeriod).getDate().toString() +
          "/" +
          (new Date(fromPeriod).getMonth() + 1).toString() +
          "/" +
          new Date(fromPeriod).getFullYear().toString();
        let to =
          new Date(toPeriod).getDate() +
          "/" +
          (new Date(toPeriod).getMonth() + 1) +
          "/" +
          new Date(toPeriod).getFullYear();
        return from + " - " + to;
      }
      let from = new Date(fromPeriod).getFullYear().toString();
      let to = new Date(toPeriod).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else return "N/A";
  };

  let bannerText;
  if (workflw) {
    bannerText = `CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE`;
  } else {
    if (paymentData?.paymentDetails?.[0]?.businessService && paymentData?.paymentDetails?.[0]?.businessService?.includes("BPA")) {
      let nameOfAchitect = sessionStorage.getItem("BPA_ARCHITECT_NAME");
      let parsedArchitectName = nameOfAchitect ? JSON.parse(nameOfAchitect) : "ARCHITECT";
      bannerText = `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0]?.businessService.replace(/\./g, "_")}_${parsedArchitectName}_PAYMENT_MESSAGE`;
    } else if (business_service?.includes("WS") || business_service?.includes("SW")) {
      bannerText = t(`CITIZEN_SUCCESS_${paymentData?.paymentDetails[0].businessService.replace(/\./g, "_")}_WS_PAYMENT_MESSAGE`);
    } else {
      bannerText = paymentData?.paymentDetails[0]?.businessService ? `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0]?.businessService.replace(/\./g, "_")}_PAYMENT_MESSAGE` : t("CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE");
    }
  }

  // https://dev.digit.org/collection-services/payments/FSM.TRIP_CHARGES/_search?tenantId=pb.amritsar&consumerCodes=107-FSM-2021-02-18-063433

  // if (billDataLoading) return <Loader />;

  const rowContainerStyle = {
    padding: "4px 0px",
    justifyContent: "space-between",
  };

  const ommitRupeeSymbol = ["PT"].includes(business_service);

  if (isBpaFlow && isBpaSearchLoading) return <Loader />

  return (
    <Card>
      <Banner
        svg={
          <svg className="payment-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM16 30L6 20L8.82 17.18L16 24.34L31.18 9.16L34 12L16 30Z"
              fill="white"
            />
          </svg>
        }
        message={t("CS_COMMON_PAYMENT_COMPLETE")}
        info={t("CS_COMMON_RECIEPT_NO")}
        applicationNumber={paymentData?.paymentDetails[0].receiptNumber}
        successful={true}
      />
      <CardText>{t(`${bannerText}_DETAIL`)}</CardText>
      <StatusTable>
        <Row rowContainerStyle={rowContainerStyle} last label={t(label)} text={applicationNo} />
        {/** TODO : move this key and value into the hook based on business Service */}
        {(business_service === "PT" || workflw) && (
          <Row
            rowContainerStyle={rowContainerStyle}
            last
            label={t("CS_PAYMENT_BILLING_PERIOD")}
            text={getBillingPeriod(reciept_data?.paymentDetails[0]?.bill?.billDetails[0])}
          />
        )}

        {(business_service === "PT" || workflw) && (
          <Row
            rowContainerStyle={rowContainerStyle}
            last
            label={t("CS_PAYMENT_AMOUNT_PENDING")}
            text={(reciept_data?.paymentDetails?.[0]?.totalDue && reciept_data?.paymentDetails?.[0]?.totalAmountPaid ) ? `₹ ${reciept_data?.paymentDetails?.[0]?.totalDue - reciept_data?.paymentDetails?.[0]?.totalAmountPaid}` : `₹ ${0}`}
          />
        )}

        <Row rowContainerStyle={rowContainerStyle} last label={t("CS_PAYMENT_TRANSANCTION_ID")} text={egId} />
        <Row
          rowContainerStyle={rowContainerStyle}
          last
          label={t(ommitRupeeSymbol ? "CS_PAYMENT_AMOUNT_PAID_WITHOUT_SYMBOL" : "CS_PAYMENT_AMOUNT_PAID")}
          text={reciept_data?.paymentDetails?.[0]?.totalAmountPaid ? ("₹ " +  reciept_data?.paymentDetails?.[0]?.totalAmountPaid) : `₹ 0` }
        />
        {(business_service !== "PT" || workflw) && (
          <Row
            rowContainerStyle={rowContainerStyle}
            last
            label={t("CS_PAYMENT_TRANSANCTION_DATE")}
            text={transactionDate && new Date(transactionDate).toLocaleDateString("in")}
          />
        )}
      </StatusTable>
      <div style={{display:"flex"}}>
      {business_service == "TL" ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginRight: "20px", marginTop:"15px",marginBottom:"15px" }} onClick={printReciept}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          {t("TL_RECEIPT")}
        </div>
      ) : null}
      {business_service == "TL" ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginTop:"15px" }} onClick={printCertificate}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          {t("TL_CERTIFICATE")}
        </div>
      ) : null}
      {business_service == "DEATH_CERT" && JSON.parse(sessionStorage.getItem("DeathApplicationData") || "{}")?.id ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginRight: "20px", marginTop:"15px",marginBottom:"15px" }} onClick={printReciept}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          {t("CS_COMMON_DOWNLOAD_RECEIPT")}
        </div>
      ) : null}
      {business_service == "DEATH_CERT" ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginTop:"15px" }} onClick={downloadCertificateFromPayment('death')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          {t("BND_DEATH_CERTIFICATE")}
        </div>
      ) : null}
      {(business_service == "BIRTH_CERT.BIRTH_CERT" || business_service == "BIRTH_CERT") && JSON.parse(sessionStorage.getItem("BirthApplicationData") || "{}")?.id ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginRight: "20px", marginTop:"15px",marginBottom:"15px" }} onClick={printReciept}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          {t("CS_COMMON_DOWNLOAD_RECEIPT")}
        </div>
      ) : null}
      {(business_service == "BIRTH_CERT.BIRTH_CERT" || business_service == "BIRTH_CERT") && JSON.parse(sessionStorage.getItem("BirthApplicationData") || "{}")?.id ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginTop:"15px" }} onClick={downloadCertificateFromPayment('birth')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          {t("BND_BIRTH_CERTIFICATE")}
        </div>
      ) : null}
      {bpaData?.[0]?.businessService === "BPA_OC" && (bpaData?.[0]?.status==="APPROVED" || bpaData?.[0]?.status==="PENDING_SANC_FEE_PAYMENT") ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={e => getPermitOccupancyOrderSearch("occupancy-certificate")}>
          <DownloadPrefixIcon />
            {t("BPA_OC_CERTIFICATE")}
          </div>
      ) : null}
      {bpaData?.[0]?.businessService === "BPA_LOW" ? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={r => getPermitOccupancyOrderSearch("buildingpermit-low")}>
          <DownloadPrefixIcon />
            {t("BPA_PERMIT_ORDER")}
          </div>
      ) : null}
      {bpaData?.[0]?.businessService === "BPA" && (bpaData?.[0]?.businessService !== "BPA_LOW") && (bpaData?.[0]?.businessService !== "BPA_OC") && (bpaData?.[0]?.status==="PENDING_SANC_FEE_PAYMENT" || bpaData?.[0]?.status==="APPROVED")? (
        <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={r => getPermitOccupancyOrderSearch("buildingpermit")}>
          <DownloadPrefixIcon />
            {t("BPA_PERMIT_ORDER")}
          </div>
        ) : null}
      </div>
      {business_service?.includes("PT") &&<div style={{marginTop:"10px"}}><Link to={`/digit-ui/citizen/feedback?redirectedFrom=${"digit-ui/citizen/payment/success"}&propertyId=${consumerCode? consumerCode : ""}&acknowldgementNumber=${egId ? egId : ""}&tenantId=${tenantId}&creationReason=${business_service?.split(".")?.[1]}`}>
          <SubmitBar label={t("CS_REVIEW_AND_FEEDBACK")} />
      </Link></div>}
      {business_service?.includes("PT") ? (
        <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }} onClick={printReciept}>
            {t("CS_DOWNLOAD_RECEIPT")}
          </div>
      ) : null}
      {!(business_service == "TL") || !(business_service?.includes("PT")) && <SubmitBar onSubmit={printReciept} label={t("COMMON_DOWNLOAD_RECEIPT")} />}
      {!(business_service == "TL") || !(business_service?.includes("PT")) && (
        <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }}>
          <Link to={`/digit-ui/citizen`}>{t("CORE_COMMON_GO_TO_HOME")}</Link>
        </div>
      )}
      {business_service == "TL" && (
        <Link to={`/digit-ui/citizen`}>
          <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      )}
    </Card>
  );
};

export const FailedPayment = (props) => {
  const { addParams, clearParams } = props;
  const { t } = useTranslation();
  const { consumerCode } = useParams();

  const getMessage = () => "Failure !";
  return (
    <Card>
      <Banner message={getMessage()} complaintNumber={consumerCode} successful={false} />
      <CardText>{t("ES_COMMON_TRACK_COMPLAINT_TEXT")}</CardText>
    </Card>
  );
};

export const SuccessPayment = (props) => {
//   if(localStorage.getItem("BillPaymentEnabled")!=="true"){
//     window.history.forward();
//    return null;
//  }
 return <PaymentComponent {...props}/>
}

const PaymentComponent = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { eg_pg_txnid: egId, workflow: workflw, propertyId } = Digit.Hooks.useQueryParams();
  const [printing, setPrinting] = useState(false);
  const [allowFetchBill, setallowFetchBill] = useState(false);
  const [autoDownloadTriggered, setAutoDownloadTriggered] = useState(false);
  const { businessService: business_service, consumerCode, tenantId } = useParams();
  const isBpaFlow = (window.location.href.includes("bpa") || window.location.href.includes("BPA")) && !window.location.href.includes("BPAREG");
  const { data: bpaData = {}, isLoading: isBpaSearchLoading, isSuccess: isBpaSuccess, error: bpaerror } = Digit.Hooks.obps.useOBPSSearch(
    "", {}, tenantId, { applicationNo: consumerCode }, {}, {enabled: isBpaFlow}
  );

  // Retrieve stored payment data
  const storedPaymentData = JSON.parse(sessionStorage.getItem("PaymentResponse"));

  const { isLoading, data, isError } = Digit.Hooks.usePaymentUpdate({ egId }, business_service, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // const { label } = Digit.Hooks.useApplicationsForBusinessServiceSearch({ businessService: business_service }, { enabled: false });

  const { data: reciept_data, isLoading: recieptDataLoading } = Digit.Hooks.useRecieptSearch(
    {
      tenantId,
      businessService: business_service,
      receiptNumbers: data?.payments?.Payments?.[0]?.paymentDetails[0].receiptNumber,
    },
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      select: (dat) => {
        return dat.Payments[0];
      },
      enabled: allowFetchBill,
    }
  );

  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => business_service?.includes(code))[0]?.receiptKey || "consolidatedreceipt",
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const payments = data?.payments;

  useEffect(() => {
    return () => {
      localStorage.setItem("BillPaymentEnabled","false")
      queryClient.clear();
    };
  }, []);

  useEffect(() => {
    if (data && data.txnStatus && data.txnStatus !== "FAILURE") {
      setallowFetchBill(true);
    }
  }, [data]);

  // Auto-trigger download for Pay and Download flows
  useEffect(() => {
    const autoTriggerDownload = async () => {
      console.log("=== AUTO-DOWNLOAD USEEFFECT TRIGGERED ===");
      console.log("autoDownloadTriggered:", autoDownloadTriggered);
      console.log("data:", !!data);
      console.log("data.txnStatus:", data?.txnStatus);
      console.log("reciept_data:", !!reciept_data);
      console.log("isLoading:", isLoading);
      console.log("recieptDataLoading:", recieptDataLoading);
      
      // Prevent multiple triggers
      if (autoDownloadTriggered) {
        console.log("Auto-download already triggered, skipping...");
        return;
      }
      
      // Only trigger if payment is successful
      if (!data || !data.txnStatus || data.txnStatus === "FAILURE") {
        console.log("Payment not successful or data not ready, skipping auto-download");
        return;
      }

      // Check if this is a Pay and Download flow
      const urlParams = new URLSearchParams(window.location.search);
      const workflow = urlParams.get('workflow');
      
      // Check navigation state for Pay and Download flags
      const navigationState = window.history?.state?.state;
      const isPayAndDownload = navigationState?.isPayAndDownload;
      const payAndDownloadSource = navigationState?.payAndDownloadSource;
      
      // Check session storage for stored certificate data
      const deathData = JSON.parse(sessionStorage.getItem("DeathApplicationData") || "{}");
      const birthData = JSON.parse(sessionStorage.getItem("BirthApplicationData") || "{}");
      
      console.log("=== AUTO-DOWNLOAD CHECK ===");
      console.log("Workflow from URL:", workflow);
      console.log("Navigation state - isPayAndDownload:", isPayAndDownload);
      console.log("Navigation state - payAndDownloadSource:", payAndDownloadSource);
      console.log("Navigation state (full):", navigationState);
      console.log("Death certificate data:", deathData);
      console.log("Birth certificate data:", birthData);
      console.log("Business service:", business_service);
      console.log("Payment status:", data.txnStatus);
      console.log("Current URL:", window.location.href);
      
      // Auto-trigger download for death certificates
      if (
        (workflow === 'death' || business_service === 'DEATH_CERT') &&
        (isPayAndDownload || payAndDownloadSource === 'death' || deathData.id)
      ) {
        console.log("🚀 Auto-triggering death certificate download...");
        setAutoDownloadTriggered(true);
        setTimeout(() => {
          console.log("Executing death certificate download now...");
          downloadCertificateFromPayment('death');
        }, 1500); // Slightly longer delay
      }
      
      // Auto-trigger download for birth certificates
      else if (
        (workflow === 'birth' || business_service === 'BIRTH_CERT' || business_service === 'BIRTH_CERT.BIRTH_CERT') &&
        (isPayAndDownload || payAndDownloadSource === 'birth' || birthData.id)
      ) {
        console.log("🚀 Auto-triggering birth certificate download...");
        setAutoDownloadTriggered(true);
        setTimeout(() => {
          console.log("Executing birth certificate download now...");
          downloadCertificateFromPayment('birth');
        }, 1500); // Slightly longer delay
      } else {
        console.log("❌ Auto-download conditions not met");
        console.log("Death condition:", (workflow === 'death' || business_service === 'DEATH_CERT'), "&&", (isPayAndDownload || payAndDownloadSource === 'death' || deathData.id));
        console.log("Birth condition:", (workflow === 'birth' || business_service === 'BIRTH_CERT' || business_service === 'BIRTH_CERT.BIRTH_CERT'), "&&", (isPayAndDownload || payAndDownloadSource === 'birth' || birthData.id));
      }
    };

    // Only run if data is loaded and receipt data is available
    if (data && reciept_data && !isLoading && !recieptDataLoading) {
      console.log("All conditions met, calling autoTriggerDownload...");
      autoTriggerDownload();
    } else {
      console.log("Conditions not met for auto-trigger:", {
        hasData: !!data,
        hasReceiptData: !!reciept_data,
        isLoading,
        recieptDataLoading
      });
    }
  }, [data, reciept_data, isLoading, recieptDataLoading, business_service, autoDownloadTriggered]);

  // Show loader until bpaData is loaded and valid if BPA is in the URL
  if (isBpaFlow && (isBpaSearchLoading || !bpaData || !Array.isArray(bpaData) || bpaData.length === 0)) {
    return <Loader />;
  }

  if (isLoading || recieptDataLoading) {
    return <Loader />;
  }

  const applicationNo = data?.applicationNo;

  const isMobile = window.Digit.Utils.browser.isMobile();


  if (!storedPaymentData || !storedPaymentData.Payments || storedPaymentData.Payments.length === 0) {
    return (
      <Card>
        <Banner
          message={t("CITIZEN_FAILURE_COMMON_PAYMENT_MESSAGE")}
          info={t("CS_PAYMENT_TRANSANCTION_ID")}
          applicationNumber={egId}
          successful={false}
        />
        <CardText>{t("CS_PAYMENT_FAILURE_MESSAGE")}</CardText>
        {!(business_service?.includes("PT")) ? (
          <Link to={`/digit-ui/citizen`}>
            <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        ) : (
          <React.Fragment>
            <Link to={(applicationNo && `/digit-ui/citizen/payment/my-bills/${business_service}/${applicationNo}`) || "/digit-ui/citizen"}>
              <SubmitBar label={t("CS_PAYMENT_TRY_AGAIN")} />
            </Link>
            {/* {business_service?.includes("PT") &&<div style={{marginTop:"10px"}}><Link to={`/digit-ui/citizen/feedback?redirectedFrom=${"digit-ui/citizen/payment/success"}&propertyId=${consumerCode? consumerCode : ""}&acknowldgementNumber=${egId ? egId : ""}&tenantId=${tenantId}&creationReason=${business_service?.split(".")?.[1]}`}>
              <SubmitBar label={t("CS_REVIEW_AND_FEEDBACK")} />
            </Link></div>} */}
            <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }}>
              <Link to={`/digit-ui/citizen`}>{t("CORE_COMMON_GO_TO_HOME")}</Link>
            </div>
          </React.Fragment>
        )}
      </Card>
    );
  }

  const paymentData = data?.payments?.Payments[0];
  const amount = reciept_data?.paymentDetails?.[0]?.totalAmountPaid;
  const transactionDate = paymentData?.transactionDate;
  const printCertificate = async () => {
    //const tenantId = Digit.ULBService.getCurrentTenantId();
    const state = tenantId;
    const applicationDetails = await Digit.TLService.search({ applicationNumber: consumerCode, tenantId });
    const generatePdfKeyForTL = "tlcertificate";

    if (applicationDetails) {
      let response = await Digit.PaymentService.generatePdf(state, { Licenses: applicationDetails?.Licenses }, generatePdfKeyForTL);
      const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
  };

  const printReciept = async () => {
    if (printing) return;
    setPrinting(true);
    const tenantId = storedPaymentData.Payments[0]?.tenantId;
    const state = Digit.ULBService.getStateId();
    let response = { filestoreIds: [storedPaymentData.Payments[0]?.fileStoreId] };
    if (!paymentData?.fileStoreId) {
      response = await Digit.PaymentService.generatePdf(state, { Payments: [storedPaymentData.Payments[0]] }, generatePdfKey);
    }
    const fileStore = await Digit.PaymentService.printReciept(state, { fileStoreIds: response.filestoreIds[0] });
    if (fileStore && fileStore[response.filestoreIds[0]]) {
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
    setPrinting(false);
  };



  const downloadCertificateFromPayment = async (certificateType) => {
    try {
      // Step 1: Use consumer code for the new _getfilestoreid API from payment flow
      const downloadConsumerCode = consumerCode;
      
      console.log(`Downloading ${certificateType} certificate from payment using consumer code:`, downloadConsumerCode);
      console.log("Consumer Code (from payment):", consumerCode);
      console.log("Tenant ID:", tenantId);

      // Step 2: Prepare the API request
      const user = Digit.UserService.getUser();
      const userInfo = user?.info || user;
      const authToken = user?.access_token || user?.authToken || "";
      
      const requestPayload = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: authToken,
          userInfo: userInfo,
          msgId: `${Date.now()}|en_IN`,
          plainAccessRequest: {}
        }
      };

      console.log(`Step 1: Getting filestore ID from ${certificateType} service using _getfilestoreid API...`);

      // Step 3: Call birth/death service to get filestore ID using the new _getfilestoreid API
      const serviceResponse = await fetch(`/birth-death-services/${certificateType}/_getfilestoreid?tenantId=${tenantId}&consumerCode=${encodeURIComponent(downloadConsumerCode)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(requestPayload)
      });

      if (!serviceResponse.ok) {
        const errorText = await serviceResponse.text();
        console.error(`${certificateType} service error:`, serviceResponse.status, errorText);
        alert(`Failed to get certificate info. Status: ${serviceResponse.status}`);
        return;
      }

      const serviceData = await serviceResponse.json();
      console.log(`${certificateType} service response:`, serviceData?.filestoreId);
      console.log(`Full ${certificateType} response:`, serviceData);
      
      const filestoreId = serviceData?.filestoreId;
      console.log("Extracted filestoreId:", filestoreId);
      console.log("Type of filestoreId:", typeof filestoreId);
      console.log("Is filestoreId truthy?", !!filestoreId);
      
      if (!filestoreId || filestoreId.trim() === "") {
        console.error("No valid filestoreId in response:", serviceData);
        alert(`Could not get download reference from ${certificateType} service.`);
        return;
      }

      console.log("Step 2: Getting download URL from filestore service...");

      const state = Digit.ULBService.getStateId();
      console.log(`*** ${certificateType.toUpperCase()} LOG ***`, state);

      // Step 4: Get the actual download URL from filestore service
      const filestoreResponse = await fetch(`/filestore/v1/files/url?tenantId=${state}&fileStoreIds=${filestoreId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=utf-8',
        }
      });

      if (!filestoreResponse.ok) {
        const errorText = await filestoreResponse.text();
        console.error("Filestore service error:", filestoreResponse.status, errorText);
        alert(`Failed to get download URL. Status: ${filestoreResponse.status}`);
        return;
      }

      const filestoreData = await filestoreResponse.json();
      console.log("Filestore service response:", filestoreData);
      
      const fileUrl = filestoreData?.fileStoreIds?.[0]?.url;
      if (!fileUrl) {
        console.error("No download URL in filestore response:", filestoreData);
        alert("Could not get download URL from filestore service.");
        return;
      }

      // Step 5: Trigger the download
      console.log("Step 3: Initiating download...");
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.download = `${certificateType}_certificate_${downloadConsumerCode.replace(/\//g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`${certificateType} certificate download initiated successfully`);
      
    } catch (error) {
      console.error(`Error downloading ${certificateType} certificate:`, error);
      alert(`Error downloading ${certificateType} certificate: ${error.message}`);
    }
  };

  let bannerText;
  if (workflw) {
    bannerText = `CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE`;
  } else {
    if (paymentData?.paymentDetails?.[0]?.businessService && paymentData?.paymentDetails?.[0]?.businessService?.includes("BPA")) {
      let nameOfAchitect = sessionStorage.getItem("BPA_ARCHITECT_NAME");
      let parsedArchitectName = nameOfAchitect ? JSON.parse(nameOfAchitect) : "ARCHITECT";
      bannerText = `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0]?.businessService.replace(/\./g, "_")}_${parsedArchitectName}_PAYMENT_MESSAGE`;
    } else if (business_service?.includes("WS") || business_service?.includes("SW")) {
      bannerText = t(`CITIZEN_SUCCESS_${paymentData?.paymentDetails[0].businessService.replace(/\./g, "_")}_WS_PAYMENT_MESSAGE`);
    } else {
      bannerText = paymentData?.paymentDetails[0]?.businessService ? `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0]?.businessService.replace(/\./g, "_")}_PAYMENT_MESSAGE` : t("CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE");
    }
  }
  const rowContainerStyle = {
    padding: "4px 0px",
    justifyContent: "space-between",
  };

  const ommitRupeeSymbol = ["PT"].includes(business_service);

  if (isBpaFlow && isBpaSearchLoading) return <Loader />
  return (
    <Card>
      <Banner
        svg={
          <svg className="payment-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM16 30L6 20L8.82 17.18L16 24.34L31.18 9.16L34 12L16 30Z"
              fill="white"
            />
          </svg>
        }
        message={t("CS_COMMON_PAYMENT_COMPLETE")}
        info={t("CS_COMMON_RECIEPT_NO")}
        applicationNumber={storedPaymentData?.Payments[0]?.paymentDetails[0]?.receiptNumber}
        successful={true}
      />
      <CardText>{t(`${bannerText}_DETAIL`)}</CardText>
      {generatePdfKey ? (
                <div style={{ display: "flex" }}>
                  <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginRight: "20px" }} onClick={printReciept}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                    </svg>
                    {t("CS_COMMON_PRINT_RECEIPT")}
                  </div>
                  {business_service == "DEATH_CERT" ? (
                    <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginTop:"0px" }} onClick={() => downloadCertificateFromPayment('death')}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
                      </svg>
                      {t("BND_DEATH_CERTIFICATE")}
                    </div>
                  ) : null}
                  {(business_service == "BIRTH_CERT.BIRTH_CERT" || business_service == "BIRTH_CERT") ? (
                    <div className="primary-label-btn d-grid" style={{ marginLeft: "unset", marginTop:"0px" }} onClick={() => downloadCertificateFromPayment('birth')}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f47738">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
                      </svg>
                      {t("BND_BIRTH_CERTIFICATE")}
                    </div>
                  ) : null}
                </div>
              ) : null}
      {business_service && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/digit-ui/citizen`}>
          <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </div>
      )}
    </Card>
  );
};