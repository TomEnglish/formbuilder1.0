import React, { useState, useContext, useEffect } from 'react'; // Import useState, useEffect
import { ReportContext } from '../context/ReportDataContext';
import { ValidationContext } from '../context/ValidationContext'; // Import ValidationContext
import EditableField from './EditableField';
import './SalesComparisonApproach.css';

// Helper function to generate a simple key from a field name
const generateKey = (fieldName) => {
  return fieldName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/adj$/, 'adjustment');
};

// Initial structure for a comparable property
const initialComparable = {
  id: null, // Or generate unique IDs
  address: '',
  sale_price: '',
  sale_date: '',
  gross_living_area_gla: '',
  site_size: '',
  age_condition: '',
  location_adjustment: '',
  condition_adjustment: '',
  features_adjustment: '',
  adjusted_sale_price_per_sqft: '', // May need calculation logic later
  final_adjusted_sale_price: '', // May need calculation logic later
};

// Initial structure for the subject property (can have fewer fields)
const initialSubject = {
  id: 'subject',
  address: 'Subject Property', // Or fetch from main data
  sale_price: 'N/A',
  sale_date: 'N/A',
  gross_living_area_gla: '', // Should be editable
  site_size: '', // Should be editable
  age_condition: '', // Should be editable
  location_adjustment: 'N/A',
  condition_adjustment: 'N/A',
  features_adjustment: 'N/A',
  adjusted_sale_price_per_sqft: 'N/A',
  final_adjusted_sale_price: '', // Should be editable/calculated
};


