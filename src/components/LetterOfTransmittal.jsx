import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext';
import { ValidationContext } from '../context/ValidationContext';
import EditableField from './EditableField';

function LetterOfTransmittal() {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);
  const { validateField, setFieldError, validationErrors } = useContext(ValidationContext); // Destructure from ValidationContext

  // Boilerplate content including definition and analysis structure
  const defaultLetterContent = `<p>At your request, the above-referenced property has been appraised for the purpose of developing an opinion of the market value of the fee simple estate. Our opinion is as follows:</p><!-- Placeholder for value table --><p><strong>Value Perspective:</strong> [Current]</p><p><strong>Value Premise:</strong> [Subject To]</p><p><strong>Value Type:</strong> Market Value</p><p><strong>Interest Appraised:</strong> Fee Simple</p><p><strong>Effective Date:</strong> ${reportData.effectiveDate || '[Effective Date]'}</p><p><strong>Indicated Value:</strong> ${reportData.reconciliation?.finalValueConclusion || '[Indicated Value]'}</p><hr /><p>Market Value, as defined in this report, is the most probable price a property should bring in a competitive and open market under fair sale conditions, with both buyer and seller acting prudently, knowledgeably, and free from undue stimulus.</p><p>The estimated marketing time for the property is within 12 months of the appraisal date. Available market data reflects current local conditions, and no further discounting was applied to the indicated value. The appraisers certify no present or proposed interest in the property, that the opinion of value was reached through investigation and analysis of relevant data, and that the fee is not contingent upon the value concluded. This appraisal is subject to the extraordinary assumptions and hypothetical conditions outlined in the Scope of Work and the contingent and limiting conditions in the addenda. No services have been provided regarding this property within the past three years.</p><p>The appraiser(s) is not qualified to detect hazardous substances such as asbestos, urea-formaldehyde, or toxic waste, which may affect the property’s value. Clients are advised to seek professional environmental studies. No responsibility is assumed for such conditions or related expertise.</p><p>Very truly yours,</p><!-- Placeholder for signature block --><p><strong>Signature Date:</strong> ${reportData.signatureDate || '[Signature Date]'}</p><p>${reportData.appraiserName || '[Appraiser Name]'}</p><p>${reportData.appraiserTitle || '[Appraiser Title/Company]'}</p><p>${reportData.licenseNumber || '[License Info]'}</p><p>${reportData.appraiserContact || '[Contact Info]'}</p><hr /><p><em>This appraisal report is being transmitted as an “electronic record” containing our “electronic” signature, as those terms are defined in applicable federal and/or state laws and shall be as effective, enforceable, and valid as if a paper version of this appraisal report were delivered containing our original handwritten signature.</em></p>`;

  return (
    <section id="letterOfTransmittal" className="letter-of-transmittal">
      <h2>Letter of Transmittal</h2>
      <EditableField
        initialContent={reportData.letterOfTransmittalContent ?? defaultLetterContent}
        onChange={(newContent) => {
          const validation = validateField(newContent, 'contentLength', [500, 10000]);
          if (!validation.isValid) {
            setFieldError('letterOfTransmittalContent', validation.message);
          } else {
            updateReportData('letterOfTransmittalContent', newContent);
          }
        }}
        error={validationErrors.letterOfTransmittalContent}
      />
    </section>
  );
}

export default LetterOfTransmittal;