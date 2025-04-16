import React, { useContext } from 'react';
import { ReportContext } from '../context/ReportDataContext.jsx';
import { ValidationContext } from '../context/ValidationContext.jsx'; // Import ValidationContext
// import './InputForm.css'; // Optional CSS import

const InputForm = () => {
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validateField, setFieldError, clearFieldError, validationErrors } = useContext(ValidationContext); // Use ValidationContext

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
          value={reportData.effectiveDate || ''}
          onChange={(e) => {
            const { name, value } = e.target;
            const validation = validateField(value, 'date');
            if (!validation.isValid) {
              setFieldError(name, validation.message);
            } else {
              clearFieldError(name);
            }
            updateReportData(name, value); // Update context regardless for immediate feedback
          }}
        />
        {validationErrors.effectiveDate && <div className="error-message">{validationErrors.effectiveDate}</div>}
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
          value={reportData.inspectionDate || ''}
          onChange={(e) => {
            const { name, value } = e.target;
            const validation = validateField(value, 'date');
            if (!validation.isValid) {
              setFieldError(name, validation.message);
            } else {
              clearFieldError(name);
            }
            updateReportData(name, value); // Update context regardless for immediate feedback
          }}
        />
        {validationErrors.inspectionDate && <div className="error-message">{validationErrors.inspectionDate}</div>}
      </div>
    </form>
  );
};

export default InputForm;