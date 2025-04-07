import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, CircularProgress, Typography } from '@mui/material';
import { useCase } from './CaseContext';
import { useNavigate } from 'react-router-dom';

// Case selector component
const CaseSelector = () => {
  const { currentCase, setCurrentCase, cases, loading, error } = useCase();
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    
    // Check if the selected option is "Create New Case(s)"
    if (selectedValue === 'create-new') {
      navigate('/NewCase');
    } else {
      setCurrentCase(selectedValue);
    }
  };
  
  return (
    <Box sx={{ minWidth: 250, mr: 2 }}>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="case-selector-label" sx={{ color: 'white' }}>Current Case</InputLabel>
        <Select
          labelId="case-selector-label"
          id="case-selector"
          value={currentCase}
          label="Current Case"
          onChange={handleChange}
          disabled={loading}
          sx={{ 
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.8)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography>Loading cases...</Typography>
              </Box>
            </MenuItem>
          ) : error ? (
            <MenuItem disabled>
              <Typography color="error">Error loading cases</Typography>
            </MenuItem>
          ) : (
            cases.map(caseItem => (
              <MenuItem 
                key={caseItem.id} 
                value={caseItem.id}
                sx={caseItem.isAction ? { fontWeight: 'bold', color: 'primary.main' } : {}}
              >
                {caseItem.isAction ? caseItem.name : (
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 'medium' }}>
                      {caseItem.name}
                    </Typography>
                    <Typography component="span" sx={{ ml: 1, color: 'text.secondary', fontSize: '0.9em' }}>
                      {caseItem.number}
                    </Typography>
                    <Typography component="div" sx={{ fontSize: '0.8em', color: 'text.secondary' }}>
                      {caseItem.cacName}
                    </Typography>
                  </Box>
                )}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CaseSelector;