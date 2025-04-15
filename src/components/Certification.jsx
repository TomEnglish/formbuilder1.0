import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext'; // Import ReportContext
import EditableField from './EditableField'; // Import EditableField
import './Certification.css';

// Removed data prop
function Certification() {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);

  // Use data from context with fallbacks
  const appraiserName = reportData.appraiserName ?? "[Appraiser's Name]";
  const appraiserTitle = reportData.appraiserTitle ?? "[Appraiser's Title/Designation]"; // Assuming this field exists in context
  const licenseNumber = reportData.licenseNumber ?? "[License Number]"; // Assuming this field exists in context
  const licenseExpiration = reportData.licenseExpiration ?? "[Expiration Date]"; // Assuming this field exists in context
  const signatureDate = reportData.signatureDate ?? reportData.dateOfReport ?? "[Signature Date]"; // Assuming these fields exist

  // Boilerplate content for EditableField
  const defaultCertificationContent = `<p>I/We certify that, to the best of my knowledge and belief:</p><p>The statements of facts contained in this report are true and correct.</p><p>The reported analysis, opinions, and conclusions are limited only by the reported assumptions and limiting conditions, and are my personal, impartial, and unbiased professional analyses, opinions, and conclusions.</p><p>I/We have no present or prospective interest in the property that is the subject of this report, and no personal interest with respect to the parties involved.</p><p>The appraisers’ signing this report have not performed other services, as an appraiser or in any other capacity, regarding the property that is the subject of this report within the three-year period immediately preceding acceptance of this assignment.</p><p>I/We have no bias with respect to the property that is the subject of this report or to the parties involved with this assignment.</p><p>My/Our engagement in this assignment was not contingent upon developing or reporting predetermined results.</p><p>My/Our compensation for completing this assignment is not contingent upon the development or reporting of a predetermined value or direction in value that favors the cause of the client, the amount of the value opinion, the attainment of a stipulated result, or the occurrence of a subsequent event directly related to the intended use of this appraisal.</p><p>My/Our analyses, opinions, and conclusions were developed, and this report has been prepared in conformity with the Uniform Standards of Professional Appraisal Practice.</p><p>The people signing below have made a personal observation of the property that is the subject of this report.</p><p>Individuals who have provided significant real property appraisal assistance are named below. The specific task performed by those name are outlined in the Scope of Work section of this report.</p><p>No significant real property appraisal assistance was obtained from any other individuals.</p>`;

  return (
    <div className="certification">
      <h2>Appraiser's Certification</h2>
      <EditableField
        initialContent={reportData.certificationContent ?? defaultCertificationContent}
        onChange={(newContent) => updateReportData('certificationContent', newContent)}
      />

      <div className="signature-area">
        <div className="signature-block">
          <div className="signature-line">
            {/* Placeholder for signature image or digital signature */}
            <span className="signature-placeholder">(Appraiser's Signature)</span>
          </div>
          <div className="appraiser-details">
            <p>{appraiserName}</p>
            <p>{appraiserTitle}</p>
            <p>{licenseNumber}</p>
            <p>{licenseExpiration}</p>
          </div>
        </div>
        <div className="signature-date">
          <p>Signature Date: {signatureDate}</p>
        </div>
        {/* Optional: Add electronic signature disclaimer if needed */}
        {/*
        <p className="electronic-signature-disclaimer">
          This appraisal report is being transmitted as an “electronic record” containing our “electronic” signature...
        </p>
        */}
      </div>
    </div>
  );
}

export default Certification;