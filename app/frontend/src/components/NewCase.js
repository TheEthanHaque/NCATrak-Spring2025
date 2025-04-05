import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewCase = () => {
  console.log("NewCase component is rendering");
  const navigate = useNavigate();
  
  // Form state
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
    // VOCA Classification
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
    // Special Populations
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
    // Risk Factors
    riskFactors: {
      giftsBribes: false,
      other: false,
      runaway: false,
      substanceAbuse: false,
      highRiskSexual: false,
      riskyOnline: false,
      streetLanguage: false
    },
    // CSEC
    csec: {
      childPornography: false,
      sexTourism: false,
      other: false,
      sexTrafficking: false
    },
    // Child Pornography Involvement
    childPornographyInvolvement: {
      distribution: false,
      other: false,
      trading: false,
      manufacturing: false,
      possession: false
    },
    // Special Needs / Comments
    specialNeeds: '',
    comments: '',
    doTheyLikeCookies: '',
    developmentalAge: '',
    dateAdded: '',
    // CSEC Involvement
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
    // Ethnicity
    ethnicity: {
      nonHispanic: false,
      hispanic: false
    },
    bioCustomField1: '',
    bioCustomField2: '',
    puebloORtribe: '',
    runawayIncidents: [],
    // Case Specific Information
    victimStatus: '',
    ageAtReferral: '',
    ageUnit: 'Years',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'District of Columbia',
    zip: '',
    county: 'Ward 1',
    residesOutOfCountry: false,
    homePhone: '',
    workPhone: '',
    cellPhone: '',
    emailAddress: '',
    schoolOrEmployer: '',
    educationLevel: '',
    maritalStatus: '',
    incomeLevel: '',
    youthSexualBehaviors: false,
    militaryConnection: false,
    militaryType: '',
    militaryDependentRelationship: '',
    militaryConnectionName: '',
    customField1: '',
    csfEligible: false,
    transportationAssistance: '',
    customField4: '',
    community: {
      westHills: false,
      glenview: false,
      cedarBluffApartments: false,
      hardinValley: false
    },
    casePersonCustomField6: '',
    casePersonCustomField7: '',
    casePersonCustomField8: '',
    casePersonCustomField9: '',
    // Referral section
    dateReceivedByCac: '04/05/2025',
    referralAgency: '',
    referralPerson: '',
    reasonForReferral: '',
    serviceLocation: '',
    // Prior Interviews
    priorInterviews: [],
    // MDT
    mdtMeeting: ''
  });

  // State for runaway incident being added
  const [newRunawayIncident, setNewRunawayIncident] = useState({
    startDate: '',
    lengthOfTime: '',
    location: ''
  });

  // State for prior interview being added
  const [newPriorInterview, setNewPriorInterview] = useState({
    agency: '',
    interviewDate: ''
  });


  // Dropdown options
  const raceOptions = ['American Indian/Alaska Native', 'Asian', 'Black/African American', 'Hispanic/Latino', 'Native Hawaiian/Pacific Islander', 'White', 'Multi-racial', 'Other', 'Unknown'];
  const religionOptions = ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other', 'Unknown'];
  const languageOptions = ['English', 'Spanish', 'French', 'Chinese', 'Arabic', 'Other', 'Unknown'];

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here to submit the data
    
    // Show success message or navigate
    navigate('/');
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

  // Handle checkbox changes for Community
  const handleCommunityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      community: {
        ...prev.community,
        [name]: checked
      }
    }));
  };

  // Handle changes in new runaway incident form
  const handleRunawayIncidentChange = (e) => {
    const { name, value } = e.target;
    setNewRunawayIncident(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle changes in new prior interview form
  const handlePriorInterviewChange = (e) => {
    const { name, value } = e.target;
    setNewPriorInterview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a new prior interview
  const addPriorInterview = () => {
    // Validate the new interview has required fields
    if (!newPriorInterview.agency || !newPriorInterview.interviewDate) {
      return; // Don't add incomplete records
    }
    
    // Add the new interview to the priorInterviews array
    setFormData(prev => ({
      ...prev,
      priorInterviews: [...prev.priorInterviews, { ...newPriorInterview, id: Date.now() }]
    }));
    
    // Clear the form for the next entry
    setNewPriorInterview({
      agency: '',
      interviewDate: ''
    });
  };

  // Add a new runaway incident
  const addRunawayIncident = () => {
    // Validate the new incident has required fields
    if (!newRunawayIncident.startDate) {
      return; // Don't add incomplete records
    }
    
    // Add the new incident to the runawayIncidents array
    setFormData(prev => ({
      ...prev,
      runawayIncidents: [...prev.runawayIncidents, { ...newRunawayIncident, id: Date.now() }]
    }));
    
    // Clear the form for the next entry
    setNewRunawayIncident({
      startDate: '',
      lengthOfTime: '',
      location: ''
    });
  };

  // Remove a runaway incident
  const removeRunawayIncident = (id) => {
    setFormData(prev => ({
      ...prev,
      runawayIncidents: prev.runawayIncidents.filter(incident => incident.id !== id)
    }));
  };
  


  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom align="left">
          Personal Profile
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                InputProps={{
                  endAdornment: (
                    <Box component="span" sx={{ ml: 2 }}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktY2FsZW5kYXIzIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGQ9Ik0xNCAwSDJhMiAyIDAgMCAwLTIgMnYxMmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0yek0xIDMuODU3QzEgMy4zODQgMS40NDggMyAyIDNoMTJjLjU1MiAwIDEgLjM4NCAxIC44NTd2MTBDMTUgMTQuNjE2IDE0LjU1MiAxNSAxNCAxNUgyYy0uNTUyIDAtMS0uMzg0LTEtLjg1N1YzLjg1N3oiLz4KICA8cGF0aCBkPSJNNi41IDdoLTFhLjUuNSAwIDAgMC0uNS41djFhLjUuNSAwIDAgMCAuNS41aDFhLjUuNSAwIDAgMCAuNS0uNXYtMWEuNS41IDAgMCAwLS41LS41em0zIDBIOC41YS41LjUgMCAwIDAtLjUuNXYxYS41LjUgMCAwIDAgLjUuNWgxYS41LjUgMCAwIDAgLjUtLjV2LTFhLjUuNSAwIDAgMC0uNS0uNXptMSAzaC0xYS41LjUgMCAwIDAtLjUuNXYxYS41LjUgMCAwIDAgLjUuNWgxYS41LjUgMCAwIDAgLjUtLjV2LTFhLjUuNSAwIDAgMC0uNS0uNXptLTMgMEg4LjVhLjUuNSAwIDAgMC0uNS41djFhLjUuNSAwIDAgMCAuNS41aDFhLjUuNSAwIDAgMCAuNS0uNXYtMWEuNS41IDAgMCAwLS41LS41em0tMy40IDBIOC4xYS41LjUgMCAwIDAtLjUuNXYxYS41LjUgMCAwIDAgLjUuNWgxYS41LjUgMCAwIDAgLjUtLjV2LTFhLjUuNSAwIDAgMC0uNS0uNXoiLz4KPC9zdmc+" alt="calendar" />
                    </Box>
                  )
                }}
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
                InputProps={{
                  endAdornment: (
                    <Box component="span" sx={{ ml: 2 }}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktY2FsZW5kYXIzIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGQ9Ik0xNCAwSDJhMiAyIDAgMCAwLTIgMnYxMmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0yek0xIDMuODU3QzEgMy4zODQgMS40NDggMyAyIDNoMTJjLjU1MiAwIDEgLjM4NCAxIC44NTd2MTBDMTUgMTQuNjE2IDE0LjU1MiAxNSAxNCAxNUgyYy0uNTUyIDAtMS0uMzg0LTEtLjg1N1YzLjg1N3oiLz4KICA8cGF0aCBkPSJNNi41IDdoLTFhLjUuNSAwIDAgMC0uNS41djFhLjUuNSAwIDAgMCAuNS41aDFhLjUuNSAwIDAgMCAuNS0uNXYtMWEuNS41IDAgMCAwLS41LS41em0zIDBIOC41YS41LjUgMCAwIDAtLjUuNXYxYS41LjUgMCAwIDAgLjUuNWgxYS41LjUgMCAwIDAgLjUtLjV2LTFhLjUuNSAwIDAgMC0uNS0uNXptMSAzaC0xYS41LjUgMCAwIDAtLjUuNXYxYS41LjUgMCAwIDAgLjUuNWgxYS41LjUgMCAwIDAgLjUtLjV2LTFhLjUuNSAwIDAgMC0uNS0uNXptLTMgMEg4LjVhLjUuNSAwIDAgMC0uNS41djFhLjUuNSAwIDAgMCAuNS41aDFhLjUuNSAwIDAgMCAuNS0uNXYtMWEuNS41IDAgMCAwLS41LS41em0tMy40IDBIOC4xYS41LjUgMCAwIDAtLjUuNXYxYS41LjUgMCAwIDAgLjUuNWgxYS41LjUgMCAwIDAgLjUtLjV2LTFhLjUuNSAwIDAgMC0uNS0uNXoiLz4KPC9zdmc+" alt="calendar" />
                    </Box>
                  )
                }}
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

          {/* Runaway Incidents section */}
          <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, mt: 3, mb: 3, border: '1px solid #ddd' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'normal' }}>
                  Runaway Incidents
                </Typography>
                
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<span>+</span>}
                  onClick={addRunawayIncident}
                  sx={{ mb: 2 }}
                >
                  Add new record
                </Button>
                
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ display: 'flex', width: '100%', bgcolor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ width: '20%', p: 1, fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Action</Box>
                    <Box sx={{ width: '25%', p: 1, fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Start Date</Box>
                    <Box sx={{ width: '25%', p: 1, fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Length of Time</Box>
                    <Box sx={{ width: '30%', p: 1, fontWeight: 'bold' }}>Location</Box>
                  </Box>
                  
                  {/* New incident input row */}
                  <Box sx={{ display: 'flex', width: '100%', borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ width: '20%', p: 1, borderRight: '1px solid #ddd' }}>
                      {/* Action button will be the submission */}
                    </Box>
                    <Box sx={{ width: '25%', p: 1, borderRight: '1px solid #ddd' }}>
                      <TextField
                        type="date"
                        name="startDate"
                        size="small"
                        fullWidth
                        value={newRunawayIncident.startDate}
                        onChange={handleRunawayIncidentChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box sx={{ width: '25%', p: 1, borderRight: '1px solid #ddd' }}>
                      <TextField
                        size="small"
                        fullWidth
                        name="lengthOfTime"
                        value={newRunawayIncident.lengthOfTime}
                        onChange={handleRunawayIncidentChange}
                        placeholder="e.g., 3 days"
                      />
                    </Box>
                    <Box sx={{ width: '30%', p: 1 }}>
                      <TextField
                        size="small"
                        fullWidth
                        name="location"
                        value={newRunawayIncident.location}
                        onChange={handleRunawayIncidentChange}
                        placeholder="Location"
                      />
                    </Box>
                  </Box>
                  
                  {/* List of existing incidents */}
                  {formData.runawayIncidents.length > 0 ? (
                    formData.runawayIncidents.map(incident => (
                      <Box key={incident.id} sx={{ display: 'flex', width: '100%', borderBottom: '1px solid #ddd' }}>
                        <Box sx={{ width: '20%', p: 1, borderRight: '1px solid #ddd' }}>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            onClick={() => removeRunawayIncident(incident.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                        <Box sx={{ width: '25%', p: 1, borderRight: '1px solid #ddd' }}>
                          {incident.startDate}
                        </Box>
                        <Box sx={{ width: '25%', p: 1, borderRight: '1px solid #ddd' }}>
                          {incident.lengthOfTime}
                        </Box>
                        <Box sx={{ width: '30%', p: 1 }}>
                          {incident.location}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
                      No items to display
                    </Box>
                  )}
                  
                  {/* Pagination controls */}
                  <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ddd' }}>
                    <Button size="small" disabled>«</Button>
                    <Button size="small" disabled>‹</Button>
                    <Button size="small" variant="contained" sx={{ bgcolor: '#007bff' }}>0</Button>
                    <Button size="small" disabled>›</Button>
                    <Button size="small" disabled>»</Button>
                    <Box sx={{ flexGrow: 1, textAlign: 'right', color: '#666' }}>
                      No items to display
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Case Specific Information section */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, mt: 3, mb: 3, border: '1px solid #ddd' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'normal', borderBottom: '1px solid #ddd', pb: 1 }}>
                  Case Specific Information
                </Typography>

                <Grid container spacing={2}>
                  {/* Victim Status */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Victim Status</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="victimStatus"
                        value={formData.victimStatus}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="">Select Victim Status</MenuItem>
                        <MenuItem value="Primary Victim">Primary Victim</MenuItem>
                        <MenuItem value="Secondary Victim">Secondary Victim</MenuItem>
                        <MenuItem value="Indirect Victim">Indirect Victim</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Age at Time of Referral */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1" color="error">Age at Time of Referral</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="ageAtReferral"
                      value={formData.ageAtReferral}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <Select
                        name="ageUnit"
                        value={formData.ageUnit}
                        onChange={handleChange}
                      >
                        <MenuItem value="Years">Years</MenuItem>
                        <MenuItem value="Months">Months</MenuItem>
                        <MenuItem value="Days">Days</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Address Line 1 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Address Line 1</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Address Line 2 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Address Line 2</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* City */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">City</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* State */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">State</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      >
                        <MenuItem value="Alabama">Alabama</MenuItem>
                        <MenuItem value="Alaska">Alaska</MenuItem>
                        <MenuItem value="Arizona">Arizona</MenuItem>
                        <MenuItem value="Arkansas">Arkansas</MenuItem>
                        <MenuItem value="California">California</MenuItem>
                        <MenuItem value="Colorado">Colorado</MenuItem>
                        <MenuItem value="Connecticut">Connecticut</MenuItem>
                        <MenuItem value="Delaware">Delaware</MenuItem>
                        <MenuItem value="District of Columbia">District of Columbia</MenuItem>
                        <MenuItem value="Florida">Florida</MenuItem>
                        <MenuItem value="Georgia">Georgia</MenuItem>
                        {/* Add other states as needed */}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Zip */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Zip</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* County */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">County</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="county"
                        value={formData.county}
                        onChange={handleChange}
                      >
                        <MenuItem value="Ward 1">Ward 1</MenuItem>
                        <MenuItem value="Ward 2">Ward 2</MenuItem>
                        <MenuItem value="Ward 3">Ward 3</MenuItem>
                        <MenuItem value="Ward 4">Ward 4</MenuItem>
                        <MenuItem value="Ward 5">Ward 5</MenuItem>
                        <MenuItem value="Ward 6">Ward 6</MenuItem>
                        <MenuItem value="Ward 7">Ward 7</MenuItem>
                        <MenuItem value="Ward 8">Ward 8</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Resides Out of Country */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Resides Out of Country</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Checkbox
                      checked={formData.residesOutOfCountry}
                      onChange={(e) => setFormData({...formData, residesOutOfCountry: e.target.checked})}
                    />
                  </Grid>

                  {/* Home Phone */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Home Phone</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="homePhone"
                      value={formData.homePhone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Work Phone */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Work Phone</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="workPhone"
                      value={formData.workPhone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Cell Phone */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Cell Phone</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="cellPhone"
                      value={formData.cellPhone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Email Address */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Email Address</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* School Or Employer */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">School Or Employer</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="schoolOrEmployer"
                      value={formData.schoolOrEmployer}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Education Level */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Education Level</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="">Select Education Level</MenuItem>
                        <MenuItem value="Pre-School">Pre-School</MenuItem>
                        <MenuItem value="Elementary">Elementary</MenuItem>
                        <MenuItem value="Middle School">Middle School</MenuItem>
                        <MenuItem value="High School">High School</MenuItem>
                        <MenuItem value="Some College">Some College</MenuItem>
                        <MenuItem value="Associate Degree">Associate Degree</MenuItem>
                        <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                        <MenuItem value="Graduate Degree">Graduate Degree</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Marital Status */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Marital Status</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="">Select Marital Status</MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Separated">Separated</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                        <MenuItem value="Unknown">Unknown</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Income Level of Household */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Income Level of Household</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="incomeLevel"
                        value={formData.incomeLevel}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="">Select Income Level</MenuItem>
                        <MenuItem value="Below $15,000">Below $15,000</MenuItem>
                        <MenuItem value="$15,000 - $30,000">$15,000 - $30,000</MenuItem>
                        <MenuItem value="$30,001 - $50,000">$30,001 - $50,000</MenuItem>
                        <MenuItem value="$50,001 - $75,000">$50,001 - $75,000</MenuItem>
                        <MenuItem value="$75,001 - $100,000">$75,001 - $100,000</MenuItem>
                        <MenuItem value="Above $100,000">Above $100,000</MenuItem>
                        <MenuItem value="Unknown">Unknown</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Does this youth have Youth Problematic Sexual Behaviors? */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Does this youth have Youth Problematic Sexual Behaviors?</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Checkbox
                      checked={formData.youthSexualBehaviors}
                      onChange={(e) => setFormData({...formData, youthSexualBehaviors: e.target.checked})}
                    />
                  </Grid>

                  {/* Military Connection */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Military Connection</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Checkbox
                      checked={formData.militaryConnection}
                      onChange={(e) => setFormData({...formData, militaryConnection: e.target.checked})}
                    />
                  </Grid>

                  {/* Military Type */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Military Type</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="militaryType"
                        value={formData.militaryType}
                        onChange={handleChange}
                        displayEmpty
                        disabled={!formData.militaryConnection}
                      >
                        <MenuItem value="">Select Military Type</MenuItem>
                        <MenuItem value="Army">Army</MenuItem>
                        <MenuItem value="Navy">Navy</MenuItem>
                        <MenuItem value="Air Force">Air Force</MenuItem>
                        <MenuItem value="Marines">Marines</MenuItem>
                        <MenuItem value="Coast Guard">Coast Guard</MenuItem>
                        <MenuItem value="National Guard">National Guard</MenuItem>
                        <MenuItem value="Reserves">Reserves</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Military Dependent Relationship */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Military Dependent Relationship</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="militaryDependentRelationship"
                        value={formData.militaryDependentRelationship}
                        onChange={handleChange}
                        displayEmpty
                        disabled={!formData.militaryConnection}
                      >
                        <MenuItem value="">Select Relationship</MenuItem>
                        <MenuItem value="Spouse">Spouse</MenuItem>
                        <MenuItem value="Child">Child</MenuItem>
                        <MenuItem value="Parent">Parent</MenuItem>
                        <MenuItem value="Sibling">Sibling</MenuItem>
                        <MenuItem value="Other Relative">Other Relative</MenuItem>
                        <MenuItem value="Self">Self</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Military Connection Name */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Military Connection Name</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="militaryConnectionName"
                      value={formData.militaryConnectionName}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!formData.militaryConnection}
                    />
                  </Grid>

                  {/* Custom Field (1) */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Custom Field (1)</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="customField1"
                      value={formData.customField1}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* CSF Eligible (2) */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">CSF Eligible (2)</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={formData.csfEligible} 
                          onChange={(e) => setFormData({...formData, csfEligible: e.target.checked})}
                        />
                      }
                      label="Yes"
                    />
                  </Grid>

                  {/* Does family need transportation assistance? (3) */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Does family need transportation assistance? (3)</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="transportationAssistance"
                      value={formData.transportationAssistance}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Custom Field (4) */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Custom Field (4)</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="customField4"
                      value={formData.customField4}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Community (5) */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Community (5)</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={formData.community.westHills} 
                              onChange={handleCommunityChange} 
                              name="westHills"
                            />
                          }
                          label="West Hills"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={formData.community.glenview} 
                              onChange={handleCommunityChange} 
                              name="glenview"
                            />
                          }
                          label="Glenview"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={formData.community.cedarBluffApartments} 
                              onChange={handleCommunityChange} 
                              name="cedarBluffApartments"
                            />
                          }
                          label="Cedar Bluff Apartments"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={formData.community.hardinValley} 
                              onChange={handleCommunityChange} 
                              name="hardinValley"
                            />
                          }
                          label="Hardin Valley"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Case Person Custom Field 6 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Case Person Custom Field 6</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="casePersonCustomField6"
                      value={formData.casePersonCustomField6}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Case Person Custom Field 7 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Case Person Custom Field 7</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="casePersonCustomField7"
                      value={formData.casePersonCustomField7}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Case Person Custom Field 8 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Case Person Custom Field 8</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="casePersonCustomField8"
                      value={formData.casePersonCustomField8}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Case Person Custom Field 9 */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Case Person Custom Field 9</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="casePersonCustomField9"
                      value={formData.casePersonCustomField9}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Referral Section */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, mt: 3, mb: 3, border: '1px solid #ddd' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'normal', bgcolor: '#f5f5f5', p: 1 }}>
                  Referral
                </Typography>

                <Grid container spacing={2}>
                  {/* Date Received by CAC */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1" color="error">Date Received by CAC</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      name="dateReceivedByCac"
                      value={formData.dateReceivedByCac}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Referral Agency */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Referral Agency</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        name="referralAgency"
                        value={formData.referralAgency}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => selected || ' '}
                        sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                        endAdornment={
                          <Box component="span" sx={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)' }}>
                            <span>▼</span>
                          </Box>
                        }
                      >
                        <MenuItem value="">Select Agency</MenuItem>
                        <MenuItem value="agency1">Agency 1</MenuItem>
                        <MenuItem value="agency2">Agency 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={<span>+</span>}
                    >
                      Add
                    </Button>
                  </Grid>

                  {/* Referral Person */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Referral Person</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        name="referralPerson"
                        value={formData.referralPerson}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => selected || ' '}
                        sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                        endAdornment={
                          <Box component="span" sx={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)' }}>
                            <span>▼</span>
                          </Box>
                        }
                      >
                        <MenuItem value="">Select Person</MenuItem>
                        <MenuItem value="person1">Person 1</MenuItem>
                        <MenuItem value="person2">Person 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={<span>+</span>}
                    >
                      Add
                    </Button>
                  </Grid>

                  {/* Reason for Referral */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1" color="error">Reason for Referral</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <RadioGroup
                      name="reasonForReferral"
                      value={formData.reasonForReferral}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel 
                        value="Allegation Of Abuse" 
                        control={<Radio />} 
                        label="Allegation Of Abuse" 
                      />
                      <FormControlLabel 
                        value="Requesting Other Direct Services" 
                        control={<Radio />} 
                        label="Requesting Other Direct Services" 
                      />
                      <FormControlLabel 
                        value="Requesting Other Indirect Services" 
                        control={<Radio />} 
                        label="Requesting Other Indirect Services" 
                      />
                    </RadioGroup>
                  </Grid>

                  {/* Service Location */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">Service Location</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <FormControl fullWidth>
                      <Select
                        name="serviceLocation"
                        value={formData.serviceLocation}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => selected || ' '}
                        sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                        endAdornment={
                          <Box component="span" sx={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)' }}>
                            <span>▼</span>
                          </Box>
                        }
                      >
                        <MenuItem value="">Select Location</MenuItem>
                        <MenuItem value="location1">Location 1</MenuItem>
                        <MenuItem value="location2">Location 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Prior Interviews Section */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, mt: 3, mb: 3, border: '1px solid #ddd' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'normal', bgcolor: '#f5f5f5', p: 1 }}>
                  Prior Interviews
                </Typography>
                
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<span>+</span>}
                  onClick={addPriorInterview}
                  sx={{ mb: 2 }}
                >
                  Add new record
                </Button>
                
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ display: 'flex', width: '100%', bgcolor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ width: '50%', p: 1, fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Agency</Box>
                    <Box sx={{ width: '50%', p: 1, fontWeight: 'bold' }}>Interview Date</Box>
                  </Box>
                  
                  {/* New interview input row */}
                  <Box sx={{ display: 'flex', width: '100%', borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ width: '50%', p: 1, borderRight: '1px solid #ddd' }}>
                      <TextField
                        size="small"
                        fullWidth
                        name="agency"
                        value={newPriorInterview.agency}
                        onChange={handlePriorInterviewChange}
                        placeholder="Agency"
                      />
                    </Box>
                    <Box sx={{ width: '50%', p: 1 }}>
                      <TextField
                        type="date"
                        name="interviewDate"
                        size="small"
                        fullWidth
                        value={newPriorInterview.interviewDate}
                        onChange={handlePriorInterviewChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                  </Box>
                  
                  {/* List of existing interviews */}
                  {formData.priorInterviews.length > 0 ? (
                    formData.priorInterviews.map(interview => (
                      <Box key={interview.id} sx={{ display: 'flex', width: '100%', borderBottom: '1px solid #ddd' }}>
                        <Box sx={{ width: '50%', p: 1, borderRight: '1px solid #ddd' }}>
                          {interview.agency}
                        </Box>
                        <Box sx={{ width: '50%', p: 1 }}>
                          {interview.interviewDate}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
                      No items to display
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* MDT Section */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, mt: 3, mb: 3, border: '1px solid #ddd' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'normal', bgcolor: '#f5f5f5', p: 1 }}>
                  MDT
                </Typography>

                <Grid container spacing={2}>
                  {/* MDT Meeting */}
                  <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                    <Typography variant="body1">MDT Meeting</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        name="mdtMeeting"
                        value={formData.mdtMeeting}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => selected || ' '}
                        sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                        endAdornment={
                          <Box component="span" sx={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)' }}>
                            <span>▼</span>
                          </Box>
                        }
                      >
                        <MenuItem value="">Select Meeting</MenuItem>
                        <MenuItem value="meeting1">Meeting 1</MenuItem>
                        <MenuItem value="meeting2">Meeting 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={<span>+</span>}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          {/* Buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewCase;