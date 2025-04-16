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
  searchByLastName: (lastName) => {
    return fetchApi(`/api/people/search/${lastName}`);
  },
  
  // Get a person by ID
  getPersonById: (personId) => {
    return fetchApi(`/api/people/${personId}`);
  },
  
  // Update a person
  updatePerson: (personId, personData) => {
    return fetchApi(`/api/people/${personId}`, {
      method: 'PUT',
      body: JSON.stringify(personData)
    });
  },

  // Advanced search with multiple criteria
  advancedSearch: (criteria) => {
    // Build query string from criteria
    const queryParams = Object.entries(criteria)
      .filter(([_, value]) => value) // Filter out empty values
      .map(([key, value]) => {
        // Handle date objects
        if (value instanceof Date) {
          return `${key}=${value.toISOString().split('T')[0]}`;
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');
    
    return fetchApi(`/api/people/advanced-search?${queryParams}`);
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
  
  // Search cases by term
  searchCases: (searchTerm) => {
    return fetchApi(`/api/case-search?term=${encodeURIComponent(searchTerm)}`);
  }
};

// Export the combined API service
const apiService = {
  people: peopleApi,
  cases: casesApi
};

export default apiService;