import React from 'react';
import EditableField from './EditableField';
import './SalesComparisonApproach.css';

// Helper function to generate a simple key from a field name
const generateKey = (fieldName) => {
  return fieldName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/adj$/, 'adjustment');
};

// Accept data and narrative props
function SalesComparisonApproach({ data, narrativeContent, onNarrativeChange }) {
  const fields = [
    "Address", "Sale Price", "Sale Date", "Gross Living Area (GLA)",
    "Site Size", "Age/Condition", "Location Adj.", "Condition Adj.",
    "Features Adj.", "Adjusted Sale Price per SqFt", "Final Adjusted Sale Price"
  ];
  // Assuming Subject is always the first column conceptually
  const columns = ["Subject Property", "Comparable Sale 1", "Comparable Sale 2", "Comparable Sale 3"];

  // Placeholder: In a real scenario, comparableSales would be part of the 'data' prop
  // e.g., const comparableSales = data?.comparableSales || [];
  // e.g., const subjectData = data?.subjectProperty || {};

  return (
    <section className="sales-comparison-approach">
      <h2>Sales Comparison Approach</h2>
      <p>
        [General description explaining the purpose and methodology of the Sales Comparison Approach]
      </p>
      <p>
        The Sales Comparison Approach was employed to estimate the market value of the subject property by analyzing recent sales of comparable properties, following the principle of substitution: a rational buyer would not pay more for a property than the cost of acquiring a comparable alternative. This approach provides a reliable indicator of value, reflecting current market trends, buyer and seller behavior, and the subject’s market positioning.
      </p>
      <p>
        The subject property is a multifamily apartment complex undergoing a full renovation, replacing most major components. Comparable sales were selected based on similar construction characteristics, market influences, gross building area, and overall condition to ensure an accurate valuation.
      </p>
      <p>
        Adjustments were made to the comparable sales to account for differences in location, use, condition, and other relevant factors, ensuring a credible and market-supported valuation of the subject property upon completion of renovations. Land-to-building ratios were also considered, with adjustments made to reflect the impact of additional land utility and its contribution to overall property value.
      </p>
      <p>
        Maps, photographs of the comparable sales, and detailed adjustment grids are included later in the report to substantiate the valuation conclusions.
      </p>
      <p>
        The process for developing this approach included:
      </p>
      <ul>
        <li>Data Collection and Market Analysis: Sales data was collected from multiple sources, including MLS, CoStar, proprietary databases, public records, and local brokers. Current market trends, buyer motivations, and regional economic conditions were analyzed to ensure data relevance.</li>
        <li>Selection of Comparables: Properties were selected based on their relevance to the subject property, considering factors such as location, property type, size, and zoning. Separate sets of comparables were identified for improved and vacant land analyses.</li>
        <li>Adjustment Process: Adjustments were applied to account for differences in property rights, financing terms, market conditions, and physical characteristics. These adjustments ensure that each comparable accurately reflects the subject property’s market value.</li>
      </ul>
      <p>
        The Sales Comparison Approach is particularly applicable to the subject property due to the availability of market data and its alignment with market participant behavior. This method provides a clear, market-oriented value conclusion and serves as the foundation for both improved property and land valuation in this report.
      </p>
      <p>
        A detailed market rent analysis, including comparable properties and supporting data, is provided later in this report.
      </p>
      <hr />
      <h3>Sales Comparison Grid</h3>

      <div className="sca-grid-container">
        <table className="sca-table">
          <thead>
            <tr>
              <th>Feature</th>
              {columns.map((colName, index) => (
                <th key={index}>{colName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, rowIndex) => {
              const fieldKey = generateKey(field); // Generate a key like 'address', 'sale_price'
              return (
                <tr key={rowIndex}>
                  <td className="feature-label">{field}</td>
                  {columns.map((colName, colIndex) => {
                    // Placeholder logic: Try to get data if it existed
                    // For Subject (colIndex 0), look in data?.subjectProperty?.[fieldKey]
                    // For Comps (colIndex > 0), look in data?.comparableSales?.[colIndex-1]?.[fieldKey]
                    // Access data based on the array structure passed from App.jsx
                    // Subject is data[0], Comp 1 is data[1], Comp 2 is data[2], etc.
                    const rowIndexForData = colIndex; // 0 for Subject, 1 for Comp1, etc.
                    const value = data?.[rowIndexForData]?.[fieldKey] ?? `[${columns[colIndex]} ${fieldKey}]`;

                    return (
                      <td key={`${rowIndex}-${colIndex}`}>
                        {/* Display the value directly, not using EditableField here */}
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3>Summary of Sales Comparison Approach</h3>
      <EditableField
        initialContent={narrativeContent ?? '<p>[Enter Sales Comparison Approach summary narrative here...]</p>'}
        onChange={onNarrativeChange}
      />
    </section>
  );
}

export default SalesComparisonApproach;