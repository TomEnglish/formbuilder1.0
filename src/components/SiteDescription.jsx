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
        <div className="detail-item"><span className="detail-label">Address:</span> <span className="detail-value">2221 Oak Park Blvd, Lake Charles, LA 70601</span></div>
        <div className="detail-item"><span className="detail-label">Parcel #:</span> <span className="detail-value">00431036</span></div>
        <div className="detail-item"><span className="detail-label">Site Area:</span> <span className="detail-value">33,360 SF (0.766 acres)</span></div>
        <div className="detail-item"><span className="detail-label">Zoning Classification:</span> <span className="detail-value">(MU) Mixed Use & (RES) Residential</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Water:</span> <span className="detail-value">Public</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Sewer:</span> <span className="detail-value">Public</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Electric:</span> <span className="detail-value">Available</span></div>
        <div className="detail-item"><span className="detail-label">Utilities - Gas:</span> <span className="detail-value">Available</span></div>
      </div>

      <h3>Narrative Description</h3>
      <EditableField
        // Use context for value and change handling
        initialContent={reportData.siteDescriptionNarrative || `
          <p>The subject property is located at 2221 Oak Park Blvd, Lake Charles, Louisiana, within Calcasieu Parish. Lake Charles is a major city in southwestern Louisiana, serving as a regional hub for commerce, industry, and entertainment.</p>
          <p>The property is situated in a mixed-use and residential area characterized predominantly by single-family residences, with commercial properties concentrated along major roadways like Oak Park Blvd. The neighborhood features adequate fire and police protection as well as typical utility access.</p>
          <p>The property benefits from excellent accessibility via Oak Park Blvd, a primary thoroughfare providing direct access to nearby services and connecting with larger arterial roads in the region. Nearby amenities include Oak Park Elementary and Middle School, Lake Charles Memorial Hospital, and various retail establishments.</p>
          <p>Lake Charles serves as a regional hub for petrochemical, manufacturing, and port-related industries, with a growing emphasis on professional services. Major transportation routes including Interstate 10, Interstate 210, and Highway 171 support regional connectivity and facilitate industrial growth.</p>
        `}
        onChange={(newContent) => updateReportData('siteDescriptionNarrative', newContent)}
      />

    </div>
  );
}

export default SiteDescription;