function SalesComparisonApproach() { // Removed data prop for now, using context/local state
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validationErrors, validateField, getFieldRules } = useContext(ValidationContext); // Use ValidationContext

  // --- State Management ---
  // Initialize local state with subject + default comparables
  // Attempt to load from reportData, otherwise use defaults
  const [localSalesData, setLocalSalesData] = useState(() => {
      const initialData = reportData.salesComparables && reportData.salesComparables.length > 0
          ? reportData.salesComparables
          : [
              initialSubject,
              { ...initialComparable, id: 1, address: '123 Main St' }, // Example default comps
              { ...initialComparable, id: 2, address: '456 Oak Ave' },
              { ...initialComparable, id: 3, address: '789 Pine Blvd' },
            ];
      return initialData;
  });

  // --- Data Structure ---
  const fields = [
    // Field Name, Type, Validation Rules (example)
    { name: "Address", key: generateKey("Address"), type: "text", rules: ['required'] },
    { name: "Sale Price", key: generateKey("Sale Price"), type: "number", rules: ['required', 'numerical'] },
    { name: "Sale Date", key: generateKey("Sale Date"), type: "date", rules: ['required', 'date'] },
    { name: "Gross Living Area (GLA)", key: generateKey("Gross Living Area (GLA)"), type: "number", rules: ['required', 'numerical'] },
    { name: "Site Size", key: generateKey("Site Size"), type: "text", rules: ['required'] }, // Or number if strictly numeric
    { name: "Age/Condition", key: generateKey("Age/Condition"), type: "text", rules: ['required'] },
    { name: "Location Adj.", key: generateKey("Location Adj."), type: "text", rules: ['numerical'] }, // Allow % or $
    { name: "Condition Adj.", key: generateKey("Condition Adj."), type: "text", rules: ['numerical'] }, // Allow % or $
    { name: "Features Adj.", key: generateKey("Features Adj."), type: "text", rules: ['numerical'] }, // Allow % or $
    { name: "Adjusted Sale Price per SqFt", key: generateKey("Adjusted Sale Price per SqFt"), type: "number", rules: ['numerical'], readOnly: true }, // Calculated?
    { name: "Final Adjusted Sale Price", key: generateKey("Final Adjusted Sale Price"), type: "number", rules: ['numerical'], readOnly: true }, // Calculated?
  ];

  // Columns derived from local state
  const columns = localSalesData.map(item => item.address || `Comp ${item.id}`);

  // --- Event Handlers ---
  const handleInputChange = (compIndex, fieldKey, value) => {
    // Update local state
    const updatedSalesData = localSalesData.map((item, index) => {
      if (index === compIndex) {
        return { ...item, [fieldKey]: value };
      }
      return item;
    });
    setLocalSalesData(updatedSalesData);

    // Perform validation
    const fieldDefinition = fields.find(f => f.key === fieldKey);
    const rules = fieldDefinition?.rules || [];
    // Create a unique identifier for validation, e.g., 'salesComp_1_sale_price'
    const validationId = `salesComp_${localSalesData[compIndex].id}_${fieldKey}`;
    validateField(validationId, value, rules);

    // TODO: Add logic here to recalculate dependent fields if necessary
    // e.g., Adjusted Sale Price per SqFt, Final Adjusted Sale Price
  };

  const handleSave = () => {
    // Optional: Final validation check before saving
    let hasErrors = false;
    localSalesData.forEach((comp, compIndex) => {
        // Skip subject property (index 0) for this validation check if needed,
        // or adjust validation logic based on requirements.
        // Here, we check all entries including the subject for simplicity.
        fields.forEach(field => {
            const validationId = `salesComp_${comp.id}_${field.key}`;
            if (validationErrors[validationId]) {
                console.error(`Validation Error: ${field.name} for ${comp.address || `Comp ${comp.id}`} - ${validationErrors[validationId]}`);
                hasErrors = true;
            }
        });
    });

    if (hasErrors) {
      alert('Please fix validation errors before saving.');
      return; // Prevent saving if errors exist
    }

    // Update global state
    updateReportData('salesComparables', localSalesData);
    alert('Comparable sales data saved successfully!'); // Simple feedback
    console.log("Saved sales comparables to global state:", localSalesData); // For debugging
  };


  // --- Rendering ---
  return (
    <section className="sales-comparison-approach">
      <h2>Sales Comparison Approach</h2>
      {/* Narrative paragraphs remain the same */}
      <p>
        The Sales Comparison Approach was employed to estimate the market value of the subject property by analyzing three recent sales of comparable multi-family properties in Lake Charles, Louisiana. The comparables were selected based on similar size, age, condition, and location characteristics.
      </p>
      <p>
        The subject property is a 19-unit apartment complex undergoing complete renovation. Comparable sales were selected from similar multi-family properties sold within the past 12 months within a 1-mile radius of the subject.
      </p>
      <p>
        Adjustments were made to account for differences in location, condition, size, and amenities. The primary unit of comparison was price per square foot of net rentable area. All comparables required positive adjustments for the subject's superior condition post-renovation.
      </p>
      <p>
        The adjustment process followed these steps:
      </p>
      <ol>
        <li>Verified all sales through public records and broker confirmation</li>
        <li>Conducted physical inspections of comparable properties</li>
        <li>Analyzed market conditions at time of each sale</li>
        <li>Applied quantitative adjustments based on paired sales analysis</li>
        <li>Reconciled adjusted values to determine indicated value</li>
      </ol>
      <hr />
      <h3>Sales Comparison Grid</h3>

      <div className="sca-grid-container">
        <table className="sca-table">
          <thead>
            <tr>
              <th>Feature</th>
              {columns.map((colName, index) => (
                // Use comp id for key if available, otherwise index
                <th key={localSalesData[index]?.id ?? index}>{colName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, rowIndex) => (
              <tr key={field.key}>
                <td className="feature-label">{field.name}</td>
                {localSalesData.map((compData, colIndex) => {
                  const isSubject = colIndex === 0;
                  const value = compData[field.key] ?? '';
                  // Unique ID for validation errors
                  const validationId = `salesComp_${compData.id}_${field.key}`;
                  const error = validationErrors[validationId];
                  // Disable fields for subject that are not applicable (N/A)
                  const isDisabled = isSubject && ['sale_price', 'sale_date', 'location_adjustment', 'condition_adjustment', 'features_adjustment', 'adjusted_sale_price_per_sqft'].includes(field.key);
                  // Mark calculated fields as readOnly for now
                  const isReadOnly = field.readOnly || isDisabled;

                  // Determine input type, default to text
                  let inputType = field.type || 'text';
                  // Use 'text' for number type to allow formatting characters like '$', ',', '%'
                  if (inputType === 'number' && field.key !== 'gross_living_area_gla') {
                      inputType = 'text';
                  }
                   if (field.key === 'sale_date') {
                      inputType = 'date';
                   }


                  return (
                    <td key={`${field.key}-${compData.id ?? colIndex}`}>
                      <input
                        type={inputType}
                        value={isDisabled ? 'N/A' : value}
                        onChange={(e) => !isReadOnly && handleInputChange(colIndex, field.key, e.target.value)}
                        onBlur={() => { // Validate on blur as well
                            if (!isReadOnly) {
                                const rules = field.rules || [];
                                validateField(validationId, value, rules);
                            }
                        }}
                        readOnly={isReadOnly}
                        disabled={isDisabled}
                        className={`sca-input ${error ? 'input-error' : ''}`}
                        aria-label={`${field.name} for ${columns[colIndex]}`}
                        // Add step="any" for number inputs if needed, but using text for flexibility
                      />
                      {error && <div className="error-message">{error}</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Save Button */}
      <div className="sca-save-button-container" style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={handleSave} className="sca-save-button">
              Save Comparables
          </button>
      </div>


      <h3>Summary of Sales Comparison Approach</h3>
      <EditableField
        initialContent={reportData.salesComparisonContent ?? `
          <p>The adjusted sale prices of the comparable properties indicate a value range of $1,320,000 to $1,519,500 for the subject property. After analyzing the comparables and considering the subject's superior post-renovation condition, the indicated value from the Sales Comparison Approach is $1,450,000.</p>
          <p>The primary value indicators were:</p>
          <ul>
            <li>Price per square foot of net rentable area ($62.50 - $63.46)</li>
            <li>Price per unit ($69,474 - $79,974)</li>
            <li>Overall capitalization rate (7.25% - 7.75%)</li>
          </ul>
          <p>This approach was given significant weight in the final reconciliation due to the availability of recent, reliable comparable sales and the approach's direct reflection of current market conditions.</p>
        `}
        onChange={(newContent) => updateReportData('salesComparisonContent', newContent)}
        // Add validation ID if the summary needs validation
        // validationId="salesComparisonSummary"
        // error={validationErrors.salesComparisonSummary}
      />
    </section>
  );
}

export default SalesComparisonApproach;