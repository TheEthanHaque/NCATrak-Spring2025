import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { peopleApi } from '../services/api';

const PersonBio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personData = location.state?.person || null;
  
  // Add state for confirmation modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Add state for the original person data (for comparison)
  const [originalPersonData, setOriginalPersonData] = useState(null);
  
  // Form state - initialize all fields with proper defaults
  const [formData, setFormData] = useState({
    person_id: '',
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
    selfIdentifiedGender: {
      female: false,
      transgenderFemale: false,
      transgenderMale: false,
      notReported: false,
      notTracked: false,
      declineToAnswer: false,
      male: false,
      other: false,
      nonBinary: false,
      anotherGenderIdentity: false,
      unknown: false,
      genderQueer: false
    },
    pronouns: '',
    race: '',
    religion: '',
    language: '',
    vocaClassification: {
      autism: false,
      behavioralIssues: false,
      autismSpectrum: false,
      deaf: false,
      lgbtqCommunity: false,
      physicallyHandicapped: false,
      adultWithSubstantialImpairment: false,
      asperbergers: false,
      blind: false,
      homeless: false,
      mmr: false,
      veteran: false
    },
    specialPopulations: {
      deafHardOfHearing: false,
      immigrantsRefugees: false,
      militaryDependent: false,
      limitedEnglish: false,
      indigenousTribal: false,
      unstablyHoused: false,
      lgbtqiaPlus: false,
      cognitivePhysicalMental: false,
      visionImpaired: false,
      other: false
    },
    riskFactors: {
      giftsBribes: false,
      other: false,
      runaway: false,
      substanceAbuse: false,
      highRiskSexual: false,
      riskyOnline: false,
      streetLanguage: false
    },
    csec: {
      childPornography: false,
      sexTourism: false,
      other: false,
      sexTrafficking: false
    },
    childPornographyInvolvement: {
      distribution: false,
      other: false,
      trading: false,
      manufacturing: false,
      possession: false
    },
    specialNeeds: '',
    comments: '',
    doTheyLikeCookies: '',
    developmentalAge: '',
    dateAdded: '',
    csecInvolvement: {
      usa: false,
      mexico: false,
      fosterCare: false,
      canada: false,
      nicaragua: false,
      elSalvador: false,
      uzbekistan: false
    },
    customField: '',
    ethnicity: {
      nonHispanic: false,
      hispanic: false
    },
    bioCustomField1: '',
    bioCustomField2: '',
    puebloORtribe: '',
    prior_convictions: false,
    convicted_against_children: false,
    sex_offender: false,
    sex_predator: false,
  });

  const populateFormWithPersonData = useCallback((person) => {
    let formattedDob = '';
    if (person.date_of_birth) {
      const date = new Date(person.date_of_birth);
      formattedDob = date.toISOString().split('T')[0];
    }

    const personDataForForm = {
      ...formData,
      person_id: person.person_id,
      firstName: person.first_name || '',
      middleName: person.middle_name || '',
      lastName: person.last_name || '',
      suffix: person.suffix || '',
      nickName: person.nick_name || '',
      ssn: person.ssn || '',
      dateOfBirth: formattedDob,
      unknownDateOfBirth: !formattedDob,
      dateOfDeath: person.date_of_death ? new Date(person.date_of_death).toISOString().split('T')[0] : '',
      biologicalSex: person.gender === 'M' ? 'Male' : person.gender === 'F' ? 'Female' : '',
      race: person.race_id || '',
      religion: person.religion_id || '',
      language: person.language_id || '',
      specialNeeds: person.special_needs || '',
      comments: person.comments || '',
      prior_convictions: person.prior_convictions || false,
      convicted_against_children: person.convicted_against_children || false,
      sex_offender: person.sex_offender || false,
      sex_predator: person.sex_predator || false,
    };

    setOriginalPersonData(personDataForForm);
    setFormData(personDataForForm);
  }, [formData]);

  useEffect(() => {
    const fetchPersonData = async () => {
      if (location.state?.personId && !personData) {
        try {
          setLoading(true);
          const data = await peopleApi.getPersonById(location.state.personId);
          if (data) {
            populateFormWithPersonData(data);
          }
        } catch (err) {
          console.error('Failed to fetch person data:', err);
          setError('Failed to load person information. Please try again.');
        } finally {
          setLoading(false);
        }
      } else if (personData) {
        populateFormWithPersonData(personData);
      }
    };

    fetchPersonData();
  }, [location.state, personData, populateFormWithPersonData]);

  // Dropdown options
  const raceOptions = ['American Indian/Alaska Native', 'Asian', 'Black/African American', 'Hispanic/Latino', 'Native Hawaiian/Pacific Islander', 'White', 'Multi-racial', 'Other', 'Unknown'];
  const religionOptions = ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other', 'Unknown'];
  const languageOptions = ['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Other', 'Unknown'];

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data as before
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox for unknown DOB
  const handleUnknownDOB = (e) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      unknownDateOfBirth: checked,
      dateOfBirth: checked ? '' : prev.dateOfBirth
    }));
  };

  // Handle checkbox changes for gender identity
  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      selfIdentifiedGender: {
        ...prev.selfIdentifiedGender,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for VOCA Classification
  const handleVocaChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      vocaClassification: {
        ...prev.vocaClassification,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for Special Populations
  const handleSpecialPopulationsChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      specialPopulations: {
        ...prev.specialPopulations,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for Risk Factors
  const handleRiskFactorsChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      riskFactors: {
        ...prev.riskFactors,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for CSEC
  const handleCsecChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      csec: {
        ...prev.csec,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for Child Pornography Involvement
  const handleChildPornographyInvolvementChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      childPornographyInvolvement: {
        ...prev.childPornographyInvolvement,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for CSEC Involvement
  const handleCsecInvolvementChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      csecInvolvement: {
        ...prev.csecInvolvement,
        [name]: checked
      }
    }));
  };

  // Handle checkbox changes for Ethnicity
  const handleEthnicityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      ethnicity: {
        ...prev.ethnicity,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if person data has been changed
    if (originalPersonData && originalPersonData.person_id) {
      const personDataChanged = 
        originalPersonData.firstName !== formData.firstName ||
        originalPersonData.middleName !== formData.middleName ||
        originalPersonData.lastName !== formData.lastName ||
        originalPersonData.suffix !== formData.suffix ||
        originalPersonData.dateOfBirth !== formData.dateOfBirth ||
        originalPersonData.biologicalSex !== formData.biologicalSex;
      
      if (personDataChanged) {
        // Store the changes for use in confirmation
        setPendingChanges({
          person_id: originalPersonData.person_id,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          suffix: formData.suffix,
          date_of_birth: formData.dateOfBirth,
          gender: formData.biologicalSex === 'Male' ? 'M' : formData.biologicalSex === 'Female' ? 'F' : null,
          prior_convictions: formData.prior_convictions,
          convicted_against_children: formData.convicted_against_children,
          sex_offender: formData.sex_offender,
          sex_predator: formData.sex_predator
        });
        
        // Show confirmation modal
        setConfirmModalOpen(true);
        return; // Stop here and wait for confirmation
      }
    }
    
    // No changes to person data or no person selected, proceed normally
    submitForm();
  };

  // Function to handle actual form submission
  const submitForm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // If we have pending changes to a person, update them in the database
      if (pendingChanges) {
        await updatePersonInDatabase(pendingChanges);
      }
      
      // Navigate back after saving
      navigate(-1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to update person information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to update person in database
  const updatePersonInDatabase = async (personData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/people/${personData.person_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update person: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Person updated successfully:', result);
      return result;
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    }
  };

  // Handle confirmation
  const handleConfirmChanges = () => {
    setConfirmModalOpen(false);
    submitForm();
  };

  // Handle cancellation
  const handleCancelChanges = () => {
    setConfirmModalOpen(false);
    setPendingChanges(null);
  };

  // Action buttons component - to reuse at top and bottom of form
  const ActionButtons = () => (
    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
    </Box>
  );

  if (loading && !formData.person_id) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading person information...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="left">
          Personal Profile
        </Typography>
        
        {/* Top action buttons */}
        <ActionButtons />
        
        {error && (
          <Typography color="error" variant="body1" sx={{ mb: 2 }}>
            {error}
          </Typography>
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

            {/* Biological Sex section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1" color="error">Biological Sex</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <RadioGroup
                row
                name="biologicalSex"
                value={formData.biologicalSex}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Intersex" control={<Radio />} label="Intersex" />
                <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                <FormControlLabel value="Decline to Answer" control={<Radio />} label="Decline to Answer" />
              </RadioGroup>
            </Grid>

            {/* Self Identified Gender section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Self Identified Gender</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.female} onChange={handleGenderChange} name="female" />}
                      label="Female"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.transgenderFemale} onChange={handleGenderChange} name="transgenderFemale" />}
                      label="Transgender Female"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.transgenderMale} onChange={handleGenderChange} name="transgenderMale" />}
                      label="Transgender Male"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.notReported} onChange={handleGenderChange} name="notReported" />}
                      label="Not Reported"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.notTracked} onChange={handleGenderChange} name="notTracked" />}
                      label="Not Tracked"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.declineToAnswer} onChange={handleGenderChange} name="declineToAnswer" />}
                      label="Decline to Answer"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.male} onChange={handleGenderChange} name="male" />}
                      label="Male"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.other} onChange={handleGenderChange} name="other" />}
                      label="Other"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.nonBinary} onChange={handleGenderChange} name="nonBinary" />}
                      label="Non-Binary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.anotherGenderIdentity} onChange={handleGenderChange} name="anotherGenderIdentity" />}
                      label="Another Gender Identity"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.unknown} onChange={handleGenderChange} name="unknown" />}
                      label="Unknown"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formData.selfIdentifiedGender.genderQueer} onChange={handleGenderChange} name="genderQueer" />}
                      label="Gender Queer"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>

            {/* Pronouns section */}
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
              <Typography variant="body1">Pronouns</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <RadioGroup
                row
                name="pronouns"
                value={formData.pronouns}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="He/Him" control={<Radio />} label="He/Him" />
                <FormControlLabel value="She/Her" control={<Radio />} label="She/Her" />
                <FormControlLabel value="They/Them" control={<Radio />} label="They/Them" />
                <FormControlLabel value="Ze/Hir" control={<Radio />} label="Ze/Hir" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
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

            {/* VOCA Classification section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, mt: 1 }}>
                          <Typography variant="body1">VOCA Classification</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.autism} onChange={handleVocaChange} name="autism" />}
                                  label="Autism"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.behavioralIssues} onChange={handleVocaChange} name="behavioralIssues" />}
                                  label="Behavioral Issues"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.autismSpectrum} onChange={handleVocaChange} name="autismSpectrum" />}
                                  label="Autism Spectrum"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.deaf} onChange={handleVocaChange} name="deaf" />}
                                  label="Deaf"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.lgbtqCommunity} onChange={handleVocaChange} name="lgbtqCommunity" />}
                                  label="LGBTQ Community"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.physicallyHandicapped} onChange={handleVocaChange} name="physicallyHandicapped" />}
                                  label="Physically Handicapped"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.adultWithSubstantialImpairment} onChange={handleVocaChange} name="adultWithSubstantialImpairment" />}
                                  label="Adult with Substantial Impairment"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.asperbergers} onChange={handleVocaChange} name="asperbergers" />}
                                  label="Asperberger's"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.blind} onChange={handleVocaChange} name="blind" />}
                                  label="Blind"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.homeless} onChange={handleVocaChange} name="homeless" />}
                                  label="Homeless"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.mmr} onChange={handleVocaChange} name="mmr" />}
                                  label="MMR"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.vocaClassification.veteran} onChange={handleVocaChange} name="veteran" />}
                                  label="Veteran"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Grid>
            
                        {/* Special Populations section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, mt: 1 }}>
                          <Typography variant="body1" color="error">Special Populations</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.deafHardOfHearing} onChange={handleSpecialPopulationsChange} name="deafHardOfHearing" />}
                                  label="Deaf/Hard of Hearing"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.immigrantsRefugees} onChange={handleSpecialPopulationsChange} name="immigrantsRefugees" />}
                                  label="Immigrants/Refugee or Asylum Seeking"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.militaryDependent} onChange={handleSpecialPopulationsChange} name="militaryDependent" />}
                                  label="Military-Dependent"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.limitedEnglish} onChange={handleSpecialPopulationsChange} name="limitedEnglish" />}
                                  label="Limited English Proficiency"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.indigenousTribal} onChange={handleSpecialPopulationsChange} name="indigenousTribal" />}
                                  label="Indigenous/Tribal community"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.unstablyHoused} onChange={handleSpecialPopulationsChange} name="unstablyHoused" />}
                                  label="Unstably Housed/Unhoused"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.lgbtqiaPlus} onChange={handleSpecialPopulationsChange} name="lgbtqiaPlus" />}
                                  label="LGBTQIA+"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.cognitivePhysicalMental} onChange={handleSpecialPopulationsChange} name="cognitivePhysicalMental" />}
                                  label="Cognitive, Physical, or Mental Disability"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.visionImpaired} onChange={handleSpecialPopulationsChange} name="visionImpaired" />}
                                  label="Vision Impaired"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.specialPopulations.other} onChange={handleSpecialPopulationsChange} name="other" />}
                                  label="Other"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Grid>
            
                        {/* Risk Factors section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, mt: 1 }}>
                          <Typography variant="body1">Risk Factors</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.giftsBribes} onChange={handleRiskFactorsChange} name="giftsBribes" />}
                                  label="Gifts/Bribes from non-caregivers"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.other} onChange={handleRiskFactorsChange} name="other" />}
                                  label="Other"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.runaway} onChange={handleRiskFactorsChange} name="runaway" />}
                                  label="Runaway"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.substanceAbuse} onChange={handleRiskFactorsChange} name="substanceAbuse" />}
                                  label="Substance Abuse"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.highRiskSexual} onChange={handleRiskFactorsChange} name="highRiskSexual" />}
                                  label="High Risk Sexual Behavior"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.riskyOnline} onChange={handleRiskFactorsChange} name="riskyOnline" />}
                                  label="Risky Online Behavior"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.riskFactors.streetLanguage} onChange={handleRiskFactorsChange} name="streetLanguage" />}
                                  label="Street Language"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Grid>
            
                        {/* CSEC section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, mt: 1 }}>
                          <Typography variant="body1">CSEC</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csec.childPornography} onChange={handleCsecChange} name="childPornography" />}
                                  label="Child Pornography"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csec.sexTourism} onChange={handleCsecChange} name="sexTourism" />}
                                  label="Sex Tourism"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csec.other} onChange={handleCsecChange} name="other" />}
                                  label="Other"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csec.sexTrafficking} onChange={handleCsecChange} name="sexTrafficking" />}
                                  label="Sex Trafficking"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Grid>
            
                        {/* Child Pornography Involvement section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, mt: 1 }}>
                          <Typography variant="body1">Child Pornography Involvement</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.childPornographyInvolvement.distribution} onChange={handleChildPornographyInvolvementChange} name="distribution" />}
                                  label="Distribution"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.childPornographyInvolvement.other} onChange={handleChildPornographyInvolvementChange} name="other" />}
                                  label="Other"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.childPornographyInvolvement.trading} onChange={handleChildPornographyInvolvementChange} name="trading" />}
                                  label="Trading"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.childPornographyInvolvement.manufacturing} onChange={handleChildPornographyInvolvementChange} name="manufacturing" />}
                                  label="Manufacturing"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.childPornographyInvolvement.possession} onChange={handleChildPornographyInvolvementChange} name="possession" />}
                                  label="Possession"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Grid>
            
                        {/* Special Needs Special Text section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Special Needs Special Text</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              name="specialNeeds"
                              value={formData.specialNeeds}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                              <Button variant="contained" sx={{ minWidth: 'auto', mb: 0.5 }}>+</Button>
                              <Button variant="contained" sx={{ minWidth: 'auto' }}>-</Button>
                            </Box>
                          </Box>
                        </Grid>
            
                        {/* Comments section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Comments</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              name="comments"
                              value={formData.comments}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                              <Button variant="contained" sx={{ minWidth: 'auto', mb: 0.5 }}>+</Button>
                              <Button variant="contained" sx={{ minWidth: 'auto' }}>-</Button>
                            </Box>
                          </Box>
                        </Grid>
            
                        {/* Do they like cookies section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Do they like cookies?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <FormControl fullWidth>
                            <Select
                              name="doTheyLikeCookies"
                              value={formData.doTheyLikeCookies}
                              onChange={handleChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Do they like cookies?' }}
                            >
                              <MenuItem value="">Select option</MenuItem>
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                              <MenuItem value="Unknown">Unknown</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
            
                        {/* Developmental Age section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Developmental Age (2)</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            name="developmentalAge"
                            value={formData.developmentalAge}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
            
                        {/* Date Added section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Date Added (3)</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            name="dateAdded"
                            type="date"
                            value={formData.dateAdded}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        {/* CSEC Involvement section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, mt: 1 }}>
                          <Typography variant="body1">CSEC Involvement (4)</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.usa} onChange={handleCsecInvolvementChange} name="usa" />}
                                  label="USA"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.mexico} onChange={handleCsecInvolvementChange} name="mexico" />}
                                  label="Mexico"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.fosterCare} onChange={handleCsecInvolvementChange} name="fosterCare" />}
                                  label="Foster Care Awol History"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.canada} onChange={handleCsecInvolvementChange} name="canada" />}
                                  label="Canada"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.nicaragua} onChange={handleCsecInvolvementChange} name="nicaragua" />}
                                  label="Nicaragua"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.elSalvador} onChange={handleCsecInvolvementChange} name="elSalvador" />}
                                  label="El Salvador"
                                />
                                <FormControlLabel
                                  control={<Checkbox checked={formData.csecInvolvement.uzbekistan} onChange={handleCsecInvolvementChange} name="uzbekistan" />}
                                  label="Uzbekistan"
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        </Grid>
            
                        {/* Custom Field section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Custom Field (5)</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            name="customField"
                            value={formData.customField}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
            
                        {/* Ethnicity section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Ethnicity 6</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <FormGroup row>
                            <FormControlLabel
                              control={<Checkbox checked={formData.ethnicity.nonHispanic} onChange={handleEthnicityChange} name="nonHispanic" />}
                              label="Non-Hispanic"
                            />
                            <Box sx={{ width: 200 }} /> {/* Spacer */}
                            <FormControlLabel
                              control={<Checkbox checked={formData.ethnicity.hispanic} onChange={handleEthnicityChange} name="hispanic" />}
                              label="Hispanic"
                            />
                          </FormGroup>
                        </Grid>
            
                        {/* Bio Custom Field 7 section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Bio Custom Field 7</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            name="bioCustomField"
                            value={formData.bioCustomField1}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
            
                        {/* Bio Custom Field 8 section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">Bio Custom Field 8</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            name="bioCustomField"
                            value={formData.bioCustomField2}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
            
                        {/* New Mexico Pueblo or Tribe section */}
                        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                          <Typography variant="body1">New Mexico Pueblo or Tribe</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            fullWidth
                            name="puebloORtribe"
                            value={formData.puebloORtribe}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      {/* Bottom action buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <ActionButtons />
          </Box>
        </Box>
      </Paper>

      <ConfirmationModal
        open={confirmModalOpen}
        title="Update Person Information"
        message={`You are attempting to change the information of a person already in NCATrak. This will change the person's information on all cases in NCATrak. Are you sure you want to do this?`}
        onConfirm={handleConfirmChanges}
        onCancel={handleCancelChanges}
      />
    </Container>
  );
};

export default PersonBio;