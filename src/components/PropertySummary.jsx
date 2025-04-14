import React from 'react';
import EditableField from './EditableField'; // Import the new component

function PropertySummary({ data, onDataChange }) { // Receive onDataChange prop
  if (!data) {
    return null; // Don't render if no data
  }

  // Destructure expected fields from the data object (first row of Excel)
  // Use keys likely found in Excel, provide defaults
  const {
    'Property Address': propertyAddress = 'N/A',
    'Value Conclusion': valueConclusion = 'N/A', // Assuming this key exists
    'Property Type': propertyType = 'N/A',
    'Year Built': yearBuilt = 'Unknown'
  } = data || {}; // Use empty object fallback if data is null/undefined after initial check

  const handlePropertyTypeChange = (newContent) => {
    // Call the function passed from App.jsx to update the state
    // Use the correct key ('Property Type') when updating state
    onDataChange('Property Type', newContent);
  };

  const handleYearBuiltChange = (newContent) => {
    // Call the function passed from App.jsx to update the state
    // Use the correct key ('Year Built') when updating state
    onDataChange('Year Built', newContent);
  };

  return (
    <div className="property-summary">
      <h2>Property Summary</h2>
      <p><strong>Property Address:</strong> {propertyAddress}</p>
      <p><strong>Value Conclusion:</strong> {valueConclusion}</p>
      <div>
        <strong>Property Type:</strong>
        <EditableField initialContent={String(propertyType)} onChange={handlePropertyTypeChange} />
      </div>
      <div>
        <strong>Year Built:</strong>
        <EditableField initialContent={String(yearBuilt)} onChange={handleYearBuiltChange} />
      </div>
    </div>
  );
}

export default PropertySummary;