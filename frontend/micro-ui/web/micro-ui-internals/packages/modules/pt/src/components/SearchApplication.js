import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import PTinboxTable from "./inboxTable";
const PTSearchApplication = ({ tenantId, isLoading, t = (text) => text, onSubmit, data, count, setShowToast }) => {
    const [formData, setFormData] = useState({
        applicationNo: '',
        propertyId: '',
        mobileNumber: '',
        status: '',
        fromDate: '',
        toDate: ''
    });

    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleReset = () => {
        setFormData({
            applicationNo: '',
            propertyId: '',
            mobileNumber: '',
            status: '',
            fromDate: '',
            toDate: ''
        });
        setSearchResults(null);
        if (setShowToast) setShowToast(null);
    };

    const handleSubmit = async () => {
        // Check if at least one field is filled
        const hasSearchCriteria = Object.values(formData).some(value => value !== '');

        if (!hasSearchCriteria) {
            alert('Please provide at least one search parameter');
            return;
        }

        console.log('Search submitted:', formData);
        setIsSearching(true);

        // Call the actual onSubmit prop that's passed from parent
        if (onSubmit) {
            // Convert formData to match the expected format
            const searchData = {
                acknowledgementIds: formData.applicationNo,
                propertyIds: formData.propertyId,
                mobileNumber: formData.mobileNumber,
                status: formData.status,
                fromDate: formData.fromDate,
                toDate: formData.toDate
            };

            // Call the parent's onSubmit function
            await onSubmit(searchData);
            setIsSearching(false);

            // Store search results if needed
            if (data) {
                setSearchResults(data);
            }
        } else {
            // Fallback for demo purposes
            setTimeout(() => {
                setIsSearching(false);
                // Mock data for demo
                setSearchResults([
                    {
                        applicationNo: "PT/2024/001",
                        uniqueId: "PROP-12345",
                        ownerName: "John Doe",
                        applicationType: "CREATE",
                        status: "Active"
                    }
                ]);
            }, 1000);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Check if we should show the table
    const showTable = !isLoading && (searchResults !== null || (data && data !== ""));

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
            <style>{`
                * {
                    box-sizing: border-box;
                }
                
                .main-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }
                
                .page-content-wrapper {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .search-header {
                    background: #f8f8f8;
                    padding: 16px 20px;
                    border-radius: 6px;
                    margin-bottom: 32px;
                    border-left: 4px solid #6b133f;
                }
                
                .search-header h2 {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 18px;
                    color: #6b133f;
                    margin: 0;
                }
                
                /* Grid Layout with proper width management */
                .search-grid {
                    display: grid;
                    gap: 24px;
                    margin-bottom: 32px;
                    width: 100%;
                }
                
                /* Desktop: 3 columns with equal width */
                @media (min-width: 1024px) {
                    .search-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }
                
                /* Tablet: 2 columns with equal width */
                @media (min-width: 640px) and (max-width: 1023px) {
                    .search-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                
                /* Mobile: 1 column full width */
                @media (max-width: 639px) {
                    .search-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .page-content-wrapper {
                        padding: 20px;
                    }
                }
                
                /* Form field container */
                .form-field {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                
                .form-label {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    color: #282828;
                    margin-bottom: 8px;
                }
                
                /* Input fields with full width */
                .form-input {
                    width: 100%;
                    height: 44px;
                    padding: 0 12px;
                    border: 1px solid #d6d5d4;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    transition: all 0.3s ease;
                    background: white;
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: #6b133f;
                    box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
                }
                
                .form-input::placeholder {
                    color: #999;
                }
                
                /* Mobile number with prefix */
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
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                .mobile-input {
                    flex: 1;
                    border-radius: 0 6px 6px 0 !important;
                    min-width: 0;
                }
                
                /* Select dropdown styling */
                .form-select {
                    width: 100%;
                    height: 44px;
                    padding: 0 12px;
                    border: 1px solid #d6d5d4;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .form-select:focus {
                    outline: none;
                    border-color: #6b133f;
                    box-shadow: 0 0 0 3px rgba(107, 19, 63, 0.1);
                }
                
                /* Date input styling */
                input[type="date"] {
                    width: 100%;
                    height: 44px;
                    padding: 0 12px;
                    border: 1px solid #d6d5d4;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    background: white;
                    cursor: pointer;
                }
                
                input[type="date"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    opacity: 0.6;
                }
                
                input[type="date"]::-webkit-calendar-picker-indicator:hover {
                    opacity: 1;
                }
                
                /* Button container */
                .button-container {
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                    margin-top: 32px;
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
                    border-radius: 6px;
                    border: 2px solid #FF4C51;
                    color: #FF4C51;
                    background: white;
                    font-size: 15px;
                    font-weight: 500;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-clear:hover {
                    background: #fff5f5;
                    transform: translateY(-1px);
                }
                
                .btn-clear:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .btn-search {
                    min-width: 140px;
                    height: 44px;
                    padding: 0 24px;
                    border-radius: 6px;
                    border: none;
                    color: white;
                    background: #6b133f;
                    font-size: 15px;
                    font-weight: 500;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-search:hover {
                    background: #551030;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(107, 19, 63, 0.3);
                }
                
                .btn-search:disabled {
                    background: #999;
                    cursor: not-allowed;
                    transform: none;
                }
                
                /* Results section */
                .results-section {
                    margin-top: 40px;
                    padding-top: 40px;
                    border-top: 1px solid #e0e0e0;
                }
                
                .results-header {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 20px;
                }
                
                .no-results {
                    text-align: center;
                    padding: 40px;
                    color: #666;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                /* Table styling */
                .table-container {
                    overflow-x: auto;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                thead {
                    background: #6b133f;
                    color: white;
                }
                
                th {
                    padding: 14px 16px;
                    text-align: left;
                    font-weight: 500;
                    font-size: 14px;
                    white-space: nowrap;
                }
                
                td {
                    padding: 14px 16px;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 14px;
                    color: #333;
                }
                
                tbody tr:hover {
                    background: #f9f9f9;
                }
                
                tbody tr:last-child td {
                    border-bottom: none;
                }
                
                .link {
                    color: #6b133f;
                    text-decoration: none;
                    font-weight: 500;
                    cursor: pointer;
                }
                
                .link:hover {
                    text-decoration: underline;
                }
                
                @media (max-width: 768px) {
                    .table-container {
                        margin-left: -20px;
                        margin-right: -20px;
                        border-radius: 0;
                    }
                    
                    th, td {
                        padding: 10px 12px;
                        font-size: 13px;
                    }
                }
                
                .loading {
                    text-align: center;
                    padding: 40px;
                    color: #6b133f;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }
                
                .status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                
                .status-active {
                    background: #d4f8d4;
                    color: #0a6e0a;
                }
                
                .status-inactive {
                    background: #ffd4d4;
                    color: #d00000;
                }
                
                .status-inworkflow {
                    background: #fff3cd;
                    color: #856404;
                }
            `}</style>

            <div className="main-container">
                <div className="page-content-wrapper">
                    <div className="search-header">
                        <h2>Search Criteria</h2>
                    </div>

                    <div>
                        <div className="search-grid">
                            {/* Application No */}
                            <div className="form-field">
                                <label className="form-label">Application No.</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={formData.applicationNo}
                                    onChange={(e) => handleInputChange('applicationNo', e.target.value)}
                                    placeholder="Enter application number"
                                />
                            </div>

                            {/* Property ID */}
                            <div className="form-field">
                                <label className="form-label">Property ID</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={formData.propertyId}
                                    onChange={(e) => handleInputChange('propertyId', e.target.value)}
                                    placeholder="Enter property ID"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="form-field">
                                <label className="form-label">Owner Mobile No.</label>
                                <div className="mobile-input-wrapper">
                                    <span className="mobile-prefix">+91</span>
                                    <input
                                        className="form-input mobile-input"
                                        type="tel"
                                        pattern="[6-9][0-9]{9}"
                                        maxLength="10"
                                        value={formData.mobileNumber}
                                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>

                            {/* Application Status */}
                            <div className="form-field">
                                <label className="form-label">Application Status</label>
                                <select
                                    className="form-select"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="INWORKFLOW">In Workflow</option>
                                </select>
                            </div>

                            {/* From Date */}
                            <div className="form-field">
                                <label className="form-label">From Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={formData.fromDate}
                                    onChange={(e) => handleInputChange('fromDate', e.target.value)}
                                />
                            </div>

                            {/* To Date */}
                            <div className="form-field">
                                <label className="form-label">To Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={formData.toDate}
                                    onChange={(e) => handleInputChange('toDate', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="button-container">
                            <button
                                type="button"
                                className="btn-clear"
                                onClick={handleReset}
                                disabled={isSearching}
                            >
                                CLEAR ALL
                            </button>
                            <button
                                type="button"
                                className="btn-search"
                                disabled={isSearching}
                                onClick={handleSubmit}
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                    {/* Results Section - Shows existing data or search results */}
                    {showTable ?  (
                        <div className="results-section">
                            <h3 className="results-header">
                                Search Results
                                {(searchResults || data) && (searchResults || data).length > 0 &&
                                    ` (${(searchResults || data).length} found)`}
                            </h3>
                            <div className="table-container" style={{ overflowX: "auto" }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Application No</th>
                                            <th>Unique ID</th>
                                            <th>Owner Name</th>
                                            <th>Application Type</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isSearching ? (
                                            <tr>
                                                <td colSpan="5" className="loading">
                                                    Searching...
                                                </td>
                                            </tr>
                                        ) : searchResults ? (
                                            // Show search results if available
                                            searchResults.length > 0 ? (
                                                searchResults.map((result, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <span className="link">
                                                                <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${result.propertyId}`}>
                                                                    {result.acknowldgementNumber || result.applicationNo}
                                                                </Link>
                                                                {/* {item.acknowldgementNumber || item.applicationNo} */}
                                                            </span>
                                                        </td>
                                                        <td>{result.propertyId || result.uniqueId}</td>
                                                        <td>
                                                            {result.owners ?
                                                                result.owners.map(o => o.name).join(", ") :
                                                                result.ownerName}
                                                        </td>
                                                        <td>{result.creationReason || result.applicationType}</td>
                                                        <td>
                                                            <span className={`status-badge status-${(result.status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                                                {result.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="no-results">
                                                        No results found for your search criteria.
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            // Show initial data from props
                                            data && data.length > 0 ? (
                                                data.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <span className="link">
                                                                <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${item.propertyId}`}>
                                                                    {item.acknowldgementNumber || item.applicationNo}
                                                                </Link>
                                                                {/* {item.acknowldgementNumber || item.applicationNo} */}
                                                            </span>
                                                        </td>
                                                        <td>{item.propertyId || item.uniqueId}</td>
                                                        <td>
                                                            {item.owners ?
                                                                item.owners.map(o => o.name).join(", ") :
                                                                item.ownerName}
                                                        </td>
                                                        <td>{item.creationReason || item.applicationType}</td>
                                                        <td>
                                                            <span className={`status-badge status-${(item.status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                                                {t(item.status && `WF_PT_${item.status}`) || item.status || "NA"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="no-results">
                                                        No data available. Please search to find applications.
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ): (<PTinboxTable />)}
                </div>
            </div>
        </div >
    );
}

export default PTSearchApplication;



// import React, { useCallback, useMemo, useEffect } from "react"
// import { useForm, Controller } from "react-hook-form";
// import { TextInput, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown, Table, Card, MobileNumber, Loader, CardText, Header } from "@egovernments/digit-ui-react-components";
// import { Link } from "react-router-dom";
// import MobileSearchApplication from "./MobileSearchApplication";

// const PTSearchApplication = ({tenantId, isLoading, t, onSubmit, data, count, setShowToast }) => {
//     const isMobile = window.Digit.Utils.browser.isMobile();
//     const { register, control, handleSubmit, setValue, getValues, reset, formState } = useForm({
//         defaultValues: {
//             offset: 0,
//             limit: !isMobile && 10,
//             sortBy: "commencementDate",
//             sortOrder: "DESC"
//         }
//     })
//     useEffect(() => {
//       register("offset", 0)
//       register("limit", 10)
//       register("sortBy", "commencementDate")
//       register("sortOrder", "DESC")
//     },[register])
//     //need to get from workflow
//     const applicationTypes = [
//         {
//             code: "CREATE",
//             i18nKey: "CREATE"
//         },
//         {
//             code: "UPDATE",
//             i18nKey: "UPDATE"
//         },
//         {
//             code: "MUTATION",
//             i18nKey: "MUTATION"
//         },
//     ]
//     const applicationStatuses = [
//         {
//             code: "ACTIVE",
//             i18nKey: "WF_PT_ACTIVE"
//         },
//         {
//             code: "INACTIVE",
//             i18nKey: "WF_PT_INACTIVE"
//         },
//         {
//             code: "INWORKFLOW",
//             i18nKey: "WF_PT_INWORKFLOW"
//         },
//     ]

//     const getaddress = (address) => {
//         let newaddr = `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
//             address?.landmark ? `${address?.landmark}, ` : ""
//           }${t(address?.locality.code)}, ${t(address?.city)},${t(address?.pincode) ? `${address.pincode}` : " "}`
//         return newaddr;
//     }
//     const GetCell = (value) => <span className="cell-text">{value}</span>;
//     const columns = useMemo( () => ([
//         {
//             Header: t("PT_SEARCHPROPERTY_TABEL_PID"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(row.propertyId || ""),
//         },
//         {
//             Header: t("PT_APPLICATION_NO_LABEL"),
//             accessor: "acknowldgementNumber",
//             disableSortBy: true,
//             Cell: ({ row }) => {
//               return (
//                 <div>
//                   <span className="link">
//                     <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${row.original["propertyId"]}`}>
//                       {row.original["acknowldgementNumber"]}
//                     </Link>
//                   </span>
//                 </div>
//               );
//             },
//           },
//           {
//             Header: t("PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(row.creationReason || ""),
//           },
//           {
//             Header: t("PT_COMMON_TABLE_COL_OWNER_NAME"),
//             accessor: (row) => GetCell(row.owners.map( o => o.name ). join(",") || ""),
//             disableSortBy: true,
//           },
//           {
//             Header: t("ES_SEARCH_PROPERTY_STATUS"),
//             accessor: (row) =>GetCell(t( row?.status &&`WF_PT_${row.status}`|| "NA") ),
//             disableSortBy: true,
//           },
//           {
//             Header: t("PT_ADDRESS_LABEL"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(getaddress(row.address) || ""),
//           },
//       ]), [] )

//     const onSort = useCallback((args) => {
//         if (args.length === 0) return
//         setValue("sortBy", args.id)
//         setValue("sortOrder", args.desc ? "DESC" : "ASC")
//     }, [])

//     function onPageSizeChange(e){
//         setValue("limit",Number(e.target.value))
//         handleSubmit(onSubmit)()
//     }

//     function nextPage () {
//         setValue("offset", getValues("offset") + getValues("limit"))
//         handleSubmit(onSubmit)()
//     }
//     function previousPage () {
//         setValue("offset", getValues("offset") - getValues("limit") )
//         handleSubmit(onSubmit)()
//     }
//     let validation={}

//     return <React.Fragment>
//                 {isMobile ?
//                 <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit, formState, setShowToast }}/>
//                  :
//                 <div>
//                 <Header>{t("PT_SEARCH_PROP_APP")}</Header>
//                 < Card className={"card-search-heading"}>
//                     <span style={{color:"#505A5F"}}>{t("Provide at least one parameter to search for an application")}</span>
//                 </Card>
//                 <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
//                 <SearchField>
//                     <label>{t("PT_APPLICATION_NO_LABEL")}</label>
//                     <TextInput name="acknowledgementIds" inputRef={register({})} />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_SEARCHPROPERTY_TABEL_PID")}</label>
//                     <TextInput name="propertyIds" inputRef={register({})} />
//                 </SearchField>
//                 <SearchField>
//                 <label>{t("PT_OWNER_MOBILE_NO")}</label>
//                 <MobileNumber
//                     name="mobileNumber"
//                     inputRef={register({
//                     minLength: {
//                         value: 10,
//                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                     },
//                     maxLength: {
//                         value: 10,
//                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                     },
//                     pattern: {
//                     value: /[6789][0-9]{9}/,
//                     //type: "tel",
//                     message: t("CORE_COMMON_MOBILE_ERROR"),
//                     },
//                 })}
//                 type="number"
//                 componentInFront={<div className="employee-card-input employee-card-input--front">+91</div>}
//                 //maxlength={10}
//                 />
//                  <CardLabelError>{formState?.errors?.["mobileNumber"]?.message}</CardLabelError>
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE")}</label>
//                     <Controller
//                             control={control}
//                             name="creationReason"
//                             render={(props) => (
//                                 <Dropdown
//                                 selected={props.value}
//                                 select={props.onChange}
//                                 onBlur={props.onBlur}
//                                 option={applicationTypes}
//                                 optionKey="i18nKey"
//                                 t={t}
//                                 disable={false}
//                                 />
//                             )}
//                             />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("ES_SEARCH_PROPERTY_STATUS")}</label>
//                     <Controller
//                             control={control}
//                             name="status"
//                             render={(props) => (
//                                 <Dropdown
//                                 selected={props.value}
//                                 select={props.onChange}
//                                 onBlur={props.onBlur}
//                                 option={applicationStatuses}
//                                 optionKey="i18nKey"
//                                 t={t}
//                                 disable={false}
//                                 />
//                             )}
//                             />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_FROM_DATE")}</label>
//                     <Controller
//                         render={(props) => <DatePicker date={props.value} disabled={false} onChange={props.onChange} />}
//                         name="fromDate"
//                         control={control}
//                         />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_TO_DATE")}</label>
//                     <Controller
//                         render={(props) => <DatePicker date={props.value} disabled={false} onChange={props.onChange} />}
//                         name="toDate"
//                         control={control}
//                         />
//                 </SearchField>
//                 <SearchField className="submit">
//                     <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
//                     <p style={{marginTop:"10px"}}
//                      onClick={() => {
//                         reset({ 
//                             acknowledgementIds: "", 
//                             fromDate: "", 
//                             toDate: "",
//                             propertyIds: "",
//                             mobileNumber:"",
//                             status: "",
//                             creationReason: "",
//                             offset: 0,
//                             limit: 10,
//                             sortBy: "commencementDate",
//                             sortOrder: "DESC"
//                         });
//                         setShowToast(null);
//                         previousPage();
//                     }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
//                 </SearchField>
//             </SearchForm>
//             {!isLoading && data?.display ? <Card style={{ marginTop: 20 }}>
//                 {
//                 t(data.display)
//                     .split("\\n")
//                     .map((text, index) => (
//                     <p key={index} style={{ textAlign: "center" }}>
//                         {text}
//                     </p>
//                     ))
//                 }
//             </Card>
//             :(!isLoading && data !== ""? <Table
//                 t={t}
//                 data={data}
//                 totalRecords={count}
//                 columns={columns}
//                 getCellProps={(cellInfo) => {
//                 return {
//                     style: {
//                     minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
//                     padding: "20px 18px",
//                     fontSize: "16px"
//                   },
//                 };
//                 }}
//                 onPageSizeChange={onPageSizeChange}
//                 currentPage={getValues("offset")/getValues("limit")}
//                 onNextPage={nextPage}
//                 onPrevPage={previousPage}
//                 pageSizeLimit={getValues("limit")}
//                 onSort={onSort}
//                 disableSort={false}
//                 sortParams={[{id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false}]}
//             />: data !== "" || isLoading && <Loader/>)}
//             </div>}
//         </React.Fragment>
// }

// export default PTSearchApplication



// import React, { useCallback, useMemo, useEffect } from "react"
// import { useForm, Controller } from "react-hook-form";
// import { TextInput, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown, Table, Card, MobileNumber, Loader, CardText, Header } from "@egovernments/digit-ui-react-components";
// import { Link } from "react-router-dom";
// import MobileSearchApplication from "./MobileSearchApplication";
// import PTinboxTable from "./inboxTable";

// const PTSearchApplication = ({ tenantId, isLoading, t, onSubmit, data, count, setShowToast }) => {
//     const isMobile = window.Digit.Utils.browser.isMobile();
//     const { register, control, handleSubmit, setValue, getValues, reset, formState } = useForm({
//         defaultValues: {
//             offset: 0,
//             limit: !isMobile && 10,
//             sortBy: "commencementDate",
//             sortOrder: "DESC"
//         }
//     })
//     useEffect(() => {
//         register("offset", 0)
//         register("limit", 10)
//         register("sortBy", "commencementDate")
//         register("sortOrder", "DESC")
//     }, [register])
//     //need to get from workflow
//     const applicationTypes = [
//         {
//             code: "CREATE",
//             i18nKey: "CREATE"
//         },
//         {
//             code: "UPDATE",
//             i18nKey: "UPDATE"
//         },
//         {
//             code: "MUTATION",
//             i18nKey: "MUTATION"
//         },
//     ]
//     const applicationStatuses = [
//         {
//             code: "ACTIVE",
//             i18nKey: "WF_PT_ACTIVE"
//         },
//         {
//             code: "INACTIVE",
//             i18nKey: "WF_PT_INACTIVE"
//         },
//         {
//             code: "INWORKFLOW",
//             i18nKey: "WF_PT_INWORKFLOW"
//         },
//     ]

//     const getaddress = (address) => {
//         let newaddr = `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${address?.landmark ? `${address?.landmark}, ` : ""
//             }${t(address?.locality.code)}, ${t(address?.city)},${t(address?.pincode) ? `${address.pincode}` : " "}`
//         return newaddr;
//     }
//     const GetCell = (value) => <span className="cell-text">{value}</span>;
//     const columns = useMemo(() => ([
//         {
//             Header: t("PT_SEARCHPROPERTY_TABEL_PID"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(row.propertyId || ""),
//         },
//         {
//             Header: t("PT_APPLICATION_NO_LABEL"),
//             accessor: "acknowldgementNumber",
//             disableSortBy: true,
//             Cell: ({ row }) => {
//                 return (
//                     <div>
//                         <span className="link">
//                             <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${row.original["propertyId"]}`}>
//                                 {row.original["acknowldgementNumber"]}
//                             </Link>
//                         </span>
//                     </div>
//                 );
//             },
//         },
//         {
//             Header: t("PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(row.creationReason || ""),
//         },
//         {
//             Header: t("PT_COMMON_TABLE_COL_OWNER_NAME"),
//             accessor: (row) => GetCell(row.owners.map(o => o.name).join(",") || ""),
//             disableSortBy: true,
//         },
//         {
//             Header: t("ES_SEARCH_PROPERTY_STATUS"),
//             accessor: (row) => GetCell(t(row?.status && `WF_PT_${row.status}` || "NA")),
//             disableSortBy: true,
//         },
//         {
//             Header: t("PT_ADDRESS_LABEL"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(getaddress(row.address) || ""),
//         },
//     ]), [])

//     const onSort = useCallback((args) => {
//         if (args.length === 0) return
//         setValue("sortBy", args.id)
//         setValue("sortOrder", args.desc ? "DESC" : "ASC")
//     }, [])

//     function onPageSizeChange(e) {
//         setValue("limit", Number(e.target.value))
//         handleSubmit(onSubmit)()
//     }

//     function nextPage() {
//         setValue("offset", getValues("offset") + getValues("limit"))
//         handleSubmit(onSubmit)()
//     }
//     function previousPage() {
//         setValue("offset", getValues("offset") - getValues("limit"))
//         handleSubmit(onSubmit)()
//     }
//     let validation = {}

//     return <React.Fragment>
//         {isMobile ?
//             <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit, formState, setShowToast }} />
//             :
//             <div style={{background:"white"}}>
//                 {/* <Header>{t("PT_SEARCH_PROP_APP")}</Header> */}

//                 < Card className={"card-search-heading"}>
                
//                     <span style={{
//                         fontFamily: "Poppins",
//                         fontWeight: "bold",
//                         fontSize: "16px",
//                         lineHeight: "42.5px",
//                         letterSpacing: "3%",
//                         verticalAlign: "middle",
//                         color: "#6b133f"
//                     }}>{t("Search Criteria")}</span>
//                 </Card>
//                 <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
//                     <div style={{
//                         width: "100%",
//                         display: "flex", justifyContent: "space-between"
//                     }}>
//                         <SearchField style={widthMx}>
//                             <label style={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 400,
//                                 fontSize: "14px",
//                                 lineHeight: "22px",
//                                 letterSpacing: "0%",
//                                 color: "#282828"
//                             }}>{t("PT_APPLICATION_NO_LABEL")}</label>
//                             <TextInput name="acknowledgementIds" style={{borderRadius:"6px",height:"35px",marginTop:"13px"}} inputRef={register({})} />
//                         </SearchField>
//                         <SearchField style={widthMx}>
//                             <label style={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 400,
//                                 fontSize: "14px",
//                                 lineHeight: "22px",
//                                 letterSpacing: "0%",
//                                 color: "#282828"
//                             }}>{t("PT_SEARCHPROPERTY_TABEL_PID")}</label>
//                             <TextInput name="propertyIds" style={{borderRadius:"6px",height:"35px",marginTop:"13px"}} inputRef={register({})} />
//                         </SearchField>
//                         <SearchField style={widthMx}>
//                             <label style={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 400,
//                                 fontSize: "14px",
//                                 lineHeight: "22px",
//                                 letterSpacing: "0%",
//                                 color: "#282828"
//                             }}>{t("PT_OWNER_MOBILE_NO")}</label>
//                             <MobileNumber
//                             style={{borderRadius:"6px",height:"35px",marginTop:"13px"}}
//                                 name="mobileNumber"
//                                 inputRef={register({
//                                     minLength: {
//                                         value: 10,
//                                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                                     },
//                                     maxLength: {
//                                         value: 10,
//                                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                                     },
//                                     pattern: {
//                                         value: /[6789][0-9]{9}/,
//                                         //type: "tel",
//                                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                                     },
//                                 })}
//                                 type="number"
//                                 componentInFront={<div className="employee-card-input employee-card-input--front">+91</div>}
//                             //maxlength={10}
//                             />
//                             <CardLabelError>{formState?.errors?.["mobileNumber"]?.message}</CardLabelError>
//                         </SearchField>
//                     </div>
//                     <div style={{
//                         width: "100%",
//                         display: "flex", justifyContent: "space-between"
//                     }}>
//                         <SearchField style={widthMx}>
//                             <label style={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 400,
//                                 fontSize: "14px",
//                                 lineHeight: "22px",
//                                 letterSpacing: "0%",
//                                 color: "#282828"
//                             }}>{t("ES_SEARCH_PROPERTY_STATUS")}</label>
//                             <Controller
//                                 control={control}
//                                 name="status"
//                                 render={(props) => (
//                                     <Dropdown
//                                         style={{ border: "1px solid", borderRadius:"6px",height:"35px",marginTop:"13px"}}
//                                         selected={props.value}
//                                         select={props.onChange}
//                                         onBlur={props.onBlur}
//                                         option={applicationStatuses}
//                                         optionKey="i18nKey"
//                                         t={t}
//                                         disable={false}
//                                     />
//                                 )}
//                             />
//                         </SearchField>
//                         <SearchField style={widthMx}>
//                             <label style={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 400,
//                                 fontSize: "14px",
//                                 lineHeight: "22px",
//                                 letterSpacing: "0%",
//                                 color: "#282828"
//                             }}>{t("PT_FROM_DATE")}</label>
//                             <Controller
//                                 render={(props) => <DatePicker style={{marginTop:"13px"}} date={props.value} disabled={false} onChange={props.onChange} />}
//                                 name="fromDate"
//                                 control={control}
//                             />
//                         </SearchField>
//                         <SearchField style={widthMx}>
//                             <label style={{
//                                 fontFamily: "Poppins",
//                                 fontWeight: 400,
//                                 fontSize: "14px",
//                                 lineHeight: "22px",
//                                 letterSpacing: "0%",
//                                 color: "#282828"
//                             }}>{t("PT_TO_DATE")}</label>
//                             <Controller
//                                 render={(props) => <DatePicker style={{marginTop:"13px"}} date={props.value} disabled={false} onChange={props.onChange} />}
//                                 name="toDate"
//                                 control={control}
//                             />
//                         </SearchField>
//                     </div>
//                     <div style={{ display: "flex", width: "100%", justifyContent: "end", alignItems: "center" }}>
//                         {/* <SearchField className="submit" style={{width:"120px"}}> */}
//                         <div>
//                             <button
//                                 style={{
//                                     width: "120px",
//                                     height: "38px",
//                                     marginTop: "1rem",              // Optional vertical spacing
//                                     borderRadius: "4px",
//                                     borderWidth: "1px",
//                                     border: "1px solid #FF4C51",
//                                     color: "#FF4C51",
//                                     backgroundColor: "white",
//                                     fontSize: "16px",
//                                     fontWeight: "500",
//                                     fontFamily: "Poppins, sans-serif",
//                                     cursor: "pointer",
//                                     marginRight: "20px"
//                                 }}
//                                 onClick={() => {
//                                     reset({
//                                         acknowledgementIds: "",
//                                         fromDate: "",
//                                         toDate: "",
//                                         propertyIds: "",
//                                         mobileNumber: "",
//                                         status: "",
//                                         creationReason: "",
//                                         offset: 0,
//                                         limit: 10,
//                                         sortBy: "commencementDate",
//                                         sortOrder: "DESC"
//                                     });
//                                     setShowToast(null);
//                                     previousPage();
//                                 }}
//                             >
//                                 {t(`ES_COMMON_CLEAR_ALL`)}
//                             </button>
//                         </div>
//                         {/* <p style={{ marginTop: "10px" }}
//                                 onClick={() => {
//                                     reset({
//                                         acknowledgementIds: "",
//                                         fromDate: "",
//                                         toDate: "",
//                                         propertyIds: "",
//                                         mobileNumber: "",
//                                         status: "",
//                                         creationReason: "",
//                                         offset: 0,
//                                         limit: 10,
//                                         sortBy: "commencementDate",
//                                         sortOrder: "DESC"
//                                     });
//                                     setShowToast(null);
//                                     previousPage();
//                                 }}>{t(`ES_COMMON_CLEAR_ALL`)}</p> */}
//                         {/* </SearchField> */}
//                         {/* <SearchField className="submit" style={{width:"120px"}}> */}
//                         <div style={{ width: "120px", marginRight: "20px" }}>
//                             <SubmitBar label={t("ES_COMMON_SEARCH")} submit style={{ width: "120px" }} />
//                         </div>
//                         {/* </SearchField> */}

//                     </div>
//                 </SearchForm>
//                 {!isLoading && data?.display ? <Card style={{ marginTop: 20 }}>
//                     {
//                         t(data.display)
//                             .split("\\n")
//                             .map((text, index) => (
//                                 <p key={index} style={{ textAlign: "center" }}>
//                                     {text}
//                                 </p>
//                             ))
//                     }
//                 </Card>
//                     : (!isLoading && data !== "" ? <Table
//                         t={t}
//                         data={data}
//                         totalRecords={count}
//                         columns={columns}
//                         getCellProps={(cellInfo) => {
//                             return {
//                                 style: {
//                                     minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
//                                     padding: "20px 18px",
//                                     fontSize: "16px"
//                                 },
//                             };
//                         }}
//                         onPageSizeChange={onPageSizeChange}
//                         currentPage={getValues("offset") / getValues("limit")}
//                         onNextPage={nextPage}
//                         onPrevPage={previousPage}
//                         pageSizeLimit={getValues("limit")}
//                         onSort={onSort}
//                         disableSort={false}
//                         sortParams={[{ id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false }]}
//                     /> : <PTinboxTable/>)}
//             </div>}
//     </React.Fragment>
// }

// const widthMx ={
//     width:"100%"
// }
// export default PTSearchApplication