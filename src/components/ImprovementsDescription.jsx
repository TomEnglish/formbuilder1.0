import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext.jsx'; // Import ReportContext
import EditableField from './EditableField';
import './ImprovementsDescription.css';

// Removed props: data, narrativeContent, onNarrativeChange
function ImprovementsDescription() {
  // Get data and update function from context
  const { reportData, updateReportData } = useContext(ReportContext);

  // Removed old destructuring block that used the 'data' prop

  return (
    <div id="improvementsDescription" className="improvements-description-section section">
      <h2>Improvements Description</h2>

      <h3>Improvement Details</h3>
      <div className="form-grid">
        {/* Read details directly from reportData context */}
        <div className="detail-item"><span className="detail-label">Building Class:</span> <span className="detail-value">352 - Multiple Residence (Low Rise)</span></div>
        <div className="detail-item"><span className="detail-label">Construction Type:</span> <span className="detail-value">Class C (Masonry Bearing Walls)</span></div>
        <div className="detail-item"><span className="detail-label">Quality Rating:</span> <span className="detail-value">Average</span></div>
        <div className="detail-item"><span className="detail-label">Condition Rating:</span> <span className="detail-value">Very Good</span></div>
        <div className="detail-item"><span className="detail-label">Gross Building Area:</span> <span className="detail-value">23,932 Sq. Ft.</span></div>
        <div className="detail-item"><span className="detail-label">Net Rentable Area:</span> <span className="detail-value">20,130 Sq. Ft.</span></div>
        <div className="detail-item"><span className="detail-label">Number of Units:</span> <span className="detail-value">19</span></div>
        <div className="detail-item"><span className="detail-label">Exterior - Walls:</span> <span className="detail-value">Masonry</span></div>
        <div className="detail-item"><span className="detail-label">Heating/Cooling:</span> <span className="detail-value">Central HVAC</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Floors:</span> <span className="detail-value">Hardwood/Carpet</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Walls:</span> <span className="detail-value">Drywall</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Trim/Finish:</span> <span className="detail-value">Standard</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Fireplace:</span> <span className="detail-value">None</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Patio/Deck:</span> <span className="detail-value">None</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Pool:</span> <span className="detail-value">None</span></div>
      </div>

      <h3>Narrative Description</h3>
      <EditableField
        // Use context for value and update function
        initialContent={reportData.improvementsNarrative || `
          <p>The subject property is a 19-unit apartment complex currently undergoing complete renovation. The building features masonry bearing walls (Class C construction) with an average quality rating but in very good condition post-renovation.</p>
          <p>The property contains a total gross building area of 23,932 square feet with 20,130 square feet of net rentable area. The units are being renovated with standard interior finishes including drywall walls and a combination of hardwood and carpet flooring.</p>
          <p>The building is served by central HVAC systems and does not include any special amenities such as fireplaces, patios/decks, or a swimming pool. The renovation is bringing all systems and finishes up to current market standards while maintaining the building's original structural character.</p>
          <p>Upon completion of renovations, the property will offer modern, functional living spaces while preserving its existing architectural style. The improvements are being designed to maximize rental potential while maintaining cost-effective operation.</p>
        `}
        onChange={(newContent) => updateReportData('improvementsNarrative', newContent)}
      />
    </div>
  );
}

export default ImprovementsDescription;