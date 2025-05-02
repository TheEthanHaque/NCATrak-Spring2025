# NCATrak-Spring2025 Complete Project Structure

## Note This file may be broken in github view, just click view as code or open as a file.


NCATrak-Spring2025/
│
├── app/
│   ├── pycache/
│   │   └── database_lookup_search.cpython-314.pyc
│   │
│   ├── api/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── routes/
│   │   │   ├── agencies.js
│   │   │   ├── case-search.js
│   │   │   ├── cases.js
│   │   │   ├── employee.js
│   │   │   ├── mentalhealth.js
│   │   │   ├── people.js
│   │   │   └── victimadvocacy.js
│   │   ├── tests/
│   │   │   ├── api.test.js
│   │   │   ├── check-database.js
│   │   │   ├── debug-schema.js
│   │   │   ├── setup.js
│   │   │   ├── test-app.js
│   │   │   └── tests.md
│   │   ├── utils/
│   │   │   └── db.js
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── API_Intergration.md
│   │   ├── API_README.md
│   │   ├── eye_tracker.py
│   │   ├── index.js
│   │   ├── jest.config.js
│   │   ├── package-lock.json
│   │   └── package.json
│   │
│   ├── database/
│   │   ├── pycache/
│   │   ├── data_tables/
│   │   │   ├── cac_agency_table.sql
│   │   │   ├── cac_case_table.sql
│   │   │   ├── case_mh_assessment_diagnosis_table.sql
│   │   │   ├── case_mh_assessment_instrument_table.sql
│   │   │   ├── case_mh_assessment_measure_scores_table.sql
│   │   │   ├── case_mh_assessment_table.sql
│   │   │   ├── case_mh_provider_table.sql
│   │   │   ├── case_mh_service_barriers_table.sql
│   │   │   ├── case_mh_session_attendee_table.sql
│   │   │   ├── case_mh_session_attribute_group_table.sql
│   │   │   ├── case_mh_session_log_enc_table.sql
│   │   │   ├── case_mh_treatment_models_table.sql
│   │   │   ├── case_mh_treatment_plans_table.sql
│   │   │   ├── case_person_table.sql
│   │   │   ├── case_va_session_attendee_table.sql
│   │   │   ├── case_va_session_log_table.sql
│   │   │   ├── case_va_session_service_table.sql
│   │   │   ├── child_advocacy_center_table.sql
│   │   │   ├── employee_account_table.sql
│   │   │   ├── employee_table.sql
│   │   │   ├── person_table.sql
│   │   │   └── state_table.sql
│   │   ├── data_tables_variables/
│   │   │   ├── cac_agency.sql
│   │   │   ├── cac_case.sql
│   │   │   ├── case_mh_assessment_diagnosis.sql
│   │   │   ├── case_mh_assessment_instrument.sql
│   │   │   ├── case_mh_assessment_measure_scores.sql
│   │   │   ├── case_mh_assessment.sql
│   │   │   ├── case_mh_provider.sql
│   │   │   ├── case_mh_service_barriers.sql
│   │   │   ├── case_mh_session_attendee.sql
│   │   │   ├── case_mh_session_attribute_group.sql
│   │   │   ├── case_mh_session_log_enc.sql
│   │   │   ├── case_mh_treatment_models.sql
│   │   │   ├── case_mh_treatment_plans.sql
│   │   │   ├── case_person.sql
│   │   │   ├── case_va_session_attendee.sql
│   │   │   ├── case_va_session_log.sql
│   │   │   ├── case_va_session_service.sql
│   │   │   ├── child_advocacy_center.sql
│   │   │   └── person.sql
│   │   ├── init.py
│   │   ├── config.py
│   │   ├── connect.py
│   │   ├── create_database.py
│   │   ├── create_tables.py
│   │   ├── create_user.py
│   │   ├── database.ini
│   │   ├── delete_tables.sql
│   │   ├── populate_database.py
│   │   └── populate_scenario.py
│   │
│   ├── frontend/
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── AOIBox.js
│   │   │   │   ├── AOIInput.js
│   │   │   │   ├── AssessmentInterface.js
│   │   │   │   ├── CaseInfo.js
│   │   │   │   ├── CaseNotes.css
│   │   │   │   ├── CaseNotes.js
│   │   │   │   ├── ConfirmationModal.js
│   │   │   │   ├── EyeTracker.js
│   │   │   │   ├── GeneralTab.css
│   │   │   │   ├── GeneralTab.js
│   │   │   │   ├── Lookup.css
│   │   │   │   ├── Lookup.js
│   │   │   │   ├── MHAssessment.css
│   │   │   │   ├── MHAssessment.js
│   │   │   │   ├── MHBasicInterface.css
│   │   │   │   ├── MHBasicInterface.js
│   │   │   │   ├── MHSection.js
│   │   │   │   ├── NewCase.js
│   │   │   │   ├── PeopleInterface.css
│   │   │   │   ├── PeopleInterface.js
│   │   │   │   ├── PersonBio.js
│   │   │   │   ├── PersonProfile.js
│   │   │   │   ├── SearchPerson.js
│   │   │   │   ├── SubNavigationBar.js
│   │   │   │   ├── TreatmentPlan.css
│   │   │   │   ├── TreatmentPlan.js
│   │   │   │   ├── VALogInterface.css
│   │   │   │   └── VALogInterface.js
│   │   │   ├── context/
│   │   │   │   ├── CaseContext.js
│   │   │   │   └── CaseSelector.js
│   │   │   ├── services/
│   │   │   │   └── api.js
│   │   │   ├── aoiConfig.js
│   │   │   ├── AOIEventViewer.js
│   │   │   ├── AOITracker.js
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   └── useAOILogging.js
│   │   ├── .gitignore
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   └── requirements.txt
│   │
│   ├── generator/
│   │   ├── pycache/
│   │   ├── csvs/
│   │   ├── init.py
│   │   ├── data_generator.py
│   │   └── util.py
│   │
│   ├── scenarios/
│   ├── package-lock.json
│   ├── package.json
│   ├── requirements.txt
│   └── wizard.py
│
├── backend/
│   ├── app.py
│   └── server.py
│
├── Fall 2024/
│   ├── DEV-README.md
│   ├── environment.yml
│   ├── NCA-Trak-Mock-Workflow.md
│   └── README.md
│
├── frontend/
│   ├── package-lock.json
│   └── package.json
│
├── task-app/
│   ├── 1.pdf
│   ├── 2.pdf
│   ├── 3.pdf
│   ├── 4.pdf
│   ├── 5.pdf
│   ├── 6.pdf
│   ├── 7.pdf
│   ├── 8.pdf
│   ├── 9.pdf
│   ├── 10.pdf
│   ├── aoiTaskTracker.js
│   ├── index.html
│   ├── README\.md
│   ├── script.js
│   └── styles.css
│
├── .gitattributes
├── .gitignore
├── LICENSE
├── package-lock.json
├── README_Spring2025.md
├── README.md
└── requirements.txt

