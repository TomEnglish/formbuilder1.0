# Appraisal Report Generator - Detailed Project Plan (MVP Focus)

**Goal:** Quickly and easily generate professional reports by managing boilerplate and variable text, inputting key data, and structuring content for finalization in Google Docs.

**Deferred for Post-MVP:** Complex valuation calculations (Sales Comp, Cost, Income), direct database integration (Firebase), AI editing features, multi-user support.

---

## Phase 1: Core Component Creation & Display (Refined)

*   **Phase Overview:** Create fundamental report section components, establish core data management using React Context (`ReportDataContext`), and integrate basic "survey" data input. Ensure components are designed for future flexibility.
*   **Subcomponent: Foundational Components**
    *   [x] Create `ReportHeader` component (Already done, may need prop updates)
    *   [x] Create `PropertySummary` component (Already done, may need prop updates)
    *   [x] Create `SiteDescription` component (Already done, may need prop updates)
    *   [x] Create `ImprovementsDescription` component (Already done, may need prop updates)
    *   [x] Create `Certification` component (Already done, needs boilerplate)
    *   [x] Create `AssumptionsAndLimitingConditions` component (Already done, needs boilerplate)
*   **Subcomponent: Placeholder & Narrative Components**
    *   [ ] Create `ScopeOfWork` component (Needs rich text integration)
    *   [ ] Create `HighestAndBestUse` component (Needs rich text integration)
    *   [ ] Create `LetterOfTransmittal` component (Needs rich text integration)
    *   [ ] Clarify MVP requirements for Addenda content/structure and implement its basic container component.
    *   [ ] Create `SalesComparisonApproach` component (Placeholder structure for narrative/pasted analysis)
    *   [ ] Create `CostApproach` component (Placeholder structure for narrative/pasted analysis)
    *   [ ] Create `IncomeApproach` component (Placeholder structure for narrative/pasted analysis)
    *   [ ] Create `Reconciliation` component (Placeholder structure for narrative/pasted analysis)
    *   [ ] Test: Verify all newly created components render without errors.
*   **Subcomponent: Data & State Management (React Context)**
    *   [x] Create `src/context/ReportDataContext.jsx`. Define initial state structure (survey data, rich text content placeholders). (Completed: 2025-04-15)
    *   [x] Implement the `ReportDataProvider` component within `ReportDataContext.jsx`. (Completed: 2025-04-15)
    *   [x] Wrap the main application in `App.jsx` with the `ReportDataProvider`. (Completed: 2025-04-15)
    *   [x] Create dedicated `InputForm.jsx` component for survey data input. (Completed: 2025-04-15)
    *   [x] Connect `InputForm.jsx` fields to update the survey data portion of the `ReportDataContext`. (Completed: 2025-04-15)
    *   [ ] Test: Verify updating inputs in the form updates the `ReportDataContext` correctly.
    *   [ ] Refactor components (`ReportHeader`, `PropertySummary`, etc.) to consume survey data from `ReportDataContext` using `useContext`.
    *   [ ] Test: Verify components consume and render initial/updated data correctly from the context.
*   **Subcomponent: Component Integration & Basic Layout**
    *   [x] Integrate core components into `App.jsx` (Partially done)
    *   [ ] Integrate remaining placeholder/narrative components into `App.jsx`.
    *   [ ] Structure `App.jsx` render method to allow for potential future reordering of sections (e.g., rendering from an array of component references or configuration).
    *   [ ] Test: Verify all integrated components render in the intended order within `App.jsx`.

## Phase 2: Rich Text Editing (High Priority)

*   **Phase Overview:** Integrate rich text editing capabilities into components requiring variable narrative content.
*   **Subcomponent: Editable Field Implementation**
    *   [x] Create `EditableField` component (Done)
    *   [x] Install TipTap dependencies (Done)
    *   [x] Integrate TipTap editor into `EditableField` (Done)
    *   [ ] Refactor `EditableField` to update the relevant rich text content within `ReportDataContext`.
