import React from 'react';
import footerLogo from '../assets/Logo48.ico'; // Import the small logo
import './ReportFooter.css';

function ReportFooter() {
  // Placeholder content - replace or make dynamic later
  const companyName = "True Value Appraisals";
  const reportIdentifier = "[Report ID / Property Address Placeholder]"; // Could be passed as prop

  return (
    <div className="report-footer">
      <span>{companyName}</span>
      <span>{reportIdentifier}</span>
      <img src={footerLogo} alt="Small Logo" className="footer-logo" /> {/* Add the small logo */}
      {/* Page numbers are hard here, maybe add manually if needed */}
      {/* <span>Page X</span> */}
    </div>
  );
}

export default ReportFooter;