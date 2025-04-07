import React from 'react';
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
  Box
} from '@mui/material';

const PersonProfile = ({ open, person, onClose }) => {
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
      PaperProps={{
        sx: {
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>
        Lookup Person
      </DialogTitle>
      
      <DialogContent dividers>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            PERSONAL PROFILE
          </Typography>
          
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  First Name
                </Typography>
                <Typography variant="body1" component="span">
                  {person.first_name || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Last Name
                </Typography>
                <Typography variant="body1" component="span">
                  {person.last_name || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  SSN
                </Typography>
                <Typography variant="body1" component="span">
                  {person.ssn || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Biological Gender
                </Typography>
                <RadioGroup
                  row
                  value={person.gender === 'M' ? 'Male' : person.gender === 'F' ? 'Female' : 'Unknown'}
                >
                  <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                  <FormControlLabel value="Unknown" control={<Radio size="small" />} label="Unknown" />
                </RadioGroup>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Religion
                </Typography>
                <Typography variant="body1" component="span">
                  {person.religion || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  VOCA Classifications
                </Typography>
                <Typography variant="body1" component="span">
                  {person.voca_classification || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Special Needs
                </Typography>
                <Typography variant="body1" component="span">
                  {person.special_needs || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Comments
                </Typography>
                <Typography variant="body1" component="span">
                  {person.comments || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Prior Convictions
                </Typography>
                <Checkbox checked={Boolean(person.prior_convictions)} disabled />
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Sexual Offender
                </Typography>
                <Checkbox checked={Boolean(person.sex_offender)} disabled />
              </Box>
            </Grid>
            
            {/* Right column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Middle Name
                </Typography>
                <Typography variant="body1" component="span">
                  {person.middle_name || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Nick Name
                </Typography>
                <Typography variant="body1" component="span">
                  {person.nick_name || person.first_name}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Date of Birth
                </Typography>
                <Typography variant="body1" component="span">
                  {formatDate(person.date_of_birth)}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Race
                </Typography>
                <Typography variant="body1" component="span">
                  {person.race || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Self Identified Gender
                </Typography>
                <RadioGroup
                  row
                  value={person.self_identified_gender || 'Unknown'}
                >
                  <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                  <FormControlLabel value="Unknown" control={<Radio size="small" />} label="Unknown" />
                </RadioGroup>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Language
                </Typography>
                <Typography variant="body1" component="span">
                  {person.language || ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Convicted of Crime Against Children
                </Typography>
                <Checkbox checked={Boolean(person.convicted_against_children)} disabled />
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  Sexual Predator
                </Typography>
                <Checkbox checked={Boolean(person.sex_predator)} disabled />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonProfile;