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
    <div className="improvements-description-section section">
      <h2>Improvements Description</h2>

      <h3>Improvement Details</h3>
      <div className="form-grid">
        {/* Read details directly from reportData context */}
        <div className="detail-item"><span className="detail-label">General Description:</span> <span className="detail-value">{reportData.generalDescription || '[Gen. Desc.]'}</span></div>
        <div className="detail-item"><span className="detail-label">Exterior - Walls:</span> <span className="detail-value">{reportData.exteriorWalls || '[Ext. Walls]'}</span></div>
        <div className="detail-item"><span className="detail-label">Exterior - Roof:</span> <span className="detail-value">{reportData.exteriorRoof || '[Roof]'}</span></div>
        <div className="detail-item"><span className="detail-label">Foundation:</span> <span className="detail-value">{reportData.foundation || '[Foundation]'}</span></div>
        <div className="detail-item"><span className="detail-label">Basement:</span> <span className="detail-value">{reportData.basement || '[Basement]'}</span></div>
        <div className="detail-item"><span className="detail-label">Insulation:</span> <span className="detail-value">{reportData.insulation || '[Insulation]'}</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Floors:</span> <span className="detail-value">{reportData.interiorFloors || '[Floors]'}</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Walls:</span> <span className="detail-value">{reportData.interiorWalls || '[Walls]'}</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Trim/Finish:</span> <span className="detail-value">{reportData.interiorTrimFinish || '[Trim]'}</span></div>
        <div className="detail-item"><span className="detail-label">Heating/Cooling:</span> <span className="detail-value">{reportData.heatingCooling || '[HVAC]'}</span></div>
        <div className="detail-item"><span className="detail-label">Attic:</span> <span className="detail-value">{reportData.attic || '[Attic]'}</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Fireplace:</span> <span className="detail-value">{reportData.amenitiesFireplace || '[Fireplace]'}</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Patio/Deck:</span> <span className="detail-value">{reportData.amenitiesPatioDeck || '[Patio/Deck]'}</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Pool:</span> <span className="detail-value">{reportData.amenitiesPool || '[Pool]'}</span></div>
        <div className="detail-item"><span className="detail-label">Car Storage:</span> <span className="detail-value">{reportData.carStorage || '[Car Storage]'}</span></div>
      </div>

      <h3>Narrative Description</h3>
      <EditableField
        // Use context for value and update function
        value={reportData.improvementsNarrative || ''}
        onChange={(newContent) => updateReportData('improvementsNarrative', newContent)}
      />
    </div>
  );
}

export default ImprovementsDescription;