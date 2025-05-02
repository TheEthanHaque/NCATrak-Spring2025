// src/components/PersonProfile.js
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  CircularProgress
} from '@mui/material';
import { peopleApi } from '../services/api';

const PersonProfile = ({ open, person, onClose }) => {
  const [personCases, setPersonCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch person's cases when the modal opens and person is available
    if (open && person && person.person_id) {
      const fetchPersonCases = async () => {
        try {
          setLoading(true);
          const casesData = await peopleApi.getPeopleByCaseId(person.person_id);
          setPersonCases(casesData);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch person cases:', err);
          setError('Failed to load associated cases');
        } finally {
          setLoading(false);
        }
      };
      
      fetchPersonCases();
    }
  }, [open, person]);
  
  if (!person) return null;
  
  // Format date in MM/DD/YYYY format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
      data-aoi="Person Profile Dialog"
      PaperProps={{ sx: { maxHeight: '90vh' } }}
    >
      <DialogTitle sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }} data-aoi="Dialog Title">
        Lookup Person
      </DialogTitle>
      
      <DialogContent dividers data-aoi="Dialog Content">
        <Paper elevation={0} sx={{ p: 2 }} data-aoi="Profile Paper">
          <Typography 
            variant="h6" 
            sx={{ mb: 3, fontWeight: 'bold' }}
            data-aoi="Personal Profile Header"
          >
            PERSONAL PROFILE
          </Typography>
          
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={6} data-aoi="Left Column">
              <Box sx={{ mb: 2 }} data-aoi="First Name Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="First Name Label"
                >
                  First Name
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="First Name Value"
                >
                  {person.first_name || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Last Name Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Last Name Label"
                >
                  Last Name
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Last Name Value"
                >
                  {person.last_name || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="SSN Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="SSN Label"
                >
                  SSN
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="SSN Value"
                >
                  {person.ssn || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Biological Gender Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Biological Gender Label"
                >
                  Biological Gender
                </Typography>
                <RadioGroup
                  row
                  value={person.gender === 'M' ? 'Male' : person.gender === 'F' ? 'Female' : 'Unknown'}
                  data-aoi="Biological Gender RadioGroup"
                >
                  <FormControlLabel 
                    value="Male" 
                    control={<Radio size="small" />} 
                    label="Male" 
                    data-aoi="Biological Gender Male Option"
                  />
                  <FormControlLabel 
                    value="Female" 
                    control={<Radio size="small" />} 
                    label="Female" 
                    data-aoi="Biological Gender Female Option"
                  />
                  <FormControlLabel 
                    value="Unknown" 
                    control={<Radio size="small" />} 
                    label="Unknown" 
                    data-aoi="Biological Gender Unknown Option"
                  />
                </RadioGroup>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Religion Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Religion Label"
                >
                  Religion
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Religion Value"
                >
                  {person.religion || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="VOCA Classification Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="VOCA Label"
                >
                  VOCA Classifications
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="VOCA Value"
                >
                  {person.voca_classification || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Special Needs Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Special Needs Label"
                >
                  Special Needs
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Special Needs Value"
                >
                  {person.special_needs || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Comments Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Comments Label"
                >
                  Comments
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Comments Value"
                >
                  {person.comments || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }} data-aoi="Prior Convictions Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Prior Convictions Label"
                >
                  Prior Convictions
                </Typography>
                <Checkbox 
                  checked={Boolean(person.prior_convictions)} 
                  disabled 
                  data-aoi="Prior Convictions Checkbox"
                />
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }} data-aoi="Sex Offender Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Sex Offender Label"
                >
                  Sexual Offender
                </Typography>
                <Checkbox 
                  checked={Boolean(person.sex_offender)} 
                  disabled 
                  data-aoi="Sex Offender Checkbox"
                />
              </Box>
            </Grid>
            
            {/* Right column */}
            <Grid item xs={12} md={6} data-aoi="Right Column">
              <Box sx={{ mb: 2 }} data-aoi="Middle Name Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Middle Name Label"
                >
                  Middle Name
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Middle Name Value"
                >
                  {person.middle_name || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Nickname Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Nickname Label"
                >
                  Nick Name
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Nickname Value"
                >
                  {person.nick_name || person.first_name}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="DOB Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="DOB Label"
                >
                  Date of Birth
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="DOB Value"
                >
                  {formatDate(person.date_of_birth)}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Race Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Race Label"
                >
                  Race
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Race Value"
                >
                  {person.race || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Self Identified Gender Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Self Identified Gender Label"
                >
                  Self Identified Gender
                </Typography>
                <RadioGroup
                  row
                  value={person.self_identified_gender || 'Unknown'}
                  data-aoi="Self Identified Gender RadioGroup"
                >
                  <FormControlLabel 
                    value="Male" 
                    control={<Radio size="small" />} 
                    label="Male" 
                    data-aoi="Self Identified Gender Male Option"
                  />
                  <FormControlLabel 
                    value="Female" 
                    control={<Radio size="small" />} 
                    label="Female" 
                    data-aoi="Self Identified Gender Female Option"
                  />
                  <FormControlLabel 
                    value="Unknown" 
                    control={<Radio size="small" />} 
                    label="Unknown" 
                    data-aoi="Self Identified Gender Unknown Option"
                  />
                </RadioGroup>
              </Box>
              
              <Box sx={{ mb: 2 }} data-aoi="Language Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Language Label"
                >
                  Language
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span"
                  data-aoi="Language Value"
                >
                  {person.language || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }} data-aoi="Convicted Against Children Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Convicted Against Children Label"
                >
                  Convicted of Crime Against Children
                </Typography>
                <Checkbox 
                  checked={Boolean(person.convicted_against_children)} 
                  disabled 
                  data-aoi="Convicted Against Children Checkbox"
                />
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }} data-aoi="Sex Predator Field">
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ fontWeight: 'bold', mr: 1 }}
                  data-aoi="Sex Predator Label"
                >
                  Sexual Predator
                </Typography>
                <Checkbox 
                  checked={Boolean(person.sex_predator)} 
                  disabled 
                  data-aoi="Sex Predator Checkbox"
                />
              </Box>
            </Grid>
          </Grid>
          
          {/* Associated Cases Section */}
          <Divider sx={{ my: 3 }} />
          
          <Typography 
            variant="h6" 
            sx={{ mb: 2, fontWeight: 'bold' }}
            data-aoi="Associated Cases Header"
          >
            ASSOCIATED CASES
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={30} />
            </Box>
          ) : error ? (
            <Typography color="error" data-aoi="Cases Error Message">
              {error}
            </Typography>
          ) : (
            <TableContainer component={Paper} variant="outlined" data-aoi="Cases Table Container">
              <Table size="small" data-aoi="Cases Table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell data-aoi="Cases Table Header CAC Number">CAC Case Number</TableCell>
                    <TableCell data-aoi="Cases Table Header CAC Date">CAC Received Date</TableCell>
                    <TableCell data-aoi="Cases Table Header Relationship">Relationship to Victim</TableCell>
                    <TableCell data-aoi="Cases Table Header Role">Role</TableCell>
                    <TableCell data-aoi="Cases Table Header Age">Age</TableCell>
                    <TableCell data-aoi="Cases Table Header Household">Same Household</TableCell>
                    <TableCell data-aoi="Cases Table Header Custody">Custody</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {personCases.length > 0 ? (
                    personCases.map((caseInfo) => (
                      <TableRow key={caseInfo.case_id}>
                        <TableCell data-aoi="Case Row CAC Number">
                          {caseInfo.case_number || `#${caseInfo.case_id}`}
                        </TableCell>
                        <TableCell data-aoi="Case Row CAC Date">
                          {formatDate(caseInfo.cac_received_date)}
                        </TableCell>
                        <TableCell data-aoi="Case Row Relationship">
                          {caseInfo.relationship_id || 'Not specified'}
                        </TableCell>
                        <TableCell data-aoi="Case Row Role">
                          {caseInfo.role_id === 1 ? 'Victim' : 
                           caseInfo.role_id === 2 ? 'Guardian' : 
                           caseInfo.role_id === 3 ? 'Suspect' : 
                           caseInfo.role_id === 4 ? 'Witness' : 
                           caseInfo.role_id === 5 ? 'Family Member' : 
                           'Unknown'}
                        </TableCell>
                        <TableCell data-aoi="Case Row Age">
                          {caseInfo.age || ''}
                        </TableCell>
                        <TableCell data-aoi="Case Row Household" align="center">
                          <Checkbox 
                            checked={Boolean(caseInfo.same_household)} 
                            disabled
                            size="small"
                          />
                        </TableCell>
                        <TableCell data-aoi="Case Row Custody" align="center">
                          <Checkbox 
                            checked={Boolean(caseInfo.custody)} 
                            disabled
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" data-aoi="No Cases Message">
                        No associated cases found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </DialogContent>
      
      <DialogActions data-aoi="Dialog Actions">
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
          data-aoi="Cancel Button"
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonProfile;