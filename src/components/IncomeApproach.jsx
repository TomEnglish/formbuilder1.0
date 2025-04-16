import React, { useState, useContext, useEffect, useCallback } from 'react';
import { ReportContext } from '../context/ReportDataContext';
import { ValidationContext } from '../context/ValidationContext'; // Import ValidationContext
import EditableField from './EditableField';
import './IncomeApproach.css';

function IncomeApproach() {
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validationErrors, validateField, validateAll } = useContext(ValidationContext); // Use validation context

  // --- Local State for Income Approach Inputs ---
  const initialData = reportData.incomeApproach || {};
  const initialExpenses = initialData.operatingExpenses || {};

  const [pgi, setPgi] = useState(initialData.potentialGrossIncome ?? '');
  const [vacancyLoss, setVacancyLoss] = useState(initialData.vacancyCollectionLoss ?? ''); // Assuming this is an amount for now
  // Note: Vacancy could also be a percentage, requiring different calculation logic. Sticking to amount for simplicity.

  const [expenses, setExpenses] = useState({
    realEstateTaxes: initialExpenses.realEstateTaxes ?? '',
    insurance: initialExpenses.insurance ?? '',
    utilities: initialExpenses.utilities ?? '',
    management: initialExpenses.management ?? '',
    repairsMaintenance: initialExpenses.repairsMaintenance ?? '',
    reserves: initialExpenses.reserves ?? '',
    other: initialExpenses.other ?? '',
  });

  const [capRate, setCapRate] = useState(initialData.capitalizationRate ?? '');

  // --- Calculated Values ---
  const [calculatedEgi, setCalculatedEgi] = useState(0);
  const [calculatedTotalExpenses, setCalculatedTotalExpenses] = useState(0);
  const [calculatedNoi, setCalculatedNoi] = useState(0);
  const [calculatedIndicatedValue, setCalculatedIndicatedValue] = useState(0);

  // --- Input Handlers ---
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? '' : parseFloat(value) || 0; // Allow empty string, parse others
    setExpenses(prev => ({ ...prev, [name]: numericValue }));
    validateField(`income_expense_${name}`, numericValue, ['numerical']); // Validate on change
  };

  const handlePgiChange = (e) => {
    const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
    setPgi(value);
    validateField('income_pgi', value, ['required', 'numerical']);
  };

  const handleVacancyChange = (e) => {
    const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
    setVacancyLoss(value);
    validateField('income_vacancy', value, ['required', 'numerical']);
  };

  const handleCapRateChange = (e) => {
     // Allow percentage input (e.g., "5.5")
    const value = e.target.value;
    setCapRate(value); // Store as string to allow decimals and trailing zeros
    // Validate as numerical, but allow percentage format visually
    validateField('income_capRate', parseFloat(value) || 0, ['required', 'numerical']);
  };


  // --- Calculation Logic ---
  // Use useCallback to memoize calculation logic
  const calculateValues = useCallback(() => {
    const numPgi = parseFloat(pgi) || 0;
    const numVacancyLoss = parseFloat(vacancyLoss) || 0;
    const egi = numPgi - numVacancyLoss;
    setCalculatedEgi(egi);

    const totalExpenses = Object.values(expenses)
      .reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    setCalculatedTotalExpenses(totalExpenses);

    const noi = egi - totalExpenses;
    setCalculatedNoi(noi);

    const numCapRate = parseFloat(capRate) || 0;
    // Handle cap rate as percentage (e.g., 5.5 means 0.055)
    const indicatedValue = numCapRate !== 0 ? noi / (numCapRate / 100) : 0;
    setCalculatedIndicatedValue(indicatedValue);

  }, [pgi, vacancyLoss, expenses, capRate]);

  // Recalculate whenever relevant state changes
  useEffect(() => {
    calculateValues();
  }, [calculateValues]); // Dependency array includes the memoized function


  // --- Save Handler ---
  const handleSave = () => {
    // Define fields to validate
    const fieldsToValidate = {
        income_pgi: { value: pgi, rules: ['required', 'numerical'] },
        income_vacancy: { value: vacancyLoss, rules: ['required', 'numerical'] },
        income_capRate: { value: parseFloat(capRate) || 0, rules: ['required', 'numerical'] }, // Validate the parsed number
        income_expense_realEstateTaxes: { value: expenses.realEstateTaxes, rules: ['numerical'] },
        income_expense_insurance: { value: expenses.insurance, rules: ['numerical'] },
        income_expense_utilities: { value: expenses.utilities, rules: ['numerical'] },
        income_expense_management: { value: expenses.management, rules: ['numerical'] },
        income_expense_repairsMaintenance: { value: expenses.repairsMaintenance, rules: ['numerical'] },
        income_expense_reserves: { value: expenses.reserves, rules: ['numerical'] },
        income_expense_other: { value: expenses.other, rules: ['numerical'] },
    };

    if (validateAll(fieldsToValidate)) {
      const incomeApproachDataToSave = {
        potentialGrossIncome: parseFloat(pgi) || 0,
        vacancyCollectionLoss: parseFloat(vacancyLoss) || 0,
        effectiveGrossIncome: calculatedEgi, // Save calculated EGI
        operatingExpenses: {
          realEstateTaxes: parseFloat(expenses.realEstateTaxes) || 0,
          insurance: parseFloat(expenses.insurance) || 0,
          utilities: parseFloat(expenses.utilities) || 0,
          management: parseFloat(expenses.management) || 0,
          repairsMaintenance: parseFloat(expenses.repairsMaintenance) || 0,
          reserves: parseFloat(expenses.reserves) || 0,
          other: parseFloat(expenses.other) || 0,
          total: calculatedTotalExpenses, // Save calculated total expenses
        },
        netOperatingIncome: calculatedNoi, // Save calculated NOI
        capitalizationRate: parseFloat(capRate) || 0, // Save parsed cap rate
        indicatedValueByIncomeApproach: calculatedIndicatedValue, // Save calculated value
      };

      updateReportData('incomeApproach', incomeApproachDataToSave);
      alert('Income Approach data saved successfully!'); // Simple feedback
      // Consider more sophisticated feedback (e.g., toast notification)
    } else {
      alert('Please fix validation errors before saving.');
      console.log("Validation Errors:", validationErrors); // Log errors for debugging
    }
  };


  // Helper to format currency
  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '$0.00';
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

   // Helper to format percentage
   const formatPercentage = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '0.00%';
    // Show raw input for cap rate editing, format others
    return `${number.toFixed(2)}%`;
   };


  return (
    <div className="income-approach">
      <h2>Income Approach</h2>

      {/* Added Boilerplate Description Placeholder */}
      <p>
        [General description explaining the purpose and methodology of the Income Approach]
      </p>

      <p>
        The Income Capitalization Approach estimates property value by converting anticipated future income into present value. This method was developed as it is particularly relevant for income-generating properties, as it reflects how investors assess value based on expected returns.
      </p>
      <p>
        According to The Dictionary of Real Estate Appraisal, 7th Edition (Appraisal Institute), two primary methods are used in income-based valuation:
      </p>
      <ul>
        <li>
          <strong>Direct Capitalization Method:</strong> A method used to convert an estimate of a single year’s income expectancy into an indication of value in one direct step, either by dividing the net income estimate by an appropriate capitalization rate or by multiplying the income estimate by an appropriate factor. (V = NOI / R)
        </li>
        <li>
          <strong>Discounted Cash Flow (DCF) Method:</strong> The procedure in which a discount rate is applied to a set of projected income streams and a reversion. The analyst specifies the quantity, variability, timing, and duration of the income streams and the quantity and timing of the reversion, and discounts each to its present value at a specified yield rate.
        </li>
      </ul>
      {/* Optional: Add rationale for selected method if needed */}
      {/*
      <h3>Rationale for Selected Method - Discounted Cash Flow</h3>
      <p>
        Given the current state of the subject property—a 19-unit apartment complex undergoing complete renovation after years of vacancy—the Discounted Cash Flow (DCF) Method is the most appropriate valuation approach...
      </p>
      */}
      <p>
        Due to the subject property undergoing renovations and the absence of historical income and expense data resulting from its prolonged vacancy, the appraiser will estimate financial projections based on current market conditions and comparable properties. The following key assumptions will be developed using market data to ensure an accurate valuation:
      </p>
      <ul>
        <li>Market Rent Estimates – Based on comparable apartment rents for similar renovated units.</li>
        <li>Vacancy &amp; Collection Loss – Determined from local multifamily occupancy trends and lease-up projections.</li>
        <li>Operating Expenses – Estimated using regional expense ratios for similar properties.</li>
        <li>Capitalization &amp; Discount Rates – Based on market transactions and investor expectations for multifamily assets in the local area.</li>
        <li>Market Trends &amp; Typical Holding Periods – Holding period assumptions align with investor expectation.</li>
      </ul>
      <p>
        The valuation follows the standard approach to Discounted Cash Flow (DCF) analysis, utilizing unleveraged cash flows to estimate the property's financial performance over a defined holding period. This ensures an objective market valuation by discounting future net operating income and capital expenditures without consideration of specific ownership financing. The resulting present value reflects the property’s intrinsic worth based on expected cash flow and investor return requirements.
      </p>
      <p>
        A detailed market rent analysis, including comparable properties and supporting data for all areas of the income approach, is provided later in this report.
      </p>
      <hr />
      <h3>Income &amp; Expense Analysis</h3>

      <table className="income-approach-table">
        <tbody>
          <tr>
            <td>Potential Gross Income (PGI)</td>
            <td>
              <input
                type="number"
                name="pgi"
                value={pgi}
                onChange={handlePgiChange}
                placeholder="Enter PGI"
                className={validationErrors.income_pgi ? 'error-input' : ''}
              />
              {validationErrors.income_pgi && <span className="error-message">{validationErrors.income_pgi}</span>}
            </td>
          </tr>
          <tr>
            <td>Less: Vacancy &amp; Collection Loss</td>
            <td>
              (<input
                type="number"
                name="vacancyLoss"
                value={vacancyLoss}
                onChange={handleVacancyChange}
                placeholder="Enter Vacancy Loss Amount"
                className={validationErrors.income_vacancy ? 'error-input' : ''}
              />)
              {validationErrors.income_vacancy && <span className="error-message">{validationErrors.income_vacancy}</span>}
            </td>
          </tr>
          <tr className="total-item">
            <td>Effective Gross Income (EGI)</td>
            {/* Display calculated EGI */}
            <td>{formatCurrency(calculatedEgi)}</td>
          </tr>
          <tr>
            <td colSpan="2" className="section-header">Operating Expenses:</td>
          </tr>
          {/* --- Expense Inputs --- */}
          {Object.keys(expenses).map((key) => (
            <tr className="sub-item" key={key}>
              <td>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
              <td>
                <input
                  type="number"
                  name={key}
                  value={expenses[key]}
                  onChange={handleExpenseChange}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                  className={validationErrors[`income_expense_${key}`] ? 'error-input' : ''}
                />
                 {validationErrors[`income_expense_${key}`] && <span className="error-message">{validationErrors[`income_expense_${key}`]}</span>}
              </td>
            </tr>
          ))}
          <tr className="total-item sub-total">
            <td>Total Operating Expenses</td>
            {/* Display calculated Total Expenses */}
            <td>({formatCurrency(calculatedTotalExpenses)})</td>
          </tr>
          <tr className="total-item">
            <td>Net Operating Income (NOI)</td>
            {/* Display calculated NOI */}
            <td>{formatCurrency(calculatedNoi)}</td>
          </tr>
          <tr>
            <td>Capitalization Rate (%)</td>
            <td>
              <input
                type="number" // Keep as number for step/min/max, but handle display/parsing carefully
                step="0.01" // Allow decimals
                name="capRate"
                value={capRate} // Bind to state directly
                onChange={handleCapRateChange}
                placeholder="e.g., 5.5"
                className={validationErrors.income_capRate ? 'error-input' : ''}
              /> %
              {validationErrors.income_capRate && <span className="error-message">{validationErrors.income_capRate}</span>}
            </td>
          </tr>
          <tr className="final-value">
            <td>Indicated Value by Income Approach</td>
            {/* Display calculated Indicated Value */}
            <td>{formatCurrency(calculatedIndicatedValue)}</td>
          </tr>
        </tbody>
      </table>

       {/* --- Save Button --- */}
       <button onClick={handleSave} className="save-button">
         Save Income Approach Data
       </button>

      <h3>Summary of Income Approach</h3>
      <EditableField
        initialContent={reportData.incomeApproachContent ?? '<p>[Enter Income Approach summary narrative here...]</p>'}
        onChange={(newContent) => updateReportData('incomeApproachContent', newContent)}
      />
    </div>
  );
}

export default IncomeApproach;