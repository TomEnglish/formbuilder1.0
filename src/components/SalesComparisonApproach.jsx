import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext'; // Import ReportContext
import EditableField from './EditableField';
import './SalesComparisonApproach.css';

// Helper function to generate a simple key from a field name
const generateKey = (fieldName) => {
  return fieldName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/adj$/, 'adjustment');
};

// Accept data prop (narrative props removed)
function SalesComparisonApproach({ data }) {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);

  const fields = [
    "Address", "Sale Price", "Sale Date", "Gross Living Area (GLA)",
    "Site Size", "Age/Condition", "Location Adj.", "Condition Adj.",
    "Features Adj.", "Adjusted Sale Price per SqFt", "Final Adjusted Sale Price"
  ];
  // Assuming Subject is always the first column conceptually
  const columns = ["Subject Property", "123 Main St", "456 Oak Ave", "789 Pine Blvd"];

  // Placeholder: In a real scenario, comparableSales would be part of the 'data' prop
  // e.g., const comparableSales = data?.comparableSales || [];
  // e.g., const subjectData = data?.subjectProperty || {};

  return (
    <section className="sales-comparison-approach">
      <h2>Sales Comparison Approach</h2>
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
                    const value = data?.[rowIndexForData]?.[fieldKey] ??
                      (field === "Address" ? columns[colIndex] :
                      field === "Sale Price" ? (colIndex === 0 ? "N/A" : ["$1,250,000", "$1,100,000", "$1,350,000"][colIndex-1]) :
                      field === "Sale Date" ? (colIndex === 0 ? "N/A" : ["10/15/2024", "08/22/2024", "12/05/2024"][colIndex-1]) :
                      field === "Gross Living Area (GLA)" ? (colIndex === 0 ? "23,932" : ["22,500", "20,800", "25,100"][colIndex-1]) :
                      field === "Site Size" ? (colIndex === 0 ? "0.766 acres" : ["0.82 acres", "0.70 acres", "0.95 acres"][colIndex-1]) :
                      field === "Age/Condition" ? (colIndex === 0 ? "Renovated" : ["Original", "Original", "Partial Renovation"][colIndex-1]) :
                      field === "Location Adj." ? (colIndex === 0 ? "N/A" : ["+5%", "+0%", "-5%"][colIndex-1]) :
                      field === "Condition Adj." ? (colIndex === 0 ? "N/A" : ["+15%", "+15%", "+10%"][colIndex-1]) :
                      field === "Features Adj." ? (colIndex === 0 ? "N/A" : ["+5%", "+0%", "+5%"][colIndex-1]) :
                      field === "Adjusted Sale Price per SqFt" ? (colIndex === 0 ? "N/A" : ["$62.50", "$63.46", "$60.56"][colIndex-1]) :
                      field === "Final Adjusted Sale Price" ? (colIndex === 0 ? "$1,450,000" : ["$1,406,250", "$1,320,000", "$1,519,500"][colIndex-1]) :
                      `[${columns[colIndex]} ${fieldKey}]`);

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
      />
    </section>
  );
}

export default SalesComparisonApproach;