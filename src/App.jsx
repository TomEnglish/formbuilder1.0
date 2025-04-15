import { useState, useContext } from 'react'; // Import useContext
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
import { ReportDataProvider, ReportContext } from './context/ReportDataContext'; // Import ReportContext
import InputForm from './components/InputForm.jsx';

// Removed CSV_URL as data will come from file upload
function App() {
  // Access report data from context
  const { reportData } = useContext(ReportContext); // Consume context

  // Removed appraisalData, isLoading, error, and narrative states


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
  // Removed parseCsvLine helper function

  // --- Removed Google Sheet Fetching Logic ---

  // Removed useEffect that fetched initial CSV data

  // Removed handleDataChange function

  // Simple print function using browser's native print
  const handlePrint = () => {
    window.print();
  };

  // Removed handleLoadRow (related to CSV row selection)

  return (
    <ReportDataProvider>
    <div className="App">
      <h1>Appraisal Report Generator</h1>
      <InputForm />

      {/* Removed Row Selection Input Section */}
      {/* Keep Print Button, disable based on appraisalData */}
      <div className="controls">
         <button onClick={handlePrint} className="print-button">Print Report</button>
      </div>

      {/* Display Error Messages */}
      {/* Removed error display */}

      <hr />

      <div className="report-section">
        <h2>
          Generated Report
        </h2>
        {/* Render ReportHeader (without file props) */}
        <ReportHeader
          // Removed data and onDataChange props
          sectionVisibility={sectionVisibility}
          onToggleSection={handleToggleSection}
          // Removed onFileSelect and loadedFileName props
        />

        {/* Conditional Rendering based on loading/data state */}
        {/* Removed isLoading and appraisalData checks */}
          <div> {/* Container for report sections */}
            {sectionVisibility.propertySummary && <PropertySummary />}
            {sectionVisibility.scopeOfWork && <ScopeOfWork />}
            {sectionVisibility.siteDescription && <SiteDescription
              // Removed data, narrativeContent, and onNarrativeChange props
            />}
            {sectionVisibility.improvementsDescription && <ImprovementsDescription
              // Removed data, narrativeContent, and onNarrativeChange props
            />}
            {sectionVisibility.highestAndBestUse && <HighestAndBestUse />}
            {sectionVisibility.valuationMethodology && <ValuationMethodology />}
            {sectionVisibility.salesComparisonApproach && <SalesComparisonApproach
              data={[]} // Pass empty array to fix ReferenceError, actual data structure missing in context
              // Removed narrativeContent and onNarrativeChange props
            />}
            {sectionVisibility.costApproach && <CostApproach />}
            {sectionVisibility.reconciliation && <Reconciliation
              // Removed data prop
              // Removed narrativeContent and onNarrativeChange props
            />}
            {sectionVisibility.incomeApproach && <IncomeApproach />}
            {sectionVisibility.assumptionsAndLimitingConditions && <AssumptionsAndLimitingConditions />}
            {sectionVisibility.certification && <Certification />}
            <ReportFooter /> {/* Footer likely always visible */}
          </div>
        {/* Removed closing part of conditional rendering */}
      </div>
    </div>
    </ReportDataProvider>
  );
}

export default App;
