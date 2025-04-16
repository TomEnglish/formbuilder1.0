import React, { useContext } from 'react';
import { ReportContext } from '../context/ReportDataContext.jsx';
import { ValidationContext } from '../context/ValidationContext.jsx'; // Import ValidationContext
import EditableField from './EditableField';
import './ImprovementsDescription.css';

function ImprovementsDescription() {
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validationErrors, validateField, setFieldError, clearFieldError } = useContext(ValidationContext); // Get validation context

  // Helper function for handling input changes and validation
  const handleInputChange = (fieldName, value) => {
    updateReportData(fieldName, value);
    // Optionally clear validation error on change, or wait for blur
    // clearFieldError(fieldName);
  };

  // Helper function for handling blur event for validation
  const handleBlur = (fieldName, value) => {
    const { isValid, message } = validateField(value, 'required'); // Basic required validation
    if (!isValid) {
      setFieldError(fieldName, message);
    } else {
      clearFieldError(fieldName);
    }
    // Add more specific validation rules here if needed
  };

  // Define fields to make editable
  const editableFields = [
    { label: 'General Description', key: 'generalDescription' },
    { label: 'Exterior - Walls', key: 'exteriorWalls' },
    { label: 'Exterior - Roof', key: 'exteriorRoof' },
    { label: 'Foundation', key: 'foundation' },
    { label: 'Basement', key: 'basement' },
    { label: 'Insulation', key: 'insulation' },
    { label: 'Interior - Floors', key: 'interiorFloors' },
    { label: 'Interior - Walls', key: 'interiorWalls' },
    { label: 'Interior - Trim/Finish', key: 'interiorTrimFinish' },
    { label: 'Heating/Cooling', key: 'heatingCooling' },
    { label: 'Attic', key: 'attic' },
    { label: 'Amenities - Fireplace', key: 'amenitiesFireplace' },
    { label: 'Amenities - Patio/Deck', key: 'amenitiesPatioDeck' },
    { label: 'Amenities - Pool', key: 'amenitiesPool' },
    { label: 'Car Storage', key: 'carStorage' },
    // Add other fields from context if they were previously static and need editing
    // Example: { label: 'Building Class', key: 'buildingClass' }, // Assuming 'buildingClass' exists in context
  ];

  return (
    <div id="improvementsDescription" className="improvements-description-section section">
      <h2>Improvements Description</h2>

      <h3>Improvement Details</h3>
      <div className="form-grid">
        {/* Map over editable fields to create inputs */}
        {editableFields.map(({ label, key }) => (
          <div key={key} className="form-field">
            <label htmlFor={key}>{label}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={reportData[key] || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              onBlur={(e) => handleBlur(key, e.target.value)}
              aria-invalid={!!validationErrors[key]}
              aria-describedby={validationErrors[key] ? `${key}-error` : undefined}
            />
            {validationErrors[key] && (
              <span id={`${key}-error`} className="validation-error" role="alert">
                {validationErrors[key]}
              </span>
            )}
          </div>
        ))}
        {/* Keep static fields if any, or fields not in editableFields array */}
         <div className="detail-item"><span className="detail-label">Building Class:</span> <span className="detail-value">{reportData.buildingClass || 'N/A'}</span></div>
         <div className="detail-item"><span className="detail-label">Construction Type:</span> <span className="detail-value">{reportData.constructionType || 'N/A'}</span></div>
         <div className="detail-item"><span className="detail-label">Quality Rating:</span> <span className="detail-value">{reportData.qualityRating || 'N/A'}</span></div>
         <div className="detail-item"><span className="detail-label">Condition Rating:</span> <span className="detail-value">{reportData.conditionRating || 'N/A'}</span></div>
         <div className="detail-item"><span className="detail-label">Gross Building Area:</span> <span className="detail-value">{reportData.grossBuildingArea || 'N/A'}</span></div>
         <div className="detail-item"><span className="detail-label">Net Rentable Area:</span> <span className="detail-value">{reportData.netRentableArea || 'N/A'}</span></div>
         <div className="detail-item"><span className="detail-label">Number of Units:</span> <span className="detail-value">{reportData.numberOfUnits || 'N/A'}</span></div>
      </div>

      <h3>Narrative Description</h3>
      <EditableField
        initialContent={reportData.improvementsNarrative || '<p>Enter narrative description here...</p>'} // Simplified default
        onChange={(newContent) => updateReportData('improvementsNarrative', newContent)}
        // Add validation for narrative if needed (e.g., min/max length)
        // onBlur={(content) => handleBlur('improvementsNarrative', content, 'contentLength', [50, 5000])} // Example
      />
       {validationErrors.improvementsNarrative && (
          <span className="validation-error" role="alert">
            {validationErrors.improvementsNarrative}
          </span>
        )}
    </div>
  );
}

export default ImprovementsDescription;