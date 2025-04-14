import React from 'react'; // Removed useState import
import EditableField from './EditableField';
import './SiteDescription.css'; // Import the CSS file

// Accept props from App.jsx
function SiteDescription({ data, narrativeContent, onNarrativeChange }) { // Add data prop
  // Local state and handler removed, using props now

  // Removed local siteDetailsData object
  // Use data from props with fallbacks for detail fields
  const siteArea = data?.siteArea ?? "[Site Area]";
  const zoningClassification = data?.zoningClassification ?? "[Zoning]";
  const zoningCompliance = data?.zoningCompliance ?? "[Compliance]";
  const utilitiesWater = data?.utilitiesWater ?? "[Water]";
  const utilitiesSewer = data?.utilitiesSewer ?? "[Sewer]";
  const utilitiesElectric = data?.utilitiesElectric ?? "[Electric]";
  const utilitiesGas = data?.utilitiesGas ?? "[Gas]";
  const floodZoneInfo = data?.floodZoneInfo ?? "[Flood Zone]";


  return (
    <div className="site-description-section">
      <h2>Site Description</h2>

      <h3>Site Details</h3>
      <div className="site-details">
        {/* Use data from props */}
        <div className="detail-item"><span className="detail-label">Site Area:</span> <span className="detail-value">{siteArea}</span></div>
        <div className="detail-item"><span className="detail-label">Zoning Classification:</span> <span className="detail-value">{zoningClassification}</span></div>
        <div className="detail-item"><span className="detail-label">Zoning Compliance:</span> <span className="detail-value">{zoningCompliance}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Water:</span> <span className="detail-value">{utilitiesWater}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Sewer:</span> <span className="detail-value">{utilitiesSewer}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Electric:</span> <span className="detail-value">{utilitiesElectric}</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Gas:</span> <span className="detail-value">{utilitiesGas}</span></div>
        <div className="detail-item"><span className="detail-label">Flood Zone Information:</span> <span className="detail-value">{floodZoneInfo}</span></div>
      </div>

      <h3>Narrative Description</h3>
      <EditableField
        // Use props for content and change handling
        initialContent={narrativeContent}
        onChange={onNarrativeChange}
      />

    </div>
  );
}

export default SiteDescription;