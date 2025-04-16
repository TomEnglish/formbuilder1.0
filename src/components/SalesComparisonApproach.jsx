import React, { useState, useContext, useEffect } from 'react'; // Import useState, useEffect
import { ReportContext } from '../context/ReportDataContext';
import { ValidationContext } from '../context/ValidationContext'; // Import ValidationContext
import EditableField from './EditableField';
import './SalesComparisonApproach.css';

// --- Adjustment Factors (Placeholders) ---
const GLA_ADJUSTMENT_RATE = 50; // $/sqft difference
const SITE_ADJUSTMENT_RATE = 5; // $/sqft difference for site area
const CONDITION_ADJUSTMENT_PERCENT = 0.05; // 5% adjustment for condition difference (e.g., Good vs. Average)
// Add more factors as needed (e.g., Date of Sale, Location)

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
  gross_living_area_gla: '', // Comparable's GLA
  site_size: '', // Comparable's Site Size
  age_condition: '', // Comparable's Condition (e.g., "Average", "Good")
  // --- Fields below might be replaced/used by calculated adjustments ---
  // location_adjustment: '', // Example placeholder
  // condition_adjustment: '', // Example placeholder
  // features_adjustment: '', // Example placeholder
  // adjusted_sale_price_per_sqft: '', // Will be calculated
  // final_adjusted_sale_price: '', // Will be calculated
};

// Initial structure for the subject property (can have fewer fields)
const initialSubject = {
  id: 'subject',
  address: 'Subject Property', // Or fetch from main data
  sale_price: 'N/A',
  sale_date: 'N/A',
  gross_living_area_gla: '', // Subject's GLA (will link to reportData)
  site_size: '', // Subject's Site Size (will link to reportData)
  age_condition: '', // Subject's Condition (will link to reportData)
  // --- Adjustment fields are not applicable to the subject ---
  location_adjustment: 'N/A',
  condition_adjustment: 'N/A',
  features_adjustment: 'N/A',
  gla_adjustment: 'N/A', // Display field for adjustments
  site_adjustment: 'N/A', // Display field for adjustments
  condition_adjustment_calc: 'N/A', // Display field for adjustments (avoid key conflict)
  total_adjustment: 'N/A', // Display field for adjustments
  adjusted_sale_price_per_sqft: 'N/A', // Display field for calculation
  final_adjusted_sale_price: 'N/A', // Display field for calculation
};


