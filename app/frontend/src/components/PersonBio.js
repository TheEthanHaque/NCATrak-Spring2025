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
  MenuItem
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { peopleApi } from '../services/api';
import { useCase } from '../context/CaseContext';

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
  
  // Race options
  const raceOptions = ['American Indian/Alaska Native', 'Asian', 'Black/African American', 'Hispanic/Latino', 'Native Hawaiian/Pacific Islander', 'White', 'Multi-racial', 'Other', 'Unknown'];
  
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
          race: personData.race_id || '',
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
  
  // Handle save
  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Prepare person data for API
      const personData = {
        person_id: personId,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        suffix: formData.suffix,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.biologicalSex === 'Male' ? 'M' : 
                formData.biologicalSex === 'Female' ? 'F' : null
      };
      
      // Update person in API
      await peopleApi.updatePerson(personId, personData);
      
      // Show success notification
      setNotification({
        show: true,
        message: 'Person information updated successfully',
        type: 'success'
      });
      
      // Update original data
      setOriginalData({
        ...originalData,
        ...personData
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
    }
  };
  
  // Handle cancel
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
              <FormControl fullWidth>
                <Select
                  name="race"
                  value={formData.race}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">Select Race</MenuItem>
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
    </Container>
  );
};

export default PersonBio;
