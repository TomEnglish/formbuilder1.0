import { useState, useEffect } from 'react';
// Removed xlsx import
import './App.css';
import ReportHeader from './components/ReportHeader';
import PropertySummary from './components/PropertySummary';
import SiteDescription from './components/SiteDescription';
import ImprovementsDescription from './components/ImprovementsDescription';
import SalesComparisonApproach from './components/SalesComparisonApproach';
import Reconciliation from './components/Reconciliation';
import AssumptionsAndLimitingConditions from './components/AssumptionsAndLimitingConditions';
import Certification from './components/Certification';
import ScopeOfWork from './components/ScopeOfWork';
import HighestAndBestUse from './components/HighestAndBestUse';
import CostApproach from './components/CostApproach';
import IncomeApproach from './components/IncomeApproach';
import ReportFooter from './components/ReportFooter';
import ValuationMethodology from './components/ValuationMethodology';

// Removed CSV_URL as data will come from file upload
function App() {
  const [appraisalData, setAppraisalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  // Removed loadedFileName state
  // Removed selectedRowNum and loadedRowIndex states (related to CSV loading)
  // State for editable narrative sections
  const [siteNarrative, setSiteNarrative] = useState('<p>[Default Site Narrative - Load from data source or leave editable]</p>');
  const [improvementsNarrative, setImprovementsNarrative] = useState('<p>[Default Improvements Narrative - Load from data source or leave editable]</p>');
  const [salesCompNarrative, setSalesCompNarrative] = useState('<p>[Default Sales Comparison Narrative - Load from data source or leave editable]</p>');
  const [reconciliationNarrative, setReconciliationNarrative] = useState('<p>[Default Reconciliation Narrative - Load from data source or leave editable]</p>');

  // State for section visibility
  const [sectionVisibility, setSectionVisibility] = useState({
    propertySummary: true,
    scopeOfWork: true,
    siteDescription: true,
    improvementsDescription: true,
    highestAndBestUse: true,
    valuationMethodology: true,
    salesComparisonApproach: true,
    costApproach: true,
    reconciliation: true,
    incomeApproach: true,
    assumptionsAndLimitingConditions: true,
    certification: true,
  });

  // Handler to toggle section visibility
  const handleToggleSection = (sectionKey) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };
  // Helper function for basic CSV line parsing (handles quoted commas)
  const parseCsvLine = (line) => {
    const result = [];
    let currentField = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && (i === 0 || line[i-1] !== '\\')) { // Handle quote toggle (ignore escaped quotes)
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentField.trim().replace(/^"|"$/g, '')); // Add field, remove surrounding quotes
        currentField = '';
      } else {
        currentField += char;
      }
    }
    result.push(currentField.trim().replace(/^"|"$/g, '')); // Add last field
    return result;
  };

  // --- Google Sheet Fetching Logic ---
  useEffect(() => {
    const fetchData = async () => {
      const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRX4jvbX4p-FGCUkcVUPkTispZLkVQ9Pk98kKxMyq2_9kqynxW1u2OgH_J4SKzenP7snDmI7CRc9_Jo/pub?gid=739122495&single=true&output=csv';
      setIsLoading(true);
      setError(null);
      setAppraisalData(null); // Clear previous data
try {
  const response = await fetch(GOOGLE_SHEET_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const csvText = await response.text();

  const lines = csvText.trim().split('\n');

  // Find the actual header row index (skip blank lines)
  let headerRowIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    // Check if line is not empty and contains more than just commas/whitespace
    if (lines[i].trim() && lines[i].replace(/,/g, '').trim().length > 0) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error('Could not find a valid header row in the CSV data.');
  }

  // Parse the actual header row
  const sheetHeaders = parseCsvLine(lines[headerRowIndex]);

  // Ensure there's at least one data row after the header
  if (lines.length <= headerRowIndex + 1) {
      throw new Error(`CSV data does not contain any data rows after the header row (header at row ${headerRowIndex}).`);
  }

  // Create a map of Sheet Header Name -> Column Index
  const headerIndexMap = {};
  sheetHeaders.forEach((header, index) => {
    if (header) { // Avoid empty headers
      headerIndexMap[header] = index;
    }
  });

  // Define mapping: Component Key -> Sheet Header Name
  const componentKeyMap = {
    // Add mappings based on expected keys and actual sheet headers
    propertyAddress: 'Address',
    city: 'City / Municipality', // Assuming 'city' is needed
    state: 'State',
    zipCode: 'Zip Code', // Assuming 'zipCode' is needed
    msa: 'MSA',
    mapLatitude: 'Map Latitude',
    mapLongitude: 'Map Longitude',
    propertyUse: 'Property Use',
    legalDescription: 'Legal Description',
    taxParcelNumber: 'Tax Parcel Number', // Check sheet for potential typo 'Taxe Parcel No.'
    landSqFt: 'Land Sq Ft', // Uses the first instance if duplicated in sheet
    yearBuilt: 'Year Built',
    gba: 'GBA',
    // --- Fields likely missing from sheet ---
    // clientName: 'Client Name', // Example if it existed
    // appraisalDate: 'Appraisal Date', // Example if it existed
    // valueConclusion: 'Value Conclusion', // Example if it existed
    // ... add other mappings if corresponding headers exist in the sheet ...
  };

  const allParsedData = [];
  // Iterate over all data rows (starting from the row after the header)
  for (let i = headerRowIndex + 1; i < lines.length; i++) {
    const dataRowValues = parseCsvLine(lines[i]);
    // Skip potentially empty rows parsed as just empty strings
    if (dataRowValues.length === 1 && dataRowValues[0] === '') continue;

    const parsedRowData = {};
    // Populate parsedRowData based on the mapping for the current row
    for (const componentKey in componentKeyMap) {
      const sheetHeaderName = componentKeyMap[componentKey];
      const headerIndex = headerIndexMap[sheetHeaderName];

      if (headerIndex !== undefined && headerIndex < dataRowValues.length) {
        parsedRowData[componentKey] = dataRowValues[headerIndex];
      } else {
        // Don't warn for every row, maybe just once if needed, or handle missing data differently
        // console.warn(`Header "${sheetHeaderName}" not found or index out of bounds for row ${i}, component key "${componentKey}".`);
        parsedRowData[componentKey] = null; // Set to null if data is missing/header not found
      }
    }
    // Only add if the row actually contained some mapped data
    if (Object.keys(parsedRowData).length > 0) {
        allParsedData.push(parsedRowData);
    }
  }

  // console.log("Mapped Parsed Data from Google Sheet (All Rows):", allParsedData);
  setAppraisalData(allParsedData); // Set the array of mapped objects
  setError(null);


      } catch (fetchError) {
        console.error("Error fetching or parsing Google Sheet data:", fetchError);
        setError(`Error fetching/parsing data: ${fetchError.message}`);
        setAppraisalData(null); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount
  // --- End Google Sheet Fetching Logic ---

  // Removed useEffect that fetched initial CSV data

  const handleDataChange = (fieldName, newValue) => {
    // Check if the fieldName is one of the narrative fields
    if (fieldName === 'siteNarrative') {
      setSiteNarrative(newValue);
      console.log("App.jsx: Site Narrative Updated"); // Debug log
    } else if (fieldName === 'improvementsNarrative') {
      setImprovementsNarrative(newValue);
      console.log("App.jsx: Improvements Narrative Updated"); // Debug log
    } else if (fieldName === 'salesCompNarrative') {
      setSalesCompNarrative(newValue);
      console.log("App.jsx: Sales Comp Narrative Updated"); // Debug log
    } else if (fieldName === 'reconciliationNarrative') {
      setReconciliationNarrative(newValue);
      console.log("App.jsx: Reconciliation Narrative Updated"); // Debug log
    } else {
      // Otherwise, update the main appraisalData object (for simple fields)
      setAppraisalData(prevData => ({
        ...prevData,
        [fieldName]: newValue
      }));
    }
  };

  // Simple print function using browser's native print
  const handlePrint = () => {
    window.print();
  };

  // Removed handleLoadRow (related to CSV row selection)

  return (
    <div className="App">
      <h1>Appraisal Report Generator</h1>

      {/* Removed Row Selection Input Section */}
      {/* Keep Print Button, disable based on appraisalData */}
      <div className="controls">
         <button onClick={handlePrint} className="print-button" disabled={!appraisalData || isLoading}>Print Report</button>
      </div>

      {/* Display Error Messages */}
      {error && <p className="error-message">Error: {error}</p>}

      <hr />

      <div className="report-section">
        <h2>
          Generated Report {appraisalData && !isLoading && `(Data loaded from file)`}
        </h2>
        {/* Render ReportHeader (without file props) */}
        <ReportHeader
          data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} // Pass subject property data
          onDataChange={handleDataChange}
          sectionVisibility={sectionVisibility}
          onToggleSection={handleToggleSection}
          // Removed onFileSelect and loadedFileName props
        />

        {/* Conditional Rendering based on loading/data state */}
        {isLoading ? (
          <p>Loading appraisal data from Google Sheet...</p>
        ) : appraisalData ? (
          <div> {/* Container for report sections */}
            {sectionVisibility.propertySummary && <PropertySummary data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} onDataChange={handleDataChange} />}
            {sectionVisibility.scopeOfWork && <ScopeOfWork data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} />}
            {sectionVisibility.siteDescription && <SiteDescription
              data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null}
              narrativeContent={siteNarrative}
              onNarrativeChange={(html) => handleDataChange('siteNarrative', html)}
            />}
            {sectionVisibility.improvementsDescription && <ImprovementsDescription
              data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null}
              narrativeContent={improvementsNarrative}
              onNarrativeChange={(html) => handleDataChange('improvementsNarrative', html)}
            />}
            {sectionVisibility.highestAndBestUse && <HighestAndBestUse data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} />}
            {sectionVisibility.valuationMethodology && <ValuationMethodology />}
            {sectionVisibility.salesComparisonApproach && <SalesComparisonApproach
              data={appraisalData} // Pass the full array for comparison grid
              narrativeContent={salesCompNarrative}
              onNarrativeChange={(html) => handleDataChange('salesCompNarrative', html)}
            />}
            {sectionVisibility.costApproach && <CostApproach data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} />}
            {sectionVisibility.reconciliation && <Reconciliation
              data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null}
              narrativeContent={reconciliationNarrative}
              onNarrativeChange={(html) => handleDataChange('reconciliationNarrative', html)}
            />}
            {sectionVisibility.incomeApproach && <IncomeApproach data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} />}
            {sectionVisibility.assumptionsAndLimitingConditions && <AssumptionsAndLimitingConditions />}
            {sectionVisibility.certification && <Certification data={appraisalData && appraisalData.length > 0 ? appraisalData[0] : null} />}
            <ReportFooter /> {/* Footer likely always visible */}
          </div>
        ) : (
          // Show error or 'no data' message if not loading and no data
          error ? null : <p>No appraisal data loaded.</p> // Error is shown above
        )}
      </div>
    </div>
  );
}

export default App;
