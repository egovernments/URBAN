
import React, { useState, useEffect } from "react";
import { Dropdown, TextInput } from "@egovernments/digit-ui-react-components";

const AddressSection = ({
  t,
  addressDetails,
  handleInputChange,
  handleDropdownChange,
  styles,
  formErrors,
}) => {
  const [boundaryData, setBoundaryData] = useState(null);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [colonies, setColonies] = useState([]);

  // Fetch boundary data and extract zones
  useEffect(() => {
    (async () => {
      try {
        const tenantId = Digit.ULBService.getCurrentTenantId();
        const response = await Digit.LocationService.getRevenueLocalities(tenantId);

        console.log("🔍 Raw TenantBoundary Response:", response?.TenantBoundary);

        const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];
        if (cityBoundary?.children?.length > 0) {
          setBoundaryData(cityBoundary);

          const zoneOptions = cityBoundary.children.map((zone) => ({
            code: zone.code,
            name: zone.name || zone.code,
          }));
          setZones(zoneOptions);
          console.log("✅ Zones Loaded:", zoneOptions);
        } else {
          console.warn("❌ No boundary children found.");
        }
      } catch (error) {
        console.error("❌ Error fetching boundary data:", error);
      }
    })();
  }, []);

  // Update Wards when Zone changes
  useEffect(() => {
    if (addressDetails.zone && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === addressDetails.zone.code);
      const wardList = selectedZone?.children || [];
      const formattedWards = wardList.map((ward) => ({
        code: ward.code,
        name: ward.name || ward.code,
      }));
      setWards(formattedWards);
      console.log("📦 Wards for zone", addressDetails.zone.code, formattedWards);
    } else {
      setWards([]);
    }
  }, [addressDetails.zone, boundaryData]);

  // Update Colonies when Ward changes
  useEffect(() => {
    if (addressDetails.zone && addressDetails.ward && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === addressDetails.zone.code);
      const selectedWard = selectedZone?.children?.find((w) => w.code === addressDetails.ward.code);
      const colonyList = selectedWard?.children || [];
      const formattedColonies = colonyList.map((col) => ({
        code: col.code,
        name: col.name || col.code,
      }));
      setColonies(formattedColonies);
      console.log("🏘 Colonies for ward", addressDetails.ward.code, formattedColonies);
    } else {
      setColonies([]);
    }
  }, [addressDetails.ward, addressDetails.zone, boundaryData]);

  return (
    <div className="form-section" style={styles.formSection}>
      {/* Door/House Number */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Door/House Number")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="doorNo"
          value={addressDetails.doorNo}
          onChange={handleInputChange}
        />
        {formErrors?.doorNo && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.doorNo}</p>}
      </div>

      {/* Address */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Address")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="address"
          value={addressDetails.address}
          onChange={handleInputChange}
        />
        {formErrors?.address && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.address}</p>}
      </div>

      {/* Pincode */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Pincode")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <TextInput
          style={styles.widthInput}
          name="pincode"
          value={addressDetails.pincode}
          onChange={handleInputChange}
        />
        {formErrors?.pincode && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.pincode}</p>}
      </div>

      {/* Zone Dropdown */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Zone")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={zones}
          selected={addressDetails.zone}
          select={(option) => {
            handleDropdownChange("zone", option);
            handleDropdownChange("ward", null);
            handleDropdownChange("colony", null);
            setWards([]);
            setColonies([]);
          }}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.zone && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.zone}</p>}
      </div>

      {/* Ward Dropdown */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Ward")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={wards}
          selected={addressDetails.ward}
          select={(option) => {
            handleDropdownChange("ward", option);
            handleDropdownChange("colony", null);
            setColonies([]);
          }}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.ward && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.ward}</p>}
      </div>

      {/* Colony Dropdown */}
      <div style={styles.flex30}>
        <div style={styles.poppinsLabel}>
          {t("Colony")}<span className="mandatory" style={styles.mandatory}>*</span>
        </div>
        <Dropdown
          style={styles.widthInput}
          t={t}
          option={colonies}
          selected={addressDetails.colony}
          select={(option) => handleDropdownChange("colony", option)}
          optionKey="name"
          placeholder={t("Select")}
        />
        {formErrors?.colony && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.colony}</p>}
      </div>
    </div>
  );
};

export default AddressSection;
