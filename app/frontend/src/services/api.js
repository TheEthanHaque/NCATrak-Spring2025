// Base URL for API requests
const API_BASE_URL = 'http://localhost:5000';

// Generic fetch wrapper with error handling
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

// People API methods
export const peopleApi = {
  // Search people by last name
  searchByLastName: async (lastName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/people/search/${lastName}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const people = await response.json();
      
      // For each person, fetch case information
      const peopleWithCases = await Promise.all(
        people.map(async (person) => {
          try {
            // Get cases associated with this person
            const caseResponse = await fetch(`${API_BASE_URL}/api/people/case/${person.person_id}`);
            
            if (caseResponse.ok) {
              const casePeople = await caseResponse.json();
              if (casePeople && casePeople.length > 0) {
                // Attach case information to the person object
                person.case_person = casePeople.map(cp => ({
                  case_id: cp.case_id,
                  role_id: cp.role_id,
                  case_number: cp.case_number
                }));
              }
            }
          } catch (err) {
            console.error(`Error fetching case data for person ${person.person_id}:`, err);
          }
          
          return person;
        })
      );
      
      return peopleWithCases;
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  },
  
  // Get a person by ID
  getPersonById: (personId) => {
    return fetchApi(`/api/people/${personId}`);
  },
  
  // Get people associated with a case
  getPeopleByCaseId: (caseId) => {
    return fetchApi(`/api/people/case/${caseId}`);
  },
  
  // Create a new person
  createPerson: (personData) => {
    return fetchApi('/api/people', {
      method: 'POST',
      body: JSON.stringify(personData)
    });
  },
  
  // Associate a person with a case
  associatePersonWithCase: (personId, caseId, cacId) => {
    return fetchApi('/api/people/case', {
      method: 'POST',
      body: JSON.stringify({
        person_id: personId,
        case_id: caseId,
        cac_id: cacId
      })
    });
  },
  
  // Remove a person from a case
  removePersonFromCase: (personId, caseId) => {
    return fetchApi(`/api/people/case/${personId}/${caseId}`, {
      method: 'DELETE'
    });
  },
  
  // Update case-specific details for a person
  updateCasePersonDetails: (personId, caseId, details) => {
    return fetchApi(`/api/people/case/${personId}/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(details)
    });
  },
  
  // Update custody status
  updateCustodyStatus: (personId, caseId, custody) => {
    return fetchApi(`/api/people/case/${personId}/${caseId}/custody`, {
      method: 'PUT',
      body: JSON.stringify({ custody })
    });
  },
  
  // Update same household status
  updateHouseholdStatus: (personId, caseId, sameHousehold) => {
    return fetchApi(`/api/people/case/${personId}/${caseId}/household`, {
      method: 'PUT',
      body: JSON.stringify({ same_household: sameHousehold })
    });
  }
};

export const casesApi = {
  // Get list of cases for dropdown
  getCasesList: () => {
    return fetchApi('/api/cases/list');
  },
  
  // Get a case by ID
  getCaseById: (caseId) => {
    return fetchApi(`/api/cases/${caseId}`);
  },
  
  // Create a new case
  createCase: (caseData) => {
    return fetchApi('/api/cases', {
      method: 'POST',
      body: JSON.stringify(caseData)
    });
  },
  
  // Update a case
  updateCase: (caseId, caseData) => {
    return fetchApi(`/api/cases/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(caseData)
    });
  },
  
  // Delete a case
  deleteCase: (caseId) => {
    return fetchApi(`/api/cases/${caseId}`, {
      method: 'DELETE'
    });
  },
  
  // Search cases by term
  searchCases: (searchTerm) => {
    return fetchApi(`/api/case-search?term=${encodeURIComponent(searchTerm)}`);
  }
};

