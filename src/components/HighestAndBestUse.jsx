import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext'; // Import ReportContext
import EditableField from './EditableField'; // Import EditableField
import './HighestAndBestUse.css';

// Removed data prop
function HighestAndBestUse() {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);

  // Boilerplate content including definition and analysis structure
  const defaultHabuContent = `<p>A property must be appraised in terms of its highest and best use. According to The Dictionary of Real Estate Appraisal, 7th Edition (Appraisal Institute), highest and best use is defined as:</p><blockquote><p>“The reasonably probable use of property that results in the highest value. The four criteria that the highest and best use must meet are legal permissibility, physical possibility, financial feasibility, and maximum productivity.”</p></blockquote><p>The highest and best use of both land as though vacant and property as improved must meet four criteria. The highest and best use must be: 1) physically possible, 2) legally permissible, 3) financially feasible, and 4) maximally productive. The maximally productive use of the site is generally considered the highest and best use as of the appraisal date.</p><hr /><h3>As Vacant</h3><p><strong>Legally Permissible:</strong> The property is zoned (MU) Mixed Use & (RES) Residential, which permits multiple residence development.</p><p><strong>Physically Possible:</strong> The 0.766 acre site with dimensions of 160' x 208.5' can physically accommodate multi-residence development.</p><p><strong>Financially Feasible:</strong> Market analysis indicates strong demand for multi-family housing in this area of Lake Charles.</p><p><strong>Maximally Productive:</strong> Multiple Residence or Mix-Use Development would generate the highest return on investment for this site.</p><h3>As Improved</h3><p><strong>Legally Permissible:</strong> The existing 19-unit apartment complex complies with current zoning regulations.</p><p><strong>Physically Possible:</strong> The masonry structure is sound and suitable for continued residential use.</p><p><strong>Financially Feasible:</strong> The renovated units will command market rents that support the investment.</p><p><strong>Maximally Productive:</strong> Continued Use as Multiple Residence represents the most profitable use given the existing improvements.</p><h3>Conclusion</h3><p>The highest and best use of the subject property as vacant is Multiple Residence or Mix-Use Development, and as improved is Continued Use as Multiple Residence. This conclusion is supported by the property's zoning, physical characteristics, market conditions, and financial analysis.</p>`;

  return (
    <div className="highest-best-use">
      <h2>Highest and Best Use</h2>
      <EditableField
        initialContent={reportData.highestAndBestUseContent ?? defaultHabuContent}
        onChange={(newContent) => updateReportData('highestAndBestUseContent', newContent)}
      />
    </div>
  );
}

export default HighestAndBestUse;