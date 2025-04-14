import React from 'react';
// Removed useState and EditableField imports as they are no longer needed here
import './Certification.css';

// Accept data as a prop
function Certification({ data }) {
  // Use data from props with fallbacks
  const appraiserName = data?.appraiserName ?? "[Appraiser's Name]";
  const appraiserTitle = data?.appraiserTitle ?? "[Appraiser's Title/Designation]";
  const licenseNumber = data?.licenseNumber ?? "[License Number]";
  const licenseExpiration = data?.licenseExpiration ?? "[Expiration Date]";
  const signatureDate = data?.signatureDate ?? data?.dateOfReport ?? "[Signature Date]"; // Fallback to dateOfReport

  return (
    <div className="certification">
      <h2>Appraiser's Certification</h2>
      <p>
        I/We certify that, to the best of my knowledge and belief:
      </p>
      <ul>
        <li>The statements of fact contained in this report are true and correct.</li>
        <li>The reported analyses, opinions, and conclusions are limited only by the reported assumptions and limiting conditions, and are my personal, impartial, and unbiased professional analyses, opinions, and conclusions.</li>
        <li>I/We have no present or prospective interest in the property that is the subject of this report, and no personal interest with respect to the parties involved.</li>
        <li>The appraisers’ signing this report have not performed other services, as an appraiser or in any other capacity, regarding the property that is the subject of this report within the three-year period immediately preceding acceptance of this assignment.</li>
        <li>I/We have no bias with respect to the property that is the subject of this report or to the parties involved with this assignment.</li>
        <li>My/Our engagement in this assignment was not contingent upon developing or reporting predetermined results.</li>
        <li>My/Our compensation for completing this assignment is not contingent upon the development or reporting of a predetermined value or direction in value that favors the cause of the client, the amount of the value opinion, the attainment of a stipulated result, or the occurrence of a subsequent event directly related to the intended use of this appraisal.</li>
        <li>My/Our analyses, opinions, and conclusions were developed, and this report has been prepared in conformity with the Uniform Standards of Professional Appraisal Practice.</li>
        <li>The people signing below have made a personal observation of the property that is the subject of this report. {/* Adjust if inspection was not made or by whom */}</li>
        <li>No significant real property appraisal assistance was obtained from any other individuals. {/* Adjust if assistance was provided */}</li>
      </ul>

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