export const agenciesApi = {
  // Get all agencies
  getAllAgencies: () => {
    return fetchApi('/api/agencies');
  },
  
  // Get an agency by ID
  getAgencyById: (agencyId) => {
    return fetchApi(`/api/agencies/${agencyId}`);
  },
  
  // Get an agency by name
  getAgencyByName: (name) => {
    return fetchApi(`/api/agencies/name/${encodeURIComponent(name)}`);
  },
  
  // Get agencies for a CAC
  getAgenciesByCacId: (cacId) => {
    return fetchApi(`/api/agencies/cac/${cacId}`);
  },
  
  // Create a new agency
  createAgency: (agencyData) => {
    return fetchApi('/api/agencies', {
      method: 'POST',
      body: JSON.stringify(agencyData)
    });
  },
  
  // Update an agency
  updateAgency: (agencyId, agencyData) => {
    return fetchApi(`/api/agencies/${agencyId}`, {
      method: 'PUT',
      body: JSON.stringify(agencyData)
    });
  },
  
  // Get all states
  getAllStates: () => {
    return fetchApi('/api/agencies/states/all');
  },
  
  // Get all CACs
  getAllCacs: () => {
    return fetchApi('/api/agencies/cacs/all');
  }
};

export const employeesApi = {
  // Get all employees
  getAllEmployees: () => {
    return fetchApi('/api/employees');
  },
  
  // Get an employee by ID
  getEmployeeById: (employeeId) => {
    return fetchApi(`/api/employees/${employeeId}`);
  },
  
  // Get employees for an agency
  getEmployeesByAgencyId: (agencyId) => {
    return fetchApi(`/api/employees/agency/${agencyId}`);
  },
  
  // Get employees for a CAC
  getEmployeesByCacId: (cacId) => {
    return fetchApi(`/api/employees/cac/${cacId}`);
  },
  
  // Create a new employee
  createEmployee: (employeeData) => {
    return fetchApi('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData)
    });
  },
  
  // Update an employee
  updateEmployee: (employeeId, employeeData) => {
    return fetchApi(`/api/employees/${employeeId}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData)
    });
  }
};

export const mentalHealthApi = {
  // Get assessment instruments
  getAssessmentInstruments: () => {
    return fetchApi('/api/mentalhealth/assessment-instruments');
  },
  
  // Get assessment instrument by name
  getAssessmentInstrumentByName: (name) => {
    return fetchApi(`/api/mentalhealth/assessment-instruments/${encodeURIComponent(name)}`);
  },
  
  // Create a new assessment instrument
  createAssessmentInstrument: (instrumentData) => {
    return fetchApi('/api/mentalhealth/assessment-instruments', {
      method: 'POST',
      body: JSON.stringify(instrumentData)
    });
  },
  
  // Get assessments for a case
  getAssessmentsByCaseId: (caseId) => {
    return fetchApi(`/api/mentalhealth/assessments/case/${caseId}`);
  },
  
  // Get assessment by ID
  getAssessmentById: (assessmentId) => {
    return fetchApi(`/api/mentalhealth/assessments/${assessmentId}`);
  },
  
  // Create a new assessment
  createAssessment: (assessmentData) => {
    return fetchApi('/api/mentalhealth/assessments', {
      method: 'POST',
      body: JSON.stringify(assessmentData)
    });
  },
  
  // Add scores for an assessment
  addAssessmentScores: (scoresData) => {
    return fetchApi('/api/mentalhealth/assessment-scores', {
      method: 'POST',
      body: JSON.stringify(scoresData)
    });
  },
  
  // Get diagnoses for a case
  getDiagnosesByCaseId: (caseId) => {
    return fetchApi(`/api/mentalhealth/diagnoses/case/${caseId}`);
  },
  
  // Create a new diagnosis
  createDiagnosis: (diagnosisData) => {
    return fetchApi('/api/mentalhealth/diagnoses', {
      method: 'POST',
      body: JSON.stringify(diagnosisData)
    });
  },
  
  // Get treatment models
getTreatmentModels: () => {
  return fetchApi('/api/mentalhealth/treatment-models');
},

// Get treatment model by ID
getTreatmentModelById: (modelId) => {
  return fetchApi(`/api/mentalhealth/treatment-models/${modelId}`);
},

// Create a new treatment model
createTreatmentModel: (modelData) => {
  return fetchApi('/api/mentalhealth/treatment-models', {
    method: 'POST',
    body: JSON.stringify(modelData)
  });
},

// Update a treatment model
updateTreatmentModel: (modelId, modelData) => {
  return fetchApi(`/api/mentalhealth/treatment-models/${modelId}`, {
    method: 'PUT',
    body: JSON.stringify(modelData)
  });
},

// Delete a treatment model
deleteTreatmentModel: (modelId) => {
  return fetchApi(`/api/mentalhealth/treatment-models/${modelId}`, {
    method: 'DELETE'
  });
},

// Update a treatment plan
updateTreatmentPlan: (planId, planData) => {
  return fetchApi(`/api/mentalhealth/treatment-plans/${planId}`, {
    method: 'PUT',
    body: JSON.stringify(planData)
  });
},
  
  // Get treatment plans for a case
  getTreatmentPlansByCaseId: (caseId) => {
    return fetchApi(`/api/mentalhealth/treatment-plans/case/${caseId}`);
  },
  
  // Create a new treatment plan
  createTreatmentPlan: (planData) => {
    return fetchApi('/api/mentalhealth/treatment-plans', {
      method: 'POST',
      body: JSON.stringify(planData)
    });
  },
  
  // Get providers for a case
  getProvidersByCaseId: (caseId) => {
    return fetchApi(`/api/mentalhealth/providers/case/${caseId}`);
  },
  
  // Add a provider to a case
  addProvider: (providerData) => {
    return fetchApi('/api/mentalhealth/providers', {
      method: 'POST',
      body: JSON.stringify(providerData)
    });
  },
  
  // Delete a provider from a case
  deleteProvider: (providerId) => {
    return fetchApi(`/api/mentalhealth/providers/${providerId}`, {
      method: 'DELETE'
    });
  },
  
  // Get sessions for a case
  getSessionsByCaseId: (caseId) => {
    return fetchApi(`/api/mentalhealth/sessions/case/${caseId}`);
  },
  
  // Create a new session
  createSession: (sessionData) => {
    return fetchApi('/api/mentalhealth/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  },
  
  // Add an attendee to a session
  addSessionAttendee: (sessionId, attendeeData) => {
    return fetchApi(`/api/mentalhealth/sessions/${sessionId}/attendees`, {
      method: 'POST',
      body: JSON.stringify(attendeeData)
    });
  }
  
  
};

export const victimAdvocacyApi = {
  // Get VA sessions for a case
  getSessionsByCaseId: (caseId) => {
    return fetchApi(`/api/va/sessions/case/${caseId}`);
  },
  
  // Get VA session by ID
  getSessionById: (sessionId) => {
    return fetchApi(`/api/va/sessions/${sessionId}`);
  },
  
  // Create a new VA session
  createSession: (sessionData) => {
    return fetchApi('/api/va/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  },
  
  // Update a VA session
  updateSession: (sessionId, sessionData) => {
    return fetchApi(`/api/va/sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData)
    });
  },
  
  // Delete a VA session
  deleteSession: (sessionId) => {
    return fetchApi(`/api/va/sessions/${sessionId}`, {
      method: 'DELETE'
    });
  },
  
  // Get attendees for a VA session
  getSessionAttendees: (sessionId) => {
    return fetchApi(`/api/va/sessions/${sessionId}/attendees`);
  },
  
  // Add an attendee to a VA session
  addSessionAttendee: (sessionId, attendeeData) => {
    return fetchApi(`/api/va/sessions/${sessionId}/attendees`, {
      method: 'POST',
      body: JSON.stringify(attendeeData)
    });
  },
  
  // Get services for a VA session
  getSessionServices: (sessionId) => {
    return fetchApi(`/api/va/sessions/${sessionId}/services`);
  },
  
  // Add a service to a VA session
  addSessionService: (sessionId, serviceData) => {
    return fetchApi(`/api/va/sessions/${sessionId}/services`, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },
  
  // Update VA-specific case information
  updateVaCase: (caseId, caseData) => {
    return fetchApi(`/api/va/case/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(caseData)
    });
  }
};

// Export the combined API service
const apiService = {
  people: peopleApi,
  cases: casesApi,
  agencies: agenciesApi,
  employees: employeesApi,
  mentalHealth: mentalHealthApi,
  victimAdvocacy: victimAdvocacyApi
};

export default apiService;