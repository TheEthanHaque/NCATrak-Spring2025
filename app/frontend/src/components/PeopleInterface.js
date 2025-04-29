import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useCase } from '../context/CaseContext';
import { peopleApi } from '../services/api';
import { picklistsApi } from '../services/api';

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

  // State for adding/editing people
  const [raceOptions, setRaceOptions] = useState([]);
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);

  const [selectedRace, setSelectedRace] = useState('');
  const [selectedRelationship, setSelectedRelationship] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');

  const [newRace, setNewRace] = useState('');
  const [newRelationship, setNewRelationship] = useState('');
  const [newEducation, setNewEducation] = useState('');

  
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

  // Pick list
  useEffect(() => {
    const fetchPickLists = async () => {
      try {
        const races = await picklistsApi.getRaceOptions();
        const relationships = await picklistsApi.getRelationshipOptions();
        const educationLevels = await picklistsApi.getEducationOptions();

        console.log('Fetched Races:', races);
        console.log('Fetched Relationships:', relationships);
        console.log('Fetched Education Levels:', educationLevels);
  
        setRaceOptions(races);
        setRelationshipOptions(relationships);
        setEducationOptions(educationLevels);
      } catch (error) {
        console.error('Error fetching picklists:', error);
      }
    };
  
    fetchPickLists();
  }, []);
  
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
  const handleEditPerson = async (personId) => {
    console.log('Edit person:', personId);
    
    try {
      const person = await peopleApi.getPersonById(personId);
  
      // Load current values into the form states
      setSelectedRace(person.race || '');
      setSelectedEducation(person.education_level || '');
      setSelectedRelationship(person.relationship_to_victim || '');
  
      // Here you would also load other person fields into your form if you want (like name, age)
      // Then allow the user to update and re-save
    } catch (error) {
      console.error('Error fetching person details:', error);
      alert('Failed to load person details.');
    }

  };
  
  // Handle bio view
  const handleViewBio = (personId) => {
    console.log('View bio for person:', personId);
    navigate('/PersonBio');
  };
  
  // Handle add person
  /*const handleAddPerson = () => {
    console.log('Add new person');
    setSelectedRace('');
    setSelectedEducation('');
    setSelectedRelationship('');
  };*/
  
  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setAllegedOffenderUnknown(e.target.checked);
  };
  
  // Handle comments change
  const handleCommentsChange = (e) => {
    setOffenderComments(e.target.value);
  };
  
  // Handle save form
  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      // Find the ID values from dropdown selections
      const raceId = raceOptions.find(r => r.name === selectedRace)?.id || null;
      const educationId = educationOptions.find(e => e.name === selectedEducation)?.id || null;
      const relationshipId = relationshipOptions.find(r => r.name === selectedRelationship)?.id || null;
  
      // TODO: Replace these placeholder values with actual form fields if available
      const personPayload = {
        first_name: "Test",
        last_name: "User",
        date_of_birth: "2000-01-01",
        gender: "Male",
        cac_id: 1, 
  
        race_id: raceId,
        education_level_id: educationId
      };
  
      // Step 1: Create the person
      const createdPerson = await peopleApi.createPerson(personPayload);
      const personId = createdPerson.person_id;
  
      // Step 2: Associate the person with the case and add relationship
      await peopleApi.associatePersonWithCase({
        person_id: personId,
        case_id: currentCase,
        cac_id: 1, // Or get from context
        relationship_id: relationshipId
      });
  
      // Step 3: Refresh the people list
      const updatedPeople = await peopleApi.getPeopleByCaseId(currentCase);
      setPeople(updatedPeople);
      setFilteredPeople(updatedPeople);
  
      // Step 4: Reset form fields
      setSelectedRace('');
      setSelectedEducation('');
      setSelectedRelationship('');
  
      alert('Person saved and linked to case successfully!');
    } catch (error) {
      console.error('Error saving person:', error);
      alert('Failed to save person.');
    }
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
            {/* New dropdowns for Race, Education Level, Relationship To Victim */}
  <Box sx={{ mb: 3 }}>
  <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #ddd', pb: 1 }}>
    Additional Information
  </Typography>

  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel id="race-label">Race</InputLabel>
    <Select
      labelId="race-label"
      value={selectedRace}
      onChange={(e) => setSelectedRace(e.target.value)}
    >
      {raceOptions.map((race) => (
        <MenuItem key={race.id} value={race.name}>
          {race.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
  <TextField
    size="small"
    fullWidth
    placeholder="Add new race"
    value={newRace}
    onChange={(e) => setNewRace(e.target.value)}
  />
  <Button
    variant="outlined"
    onClick={async () => {
      if (!newRace.trim()) return;
      try {
        await picklistsApi.addRaceOption(newRace.trim());
        setNewRace('');
        const races = await picklistsApi.getRaceOptions();
        setRaceOptions(races);
      } catch (err) {
        console.error('Failed to add race:', err);
      }
    }}
  >
    Add
  </Button>
</Box>

  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel id="education-label">Education Level</InputLabel>
    <Select
      labelId="education-label"
      value={selectedEducation}
      onChange={(e) => setSelectedEducation(e.target.value)}
    >
      {educationOptions.map((education) => (
        <MenuItem key={education.id} value={education.name}>
          {education.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
  <TextField
    size="small"
    fullWidth
    placeholder="Add new education level"
    value={newEducation}
    onChange={(e) => setNewEducation(e.target.value)}
  />
  <Button
    variant="outlined"
    onClick={async () => {
      if (!newEducation.trim()) return;
      try {
        await picklistsApi.addEducationOption(newEducation.trim());
        setNewEducation('');
        const levels = await picklistsApi.getEducationOptions();
        setEducationOptions(levels);
      } catch (err) {
        console.error('Failed to add education level:', err);
      }
    }}
  >
    Add
  </Button>
</Box>

  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel id="relationship-label">Relationship To Victim</InputLabel>
    <Select
      labelId="relationship-label"
      value={selectedRelationship}
      onChange={(e) => setSelectedRelationship(e.target.value)}
    >
      {relationshipOptions.map((relationship) => (
        <MenuItem key={relationship.id} value={relationship.name}>
          {relationship.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
  <TextField
    size="small"
    fullWidth
    placeholder="Add new relationship"
    value={newRelationship}
    onChange={(e) => setNewRelationship(e.target.value)}
  />
  <Button
    variant="outlined"
    onClick={async () => {
      if (!newRelationship.trim()) return;
      try {
        await picklistsApi.addRelationshipOption(newRelationship.trim());
        setNewRelationship('');
        const relationships = await picklistsApi.getRelationshipOptions();
        setRelationshipOptions(relationships);
      } catch (err) {
        console.error('Failed to add relationship:', err);
      }
    }}
  >
    Add
  </Button>
</Box>
</Box>
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