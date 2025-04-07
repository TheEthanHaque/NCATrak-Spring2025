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
  }
};

// Named export for the API service
const apiService = {
  people: peopleApi
};

export default apiService;