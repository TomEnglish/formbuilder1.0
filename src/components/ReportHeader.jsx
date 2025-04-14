import React from 'react';
import EditableField from './EditableField';
import companyLogo from '../assets/Logo.png'; // Import the logo
import './ReportHeader.css'; // Import CSS for styling

function ReportHeader({ data, onDataChange, sectionVisibility, onToggleSection }) { // Removed file props

  // Destructure data only if it exists, otherwise use defaults directly
  const clientName = data?.clientName || 'N/A';
  const propertyAddress = data?.propertyAddress || 'N/A';
  const appraisalDate = data?.appraisalDate || 'N/A';


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

  const handleClientNameChange = (newContent) => {
    // Call the function passed from App.jsx to update the state
    onDataChange('clientName', newContent);
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
      {data && (
        <div className="client-info"> {/* Renamed div for clarity */}
          <div> {/* Keep client editable */}
            <strong>Client:</strong>
            {/* Pass clientName from data if available, otherwise empty/default */}
            <EditableField initialContent={clientName} onChange={handleClientNameChange} />
          </div>
          <p><strong>Property Address:</strong> {propertyAddress}</p>
          <p><strong>Date of Appraisal:</strong> {appraisalDate}</p>
        </div>
      )}
    </div>
  );
}

export default ReportHeader;