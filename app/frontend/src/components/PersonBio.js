import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { peopleApi, pickListsApi } from '../services/api';
import { useCase } from '../context/CaseContext';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal component

const PersonBio = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentCase } = useCase();

  // Get personId from location state or URL params
  const getPersonIdFromLocation = () => {
    // Check if we have personId in the location state
    if (location.state && location.state.personId) {
      return location.state.personId;
    }
    
    // Check URL query parameters
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('personId');
  };
  
  const personId = getPersonIdFromLocation();

  // Tab state & handler
  const currentTab = 0; // we're on Personal Profile
  const handleTabChange = (_event, newValue) => {
    if (newValue === 1) {
      // switch to the Cases view, carrying personId
      navigate('/PersonCases', { state: { personId } });
    }
  };
  
  // Race options
  const [raceOptions, setRaceOptions] = useState([]);
  const [loadingPickLists, setLoadingPickLists] = useState(false);

  // Religion options
  const religionOptions = ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other', 'Unknown'];
  
  // Language options
  const languageOptions = ['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Other', 'Unknown'];
  
  // Form state for person data
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    nickName: '',
    ssn: '',
    dateOfBirth: '',
    unknownDateOfBirth: false,
    dateOfDeath: '',
    biologicalSex: '',
    race: '',
    religion: '',
    language: ''
  });
  
  // Additional states
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  
  // Add confirmation modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);
  
  useEffect(() => {
    const fetchRacePickList = async () => {
      try {
        setLoadingPickLists(true);
        
        // First, find the People category
        const categories = await pickListsApi.getAllCategories();
        const peopleCategory = categories.find(c => c.category_name === 'People Tab');
        
        if (peopleCategory) {
          // Get pick lists for this category
          const pickLists = await pickListsApi.getPickListsByCategoryId(peopleCategory.category_id);
          
          // Find the Race pick list
          const raceList = pickLists.find(list => list.list_name === 'Race');
          
          if (raceList) {
            // Get the items for this pick list
            const items = await pickListsApi.getItemsByListId(raceList.list_id);
            setRaceOptions(items.map(item => item.value));
          } else {
            // Fallback to default options if Race pick list not found
            setRaceOptions([
              'American Indian/Alaska Native', 
              'Asian', 
              'Black/African American', 
              'Hispanic/Latino', 
              'Native Hawaiian/Pacific Islander', 
              'White', 
              'Multi-racial', 
              'Other', 
              'Unknown'
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to load race pick list:', err);
        // Fallback to default options if API call fails
        setRaceOptions([
          'American Indian/Alaska Native', 
          'Asian', 
          'Black/African American', 
          'Hispanic/Latino', 
          'Native Hawaiian/Pacific Islander', 
          'White', 
          'Multi-racial', 
          'Other', 
          'Unknown'
        ]);
      } finally {
        setLoadingPickLists(false);
      }
    };
    
    fetchRacePickList();
  }, []);

  // Load person data when component mounts or personId/currentCase changes
  useEffect(() => {
    const fetchPersonData = async () => {
      if (!personId) {
        setError("No person ID provided");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch person details
        const personData = await peopleApi.getPersonById(personId);
        
        // Format date for input fields
        let formattedDob = '';
        if (personData.date_of_birth) {
          const date = new Date(personData.date_of_birth);
          formattedDob = date.toISOString().split('T')[0];
        }
        
        // Set original data for comparison when saving
        setOriginalData(personData);
        
        // Fetch race information to map race_id to race name
        let raceName = '';
        if (personData.race_id) {
          try {
            // First, find the People category
            const categories = await pickListsApi.getAllCategories();
            const peopleCategory = categories.find(c => c.category_name === 'People Tab');
            
            if (peopleCategory) {
              // Get pick lists for this category
              const pickLists = await pickListsApi.getPickListsByCategoryId(peopleCategory.category_id);
              
              // Find the Race pick list
              const raceList = pickLists.find(list => list.list_name === 'Race');
              
              if (raceList) {
                // Get the items for this pick list
                const items = await pickListsApi.getItemsByListId(raceList.list_id);
                
                // Find the race name by ID
                const raceItem = items.find(item => item.item_id === personData.race_id);
                if (raceItem) {
                  raceName = raceItem.value;
                }
              }
            }
          } catch (err) {
            console.error('Failed to map race ID to name:', err);
          }
        }
        
        // Set form data
        setFormData({
          firstName: personData.first_name || '',
          middleName: personData.middle_name || '',
          lastName: personData.last_name || '',
          suffix: personData.suffix || '',
          nickName: personData.nick_name || '',
          ssn: personData.ssn || '',
          dateOfBirth: formattedDob,
          unknownDateOfBirth: !formattedDob,
          dateOfDeath: personData.date_of_death ? new Date(personData.date_of_death).toISOString().split('T')[0] : '',
          biologicalSex: personData.gender === 'M' ? 'Male' : personData.gender === 'F' ? 'Female' : '',
          race: raceName, // Use the mapped race name instead of ID
          religion: personData.religion_id || '',
          language: personData.language_id || ''
        });
        
        setError(null);
      } catch (err) {
        console.error('Failed to load person data:', err);
        setError('Failed to load person information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonData();
  }, [personId, currentCase]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle unknown DOB checkbox
  const handleUnknownDOB = (e) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      unknownDateOfBirth: checked,
      dateOfBirth: checked ? '' : prev.dateOfBirth
    }));
  };
  
  // Modified handleSave to show confirmation modal
  const handleSave = async () => {
    try {
      // Get race_id from race selection
      let raceId = null;
      if (formData.race) {
        try {
          // Find the race ID by looking up the list items
          const categories = await pickListsApi.getAllCategories();
          const peopleCategory = categories.find(c => c.category_name === 'People Tab');
          
          if (peopleCategory) {
            const pickLists = await pickListsApi.getPickListsByCategoryId(peopleCategory.category_id);
            const raceList = pickLists.find(list => list.list_name === 'Race');
            
            if (raceList) {
              const items = await pickListsApi.getItemsByListId(raceList.list_id);
              const raceItem = items.find(item => item.value === formData.race);
              if (raceItem) {
                raceId = raceItem.item_id;
              }
            }
          }
        } catch (err) {
          console.error('Error getting race ID:', err);
        }
      }
      
      // Prepare person data for API
      const personData = {
        person_id: personId,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        suffix: formData.suffix,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.biologicalSex === 'Male' ? 'M' : 
                formData.biologicalSex === 'Female' ? 'F' : null,
        race_id: raceId // Use the ID rather than the string value
      };
      
      // Check if any changes were made
      const isDataChanged = 
        originalData.first_name !== personData.first_name ||
        originalData.middle_name !== personData.middle_name ||
        originalData.last_name !== personData.last_name ||
        originalData.suffix !== personData.suffix ||
        originalData.date_of_birth !== personData.date_of_birth ||
        originalData.gender !== personData.gender ||
        originalData.race_id !== personData.race_id;
      
      if (isDataChanged) {
        // Store pending changes and show confirmation modal
        setPendingChanges(personData);
        setConfirmModalOpen(true);
      } else {
        // No changes were made, just show a notification
        setNotification({
          show: true,
          message: 'No changes were made to the person information',
          type: 'info'
        });
        
        setTimeout(() => {
          setNotification({ show: false, message: '', type: 'success' });
        }, 3000);
      }
    } catch (err) {
      console.error('Error preparing data for save:', err);
      setNotification({
        show: true,
        message: 'Error preparing data for save',
        type: 'error'
      });
    }
  };
  
  // New function to handle actual save after confirmation
  const handleConfirmSave = async () => {
    try {
      setSaving(true);
      setConfirmModalOpen(false);
      
      // Update person in API
      await peopleApi.updatePerson(personId, pendingChanges);
      
      // Show success notification
      setNotification({
        show: true,
        message: 'Person information updated successfully',
        type: 'success'
      });
      
      // Update original data
      setOriginalData({
        ...originalData,
        ...pendingChanges
      });
      
      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' });
      }, 3000);
    } catch (err) {
      console.error('Failed to update person:', err);
      setNotification({
        show: true,
        message: 'Failed to update person information',
        type: 'error'
      });
    } finally {
      setSaving(false);
      setPendingChanges(null);
    }
  };
  
  // Handle cancellation of modal
  const handleCancelSave = () => {
    setConfirmModalOpen(false);
    setPendingChanges(null);
  };
  
  // Handle cancel button
  const handleCancel = () => {
    navigate('/CasePeople');
  };
  
  // Render loading state
  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={handleCancel}>
            Return to Case View
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="Person Profile Tabs">
            <Tab label="Personal Profile" />
            <Tab label="Cases" />
          </Tabs>
        </Box>

        <Typography variant="h5" gutterBottom align="left" sx={{ mb: 3 }}>
          PERSONAL PROFILE
        </Typography>
        
        {/* Action buttons at top */}
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "SAVE"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </Box>
        
        {/* Notification */}
        {notification.show && (
          <Alert severity={notification.type} sx={{ mb: 2 }}>
            {notification.message}
          </Alert>
        )}
        
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Name section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1" color="error">First Name</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Middle Name</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1" color="error">Last Name</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Suffix</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Nick Name</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">SSN</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Birth and Death section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Date of Birth</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                variant="outlined"
                disabled={formData.unknownDateOfBirth}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.unknownDateOfBirth}
                    onChange={handleUnknownDOB}
                    name="unknownDateOfBirth"
                  />
                }
                label="Unknown Date of Birth"
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Date of Death</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                name="dateOfDeath"
                type="date"
                value={formData.dateOfDeath}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Biological Sex section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1" color="error">Biological Sex</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <RadioGroup
                row
                name="biologicalSex"
                value={formData.biologicalSex}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Intersex" control={<Radio />} label="Intersex" />
                <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                <FormControlLabel value="Decline to Answer" control={<Radio />} label="Decline to Answer" />
              </RadioGroup>
            </Grid>

            {/* Race section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Race</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth sx={{ minWidth: 120 }}>
                {/* Remove this InputLabel */}
                <Select
                  name="race"
                  value={formData.race || ''}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    {loadingPickLists ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Loading options...
                      </Box>
                    ) : (
                      'Select Race'
                    )}
                  </MenuItem>
                  {raceOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Religion section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Religion</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth>
                <Select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">Select Religion</MenuItem>
                  {religionOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Language section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Language</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">Select Language</MenuItem>
                  {languageOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Bottom action buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
              sx={{ mr: 2 }}
            >
              {saving ? "Saving..." : "SAVE"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancel}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmModalOpen}
        title="Update Person Information"
        message={`You are attempting to change the information of a person already in NCATrak. This will change the person's information on all cases in NCATrak. Are you sure you want to do this?`}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </Container>
  );
};

export default PersonBio;