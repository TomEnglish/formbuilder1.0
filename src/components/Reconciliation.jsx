import React from 'react';
import EditableField from './EditableField';
import './Reconciliation.css';

// Accept data and narrative props
function Reconciliation({ data, narrativeContent, onNarrativeChange }) {

  // Get values from data prop with fallbacks
  const finalValue = data?.valueConclusion ?? "[Final Value]";
  const effectiveDate = data?.effectiveDate ?? data?.appraisalDate ?? "[Effective Date]"; // Use appraisalDate as fallback

  return (
    <div className="reconciliation-section section">
      <h2>Reconciliation and Final Value Conclusion</h2>

      <h3>Reconciliation Narrative</h3>
      <EditableField
        initialContent={narrativeContent ?? '<p>[Enter reconciliation narrative here. Discuss the approaches considered, the weight given to each, and the rationale for the final value conclusion.]</p>'}
        onChange={onNarrativeChange}
      />

      <h3>Final Conclusion</h3>
      <div className="final-value-display">
        <p>
          <strong>Final Opinion of Value:</strong>
          <span className="value-emphasis">{finalValue}</span>
        </p>
        <p>
          <strong>As of Effective Date:</strong>
          <span className="date-emphasis">{effectiveDate}</span>
        </p>
      </div>
    </div>
  );
}

export default Reconciliation;