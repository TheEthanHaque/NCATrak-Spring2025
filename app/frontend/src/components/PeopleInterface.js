import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Container,
  Grid,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useCase } from '../context/CaseContext';
import { peopleApi } from '../services/api';

const PeopleInterface = () => {
  const navigate = useNavigate();
  const { currentCase } = useCase();
  
  // State for people associated with the case
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for form fields
  const [allegedOffenderUnknown, setAllegedOffenderUnknown] = useState(false);
  const [offenderComments, setOffenderComments] = useState('');
  
  // Fetch people associated with the current case
  useEffect(() => {
    if (!currentCase) return;
    
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const data = await peopleApi.getPeopleByCaseId(currentCase);
        setPeople(data);
        setFilteredPeople(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch people:', err);
        setError('Failed to load people associated with this case. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPeople();
  }, [currentCase]);
  
  // Filter people based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPeople(people);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = people.filter(person => 
      (person.name && person.name.toLowerCase().includes(lowerCaseSearch)) ||
      (person.role && person.role.toLowerCase().includes(lowerCaseSearch))
    );
    
    setFilteredPeople(filtered);
  }, [searchTerm, people]);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString();
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle edit person
  const handleEditPerson = (personId) => {
    console.log('Edit person:', personId);
    // Implement edit functionality here
  };
  
  // Handle bio view
  const handleViewBio = (personId) => {
    console.log('View bio for person:', personId);
    
    // Find the person data
    const person = people.find(p => p.person_id === personId);
    
    // Navigate to PersonBio page with the person data
    navigate('/PersonBio', { state: { person } });
  };
  
  // Handle add person
  const handleAddPerson = () => {
    console.log('Add new person');
    // Implement add person functionality here
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setAllegedOffenderUnknown(e.target.checked);
  };
  
  // Handle comments change
  const handleCommentsChange = (e) => {
    setOffenderComments(e.target.value);
  };
  
  // Handle save form
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form saved');
    // Implement save functionality here
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          People Associated with Case
        </Typography>
        
        <Box component="form" onSubmit={handleSave} sx={{ mt: 3 }}>
          {/* People Table Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleAddPerson}
              >
                Add
              </Button>
              
              <TextField
                placeholder="Search people..."
                value={searchTerm}
                onChange={handleSearchChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                sx={{ width: '300px' }}
              />
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Action</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Relationship To Victim</TableCell>
                    <TableCell>Same Household</TableCell>
                    <TableCell>Custody</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                        <CircularProgress size={30} />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Loading people...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredPeople.length > 0 ? (
                    filteredPeople.map((person) => (
                      <TableRow key={person.person_id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleEditPerson(person.person_id)}
                              sx={{ minWidth: 'auto' }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleViewBio(person.person_id)}
                              sx={{ minWidth: 'auto' }}
                            >
                              Bio
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>{person.age || ''}</TableCell>
                        <TableCell>{formatDate(person.date_of_birth)}</TableCell>
                        <TableCell>{person.role || ''}</TableCell>
                        <TableCell>{person.relationship_id || ''}</TableCell>
                        <TableCell align="center">
                          <Checkbox 
                            checked={Boolean(person.same_household)}
                            disabled
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox 
                            checked={Boolean(person.custody)}
                            disabled
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 2 }}>
                        {searchTerm ? 'No matching people found' : 'No people associated with this case'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            {/* Alleged Offender Unknown section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Checkbox
                  checked={allegedOffenderUnknown}
                  onChange={handleCheckboxChange}
                  id="allegedOffenderUnknown"
                  name="allegedOffenderUnknown"
                />
                <Typography>Alleged Offender Name Unknown</Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 1 }}>
                Alleged Offender Unknown Comments
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={offenderComments}
                onChange={handleCommentsChange}
                variant="outlined"
              />
            </Box>
          </Box>
          
          {/* Document Upload Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #ddd', pb: 1 }}>
              Document Upload
            </Typography>
            
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>File Name</TableCell>
                    <TableCell>Upload Date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Page</TableCell>
                    <TableCell>Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
                      No items to display
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          
          {/* Form Buttons */}
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{ px: 4 }}
              >
                SAVE
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="error"
                onClick={() => navigate('/')}
                sx={{ px: 4 }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PeopleInterface;