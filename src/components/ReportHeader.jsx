import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext.jsx'; // Import ReportContext
import EditableField from './EditableField';
import companyLogo from '../assets/Logo.png'; // Import the logo
import './ReportHeader.css'; // Import CSS for styling

function ReportHeader({ sectionVisibility, onToggleSection }) { // Removed data and onDataChange props

  const { reportData, updateReportData } = useContext(ReportContext); // Use context


  // Define user-friendly names for sections
  const sectionNames = {
    propertySummary: 'Property Summary',
    scopeOfWork: 'Scope of Work',
    siteDescription: 'Site Description',
    improvementsDescription: 'Improvements Description',
    highestAndBestUse: 'Highest & Best Use',
    valuationMethodology: 'Valuation Methodology',
    salesComparisonApproach: 'Sales Comparison Approach',
    costApproach: 'Cost Approach',
    reconciliation: 'Reconciliation',
    incomeApproach: 'Income Approach',
    assumptionsAndLimitingConditions: 'Assumptions & Limiting Conditions',
    certification: 'Certification',
  };

  return (
    <div className="report-header">
      {/* Removed the generic h2 */}
      <div className="company-info">
        <img src={companyLogo} alt="Company Logo" className="report-logo" />
        <div className="company-details">
          <p className="company-name">True Value Appraisals</p>
          <p className="company-tagline">Appraisals - Consulting</p>
        </div>
  
        {/* Section Visibility Controls */}
        <div className="section-visibility-controls no-print"> {/* Add no-print class */}
          <strong>Show/Hide Sections:</strong>
          <div className="checkbox-list">
            {Object.entries(sectionNames).map(([key, name]) => (
              <div key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`vis-${key}`}
                  checked={sectionVisibility[key]}
                  onChange={() => onToggleSection(key)}
                />
                <label htmlFor={`vis-${key}`}>{name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Removed File Input Section */}

      {/* Only show client info if data is loaded */}
        <div className="client-info"> {/* Renamed div for clarity */}
          <div> {/* Keep client editable */}
            <strong>Client:</strong>
            {/* Use reportData from context */}
            <EditableField value={reportData.clientName || ''} onChange={(newContent) => updateReportData('clientName', newContent)} />
          </div>
          <p><strong>Property Address:</strong> {reportData.propertyAddress || 'N/A'}</p>
          <p><strong>Effective Date:</strong> {reportData.effectiveDate || 'N/A'}</p> {/* Changed to Effective Date */}
        </div>
    </div>
  );
}

export default ReportHeader;