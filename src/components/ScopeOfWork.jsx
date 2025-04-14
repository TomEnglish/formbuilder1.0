import React from 'react';
import './ScopeOfWork.css';

// Accept data as a prop
function ScopeOfWork({ data }) {
  // Removed the hardcoded scopeData object

  // Use default values directly in JSX if data or fields are missing
  const clientName = data?.clientName || "[Client Name]";
  const intendedUser = data?.intendedUser || "[Intended User(s)]";
  const intendedUse = data?.intendedUse || "[Intended Use of the Appraisal]";
  const propertyRightsAppraised = data?.propertyRightsAppraised || "[Property Rights Appraised]";
  const definitionOfValue = data?.definitionOfValue || "[Definition of Market Value Used]"; // This might be redundant if we use the placeholder below, but keeping for now based on original structure
  const effectiveDate = data?.effectiveDate || data?.appraisalDate || "[Effective Date of Appraisal]"; // Use appraisalDate as fallback
  const dateOfReport = data?.dateOfReport || "[Date of Report]";
  const scopeDescription = data?.scopeDescription || "[Detailed scope description...]";

  return (
    <div className="scope-of-work">
      <h2>Scope of Work</h2>
      {/* Use data from props with fallbacks */}
      <p><strong>Client:</strong> {clientName}</p>
      <p><strong>Intended User(s):</strong> {intendedUser}</p>
      <p><strong>Intended Use:</strong> {intendedUse}</p>
      <p><strong>Property Rights Appraised:</strong> {propertyRightsAppraised}</p>
      {/* <p><strong>Definition of Value:</strong> {definitionOfValue}</p>  // Commented out as it's covered in the new Definitions section */}
      <p><strong>Effective Date of Appraisal:</strong> {effectiveDate}</p>
      <p><strong>Date of Report:</strong> {dateOfReport}</p>
      <hr />

      <h3>Definitions</h3>
      <p><strong>Market Value:</strong> [Standard Definition Placeholder]</p>
      <p><strong>Exposure Time:</strong> [Standard Definition Placeholder]</p>
      <p><strong>Marketing Time:</strong> [Standard Definition Placeholder]</p>
      <p><strong>Highest and Best Use:</strong> [Standard Definition Placeholder]</p>
      <p><strong>Replacement Cost:</strong> [Standard Definition Placeholder]</p>
      <hr />


      <h3>Purpose of the Appraisal</h3>
      <p>
        The purpose of this appraisal is to develop an opinion of market value of the fee simple estate of the subject property. Fee Simple interest is defined as: “The maximum possible estate one can possess in real property”. It is the least limited interest and the most complete and absolute ownership in land; is of indefinite duration, freely transferable, and inheritable. No consideration is given to the subsurface mineral rights, if any. No existing leasing agreement was provided or discovered by the appraiser.
      </p>

      <h3>Intended Use and User of this Report</h3>
      <p>
        The intended user of the appraisal is our client '{clientName}'. The intended use of this appraisal report is to provide an opinion of the market value of the subject commercial multifamily real estate property as of the effective date of the appraisal. This report is prepared for the exclusive use of the named intended user to assist with internal decision making. It is intended solely for use by the named client/user and is not intended for any other purpose or for use by any other party. {/* Optional: Add fee info if needed: Our fee for this assignment is $X,XXX */}
      </p>

      {/* Existing detailed definitions remain as per original structure, though placeholders are added above */}
      <h3>Exposure Time</h3>
      <p>
        Exposure time is defined by USPAP as: “An opinion, based on supporting market data, of the length of time that the property interest being appraised would have been offered on the market prior to the hypothetical consummation of a sale at market value on the effective date of the appraisal.” Based on our analysis of the market and with consideration to the comparable sales, it is our opinion that if the subject were available for sale during the 12 months prior to the date of the appraisal at a reasonable price, a sale would have occurred.
      </p>

      <h3>Marketing Time</h3>
      <p>
        Marketing time is described by The Dictionary of Real Estate Appraisal, 7th Edition (Appraisal Institute), as: “The estimated time period it would take to sell a property interest at the concluded market value during the period immediately after the effective date of the appraisal. Marketing time differs from exposure time, which always precedes the effective date of the appraisal.” Based on our analysis of the market and with consideration to the comparable sales, it is our opinion that if the subject were made available for sale and adequately exposed to the market at a reasonable price, a sale would occur within 12 months.
      </p>

      <h3>Definition of Market Value</h3>
      {/* Separated paragraph and list for valid HTML */}
      <p>
        The most probable price, as of a specified date, in cash, or in terms equivalent to cash, or in other precisely revealed terms, for which the specified property rights should sell after reasonable exposure in a competitive market under all conditions requisite to a fair sale, with the buyer and seller each acting prudently, knowledgeably, and for self-interest, and assuming that neither is under undue duress. Implicit in this definition is the consummation of a sale as of specified date and the passing of title from seller to buyer under conditions whereby:
      </p>
      <ul>
        <li>a. Buyer and seller are typically motivated;</li>
        <li>b. Both parties are well informed or well advised, and acting in what they consider their best interests;</li>
        <li>c. A reasonable time is allowed for exposure in the open market;</li>
        <li>d. Payment is made in terms of cash in U.S. dollars or in terms of financial arrangements comparable thereto; and</li>
        <li>e. The price represents the normal consideration for the property sold unaffected by special or creative financing or sales concessions granted by anyone associated with the sale.</li>
      </ul>
      <p>
        (Source: The Dictionary of Real Estate Appraisal, published by the Appraisal Institute; and Office of the Controller of the Currency under 12 CFR, Subpart C-Appraisals, 34.42 Definitions [f]; USPAP)
      </p>

      <h3>Compliance with the Competency Provision of USPAP</h3>
      <p>
        According to USPAP, the Competency Rule discusses the need for the appraiser to have the proper knowledge and experience to complete the assignment competently. No steps were necessary or appropriate to comply with the Competency Rule as defined in USPAP as the appraiser has experience both in the market area and in appraising similar type properties.
      </p>

      <hr />

      <h3>Description of Scope:</h3>
      <p>{scopeDescription}</p>
    </div>
  );
}

export default ScopeOfWork;