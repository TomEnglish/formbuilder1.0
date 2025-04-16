import React, { useContext } from 'react'; // Import useContext
import EditableField from './EditableField';
import { ReportContext } from '../context/ReportDataContext.jsx'; // Import ReportContext
import { ValidationContext } from '../context/ValidationContext.jsx'; // Import ValidationContext
import './SiteDescription.css'; // Import the CSS file

// Removed props: data, narrativeContent, onNarrativeChange
function SiteDescription() {
  // Get reportData and update function from context
  const { reportData, updateReportData } = useContext(ReportContext);
  // Get validation functions and errors from context
  const { validateField, validationErrors } = useContext(ValidationContext);

  // Removed prop-based destructuring

  return (
    <div id="siteDescription" className="site-description-section">
      <h2>Site Description</h2>

      <h3>Site Details</h3>
      <div className="site-details">
        {/* Use data from context */}
        {/* Note: Address and Parcel # are static for now as per original code */}
        <div className="detail-item"><span className="detail-label">Address:</span> <span className="detail-value">2221 Oak Park Blvd, Lake Charles, LA 70601</span></div>
        <div className="detail-item"><span className="detail-label">Parcel #:</span> <span className="detail-value">00431036</span></div>
        <div className="detail-item">
          <label htmlFor="siteArea" className="detail-label">Site Area:</label>
          <input
            type="text"
            id="siteArea"
            name="siteArea"
            className="detail-value"
            value={reportData.siteArea || ''}
            onChange={(e) => {
              const { name, value } = e.target;
              updateReportData(name, value);
              validateField(name, value, ['numerical']); // Apply numerical validation
            }}
          />
          {validationErrors.siteArea && <div className="error-message">{validationErrors.siteArea}</div>}
        </div>
        <div className="detail-item">
          <label htmlFor="zoningClassification" className="detail-label">Zoning Classification:</label>
          <input
            type="text"
            id="zoningClassification"
            name="zoningClassification"
            className="detail-value"
            value={reportData.zoningClassification || ''}
            onChange={(e) => {
              const { name, value } = e.target;
              updateReportData(name, value);
              validateField(name, value, ['required']); // Apply required validation
            }}
          />
          {validationErrors.zoningClassification && <div className="error-message">{validationErrors.zoningClassification}</div>}
        </div>
        <div className="detail-item">
          <label htmlFor="utilitiesWater" className="detail-label">Utilities - Water:</label>
          <input
            type="text"
            id="utilitiesWater"
            name="utilitiesWater"
            className="detail-value"
            value={reportData.utilitiesWater || ''}
            onChange={(e) => updateReportData('utilitiesWater', e.target.value)}
          />
          {/* No specific validation requested */}
        </div>
        <div className="detail-item">
          <label htmlFor="utilitiesSewer" className="detail-label">Utilities - Sewer:</label>
          <input
            type="text"
            id="utilitiesSewer"
            name="utilitiesSewer"
            className="detail-value"
            value={reportData.utilitiesSewer || ''}
            onChange={(e) => updateReportData('utilitiesSewer', e.target.value)}
          />
          {/* No specific validation requested */}
        </div>
        <div className="detail-item">
          <label htmlFor="utilitiesElectric" className="detail-label">Utilities - Electric:</label>
          <input
            type="text"
            id="utilitiesElectric"
            name="utilitiesElectric"
            className="detail-value"
            value={reportData.utilitiesElectric || ''}
            onChange={(e) => updateReportData('utilitiesElectric', e.target.value)}
          />
          {/* No specific validation requested */}
        </div>
        <div className="detail-item">
          <label htmlFor="utilitiesGas" className="detail-label">Utilities - Gas:</label>
          <input
            type="text"
            id="utilitiesGas"
            name="utilitiesGas"
            className="detail-value"
            value={reportData.utilitiesGas || ''}
            onChange={(e) => updateReportData('utilitiesGas', e.target.value)}
          />
          {/* No specific validation requested */}
        </div>
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