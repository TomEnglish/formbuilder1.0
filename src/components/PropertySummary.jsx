import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext.jsx'; // Import ReportContext
import EditableField from './EditableField';

function PropertySummary() { // Remove props
  const { reportData, updateReportData } = useContext(ReportContext); // Use context

  // Removed old destructuring and if (!data) check

  // Removed handlePropertyTypeChange and handleYearBuiltChange

  return (
    <div className="property-summary">
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
          value={reportData.yearBuilt || ''}
          onChange={(newContent) => updateReportData('yearBuilt', newContent)}
        />
      </div>
    </div>
  );
}

export default PropertySummary;