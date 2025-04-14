import React from 'react'; // Removed useState import
import EditableField from './EditableField';
import './ImprovementsDescription.css';

// Accept props from App.jsx
function ImprovementsDescription({ data, narrativeContent, onNarrativeChange }) { // Add data prop
  // Local state and handler removed, using props now

  // Removed local improvementsDetailsData object
  // Use data from props with fallbacks for detail fields
  const generalDescription = data?.generalDescription ?? "[Gen. Desc.]";
  const exteriorWalls = data?.exteriorWalls ?? "[Ext. Walls]";
  const exteriorRoof = data?.exteriorRoof ?? "[Roof]";
  const foundation = data?.foundation ?? "[Foundation]";
  const basement = data?.basement ?? "[Basement]";
  const insulation = data?.insulation ?? "[Insulation]";
  const interiorFloors = data?.interiorFloors ?? "[Floors]";
  const interiorWalls = data?.interiorWalls ?? "[Walls]";
  const interiorTrimFinish = data?.interiorTrimFinish ?? "[Trim]";
  const heatingCooling = data?.heatingCooling ?? "[HVAC]";
  const attic = data?.attic ?? "[Attic]";
  const amenitiesFireplace = data?.amenitiesFireplace ?? "[Fireplace]";
  const amenitiesPatioDeck = data?.amenitiesPatioDeck ?? "[Patio/Deck]";
  const amenitiesPool = data?.amenitiesPool ?? "[Pool]";
  const carStorage = data?.carStorage ?? "[Car Storage]";

  return (
    <div className="improvements-description-section section">
      <h2>Improvements Description</h2>

      <h3>Improvement Details</h3>
      <div className="form-grid">
        {/* Render simple details using standard HTML */}
        {/* Use data from props */}
        <div className="detail-item"><span className="detail-label">General Description:</span> <span className="detail-value">{generalDescription}</span></div>
        <div className="detail-item"><span className="detail-label">Exterior - Walls:</span> <span className="detail-value">{exteriorWalls}</span></div>
        <div className="detail-item"><span className="detail-label">Exterior - Roof:</span> <span className="detail-value">{exteriorRoof}</span></div>
        <div className="detail-item"><span className="detail-label">Foundation:</span> <span className="detail-value">{foundation}</span></div>
        <div className="detail-item"><span className="detail-label">Basement:</span> <span className="detail-value">{basement}</span></div>
        <div className="detail-item"><span className="detail-label">Insulation:</span> <span className="detail-value">{insulation}</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Floors:</span> <span className="detail-value">{interiorFloors}</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Walls:</span> <span className="detail-value">{interiorWalls}</span></div>
        <div className="detail-item"><span className="detail-label">Interior - Trim/Finish:</span> <span className="detail-value">{interiorTrimFinish}</span></div>
        <div className="detail-item"><span className="detail-label">Heating/Cooling:</span> <span className="detail-value">{heatingCooling}</span></div>
        <div className="detail-item"><span className="detail-label">Attic:</span> <span className="detail-value">{attic}</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Fireplace:</span> <span className="detail-value">{amenitiesFireplace}</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Patio/Deck:</span> <span className="detail-value">{amenitiesPatioDeck}</span></div>
        <div className="detail-item"><span className="detail-label">Amenities - Pool:</span> <span className="detail-value">{amenitiesPool}</span></div>
        <div className="detail-item"><span className="detail-label">Car Storage:</span> <span className="detail-value">{carStorage}</span></div>
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

export default ImprovementsDescription;