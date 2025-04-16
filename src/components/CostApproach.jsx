import React, { useState, useContext, useEffect } from 'react';
import { ReportContext } from '../context/ReportDataContext';
import { ValidationContext } from '../context/ValidationContext'; // Import ValidationContext
import EditableField from './EditableField';
import './CostApproach.css';

function CostApproach() {
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validateField, validationErrors, isFormValid } = useContext(ValidationContext); // Get validation context

  // Initialize local state from global context or defaults
  const initialData = reportData.costApproachData || {
    siteValue: '',
    improvementCostNewSource: '',
    improvementCostNewAmount: '',
    physicalDeteriorationPercent: '',
    physicalDeteriorationAmount: '',
    functionalObsolescencePercent: '',
    functionalObsolescenceAmount: '',
    externalObsolescencePercent: '',
    externalObsolescenceAmount: '',
    asIsMarketValueSiteImprovements: '',
  };

  const [costData, setCostData] = useState(initialData);
  const [saveStatus, setSaveStatus] = useState(''); // For save feedback

  // Calculated values - derived from local state
  const [calculatedValues, setCalculatedValues] = useState({
    totalDepreciation: 0,
    depreciatedCostImprovements: 0,
    indicatedValueByCostApproach: 0,
  });

  // --- Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCostData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Optionally clear validation error on change
    validateField(name, value, {}); // Clear specific error if desired, or rely on blur
    setSaveStatus(''); // Clear save status on new change
  };

  // --- Validation on Blur ---
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let rules = {};
    // Apply numerical validation to amount/value fields
    if (name.includes('Amount') || name.includes('Value') || name.includes('Percent')) {
        rules.numerical = true;
    }
    // Add required validation if needed for specific fields (example)
    if (name === 'siteValue' || name === 'improvementCostNewAmount') {
        rules.required = true;
    }
    validateField(name, value, rules);
  };

  // --- Calculations ---
  useEffect(() => {
    const siteVal = parseFloat(costData.siteValue) || 0;
    const costNew = parseFloat(costData.improvementCostNewAmount) || 0;
    const physDeter = parseFloat(costData.physicalDeteriorationAmount) || 0;
    const funcObs = parseFloat(costData.functionalObsolescenceAmount) || 0;
    const extObs = parseFloat(costData.externalObsolescenceAmount) || 0;
    const siteImpr = parseFloat(costData.asIsMarketValueSiteImprovements) || 0;

    const totalDep = physDeter + funcObs + extObs;
    const depCost = costNew - totalDep;
    const indicatedValue = siteVal + depCost + siteImpr;

    setCalculatedValues({
      totalDepreciation: totalDep,
      depreciatedCostImprovements: depCost,
      indicatedValueByCostApproach: indicatedValue,
    });
  }, [costData]); // Recalculate when costData changes

  // --- Save Handler ---
  const handleSave = () => {
    // Trigger validation for all fields before saving
    let allValid = true;
    const fieldsToValidate = [
        { name: 'siteValue', rules: { required: true, numerical: true } },
        { name: 'improvementCostNewAmount', rules: { required: true, numerical: true } },
        { name: 'physicalDeteriorationAmount', rules: { numerical: true } },
        { name: 'functionalObsolescenceAmount', rules: { numerical: true } },
        { name: 'externalObsolescenceAmount', rules: { numerical: true } },
        { name: 'asIsMarketValueSiteImprovements', rules: { numerical: true } },
        // Add other fields as needed
    ];

    fieldsToValidate.forEach(({ name, rules }) => {
        if (!validateField(name, costData[name] || '', rules)) {
            allValid = false;
        }
    });

    // Check overall form validity (might be slightly delayed, manual check is safer)
    // console.log("Is form valid (context):", isFormValid()); // Context check

    if (allValid) {
      console.log("Saving Cost Approach Data:", costData);
      updateReportData('costApproachData', costData);
      setSaveStatus('Cost Approach data saved successfully!');
      // Optionally clear local validation errors after successful save
      // clearAllValidationErrors(); // Assuming a function exists in ValidationContext
    } else {
      console.error("Validation errors prevent saving Cost Approach data.");
      setSaveStatus('Please fix validation errors before saving.');
    }
  };

  // Helper to format currency
  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '$0';
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <div className="cost-approach">
      <h2>Cost Approach</h2>

      {/* Boilerplate Description */}
      <p>
        The Cost Approach was developed to estimate the value of the subject property by determining the current cost to construct a replica of the improvements, less depreciation, plus the land value.
      </p>
      <hr />

      <h3>Cost Breakdown</h3>
      <table className="cost-approach-table">
        <tbody>
          <tr>
            <td>Estimated Site Value</td>
            <td>
              <input
                type="number"
                name="siteValue"
                value={costData.siteValue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Site Value"
                className={validationErrors.siteValue ? 'invalid' : ''}
              />
              {validationErrors.siteValue && <span className="error-message">{validationErrors.siteValue}</span>}
            </td>
          </tr>
          <tr>
            <td>Source of Improvement Cost New</td>
             <td>
              <input
                type="text"
                name="improvementCostNewSource"
                value={costData.improvementCostNewSource}
                onChange={handleChange}
                onBlur={handleBlur} // Basic validation if needed
                placeholder="e.g., Marshall & Swift"
                // Add validation class if needed
              />
               {/* Add error span if needed */}
            </td>
          </tr>
          <tr>
            <td>Estimated Cost New of Improvements</td>
            <td>
              <input
                type="number"
                name="improvementCostNewAmount"
                value={costData.improvementCostNewAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Cost New"
                className={validationErrors.improvementCostNewAmount ? 'invalid' : ''}
              />
              {validationErrors.improvementCostNewAmount && <span className="error-message">{validationErrors.improvementCostNewAmount}</span>}
            </td>
          </tr>
          {/* --- Depreciation Section --- */}
          <tr className="section-header"><td colSpan="2">Less Depreciation:</td></tr>
          <tr className="sub-item">
            <td>Physical Deterioration (% / Amt)</td>
            <td>
              <input
                type="number"
                name="physicalDeteriorationPercent"
                value={costData.physicalDeteriorationPercent}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="%"
                style={{width: '50px', marginRight: '5px'}}
                className={validationErrors.physicalDeteriorationPercent ? 'invalid' : ''}
              />
              <input
                type="number"
                name="physicalDeteriorationAmount"
                value={costData.physicalDeteriorationAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Amount"
                 className={validationErrors.physicalDeteriorationAmount ? 'invalid' : ''}
              />
              {validationErrors.physicalDeteriorationPercent && <span className="error-message">{validationErrors.physicalDeteriorationPercent}</span>}
               {validationErrors.physicalDeteriorationAmount && <span className="error-message">{validationErrors.physicalDeteriorationAmount}</span>}
            </td>
          </tr>
          <tr className="sub-item">
            <td>Functional Obsolescence (% / Amt)</td>
             <td>
               <input
                type="number"
                name="functionalObsolescencePercent"
                value={costData.functionalObsolescencePercent}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="%"
                style={{width: '50px', marginRight: '5px'}}
                className={validationErrors.functionalObsolescencePercent ? 'invalid' : ''}
              />
              <input
                type="number"
                name="functionalObsolescenceAmount"
                value={costData.functionalObsolescenceAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Amount"
                className={validationErrors.functionalObsolescenceAmount ? 'invalid' : ''}
              />
              {validationErrors.functionalObsolescencePercent && <span className="error-message">{validationErrors.functionalObsolescencePercent}</span>}
              {validationErrors.functionalObsolescenceAmount && <span className="error-message">{validationErrors.functionalObsolescenceAmount}</span>}
            </td>
          </tr>
          <tr className="sub-item">
            <td>External Obsolescence (% / Amt)</td>
             <td>
               <input
                type="number"
                name="externalObsolescencePercent"
                value={costData.externalObsolescencePercent}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="%"
                style={{width: '50px', marginRight: '5px'}}
                className={validationErrors.externalObsolescencePercent ? 'invalid' : ''}
              />
              <input
                type="number"
                name="externalObsolescenceAmount"
                value={costData.externalObsolescenceAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Amount"
                className={validationErrors.externalObsolescenceAmount ? 'invalid' : ''}
              />
              {validationErrors.externalObsolescencePercent && <span className="error-message">{validationErrors.externalObsolescencePercent}</span>}
              {validationErrors.externalObsolescenceAmount && <span className="error-message">{validationErrors.externalObsolescenceAmount}</span>}
            </td>
          </tr>
          <tr className="total-item">
            <td>Total Depreciation</td>
            {/* Display calculated value */}
            <td>({formatCurrency(calculatedValues.totalDepreciation)})</td>
          </tr>
          {/* --- End Depreciation --- */}
          <tr>
            <td>Depreciated Cost of Improvements</td>
            {/* Display calculated value */}
            <td>{formatCurrency(calculatedValues.depreciatedCostImprovements)}</td>
          </tr>
          <tr>
            <td>Estimated "As Is" Market Value of Site Improvements</td>
            <td>
               <input
                type="number"
                name="asIsMarketValueSiteImprovements"
                value={costData.asIsMarketValueSiteImprovements}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Site Impr. Value"
                className={validationErrors.asIsMarketValueSiteImprovements ? 'invalid' : ''}
              />
              {validationErrors.asIsMarketValueSiteImprovements && <span className="error-message">{validationErrors.asIsMarketValueSiteImprovements}</span>}
            </td>
          </tr>
          <tr className="final-value">
            <td>Indicated Value by Cost Approach</td>
            {/* Display calculated value */}
            <td>{formatCurrency(calculatedValues.indicatedValueByCostApproach)}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleSave} className="save-button">Save Cost Approach Data</button>
      {saveStatus && <p className={`save-status ${saveStatus.includes('error') ? 'error' : 'success'}`}>{saveStatus}</p>}


      <h3>Summary of Cost Approach</h3>
      <EditableField
        initialContent={reportData.costApproachContent ?? `<p>Default summary...</p>`}
        onChange={(newContent) => updateReportData('costApproachContent', newContent)}
      />
    </div>
  );
}

export default CostApproach;