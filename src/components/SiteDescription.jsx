import React, { useContext } from 'react'; // Import useContext
import EditableField from './EditableField';
import { ReportContext } from '../context/ReportDataContext.jsx'; // Import ReportContext
import './SiteDescription.css'; // Import the CSS file

// Removed props: data, narrativeContent, onNarrativeChange
function SiteDescription() {
  // Get reportData and update function from context
  const { reportData, updateReportData } = useContext(ReportContext);

  // Removed prop-based destructuring

  return (
    <div className="site-description-section">
      <h2>Site Description</h2>

      <h3>Site Details</h3>
      <div className="site-details">
        {/* Use data from context */}
        <div className="detail-item"><span className="detail-label">Site Area:</span> <span className="detail-value">{reportData.siteArea || '[Site Area]'}</span></div>
        <div className="detail-item"><span className="detail-label">Zoning Classification:</span> <span className="detail-value">{reportData.zoningClassification || '[Zoning]'}</span></div>
        <div className="detail-item"><span className="detail-label">Zoning Compliance:</span> <span className="detail-value">{reportData.zoningCompliance || '[Compliance]'}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Water:</span> <span className="detail-value">{reportData.utilitiesWater || '[Water]'}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Sewer:</span> <span className="detail-value">{reportData.utilitiesSewer || '[Sewer]'}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Electric:</span> <span className="detail-value">{reportData.utilitiesElectric || '[Electric]'}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Gas:</span> <span className="detail-value">{reportData.utilitiesGas || '[Gas]'}</span></div>
        <div className="detail-item"><span className="detail-label">Flood Zone Information:</span> <span className="detail-value">{reportData.floodZoneInfo || '[Flood Zone]'}</span></div>
      </div>

      <h3>Narrative Description</h3>
      <EditableField
        // Use context for value and change handling
        value={reportData.siteDescriptionNarrative || ''}
        onChange={(newContent) => updateReportData('siteDescriptionNarrative', newContent)}
      />

    </div>
  );
}

export default SiteDescription;