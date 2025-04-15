import React, { useContext } from 'react'; // Import useContext
import { ReportContext } from '../context/ReportDataContext'; // Import ReportContext
import EditableField from './EditableField'; // Import EditableField
import './ScopeOfWork.css';

// Removed data prop
function ScopeOfWork() {
  // Get context data
  const { reportData, updateReportData } = useContext(ReportContext);

  // Use default values directly from context
  const clientName = reportData.clientName || "[Client Name]";
  const intendedUser = reportData.intendedUser || "[Intended User(s)]"; // Assuming this field exists
  const intendedUse = reportData.intendedUse || "[Intended Use of the Appraisal]"; // Assuming this field exists
  const propertyRightsAppraised = reportData.propertyRightsAppraised || "[Property Rights Appraised]"; // Assuming this field exists
  const effectiveDate = reportData.effectiveDate || "[Effective Date of Appraisal]";
  const dateOfReport = reportData.dateOfReport || "[Date of Report]"; // Assuming this field exists

  // Boilerplate content for EditableField
  const defaultScopeContent = `<p>The scope of work for this appraisal report is defined in accordance with the Uniform Standards of Professional Appraisal Practice (USPAP) and tailored to meet the specific requirements of the intended use and user of the appraisal. The following outlines the steps and criteria involved in completing the appraisal process:</p><h4>Purpose and Intended Use of the Appraisal:</h4><ul><li>The purpose of this appraisal is to estimate the market value of the subject property as of the effective date of the appraisal.</li><li>The intended use of this report is to assist the client with internal decision making purposes.</li><li>The intended user of this report is the named client, and no other use or user is intended or authorized.</li></ul><h4>Inspection and Data Collection</h4><ul><li>Conducted an on-site inspection of the land, improvements, and surrounding area.</li><li>Took photographs and measurements to document the property’s condition and characteristics.</li><li>Collected legal, ownership, and zoning information from public records, client documents, and direct observation.</li><li>Researched comparable sales, rental data, and income/expense figures from MLS, public records, and market participants.</li><li>Analyzed economic and market conditions (employment, demand, regional growth) relevant to value.</li></ul><h4>Analysis and Valuation Approach:</h4><ul><li>Cost Approach: If applicable, estimated replacement/reproduction cost less depreciation.</li><li>Sales Comparison Approach: Analyzed recent comparable sales to derive a market-based indication of value.</li><li>Income Approach: For income-producing properties, evaluated potential gross income, operating expenses, and capitalization rates.</li><li>The applicability of each approach was considered, with the final valuation reconciled to provide the most reliable estimate of market value. The approaches to value are described in detail later within the report.</li></ul><h4>Zoning and Legal Compliance:</h4><ul><li>The property’s zoning classification and any applicable restrictions were reviewed to determine legally permissible uses.</li><li>Flood zone information and environmental conditions were considered to assess any potential impact on the property’s value.</li></ul><h4>Report Development:</h4><ul><li>Prepared the report in compliance with USPAP, presenting property details, market analysis, and supporting data.</li><li>Included any hypothetical conditions or extraordinary assumptions, which are clearly disclosed within the report.</li><li>Provided appraiser’s certification, limiting conditions, and assumptions to clarify responsibilities.</li></ul><h4>Limitations and Certifications:</h4><ul><li>The appraiser’s certification, limiting conditions, and assumptions are included in the report to clarify the scope of responsibility and ensure transparency.</li><li>The appraisal does not constitute an inspection for structural integrity, environmental hazards, or building code compliance.</li></ul><hr /><h4>Definition of Market Value:</h4><p>The most probable price, as of a specified date, in cash, or in terms equivalent to cash, or in other precisely revealed terms, for which the specified property rights should sell after reasonable exposure in a competitive market under all conditions requisite to a fair sale, with the buyer and seller each acting prudently, knowledgeably, and for self-interest, and assuming that neither is under undue duress. Implicit in this definition is the consummation of a sale as of specified date and the passing of title from seller to buyer under conditions whereby: a. Buyer and seller are typically motivated; b. Both parties are well informed or well advised, and acting in what they consider their best interests; c. A reasonable time is allowed for exposure in the open market; d. Payment is made in terms of cash in U.S. dollars or in terms of financial arrangements comparable thereto; and e. The price represents the normal consideration for the property sold unaffected by special or creative financing or sales concessions granted by anyone associated with the sale. (Source: The Dictionary of Real Estate Appraisal, published by the Appraisal Institute; and Office of the Controller of the Currency under 12 CFR, Subpart C-Appraisals, 34.42 Definitions [f]; USPAP, January 1, 2024)</p><h4>Exposure Time:</h4><p>Exposure time is defined by 2024 USPAP as: “An opinion, based on supporting market data, of the length of time that the property interest being appraised would have been offered on the market prior to the hypothetical consummation of a sale at market value on the effective date of the appraisal.” Based on our analysis of the market and with consideration to the comparable sales, it is our opinion that if the subject were available for sale during the 12 months prior to the date of the appraisal at a reasonable price, a sale would have occurred.</p><h4>Marketing Time:</h4><p>Marketing time is described by The Dictionary of Real Estate Appraisal, 7th Edition (Appraisal Institute), as: “The estimated time period it would take to sell a property interest at the concluded market value during the period immediately after the effective date of the appraisal. Marketing time differs from exposure time, which always precedes the effective date of the appraisal.” Based on our analysis of the market and with consideration to the comparable sales, it is our opinion that if the subject were made available for sale and adequately exposed to the market at a reasonable price, a sale would occur within 12 months.</p>`;

  return (
    <div className="scope-of-work">
      <h2>Scope of Work</h2>
      {/* Use data from context */}
      <p><strong>Client:</strong> {clientName}</p>
      <p><strong>Intended User(s):</strong> {intendedUser}</p>
      <p><strong>Intended Use:</strong> {intendedUse}</p>
      <p><strong>Property Rights Appraised:</strong> {propertyRightsAppraised}</p>
      <p><strong>Effective Date of Appraisal:</strong> {effectiveDate}</p>
      <p><strong>Date of Report:</strong> {dateOfReport}</p>
      <hr />
      <EditableField
        initialContent={reportData.scopeOfWorkContent ?? defaultScopeContent}
        onChange={(newContent) => updateReportData('scopeOfWorkContent', newContent)}
      />
    </div>
  );
}

export default ScopeOfWork;