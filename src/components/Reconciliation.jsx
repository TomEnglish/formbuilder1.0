import React, { useState, useContext, useEffect } from 'react';
import { ReportContext } from '../context/ReportDataContext';
import { ValidationContext } from '../context/ValidationContext';
import EditableField from './EditableField';
import './Reconciliation.css';

// Helper to format currency
const formatCurrency = (value, placeholder = '$0') => {
  const number = parseFloat(value);
  if (isNaN(number)) return placeholder;
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};


function Reconciliation() {
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validateField, validationErrors, clearFieldError } = useContext(ValidationContext);

  // Local state for the final value input
  const [finalValueInput, setFinalValueInput] = useState('');
  const [saveStatus, setSaveStatus] = useState(''); // For save feedback

  // Initialize local state from global context when component mounts or reportData changes
  useEffect(() => {
    setFinalValueInput(reportData.finalValueConclusion || '');
  }, [reportData.finalValueConclusion]);

  // --- Retrieve Indicated Values ---
  const salesCompValue = reportData.salesCompIndicatedValue;
  const costApproachValue = reportData.costApproachIndicatedValue; // Key added previously
  const incomeApproachValue = reportData.incomeApproach?.indicatedValueByIncomeApproach; // Nested key

  // --- Input Change Handler ---
  const handleFinalValueChange = (e) => {
    const value = e.target.value;
    setFinalValueInput(value);
    // Clear validation error on change if desired, or wait for blur/save
    if (validationErrors.finalValueConclusion) {
        clearFieldError('finalValueConclusion');
    }
    setSaveStatus(''); // Clear save status on new change
  };

  // --- Validation on Blur ---
  const handleFinalValueBlur = (e) => {
    const { name, value } = e.target;
     validateField(name, value, { required: true, numerical: true });
  };

  // --- Narrative Change Handler ---
   const handleNarrativeChange = (newContent) => {
    updateReportData('reconciliationContent', newContent);
    // Clear validation error on change if desired, or wait for save
    if (validationErrors.reconciliationContent) {
        clearFieldError('reconciliationContent');
    }
    setSaveStatus(''); // Clear save status on new change
  };


  // --- Save Handler ---
  const handleSave = () => {
    setSaveStatus(''); // Clear previous status

    // Validate fields before saving
    const isFinalValueValid = validateField('finalValueConclusion', finalValueInput, { required: true, numerical: true });
    const isNarrativeValid = validateField('reconciliationContent', reportData.reconciliationContent || '', { required: true, minLength: 50 }); // Example: require min 50 chars

    if (isFinalValueValid && isNarrativeValid) {
      console.log("Saving Final Reconciliation. Value:", finalValueInput);
      updateReportData('finalValueConclusion', finalValueInput);
      setSaveStatus('Final Reconciliation saved successfully!');
      // Optionally clear errors globally if needed, but ValidationContext might handle this
    } else {
      console.error("Validation errors prevent saving Final Reconciliation.");
      setSaveStatus('Please fix validation errors before saving.');
    }
  };

  return (
    <div id="reconciliation" className="reconciliation-section section">
      <h2>Reconciliation and Final Value Conclusion</h2>

      {/* Display Indicated Values */}
      <div className="indicated-values-summary">
        <h3>Summary of Indicated Values</h3>
        <ul>
          <li>Sales Comparison Approach: <strong>{formatCurrency(salesCompValue, 'N/A')}</strong></li>
          <li>Cost Approach: <strong>{formatCurrency(costApproachValue, 'N/A')}</strong></li>
          <li>Income Approach: <strong>{formatCurrency(incomeApproachValue, 'N/A')}</strong></li>
        </ul>
      </div>
      <hr />

      <h3>Reconciliation Narrative</h3>
      <EditableField
        initialContent={reportData.reconciliationContent ?? '<p>[Enter reconciliation narrative here. Discuss the approaches considered, the weight given to each, and the rationale for the final value conclusion.]</p>'}
        onChange={handleNarrativeChange} // Only update context on change
        // Add onBlur validation if EditableField supports it, otherwise rely on save button
        error={validationErrors.reconciliationContent} // Display validation error
      />
       {validationErrors.reconciliationContent && <span className="error-message editor-error">{validationErrors.reconciliationContent}</span>}


      <h3>Final Conclusion</h3>
      <div className="final-value-input-section">
         <label htmlFor="finalValueConclusion">Final Opinion of Value:</label>
         <input
            type="number"
            id="finalValueConclusion"
            name="finalValueConclusion" // Name matches state key and validation key
            value={finalValueInput}
            onChange={handleFinalValueChange}
            onBlur={handleFinalValueBlur} // Validate on blur
            placeholder="Enter Final Value"
            className={validationErrors.finalValueConclusion ? 'invalid' : ''}
          />
          {validationErrors.finalValueConclusion && <span className="error-message">{validationErrors.finalValueConclusion}</span>}
      </div>

       <div className="final-value-display">
         {/* Keep effective date display */}
         <p>
           <strong>As of Effective Date:</strong>
           <span className="date-emphasis">{reportData.effectiveDate || '[Effective Date]'}</span>
         </p>
       </div>

      <button onClick={handleSave} className="save-button">Save Final Reconciliation</button>
      {saveStatus && <p className={`save-status ${saveStatus.includes('error') ? 'error' : 'success'}`}>{saveStatus}</p>}

    </div>
  );
}

export default Reconciliation;