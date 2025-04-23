import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Grid,
  Link
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import ResetIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../context/CaseContext';

const API_BASE_URL = 'http://localhost:5000';

const SearchPerson = () => {
  const navigate = useNavigate();
  const { setCurrentCase } = useCase();
  
  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    phoneNumber: ''
  });
  
  // State for search results and pagination
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset search form
  const handleReset = () => {
    setSearchCriteria({
      lastName: '',
      firstName: '',
      dateOfBirth: '',
      phoneNumber: ''
    });
    setSearchResults([]);
  };

  // Helper function to map role_id to human-readable role
  const getPersonRole = (roleId) => {
    if (!roleId) return 'Unknown Role';
    
    const roles = {
      1: 'Victim',
      2: 'Guardian',
      3: 'Suspect', 
      4: 'Witness',
      5: 'Family Member'
    };
    
    return roles[roleId] || 'Unknown Role';
  };

  // Handle search
  const handleSearch = async () => {
    // Validate at least last name is provided
    if (!searchCriteria.lastName) {
      setError("Please enter at least a last name to search");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Make direct API call to search endpoint
      const response = await fetch(`${API_BASE_URL}/api/people/search/${encodeURIComponent(searchCriteria.lastName)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search API response:', data);
      
      // Filter results if other criteria are provided
      let filteredResults = [...data];
      
      if (searchCriteria.firstName) {
        filteredResults = filteredResults.filter(person => 
          person.first_name?.toLowerCase().includes(searchCriteria.firstName.toLowerCase())
        );
      }
      
      if (searchCriteria.dateOfBirth) {
        const searchDate = new Date(searchCriteria.dateOfBirth).toISOString().split('T')[0];
        filteredResults = filteredResults.filter(person => {
          if (!person.date_of_birth) return false;
          const personDob = new Date(person.date_of_birth).toISOString().split('T')[0];
          return personDob === searchDate;
        });
      }
      
      // For each person, get their cases
      const enhancedResults = await Promise.all(
        filteredResults.map(async (person) => {
          try {
            // If the person has case_person data already, use it
            if (person.case_person && person.case_person.length > 0) {
              const caseInfo = person.case_person[0];
              
              return {
                id: person.person_id.toString(),
                firstName: person.first_name || '',
                lastName: person.last_name || '',
                alias: '', // No nick_name field in database
                caseId: caseInfo?.case_id?.toString() || '',
                caseNumber: caseInfo?.cac_case?.case_number || '',
                role: getPersonRole(caseInfo?.role_id),
                dateOfBirth: person.date_of_birth || '',
                // Removed ssn field which doesn't exist in the database
              };
            }
            
            // If no case_person data, try to fetch it
            const caseResponse = await fetch(`${API_BASE_URL}/api/people/case/${person.person_id}`);
            
            if (caseResponse.ok) {
              const caseData = await caseResponse.json();
              console.log(`Case data for person ${person.person_id}:`, caseData);
              
              if (caseData && caseData.length > 0) {
                const caseInfo = caseData[0];
                
                return {
                  id: person.person_id.toString(),
                  firstName: person.first_name || '',
                  lastName: person.last_name || '',
                  alias: '', // No nick_name field in database
                  caseId: caseInfo.case_id?.toString() || '',
                  caseNumber: caseInfo.cac_case?.case_number || '',
                  role: getPersonRole(caseInfo.role_id),
                  dateOfBirth: person.date_of_birth || '',
                  // Removed ssn field which doesn't exist in the database
                };
              }
            }
            
            // If no case data found, return person without case info
            return {
              id: person.person_id.toString(),
              firstName: person.first_name || '',
              lastName: person.last_name || '',
              alias: '', // No nick_name field in database
              caseId: '',
              caseNumber: '',
              role: 'Unknown Role',
              dateOfBirth: person.date_of_birth || '',
              // Removed ssn field which doesn't exist in the database
            };
          } catch (err) {
            console.error(`Error processing case info for person ${person.person_id}:`, err);
            
            // Return basic person info if case info processing fails
            return {
              id: person.person_id.toString(),
              firstName: person.first_name || '',
              lastName: person.last_name || '',
              alias: '', // No nick_name field in database
              caseId: '',
              caseNumber: '',
              role: 'Unknown Role',
              dateOfBirth: person.date_of_birth || '',
              // Removed ssn field which doesn't exist in the database
            };
          }
        })
      );
      
      console.log('Processed search results:', enhancedResults);
      setSearchResults(enhancedResults);
      setPage(0); // Reset to first page
    } catch (err) {
      console.error('Search error:', err);
      setError(`Failed to search for people: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in search fields
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle clicking on a person name
  const handlePersonClick = (person) => {
    console.log('Person clicked:', person);
    navigate('/PersonBio');
  };

  // Handle clicking on a case
  const handleCaseClick = (caseId, caseNumber) => {
    if (!caseId) {
      console.log('No case ID available for this person');
      return;
    }
    
    console.log(`Navigating to case ${caseNumber} (ID: ${caseId})`);
    // Set the current case in context
    setCurrentCase(caseId);
    // Navigate to the General tab
    navigate('/CaseGeneral');
  };

  // Pagination handlers
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  
  // Get current page of data
  const paginatedResults = searchResults.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );
  
  // Calculate pagination info
  const startIndex = searchResults.length > 0 ? page * rowsPerPage + 1 : 0;
  const endIndex = Math.min((page + 1) * rowsPerPage, searchResults.length);
  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  // Format date for display (convert ISO to MM/DD/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Search Person
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Please enter search criteria below
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={searchCriteria.lastName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              variant="outlined"
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={searchCriteria.firstName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={searchCriteria.dateOfBirth}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={searchCriteria.phoneNumber}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ResetIcon />}
              onClick={handleReset}
              sx={{ mr: 2 }}
            >
              Reset
            </Button>
            
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Results
        </Typography>
        
        <TableContainer sx={{ maxHeight: 400, mb: 2 }}>
          <Table stickyHeader>
                          <TableHead>
              <TableRow>
                <TableCell>Person's Name</TableCell>
                <TableCell>Alias</TableCell>
                <TableCell>CAC Case</TableCell>
                <TableCell>Role on Case</TableCell>
                <TableCell>Date of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={40} sx={{ my: 2 }} />
                    <Typography variant="body2" display="block">
                      Searching...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : paginatedResults.length > 0 ? (
                paginatedResults.map((person, index) => (
                  <TableRow 
                    key={person.id} 
                    sx={{ 
                      bgcolor: index % 2 !== 0 ? '#f5f5f5' : 'white',
                    }}
                  >
                    <TableCell>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handlePersonClick(person)}
                        underline="hover"
                        sx={{ cursor: 'pointer' }}
                      >
                        {`${person.lastName}, ${person.firstName}`}
                      </Link>
                    </TableCell>
                    <TableCell>{person.alias || ''}</TableCell>
                    <TableCell>
                      {person.caseId ? (
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => handleCaseClick(person.caseId, person.caseNumber)}
                          underline="hover"
                          color="primary"
                          sx={{ cursor: 'pointer' }}
                        >
                          {person.caseNumber || person.caseId}
                        </Link>
                      ) : (
                        'No case assigned'
                      )}
                    </TableCell>
                    <TableCell>{person.role}</TableCell>
                    <TableCell>{formatDate(person.dateOfBirth)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {searchCriteria.lastName || searchCriteria.firstName || 
                     searchCriteria.dateOfBirth || searchCriteria.phoneNumber ? 
                      'No matching results found' : 'Enter search criteria to find people'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {paginatedResults.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex" }}>
              <Button 
                sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}
                onClick={() => handleChangePage(0)}
                disabled={page === 0}
              >
                <KeyboardDoubleArrowLeftIcon fontSize="small" />
              </Button>
              <Button 
                sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
              >
                <KeyboardArrowLeftIcon fontSize="small" />
              </Button>
              
              {/* Page numbers */}
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pageNum = page < 2 ? i : page - 2 + i;
                if (pageNum >= totalPages) return null;
                
                return (
                  <Button 
                    key={pageNum}
                    sx={{ 
                      minWidth: 40, 
                      height: 40, 
                      border: '1px solid #ccc', 
                      borderRadius: 0,
                      bgcolor: pageNum === page ? '#1976d2' : 'white',
                      color: pageNum === page ? 'white' : 'inherit'
                    }}
                    onClick={() => handleChangePage(pageNum)}
                  >
                    {pageNum + 1}
                  </Button>
                );
              })}
              
              <Button 
                sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= totalPages - 1}
              >
                <KeyboardArrowRightIcon fontSize="small" />
              </Button>
              <Button 
                sx={{ minWidth: 40, height: 40, border: '1px solid #ccc', borderRadius: 0 }}
                onClick={() => handleChangePage(totalPages - 1)}
                disabled={page >= totalPages - 1}
              >
                <KeyboardDoubleArrowRightIcon fontSize="small" />
              </Button>
            </Box>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              {totalItems > 0 ? `${startIndex} - ${endIndex} of ${totalItems} items` : 'No items'}
              <IconButton size="small" sx={{ ml: 1 }} onClick={handleSearch} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SearchPerson;