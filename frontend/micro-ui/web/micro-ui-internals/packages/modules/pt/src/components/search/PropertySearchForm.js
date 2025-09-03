import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SearchPTID = ({ 
  tenantId, 
  t = (text) => text, 
  PTSearchFields = {}, 
  searchBy = "propertyId", 
  setSearchBy = () => {}, 
  onReset = () => {}, 
  onSubmit = (data) => console.log("Submitted Data:", data), 
  payload = {} 
}) => {
  const getFinancialYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  };

  const { 
    register, 
    handleSubmit, 
    watch, 
    reset, 
    formState: { errors }, 
    setValue,
    getValues 
  } = useForm({
    defaultValues: {
      assessmentYear: getFinancialYear(),
      propertyIds: payload.propertyIds || '',
      oldPropertyId: payload.oldPropertyId || '',
      houseNo: payload.houseNo || '',
      colony: payload.colony || '',
      ward: payload.ward || '',
      zone: payload.zone || '',
      email: payload.email || '',
      address: payload.address || '',
      mobileNumber: payload.mobileNumber || '',
      ownerEnglish: payload.ownerEnglish || '',
    },
    mode: 'onChange'
  });

  const [submittedData, setSubmittedData] = useState(null);
  
  // Watch all form values
  const formValue = watch();

  // Set assessment year on mount
  useEffect(() => {
    setValue("assessmentYear", getFinancialYear());
  }, []);

  const onFormSubmit = (data) => {
    console.log("=== FORM SUBMISSION ===");
    console.log("Form submitted with data:", data);
    console.log("======================");
    setSubmittedData(data);
    onSubmit(data);
  };

  const handleReset = () => {
    const resetValues = {
      assessmentYear: getFinancialYear(),
      propertyIds: '',
      oldPropertyId: '',
      houseNo: '',
      colony: '',
      ward: '',
      zone: '',
      email: '',
      address: '',
      mobileNumber: '',
      ownerEnglish: ''
    };
    reset(resetValues);
    setSubmittedData(null);
    console.log("Form reset");
    onReset();
  };

  // Log form values when they change
  useEffect(() => {
    console.log("Current form values:", formValue);
  }, [formValue]);

  return (
    <div style={{padding: "20px 0" }}>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        .search-container {
          // max-width: 1400px;
          // margin: 0 auto;
          // background-color: #000;
        }
        
        .page-content-wrapper {
          background: white;
           border-top-left-radius: 8px;
  border-top-right-radius: 8px;
          // border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 20px;
        }
        
        @media (max-width: 639px) {
          .page-content-wrapper {
            padding: 20px;
          }
        }
        
        .header-section {
          margin-bottom: 30px;
        }
        
        .main-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #6b133f;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
        }
        
        .assessment-section {
          margin-bottom: 30px;
        }
        
        .assessment-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        @media (min-width: 640px) {
          .assessment-grid {
            grid-template-columns: 300px;
          }
        }
        
        .section-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #6b133f;
          margin: 30px 0 20px 0;
          padding: 10px;
          background: #f8f8f8;
          border-left: 4px solid #6b133f;
        }
        
        .form-grid {
          display: grid;
          gap: 24px;
          width: 100%;
        }
        
        @media (min-width: 1024px) {
          .form-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        
        @media (min-width: 640px) and (max-width: 1023px) {
          .form-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        @media (max-width: 639px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .form-field {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .form-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #282828;
          margin-bottom: 8px;
          display: block;
        }
        
        .form-input {
          width: 100%;
          height: 44px;
          padding: 0 12px;
          border: 1px solid #d6d5d4;
          border-radius: 6px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
          background:rgb(241, 241, 241);        }
        
        .form-input:focus {
          outline: none;
          border-color: #6b133f;
          box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
        }
        
        .form-input::placeholder {
          color: #999;
        }
        
        .form-input:disabled {
          background:rgb(212, 212, 212);
          cursor: not-allowed;
        }
        
        .mobile-input-wrapper {
          display: flex;
          width: 100%;
        }
        
        .mobile-prefix {
          display: flex;
          align-items: center;
          padding: 0 12px;
          background: #f0f0f0;
          border: 1px solid #d6d5d4;
          border-right: none;
          border-radius: 6px 0 0 6px;
          font-size: 14px;
          color: #666;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
        
        .mobile-input {
          flex: 1;
          border-radius: 0 6px 6px 0 !important;
          min-width: 0;
        }
        
        .button-container {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 10%;
        }

          @media (max-width: 1232px) {
          .button-container {
             display: flex;
             justify-content: flex-end;
             gap: 16px;
             padding-top: 10%;
          }
        }
        
        @media (max-width: 639px) {
          .button-container {
            flex-direction: column-reverse;
          }
          
          .button-container button {
            width: 100%;
          }
        }
        
        .btn-clear {
          min-width: 140px;
          height: 44px;
          padding: 0 24px;
          border-radius: 15px;
          color: #fff;
          background: #6b133f;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-clear:hover {
          background: #6b133f;
          transform: translateY(-1px);
        }
        
        .btn-search {
          min-width: 140px;
          height: 44px;
          padding: 0 24px;
          border-radius: 15px;
          border: none;
          color: white;
          background: #6b133f;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-search:hover {
          background: #6b133f;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3);
        }
        
        .error-message {
          color: #d00000;
          font-size: 12px;
          margin-top: 4px;
          font-family: 'Poppins', sans-serif;
        }
        
        .submitted-data-section {
          margin-top: 30px;
          padding: 20px;
          background: #f0f8ff;
          border: 1px solid #6b133f;
          border-radius: 8px;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .submitted-data-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #6b133f;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .submitted-data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .submitted-data-item {
          padding: 10px;
          background: white;
          border-radius: 6px;
          border-left: 3px solid #6b133f;
        }
        
        .submitted-data-label {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        
        .submitted-data-value {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: #282828;
          font-weight: 500;
        }
        
        .submitted-data-empty {
          color: #999;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .main-title {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 14px;
          }
          
          .submitted-data-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="search-container">
        <div className="page-content-wrapper">
          <div className="header-section">
            <h1 className="main-title">Cash Desk</h1>
          </div>
                           
          <div>
            <div className="form-grid">
            <div className="form-field">
                <label className="form-label">Assessment Year</label>
                <input
                  className="form-input"
                  type="text"
                  value={formValue.assessmentYear || getFinancialYear()}
                  disabled
                  {...register("assessmentYear")}
                />
              </div>

              {/* Property ID */}
              <div className="form-field">
                <label className="form-label">Property ID</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter property ID"
                  {...register("propertyIds")}
                  onChange={(e) => {
                    setValue("propertyIds", e.target.value);
                  }}
                />
              </div>
              
              {/* Old Property ID */}
              <div className="form-field">
                <label className="form-label">Old Property ID</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter old property ID"
                  {...register("oldPropertyId")}
                  onChange={(e) => {
                    setValue("oldPropertyId", e.target.value);
                  }}
                />
              </div>
              
              {/* House Number */}
              <div className="form-field">
                <label className="form-label">Door/House Number</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter house number"
                  {...register("houseNo")}
                  onChange={(e) => {
                    setValue("houseNo", e.target.value);
                  }}
                />
              </div>
              
              {/* Colony */}
              <div className="form-field">
                <label className="form-label">Colony</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter colony"
                  {...register("colony")}
                  onChange={(e) => {
                    setValue("colony", e.target.value);
                  }}
                />
              </div>
              
              {/* Ward */}
              <div className="form-field">
                <label className="form-label">Ward</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter ward"
                  {...register("ward")}
                  onChange={(e) => {
                    setValue("ward", e.target.value);
                  }}
                />
              </div>
              
              {/* Zone */}
              <div className="form-field">
                <label className="form-label">Zone</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter zone"
                  {...register("zone")}
                  onChange={(e) => {
                    setValue("zone", e.target.value);
                  }}
                />
              </div>
              
              {/* Email ID */}
              <div className="form-field">
                <label className="form-label">Email ID</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter email address"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  onChange={(e) => {
                    setValue("email", e.target.value);
                  }}
                />
                {errors?.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>           
              
              {/* Mobile Number */}
              <div className="form-field">
                <label className="form-label">Mobile Number</label>
                <div className="mobile-input-wrapper">
                  <span className="mobile-prefix">+91</span>
                  <input
                    className="form-input mobile-input"
                    type="tel"
                    maxLength="10"
                    placeholder="Enter mobile number"
                    {...register("mobileNumber", {
                      pattern: {
                        value: /^[6-9][0-9]{9}$/,
                        message: "Invalid mobile number"
                      }
                    })}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setValue("mobileNumber", value);
                      e.target.value = value;
                    }}
                  />
                </div>
                {errors?.mobileNumber && (
                  <span className="error-message">{errors.mobileNumber.message}</span>
                )}
              </div>
              
              {/* Owner Name English */}
              <div className="form-field">
                <label className="form-label">Owner Name (English)</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter owner name"
                  {...register("ownerEnglish")}
                  onChange={(e) => {
                    setValue("ownerEnglish", e.target.value);
                  }}
                />
              </div>         
            </div>

               {/* Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="btn-clear"
                onClick={handleReset}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn-search"
                onClick={() => {
                  console.log("Search button clicked");
                  handleSubmit(onFormSubmit)();
                }}
              >
                Find
              </button>
            </div>
          </div>
          
          {/* Display submitted data */}
          {submittedData && (
            <div className="submitted-data-section">
              <div className="submitted-data-title">
                ✅ Search Submitted with Following Data:
              </div>
              <div className="submitted-data-grid">
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Assessment Year</div>
                  <div className="submitted-data-value">
                    {submittedData.assessmentYear || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Property ID</div>
                  <div className="submitted-data-value">
                    {submittedData.propertyIds || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Old Property ID</div>
                  <div className="submitted-data-value">
                    {submittedData.oldPropertyId || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">House Number</div>
                  <div className="submitted-data-value">
                    {submittedData.houseNo || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Colony</div>
                  <div className="submitted-data-value">
                    {submittedData.colony || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Ward</div>
                  <div className="submitted-data-value">
                    {submittedData.ward || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Zone</div>
                  <div className="submitted-data-value">
                    {submittedData.zone || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Email ID</div>
                  <div className="submitted-data-value">
                    {submittedData.email || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Address</div>
                  <div className="submitted-data-value">
                    {submittedData.address || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Mobile Number</div>
                  <div className="submitted-data-value">
                    {submittedData.mobileNumber ? `+91 ${submittedData.mobileNumber}` : <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
                <div className="submitted-data-item">
                  <div className="submitted-data-label">Owner Name English</div>
                  <div className="submitted-data-value">
                    {submittedData.ownerEnglish || <span className="submitted-data-empty">Not provided</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPTID;
























// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";

// const SearchPTID = ({ 
//   tenantId, 
//   t = (text) => text, 
//   PTSearchFields = {}, 
//   searchBy = "propertyId", 
//   setSearchBy = () => {}, 
//   onReset = () => {}, 
//   onSubmit = (data) => console.log("Submitted Data:", data), 
//   payload = {} 
// }) => {
//   const getFinancialYear = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
//   };

//   const { 
//     register, 
//     handleSubmit, 
//     watch, 
//     reset, 
//     formState: { errors }, 
//     setValue,
//     getValues 
//   } = useForm({
//     defaultValues: {
//       assessmentYear: getFinancialYear(),
//       propertyIds: payload.propertyIds || '',
//       oldPropertyId: payload.oldPropertyId || '',
//       houseNo: payload.houseNo || '',
//       colony: payload.colony || '',
//       ward: payload.ward || '',
//       zone: payload.zone || '',
//       email: payload.email || '',
//       address: payload.address || '',
//       mobileNumber: payload.mobileNumber || '',
//       ownerEnglish: payload.ownerEnglish || '',
//     },
//     mode: 'onChange'
//   });

//   const [submittedData, setSubmittedData] = useState(null);
  
//   // Watch all form values
//   const formValue = watch();

//   // Set assessment year on mount
//   useEffect(() => {
//     setValue("assessmentYear", getFinancialYear());
//   }, []);

//   const onFormSubmit = (data) => {
//     console.log("=== FORM SUBMISSION ===");
//     console.log("Form submitted with data:", data);
//     console.log("======================");
//     setSubmittedData(data);
//     onSubmit(data);
//   };

//   const handleReset = () => {
//     const resetValues = {
//       assessmentYear: getFinancialYear(),
//       propertyIds: '',
//       oldPropertyId: '',
//       houseNo: '',
//       colony: '',
//       ward: '',
//       zone: '',
//       email: '',
//       address: '',
//       mobileNumber: '',
//       ownerEnglish: ''
//     };
//     reset(resetValues);
//     setSubmittedData(null);
//     console.log("Form reset");
//     onReset();
//   };

//   // Log form values when they change
//   useEffect(() => {
//     console.log("Current form values:", formValue);
//   }, [formValue]);

//   return (
//     <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "20px 0" }}>
//       <style>{`
//         * {
//           box-sizing: border-box;
//         }
        
//         .search-container {
//           max-width: 1400px;
//           margin: 0 auto;
//         }
        
//         .page-content-wrapper {
//           background: white;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//           padding: 20px;
//         }
        
//         @media (max-width: 639px) {
//           .page-content-wrapper {
//             padding: 20px;
//           }
//         }
        
//         .header-section {
//           margin-bottom: 30px;
//         }
        
//         .main-title {
//           font-family: 'Poppins', sans-serif;
//           font-weight: 600;
//           font-size: 20px;
//           color: #6b133f;
//           margin: 0 0 20px 0;
//           padding-bottom: 10px;
//           border-bottom: 2px solid #6b133f;
//         }
        
//         .assessment-section {
//           margin-bottom: 30px;
//         }
        
//         .assessment-grid {
//           display: grid;
//           gap: 20px;
//           margin-bottom: 30px;
//         }
        
//         @media (min-width: 640px) {
//           .assessment-grid {
//             grid-template-columns: 300px;
//           }
//         }
        
//         .section-title {
//           font-family: 'Poppins', sans-serif;
//           font-weight: 500;
//           font-size: 16px;
//           color: #6b133f;
//           margin: 30px 0 20px 0;
//           padding: 10px;
//           background: #f8f8f8;
//           border-left: 4px solid #6b133f;
//         }
        
//         .form-grid {
//           display: grid;
//           gap: 24px;
//           margin-bottom: 32px;
//           width: 100%;
//         }
        
//         @media (min-width: 1024px) {
//           .form-grid {
//             grid-template-columns: repeat(3, minmax(0, 1fr));
//           }
//         }
        
//         @media (min-width: 640px) and (max-width: 1023px) {
//           .form-grid {
//             grid-template-columns: repeat(2, minmax(0, 1fr));
//           }
//         }
        
//         @media (max-width: 639px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }
//         }
        
//         .form-field {
//           display: flex;
//           flex-direction: column;
//           width: 100%;
//         }
        
//         .form-label {
//           font-family: 'Poppins', sans-serif;
//           font-weight: 400;
//           font-size: 14px;
//           color: #282828;
//           margin-bottom: 8px;
//           display: block;
//         }
        
//         .form-input {
//           width: 100%;
//           height: 44px;
//           padding: 0 12px;
//           border: 1px solid #d6d5d4;
//           border-radius: 6px;
//           font-size: 14px;
//           font-family: 'Poppins', sans-serif;
//           transition: all 0.3s ease;
//           background: white;
//         }
        
//         .form-input:focus {
//           outline: none;
//           border-color: #6b133f;
//           box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
//         }
        
//         .form-input::placeholder {
//           color: #999;
//         }
        
//         .form-input:disabled {
//           background: #f5f5f5;
//           cursor: not-allowed;
//         }
        
//         .mobile-input-wrapper {
//           display: flex;
//           width: 100%;
//         }
        
//         .mobile-prefix {
//           display: flex;
//           align-items: center;
//           padding: 0 12px;
//           background: #f0f0f0;
//           border: 1px solid #d6d5d4;
//           border-right: none;
//           border-radius: 6px 0 0 6px;
//           font-size: 14px;
//           color: #666;
//           white-space: nowrap;
//           font-family: 'Poppins', sans-serif;
//         }
        
//         .mobile-input {
//           flex: 1;
//           border-radius: 0 6px 6px 0 !important;
//           min-width: 0;
//         }
        
//         .button-container {
//           display: flex;
//           justify-content: flex-end;
//           gap: 16px;
//           margin-top: 40px;
//           padding-top: 20px;
//           border-top: 1px solid #e0e0e0;
//         }
        
//         @media (max-width: 639px) {
//           .button-container {
//             flex-direction: column-reverse;
//           }
          
//           .button-container button {
//             width: 100%;
//           }
//         }
        
//         .btn-clear {
//           min-width: 140px;
//           height: 44px;
//           padding: 0 24px;
//           border-radius: 6px;
//           border: 2px solid #FF4C51;
//           color: #FF4C51;
//           background: white;
//           font-size: 15px;
//           font-weight: 500;
//           font-family: 'Poppins', sans-serif;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
        
//         .btn-clear:hover {
//           background: #fff5f5;
//           transform: translateY(-1px);
//         }
        
//         .btn-search {
//           min-width: 140px;
//           height: 44px;
//           padding: 0 24px;
//           border-radius: 6px;
//           border: none;
//           color: white;
//           background: #6b133f;
//           font-size: 15px;
//           font-weight: 500;
//           font-family: 'Poppins', sans-serif;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
        
//         .btn-search:hover {
//           background: #551030;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3);
//         }
        
//         .error-message {
//           color: #d00000;
//           font-size: 12px;
//           margin-top: 4px;
//           font-family: 'Poppins', sans-serif;
//         }
        
//         .submitted-data-section {
//           margin-top: 30px;
//           padding: 20px;
//           background: #f0f8ff;
//           border: 1px solid #6b133f;
//           border-radius: 8px;
//           animation: slideIn 0.3s ease-out;
//         }
        
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .submitted-data-title {
//           font-family: 'Poppins', sans-serif;
//           font-weight: 600;
//           font-size: 16px;
//           color: #6b133f;
//           margin-bottom: 15px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .submitted-data-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 15px;
//         }
        
//         .submitted-data-item {
//           padding: 10px;
//           background: white;
//           border-radius: 6px;
//           border-left: 3px solid #6b133f;
//         }
        
//         .submitted-data-label {
//           font-family: 'Poppins', sans-serif;
//           font-size: 12px;
//           color: #666;
//           margin-bottom: 4px;
//         }
        
//         .submitted-data-value {
//           font-family: 'Poppins', sans-serif;
//           font-size: 14px;
//           color: #282828;
//           font-weight: 500;
//         }
        
//         .submitted-data-empty {
//           color: #999;
//           font-style: italic;
//         }
        
//         @media (max-width: 768px) {
//           .main-title {
//             font-size: 18px;
//           }
          
//           .section-title {
//             font-size: 14px;
//           }
          
//           .submitted-data-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
      
//       <div className="search-container">
//         <div className="page-content-wrapper">
//           <div className="header-section">
//             <h1 className="main-title">Cash Desk</h1>
//           </div>
          
//           <div className="assessment-section">
//             <div className="assessment-grid">
//               <div className="form-field">
//                 <label className="form-label">Assessment Year</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   value={formValue.assessmentYear || getFinancialYear()}
//                   disabled
//                   {...register("assessmentYear")}
//                 />
//               </div>
//             </div>
//           </div>
          
//           <h2 className="section-title">Search Criteria</h2>
          
//           <div>
//             <div className="form-grid">
//               {/* Property ID */}
//               <div className="form-field">
//                 <label className="form-label">Property ID</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter property ID"
//                   {...register("propertyIds")}
//                   onChange={(e) => {
//                     setValue("propertyIds", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* Old Property ID */}
//               <div className="form-field">
//                 <label className="form-label">Old Property ID</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter old property ID"
//                   {...register("oldPropertyId")}
//                   onChange={(e) => {
//                     setValue("oldPropertyId", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* House Number */}
//               <div className="form-field">
//                 <label className="form-label">House Number</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter house number"
//                   {...register("houseNo")}
//                   onChange={(e) => {
//                     setValue("houseNo", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* Colony */}
//               <div className="form-field">
//                 <label className="form-label">Colony</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter colony"
//                   {...register("colony")}
//                   onChange={(e) => {
//                     setValue("colony", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* Ward */}
//               <div className="form-field">
//                 <label className="form-label">Ward</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter ward"
//                   {...register("ward")}
//                   onChange={(e) => {
//                     setValue("ward", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* Zone */}
//               <div className="form-field">
//                 <label className="form-label">Zone</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter zone"
//                   {...register("zone")}
//                   onChange={(e) => {
//                     setValue("zone", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* Email ID */}
//               <div className="form-field">
//                 <label className="form-label">Email ID</label>
//                 <input
//                   className="form-input"
//                   type="email"
//                   placeholder="Enter email address"
//                   {...register("email", {
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address"
//                     }
//                   })}
//                   onChange={(e) => {
//                     setValue("email", e.target.value);
//                   }}
//                 />
//                 {errors?.email && (
//                   <span className="error-message">{errors.email.message}</span>
//                 )}
//               </div>
              
//               {/* Address */}
//               <div className="form-field">
//                 <label className="form-label">Address</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter address"
//                   {...register("address")}
//                   onChange={(e) => {
//                     setValue("address", e.target.value);
//                   }}
//                 />
//               </div>
              
//               {/* Mobile Number */}
//               <div className="form-field">
//                 <label className="form-label">Mobile Number</label>
//                 <div className="mobile-input-wrapper">
//                   <span className="mobile-prefix">+91</span>
//                   <input
//                     className="form-input mobile-input"
//                     type="tel"
//                     maxLength="10"
//                     placeholder="Enter mobile number"
//                     {...register("mobileNumber", {
//                       pattern: {
//                         value: /^[6-9][0-9]{9}$/,
//                         message: "Invalid mobile number"
//                       }
//                     })}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '').slice(0, 10);
//                       setValue("mobileNumber", value);
//                       e.target.value = value;
//                     }}
//                   />
//                 </div>
//                 {errors?.mobileNumber && (
//                   <span className="error-message">{errors.mobileNumber.message}</span>
//                 )}
//               </div>
              
//               {/* Owner Name English */}
//               <div className="form-field">
//                 <label className="form-label">Owner Name English</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Enter owner name"
//                   {...register("ownerEnglish")}
//                   onChange={(e) => {
//                     setValue("ownerEnglish", e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
            
//             {/* Buttons */}
//             <div className="button-container">
//               <button 
//                 type="button" 
//                 className="btn-clear"
//                 onClick={handleReset}
//               >
//                 Clear
//               </button>
//               <button 
//                 type="button"
//                 className="btn-search"
//                 onClick={() => {
//                   console.log("Search button clicked");
//                   handleSubmit(onFormSubmit)();
//                 }}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
          
//           {/* Display submitted data */}
//           {submittedData && (
//             <div className="submitted-data-section">
//               <div className="submitted-data-title">
//                 ✅ Search Submitted with Following Data:
//               </div>
//               <div className="submitted-data-grid">
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Assessment Year</div>
//                   <div className="submitted-data-value">
//                     {submittedData.assessmentYear || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Property ID</div>
//                   <div className="submitted-data-value">
//                     {submittedData.propertyIds || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Old Property ID</div>
//                   <div className="submitted-data-value">
//                     {submittedData.oldPropertyId || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">House Number</div>
//                   <div className="submitted-data-value">
//                     {submittedData.houseNo || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Colony</div>
//                   <div className="submitted-data-value">
//                     {submittedData.colony || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Ward</div>
//                   <div className="submitted-data-value">
//                     {submittedData.ward || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Zone</div>
//                   <div className="submitted-data-value">
//                     {submittedData.zone || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Email ID</div>
//                   <div className="submitted-data-value">
//                     {submittedData.email || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Address</div>
//                   <div className="submitted-data-value">
//                     {submittedData.address || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Mobile Number</div>
//                   <div className="submitted-data-value">
//                     {submittedData.mobileNumber ? `+91 ${submittedData.mobileNumber}` : <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//                 <div className="submitted-data-item">
//                   <div className="submitted-data-label">Owner Name English</div>
//                   <div className="submitted-data-value">
//                     {submittedData.ownerEnglish || <span className="submitted-data-empty">Not provided</span>}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPTID;