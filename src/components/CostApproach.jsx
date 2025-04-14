import React from 'react';
import './CostApproach.css';

// Accept data as a prop
function CostApproach({ data }) {
  // Removed the hardcoded costData object

  // Use default values directly in JSX if data or specific cost fields are missing
  // Assuming cost data might be nested under a key like 'costApproach' in the future
  const costApproachData = data?.costApproach ?? {};
  const siteValue = costApproachData.siteValue ?? "[Est. Site Value]";
  const improvementCostNew = costApproachData.improvementCostNew ?? "[Est. Cost New]";
  const physicalDeterioration = costApproachData.physicalDeterioration ?? "[Phys. Deterioration]";
  const functionalObsolescence = costApproachData.functionalObsolescence ?? "[Func. Obsolescence]";
  const externalObsolescence = costApproachData.externalObsolescence ?? "[Ext. Obsolescence]";
  const totalDepreciation = costApproachData.totalDepreciation ?? "[Total Depreciation]";
  const depreciatedCostImprovements = costApproachData.depreciatedCostImprovements ?? "[Depr. Cost Impr.]";
  const asIsMarketValueSiteImprovements = costApproachData.asIsMarketValueSiteImprovements ?? "[As Is Site Impr.]";
  const indicatedValueByCostApproach = costApproachData.indicatedValueByCostApproach ?? "[Indicated Value]";
  const summary = costApproachData.summary ?? "[Summary narrative...]";

  // Basic calculation example (replace with actual logic if needed)
  // Note: In a real app, calculations might be more complex or done elsewhere
  // const calculatedTotalDepreciation = parseFloat(costData.physicalDeterioration || 0) + parseFloat(costData.functionalObsolescence || 0) + parseFloat(costData.externalObsolescence || 0);
  // const calculatedDepreciatedCost = parseFloat(costData.improvementCostNew || 0) - calculatedTotalDepreciation;
  // const calculatedIndicatedValue = parseFloat(costData.siteValue || 0) + calculatedDepreciatedCost + parseFloat(costData.asIsMarketValueSiteImprovements || 0);

  return (
    <div className="cost-approach">
      <h2>Cost Approach</h2>

      {/* Added Boilerplate Description Placeholder */}
      <p>
        [General description explaining the purpose and methodology of the Cost Approach]
      </p>
      <hr /> {/* Optional: Add a separator */}


      <p>
        The Cost Approach is based on the principle that a property's value can be determined by adding the land value to the current cost of constructing a replacement for the improvements, then deducting accrued depreciation from physical deterioration, functional obsolescence, or external obsolescence. This method is particularly useful for properties that are new, recently renovated, or not frequently transacted in the market.
      </p>
      <p>
        This analysis is based on the concept of replacement cost. According to The Dictionary of Real Estate Appraisal, 7th Edition (Appraisal Institute), replacement cost is defined as: “The estimated cost to construct, at current prices as of a specific date, a substitute for building or other improvements, using modern materials and current standards, design, and layout.”
      </p>
      <p>
        The subject property is undergoing a complete renovation, with all major components being repaired or replaced. Given this, the Cost Approach is appropriate, as it reflects the cost to reconstruct the subject’s improvements to a new or like-new condition. Since this valuation is subject to the completion of renovations, the analysis provides insight into the relationship between replacement cost and market value, accounting for depreciation and any remaining obsolescence.
      </p>
      <p>
        To ensure accuracy, replacement cost estimates were derived from multiple industry sources:
      </p>
      <ul>
        <li>Conversations with Contractors and Architects – Real-time data on material costs, labor expenses, and current industry trends from professionals actively involved in construction.</li>
        <li>Discussions with Investors, Managers, Owners, and Operators – Perspectives on development costs, operational considerations, and market expectations for similar properties.</li>
        <li>Marshall Valuation Service Data – Standardized replacement and reproduction cost figures from Marshall Valuation Service, a widely recognized cost guide published by Marshall &amp; Swift.</li>
      </ul>
      <p>
        The Cost Calculator section of the Marshall Valuation Service provides base costs for the subject's improvements, which are detailed in the following analysis.
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
      <p>{summary}</p>
    </div>
  );
}

export default CostApproach;