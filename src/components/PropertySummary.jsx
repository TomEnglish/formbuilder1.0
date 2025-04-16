import React, { useContext } from 'react';
import { ReportContext } from '../context/ReportDataContext.jsx';
import { ValidationContext } from '../context/ValidationContext.jsx'; // Import ValidationContext
import EditableField from './EditableField';

function PropertySummary() { // Remove props
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validateField, setFieldError, clearFieldError, validationErrors } = useContext(ValidationContext); // Use ValidationContext

  // Removed old destructuring and if (!data) check

  // Removed handlePropertyTypeChange and handleYearBuiltChange

  return (
    <div id="propertySummary" className="property-summary">
      <h2>Property Summary</h2>
      {/* Updated to use reportData from context */}
      <p><strong>Property Address:</strong> {reportData.propertyAddress || 'N/A'}</p>
      {/* Removed Value Conclusion paragraph */}
      <div>
        <strong>Property Type:</strong>
        {/* Updated EditableField to use context */}
        <EditableField
          value={reportData.propertyType || ''}
          onChange={(newContent) => updateReportData('propertyType', newContent)}
        />
      </div>
      <div>
        <strong>Year Built:</strong>
        {/* Updated EditableField to use context */}
        <EditableField
          value={reportData.yearBuilt || ''} // Note: EditableField might not be ideal for plain numbers
          onChange={(newContent) => {
            // Attempt to clean and validate as a number
            const numericValue = String(newContent).replace(/<[^>]*>?/gm, ''); // Strip potential HTML
            const validation = validateField(numericValue, 'numerical');
            if (!validation.isValid) {
              setFieldError('yearBuilt', validation.message);
              // Optionally update reportData even if invalid, depending on desired UX
              // updateReportData('yearBuilt', numericValue);
            } else {
              updateReportData('yearBuilt', numericValue); // Update with cleaned value
              clearFieldError('yearBuilt'); // Clear error on valid input
            }
          }}
          error={validationErrors.yearBuilt}
        />
      </div>
    </div>
  );
}

export default PropertySummary;