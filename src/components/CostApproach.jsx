import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext'; // Import ReportContext
import EditableField from './EditableField'; // Import EditableField
import './CostApproach.css';

// Removed data prop
function CostApproach() {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);

  // Placeholder values for display - these should eventually come from context/state
  const siteValue = reportData.costApproach?.siteValue ?? "$250,000";
  const improvementCostNew = reportData.costApproach?.improvementCostNew ?? "$1,800,000";
  const physicalDeterioration = reportData.costApproach?.physicalDeterioration ?? "$450,000";
  const functionalObsolescence = reportData.costApproach?.functionalObsolescence ?? "$100,000";
  const externalObsolescence = reportData.costApproach?.externalObsolescence ?? "$0";
  const totalDepreciation = reportData.costApproach?.totalDepreciation ?? "$550,000";
  const depreciatedCostImprovements = reportData.costApproach?.depreciatedCostImprovements ?? "$1,250,000";
  const asIsMarketValueSiteImprovements = reportData.costApproach?.asIsMarketValueSiteImprovements ?? "$0";
  const indicatedValueByCostApproach = reportData.costApproach?.indicatedValueByCostApproach ?? "$1,450,000";
  // Summary narrative comes from a different context field

  // Basic calculation example (replace with actual logic if needed)
  // Note: In a real app, calculations might be more complex or done elsewhere
  // These calculations should also use context data when available
  // const calculatedTotalDepreciation = parseFloat(costData.physicalDeterioration || 0) + parseFloat(costData.functionalObsolescence || 0) + parseFloat(costData.externalObsolescence || 0);
  // const calculatedDepreciatedCost = parseFloat(costData.improvementCostNew || 0) - calculatedTotalDepreciation;
  // const calculatedIndicatedValue = parseFloat(costData.siteValue || 0) + calculatedDepreciatedCost + parseFloat(costData.asIsMarketValueSiteImprovements || 0);

  return (
    <div className="cost-approach">
      <h2>Cost Approach</h2>

      {/* Added Boilerplate Description Placeholder */}
      <p>
        The Cost Approach was developed to estimate the value of the subject property by determining the current cost to construct a replica of the improvements, less depreciation, plus the land value. This approach is particularly relevant given the property's ongoing renovations.
      </p>
      <hr />
      <p>
        The land value was estimated at $250,000 based on recent sales of comparable sites in the area. The replacement cost of improvements was calculated at $1,800,000 using Marshall & Swift data adjusted for local construction costs.
      </p>
      <p>
        Depreciation was analyzed as follows:
      </p>
      <ul>
        <li><strong>Physical Deterioration:</strong> $450,000 (25% of replacement cost) accounting for the building's age and condition prior to renovation</li>
        <li><strong>Functional Obsolescence:</strong> $100,000 (5.5% of replacement cost) for outdated systems being replaced</li>
        <li><strong>External Obsolescence:</strong> None - the property is in a stable market area</li>
      </ul>
      <p>
        The total depreciation of $550,000 results in a depreciated improvement value of $1,250,000. When added to the land value, this indicates a property value of $1,450,000 via the Cost Approach.
      </p>
      <hr />
      <h3>Cost Breakdown</h3>

      <table className="cost-approach-table">
        <tbody>
          <tr>
            <td>Estimated Site Value</td>
            <td>{siteValue}</td>
          </tr>
          <tr>
            <td>Estimated Cost New of Improvements</td>
            <td>{improvementCostNew}</td>
          </tr>
          <tr className="sub-item">
            <td>Less: Physical Deterioration</td>
            <td>({physicalDeterioration})</td>
          </tr>
          <tr className="sub-item">
            <td>Less: Functional Obsolescence</td>
            <td>({functionalObsolescence})</td>
          </tr>
          <tr className="sub-item">
            <td>Less: External Obsolescence</td>
            <td>({externalObsolescence})</td>
          </tr>
          <tr className="total-item">
            <td>Total Depreciation</td>
            <td>({totalDepreciation})</td>
          </tr>
          <tr>
            <td>Depreciated Cost of Improvements</td>
            <td>{depreciatedCostImprovements}</td>
          </tr>
          <tr>
            <td>Estimated "As Is" Market Value of Site Improvements</td>
            <td>{asIsMarketValueSiteImprovements}</td>
          </tr>
          <tr className="final-value">
            <td>Indicated Value by Cost Approach</td>
            <td>{indicatedValueByCostApproach}</td>
          </tr>
        </tbody>
      </table>

      <h3>Summary of Cost Approach</h3>
      <EditableField
        initialContent={reportData.costApproachContent ?? `
          <p>The Cost Approach indicates a value of $1,450,000 for the subject property. This conclusion is supported by:</p>
          <ul>
            <li>Land value derived from comparable vacant land sales</li>
            <li>Replacement cost based on Marshall & Swift data for Class C masonry construction</li>
            <li>Depreciation analysis reflecting the property's pre-renovation condition</li>
          </ul>
          <p>While the Cost Approach provides a useful benchmark, it was given less weight than the Sales Comparison Approach in the final reconciliation due to the availability of strong comparable sales data.</p>
        `}
        onChange={(newContent) => updateReportData('costApproachContent', newContent)}
      />
    </div>
  );
}

export default CostApproach;