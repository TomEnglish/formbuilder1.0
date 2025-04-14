import React from 'react';
import './HighestAndBestUse.css';

// Accept data as a prop
function HighestAndBestUse({ data }) {
  // Removed the hardcoded habuData object

  // Use default values directly in JSX if data or specific HBU fields are missing
  // Assuming HBU data might be nested under keys like 'habuAsVacant', 'habuAsImproved', 'habuConclusion' in the future
  const habuAsVacant = data?.habuAsVacant ?? {};
  const habuAsImproved = data?.habuAsImproved ?? {};
  const habuConclusion = data?.habuConclusion ?? "[Overall Highest and Best Use conclusion]";

  return (
    <div className="highest-best-use">
      <h2>Highest and Best Use</h2>

      <p>
        A property must be appraised in terms of its highest and best use. According to The Dictionary of Real Estate Appraisal, 7th Edition (Appraisal Institute), highest and best use is defined as:
      </p>
      <blockquote className="definition-quote">
        “The reasonably probable use of property that results in the highest value. The four criteria that the highest and best use must meet are legal permissibility, physical possibility, financial feasibility, and maximum productivity.”
      </blockquote>
      <p>
        The highest and best use of both land as though vacant and property as improved must meet four criteria. The highest and best use must be: 1) physically possible, 2) legally permissible, 3) financially feasible, and 4) maximally productive. The maximally productive use of the site is generally considered the highest and best use as of the appraisal date.
      </p>
      <hr />

      <h3>As Vacant</h3>
      {/* Use data from props with fallbacks */}
      <p><strong>Legally Permissible:</strong> {habuAsVacant.legallyPermissible ?? "[Analysis...]"}</p>
      <p><strong>Physically Possible:</strong> {habuAsVacant.physicallyPossible ?? "[Analysis...]"}</p>
      <p><strong>Financially Feasible:</strong> {habuAsVacant.financiallyFeasible ?? "[Analysis...]"}</p>
      <p><strong>Maximally Productive:</strong> {habuAsVacant.maximallyProductive ?? "[Conclusion...]"}</p>

      <h3>As Improved</h3>
      <p><strong>Legally Permissible:</strong> {habuAsImproved.legallyPermissible ?? "[Analysis...]"}</p>
      <p><strong>Physically Possible:</strong> {habuAsImproved.physicallyPossible ?? "[Analysis...]"}</p>
      <p><strong>Financially Feasible:</strong> {habuAsImproved.financiallyFeasible ?? "[Analysis...]"}</p>
      <p><strong>Maximally Productive:</strong> {habuAsImproved.maximallyProductive ?? "[Conclusion...]"}</p>

      <h3>Conclusion</h3>
      <p>{habuConclusion}</p>
    </div>
  );
}

export default HighestAndBestUse;