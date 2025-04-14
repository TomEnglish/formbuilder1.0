import React from 'react';
import './IncomeApproach.css';

// Accept data as a prop
function IncomeApproach({ data }) {
  // Removed the hardcoded incomeData object

  // Use default values directly in JSX if data or specific income fields are missing
  // Assuming income data might be nested under a key like 'incomeApproach' in the future
  const incomeApproachData = data?.incomeApproach ?? {};
  const potentialGrossIncome = incomeApproachData.potentialGrossIncome ?? "[PGI]";
  const vacancyCollectionLoss = incomeApproachData.vacancyCollectionLoss ?? "[V&amp;C Loss]";
  const effectiveGrossIncome = incomeApproachData.effectiveGrossIncome ?? "[EGI]";
  const operatingExpenses = incomeApproachData.operatingExpenses ?? {};
  const netOperatingIncome = incomeApproachData.netOperatingIncome ?? "[NOI]";
  const capitalizationRate = incomeApproachData.capitalizationRate ?? "[Cap Rate]";
  const indicatedValueByIncomeApproach = incomeApproachData.indicatedValueByIncomeApproach ?? "[Indicated Value]";
  const summary = incomeApproachData.summary ?? "[Summary narrative...]";

  // Basic calculation examples (replace with actual logic)
  // const calculatedEGI = parseFloat(incomeData.potentialGrossIncome || 0) - parseFloat(incomeData.vacancyCollectionLoss || 0); // Simplified
  // const calculatedTotalExpenses = /* Sum of expense items */;
  // const calculatedNOI = calculatedEGI - calculatedTotalExpenses;
  // const calculatedIndicatedValue = calculatedNOI / (parseFloat(incomeData.capitalizationRate || 1) / 100); // Avoid division by zero

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
            <td>{potentialGrossIncome}</td>
          </tr>
          <tr>
            <td>Less: Vacancy &amp;amp; Collection Loss</td>
            <td>({vacancyCollectionLoss})</td>
          </tr>
          <tr className="total-item">
            <td>Effective Gross Income (EGI)</td>
            <td>{effectiveGrossIncome}</td>
          </tr>
          <tr>
            <td colSpan="2" className="section-header">Operating Expenses:</td>
          </tr>
          <tr className="sub-item">
            <td>Real Estate Taxes</td>
            <td>{operatingExpenses.realEstateTaxes ?? "[Taxes]"}</td>
          </tr>
          <tr className="sub-item">
            <td>Insurance</td>
            <td>{operatingExpenses.insurance ?? "[Insurance]"}</td>
          </tr>
          <tr className="sub-item">
            <td>Utilities</td>
            <td>{operatingExpenses.utilities ?? "[Utilities]"}</td>
          </tr>
          <tr className="sub-item">
            <td>Management</td>
            <td>{operatingExpenses.management ?? "[Mgmt]"}</td>
          </tr>
          <tr className="sub-item">
            <td>Repairs &amp;amp; Maintenance</td>
            <td>{operatingExpenses.repairsMaintenance ?? "[Repairs]"}</td>
          </tr>
          <tr className="sub-item">
            <td>Reserves for Replacement</td>
            <td>{operatingExpenses.reserves ?? "[Reserves]"}</td>
          </tr>
          <tr className="sub-item">
            <td>Other</td>
            <td>{operatingExpenses.other ?? "[Other]"}</td>
          </tr>
          <tr className="total-item sub-total">
            <td>Total Operating Expenses</td>
            <td>({operatingExpenses.total ?? "[Total Exp.]"})</td>
          </tr>
          <tr className="total-item">
            <td>Net Operating Income (NOI)</td>
            <td>{netOperatingIncome}</td>
          </tr>
          <tr>
            <td>Capitalization Rate</td>
            <td>{capitalizationRate}</td>
          </tr>
          <tr className="final-value">
            <td>Indicated Value by Income Approach</td>
            <td>{indicatedValueByIncomeApproach}</td>
          </tr>
        </tbody>
      </table>

      <h3>Summary of Income Approach</h3>
      <p>{summary}</p>
    </div>
  );
}

export default IncomeApproach;