## Detailed Description

### Root Directory

- `.gitattributes`: Specifies attributes for pathnames in Git.
- `.gitignore`: Specifies intentionally untracked files to ignore in Git.
- `LICENSE`: Contains the legal terms under which the software is distributed.
- `package-lock.json`: Automatically generated file for any operations where npm modifies either the node_modules tree or package.json.
- `package.json`: Lists the package dependencies for the project and contains other metadata.
- `README_Spring2025.md`: Specific readme file for the Spring 2025 version of the project.
- `README.md`: General readme file with project overview, setup instructions, and other important information.
- `requirements.txt`: Lists Python package dependencies for the project.

### app Directory
- `package-lock.json` and `package.json`: NPM package management files for the app directory.
- `requirements.txt`: Python requirements for the app.
- `wizard.py`: Script for running setup / configuration.

#### __pycache__ Subdirectory
- `database_lookup_search.cpython-314.pyc`: Compiled Python file for database lookup and search functionality.

#### api Subdirectory

- `prisma/schema.prisma`: Defines the data model for the Prisma ORM.

- `routes/`:
  - `agencies.js`: API routes for agency-related operations.
  - `case-search.js`: API routes for case search functionality.
  - `cases.js`: API routes for case-related operations.
  - `employee.js`: API routes for employee-related operations.
  - `mentalhealth.js`: API routes for mental health-related operations.
  - `people.js`: API routes for people-related operations.
  - `victimadvocacy.js`: API routes for victim advocacy-related operations.

