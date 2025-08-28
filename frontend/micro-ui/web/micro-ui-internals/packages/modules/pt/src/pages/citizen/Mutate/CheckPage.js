import {
  Card,
  CardHeader,
  CardSubHeader,
  CardText,
  CheckBox,
  LinkButton,
  Row,
  StatusTable,
  SubmitBar,
  Header,
  EditIcon,
  Loader,
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  checkForNA,
  getFixedFilename, isPropertyIndependent, isPropertyselfoccupied,
  ispropertyunoccupied, isPropertyVacant,
} from "../../../utils";
import Timeline from "../../../components/TLTimeline";
import PropertyDocument from "../../../pageComponents/PropertyDocument";

const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    history.push(jumpTo);
  }

  return <LinkButton label={t("CS_COMMON_CHANGE")} className="check-page-link-button" onClick={routeTo} />;
};

const CheckPage = ({ onSubmit, value = {} }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const [billAmount, setBillAmount] = useState(null);
  const [billStatus, setBillStatus] = useState(null);

  const {
    ownershipCategory,
    Constructiondetails,
    IsAnyPartOfThisFloorUnOccupied,
    propertyArea,
    selfOccupied,
    Owners,
    owners,
    isEditProperty,
    isUpdateProperty,
    searchResult,
    additionalDetails,
    addressProof,
    transferReasonProof,
  } = value;
  
  const { property } = searchResult;
  const { 
    address,
    propertyType,
    units = [{}],
    landarea,
    landArea,
    UnOccupiedArea
   } = property;

  // Create updated documents array with new mutation documents
  const getMutationDocuments = () => {
    let mutationDocs = [];
    
    // Add owner documents from new owners
    const ownersArray = ownershipCategory?.code?.includes("INDIVIDUAL") ? Owners : owners;
    if (ownersArray && Array.isArray(ownersArray)) {
      ownersArray.forEach((owner, ownerIndex) => {
        if (owner && owner.documents) {
          Object.keys(owner.documents).forEach(key => {
            const doc = owner.documents[key];
            if (doc && (doc.documentType || doc.fileStoreId)) {
              mutationDocs.push({
                documentType: doc.documentType?.code || doc.documentType || `OWNER_${ownerIndex + 1}_${key}`,
                fileStoreId: doc.fileStoreId,
                fileName: doc.fileName || doc.documentType?.code || doc.documentType || `Owner ${ownerIndex + 1} ${key}`
              });
            }
          });
        }
      });
    }
    
    // Add address proof document
    if (addressProof && addressProof.fileStoreId) {
      mutationDocs.push({
        documentType: addressProof.documentType?.code || addressProof.documentType || 'ADDRESS_PROOF',
        fileStoreId: addressProof.fileStoreId,
        fileName: addressProof.fileName || 'Address Proof'
      });
    }
    
    // Add transfer reason proof document
    if (transferReasonProof && transferReasonProof.fileStoreId) {
      const docType = transferReasonProof.documentType?.code;
      mutationDocs.push({
        documentType: docType?.includes('.') ? docType.split(".").pop() : (docType || transferReasonProof.documentType || 'TRANSFER_REASON_PROOF'),
        fileStoreId: transferReasonProof.fileStoreId,
        fileName: transferReasonProof.fileName || 'Transfer Reason Proof'
      });
    }
    
    return mutationDocs;
  };

  const mutationDocuments = getMutationDocuments();

   useEffect(async ()=>{
      if (!property || !additionalDetails) return;
      
      try {
        if (property?.acknowldgementNumber) {
          const res = await Digit.PaymentService.searchBill(tenantId, {Service: "PT.MUTATION", consumerCode: property.acknowldgementNumber});
          if(!res.Bill.length) {
            const res1 = await Digit.PTService.ptCalculateMutation({Property: { ...property, additionalDetails: { ...property?.additionalDetails, ...additionalDetails, documentDate: new Date(additionalDetails?.documentDate).getTime() } }}, tenantId);
            setBillAmount(res1?.[property.acknowldgementNumber]?.totalAmount || t("CS_NA"))
            setBillStatus(t(`PT_MUT_BILL_ACTIVE`))
          } else {
            setBillAmount(res?.Bill[0]?.totalAmount || t("CS_NA"))
            setBillStatus(t(`PT_MUT_BILL_${res?.Bill[0]?.status?.toUpperCase()}`))
          }
        } else {
          // No acknowledgement number, calculate mutation directly
          const res1 = await Digit.PTService.ptCalculateMutation({Property: { ...property, additionalDetails: { ...property?.additionalDetails, ...additionalDetails, documentDate: new Date(additionalDetails?.documentDate).getTime() } }}, tenantId);
          setBillAmount(res1?.totalAmount || t("CS_NA"))
          setBillStatus(t(`PT_MUT_BILL_ACTIVE`))
        }
      } catch (error) {
        setBillAmount(t("CS_NA"))
        setBillStatus(t("CS_NA"))
      }
  },[])

  const typeOfApplication = !isEditProperty && !isUpdateProperty ? `new-application` : `edit-application`;
  let flatplotsize;
  if (isPropertyselfoccupied(selfOccupied?.i18nKey)) {
    flatplotsize = parseInt(landarea?.floorarea);
    if (ispropertyunoccupied(IsAnyPartOfThisFloorUnOccupied?.i18nKey)) {
      flatplotsize = flatplotsize + parseInt(UnOccupiedArea?.UnOccupiedArea);
    }
  } else {
    flatplotsize = parseInt(landarea?.floorarea) + parseInt(Constructiondetails?.RentArea);
    if (!ispropertyunoccupied(IsAnyPartOfThisFloorUnOccupied?.i18nKey)) {
      flatplotsize = flatplotsize + parseInt(UnOccupiedArea?.UnOccupiedArea);
    }
  }
  if (isPropertyIndependent(propertyType)) {
    flatplotsize = parseInt(propertyArea?.builtUpArea) + parseInt(propertyArea?.plotSize);
  }

  const getCardSubHeadrStyles = () => {
    return { fontSize: "24px", fontWeight: "700", lineHeight: "28px", margin: "20px 0px 16px 0px" }
  }

  let documentDate = t("CS_NA");
  if (additionalDetails?.documentDate) {
    const date = new Date(additionalDetails?.documentDate);
    const month = Digit.Utils.date.monthNames[date.getMonth()];
    documentDate = `${date.getDate()} ${month} ${date.getFullYear()}`;
  }
  
  const routeTo = (jumpTo) => location.href=jumpTo;

  const [agree, setAgree] = useState(false);
  const setdeclarationhandler = () => {
    setAgree(!agree);
  };
  
  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline currentStep={4}/> : null}
    <Header styles={{fontSize:"32px", marginLeft: "8px"}}>{t("WS_COMMON_SUMMARY")}</Header>
    <Card style={{paddingRight:"16px"}}>
    <StatusTable>
        <Row className="border-none" label={t("PT_APPLICATION_NUMBER_LABEL")} text={property?.acknowldgementNumber} textStyle={{ whiteSpace: "pre" }} />
        <Row className="border-none" label={t("PT_SEARCHPROPERTY_TABEL_PTUID")} text={property?.propertyId} textStyle={{ whiteSpace: "pre" }} />
        <Row className="border-none" label={t("PT_APPLICATION_CHANNEL_LABEL")} text={t(`ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${property?.channel}`)} />
        <Row className="border-none" label={t("PT_FEE_AMOUNT")} text={billAmount} textStyle={{ whiteSpace: "pre" }} />
        <Row className="border-none" label={t("PT_PAYMENT_STATUS")} text={billStatus} textStyle={{ whiteSpace: "pre" }} />
    </StatusTable>

    <CardSubHeader style={getCardSubHeadrStyles()}>{t("PT_PROPERTY_ADDRESS_SUB_HEADER")}</CardSubHeader>
    <StatusTable>
        <Row className="border-none" label={t("PT_PROPERTY_ADDRESS_PINCODE")} text={property?.address?.pincode || t("CS_NA")} />
        <Row className="border-none" label={t("PT_COMMON_CITY")} text={property?.address?.city || t("CS_NA")} />
        <Row className="border-none" label={t("PT_COMMON_LOCALITY_OR_MOHALLA")} text=/* {`${t(application?.address?.locality?.name)}` || t("CS_NA")} */{t(`${(property?.address?.locality?.area)}`) || t("CS_NA")} />
        <Row className="border-none" label={t("PT_PROPERTY_ADDRESS_STREET_NAME")} text={property?.address?.street || t("CS_NA")} />
        <Row className="border-none" label={t("PT_DOOR_OR_HOUSE")} text={property?.address?.doorNo || t("CS_NA")} />
    </StatusTable>

    <CardSubHeader style={getCardSubHeadrStyles()}>{t("PT_MUTATION_TRANSFEROR_DETAILS")}</CardSubHeader>
      <div>
        {Array.isArray(property?.owners) &&
          property?.owners.map((owner, index) => (
            <div key={index} style={{margin:"none"}}>
                {property?.owners.length != 1 && (
                  <span>
                    {t("PT_OWNER_SUB_HEADER")} - {index + 1}{" "}
                  </span>
                )}
              <StatusTable>
                <Row className="border-none" label={t("PT_COMMON_APPLICANT_NAME_LABEL")} text={owner?.name || t("CS_NA")} />
                <Row className="border-none" label={t("PT_FORM3_GUARDIAN_NAME")} text={owner?.fatherOrHusbandName || t("CS_NA")} />   
                <Row className="border-none" label={t("PT_FORM3_MOBILE_NUMBER")} text={owner?.mobileNumber || t("CS_NA")} />
                <Row className="border-none" label={t("PT_MUTATION_AUTHORISED_EMAIL")} text={owner?.emailId || t("CS_NA")} />
                <Row className="border-none" label={t("PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY")} text={ owner?.ownerType.toLowerCase() || t("CS_NA")} />
                <Row className="border-none" label={t("PT_OWNERSHIP_INFO_CORR_ADDR")} text={owner?.correspondenceAddress || t("CS_NA")} />
              </StatusTable>
            </div>
          ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}> 
        <CardSubHeader style={getCardSubHeadrStyles()}>{t("PT_MUTATION_TRANSFEREE_DETAILS")}</CardSubHeader>
        <LinkButton
          label={<EditIcon/>}
          onClick={() => routeTo(`/digit-ui/citizen/pt/property/property-mutation/owner-ship-details@0`)}
        />
      </div>
      {
        ownershipCategory?.code?.includes("INSTITUTIONAL") ? (
          <div>
            {Array.isArray(owners) &&
              owners.map((transferorInstitution, index) => (
                <div key={index}>
                    {owners.length != 1 && (
                      <span>
                        {t("PT_OWNER_SUB_HEADER")} - {index + 1}{" "}
                      </span>
                    )}
                  <StatusTable>
                    <Row className="border-none" label={t("PT_INSTITUTION_NAME")} text={transferorInstitution?.inistitutionName || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_TYPE_OF_INSTITUTION")} text={`${t(transferorInstitution?.inistitutetype?.value)}` || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_NAME_AUTHORIZED_PERSON")} text={transferorInstitution?.name || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_LANDLINE_NUMBER")} text={transferorInstitution?.altContactNumber || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_FORM3_MOBILE_NUMBER")} text={transferorInstitution?.mobileNumber || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_INSTITUTION_DESIGNATION")} text={transferorInstitution?.designation || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_MUTATION_AUTHORISED_EMAIL")} text={transferorInstitution?.emailId || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_OWNERSHIP_INFO_CORR_ADDR")} text={transferorInstitution?.correspondenceAddress || t("CS_NA")} />
                  </StatusTable>
                </div>
              ))}
          </div>
        ) : (
          <div>
            {Array.isArray(Owners) &&
              Owners.map((owner, index) => (
                <div key={index}>
                    {Owners.length != 1 && (
                      <span>
                        {t("PT_OWNER_SUB_HEADER")} - {index + 1}{" "}
                      </span>
                    )}
                  <StatusTable>
                    <Row className="border-none" label={t("PT_COMMON_APPLICANT_NAME_LABEL")} text={owner?.name || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_COMMON_GENDER_LABEL")} text={t(owner?.gender?.i18nKey) || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_FORM3_MOBILE_NUMBER")} text={owner?.mobileNumber || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_FORM3_GUARDIAN_NAME")} text={owner?.fatherOrHusbandName || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_FORM3_RELATIONSHIP")} text={t(owner?.relationship?.i18nKey) || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_MUTATION_AUTHORISED_EMAIL")}text={owner?.emailId || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_OWNERSHIP_INFO_CORR_ADDR")} text={owner?.correspondenceAddress || t("CS_NA")} />
                    <Row className="border-none" label={t("PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY")} text={t(owner?.ownerType?.i18nKey) || t("CS_NA")} />
                    <Row
                      className="border-none"
                      label={t("PT_FORM3_OWNERSHIP_TYPE")}
                      text={`${property?.ownershipCategoryTemp ? t(`PT_OWNERSHIP_${property?.ownershipCategoryTemp}`) : t("CS_NA")}`}
                    />
                  </StatusTable>
                </div>
            ))}
          </div>
        )
      }
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <CardSubHeader style={getCardSubHeadrStyles()}>{t("PT_MUTATION_DETAILS")}</CardSubHeader>
        <LinkButton
          label={<EditIcon/>}
          onClick={() => routeTo(`/digit-ui/citizen/pt/property/property-mutation/is-mutatation-pending`)}
        />
      </div>
      <div>
        <StatusTable>
          <Row
            className="border-none"
            label={t("PT_MUTATION_PENDING_COURT")}
            text={t(additionalDetails?.isMutationInCourt?.code) || t("CS_NA")}
          />
          <Row className="border-none" label={t("PT_DETAILS_COURT_CASE")} text={additionalDetails?.caseDetails || t("CS_NA")} />
          <Row
            className="border-none"
            label={t("PT_PROP_UNDER_GOV_AQUISITION")}
            text={t(additionalDetails?.isPropertyUnderGovtPossession?.code) || t("CS_NA")}
          />
          <Row className="border-none" label={t("PT_DETAILS_GOV_AQUISITION")} text={additionalDetails?.govtAcquisitionDetails || t("CS_NA")} />
        </StatusTable>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <CardSubHeader style={getCardSubHeadrStyles()}>{t("PT_REGISTRATION_DETAILS")}</CardSubHeader>
        <LinkButton
          label={<EditIcon/>}
          onClick={() => routeTo(`/digit-ui/citizen/pt/property/property-mutation/reason`)}
        />
      </div>
      <StatusTable>
        <Row
          className="border-none"
          label={t("PT_REASON_PROP_TRANSFER")}
          text={`${t(additionalDetails?.reasonForTransfer?.i18nKey)}` || t("CS_NA")}
        />
        <Row className="border-none" label={t("PT_PROP_MARKET_VALUE")} text={additionalDetails?.marketValue || t("CS_NA")} />
        <Row className="border-none" label={t("PT_REG_NUMBER")} text={additionalDetails?.documentNumber || t("CS_NA")} />
        <Row className="border-none" label={t("PT_DOC_ISSUE_DATE")} text={documentDate} />
        <Row className="border-none" label={t("PT_REG_DOC_VALUE")} text={additionalDetails?.documentValue || t("CS_NA")} />
        <Row className="border-none" label={t("PT_REMARKS")} text={additionalDetails?.remarks || t("CS_NA")} />
      </StatusTable>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <CardSubHeader style={getCardSubHeadrStyles()}>{t("PT_COMMON_DOCS")}</CardSubHeader>
        <LinkButton
          label={<EditIcon/>}
          onClick={() => routeTo(`/digit-ui/citizen/pt/property/property-mutation/transfer-reason-doc`)}
        />
      </div>
      <div style={{marginTop:"0 important"}}>
        {mutationDocuments.length > 0 ? (
          <div style={{ marginTop: "19px" }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {mutationDocuments.map((document, index) => {
                let documentLink = `${window.location.origin}/filestore/v1/files/id?fileStoreId=${document?.fileStoreId}&tenantId=${Digit.ULBService.getCurrentTenantId()}`;
                return (
                  <a target="_blank" rel="noopener noreferrer" href={documentLink} style={{ minWidth: "160px", marginRight: "16px", marginBottom: "16px" }} key={index}>
                    <div style={{ width: "85px", height: "100px", background: "#f6f6f6", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="70" viewBox="0 0 20 20" fill="gray">
                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                      </svg>
                    </div>
                    <p style={{ marginTop: "8px", fontSize: "12px", textAlign: "center" }}>
                      {document?.fileName || document?.documentType || 'Document'}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        ) : ( 
          <StatusTable>
            <Row className="border-none" text={t("PT_NO_DOCUMENTS_MSG")} />
          </StatusTable>
        )}
      </div>
      <CheckBox
        label={t("PT_MUTATION_FINAL_DECLARATION_MESSAGE")}
        onChange={setdeclarationhandler}
        styles={{ height: "auto", margin: '2rem 0' }}
      />
      <SubmitBar label={t("PT_COMMON_BUTTON_SUBMIT")} onSubmit={onSubmit} disabled={!agree} />
    </Card>
   </React.Fragment>
  );
};

export default CheckPage;