import React from 'react';
import './ValuationMethodology.css'; // We'll create this

function ValuationMethodology() {
  return (
    <div className="valuation-methodology section">
      <h2>The Three Approaches To Value</h2>
      <p>
        Appraisers traditionally consider three primary approaches to value: the Sales Comparison Approach, the Cost Approach, and the Income Capitalization Approach. Each approach provides a unique perspective on market value and is applied based on the property’s characteristics and the availability of market data.
      </p>

      <h3>Sales Comparison Approach</h3>
      <p>
        The Sales Comparison Approach estimates market value by analyzing recent sales of similar properties, reflecting the principle of substitution: a buyer would not pay more for a property than the cost of acquiring a comparable alternative. This approach is market-driven and widely applicable when reliable data on comparable sales is available. The process involves:
      </p>
      <ul>
        <li>Data Collection and Market Analysis: Relevant market data is gathered from sources such as MLS, CoStar, proprietary databases, and public records. Market trends, buyer motivations, and conditions are analyzed for context.</li>
        <li>Selection of Comparables: Comparable properties are selected based on location, size, use, condition, and other relevant factors to ensure market relevance.</li>
        <li>Adjustment Process: Adjustments are made for differences in property rights, financing terms, market conditions, and physical attributes. These adjustments ensure that the comparables accurately reflect the subject property's value.</li>
      </ul>

      <h3>Cost Approach</h3>
      <p>
        The Cost Approach derives value by estimating the cost to replace or reproduce the property’s improvements, less depreciation, plus the value of the land. This approach is particularly effective for newer properties or those with minimal depreciation and provides additional support when market data is limited. The process involves:
      </p>
      <ul>
        <li>Estimating replacement or reproduction costs using cost guides, such as Marshall and Swift, and consultations with local builders or contractors.</li>
        <li>Subtracting accrued depreciation, including physical, functional, and external obsolescence.</li>
        <li>Adding the value of the land, typically determined through market analysis of comparable sites.</li>
      </ul>

      <h3>Income Approach</h3>
      <p>
        The Income Capitalization Approach values a property based on its income-generating potential, emphasizing that market value is tied to current or expected income. It is primarily used for income-producing properties like rentals or commercial buildings. The method captures profitability and investor expectations, employing techniques based on property type, income characteristics, and investor preferences. This process involves utilization of the following methods:
      </p>
      <ul>
        <li>Direct Capitalization Method: Estimates value by applying a market-derived capitalization rate (cap rate) to the property’s net operating income (NOI). The cap rate reflects expected return, determined by analyzing comparable sales, market conditions, and investor behavior.</li>
        <li>Discounted Cash Flow (DCF) Analysis: Projects future cash flows over a holding period (typically 5-10 years), including income, expenses, and sale proceeds, then discounts them to present value using a discount rate that reflects risk and market conditions.</li>
      </ul>

      <h3>Value Reconciliation</h3>
      <p>
        The final opinion of value is typically derived by reconciling the results of the applicable approaches. The most reliable method is prioritized based on the property’s characteristics and market data availability. Each approach is weighted based on its relevance and the quality of available data to provide a credible and supported opinion of market value.
      </p>
    </div>
  );
}

export default ValuationMethodology;