function SalesComparisonApproach() { // Removed data prop for now, using context/local state
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validationErrors, validateField } = useContext(ValidationContext); // Use ValidationContext

  // --- Access Subject Data ---
  const {
    subjectGLA, // Assuming this is now in reportData (e.g., '1500')
    siteArea: subjectSiteArea, // Assuming this is in reportData (e.g., '5000')
    subjectCondition, // Assuming this is in reportData (e.g., 'Average')
    // Add other necessary subject fields here
  } = reportData;

  // --- State Management ---
  // Initialize local state for comparable inputs
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

  // State for Reconciliation Section
  const [indicatedValue, setIndicatedValue] = useState(reportData.salesCompIndicatedValue ?? '');
  const [reconciliationNarrative, setReconciliationNarrative] = useState(
    reportData.salesCompNarrative ?? '<p>Enter reconciliation narrative here...</p>'
  );

  // --- Data Structure ---
  const fields = [
    // --- Input Fields ---
    { name: "Address", key: "address", type: "text", rules: ['required'] },
    { name: "Sale Price", key: "sale_price", type: "number", rules: ['required', 'numerical'] },
    { name: "Sale Date", key: "sale_date", type: "date", rules: ['required', 'date'] },
    { name: "Gross Living Area (GLA)", key: "gross_living_area_gla", type: "number", rules: ['required', 'numerical'] },
    { name: "Site Size", key: "site_size", type: "number", rules: ['required', 'numerical'] }, // Assuming numeric sqft/acres
    { name: "Age/Condition", key: "age_condition", type: "text", rules: ['required'] }, // Example: "Average", "Good", "Fair"
    // --- Adjustment Calculation Display Fields (Read Only) ---
    // { name: "Location Adj.", key: "location_adjustment", type: "text", readOnly: true }, // Example if needed later
    { name: "GLA Adjustment", key: "gla_adjustment", type: "number", readOnly: true },
    { name: "Site Adjustment", key: "site_adjustment", type: "number", readOnly: true },
    { name: "Condition Adjustment", key: "condition_adjustment_calc", type: "number", readOnly: true }, // Use different key
    // Add other adjustment display rows here (e.g., Date of Sale Adj.)
    { name: "Total Adjustment", key: "total_adjustment", type: "number", readOnly: true },
    { name: "Adjusted Sale Price per SqFt", key: "adjusted_sale_price_per_sqft", type: "number", readOnly: true },
    { name: "Final Adjusted Sale Price", key: "final_adjusted_sale_price", type: "number", readOnly: true },
  ];

  // Columns derived from local state (Addresses)
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

    // Trigger recalculation when inputs change (handled by useEffect)
  };

  // --- Calculation Logic ---
  // Helper to safely parse float, returning 0 if invalid
  const parseFloatSafe = (value) => {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
  };

  // Helper to compare condition strings (simple example)
  const compareCondition = (compCondition, subjCondition) => {
      const conditions = { "Poor": 1, "Fair": 2, "Average": 3, "Good": 4, "Excellent": 5 };
      const compVal = conditions[compCondition] || 0;
      const subjVal = conditions[subjCondition] || 0;
      if (compVal === 0 || subjVal === 0) return 0; // Cannot compare if unknown
      if (compVal < subjVal) return -1; // Comp is inferior
      if (compVal > subjVal) return 1;  // Comp is superior
      return 0; // Conditions are equal
  };

  // --- Effect for Calculations ---
  useEffect(() => {
    const subjGLA = parseFloatSafe(subjectGLA);
    const subjSite = parseFloatSafe(subjectSiteArea);
    const subjCondition = subjectCondition; // String like "Good"

    const needsUpdate = localSalesData.some((compData, index) => {
        if (index === 0) return false; // Skip subject

        const compSalePrice = parseFloatSafe(compData.sale_price);
        const compGLA = parseFloatSafe(compData.gross_living_area_gla);
        const compSiteSize = parseFloatSafe(compData.site_size);
        const compCondition = compData.age_condition; // String like "Average"

        // --- Perform Calculations ---
        const glaAdjustment = (subjGLA > 0 && compGLA > 0)
            ? (subjGLA - compGLA) * GLA_ADJUSTMENT_RATE
            : 0;
        const siteAdjustment = (subjSite > 0 && compSiteSize > 0)
            ? (subjSite - compSiteSize) * SITE_ADJUSTMENT_RATE
            : 0;
        const conditionComparison = compareCondition(compCondition, subjCondition);
        const conditionAdjustment = (compSalePrice > 0)
            ? conditionComparison * CONDITION_ADJUSTMENT_PERCENT * compSalePrice
            : 0;
        const totalAdjustment = glaAdjustment + siteAdjustment + conditionAdjustment; // Add other adjustments here if needed
        const finalAdjustedSalePrice = compSalePrice + totalAdjustment;
        const adjustedSalePricePerSqFt = (compGLA > 0)
            ? finalAdjustedSalePrice / compGLA
            : 0;

        // Check if calculated values differ from stored values
        return compData.gla_adjustment !== glaAdjustment ||
               compData.site_adjustment !== siteAdjustment ||
               compData.condition_adjustment_calc !== conditionAdjustment ||
               compData.total_adjustment !== totalAdjustment ||
               compData.final_adjusted_sale_price !== finalAdjustedSalePrice ||
               compData.adjusted_sale_price_per_sqft !== adjustedSalePricePerSqFt;
    });


    if (needsUpdate) {
        const updatedData = localSalesData.map((compData, index) => {
            if (index === 0) return compData; // Keep subject as is

            const compSalePrice = parseFloatSafe(compData.sale_price);
            const compGLA = parseFloatSafe(compData.gross_living_area_gla);
            const compSiteSize = parseFloatSafe(compData.site_size);
            const compCondition = compData.age_condition;

            // --- Recalculate (same logic as above) ---
            const glaAdjustment = (subjGLA > 0 && compGLA > 0) ? (subjGLA - compGLA) * GLA_ADJUSTMENT_RATE : 0;
            const siteAdjustment = (subjSite > 0 && compSiteSize > 0) ? (subjSite - compSiteSize) * SITE_ADJUSTMENT_RATE : 0;
            const conditionComparison = compareCondition(compCondition, subjCondition);
            const conditionAdjustment = (compSalePrice > 0) ? conditionComparison * CONDITION_ADJUSTMENT_PERCENT * compSalePrice : 0;
            const totalAdjustment = glaAdjustment + siteAdjustment + conditionAdjustment;
            const finalAdjustedSalePrice = compSalePrice + totalAdjustment;
            const adjustedSalePricePerSqFt = (compGLA > 0) ? finalAdjustedSalePrice / compGLA : 0;

            // Return updated comparable data with calculated fields
            return {
                ...compData,
                gla_adjustment: glaAdjustment,
                site_adjustment: siteAdjustment,
                condition_adjustment_calc: conditionAdjustment,
                total_adjustment: totalAdjustment,
                final_adjusted_sale_price: finalAdjustedSalePrice,
                adjusted_sale_price_per_sqft: adjustedSalePricePerSqFt,
            };
        });
        setLocalSalesData(updatedData);
    }
    // Dependencies: Recalculate when local data or relevant subject data changes
  }, [localSalesData, subjectGLA, subjectSiteArea, subjectCondition, setLocalSalesData]);


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

    // Validate reconciliation fields
    const indicatedValueId = 'salesCompIndicatedValue';
    const narrativeId = 'salesCompNarrative';
    validateField(indicatedValueId, indicatedValue, ['required', 'numerical']);
    validateField(narrativeId, reconciliationNarrative, ['required']); // Or use 'contentLength' if needed

    // Check validation errors object directly after triggering validation
    // Note: Validation state updates might be async, this check might need refinement
    // if errors don't appear immediately. A useEffect might be better for complex cases.
    if (validationErrors[indicatedValueId] || validationErrors[narrativeId]) {
        console.error(`Validation Error: Reconciliation fields have errors.`);
        hasErrors = true; // Mark that there are errors
    }

    if (hasErrors) {
      alert('Please fix validation errors before saving.');
      return; // Prevent saving if errors exist
    }

    // Update global state
    updateReportData('salesComparables', localSalesData);
    updateReportData('salesCompIndicatedValue', indicatedValue);
    updateReportData('salesCompNarrative', reconciliationNarrative);

    alert('Sales comparison data and reconciliation saved successfully!'); // Simple feedback
    console.log("Saved sales comparables to global state:", localSalesData); // For debugging
    console.log("Saved reconciliation data:", { indicatedValue, reconciliationNarrative }); // For debugging
  };


  // --- Rendering ---

  // Calculate Adjusted Price Range
  const adjustedPrices = localSalesData
    .slice(1) // Skip subject property
    .map(comp => parseFloatSafe(comp.final_adjusted_sale_price))
    .filter(price => !isNaN(price) && price > 0); // Filter out invalid or zero prices

  const minAdjustedPrice = adjustedPrices.length > 0 ? Math.min(...adjustedPrices) : 0;
  const maxAdjustedPrice = adjustedPrices.length > 0 ? Math.max(...adjustedPrices) : 0;
  const adjustedPriceRange = adjustedPrices.length > 0
    ? `${minAdjustedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} - ${maxAdjustedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
    : 'N/A';


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
            {fields.map((field) => ( // Removed rowIndex, using field.key
              <tr key={field.key}>
                <td className="feature-label">{field.name}</td>
                {localSalesData.map((compData, colIndex) => {
                  const isSubject = colIndex === 0;
                  const compId = compData.id ?? colIndex; // Use comp id or index as fallback key
                  let displayValue = compData[field.key] ?? '';
                  let isReadOnly = field.readOnly || false;
                  let isDisabled = false;

                  // --- Subject Property Handling ---
                  if (isSubject) {
                      // Link specific subject fields to global state if needed for editing *here*
                      // This example assumes subject data is primarily viewed or comes from reportData
                      if (field.key === 'gross_living_area_gla') displayValue = subjectGLA ?? '';
                      else if (field.key === 'site_size') displayValue = subjectSiteArea ?? '';
                      else if (field.key === 'age_condition') displayValue = subjectCondition ?? '';
                      // Disable non-applicable fields for subject
                      isDisabled = ['sale_price', 'sale_date', 'gla_adjustment', 'site_adjustment', 'condition_adjustment_calc', 'total_adjustment', 'adjusted_sale_price_per_sqft', 'final_adjusted_sale_price'].includes(field.key);
                      if (isDisabled) displayValue = 'N/A';
                      // Subject input fields might need separate handling if they should update global state directly
                      // For now, treat them as read-only display of reportData in this grid
                      isReadOnly = true; // Make subject column read-only in this grid view
                  }

                  // --- Comparable Property Display ---
                  if (!isSubject) {
                      if (field.readOnly) {
                          // Display calculated/stored value for read-only fields
                          const numericValue = compData[field.key]; // Read stored value
                          if (numericValue !== undefined && numericValue !== null && !isNaN(numericValue)) {
                              // Format as currency for price/adjustment fields, fixed decimals for sqft
                              if (['gla_adjustment', 'site_adjustment', 'condition_adjustment_calc', 'total_adjustment', 'final_adjusted_sale_price'].includes(field.key)) {
                                  displayValue = parseFloatSafe(numericValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                              } else if (field.key === 'adjusted_sale_price_per_sqft') {
                                  displayValue = parseFloatSafe(numericValue).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
                              } else {
                                  displayValue = numericValue; // Default numeric display
                              }
                          } else {
                              displayValue = ''; // Or 'N/A' or 0 if preferred for empty/invalid stored data
                          }
                      } else {
                          // Standard input field value (already handled by initial displayValue assignment)
                          displayValue = compData[field.key] ?? '';
                      }
                  }
                  // Note: Subject property display logic remains unchanged above

                  // Unique ID for validation errors (only for input fields)
                  const validationId = `salesComp_${compId}_${field.key}`;
                  const error = !isReadOnly ? validationErrors[validationId] : null; // Only show errors for editable fields

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
                      {/* Render input for editable fields, span for read-only/calculated */}
                      {(!isReadOnly && !isDisabled) ? (
                        <input
                          type={field.type === 'number' ? 'number' : (field.type === 'date' ? 'date' : 'text')} // Use appropriate type
                          value={displayValue}
                          onChange={(e) => handleInputChange(colIndex, field.key, e.target.value)}
                          onBlur={() => {
                              const rules = field.rules || [];
                              validateField(validationId, displayValue, rules);
                          }}
                          className={`sca-input ${error ? 'input-error' : ''}`}
                          aria-label={`${field.name} for ${columns[colIndex]}`}
                          step={field.type === 'number' ? 'any' : undefined} // Allow decimals for number type
                        />
                      ) : (
                        <span className={`sca-display ${isDisabled ? 'disabled' : ''}`}>
                          {displayValue}
                        </span>
                      )}
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

      {/* --- Reconciliation Section --- */}
      <hr />
      <h3>Sales Comparison Reconciliation</h3>

      <div className="reconciliation-section">
         {/* Display Adjusted Price Range */}
         <div className="form-field read-only-field"> {/* Added read-only-field class for potential styling */}
            <label>Adjusted Sale Price Range (Comparables):</label>
            <span className="sca-display">{adjustedPriceRange}</span>
         </div>

        <div className="form-field">
          <label htmlFor="salesCompIndicatedValue">Final Value Conclusion (Sales Comparison Approach):</label> {/* Updated Label */}
          <input
            type="number" // Use number for better input control
            id="salesCompIndicatedValue"
            value={indicatedValue}
            onChange={(e) => setIndicatedValue(e.target.value)}
            onBlur={() => validateField('salesCompIndicatedValue', indicatedValue, ['required', 'numerical'])}
            className={`sca-input ${validationErrors.salesCompIndicatedValue ? 'input-error' : ''}`}
            aria-describedby="salesCompIndicatedValueError"
            step="any" // Allow decimals
          />
          {validationErrors.salesCompIndicatedValue && (
            <div id="salesCompIndicatedValueError" className="error-message">
              {validationErrors.salesCompIndicatedValue}
            </div>
          )}
        </div>

        <div className="form-field">
          <label>Comparable Weighting & Reconciliation Narrative:</label> {/* Updated Label */}
          <EditableField
            initialContent={reconciliationNarrative}
            onChange={(newContent) => {
              setReconciliationNarrative(newContent);
              // Optional: Validate on change or wait for blur/save
              // validateField('salesCompNarrative', newContent, ['required']);
            }}
            onBlur={(currentContent) => { // Pass content from EditableField's internal state on blur
                validateField('salesCompNarrative', currentContent, ['required']);
            }}
            validationId="salesCompNarrative" // Pass validationId for error lookup
            error={validationErrors.salesCompNarrative} // Pass error message
          />
          {/* Error display is handled within EditableField now */}
        </div>
      </div>

      {/* Removed redundant Summary Section */}
    </section>
  );
}

export default SalesComparisonApproach;