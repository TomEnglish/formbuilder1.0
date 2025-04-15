import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext'; // Import ReportContext
import EditableField from './EditableField';
import './Reconciliation.css';

// Removed props
function Reconciliation() {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);

  // Get values from reportData context with fallbacks
  const finalValue = reportData.reconciliation?.finalValueConclusion ?? "[Final Value]"; // Assuming structure
  const effectiveDate = reportData.effectiveDate ?? "[Effective Date]"; // Get from top level

  return (
    <div id="reconciliation" className="reconciliation-section section">
      <h2>Reconciliation and Final Value Conclusion</h2>

      <h3>Reconciliation Narrative</h3>
      <EditableField
        initialContent={reportData.reconciliationContent ?? '<p>[Enter reconciliation narrative here. Discuss the approaches considered, the weight given to each, and the rationale for the final value conclusion.]</p>'}
        onChange={(newContent) => updateReportData('reconciliationContent', newContent)}
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