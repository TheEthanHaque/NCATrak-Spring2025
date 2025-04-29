// src/components/PeopleInterface.js
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
    setFilteredPeople(
      people.filter(person =>
        (person.name?.toLowerCase().includes(lowerCaseSearch)) ||
        (person.role?.toLowerCase().includes(lowerCaseSearch))
      )
    );
  }, [searchTerm, people]);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
  };
  
  // Handlers
  const handleSearchChange = e => setSearchTerm(e.target.value);
  const handleEditPerson  = id => console.log('Edit person:', id);
  const handleViewBio     = id => { console.log('View bio:', id); navigate('/PersonBio'); };
  const handleAddPerson   = () => console.log('Add new person');
  const handleCheckboxChange = e => setAllegedOffenderUnknown(e.target.checked);
  const handleCommentsChange = e => setOffenderComments(e.target.value);
  const handleSave = e => { e.preventDefault(); console.log('Form saved'); };

  return (
    <Container maxWidth="md" data-aoi="People Interface Container">
      <Paper elevation={3} sx={{ p: 4, my: 4 }} data-aoi="People Paper">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          data-aoi="People Header"
        >
          People Associated with Case
        </Typography>
  
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{ mt: 3 }}
          data-aoi="People Form"
        >
          {/* People Table Section */}
          <Box sx={{ mb: 4 }} data-aoi="People Table Section">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPerson}
                data-aoi="Add Person Button"
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
                  ),
                  inputProps: {
                    'data-aoi': 'Search People Input'
                  }
                }}
                sx={{ width: '300px' }}
              />
            </Box>
  
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 2 }}
                data-aoi="People Error Alert"
              >
                {error}
              </Alert>
            )}
  
            <TableContainer
              component={Paper}
              sx={{ mb: 3 }}
              data-aoi="People Table Container"
            >
              <Table size="small" sx={{ minWidth: 650 }} data-aoi="People Table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell data-aoi="Table Header Action">Action</TableCell>
                    <TableCell data-aoi="Table Header Name">Name</TableCell>
                    <TableCell data-aoi="Table Header Age">Age</TableCell>
                    <TableCell data-aoi="Table Header DOB">Date of Birth</TableCell>
                    <TableCell data-aoi="Table Header Role">Role</TableCell>
                    <TableCell data-aoi="Table Header Relationship">Relationship</TableCell>
                    <TableCell data-aoi="Table Header Household">Same Household</TableCell>
                    <TableCell data-aoi="Table Header Custody">Custody</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                        <CircularProgress size={30} data-aoi="People Loading Spinner" />
                        <Typography data-aoi="People Loading Text" sx={{ mt: 1 }}>
                          Loading people...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredPeople.length > 0 ? (
                    filteredPeople.map(person => (
                      <TableRow key={person.person_id} hover data-aoi="Person Row">
                        <TableCell data-aoi="Person Actions">
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleEditPerson(person.person_id)}
                              data-aoi="Edit Person Button"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleViewBio(person.person_id)}
                              data-aoi="View Bio Button"
                            >
                              Bio
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell data-aoi="Person Name">{person.name}</TableCell>
                        <TableCell data-aoi="Person Age">{person.age || ''}</TableCell>
                        <TableCell data-aoi="Person DOB">{formatDate(person.date_of_birth)}</TableCell>
                        <TableCell data-aoi="Person Role">{person.role || ''}</TableCell>
                        <TableCell data-aoi="Person Relationship">{person.relationship_id || ''}</TableCell>
                        <TableCell data-aoi="Person Same Household" align="center">
                          <Checkbox
                            checked={Boolean(person.same_household)}
                            disabled
                            size="small"
                          />
                        </TableCell>
                        <TableCell data-aoi="Person Custody" align="center">
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
                      <TableCell
                        colSpan={8}
                        align="center"
                        sx={{ py: 2 }}
                        data-aoi="No People Row"
                      >
                        {searchTerm
                          ? 'No matching people found'
                          : 'No people associated with this case'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
  
            {/* Alleged Offender Unknown section */}
            <Box sx={{ mb: 3 }} data-aoi="Alleged Offender Section">
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Checkbox
                  checked={allegedOffenderUnknown}
                  onChange={handleCheckboxChange}
                  id="allegedOffenderUnknown"
                  name="allegedOffenderUnknown"
                  data-aoi="Alleged Offender Unknown Checkbox"
                />
                <Typography data-aoi="Alleged Offender Unknown Label">
                  Alleged Offender Name Unknown
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ mb: 1 }}
                data-aoi="Alleged Offender Comments Label"
              >
                Alleged Offender Unknown Comments
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={offenderComments}
                onChange={handleCommentsChange}
                variant="outlined"
                inputProps={{ 'data-aoi': 'Alleged Offender Comments Input' }}
              />
            </Box>
          </Box>
  
          {/* Document Upload Section */}
          <Box sx={{ mb: 4 }} data-aoi="Document Upload Section">
            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: '1px solid #ddd', pb: 1 }}
              data-aoi="Document Upload Header"
            >
              Document Upload
            </Typography>
            <TableContainer component={Paper} data-aoi="Document Upload Table">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell data-aoi="Upload Table Header File Name">File Name</TableCell>
                    <TableCell data-aoi="Upload Table Header Upload Date">Upload Date</TableCell>
                    <TableCell data-aoi="Upload Table Header User">User</TableCell>
                    <TableCell data-aoi="Upload Table Header Page">Page</TableCell>
                    <TableCell data-aoi="Upload Table Header Size">Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{ py: 2 }}
                      data-aoi="No Documents Row"
                    >
                      No items to display
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
  
          {/* Form Buttons */}
          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            data-aoi="Form Buttons Section"
          >
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 4 }}
                data-aoi="Save Button"
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
                data-aoi="Cancel Button"
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