*   **Subcomponent: Integration into Report Sections**
    *   [ ] Integrate `EditableField` into `ScopeOfWork.jsx` for narrative sections. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `ScopeOfWork` updates its corresponding state in `ReportDataContext`.
    *   [ ] Integrate `EditableField` into `HighestAndBestUse.jsx` for analysis sections. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `HighestAndBestUse` updates its corresponding state in `ReportDataContext`.
    *   [ ] Integrate `EditableField` into `LetterOfTransmittal.jsx`. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `LetterOfTransmittal` updates its corresponding state in `ReportDataContext`.
    *   [ ] Integrate `EditableField` into `SalesComparisonApproach.jsx` placeholder section. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `SalesComparisonApproach` updates its corresponding state in `ReportDataContext`.
    *   [ ] Integrate `EditableField` into `CostApproach.jsx` placeholder section. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `CostApproach` updates its corresponding state in `ReportDataContext`.
    *   [ ] Integrate `EditableField` into `IncomeApproach.jsx` placeholder section. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `IncomeApproach` updates its corresponding state in `ReportDataContext`.
    *   [ ] Integrate `EditableField` into `Reconciliation.jsx` placeholder section. Connect to update `ReportDataContext`.
    *   [ ] Test: Verify rich text editing in `Reconciliation` updates its corresponding state in `ReportDataContext`.
    *   [ ] Review `PropertySummary`, `SiteDescription`, `ImprovementsDescription` for fields potentially benefiting from rich text and integrate if needed, connecting to `ReportDataContext`.
    *   [ ] Test: If integrated, verify rich text editing in `PropertySummary`/`SiteDescription`/`ImprovementsDescription` updates `ReportDataContext`.
*   **Subcomponent: Enhancements (Lower Priority for MVP)**
    *   [ ] Add basic console logging for potential errors within the TipTap editor integration in `EditableField`.
    *   [ ] (Optional) Add TipTap toolbar/controls for basic formatting (Bold, Italic, Lists).
    *   [ ] (Optional) Test: Verify toolbar controls apply formatting correctly within the editor.

## Phase 3: Boilerplate & Content Integration (High Priority)

*   **Phase Overview:** Identify and integrate static boilerplate text, populate components with structure based on the sample report.
*   **Subcomponent: Boilerplate Management (Import Strategy)**
    *   [x] Analyze sample report for structure and boilerplate (`company-report-sample.txt`).
    *   [x] Document identified boilerplate (`BoilerplateText.md`).
    *   [ ] Create `src/constants/boilerplate.js` file.
    *   [ ] Extract static boilerplate text (Certification, Assumptions, Definitions, etc.) into exported constants in `boilerplate.js`.
    *   [ ] Refactor `Certification.jsx` to import and display text from `boilerplate.js`.
    *   [ ] Test: Verify Certification boilerplate displays correctly and completely via import.
    *   [ ] Refactor `AssumptionsAndLimitingConditions.jsx` to import and display text from `boilerplate.js`.
    *   [ ] Test: Verify Assumptions boilerplate displays correctly and completely via import.
    *   [ ] Refactor other components (`ScopeOfWork`, etc.) needing static text to import from `boilerplate.js`. Mark sections intended to remain static.
    *   [ ] Test: Verify other integrated boilerplate sections display correctly via import.
*   **Subcomponent: Placeholder Content Structure**
    *   [ ] Add standard headings and basic structural elements (based on `company-report-sample.txt`) within the placeholder components (`SalesComparisonApproach`, `CostApproach`, `IncomeApproach`, `Reconciliation`) to guide where pasted analysis should go.
    *   [ ] Test: Verify placeholder components render the defined headings/structure correctly.

## Phase 4: Table of Contents Generation (New MVP Item)

*   **Phase Overview:** Automatically generate a Table of Contents based on the included report sections.
*   **Subcomponent: TOC Logic & Integration**
    *   [ ] Create `TableOfContents` component.
    *   [ ] Define or determine the data structure/array (e.g., in `App.jsx` or context) that dictates the report section order and titles for TOC generation.
    *   [ ] Implement logic in `TableOfContents.jsx` to generate list items based on sections.
    *   [ ] Test: Verify TOC component renders a list based on included sections.
    *   [ ] Test: Verify TOC items correspond accurately to section titles/order.
    *   [ ] Integrate `TableOfContents` component into `App.jsx` at the appropriate location.
    *   [ ] Test: Verify TOC displays correctly within the main App layout.

## Phase 5: Output Generation (Focus on GDocs Compatibility)

