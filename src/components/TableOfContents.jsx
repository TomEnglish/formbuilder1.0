import React from 'react';
import './TableOfContents.css';

function TableOfContents({ sectionVisibility }) {
  const sections = [
    { id: 'letterOfTransmittal', title: 'Letter of Transmittal' },
    { id: 'propertySummary', title: 'Property Summary' },
    { id: 'scopeOfWork', title: 'Scope of Work' },
    { id: 'siteDescription', title: 'Site Description' },
    { id: 'improvementsDescription', title: 'Improvements Description' },
    { id: 'highestAndBestUse', title: 'Highest and Best Use' },
    { id: 'valuationMethodology', title: 'Valuation Methodology' },
    { id: 'salesComparisonApproach', title: 'Sales Comparison Approach' },
    { id: 'costApproach', title: 'Cost Approach' },
    { id: 'incomeApproach', title: 'Income Approach' },
    { id: 'reconciliation', title: 'Reconciliation' },
    { id: 'assumptionsAndLimitingConditions', title: 'Assumptions & Limiting Conditions' },
    { id: 'certification', title: 'Certification' },
    { id: 'addenda', title: 'Addenda' }
  ];

  return (
    <section className="table-of-contents">
      <h2>Table of Contents</h2>
      <ul>
        {sections.map(section => (
          sectionVisibility[section.id] && (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          )
        ))}
      </ul>
    </section>
  );
}

export default TableOfContents;