- `tests/`:
  - `api.test.js`: Test file for API endpoints.
  - `check-database.js`: Script to check database connectivity and integrity.
  - `debug-schema.js`: Script for debugging database schema issues.
  - `setup.js`: Setup file for tests.
  - `test-app.js`: Test file for the main application.
  - `tests.md`: Documentation for tests.

- `utils/db.js`: Utility functions for database operations.

- `.env`: Environment variables configuration file.
- `.gitignore`: Git ignore file specific to the API directory.
- `API_Intergration.md`: Documentation for API integration.
- `API_README.md`: README file specific to the API.
- `eye_tracker.py`: Python script for eye tracking functionality.
- `index.js`: Main entry point for the API server.
- `jest.config.js`: Configuration file for Jest testing framework.
- `package-lock.json`: NPM package lock file for the API.
- `package.json`: NPM package file for the API.

#### database Subdirectory

- `__pycache__/`: Directory for compiled Python files.

- `data_tables/`: Contains SQL files for creating database tables:
  - `cac_agency_table.sql`: Child Advocacy Center agency table.
  - `cac_case_table.sql`: Child Advocacy Center case table.
  - `case_mh_assessment_diagnosis_table.sql`: Mental health assessment diagnosis table.
  - `case_mh_assessment_instrument_table.sql`: Mental health assessment instrument table.
  - `case_mh_assessment_measure_scores_table.sql`: Mental health assessment measure scores table.
  - `case_mh_assessment_table.sql`: Mental health assessment table.
  - `case_mh_provider_table.sql`: Mental health provider table.
  - `case_mh_service_barriers_table.sql`: Mental health service barriers table.
  - `case_mh_session_attendee_table.sql`: Mental health session attendee table.
  - `case_mh_session_attribute_group_table.sql`: Mental health session attribute group table.
  - `case_mh_session_log_enc_table.sql`: Mental health session log encounter table.
  - `case_mh_treatment_models_table.sql`: Mental health treatment models table.
  - `case_mh_treatment_plans_table.sql`: Mental health treatment plans table.
  - `case_person_table.sql`: Case person relationship table.
  - `case_va_session_attendee_table.sql`: Victim advocacy session attendee table.
  - `case_va_session_log_table.sql`: Victim advocacy session log table.
  - `case_va_session_service_table.sql`: Victim advocacy session service table.
  - `child_advocacy_center_table.sql`: Child advocacy center table.
  - `employee_account_table.sql`: Employee account table.
  - `employee_table.sql`: Employee table.
  - `person_table.sql`: Person table.
  - `state_table.sql`: State table.

- `data_tables_variables/`: Contains SQL files defining variables or data for tables:
  - Similar structure to data_tables/, but containing variable definitions

- `__init__.py`: Python package initializer.
- `config.py`: Configuration settings for the database.
- `connect.py`: Database connection script.
- `create_database.py`: Script to create the database.
- `create_tables.py`: Script to create all database tables.
- `create_user.py`: Script to create database users.
- `database.ini`: Database configuration file.
- `delete_tables.sql`: SQL script to delete tables.
- `populate_database.py`: Script to populate the database with initial data.
- `populate_scenario.py`: Script to populate the database with scenario-specific data.