*   **Phase Overview:** Ensure the application's output can be easily copied and pasted into Google Docs with reasonable structure and formatting. Refine print-specific CSS minimally.
*   **Subcomponent: HTML Structure for Copy/Paste**
    *   [ ] Review the rendered HTML structure of the report page.
    *   [ ] Ensure semantic HTML is used where possible (h1, h2, p, ul, etc.).
    *   [ ] Minimize complex CSS layouts that won't translate well to pasted content.
    *   [ ] Test: Basic copy/paste into GDocs from Chrome - check structure preservation (headings, paragraphs, lists).
    *   [ ] Test: Basic copy/paste into GDocs from Firefox - check structure preservation.
*   **Subcomponent: Print CSS (Minimal for Copy/Paste)**
    *   [x] Implement basic print trigger (`react-to-print`).
    *   [x] Add initial `@media print` CSS rules (hiding UI, basic margins).
    *   [x] Adjust layout width for print.
    *   [ ] Perform basic testing of copy-pasting content into Google Docs *after* CSS adjustments.
    *   [ ] Test: Re-test copy/paste into GDocs (Chrome, Firefox) and verify structure/readability remain acceptable.
    *   [ ] *Defer:* Advanced print features like page breaks, print headers/footers.

## Phase 6: Styling & Branding (MVP Polish)

*   **Phase Overview:** Apply basic branding and refine UI for a professional look.
*   **Subcomponent: Branding Assets & CSS Implementation**
    *   [ ] Confirm final logo file (`src/assets/Logo.png`).
    *   [ ] Define brand color palette and typography.
    *   [ ] Update main CSS files (`index.css`, `App.css`) with brand colors/fonts.
    *   [ ] Test: Visually verify branding (logo, colors, fonts) is applied correctly in the browser.
    *   [ ] Ensure `ReportHeader.jsx` displays the logo and company info correctly with styling.
    *   [ ] Test: Visually verify `ReportHeader` styling.
    *   [ ] Refine styling for core UI elements: `EditableField`, Buttons (if any), Section Containers/Headings.
    *   [ ] Test: Visually verify styling of `EditableField`, containers, and headings.
    *   [ ] Ensure basic print/paste styles align with branding where feasible.
    *   [ ] Test: Visually check branding elements in the copy/pasted GDocs output (logo, basic colors if applicable).

## Phase 7: Final MVP Testing & Refinement

*   **Phase Overview:** Perform final integration testing, cross-browser checks, and User Acceptance Testing (UAT) for the complete MVP workflow.
*   **Subcomponent: Integration & Workflow Testing**
    *   [ ] Test end-to-end workflow: Update survey data -> Edit narrative fields -> Verify boilerplate -> Generate TOC -> Copy/Paste to GDocs.
    *   [ ] Test interactions between components (e.g., ensure updating client name reflects in header and relevant text fields).
*   **Subcomponent: Cross-Browser & UAT**
    *   [ ] Perform final cross-browser testing (Chrome, Firefox, Edge/Safari if possible) of the live application view.
    *   [ ] Perform final testing of the copy-paste to Google Docs workflow across major browsers.
    *   [ ] Conduct User Acceptance Testing (UAT) with the intended user(s) focusing on the complete MVP workflow.
*   **Subcomponent: Error Handling**
    *   [ ] Implement basic React Error Boundaries around key application sections (e.g., main report view, input form) to catch rendering errors gracefully.
*   **Subcomponent: Accessibility Checks (a11y)**
    *   [ ] Review rendered HTML for semantic correctness (headings, landmarks, lists).
    *   [ ] Test keyboard navigation thoroughly (tab order, focus indicators, interactive element activation).
    *   [ ] Utilize automated accessibility testing tools (e.g., Axe DevTools browser extension) to identify issues.
    *   [ ] Check color contrast ratios for text and UI elements against WCAG guidelines.
*   **Subcomponent: Refinement**
    *   [ ] Address bugs/usability issues found in testing.
    *   [ ] Code cleanup (remove console logs, unused variables).
    *   [ ] Add comments for key logic (data flow, TOC generation).
    *   [ ] Update README with final MVP usage instructions.

---
*This plan should be regularly updated. Mark tasks with `[/]` when in progress and `[x]` when complete.*
