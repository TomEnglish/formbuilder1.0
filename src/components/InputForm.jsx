import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext.jsx'; // Import context
// import './InputForm.css'; // Optional CSS import

const InputForm = () => {
  const { reportData, updateReportData } = useContext(ReportContext); // Use context

  return (
    <form className="input-form">
      <h2>Survey Data</h2>
      <div className="form-group">
        <label htmlFor="clientName">Client Name:</label>
        <input
          type="text"
          id="clientName"
          name="clientName" // Name must match state key
          value={reportData.clientName || ''} // Read from context, provide fallback
          onChange={(e) => updateReportData(e.target.name, e.target.value)} // Update context
        />
      </div>
      <div className="form-group">
        <label htmlFor="propertyAddress">Property Address:</label>
        <input
          type="text"
          id="propertyAddress"
          name="propertyAddress"
          value={reportData.propertyAddress || ''} // Read from context, provide fallback
          onChange={(e) => updateReportData(e.target.name, e.target.value)} // Update context
        />
      </div>
      <div className="form-group">
        <label htmlFor="effectiveDate">Effective Date:</label>
        <input
          type="date"
          id="effectiveDate"
          name="effectiveDate"
          value={reportData.effectiveDate || ''} // Read from context, provide fallback
          onChange={(e) => updateReportData(e.target.name, e.target.value)} // Update context
         />
      </div>
      <div className="form-group">
        <label htmlFor="appraiserName">Appraiser Name:</label>
        <input
          type="text"
          id="appraiserName"
          name="appraiserName"
          value={reportData.appraiserName || ''} // Read from context, provide fallback
          onChange={(e) => updateReportData(e.target.name, e.target.value)} // Update context
         />
      </div>
      <div className="form-group">
        <label htmlFor="inspectionDate">Inspection Date:</label>
        <input
          type="date"
          id="inspectionDate"
          name="inspectionDate"
          value={reportData.inspectionDate || ''} // Read from context, provide fallback
          onChange={(e) => updateReportData(e.target.name, e.target.value)} // Update context
        />
      </div>
    </form>
  );
};

export default InputForm;