#### frontend Subdirectory

- `public/`:
  - `favicon.ico`: Website favicon.
  - `index.html`: Main HTML file for the React app.
  - `logo192.png` and `logo512.png`: Logo images for various uses.
  - `manifest.json`: Web app manifest file.
  - `robots.txt`: File to instruct web robots.

- `src/`:
  - `components/`: React components:
    - `AOIBox.js` and `AOIInput.js`: Components for Area of Interest functionality.
    - `AssessmentInterface.js`: Interface for assessments.
    - `CaseInfo.js`: Component for displaying case information.
    - `CaseNotes.css` and `CaseNotes.js`: Styling and component for case notes.
    - `ConfirmationModal.js`: Modal for confirmations.
    - `EyeTracker.js`: Component for eye tracking functionality.
    - `GeneralTab.css` and `GeneralTab.js`: Styling and component for general tab.
    - `Lookup.css` and `Lookup.js`: Styling and component for lookup functionality.
    - `MHAssessment.css` and `MHAssessment.js`: Styling and component for mental health assessments.
    - `MHBasicInterface.css` and `MHBasicInterface.js`: Styling and component for basic mental health interface.
    - `MHSection.js`: Component for mental health section.
    - `NewCase.js`: Component for creating new cases.
    - `PeopleInterface.css` and `PeopleInterface.js`: Styling and component for people interface.
    - `PersonBio.js` and `PersonProfile.js`: Components for person biography and profile.
    - `SearchPerson.js`: Component for person search functionality.
    - `SubNavigationBar.js`: Component for sub-navigation.
    - `TreatmentPlan.css` and `TreatmentPlan.js`: Styling and component for treatment plans.
    - `VALogInterface.css` and `VALogInterface.js`: Styling and component for victim advocacy log interface.

  - `context/`:
    - `CaseContext.js`: React context for case-related state management.
    - `CaseSelector.js`: Component for case selection.

  - `services/`:
    - `api.js`: Service for API interactions.

  - `aoiConfig.js`: Configuration for Area of Interest functionality.
  - `AOIEventViewer.js`: Component for viewing AOI events.
  - `AOITracker.js`: Component for tracking AOIs.
  - `App.css` and `App.js`: Main styling and component for the React app.
  - `index.css` and `index.js`: Entry point styling and script for the React app.
  - `useAOILogging.js`: Custom hook for AOI logging.

- `.gitignore`: Git ignore file for the frontend.
- `package-lock.json` and `package.json`: NPM package management files for the frontend.
- `README.md`: README file for the frontend.
- `requirements.txt`: Python requirements for the frontend (if any).

#### generator Subdirectory

- `__pycache__/`: Directory for compiled Python files.
- `csvs/`: Directory containing CSV files for data generation.
- `__init__.py`: Python package initializer.
- `data_generator.py`: Main script for generating mock data.
- `util.py`: Utility functions for data generation.

#### scenarios Subdirectory

[Directory for testing scenarios. Just a test Directory]

### backend Directory

- `app.py`: Main application file for the backend.
- `server.py`: Server configuration and setup file.

### Fall 2024 Directory

- `DEV-README.md`: README file for developers, specific to Fall 2024 version.
- `environment.yml`: Conda environment configuration file.
- `NCA-Trak-Mock-Workflow.md`: Documentation for the mock workflow.
- `README.md`: General README file for the Fall 2024 version.

### frontend Directory

- `package-lock.json` and `package.json`: NPM package management files for an additional or separate frontend component.

### task-app Directory

- `1.pdf` to `10.pdf`: PDF files (for now, just test files with numbers of the numbers 1-10).
- `aoiTaskTracker.js`: JavaScript file for the AOI task tracker functionality.
- `index.html`: Main HTML file for the task app.
- `README.md`: README file for the task app.
- `script.js`: Main JavaScript file for the task app.
- `styles.css`: CSS file for styling the task app.
