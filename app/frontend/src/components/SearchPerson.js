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
import PersonProfile from './PersonProfile';
import { peopleApi } from '../services/api';

const SearchPerson = () => {
  const navigate = useNavigate();
  const { setCurrentCase } = useCase();
  
  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    ssn: '',
    phoneNumber: ''
  });
  
  // State for search results and pagination
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  
  // State for person profile dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

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
      ssn: '',
      phoneNumber: ''
    });
    setSearchResults([]);
  };

  // Helper function to map role_id to human-readable role
  const getPersonRole = (roleId) => {
    const roles = {
      1: 'Primary Victim',
      2: 'Parent/Guardian',
      3: 'Sibling',
      4: 'Alleged Perpetrator',
      5: 'Witness',
      // Add more roles as needed
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
      // Use the existing lastName search endpoint
      const results = await peopleApi.searchByLastName(searchCriteria.lastName.trim());
      
      // Filter results if other criteria are provided
      let filteredResults = [...results];
      
      if (searchCriteria.firstName) {
        filteredResults = filteredResults.filter(person => 
          person.first_name?.toLowerCase().includes(searchCriteria.firstName.toLowerCase())
        );
      }
      
      if (searchCriteria.dateOfBirth) {
        filteredResults = filteredResults.filter(person => 
          person.date_of_birth?.includes(searchCriteria.dateOfBirth)
        );
      }
      
      if (searchCriteria.ssn) {
        filteredResults = filteredResults.filter(person => 
          person.ssn?.includes(searchCriteria.ssn)
        );
      }
      
      // Format the results for display
      const formattedResults = filteredResults.map(person => {
        // Find case information if available
        const caseInfo = person.case_person?.[0];
        
        return {
          id: person.person_id.toString(),
          firstName: person.first_name || '',
          lastName: person.last_name || '',
          alias: person.nick_name || '',
          caseId: caseInfo?.case_id?.toString() || '',
          caseNumber: caseInfo?.cac_case?.case_number || '',
          role: getPersonRole(caseInfo?.role_id),
          dateOfBirth: person.date_of_birth || '',
          ssn: person.ssn || ''
        };
      });
      
      setSearchResults(formattedResults);
      setPage(0); // Reset to first page
    } catch (err) {
      setError("Failed to search for people. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking on a person name
  const handlePersonClick = (person) => {
    // In a real implementation, this would navigate to a person bio page
    console.log("Person clicked:", person);
    navigate('/PersonBio');
  };

  // Handle clicking on a case
  const handleCaseClick = (caseId, caseNumber) => {
    if (!caseId) {
      console.log("No case ID available for this person");
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
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min((page + 1) * rowsPerPage, searchResults.length);
  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  // Format date for display (convert ISO to MM/DD/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
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
              label="Social Security Number"
              name="ssn"
              value={searchCriteria.ssn}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={searchCriteria.phoneNumber}
              onChange={handleInputChange}
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
                <TableCell>SSN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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
                    <TableCell>{person.role || 'N/A'}</TableCell>
                    <TableCell>{formatDate(person.dateOfBirth)}</TableCell>
                    <TableCell>{person.ssn || ''}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {searchCriteria.lastName || searchCriteria.firstName || 
                     searchCriteria.dateOfBirth || searchCriteria.ssn || 
                     searchCriteria.phoneNumber ? 
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
              <IconButton size="small" sx={{ ml: 1 }} onClick={handleSearch}>
                <RefreshIcon />
              </IconButton>
            </Typography>
          </Box>
        )}
      </Paper>
      
      {/* Person Profile Dialog */}
      <PersonProfile 
        open={viewDialogOpen}
        person={selectedPerson}
        onClose={() => setViewDialogOpen(false)}
      />
    </Box>
  );
};

export default SearchPerson;