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
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import ResetIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import PersonProfile from './PersonProfile';

const SearchPerson = () => {
  const navigate = useNavigate();
  
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

  // Handle search
  const handleSearch = async () => {
    // Validate at least one search criteria is provided
    if (!searchCriteria.lastName && !searchCriteria.firstName && 
        !searchCriteria.dateOfBirth && !searchCriteria.ssn && !searchCriteria.phoneNumber) {
      setError("Please enter at least one search criteria");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be an API call to search for people
      // For now, we'll simulate with mock data based on the search criteria
      
      // MOCK DATA - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const mockResults = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Smith',
          alias: 'Johnny',
          caseNumber: 'CA-2025-001',
          role: 'Primary Victim',
          dateOfBirth: '1985-04-12',
          ssn: '123-45-6789'
        },
        {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Johnson',
          alias: 'Sare',
          caseNumber: 'CA-2025-002',
          role: 'Parent/Guardian',
          dateOfBirth: '1970-09-23',
          ssn: '987-65-4321'
        },
        {
          id: '3',
          firstName: 'Michael',
          lastName: 'Williams',
          alias: 'Mike',
          caseNumber: 'CA-2025-003',
          role: 'Alleged Perpetrator',
          dateOfBirth: '1982-11-30',
          ssn: '456-78-9012'
        }
      ];
      
      // Filter results based on search criteria (case insensitive)
      const filteredResults = mockResults.filter(person => {
        const lastNameMatch = !searchCriteria.lastName || 
          person.lastName.toLowerCase().includes(searchCriteria.lastName.toLowerCase());
        
        const firstNameMatch = !searchCriteria.firstName || 
          person.firstName.toLowerCase().includes(searchCriteria.firstName.toLowerCase());
        
        // Date matching (simple includes for the string representation)
        const dobMatch = !searchCriteria.dateOfBirth || 
          person.dateOfBirth.includes(searchCriteria.dateOfBirth);
        
        const ssnMatch = !searchCriteria.ssn || 
          person.ssn.includes(searchCriteria.ssn);
        
        // We don't have phone numbers in mock data, but would check it if we did
        
        return lastNameMatch && firstNameMatch && dobMatch && ssnMatch;
      });
      
      setSearchResults(filteredResults);
      setPage(0); // Reset to first page
    } catch (err) {
      setError("Failed to search for people. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle view person details
  const handleViewPerson = (person) => {
    setSelectedPerson(person);
    setViewDialogOpen(true);
  };

  // Handle select person
  const handleSelectPerson = (person) => {
    // In a real implementation, this would set the selected person and navigate to their details
    console.log("Selected person:", person);
    navigate('/CasePeople');
  };

  // Handle cancel
//   const handleCancel = () => {
//     navigate('/');
//   };

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
                <TableCell width={120}>Action</TableCell>
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
                  <TableCell colSpan={7} align="center">
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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleSelectPerson(person)}
                        sx={{ mr: 1 }}
                      >
                        Select
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewPerson(person)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>{`${person.lastName}, ${person.firstName}`}</TableCell>
                    <TableCell>{person.alias || ''}</TableCell>
                    <TableCell>{person.caseNumber}</TableCell>
                    <TableCell>{person.role}</TableCell>
                    <TableCell>{person.dateOfBirth}</TableCell>
                    <TableCell>{person.ssn}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
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
      {selectedPerson && (
        <PersonProfile 
          open={viewDialogOpen}
          person={selectedPerson}
          onClose={() => setViewDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default SearchPerson;