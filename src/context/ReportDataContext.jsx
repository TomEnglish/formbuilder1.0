import React, { createContext, useState, useContext } from 'react';

// Define the initial state structure for the report data
const initialState = {
  // Basic survey data
  clientName: '',
  propertyAddress: '',
  effectiveDate: '', // Consider using a specific date format or null
  appraiserName: '',
  inspectionDate: '', // Consider using a specific date format or null

  // Placeholders for rich text narrative sections
  scopeOfWorkContent: '<p>Enter content here...</p>',
  highestAndBestUseContent: '<p>Enter content here...</p>',
  letterOfTransmittalContent: '<p>Enter content here...</p>',
  salesComparisonContent: '<p>Enter content here...</p>',
  costApproachContent: '<p>Enter content here...</p>',
  // Cost Approach Data (Detailed Fields)
  costApproachData: {
    siteValue: '',
    improvementCostNewSource: '', // e.g., Marshall & Swift
    improvementCostNewAmount: '',
    physicalDeteriorationPercent: '',
    physicalDeteriorationAmount: '',
    functionalObsolescencePercent: '',
    functionalObsolescenceAmount: '',
    externalObsolescencePercent: '',
    externalObsolescenceAmount: '',
    // Calculated fields might not need explicit state if derived on render
    // totalDepreciation: '', // Example: Calculated
    // depreciatedCostImprovements: '', // Example: Calculated
    asIsMarketValueSiteImprovements: '',
    // indicatedValueByCostApproach: '', // Example: Calculated
  },
  incomeApproachContent: '<p>Enter content here...</p>',
  // Income Approach Data (Detailed Fields)
  incomeApproach: {
    potentialGrossIncome: '',
    vacancyCollectionLoss: '',
    effectiveGrossIncome: '', // Calculated, but good to store the result
    operatingExpenses: {
      realEstateTaxes: '',
      insurance: '',
      utilities: '',
      management: '',
      repairsMaintenance: '',
      reserves: '',
      other: '',
      total: '', // Calculated, but good to store the result
    },
    netOperatingIncome: '', // Calculated, but good to store the result
    capitalizationRate: '',
    indicatedValueByIncomeApproach: '', // Calculated, but good to store the result
  },
  reconciliationContent: '<p>Enter content here...</p>',
  // Sales Comparison Approach Data (Grid)
  salesComparables: [], // Array to hold subject + comparable objects
  // Property Summary Data
  propertyType: '',
  yearBuilt: '',

  // Site Description Data
  siteArea: '',
  zoningClassification: '',
  zoningCompliance: '',
  utilitiesWater: '',
  utilitiesSewer: '',
  utilitiesElectric: '',
  utilitiesGas: '',
  floodZoneInfo: '',
  siteDescriptionNarrative: '<p>Enter content here...</p>',

  // Improvements Description Data
  generalDescription: '',
  exteriorWalls: '',
  exteriorRoof: '',
  foundation: '',
  basement: '',
  insulation: '',
  interiorFloors: '',
  interiorWalls: '',
  interiorTrimFinish: '',
  heatingCooling: '',
  attic: '',
  amenitiesFireplace: '',
  amenitiesPatioDeck: '',
  amenitiesPool: '',
  carStorage: '',
  improvementsNarrative: '<p>Enter content here...</p>',
  // Add other sections as needed based on ProjectPlan.md
  // e.g., siteDescriptionContent, improvementsDescriptionContent, etc.
  // assumptionsAndLimitingConditionsContent: '<p>Enter content here...</p>',
  // certificationContent: '<p>Enter content here...</p>',
};

// Create the context with the initial state
export const ReportContext = createContext(initialState);

// Provider component that wraps the application or parts of it
export const ReportDataProvider = ({ children }) => {
  const [reportData, setReportData] = useState(initialState);

  // Function to update a specific field in the report data
  const updateReportData = (fieldName, value) => {
    setReportData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Clear any existing validation error for this field
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: null
    }));
  };

  // Provide the state and the update function to children components
  return (
    <ReportContext.Provider value={{
      reportData,
      updateReportData
    }}>
      {children}
    </ReportContext.Provider>
  );
};