
import { CardLabel, CardLabelError, Dropdown, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const PTSelectAssessmentYear = ({
    t,
    config,
    onSelect,
    userType,
    formData,
    setError,
    clearErrors,
    formState,
    value,
}) => {
    const { pathname } = useLocation();
    const presentInModifyApplication = pathname.includes("modify");

    let isEditProperty = formData?.isEditProperty || false;
    if (presentInModifyApplication) isEditProperty = true;
    if (formData?.isUpdateProperty) isEditProperty = true;

    // Static list of assessment years — replace with your data source if needed
    const assessmentYears = [
        { code: "2024-25", name: "2024-25" },
        { code: "2023-24", name: "2023-24" },
        { code: "2022-23", name: "2022-23" },
    ];

    // State controlled by prop value first, fallback to formData if no value
    const [selectedAssessmentYear, setSelectedAssessmentYear] = useState(
        value || formData?.address?.assessmentYear || null
    );

    // react-hook-form setup
    const {
        control,
        formState: localFormState,
        watch,
        setError: setLocalError,
        clearErrors: clearLocalErrors,
        setValue,
    } = useForm();

    const formValue = watch();
    const { errors } = localFormState;
    const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };

    // Sync local state with incoming value prop changes
    useEffect(() => {
        if (value !== selectedAssessmentYear) {
            setSelectedAssessmentYear(value);
        }
    }, [value]);

    // Sync form value with parent form data and validation for employee userType
    useEffect(() => {
        if (userType === "employee") {
            let keys = Object.keys(formValue);
            const part = {};
            keys.forEach((key) => (part[key] = formData[config.key]?.[key]));
            if (!_.isEqual(formValue, part)) onSelect(config.key, { ...formData[config.key], ...formValue });
            for (let key in formValue) {
                if (!formValue[key] && !localFormState?.errors[key]) {
                    setLocalError(key, { type: `${key.toUpperCase()}_REQUIRED`, message: t(`CORE_COMMON_REQUIRED_ERRMSG`) });
                } else if (formValue[key] && localFormState.errors[key]) {
                    clearLocalErrors([key]);
                }
            }
        }
    }, [formValue]);

    // Sync local errors with parent form errors
    useEffect(() => {
        if (userType === "employee") {
            const errorsPresent = !!Object.keys(localFormState.errors).length;
            if (errorsPresent && !formState.errors?.[config.key]) setError(config.key, { type: "required" });
            else if (!errorsPresent && formState.errors?.[config.key]) clearErrors(config.key);
        }
    }, [localFormState]);

    if (userType === "employee") {
        return (
            <div style={{ marginLeft: "20px" }}>
                <CardLabel style={{ marginBottom: "20px" }}>
                    {t("Select Assessment Year") + " *"}
                </CardLabel>

                <Controller
                    name={"assessmentYear"}
                    defaultValue={selectedAssessmentYear}
                    control={control}
                    render={(props) => (
                        <Dropdown
                            className="" //form-field
                            selected={selectedAssessmentYear}
                            disable={isEditProperty}
                            option={assessmentYears}
                            select={(e) => {
                                props.onChange(e);
                                setSelectedAssessmentYear(e);
                            }}
                            optionKey="code"
                            onBlur={props.onBlur}
                            t={t}
                            style={{
                                width: "300px",
                                borderRadius: "5px",
                                border: "1px solid #D9D9D9",
                            }}
                        />
                    )}
                />

                <CardLabelError style={errorStyle}>
                    {localFormState.touched.assessmentYear ? errors?.assessmentYear?.message : ""}
                </CardLabelError>
            </div>

        );
    }

    return null;
};

export default PTSelectAssessmentYear;